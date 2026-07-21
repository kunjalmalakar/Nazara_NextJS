import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
      title: "Not Found — Nazara Diamonds",
    };
  }
  return {
    title: `${product.name} — Nazara Diamonds`,
    description: product.description.slice(0, 155),
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    notFound();
  }
  return <ProductDetailClient slug={slug} />;
}
