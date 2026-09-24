"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { BookCard } from "./book-card";
import type { BookItem } from "@/lib/types";

export type BookSearchResult = BookItem;

export function RecommendedShelf({
  books,
  title = "Recommended Discoveries",
  onSelectBook,
}: {
  books: BookSearchResult[];
  title?: string;
  onSelectBook?: (book: BookSearchResult) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const isInteractingRef = useRef(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Triple the books array for an infinite, seamless bidirectional loop
  const displayBooks = useMemo(() => {
    if (!books || books.length === 0) return [];
    if (books.length < 5) {
      return [...books, ...books, ...books, ...books];
    }
    return [...books, ...books, ...books];
  }, [books]);

  // Start at the middle set for seamless looping in both directions
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || displayBooks.length === 0) return;

    const timeout = setTimeout(() => {
      if (el && el.scrollWidth > 0) {
        el.scrollLeft = el.scrollWidth / 3;
      }
    }, 80);

    return () => clearTimeout(timeout);
  }, [displayBooks.length]);

  // Continuous smooth auto-glide from right to left
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || displayBooks.length === 0) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let scrollPos = el.scrollLeft;

    const speed = 0.65; // Smooth, calm exhibition pace (~40px/sec)

    const step = (time: number) => {
      const delta = Math.min(time - lastTime, 50);
      lastTime = time;

      if (!isHoveredRef.current && !isInteractingRef.current && el && el.scrollWidth > 0) {
        // If user manually scrolled, sync our accumulator
        if (Math.abs(el.scrollLeft - scrollPos) > 4) {
          scrollPos = el.scrollLeft;
        }

        scrollPos += (speed * delta) / 16.67;

        const oneThird = el.scrollWidth / 3;
        if (oneThird > 0) {
          // When reaching the end of the middle third, seamlessly wrap back
          if (scrollPos >= oneThird * 2) {
            scrollPos -= oneThird;
          } else if (scrollPos <= 10) {
            scrollPos += oneThird;
          }
        }

        el.scrollLeft = scrollPos;
      } else if (el) {
        scrollPos = el.scrollLeft;
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [displayBooks.length]);

  const pauseInteraction = () => {
    isInteractingRef.current = true;
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 1200);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const containerWidth = el.clientWidth;
    const offset =
      direction === "left"
        ? -Math.max(200, Math.floor(containerWidth * 0.75))
        : Math.max(200, Math.floor(containerWidth * 0.75));

    pauseInteraction();
    el.scrollBy({ left: offset, behavior: "smooth" });

    const oneThird = el.scrollWidth / 3;
    setTimeout(() => {
      if (el.scrollLeft >= oneThird * 2) {
        el.scrollLeft -= oneThird;
      } else if (el.scrollLeft <= 10) {
        el.scrollLeft += oneThird;
      }
    }, 600);
  };

  return (
    <div className="relative">
      {/* Header with Title and Left/Right Carousel Controls */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="min-w-0 font-serif text-2xl font-normal tracking-tight text-primary sm:text-3xl">
          {title}
        </h2>

        {/* Carousel Arrow Controls */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="grid size-11 sm:size-10 place-items-center rounded-full border border-primary/20 bg-white/60 text-primary transition-all hover:border-primary/50 hover:bg-white hover:shadow-xs active:scale-95 dark:bg-white/5 dark:border-white/15 dark:hover:bg-white/10"
            aria-label="Previous books"
          >
            <svg
              aria-hidden="true"
              className="size-4.5 sm:size-4"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M12 15l-5-5 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="grid size-11 sm:size-10 place-items-center rounded-full border border-primary/20 bg-white/60 text-primary transition-all hover:border-primary/50 hover:bg-white hover:shadow-xs active:scale-95 dark:bg-white/5 dark:border-white/15 dark:hover:bg-white/10"
            aria-label="Next books"
          >
            <svg
              aria-hidden="true"
              className="size-4.5 sm:size-4"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M8 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Horizontal 3D Book Shelf with Left & Right Gradient Fade and Continuous Glide */}
      <div
        className="relative left-1/2 -translate-x-1/2 w-[min(93vw,1633px)] overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 20px, black 90px, black calc(100% - 90px), rgba(0,0,0,0.15) calc(100% - 20px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 20px, black 90px, black calc(100% - 90px), rgba(0,0,0,0.15) calc(100% - 20px), transparent 100%)",
        }}
      >
        {/* Left Edge Ambient Fade Overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-30 w-16 bg-gradient-to-r from-[var(--color-secondary,#fbf7f6)] via-[var(--color-secondary,#fbf7f6)]/80 to-transparent sm:w-24 lg:w-32 dark:from-[#171b17] dark:via-[#171b17]/80"
        />

        {/* Right Edge Ambient Fade Overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-30 w-16 bg-gradient-to-l from-[var(--color-secondary,#fbf7f6)] via-[var(--color-secondary,#fbf7f6)]/80 to-transparent sm:w-24 lg:w-32 dark:from-[#171b17] dark:via-[#171b17]/80"
        />

        <div
          ref={scrollRef}
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
          }}
          onTouchStart={() => {
            isInteractingRef.current = true;
          }}
          onTouchEnd={() => {
            pauseInteraction();
          }}
          className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto pb-7 pt-3 scrollbar-none px-4 sm:px-8 lg:px-10"
          style={{ scrollbarWidth: "none" }}
        >
          {displayBooks.map((book, index) => (
            <div
              key={`${book.key || book.id || index}-${index}`}
              className="w-36 shrink-0 sm:w-40 md:w-44"
            >
              <BookCard book={book} onSelect={onSelectBook} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

