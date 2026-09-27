"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/Components/Books/book-card";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg aria-hidden="true" className={`size-4 ${direction === "left" ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="none">
      <path d="m7.5 4.5 5 5.5-5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function availabilityLabel(availability: Book["availability"]) {
  if (availability === "accessible") return "Free to read";
  if (availability === "borrowable") return "Borrowable";
  return "Preview available";
}

export function BookSpotlight({ books }: { books: readonly Book[] }) {
  const spotlightBooks = books.slice(0, 5);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeBook = spotlightBooks[activeIndex];

  if (!activeBook) return null;

  const selectRelative = (offset: number) => {
    setActiveIndex((current) => (current + offset + spotlightBooks.length) % spotlightBooks.length);
  };

  return (
    <section aria-labelledby="spotlight-title" className="relative isolate overflow-hidden border-b border-primary/10 bg-white py-18 text-primary transition-colors duration-300 dark:bg-secondary sm:py-24">
      <div aria-hidden="true" className="absolute -top-40 right-[-10rem] -z-10 size-[32rem] rounded-full border border-primary/7 shadow-[0_0_0_70px_rgba(34,48,35,0.025),0_0_0_140px_rgba(34,48,35,0.015)] dark:border-white/5 dark:shadow-[0_0_0_70px_rgba(255,255,255,0.018),0_0_0_140px_rgba(255,255,255,0.012)]" />
      <div aria-hidden="true" className="absolute bottom-[-14rem] left-[-9rem] -z-10 size-[28rem] rounded-full border border-accent/10 shadow-[0_0_0_55px_rgba(187,139,76,0.025)]" />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col items-start justify-between gap-5 border-b border-primary/10 pb-7 sm:mb-12 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold tracking-[0.22em] text-accent uppercase">Avenor spotlight</p>
            <h2 id="spotlight-title" className="mt-3 max-w-2xl font-serif text-4xl leading-none tracking-[-0.035em] sm:text-5xl">
              A closer look at what readers are finding
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-primary/55">
            Avenor editions presented with the signals that help you decide where to begin.
          </p>
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
          <div className="relative mx-auto w-full max-w-[24rem] lg:mx-0">
            <div className="relative aspect-[2/3] overflow-hidden rounded-[1.5rem_0.35rem_1.5rem_0.35rem] border border-primary/10 bg-white/50 shadow-[0_28px_70px_rgba(34,48,35,0.18)] dark:bg-white/5 dark:shadow-[0_32px_80px_rgba(0,0,0,0.35)]">
              <Image
                key={activeBook.key}
                src={activeBook.coverUrl}
                alt={`Cover of ${activeBook.title}`}
                fill
                loading="eager"
                sizes="(max-width: 1024px) 90vw, 460px"
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0d160f]/55 via-transparent to-white/[0.04]" />
            </div>
            <button
              type="button"
              onClick={() => selectRelative(-1)}
              aria-label="Show previous spotlight book"
              className="absolute top-1/2 -left-3 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-primary/15 bg-secondary/90 text-primary shadow-xl backdrop-blur transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent sm:-left-5"
            >
              <ArrowIcon direction="left" />
            </button>
          </div>

          <div className="flex min-w-0 flex-col justify-center">
            <p className="text-[0.68rem] font-bold tracking-[0.2em] text-accent uppercase">Featured from the Avenor collection</p>
            <h3 className="mt-4 max-w-2xl font-serif text-[2.65rem] leading-[0.98] tracking-[-0.04em] sm:text-6xl">
              {activeBook.title}
            </h3>
            <p className="mt-4 text-base text-primary/58">By {activeBook.author}</p>
            <p className="mt-7 max-w-xl text-sm leading-7 text-primary/65 sm:text-base sm:leading-8">
              {activeBook.year > 0 ? `First published in ${activeBook.year}. ` : ""}
              Follow this work into its available editions, borrowing options, and complete bibliographic record.
            </p>

            <dl className="mt-7 flex flex-wrap gap-3 text-xs">
              {activeBook.rating > 0 && (
                <div className="rounded-full border border-primary/12 bg-white/50 px-4 py-2.5 dark:bg-white/[0.045]">
                  <dt className="sr-only">Reader rating</dt>
                  <dd><span className="text-accent">★</span> {activeBook.rating.toFixed(1)} reader rating</dd>
                </div>
              )}
              <div className="rounded-full border border-primary/12 bg-white/50 px-4 py-2.5 dark:bg-white/[0.045]">
                <dt className="sr-only">Availability</dt>
                <dd>{availabilityLabel(activeBook.availability)}</dd>
              </div>
            </dl>

            <Link
              href={`https://openlibrary.org${activeBook.key}`}
              className="mt-8 inline-flex h-12 w-fit items-center gap-3 rounded-full bg-accent px-6 text-sm font-bold text-[#172019] outline-none transition-[background-color,transform] hover:bg-[#d0a361] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-3 focus-visible:ring-offset-white dark:focus-visible:ring-[#f8f3e9] dark:focus-visible:ring-offset-secondary"
            >
              Explore this book
              <ArrowIcon direction="right" />
            </Link>

            <div className="mt-10 flex items-end gap-3 overflow-x-auto pb-3 [scrollbar-width:none] sm:gap-4">
              {spotlightBooks.map((book, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={book.key}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Feature ${book.title}`}
                    aria-pressed={isActive}
                    className={`group relative aspect-[2/3] w-[3.6rem] shrink-0 overflow-hidden rounded-sm border bg-white/55 text-left outline-none transition-[transform,border-color,opacity] dark:bg-white/5 sm:w-[5.4rem] ${isActive ? "-translate-y-2 border-accent opacity-100" : "border-primary/10 opacity-55 hover:-translate-y-1 hover:border-primary/35 hover:opacity-100"}`}
                  >
                    <Image src={book.coverUrl} alt="" fill sizes="86px" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => selectRelative(1)}
                aria-label="Show next spotlight book"
                className="sticky right-0 ml-auto grid size-11 shrink-0 place-items-center rounded-full border border-primary/15 bg-white text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent dark:bg-secondary"
              >
                <ArrowIcon direction="right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
