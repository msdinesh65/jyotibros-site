import Image from 'next/image';
import Link from 'next/link';
import { catalog } from '../../data/catalog';
import { AddToCartFromProduct } from './AddToCartFromProduct';

export const metadata = {
  title: 'Latest Collections | Jyoti & Bros'
};

const newArrivals = catalog
  .filter((p) => p.isNewArrival)
  .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

export default function LatestCollectionsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="section-title">Latest Collections</h1>
        <p className="section-subtitle max-w-2xl">
          Explore our newest drops – fresh prints, festive-ready silhouettes,
          and wardrobe essentials that ship in 3–5 working days.
        </p>
      </header>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex flex-wrap gap-2">
            <span className="pill">All</span>
            <span className="pill">Kurta Sets</span>
            <span className="pill">Anarkali Suits</span>
            <span className="pill">Under ₹1,500</span>
          </div>
          <div className="text-slate-600">
            Showing <span className="font-medium">{newArrivals.length}</span>{' '}
            styles
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newArrivals.map((product) => {
            const primaryImage =
              product.variants[0]?.image ?? '/images/banner.jpg';
            return (
              <article
                key={product.id}
                className="card flex flex-col overflow-hidden"
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="relative block aspect-[4/5] bg-slate-100"
                >
                  <Image
                    src={primaryImage}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </Link>
                <div className="p-4 space-y-1.5 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-sm font-semibold text-slate-900 line-clamp-2">
                      <Link
                        href={`/products/${product.slug}`}
                        className="hover:text-brand-600"
                      >
                        {product.title}
                      </Link>
                    </h2>
                    {product.badge ? (
                      <span className="badge-soft shrink-0">{product.badge}</span>
                    ) : null}
                  </div>
                  <p className="text-xs text-slate-500">{product.category}</p>
                  <div className="flex items-baseline gap-2 text-sm">
                    <span className="font-semibold text-brand-600">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice != null &&
                      product.originalPrice > product.price && (
                        <span className="text-xs text-slate-400 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                  </div>
                  <AddToCartFromProduct product={product} />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
