"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { 
  Gift, 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Truck, 
  ChevronLeft,
  ChevronRight,
  Eye,
  Shuffle,
  Star,
  Send
} from "lucide-react";
import { useShop } from "@/lib/store";

// Pure Gold Coins & Special Gift Items for "Timeless Favourites"
const giftProducts = [
  {
    id: "gifting-coin-1",
    name: "0.5 gm 24 Karat Lotus Gold Coin (999.9 Pure)",
    price: 8353,
    originalPrice: 9200,
    karat: "24K 999.9 Pure Gold",
    image: "/gifting/gold_coin.png",
    category: "Most Gifted",
    badge: "24K PURE GOLD",
    rating: 4.9,
    reviews: 142
  },
  {
    id: "gifting-coin-2",
    name: "2 gm 24 Karat Lotus Gold Coin (999.9 Pure)",
    price: 33412,
    originalPrice: 35800,
    karat: "24K 999.9 Pure Gold",
    image: "/gifting/gold_coin.png",
    category: "Most Gifted",
    badge: "BEST VALUE",
    rating: 5.0,
    reviews: 98
  },
  {
    id: "gifting-coin-3",
    name: "0.5 gm 24 Karat Tulsi Leaf Gold Coin",
    price: 8353,
    originalPrice: 9200,
    karat: "24K 999.9 Pure Gold",
    image: "/gifting/coin_tulsi.png",
    category: "Most Gifted",
    badge: "SACRED GIFT",
    rating: 4.8,
    reviews: 76
  },
  {
    id: "gifting-coin-4",
    name: "0.5 GM 24 Karat Fine Gold Coin",
    price: 8353,
    originalPrice: 9150,
    karat: "24K 999.9 Pure Gold",
    image: "/gifting/gold_coin.png",
    category: "Most Gifted",
    badge: "CLASSIC",
    rating: 4.9,
    reviews: 110
  },
  {
    id: "p1",
    name: "Eternal Solitaire Diamond Pendant",
    price: 14999,
    originalPrice: 18500,
    karat: "18K Gold & VVS Diamond",
    image: "/gifting/pendant_box.png",
    category: "Best Seller",
    badge: "BESTSELLER",
    rating: 4.9,
    reviews: 215
  },
  {
    id: "p2",
    name: "Starlight Solitaire Stud Earrings",
    price: 18500,
    originalPrice: 22000,
    karat: "18K Gold & Certified Solitaire",
    image: "/gifting/curated_earrings.png",
    category: "Best Seller",
    badge: "TOP PICK",
    rating: 5.0,
    reviews: 184
  },
  {
    id: "p3",
    name: "Infinity Diamond Charm Bracelet",
    price: 22400,
    originalPrice: 26000,
    karat: "18K Rose Gold",
    image: "/gifting/curated_bracelets.png",
    category: "New Arrivals",
    badge: "NEW",
    rating: 4.8,
    reviews: 64
  },
  {
    id: "p4",
    name: "Aabha Royal Layered Necklace",
    price: 16200,
    originalPrice: 19000,
    karat: "22K Pure Gold",
    image: "/gifting/curated_necklaces.png",
    category: "New Arrivals",
    badge: "HERITAGE",
    rating: 4.9,
    reviews: 89
  }
];

// Price brackets matching website color palette
const priceBrackets = [
  {
    title: "Under ₹10,000",
    subtitle: "Charming silver & gold tokens",
    maxPrice: 10000,
    img: "/gifting/curated_rings.png",
    gradient: "from-[#4C2344] via-[#3C1A35] to-[#2B1226]",
    badge: "BUDGET FAVOURITES"
  },
  {
    title: "Under ₹20,000",
    subtitle: "Everyday gold & diamond dazzle",
    maxPrice: 20000,
    img: "/gifting/curated_earrings.png",
    gradient: "from-[#663253] via-[#4C2344] to-[#3C1A35]",
    badge: "POPULAR GIFTS"
  },
  {
    title: "Under ₹50,000",
    subtitle: "Precious statement treasures",
    maxPrice: 50000,
    img: "/gifting/curated_bracelets.png",
    gradient: "from-[#3C1A35] via-[#2F1329] to-[#1E091B]",
    badge: "LUXURY PICKS"
  },
  {
    title: "Above ₹50,000",
    subtitle: "Heirloom solitaires & sets",
    minPrice: 50000,
    img: "/gifting/curated_necklaces.png",
    gradient: "from-[#2A1024] via-[#3C1A35] to-[#4C2344]",
    badge: "ROYAL COLLECTIONS"
  }
];

