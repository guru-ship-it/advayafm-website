import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Per-IP rate limit, same in-memory pattern as the OTP routes: keep anonymous
// order-spam from burning the Razorpay dashboard. Resets on instance restart.
declare global {
  // eslint-disable-next-line no-var
  var __createOrderRl: Map<string, { count: number; windowStart: number }> | undefined;
}
const _rl: Map<string, { count: number; windowStart: number }> =
  globalThis.__createOrderRl || (globalThis.__createOrderRl = new Map());
function clientIp(req: NextRequest): string {
  const xff = (req.headers.get('x-forwarded-for') || '').trim();
  if (xff) return xff.split(',').pop()!.trim().slice(0, 64);
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

export async function POST(req: NextRequest) {
  if (ipRateLimited(clientIp(req))) {
    return NextResponse.json({ error: 'Too many requests. Please wait a minute.' }, { status: 429 });
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return NextResponse.json({ error: 'Payment gateway is not configured.' }, { status: 500 });
  }

  let body: { amount?: unknown; currency?: unknown; receipt?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const amount = Number(body.amount);
  if (!Number.isInteger(amount) || amount < 100) {
    return NextResponse.json(
      { error: 'amount must be an integer in paise, minimum 100.' },
      { status: 400 },
    );
  }
  const currency = typeof body.currency === 'string' && body.currency ? body.currency : 'INR';
  const receipt =
    typeof body.receipt === 'string' && body.receipt
      ? body.receipt.slice(0, 40)
      : `naipunya_${Date.now()}`;

  try {
    const rzp = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await rzp.orders.create({ amount, currency, receipt });
    return NextResponse.json({ order_id: order.id, amount: order.amount, currency: order.currency });
  } catch (err: unknown) {
    const e = err as { statusCode?: number; error?: { description?: string } };
    if (e?.statusCode === 401) {
      return NextResponse.json({ error: 'Payment gateway authentication failed.' }, { status: 401 });
    }
    return NextResponse.json(
      { error: e?.error?.description || 'Could not create the payment order.' },
      { status: 500 },
    );
  }
}
