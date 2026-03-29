'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';

type RazorpayInstance = {
  open: () => void;
  on: (event: string, fn: (response: unknown) => void) => void;
};

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

function loadRazorpayCheckout(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.Razorpay) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Razorpay script failed')));
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Razorpay script failed'));
    document.body.appendChild(script);
  });
}

export default function PaymentDemoPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [amountRupees, setAmountRupees] = useState('100');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successNote, setSuccessNote] = useState<string | null>(null);

  const pay = useCallback(async () => {
    setError(null);
    setSuccessNote(null);

    const rupees = Number(amountRupees);
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    if (!contact.trim() || contact.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!Number.isFinite(rupees) || rupees < 1) {
      setError('Amount must be at least ₹1.');
      return;
    }

    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
      setError(
        'Missing NEXT_PUBLIC_RAZORPAY_KEY_ID in .env.local. See .env.example.'
      );
      return;
    }

    setBusy(true);
    try {
      await loadRazorpayCheckout();
    } catch {
      setError('Could not load Razorpay. Check your network and try again.');
      setBusy(false);
      return;
    }

    const amountInPaise = Math.round(rupees * 100);
    const response = await fetch('/api/razorpay-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amountInPaise,
        receiptId: `demo-${Date.now()}`
      })
    });

    if (!response.ok) {
      let message = 'Could not start payment.';
      try {
        const data = await response.json();
        if (data?.error && typeof data.error === 'string') message = data.error;
      } catch {
        /* ignore */
      }
      setError(message);
      setBusy(false);
      return;
    }

    const { orderId, amount, currency } = await response.json();

    const options: Record<string, unknown> = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount,
      currency,
      name: 'Jyoti & Bros',
      description: 'Sample payment (demo page)',
      order_id: orderId,
      prefill: {
        name: name.trim(),
        email: email.trim(),
        contact: contact.replace(/\D/g, '').slice(-10)
      },
      theme: { color: '#f97316' },
      handler(response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) {
        setSuccessNote(
          `Payment completed (demo UI only). Payment ID: ${response.razorpay_payment_id}. In production, verify the signature on your server or use webhooks — never trust the client alone.`
        );
        setBusy(false);
      },
      modal: {
        ondismiss() {
          setBusy(false);
        }
      }
    };

    const rz = new window.Razorpay(options);
    rz.on('payment.failed', (response: unknown) => {
      const err =
        response &&
        typeof response === 'object' &&
        'error' in response &&
        response.error &&
        typeof response.error === 'object' &&
        'description' in response.error &&
        typeof (response.error as { description?: string }).description ===
          'string'
          ? (response.error as { description: string }).description
          : 'Payment failed.';
      setError(err);
      setBusy(false);
    });
    rz.open();
  }, [amountRupees, contact, email, name]);

  return (
    <div className="page-container py-10 max-w-lg mx-auto space-y-6">
      <div>
        <p className="badge-soft w-fit mb-2">Sample only</p>
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
          Razorpay payment form (demo)
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Your page collects billing details; UPI, cards, and netbanking appear
          inside Razorpay&apos;s secure checkout window — you never handle card
          numbers on your site.{' '}
          <a
            href="https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration/"
            className="text-brand-600 underline underline-offset-2 hover:text-brand-700"
            target="_blank"
            rel="noreferrer"
          >
            Razorpay Standard Checkout docs
          </a>
        </p>
      </div>

      <form
        className="card p-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          pay();
        }}
      >
        <div>
          <label
            htmlFor="demo-name"
            className="block text-xs font-medium text-slate-700 mb-1"
          >
            Full name
          </label>
          <input
            id="demo-name"
            type="text"
            autoComplete="name"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-400 focus:ring-1 focus:ring-brand-400 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Priya Sharma"
          />
        </div>
        <div>
          <label
            htmlFor="demo-email"
            className="block text-xs font-medium text-slate-700 mb-1"
          >
            Email
          </label>
          <input
            id="demo-email"
            type="email"
            autoComplete="email"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-400 focus:ring-1 focus:ring-brand-400 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="demo-phone"
            className="block text-xs font-medium text-slate-700 mb-1"
          >
            Mobile
          </label>
          <input
            id="demo-phone"
            type="tel"
            autoComplete="tel"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-400 focus:ring-1 focus:ring-brand-400 outline-none"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="9876543210"
          />
        </div>
        <div>
          <label
            htmlFor="demo-amount"
            className="block text-xs font-medium text-slate-700 mb-1"
          >
            Amount (INR)
          </label>
          <input
            id="demo-amount"
            type="number"
            min={1}
            step={1}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-400 focus:ring-1 focus:ring-brand-400 outline-none"
            value={amountRupees}
            onChange={(e) => setAmountRupees(e.target.value)}
          />
        </div>

        {error ? (
          <p
            className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2"
            role="alert"
          >
            {error}
          </p>
        ) : null}
        {successNote ? (
          <p className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
            {successNote}
          </p>
        ) : null}

        <button
          type="submit"
          className="primary-button w-full"
          disabled={busy}
        >
          {busy ? 'Opening…' : 'Pay with Razorpay'}
        </button>
      </form>

      <p className="text-center text-sm">
        <Link href="/cart" className="text-brand-600 hover:text-brand-700">
          ← Back to cart
        </Link>
      </p>
    </div>
  );
}
