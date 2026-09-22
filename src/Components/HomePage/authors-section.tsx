import Link from "next/link";
import { SectionHeading } from "./section-heading";

export type FeaturedAuthor = {
  name: string;
  initials: string;
  note: string;
};

export function AuthorsSection({ authors }: { authors: readonly FeaturedAuthor[] }) {
  return (
    <section className="bg-white py-18 dark:bg-secondary sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Follow a thread"
          title="Authors to know better"
          description="Start with one voice, then move naturally through the work around it."
        />
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {authors.map((author, index) => (
            <Link key={author.name} href={`/search?q=${encodeURIComponent(author.name)}`} className="group flex flex-col items-center text-center outline-none focus-visible:ring-2 focus-visible:ring-accent">
              <span className={`grid size-20 place-items-center rounded-full border font-serif text-xl transition-[transform,border-color,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-1 group-hover:border-accent ${index % 2 === 0 ? "border-primary/10 bg-primary text-secondary" : "border-accent/25 bg-accent/12 text-primary"}`}>{author.initials}</span>
              <span className="mt-4 text-sm font-semibold text-primary group-hover:text-accent">{author.name}</span>
              <span className="mt-1 text-xs text-primary/40">{author.note}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
