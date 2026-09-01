import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, certifications, tradeTerms } from "@/content/site";
import {
  Arrow,
  ButtonLink,
  Check,
  Container,
  Section,
  SectionHeading,
  SpecList,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Quality control, compliance, certifications, export documentation and trade terms for sourcing home textiles, floor coverings, apparel and handicrafts from India.",
  robots: {
    index: false,
    follow: false,
  },
};

const qualityStages = [
  {
    title: "Raw material inspection",
    body: "Fabric inspected to the 4-point system before cutting. Yarn and trims checked against approved swatches. Rejects are caught before they become garments.",
  },
  {
    title: "In-line inspection",
    body: "Checks at cutting, sewing and finishing while the run is still correctable. Measurement audits against the approved spec sheet at each stage.",
  },
  {
    title: "Final random inspection",
    body: "Pre-shipment inspection to AQL 2.5 or 4.0 as agreed. Full measurement, workmanship, packing and labelling audit before the container is sealed.",
  },
  {
    title: "Third-party verification",
    body: "We coordinate SGS, Bureau Veritas or Intertek where your programme requires it, and we book it into the timeline rather than bolting it on at the end.",
  },
];

export default function CapabilitiesPage() {
  notFound();

  const allCompliance = Array.from(
    new Set(categories.flatMap((c) => c.compliance)),
  ).sort();

  return (
    <>
      <div className="border-b border-line-soft">
        <Container>
          <div className="max-w-3xl py-20 sm:py-24">
            <p className="eyebrow">Capabilities</p>
            <h1 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl">
              The unglamorous parts, which are the parts that matter.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              Anyone can send you a photograph of a nice rug. What decides
              whether a season goes well is inspection discipline, audit
              coverage and whether your documents are correct when the container
              reaches the port. Here is how we handle all three.
            </p>
          </div>
        </Container>
      </div>

      {/* ── Quality control ──────────────────────────────────────────────── */}
      <Section>
        <SectionHeading
          eyebrow="Quality control"
          title="Four inspection points, not one at the end"
          lead="A final inspection that fails is an expensive way to find out something went wrong six weeks ago. We inspect while problems are still cheap to fix."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {qualityStages.map((stage, i) => (
            <div key={stage.title} className="bg-bone p-7">
              <span className="font-display text-2xl text-clay">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-medium text-ink">{stage.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {stage.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Compliance ───────────────────────────────────────────────────── */}
      <div className="border-y border-line-soft bg-bone-deep">
        <Container>
          <div className="grid gap-14 py-20 sm:py-24 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Certifications"
                title="Only what we can evidence"
                lead="Every certification listed here can be backed with a valid scope certificate on request. If a programme needs a certification we do not hold, we will tell you what it costs and how long it takes to get."
              />
            </div>

            <div className="lg:col-span-7">
              <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
                {certifications.map((cert) => (
                  <li key={cert.name} className="bg-bone p-5">
                    <h3 className="text-sm font-medium text-ink">{cert.name}</h3>
                    <p className="mt-1 text-sm text-muted">{cert.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Product compliance by market ─────────────────────────────────── */}
      <Section>
        <SectionHeading
          eyebrow="Product compliance"
          title="Standards we test and document against"
          lead="Compliance requirements differ sharply by category — toys in particular sit under a regime that has nothing in common with textiles. We quote testing into the timeline and the price from the start."
        />

        <ul className="mt-12 flex flex-wrap gap-3">
          {allCompliance.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 rounded-full border border-line bg-white/50 px-4 py-2 text-sm text-ink-soft"
            >
              <Check className="text-clay" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Trade terms ──────────────────────────────────────────────────── */}
      <div className="border-y border-line-soft bg-bone-deep">
        <Container>
          <div className="grid gap-14 py-20 sm:py-24 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Trade terms"
                title="Shipping and documentation"
                lead="A complete, correct document set on the day the container sails. Errors here cost you demurrage, not just time."
              />
            </div>

            <div className="lg:col-span-7">
              <SpecList
                items={[
                  { label: "Incoterms", value: tradeTerms.incoterms.join(" · ") },
                  { label: "Ports of loading", value: tradeTerms.ports.join(" · ") },
                  { label: "Payment terms", value: tradeTerms.paymentTerms.join(" · ") },
                  { label: "Currencies", value: tradeTerms.currencies.join(" · ") },
                  {
                    label: "Documentation",
                    value:
                      "Commercial invoice · Packing list · Bill of lading · Certificate of origin · Inspection certificate · Test reports",
                  },
                  {
                    label: "Shipping modes",
                    value: "FCL · LCL consolidation · Air freight for samples and urgent top-ups",
                  },
                ]}
              />
            </div>
          </div>
        </Container>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <Section>
        <div className="rounded-2xl border border-line bg-white/50 px-8 py-14 text-center sm:px-16">
          <h2 className="mx-auto max-w-xl font-display text-2xl leading-tight text-ink sm:text-3xl">
            Have a compliance requirement you are not sure we can meet?
          </h2>
          <p className="mx-auto mt-4 max-w-lg leading-relaxed text-ink-soft">
            Ask before you shortlist. We would rather tell you no early than
            discover it at pre-production.
          </p>
          <div className="mt-8">
            <ButtonLink href="/enquiry">
              Talk to us
              <Arrow />
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
