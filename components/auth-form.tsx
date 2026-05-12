"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signIn, signUp, type AuthState } from "@/app/auth/actions";

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-[0_4px_14px_rgba(0,0,0,0.10)] transition-colors hover:bg-zinc-700 disabled:opacity-70"
    >
      {pending ? (
        <>
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
            <path d="M22 12a10 10 0 01-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          One moment…
        </>
      ) : (
        label
      )}
    </button>
  );
}

export function AuthForm({ mode, next }: { mode: "signin" | "signup"; next?: string }) {
  const action = mode === "signup" ? signUp : signIn;
  const [state, formAction] = useActionState<AuthState, FormData>(action, undefined);

  return (
    <form action={formAction} className="space-y-3">
      {next && <input type="hidden" name="next" value={next} />}
      <label className="block">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Work email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className="mt-1.5 block w-full rounded-2xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-400"
        />
      </label>
      <label className="block">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Password</span>
        <input
          name="password"
          type="password"
          required
          minLength={mode === "signup" ? 8 : undefined}
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          className="mt-1.5 block w-full rounded-2xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-zinc-400"
        />
      </label>
      {state?.error && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {state.error}
        </p>
      )}
      <div className="pt-1">
        <Submit label={mode === "signup" ? "Create account" : "Sign in"} />
      </div>
    </form>
  );
}
