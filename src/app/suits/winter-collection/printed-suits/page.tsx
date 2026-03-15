import Link from "next/link";

export default function PrintedSuitsPage() {
  return (
    <div className="space-y-6">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Suits / Winter Collection</p>
      <h1 className="section-title">Printed Suits</h1>
      <p className="section-subtitle max-w-2xl">
        Winter printed suits. Shop this collection soon.
      </p>
      <Link href="/suits" className="secondary-button">← Back to Suits</Link>
    </div>
  );
}
