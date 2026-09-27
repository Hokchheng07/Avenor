import { BookRail } from "@/Components/Books/book-rail";
import type { Book } from "@/Components/Books/book-card";
import { SectionHeading } from "./section-heading";

export function ShelfSection({ books }: { books: readonly Book[] }) {
  return (
    <section id="discover" className="border-b border-primary/10 bg-white py-18 dark:bg-secondary sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Curated by Avenor"
          title="Shelves worth starting from"
          description="Clean covers and just enough detail to choose your next thread—no descriptions competing for attention."
        />
        <BookRail books={books} label="Shelves worth starting from" />
      </div>
    </section>
  );
}
