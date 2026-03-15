'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../cart-context';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CartPage() {
  const { items } = useCart();
  const hasItems = items.length > 0;
  const total = items.reduce((sum, item) => {
    const numeric = Number(item.price.replace(/[^0-9.]/g, ''));
    return sum + (Number.isNaN(numeric) ? 0 : numeric * item.quantity);
  }, 0);

  const handleCheckout = useCallback(async () => {
    if (!hasItems || total <= 0) return;

    // Lazy-load Razorpay checkout script if it isn't already present
    if (typeof window !== 'undefined' && !window.Razorpay) {
      await new Promise<void>((resolve, reject) => {
        const existing = document.querySelector<HTMLScriptElement>(
          'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
        );
        if (existing) {
          existing.addEventListener('load', () => resolve());
          existing.addEventListener('error', () => reject());
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.body.appendChild(script);
      });
    }

    const amountInPaise = Math.round(total * 100);

    const response = await fetch('/api/razorpay-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amountInPaise,
        receiptId: `cart-${Date.now()}`
      })
    });

    if (!response.ok) {
      // In production, show a toast or message to the user
      console.error('Failed to create Razorpay order');
      return;
    }

    const { orderId, amount, currency } = await response.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount,
      currency,
      name: 'Jyoti & Brothers',
      description: 'Cart payment',
      order_id: orderId,
      prefill: {
        name: '',
        email: '',
        contact: ''
      },
      theme: {
        color: '#f97316'
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }, [hasItems, total]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
        Shopping Cart
      </h1>

      {!hasItems ? (
        <div className="card p-6 text-sm text-slate-600 space-y-3">
          <p>Your cart is currently empty.</p>
          <Link href="/latest-collections" className="primary-button w-fit">
            Browse collections
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[2fr,1fr] items-start">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.slug}
                className="card flex gap-4 p-4 items-center"
              >
                <div className="relative h-20 w-16 rounded-md overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold text-slate-900 line-clamp-2">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    Qty: {item.quantity}
                  </p>
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  {item.price}
                </div>
              </div>
            ))}
          </div>

          <aside className="card p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-900">
              Order Summary
            </h2>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-semibold text-slate-900">
                ₹{total.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              You are in test mode. Razorpay checkout will use your test API
              keys. Replace them with live keys before taking real payments.
            </p>
            <button
              type="button"
              className="primary-button w-full"
              onClick={handleCheckout}
              disabled={!hasItems || total <= 0}
            >
              Pay securely with Razorpay
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}

