"use client";

import { Check, MapPin } from "lucide-react";
import { formatINR, products } from "@/lib/products";
import { PageBanner } from "@/components/Breadcrumb";

const steps = ["Order Placed", "Processing", "In Transit", "Delivered"];

const statusIndex: Record<string, number> = {
  processing: 1,
  "in-transit": 2,
  delivered: 3,
  cancelled: -1,
};

export default function OrderStatusClient({ status }: { status: string }) {
  const idx = statusIndex[status] ?? 1;
  const cancelled = status === "cancelled";
  const items = products.slice(0, 2);
  const label = cancelled
    ? "Cancelled"
    : steps[idx]?.replace("-", " ") || "Processing";

  return (
    <>
      <PageBanner title="Order Status" crumbs={[{ label: "Order Status" }]} />
      <div className="container-site max-w-3xl py-14">
        <div className="rounded-xl border border-border bg-card p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Order Number</p>
              <p className="font-display text-xl font-semibold">#NZ-20260708</p>
            </div>
            <span className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest ${cancelled ? "bg-destructive/10 text-destructive" : "bg-secondary text-primary"}`}>
              {label}
            </span>
          </div>

          {!cancelled && (
            <div className="mt-8 flex items-center">
              {steps.map((s, i) => (
                <div key={s} className="flex flex-1 items-center last:flex-none">
                  <div className="flex flex-col items-center gap-2">
                    <span className={`grid h-9 w-9 place-items-center rounded-full border-2 text-xs font-semibold ${i <= idx ? "border-gold bg-gold text-gold-foreground" : "border-border text-muted-foreground"}`}>
                      {i < idx ? <Check size={14} /> : i + 1}
                    </span>
                    <span className="w-20 text-center text-[10px] uppercase tracking-wide text-muted-foreground">{s}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`mx-1 mb-6 h-0.5 flex-1 ${i < idx ? "bg-gold" : "bg-border"}`} />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Estimated Delivery</p>
              <p className="mt-1 text-sm">{cancelled ? "—" : "Saturday, 12 July 2026"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Shipping Address</p>
              <p className="mt-1 text-sm text-muted-foreground">21 Residency Road, Vijay Nagar, Indore, M.P. 452010</p>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Items in this order</p>
            <div className="space-y-4">
              {items.map((p) => (
                <div key={p.id} className="flex items-center gap-4">
                  <img src={p.image} alt={p.name} width={900} height={900} loading="lazy" className="h-14 w-14 rounded object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">Qty 1</p>
                  </div>
                  <span className="text-sm font-semibold text-primary">{formatINR(p.price)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-secondary/60 p-6 text-sm text-muted-foreground">
          <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
          <p>
            Need help with this order? Visit us at 106, Shiv Om Building, MG
            Road, Indore 452001, or write to care@nazaradiamonds.com.
          </p>
        </div>
      </div>
    </>
  );
}
