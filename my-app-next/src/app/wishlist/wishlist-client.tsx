"use client";

import { Heart, X } from "lucide-react";
import Link from "next/link";
import { formatINR, getProductById } from "@/lib/products";
import { useShop } from "@/lib/store";
import { PageBanner } from "@/components/Breadcrumb";
import { StarRating } from "@/components/StarRating";

export default function WishlistClient() {
  const { wishlist, toggleWishlist, addToCart, loggedIn, setLoginOpen, isAuthLoading } = useShop();
  const items = wishlist.map(getProductById).filter(Boolean);

  if (isAuthLoading) {
    return (
      <>
        <PageBanner title="Wishlist" crumbs={[{ label: "Wishlist" }]} />
        <div className="container-site py-16 flex items-center justify-center">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            Loading your wishlist...
          </div>
        </div>
      </>
    );
  }

  if (!loggedIn) {
    return (
      <>
        <PageBanner title="Wishlist" crumbs={[{ label: "Wishlist" }]} />
        <div className="container-site py-16 text-center">
          <div className="mx-auto max-w-md rounded-xl border border-border bg-card p-8 flex flex-col items-center gap-4">
            <Heart size={44} className="text-gold" />
            <h2 className="font-display text-2xl font-semibold">Sign in to view your Wishlist</h2>
            <p className="text-sm text-muted-foreground">
              Save your favorite diamond creations across devices and keep track of pieces you love.
            </p>
            <button onClick={() => setLoginOpen(true)} className="btn-primary mt-2 w-full">
              Login to Your Account
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageBanner title="Wishlist" crumbs={[{ label: "Wishlist" }]} />
      <div className="container-site py-12">
        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <Heart size={48} className="text-gold" />
            <h2 className="font-display text-2xl">Your wishlist is empty</h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              Tap the heart on any piece you love and it will be saved here for later.
            </p>
            <Link href="/products" className="btn-primary mt-2">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
            {items.map((p) => (
              <div key={p!.id} className="group relative flex flex-col rounded-lg border border-border bg-card p-3">
                <button
                  aria-label="Remove from wishlist"
                  onClick={() => toggleWishlist(p!.id)}
                  className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-background/90 text-muted-foreground shadow hover:text-destructive"
                >
                  <X size={14} />
                </button>
                <Link href={`/product/${p!.slug}`}>
                  <img src={p!.image} alt={p!.name} width={900} height={900} loading="lazy" className="aspect-square w-full rounded object-cover" />
                </Link>
                <div className="flex flex-col items-center gap-1.5 py-4 text-center">
                  <Link href={`/product/${p!.slug}`} className="font-display font-medium hover:text-gold">
                    {p!.name}
                  </Link>
                  <StarRating rating={p!.rating} showLabel={false} />
                  <p className="text-sm font-semibold text-primary">From {formatINR(p!.price)}</p>
                  <button
                    className="btn-primary mt-2 w-full !py-2 !text-[10px]"
                    onClick={() => {
                      addToCart(p!.id);
                      toggleWishlist(p!.id);
                    }}
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
