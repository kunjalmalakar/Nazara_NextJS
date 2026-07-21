import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { QuickViewModal } from "@/components/QuickViewModal";
import { CompareBar } from "@/components/CompareBar";
import { LoginModal } from "@/components/LoginModal";
import { WelcomePopup } from "@/components/WelcomePopup";
import { CookieBanner, FloatingButtons } from "@/components/CookieBanner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nazara Diamonds — Lab Grown Diamond Jewellery in Indore",
  description:
    "Handcrafted lab-grown diamond rings, necklaces, earrings and bangles. Ethical, certified and backed by a lifetime warranty. Free insured shipping across India.",
  authors: [{ name: "Nazara Diamonds" }],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Nazara Diamonds — Lab Grown Diamond Jewellery",
    description:
      "Ethical, certified lab-grown diamond jewellery handcrafted in Indore. Lifetime warranty and free insured shipping.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <AnnouncementBar />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CartDrawer />
          <QuickViewModal />
          <CompareBar />
          <LoginModal />
          <WelcomePopup />
          <CookieBanner />
          <FloatingButtons />
        </Providers>
      </body>
    </html>
  );
}