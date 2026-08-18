import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categorySlugs } from "@/lib/products";
import { ShopPage } from "@/components/ShopPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = categorySlugs[slug];
  if (!categoryName) {
    return {
      title: "Category Not Found — Nazara Diamonds",
    };
  }
  return {
    title: `${categoryName} — Nazara Diamonds`,
    description: `Shop lab-grown diamond ${categoryName.toLowerCase()} handcrafted in hallmarked gold with lifetime warranty.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  if (!categorySlugs[slug]) {
    notFound();
  }
  return <ShopPage categorySlug={slug} />;
}
