"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { products } from "@/lib/products";
import { testimonials } from "@/lib/content";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCarousel, ProductGrid } from "@/components/ProductCard";
import { TrustBadges } from "@/components/TrustBadges";

import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import bannerEarrings from "@/assets/banner-earrings.jpg";
import bannerBracelets from "@/assets/banner-bracelets.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import forHim from "@/assets/for-him.png";
import forHer from "@/assets/for-her.png";
import bannerCustomise from "@/assets/banner-customise.png";
import bannerLunaEdit from "@/assets/banner-luna-edit.png";
import bannerBridalEdit from "@/assets/banner-bridal-edit.png";
import bannerGiftingEdit from "@/assets/banner-gifting-edit.png";
import pEarrings from "@/assets/p-earrings-studs.jpg";
import pNecklace from "@/assets/p-necklace-layered.jpg";
import pRingHalo from "@/assets/p-ring-halo.jpg";
import pPendant from "@/assets/p-pendant-drop.jpg";
import pBangle from "@/assets/p-bangle-gold.jpg";
import pBracelet from "@/assets/p-bracelet-tennis.jpg";
import pNecklaceKnot from "@/assets/p-necklace-knot.jpg";
import pRingBand from "@/assets/p-ring-band.jpg";
import pRingFancy from "@/assets/p-ring-fancy.jpg";
import pendantHeart from "@/assets/pendant-heart.png";
import bannerLuna from "@/assets/banner-luna.png";
import galleryGrid1 from "@/assets/gallery-grid-1.png";
import galleryGrid2 from "@/assets/gallery-grid-2.png";
import galleryGrid3 from "@/assets/gallery-grid-3.png";
import galleryGrid4 from "@/assets/gallery-grid-4.png";
import galleryGrid5 from "@/assets/gallery-grid-5.png";

import storeKoregaon from "@/assets/store-koregaon.png";
import storeKarve from "@/assets/store-karve.png";
import storeGeeta from "@/assets/store-geeta.png";
import storeReal from "@/assets/store-real.png";

const slides = [
  {
    img: "/upper_1.png",
    kicker: "",
    title: "",
    sub: "",
  },
  {
    img: "/upper_2.png",
    kicker: "",
    title: "",
    sub: "",
  },
  {
    img: "/upper_3.png",
    kicker: "",
    title: "",
    sub: "",
  },
];

function HeroSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragDistance = useRef(0);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft: sLeft, clientWidth } = containerRef.current;
    if (clientWidth > 0) {
      const idx = Math.round(sLeft / clientWidth);
      if (idx >= 0 && idx < slides.length) {
        setActiveIndex(idx);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
    dragDistance.current = 0;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    dragDistance.current = Math.abs(x - startX.current);
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (dragDistance.current > 10) {
      e.preventDefault();
    }
  };

  const scrollToSlide = (idx: number) => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const clientWidth = el.clientWidth;
    el.style.scrollSnapType = "none";
    el.scrollTo({ left: idx * clientWidth, behavior: "smooth" });
    setTimeout(() => {
      if (el) el.style.scrollSnapType = "x mandatory";
    }, 500);
  };

  useEffect(() => {
    if (isDragging) return;
    const t = setInterval(() => {
      if (!containerRef.current) return;
      const el = containerRef.current;
      const { scrollLeft: sLeft, clientWidth, scrollWidth } = el;
      let nextIndex = Math.round(sLeft / clientWidth) + 1;
      if (sLeft + clientWidth >= scrollWidth - 5) {
        nextIndex = 0;
      }
      scrollToSlide(nextIndex);
    }, 5500);
    return () => clearInterval(t);
  }, [isDragging]);

  return (
    <section className="relative w-full aspect-[2.2/1] sm:aspect-[3.5/1] md:aspect-[4.5/1] lg:aspect-[5.12/1] overflow-hidden">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar cursor-grab active:cursor-grabbing select-none"
      >
        {slides.map((s, idx) => (
          <div key={idx} className="w-full h-full shrink-0 snap-start relative">
            <Link href="/products" onClick={handleLinkClick} className="block h-full w-full">
              <Image
                src={s.img}
                alt={s.title}
                priority={idx === 0}
                loading={idx === 0 ? undefined : "lazy"}
                fill
                className="object-fill select-none"
                draggable={false}
              />
            </Link>
          </div>
        ))}
      </div>

      <button
        aria-label="Previous slide"
        onClick={() => {
          const prev = (activeIndex - 1 + slides.length) % slides.length;
          scrollToSlide(prev);
        }}
        className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-background/60 backdrop-blur transition-colors hover:bg-background cursor-pointer"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        aria-label="Next slide"
        onClick={() => {
          const next = (activeIndex + 1) % slides.length;
          scrollToSlide(next);
        }}
        className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-background/60 backdrop-blur transition-colors hover:bg-background cursor-pointer"
      >
        <ChevronRight size={18} />
      </button>
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => scrollToSlide(idx)}
            className={`h-2 rounded-full transition-all ${idx === activeIndex ? "w-6 bg-gold" : "w-2 bg-background/70"} cursor-pointer`}
          />
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[i];
  return (
    <section className="bg-primary py-20 text-primary-foreground">
      <div className="container-site max-w-3xl text-center">
        <h2 className="font-display text-3xl font-semibold">What Our Clients Say</h2>
        <div className="divider-fancy mt-4">
          <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
        </div>
        <blockquote key={i} className="mt-8 animate-fade-up">
          <p className="text-base leading-relaxed italic sm:text-lg">&quot;{t.text}&quot;</p>
          <p className="mt-6 font-display text-xl text-gold">{t.first}</p>
          <p className="text-xs uppercase tracking-widest text-primary-foreground/70">{t.name}</p>
        </blockquote>
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Testimonial ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-2 rounded-full transition-all ${idx === i ? "w-6 bg-gold" : "w-2 bg-primary-foreground/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BottomCollectionsSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragDistance = useRef(0);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft: sLeft, clientWidth } = containerRef.current;
    if (clientWidth > 0) {
      const idx = Math.round(sLeft / clientWidth);
      if (idx >= 0 && idx < 4) {
        setActiveIndex(idx);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
    dragDistance.current = 0;
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    dragDistance.current = Math.abs(x - startX.current);
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (dragDistance.current > 10) {
      e.preventDefault();
    }
  };

  const slidesData = [
    {
      img: bannerCustomise,
      title: "Customise Your Diamond Jewellery",
      kicker: "Bespoke Design",
      sub: "Select metal, setting & diamond shape to craft your piece.",
      query: { q: "solitaire" },
    },
    {
      img: bannerLunaEdit,
      title: "Luna Silver Edit",
      kicker: "Silver Jewellery",
      sub: "Brilliant, premium 92.5 sterling silver collections.",
      query: { q: "luna" },
    },
    {
      img: bannerBridalEdit,
      title: "Aabha Bridal Luxury",
      kicker: "Wedding Collection",
      sub: "Royal necklaces and solitaires for your big day.",
      query: { q: "aabha" },
    },
    {
      img: bannerGiftingEdit,
      title: "Gifting Edit",
      kicker: "Spread Love",
      sub: "Lab-grown diamonds crafted for your special someone.",
      query: { highlight: "bestseller" },
    },
  ];

  const scrollToSlide = (idx: number) => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const clientWidth = el.clientWidth;
    el.style.scrollSnapType = "none";
    el.scrollTo({ left: idx * clientWidth, behavior: "smooth" });
    setTimeout(() => {
      if (el) el.style.scrollSnapType = "x mandatory";
    }, 500);
  };

  useEffect(() => {
    if (isDragging) return;
    const t = setInterval(() => {
      if (!containerRef.current) return;
      const el = containerRef.current;
      const { scrollLeft: sLeft, clientWidth, scrollWidth } = el;
      let nextIndex = Math.round(sLeft / clientWidth) + 1;
      if (sLeft + clientWidth >= scrollWidth - 5) {
        nextIndex = 0;
      }
      scrollToSlide(nextIndex);
    }, 6000);
    return () => clearInterval(t);
  }, [isDragging]);

  return (
    <section className="relative w-full aspect-[2.2/1] sm:aspect-[3.5/1] md:aspect-[4.5/1] lg:aspect-[5.12/1] overflow-hidden my-6 border-y border-border/30">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar cursor-grab active:cursor-grabbing select-none"
      >
        {slidesData.map((s, idx) => (
          <div key={idx} className="w-full h-full shrink-0 snap-start relative">
            <Link
              href={{ pathname: "/products", query: s.query }}
              onClick={handleLinkClick}
              className="block h-full w-full relative"
            >
              <Image
                src={s.img}
                alt={s.title}
                loading="lazy"
                className="h-full w-full object-cover select-none"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute inset-y-0 left-8 sm:left-20 flex flex-col justify-center text-left max-w-sm sm:max-w-xl animate-fade-up">
                <span className="text-[9px] sm:text-xs uppercase tracking-widest text-gold font-bold">
                  {s.kicker}
                </span>
                <h3 className="font-display text-lg sm:text-4xl font-semibold text-primary-foreground mt-1 leading-tight">
                  {s.title}
                </h3>
                <p className="hidden sm:block text-xs sm:text-sm text-primary-foreground/85 mt-2 max-w-md">
                  {s.sub}
                </p>
                <span className="mt-4 inline-flex w-fit items-center justify-center bg-white text-primary text-[9px] sm:text-xs uppercase tracking-wider font-bold py-1.5 px-4 sm:px-6 rounded-full shadow-md group-hover:bg-gold group-hover:text-white transition-colors duration-300">
                  Shop Collection
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <button
        aria-label="Previous slide"
        onClick={() => {
          const prev = (activeIndex - 1 + 4) % 4;
          scrollToSlide(prev);
        }}
        className="absolute left-4 top-1/2 grid h-8 w-8 sm:h-10 sm:w-10 -translate-y-1/2 place-items-center rounded-full bg-background/60 backdrop-blur transition-colors hover:bg-background cursor-pointer"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        aria-label="Next slide"
        onClick={() => {
          const next = (activeIndex + 1) % 4;
          scrollToSlide(next);
        }}
        className="absolute right-4 top-1/2 grid h-8 w-8 sm:h-10 sm:w-10 -translate-y-1/2 place-items-center rounded-full bg-background/60 backdrop-blur transition-colors hover:bg-background cursor-pointer"
      >
        <ChevronRight size={16} />
      </button>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slidesData.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => scrollToSlide(idx)}
            className={`h-1.5 rounded-full transition-all ${idx === activeIndex ? "w-5 bg-gold" : "w-1.5 bg-background/70"} cursor-pointer`}
          />
        ))}
      </div>
    </section>
  );
}

