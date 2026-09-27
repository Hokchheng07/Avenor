"use client";

import { useCallback, useSyncExternalStore } from "react";
import { toast } from "sonner";
import type { BookItem, WorkDetailData } from "@/lib/types";

export const SAVED_BOOKS_STORAGE_KEY = "avenor_saved_books";
export const SAVED_BOOKS_EVENT = "avenor:saved-books-changed";

function normalizeId(idOrKey: string): string {
  if (!idOrKey) return "";
  return idOrKey.replace(/^\/?(works|books)\//, "").trim();
}

function normalizeBook(book: BookItem | WorkDetailData): BookItem {
  const cleanId = normalizeId(book.id || book.key);
  return {
    id: cleanId,
    key: book.key?.startsWith("/") ? book.key : `/works/${cleanId}`,
    title: book.title || "Untitled",
    author: book.author || "Unknown Author",
    authorKey: book.authorKey,
    coverUrl: book.coverUrl ?? null,
    coverId: book.coverId ?? null,
    isbn: book.isbn ?? null,
    rating: book.rating,
    ratingCount: book.ratingCount,
    readerCount: book.readerCount,
    alreadyReadCount: book.alreadyReadCount,
    currentlyReadingCount: book.currentlyReadingCount,
    wantToReadCount: book.wantToReadCount,
    publishYear: book.publishYear ?? null,
    publishDate: book.publishDate ?? null,
    editionCount: book.editionCount,
    isBorrowable: book.isBorrowable ?? false,
    hasFulltext: book.hasFulltext ?? false,
    subjects: book.subjects ?? [],
    description: book.description ?? "",
  };
}

const EMPTY_BOOKS: BookItem[] = [];
let memorySavedBooks: BookItem[] = EMPTY_BOOKS;
let memoryRawString: string | null = null;

function readSavedBooksFromStorage(): BookItem[] {
  if (typeof window === "undefined") return EMPTY_BOOKS;
  try {
    const raw = localStorage.getItem(SAVED_BOOKS_STORAGE_KEY);
    if (!raw) {
      if (memoryRawString === null && memorySavedBooks === EMPTY_BOOKS) {
        return EMPTY_BOOKS;
      }
      memoryRawString = null;
      memorySavedBooks = EMPTY_BOOKS;
      return EMPTY_BOOKS;
    }
    if (raw === memoryRawString) {
      return memorySavedBooks;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      memoryRawString = raw;
      memorySavedBooks = parsed;
      return memorySavedBooks;
    }
    memoryRawString = null;
    memorySavedBooks = EMPTY_BOOKS;
    return EMPTY_BOOKS;
  } catch {
    return EMPTY_BOOKS;
  }
}

function writeSavedBooksToStorage(books: BookItem[]) {
  if (typeof window === "undefined") return;
  try {
    const raw = JSON.stringify(books);
    memoryRawString = raw;
    memorySavedBooks = books;
    localStorage.setItem(SAVED_BOOKS_STORAGE_KEY, raw);
    window.dispatchEvent(new CustomEvent(SAVED_BOOKS_EVENT, { detail: { books } }));
  } catch (err) {
    console.error("Failed to save books to localStorage", err);
  }
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const handleCustom = () => callback();
  const handleStorage = (e: StorageEvent) => {
    if (e.key === SAVED_BOOKS_STORAGE_KEY || e.key?.startsWith("avenor_saved_")) {
      callback();
    }
  };

  window.addEventListener(SAVED_BOOKS_EVENT, handleCustom);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(SAVED_BOOKS_EVENT, handleCustom);
    window.removeEventListener("storage", handleStorage);
  };
}

function getServerSnapshot(): BookItem[] {
  return EMPTY_BOOKS;
}

export function useSavedBooks() {
  const books = useSyncExternalStore(
    subscribe,
    readSavedBooksFromStorage,
    getServerSnapshot
  );

  const isSaved = useCallback(
    (idOrKey: string): boolean => {
      const id = normalizeId(idOrKey);
      if (!id) return false;
      return books.some((b) => normalizeId(b.id || b.key) === id);
    },
    [books]
  );

  const toggleSave = useCallback(
    (book: BookItem | WorkDetailData): boolean => {
      const cleanId = normalizeId(book.id || book.key);
      if (!cleanId) return false;

      const exists = books.some((b) => normalizeId(b.id || b.key) === cleanId);
      if (exists) {
        const nextBooks = books.filter((b) => normalizeId(b.id || b.key) !== cleanId);
        writeSavedBooksToStorage(nextBooks);
        try {
          localStorage.removeItem(`avenor_saved_${cleanId}`);
        } catch {}
        toast.info(`Removed "${book.title}" from saved books`);
        return false;
      } else {
        const normalized = normalizeBook(book);
        const nextBooks = [normalized, ...books];
        writeSavedBooksToStorage(nextBooks);
        try {
          localStorage.setItem(`avenor_saved_${cleanId}`, "true");
        } catch {}
        toast.success(`Saved "${book.title}" to your library`);
        return true;
      }
    },
    [books]
  );

  const removeBook = useCallback(
    (idOrKey: string) => {
      const cleanId = normalizeId(idOrKey);
      if (!cleanId) return;
      const target = books.find((b) => normalizeId(b.id || b.key) === cleanId);
      const nextBooks = books.filter((b) => normalizeId(b.id || b.key) !== cleanId);
      writeSavedBooksToStorage(nextBooks);
      try {
        localStorage.removeItem(`avenor_saved_${cleanId}`);
      } catch {}
      if (target) {
        toast.info(`Removed "${target.title}" from saved books`);
      }
    },
    [books]
  );

  const clearAll = useCallback(() => {
    for (const b of books) {
      try {
        localStorage.removeItem(`avenor_saved_${normalizeId(b.id || b.key)}`);
      } catch {}
    }
    writeSavedBooksToStorage([]);
    toast.info("Cleared all saved books");
  }, [books]);

  return {
    books,
    isSaved,
    toggleSave,
    removeBook,
    clearAll,
    count: books.length,
  };
}
