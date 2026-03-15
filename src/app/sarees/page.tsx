import Link from "next/link";

export default function SareesPage() {
  return (
    <div className="space-y-6">
      <h1 className="section-title">Sarees</h1>
      <p className="section-subtitle max-w-2xl">
        Ready to wear, casual and bridal sarees. Browse our collections.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/sarees/ready-to-wear" className="secondary-button">Ready to Wear</Link>
        <Link href="/sarees/casual-wear" className="secondary-button">Casual Wear</Link>
        <Link href="/sarees/bridal" className="secondary-button">Bridal</Link>
      </div>
    </div>
  );
}
