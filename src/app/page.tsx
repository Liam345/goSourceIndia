import Image from "next/image";
import {
  categories,
  factoryNetwork,
  hero,
  manufacturingStages,
} from "@/content/site";
import {
  Arrow,
  ButtonLink,
  Check,
  Container,
  Section,
} from "@/components/ui";
import { CuratedProducts } from "@/components/CuratedProducts";
import { HeroHeadline } from "@/components/HeroHeadline";
import { HeroMedia } from "@/components/HeroMedia";

const stageImages = {
  design: "/manufacturing/design.jpg",
  merchandising: "/manufacturing/merchandising.jpg",
  fabric: "/manufacturing/fabric-sourcing.jpg",
  production: "/manufacturing/production-india.jpg",
  quality: "/manufacturing/quality-control.jpg",
  shipping: "/manufacturing/global-shipping.jpg",
} satisfies Record<(typeof manufacturingStages)[number]["visual"], string>;

function StageArtwork({
  visual,
  title,
}: {
  visual: (typeof manufacturingStages)[number]["visual"];
  title: string;
}) {
  return (
    <div className="relative h-full overflow-hidden rounded-md bg-bone-deep">
      <Image
        src={stageImages[visual]}
        alt={`${title} stage`}
        fill
        sizes="(min-width: 1280px) 18rem, (min-width: 640px) 50vw, 100vw"
        loading="eager"
        className="object-cover"
      />
    </div>
  );
}

