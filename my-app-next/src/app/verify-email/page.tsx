"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Loader2, Mail } from "lucide-react";
import { apiVerifyEmail, apiResendVerification, ApiError } from "@/lib/api";
import { useShop } from "@/lib/store";
import { PageBanner } from "@/components/Breadcrumb";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const { setLoginOpen } = useShop();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>("");
  const [resendEmail, setResendEmail] = useState("");
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token found in URL.");
      return;
    }

    let isMounted = true;
    const verify = async () => {
      try {
        const res = await apiVerifyEmail(token);
        if (isMounted) {
          setStatus("success");
          setMessage(res.message || "Email verified successfully!");
        }
      } catch (err) {
        if (isMounted) {
          setStatus("error");
          if (err instanceof ApiError) {
            setMessage(err.message);
          } else if (err instanceof Error) {
            setMessage(err.message);
          } else {
            setMessage("Verification failed. The link may be invalid or expired.");
          }
        }
      }
    };

    void verify();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resendEmail) return;
    setResending(true);
    setResendMessage(null);
    try {
      const res = await apiResendVerification(resendEmail);
      setResendMessage(res.message || "If an unverified account exists, a link has been sent.");
    } catch {
      setResendMessage("Failed to send verification link. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="container-site max-w-md py-16 text-center">
      {status === "loading" && (
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <Loader2 size={40} className="animate-spin text-primary" />
          <h2 className="font-display text-2xl font-semibold">Verifying Your Email...</h2>
          <p className="text-sm text-muted-foreground">Please wait while we validate your verification token.</p>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col items-center justify-center gap-4 py-12 rounded-lg border border-border bg-card p-8 shadow-sm">
          <CheckCircle2 size={56} className="text-emerald-500" />
          <h2 className="font-display text-3xl font-semibold text-foreground">Email Verified!</h2>
          <p className="text-sm text-muted-foreground">{message}</p>
          <button
            onClick={() => {
              router.push("/");
              setLoginOpen(true);
            }}
            className="btn-primary mt-4 w-full"
          >
            Log In Now
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center justify-center gap-4 py-12 rounded-lg border border-destructive/20 bg-card p-8 shadow-sm">
          <XCircle size={56} className="text-destructive" />
          <h2 className="font-display text-3xl font-semibold text-foreground">Verification Failed</h2>
          <p className="text-sm text-destructive font-medium">{message}</p>

          <div className="w-full mt-6 pt-6 border-t border-border text-left">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
              <Mail size={14} /> Request New Link
            </h3>
            <form onSubmit={handleResend} className="flex flex-col gap-3">
              <input
                required
                type="email"
                placeholder="Enter your email"
                value={resendEmail}
                onChange={(e) => setResendEmail(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-gold"
              />
              <button
                type="submit"
                disabled={resending}
                className="btn-outline w-full text-xs py-2 disabled:opacity-50"
              >
                {resending ? "Sending..." : "Resend Verification Link"}
              </button>
            </form>

            {resendMessage && (
              <p className="mt-3 text-xs text-emerald-600 bg-emerald-50 p-2.5 rounded border border-emerald-200">
                {resendMessage}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <>
      <PageBanner title="Email Verification" crumbs={[{ label: "Verify Email" }]} />
      <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Loading page...</div>}>
        <VerifyEmailContent />
      </Suspense>
    </>
  );
}
