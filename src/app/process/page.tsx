import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { process } from "@/content/site";
import {
  Arrow,
  ButtonLink,
  Container,
  ImagePlaceholder,
  Section,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "How we work",
  description:
    "From enquiry and costing through sampling, production, inspection and export documentation — the full GoSourceIndia process with committed turnarounds.",
  robots: {
    index: false,
    follow: false,
  },
};

const commitments = [
  {
    title: "You hear about problems early",
    body: "Delays happen in manufacturing. What is not acceptable is finding out about them at the shipping date. If a date is going to move, you hear it from us the week we know.",
  },
  {
    title: "Sampling revisions are included",
    body: "We do not charge you per revision to get the fit right. A sample that is nearly right is worth nothing to either of us.",
  },
  {
    title: "One person owns your account",
    body: "Not a shared inbox. You know who is accountable for your programme and you can reach them.",
  },
];

export default function ProcessPage() {
  notFound();

  return (
    <>
      <div className="border-b border-line-soft">
        <Container>
          <div className="max-w-3xl py-20 sm:py-24">
            <p className="eyebrow">How we work</p>
            <h1 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Five stages, each with a date you can hold us to.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              Sourcing goes wrong in the gaps between stages — the week nobody
              was quite sure whose turn it was. This is how we close those gaps.
            </p>
          </div>
        </Container>
      </div>

      {/* ── Stages ───────────────────────────────────────────────────────── */}
      <Section>
        <div className="space-y-px overflow-hidden rounded-xl border border-line bg-line">
          {process.map((step) => (
            <div
              key={step.step}
              className="grid gap-6 bg-bone p-8 sm:p-10 lg:grid-cols-12 lg:gap-10"
            >
              <div className="lg:col-span-3">
                <span className="font-display text-3xl text-clay">
                  {step.step}
                </span>
                <h2 className="mt-3 font-display text-xl text-ink">
                  {step.title}
                </h2>
              </div>
              <div className="lg:col-span-6">
                <p className="leading-relaxed text-ink-soft">{step.body}</p>
              </div>
              <div className="lg:col-span-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                  Turnaround
                </p>
                <p className="mt-2 font-medium text-ink">{step.turnaround}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Commitments ──────────────────────────────────────────────────── */}
      <div className="border-y border-line-soft bg-indigo-deep">
        <Container>
          <div className="grid gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-clay">
                What we commit to
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-bone sm:text-4xl">
                Three promises we would rather be judged on than a brochure.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <dl className="space-y-8">
                {commitments.map((item) => (
                  <div
                    key={item.title}
                    className="border-b border-bone/15 pb-8 last:border-0 last:pb-0"
                  >
                    <dt className="font-display text-lg text-bone">
                      {item.title}
                    </dt>
                    <dd className="mt-2 leading-relaxed text-bone/70">
                      {item.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Visual ───────────────────────────────────────────────────────── */}
      <Section>
        <SectionHeading
          eyebrow="On the floor"
          title="We would rather show you than tell you"
          lead="Replace these with photographs taken at the factories you work in, as soon as you have them. Real images from the floor do more for a first-time buyer than any amount of copy."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          <ImagePlaceholder label="Cutting room" />
          <ImagePlaceholder label="Sewing line" />
          <ImagePlaceholder label="Final inspection table" />
        </div>
      </Section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <div className="border-t border-line-soft bg-bone-deep">
        <Container>
          <div className="py-16 text-center">
            <h2 className="mx-auto max-w-xl font-display text-2xl leading-tight text-ink sm:text-3xl">
              Start at stage one.
            </h2>
            <div className="mt-8">
              <ButtonLink href="/enquiry">
                Request a quote
                <Arrow />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