function FactoryNetworkMap() {
  return (
    <div className="relative min-h-[34rem] overflow-hidden rounded-lg border border-line bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.95),transparent_30%),linear-gradient(135deg,#fbfaf7_0%,#f5f1e8_100%)] shadow-[0_16px_40px_rgba(22,24,29,0.06)]">
      <svg
        viewBox="0 0 720 560"
        className="absolute inset-0 h-full w-full text-line"
        aria-hidden="true"
      >
        <path
          d="M360 70 C338 112 331 157 350 196 C374 243 355 287 325 330 C295 373 304 423 345 478"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M235 245 C318 235 417 234 493 245"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M307 348 C390 346 473 348 540 356"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M360 70 L468 142 L532 254 L498 371 L392 508 L306 470 L247 346 L210 216 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.7"
        />
      </svg>

      <div className="absolute left-[18%] top-[18%] h-80 w-80 rounded-full bg-clay/5 blur-3xl" />
      <div className="absolute bottom-[12%] right-[14%] h-72 w-72 rounded-full bg-indigo-light/70 blur-3xl" />

      {factoryNetwork.clusters.map((cluster) => (
        <div
          key={cluster.name}
          className="absolute"
          style={{ left: cluster.left, top: cluster.top }}
        >
          <span className="absolute left-0 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay ring-8 ring-clay/10" />
          <span
            className={`absolute top-0 -translate-y-1/2 whitespace-nowrap rounded-full border border-line bg-white/90 px-3.5 py-2 text-sm font-semibold text-indigo-deep shadow-[0_10px_24px_rgba(22,24,29,0.08)] backdrop-blur ${
              cluster.labelSide === "left" ? "right-4" : "left-4"
            }`}
          >
            {cluster.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line-soft">
        <Container className="max-w-[116rem]">
          {/*
            Deliberately sparse — headline, one action, the collage. Every
            element removed from here is an element that stops competing with
            the thing we actually want clicked.
          */}
          <div className="mx-auto grid max-w-[100rem] items-center gap-12 py-16 lg:grid-cols-[minmax(26rem,0.9fr)_minmax(34rem,1.1fr)] lg:gap-14 lg:py-24 xl:gap-20">
            <div>
              <HeroHeadline />

              <div className="mt-10 lg:mt-12">
                <ButtonLink href="/enquiry">
                  {hero.ctaLabel}
                  <Arrow />
                </ButtonLink>
              </div>
            </div>

            <div>
              <HeroMedia />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Curated products ──────────────────────────────────────────────── */}
      <CuratedProducts />

      {/* ── Manufacturing flow ───────────────────────────────────────────── */}
      <section className="border-b border-line-soft bg-bone py-20 sm:py-28">
        <Container className="max-w-[116rem]">
          <div className="mx-auto max-w-[100rem]">
            <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <p className="eyebrow mb-4">Up your manufacturing game</p>
                <h2 className="max-w-3xl font-display text-4xl leading-tight text-indigo-deep sm:text-5xl">
                  What GoSourceIndia handles for you
                </h2>
                <svg
                  viewBox="0 0 224 18"
                  className="mt-4 h-4 w-56 text-clay"
                  aria-hidden="true"
                >
                  <path
                    d="M3 10 C48 5 96 8 142 7 C172 6 198 7 221 9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <path
                    d="M70 14 C98 11 123 12 151 15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="lg:col-span-5 lg:text-right">
                <p className="text-lg font-medium leading-relaxed text-ink-soft">
                  Join us at any stage of manufacturing, from first sketch to
                  final shipment.
                </p>
                <ButtonLink href="/enquiry" className="mt-8 w-fit lg:ml-auto">
                  Get started
                  <Arrow />
                </ButtonLink>
              </div>
            </div>

            <div className="relative mt-12">
              <div
                className="absolute left-8 right-8 top-6 hidden border-t border-dashed border-clay/50 xl:block"
                aria-hidden="true"
              />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {manufacturingStages.map((stage) => (
                  <article
                    key={stage.step}
                    className="relative flex h-[20rem] flex-col rounded-lg bg-white p-4 pt-5 shadow-[0_8px_18px_rgba(22,24,29,0.06)] ring-1 ring-line-soft transition-transform duration-200"
                  >
                      <div className="relative z-10 mb-4 flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-bone text-sm font-bold text-indigo-deep">
                          {stage.step}
                        </span>
                        <h3 className="text-lg font-bold leading-tight text-[#27366c]">
                          {stage.title}
                        </h3>
                      </div>
                      <div className="mt-3 min-h-0 flex-1 overflow-hidden rounded-md">
                        <StageArtwork
                          visual={stage.visual}
                          title={stage.title}
                        />
                      </div>
                    </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Factory network ───────────────────────────────────────────────── */}
      <section className="border-b border-line-soft bg-bone-deep py-20 sm:py-28">
        <Container className="max-w-[116rem]">
          <div className="mx-auto grid max-w-[100rem] items-center gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-6">
              <FactoryNetworkMap />
            </div>

            <div className="lg:col-span-6">
              <p className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-clay">
                {factoryNetwork.eyebrow}
              </p>
              <h2 className="mt-5 max-w-3xl font-display text-5xl leading-[0.98] text-indigo-deep sm:text-6xl lg:text-7xl">
                {factoryNetwork.title}
              </h2>
              <p className="mt-8 max-w-3xl text-xl leading-relaxed text-ink-soft">
                {factoryNetwork.lead}
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                {categories.map((category) => (
                  <span
                    key={category.slug}
                    className="rounded-full border border-line bg-bone px-5 py-2.5 text-sm font-semibold text-indigo-deep"
                  >
                    {category.shortName}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Differentiator ───────────────────────────────────────────────── */}
      <section className="border-b border-line-soft bg-indigo-deep py-20 sm:py-28">
        <Container className="max-w-[116rem]">
          <div className="mx-auto grid max-w-[100rem] gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-clay">
                Why us
              </p>
              <h2 className="mt-4 max-w-lg font-display text-3xl leading-tight text-bone sm:text-4xl">
                We work on the floor, not from an inbox.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-lg leading-relaxed text-bone/80">
                Most sourcing agents forward your tech pack to three factories
                and mark up the reply. When something slips, they can only pass
                the message along.
              </p>
              <ul className="mt-8 space-y-5">
                {[
                  {
                    title: "We are in the cluster, at the unit",
                    body: "Someone from our side is physically on the floor while your order runs — checking measurements while the run is still correctable, not reading a report after it has shipped.",
                  },
                  {
                    title: "One accountable point of contact",
                    body: "Across all verticals. You are not managing four vendor relationships, four sample cycles and four sets of documents.",
                  },
                  {
                    title: "We work with verified factories only",
                    body: "Every factory is checked for category fit, export readiness and compliance signals before we place a buyer programme there.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <Check className="mt-1 text-clay" />
                    <div>
                      <h3 className="font-medium text-bone">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-bone/65">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      <Section>
        <div className="rounded-2xl border border-line bg-white/50 px-8 py-16 text-center sm:px-16">
          <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight text-ink sm:text-4xl">
            Send us a tech pack, a sketch, or a photo of something you like.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            We&apos;ll review the product, see where it can be made well, and come
            back with a practical next step.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/enquiry">
              Request a quote
              <Arrow />
            </ButtonLink>
            <ButtonLink href="/products" variant="secondary">
              Browse capability
            </ButtonLink>
          </div>
          <p className="mt-8 text-sm text-muted">
            Currently working with buyers in{" "}
            {categories.length > 0 && "the EU, UK, US and Australia"}. {/* TODO: update to your real markets */}
          </p>
        </div>
      </Section>
    </>
  );
}
