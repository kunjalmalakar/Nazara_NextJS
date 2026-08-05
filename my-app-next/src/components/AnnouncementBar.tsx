"use client";

import { usePathname } from "next/navigation";

export function AnnouncementBar() {
  const pathname = usePathname();

  // Removed restriction to show on all pages

  return (
    <div className="bg-dark text-dark-foreground">
      <div className="container-site flex items-center justify-between gap-4 py-2.5 text-[11px] tracking-wide sm:text-xs">
        <p className="min-w-0 truncate text-white/95">
          Flat <span className="font-bold text-white">Rs.1100</span> OFF on Making charges on orders above{" "}
          <span className="font-bold text-white">Rs.20,000</span> Use code{" "}
          <span className="font-bold text-white">MK1100</span>
        </p>
        <a
          href="https://maps.google.com/?q=106+Shiv+Om+Building+MG+Road+Indore"
          target="_blank"
          rel="noreferrer"
          className="flex shrink-0 items-center gap-2 border border-white/40 px-3.5 py-1 rounded text-[11px] font-medium tracking-wide text-white transition-all hover:bg-white hover:text-dark group"
        >
          <span>Find a Store</span>
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white text-dark text-[8px] group-hover:bg-dark group-hover:text-white transition-colors">
            ➔
          </span>
        </a>
      </div>
    </div>
  );
}
