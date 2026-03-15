export const metadata = {
  title: "Contact | Jyoti & Bros"
};

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="section-title">Contact Us</h1>
        <p className="section-subtitle max-w-2xl">
          Have a question about sizing, orders, or custom requests? Share your
          details and we&apos;ll get back within 24 hours.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-[1.2fr,0.9fr] items-start">
        <form className="card p-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:bg-white focus:ring-1 focus:ring-brand-400"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:bg-white focus:ring-1 focus:ring-brand-400"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:bg-white focus:ring-1 focus:ring-brand-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              How can we help?
            </label>
            <textarea
              rows={4}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:bg-white focus:ring-1 focus:ring-brand-400 resize-none"
              placeholder="Share order ID, product link, or your query..."
            />
          </div>

          <button type="submit" className="primary-button w-full sm:w-auto">
            Submit enquiry
          </button>

          <p className="text-[11px] text-slate-500">
            This is a demo form. Connect it to your preferred email or CRM to
            start receiving messages.
          </p>
        </form>

        <aside className="space-y-4 text-sm text-slate-700">
          <div className="card p-5 space-y-3">
            <h2 className="text-base font-semibold text-slate-900">
              Customer Support
            </h2>
            <p className="text-sm text-slate-600">
              Mon – Sat, 9:00 AM to 10:00 PM
            </p>
            <div className="space-y-1 text-sm">
              <p>
                WhatsApp: <span className="font-medium">+91-XXXXXXXXXX</span>
              </p>
              <p>
                Email:{" "}
                <span className="font-medium">
                  support@jyotiandbros.example
                </span>
              </p>
            </div>
          </div>

          <div className="card p-5 space-y-3">
            <h2 className="text-base font-semibold text-slate-900">
              Store &amp; Dispatch Address
            </h2>
            <p>
              Jyoti &amp; Bros Clothing<br />
              (You can replace this with your actual address.)<br />
              City, State – Pincode
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}

