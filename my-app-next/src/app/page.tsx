import type { Metadata } from "next";
import { HomeClient } from "./home-client";

export const metadata: Metadata = {
  title: "Nazara Diamonds — Lab Grown Diamond Jewellery in Indore",
  description:
    "Shop certified lab-grown diamond rings, necklaces, earrings and bangles. Ethical luxury, lifetime warranty and free insured shipping across India.",
};

export default function Page() {
  return <HomeClient />;
}