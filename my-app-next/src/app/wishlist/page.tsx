import type { Metadata } from "next";
import WishlistClient from "./wishlist-client";

export const metadata: Metadata = {
  title: "Wishlist — Nazara Diamonds",
  description: "Your saved lab-grown diamond jewellery pieces, all in one place.",
};

export default function Page() {
  return <WishlistClient />;
}
