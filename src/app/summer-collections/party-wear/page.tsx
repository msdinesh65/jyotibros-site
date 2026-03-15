import Image from "next/image";

export default function PartyWearPage() {
  const looks = [
    {
      title: "Midnight Floral Party Kurta Set",
      image: "/images/SummerCollections-PartyWear-1.jpg"
    },
    {
      title: "Gold Highlight Anarkali Set",
      image: "/images/SummerCollections-PartyWear-2.jpg"
    },
    {
      title: "Emerald Festive Co-ord",
      image: "/images/SummerCollections-PartyWear-3.jpg"
    }
  ];

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Summer Collections
        </p>
        <h1 className="section-title">Party Wear</h1>
        <p className="section-subtitle max-w-2xl">
          Light, twirl-worthy pieces with subtle shimmer and festive detailing –
          perfect for summer weddings, sangeets and evening get-togethers.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {looks.map((look) => (
          <div key={look.title} className="card overflow-hidden flex flex-col">
            <div className="relative aspect-[3/4] bg-slate-100">
              <Image
                src={look.image}
                alt={look.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-sm font-semibold text-slate-900">
                {look.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

