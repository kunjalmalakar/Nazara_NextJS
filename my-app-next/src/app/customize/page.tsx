import type { Metadata } from "next";
import CustomizeClient from "./customize-client";

export const metadata: Metadata = {
  title: "Design Your Own Jewellery — Nazara Diamonds",
  description: "Create custom lab-grown diamond jewellery. Share your design, approve CAD renders and receive your handcrafted piece.",
};

export default function Page() {
  return <CustomizeClient />;
}
