import type { Metadata } from "next";
import Image from "next/image";
import { categories } from "@/content/site";
import {
  Arrow,
  ButtonLink,
  Container,
  Section,
} from "@/components/ui";

const categoryImages: Record<
  string,
  { src: string; alt: string; objectPosition?: string }
> = {
  "soft-furnishings": {
    src: "/products/soft-home-feature.jpg",
    alt: "Soft home textile setup with bed linen and pillows",
    objectPosition: "center center",
  },
  "floor-coverings": {
    src: "/products/floor-coverings.jpg",
    alt: "Patterned floor covering in a home interior",
    objectPosition: "center center",
  },
  apparel: {
    src: "/products/apparel-feature.jpg",
    alt: "Apparel collection on models",
    objectPosition: "center center",
  },
  toys: {
    src: "/products/toys.jpg",
    alt: "Wooden toys for a children's product range",
    objectPosition: "center 58%",
  },
};

export const metadata: Metadata = {
  title: "Products",
  description:
    "Soft furnishings, floor coverings, apparel and toys sourced from India. Product ranges GoSourceIndia can review for overseas buyers.",
};

export default function ProductsPage() {
  return (
    <>
      <div className="border-b border-line-soft">
        <Container>
          <div className="max-w-3xl py-20 sm:py-24">
            <p className="eyebrow">Products</p>
            <h1 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Product categories we can help you explore.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              These are the main ranges we review across India&apos;s sourcing
              clusters. If your product is close to one of these categories,
              send us the reference and we&apos;ll see where it can be made well.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <div className="space-y-6">
          {categories.map((category, i) => (
            <article
              key={category.slug}
              className="grid gap-8 rounded-xl border border-line bg-white/50 p-7 lg:grid-cols-12 lg:items-center lg:gap-10"
            >
              <div className="lg:col-span-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-bone-deep">
                  <Image
                    src={categoryImages[category.slug].src}
                    alt={categoryImages[category.slug].alt}
                    fill
                    sizes="(min-width: 1024px) 24rem, 100vw"
                    className="object-cover"
                    style={{
                      objectPosition:
                        categoryImages[category.slug].objectPosition,
                    }}
                  />
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-sm text-clay">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-2xl text-ink">
                    {category.name}
                  </h2>
                  {!category.isPillar && (
                    <span className="rounded-full border border-line px-2.5 py-0.5 text-[0.6875rem] font-medium uppercase tracking-wide text-muted">
                      Secondary
                    </span>
                  )}
                </div>

                <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
                  {category.summary}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {category.products.map((product) => (
                    <li
                      key={product}
                      className="rounded-full bg-bone-deep px-3 py-1 text-xs text-ink-soft"
                    >
                      {product.split(" — ")[0]}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-line bg-bone-deep px-8 py-14 text-center">
          <h2 className="mx-auto max-w-xl font-display text-2xl leading-tight text-ink sm:text-3xl">
            Not sure which category your product falls under?
          </h2>
          <p className="mx-auto mt-4 max-w-lg leading-relaxed text-ink-soft">
            Send us the reference and we&apos;ll review the product, see where it
            can be made well, and come back with a practical next step.
          </p>
          <div className="mt-8">
            <ButtonLink href="/enquiry">
              Request a quote
              <Arrow />
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
