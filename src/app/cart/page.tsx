'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../cart-context';

export default function CartPage() {
  const { items } = useCart();
  const hasItems = items.length > 0;
  const total = items.reduce((sum, item) => {
    const numeric = Number(item.price.replace(/[^0-9.]/g, ''));
    return sum + (Number.isNaN(numeric) ? 0 : numeric * item.quantity);
  }, 0);

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
              This is a demo cart for Jyoti &amp; Bros. Connect it to your
              payment gateway and backend to accept real orders.
            </p>
            <button className="primary-button w-full" disabled>
              Proceed to checkout (demo)
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}

