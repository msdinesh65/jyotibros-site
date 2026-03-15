import Image from "next/image";
import Link from "next/link";
import { catalog } from "../../data/catalog";

export default function SalePage() {
  const saleProducts = catalog
    .filter(
      (p) => p.badge && (p.badge.startsWith("-") || p.tags?.includes("sale"))
    )
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return (
    <div className="space-y-8">
      <h1 className="section-title">Sales</h1>
      <p className="section-subtitle max-w-2xl">
        Special offers and discounted items. Browse our sale collection.
      </p>
      {saleProducts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {saleProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="card overflow-hidden group flex flex-col"
            >
              <div className="relative aspect-[4/5] bg-slate-100">
                <Image
                  src={product.variants[0]?.image ?? "/images/banner.jpg"}
                  alt={product.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 space-y-1.5">
                <h2 className="text-sm font-semibold text-slate-900 line-clamp-2">{product.title}</h2>
                <div className="flex items-baseline gap-2 text-sm">
                  <span className="font-semibold text-brand-600">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-slate-600">No sale items at the moment. Check back soon.</p>
      )}
    </div>
  );
}
