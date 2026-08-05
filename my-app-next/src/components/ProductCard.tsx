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
      <div className="group flex flex-col sm:flex-row gap-6 p-5 border border-border/60 rounded bg-white hover:shadow-md transition-all">
        {/* Left Side: Image */}
        <div className="relative aspect-square w-full sm:w-48 shrink-0 bg-white rounded overflow-hidden border border-border/40">
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
          <div className="absolute right-2 top-2 flex flex-col gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              aria-label="Add to wishlist"
              onClick={() => toggleWishlist(product.id)}
              className={`grid h-7 w-7 place-items-center rounded-full border border-border bg-white text-foreground shadow-sm transition-colors hover:bg-primary hover:text-white ${wished ? "bg-primary text-white" : ""}`}
            >
              <Heart size={12} fill={wished ? "currentColor" : "none"} />
            </button>
            <button
              aria-label="Compare"
              onClick={() => toggleCompare(product.id)}
              className={`grid h-7 w-7 place-items-center rounded-full border border-border bg-white text-foreground shadow-sm transition-colors hover:bg-primary hover:text-white ${compared ? "bg-primary text-white" : ""}`}
            >
              <Shuffle size={12} />
            </button>
            <button
              aria-label="Quick view"
              onClick={() => setQuickViewId(product.id)}
              className="grid h-7 w-7 place-items-center rounded-full border border-border bg-white text-foreground shadow-sm transition-colors hover:bg-primary hover:text-white"
            >
              <Eye size={12} />
            </button>
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="flex-1 flex flex-col justify-center gap-1.5">
          <Link
            href={`/product/${product.slug}`}
            className="font-sans text-lg font-bold text-primary hover:text-gold transition-colors"
          >
            {product.name}
          </Link>
          <div className="flex text-amber-400 text-sm">
            {"★".repeat(Math.round(product.rating))}
            {"☆".repeat(5 - Math.round(product.rating))}
          </div>
          <p className="text-base font-bold text-gold">
            From {formatINR(product.price)}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 my-1">
            {product.description}
          </p>
          <Link
            href={`/product/${product.slug}`}
            className="inline-block px-5 py-2.5 rounded bg-primary text-white font-medium text-xs uppercase tracking-wider transition-colors hover:bg-primary/95 mt-2 self-start cursor-pointer"
          >
            Select Options
          </Link>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="group relative flex flex-col border border-border/60 rounded overflow-hidden bg-white hover:shadow-md transition-all duration-300">
      <div className="relative aspect-square w-full bg-white overflow-hidden">
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
            src={product.hoverImage}
            alt=""
            loading="lazy"
            width={900}
            height={900}
            className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
          />
        </Link>
        <div className="absolute right-3 top-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            aria-label="Add to wishlist"
            onClick={() => toggleWishlist(product.id)}
            className={`grid h-8 w-8 place-items-center rounded-full border border-border bg-white text-foreground shadow-sm transition-colors hover:bg-primary hover:text-white ${wished ? "bg-primary text-white" : ""}`}
          >
            <Heart size={14} fill={wished ? "currentColor" : "none"} />
          </button>
          <button
            aria-label="Compare"
            onClick={() => toggleCompare(product.id)}
            className={`grid h-8 w-8 place-items-center rounded-full border border-border bg-white text-foreground shadow-sm transition-colors hover:bg-primary hover:text-white ${compared ? "bg-primary text-white" : ""}`}
          >
            <Shuffle size={14} />
          </button>
          <button
            aria-label="Quick view"
            onClick={() => setQuickViewId(product.id)}
            className="grid h-8 w-8 place-items-center rounded-full border border-border bg-white text-foreground shadow-sm transition-colors hover:bg-primary hover:text-white"
          >
            <Eye size={14} />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 p-4 text-center bg-muted border-t border-border/30 flex-1 min-h-[125px]">
        <Link
          href={`/product/${product.slug}`}
          className="font-sans text-[14px] font-semibold text-primary transition-colors hover:text-gold line-clamp-1"
        >
          {product.name}
        </Link>
        <div className="flex text-amber-400 text-[11px] my-0.5">
          {"★".repeat(Math.round(product.rating))}
          {"☆".repeat(5 - Math.round(product.rating))}
        </div>
        <p className="text-[13px] font-bold text-gold">
          From {formatINR(product.price)}
        </p>
        <Link
          href={`/product/${product.slug}`}
          className="text-[11px] font-semibold text-primary hover:text-gold transition-all duration-300 opacity-0 group-hover:opacity-100 mt-1 cursor-pointer"
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
          className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 hidden md:grid h-10 w-10 place-items-center rounded-full bg-white text-foreground shadow-md hover:bg-primary hover:text-white transition-colors cursor-pointer border border-border/40"
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
          className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 hidden md:grid h-10 w-10 place-items-center rounded-full bg-white text-foreground shadow-md hover:bg-primary hover:text-white transition-colors cursor-pointer border border-border/40"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}
