"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BookItem } from "@/lib/types";
import { StarIcon, UsersIcon, BookOpenIcon } from "@/Components/Shared/icons";

interface BookCardProps {
  book: BookItem;
  onSelect?: (book: BookItem) => void;
  featured?: boolean;
}

export function BookCard({ book, onSelect, featured = false }: BookCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (onSelect) {
      e.preventDefault();
      onSelect(book);
    }
  };

  const formattedReaders = book.readerCount
    ? book.readerCount >= 1000
      ? `${(book.readerCount / 1000).toFixed(1)}k`
      : book.readerCount
    : "1.2k";

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.(book);
        }
      }}
      className={`group relative flex flex-col cursor-pointer text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        featured ? "w-44 sm:w-52" : "w-full"
      }`}
    >
      {/* 3D Standing Book Cover Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-r-[6px] rounded-l-[3px] bg-primary/10 shadow-[0_16px_32px_rgba(20,28,22,0.16)] transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_24px_48px_rgba(20,28,22,0.26)]">
        {/* Book spine lighting effects */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-3 bg-gradient-to-r from-white/35 via-white/10 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-3 z-20 w-[1px] bg-black/25" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-1 bg-gradient-to-l from-black/20 to-transparent" />

        {/* Cover Image or Fallback */}
        {book.coverUrl && !imageError ? (
          <Image
            src={book.coverUrl}
            alt={book.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
            unoptimized={book.coverUrl.includes("openlibrary.org")}
          />
        ) : (
          <div className="flex h-full w-full flex-col justify-between bg-gradient-to-br from-[#2a3c2b] to-[#162117] p-4 text-secondary">
            <span className="text-[10px] font-semibold tracking-wider uppercase text-accent">
              {book.subjects?.[0] || "Avenor Classic"}
            </span>
            <div>
              <p className="line-clamp-3 font-serif text-sm font-semibold leading-tight text-white">
                {book.title}
              </p>
              <p className="mt-1 text-xs text-white/70">{book.author}</p>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-accent">
              <BookOpenIcon className="size-3.5" />
              <span>Read Edition</span>
            </div>
          </div>
        )}

        {/* Badges on top */}
        <div className="absolute top-2.5 right-2.5 z-20 flex flex-col items-end gap-1.5">
          {book.isBorrowable && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/90 px-2 py-0.5 text-[10px] font-bold text-secondary shadow-md backdrop-blur-sm">
              Borrowable
            </span>
          )}
        </div>
      </div>

      {/* Book Metadata */}
      <div className="mt-3 flex flex-1 flex-col">
        <h4 className="line-clamp-1 font-serif text-base font-semibold text-primary transition-colors group-hover:text-accent">
          {book.title}
        </h4>
        <p className="mt-0.5 line-clamp-1 text-xs text-primary/60 font-medium">
          {book.author}
        </p>

        {/* Rating and Readers */}
        <div className="mt-2.5 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1 text-accent font-semibold">
            <StarIcon className="size-3.5 text-accent" filled />
            <span>{book.rating || "4.5"}</span>
            {book.ratingCount ? (
              <span className="text-[10px] font-normal text-primary/45">
                ({book.ratingCount > 999 ? `${(book.ratingCount / 1000).toFixed(0)}k` : book.ratingCount})
              </span>
            ) : null}
          </div>

          <div
            className="flex items-center gap-1 text-[11px] text-primary/50"
            title={`${book.readerCount || 1200} people have read this`}
          >
            <UsersIcon className="size-3" />
            <span>{formattedReaders}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

