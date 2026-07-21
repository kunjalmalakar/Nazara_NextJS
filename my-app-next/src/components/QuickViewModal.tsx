"use client";

import Link from "next/link";
import { formatINR, getProductById } from "@/lib/products";
import { useShop } from "@/lib/store";
import { Modal } from "./Modal";
import { StarRating } from "./StarRating";

export function QuickViewModal() {
  const { quickViewId, setQuickViewId, addToCart } = useShop();
  const product = quickViewId ? getProductById(quickViewId) : null;

  return (
    <Modal open={!!product} onClose={() => setQuickViewId(null)} maxWidth="max-w-3xl">
      {product && (
        <div className="grid gap-8 sm:grid-cols-2">
          <img
            src={product.image}
            alt={product.name}
            width={900}
            height={900}
            className="aspect-square w-full rounded-lg object-cover"
          />
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-semibold">{product.name}</h2>
            <StarRating rating={product.rating} />
            <p className="text-lg font-semibold text-primary">
              From {formatINR(product.price)}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
            <div className="mt-auto flex flex-col gap-2 pt-4">
              <button
                className="btn-primary w-full"
                onClick={() => {
                  addToCart(product.id);
                  setQuickViewId(null);
                }}
              >
                Add to Cart
              </button>
              <Link
                href={`/product/${product.slug}`}
                onClick={() => setQuickViewId(null)}
                className="btn-outline w-full"
              >
                Select Options
              </Link>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
