'use client';

import { useCart } from '../cart-context';
import type { Product } from '../../data/catalog';

function computeDiscountPercent(price: number, original?: number) {
  if (!original || original <= price) return undefined;
  return Math.round((1 - price / original) * 100);
}

export function AddToCartFromProduct({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const variant =
    product.variants.find((v) => v.stock > 0) ?? product.variants[0];
  const inStock = Boolean(variant?.stock && variant.stock > 0);

  return (
    <button
      type="button"
      disabled={!inStock}
      onClick={() => {
        if (!inStock || !variant) return;
        addToCart({
          slug: `${product.slug}?color=${variant.id}`,
          name: `${product.title}${
            variant.label ? ` – ${variant.label}` : ''
          }`,
          price: `₹${product.price.toLocaleString('en-IN')}`,
          unitPrice: product.price,
          originalPrice: product.originalPrice,
          discountPercent: computeDiscountPercent(
            product.price,
            product.originalPrice
          ),
          image: variant.image
        });
      }}
      className="mt-3 w-full primary-button text-xs justify-center disabled:cursor-not-allowed disabled:opacity-60"
    >
      {inStock ? 'Add to cart' : 'Out of stock'}
    </button>
  );
}
