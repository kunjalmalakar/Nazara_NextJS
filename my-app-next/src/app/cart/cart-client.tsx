"use client";

import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { formatINR, getProductById, products } from "@/lib/products";
import { useShop } from "@/lib/store";
import { PageBanner } from "@/components/Breadcrumb";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCarousel } from "@/components/ProductCard";

export default function CartClient() {
  const { cart, updateQty, removeFromCart, subtotal } = useShop();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);
  const discount = applied && subtotal >= 20000 ? 1100 : 0;

  const crossSell = products.filter((p) => p.topSelling).slice(0, 8);

  return (
    <>
      <PageBanner title="Cart" crumbs={[{ label: "Cart" }]} />
      <div className="container-site py-12">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <ShoppingBag size={48} className="text-gold" />
            <h2 className="font-display text-2xl">Your cart is empty</h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              No items in your cart. Go on, fill it up with something you love!
            </p>
            <Link href="/products" className="btn-primary mt-2">
              Start Shopping Now
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead className="border-b border-border text-left text-xs uppercase tracking-widest text-muted-foreground">
                  <tr>
                    <th className="pb-3">Product</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Quantity</th>
                    <th className="pb-3 text-right">Subtotal</th>
                    <th className="pb-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {cart.map((item) => {
                    const p = getProductById(item.productId);
                    if (!p) return null;
                    return (
                      <tr key={`${item.productId}-${item.metal}`}>
                        <td className="py-4">
                          <div className="flex items-center gap-4">
                            <img src={p.image} alt={p.name} width={900} height={900} loading="lazy" className="h-16 w-16 rounded object-cover" />
                            <div>
                              <Link href={`/product/${p.slug}`} className="font-display font-medium hover:text-gold">
                                {p.name}
                              </Link>
                              <p className="text-xs text-muted-foreground">{item.metal}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">{formatINR(p.price)}</td>
                        <td className="py-4">
                          <div className="inline-flex items-center rounded-full border border-border">
                            <button aria-label="Decrease" className="px-2.5 py-1.5" onClick={() => updateQty(item.productId, item.metal, item.qty - 1)}>
                              <Minus size={12} />
                            </button>
                            <span className="w-7 text-center">{item.qty}</span>
                            <button aria-label="Increase" className="px-2.5 py-1.5" onClick={() => updateQty(item.productId, item.metal, item.qty + 1)}>
                              <Plus size={12} />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 text-right font-semibold text-primary">
                          {formatINR(p.price * item.qty)}
                        </td>
                        <td className="py-4 pl-3 text-right">
                          <button aria-label="Remove item" onClick={() => removeFromCart(item.productId, item.metal)} className="text-muted-foreground hover:text-destructive">
                            <X size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <aside className="h-fit rounded-xl border border-border bg-card p-6">
              <h2 className="font-display text-xl font-semibold">Order Summary</h2>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-gold">
                    <span>Coupon (MK1100)</span>
                    <span>-{formatINR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-gold">Free</span>
                </div>
                <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
                  <span>Total</span>
                  <span className="text-primary">{formatINR(subtotal - discount)}</span>
                </div>
              </div>
              <div className="mt-5 flex gap-2">
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Coupon code"
                  className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-gold"
                />
                <button
                  className="btn-outline !px-4 !py-2"
                  onClick={() => setApplied(coupon.trim().toUpperCase() === "MK1100")}
                >
                  Apply
                </button>
              </div>
              {applied && discount === 0 && (
                <p className="mt-2 text-xs text-destructive">
                  MK1100 applies on orders above ₹20,000.
                </p>
              )}
              <button
                className="btn-primary mt-5 w-full"
                onClick={() => alert("Checkout is coming soon — this is a demo storefront!")}
              >
                Proceed to Checkout
              </button>
            </aside>
          </div>
        )}

        <div className="mt-20">
          <SectionHeading title="You May Also Like" />
          <ProductCarousel items={crossSell} />
        </div>
      </div>
    </>
  );
}
