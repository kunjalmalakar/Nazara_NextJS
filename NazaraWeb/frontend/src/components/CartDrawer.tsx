"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { formatINR, getProductById } from "@/lib/products";
import { useShop } from "@/lib/store";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart, subtotal } =
    useShop();

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-[95]">
      <button
        aria-label="Close cart"
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={() => setCartOpen(false)}
      />
      <aside className="absolute inset-y-0 right-0 flex w-96 max-w-[92vw] flex-col bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-lg font-semibold">Your Cart</h2>
          <button aria-label="Close" onClick={() => setCartOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <ShoppingBag size={40} className="text-gold" />
            <p className="font-display text-lg">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">
              No items in your cart. Go on, fill it up with something you love!
            </p>
            <Link
              href="/products"
              onClick={() => setCartOpen(false)}
              className="btn-primary"
            >
              Start Shopping Now
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 divide-y divide-border overflow-y-auto">
              {cart.map((item) => {
                const p = getProductById(item.productId);
                if (!p) return null;
                return (
                  <div key={`${item.productId}-${item.metal}`} className="flex gap-4 p-4">
                    <img src={p.image} alt={p.name} width={900} height={900} loading="lazy" className="h-20 w-20 shrink-0 rounded object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${p.slug}`}
                          onClick={() => setCartOpen(false)}
                          className="truncate font-display text-sm font-medium hover:text-gold"
                        >
                          {p.name}
                        </Link>
                        <button
                          aria-label="Remove"
                          onClick={() => removeFromCart(item.productId, item.metal)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.metal}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-border">
                          <button aria-label="Decrease" className="px-2 py-1" onClick={() => updateQty(item.productId, item.metal, item.qty - 1)}>
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-xs">{item.qty}</span>
                          <button aria-label="Increase" className="px-2 py-1" onClick={() => updateQty(item.productId, item.metal, item.qty + 1)}>
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-primary">
                          {formatINR(p.price * item.qty)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-border p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-display text-lg font-semibold">
                  {formatINR(subtotal)}
                </span>
              </div>
              <Link
                href="/cart"
                onClick={() => setCartOpen(false)}
                className="btn-primary w-full"
              >
                View Cart & Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
