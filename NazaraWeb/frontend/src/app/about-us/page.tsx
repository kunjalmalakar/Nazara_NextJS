import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Leaf, Lightbulb, Hammer } from "lucide-react";
import { PageBanner } from "@/components/Breadcrumb";
import hero1 from "@/assets/hero-1.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

export const metadata: Metadata = {
  title: "About Nazara — Lab Grown Diamond Jewellery",
  description: "Nazara Diamonds is on a mission to make lab-grown diamonds the new standard of luxury — ethical, sustainable and uncompromising in quality.",
};

const values = [
  { Icon: Lightbulb, title: "Innovation", text: "We embrace cutting-edge diamond growing technology to create stones of exceptional purity and brilliance." },
  { Icon: Leaf, title: "Sustainability", text: "Every carat is grown with a fraction of the environmental footprint of mining — luxury without compromise." },
  { Icon: Hammer, title: "Craftsmanship", text: "Our Indore artisans hand-finish each piece across 12 quality checkpoints before it earns the Nazara name." },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner title="About Nazara" crumbs={[{ label: "About Us" }]} />

      <section className="relative">
        <Image src={hero1} alt="Nazara jewellery" width={1920} height={900} loading="lazy" className="h-80 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="container-site absolute inset-x-0 bottom-8">
          <h2 className="font-display text-4xl font-semibold text-primary-foreground">
            Brilliance With a Conscience
          </h2>
        </div>
      </section>

      <section className="container-site max-w-3xl py-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">Our Mission</p>
        <p className="mt-4 font-display text-2xl leading-relaxed">
          "To revolutionise the fine jewellery industry by making lab-grown
          diamonds the new standard of luxury — ethical, sustainable, and
          uncompromising in quality."
        </p>
      </section>

      <section className="bg-secondary/60 py-16">
        <div className="container-site grid gap-6 sm:grid-cols-3">
          {values.map(({ Icon, title, text }) => (
            <div key={title} className="rounded-xl bg-card p-8 text-center shadow-sm">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold/40 text-gold">
                <Icon size={24} strokeWidth={1.5} />
              </span>
              <h3 className="mt-4 font-display text-xl font-medium">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-site py-16 text-center">
        <p className="font-display text-3xl italic text-primary">
          "Sophisticated simplicity for the independent mind."
        </p>
      </section>

      <section className="container-site grid grid-cols-3 gap-4 pb-16">
        {[gallery1, gallery2, gallery3].map((g, i) => (
          <Image key={i} src={g} alt="Nazara workshop and jewellery" width={700} height={700} loading="lazy" className="aspect-square w-full rounded-xl object-cover" />
        ))}
      </section>

      <section className="bg-primary py-16 text-center text-primary-foreground">
        <h2 className="font-display text-3xl font-semibold">Discover the Collection</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-primary-foreground/80">
          Certified lab-grown diamonds, hallmarked gold and a lifetime warranty
          on every piece.
        </p>
        <Link href="/products" className="btn-gold mt-6">
          Shop Now
        </Link>
      </section>
    </>
  );
}
