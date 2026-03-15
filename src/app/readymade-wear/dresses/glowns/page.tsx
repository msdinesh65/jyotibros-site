import Link from "next/link";

export default function GlownsPage() {
  return (
    <div className="space-y-6">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Readymade Wear / Dresses</p>
      <h1 className="section-title">Glowns</h1>
      <p className="section-subtitle max-w-2xl">Shop glowns. This collection will be updated soon.</p>
      <Link href="/readymade-wear" className="secondary-button">← Back to Readymade Wear</Link>
    </div>
  );
}
