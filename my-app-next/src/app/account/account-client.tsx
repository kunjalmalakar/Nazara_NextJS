"use client";

import { useState } from "react";
import { useShop } from "@/lib/store";
import { PageBanner } from "@/components/Breadcrumb";

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold";

export default function AccountClient() {
  const { loggedIn, setLoggedIn } = useShop();
  const [tab, setTab] = useState<"login" | "register">("login");

  return (
    <>
      <PageBanner title="My Account" crumbs={[{ label: "My Account" }]} />
      <div className="container-site max-w-3xl py-14">
        {!loggedIn ? (
          <div className="mx-auto max-w-md rounded-xl border border-border bg-card p-8">
            <div className="mb-6 flex rounded-full bg-secondary p-1">
              {(["login", "register"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 rounded-full py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setLoggedIn(true);
              }}
            >
              {tab === "register" && <input required placeholder="Full name" className={inputCls} />}
              <input required type="email" placeholder="Email address" className={inputCls} />
              <input required type="password" placeholder="Password" className={inputCls} />
              {tab === "login" && (
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input type="checkbox" className="accent-[var(--color-primary)]" />
                  Remember me
                </label>
              )}
              <button type="submit" className="btn-primary w-full">
                {tab === "login" ? "Login" : "Register"}
              </button>
              {tab === "login" && (
                <p className="text-center text-xs text-muted-foreground">
                  <button type="button" className="hover:text-gold">Lost your password?</button>
                </p>
              )}
            </form>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold">Welcome back!</h2>
              <button className="btn-outline !py-2" onClick={() => setLoggedIn(false)}>
                Logout
              </button>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-semibold">Account Details</h3>
              <form className="mt-4 grid gap-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); alert("Details saved!"); }}>
                <input placeholder="Full name" defaultValue="Nazara Customer" className={inputCls} />
                <input placeholder="Email" defaultValue="customer@example.com" className={inputCls} />
                <input placeholder="Phone" className={inputCls} />
                <input placeholder="City" defaultValue="Indore" className={inputCls} />
                <textarea placeholder="Address" rows={3} className={`${inputCls} sm:col-span-2`} />
                <div className="sm:col-span-2">
                  <button type="submit" className="btn-primary">Save Changes</button>
                </div>
              </form>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-semibold">Order History</h3>
              <p className="mt-4 rounded-lg bg-secondary/60 p-6 text-center text-sm text-muted-foreground">
                No orders yet — your future treasures will appear here.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
