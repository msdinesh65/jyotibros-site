'use client';

import Link from 'next/link';
import { useCart } from './cart-context';

export function CartStatus() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link
      href="/cart"
      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 px-2 py-1 text-[10px] font-medium text-slate-700 hover:border-brand-500 hover:text-brand-700 sm:text-[11px]"
    >
      <span>Cart</span>
      {itemCount > 0 && (
        <span className="inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-brand-600 px-0.5 text-[9px] font-semibold text-white sm:h-[1.125rem] sm:min-w-[1.125rem] sm:text-[10px]">
          {itemCount}
        </span>
      )}
    </Link>
  );
}

