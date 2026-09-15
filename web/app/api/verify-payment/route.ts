import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Razorpay signature verification: HMAC-SHA256(order_id + "|" + payment_id)
// with the key secret. A mismatch means the callback did not come from
// Razorpay for this order — never mark it paid.
//
// Fulfilment note: on success this is where the module link issuance will hook
// in later (WhatsApp dispatch via the existing pipeline). No database tables
// are created here by design — the site has none today.
export async function POST(req: NextRequest) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json({ ok: false, error: 'Payment gateway is not configured.' }, { status: 500 });
  }

  let body: {
    razorpay_order_id?: unknown;
    razorpay_payment_id?: unknown;
    razorpay_signature?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const orderId = body.razorpay_order_id;
  const paymentId = body.razorpay_payment_id;
  const signature = body.razorpay_signature;
  if (
    typeof orderId !== 'string' || !orderId ||
    typeof paymentId !== 'string' || !paymentId ||
    typeof signature !== 'string' || !signature
  ) {
    return NextResponse.json(
      { ok: false, error: 'razorpay_order_id, razorpay_payment_id and razorpay_signature are required.' },
      { status: 400 },
    );
  }

  const expected = crypto
    .createHmac('sha256', keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(signature, 'utf8');
  const match = a.length === b.length && crypto.timingSafeEqual(a, b);

  if (!match) {
    return NextResponse.json({ ok: false, error: 'Signature verification failed.' }, { status: 400 });
  }
  return NextResponse.json({ ok: true, payment_id: paymentId, order_id: orderId });
}
