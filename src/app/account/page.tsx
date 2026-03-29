'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [shippingLine1, setShippingLine1] = useState('');
  const [shippingLine2, setShippingLine2] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingState, setShippingState] = useState('');
  const [shippingPincode, setShippingPincode] = useState('');
  const [emailDisplay, setEmailDisplay] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/auth/login?callbackUrl=/account');
    }
  }, [status, router]);

  const load = useCallback(async () => {
    const res = await fetch('/api/me/address');
    if (!res.ok) return;
    const data = await res.json();
    setEmailDisplay(data.email ?? '');
    setName(data.name ?? '');
    setPhone(data.phone ?? '');
    if (data.address) {
      setShippingLine1(data.address.shippingLine1 ?? '');
      setShippingLine2(data.address.shippingLine2 ?? '');
      setShippingCity(data.address.shippingCity ?? '');
      setShippingState(data.address.shippingState ?? '');
      setShippingPincode(data.address.shippingPincode ?? '');
    }
  }, []);

  useEffect(() => {
    if (status === 'authenticated') void load();
  }, [status, load]);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setBusy(true);
    const res = await fetch('/api/me/address', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        phone: phone.trim(),
        shippingLine1: shippingLine1.trim(),
        shippingLine2: shippingLine2.trim() || undefined,
        shippingCity: shippingCity.trim(),
        shippingState: shippingState.trim(),
        shippingPincode: shippingPincode.trim()
      })
    });
    setBusy(false);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(typeof data.error === 'string' ? data.error : 'Could not save.');
      return;
    }
    setMessage('Saved.');
  }

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="max-w-lg mx-auto text-sm text-slate-600">Loading…</div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
            Your account
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Signed in as{' '}
            <span className="font-medium text-slate-800">{emailDisplay}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: '/' })}
          className="text-sm text-slate-600 hover:text-slate-900 underline"
        >
          Sign out
        </button>
      </div>

      <form onSubmit={onSave} className="card p-6 space-y-4">
        <p className="text-sm text-slate-600">
          We use this name, phone, and address to prefill checkout. Card and UPI
          details are still entered securely with Razorpay each time — we never
          store those.
        </p>
        {message ? (
          <p className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
            {message}
          </p>
        ) : null}
        {error ? (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </p>
        ) : null}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Full name
          </label>
          <input
            type="text"
            required
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Mobile
          </label>
          <input
            type="tel"
            required
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Address line 1
          </label>
          <input
            type="text"
            required
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={shippingLine1}
            onChange={(e) => setShippingLine1(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Address line 2 (optional)
          </label>
          <input
            type="text"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={shippingLine2}
            onChange={(e) => setShippingLine2(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              City
            </label>
            <input
              type="text"
              required
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              value={shippingCity}
              onChange={(e) => setShippingCity(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              State
            </label>
            <input
              type="text"
              required
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              value={shippingState}
              onChange={(e) => setShippingState(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            PIN code
          </label>
          <input
            type="text"
            required
            inputMode="numeric"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={shippingPincode}
            onChange={(e) =>
              setShippingPincode(e.target.value.replace(/\D/g, '').slice(0, 6))
            }
          />
        </div>
        <button type="submit" className="primary-button w-full" disabled={busy}>
          {busy ? 'Saving…' : 'Save details'}
        </button>
      </form>

      <p className="text-center text-sm">
        <Link href="/cart" className="text-brand-600 hover:text-brand-700">
          Go to cart
        </Link>
      </p>
    </div>
  );
}
