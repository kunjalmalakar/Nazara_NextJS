"use client";

import Link from "next/link";
import { products } from "@/lib/products";
import { ProductGrid, ProductCarousel } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";

const occasions = [
  { name: "ENGAGEMENT", img: "/engagement.png" },
  { name: "HALDI", img: "/haldi.png" },
  { name: "MEHENDI", img: "/mehendi.png" },
  { name: "SANGEET", img: "/sangeet.png" },
  { name: "COCKTAIL", img: "/cocktail.png" },
  { name: "RECEPTION", img: "/reception.png" },
];

const looks = [
  { name: "KUNDAN", img: products[11].image },
  { name: "GOLD LOOK", img: products[12].image },
  { name: "AMERICAN DIAMOND", img: products[0].image },
];

export default function AabhaPage() {
  const newArrivals = products.slice(0, 8);
  const topPicks = products.filter((p) => p.topSelling).slice(0, 8);

  return (
    <div className="bg-background min-h-screen pb-16">
      


      {/* Hero Banner matching SS 1 */}
      <section className="relative w-full h-[60vh] min-h-[400px] md:min-h-[500px] md:h-[70vh] mb-16 overflow-hidden">
        <img 
          src="/hero-bride.png" 
          alt="Aabha Bridal Jewellery"
          className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
        />
        {/* Dark overlay on mobile for text contrast, and gradient on desktop */}
        <div className="absolute inset-0 bg-black/40 md:bg-transparent md:bg-gradient-to-r md:from-transparent md:via-black/20 md:to-black/70"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center md:items-end md:justify-center md:pr-[15%] text-center">
          <h1 className="text-6xl md:text-[6rem] font-serif text-[#d79c5c] tracking-wider mb-2 drop-shadow-md">
            AABHA
          </h1>
          <p className="text-lg md:text-2xl text-white font-light tracking-widest mb-8 font-serif">
            Jewels from the House of Royals
          </p>
        </div>
      </section>

      <div className="container-site mx-auto px-4">
        
        {/* SHOP BY OCCASION matching SS 2 & 3 */}
        <section id="shop-by-occasion" className="mb-20">
          <SectionHeading title="Shop by Occasion" className="mb-10 text-center text-primary" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {occasions.map((occ) => (
              <Link href={`/products?q=${occ.name.toLowerCase()}`} key={occ.name} className="group relative block overflow-hidden aspect-square">
                <img 
                  src={occ.img} 
                  alt={occ.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Bottom dark gradient for text legibility */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#4a0a14]/90 via-[#4a0a14]/50 to-transparent"></div>
                
                <div className="absolute inset-x-0 bottom-8 text-center px-4">
                   {/* Decorative border matching voylla curly border style */}
                   <div className="relative inline-block px-8 py-2">
                     <svg className="absolute inset-0 w-full h-full text-[#e8c187] drop-shadow-md" viewBox="0 0 100 30" preserveAspectRatio="none">
                        <path d="M 0,30 C 30,30 45,5 50,0 C 55,5 70,30 100,30" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                     </svg>
                     <span className="relative z-10 text-[#f5d7a6] font-serif text-xl tracking-widest drop-shadow-lg uppercase">
                       {occ.name}
                     </span>
                   </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SHOP BY LOOK matching SS 4 & 5 */}
        <section className="mb-20">
          <SectionHeading title="Shop by Look" className="mb-10 text-center text-primary" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {looks.map((look) => (
              <Link href={`/products?q=${look.name.toLowerCase().replace(' ','-')}`} key={look.name} className="group relative block overflow-hidden aspect-square">
                <img 
                  src={look.img} 
                  alt={look.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#4a0a14]/90 via-[#4a0a14]/50 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-8 text-center px-4">
                   {/* Decorative border matching voylla curly border style */}
                   <div className="relative inline-block px-8 py-2">
                     <svg className="absolute inset-0 w-full h-full text-[#e8c187] drop-shadow-md" viewBox="0 0 100 30" preserveAspectRatio="none">
                        <path d="M 0,30 C 30,30 45,5 50,0 C 55,5 70,30 100,30" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                     </svg>
                     <span className="relative z-10 text-[#f5d7a6] font-serif text-xl md:text-lg lg:text-xl tracking-widest drop-shadow-lg uppercase">
                       {look.name}
                     </span>
                   </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Existing product grid sections below */}
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
              href="/products"
              className="inline-flex items-center gap-2 border border-primary text-primary hover:border-gold hover:text-gold text-xs font-semibold uppercase tracking-widest py-2.5 px-7 transition-colors duration-300"
            >
              View All <span className="text-sm">→</span>
            </Link>
          </div>
        </section>

        <section className="mb-20 border-t border-border/40 pt-16">
          <SectionHeading title="Top Wedding Picks" className="mb-10 text-center text-primary" />
          <ProductGrid items={topPicks} />
        </section>

      </div>
    </div>
  );
}
