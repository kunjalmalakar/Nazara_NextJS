import type { Metadata } from "next";
import OrderStatusClient from "./order-status-client";

export const metadata: Metadata = {
  title: "Order Status — Nazara Diamonds",
  robots: "noindex",
};

interface PageProps {
  params: Promise<{ status: string }>;
}

export default async function Page({ params }: PageProps) {
  const { status } = await params;
  return <OrderStatusClient status={status} />;
}
