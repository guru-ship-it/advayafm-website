import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY || '';
const MSG91_TEMPLATE_ID = process.env.MSG91_TEMPLATE_ID || '';
const MSG91_SENDER_ID = process.env.MSG91_SENDER_ID || 'ADVAFM';
const OTP_LENGTH = 6;
const OTP_EXPIRY_MINUTES = 5;

// Play Store / App Store reviewer bypass.
// This single hardcoded phone+OTP combo lets Google/Apple reviewers access
// the app without receiving a real SMS. Rate-limited and logged. Never
// advertise this number; it exists only for store-review access.
const REVIEWER_PHONE_E164 = '919999999999'; // +91 99999 99999
const REVIEWER_STATIC_OTP = '123456';
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
  let otp = '';
  for (let i = 0; i < OTP_LENGTH; i++) otp += Math.floor(Math.random() * 10);
  return otp;
}

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json({ error: 'phone is required' }, { status: 400 });
    }

    const normalizedPhone = normalizePhone(phone);
    if (normalizedPhone.length !== 12) {
      return NextResponse.json(
        { error: 'Invalid phone number. Use Indian 10-digit number.' },
        { status: 400 }
      );
    }

    // Reviewer bypass: Google Play Store / App Store reviewers use this
    // phone number to access the app without a real SMS. Store the static
    // OTP and return success without calling MSG91.
    if (normalizedPhone === REVIEWER_PHONE_E164) {
      if (!noteReviewerHit()) {
        return NextResponse.json(
          { error: 'Reviewer daily quota exceeded.' },
          { status: 429 }
        );
      }
      otpStore.set(normalizedPhone, {
        otp: REVIEWER_STATIC_OTP,
        expires: Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000,
        attempts: 0,
      });
      return NextResponse.json({
        success: true,
        message: 'OTP sent.',
        expires_in_minutes: OTP_EXPIRY_MINUTES,
      });
    }

    // Rate limit: don't send OTP more than once per 30 sec to same number
    const existing = otpStore.get(normalizedPhone);
    if (existing && existing.expires - Date.now() > (OTP_EXPIRY_MINUTES - 0.5) * 60 * 1000) {
      return NextResponse.json(
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
      // Dev mode - just log it
      console.log(`[DEV] OTP for ${normalizedPhone}: ${otp}`);
      return NextResponse.json({
        success: true,
        message: 'OTP sent (DEV mode - check server logs)',
        dev_otp: otp, // ONLY in dev when no key
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
      return NextResponse.json(
        { error: 'Failed to send OTP. Please try again.', detail: msg91Data?.message },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `OTP sent to +${normalizedPhone}`,
      expires_in_minutes: OTP_EXPIRY_MINUTES,
    });
  } catch (err: any) {
    console.error('Send OTP error:', err);
    return NextResponse.json({ error: 'Internal error', detail: err?.message }, { status: 500 });
  }
}
