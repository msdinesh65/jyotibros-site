import Link from "next/link";

export default function ShirtsMaterialPage() {
  return (
    <div className="space-y-6">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Mens Wear / Unstitched Fabric</p>
      <h1 className="section-title">Shirts Material</h1>
      <p className="section-subtitle max-w-2xl">Shop unstitched shirts material. This collection will be updated soon.</p>
      <Link href="/mens-wear" className="secondary-button">← Back to Mens Wear</Link>
    </div>
  );
}
