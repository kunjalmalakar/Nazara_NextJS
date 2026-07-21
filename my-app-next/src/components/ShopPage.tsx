"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import {
  categorySlugs,
  formatINR,
  products,
  type Category,
} from "@/lib/products";
import { PageBanner } from "./Breadcrumb";
import { ProductCard } from "./ProductCard";

const allCategories: Category[] = [
  "Rings",
  "Necklace",
  "Pendant",
  "Earrings",
  "Bracelets & Bangles",
];

const metals = ["Gold", "Rose Gold", "White Gold", "Platinum"];

const sortOptions = [
  { value: "popularity", label: "Popularity" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Rating" },
];

const MAX_PRICE = 350000;

const isCategoryMatch = (category: string, query: string) => {
  const cat = category.toLowerCase();
  const q = query.trim().toLowerCase();
  if (cat === q) return true;
  if (cat === q + "s" || cat + "s" === q) return true;
  if (cat.includes(q) && (q === "bracelet" || q === "bracelets" || q === "bangle" || q === "bangles")) return true;
  return false;
};

export function ShopPage({
  categorySlug,
  query,
  presetCategorySlug,
  presetPurity,
  presetHighlight,
}: {
  categorySlug?: string;
  query?: string;
  presetCategorySlug?: string;
  presetPurity?: string;
  presetHighlight?: string;
}) {
  const actualCategorySlug = categorySlug || presetCategorySlug;
  const presetCategory = actualCategorySlug ? categorySlugs[actualCategorySlug] : undefined;
  const [selected, setSelected] = useState<Category[]>(
    presetCategory ? [presetCategory] : [],
  );
  const [activeHighlight, setActiveHighlight] = useState<string | null>(
    presetHighlight || null,
  );
  const [purityFilter, setPurityFilter] = useState<string[]>(
    presetPurity ? [presetPurity] : [],
  );
  const [stoneFilter, setStoneFilter] = useState<string | null>(null);
  const [qualityFilter, setQualityFilter] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [sort, setSort] = useState("popularity");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [shown, setShown] = useState(16);

  const filtered = useMemo(() => {
    let list = [...products];
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((p) => 
        p.name.toLowerCase().includes(q) ||
        isCategoryMatch(p.category, q) ||
        p.collection.toLowerCase().includes(q)
      );
    }
    if (selected.length > 0)
      list = list.filter((p) => selected.includes(p.category));
    
    // Highlight filter
    if (activeHighlight) {
      if (activeHighlight === "bestseller") {
        list = list.filter((p) => p.topSelling);
      } else if (activeHighlight === "newarrivals") {
        list = list.filter((p) => Number(p.id) >= 10);
      } else if (activeHighlight === "sale") {
        list = list.filter((p) => p.price < 50000);
      } else if (activeHighlight === "hot") {
        list = list.filter((p) => p.featured);
      }
    }

    // Metal purity filter
    if (purityFilter.length > 0) {
      list = list.filter((p) =>
        purityFilter.some((pur) => {
          if (pur === "14KT") return p.purity.includes("14K");
          if (pur === "18KT") return p.purity.includes("18K");
          if (pur === "22KT") return p.purity.includes("22K");
          return false;
        })
      );
    }

    // Stone filter
    if (stoneFilter) {
      list = list.filter((p) => p.collection.toLowerCase().includes(stoneFilter.toLowerCase()));
    }

    // Quality filter
    if (qualityFilter === "VVS-VS") {
      list = list.filter((p) => p.clarity.includes("VVS") || p.clarity.includes("VS"));
    }

    // Price range filter
    if (priceRange) {
      list = list.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);
    }

    // Rating filter
    if (ratingFilter) {
      list = list.filter((p) => Math.round(p.rating) === ratingFilter);
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.sort((a, b) => Number(b.id) - Number(a.id));
        break;
      default:
        list.sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [selected, activeHighlight, purityFilter, stoneFilter, qualityFilter, priceRange, ratingFilter, sort, query]);

  // Base list of products matching search query and category selections
  const baseList = useMemo(() => {
    let list = [...products];
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((p) => 
        p.name.toLowerCase().includes(q) ||
        isCategoryMatch(p.category, q) ||
        p.collection.toLowerCase().includes(q)
      );
    }
    if (selected.length > 0) {
      list = list.filter((p) => selected.includes(p.category));
    }
    return list;
  }, [selected, query]);

  // Helper to count items matching purity
  const getPurityCount = (pur: string) => {
    if (pur === "9KT") return 0;
    return baseList.filter((p) => {
      if (pur === "14KT") return p.purity.includes("14K");
      if (pur === "18KT") return p.purity.includes("18K");
      return false;
    }).length;
  };

  // Helper to count items matching clarity VVS/VS
  const getClarityCount = () => {
    return baseList.filter((p) => p.clarity.includes("VVS") || p.clarity.includes("VS")).length;
  };

  // Helper to count items matching rating
  const getRatingCount = (r: number) => {
    return baseList.filter((p) => Math.round(p.rating) === r).length;
  };

  const title = presetCategory ?? "Products";
  const crumbs = presetCategory
    ? [{ label: "Products", to: "/products" }, { label: presetCategory }]
    : [{ label: "Products" }];

  const toggle = (c: Category) =>
    setSelected((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );

  return (
    <>
      <PageBanner title={title} crumbs={crumbs} />
      <div className="container-site grid gap-10 py-12 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="space-y-8">
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-primary pb-2 border-b border-border/60">
              Shop By Categories
            </h3>
            <div className="space-y-2.5 text-sm text-foreground/80">
              {allCategories.map((c) => (
                <label key={c} className="flex items-center gap-2.5 cursor-pointer hover:text-gold transition-colors">
                  <input
                    type="checkbox"
                    checked={selected.includes(c)}
                    onChange={() => toggle(c)}
                    className="h-4 w-4 rounded border-gray-300 accent-primary text-primary focus:ring-primary cursor-pointer"
                  />
                  <span>{c === "Pendant" ? "Pendants" : c}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-primary pb-2 border-b border-border/60">
              Highlight
            </h3>
            <div className="space-y-2 text-sm text-foreground/80 font-medium">
              {[
                { id: null, label: "All Products" },
                { id: "bestseller", label: "Best Seller" },
                { id: "newarrivals", label: "New Arrivals" },
                { id: "sale", label: "Sale" },
                { id: "hot", label: "Hot Items" },
              ].map((h) => (
                <button
                  key={h.label}
                  onClick={() => setActiveHighlight(h.id)}
                  className={`block text-left w-full py-1 hover:text-gold transition-colors cursor-pointer ${
                    activeHighlight === h.id ? "text-gold font-bold" : "text-foreground/75"
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-primary pb-2 border-b border-border/60">
              Filter by Choice Of Metal
            </h3>
            <div className="flex flex-wrap gap-2">
              {["9KT", "14KT", "18KT"].map((m) => {
                const count = getPurityCount(m);
                const isSelected = purityFilter.includes(m);
                return (
                  <button
                    key={m}
                    onClick={() =>
                      setPurityFilter((prev) =>
                        prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
                      )
                    }
                    className={`px-3 py-1.5 text-xs font-semibold rounded border transition-all cursor-pointer ${
                      isSelected
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-card text-foreground/80 hover:border-primary/50"
                    }`}
                  >
                    {m} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-primary pb-2 border-b border-border/60">
              Filter by Stone
            </h3>
            <button
              onClick={() => setStoneFilter((prev) => (prev ? null : "Diamond"))}
              className={`px-3 py-1.5 text-xs font-semibold rounded border transition-all cursor-pointer ${
                stoneFilter
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-card text-foreground/80 hover:border-primary/50"
              }`}
            >
              Diamond
            </button>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-primary pb-2 border-b border-border/60">
              Filter by Diamond Quality
            </h3>
            <button
              onClick={() => setQualityFilter((prev) => (prev ? null : "VVS-VS"))}
              className={`px-3 py-1.5 text-xs font-semibold rounded border transition-all cursor-pointer ${
                qualityFilter
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-card text-foreground/80 hover:border-primary/50"
              }`}
            >
              VVS-VS ({getClarityCount()})
            </button>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-primary pb-2 border-b border-border/60">
              Price Filter
            </h3>
            <div className="space-y-2 text-sm text-foreground/80 font-medium">
              {[
                { label: "All", range: null },
                { label: "₹0–₹112,730", range: { min: 0, max: 112730 } },
                { label: "₹112,730–₹225,460", range: { min: 112730, max: 225460 } },
                { label: "₹225,460–₹338,190", range: { min: 225460, max: 338190 } },
                { label: "₹338,190–₹450,920", range: { min: 338190, max: 450920 } },
              ].map((r) => (
                <button
                  key={r.label}
                  onClick={() => setPriceRange(r.range)}
                  className={`block text-left w-full py-1 hover:text-gold transition-colors cursor-pointer ${
                    (priceRange === null && r.range === null) ||
                    (priceRange && r.range && priceRange.min === r.range.min && priceRange.max === r.range.max)
                      ? "text-gold font-bold"
                      : "text-foreground/75"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-primary pb-2 border-b border-border/60">
              Average rating
            </h3>
            <div className="space-y-2.5 text-sm">
              {[5, 4, 3, 2, 1].map((r) => {
                const count = getRatingCount(r);
                return (
                  <button
                    key={r}
                    onClick={() => setRatingFilter((prev) => (prev === r ? null : r))}
                    className={`flex items-center gap-2 hover:text-gold transition-colors w-full cursor-pointer ${
                      ratingFilter === r ? "text-gold font-bold" : "text-foreground/80"
                    }`}
                  >
                    <span className="flex text-amber-400 text-base">
                      {"★".repeat(r)}
                      {"☆".repeat(5 - r)}
                    </span>
                    <span className="text-muted-foreground text-xs">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main */}
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Showing 1–{Math.min(shown, filtered.length)} of {filtered.length}{" "}
              results
            </p>
            <div className="flex items-center gap-3">
              <div className="hidden gap-1 sm:flex">
                <button
                  aria-label="Grid view"
                  onClick={() => setView("grid")}
                  className={`grid h-8 w-8 place-items-center rounded border ${view === "grid" ? "border-primary text-primary" : "border-border text-muted-foreground"}`}
                >
                  <LayoutGrid size={14} />
                </button>
                <button
                  aria-label="List view"
                  onClick={() => setView("list")}
                  className={`grid h-8 w-8 place-items-center rounded border ${view === "list" ? "border-primary text-primary" : "border-border text-muted-foreground"}`}
                >
                  <List size={14} />
                </button>
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    Sort by {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="py-20 text-center text-muted-foreground">
              No products match your filters.
            </p>
          ) : (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 xl:grid-cols-4"
                  : "grid grid-cols-1 gap-6"
              }
            >
              {filtered.slice(0, shown).map((p) => (
                <ProductCard key={p.id} product={p} layout={view} />
              ))}
            </div>
          )}

          {shown < filtered.length && (
            <div className="mt-10 text-center">
              <button className="btn-outline" onClick={() => setShown(shown + 8)}>
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
