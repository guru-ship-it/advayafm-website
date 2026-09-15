'use client';

import { useCallback, useState } from 'react';

// Razorpay Standard Web Checkout button.
// Flow: create-order on our backend -> open the Razorpay modal -> send the
// three callback fields to verify-payment -> show the outcome. The key secret
// never reaches this file; only NEXT_PUBLIC_RAZORPAY_KEY_ID is exposed.

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, cb: (resp: RazorpayFailure) => void) => void;
    };
  }
}

interface RazorpayFailure {
  error?: { description?: string; reason?: string };
}

interface Props {
  amountPaise: number;
  label: string;
  description: string;
  className?: string;
}

type Status = 'idle' | 'loading' | 'verifying' | 'success' | 'cancelled' | 'failed';

let scriptPromise: Promise<boolean> | null = null;
function loadCheckoutScript(): Promise<boolean> {
  if (window.Razorpay) return Promise.resolve(true);
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve) => {
      const s = document.createElement('script');
      s.src = 'https://checkout.razorpay.com/v1/checkout.js';
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.appendChild(s);
    });
  }
  return scriptPromise;
}

export default function RazorpayCheckout({ amountPaise, label, description, className }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const pay = useCallback(async () => {
    setStatus('loading');
    setMessage('');

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!keyId) {
      setStatus('failed');
      setMessage('Payment is not configured. Please use the WhatsApp option.');
      return;
    }

    const loaded = await loadCheckoutScript();
    if (!loaded || !window.Razorpay) {
      setStatus('failed');
      setMessage('Could not load the payment window. Please check your connection and retry.');
      return;
    }

    let order: { order_id?: string; amount?: number; currency?: string; error?: string };
    try {
      const r = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountPaise, currency: 'INR' }),
      });
      order = await r.json();
      if (!r.ok || !order.order_id) throw new Error(order.error || 'Order creation failed.');
    } catch (e) {
      setStatus('failed');
      setMessage(e instanceof Error ? e.message : 'Could not start the payment. Please retry.');
      return;
    }

    const rzp = new window.Razorpay({
      key: keyId,
      order_id: order.order_id,
      amount: order.amount,
      currency: order.currency,
      name: 'D Advaya naipuNya',
      description,
      theme: { color: '#c9a227' },
      modal: {
        ondismiss: () => {
          setStatus('cancelled');
          setMessage('Payment cancelled. You can retry whenever you are ready.');
        },
      },
      handler: async (resp: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) => {
        setStatus('verifying');
        try {
          const v = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resp),
          });
          const out = await v.json();
          if (v.ok && out.ok) {
            setStatus('success');
            setMessage('Payment received. We will set up your module on WhatsApp shortly.');
          } else {
            setStatus('failed');
            setMessage('Payment could not be verified. If money was deducted it will auto-refund; kindly contact us on WhatsApp.');
          }
        } catch {
          setStatus('failed');
          setMessage('Payment verification did not complete. Kindly contact us on WhatsApp with your payment ID.');
        }
      },
    });
    rzp.on('payment.failed', (resp: RazorpayFailure) => {
      setStatus('failed');
      setMessage(resp?.error?.description || 'Payment failed. No money has moved; please retry.');
    });
    setStatus('idle');
    rzp.open();
  }, [amountPaise, description]);

  return (
    <div className="inline-flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={pay}
        disabled={status === 'loading' || status === 'verifying'}
        className={className}
      >
        {status === 'loading' ? 'Preparing…' : status === 'verifying' ? 'Verifying…' : label}
      </button>
      {message && (
        <p
          className={`max-w-xs text-center text-xs ${
            status === 'success' ? 'text-green-400' : status === 'failed' ? 'text-red-400' : 'text-navy-300'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
