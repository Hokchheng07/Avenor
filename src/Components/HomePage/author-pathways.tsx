import Link from "next/link";
import { AuthorAvatar } from "./author-avatar";

export type AuthorPathway = {
  key: string;
  name: string;
  initials: string;
  workCount: number;
  topWork: string;
  photoUrl?: string;
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 20 20" fill="none">
      <path d="m7.5 4.5 5 5.5-5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AuthorPathwaysSection({ authors }: { authors: readonly AuthorPathway[] }) {
  return (
    <section id="authors" aria-labelledby="pathways-title" className="relative overflow-hidden bg-white py-18 dark:bg-secondary sm:py-24">
      <div aria-hidden="true" className="absolute inset-x-0 top-[14.5rem] hidden h-px bg-gradient-to-r from-transparent via-accent/28 to-transparent lg:block" />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-accent uppercase">Author pathways</p>
          <h2 id="pathways-title" className="mt-3 font-serif text-4xl leading-[1.04] tracking-[-0.035em] text-primary sm:text-5xl">
            Choose a voice, then follow the work
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-primary/58 sm:text-base">
            Begin with a defining title and move outward through the writer’s complete Open Library catalog.
          </p>
        </div>

        <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author, index) => (
            <li key={author.name} className="relative">
              <Link
                href={`https://openlibrary.org/authors/${author.key}`}
                aria-label={`Explore works by ${author.name}`}
                className="group flex h-full min-h-52 flex-col rounded-3xl border border-primary/10 bg-secondary p-6 outline-none transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_18px_50px_rgba(34,48,35,0.08)] focus-visible:ring-2 focus-visible:ring-accent dark:bg-white/[0.035]"
              >
                <div className="flex items-start justify-between gap-4">
                  <AuthorAvatar name={author.name} initials={author.initials} photoUrl={author.photoUrl} accent={index % 2 !== 0} />
                  <span className="font-serif text-sm text-primary/28">0{index + 1}</span>
                </div>

                <div className="mt-7 flex flex-1 flex-col">
                  <h3 className="font-serif text-2xl leading-tight text-primary transition-colors group-hover:text-accent">{author.name}</h3>
                  <p className="mt-2 text-xs text-primary/45">{author.workCount.toLocaleString()} works in the catalog</p>
                  <div className="mt-auto flex items-end justify-between gap-4 border-t border-primary/8 pt-5">
                    <div className="min-w-0">
                      <p className="text-[0.62rem] font-bold tracking-[0.14em] text-accent uppercase">Start here</p>
                      <p className="mt-1 truncate text-sm font-semibold text-primary">{author.topWork}</p>
                    </div>
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-primary/12 text-primary transition-colors group-hover:border-accent group-hover:text-accent">
                      <ArrowIcon />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
