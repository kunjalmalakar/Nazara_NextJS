"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
  ShoppingCart,
  Star,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { formatINR, products } from "@/lib/products";
import { useShop } from "@/lib/store";
import { StarRating } from "./StarRating";
import { NazaraLogo } from "./NazaraLogo";

const categoryColumns = [
  {
    title: "Rings",
    slug: "rings",
    links: ["Engagement Rings", "Eternity Rings", "Everyday Rings", "Fancy Ring"],
  },
  {
    title: "Bracelets & Bangles",
    slug: "bracelets-bangles",
    links: ["Bangles", "Everyday Wear Bracelets"],
  },
  {
    title: "Necklace",
    slug: "necklace",
    links: ["Dual Chain", "Everyday Wear Necklace", "Occasion Wear"],
  },
];

const earringsLinks = ["Studs", "Hoops", "Drops", "Jhumkas"];
const pendantsLinks = ["Solitaire Pendants", "Alphabet Pendants", "Heart Pendants"];

export function Header() {
  const { cartCount, wishlist, setCartOpen, setLoginOpen } = useShop();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsTab, setProductsTab] = useState<"Rings" | "Pendant" | "Necklace">("Rings");
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const featured = products.find((p) => p.slug === "halo-crown")!;
  const tabProducts = products.filter((p) => p.category === productsTab).slice(0, 3);
  const topRated = products.filter((p) => p.rating === 5).slice(0, 3);

  const trendingKeywords = [
    "Solitaire Rings",
    "Tennis Bracelet",
    "Luna Pendant",
    "Aabha Solitaire",
    "18K Gold",
    "Eternity Band",
  ];

  const searchResults = query.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()) ||
            p.purity.toLowerCase().includes(query.toLowerCase()) ||
            p.collection.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 4)
    : [];

  const handleSelectKeyword = (keyword: string) => {
    setQuery(keyword);
    setSearchFocused(true);
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    setSearchFocused(false);
    const url = query ? `/products?q=${encodeURIComponent(query)}` : "/products";
    router.push(url);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur transition-all duration-300 ${
        scrolled ? "shadow-md border-border/80" : ""
      }`}
    >
      {/* Row 1: Logo, Search Bar, Action Buttons */}
      <div
        className={`container-site flex items-center justify-between gap-4 transition-all duration-300 ${
          scrolled ? "pt-1.5 pb-1" : "pt-3.5 pb-2"
        }`}
      >
        {/* Left: Menu & Logo */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            aria-label="Open menu"
            className="lg:hidden shrink-0"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} className="text-primary" />
          </button>
          <Link
            href="/"
            className="flex flex-col items-center min-w-0 text-center leading-none hover:opacity-90 transition-all duration-300"
          >
            <NazaraLogo variant="primary" size={scrolled ? "sm" : "md"} />
          </Link>
        </div>

        {/* Center: Luxury Interactive Search Bar */}
        <div
          ref={searchContainerRef}
          className="relative flex-1 max-w-[200px] xs:max-w-[280px] sm:max-w-[360px] md:max-w-[460px] lg:max-w-[540px] mx-auto"
        >
          <form onSubmit={submitSearch} className="relative w-full">
            <div
              className={`relative flex items-center w-full rounded-[18px] border-2 transition-all duration-300 p-1 ${
                searchFocused
                  ? "bg-gradient-to-b from-[#faf6f3] to-[#f4ebe5] border-[#4c2344] shadow-[0_12px_32px_rgba(76,35,68,0.22),inset_0_1px_2px_rgba(255,255,255,0.9)] ring-2 ring-[#4c2344]/20"
                  : "bg-gradient-to-b from-[#fbf8f5] to-[#f3ece6] border-[#4c2344]/40 shadow-[0_8px_24px_rgba(0,0,0,0.14),0_2px_6px_rgba(76,35,68,0.1)] hover:border-[#4c2344] hover:shadow-[0_10px_28px_rgba(76,35,68,0.18)]"
              }`}
            >
              <div className="pl-3 pr-2 text-[#4c2344]">
                <Search size={18} strokeWidth={2} />
              </div>
              <input
                type="text"
                value={query}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearchFocused(true);
                }}
                placeholder="Search lab-grown rings, necklaces, bracelets..."
                className="w-full bg-transparent py-1.5 pr-10 text-xs sm:text-sm text-[#4c2344] outline-none placeholder:text-[#4c2344]/60 font-medium tracking-wide"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-12 text-[#4c2344]/60 hover:text-primary transition-colors p-1"
                >
                  <X size={14} />
                </button>
              ) : null}
              <button
                type="submit"
                aria-label="Submit search"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4c2344] text-white border border-[#663253]/30 shadow-[0_3px_10px_rgba(76,35,68,0.3)] hover:bg-[#381932] hover:shadow-[0_4px_14px_rgba(76,35,68,0.45)] active:scale-95 transition-all cursor-pointer"
              >
                <ArrowRight size={16} strokeWidth={2.2} />
              </button>
            </div>
          </form>

          {/* Interactive Live Search Dropdown */}
          {searchFocused && (
            <div className="absolute top-full left-0 right-0 z-50 mt-2 overflow-hidden rounded-2xl border border-primary/15 bg-card p-4 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200">
              {query.trim() === "" ? (
                <div>
                  <div className="mb-3 flex items-center justify-between border-b border-border/50 pb-2">
                    <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                      <TrendingUp size={13} className="text-gold" /> Trending Searches
                    </span>
                    <span className="text-[10px] text-muted-foreground">Popular now</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {trendingKeywords.map((kw) => (
                      <button
                        key={kw}
                        type="button"
                        onClick={() => handleSelectKeyword(kw)}
                        className="rounded-full bg-secondary/80 px-3 py-1 text-xs font-medium text-foreground hover:bg-primary hover:text-white transition-all cursor-pointer"
                      >
                        {kw}
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-border/50 pt-3">
                    <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-2.5">
                      <Sparkles size={13} className="text-gold" /> Top Rated Creations
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {topRated.map((p) => (
                        <Link
                          key={p.id}
                          href={`/product/${p.slug}`}
                          onClick={() => setSearchFocused(false)}
                          className="group flex flex-col items-center rounded-lg border border-border/40 p-2 text-center transition-all hover:border-gold/50 hover:bg-secondary/40"
                        >
                          <div className="relative h-14 w-14 overflow-hidden rounded-md bg-secondary mb-1">
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              sizes="56px"
                              className="object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                          <span className="text-[11px] font-medium text-foreground line-clamp-1 group-hover:text-primary">
                            {p.name}
                          </span>
                          <span className="text-[10px] font-bold text-gold">
                            {formatINR(p.price)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-2 flex items-center justify-between border-b border-border/50 pb-2">
                    <span className="text-xs font-semibold text-muted-foreground">
                      Results for &ldquo;<span className="text-primary font-bold">{query}</span>&rdquo;
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {searchResults.length} items found
                    </span>
                  </div>

                  {searchResults.length > 0 ? (
                    <div className="space-y-2 mb-3">
                      {searchResults.map((p) => (
                        <Link
                          key={p.id}
                          href={`/product/${p.slug}`}
                          onClick={() => setSearchFocused(false)}
                          className="group flex items-center gap-3 rounded-xl p-2 transition-all hover:bg-secondary/60"
                        >
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-secondary border border-border/40">
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              sizes="48px"
                              className="object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                              {p.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                                {p.category}
                              </span>
                              <span className="text-[10px] text-border">•</span>
                              <span className="text-[10px] text-gold font-medium">
                                {p.purity}
                              </span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-xs font-bold text-primary">
                              {formatINR(p.price)}
                            </span>
                            <div className="flex items-center justify-end gap-0.5 text-[10px] text-amber-500 mt-0.5">
                              <Star size={10} fill="currentColor" />
                              <span>{p.rating}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="py-6 text-center">
                      <p className="text-xs text-muted-foreground">
                        No diamonds or jewellery matching &ldquo;{query}&rdquo;
                      </p>
                      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                        {trendingKeywords.slice(0, 3).map((kw) => (
                          <button
                            key={kw}
                            type="button"
                            onClick={() => handleSelectKeyword(kw)}
                            className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] hover:border-gold hover:text-gold transition-all cursor-pointer"
                          >
                            Try &ldquo;{kw}&rdquo;
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    onClick={submitSearch}
                    className="w-full rounded-xl bg-primary py-2.5 text-center text-xs font-bold text-primary-foreground tracking-wider uppercase hover:bg-primary/90 transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer mt-2"
                  >
                    <span>View all matching results</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          {/* Account Button */}
          <button
            aria-label="Account"
            onClick={() => setLoginOpen(true)}
            title="My Account"
            className="hidden h-9 w-9 items-center justify-center rounded-full bg-primary text-white border border-white/10 shadow-sm transition-all duration-300 hover:bg-[#3b1b34] hover:border-gold/50 hover:scale-105 active:scale-95 cursor-pointer sm:flex"
          >
            <User size={17} />
          </button>

          {/* Cart Button */}
          <button
            aria-label="Cart"
            onClick={() => setCartOpen(true)}
            className="relative flex h-9 items-center gap-2 rounded-full bg-primary px-4 text-xs font-semibold uppercase tracking-wider text-white border border-white/10 shadow-sm transition-all duration-300 hover:bg-[#3b1b34] hover:border-gold/50 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline font-sans tracking-wide">My Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4.5 min-w-4.5 px-1 items-center justify-center rounded-full bg-gold text-[#220317] text-[9.5px] font-extrabold shadow-md border border-white animate-in zoom-in-50 duration-200">
                {cartCount}
              </span>
            )}
          </button>

          {/* Wishlist Button */}
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            title="View Wishlist"
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white border border-white/10 shadow-sm transition-all duration-300 hover:bg-[#3b1b34] hover:border-gold/50 hover:scale-105 active:scale-95"
          >
            <Star size={17} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4.5 min-w-4.5 px-1 items-center justify-center rounded-full bg-gold text-[#220317] text-[9.5px] font-extrabold shadow-md border border-white animate-in zoom-in-50 duration-200">
                {wishlist.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Row 2: Navigation Links (Desktop only) */}
      <div
        className={`hidden lg:block bg-background border-t border-border/40 transition-all duration-300 ${
          scrolled ? "py-1 text-[11px]" : "pt-1.5 pb-2 text-xs"
        }`}
      >
        <div className="container-site flex justify-center">
          <nav
            className={`flex items-center transition-all duration-300 font-bold text-primary uppercase tracking-wider ${
              scrolled ? "gap-6 text-[11px]" : "gap-8 text-xs"
            }`}
          >
            {/* ready to ship */}
            <Link 
              href="/products?highlight=bestseller" 
              className="py-2 transition-colors hover:text-gold"
            >
              ready to ship
            </Link>

            {/* rings dropdown */}
            <div className="group relative">
              <Link 
                href="/products?category=rings" 
                className="py-2 flex items-center gap-1 transition-colors hover:text-gold"
              >
                rings <ChevronDown size={12} />
              </Link>
              <div className="invisible absolute left-1/2 top-full z-50 w-48 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="rounded-lg border border-border bg-card p-4 shadow-xl text-left normal-case tracking-normal">
                  <ul className="space-y-2 text-xs text-muted-foreground font-normal">
                    {categoryColumns[0].links.map((l) => (
                      <li key={l}>
                        <Link 
                          href={`/products?category=rings&q=${encodeURIComponent(l)}`} 
                          className="transition-colors hover:text-gold block py-0.5"
                        >
                          {l}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* earings dropdown */}
            <div className="group relative">
              <Link 
                href="/products?category=earrings" 
                className="py-2 flex items-center gap-1 transition-colors hover:text-gold"
              >
                earings <ChevronDown size={12} />
              </Link>
              <div className="invisible absolute left-1/2 top-full z-50 w-48 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="rounded-lg border border-border bg-card p-4 shadow-xl text-left normal-case tracking-normal">
                  <ul className="space-y-2 text-xs text-muted-foreground font-normal">
                    {earringsLinks.map((l) => (
                      <li key={l}>
                        <Link 
                          href={`/products?category=earrings&q=${encodeURIComponent(l)}`} 
                          className="transition-colors hover:text-gold block py-0.5"
                        >
                          {l}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Pandents dropdown */}
            <div className="group relative">
              <Link 
                href="/products?category=pendant" 
                className="py-2 flex items-center gap-1 transition-colors hover:text-gold"
              >
                Pandents <ChevronDown size={12} />
              </Link>
              <div className="invisible absolute left-1/2 top-full z-50 w-48 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="rounded-lg border border-border bg-card p-4 shadow-xl text-left normal-case tracking-normal">
                  <ul className="space-y-2 text-xs text-muted-foreground font-normal">
                    {pendantsLinks.map((l) => (
                      <li key={l}>
                        <Link 
                          href={`/products?category=pendant&q=${encodeURIComponent(l)}`} 
                          className="transition-colors hover:text-gold block py-0.5"
                        >
                          {l}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* braclets dropdown */}
            <div className="group relative">
              <Link 
                href="/products?category=bracelets-bangles" 
                className="py-2 flex items-center gap-1 transition-colors hover:text-gold"
              >
                braclets <ChevronDown size={12} />
              </Link>
              <div className="invisible absolute left-1/2 top-full z-50 w-48 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="rounded-lg border border-border bg-card p-4 shadow-xl text-left normal-case tracking-normal">
                  <ul className="space-y-2 text-xs text-muted-foreground font-normal">
                    {categoryColumns[1].links.map((l) => (
                      <li key={l}>
                        <Link 
                          href={`/products?category=bracelets-bangles&q=${encodeURIComponent(l)}`} 
                          className="transition-colors hover:text-gold block py-0.5"
                        >
                          {l}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 9KT */}
            <Link 
              href="/products?purity=9KT" 
              className="py-2 transition-colors hover:text-gold"
            >
              9KT
            </Link>

            {/* aabha */}
            <Link 
              href="/products?q=aabha" 
              className="py-2 transition-colors hover:text-gold"
            >
              aabha
            </Link>

            {/* luna */}
            <Link 
              href="/products?q=luna" 
              className="py-2 transition-colors hover:text-gold"
            >
              luna
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <button aria-label="Close menu" className="absolute inset-0 bg-foreground/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-80 max-w-[85vw] flex-col overflow-y-auto bg-background p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-lg font-bold text-primary">Nazara Diamonds</span>
              <button aria-label="Close" onClick={() => setMobileOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-1 text-sm" onClick={() => setMobileOpen(false)}>
              <Link href="/" className="rounded px-3 py-2.5 hover:bg-secondary">Home</Link>
              <Link href="/products?highlight=bestseller" className="rounded px-3 py-2.5 hover:bg-secondary font-medium">ready to ship</Link>
              <Link href="/products?category=rings" className="rounded px-3 py-2.5 hover:bg-secondary font-medium">rings</Link>
              <Link href="/products?category=earrings" className="rounded px-3 py-2.5 hover:bg-secondary font-medium">earings</Link>
              <Link href="/products?category=pendant" className="rounded px-3 py-2.5 hover:bg-secondary font-medium">Pandents</Link>
              <Link href="/products?category=bracelets-bangles" className="rounded px-3 py-2.5 hover:bg-secondary font-medium">braclets</Link>
              <Link href="/products?purity=9KT" className="rounded px-3 py-2.5 hover:bg-secondary font-medium">9KT</Link>
              <Link href="/products?q=aabha" className="rounded px-3 py-2.5 hover:bg-secondary font-medium">aabha</Link>
              <Link href="/products?q=luna" className="rounded px-3 py-2.5 hover:bg-secondary font-medium">luna</Link>
              <div className="border-t border-border/60 my-2"></div>
              <Link href="/customize" className="rounded px-3 py-2.5 hover:bg-secondary">Customize</Link>
              <Link href="/about-us" className="rounded px-3 py-2.5 hover:bg-secondary">About Us</Link>
              <Link href="/contact-us" className="rounded px-3 py-2.5 hover:bg-secondary">Contact Us</Link>
              <Link href="/faqs" className="rounded px-3 py-2.5 hover:bg-secondary">FAQs</Link>
              <Link href="/account" className="rounded px-3 py-2.5 hover:bg-secondary">My Account</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
