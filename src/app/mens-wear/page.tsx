import Link from "next/link";

export default function MensWearPage() {
  return (
    <div className="space-y-6">
      <h1 className="section-title">Mens Wear</h1>
      <p className="section-subtitle max-w-2xl">
        Gift packs and unstitched fabric for men. Browse our collections.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/mens-wear/gift-packs" className="secondary-button">Gift Packs</Link>
        <Link href="/mens-wear/unstitched-fabric/shirts-material" className="secondary-button">Unstitched – Shirts Material</Link>
        <Link href="/mens-wear/unstitched-fabric/trouser-material" className="secondary-button">Unstitched – Trouser Material</Link>
      </div>
    </div>
  );
}
