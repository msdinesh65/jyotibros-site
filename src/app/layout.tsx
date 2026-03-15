import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { CartProvider } from "./cart-context";
import { CartStatus } from "./CartStatus";
import { LocationFinder } from "./LocationFinder";

export const metadata: Metadata = {
  title: "Jyoti & Bros | Ethnic Wear Boutique",
  description:
    "Discover elegant ethnic wear, kurta sets, and anarkali suits at Jyoti & Bros. Handpicked designs with fast delivery and easy returns."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
            <div className="page-container flex items-center justify-between py-4 gap-4">
              <Link href="/" className="flex items-center gap-3 hover:opacity-90">
                <div className="h-10 w-10 rounded-full bg-brand-600 flex items-center justify-center text-white text-lg font-semibold">
                  J&B
                </div>
                <div>
                  <div className="text-lg font-semibold tracking-tight">
                    Jyoti &amp; Bros
                  </div>
                  <div className="text-xs text-slate-500">
                    Ethnic Wear Boutique
                  </div>
                </div>
              </Link>

              {/* Desktop navigation */}
              <nav className="hidden md:flex items-center gap-4 sm:gap-6 text-sm sm:text-base font-medium text-slate-700 flex-wrap justify-end">
                {/* Suits */}
                <div className="relative group">
                  <a href="/suits" className="hover:text-brand-600 inline-flex items-center gap-1">
                    Suits
                  </a>
                  <div className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-lg opacity-0 translate-y-1 transition duration-150 ease-out group-hover:opacity-100 group-hover:translate-y-0 z-20">
                    <ul className="py-2 text-xs sm:text-sm text-slate-700">
                      <li className="px-4 pt-2 pb-1 text-[10px] font-semibold uppercase text-slate-400">Summer Collection</li>
                      <li><a href="/suits/summer-collection/cotton-linen-suits" className="block px-4 py-1.5 hover:bg-slate-50 hover:text-brand-600">Cotton/Linen Suits</a></li>
                      <li><a href="/suits/summer-collection/silk-partywear" className="block px-4 py-1.5 hover:bg-slate-50 hover:text-brand-600">Silk &amp; Partywear</a></li>
                      <li className="px-4 pt-2 pb-1 text-[10px] font-semibold uppercase text-slate-400">Winter Collection</li>
                      <li><a href="/suits/winter-collection/printed-suits" className="block px-4 py-1.5 hover:bg-slate-50 hover:text-brand-600">Printed Suits</a></li>
                      <li><a href="/suits/winter-collection/embroidered-suits" className="block px-4 py-1.5 hover:bg-slate-50 hover:text-brand-600">Embroidered Suits</a></li>
                      <li className="border-t border-slate-100 mt-1 pt-1"><a href="/suits/sales" className="block px-4 py-1.5 hover:bg-slate-50 hover:text-brand-600">Sales</a></li>
                    </ul>
                  </div>
                </div>
                {/* Readymade Wear */}
                <div className="relative group">
                  <a href="/readymade-wear" className="hover:text-brand-600 inline-flex items-center gap-1">
                    Readymade Wear
                  </a>
                  <div className="absolute left-0 top-full mt-2 w-52 rounded-xl border border-slate-200 bg-white shadow-lg opacity-0 translate-y-1 transition duration-150 ease-out group-hover:opacity-100 group-hover:translate-y-0 z-20">
                    <ul className="py-2 text-xs sm:text-sm text-slate-700">
                      <li className="px-4 pt-2 pb-1 text-[10px] font-semibold uppercase text-slate-400">Dresses</li>
                      <li><a href="/readymade-wear/dresses/glowns" className="block px-4 py-1.5 hover:bg-slate-50 hover:text-brand-600">Glowns</a></li>
                      <li><a href="/readymade-wear/dresses/lehngas" className="block px-4 py-1.5 hover:bg-slate-50 hover:text-brand-600">Lehngas</a></li>
                      <li><a href="/readymade-wear/dresses/readymade-suits" className="block px-4 py-1.5 hover:bg-slate-50 hover:text-brand-600">Readymade Suits</a></li>
                      <li className="border-t border-slate-100 mt-1 pt-1"><a href="/readymade-wear/kurtis" className="block px-4 py-1.5 hover:bg-slate-50 hover:text-brand-600">Kurtis</a></li>
                      <li><a href="/readymade-wear/cord-sets" className="block px-4 py-1.5 hover:bg-slate-50 hover:text-brand-600">Cord-sets</a></li>
                    </ul>
                  </div>
                </div>
                {/* Sarees */}
                <div className="relative group">
                  <a href="/sarees" className="hover:text-brand-600 inline-flex items-center gap-1">
                    Sarees
                  </a>
                  <div className="absolute left-0 top-full mt-2 w-48 rounded-xl border border-slate-200 bg-white shadow-lg opacity-0 translate-y-1 transition duration-150 ease-out group-hover:opacity-100 group-hover:translate-y-0 z-20">
                    <ul className="py-2 text-xs sm:text-sm text-slate-700">
                      <li><a href="/sarees/ready-to-wear" className="block px-4 py-2 hover:bg-slate-50 hover:text-brand-600">Ready to Wear</a></li>
                      <li><a href="/sarees/casual-wear" className="block px-4 py-2 hover:bg-slate-50 hover:text-brand-600">Casual Wear</a></li>
                      <li><a href="/sarees/bridal" className="block px-4 py-2 hover:bg-slate-50 hover:text-brand-600">Bridal</a></li>
                    </ul>
                  </div>
                </div>
                {/* Mens Wear */}
                <div className="relative group">
                  <a href="/mens-wear" className="hover:text-brand-600 inline-flex items-center gap-1">
                    Mens Wear
                  </a>
                  <div className="absolute left-0 top-full mt-2 w-52 rounded-xl border border-slate-200 bg-white shadow-lg opacity-0 translate-y-1 transition duration-150 ease-out group-hover:opacity-100 group-hover:translate-y-0 z-20">
                    <ul className="py-2 text-xs sm:text-sm text-slate-700">
                      <li><a href="/mens-wear/gift-packs" className="block px-4 py-2 hover:bg-slate-50 hover:text-brand-600">Gift Packs</a></li>
                      <li className="px-4 pt-2 pb-1 text-[10px] font-semibold uppercase text-slate-400">Unstitched Fabric</li>
                      <li><a href="/mens-wear/unstitched-fabric/shirts-material" className="block px-4 py-1.5 hover:bg-slate-50 hover:text-brand-600">Shirts Material</a></li>
                      <li><a href="/mens-wear/unstitched-fabric/trouser-material" className="block px-4 py-1.5 hover:bg-slate-50 hover:text-brand-600">Trouser Material</a></li>
                    </ul>
                  </div>
                </div>
                <a href="/sale" className="nav-sales-link rounded-full px-3 py-1.5 bg-rose-50 border border-rose-200/80 hover:border-rose-300 hover:bg-rose-100/80">
                  Sales
                </a>
              </nav>

              <div className="flex items-center gap-3 sm:gap-4">
                <a
                  href="https://www.facebook.com/share/19mFaaQoSt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" aria-hidden>
                    <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/jyotibros?igsh=MXJjY2tuZTR1d2d6bg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" aria-hidden>
                    <defs>
                      <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f09433" />
                        <stop offset="25%" stopColor="#e6683c" />
                        <stop offset="50%" stopColor="#dc2743" />
                        <stop offset="75%" stopColor="#cc2366" />
                        <stop offset="100%" stopColor="#bc1888" />
                      </linearGradient>
                    </defs>
                    <path fill="url(#instagram-gradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.14 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.14-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <LocationFinder />
                <Link
                  href="/track-order"
                  className="hidden sm:inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:border-brand-500 hover:text-brand-700 transition-colors"
                >
                  Track Order
                </Link>
                <CartStatus />
              </div>
            </div>

            {/* Simple mobile navigation below header */}
            <div className="md:hidden border-t border-slate-200 bg-white/90">
              <div className="page-container py-2 flex flex-wrap gap-3 text-[13px] font-medium text-slate-700">
                <Link href="/suits" className="hover:text-brand-600">
                  Suits
                </Link>
                <Link href="/readymade-wear" className="hover:text-brand-600">
                  Readymade Wear
                </Link>
                <Link href="/sarees" className="hover:text-brand-600">
                  Sarees
                </Link>
                <Link href="/mens-wear" className="hover:text-brand-600">
                  Mens Wear
                </Link>
                <Link href="/sale" className="text-rose-600 hover:text-rose-700">
                  Sales
                </Link>
              </div>
            </div>
          </header>

          <main className="flex-1">
            <div className="page-container py-10 sm:py-12 lg:py-14">
              {children}
            </div>
          </main>

          <footer className="border-t border-slate-200 bg-white">
            <div className="page-container py-8 grid gap-8 md:grid-cols-4 text-sm">
              <div className="md:col-span-2">
                <div className="text-base font-semibold">Jyoti &amp; Bros</div>
                <p className="mt-2 text-slate-600 max-w-md">
                  Handpicked ethnic wear, crafted with love and attention to
                  detail. Designed to make everyday moments feel a little more
                  special.
                </p>
              </div>
              <div>
                <div className="font-semibold text-slate-900">Shop</div>
                <ul className="mt-2 space-y-1 text-slate-600">
                  <li><Link href="/suits" className="hover:text-brand-600">Suits</Link></li>
                  <li><Link href="/readymade-wear" className="hover:text-brand-600">Readymade Wear</Link></li>
                  <li><Link href="/sarees" className="hover:text-brand-600">Sarees</Link></li>
                  <li><Link href="/mens-wear" className="hover:text-brand-600">Mens Wear</Link></li>
                  <li><Link href="/sale" className="hover:text-brand-600">Sales</Link></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-slate-900">Support</div>
                <ul className="mt-2 space-y-1 text-slate-600">
                  <li>Shipping &amp; Delivery</li>
                  <li>Returns &amp; Exchanges</li>
                  <li>Customer Care</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-200">
              <div className="page-container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
                <p>© {new Date().getFullYear()} Jyoti &amp; Bros. All rights reserved.</p>
                <p className="flex gap-3">
                  <span>FREE &amp; FAST DELIVERY</span>
                  <span className="hidden sm:inline">•</span>
                  <span>EASY RETURNS</span>
                  <span className="hidden sm:inline">•</span>
                  <span>CUSTOMER SUPPORT 9 AM - 10 PM</span>
                </p>
              </div>
            </div>
          </footer>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}

