import type { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Us — Nazara Diamonds Indore",
  description: "Visit our Indore store on MG Road, call us or send a message. We would love to help you find your perfect piece.",
};

export default function Page() {
  return <ContactClient />;
}
