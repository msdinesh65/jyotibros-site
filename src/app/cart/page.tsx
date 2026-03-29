'use client';

import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { CartItem } from '../cart-context';
import { useCart } from '../cart-context';
import { parseRupeeFromDisplay } from '@/lib/cart-price';

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, fn: (response: unknown) => void) => void;
    };
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
      existing.addEventListener('error', () => reject(new Error('script')));
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('script'));
    document.body.appendChild(script);
  });
}

function unitRupee(item: CartItem): number {
  return item.unitPrice ?? parseRupeeFromDisplay(item.price);
}

function lineMrpRupee(item: CartItem): number {
  const u = unitRupee(item);
  const mrp = item.originalPrice && item.originalPrice > u ? item.originalPrice : u;
  return mrp * item.quantity;
}

function lineSaleRupee(item: CartItem): number {
  return unitRupee(item) * item.quantity;
}

function itemsPayload(items: CartItem[]) {
  return items.map((i) => ({
    slug: i.slug,
    name: i.name,
    image: i.image,
    quantity: i.quantity,
    unitPrice: unitRupee(i),
    originalPrice:
      i.originalPrice && i.originalPrice > unitRupee(i)
        ? i.originalPrice
        : undefined,
    discountPercent: i.discountPercent
  }));
}

