"use client";

import { useEffect, useState } from "react";
import { useShop } from "@/lib/store";
import { PageBanner } from "@/components/Breadcrumb";
import { ApiError } from "@/lib/api";

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold";

export default function AccountClient() {
  const { loggedIn, user, login, register, logout, updateProfile, isAuthLoading } = useShop();
  const [tab, setTab] = useState<"login" | "register">("login");

  // Auth Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Profile Details Form State
  const [profileName, setProfileName] = useState("");
  const [profilePhone, setProfilePhone] = useState("");
  const [profileCity, setProfileCity] = useState("Indore");
  const [profileAddress, setProfileAddress] = useState("");

  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setProfileName(user.fullName ?? "");
      setProfilePhone(user.phone ?? "");
      setProfileCity(user.city ?? "Indore");
      setProfileAddress(user.address ?? "");
    }
  }, [user]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (tab === "login") {
        await login(email, password);
      } else {
        await register(fullName, email, password);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError(null);
    setProfileSuccess(null);
    setProfileLoading(true);

    try {
      await updateProfile({
        fullName: profileName,
        phone: profilePhone,
        city: profileCity,
        address: profileAddress,
      });
      setProfileSuccess("Account details saved successfully!");
    } catch (err) {
      if (err instanceof ApiError) {
        setProfileError(err.message);
      } else if (err instanceof Error) {
        setProfileError(err.message);
      } else {
        setProfileError("Failed to update profile details.");
      }
    } finally {
      setProfileLoading(false);
    }
  };

  if (isAuthLoading) {
    return (
      <>
        <PageBanner title="My Account" crumbs={[{ label: "My Account" }]} />
        <div className="container-site max-w-3xl py-14 flex items-center justify-center">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            Loading account details...
          </div>
        </div>
      </>
    );
  }

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
                  onClick={() => {
                    setError(null);
                    setTab(t);
                  }}
                  className={`flex-1 rounded-full py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
                    tab === t
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {error && (
              <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-xs font-medium text-destructive">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleAuthSubmit}>
              {tab === "register" && (
                <input
                  required
                  type="text"
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={inputCls}
                />
              )}
              <input
                required
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
              />
              <input
                required
                type="password"
                placeholder="Password (min 8 chars, 1 upper, 1 num)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputCls}
              />
              {tab === "login" && (
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input type="checkbox" className="accent-[var(--color-primary)]" />
                  Remember me
                </label>
              )}
              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Processing...
                  </span>
                ) : tab === "login" ? (
                  "Login"
                ) : (
                  "Register"
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold">
                Welcome back, {user?.fullName || "Valued Customer"}!
              </h2>
              <button className="btn-outline !py-2" onClick={() => logout()}>
                Logout
              </button>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-semibold">Account Details</h3>

              {profileSuccess && (
                <div className="mt-4 rounded-md border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  {profileSuccess}
                </div>
              )}

              {profileError && (
                <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-xs font-medium text-destructive">
                  {profileError}
                </div>
              )}

              <form className="mt-4 grid gap-4 sm:grid-cols-2" onSubmit={handleProfileSave}>
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground uppercase font-semibold">Full Name</label>
                  <input
                    placeholder="Full name"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground uppercase font-semibold">Email Address</label>
                  <input placeholder="Email" value={user?.email ?? ""} className={inputCls} readOnly disabled />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground uppercase font-semibold">Phone Number</label>
                  <input
                    placeholder="Phone number"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground uppercase font-semibold">City</label>
                  <input
                    placeholder="City"
                    value={profileCity}
                    onChange={(e) => setProfileCity(e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs text-muted-foreground uppercase font-semibold">Address</label>
                  <textarea
                    placeholder="Address"
                    rows={3}
                    value={profileAddress}
                    onChange={(e) => setProfileAddress(e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" disabled={profileLoading} className="btn-primary disabled:opacity-50">
                    {profileLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                        Saving...
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
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
