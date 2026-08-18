import type { Metadata } from "next";
import AccountClient from "./account-client";

export const metadata: Metadata = {
  title: "My Account — Nazara Diamonds",
  description: "Login or register to manage your Nazara Diamonds orders, details and wishlist.",
};

export default function Page() {
  return <AccountClient />;
}
