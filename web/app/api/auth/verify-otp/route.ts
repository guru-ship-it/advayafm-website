import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SESSION_SECRET = process.env.SESSION_SECRET || 'advaya-fm-default-dev-secret-change-in-prod';
const MAX_ATTEMPTS = 5;

declare global {
  // eslint-disable-next-line no-var
  var __otpStore: Map<string, { otp: string; expires: number; attempts: number }> | undefined;
}

const otpStore: Map<string, { otp: string; expires: number; attempts: number }> =
  globalThis.__otpStore || (globalThis.__otpStore = new Map());

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return '91' + digits;
  if (digits.length === 12 && digits.startsWith('91')) return digits;
  return digits;
}

function createSessionToken(phone: string): string {
  // Simple HMAC token: phone:expiry:signature
  const expiry = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
  const payload = `${phone}:${expiry}`;
  const sig = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}:${sig}`).toString('base64url');
}

export async function POST(req: NextRequest) {
  try {
    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json({ error: 'phone and otp required' }, { status: 400 });
    }

    const normalizedPhone = normalizePhone(phone);
    const stored = otpStore.get(normalizedPhone);

    if (!stored) {
      return NextResponse.json(
        { error: 'No OTP found. Please request a new OTP.' },
        { status: 404 }
      );
    }

    if (Date.now() > stored.expires) {
      otpStore.delete(normalizedPhone);
      return NextResponse.json(
        { error: 'OTP expired. Please request a new OTP.' },
        { status: 410 }
      );
    }

    if (stored.attempts >= MAX_ATTEMPTS) {
      otpStore.delete(normalizedPhone);
      return NextResponse.json(
        { error: 'Too many attempts. Please request a new OTP.' },
        { status: 429 }
      );
    }

    stored.attempts++;

    if (String(otp).trim() !== stored.otp) {
      const remaining = MAX_ATTEMPTS - stored.attempts;
      return NextResponse.json(
        { error: `Invalid OTP. ${remaining} attempt(s) remaining.` },
        { status: 401 }
      );
    }

    // Success - clear OTP and issue session token
    otpStore.delete(normalizedPhone);
    const token = createSessionToken(normalizedPhone);

    return NextResponse.json({
      success: true,
      token,
      phone: normalizedPhone,
      message: 'Verification successful. Welcome to D Advaya FM NaipuNya!',
      expires_in_days: 30,
    });
  } catch (err: any) {
    console.error('Verify OTP error:', err);
    return NextResponse.json({ error: 'Internal error', detail: err?.message }, { status: 500 });
  }
}
