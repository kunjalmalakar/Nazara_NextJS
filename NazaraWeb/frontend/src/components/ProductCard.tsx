"use client";

import Link from "next/link";
import { Eye, Heart, Shuffle, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { formatINR, type Product } from "@/lib/products";
import { useShop } from "@/lib/store";

export function ProductCard({
  product,
  layout = "grid",
}: {
  product: Product;
  layout?: "grid" | "list";
}) {
  const { wishlist, toggleWishlist, toggleCompare, compare, setQuickViewId } =
    useShop();
  const wished = wishlist.includes(product.id);
  const compared = compare.includes(product.id);

  if (layout === "list") {
    return (
      <div className="group flex flex-col sm:flex-row gap-6 p-5 border border-[#EAD5E2] rounded-2xl bg-white hover:shadow-xl transition-all">
        {/* Left Side: Image */}
        <div className="relative aspect-square w-full sm:w-48 shrink-0 bg-[#FAF3EE] rounded-xl overflow-hidden border border-border/30">
          <Link
            href={`/product/${product.slug}`}
            className="block h-full w-full relative"
          >
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              width={400}
              height={400}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
            />
            <img
              src={product.hoverImage}
              alt=""
              loading="lazy"
              width={400}
              height={400}
              className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
            />
          </Link>
          <div className="absolute right-2 top-2 flex flex-col gap-2 z-10">
            <button
              aria-label="Add to wishlist"
              onClick={() => toggleWishlist(product.id)}
              className={`grid h-8 w-8 place-items-center rounded-full border border-border/30 bg-white text-[#3C1A35] shadow-sm transition-all hover:bg-primary hover:text-white ${wished ? "bg-primary text-white" : ""}`}
            >
              <Heart size={14} fill={wished ? "currentColor" : "none"} />
            </button>
            <button
              aria-label="Compare"
              onClick={() => toggleCompare(product.id)}
              className={`grid h-8 w-8 place-items-center rounded-full border border-border/30 bg-white text-[#3C1A35] shadow-sm transition-all hover:bg-primary hover:text-white ${compared ? "bg-primary text-white" : ""}`}
            >
              <Shuffle size={14} />
            </button>
            <button
              aria-label="Quick view"
              onClick={() => setQuickViewId(product.id)}
              className="grid h-8 w-8 place-items-center rounded-full border border-border/30 bg-white text-[#3C1A35] shadow-sm transition-all hover:bg-primary hover:text-white"
            >
              <Eye size={14} />
            </button>
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="flex-1 flex flex-col justify-center gap-2">
          <Link
            href={`/product/${product.slug}`}
            className="font-display text-lg font-bold text-[#3C1A35] hover:text-gold transition-colors"
          >
            {product.name}
          </Link>
          <div className="flex text-amber-400 text-sm tracking-widest">
            {"★".repeat(Math.round(product.rating || 5))}
            {"☆".repeat(5 - Math.round(product.rating || 5))}
          </div>
          <p className="text-base font-bold text-gold font-display">
            From {formatINR(product.price)}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 my-1">
            {product.description}
          </p>
          <Link
            href={`/product/${product.slug}`}
            className="text-xs sm:text-sm font-semibold text-[#3C1A35] hover:text-gold transition-colors hover:underline underline-offset-4 cursor-pointer mt-1 self-start"
          >
            Select Options
          </Link>
        </div>
      </div>
    );
  }

  // Grid view (default - matching reference image)
  return (
    <div className="group relative flex flex-col border border-[#EAD5E2] rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-all duration-300">
      
      {/* Top Image Container */}
      <div className="relative aspect-square w-full bg-[#FAF3EE] overflow-hidden flex items-center justify-center">
        <Link
          href={`/product/${product.slug}`}
          className="block h-full w-full relative"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={900}
            height={900}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <img
            src={product.hoverImage || product.image}
            alt=""
            loading="lazy"
            width={900}
            height={900}
            className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
          />
        </Link>

        {/* Vertical Stack Action Buttons on Top Right */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 z-10">
          {/* Wishlist Button */}
          <button
            aria-label="Add to wishlist"
            onClick={() => toggleWishlist(product.id)}
            className={`grid h-9 w-9 place-items-center rounded-full border border-border/30 bg-white text-[#3C1A35] shadow-md transition-all duration-300 hover:bg-primary hover:text-white ${wished ? "bg-primary text-white" : ""}`}
          >
            <Heart size={16} fill={wished ? "currentColor" : "none"} />
          </button>

          {/* Compare Button */}
          <button
            aria-label="Compare"
            onClick={() => toggleCompare(product.id)}
            className={`grid h-9 w-9 place-items-center rounded-full border border-border/30 bg-white text-[#3C1A35] shadow-md transition-all duration-300 hover:bg-primary hover:text-white ${compared ? "bg-primary text-white" : ""}`}
          >
            <Shuffle size={16} />
          </button>

          {/* Quick View Button */}
          <button
            aria-label="Quick view"
            onClick={() => setQuickViewId(product.id)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border/30 bg-white text-[#3C1A35] shadow-md transition-all duration-300 hover:bg-primary hover:text-white"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>

      {/* Bottom Content Container (Lavender / Soft Blush Background matching SS) */}
      <div className="flex flex-col items-center justify-center gap-1.5 p-4 sm:p-5 text-center bg-[#F2E5ED] border-t border-[#EAD5E2]/40 flex-1 min-h-[135px]">
        <Link
          href={`/product/${product.slug}`}
          className="font-display text-sm sm:text-base font-semibold text-[#3C1A35] transition-colors hover:text-gold line-clamp-1"
        >
          {product.name}
        </Link>

        {/* Rating Stars */}
        <div className="flex text-amber-400 text-xs sm:text-sm my-0.5 tracking-widest justify-center">
          {"★".repeat(Math.round(product.rating || 5))}
          {"☆".repeat(5 - Math.round(product.rating || 5))}
        </div>

        {/* Price */}
        <p className="text-sm sm:text-base font-bold text-gold font-display">
          From {formatINR(product.price)}
        </p>

        {/* Select Options Link */}
        <Link
          href={`/product/${product.slug}`}
          className="text-xs sm:text-sm font-semibold text-[#3C1A35] hover:text-gold transition-all duration-300 mt-1 cursor-pointer hover:underline underline-offset-4"
        >
          Select Options
        </Link>
      </div>

    </div>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {items.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export function ProductCarousel({ items }: { items: Product[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeft(scrollLeft > 5);
      setShowRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = containerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
    }
    window.addEventListener("resize", checkScroll);
    return () => {
      if (el) {
        el.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, [items]);

  const scroll = (dir: "left" | "right") => {
    if (containerRef.current) {
      const amount = dir === "left" ? -300 : 300;
      containerRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group w-full">
      {/* Left scroll button */}
      {showLeft && (
        <button
          aria-label="Scroll left"
          onClick={() => scroll("left")}
          className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 hidden md:grid h-10 w-10 place-items-center rounded-full bg-white text-[#3C1A35] shadow-md hover:bg-primary hover:text-white transition-colors cursor-pointer border border-border/40"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Scroll container */}
      <div
        ref={containerRef}
        className="no-scrollbar -mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-4 scroll-smooth"
      >
        {items.map((p) => (
          <div key={p.id} className="w-[230px] shrink-0 snap-start sm:w-64 md:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      {/* Right scroll button */}
      {showRight && (
        <button
          aria-label="Scroll right"
          onClick={() => scroll("right")}
          className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 hidden md:grid h-10 w-10 place-items-center rounded-full bg-white text-[#3C1A35] shadow-md hover:bg-primary hover:text-white transition-colors cursor-pointer border border-border/40"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}
