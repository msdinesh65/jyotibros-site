export type Variant = {
  id: string; // e.g. "blue"
  label: string; // e.g. "Blue"
  colorDotClass?: string; // Tailwind class for a small color dot
  image: string; // public path, e.g. "/images/..."
  stock: number;
};

export type Product = {
  id: string;
  slug: string; // used in /products/[slug]
  title: string;
  subtitle?: string;
  category:
    | "Summer Collections"
    | "Winter Collections"
    | "Sarees"
    | "Ethnic Wear"
    | "Sale";
  subcategory?: "Cotton/Linen Suits" | "Party Wear" | "Premium Collection";
  tags?: string[];
  price: number;
  originalPrice?: number;
  badge?: string;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  createdAt: string; // ISO date string
  description: string;
  details: string[];
  variants: Variant[];
};

export const catalog: Product[] = [
  {
    id: "ruby-maroon-kurta-set",
    slug: "ruby-maroon-gold-highlight-kurta-set",
    title: "Ruby Maroon & Gold Highlight Kurta Set",
    category: "Ethnic Wear",
    subcategory: undefined,
    tags: ["kurta-set", "festive", "office"],
    price: 1299,
    originalPrice: 2598,
    badge: "-50%",
    isNewArrival: true,
    isBestSeller: true,
    createdAt: "2026-03-10",
    description:
      "A rich ruby maroon straight kurta set with subtle gold highlights, paired with matching bottoms and a coordinated dupatta.",
    details: [
      "Kurta fabric: Cotton",
      "Sleeves length: Three quarter sleeves",
      "Style: Straight kurta with matching pant and dupatta",
      "Occasion: Office wear, festive gatherings, family functions"
    ],
    variants: [
      {
        id: "default",
        label: "Ruby Maroon",
        colorDotClass: "bg-rose-700",
        image: "/images/ruby-maroon.jpg",
        stock: 5
      }
    ]
  },
  {
    id: "lime-green-garden-kurta-set",
    slug: "lime-green-yellow-garden-kurta-set",
    title: "Lime Green & Yellow Garden Kurta Set",
    category: "Summer Collections",
    subcategory: "Cotton/Linen Suits",
    tags: ["kurta-set", "summer", "printed"],
    price: 1819,
    originalPrice: 2598,
    badge: "-30%",
    isNewArrival: true,
    isBestSeller: true,
    createdAt: "2026-03-11",
    description:
      "A refreshing lime green and yellow garden print kurta set, perfect for day events and summer outings.",
    details: [
      "Kurta fabric: Cotton",
      "Sleeves length: Three quarter sleeves",
      "Print: All‑over floral garden print",
      "Occasion: Brunch, casual outings, office"
    ],
    variants: [
      {
        id: "default",
        label: "Lime Green",
        colorDotClass: "bg-lime-500",
        image: "/images/lime-green.jpg",
        stock: 5
      }
    ]
  },
  {
    id: "dusty-sky-bloom-kurta-set",
    slug: "dusty-sky-bloom-kurta-set",
    title: "Dusty Sky Bloom Kurta Set",
    category: "Ethnic Wear",
    subcategory: undefined,
    tags: ["kurta-set", "everyday"],
    price: 1299,
    originalPrice: 2598,
    badge: "-50%",
    isNewArrival: true,
    isBestSeller: true,
    createdAt: "2026-03-09",
    description:
      "A soft dusty sky blue kurta set with delicate floral blooms, paired with matching bottom and dupatta.",
    details: [
      "Kurta fabric: Cotton blend",
      "Sleeves length: Three quarter sleeves",
      "Fit: Comfortable straight fit",
      "Occasion: Everyday wear, office, get‑togethers"
    ],
    variants: [
      {
        id: "default",
        label: "Dusty Sky",
        colorDotClass: "bg-sky-300",
        image: "/images/dusty-sky.jpg",
        stock: 5
      }
    ]
  },
  {
    id: "cotton-linen-kurta-set",
    slug: "cotton-linen-kurta-set",
    title: "Cotton Linen Kurta Set",
    subtitle: "Summer Colors",
    category: "Summer Collections",
    subcategory: "Cotton/Linen Suits",
    tags: ["kurta-set", "cotton-linen", "summer"],
    price: 999,
    originalPrice: 1999,
    badge: "-50%",
    isNewArrival: true,
    isBestSeller: true,
    createdAt: "2026-03-13",
    description:
      "A breathable cotton linen kurta set available in multiple summer-perfect colors, crafted for all-day comfort.",
    details: [
      "Fabric: Cotton linen blend",
      "Sleeves length: Three quarter sleeves",
      "Fit: Easy straight fit for all‑day comfort",
      "Occasion: Summer outings, brunch, everyday wear"
    ],
    variants: [
      {
        id: "blue",
        label: "Blue",
        colorDotClass: "bg-sky-500",
        image: "/images/NewArrival-SummerCollections-CottonLinen-Blue-999.jpg",
        stock: 8
      },
      {
        id: "pink",
        label: "Pink",
        colorDotClass: "bg-pink-400",
        image: "/images/NewArrival-SummerCollections-CottonLinen-Pink-999.jpg",
        stock: 8
      },
      {
        id: "green",
        label: "Green",
        colorDotClass: "bg-emerald-500",
        image: "/images/NewArrival-SummerCollections-CottonLinen-Green-999.jpg",
        stock: 8
      },
      {
        id: "yellow",
        label: "Yellow",
        colorDotClass: "bg-amber-400",
        image:
          "/images/NewArrival-SummerCollections-CottonLinen-Yellow-999.jpg",
        stock: 8
      }
    ]
  },
  {
    id: "summer-cotton-linen-suits-set1",
    slug: "summer-cotton-linen-suits-set1",
    title: "Summer Cotton/Linen Suit Set 1",
    subtitle: "Embroidered neck with printed dupatta",
    category: "Summer Collections",
    subcategory: "Cotton/Linen Suits",
    tags: ["kurta-set", "cotton-linen", "summer", "set1"],
    price: 1250,
    originalPrice: 1699,
    badge: "-25%",
    isNewArrival: true,
    isBestSeller: true,
    createdAt: "2026-03-14",
    description:
      "A soft cotton-linen suit set with subtle self-weave base and contrast embroidered neck, paired with a richly printed dupatta and matching bottom.",
    details: [
      "Fabric: Cotton-linen blend",
      "Neck: Embroidered yoke with geometric pattern",
      "Dupatta: All-over paisley print with detailed border",
      "Occasion: Summer gatherings, casual outings, everyday elegance"
    ],
    variants: [
      {
        id: "pink",
        label: "Pink",
        colorDotClass: "bg-rose-500",
        image:
          "/images/SummerCollection-Cotton_LinenSuits-Set1-Pink-1250-ac332dc0-ddcf-4090-a4d0-1ef139e818fd.png",
        stock: 6
      },
      {
        id: "yellow",
        label: "Yellow",
        colorDotClass: "bg-amber-400",
        image:
          "/images/SummerCollection-Cotton_LinenSuits-Set1-Yellow-1250-98fc9747-06a1-4255-aaa8-6524708723a0.png",
        stock: 6
      },
      {
        id: "green",
        label: "Green",
        colorDotClass: "bg-emerald-500",
        image:
          "/images/SummerCollection-Cotton_LinenSuits-Set1-Green-1250-6bc9e3a5-12df-4eea-943a-13c5df82ee9d.png",
        stock: 6
      }
    ]
  },
  {
    id: "2026_1001",
    slug: "pure-cambric-matching-suit-2026-1001",
    title: "Pure Cambric Matching Suit",
    subtitle: "Shirt length 47″ · Ready / Bottom 2.5 mtrs / Dupatta 2.25 mtrs",
    category: "Summer Collections",
    subcategory: "Cotton/Linen Suits",
    tags: ["New Arrival", "suits", "cotton-linen", "cambric"],
    price: 900,
    badge: "New",
    isNewArrival: true,
    createdAt: "2026-03-15",
    description:
      "Pure Cambric matching suit. Shirt length 47 ready. Bottom 2.5 mtrs, Dupatta 2.25 mtrs. Light and comfortable for summer.",
    details: [
      "Fabric: Pure Cambric",
      "Shirt length: 47″ ready",
      "Bottom: 2.5 mtrs",
      "Dupatta: 2.25 mtrs",
      "Occasion: Summer wear, casual, office"
    ],
    variants: [
      {
        id: "blue",
        label: "Blue",
        colorDotClass: "bg-blue-500",
        image: "/images/2026_1001-blue.jpg",
        stock: 5
      },
      {
        id: "green",
        label: "Green",
        colorDotClass: "bg-emerald-500",
        image: "/images/2026_1001-green.jpg",
        stock: 8
      },
      {
        id: "red",
        label: "Red",
        colorDotClass: "bg-red-500",
        image: "/images/2026_1001-red.jpg",
        stock: 3
      },
      {
        id: "yellow",
        label: "Yellow",
        colorDotClass: "bg-amber-400",
        image: "/images/2026_1001-yellow.jpg",
        stock: 9
      }
    ]
  },
  {
    id: "2026_1002",
    slug: "banarsi-silk-suit-2026-1002",
    title: "Banarsi Silk Suit",
    subtitle: "Shirt length 45 / Bottom 2.5 mtrs / Dupatta 2.25 mtrs",
    category: "Summer Collections",
    subcategory: "Party Wear",
    tags: ["New Arrival", "Silk & Partywear", "Banarsi Silk"],
    price: 1800,
    originalPrice: 2400,
    badge: "New",
    isNewArrival: true,
    isBestSeller: true,
    createdAt: "2026-03-15",
    description:
      "Pure Banarsi Silk Suit, Shirt Length 45 ready. Bottom 2.5 mtrs reyon fabric, Dupatta Banarsi 2.25 mtrs.",
    details: [
      "Fabric: Banarsi Silk",
      "Shirt length: 45 ready",
      "Bottom: 2.5 mtrs",
      "Dupatta: 2.25 mtrs",
      "Occasion: Party wear, festive, weddings"
    ],
    variants: [
      {
        id: "peach",
        label: "Peach",
        colorDotClass: "bg-orange-200",
        image: "/images/2026_1002-Peach.jpg",
        stock: 5
      },
      {
        id: "mergenta",
        label: "Mergenta",
        colorDotClass: "bg-fuchsia-500",
        image: "/images/2026_1002-Mergenta.jpg",
        stock: 5
      },
      {
        id: "red",
        label: "Red",
        colorDotClass: "bg-red-500",
        image: "/images/2026_1002-Red.jpg",
        stock: 8
      },
      {
        id: "yellow",
        label: "Yellow",
        colorDotClass: "bg-amber-400",
        image: "/images/2026_1002-Yellow.jpg",
        stock: 2
      }
    ]
  }
];

export function findProductBySlug(slug: string): Product | undefined {
  return catalog.find((product) => product.slug === slug);
}

