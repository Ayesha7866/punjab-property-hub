"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Field, fieldControlClass } from "@/components/ui/field";
import { StatusBanner } from "@/components/forms/status-banner";
import { contactAction, type FormState } from "./actions";

const initial: FormState = { status: "idle", message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(contactAction, initial);

  return (
    <form action={formAction} className="space-y-4">
      {state.status !== "idle" ? (
        <StatusBanner status={state.status} message={state.message} />
      ) : null}
      <Field label="Name" name="name">
        <input id="name" name="name" required className={fieldControlClass} />
        {state.fieldErrors?.name ? (
          <span className="mt-1 block text-xs text-red-700">{state.fieldErrors.name[0]}</span>
        ) : null}
      </Field>
      <Field label="Email" name="email">
        <input id="email" name="email" type="email" required className={fieldControlClass} />
        {state.fieldErrors?.email ? (
          <span className="mt-1 block text-xs text-red-700">{state.fieldErrors.email[0]}</span>
        ) : null}
      </Field>
      <Field label="Phone (optional)" name="phone">
        <input id="phone" name="phone" className={fieldControlClass} />
      </Field>
      <Field label="Message" name="message">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${fieldControlClass} h-auto py-2`}
        />
        {state.fieldErrors?.message ? (
          <span className="mt-1 block text-xs text-red-700">{state.fieldErrors.message[0]}</span>
        ) : null}
      </Field>
      <Button type="submit" disabled={pending}>
        {pending ? "Checking…" : "Send message"}
      </Button>
    </form>
  );
}