const stores = [
  {
    name: "KARVE NAGAR, PUNE",
    tag: "FLAGSHIP BOUTIQUE",
    address:
      "Shop no. 12/13, Karve Statue, Success Square, Karve Rd, Paschimanagri, Kothrud, Pune, Maharashtra 411038",
    image: storeReal,
  },
  {
    name: "KOREGAON PARK, PUNE",
    tag: "EXPERIENCE STORE",
    address:
      "Winterberry Purple, society, Lane No. 8, Ashok Chakra Society, Meera Nagar, Koregaon Park, Pune, Maharashtra 411001",
    image: storeKoregaon,
  },
  {
    name: "GEETA BHAWAN, INDORE",
    tag: "FLAGSHIP STORE",
    address: "102, Geeta Bhawan Road, Opposite Temple, Indore, Madhya Pradesh 452001",
    image: storeGeeta,
  },
];

function VisitOurStores() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stores.length);
    }, 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="container-site pt-3 pb-8 border-t border-border/30 text-center overflow-hidden">
      <SectionHeading title="VISIT OUR STORES" />

      <div className="max-w-4xl mx-auto relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {stores.map((store, idx) => {
            const isEven = idx % 2 === 0;
            const isActive = activeIndex === idx;
            return (
              <div
                key={idx}
                className="w-full shrink-0 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center px-4"
              >
                {/* Photo: Palmonas Bottom Reveal + Slow Zoom */}
                <div
                  className={`aspect-square w-full max-w-[420px] mx-auto overflow-hidden border border-border/20 shadow-md relative transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transform ${
                    isEven ? "md:order-1" : "md:order-2"
                  } ${
                    isActive
                      ? "translate-y-0 opacity-100 scale-100"
                      : "translate-y-12 opacity-0 scale-95"
                  }`}
                >
                  <Image
                    src={store.image}
                    alt={store.name}
                    className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                      isActive ? "scale-105" : "scale-100"
                    }`}
                    loading="lazy"
                  />
                </div>

                {/* Text: Palmonas Staggered Line-by-Line Reveal */}
                <div
                  className={`text-center flex flex-col justify-center ${
                    isEven ? "md:order-2 md:text-left" : "md:order-1 md:text-right"
                  }`}
                >
                  <span
                    className={`text-[10px] uppercase font-bold tracking-[0.2em] text-gold mb-1 transition-all duration-700 delay-100 transform ${
                      isActive
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                  >
                    {store.tag}
                  </span>
                  <h3
                    className={`font-sans text-xl sm:text-2xl font-bold tracking-[0.12em] text-foreground uppercase mb-3 transition-all duration-800 delay-250 transform ${
                      isActive
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                  >
                    {store.name}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed text-muted-foreground font-normal max-w-sm mx-auto transition-all duration-900 delay-400 transform ${
                      isEven ? "md:mx-0" : "md:ml-auto md:mr-0"
                    } ${
                      isActive
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                  >
                    {store.address}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 flex justify-center gap-2">
        {stores.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to store ${idx + 1}`}
            onClick={() => setActiveIndex(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === activeIndex ? "w-5 bg-gold" : "w-1.5 bg-muted-foreground/35"
            } cursor-pointer`}
          />
        ))}
      </div>

      <div className="mt-4">
        <Link
          href="/contact-us"
          className="inline-flex items-center gap-2 border border-primary text-primary hover:border-gold hover:text-gold text-xs font-semibold uppercase tracking-widest py-2.5 px-7 transition-colors duration-300"
        >
          Find Your Nearest Store <span className="text-sm">→</span>
        </Link>
      </div>
    </section>
  );
}

export function HomeClient() {
  const [tab, setTab] = useState<
    "Diamond Jewellery" | "Gemstone Jewellery" | "Gold Jewellery" | "Silver Jewellery"
  >("Diamond Jewellery");
  const topSelling = products.filter((p) => p.collection === tab).slice(0, 10);
  const featured = products.filter((p) => p.featured).slice(0, 8);
  const newLaunches = products.filter((p) => ["12", "18", "3", "8", "16", "20"].includes(p.id));

  return (
    <div>
      <HeroSlider />

      <section className="w-full px-4 sm:px-6 pt-6 pb-10">
        <SectionHeading title="Shop by Category" />
        <div className="mt-6 grid grid-cols-10 gap-3">
          {[
            { img: pRingHalo,      label: "Rings",       slug: "rings" },
            { img: pEarrings,      label: "Earrings",    slug: "earrings" },
            { img: pPendant,       label: "Pendants",    slug: "pendant" },
            { img: pBangle,        label: "Bangles",     slug: "bangles" },
            { img: pBracelet,      label: "Bracelets",   slug: "bracelets" },
            { img: pNecklaceKnot,  label: "Chains",      slug: "chains" },
            { img: pRingBand,      label: "Nose Pins",   slug: "nose-pins" },
            { img: pNecklace,      label: "Mangalsutra", slug: "mangalsutra" },
            { img: pRingFancy,     label: "Men's",       slug: "mens" },
          ].map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="group flex flex-col items-center gap-2"
            >
              <div className="aspect-square w-full rounded-2xl bg-secondary overflow-hidden border border-border/40 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                <Image
                  src={c.img}
                  alt={c.label}
                  className="h-full w-full object-cover mix-blend-multiply"
                />
              </div>
              <span className="text-center text-[11px] sm:text-xs font-medium text-foreground/80 group-hover:text-primary transition-colors leading-tight">
                {c.label}
              </span>
            </Link>
          ))}

          {/* View All tile */}
          <Link
            href="/products"
            className="group flex flex-col items-center gap-2"
          >
            <div className="aspect-square w-full flex items-center justify-center rounded-2xl bg-secondary border border-border/40 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
              <div className="grid grid-cols-2 gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="h-4 w-4 rounded-full bg-primary/25 group-hover:bg-primary/50 transition-colors" />
                ))}
              </div>
            </div>
            <span className="text-center text-[11px] sm:text-xs font-medium text-foreground/80 group-hover:text-primary transition-colors leading-tight">
              View All
            </span>
          </Link>
        </div>
      </section>

      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 py-8 pb-10 px-4 sm:px-6">
        {[
          {
            img: forHer,
            label: "For Her",
            query: "her",
            kicker: "ELEGANT COLLECTIONS",
            desc: "Grace in every sparkle, beauty in every detail. For every you.",
            bg: "bg-[#f4efe8]",
            textColor: "text-[#3b2234]",
            descColor: "text-[#5a4454]",
          },
          {
            img: forHim,
            label: "For Him",
            query: "him",
            kicker: "BOLD & CLASSIC",
            desc: "Timeless designs crafted for the modern man. Made to leave a mark.",
            bg: "bg-[#2d292c]",
            textColor: "text-white",
            descColor: "text-white/80",
          },
        ].map((c) => (
          <Link
            key={c.label}
            href={{ pathname: "/products", query: { q: c.query } }}
            className="group relative block overflow-hidden rounded-2xl"
          >
            {/* Card panel */}
            <div className={`relative h-[65vh] sm:h-[75vh] ${c.bg} flex items-center justify-center overflow-hidden`}>
              <Image
                src={c.img}
                alt={c.label}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />

              {/* Text overlay on left */}
              <div className="absolute bottom-6 left-6 sm:bottom-12 sm:left-10 flex flex-col items-start z-10">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#c29b62] font-bold mb-1.5">
                  {c.kicker}
                </span>
                <h3 className={`font-display text-3xl sm:text-5xl font-normal ${c.textColor} leading-tight`}>
                  {c.label}
                </h3>
                <p className={`mt-3 text-xs sm:text-sm ${c.descColor} max-w-[180px] sm:max-w-[220px] leading-relaxed hidden sm:block`}>
                  {c.desc}
                </p>
                <span className="mt-4 sm:mt-6 inline-flex w-fit items-center justify-center bg-white text-primary text-[10px] sm:text-xs uppercase tracking-wider font-bold py-2 px-6 rounded-full shadow-md group-hover:bg-gold group-hover:text-white transition-colors duration-300">
                  Shop Now
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className="container-site pt-2 pb-8">
        <SectionHeading title="Top Selling Item" />
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {(["Diamond Jewellery", "Gemstone Jewellery", "Gold Jewellery", "Silver Jewellery"] as const).map(
            (t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-5 py-1.5 text-xs font-semibold uppercase tracking-widest transition-colors ${
                  tab === t ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            )
          )}
        </div>
        <ProductCarousel items={topSelling} />
        <div className="mt-4 flex justify-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 border border-primary text-primary hover:border-gold hover:text-gold text-xs font-semibold uppercase tracking-widest py-2.5 px-7 transition-colors duration-300"
          >
            View All <span className="text-sm">→</span>
          </Link>
        </div>
      </section>

      <BottomCollectionsSlider />

      <section className="container-site pt-2 pb-8">
        <SectionHeading title="New Launches" />
        <ProductCarousel items={newLaunches} />
        <div className="mt-4 flex justify-center">
          <Link
            href="/products?highlight=new"
            className="inline-flex items-center gap-2 border border-primary text-primary hover:border-gold hover:text-gold text-xs font-semibold uppercase tracking-widest py-2.5 px-7 transition-colors duration-300"
          >
            View All <span className="text-sm">→</span>
          </Link>
        </div>
      </section>

      <VisitOurStores />
    </div>
  );
}