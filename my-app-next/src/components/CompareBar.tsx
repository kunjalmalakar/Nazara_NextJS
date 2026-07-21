"use client";

import { useState } from "react";
import { ChevronUp, Shuffle, X } from "lucide-react";
import { formatINR, getProductById } from "@/lib/products";
import { useShop } from "@/lib/store";
import { StarRating } from "./StarRating";

const fields = [
  { key: "rating", label: "Rating" },
  { key: "price", label: "Price" },
  { key: "cart", label: "Add to cart" },
  { key: "description", label: "Description" },
  { key: "weight", label: "Weight" },
  { key: "dimensions", label: "Dimensions" },
  { key: "info", label: "Additional info" },
] as const;

export function CompareBar() {
  const { compare, toggleCompare, clearCompare, addToCart } = useShop();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState<Record<string, boolean>>(
    Object.fromEntries(fields.map((f) => [f.key, true])),
  );

  if (compare.length === 0) return null;
  const items = compare.map(getProductById).filter(Boolean);

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] border-t border-border bg-card shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.25)]">
      <div className="container-site flex items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Shuffle size={16} className="text-gold" />
          Compare ({compare.length})
        </div>
        <div className="flex items-center gap-3">
          <button className="text-xs text-muted-foreground hover:text-destructive" onClick={clearCompare}>
            Clear all
          </button>
          <button
            className="btn-primary !py-2 !px-5"
            onClick={() => setOpen(!open)}
          >
            {open ? "Hide" : "Compare"}
            <ChevronUp size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[60vh] overflow-auto border-t border-border">
          <div className="container-site py-5">
            <div className="mb-4 flex flex-wrap gap-4 text-xs">
              {fields.map((f) => (
                <label key={f.key} className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={visible[f.key]}
                    onChange={() => setVisible((v) => ({ ...v, [f.key]: !v[f.key] }))}
                    className="accent-[var(--color-primary)]"
                  />
                  {f.label}
                </label>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-sm">
                <tbody>
                  <tr>
                    {items.map((p) => (
                      <td key={p!.id} className="w-1/4 border border-border p-3 align-top">
                        <div className="relative">
                          <button
                            aria-label="Remove from compare"
                            onClick={() => toggleCompare(p!.id)}
                            className="absolute right-0 top-0 text-muted-foreground hover:text-destructive"
                          >
                            <X size={14} />
                          </button>
                          <img src={p!.image} alt={p!.name} width={900} height={900} loading="lazy" className="mx-auto h-24 w-24 rounded object-cover" />
                          <p className="mt-2 text-center font-display font-medium">{p!.name}</p>
                        </div>
                      </td>
                    ))}
                  </tr>
                  {visible.rating && (
                    <tr>
                      {items.map((p) => (
                        <td key={p!.id} className="border border-border p-3">
                          <div className="flex justify-center"><StarRating rating={p!.rating} showLabel={false} /></div>
                        </td>
                      ))}
                    </tr>
                  )}
                  {visible.price && (
                    <tr>
                      {items.map((p) => (
                        <td key={p!.id} className="border border-border p-3 text-center font-semibold text-primary">
                          From {formatINR(p!.price)}
                        </td>
                      ))}
                    </tr>
                  )}
                  {visible.cart && (
                    <tr>
                      {items.map((p) => (
                        <td key={p!.id} className="border border-border p-3 text-center">
                          <button className="btn-outline !py-1.5 !px-4 !text-[10px]" onClick={() => addToCart(p!.id)}>
                            Add to cart
                          </button>
                        </td>
                      ))}
                    </tr>
                  )}
                  {visible.description && (
                    <tr>
                      {items.map((p) => (
                        <td key={p!.id} className="border border-border p-3 text-xs text-muted-foreground">
                          {p!.description.slice(0, 120)}…
                        </td>
                      ))}
                    </tr>
                  )}
                  {visible.weight && (
                    <tr>
                      {items.map((p) => (
                        <td key={p!.id} className="border border-border p-3 text-center text-xs">{p!.weight}</td>
                      ))}
                    </tr>
                  )}
                  {visible.dimensions && (
                    <tr>
                      {items.map((p) => (
                        <td key={p!.id} className="border border-border p-3 text-center text-xs">{p!.dimensions}</td>
                      ))}
                    </tr>
                  )}
                  {visible.info && (
                    <tr>
                      {items.map((p) => (
                        <td key={p!.id} className="border border-border p-3 text-center text-xs">
                          {p!.purity} · {p!.clarity}
                        </td>
                      ))}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
