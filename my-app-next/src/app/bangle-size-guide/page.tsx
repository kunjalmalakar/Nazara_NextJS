import type { Metadata } from "next";
import { SizeGuidePage } from "@/components/SizeGuidePage";
import hero3 from "@/assets/hero-3.jpg";

export const metadata: Metadata = {
  title: "Bangle Size Guide — Nazara Diamonds",
  description: "Find your bangle size: measure your wrist, understand 2.4 sizing, kada vs bangle fit and kids sizes.",
};

export default function Page() {
  return (
    <SizeGuidePage
      title="Bangle Size Guide"
      heroImage={hero3.src}
      intro="To find your bangle size, bring your thumb and little finger together and measure around the widest part of your hand with a measuring tape — that is the smallest circumference a bangle must pass over. Bangle sizes like 2.4 or 2.6 refer to the inner diameter in inches (2 inches + 4/16, etc.)."
      tableTitle="Bangle & Kids Size Chart"
      tableHead={["Size", "Inner Diameter", "Circumference", "Suits"]}
      tableRows={[
        ["2.2", "2.125 in / 54 mm", "170 mm", "Petite / older kids"],
        ["2.4", "2.25 in / 57 mm", "180 mm", "Small adult wrists"],
        ["2.6", "2.375 in / 60 mm", "190 mm", "Average Indian size"],
        ["2.8", "2.5 in / 63.5 mm", "200 mm", "Larger wrists"],
        ["2.10", "2.625 in / 67 mm", "210 mm", "Broad hands"],
        ["Kids 1.10", "1.625 in / 41 mm", "130 mm", "0–2 years"],
        ["Kids 2.0", "2.0 in / 51 mm", "160 mm", "5–10 years"],
      ]}
      faqItems={[
        { q: "What does a 2.4 size mean?", a: "It is the inner diameter in inches — 2 and 4/16 inches (2.25 in / about 57 mm). The second digit counts sixteenths of an inch." },
        { q: "How do I find my bangle size without a bangle?", a: "Fold your thumb to your little finger and measure around the widest part of your hand, then match that circumference in the chart above." },
        { q: "Is FS (free size) suitable for everyone?", a: "FS bangles with an openable clasp or flexible design fit most wrists between sizes 2.4 and 2.8, but rigid FS pieces suit average wrists best." },
        { q: "What are average Indian bangle sizes?", a: "Most Indian women wear 2.4 to 2.6; 2.6 is the most commonly purchased size." },
        { q: "Do kadas fit differently from bangles?", a: "Yes — kadas are broader and rigid, so many prefer a quarter size larger than their bangle size, or an openable kada for a closer fit." },
        { q: "Should a bangle fit snug or loose?", a: "It should slide over the knuckles with gentle pressure and rest with a little movement on the wrist — snug enough not to slip off, loose enough to rotate freely." },
      ]}
    />
  );
}
