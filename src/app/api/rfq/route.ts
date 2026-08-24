import { NextResponse } from "next/server";
import { contact, getCategory } from "@/content/site";

/**
 * RFQ submission handler.
 *
 * Delivery is pluggable so you can go live before picking a CRM:
 *   1. If RESEND_API_KEY is set, the enquiry is emailed to contact.rfqInbox.
 *   2. Otherwise it is logged to the server console so nothing is lost in dev.
 *
 * ⚠️ SET RESEND_API_KEY BEFORE YOU SEND YOUR FIRST COLD EMAIL. Without it,
 *    enquiries land in serverless logs you are not watching, and a missed RFQ
 *    from a real buyer is the most expensive bug this site can have.
 *
 * See README.md → "Wiring up enquiries".
 */

type RfqPayload = {
  name?: string;
  company?: string;
  email?: string;
  country?: string;
  phone?: string;
  category?: string;
  product?: string;
  quantity?: string;
  targetPrice?: string;
  deliveryDate?: string;
  notes?: string;
  /** Honeypot field — must be empty. */
  website?: string;
};

const REQUIRED_FIELDS = [
  "name",
  "company",
  "email",
  "country",
  "category",
  "product",
] as const;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function formatEnquiry(payload: RfqPayload) {
  const category = payload.category
    ? (getCategory(payload.category)?.name ?? payload.category)
    : "—";

  const rows: [string, string][] = [
    ["Name", payload.name ?? "—"],
    ["Company", payload.company ?? "—"],
    ["Email", payload.email ?? "—"],
    ["Country", payload.country ?? "—"],
    ["Phone", payload.phone || "—"],
    ["Category", category],
    ["Product", payload.product ?? "—"],
    ["Quantity", payload.quantity || "—"],
    ["Target price", payload.targetPrice || "—"],
    ["Delivery", payload.deliveryDate || "—"],
    ["Notes", payload.notes || "—"],
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table cellpadding="6" style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="color:#6b7280;vertical-align:top"><strong>${k}</strong></td><td>${v
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("")}</table>`;

  return { text, html };
}

export async function POST(request: Request) {
  let payload: RfqPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: silently accept so bots do not learn they were caught.
  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const missing = REQUIRED_FIELDS.filter((field) => !payload[field]?.trim());
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Please complete: ${missing.join(", ")}.` },
      { status: 400 },
    );
  }

  if (!isValidEmail(payload.email!.trim())) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const { text, html } = formatEnquiry(payload);
  const subject = `RFQ — ${payload.company} (${payload.country})`;

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      "\n[RFQ] ⚠️  RESEND_API_KEY is not set — enquiry was NOT emailed.\n" +
        "[RFQ] Configure it before going live. Enquiry contents:\n" +
        text +
        "\n",
    );
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RFQ_FROM_EMAIL ?? "enquiries@gosourceindia.com",
        to: [process.env.RFQ_TO_EMAIL ?? contact.rfqInbox],
        reply_to: payload.email,
        subject,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[RFQ] Resend rejected the send:", res.status, body);
      console.error("[RFQ] Enquiry contents (not lost):\n" + text);
      return NextResponse.json(
        { error: "We could not send that. Please email us directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[RFQ] Send failed:", err);
    console.error("[RFQ] Enquiry contents (not lost):\n" + text);
    return NextResponse.json(
      { error: "We could not send that. Please email us directly." },
      { status: 502 },
    );
  }
}
