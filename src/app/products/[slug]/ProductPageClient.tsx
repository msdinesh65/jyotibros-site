'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../cart-context';
import type { Product } from '../../../data/catalog';

type Props = {
  product: Product;
  activeColorId?: string;
};

export function ProductPageClient({ product, activeColorId }: Props) {
  const { addToCart } = useCart();

  const variants = product.variants;
  const activeVariant =
    variants.find((v) => v.id === activeColorId) ?? variants[0];
  const inStock = activeVariant?.stock && activeVariant.stock > 0;

  const handleAddToCart = () => {
    if (!inStock) return;
    addToCart({
      slug: `${product.slug}?color=${activeVariant?.id ?? 'default'}`,
      name: `${product.title}${
        activeVariant?.label ? ` – ${activeVariant.label}` : ''
      }`,
      price: `₹${product.price.toLocaleString('en-IN')}`,
      image: activeVariant?.image ?? product.variants[0]?.image
    });
  };

  return (
    <div className="space-y-8">
      <nav className="text-xs text-slate-500">
        <Link href="/" className="hover:text-brand-600">
          Home
        </Link>
        <span className="mx-1">/</span>
        <Link href="/latest-collections" className="hover:text-brand-600">
          New Arrival
        </Link>
        <span className="mx-1">/</span>
        <span className="text-slate-700 line-clamp-1">{product.title}</span>
      </nav>

      <section className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] items-start">
        <div className="space-y-3">
          <div className="card overflow-hidden">
            <div className="relative aspect-[4/5] bg-slate-100">
              <Image
                src={activeVariant?.image ?? product.variants[0]?.image}
                alt={product.title}
                fill
                className="object-cover"
              />
              <div className="absolute left-3 top-3 badge-soft bg-white/90 text-brand-700">
                {product.badge}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {product.isNewArrival ? 'New Arrival · ' : ''}
              {product.category}
            </p>
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
              {product.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold text-brand-600">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {product.badge && (
              <span className="badge-soft">{product.badge} OFF</span>
            )}
          </div>

          <p
            className={`text-xs font-medium ${
              inStock ? 'text-emerald-700' : 'text-red-600'
            }`}
          >
            {inStock
              ? `In stock: ${activeVariant?.stock} piece${
                  activeVariant && activeVariant.stock === 1 ? '' : 's'
                }`
              : 'Currently out of stock'}
          </p>

          <p className="text-sm text-slate-700 leading-relaxed">
            {product.description}
          </p>

          <ul className="space-y-2 text-sm text-slate-700">
            {product.details.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {variants.length > 1 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-600">
                Available colors:
              </p>
              <div className="flex flex-wrap gap-2">
                {variants.map((variant) => (
                  <Link
                    key={variant.id}
                    href={`/products/${product.slug}?color=${variant.id}`}
                    className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition ${
                      variant.id === activeVariant?.id
                        ? 'border-brand-500 bg-brand-50 text-brand-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:text-brand-700'
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        variant.colorDotClass ?? 'bg-slate-400'
                      }`}
                    />
                    <span>{variant.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!inStock}
              className="primary-button w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
            >
              {inStock ? 'Add to cart' : 'Out of stock'}
            </button>
            <p className="text-[11px] text-slate-500">
              This is a demo product page. Connect it to your actual inventory
              or ecommerce platform to enable real ordering.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

