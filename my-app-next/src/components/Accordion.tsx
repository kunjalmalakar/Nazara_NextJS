"use client";

import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

export function Accordion({
  items,
}: {
  items: { q: string; a: ReactNode }[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border rounded-lg border border-border bg-card">
      {items.map((item, i) => (
        <div key={i}>
          <button
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            {item.q}
            <ChevronDown
              size={16}
              className={`shrink-0 transition-transform duration-300 ${open === i ? "rotate-180 text-gold" : ""}`}
            />
          </button>
          {open === i && (
            <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
