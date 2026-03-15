import Image from "next/image";

export default function PremiumCollectionPage() {
  const pieces = [
    {
      title: "Handcrafted Premium Anarkali Set",
      subtitle: "Intricate detailing for special occasions",
      image: "/images/SummerCollections-Premium-1.jpg"
    },
    {
      title: "Embroidered Kurta Set with Dupatta",
      subtitle: "Rich textures with a modern silhouette",
      image: "/images/SummerCollections-Premium-2.jpg"
    }
  ];

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Summer Collections
        </p>
        <h1 className="section-title">Premium Collection</h1>
        <p className="section-subtitle max-w-2xl">
          A carefully curated line of premium pieces designed to feel special,
          with attention to fabric, fall and finishing.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {pieces.map((piece) => (
          <div
            key={piece.title}
            className="card overflow-hidden flex flex-col md:flex-row"
          >
            <div className="relative md:w-1/2 aspect-[3/4] bg-slate-100">
              <Image
                src={piece.image}
                alt={piece.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5 space-y-2 md:w-1/2 flex flex-col justify-center">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                {piece.title}
              </h2>
              <p className="text-sm text-slate-600">{piece.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

