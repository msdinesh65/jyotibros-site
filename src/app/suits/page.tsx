import Link from "next/link";

export default function SuitsPage() {
  return (
    <div className="space-y-6">
      <h1 className="section-title">Suits</h1>
      <p className="section-subtitle max-w-2xl">
        Browse our range of summer and winter suits, including cotton/linen, silk & partywear, printed and embroidered styles.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/suits/summer-collection/cotton-linen-suits" className="primary-button">Summer – Cotton/Linen Suits</Link>
        <Link href="/suits/summer-collection/silk-partywear" className="secondary-button">Summer – Silk & Partywear</Link>
        <Link href="/suits/winter-collection/printed-suits" className="secondary-button">Winter – Printed Suits</Link>
        <Link href="/suits/winter-collection/embroidered-suits" className="secondary-button">Winter – Embroidered Suits</Link>
        <Link href="/suits/sales" className="secondary-button">Sales</Link>
      </div>
    </div>
  );
}
