import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Per-IP rate limit (audit): stop anonymous SMS-bombing / MSG91 credit drain.
// In-memory (single App Runner instance); resets on restart.
declare global {
  // eslint-disable-next-line no-var
  var __sendOtpRl: Map<string, { count: number; windowStart: number }> | undefined;
}
const _rl: Map<string, { count: number; windowStart: number }> =
  globalThis.__sendOtpRl || (globalThis.__sendOtpRl = new Map());
function clientIp(req: NextRequest): string {
  const xff = (req.headers.get('x-forwarded-for') || '').trim();
  if (xff) return xff.split(',').pop()!.trim().slice(0, 64); // rightmost = App Runner envoy peer
  return 'unknown';
}
function ipRateLimited(ip: string, limit = 10, windowMs = 60_000): boolean {
  const now = Date.now();
  const rec = _rl.get(ip);
  if (!rec || now - rec.windowStart > windowMs) {
    _rl.set(ip, { count: 1, windowStart: now });
    if (_rl.size > 10_000) for (const [k, v] of _rl) if (now - v.windowStart > windowMs) _rl.delete(k);
    return false;
  }
  if (rec.count >= limit) return true;
  rec.count++;
  return false;
}

// CORS: the Flutter WebView serves the app from file:// (origin = "null").
// We allow any origin on the auth endpoints so the installed app can fetch.
// The OTP flow is self-protecting (rate limits, static reviewer bypass,
// 5-attempt lockout on verify) so wildcard CORS is acceptable here.
const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

