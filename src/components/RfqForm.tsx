"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { categories } from "@/content/site";
import { Arrow } from "@/components/ui";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-line bg-white/60 px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-indigo-deep focus:outline-none focus:ring-1 focus:ring-indigo-deep";

const labelClass = "block text-sm font-medium text-ink";

function Field({
  label,
  children,
  required,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className={labelClass}>
        {label}
        {required && <span className="ml-1 text-clay">*</span>}
      </span>
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
      <div className="mt-2">{children}</div>
    </label>
  );
}

export function RfqForm() {
  const searchParams = useSearchParams();
  const presetCategory = searchParams.get("category") ?? "";

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-line bg-white/60 p-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-light">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-indigo-deep">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="mt-5 font-display text-2xl text-ink">
          Enquiry received.
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-soft">
          We&apos;ll review the product, see where it can be made well, and come
          back with a practical next step. If you have a tech pack, artwork or
          reference photographs, reply to our confirmation email with them
          attached.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot — bots fill this, humans never see it */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label>
          Company website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" required>
          <input name="name" type="text" required className={inputClass} />
        </Field>
        <Field label="Company" required>
          <input name="company" type="text" required className={inputClass} />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Work email" required>
          <input name="email" type="email" required className={inputClass} />
        </Field>
        <Field label="Country" required>
          <input name="country" type="text" required className={inputClass} />
        </Field>
      </div>

      <Field label="Phone / WhatsApp" hint="Optional, but it speeds things up.">
        <input name="phone" type="tel" className={inputClass} />
      </Field>

      <Field label="Category" required>
        <select
          name="category"
          required
          defaultValue={presetCategory}
          className={inputClass}
        >
          <option value="">Select a category</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
          <option value="other">Something else / not sure</option>
        </select>
      </Field>

      <Field
        label="What do you need made?"
        required
        hint="Product type, construction, fabric, size, colours — as much detail as you have. A reference link is fine."
      >
        <textarea
          name="product"
          required
          rows={5}
          className={inputClass}
          placeholder="e.g. 200 GSM washed cotton duvet cover sets, stonewashed, 4 colourways, EU sizing…"
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-3">
        <Field label="Target quantity" hint="Per style or design">
          <input
            name="quantity"
            type="text"
            className={inputClass}
            placeholder="e.g. 1,500 pcs"
          />
        </Field>
        <Field label="Target price" hint="FOB, per unit">
          <input
            name="targetPrice"
            type="text"
            className={inputClass}
            placeholder="e.g. $12.00"
          />
        </Field>
        <Field label="Required delivery" hint="Approximate is fine">
          <input
            name="deliveryDate"
            type="text"
            className={inputClass}
            placeholder="e.g. March 2027"
          />
        </Field>
      </div>

      <Field label="Anything else we should know?">
        <textarea name="notes" rows={3} className={inputClass} />
      </Field>

      {error && (
        <p className="rounded-lg border border-clay/30 bg-clay/5 px-4 py-3 text-sm text-clay">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-deep px-7 py-3.5 text-sm font-medium text-bone transition-colors hover:bg-indigo disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send enquiry"}
          {status !== "submitting" && <Arrow />}
        </button>
        <p className="text-xs text-muted">
          We reply to every enquiry. We never share your details or your designs.
        </p>
      </div>
    </form>
  );
}
