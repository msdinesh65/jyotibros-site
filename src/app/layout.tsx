import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { AuthNav } from "./AuthNav";
import { CartProvider } from "./cart-context";
import { CartStatus } from "./CartStatus";
import { Providers } from "./providers";
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
        <Providers>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
            <div className="page-container flex items-center justify-between gap-4 py-[1.2rem]">
              <Link
                href="/"
                aria-label="Jyoti & Bros — Ethnic Wear Boutique, home"
                className="flex min-w-0 items-center gap-2.5 sm:gap-3 hover:opacity-90 transition-opacity"
              >
                <span className="relative isolate shrink-0 [contain:layout]">
                  <Image
                    src="/images/logo-jyoti-bros.png"
                    alt=""
                    width={1024}
                    height={364}
                    className="block h-[2.7rem] w-auto object-contain sm:h-12 md:h-[3.3rem]"
                    sizes="(max-width: 640px) 200px, 250px"
                    priority
                  />
                </span>
                <div className="min-w-0 leading-tight">
                  <div className="text-[1.125rem] font-semibold tracking-tight text-brand-800 sm:text-[1.35rem]">
                    Jyoti &amp; Bros
                  </div>
                  <div className="mt-0.5 text-[0.825rem] text-slate-600 sm:text-[0.975rem]">
                    Ethnic Wear Boutique
                  </div>
                </div>
              </Link>

              {/* Desktop navigation */}
              <nav className="hidden md:flex items-center gap-4 sm:gap-6 md:text-[15px] font-medium text-slate-700 flex-wrap justify-end">
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

              <div className="flex shrink-0 items-center gap-3 sm:gap-4">
                <LocationFinder />
                <Link
                  href="/track-order"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 px-2 py-1 text-[10px] font-medium text-slate-700 hover:border-brand-500 hover:text-brand-700 transition-colors sm:text-[11px]"
                >
                  Track Order
                </Link>
                <AuthNav />
                <CartStatus />
              </div>
            </div>

            {/* Simple mobile navigation below header */}
            <div className="md:hidden border-t border-slate-200 bg-white/90">
              <div className="page-container flex flex-wrap gap-3 py-2.5 text-[12.5px] font-medium text-slate-700">
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
        </Providers>
      </body>
    </html>
  );
}

