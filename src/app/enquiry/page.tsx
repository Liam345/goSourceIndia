import type { Metadata } from "next";
import { Suspense } from "react";
import { contact, process } from "@/content/site";
import { Check, Container } from "@/components/ui";
import { RfqForm } from "@/components/RfqForm";

export const metadata: Metadata = {
  title: "Request a quote",
  description:
    "Send us your product requirement, tech pack, sketch or reference photo. GoSourceIndia will review the product and suggest the practical next sourcing step.",
};

export default function EnquiryPage() {
  const whatsappDigits = contact.whatsapp.replace(/\D/g, "");

  return (
    <Container>
      <div className="grid gap-14 py-20 sm:py-24 lg:grid-cols-12 lg:gap-16">
        {/* ── Form ───────────────────────────────────────────────────────── */}
        <div className="lg:col-span-7">
          <p className="eyebrow">Request a quote</p>
          <h1 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Tell us what you need made.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            A tech pack is ideal, but a sketch, a reference link or a photograph
            of something you like is enough to start. We reply to every enquiry.
          </p>

          <div className="mt-12">
            <Suspense
              fallback={
                <div className="h-96 animate-pulse rounded-xl bg-bone-deep" />
              }
            >
              <RfqForm />
            </Suspense>
          </div>
        </div>

        {/* ── Sidebar ────────────────────────────────────────────────────── */}
        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 lg:space-y-8">
            <div className="rounded-xl border border-line bg-bone-deep p-7">
              <h2 className="font-display text-lg text-ink">
                What happens next
              </h2>
              <ol className="mt-5 space-y-4">
                {process.slice(0, 3).map((step) => (
                  <li key={step.step} className="flex gap-4">
                    <Check className="mt-1 text-clay" />
                    <div>
                      <h3 className="text-sm font-medium text-ink">
                        {step.title}
                        <span className="ml-2 font-normal text-muted">
                          {step.turnaround}
                        </span>
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8 rounded-xl border border-line p-7 lg:mt-0">
              <h2 className="font-display text-lg text-ink">
                Prefer to talk first?
              </h2>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-indigo-deep transition-colors hover:text-clay"
                  >
                    {contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="text-indigo-deep transition-colors hover:text-clay"
                  >
                    {contact.phone}
                  </a>
                </li>
                {whatsappDigits && (
                  <li>
                    <a
                      href={`https://wa.me/${whatsappDigits}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-deep transition-colors hover:text-clay"
                    >
                      WhatsApp
                    </a>
                  </li>
                )}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                We work IST but reply across EU, UK and US hours.
              </p>
            </div>

            <div className="mt-8 rounded-xl border border-line bg-indigo-light p-7 lg:mt-0">
              <h2 className="text-sm font-medium text-indigo-deep">
                Your designs stay yours
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-indigo-deep/75">
                Tech packs and artwork are shared only with the specific factory
                quoting your programme. We will sign your NDA before sampling —
                or send you ours.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
