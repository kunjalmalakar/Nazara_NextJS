"use client";

import { useState } from "react";
import { useShop } from "@/lib/store";
import { Modal } from "./Modal";

export function LoginModal() {
  const { loginOpen, setLoginOpen, setLoggedIn } = useShop();
  const [email, setEmail] = useState("");

  return (
    <Modal open={loginOpen} onClose={() => setLoginOpen(false)} maxWidth="max-w-md">
      <h2 className="font-display text-2xl font-semibold">Login</h2>
      <form
        className="mt-5 flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          setLoggedIn(true);
          setLoginOpen(false);
        }}
      >
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Username or email
          </label>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Password
          </label>
          <input
            required
            type="password"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" className="accent-[var(--color-primary)]" />
          Remember me
        </label>
        <button type="submit" className="btn-primary w-full">
          Login
        </button>
        <div className="flex items-center justify-between text-xs">
          <button type="button" className="text-muted-foreground hover:text-gold">
            Lost your password?
          </button>
          <button type="button" className="font-semibold text-primary hover:text-gold">
            Sign up
          </button>
        </div>
      </form>
    </Modal>
  );
}
