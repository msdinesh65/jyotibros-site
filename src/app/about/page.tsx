export const metadata = {
  title: "About | Jyoti & Bros"
};

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="section-title">About Jyoti &amp; Bros</h1>
        <p className="section-subtitle max-w-2xl">
          A homegrown label celebrating timeless Indian silhouettes with modern
          comfort. Thoughtfully designed for real women and real moments.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-2 items-start">
        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            Jyoti &amp; Bros began with a simple idea: ethnic wear should feel
            as good as it looks. We design every kurta set and anarkali with
            breathable fabrics, flattering cuts, and easy movement in mind.
          </p>
          <p>
            From carefully chosen prints to subtle detailing, our pieces are
            made to accompany you everywhere – from long work days and family
            get-togethers to festive celebrations and weddings.
          </p>
          <p>
            We work closely with trusted manufacturers and artisans to ensure
            consistent quality, sizing, and finish. Each collection is crafted
            in small, thoughtful batches so you always receive something fresh
            and special.
          </p>
        </div>

        <div className="card p-6 space-y-4">
          <h2 className="text-base font-semibold text-slate-900">
            What makes us different?
          </h2>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-600" />
              <span>
                <strong>Comfort-first fits</strong> – relaxed silhouettes that
                drape beautifully on different body types.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-600" />
              <span>
                <strong>Handpicked fabrics</strong> – breathable cottons, soft
                rayons and flowy blends ideal for Indian weather.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-600" />
              <span>
                <strong>Honest pricing</strong> – premium-looking outfits
                without the luxury mark-up.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-600" />
              <span>
                <strong>Responsive support</strong> – easy exchanges and a
                friendly team to help with sizing and orders.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

