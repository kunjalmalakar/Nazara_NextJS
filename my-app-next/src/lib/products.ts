import ringSolitaire from "@/assets/p-ring-solitaire.jpg";
import ringHalo from "@/assets/p-ring-halo.jpg";
import ringBand from "@/assets/p-ring-band.jpg";
import ringFancy from "@/assets/p-ring-fancy.jpg";
import necklaceLayered from "@/assets/p-necklace-layered.jpg";
import necklaceKnot from "@/assets/p-necklace-knot.jpg";
import pendantDrop from "@/assets/p-pendant-drop.jpg";
import earringsStuds from "@/assets/p-earrings-studs.jpg";
import braceletTennis from "@/assets/p-bracelet-tennis.jpg";
import bangleGold from "@/assets/p-bangle-gold.jpg";

export type Category =
  | "Rings"
  | "Necklace"
  | "Pendant"
  | "Earrings"
  | "Bracelets & Bangles";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  collection: "Diamond Jewellery" | "Gemstone Jewellery" | "Gold Jewellery" | "Silver Jewellery";
  price: number;
  rating: number;
  reviews: number;
  image: string;
  hoverImage: string;
  description: string;
  weight: string;
  dimensions: string;
  purity: string;
  clarity: string;
  topSelling?: boolean;
  featured?: boolean;
}

const desc = (n: string, c: string) =>
  `The ${n} is handcrafted with certified lab-grown diamonds set in hallmarked gold. Designed for the independent mind, this ${c.toLowerCase()} piece pairs sophisticated simplicity with everyday wearability — ethical, sustainable and uncompromising in quality.`;

const mk = (
  p: Omit<Product, "description"> & Partial<Pick<Product, "description">>,
): Product => ({ description: desc(p.name, p.category), ...p });

