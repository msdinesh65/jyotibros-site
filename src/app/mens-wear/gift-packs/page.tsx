import Link from "next/link";

export default function GiftPacksPage() {
  return (
    <div className="space-y-6">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Mens Wear</p>
      <h1 className="section-title">Gift Packs</h1>
      <p className="section-subtitle max-w-2xl">Shop gift packs. This collection will be updated soon.</p>
      <Link href="/mens-wear" className="secondary-button">← Back to Mens Wear</Link>
    </div>
  );
}
