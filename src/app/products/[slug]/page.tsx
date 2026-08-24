import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/content/site";
import {
  Arrow,
  ButtonLink,
  Check,
  Container,
  ImagePlaceholder,
  Section,
  SectionHeading,
  SpecList,
} from "@/components/ui";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.summary,
  };
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const others = categories.filter((c) => c.slug !== category.slug);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="border-b border-line-soft">
        <Container>
          <div className="py-20 sm:py-24">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-indigo-deep"
            >
              <Arrow className="rotate-180" />
              All products
            </Link>

            <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
                  {category.name}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                  {category.intro}
                </p>
                <div className="mt-9 flex flex-wrap gap-4">
                  <ButtonLink href={`/enquiry?category=${category.slug}`}>
                    Enquire about {category.shortName.toLowerCase()}
                    <Arrow />
                  </ButtonLink>
                </div>
              </div>

              <div className="lg:col-span-5">
                <ImagePlaceholder
                  label={`${category.shortName} — hero image`}
                  ratio="aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Product range ────────────────────────────────────────────────── */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Product range" title="What we run" />
            <p className="mt-5 leading-relaxed text-ink-soft">
              This is what we run regularly. Adjacent products are usually
              possible within the same supply base — ask before assuming
              otherwise.
            </p>
          </div>

          <div className="lg:col-span-7">
            <ul className="space-y-3">
              {category.products.map((product) => (
                <li key={product} className="flex gap-3">
                  <Check className="mt-1 text-clay" />
                  <span className="leading-relaxed text-ink-soft">
                    {product}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── Capabilities ─────────────────────────────────────────────────── */}
      <div className="border-y border-line-soft bg-bone-deep">
        <Container>
          <div className="py-20 sm:py-24">
            <SectionHeading
              eyebrow="Capability"
              title="Materials, techniques and control points"
              lead="The detail below is what separates a quote you can hold a supplier to from a number on an email."
            />

            <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
              {category.capabilities.map((group) => (
                <div key={group.heading} className="bg-bone p-7">
                  <h3 className="font-display text-lg text-ink">
                    {group.heading}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="border-b border-line-soft pb-3 text-sm leading-relaxed text-ink-soft last:border-0 last:pb-0"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* ── Commercial terms + clusters ──────────────────────────────────── */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Commercial terms"
              title="The numbers, up front"
            />
            <div className="mt-8">
              <SpecList
                items={[
                  { label: "Minimum order", value: category.moq },
                  { label: "Lead time", value: category.leadTime },
                  {
                    label: "Sampling",
                    value: "10–15 days from approved spec, revisions included",
                  },
                  {
                    label: "Compliance",
                    value: category.compliance.join(" · "),
                  },
                ]}
              />
            </div>
            <p className="mt-6 text-sm text-muted">
              MOQs are per design and can often be split across colourways.
              First orders are quoted individually — tell us the programme and
              we will tell you honestly whether the economics work.
            </p>
          </div>

          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Sourcing base" title="Where it is made" />
            <ul className="mt-8 space-y-px overflow-hidden rounded-xl border border-line bg-line">
              {category.clusters.map((cluster) => (
                <li key={cluster.name} className="bg-bone p-5">
                  <h3 className="font-medium text-ink">{cluster.name}</h3>
                  <p className="mt-1 text-sm text-muted">{cluster.note}</p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted">
              Cluster selection is driven by construction, not convenience. We
              place your product where it is genuinely made best.
            </p>
          </div>
        </div>
      </Section>

      {/* ── Other categories ─────────────────────────────────────────────── */}
      <div className="border-t border-line-soft bg-bone-deep">
        <Container>
          <div className="py-16">
            <h2 className="font-display text-xl text-ink">
              Other categories
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/products/${other.slug}`}
                  className="group rounded-lg border border-line bg-bone p-5 transition-colors hover:border-indigo-deep"
                >
                  <h3 className="font-medium text-ink">{other.shortName}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted">
                    {other.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-indigo-deep">
                    View
                    <Arrow className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
