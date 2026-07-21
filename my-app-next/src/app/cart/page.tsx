import type { Metadata } from "next";
import CartClient from "./cart-client";

export const metadata: Metadata = {
  title: "Your Cart — Nazara Diamonds",
  description: "Review your selected lab-grown diamond jewellery and proceed to secure checkout.",
};

export default function Page() {
  return <CartClient />;
}
