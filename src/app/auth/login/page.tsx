'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/cart';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const res = await signIn('credentials', {
      email: email.trim().toLowerCase(),
      password,
      redirect: false
    });
    setBusy(false);
    if (res?.error) {
      setError('Invalid email or password.');
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
          Log in
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Sign in to reuse your saved delivery details at checkout.
        </p>
      </div>

      <form onSubmit={onSubmit} className="card p-6 space-y-4">
        {error ? (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </p>
        ) : null}
        <div>
          <label
            htmlFor="login-email"
            className="block text-xs font-medium text-slate-700 mb-1"
          >
            Email
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="login-password"
            className="block text-xs font-medium text-slate-700 mb-1"
          >
            Password
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="primary-button w-full" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-600">
        No account?{' '}
        <Link
          href="/auth/register"
          className="text-brand-600 font-medium hover:text-brand-700"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-md mx-auto text-sm text-slate-600">Loading…</div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
