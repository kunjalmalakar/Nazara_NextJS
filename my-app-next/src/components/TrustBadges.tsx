import { RotateCcw, ShieldCheck, Truck, Gem } from "lucide-react";

const badges = [
  {
    Icon: Truck,
    title: "Standard Delivery",
    text: "Fast and reliable delivery across locations, ensuring your jewellery reaches you safely and on time.",
  },
  {
    Icon: RotateCcw,
    title: "15 Day In-Store Return",
    text: "Enjoy hassle-free in-store returns within 15 days, making your purchase completely worry-free.",
  },
  {
    Icon: ShieldCheck,
    title: "100% Secure Checkout",
    text: "Shop with confidence using our fully encrypted and secure payment process for safe transactions.",
  },
  {
    Icon: Gem,
    title: "Lifetime Warranty",
    text: "Every piece is backed by a lifetime warranty, assuring lasting quality, craftsmanship, and complete peace of mind.",
  },
];

export function TrustBadges() {
  return (
    <section className="border-y border-border bg-secondary/50">
      <div className="container-site grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {badges.map(({ Icon, title, text }) => (
          <div key={title} className="flex flex-col items-center gap-3 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/40 text-gold">
              <Icon size={24} strokeWidth={1.5} />
            </span>
            <h3 className="font-display text-lg font-medium">{title}</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
