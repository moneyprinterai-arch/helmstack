import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Helmstack deck.",
};

export default function LoginPage() {
  return (
    <>
      <div className="mesh-bg" aria-hidden />
      <main className="min-h-screen grid place-items-center px-5 py-12">
        <div className="w-full max-w-[420px]">
          <div className="flex justify-center mb-8">
            <Logo />
          </div>
          <div className="card card-lift p-8">
            <h1 className="text-[26px] font-semibold tracking-tight">Welcome back</h1>
            <p className="mt-1 text-[14px] text-[color:var(--fg-muted)]">Sign in to take the helm.</p>

            <form action="/app" className="mt-7 space-y-3">
              <button type="button" className="btn btn-secondary w-full h-11">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M21.6 12.227c0-.709-.063-1.39-.182-2.045H12v3.868h5.382a4.605 4.605 0 01-1.995 3.018v2.51h3.232c1.891-1.74 2.98-4.305 2.98-7.351z" fill="#4285F4" /><path d="M12 22c2.7 0 4.964-.895 6.619-2.422l-3.232-2.51c-.895.6-2.04.954-3.387.954-2.604 0-4.81-1.76-5.596-4.123H3.064v2.59A9.996 9.996 0 0012 22z" fill="#34A853" /><path d="M6.404 13.899A6.005 6.005 0 016.086 12c0-.659.114-1.299.318-1.899V7.51H3.064A9.996 9.996 0 002 12c0 1.614.386 3.14 1.064 4.49l3.34-2.591z" fill="#FBBC05" /><path d="M12 5.977c1.468 0 2.785.504 3.823 1.495l2.868-2.867C16.96 3.022 14.696 2 12 2A9.996 9.996 0 003.064 7.51l3.34 2.59C7.19 7.74 9.396 5.978 12 5.978z" fill="#EA4335" /></svg>
                Continue with Google
              </button>
              <button type="button" className="btn btn-secondary w-full h-11">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.02c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.45.11-3.02 0 0 .97-.31 3.17 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.62 1.57.23 2.73.11 3.02.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.26 5.69.41.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" /></svg>
                Continue with GitHub
              </button>

              <div className="flex items-center gap-3 my-4">
                <div className="h-px flex-1 bg-[color:var(--border)]" />
                <span className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--fg-subtle)]">or</span>
                <div className="h-px flex-1 bg-[color:var(--border)]" />
              </div>

              <label className="block">
                <span className="text-[12px] text-[color:var(--fg-muted)]">Email</span>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="mt-1.5 block w-full h-11 px-3.5 rounded-lg border border-[color:var(--border-strong)] bg-[color:var(--surface)] text-[14px] outline-none focus:border-[color:var(--brand)] focus:ring-4 focus:ring-[color:var(--brand-ring)]"
                />
              </label>
              <label className="block">
                <span className="text-[12px] text-[color:var(--fg-muted)]">Password</span>
                <input
                  type="password"
                  required
                  className="mt-1.5 block w-full h-11 px-3.5 rounded-lg border border-[color:var(--border-strong)] bg-[color:var(--surface)] text-[14px] outline-none focus:border-[color:var(--brand)] focus:ring-4 focus:ring-[color:var(--brand-ring)]"
                />
              </label>
              <button type="submit" className="btn btn-primary w-full h-11">
                Sign in
              </button>
            </form>

            <p className="mt-6 text-center text-[13px] text-[color:var(--fg-muted)]">
              New here?{" "}
              <Link href="/signup" className="text-[color:var(--brand)] font-medium hover:underline">
                Create an account
              </Link>
            </p>
          </div>

          <p className="mt-6 text-center text-[11px] text-[color:var(--fg-subtle)]">
            By continuing you agree to our <Link href="/legal/terms" className="underline-offset-2 hover:underline">Terms</Link> and <Link href="/legal/privacy" className="underline-offset-2 hover:underline">Privacy</Link>.
          </p>
        </div>
      </main>
    </>
  );
}
