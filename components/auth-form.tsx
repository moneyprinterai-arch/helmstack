"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signIn, signUp, type AuthState } from "@/app/auth/actions";

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn btn-primary w-full h-11 disabled:opacity-70">
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
        <span className="text-[12px] text-[color:var(--fg-muted)]">Work email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className="mt-1.5 block w-full h-11 px-3.5 rounded-lg border border-[color:var(--border-strong)] bg-[color:var(--surface)] text-[14px] outline-none focus:border-[color:var(--brand)] focus:ring-4 focus:ring-[color:var(--brand-ring)]"
        />
      </label>
      <label className="block">
        <span className="text-[12px] text-[color:var(--fg-muted)]">Password</span>
        <input
          name="password"
          type="password"
          required
          minLength={mode === "signup" ? 8 : undefined}
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          className="mt-1.5 block w-full h-11 px-3.5 rounded-lg border border-[color:var(--border-strong)] bg-[color:var(--surface)] text-[14px] outline-none focus:border-[color:var(--brand)] focus:ring-4 focus:ring-[color:var(--brand-ring)]"
        />
      </label>
      {state?.error && (
        <p className="text-[12.5px] text-[color:var(--danger)] bg-[color:var(--danger)]/10 border border-[color:var(--danger)]/30 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}
      <Submit label={mode === "signup" ? "Create account" : "Sign in"} />
    </form>
  );
}
