import Image from "next/image";
import Link from "next/link";
import { catalog } from "../../../../data/catalog";

export default function SilkPartywearPage() {
  const products = catalog
    .filter((p) => p.subcategory === "Party Wear")
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Suits / Summer Collection
        </p>
        <h1 className="section-title">Silk &amp; Partywear</h1>
        <p className="section-subtitle max-w-2xl">
          Elegant silk and partywear suits for special occasions.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const primaryImage =
            product.variants[0]?.image ?? "/images/banner.jpg";
          const hasMultipleColors = product.variants.length > 1;
          return (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="card overflow-hidden group flex flex-col"
            >
              <div className="relative aspect-[4/5] bg-slate-100">
                <Image
                  src={primaryImage}
                  alt={product.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                {product.badge && (
                  <div className="absolute left-3 top-3 badge-soft bg-white/90 text-brand-700">
                    {product.badge}
                  </div>
                )}
              </div>
              <div className="p-4 space-y-1.5">
                <h2 className="text-sm font-semibold text-slate-900 line-clamp-2">
                  {product.subtitle
                    ? `${product.title} – ${product.subtitle}`
                    : product.title}
                </h2>
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
                {hasMultipleColors && (
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span>Colors:</span>
                    <span className="flex items-center gap-1.5">
                      {product.variants.slice(0, 6).map((v) => (
                        <span
                          key={v.id}
                          className={`h-2 w-2 rounded-full ${v.colorDotClass ?? "bg-slate-400"}`}
                          title={v.label}
                        />
                      ))}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
