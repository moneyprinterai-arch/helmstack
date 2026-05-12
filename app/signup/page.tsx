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
    <main className="min-h-screen grid place-items-center px-5 py-12">
      <div className="w-full max-w-[420px]">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <div className="rounded-3xl border border-white/50 bg-white/70 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Take the helm</h1>
          <p className="mt-1 text-sm text-zinc-600">Free forever for one agent. No credit card.</p>

          <div className="mt-7">
            <AuthForm mode="signup" next={next} />
          </div>

          <p className="mt-6 text-center text-xs text-zinc-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-zinc-900 hover:underline underline-offset-2">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