export const products: Product[] = [
  mk({ id: "1", slug: "twist-crown-solitaire", name: "Twist Crown Solitaire", category: "Rings", collection: "Diamond Jewellery", price: 42500, rating: 5, reviews: 3, image: ringFancy.src, hoverImage: ringSolitaire.src, weight: "3.2 g", dimensions: "6 × 6 × 4 mm", purity: "18K Gold", clarity: "VS1 / E-F", topSelling: true, featured: true }),
  mk({ id: "2", slug: "classic-princess-solitaire", name: "Classic Aabha Princess Solitaire", category: "Rings", collection: "Diamond Jewellery", price: 58900, rating: 5, reviews: 2, image: ringSolitaire.src, hoverImage: ringFancy.src, weight: "3.6 g", dimensions: "6.5 × 6.5 × 4 mm", purity: "18K Gold", clarity: "VVS2 / E-F", topSelling: true, featured: true }),
  mk({ id: "3", slug: "halo-crown", name: "Luna Halo Crown", category: "Rings", collection: "Silver Jewellery", price: 64200, rating: 4.5, reviews: 4, image: ringHalo.src, hoverImage: ringBand.src, weight: "3.9 g", dimensions: "8 × 8 × 5 mm", purity: "18K Rose Gold", clarity: "VS1 / F-G", topSelling: true }),
  mk({ id: "4", slug: "eternal-embrace-band", name: "Eternal Embrace Band for Him", category: "Rings", collection: "Diamond Jewellery", price: 36800, rating: 5, reviews: 1, image: ringBand.src, hoverImage: ringHalo.src, weight: "2.8 g", dimensions: "2.2 mm band", purity: "14K White Gold", clarity: "VS2 / F-G", topSelling: true, featured: true }),
  mk({ id: "5", slug: "aurora-everyday-ring", name: "Aurora Everyday Ring for Him", category: "Rings", collection: "Gold Jewellery", price: 18400, rating: 0, reviews: 0, image: ringBand.src, hoverImage: ringSolitaire.src, weight: "2.1 g", dimensions: "1.8 mm band", purity: "14K Gold", clarity: "SI1 / G-H" }),
  mk({ id: "6", slug: "circle-layered-necklace", name: "Circle Layered Necklace", category: "Necklace", collection: "Diamond Jewellery", price: 32600, rating: 5, reviews: 2, image: necklaceLayered.src, hoverImage: pendantDrop.src, weight: "4.4 g", dimensions: "16–18 in chain", purity: "14K Gold", clarity: "VS2 / F-G", topSelling: true, featured: true }),
  mk({ id: "7", slug: "eternal-knot-necklace", name: "Eternal Knot Necklace", category: "Necklace", collection: "Diamond Jewellery", price: 27900, rating: 4.5, reviews: 2, image: necklaceKnot.src, hoverImage: necklaceLayered.src, weight: "3.8 g", dimensions: "18 in chain", purity: "14K Rose Gold", clarity: "VS1 / E-F", topSelling: true, featured: true }),
  mk({ id: "8", slug: "dew-drop-pendant", name: "Luna Dew Drop Pendant", category: "Pendant", collection: "Silver Jewellery", price: 45300, rating: 5, reviews: 3, image: pendantDrop.src, hoverImage: necklaceKnot.src, weight: "3.1 g", dimensions: "9 × 6 mm drop", purity: "18K Gold", clarity: "VVS1 / D-E", topSelling: true, featured: true }),
  mk({ id: "9", slug: "luna-solitaire-pendant", name: "Luna Solitaire Pendant", category: "Pendant", collection: "Silver Jewellery", price: 23800, rating: 5, reviews: 1, image: necklaceLayered.src, hoverImage: pendantDrop.src, weight: "2.4 g", dimensions: "5 mm stone", purity: "14K Gold", clarity: "VS2 / F-G", topSelling: true }),
  mk({ id: "10", slug: "geometric-bloom-studs", name: "Geometric Bloom Studs", category: "Earrings", collection: "Diamond Jewellery", price: 38700, rating: 5, reviews: 5, image: earringsStuds.src, hoverImage: ringHalo.src, weight: "2.9 g (pair)", dimensions: "8 × 8 mm", purity: "18K Gold", clarity: "VS1 / E-F", topSelling: true, featured: true }),
  mk({ id: "11", slug: "petal-cluster-studs", name: "Petal Cluster Studs", category: "Earrings", collection: "Gemstone Jewellery", price: 21500, rating: 4, reviews: 1, image: earringsStuds.src, hoverImage: pendantDrop.src, weight: "2.2 g (pair)", dimensions: "6 × 6 mm", purity: "14K Gold", clarity: "SI1 / G-H", topSelling: true }),
  mk({ id: "12", slug: "riviera-tennis-bracelet", name: "Aabha Riviera Tennis Bracelet", category: "Bracelets & Bangles", collection: "Diamond Jewellery", price: 148000, rating: 5, reviews: 2, image: braceletTennis.src, hoverImage: bangleGold.src, weight: "9.6 g", dimensions: "7 in", purity: "18K White Gold", clarity: "VS1 / E-F", featured: true }),
  mk({ id: "13", slug: "heritage-gold-bangle", name: "Heritage Gold Bangle", category: "Bracelets & Bangles", collection: "Gold Jewellery", price: 86400, rating: 5, reviews: 1, image: bangleGold.src, hoverImage: braceletTennis.src, weight: "8.2 g", dimensions: "2.6 size", purity: "22K Gold", clarity: "—", topSelling: true }),
  mk({ id: "14", slug: "stellar-dual-chain", name: "Stellar Dual Chain", category: "Necklace", collection: "Gold Jewellery", price: 54800, rating: 0, reviews: 0, image: necklaceKnot.src, hoverImage: necklaceLayered.src, weight: "5.6 g", dimensions: "16–20 in", purity: "18K Gold", clarity: "—" }),
  mk({ id: "15", slug: "meadow-halo-studs", name: "Meadow Halo Studs", category: "Earrings", collection: "Diamond Jewellery", price: 56200, rating: 5, reviews: 2, image: earringsStuds.src, hoverImage: ringSolitaire.src, weight: "3.4 g (pair)", dimensions: "9 × 9 mm", purity: "18K Gold", clarity: "VVS2 / E-F" }),
  mk({ id: "16", slug: "cascade-eternity-ring", name: "Cascade Eternity Ring", category: "Rings", collection: "Diamond Jewellery", price: 74500, rating: 5, reviews: 1, image: ringBand.src, hoverImage: ringFancy.src, weight: "3.3 g", dimensions: "2.4 mm band", purity: "18K White Gold", clarity: "VS1 / E-F", featured: true }),
  mk({ id: "17", slug: "solstice-charm-bracelet", name: "Solstice Charm Bracelet", category: "Bracelets & Bangles", collection: "Gemstone Jewellery", price: 34900, rating: 4.5, reviews: 2, image: braceletTennis.src, hoverImage: bangleGold.src, weight: "6.1 g", dimensions: "6.5–7.5 in", purity: "14K Gold", clarity: "SI1 / G-H" }),
  mk({ id: "18", slug: "regal-crown-necklace", name: "Aabha Regal Crown Necklace", category: "Necklace", collection: "Diamond Jewellery", price: 342000, rating: 5, reviews: 1, image: necklaceLayered.src, hoverImage: necklaceKnot.src, weight: "14.8 g", dimensions: "17 in", purity: "18K Gold", clarity: "VVS1 / D-E" }),
  mk({ id: "19", slug: "orbit-solitaire-ring", name: "Orbit Solitaire Ring for Him", category: "Rings", collection: "Diamond Jewellery", price: 13400, rating: 0, reviews: 0, image: ringSolitaire.src, hoverImage: ringBand.src, weight: "1.9 g", dimensions: "4 mm stone", purity: "14K Gold", clarity: "SI2 / G-H" }),
  mk({ id: "20", slug: "royal-kada-bangle", name: "Royal Kada Bangle for Him", category: "Bracelets & Bangles", collection: "Gold Jewellery", price: 128500, rating: 5, reviews: 1, image: bangleGold.src, hoverImage: braceletTennis.src, weight: "12.4 g", dimensions: "2.8 size", purity: "22K Gold", clarity: "—" }),
];

export const categorySlugs: Record<string, Category> = {
  rings: "Rings",
  necklace: "Necklace",
  pendant: "Pendant",
  earrings: "Earrings",
  "bracelets-bangles": "Bracelets & Bangles",
};

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductById = (id: string) =>
  products.find((p) => p.id === id);

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const priceBreakup = (p: Product) => {
  const diamond = Math.round(p.price * 0.52);
  const metal = Math.round(p.price * 0.34);
  const making = p.price - diamond - metal;
  return { diamond, metal, making, total: p.price };
};
