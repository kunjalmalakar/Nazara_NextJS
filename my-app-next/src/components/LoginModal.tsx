"use client";

import { useState } from "react";
import { useShop } from "@/lib/store";
import { Modal } from "./Modal";
import { ApiError, apiResendVerification } from "@/lib/api";

export function LoginModal() {
  const { loginOpen, setLoginOpen, login, register } = useShop();
  const [mode, setMode] = useState<"login" | "register">("login");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUnverified, setIsUnverified] = useState(false);
  const [registeredMessage, setRegisteredMessage] = useState<string | null>(null);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  const handleClose = () => {
    setError(null);
    setIsUnverified(false);
    setRegisteredMessage(null);
    setResendMessage(null);
    setLoading(false);
    setResending(false);
    setLoginOpen(false);
  };

  const handleResend = async () => {
    if (!email) return;
    setResending(true);
    setResendMessage(null);
    try {
      const res = await apiResendVerification(email);
      setResendMessage(res.message || "Verification link sent! Check your inbox.");
    } catch (err) {
      setResendMessage("Failed to send verification link. Please try again.");
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsUnverified(false);
    setRegisteredMessage(null);
    setResendMessage(null);
    setLoading(true);

    try {
      if (mode === "login") {
        await login(email, password, rememberMe);
        handleClose();
      } else {
        const res = await register(fullName, email, password);
        setRegisteredMessage(
          res.message || "Account created! Please check your email to verify your account before logging in.",
        );
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        if (err.statusCode === 403 || err.message.toLowerCase().includes("verify")) {
          setIsUnverified(true);
        }
      } else if (err instanceof Error) {
        setError(err.message);
        if (err.message.toLowerCase().includes("verify")) {
          setIsUnverified(true);
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={loginOpen} onClose={handleClose} maxWidth="max-w-md">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-semibold">
          {registeredMessage ? "Verify Email" : mode === "login" ? "Login" : "Create Account"}
        </h2>
        {!registeredMessage && (
          <button
            type="button"
            onClick={() => {
              setError(null);
              setIsUnverified(false);
              setResendMessage(null);
              setMode(mode === "login" ? "register" : "login");
            }}
            className="text-xs font-medium text-gold hover:underline"
          >
            {mode === "login" ? "Need an account? Sign up" : "Already registered? Login"}
          </button>
        )}
      </div>

      {/* Registration Success View */}
      {registeredMessage ? (
        <div className="mt-5 space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            ✉️
          </div>
          <p className="text-sm text-foreground/90 font-medium">{registeredMessage}</p>
          <p className="text-xs text-muted-foreground">
            We sent a verification link to <span className="font-semibold text-foreground">{email}</span>. Click the link in the email to activate your account.
          </p>
          <button
            type="button"
            onClick={() => {
              setRegisteredMessage(null);
              setMode("login");
            }}
            className="btn-primary w-full mt-2"
          >
            Go to Login
          </button>
        </div>
      ) : (
        <>
          {error && (
            <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-xs font-medium text-destructive">
              <p>{error}</p>
              {isUnverified && (
                <div className="mt-2 pt-2 border-t border-destructive/20 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resending}
                    className="text-xs font-semibold text-primary underline hover:text-gold text-left disabled:opacity-50"
                  >
                    {resending ? "Sending link..." : "Resend Verification Email"}
                  </button>
                </div>
              )}
            </div>
          )}

          {resendMessage && (
            <div className="mt-4 rounded-md border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-medium text-emerald-700">
              {resendMessage}
            </div>
          )}

          <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
            {mode === "register" && (
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Priyanshi Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold"
                />
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Email address
              </label>
              <input
                required
                type="email"
                placeholder="you@example.com"
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
                placeholder="Min 8 chars, 1 uppercase & 1 number"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold"
              />
            </div>

            {mode === "login" && (
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[var(--color-primary)]"
                />
                Remember me
              </label>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Processing...
                </span>
              ) : mode === "login" ? (
                "Login"
              ) : (
                "Create Account"
              )}
            </button>

            <div className="flex items-center justify-between text-xs pt-2">
              {mode === "login" ? (
                <>
                  <span className="text-muted-foreground">Forgot password functionality coming soon</span>
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      setIsUnverified(false);
                      setResendMessage(null);
                      setMode("register");
                    }}
                    className="font-semibold text-primary hover:text-gold"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setIsUnverified(false);
                    setResendMessage(null);
                    setMode("login");
                  }}
                  className="font-semibold text-primary hover:text-gold"
                >
                  Back to Login
                </button>
              )}
            </div>
          </form>
        </>
      )}
    </Modal>
  );
}
