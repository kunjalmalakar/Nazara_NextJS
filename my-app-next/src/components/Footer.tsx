import Link from "next/link";
import { Facebook, Instagram, MapPin, Youtube, ChevronRight } from "lucide-react";
import { NazaraLogo } from "./NazaraLogo";

const learn = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about-us" },
  { label: "Products", to: "/products" },
  { label: "FAQs", to: "/faqs" },
  { label: "Wishlist", to: "/wishlist" },
  { label: "My account", to: "/account" },
  { label: "Contact Us", to: "/contact-us" },
];

const policyLinks = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Exchange Policy", to: "/exchange-policy" },
  { label: "Return & Refund Policy", to: "/return-refund-policy" },
  { label: "Shipping", to: "/shipping-policy" },
  { label: "Terms & Condition", to: "/terms-and-conditions" },
  { label: "Bangle Size Guide", to: "/bangle-size-guide" },
  { label: "Ring Size Guide", to: "/ring-size-guide" },
];

export function Footer() {
  return (
    <footer className="bg-[#4c2344] text-white">
      <div className="container-site grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Column 1: Logo */}
        <div className="flex flex-col items-start pt-1">
          <Link href="/" className="hover:opacity-95 transition-opacity">
            <NazaraLogo variant="light" size="lg" />
          </Link>
        </div>

        {/* Column 2: Learn */}
        <div>
          <h3 className="font-sans text-base font-bold text-white mb-4">Learn</h3>
          <ul className="space-y-2.5 text-xs font-medium">
            {learn.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.to}
                  className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
                >
                  <ChevronRight size={13} className="text-white/70 shrink-0" />
                  <span>{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Policies */}
        <div>
          <h3 className="font-sans text-base font-bold text-white mb-4">Policies</h3>
          <ul className="space-y-2.5 text-xs font-medium">
            {policyLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.to}
                  className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
                >
                  <ChevronRight size={13} className="text-white/70 shrink-0" />
                  <span>{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Get In Touch */}
        <div>
          <h3 className="font-sans text-base font-bold text-white mb-4">Get In Touch</h3>
          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0 text-white/80" />
              <div>
                <p className="font-bold text-white">Store Address:</p>
                <p className="text-white/85 leading-relaxed">
                  Nazara Diamonds<br />
                  106, Shiv Om Building, MG Road,<br />
                  Indore 452001
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0 text-white/80" />
              <div>
                <p className="font-bold text-white">Registered Office:</p>
                <p className="text-white/85 leading-relaxed">
                  402 Vibrent Business Centre,<br />
                  Manoramaganj, Indore, M.P. 452001
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#3c1a35] py-4">
        <div className="container-site flex flex-col items-center justify-between gap-3 text-xs text-white/80 sm:flex-row">
          <p>© 2026 Lab Grown Diamond Jewellery in Indore</p>
          <div className="flex items-center gap-3.5">
            <a href="#" aria-label="Facebook" className="text-white/80 hover:text-white transition-colors">
              <Facebook size={16} />
            </a>
            <a href="#" aria-label="Instagram" className="text-white/80 hover:text-white transition-colors">
              <Instagram size={16} />
            </a>
            <a href="#" aria-label="YouTube" className="text-white/80 hover:text-white transition-colors">
              <Youtube size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
