export const metadata = {
  title: "Latest Collections | Jyoti & Bros"
};

const products = [
  {
    name: "Ruby Maroon & Gold Kurta Set",
    category: "Kurta Set",
    price: "₹1,299",
    originalPrice: "₹2,598",
    badge: "-50%",
    image: "/images/ruby-maroon.jpg"
  },
  {
    name: "Lime Garden Kurti with Dupatta",
    category: "Kurta Set",
    price: "₹1,299",
    originalPrice: "₹2,598",
    badge: "-50%",
    image: "/images/lime-garden.jpg"
  },
  {
    name: "Dusty Sky Bloom Kurta Set",
    category: "Kurta Set",
    price: "₹1,299",
    originalPrice: "₹2,598",
    badge: "-50%",
    image: "/images/dusty-sky.jpg"
  },
  {
    name: "Terracotta Bloom Anarkali",
    category: "Anarkali Suit",
    price: "₹1,499",
    originalPrice: "₹2,998",
    badge: "-50%",
    image: "/images/terracotta-bloom.jpg"
  },
  {
    name: "Midnight Black Anarkali",
    category: "Anarkali Suit",
    price: "₹1,499",
    originalPrice: "₹2,998",
    badge: "-50%",
    image: "/images/midnight-black.jpg"
  },
  {
    name: "Peony Pink Floral Anarkali",
    category: "Anarkali Suit",
    price: "₹1,499",
    originalPrice: "₹1,499",
    badge: "New",
    image: "/images/peony-pink.jpg"
  }
];

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
            Showing <span className="font-medium">{products.length}</span>{" "}
            styles
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.name}
              className="card flex flex-col overflow-hidden"
            >
              <div className="relative aspect-[4/5] bg-slate-100" />
              <div className="p-4 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm font-semibold text-slate-900 line-clamp-2">
                    {product.name}
                  </h2>
                  <span className="badge-soft">{product.badge}</span>
                </div>
                <p className="text-xs text-slate-500">{product.category}</p>
                <div className="flex items-baseline gap-2 text-sm">
                  <span className="font-semibold text-brand-600">
                    {product.price}
                  </span>
                  {product.originalPrice !== product.price && (
                    <span className="text-xs text-slate-400 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
                <button className="mt-3 w-full primary-button text-xs justify-center">
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