export default function CartPage() {
  const { data: session, status: sessionStatus } = useSession();
  const { items, clearCart, adjustLineQuantity, removeLine } = useCart();
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [shippingLine1, setShippingLine1] = useState('');
  const [shippingLine2, setShippingLine2] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingState, setShippingState] = useState('');
  const [shippingPincode, setShippingPincode] = useState('');

  useEffect(() => {
    if (sessionStatus !== 'authenticated') return;
    let cancelled = false;
    (async () => {
      const res = await fetch('/api/me/address');
      if (!res.ok || cancelled) return;
      const data = await res.json();
      setCustomerName((n) => n || data.name || '');
      setCustomerEmail((e) => e || data.email || '');
      setCustomerPhone((p) => p || data.phone || '');
      if (data.address) {
        setShippingLine1((l) => l || data.address.shippingLine1 || '');
        setShippingLine2((l) => l || data.address.shippingLine2 || '');
        setShippingCity((c) => c || data.address.shippingCity || '');
        setShippingState((s) => s || data.address.shippingState || '');
        setShippingPincode((z) => z || data.address.shippingPincode || '');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [sessionStatus]);

  const hasItems = items.length > 0;

  const { mrpTotal, saleTotal, discountTotal } = useMemo(() => {
    let mrp = 0;
    let sale = 0;
    for (const item of items) {
      mrp += lineMrpRupee(item);
      sale += lineSaleRupee(item);
    }
    return {
      mrpTotal: mrp,
      saleTotal: sale,
      discountTotal: Math.max(0, mrp - sale)
    };
  }, [items]);

  const shippingPayload = useCallback(
    () => ({
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      customerPhone: customerPhone.trim(),
      shippingLine1: shippingLine1.trim(),
      shippingLine2: shippingLine2.trim() || undefined,
      shippingCity: shippingCity.trim(),
      shippingState: shippingState.trim(),
      shippingPincode: shippingPincode.trim()
    }),
    [
      customerName,
      customerEmail,
      customerPhone,
      shippingLine1,
      shippingLine2,
      shippingCity,
      shippingState,
      shippingPincode
    ]
  );

  const validateShipping = useCallback(() => {
    const p = shippingPayload();
    if (!p.customerName) return 'Please enter your full name.';
    if (!p.customerEmail.includes('@')) return 'Please enter a valid email.';
    if (p.customerPhone.replace(/\D/g, '').length < 10) {
      return 'Please enter a valid 10-digit mobile number.';
    }
    if (!p.shippingLine1) return 'Please enter address line 1.';
    if (!p.shippingCity) return 'Please enter city.';
    if (!p.shippingState) return 'Please enter state.';
    if (!/^[0-9]{6}$/.test(p.shippingPincode)) {
      return 'Please enter a 6-digit PIN code.';
    }
    return null;
  }, [shippingPayload]);

  const handleCodSubmit = useCallback(async () => {
    if (!hasItems || saleTotal <= 0) return;
    setCheckoutError(null);
    setSuccessMessage(null);
    const v = validateShipping();
    if (v) {
      setCheckoutError(v);
      return;
    }
    setBusy(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod: 'cod',
          shipping: shippingPayload(),
          items: itemsPayload(items)
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setCheckoutError(
          typeof data.error === 'string'
            ? data.error
            : 'Could not place order. Try again.'
        );
        return;
      }
      setSuccessMessage(
        `Order placed — ID ${data.orderId}. Pay cash on delivery.`
      );
      if (session?.user) {
        const p = shippingPayload();
        void fetch('/api/me/address', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: p.customerName,
            phone: p.customerPhone,
            shippingLine1: p.shippingLine1,
            shippingLine2: p.shippingLine2,
            shippingCity: p.shippingCity,
            shippingState: p.shippingState,
            shippingPincode: p.shippingPincode
          })
        }).catch(() => {});
      }
      clearCart();
    } catch {
      setCheckoutError('Network error. Try again.');
    } finally {
      setBusy(false);
    }
  }, [
    clearCart,
    hasItems,
    items,
    saleTotal,
    session?.user,
    shippingPayload,
    validateShipping
  ]);

  const handleOnlinePay = useCallback(async () => {
    if (!hasItems || saleTotal <= 0) return;
    setCheckoutError(null);
    setSuccessMessage(null);
    const v = validateShipping();
    if (v) {
      setCheckoutError(v);
      return;
    }
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
      setCheckoutError(
        'Missing NEXT_PUBLIC_RAZORPAY_KEY_ID in .env.local (same as RAZORPAY_KEY_ID).'
      );
      return;
    }
    setBusy(true);
    try {
      await loadRazorpayCheckout();
    } catch {
      setCheckoutError('Could not load Razorpay checkout.');
      setBusy(false);
      return;
    }

    let prepare: Response;
    try {
      prepare = await fetch('/api/checkout/prepare-online', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shipping: shippingPayload(),
          items: itemsPayload(items)
        })
      });
    } catch {
      setCheckoutError('Network error.');
      setBusy(false);
      return;
    }

    const prepData = await prepare.json().catch(() => ({}));
    if (!prepare.ok) {
      setCheckoutError(
        typeof prepData.error === 'string'
          ? prepData.error
          : 'Could not start payment.'
      );
      setBusy(false);
      return;
    }

    const internalOrderId = prepData.orderId as string;
    const { razorpayOrderId, amount, currency } = prepData as {
      razorpayOrderId: string;
      amount: number;
      currency: string;
    };

    const phoneDigits = customerPhone.replace(/\D/g, '').slice(-10);

    const options: Record<string, unknown> = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount,
      currency,
      name: 'Jyoti & Bros',
      description: 'Order payment',
      order_id: razorpayOrderId,
      prefill: {
        name: customerName.trim(),
        email: customerEmail.trim(),
        contact: phoneDigits
      },
      theme: { color: '#f97316' },
      handler: async (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) => {
        const verify = await fetch('/api/checkout/verify-online', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: internalOrderId,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          })
        });
        const vData = await verify.json().catch(() => ({}));
        if (!verify.ok) {
          setCheckoutError(
            typeof vData.error === 'string'
              ? vData.error
              : 'Payment verification failed. Contact support with your payment ID.'
          );
          setBusy(false);
          return;
        }
        setSuccessMessage(
          `Payment successful — order ${internalOrderId}. Thank you!`
        );
        if (session?.user) {
          const p = shippingPayload();
          void fetch('/api/me/address', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: p.customerName,
              phone: p.customerPhone,
              shippingLine1: p.shippingLine1,
              shippingLine2: p.shippingLine2,
              shippingCity: p.shippingCity,
              shippingState: p.shippingState,
              shippingPincode: p.shippingPincode
            })
          }).catch(() => {});
        }
        clearCart();
        setBusy(false);
      },
      modal: {
        ondismiss: () => setBusy(false)
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
      setCheckoutError(err);
      setBusy(false);
    });
    rz.open();
  }, [
    clearCart,
    customerEmail,
    customerName,
    customerPhone,
    hasItems,
    items,
    saleTotal,
    session?.user,
    shippingPayload,
    validateShipping
  ]);

  const onPayClick = useCallback(() => {
    if (paymentMethod === 'cod') void handleCodSubmit();
    else void handleOnlinePay();
  }, [handleCodSubmit, handleOnlinePay, paymentMethod]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
        Shopping Cart
      </h1>

      {!hasItems && !successMessage ? (
        <div className="card p-6 text-sm text-slate-600 space-y-3">
          <p>Your cart is currently empty.</p>
          <Link href="/latest-collections" className="primary-button w-fit">
            Browse collections
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[2fr,1fr] items-start">
          {!hasItems && successMessage ? (
            <div className="card p-6 text-sm text-slate-600 space-y-2">
              <p className="font-medium text-slate-800">Order received</p>
              <p>
                We&apos;ve recorded your order. You can keep shopping or check
                your email for updates when you connect notifications.
              </p>
            </div>
          ) : hasItems ? (
            <div className="space-y-4">
              {items.map((item) => {
                const unit = unitRupee(item);
                const showStrike =
                  item.originalPrice != null && item.originalPrice > unit;
                return (
                  <div
                    key={item.slug}
                    className="card flex gap-4 p-4 items-start sm:items-center"
                  >
                    <div className="relative h-20 w-16 rounded-md overflow-hidden bg-slate-100 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 line-clamp-2">
                        {item.name}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] text-slate-500 uppercase tracking-wide">
                          Qty
                        </span>
                        <div
                          className="inline-flex items-center rounded-full border border-slate-200 bg-white shadow-sm"
                          role="group"
                          aria-label="Quantity"
                        >
                          <button
                            type="button"
                            className="px-2.5 py-1 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 rounded-l-full"
                            aria-label="Decrease quantity"
                            onClick={() => adjustLineQuantity(item.slug, -1)}
                          >
                            −
                          </button>
                          <span className="min-w-[2rem] text-center text-sm font-semibold tabular-nums text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="px-2.5 py-1 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 rounded-r-full"
                            aria-label="Increase quantity"
                            disabled={item.quantity >= 99}
                            onClick={() => adjustLineQuantity(item.slug, 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="text-[11px] font-medium text-slate-500 hover:text-rose-600 underline underline-offset-2"
                          onClick={() => removeLine(item.slug)}
                        >
                          Remove
                        </button>
                      </div>
                      {showStrike && item.discountPercent != null ? (
                        <p className="text-[11px] text-emerald-700 font-medium">
                          {item.discountPercent}% off MRP
                        </p>
                      ) : null}
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-semibold text-slate-900">
                        ₹{lineSaleRupee(item).toLocaleString('en-IN')}
                      </div>
                      {showStrike ? (
                        <div className="text-xs text-slate-400 line-through">
                          ₹{lineMrpRupee(item).toLocaleString('en-IN')}
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}

          <aside className="card p-5 space-y-4 lg:sticky lg:top-24">
            <h2 className="text-sm font-semibold text-slate-900">
              Order summary
            </h2>
            {hasItems ? (
              <>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">MRP total</span>
                  <span className="text-slate-700 line-through">
                    ₹{mrpTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {discountTotal > 0 ? (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Discount</span>
                    <span className="font-medium text-emerald-700">
                      − ₹{discountTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                ) : null}
                <div className="flex items-center justify-between text-sm border-t border-slate-100 pt-3">
                  <span className="font-medium text-slate-800">Total</span>
                  <span className="text-lg font-semibold text-slate-900">
                    ₹{saleTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Discounts come from catalog sale prices vs MRP. Totals are
                  rechecked on the server when you place the order.
                </p>
              </>
            ) : null}

            {successMessage ? (
              <p className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
                {successMessage}
              </p>
            ) : null}

            {hasItems ? (
              <>
                <div className="border-t border-slate-100 pt-4 space-y-3">
                  <p className="text-xs font-semibold text-slate-800">
                    Delivery details
                  </p>
                  {session?.user ? (
                    <p className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-100/80 rounded-lg px-2.5 py-2">
                      You&apos;re signed in — we prefill from your account. Your
                      saved address updates when you complete an order.
                    </p>
                  ) : (
                    <p className="text-[11px] text-slate-500">
                      <Link
                        href="/auth/login?callbackUrl=/cart"
                        className="font-medium text-brand-600 hover:text-brand-700"
                      >
                        Log in
                      </Link>{' '}
                      to reuse saved name, phone, and address next time.
                    </p>
                  )}
                  <input
                    type="text"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    placeholder="Full name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    autoComplete="name"
                  />
                  <input
                    type="email"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    placeholder="Email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    autoComplete="email"
                  />
                  <input
                    type="tel"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    placeholder="Mobile (10 digits)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    autoComplete="tel"
                  />
                  <input
                    type="text"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    placeholder="Address line 1"
                    value={shippingLine1}
                    onChange={(e) => setShippingLine1(e.target.value)}
                    autoComplete="street-address"
                  />
                  <input
                    type="text"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    placeholder="Address line 2 (optional)"
                    value={shippingLine2}
                    onChange={(e) => setShippingLine2(e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                      placeholder="City"
                      value={shippingCity}
                      onChange={(e) => setShippingCity(e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                      placeholder="State"
                      value={shippingState}
                      onChange={(e) => setShippingState(e.target.value)}
                    />
                  </div>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    placeholder="PIN code (6 digits)"
                    value={shippingPincode}
                    onChange={(e) =>
                      setShippingPincode(e.target.value.replace(/\D/g, '').slice(0, 6))
                    }
                    inputMode="numeric"
                    autoComplete="postal-code"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-800">
                    Payment method
                  </p>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="pay"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    Cash on delivery
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="pay"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                    />
                    Pay online (Razorpay — card, UPI, netbanking)
                  </label>
                </div>

                {checkoutError ? (
                  <p
                    className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2"
                    role="alert"
                  >
                    {checkoutError}
                  </p>
                ) : null}

                <button
                  type="button"
                  className="primary-button w-full"
                  onClick={onPayClick}
                  disabled={!hasItems || saleTotal <= 0 || busy}
                >
                  {busy
                    ? 'Please wait…'
                    : paymentMethod === 'cod'
                      ? 'Place order (COD)'
                      : 'Pay securely with Razorpay'}
                </button>
              </>
            ) : (
              <Link href="/latest-collections" className="primary-button w-full block text-center">
                Continue shopping
              </Link>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
