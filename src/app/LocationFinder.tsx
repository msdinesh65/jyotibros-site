'use client';

import { useState } from 'react';

export function LocationFinder() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/70 p-1.5 text-slate-600 hover:border-brand-500 hover:text-brand-700 transition-colors"
        aria-label="Find us / View address"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
      {open && (
        <>
          {/* Invisible bridge so hover is not lost between icon and popup */}
          <div className="absolute left-1/2 top-full h-3 w-24 -translate-x-1/2" aria-hidden />
          <div
            className="location-popup-circle absolute left-1/2 top-full z-[100] mt-2 flex h-[min(85vw,20rem)] w-[min(85vw,20rem)] -translate-x-1/2 flex-col items-center justify-center overflow-hidden rounded-full p-8 shadow-2xl ring-4 ring-white/50 sm:h-[20rem] sm:w-[20rem]"
            style={{
              background: 'linear-gradient(160deg, #d1fae5 0%, #e0f2fe 40%, #fef3c7 100%)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.8)'
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Store location"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 text-slate-500 shadow-sm hover:bg-white hover:text-slate-700 transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col items-center justify-center text-center space-y-1.5 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">M/S Jyoti &amp; Brothers</p>
              <p>Main Market Sundernagar, Himachal Pradesh, PIN 175002, INDIA</p>
              <p>
                <a href="tel:+918091501003" className="font-medium text-brand-600 hover:underline">Phone: +91 8091501003</a>
              </p>
              <p>
                <a href="mailto:JyotiBros1003@gmail.com" className="font-medium text-brand-600 hover:underline">Email: JyotiBros1003@gmail.com</a>
              </p>
              <p>
                <a href="https://www.jyotibros.com" target="_blank" rel="noopener noreferrer" className="font-medium text-brand-600 hover:underline">Website: www.jyotibros.com</a>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
