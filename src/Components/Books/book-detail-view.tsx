"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BookItem, WorkDetailData } from "@/lib/types";
import { useSavedBooks } from "@/lib/useSavedBooks";
import {
  StarIcon,
  BookOpenIcon,
  HeadphonesIcon,
  BookmarkIcon,
  CloseIcon,
  CheckIcon,
} from "@/Components/Shared/icons";

interface BookDetailViewProps {
  book: BookItem | WorkDetailData;
  onClose?: () => void;
  isModal?: boolean;
}

function cleanDescription(desc?: string): string {
  if (!desc) {
    return "A compelling literary work available on Open Library, offering immersive worldbuilding and timeless themes.";
  }
  // Strip markdown links [label](url) -> label
  let clean = desc.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  // Remove raw jacket blurbs or bibliographic tails
  clean = clean.split(/\\?--+(?:first edition jacket|contents|also contained in)/i)[0];
  // Remove markdown headers and separator lines
  clean = clean.replace(/---+/g, "").trim();
  return clean;
}

export function BookDetailView({
  book,
  onClose,
  isModal = false,
}: BookDetailViewProps) {
  const { isSaved: checkIsSaved, toggleSave } = useSavedBooks();
  const isSaved = checkIsSaved(book.id || book.key);
  const reduceMotion = useReducedMotion();

  const handleToggleSave = () => {
    toggleSave(book);
  };

  const primaryGenre = book.subjects?.[0] || "Fiction";
  const publishYear = book.publishYear || "2018";
  const ratingScore = book.rating || 4.7;
  const ratingStars = Math.round(ratingScore);
  const synopsis = cleanDescription(book.description);

  const formattedReaders = book.readerCount
    ? book.readerCount >= 1000
      ? `${(book.readerCount / 1000).toFixed(1)}k`
      : book.readerCount
    : "18.2k";

  const workId = (book.id || book.key || "")
    .replace(/^\/works\//, "")
    .replace(/^\/books\//, "");

  const content = (
    <div
      className={`relative mx-auto flex w-full max-w-5xl flex-col rounded-2xl sm:rounded-3xl border border-primary/10 bg-secondary shadow-[0_25px_70px_rgba(18,25,19,0.22)] md:grid md:grid-cols-12 ${
        isModal
          ? "max-h-[90vh] overflow-y-auto md:overflow-hidden md:max-h-[85vh]"
          : "min-h-[auto] md:min-h-[580px] overflow-hidden"
      }`}
    >
      {/* Close button for modal */}
      {isModal && onClose && (
        <button
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-3 top-3 sm:right-4 sm:top-4 z-50 grid size-8 sm:size-10 place-items-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/60 active:scale-95"
        >
          <CloseIcon className="size-4 sm:size-5" />
        </button>
      )}

      {/* LEFT SPLIT: Deep Forest Green Background with 3D Book Cover */}
      <div className="relative md:col-span-5 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#223023] via-[#1c291d] to-[#121a13] p-4 sm:p-6 md:p-8 lg:p-10 text-white shrink-0">
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs tracking-wider uppercase text-white/60">
          <div className="flex items-center gap-1.5 font-semibold">
            {onClose ? (
              <button
                onClick={onClose}
                className="hover:text-accent flex items-center gap-1 transition-colors"
              >
                <span>‹</span>
                <span>CATALOG</span>
              </button>
            ) : (
              <Link
                href="/discover"
                className="hover:text-accent flex items-center gap-1 transition-colors"
              >
                <span>‹</span>
                <span>DISCOVER</span>
              </Link>
            )}
            <span>/</span>
            <span className="text-accent truncate max-w-[130px] sm:max-w-none">{primaryGenre}</span>
          </div>
        </div>

        {/* 3D Realistic Book Cover Standing in Center */}
        <div className="my-3 sm:my-6 md:my-8 flex justify-center py-1 sm:py-3">
          <div className="relative aspect-[2/3] w-28 sm:w-40 md:w-52 overflow-hidden rounded-r-md rounded-l-xs bg-[#2e3e2f] shadow-[0_15px_35px_rgba(0,0,0,0.45)] sm:shadow-[0_20px_45px_rgba(0,0,0,0.5)] ring-1 ring-white/10 transition-transform duration-300 hover:scale-102">
            {/* Book spine lighting effects */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-2.5 sm:w-4 bg-gradient-to-r from-white/40 via-white/10 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 left-2.5 sm:left-4 z-20 w-[1px] bg-black/35" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-2 bg-gradient-to-l from-black/25 to-transparent" />

            {book.coverUrl ? (
              <Image
                src={book.coverUrl}
                alt={book.title}
                fill
                sizes="(max-width: 640px) 120px, (max-width: 1024px) 180px, 220px"
                className="object-cover object-center"
                priority
                unoptimized={book.coverUrl.includes("openlibrary.org")}
              />
            ) : (
              <div className="flex h-full w-full flex-col justify-between bg-[#19241a] p-3 sm:p-5 text-white">
                <span className="text-[9px] sm:text-xs uppercase tracking-widest text-accent">
                  {primaryGenre}
                </span>
                <div>
                  <h3 className="font-serif text-sm sm:text-lg font-bold leading-tight">
                    {book.title}
                  </h3>
                  <p className="mt-1 text-[11px] sm:text-xs text-white/70">{book.author}</p>
                </div>
                <span className="text-[9px] sm:text-xs text-accent">Avenor Classics</span>
              </div>
            )}
          </div>
        </div>

        {/* Format indicator at bottom of left panel */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-white/50 border-t border-white/10 pt-2.5 sm:pt-3 md:pt-4">
          <span>Open Library Digital Edition</span>
          <span className="text-accent font-semibold">{publishYear}</span>
        </div>
      </div>

      {/* RIGHT SPLIT: Warm Content Area */}
      <div
        className={`relative md:col-span-7 flex flex-col justify-between bg-secondary dark:bg-[#181d18] ${
          isModal ? "md:overflow-y-auto" : ""
        }`}
      >
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 space-y-3 sm:space-y-4">
          {/* Header Row */}
          <div className="flex items-center justify-between border-b border-primary/10 pb-2.5 sm:pb-3">
            <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-primary/60">
              Overview
            </span>
            {workId && isModal && (
              <Link
                href={`/book/${workId}`}
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-accent hover:underline"
              >
                <span>Full details page</span>
                <span>↗</span>
              </Link>
            )}
          </div>

          {/* Book Information */}
          <div className="space-y-2.5 sm:space-y-3.5">
            {/* Title & Author */}
            <div>
              <h1 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-primary leading-tight">
                {book.title}
              </h1>
              <p className="mt-1 font-serif text-sm sm:text-base md:text-lg text-primary/70 italic">
                {book.author}
              </p>
            </div>

            {/* Star Rating & Reader Count */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-0.5 sm:gap-1 text-accent">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className="size-3.5 sm:size-4"
                    filled={star <= ratingStars}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-primary">
                {ratingScore}
              </span>
              <span className="text-xs text-primary/45">
                · {formattedReaders} readers
              </span>
            </div>

            {/* Synopsis / Excerpt */}
            <div className="pt-0.5 text-xs sm:text-sm leading-relaxed text-primary/75 space-y-2">
              <p className="line-clamp-4 sm:line-clamp-6 md:line-clamp-none">
                {synopsis}
              </p>
              <p className="text-[10px] sm:text-xs text-primary/55 leading-normal">
                Open Library provides digital scans and public catalog access to
                this title under fair use and open lending agreements.
              </p>
            </div>

            {/* Subject Tags */}
            {book.subjects && book.subjects.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {book.subjects.slice(0, 4).map((sub) => (
                  <span
                    key={sub}
                    className="rounded-full border border-primary/10 bg-white/70 px-2.5 sm:px-3 py-0.5 text-[10px] sm:text-[11px] font-medium text-primary/70 dark:bg-white/[0.04]"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS - Responsive on Mobile, Tablet & PC */}
        <div className="sticky bottom-0 z-20 mt-auto border-t border-primary/10 bg-secondary/95 backdrop-blur-md p-3 sm:p-4 md:p-6 dark:bg-[#181d18]/95 shadow-[0_-8px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_-8px_20px_rgba(0,0,0,0.25)]">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* READ ONLINE BUTTON */}
            <a
              href={`https://openlibrary.org${book.key || `/works/${book.id}`}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex h-10 sm:h-11 md:h-12 items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-primary px-2.5 sm:px-5 text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:bg-primary/90 active:scale-95 dark:bg-accent dark:text-primary dark:hover:bg-accent/90"
            >
              <BookOpenIcon className="size-3.5 sm:size-4 shrink-0" />
              <span className="truncate">READ ONLINE</span>
            </a>

            {/* LISTEN & BORROW BUTTON */}
            <a
              href={`https://archive.org/search?query=${encodeURIComponent(book.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex h-10 sm:h-11 md:h-12 items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-accent px-2.5 sm:px-5 text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:bg-accent/90 active:scale-95"
            >
              <HeadphonesIcon className="size-3.5 sm:size-4 shrink-0" />
              <span className="truncate">
                <span className="sm:hidden">BORROW</span>
                <span className="hidden sm:inline">LISTEN & BORROW</span>
              </span>
            </a>

            {/* SAVE TO BOOKSHELF BUTTON */}
            <button
              type="button"
              onClick={handleToggleSave}
              aria-label={isSaved ? "Saved to bookshelf" : "Save to bookshelf"}
              title={isSaved ? "Saved to bookshelf" : "Save to bookshelf"}
              className={`inline-flex h-10 sm:h-11 md:h-12 items-center justify-center gap-1.5 rounded-xl border px-3 sm:px-5 text-xs sm:text-sm font-semibold transition-all active:scale-95 shrink-0 ${
                isSaved
                  ? "border-accent bg-accent/15 text-accent font-bold"
                  : "border-primary/20 bg-white text-primary hover:border-primary/40 dark:bg-secondary dark:border-white/15"
              }`}
            >
              {isSaved ? (
                <CheckIcon className="size-4 shrink-0 text-accent" />
              ) : (
                <BookmarkIcon className="size-4 shrink-0" />
              )}
              <span className="hidden min-[420px]:inline">
                {isSaved ? "Saved" : "Save"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.2, ease: "easeOut" } }}
        exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeIn" } }}
      >
        <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
        <motion.div
          className="relative z-10 w-full max-w-5xl my-auto"
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] },
          }}
          exit={{
            opacity: 0,
            scale: reduceMotion ? 1 : 0.98,
            transition: { duration: 0.15, ease: "easeIn" },
          }}
        >
          {content}
        </motion.div>
      </motion.div>
    );
  }

  return content;
}
