import type { Metadata } from "next";
import { ShopPage } from "@/components/ShopPage";

export const metadata: Metadata = {
  title: "Shop All Jewellery — Nazara Diamonds",
  description: "Browse certified lab-grown diamond rings, necklaces, pendants, earrings and bangles with transparent pricing.",
};

interface PageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    purity?: string;
    highlight?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { q, category, purity, highlight } = await searchParams;
  return (
    <ShopPage
      key={`${q ?? ""}-${category ?? ""}-${purity ?? ""}-${highlight ?? ""}`}
      query={q}
      presetCategorySlug={category}
      presetPurity={purity}
      presetHighlight={highlight}
    />
  );
}
