"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatINR, products } from "@/lib/products";
import { Modal } from "./Modal";
import galleryImg from "@/assets/gallery-3.jpg";

export function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [dontShow, setDontShow] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const t = setTimeout(() => setOpen(true), 12000);
    return () => clearTimeout(t);
  }, [dismissed]);

  const close = () => {
    setOpen(false);
    if (dontShow) setDismissed(true);
    else setDismissed(true); // one-time per session
  };

  const recommended = products.filter((p) => p.topSelling).slice(0, 3);

  return (
    <Modal open={open} onClose={close} maxWidth="max-w-2xl">
      <div className="grid gap-6 sm:grid-cols-[200px_1fr]">
        <Image
          src={galleryImg}
          alt="Diamond ring in a gift box"
          width={700}
          height={700}
          loading="lazy"
          className="hidden h-full w-full rounded-lg object-cover sm:block"
        />
        <div>
          <h2 className="font-display text-2xl font-semibold">
            Wait! Before you leave…
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enjoy <strong className="text-primary">20% off</strong> your first
            order with code <span className="font-semibold text-gold">NAZARA20</span>.
            Handcrafted lab-grown diamond jewellery, delivered free and insured.
          </p>
          <button className="btn-gold mt-4" onClick={close}>
            Get Discount
          </button>
          <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Recommended Products
          </p>
          <div className="mt-2 grid grid-cols-3 gap-3">
            {recommended.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                onClick={close}
                className="text-center"
              >
                <img src={p.image} alt={p.name} width={900} height={900} loading="lazy" className="aspect-square w-full rounded object-cover" />
                <p className="mt-1 truncate text-[11px]">{p.name}</p>
                <p className="text-[11px] font-semibold text-primary">{formatINR(p.price)}</p>
              </Link>
            ))}
          </div>
          <label className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={dontShow}
              onChange={(e) => setDontShow(e.target.checked)}
              className="accent-[var(--color-primary)]"
            />
            Don't show this popup again
          </label>
        </div>
      </div>
    </Modal>
  );
}
