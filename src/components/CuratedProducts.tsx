"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { curatedProducts } from "@/content/site";
import { Arrow } from "@/components/ui";

type ProductGroup = (typeof curatedProducts.groups)[number];
type ProductVisual =
  | ProductGroup["featureVisual"]
  | ProductGroup["items"][number]["visual"];

const productImages = {
  softHomeFeature: "/products/soft-home-feature.jpg",
  apparelFeature: "/products/apparel-feature.jpg",
  floorCoverings: "/products/floor-coverings.jpg",
  homeLinen: "/products/home-linen.jpg",
  tableLinen: "/products/table-linen.jpg",
  bedLinen: "/products/bed-linen-bright.jpg",
  kids: "/products/kids.jpg",
  men: "/products/men.jpg",
  women: "/products/women.jpg",
} satisfies Record<ProductVisual, string>;

const productImagePositions = {
  softHomeFeature: "center center",
  apparelFeature: "center center",
  floorCoverings: "center center",
  homeLinen: "center center",
  tableLinen: "center center",
  bedLinen: "center center",
  kids: "center center",
  men: "center center",
  women: "center center",
} satisfies Record<ProductVisual, string>;

function ProductArtwork({ visual }: { visual: ProductVisual }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-bone-deep">
      <Image
        src={productImages[visual]}
        alt=""
        fill
        sizes="(min-width: 1024px) 32rem, (min-width: 640px) 16rem, 50vw"
        className="object-cover"
        style={{ objectPosition: productImagePositions[visual] }}
      />
    </div>
  );
}

export function CuratedProducts() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeGroupId, setActiveGroupId] = useState<ProductGroup["id"]>(
    curatedProducts.groups[0].id,
  );
  const [canScrollBackward, setCanScrollBackward] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);
  const activeGroup =
    curatedProducts.groups.find((group) => group.id === activeGroupId) ??
    curatedProducts.groups[0];

  const updateScrollState = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    setCanScrollBackward(scroller.scrollLeft > 8);
    setCanScrollForward(scroller.scrollLeft < maxScroll - 8);
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.scrollTo({ left: 0 });
    updateScrollState();

    const frame = window.requestAnimationFrame(updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [activeGroup.id]);

  const scrollProducts = (direction: "backward" | "forward") => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.scrollBy({
      left:
        direction === "forward"
          ? scroller.clientWidth * 0.75
          : -scroller.clientWidth * 0.75,
      behavior: "smooth",
    });
  };

  return (
    <section className="border-b border-line-soft bg-bone py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[116rem] px-6 lg:px-8">
        <div className="mx-auto grid max-w-[100rem] items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] max-h-[48rem] overflow-hidden">
              <ProductArtwork visual={activeGroup.featureVisual} />
              <div className="absolute inset-0 bg-gradient-to-b from-ink/5 via-ink/10 to-ink/60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex items-center gap-2 text-3xl font-bold text-white">
                  {activeGroup.label}
                  <Arrow />
                </span>
              </div>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <p className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-clay">
              {curatedProducts.eyebrow}
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight text-indigo-deep sm:text-5xl">
              {curatedProducts.title}
            </h2>
            <svg
              viewBox="0 0 224 18"
              className="mt-2 h-4 w-56 text-clay"
              aria-hidden="true"
            >
              <path
                d="M3 10 C48 5 96 8 142 7 C172 6 198 7 221 9"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="7"
              />
              <path
                d="M70 14 C98 11 123 12 151 15"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="5"
              />
            </svg>

            <div
              className="mt-10 flex items-center gap-8"
              role="tablist"
              aria-label="Product groups"
            >
              {curatedProducts.groups.map((group, index) => (
                <div key={group.id} className="flex items-center gap-8">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={group.id === activeGroup.id}
                    onClick={() => setActiveGroupId(group.id)}
                    className={`text-lg font-bold transition-colors ${
                      group.id === activeGroup.id
                        ? "text-indigo-deep"
                        : "text-muted hover:text-indigo-deep"
                    }`}
                  >
                    {group.label}
                  </button>
                  {index < curatedProducts.groups.length - 1 && (
                    <span className="h-7 w-px bg-line" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>

            <div className="relative mt-8">
              <div
                ref={scrollerRef}
                onScroll={updateScrollState}
                className="max-w-full overflow-hidden pb-4 sm:overflow-x-auto sm:[scrollbar-width:none] sm:[&::-webkit-scrollbar]:hidden"
              >
                <div className="grid grid-cols-2 gap-4 sm:flex sm:min-w-max">
                  {activeGroup.items.map((item) => (
                    <div
                      key={item.label}
                      className="group relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-lg bg-bone-deep shadow-[0_12px_28px_rgba(22,24,29,0.08)] sm:w-64 lg:w-[13.25rem]"
                    >
                      <ProductArtwork visual={item.visual} />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 via-ink/25 to-transparent p-4 pt-16">
                        <p className="flex items-center gap-1 text-xl font-bold leading-tight text-white">
                          {item.label}
                          <Arrow className="transition-transform duration-200 group-hover:translate-x-0.5" />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {canScrollBackward ? (
                <button
                  type="button"
                  aria-label="Show previous products"
                  onClick={() => scrollProducts("backward")}
                  className="absolute left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-indigo-deep shadow-[0_12px_30px_rgba(22,24,29,0.16)] ring-1 ring-line transition-colors hover:text-clay sm:flex"
                >
                  <Arrow className="rotate-180" />
                </button>
              ) : null}

              {canScrollForward ? (
                <>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-bone via-bone/85 to-transparent sm:block"
                  />
                  <button
                    type="button"
                    aria-label="Show more products"
                    onClick={() => scrollProducts("forward")}
                    className="absolute right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-indigo-deep shadow-[0_12px_30px_rgba(22,24,29,0.16)] ring-1 ring-line transition-colors hover:text-clay sm:flex"
                  >
                    <Arrow />
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
