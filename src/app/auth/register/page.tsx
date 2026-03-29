'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || undefined,
        password
      })
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(
        typeof data.error === 'string' ? data.error : 'Could not register.'
      );
      setBusy(false);
      return;
    }

    const sign = await signIn('credentials', {
      email: email.trim().toLowerCase(),
      password,
      redirect: false
    });
    setBusy(false);
    if (sign?.error) {
      router.push('/auth/login');
      return;
    }
    router.push('/account');
    router.refresh();
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
          Create account
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Save your delivery address once and use it on every order. Password
          must be at least 8 characters.
        </p>
      </div>

      <form onSubmit={onSubmit} className="card p-6 space-y-4">
        {error ? (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </p>
        ) : null}
        <div>
          <label htmlFor="reg-name" className="block text-xs font-medium text-slate-700 mb-1">
            Full name
          </label>
          <input
            id="reg-name"
            type="text"
            autoComplete="name"
            required
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="reg-email" className="block text-xs font-medium text-slate-700 mb-1">
            Email
          </label>
          <input
            id="reg-email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="reg-phone" className="block text-xs font-medium text-slate-700 mb-1">
            Mobile (optional)
          </label>
          <input
            id="reg-phone"
            type="tel"
            autoComplete="tel"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="reg-password" className="block text-xs font-medium text-slate-700 mb-1">
            Password
          </label>
          <input
            id="reg-password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="primary-button w-full" disabled={busy}>
          {busy ? 'Creating…' : 'Create account'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-600">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-brand-600 font-medium hover:text-brand-700">
          Log in
        </Link>
      </p>
    </div>
  );
}
