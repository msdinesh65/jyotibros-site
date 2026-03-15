export const metadata = {
  title: "Track Your Order | Jyoti & Bros"
};

export default function TrackOrderPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="section-title">Track Your Order</h1>
        <p className="section-subtitle max-w-2xl">
          Enter your order ID and registered phone or email to check the latest
          status of your shipment.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-[1.2fr,0.9fr] items-start">
        <form className="card p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Order ID
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:bg-white focus:ring-1 focus:ring-brand-400"
              placeholder="#JNB123456"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Registered Phone or Email
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:bg-white focus:ring-1 focus:ring-brand-400"
              placeholder="+91 98765 43210 or you@example.com"
            />
          </div>

          <button type="submit" className="primary-button w-full sm:w-auto">
            Track order
          </button>

          <p className="text-[11px] text-slate-500">
            This is a static demo. Connect it to your shipping provider or
            order management system (for example, Shiprocket, Pickrr, or a
            custom API) to show live tracking updates.
          </p>
        </form>

        <aside className="space-y-4 text-sm text-slate-700">
          <div className="card p-5 space-y-3">
            <h2 className="text-base font-semibold text-slate-900">
              Delivery Timelines
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Metro &amp; Tier-1 cities: 2–4 working days</li>
              <li>• Tier-2 &amp; Tier-3 cities: 3–6 working days</li>
              <li>• Remote locations: 5–8 working days</li>
            </ul>
          </div>

          <div className="card p-5 space-y-3">
            <h2 className="text-base font-semibold text-slate-900">
              Need help with an order?
            </h2>
            <p>
              If your order is delayed or the tracking hasn&apos;t updated in
              over 48 hours, reach out to our support team with your order ID
              and registered phone number.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}

