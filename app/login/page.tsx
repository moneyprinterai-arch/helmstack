import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/logo";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Helmstack deck.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
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

            <div className="mt-7">
              <AuthForm mode="signin" next={next} />
            </div>

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
