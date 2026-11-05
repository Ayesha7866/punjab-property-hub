"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Field, fieldControlClass } from "@/components/ui/field";
import { StatusBanner } from "@/components/forms/status-banner";
import { loginAction, type FormState } from "./actions";

const initial: FormState = { status: "idle", message: "" };

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction, pending] = useActionState(loginAction, initial);

  return (
    <form action={formAction} className="space-y-4">
      {next ? <input type="hidden" name="next" value={next} /> : null}
      {state.status === "error" ? (
        <StatusBanner status="error" message={state.message} />
      ) : null}
      <Field label="Email" name="email">
        <input
          id="email"
          name="email"
          type="email"
          required
          className={fieldControlClass}
          autoComplete="email"
        />
        {state.fieldErrors?.email ? (
          <span className="mt-1 block text-xs text-red-700">{state.fieldErrors.email[0]}</span>
        ) : null}
      </Field>
      <Field label="Password" name="password">
        <input
          id="password"
          name="password"
          type="password"
          required
          className={fieldControlClass}
          autoComplete="current-password"
        />
        {state.fieldErrors?.password ? (
          <span className="mt-1 block text-xs text-red-700">{state.fieldErrors.password[0]}</span>
        ) : null}
      </Field>
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Checking…" : "Sign in"}
      </Button>
      <p className="text-center text-sm text-ink-muted">
        <Link href="/forgot-password" className="text-brand underline-offset-2 hover:underline">
          Forgot password
        </Link>
      </p>
    </form>
  );
}