function withCors<T>(body: T, init?: ResponseInit) {
  return NextResponse.json(body, {
    ...(init ?? {}),
    headers: { ...(init?.headers ?? {}), ...CORS_HEADERS },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY || '';
const MSG91_TEMPLATE_ID = process.env.MSG91_TEMPLATE_ID || '';
const MSG91_SENDER_ID = process.env.MSG91_SENDER_ID || 'ADVAFM';
const OTP_LENGTH = 6;
const OTP_EXPIRY_MINUTES = 5;

// Play Store / App Store reviewer bypass — audit: moved OUT of source into env
// vars (the repo is public; a hardcoded phone+OTP was a login backdoor). The
// bypass is ACTIVE only when BOTH env vars are set; otherwise it does not exist.
const REVIEWER_PHONE_E164 = process.env.REVIEWER_BYPASS_PHONE || ''; // e.g. 919XXXXXXXXX
const REVIEWER_STATIC_OTP = process.env.REVIEWER_BYPASS_OTP || '';
const REVIEWER_BYPASS_ENABLED = REVIEWER_PHONE_E164.length === 12 && REVIEWER_STATIC_OTP.length >= 6;
const REVIEWER_DAILY_LIMIT = 20;
declare global {
  // eslint-disable-next-line no-var
  var __reviewerHits: { date: string; count: number } | undefined;
}
function noteReviewerHit(): boolean {
  const today = new Date().toISOString().slice(0, 10);
  const tracker = globalThis.__reviewerHits || { date: today, count: 0 };
  if (tracker.date !== today) { tracker.date = today; tracker.count = 0; }
  tracker.count++;
  globalThis.__reviewerHits = tracker;
  console.log(`[REVIEWER-BYPASS] hit ${tracker.count}/${REVIEWER_DAILY_LIMIT} on ${today}`);
  return tracker.count <= REVIEWER_DAILY_LIMIT;
}

// In-memory OTP store (production: use Redis or DynamoDB)
// For now: simple in-process map (resets on App Runner restart)
declare global {
  // eslint-disable-next-line no-var
  var __otpStore: Map<string, { otp: string; expires: number; attempts: number }> | undefined;
}

const otpStore: Map<string, { otp: string; expires: number; attempts: number }> =
  globalThis.__otpStore || (globalThis.__otpStore = new Map());

function normalizePhone(phone: string): string {
  // Strip non-digits, ensure 91XXXXXXXXXX format for India
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return '91' + digits;
  if (digits.length === 12 && digits.startsWith('91')) return digits;
  if (digits.length === 13 && digits.startsWith('091')) return '91' + digits.slice(3);
  return digits;
}

function generateOtp(): string {
  // audit: cryptographic RNG (was Math.random — predictable)
  let otp = '';
  for (let i = 0; i < OTP_LENGTH; i++) otp += crypto.randomInt(0, 10);
  return otp;
}

export async function POST(req: NextRequest) {
  try {
    // audit: per-IP throttle before any work (SMS-bomb / credit-drain guard)
    if (ipRateLimited(clientIp(req))) {
      return withCors({ error: 'Too many requests. Please wait a minute.' }, { status: 429 });
    }

    const { phone } = await req.json();

    if (!phone || typeof phone !== 'string') {
      return withCors({ error: 'phone is required' }, { status: 400 });
    }

    const normalizedPhone = normalizePhone(phone);
    if (normalizedPhone.length !== 12) {
      return withCors(
        { error: 'Invalid phone number. Use Indian 10-digit number.' },
        { status: 400 }
      );
    }

    // Reviewer bypass: Google Play Store / App Store reviewers use this
    // phone number to access the app without a real SMS. Store the static
    // OTP and return success without calling MSG91.
    if (REVIEWER_BYPASS_ENABLED && normalizedPhone === REVIEWER_PHONE_E164) {
      if (!noteReviewerHit()) {
        return withCors(
          { error: 'Reviewer daily quota exceeded.' },
          { status: 429 }
        );
      }
      otpStore.set(normalizedPhone, {
        otp: REVIEWER_STATIC_OTP,
        expires: Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000,
        attempts: 0,
      });
      return withCors({
        success: true,
        message: 'OTP sent.',
        expires_in_minutes: OTP_EXPIRY_MINUTES,
      });
    }

    // Rate limit: don't send OTP more than once per 30 sec to same number
    const existing = otpStore.get(normalizedPhone);
    if (existing && existing.expires - Date.now() > (OTP_EXPIRY_MINUTES - 0.5) * 60 * 1000) {
      return withCors(
        { error: 'OTP already sent. Please wait before requesting again.' },
        { status: 429 }
      );
    }

    const otp = generateOtp();
    otpStore.set(normalizedPhone, {
      otp,
      expires: Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000,
      attempts: 0,
    });

    // Send via MSG91
    if (!MSG91_AUTH_KEY) {
      // audit: NEVER hand the OTP back in production. Only expose dev_otp when
      // explicitly NOT in production; in prod a missing key is a 503, not a giveaway.
      if (process.env.NODE_ENV === 'production') {
        console.error('[SEND-OTP] MSG91_AUTH_KEY missing in production — refusing to issue OTP');
        return withCors({ error: 'OTP service temporarily unavailable.' }, { status: 503 });
      }
      console.log(`[DEV] OTP for ${normalizedPhone}: ${otp}`);
      return withCors({
        success: true,
        message: 'OTP sent (DEV mode - check server logs)',
        dev_otp: otp, // dev only — never reachable in production
      });
    }

    const msg91Url = 'https://control.msg91.com/api/v5/otp';
    const params = new URLSearchParams({
      template_id: MSG91_TEMPLATE_ID,
      mobile: normalizedPhone,
      otp: otp,
      otp_length: String(OTP_LENGTH),
      otp_expiry: String(OTP_EXPIRY_MINUTES),
    });

    const msg91Response = await fetch(`${msg91Url}?${params.toString()}`, {
      method: 'POST',
      headers: {
        authkey: MSG91_AUTH_KEY,
        accept: 'application/json',
      },
    });

    const msg91Data = await msg91Response.json().catch(() => ({}));

    if (!msg91Response.ok || msg91Data.type === 'error') {
      console.error('MSG91 error:', msg91Data);
      return withCors(
        { error: 'Failed to send OTP. Please try again.', detail: msg91Data?.message },
        { status: 502 }
      );
    }

    return withCors({
      success: true,
      message: `OTP sent to +${normalizedPhone}`,
      expires_in_minutes: OTP_EXPIRY_MINUTES,
    });
  } catch (err: any) {
    console.error('Send OTP error:', err);
    return withCors({ error: 'Internal error', detail: err?.message }, { status: 500 });
  }
}
