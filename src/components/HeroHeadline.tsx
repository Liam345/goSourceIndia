"use client";

import { useEffect, useState } from "react";
import { hero } from "@/content/site";

/**
 * Rotating complete hero headline.
 *
 * Two things are deliberate here:
 *
 * 1. NO LAYOUT SHIFT. Every headline is rendered into the same grid cell, so
 *    the block is always sized to the tallest one. Animating only the active
 *    headline would jog the CTA below it on every rotation.
 *
 * 2. THE ROTATION IS DECORATIVE. Screen readers get one clean static sentence
 *    (the sr-only h1); the animated copy is aria-hidden. Announcing a headline
 *    that rewrites itself every three seconds is hostile, and a live region
 *    here would interrupt whatever the user is actually reading.
 */
export function HeroHeadline() {
  const headlines = hero.headlines;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Users who ask for reduced motion get the first phrase, held still.
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || headlines.length < 2) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % headlines.length);
    }, hero.rotationInterval);

    return () => clearInterval(id);
  }, [headlines.length]);

  return (
    <>
      {/* The accessible headline: one sentence, no motion, read once. */}
      <h1 className="sr-only">
        {headlines[0].join(" ")} {hero.accessibleSummary}
      </h1>

      <div
        aria-hidden="true"
        className="font-display text-4xl leading-[1.15] text-balance text-indigo-deep sm:text-5xl lg:text-6xl"
      >
        {/* All headlines share one grid cell, so the tallest sets the box. */}
        <span className="grid">
          {headlines.map((headline, i) => (
              <span
                key={headline.join(" ")}
                className={`col-start-1 row-start-1 transition-all duration-700 ease-out motion-reduce:transition-none ${
                  i === index
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-3 opacity-0"
                }`}
              >
                {headline.map((line) => (
                  <span key={line} className="block lg:whitespace-nowrap">
                    {line}
                  </span>
                ))}
              </span>
          ))}
        </span>
      </div>
    </>
  );
}
