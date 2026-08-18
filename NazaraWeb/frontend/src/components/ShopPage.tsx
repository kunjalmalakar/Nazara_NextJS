"use client";

import { useMemo, useState, useEffect } from "react";
import { LayoutGrid, List, Loader2 } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  apiProductToProduct,
  categorySlugs,
  formatINR,
  type Category,
  type Product,
} from "@/lib/products";
import { apiGetProducts } from "@/lib/api";
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

  // Map category to slug for API call
  const activeCategorySlug = useMemo(() => {
    if (actualCategorySlug) return actualCategorySlug;
    if (selected.length === 1) {
      const cat = selected[0];
      const entry = Object.entries(categorySlugs).find(([, v]) => v === cat);
      return entry ? entry[0] : undefined;
    }
    return undefined;
  }, [actualCategorySlug, selected]);

  // Map sort options to API parameters
  const apiSortParams = useMemo(() => {
    switch (sort) {
      case "price-asc":
        return { sort: "price" as const, order: "asc" as const };
      case "price-desc":
        return { sort: "price" as const, order: "desc" as const };
      case "rating":
        return { sort: "rating" as const, order: "desc" as const };
      case "newest":
        return { sort: "createdAt" as const, order: "desc" as const };
      default:
        return { sort: "createdAt" as const, order: "desc" as const };
    }
  }, [sort]);

  // Map highlight to tags filter
  const apiTagParam = useMemo(() => {
    if (activeHighlight === "bestseller") return "top-selling";
    if (activeHighlight === "newarrivals") return "new-launch";
    if (activeHighlight === "hot") return "featured";
    return undefined;
  }, [activeHighlight]);

  // ── TanStack Query useInfiniteQuery ──────────────────────────────────────────
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: [
      "products",
      {
        category: activeCategorySlug,
        tags: apiTagParam,
        q: query,
        sort: apiSortParams.sort,
        order: apiSortParams.order,
      },
    ],
    queryFn: ({ pageParam = 1 }) =>
      apiGetProducts({
        category: activeCategorySlug,
        tags: apiTagParam,
        q: query,
        sort: apiSortParams.sort,
        order: apiSortParams.order,
        page: pageParam,
        limit: 12,
      }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  // Flatten products across all loaded pages and map to Product objects
  const rawProducts = useMemo(() => {
    return data?.pages.flatMap((page) => page.products) ?? [];
  }, [data]);

  const [serverCustomProducts, setServerCustomProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch the shared product store file written by Nazara_Admin
    // Uses cache-busting to always get the latest version after an admin add
    fetch(`/custom_products.json?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data: any[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setServerCustomProducts(data as Product[]);
        }
      })
      .catch(() => {
        // File may not exist or be empty — silently ignore
      });
  }, []);

  const mappedProducts = useMemo(() => {
    let list = rawProducts.map(apiProductToProduct);
    
    // Combine backend products with server-custom products from Nazara_Admin
    if (serverCustomProducts.length > 0) {
      const existingSlugs = new Set(list.map((p) => p.slug));
      const filteredCustom = serverCustomProducts.filter((cp) => !existingSlugs.has(cp.slug));
      list = [...filteredCustom, ...list];
    }

    if (typeof window !== "undefined") {
      try {
        const customStr = localStorage.getItem("nazara_added_products");
        if (customStr) {
          const customList: Product[] = JSON.parse(customStr);
          const existingSlugs = new Set(list.map((p) => p.slug));
          const filteredCustom = customList.filter((cp) => !existingSlugs.has(cp.slug));
          list = [...filteredCustom, ...list];
        }
      } catch (err) {
        console.error("Error loading custom products:", err);
      }
    }
    return list;
  }, [rawProducts, serverCustomProducts]);

  // Apply client-side refining for secondary filters (purity, stone, quality, price range)
  const filtered = useMemo(() => {
    let list = [...mappedProducts];

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

    return list;
  }, [mappedProducts, purityFilter, stoneFilter, qualityFilter, priceRange, ratingFilter]);

  const totalItems = data?.pages[0]?.pagination.totalItems ?? filtered.length;

  const toggleCategory = (cat: Category) => {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const togglePurity = (pur: string) => {
    setPurityFilter((prev) =>
      prev.includes(pur) ? prev.filter((p) => p !== pur) : [...prev, pur],
    );
  };

  const clearAllFilters = () => {
    setSelected([]);
    setActiveHighlight(null);
    setPurityFilter([]);
    setStoneFilter(null);
    setQualityFilter(null);
    setPriceRange(null);
    setRatingFilter(null);
  };

  return (
    <>
      <PageBanner
        title={
          presetHighlight
            ? presetHighlight === "bestseller"
              ? "Bestselling Jewellery"
              : presetHighlight === "newarrivals"
                ? "New Arrivals"
                : presetHighlight === "sale"
                  ? "Special Offers"
                  : "Featured Collection"
            : presetPurity
              ? `${presetPurity} Gold Jewellery`
              : presetCategory
                ? `${presetCategory} Collection`
                : query
                  ? `Search Results for "${query}"`
                  : "All Jewellery"
        }
        crumbs={[
          { label: "Shop", to: "/products" },
          ...(presetCategory ? [{ label: presetCategory }] : []),
          ...(query ? [{ label: `Search: ${query}` }] : []),
        ]}
      />

      <div className="container-site py-10 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h3 className="font-display text-lg font-semibold">Filters</h3>
            <button
              onClick={clearAllFilters}
              className="text-xs text-muted-foreground hover:text-gold transition-colors"
            >
              Clear All
            </button>
          </div>

          {/* Highlights Quick Filter */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Collections & Highlights
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "bestseller", label: "Top Selling" },
                { id: "newarrivals", label: "New Launches" },
                { id: "hot", label: "Featured" },
              ].map((h) => (
                <button
                  key={h.id}
                  onClick={() => setActiveHighlight(activeHighlight === h.id ? null : h.id)}
                  className={`rounded-full px-3 py-1 text-xs font-medium border transition-all ${
                    activeHighlight === h.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:border-gold"
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Categories
            </h4>
            <div className="space-y-2">
              {allCategories.map((cat) => (
                <label key={cat} className="flex items-center gap-2.5 text-sm cursor-pointer hover:text-gold transition-colors">
                  <input
                    type="checkbox"
                    checked={selected.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="accent-[var(--color-primary)] rounded"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Metal Purity */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Purity
            </h4>
            <div className="space-y-2">
              {["14KT", "18KT", "22KT"].map((pur) => (
                <label key={pur} className="flex items-center gap-2.5 text-sm cursor-pointer hover:text-gold transition-colors">
                  <input
                    type="checkbox"
                    checked={purityFilter.includes(pur)}
                    onChange={() => togglePurity(pur)}
                    className="accent-[var(--color-primary)] rounded"
                  />
                  <span>{pur} Gold</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="flex-1">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Showing {filtered.length} of {totalItems} items
            </p>
            <div className="flex items-center gap-3">
              <div className="hidden gap-1 sm:flex">
                <button
                  aria-label="Grid view"
                  onClick={() => setView("grid")}
                  className={`grid h-8 w-8 place-items-center rounded border ${
                    view === "grid" ? "border-primary text-primary" : "border-border text-muted-foreground"
                  }`}
                >
                  <LayoutGrid size={14} />
                </button>
                <button
                  aria-label="List view"
                  onClick={() => setView("list")}
                  className={`grid h-8 w-8 place-items-center rounded border ${
                    view === "list" ? "border-primary text-primary" : "border-border text-muted-foreground"
                  }`}
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

          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <Loader2 size={32} className="animate-spin text-primary" />
              <p className="text-sm">Loading handcrafted creations...</p>
            </div>
          ) : isError ? (
            <div className="py-20 text-center text-destructive">
              Failed to load products. Make sure NestJS backend is running.
            </div>
          ) : filtered.length === 0 ? (
            <p className="py-20 text-center text-muted-foreground">
              No products match your active filters.
            </p>
          ) : (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 xl:grid-cols-4"
                  : "grid grid-cols-1 gap-6"
              }
            >
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} layout={view} />
              ))}
            </div>
          )}

          {/* Load More Button */}
          {hasNextPage && (
            <div className="mt-10 text-center">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="btn-outline min-w-[200px] disabled:opacity-50"
              >
                {isFetchingNextPage ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Loading more...
                  </span>
                ) : (
                  "Load More Products"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