// Occasion categories
const occasionGifts = [
  { name: "Birthday Gifts", tag: "Make them shine", icon: "🎂", link: "/products?category=rings" },
  { name: "Anniversary Delights", tag: "Tokens of love", icon: "💍", link: "/products?category=pendant" },
  { name: "Festive Celebrations", tag: "Traditional grace", icon: "🪔", link: "/products?highlight=gifting" },
  { name: "Weddings & Milestones", tag: "Royal keepsakes", icon: "👑", link: "/aabha" },
  { name: "Self-Gifting Joy", tag: "You deserve it", icon: "✨", link: "/products" },
];

export default function GiftingPage() {
  const { addToCart, toggleWishlist, wishlist, toggleCompare, compare, setCartOpen, setQuickViewId } = useShop();
  const [activeTab, setActiveTab] = useState<"Most Gifted" | "Best Seller" | "New Arrivals">("Most Gifted");
  const [giftNoteOpen, setGiftNoteOpen] = useState(false);
  const [giftRecipient, setGiftRecipient] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const filteredProducts = giftProducts.filter(p => p.category === activeTab || activeTab === "Most Gifted");

  const handleAddToCart = (item: typeof giftProducts[0]) => {
    addToCart(item.id.startsWith("gifting") ? "1" : item.id, 1, "Gold");
    setAddedNotice(item.name);
    setTimeout(() => setAddedNotice(null), 3000);
  };

  return (
    <main className="bg-[#FDF9FB] min-h-screen pb-24 text-foreground selection:bg-primary selection:text-white">
      
      {/* ── TOP HERO PROMOTIONAL BANNER ────────────────────────────────────────── */}
      <section className="relative w-full bg-gradient-to-r from-[#2F1329] via-[#3C1A35] to-[#4C2344] text-white overflow-hidden shadow-xl border-b border-border/40">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E8C187_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left side showcase banner image */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative group max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl border border-gold/30">
                <img 
                  src="/gifting/hero_banner.png" 
                  alt="Save In Style Silver & Diamond Jewellery" 
                  className="w-full h-[280px] sm:h-[340px] md:h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3C1A35]/90 via-transparent to-transparent"></div>
                
                {/* Product Float Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-[#2F1329]/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-gold/30">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold animate-pulse" />
                    <span className="text-xs sm:text-sm font-medium tracking-wide text-white">Pure 925 Silver & Certified Diamonds</span>
                  </div>
                  <span className="text-xs font-semibold uppercase bg-gold text-dark px-2 py-0.5 rounded shadow-sm">Trending</span>
                </div>
              </div>
            </div>

            {/* Right side banner details & CTA */}
            <div className="lg:col-span-6 text-center lg:text-left space-y-6">
              
              {/* Circular Brand Pill */}
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-gold/40 bg-white/10 backdrop-blur-md">
                <span className="w-7 h-7 rounded-full border border-gold flex items-center justify-center text-[10px] font-display font-bold tracking-tighter uppercase text-gold">
                  NAZARA
                </span>
                <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold">
                  SAVE IN STYLE
                </span>
              </div>

              {/* Discount Offer Title */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight">
                  UPTO <span className="text-gold drop-shadow-md">30% OFF*</span>
                </h1>
                <p className="text-lg sm:text-2xl font-light text-muted-foreground/90 tracking-wide text-rose-100/90 font-display">
                  On Silver & Diamond Jewellery Gifts
                </p>
              </div>

              <p className="text-sm text-white/80 max-w-md mx-auto lg:mx-0 font-light leading-relaxed">
                Unwrap joy with handcrafted keepsakes, pure 24K gold coins, and diamond heirlooms curated for every unforgettable moment.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link 
                  href="#timeless-favourites"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gold text-dark font-semibold text-sm rounded-full shadow-lg hover:bg-white hover:text-primary transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <Gift className="w-4 h-4" />
                  SHOP GIFTS NOW
                </Link>

                <button 
                  onClick={() => setGiftNoteOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium text-sm rounded-full border border-white/20 backdrop-blur-sm transition-all"
                >
                  <Send className="w-4 h-4 text-gold" />
                  Add Free Gift Note
                </button>
              </div>

              <div className="text-[11px] text-white/60 pt-2 italic">
                *T&C apply. Free express gift wrapping included on all orders over ₹2,999.
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ── SECTION 1: "CURATED WITH LOVE ✨" ─────────────────────────────────── */}
      <section className="container mx-auto px-4 pt-16 pb-12">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 text-primary">
            <Sparkles className="w-5 h-5 text-gold fill-gold" />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-primary tracking-tight">
              Curated with love
            </h2>
            <Sparkles className="w-5 h-5 text-gold fill-gold" />
          </div>
          <p className="text-muted-foreground text-sm sm:text-base font-light">
            Jewellery picks for thoughtful gifting
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column Grid */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Card 1: Bracelets */}
            <Link 
              href="/products?category=bracelets-bangles"
              className="group relative rounded-2xl overflow-hidden shadow-sm bg-white border border-border flex flex-col justify-between h-[320px] transition-all duration-500 hover:shadow-xl hover:border-gold hover:-translate-y-1"
            >
              <div className="relative w-full h-[255px] overflow-hidden bg-[#FAF3F7]">
                <img 
                  src="/gifting/curated_bracelets.png" 
                  alt="A thoughtful addition to every stack"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
              </div>
              <div className="bg-[#4C2344] text-white py-3.5 px-4 text-center font-medium text-sm tracking-wide group-hover:bg-[#3C1A35] transition-colors">
                A thoughtful addition to every stack
              </div>
            </Link>

            {/* Card 2: Necklaces */}
            <Link 
              href="/products?category=pendant"
              className="group relative rounded-2xl overflow-hidden shadow-sm bg-white border border-border flex flex-col justify-between h-[320px] transition-all duration-500 hover:shadow-xl hover:border-gold hover:-translate-y-1"
            >
              <div className="relative w-full h-[255px] overflow-hidden bg-[#FAF3F7]">
                <img 
                  src="/gifting/curated_necklaces.png" 
                  alt="Layers they'll love wearing"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
              </div>
              <div className="bg-[#2B1226] text-white py-3.5 px-4 text-center font-medium text-sm tracking-wide group-hover:bg-black transition-colors">
                Layers they'll love wearing
              </div>
            </Link>

            {/* Card 4: Rings */}
            <Link 
              href="/products?category=rings"
              className="group relative rounded-2xl overflow-hidden shadow-sm bg-white border border-border flex flex-col justify-between h-[280px] transition-all duration-500 hover:shadow-xl hover:border-gold hover:-translate-y-1"
            >
              <div className="relative w-full h-[215px] overflow-hidden bg-[#FAF3F7]">
                <img 
                  src="/gifting/curated_rings.png" 
                  alt="Rings made to celebrate milestones"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
              </div>
              <div className="bg-[#4C2344] text-white py-3.5 px-4 text-center font-medium text-sm tracking-wide group-hover:bg-[#3C1A35] transition-colors">
                Rings made to celebrate milestones
              </div>
            </Link>

            {/* Card 5: Earrings */}
            <Link 
              href="/products?category=earrings"
              className="group relative rounded-2xl overflow-hidden shadow-sm bg-white border border-border flex flex-col justify-between h-[280px] transition-all duration-500 hover:shadow-xl hover:border-gold hover:-translate-y-1"
            >
              <div className="relative w-full h-[215px] overflow-hidden bg-[#FAF3F7]">
                <img 
                  src="/gifting/curated_earrings.png" 
                  alt="Earrings that bring everyday sparkle"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
              </div>
              <div className="bg-[#2B1226] text-white py-3.5 px-4 text-center font-medium text-sm tracking-wide group-hover:bg-black transition-colors">
                Earrings that bring everyday sparkle
              </div>
            </Link>

          </div>

          {/* Right Column Hero Feature Card */}
          <div className="md:col-span-5 relative group rounded-2xl overflow-hidden shadow-lg border-2 border-gold/40 bg-gradient-to-b from-[#3C1A35] to-[#250E20] min-h-[500px] flex flex-col justify-end">
            <img 
              src="/gifting/curated_woman_boxes.png" 
              alt="Luxury Gift Boxes & Curated Jewellery"
              className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2F1329] via-[#3C1A35]/40 to-transparent"></div>

            {/* Overlay Text Box */}
            <div className="relative z-10 p-6 sm:p-8 space-y-3 text-white">
              <div className="inline-block px-3 py-1 bg-gold text-dark font-bold text-[11px] tracking-wider uppercase rounded-full shadow-sm">
                SIGNATURE GIFT BOXING
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
                Gift Boxed to Perfection
              </h3>
              <p className="text-sm text-white/80 font-light leading-relaxed">
                Every Nazara gift arrives wrapped in velvet pouching, signature gift boxes, with a personalized note & wax seal stamp.
              </p>
              
              <div className="pt-2">
                <Link 
                  href="/products?highlight=gifting"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-gold text-dark font-semibold text-xs tracking-wider uppercase rounded-full hover:bg-white hover:text-primary transition-colors shadow-md"
                >
                  EXPLORE GIFT GUIDE
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ── SECTION 2: "TIMELESS FAVOURITES ✨" (Horizontally Scrollable Carousel) ─ */}
      <section id="timeless-favourites" className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 text-primary">
            <Sparkles className="w-5 h-5 text-gold fill-gold" />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-primary tracking-tight">
              Timeless favourites
            </h2>
            <Sparkles className="w-5 h-5 text-gold fill-gold" />
          </div>
          <p className="text-muted-foreground text-sm sm:text-base font-light">
            Tried, trusted, and always loved
          </p>
        </div>

        {/* Tab Selector Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center p-1.5 bg-muted/80 backdrop-blur-md rounded-full border border-border shadow-inner">
            {(["Most Gifted", "Best Seller", "New Arrivals"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-6 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground shadow-md scale-102"
                    : "text-muted-foreground hover:text-primary hover:bg-white/60"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontally Scrollable Carousel Container */}
        <div className="relative group/carousel w-full">
          
          {/* Left Arrow Button */}
          <button
            onClick={() => scrollCarousel("left")}
            className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 text-[#3C1A35] shadow-xl border border-gold/40 flex items-center justify-center hover:bg-[#3C1A35] hover:text-white transition-all duration-300 cursor-pointer backdrop-blur-md opacity-90 hover:opacity-100 hover:scale-110"
            aria-label="Previous Products"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Horizontally Scrollable Product Cards Row (Matching Target UI Screenshot) */}
          <div 
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 px-2 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none]"
          >
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              const isCompared = compare.includes(product.id);
              return (
                <div 
                  key={product.id}
                  className="w-[270px] sm:w-[290px] lg:w-[310px] shrink-0 snap-start group relative flex flex-col border border-[#EAD5E2] rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-all duration-300"
                >
                  {/* Top Image Container */}
                  <div className="relative aspect-square w-full bg-[#FAF3EE] overflow-hidden flex items-center justify-center p-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="relative z-0 max-h-[220px] w-auto object-contain transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Vertical Action Buttons Stack on Top Right */}
                    <div className="absolute right-3 top-3 flex flex-col gap-2 z-10">
                      {/* Wishlist Button */}
                      <button
                        aria-label="Add to wishlist"
                        onClick={() => toggleWishlist(product.id)}
                        className={`grid h-9 w-9 place-items-center rounded-full border border-border/30 bg-white text-[#3C1A35] shadow-md transition-all duration-300 hover:bg-primary hover:text-white ${isWishlisted ? "bg-primary text-white" : ""}`}
                      >
                        <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
                      </button>

                      {/* Compare Button */}
                      <button
                        aria-label="Compare"
                        onClick={() => toggleCompare(product.id)}
                        className={`grid h-9 w-9 place-items-center rounded-full border border-border/30 bg-white text-[#3C1A35] shadow-md transition-all duration-300 hover:bg-primary hover:text-white ${isCompared ? "bg-primary text-white" : ""}`}
                      >
                        <Shuffle size={16} />
                      </button>

                      {/* Quick View Button */}
                      <button
                        aria-label="Quick view"
                        onClick={() => setQuickViewId(product.id.startsWith("gifting") ? "1" : product.id)}
                        className="grid h-9 w-9 place-items-center rounded-full border border-border/30 bg-white text-[#3C1A35] shadow-md transition-all duration-300 hover:bg-primary hover:text-white"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Bottom Content Container (Blush Lavender Background matching Target UI) */}
                  <div className="flex flex-col items-center justify-center gap-1.5 p-4 sm:p-5 text-center bg-[#F2E5ED] border-t border-[#EAD5E2]/40 flex-1 min-h-[135px]">
                    <h3 className="font-display text-sm sm:text-base font-semibold text-[#3C1A35] transition-colors hover:text-gold line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Rating Stars */}
                    <div className="flex text-amber-400 text-xs sm:text-sm my-0.5 tracking-widest justify-center">
                      {"★".repeat(Math.round(product.rating || 5))}
                      {"☆".repeat(5 - Math.round(product.rating || 5))}
                    </div>

                    {/* Price */}
                    <p className="text-sm sm:text-base font-bold text-gold font-display">
                      From ₹{product.price.toLocaleString("en-IN")}
                    </p>

                    {/* Select Options Link */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="text-xs sm:text-sm font-semibold text-[#3C1A35] hover:text-gold transition-all duration-300 mt-1 cursor-pointer hover:underline underline-offset-4"
                    >
                      Select Options
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scrollCarousel("right")}
            className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 text-[#3C1A35] shadow-xl border border-gold/40 flex items-center justify-center hover:bg-[#3C1A35] hover:text-white transition-all duration-300 cursor-pointer backdrop-blur-md opacity-90 hover:opacity-100 hover:scale-110"
            aria-label="Next Products"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/products?highlight=gifting"
            className="inline-flex items-center justify-center px-10 py-3.5 bg-white border border-primary text-primary font-semibold text-sm rounded-full hover:bg-primary hover:text-white transition-all shadow-md hover:shadow-lg"
          >
            Reveal All Gifts
          </Link>
        </div>
      </section>


      {/* ── SECTION 3: "PRECIOUS AT EVERY PRICE ✨" ──────────────────────────── */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 text-primary">
            <Sparkles className="w-5 h-5 text-gold fill-gold" />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-primary tracking-tight">
              Precious at every price
            </h2>
            <Sparkles className="w-5 h-5 text-gold fill-gold" />
          </div>
          <p className="text-muted-foreground text-sm sm:text-base font-light">
            Find the perfect token crafted within your desired budget
          </p>
        </div>

        {/* Price Filter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {priceBrackets.map((bracket) => (
            <Link
              key={bracket.title}
              href={bracket.maxPrice ? `/products?maxPrice=${bracket.maxPrice}` : `/products?minPrice=${bracket.minPrice}`}
              className="group relative flex flex-col items-center text-center transition-transform duration-500 hover:-translate-y-2"
            >
              {/* Octagonal Card Container */}
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden p-6 bg-gradient-to-br from-[#4C2344] via-[#3C1A35] to-[#2B1226] shadow-xl border-2 border-gold/30 flex flex-col items-center justify-between group-hover:shadow-2xl group-hover:border-gold transition-all">
                
                <img 
                  src={bracket.img}
                  alt={bracket.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:opacity-55 group-hover:scale-110 transition-all duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#2F1329] via-[#3C1A35]/50 to-transparent"></div>

                <div className="relative z-10 pt-2">
                  <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-gold text-dark rounded-full shadow-md">
                    {bracket.badge}
                  </span>
                </div>

                <div className="relative z-10 py-6 px-4 space-y-1 bg-[#2F1329]/70 backdrop-blur-md rounded-2xl border border-white/10 w-full max-w-[200px]">
                  <span className="text-xs uppercase tracking-widest text-pink-100/80 font-medium">
                    Gifts
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white group-hover:text-gold transition-colors drop-shadow-md">
                    {bracket.title}
                  </h3>
                </div>

                <div className="relative z-10 pb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 group-hover:text-gold transition-colors">
                    SHOP SELECTION
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>

              </div>

              <p className="mt-3 text-xs text-muted-foreground font-medium">
                {bracket.subtitle}
              </p>
            </Link>
          ))}
        </div>
      </section>


      {/* ── SECTION 4: "FOR THE MOMENTS YOU CHERISH ✨" ────────────────────────── */}
      <section className="container mx-auto px-4 py-16 border-t border-border/60">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 text-primary">
            <Sparkles className="w-5 h-5 text-gold fill-gold" />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-primary tracking-tight">
              For the moments you cherish
            </h2>
            <Sparkles className="w-5 h-5 text-gold fill-gold" />
          </div>
          <p className="text-muted-foreground text-sm sm:text-base font-light">
            Gifts that fit every occasion perfectly
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {occasionGifts.map((occ) => (
            <Link
              key={occ.name}
              href={occ.link}
              className="group p-6 bg-white rounded-2xl border border-border shadow-sm hover:shadow-xl hover:border-gold text-center transition-all duration-300 flex flex-col items-center justify-between"
            >
              <div className="w-14 h-14 rounded-full bg-[#FAF3F7] group-hover:bg-primary text-2xl flex items-center justify-center transition-colors duration-300 shadow-inner group-hover:text-white">
                {occ.icon}
              </div>
              
              <div className="mt-4 space-y-1">
                <h4 className="font-display font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                  {occ.name}
                </h4>
                <p className="text-[11px] text-muted-foreground font-light">
                  {occ.tag}
                </p>
              </div>

              <div className="mt-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-4 h-4 mx-auto text-gold" />
              </div>
            </Link>
          ))}
        </div>
      </section>


      {/* ── SECTION 5: SIGNATURE LUXURY GIFT CONCIERGE & SERVICES ───────────────── */}
      <section className="bg-gradient-to-br from-[#2F1329] via-[#3C1A35] to-[#4C2344] text-white py-16 shadow-inner border-t border-gold/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-semibold tracking-widest text-gold uppercase">
              NAZARA GIFT GUARANTEE
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-white">
              Uncompromising Gifting Excellence
            </h2>
            <p className="text-white/80 text-sm font-light">
              We handle every detail so your gift leaves a lasting memory.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            
            <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-gold text-dark flex items-center justify-center mx-auto shadow-md">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white">Velvet Gift Packaging</h3>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                Comes nestled in luxury velvet pouching inside signature ribbon boxes.
              </p>
            </div>

            <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-gold text-dark flex items-center justify-center mx-auto shadow-md">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white">Personalized Gift Cards</h3>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                Complimentary custom message printed on wax-sealed golden card stock.
              </p>
            </div>

            <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-gold text-dark flex items-center justify-center mx-auto shadow-md">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white">BIS Certified Gold</h3>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                Every piece carries official 100% BIS Hallmarking & SGL/IGI Diamond Certification.
              </p>
            </div>

            <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-gold text-dark flex items-center justify-center mx-auto shadow-md">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white">Express Insured Transit</h3>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                Tamper-evident 100% insured delivery right to their doorstep.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ── GIFT NOTE MODAL ──────────────────────────────────────────────────────── */}
      {giftNoteOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-border max-w-md w-full p-6 space-y-6 relative animate-in fade-in zoom-in-95">
            <button 
              onClick={() => setGiftNoteOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-lg w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
            >
              ✕
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#FAF3F7] text-primary flex items-center justify-center mx-auto">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-primary">
                Add Free Gift Note
              </h3>
              <p className="text-xs text-muted-foreground">
                We'll print your message on a golden card with a wax seal stamp.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-foreground/80 mb-1">
                  Recipient Name
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Dearest Ananya"
                  value={giftRecipient}
                  onChange={(e) => setGiftRecipient(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground/80 mb-1">
                  Your Message
                </label>
                <textarea 
                  rows={4} 
                  placeholder="Write a heartfelt message to accompany your gift..."
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-primary resize-none"
                />
              </div>
            </div>

            <button
              onClick={() => {
                alert("Gift note saved! It will be attached to your checkout order.");
                setGiftNoteOpen(false);
              }}
              className="w-full py-3 bg-primary text-white font-semibold text-sm rounded-xl shadow-lg hover:bg-[#3C1A35] transition-colors"
            >
              Save Gift Note
            </button>
          </div>
        </div>
      )}


      {/* Toast Notification */}
      {addedNotice && (
        <div className="fixed bottom-6 right-6 z-[110] bg-[#3C1A35] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-gold animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-gold" />
          <div className="text-xs">
            <span className="font-semibold">{addedNotice}</span> added to bag!
          </div>
          <button 
            onClick={() => setCartOpen(true)}
            className="ml-2 px-3 py-1 bg-gold text-dark font-bold text-[10px] rounded-full uppercase shadow-sm"
          >
            View Bag
          </button>
        </div>
      )}

    </main>
  );
}
