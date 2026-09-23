"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookItem, WorkDetailData } from "@/lib/types";
import {
  StarIcon,
  BookOpenIcon,
  HeadphonesIcon,
  CloseIcon,
  CheckIcon,
} from "@/Components/Shared/icons";

interface BookDetailViewProps {
  book: BookItem | WorkDetailData;
  onClose?: () => void;
  isModal?: boolean;
}

export function BookDetailView({
  book,
  onClose,
  isModal = false,
}: BookDetailViewProps) {
  const [isSaved, setIsSaved] = useState(false);

  const primaryGenre = book.subjects?.[0] || "Fiction";
  const publishYear = book.publishYear || "2018";
  const ratingScore = book.rating || 4.7;
  const ratingStars = Math.round(ratingScore);

  const formattedReaders = book.readerCount
    ? book.readerCount >= 1000
      ? `${(book.readerCount / 1000).toFixed(1)}k`
      : book.readerCount
    : "18.2k";

  const content = (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-primary/10 shadow-[0_25px_70px_rgba(18,25,19,0.22)] md:grid md:grid-cols-12">
      {/* Close button for modal */}
      {isModal && onClose && (
        <button
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-4 top-4 z-50 grid size-10 place-items-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/60 active:scale-95"
        >
          <CloseIcon className="size-5" />
        </button>
      )}

      {/* LEFT SPLIT: Deep Forest Green Background with 3D Book Cover (Mockup 2) */}
      <div className="relative md:col-span-5 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#223023] via-[#1c291d] to-[#121a13] p-7 text-white sm:p-10">
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between text-xs tracking-wider uppercase text-white/60">
          <div className="flex items-center gap-1.5 font-semibold">
            {onClose ? (
              <button
                onClick={onClose}
                className="hover:text-accent flex items-center gap-1"
              >
                <span>‹</span>
                <span>CATALOG</span>
              </button>
            ) : (
              <Link
                href="/discover"
                className="hover:text-accent flex items-center gap-1"
              >
                <span>‹</span>
                <span>DISCOVER</span>
              </Link>
            )}
            <span>/</span>
            <span className="text-accent">{primaryGenre}</span>
          </div>
        </div>

        {/* 3D Realistic Book Cover Standing in Center */}
        <div className="my-8 flex justify-center py-4">
          <div className="relative aspect-[2/3] w-48 sm:w-60 overflow-hidden rounded-r-md rounded-l-xs bg-[#2e3e2f] shadow-[0_25px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10 transition-transform duration-300 hover:scale-102">
            {/* Book spine lighting effects */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-4 bg-gradient-to-r from-white/40 via-white/10 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 left-4 z-20 w-[1px] bg-black/35" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-2 bg-gradient-to-l from-black/25 to-transparent" />

            {book.coverUrl ? (
              <Image
                src={book.coverUrl}
                alt={book.title}
                fill
                sizes="(max-width: 640px) 200px, 240px"
                className="object-cover object-center"
                priority
                unoptimized={book.coverUrl.includes("openlibrary.org")}
              />
            ) : (
              <div className="flex h-full w-full flex-col justify-between bg-[#19241a] p-5 text-white">
                <span className="text-xs uppercase tracking-widest text-accent">
                  {primaryGenre}
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold leading-tight">
                    {book.title}
                  </h3>
                  <p className="mt-1 text-xs text-white/70">{book.author}</p>
                </div>
                <span className="text-xs text-accent">Avenor Classics</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SPLIT: Warm Content Area (Mockup 2) */}
      <div className="relative md:col-span-7 flex flex-col justify-between bg-secondary p-7 sm:p-10 dark:bg-[#181d18]">
        <div>
          {/* Header Row */}
          <div className="flex items-center justify-between border-b border-primary/10 pb-4">
            <span className="text-xs font-bold tracking-widest uppercase text-primary/60">
              Overview
            </span>
          </div>

          {/* Book Information */}
          <div className="mt-6 space-y-4">
            {/* Publication Year */}
            <p className="text-xs font-semibold tracking-wider text-primary/40 uppercase">
              {publishYear}
            </p>

            {/* Title & Author */}
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-primary leading-tight">
                {book.title}
              </h1>
              <p className="mt-1 font-serif text-lg text-primary/70 italic">
                {book.author}
              </p>
            </div>

            {/* Star Rating & Reader Count */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="flex items-center gap-1 text-accent">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className="size-4"
                    filled={star <= ratingStars}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-primary">
                {ratingScore}
              </span>
              <span className="text-xs text-primary/45">
                · {formattedReaders} people have read this
              </span>
            </div>

            {/* Synopsis / Excerpt */}
            <div className="pt-2 text-sm leading-relaxed text-primary/75 space-y-3">
              <p>
                {book.description ||
                  `${book.title} is an acclaimed work by ${book.author}. Available across world libraries, this edition offers deep immersion into the characters and intricate storylines that have captivated readers internationally.`}
              </p>
              <p className="text-xs text-primary/55 leading-normal">
                Open Library provides digital scans and public catalog access to
                this title under fair use and open lending agreements.
              </p>
            </div>

            {/* Subject Tags */}
            {book.subjects && book.subjects.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {book.subjects.slice(0, 4).map((sub) => (
                  <span
                    key={sub}
                    className="rounded-full border border-primary/10 bg-white/70 px-3 py-1 text-[11px] font-medium text-primary/70 dark:bg-white/[0.04]"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS (Mockup 2: READ and LISTEN) */}
        <div className="mt-8 flex flex-col gap-3 pt-6 border-t border-primary/10 sm:flex-row">
          <a
            href={`https://openlibrary.org${book.key || `/works/${book.id}`}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-95 dark:bg-accent dark:text-primary dark:hover:bg-accent/90"
          >
            <BookOpenIcon className="size-4" />
            <span>READ ONLINE</span>
          </a>

          <a
            href={`https://archive.org/search?query=${encodeURIComponent(book.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-bold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent/90 active:scale-95"
          >
            <HeadphonesIcon className="size-4" />
            <span>LISTEN & BORROW</span>
          </a>

          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`inline-flex h-12 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-all active:scale-95 ${
              isSaved
                ? "border-accent bg-accent/15 text-accent"
                : "border-primary/20 bg-white text-primary hover:border-primary/40 dark:bg-secondary"
            }`}
          >
            {isSaved ? <CheckIcon className="size-4" /> : null}
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in">
        <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
        <div className="relative z-10 w-full max-w-5xl my-auto animate-scale-up">
          {content}
        </div>
      </div>
    );
  }

  return content;
}
