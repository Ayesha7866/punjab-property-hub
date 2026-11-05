"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Field, fieldControlClass } from "@/components/ui/field";
import { StatusBanner } from "@/components/forms/status-banner";
import { cn } from "@/lib/cn";
import { registerAction, type FormState } from "./actions";

const initial: FormState = { status: "idle", message: "" };

const roles = [
  {
    value: "owner",
    title: "Seller / property owner",
    hint: "I want to list my house, plot, or shop.",
  },
  {
    value: "dealer",
    title: "Dealer / agent",
    hint: "I list property for clients.",
  },
  {
    value: "buyer",
    title: "Buyer / tenant",
    hint: "I only want to search and save listings.",
  },
] as const;

export function RegisterForm() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const defaultRole =
    roleParam === "owner" || roleParam === "dealer" || roleParam === "buyer"
      ? roleParam
      : "owner";
  const [state, formAction, pending] = useActionState(registerAction, initial);

  return (
    <form action={formAction} className="space-y-4">
      {state.status === "error" ? (
        <StatusBanner status="error" message={state.message} />
      ) : null}
      <fieldset className="space-y-2">
        <legend className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
          I am a
        </legend>
        {roles.map((role) => (
          <label
            key={role.value}
            className={cn(
              "flex cursor-pointer gap-3 rounded-lg border border-brand/15 bg-white p-3",
            )}
          >
            <input
              type="radio"
              name="role"
              value={role.value}
              defaultChecked={defaultRole === role.value}
              className="mt-1"
            />
            <span>
              <span className="block font-semibold text-brand">{role.title}</span>
              <span className="block text-sm text-ink-muted">{role.hint}</span>
            </span>
          </label>
        ))}
      </fieldset>
      <Field label="Full name" name="name">
        <input id="name" name="name" required className={fieldControlClass} autoComplete="name" />
        {state.fieldErrors?.name ? (
          <span className="mt-1 block text-xs text-red-700">{state.fieldErrors.name[0]}</span>
        ) : null}
      </Field>
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
      <Field label="Mobile number" name="phone" hint="03XXXXXXXXX or +923XXXXXXXXX">
        <input
          id="phone"
          name="phone"
          required
          className={fieldControlClass}
          autoComplete="tel"
          inputMode="tel"
        />
        {state.fieldErrors?.phone ? (
          <span className="mt-1 block text-xs text-red-700">{state.fieldErrors.phone[0]}</span>
        ) : null}
      </Field>
      <Field label="Password" name="password">
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={10}
          className={fieldControlClass}
          autoComplete="new-password"
        />
        {state.fieldErrors?.password ? (
          <span className="mt-1 block text-xs text-red-700">{state.fieldErrors.password[0]}</span>
        ) : null}
      </Field>
      <Button type="submit" disabled={pending} className="w-full" variant="gold">
        {pending ? "Saving…" : "Create seller / buyer account"}
      </Button>
    </form>
  );
}
