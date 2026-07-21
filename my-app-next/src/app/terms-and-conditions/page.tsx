import type { Metadata } from "next";
import { policies } from "@/lib/content";
import { PolicyPage } from "@/components/PolicyPage";

const p = policies["terms-and-conditions"];

export const metadata: Metadata = {
  title: `${p.title} — Nazara Diamonds`,
  description: p.intro,
};

export default function Page() {
  return <PolicyPage {...p} />;
}
