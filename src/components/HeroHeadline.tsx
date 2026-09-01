"use client";

import { useEffect, useState } from "react";
import { hero } from "@/content/site";

const fadeDuration = 220;

/**
 * Rotating complete hero headline.
 *
 * Two things are deliberate here:
 *
 * 1. NO LAYOUT SHIFT. A hidden sizing layer renders every headline into the
 *    same grid cell, so the block is always sized to the tallest one.
 *
 * 2. THE ROTATION IS DECORATIVE. Screen readers get one clean static sentence
 *    (the sr-only h1); the animated copy is aria-hidden. Announcing a headline
 *    that rewrites itself every three seconds is hostile, and a live region
 *    here would interrupt whatever the user is actually reading.
 */
export function HeroHeadline() {
  const headlines = hero.headlines;
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Users who ask for reduced motion get the first phrase, held still.
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || headlines.length < 2) return;

    let fadeTimeout: number | undefined;
    const id = setInterval(() => {
      setIsVisible(false);

      fadeTimeout = window.setTimeout(() => {
        setIndex((i) => (i + 1) % headlines.length);
        setIsVisible(true);
      }, fadeDuration);
    }, hero.rotationInterval);

    return () => {
      clearInterval(id);
      if (fadeTimeout) window.clearTimeout(fadeTimeout);
    };
  }, [headlines.length]);

  return (
    <>
      {/* The accessible headline: one sentence, no motion, read once. */}
      <h1 className="sr-only">
        {headlines[0].join(" ")} {hero.accessibleSummary}
      </h1>

      <div
        aria-hidden="true"
        className="relative font-display text-4xl leading-[1.15] text-balance text-indigo-deep sm:text-5xl lg:text-6xl"
      >
        {/* Sizing layer: every headline shares one grid cell; tallest wins. */}
        <span className="invisible grid">
          {headlines.map((headline) => (
            <span key={headline.join(" ")} className="col-start-1 row-start-1">
              {headline.map((line) => (
                <span key={line} className="block 2xl:whitespace-nowrap">
                  {line}
                </span>
              ))}
            </span>
          ))}
        </span>

        <span
          key={headlines[index].join(" ")}
          className={`absolute inset-0 transition-all duration-300 ease-out motion-reduce:transition-none ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0"
          }`}
        >
          {headlines[index].map((line) => (
            <span key={line} className="block 2xl:whitespace-nowrap">
              {line}
            </span>
          ))}
        </span>
      </div>
    </>
  );
}
