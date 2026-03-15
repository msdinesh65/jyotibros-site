import Link from "next/link";

export default function KurtisPage() {
  return (
    <div className="space-y-6">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Readymade Wear</p>
      <h1 className="section-title">Kurtis</h1>
      <p className="section-subtitle max-w-2xl">Shop kurtis. This collection will be updated soon.</p>
      <Link href="/readymade-wear" className="secondary-button">← Back to Readymade Wear</Link>
    </div>
  );
}
