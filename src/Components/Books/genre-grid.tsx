"use client";

import React from "react";
import Image from "next/image";
import { GenreItem } from "@/lib/types";

interface GenreGridProps {
  genres: GenreItem[];
  selectedGenre?: string;
  onSelectGenre: (genreSlug: string) => void;
}

export function GenreGrid({
  genres,
  selectedGenre,
  onSelectGenre,
}: GenreGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {genres.map((genre) => {
        const isSelected = selectedGenre === genre.slug;

        return (
          <div
            key={genre.slug}
            onClick={() => onSelectGenre(genre.slug)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectGenre(genre.slug);
              }
            }}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-all duration-300 cursor-pointer ${
              isSelected
                ? "border-accent ring-2 ring-accent/60 bg-accent/10 shadow-lg -translate-y-1"
                : "border-primary/10 bg-white/60 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg dark:bg-white/[0.03]"
            }`}
          >
            {/* Top row: Genre name and work count */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg font-bold text-primary transition-colors group-hover:text-accent">
                    {genre.name}
                  </h3>
                  {isSelected && (
                    <span className="rounded-full bg-accent px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                      Active
                    </span>
                  )}
                </div>
                <p className="mt-1 line-clamp-1 text-xs text-primary/55">
                  {genre.description}
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-primary/10 bg-secondary px-2.5 py-1 text-[11px] font-semibold text-primary/70 dark:bg-primary/20">
                {genre.countLabel}
              </span>
            </div>

            {/* Bottom preview: A few book cover thumbnails as requested */}
            <div className="mt-6 flex items-center justify-between border-t border-primary/10 pt-4">
              <span className="text-xs font-semibold text-accent group-hover:underline">
                {isSelected ? "Viewing Data Table ↓" : "Explore genre →"}
              </span>

              {/* Overlapping book cover thumbnails */}
              <div className="flex -space-x-2.5 overflow-hidden pl-2">
                {genre.previewCovers?.slice(0, 3).map((cover, i) => (
                  <div
                    key={i}
                    className="relative aspect-[2/3] w-9 overflow-hidden rounded-[2px] border border-white/80 shadow-md transition-transform duration-200 group-hover:scale-105 dark:border-black/50"
                    style={{ zIndex: 10 + i }}
                  >
                    <Image
                      src={cover}
                      alt=""
                      fill
                      sizes="36px"
                      className="object-cover"
                      unoptimized={cover.includes("openlibrary.org")}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
