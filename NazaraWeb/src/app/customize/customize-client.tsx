"use client";

import { PencilRuler, FileCheck, IndianRupee, PackageCheck, Upload } from "lucide-react";
import Image from "next/image";
import { PageBanner } from "@/components/Breadcrumb";
import hero2 from "@/assets/hero-2.jpg";

const steps = [
  { Icon: PencilRuler, title: "Share Your Design", text: "Send us a sketch, photo or idea of the piece you dream of." },
  { Icon: FileCheck, title: "Design Options & CAD Approval", text: "Our designers create CAD renders for you to review and approve." },
  { Icon: IndianRupee, title: "Cost Breakdown", text: "Get a fully transparent breakup of diamond, metal and making charges." },
  { Icon: PackageCheck, title: "Production & Delivery", text: "Artisans craft your piece, hallmark it and ship it fully insured." },
];

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold";

export default function CustomizeClient() {
  return (
    <>
      <PageBanner title="Customize" crumbs={[{ label: "Customize" }]} />

      <section className="relative overflow-hidden">
        <Image src={hero2} alt="Custom solitaire design" width={1920} height={900} loading="lazy" className="h-72 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent" />
        <div className="container-site absolute inset-0 flex flex-col justify-center">
          <h2 className="max-w-md font-display text-4xl font-semibold text-primary-foreground">
            Design Your Own
          </h2>
          <p className="mt-3 max-w-md text-sm text-primary-foreground/90">
            Select the size, carat, cut — or simply choose a design that speaks
            to you. We turn your idea into a certified, handcrafted piece.
          </p>
        </div>
      </section>

      <section className="container-site py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ Icon, title, text }, i) => (
            <div key={title} className="rounded-xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-lg">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-secondary text-gold">
                <Icon size={24} strokeWidth={1.5} />
              </span>
              <p className="mt-3 font-display text-xs text-gold">Step {i + 1}</p>
              <h3 className="mt-1 font-display text-lg font-medium">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-site max-w-2xl pb-20">
        <h2 className="text-center font-display text-3xl font-semibold">
          Tell Us About Your Dream Piece
        </h2>
        <form
          className="mt-8 space-y-4 rounded-xl border border-border bg-card p-8"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Request submitted! Our design team will reach out within 24 hours.");
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input required placeholder="Name *" className={inputCls} />
            <input required type="email" placeholder="Email *" className={inputCls} />
          </div>
          <input placeholder="Phone" className={inputCls} />
          <textarea required rows={5} placeholder="Describe your design — style, stones, metal, occasion… *" className={inputCls} />
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-border py-6 text-sm text-muted-foreground transition-colors hover:border-gold hover:text-gold">
            <Upload size={16} /> Upload reference image (optional)
            <input type="file" className="hidden" />
          </label>
          <button type="submit" className="btn-primary w-full">
            Submit Request
          </button>
        </form>
      </section>
    </>
  );
}
