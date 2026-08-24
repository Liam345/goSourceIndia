import type { Metadata } from "next";
import { company, contact, pillarCategories } from "@/content/site";
import {
  Arrow,
  ButtonLink,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "GoSourceIndia is a sourcing partner in India for home textiles, floor coverings and apparel — a vetted factory network with people on the ground in every cluster we work in.",
};

export default function AboutPage() {
  return (
    <>
      <div className="border-b border-line-soft">
        <Container>
          <div className="py-20 sm:py-24">
            <div className="max-w-4xl">
              <p className="eyebrow">About</p>
              <h1 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl">
                A sourcing partner that shows up on the floor.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-soft">
                {company.positioning}
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Story ────────────────────────────────────────────────────────── */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Why we exist" title="Where we came from" />
          </div>

          <div className="lg:col-span-8">
            {/*
              TODO: Replace this with your actual story. The specifics matter far
              more than the polish: years in the trade, the clusters you know
              best, the order that went wrong and taught you something. Buyers
              tell the difference between a real history and generic agency copy
              in about two sentences.

              NOTE: this copy deliberately makes no claim about owning a
              factory. Keep it that way if you rewrite it. See the same note in
              src/content/site.ts.
            */}
            <div className="space-y-6 text-lg leading-relaxed text-ink-soft">
              <p>
                GoSourceIndia was built for buyers who need more than a list of
                factory names. A good order depends on the right cluster, the
                right production unit, clear specifications and steady checking
                while the work is still in progress.
              </p>
              <p>
                We work across soft home, floor coverings and apparel because
                many buyers source these categories together, but usually have
                to manage them through separate suppliers. Our role is to keep
                that sourcing process joined up, practical and accountable.
              </p>
              <p>
                We spend our time in India&apos;s sourcing clusters, building a
                network of verified factories we are comfortable putting in
                front of a buyer. That means checking category fit, export
                readiness and production capability before an order starts, then
                staying close enough to catch issues early.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── How we are different ─────────────────────────────────────────── */}
      <div className="border-y border-line-soft bg-bone-deep">
        <Container>
          <div className="py-20 sm:py-24">
            <SectionHeading
              eyebrow="How we are different"
              title="Not an agent, not a single factory"
              lead="Both models have a flaw. Agents work from an inbox and never see the floor. Single factories can only sell you what they already make. We sit deliberately in between."
            />

            <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
              {[
                {
                  heading: "A sourcing agent",
                  body: "Forwards your tech pack, marks up the reply, and can only pass messages along when something slips.",
                  us: false,
                },
                {
                  heading: "A single factory",
                  body: "Sells you what their machines already make, and quotes you a category they have never run to keep the conversation alive.",
                  us: false,
                },
                {
                  heading: `${company.name}`,
                  body: "Matches each product with the right factory, stays close during production, and remains accountable from brief to shipment.",
                  us: true,
                },
              ].map((item) => (
                <div
                  key={item.heading}
                  className={`p-7 ${item.us ? "bg-indigo-light" : "bg-bone"}`}
                >
                  <h3
                    className={`font-display text-lg ${
                      item.us ? "text-indigo-deep" : "text-ink"
                    }`}
                  >
                    {item.heading}
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      item.us ? "text-indigo-deep/80" : "text-muted"
                    }`}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* ── Verticals ────────────────────────────────────────────────────── */}
      <Section>
        <SectionHeading
          eyebrow="What we cover"
          title="Three verticals, one accountable desk"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {pillarCategories.map((category) => (
            <div
              key={category.slug}
              className="rounded-xl border border-line bg-white/50 p-6"
            >
              <h3 className="font-display text-lg text-ink">
                {category.shortName}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {category.summary}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Contact ──────────────────────────────────────────────────────── */}
      <div className="border-t border-line-soft bg-bone-deep">
        <Container>
          <div className="grid gap-10 py-16 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl text-ink">Get in touch</h2>
              <p className="mt-3 max-w-md leading-relaxed text-ink-soft">
                We reply to every enquiry, including the ones we are not the
                right partner for.
              </p>
              <div className="mt-7">
                <ButtonLink href="/enquiry">
                  Request a quote
                  <Arrow />
                </ButtonLink>
              </div>
            </div>

            <div className="sm:text-right">
              <ul className="space-y-2 text-sm text-ink-soft">
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="transition-colors hover:text-indigo-deep"
                  >
                    {contact.email}
                  </a>
                </li>
                {contact.addressLines.map((line) => (
                  <li key={line} className="text-muted">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
