'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { catalog } from "../data/catalog";

const heroSlides = [
  {
    src: "/images/banner.jpg",
    alt: "Festive ethnic wear banner"
  },
  {
    src: "/images/ruby-maroon.jpg",
    alt: "Ruby maroon kurta set"
  },
  {
    src: "/images/lime-green.jpg",
    alt: "Lime green kurta set"
  },
  {
    src: "/images/dusty-sky.jpg",
    alt: "Dusty sky bloom kurta set"
  }
];

const newArrivals = catalog
  .filter((product) => product.isNewArrival)
  .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

const bestSellers = catalog
  .filter((product) => product.isBestSeller)
  .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
const saleProducts = catalog
  .filter(
    (p) => p.badge && (p.badge.startsWith("-") || p.tags?.includes("sale"))
  )
  .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

const INSTAGRAM_REEL_URL = "https://www.instagram.com/reel/DV2nCGIE-VF/?igsh=bGdvM2FiNWdwbTFo";
const INSTAGRAM_EMBED_URL = "https://www.instagram.com/reel/DV2nCGIE-VF/embed/";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? heroSlides.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <div className="space-y-16">
      {/* Hero banner slider */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900/5">
        <div className="relative h-[340px] sm:h-[420px] lg:h-[500px]">
          <Image
            src={heroSlides[currentSlide].src}
            alt={heroSlides[currentSlide].alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/55 to-slate-900/10" />

          {/* Floating social links – tight to slider next arrow (arrow stays z-30) */}
          <div
            className="absolute right-9 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2.5 sm:right-9"
            role="group"
            aria-label="Follow us on social media"
          >
            <a
              href="https://www.facebook.com/share/19mFaaQoSt/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-transparent transition hover:scale-110 sm:h-10 sm:w-10"
              aria-label="Facebook"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="h-6 w-6 shrink-0 drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)] sm:h-7 sm:w-7"
                aria-hidden
              >
                <path
                  fill="#1877F2"
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/jyotibros?igsh=MXJjY2tuZTR1d2d6bg=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-transparent transition hover:scale-110 sm:h-10 sm:w-10"
              aria-label="Instagram"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="h-6 w-6 shrink-0 drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)] sm:h-7 sm:w-7"
                aria-hidden
              >
                <defs>
                  <linearGradient
                    id="instagram-gradient-hero"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#f09433" />
                    <stop offset="25%" stopColor="#e6683c" />
                    <stop offset="50%" stopColor="#dc2743" />
                    <stop offset="75%" stopColor="#cc2366" />
                    <stop offset="100%" stopColor="#bc1888" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#instagram-gradient-hero)"
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.14 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.14-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                />
              </svg>
            </a>
          </div>

          {/* WhatsApp – top right above slider */}
          <a
            href="https://wa.me/918091501003"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-2.5 right-2.5 z-10 inline-flex items-center gap-1 rounded-md bg-[#25D366] px-2 py-1 text-[10px] font-semibold leading-tight text-white shadow-sm hover:bg-[#20BD5A] transition-colors sm:top-3.5 sm:right-3.5 sm:px-2.5 sm:py-1.5 sm:text-[11px]"
            aria-label="Chat on WhatsApp"
          >
            <svg className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>+91 80915 01003</span>
          </a>

          <div className="relative h-full page-container flex flex-col justify-center gap-4 text-white">
            <h1 className="max-w-xl text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
              Each piece is carefully handcrafted by skilled artisans.
            </h1>
            <p className="max-w-xl text-xs sm:text-sm text-slate-100/85">
              Explore kurta sets and anarkali suits that blend rich Indian
              aesthetics with modern comfort. Perfect for office, festive
              dinners and family celebrations.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/latest-collections" className="primary-button">
                Shop New Arrivals
              </Link>
            </div>
          </div>

          {/* Slider controls */}
          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/30 text-white p-2 text-sm hover:bg-black/45"
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/30 text-white p-2 text-sm hover:bg-black/45"
            aria-label="Next slide"
          >
            ›
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 w-1.5 rounded-full transition ${
                  index === currentSlide
                    ? "bg-white"
                    : "bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* For your budget */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h2 className="section-title">For Your Budget</h2>
            <p className="section-subtitle">
              Explore options across different price ranges so you can pick what
              suits your budget the best.
            </p>
          </div>
          <Link
            href="/latest-collections"
            className="text-sm font-medium text-brand-700 hover:text-brand-800"
          >
            Shop more →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <CategoryCard
            title="Under ₹999"
            description="Pocket-friendly styles perfect for everyday wear and casual outings."
            accent="Best Value"
            href="/budget/under-999"
          />
          <CategoryCard
            title="₹1000 – ₹1999"
            description="Most-loved pieces that balance premium feel with great pricing."
            accent="Most Popular"
            href="/budget/1000-1999"
          />
          <CategoryCard
            title="₹2000 & Above"
            description="Premium, statement-making outfits for special occasions and celebrations."
            accent="Premium Picks"
            href="/budget/2000-and-above"
          />
        </div>
      </section>

      {/* New Arrival section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="section-title">New Arrivals</h2>
            <p className="section-subtitle">
              Fresh drops in rich maroons, garden greens and sky blues.
            </p>
          </div>
        </div>
        <div
          className="
            flex gap-4 overflow-x-auto snap-x snap-mandatory
            sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible
            lg:grid-cols-3
          "
        >
          {newArrivals.map((item) => (
            <div
              key={item.id}
              className="snap-start min-w-[70%] sm:min-w-0"
            >
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </section>

      {/* Video – click to pop up */}
      <section className="space-y-4">
        <h2 className="section-title text-center">Watch Our Reel</h2>
        <p className="section-subtitle text-center max-w-xl mx-auto">
          A quick look at what we&apos;re loving this season. Click to watch on Instagram.
        </p>
        <button
          type="button"
          onClick={() => setVideoModalOpen(true)}
          className="w-full max-w-2xl mx-auto block rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-md hover:shadow-lg hover:border-brand-200 transition focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 group"
          aria-label="Play Instagram reel"
        >
          <div className="relative aspect-video flex items-center justify-center bg-slate-200">
            <Image
              src="/images/banner.jpg"
              alt="Play our Instagram reel"
              fill
              className="object-cover opacity-90 group-hover:opacity-95 transition-opacity"
            />
            {/* Dark overlay so play icon stands out */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/25 transition-colors" />
            {/* Play sign – circle with triangle (35% smaller) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-20 w-20 sm:h-24 sm:w-24 scale-[0.65] sm:scale-[0.65] rounded-full bg-white/95 flex items-center justify-center shadow-xl ring-4 ring-white/50 group-hover:scale-[0.72] transition-transform">
                <svg className="w-9 h-9 sm:w-11 sm:h-11 ml-1 text-brand-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="p-4 text-center text-sm font-medium text-slate-700">
            Click to watch on Instagram
          </div>
        </button>
        {videoModalOpen && (
          <VideoModal
            embedUrl={INSTAGRAM_EMBED_URL}
            openUrl={INSTAGRAM_REEL_URL}
            onClose={() => setVideoModalOpen(false)}
          />
        )}
      </section>

      {/* Best Sellers */}
      <section className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="section-title">Best Sellers</h2>
            <p className="section-subtitle">
              Our most loved pieces, chosen by you.
            </p>
          </div>
          <Link href="/sale" className="text-sm font-medium text-brand-700 hover:text-brand-800">
            View all →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bestSellers.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      {/* Sales */}
      <section className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="section-title">Sales</h2>
            <p className="section-subtitle">
              Limited-time offers and discounts on selected styles.
            </p>
          </div>
          <Link href="/sale" className="text-sm font-medium text-brand-700 hover:text-brand-800">
            Shop sale →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {saleProducts.slice(0, 6).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      {/* Customer Appreciations */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h2 className="section-title">Customer Appreciations</h2>
            <p className="section-subtitle">
              Here&apos;s why our customers keep coming back to Jyoti &amp; Bros.
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <TestimonialCard
            name="Neha Sharma"
            text="The cotton kurta is stylish and comfortable. The fabric feels soft, fits well, and looks elegant. Perfect for daily wear."
          />
          <TestimonialCard
            name="Ritika Gupta"
            text="The kurta set I ordered is beautiful. The material is breathable, and the print is vibrant. Great for festive occasions."
          />
          <TestimonialCard
            name="Ananya Mishra"
            text="The red kurta set is stunning. The fabric quality is great and it fits perfectly. Would definitely buy again."
          />
        </div>
      </section>
    </div>
  );
}

function VideoModal({
  embedUrl,
  openUrl,
  onClose
}: {
  embedUrl: string;
  openUrl: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      role="dialog"
      aria-modal="true"
      aria-label="Instagram reel"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-white/90 shadow flex items-center justify-center text-slate-700 hover:bg-white text-xl leading-none"
          aria-label="Close"
        >
          ×
        </button>
        <div className="aspect-[9/16] max-h-[80vh] w-full bg-slate-900">
          <iframe
            src={embedUrl}
            title="Instagram reel"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="p-4 border-t border-slate-200">
          <a
            href={openUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-button block text-center"
          >
            Watch on Instagram
          </a>
        </div>
      </div>
    </div>
  );
}

function ProductCard({
  product
}: {
  product: (typeof newArrivals)[number];
}) {
  const hasMultipleColors = product.variants.length > 1;
  const primaryImage = product.variants[0]?.image ?? "/images/banner.jpg";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="card overflow-hidden group cursor-pointer flex flex-col"
    >
      <article>
        <div className="relative aspect-[4/5] bg-slate-100">
          <Image
            src={primaryImage}
            alt={product.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 badge-soft bg-white/90 text-brand-700">
            {product.badge}
          </div>
          <div className="absolute bottom-3 left-3 rounded-full bg-black/65 px-3 py-1 text-[11px] text-white">
            COD Available
          </div>
        </div>
        <div className="p-4 space-y-1.5">
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">
            {product.subtitle ? `${product.title} – ${product.subtitle}` : product.title}
          </h3>
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
          <span className="mt-2 inline-flex text-xs font-medium text-brand-700 hover:text-brand-800">
            View details
          </span>
        </div>
      </article>
    </Link>
  );
}

function AnarkaliCard({
  product
}: {
  product: {
    name: string;
    slug: string;
    price: string;
    originalPrice: string;
    badge: string;
    image: string;
  };
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="card overflow-hidden group cursor-pointer flex flex-col"
    >
      <article>
        <div className="relative aspect-[4/5] bg-slate-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 badge-soft bg-white/90 text-brand-700">
            {product.badge}
          </div>
          <div className="absolute bottom-3 left-3 rounded-full bg-black/65 px-3 py-1 text-[11px] text-white">
            COD Available
          </div>
        </div>
        <div className="p-4 space-y-1.5">
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 text-sm">
            <span className="font-semibold text-brand-600">
              {product.price}
            </span>
            <span className="text-xs text-slate-400 line-through">
              {product.originalPrice}
            </span>
          </div>
          <span className="mt-2 inline-flex text-xs font-medium text-brand-700 hover:text-brand-800">
            View details
          </span>
        </div>
      </article>
    </Link>
  );
}

function CategoryCard({
  title,
  description,
  accent,
  href
}: {
  title: string;
  description: string;
  accent: string;
  href: string;
}) {
  return (
    <div className="card p-5 flex flex-col justify-between">
      <div className="space-y-3">
        <span className="badge-soft">{accent}</span>
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <p className="text-base text-slate-600">{description}</p>
      </div>
      <Link
        href={href}
        className="mt-4 inline-flex text-sm font-medium text-brand-700 hover:text-brand-800"
      >
        Explore {title} →
      </Link>
    </div>
  );
}

function TestimonialCard({ name, text }: { name: string; text: string }) {
  return (
    <div className="card p-5 space-y-3">
      <div className="flex items-center gap-2 text-amber-400 text-lg">
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>
      <p className="text-sm text-slate-700 leading-relaxed">“{text}”</p>
      <div className="text-sm font-semibold text-slate-900">— {name}</div>
    </div>
  );
}

