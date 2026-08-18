"use client";

import Link from "next/link";
import { products } from "@/lib/products";
import { ProductGrid, ProductCarousel } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";

import pRingSolitaire from "@/assets/p-ring-solitaire.jpg";
import pEarringsStuds from "@/assets/p-earrings-studs.jpg";
import pNecklaceLayered from "@/assets/p-necklace-layered.jpg";
import pBraceletTennis from "@/assets/p-bracelet-tennis.jpg";
import bannerLunaEdit from "@/assets/banner-luna-edit.png";

import pAnklet from "@/assets/p-anklet.png";
import pToeRing from "@/assets/p-toe-ring.png";

const silverCategories = [
  { name: "SILVER RINGS", img: pRingSolitaire.src },
  { name: "SILVER EARRINGS", img: pEarringsStuds.src },
  { name: "SILVER NECKLACES", img: pNecklaceLayered.src },
  { name: "SILVER BRACELETS", img: pBraceletTennis.src },
  { name: "SILVER ANKLETS", img: pAnklet.src },
  { name: "SILVER TOE RINGS", img: pToeRing.src },
];

export default function LunaPage() {
  const newArrivals = products.filter((p) => p.slug.includes("luna")).slice(0, 8);
  if (newArrivals.length < 8) {
     const existingIds = new Set(newArrivals.map(p => p.id));
     const fallback = products
        .filter((p) => (p.category === "Pendant" || p.category === "Earrings") && !existingIds.has(p.id))
        .slice(0, 8 - newArrivals.length);
     newArrivals.push(...fallback);
  }

  const topPicks = products.filter((p) => p.topSelling).slice(0, 8);

  return (
    <div className="bg-background min-h-screen pb-16">
      
      {/* Hero Banner */}
      <section className="relative w-full h-[60vh] min-h-[400px] md:min-h-[500px] md:h-[70vh] mb-16 overflow-hidden">
        <img 
          src={bannerLunaEdit.src} 
          alt="Luna Silver Jewellery"
          className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-slate-900/40 md:bg-transparent md:bg-gradient-to-r md:from-slate-900/10 md:via-slate-900/30 md:to-slate-900/80"></div>
      </section>

      <div className="container-site mx-auto px-4">
        
        <section id="shop-by-category" className="mb-20">
          <SectionHeading title="Shop by Category" className="mb-10 text-center text-primary" />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {silverCategories.map((cat) => (
              <Link href={`/products?q=luna ${cat.name.split(" ")[1].toLowerCase()}`} key={cat.name} className="group relative block overflow-hidden aspect-square">
                <img 
                  src={cat.img} 
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent"></div>
                
                <div className="absolute inset-x-0 bottom-8 text-center px-4">
                   <div className="relative inline-block px-8 py-2">
                     <svg className="absolute inset-0 w-full h-full text-slate-400 drop-shadow-md" viewBox="0 0 100 30" preserveAspectRatio="none">
                        <path d="M 0,30 C 30,30 45,5 50,0 C 55,5 70,30 100,30" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                     </svg>
                     <span className="relative z-10 text-slate-100 font-serif text-lg tracking-widest drop-shadow-lg uppercase">
                       {cat.name}
                     </span>
                   </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-20 border-t border-border/40 pt-16">
          <SectionHeading title="New Arrivals" className="mb-10 text-center text-primary" />
          <div className="hidden md:block">
            <ProductGrid items={newArrivals.slice(0, 4)} />
          </div>
          <div className="md:hidden">
            <ProductCarousel items={newArrivals} />
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              href="/products?q=luna"
              className="inline-flex items-center gap-2 border border-primary text-primary hover:border-gold hover:text-gold text-xs font-semibold uppercase tracking-widest py-2.5 px-7 transition-colors duration-300"
            >
              View All <span className="text-sm">→</span>
            </Link>
          </div>
        </section>

        <section className="mb-20 border-t border-border/40 pt-16">
          <SectionHeading title="Top Silver Picks" className="mb-10 text-center text-primary" />
          <ProductGrid items={topPicks} />
        </section>

      </div>
    </div>
  );
}
