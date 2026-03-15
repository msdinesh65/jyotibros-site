import Link from "next/link";

export default function SuitsSalesPage() {
  return (
    <div className="space-y-6">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Suits</p>
      <h1 className="section-title">Suits – Sales</h1>
      <p className="section-subtitle max-w-2xl">
        Special offers on suits. Shop this collection soon.
      </p>
      <Link href="/suits" className="secondary-button">← Back to Suits</Link>
    </div>
  );
}
