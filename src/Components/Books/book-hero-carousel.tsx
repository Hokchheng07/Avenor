"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { BookItem } from "@/lib/types";
import { ArrowLeftIcon, ArrowRightIcon } from "@/Components/Shared/icons";

interface BookHeroCarouselProps {
  books: BookItem[];
  onSelectBook: (book: BookItem) => void;
}
export function BookHeroCarousel({ books, onSelectBook }: BookHeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeBook = books[currentIndex] || books[0];

  const handlePrev = () => {
    const nextIdx = currentIndex > 0 ? currentIndex - 1 : books.length - 1;
    setCurrentIndex(nextIdx);
    scrollToCard(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = currentIndex < books.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(nextIdx);
    scrollToCard(nextIdx);
  };

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const cards = scrollContainerRef.current.children;
      if (cards[index]) {
        (cards[index] as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-white/70 p-6 shadow-[0_20px_50px_rgba(34,48,35,0.06)] backdrop-blur-md sm:p-10 dark:bg-[#1a221b]/80">
      {/* Top Header Row with Hero Pitch & Author Spotlight */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Story Pitch */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl leading-[1.08]">
            Keep the story going..
          </h2>
          <p className="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-primary/65">
            Don&apos;t let the story end just yet. Continue reading your last book and immerse yourself in the world of literature.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={() => onSelectBook(activeBook)}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-secondary shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl active:scale-95 dark:bg-accent dark:text-primary dark:hover:bg-accent/90"
            >
              <span>Start reading</span>
              <span className="text-base leading-none">↗</span>
            </button>
            <span className="text-xs text-primary/45 font-medium">
              Over 20M+ open library titles
            </span>
          </div>
        </div>

        {/* Right Column: Author Spotlight Card (Mockup 1 style) */}
        <div className="lg:col-span-6 flex flex-col justify-between rounded-2xl border border-primary/10 bg-secondary/80 p-5 dark:bg-white/[0.04]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative size-12 overflow-hidden rounded-full ring-2 ring-accent/30 bg-primary/10">
                <Image
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80"
                  alt="Featured Author"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-primary">
                  {activeBook?.author || "George R.R. Martin"}
                </h4>
                <p className="text-xs text-primary/50 font-medium">author</p>
              </div>
            </div>

            {/* Nav Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous featured book"
                className="grid size-9 place-items-center rounded-full border border-primary/15 text-primary/70 transition-colors hover:border-accent hover:bg-primary/5 hover:text-primary active:scale-90"
              >
                <ArrowLeftIcon className="size-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next featured book"
                className="grid size-9 place-items-center rounded-full border border-primary/15 text-primary/70 transition-colors hover:border-accent hover:bg-primary/5 hover:text-primary active:scale-90"
              >
                <ArrowRightIcon className="size-4" />
              </button>
            </div>
          </div>

          <p className="mt-4 line-clamp-3 text-xs sm:text-sm italic leading-relaxed text-primary/70">
            &ldquo;{activeBook?.description ||
              activeBook?.title + " invites readers into an extraordinary world crafted with rare depth and narrative power."}&rdquo;
          </p>
        </div>
      </div>

      {/* Center 3D Book Cover Showcase (Mockup 1 style) */}
      <div className="mt-10 pt-4">
        <div
          ref={scrollContainerRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none sm:gap-8 justify-start lg:justify-center items-end"
        >
          {books.map((book, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <div
                key={book.id || idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  onSelectBook(book);
                }}
                className={`group shrink-0 cursor-pointer snap-center text-center transition-all duration-300 ${
                  isSelected
                    ? "scale-105 z-10"
                    : "opacity-80 hover:opacity-100 hover:scale-102"
                }`}
                style={{ width: "170px" }}
              >
                {/* 3D Realistic Book Cover */}
                <div
                  className={`relative aspect-[2/3] w-full overflow-hidden rounded-r-[5px] rounded-l-[3px] bg-primary/15 transition-all duration-300 ${
                    isSelected
                      ? "shadow-[0_25px_45px_rgba(20,28,22,0.30)] ring-2 ring-accent"
                      : "shadow-[0_15px_30px_rgba(20,28,22,0.18)]"
                  }`}
                >
                  {/* Spine lighting effects */}
                  <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-3 bg-gradient-to-r from-white/40 to-transparent" />
                  <div className="pointer-events-none absolute inset-y-0 left-3 z-20 w-[1px] bg-black/25" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-1.5 bg-gradient-to-l from-black/20 to-transparent" />

                  {book.coverUrl ? (
                    <Image
                      src={book.coverUrl}
                      alt={book.title}
                      fill
                      sizes="180px"
                      className="object-cover object-center"
                      unoptimized={book.coverUrl.includes("openlibrary.org")}
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col justify-between bg-primary p-3 text-secondary">
                      <span className="text-[9px] uppercase tracking-wider text-accent">
                        Featured
                      </span>
                      <p className="line-clamp-2 font-serif text-xs font-bold text-white">
                        {book.title}
                      </p>
                      <p className="text-[10px] text-white/60">{book.author}</p>
                    </div>
                  )}
                </div>

                {/* Title & Author below cover */}
                <div className="mt-3.5 text-center">
                  <h4 className="line-clamp-1 font-serif text-sm font-bold text-primary group-hover:text-accent">
                    {book.title}
                  </h4>
                  <p className="line-clamp-1 text-xs text-primary/55 font-medium">
                    {book.author}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Editorial Banner (Mockup 1 style) */}
      <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-primary/10 pt-4 text-xs text-primary/60 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid size-5 place-items-center rounded-full bg-accent/20 text-accent font-bold text-[10px]">
            ℹ
          </span>
          <p>
            Got chance to check out the new fantasy collection?{" "}
            <span className="text-accent underline font-semibold cursor-pointer">
              It&apos;s a must-read for any literature fan!
            </span>
          </p>
        </div>
        <div className="font-mono text-xs font-semibold text-primary/50">
          0{currentIndex + 1} / 0{books.length} books
        </div>
      </div>
    </div>
  );
}
