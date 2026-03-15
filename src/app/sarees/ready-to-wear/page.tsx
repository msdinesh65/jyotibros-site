import Link from "next/link";

export default function SareesReadyToWearPage() {
  return (
    <div className="space-y-6">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Sarees</p>
      <h1 className="section-title">Ready to Wear Sarees</h1>
      <p className="section-subtitle max-w-2xl">Shop ready to wear sarees. This collection will be updated soon.</p>
      <Link href="/sarees" className="secondary-button">← Back to Sarees</Link>
    </div>
  );
}
