import type { Metadata } from "next";
import { SizeGuidePage } from "@/components/SizeGuidePage";
import hero2 from "@/assets/hero-2.jpg";

export const metadata: Metadata = {
  title: "Ring Size Guide — Nazara Diamonds",
  description: "Measure your ring size at home with our US/UK/India conversion chart and expert tips.",
};

export default function Page() {
  return (
    <SizeGuidePage
      title="Ring Size Guide"
      heroImage={hero2.src}
      intro="Finding your perfect ring size at home is easy. Wrap a thin strip of paper snugly around the base of your finger, mark where it overlaps, and measure the length in millimetres — that is your finger circumference. Match it in the chart below. Measure at the end of the day when fingers are largest, and size up if your knuckle is prominent."
      tableTitle="US / UK / India Size Conversion"
      tableHead={["Circumference (mm)", "India Size", "US Size", "UK Size"]}
      tableRows={[
        ["46.8", "6", "4", "H ½"],
        ["49.3", "8", "5", "J ½"],
        ["51.9", "10", "6", "L ½"],
        ["54.4", "12", "7", "N ½"],
        ["57.0", "14", "8", "P ½"],
        ["59.5", "16", "9", "R ½"],
        ["62.1", "18", "10", "T ½"],
        ["64.6", "20", "11", "V ½"],
      ]}
      faqItems={[
        { q: "What if I'm between two sizes?", a: "Choose the larger size — a slightly loose ring is more comfortable and can be resized down easily." },
        { q: "Do fingers change size?", a: "Yes, fingers can swell in heat and shrink in cold. Measure at room temperature at the end of the day for the most accurate fit." },
        { q: "Can Nazara resize my ring?", a: "Most designs can be resized by 1–2 sizes free of charge within the first year. Eternity bands with full stone coverage cannot be resized." },
        { q: "How do I measure for a surprise gift?", a: "Borrow a ring they wear on the intended finger and measure its inner diameter, or trace its inner circle on paper and bring it to our store." },
      ]}
    />
  );
}
