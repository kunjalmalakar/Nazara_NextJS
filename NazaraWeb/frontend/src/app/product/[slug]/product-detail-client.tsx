"use client";

import {
  Award,
  Gem,
  Heart,
  MessageCircle,
  Minus,
  Plus,
  Share2,
  Shuffle,
  Truck,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  formatINR,
  getProduct,
  priceBreakup,
  getAllProducts,
  type Product,
} from "@/lib/products";
import { useShop } from "@/lib/store";
import { Breadcrumb } from "@/components/Breadcrumb";
import { StarRating } from "@/components/StarRating";
import { Modal } from "@/components/Modal";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCarousel } from "@/components/ProductCard";

const metals = ["Yellow Gold", "Rose Gold", "White Gold"];
const carats = ["0.30 ct", "0.50 ct", "0.75 ct", "1.00 ct"];

export default function ProductDetailClient({ slug }: { slug: string }) {
  const { addToCart, toggleWishlist, wishlist, toggleCompare, setCartOpen } =
    useShop();

  const [product, setProduct] = useState<Product | null>(getProduct(slug) || null);
  const [loading, setLoading] = useState(!product);

  useEffect(() => {
    if (product) return;
    // Product not in static list — check custom_products.json
    fetch(`/custom_products.json?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data: Product[]) => {
        if (Array.isArray(data)) {
          const found = data.find((p) => p.slug === slug);
          if (found) setProduct(found);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug, product]);

  const [mainImg, setMainImg] = useState(0);
  const [metal, setMetal] = useState(metals[0]);
  const [carat, setCarat] = useState(carats[1]);
  const [qty, setQty] = useState(1);
  const [breakupOpen, setBreakupOpen] = useState(false);
  const [tab, setTab] = useState<"desc" | "info" | "reviews">("desc");

  if (loading) {
    return (
      <div className="container-site py-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-site py-24 text-center space-y-4">
        <h1 className="text-2xl font-display font-bold text-primary">Product Not Found</h1>
        <p className="text-muted-foreground">This product may have been removed or the link is incorrect.</p>
        <Link href="/products" className="inline-block px-6 py-2.5 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors">
          Browse All Products
        </Link>
      </div>
    );
  }

  const images = [product.image, product.hoverImage].filter(Boolean);
  const breakup = priceBreakup(product);
  const allProducts = getAllProducts();
  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .concat(allProducts.filter((p) => p.category !== product.category))
    .slice(0, 8);
  const wished = wishlist.includes(product.id);

  return (
    <div className="container-site py-10">
      <Breadcrumb
        items={[
          { label: "Products", to: "/products" },
          { label: product.category, to: "/products" },
          { label: product.name },
        ]}
      />

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="group overflow-hidden rounded-xl bg-card">
            <img
              src={images[mainImg]}
              alt={product.name}
              width={900}
              height={900}
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-125"
            />
          </div>
          <div className="mt-3 flex gap-3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setMainImg(i)}
                className={`overflow-hidden rounded-lg border-2 transition-colors ${i === mainImg ? "border-gold" : "border-transparent"}`}
              >
                <img src={img} alt="" width={900} height={900} loading="lazy" className="h-20 w-20 object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">
            {product.name}
          </h1>
          <div className="mt-3 flex items-center gap-3">
            <StarRating rating={product.rating} />
            <button
              onClick={() => setTab("reviews")}
              className="text-xs text-muted-foreground underline-offset-2 hover:underline"
            >
              Reviews ({product.reviews})
            </button>
          </div>
          <div className="mt-4 flex items-baseline gap-4">
            <p className="text-2xl font-semibold text-primary">
              From {formatINR(product.price)}
            </p>
            <button
              onClick={() => setBreakupOpen(true)}
              className="text-xs font-semibold uppercase tracking-widest text-gold underline-offset-4 hover:underline"
            >
              Price Breakup
            </button>
          </div>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest">
              Metal Color: <span className="text-muted-foreground">{metal}</span>
            </p>
            <div className="flex gap-2">
              {metals.map((m) => (
                <button
                  key={m}
                  aria-label={m}
                  onClick={() => setMetal(m)}
                  className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${metal === m ? "border-primary" : "border-border"}`}
                  style={{
                    background:
                      m === "Yellow Gold"
                        ? "linear-gradient(135deg,#e8c874,#c9a248)"
                        : m === "Rose Gold"
                          ? "linear-gradient(135deg,#eec2b2,#d59a85)"
                          : "linear-gradient(135deg,#e8e8ea,#c4c6cc)",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest">Carat</p>
            <select
              value={carat}
              onChange={(e) => setCarat(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
            >
              {carats.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-border">
              <button aria-label="Decrease quantity" className="px-3 py-2.5" onClick={() => setQty(Math.max(1, qty - 1))}>
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button aria-label="Increase quantity" className="px-3 py-2.5" onClick={() => setQty(qty + 1)}>
                <Plus size={14} />
              </button>
            </div>
            <button
              className="btn-primary flex-1"
              onClick={() => addToCart(product.id, qty, metal)}
            >
              Add to Cart
            </button>
            <button
              className="btn-gold flex-1"
              onClick={() => {
                addToCart(product.id, qty, metal);
                setCartOpen(true);
              }}
            >
              Buy Now
            </button>
          </div>

          <div className="mt-5 flex gap-5 text-xs text-muted-foreground">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`flex items-center gap-1.5 transition-colors hover:text-gold ${wished ? "text-gold" : ""}`}
            >
              <Heart size={14} fill={wished ? "currentColor" : "none"} /> Wishlist
            </button>
            <button
              onClick={() => toggleCompare(product.id)}
              className="flex items-center gap-1.5 transition-colors hover:text-gold"
            >
              <Shuffle size={14} /> Compare
            </button>
            <button className="flex items-center gap-1.5 transition-colors hover:text-gold">
              <Share2 size={14} /> Share
            </button>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-gold"
            >
              <MessageCircle size={14} /> Ask us
            </a>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-3 rounded-lg border border-border bg-secondary/50 p-4 text-center text-[11px]">
            <div className="flex flex-col items-center gap-1.5">
              <Gem size={18} className="text-gold" /> Certified Lab Grown Diamonds
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Award size={18} className="text-gold" /> Lifetime Warranty
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Truck size={18} className="text-gold" /> Free Shipping
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex gap-1 border-b border-border">
          {[
            { key: "desc", label: "Description" },
            { key: "info", label: "Additional Information" },
            { key: "reviews", label: `Reviews (${product.reviews})` },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as typeof tab)}
              className={`px-5 py-3 text-sm font-medium transition-colors ${tab === t.key ? "border-b-2 border-gold text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="py-8">
          {tab === "desc" && (
            <div className="max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground">
              <p>{product.description}</p>
              <p>
                Each stone is precision-cut to maximise brilliance and comes
                with independent certification. The setting is finished by hand
                in our Indore atelier, polished to a mirror shine and inspected
                across 12 quality checkpoints before it ships in our signature
                packaging — ready to gift, ready to treasure.
              </p>
            </div>
          )}
          {tab === "info" && (
            <table className="w-full max-w-xl text-sm">
              <tbody className="divide-y divide-border">
                {[
                  ["Weight", product.weight],
                  ["Dimensions", product.dimensions],
                  ["Metal Purity", product.purity],
                  ["Diamond Clarity / Color", product.clarity],
                  ["Certification", "IGI Certified (0.30 ct and above)"],
                ].map(([k, v]) => (
                  <tr key={k}>
                    <td className="py-2.5 pr-6 font-medium">{k}</td>
                    <td className="py-2.5 text-muted-foreground">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {tab === "reviews" && (
            <div className="max-w-xl">
              {product.reviews === 0 && (
                <p className="mb-6 text-sm text-muted-foreground">
                  There are no reviews yet. Be the first to review "{product.name}".
                </p>
              )}
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you! Your review has been submitted for moderation.");
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required placeholder="Name *" className="rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold" />
                  <input required type="email" placeholder="Email *" className="rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold" />
                </div>
                <RatingPicker />
                <textarea required placeholder="Your review *" rows={4} className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold" />
                <button type="submit" className="btn-primary">Submit Review</button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      <div className="mt-10">
        <SectionHeading title="You May Also Like" />
        <ProductCarousel items={related} />
      </div>

      {/* Price breakup modal */}
      <Modal open={breakupOpen} onClose={() => setBreakupOpen(false)} maxWidth="max-w-md">
        <h2 className="font-display text-xl font-semibold">Price Breakup</h2>
        <table className="mt-5 w-full text-sm">
          <tbody className="divide-y divide-border">
            <tr>
              <td className="py-3">Diamond Cost</td>
              <td className="py-3 text-right font-medium">{formatINR(breakup.diamond)}</td>
            </tr>
            <tr>
              <td className="py-3">Metal Cost</td>
              <td className="py-3 text-right font-medium">{formatINR(breakup.metal)}</td>
            </tr>
            <tr>
              <td className="py-3">Making Charges</td>
              <td className="py-3 text-right font-medium">{formatINR(breakup.making)}</td>
            </tr>
            <tr className="text-primary">
              <td className="py-3 font-semibold">Total Amount</td>
              <td className="py-3 text-right font-semibold">{formatINR(breakup.total)}</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-3 text-xs text-muted-foreground">
          Indicative breakup for the base variant. Final pricing depends on the
          carat and metal you select.
        </p>
      </Modal>
    </div>
  );
}

function RatingPicker() {
  const [r, setR] = useState(5);
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">Your rating:</span>
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          aria-label={`${i} stars`}
          onClick={() => setR(i)}
          className={i <= r ? "text-gold" : "text-border"}
        >
          ★
        </button>
      ))}
    </div>
  );
}
