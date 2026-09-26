"use client";

import React, { useState } from "react";
import { SearchMode } from "@/lib/types";
import { SearchIcon, CloseIcon } from "@/Components/Shared/icons";

interface SearchBarFilterProps {
  query: string;
  mode: SearchMode;
  onSearch: (query: string, mode: SearchMode) => void;
  isLoading?: boolean;
}
const MODES: { label: string; value: SearchMode; placeholder: string }[] = [
  { label: "All Catalog", value: "all", placeholder: "Search title, author, subject, or keyword..." },
  { label: "Title", value: "title", placeholder: "Enter book title (e.g., The Hobbit, Dune)..." },
  { label: "Author", value: "author", placeholder: "Enter author name (e.g., Tolkien, Leigh Bardugo)..." },
  { label: "Subject", value: "subject", placeholder: "Enter subject or genre (e.g., Fantasy, History)..." },
];

const SUGGESTIONS = [
  { label: "Fantasy", mode: "subject" as SearchMode },
  { label: "Tolkien", mode: "author" as SearchMode },
  { label: "George R.R. Martin", mode: "author" as SearchMode },
  { label: "Six of Crows", mode: "title" as SearchMode },
  { label: "Dune", mode: "title" as SearchMode },
  { label: "History", mode: "subject" as SearchMode },
];

export function SearchBarFilter({
  query: initialQuery,
  mode: initialMode,
  onSearch,
  isLoading = false,
}: SearchBarFilterProps) {
  const [localQuery, setLocalQuery] = useState(initialQuery);
  const [localMode, setLocalMode] = useState<SearchMode>(initialMode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localQuery, localMode);
  };

  const handleClear = () => {
    setLocalQuery("");
    onSearch("", localMode);
  };

  const handleModeChange = (newMode: SearchMode) => {
    setLocalMode(newMode);
    if (localQuery.trim()) {
      onSearch(localQuery, newMode);
    }
  };

  const handleSuggestionClick = (item: { label: string; mode: SearchMode }) => {
    setLocalQuery(item.label);
    setLocalMode(item.mode);
    onSearch(item.label, item.mode);
  };

  const currentModeInfo =
    MODES.find((m) => m.value === localMode) || MODES[0];

  return (
    <div className="w-full">
      {/* Search Mode Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary/45 mr-1">
          Search by:
        </span>
        {MODES.map((m) => {
          const isActive = localMode === m.value;
          return (
            <button
              key={m.value}
              type="button"
              onClick={() => handleModeChange(m.value)}
              className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all ${
                isActive
                  ? "bg-primary text-secondary shadow-sm dark:bg-accent dark:text-primary"
                  : "bg-white/80 text-primary/70 border border-primary/10 hover:border-primary/25 hover:text-primary dark:bg-white/[0.04]"
              }`}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      {/* Main Search Input Form */}
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="relative flex flex-1 items-center rounded-2xl border border-primary/15 bg-white shadow-xl shadow-primary/5 transition-all focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 dark:bg-secondary/90">
          <div className="pointer-events-none pl-5 pr-3 text-primary/45">
            <SearchIcon className="size-5" />
          </div>

          <input
            type="search"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder={currentModeInfo.placeholder}
            className="h-14 w-full bg-transparent text-sm sm:text-base text-primary placeholder:text-primary/40 focus:outline-none pr-10"
          />

          {localQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="mr-3 grid size-7 place-items-center rounded-full text-primary/40 hover:bg-primary/10 hover:text-primary"
              aria-label="Clear search"
            >
              <CloseIcon className="size-4" />
            </button>
          )}

          <div className="p-1.5 pr-2">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-accent px-6 text-sm font-bold text-white shadow-md transition-all hover:bg-accent/90 active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                "Search"
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Popular suggestions */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-primary/45 font-medium">Quick suggestions:</span>
        {SUGGESTIONS.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => handleSuggestionClick(item)}
            className="rounded-full border border-primary/10 bg-white/50 px-2.5 py-1 text-primary/65 transition-colors hover:border-accent hover:text-accent dark:bg-white/[0.02]"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
