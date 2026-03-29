'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export function AuthNav() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <span className="inline w-6 text-[10px] text-slate-400" aria-hidden>
        …
      </span>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px]">
        <Link
          href="/account"
          className="font-medium text-slate-700 hover:text-brand-600 max-w-[6rem] truncate"
          title={session.user.email ?? ''}
        >
          Account
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: '/' })}
          className="text-slate-500 hover:text-slate-800"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/auth/login"
      className="text-[10px] font-medium text-slate-700 hover:text-brand-600 sm:text-[11px]"
    >
      Log in
    </Link>
  );
}
