"use client";

import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { PageBanner } from "@/components/Breadcrumb";

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold";

export default function ContactClient() {
  return (
    <>
      <PageBanner title="Contact Us" crumbs={[{ label: "Contact Us" }]} />
      <div className="container-site grid gap-10 py-14 lg:grid-cols-2">
        <form
          className="space-y-4 rounded-xl border border-border bg-card p-8"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Message sent! We'll get back to you within one business day.");
          }}
        >
          <h2 className="font-display text-2xl font-semibold">Send Us a Message</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input required placeholder="Name *" className={inputCls} />
            <input required type="email" placeholder="Email *" className={inputCls} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input placeholder="Phone" className={inputCls} />
            <input placeholder="Subject" className={inputCls} />
          </div>
          <textarea required rows={6} placeholder="Message *" className={inputCls} />
          <button type="submit" className="btn-primary">Send Message</button>
        </form>

        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-8">
            <h2 className="font-display text-2xl font-semibold">Store Info</h2>
            <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                <span><strong className="text-foreground">Store Address:</strong> 106, Shiv Om Building, MG Road, Indore 452001</span>
              </li>
              <li className="flex gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                <span><strong className="text-foreground">Registered Office:</strong> 402 Vibrent Business Centre, Manoramaganj, Indore, M.P. 452001</span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-gold" />
                <span>+91 99999 99999</span>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-gold" />
                <span>care@nazaradiamonds.com</span>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social link" className="grid h-9 w-9 place-items-center rounded-full border border-border transition-colors hover:border-gold hover:text-gold">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-8">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
              <Clock size={16} className="text-gold" /> Store Hours
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex justify-between"><span>Monday – Saturday</span><span>11:00 AM – 8:30 PM</span></li>
              <li className="flex justify-between"><span>Sunday</span><span>12:00 PM – 6:00 PM</span></li>
            </ul>
          </div>

          <div className="grid h-56 place-items-center rounded-xl border border-dashed border-border bg-secondary/60 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><MapPin size={16} /> Map — MG Road, Indore</span>
          </div>
        </div>
      </div>
    </>
  );
}
