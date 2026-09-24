"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BookItem } from "@/lib/types";
import { StarIcon, UsersIcon, BookOpenIcon } from "@/Components/Shared/icons";

export type BookSearchResult = BookItem;

export interface BookResultCardProps {
  book: BookSearchResult;
  onSelect?: (book: BookSearchResult) => void;
  featured?: boolean;
}

export function BookResultCard({
  book,
  onSelect,
}: BookResultCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Sync saved state with localStorage (NOT saved by default)
  useEffect(() => {
    const bookId = book.id || book.key;
    if (!bookId) return;

    try {
      const saved = localStorage.getItem(`avenor_saved_${bookId}`);
      setIsSaved(saved === "true");
    } catch {
      setIsSaved(false);
    }

    const handleSync = (e: CustomEvent<{ bookId: string; isSaved: boolean }>) => {
      if (e.detail?.bookId === bookId) {
        setIsSaved(e.detail.isSaved);
      }
    };

    window.addEventListener("avenor:book-saved-changed" as unknown as keyof WindowEventMap, handleSync as EventListener);
    return () => {
      window.removeEventListener("avenor:book-saved-changed" as unknown as keyof WindowEventMap, handleSync as EventListener);
    };
  }, [book.id, book.key]);

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    const bookId = book.id || book.key;
    const nextSaved = !isSaved;
    setIsSaved(nextSaved);

    try {
      if (nextSaved) {
        localStorage.setItem(`avenor_saved_${bookId}`, "true");
      } else {
        localStorage.removeItem(`avenor_saved_${bookId}`);
      }
      window.dispatchEvent(
        new CustomEvent("avenor:book-saved-changed", {
          detail: { bookId, isSaved: nextSaved },
        })
      );
    } catch {
      // ignore
    }
  };

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
      className="group relative flex flex-col cursor-pointer text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent w-full"
    >
      {/* 3D Realistic Standing Book Cover */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-r-[6px] rounded-l-[3px] bg-primary/10 shadow-[0_16px_32px_rgba(20,28,22,0.18)] transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_24px_48px_rgba(20,28,22,0.28)]">
        {/* Spine lighting effects */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-3 bg-gradient-to-r from-white/35 via-white/10 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-3 z-20 w-[1px] bg-black/25" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-1 bg-gradient-to-l from-black/20 to-transparent" />

        {/* Cover Image or Fallback */}
        {book.coverUrl && !imageError ? (
          <Image
            src={book.coverUrl}
            alt={book.title}
            fill
            sizes="(max-width: 640px) 50vw, 240px"
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

        {/* Save / Bookmark Button (Top Right) */}
        <button
          type="button"
          onClick={handleToggleSave}
          aria-label={isSaved ? "Remove from saved books" : "Save book"}
          title={isSaved ? "Saved in library" : "Save to library"}
          className={`absolute top-2.5 right-2.5 z-30 grid size-7 place-items-center rounded-full transition-all duration-200 active:scale-90 ${
            isSaved
              ? "bg-[#bb8b4c] text-white shadow-md ring-2 ring-white/30 scale-100 opacity-100"
              : "bg-black/35 text-white/85 opacity-0 group-hover:opacity-100 hover:bg-black/60 hover:text-white backdrop-blur-xs focus-visible:opacity-100"
          }`}
        >
          {isSaved ? (
            <svg
              className="size-3.5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
            </svg>
          ) : (
            <svg
              className="size-3.5 fill-none stroke-current stroke-2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Book Metadata: Title, Author, Rating & Readers */}
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
