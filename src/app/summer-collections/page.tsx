import Image from "next/image";
import Link from "next/link";

export default function SummerCollectionsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Summer Collections
        </p>
        <h1 className="section-title">Breezy looks for warm days</h1>
        <p className="section-subtitle max-w-2xl">
          Explore cotton and linen suits, easy party wear, and premium pieces
          chosen to keep you comfortable and stylish all summer long.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <CollectionCard
          href="/summer-collections/cotton-linen-suits"
          title="Cotton/Linen Suits"
          description="Lightweight, breathable sets crafted for everyday comfort in the heat."
          imageSrc="/images/NewArrival-SummerCollections-CottonLinen-Blue-999.jpg"
        />
        <CollectionCard
          href="/summer-collections/party-wear"
          title="Party Wear"
          description="Statement outfits with subtle shimmer and elegant detailing."
          imageSrc="/images/SummerCollections-PartyWear-1.jpg"
        />
        <CollectionCard
          href="/summer-collections/premium-collection"
          title="Premium Collection"
          description="Handpicked premium pieces designed to stand out at special occasions."
          imageSrc="/images/SummerCollections-Premium-1.jpg"
        />
      </div>
    </div>
  );
}

type CollectionCardProps = {
  href: string;
  title: string;
  description: string;
  imageSrc: string;
};

function CollectionCard({
  href,
  title,
  description,
  imageSrc
}: CollectionCardProps) {
  return (
    <Link href={href} className="card overflow-hidden group flex flex-col">
      <div className="relative aspect-[4/3] bg-slate-100">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5 space-y-2">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900">
          {title}
        </h2>
        <p className="text-sm text-slate-600">{description}</p>
        <span className="inline-flex text-xs font-medium text-brand-700 group-hover:text-brand-800">
          View collection →
        </span>
      </div>
    </Link>
  );
}

