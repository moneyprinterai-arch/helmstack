import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/logo";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Create account",
  description: "Spin up your Helmstack deck.",
};

export default async function SignupPage({
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
            <h1 className="text-[26px] font-semibold tracking-tight">Take the helm</h1>
            <p className="mt-1 text-[14px] text-[color:var(--fg-muted)]">Free forever for one agent. No credit card.</p>

            <div className="mt-7">
              <AuthForm mode="signup" next={next} />
            </div>

            <p className="mt-6 text-center text-[13px] text-[color:var(--fg-muted)]">
              Already have an account?{" "}
              <Link href="/login" className="text-[color:var(--brand)] font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
