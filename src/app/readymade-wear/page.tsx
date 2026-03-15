import Link from "next/link";

export default function ReadymadeWearPage() {
  return (
    <div className="space-y-6">
      <h1 className="section-title">Readymade Wear</h1>
      <p className="section-subtitle max-w-2xl">
        Dresses, kurtis, cord-sets and more. Browse our readymade collections.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/readymade-wear/dresses/glowns" className="secondary-button">Dresses – Glowns</Link>
        <Link href="/readymade-wear/dresses/lehngas" className="secondary-button">Dresses – Lehngas</Link>
        <Link href="/readymade-wear/dresses/readymade-suits" className="secondary-button">Dresses – Readymade Suits</Link>
        <Link href="/readymade-wear/kurtis" className="secondary-button">Kurtis</Link>
        <Link href="/readymade-wear/cord-sets" className="secondary-button">Cord-sets</Link>
      </div>
    </div>
  );
}
