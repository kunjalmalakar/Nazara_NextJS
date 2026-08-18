import type { Metadata } from "next";
import { getProduct } from "@/lib/products";
import ProductDetailClient from "./product-detail-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    return {
      title: "Product — Nazara Diamonds",
      description: "Handcrafted luxury jewellery by Nazara Diamonds.",
    };
  }
  return {
    title: `${product.name} — Nazara Diamonds`,
    description: product.description.slice(0, 155),
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  // Always render client component — it handles custom products from JSON store
  return <ProductDetailClient slug={slug} />;
}
