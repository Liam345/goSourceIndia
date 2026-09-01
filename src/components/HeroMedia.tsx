"use client";

import { useEffect, useRef, useState } from "react";
import type { HeroMediaItem } from "@/content/site";
import { heroMedia } from "@/content/site";

function inferKind(item: HeroMediaItem): "video" | "image" | "empty" {
  if (!item.src) return "empty";
  if (item.kind) return item.kind;
  return /\.(mp4|webm|mov)$/i.test(item.src) ? "video" : "image";
}

function MediaCell({
  item,
  className = "",
}: {
  item: HeroMediaItem;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const kind = inferKind(item);
  const shell = `relative overflow-hidden rounded-2xl bg-bone-deep ${className}`;

  useEffect(() => {
    if (kind !== "video") return;

    const video = videoRef.current;
    if (!video) return;

    const markReady = () => setVideoReady(true);

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      markReady();
    }

    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);

    return () => {
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
    };
  }, [kind]);

  if (kind === "video") {
    return (
      <div className={shell}>
        {item.poster ? (
          // Safari/iOS can decline autoplay or stall on first paint. Keep a
          // real image behind the video so the collage never becomes blank.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.poster}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: item.objectPosition }}
          />
        ) : null}
        {/*
          Autoplaying video must be muted + playsInline or iOS refuses to play it.
          It is decorative, so it carries an aria-label rather than a caption.
        */}
        <video
          ref={videoRef}
          poster={item.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          onLoadedData={() => setVideoReady(true)}
          aria-label={item.label}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          style={{ objectPosition: item.objectPosition }}
        >
          <source
            src={item.src}
            type='video/mp4; codecs="avc1.42E01F"'
          />
        </video>
      </div>
    );
  }

  if (kind === "image") {
    return (
      <div className={shell}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.label}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: item.objectPosition }}
        />
      </div>
    );
  }

  // Placeholder until real media is dropped in.
  return (
    <div className={`${shell} flex items-center justify-center border border-line`}>
      <div className="px-5 text-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="mx-auto h-7 w-7 text-line"
        >
          <path
            d="M3 5.5A1.5 1.5 0 014.5 4h15A1.5 1.5 0 0121 5.5v13a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 18.5v-13z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M10 9.5l4.5 2.5L10 14.5v-5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        <p className="mt-2 text-xs font-medium leading-snug text-muted">
          {item.label}
        </p>
      </div>
    </div>
  );
}

/**
 * Three-cell hero collage: one tall cell on the left, two stacked on the right.
 * Mirrors the proportions that read well at desktop width while collapsing to a
 * simple row on small screens.
 */
export function HeroMedia() {
  const [first, second] = heroMedia.stacked;

  return (
    <div className="grid aspect-[1.18/1] grid-cols-[1.08fr_1fr] grid-rows-2 items-stretch gap-5">
      <MediaCell
        item={heroMedia.tall}
        className="row-span-2"
      />
      <MediaCell item={first} />
      <MediaCell item={second} />
    </div>
  );
}
