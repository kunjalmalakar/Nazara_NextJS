import type { Metadata } from "next";
import { faqs } from "@/lib/content";
import { PageBanner } from "@/components/Breadcrumb";
import { Accordion } from "@/components/Accordion";

export const metadata: Metadata = {
  title: "FAQs — Nazara Diamonds",
  description: "Answers about lab-grown diamonds, shipping timelines, returns, customization and lifetime warranty.",
};

export default function Page() {
  return (
    <>
      <PageBanner title="FAQs" crumbs={[{ label: "FAQs" }]} />
      <div className="container-site max-w-3xl py-14">
        <p className="text-center text-sm text-muted-foreground">
          Everything you need to know about lab-grown diamonds, our process and
          your purchase. Can't find your answer? Reach us on WhatsApp anytime.
        </p>
        {faqs.map((group) => (
          <section key={group.group} className="mt-10">
            <h2 className="mb-4 font-display text-2xl font-semibold">{group.group}</h2>
            <Accordion items={group.items} />
          </section>
        ))}
      </div>
    </>
  );
}
