'use client';

import Link from 'next/link';
import { useCart } from './cart-context';

export function CartStatus() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link
      href="/cart"
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:border-brand-500 hover:text-brand-700 bg-white/70"
    >
      <span>Cart</span>
      {itemCount > 0 && (
        <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-600 px-1 text-[11px] font-semibold text-white">
          {itemCount}
        </span>
      )}
    </Link>
  );
}

