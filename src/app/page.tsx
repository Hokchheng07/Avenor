import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/Components/Shared/footer";
import { subjects, subjectSlug } from "@/data/subjects";

const shelves = [
  { title: "Short, strange, unforgettable", description: "Novels under 200 pages", palette: ["#274333", "#b58247", "#6f4538"] },
  { title: "Classics that still feel alive", description: "Old stories, sharp edges", palette: ["#76513c", "#243b2d", "#be945b"] },
  { title: "A weekend in another world", description: "Immersive literary escapes", palette: ["#a46d3e", "#485e52", "#402f2b"] },
  { title: "Books about books", description: "For incurable readers", palette: ["#21362a", "#8f6446", "#c29a61"] },
] as const;

const recentBooks = [
  { title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", progress: 68, color: "#315245" },
  { title: "Beloved", author: "Toni Morrison", progress: 34, color: "#8b563e" },
  { title: "The Waves", author: "Virginia Woolf", progress: 12, color: "#b3874e" },
] as const;

const authors = [
  { name: "Toni Morrison", initials: "TM" },
  { name: "James Baldwin", initials: "JB" },
  { name: "Ursula Le Guin", initials: "UL" },
  { name: "Virginia Woolf", initials: "VW" },
] as const;

function SearchIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 10h11M11 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionHeading({ eyebrow, title, description, href, linkLabel }: {
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6">
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-accent uppercase">{eyebrow}</p>
        <h2 className="font-serif text-3xl leading-tight tracking-[-0.025em] text-primary sm:text-4xl">{title}</h2>
        {description ? <p className="mt-3 max-w-2xl text-sm leading-6 text-primary/55">{description}</p> : null}
      </div>
      {href && linkLabel ? (
        <Link href={href} className="hidden shrink-0 items-center gap-2 border-b border-accent/40 pb-1 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent sm:flex">
          {linkLabel} <ArrowIcon />
        </Link>
      ) : null}
    </div>
  );
}

function BookStack({ palette }: { palette: readonly string[] }) {
  return (
    <div className="flex h-48 items-end justify-center gap-2 overflow-hidden rounded-2xl bg-primary/[0.035] px-6 pt-6 dark:bg-white/[0.035]">
      {palette.map((color, index) => (
        <div
          key={color}
          className="relative h-[82%] flex-1 overflow-hidden rounded-t-sm border border-black/10 shadow-[8px_4px_18px_rgba(18,25,19,0.12)]"
          style={{ backgroundColor: color, transform: `translateY(${index === 1 ? 0 : 12}px)` }}
        >
          <span className="absolute inset-x-2 top-3 h-px bg-white/30" />
          <span className="absolute inset-x-2 top-6 h-px bg-white/15" />
          <span className="absolute bottom-3 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full border border-white/30" />
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex-1 overflow-hidden">
      <section id="search" className="relative isolate min-h-[620px] overflow-hidden bg-[#172019] text-white">
        <Image
          src="/Images/avenor-hero.png"
          alt="A quiet green library with books and botanical details"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(11,20,14,.9)_0%,rgba(14,25,18,.72)_46%,rgba(11,18,13,.3)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(8,15,10,.58)_0%,transparent_58%)]" />

        <div className="mx-auto flex min-h-[620px] w-full max-w-7xl items-center px-5 py-20 sm:px-8 lg:px-10">
          <div className="w-full max-w-3xl">
            <p className="mb-5 text-xs font-semibold tracking-[0.24em] text-[#e1b777] uppercase sm:text-sm">
              Every book on Open Library, easier to choose from
            </p>
            <h1 className="max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl">
              Find the book that meets you where you are.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
              Search millions of stories, follow a curious thread, or start with a shelf made for the mood you are in.
            </p>

            <form action="/search" className="mt-9 flex max-w-2xl flex-col gap-3 sm:flex-row">
              <label className="flex h-14 flex-1 items-center gap-3 rounded-full border border-white/35 bg-white/95 px-5 text-[#223023] shadow-2xl shadow-black/15 focus-within:ring-2 focus-within:ring-[#d7aa69]">
                <span className="sr-only">Search books</span>
                <SearchIcon />
                <input type="search" name="q" placeholder="Title, author, subject…" className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-[#223023]/50" />
              </label>
              <button type="submit" className="h-14 rounded-full bg-[#d1a15f] px-7 text-sm font-bold text-[#172019] shadow-xl shadow-black/20 transition-colors hover:bg-[#e0b878] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Search library
              </button>
            </form>

            <div className="mt-5 flex flex-wrap items-center gap-2.5 text-sm">
              <span className="mr-1 text-white/55">Start here:</span>
              {["Short reads", "Pre-1930", "Borrowable now", "First novels"].map((label) => (
                <Link key={label} href={`/search?q=${encodeURIComponent(label)}`} className="rounded-full border border-white/25 bg-black/10 px-3.5 py-1.5 text-white/80 backdrop-blur-sm transition-colors hover:border-white/55 hover:bg-white/10 hover:text-white">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="border-b border-primary/10 bg-secondary py-18 sm:py-22">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Explore the catalog" title="Browse by subject" description="Begin broadly, then follow the details that catch your attention." href="/subjects" linkLabel="All subjects" />

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {subjects.map((subject, index) => (
              <Link
                key={subject.name}
                href={`/subjects/${subjectSlug(subject.name)}`}
                className="group flex min-h-34 flex-col justify-between rounded-[1.25rem_0.45rem_1.25rem_0.45rem] border border-primary/15 bg-white p-4 outline-none transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_15px_35px_rgba(34,48,35,0.08)] focus-visible:ring-2 focus-visible:ring-accent dark:bg-white/[0.035]"
              >
                <span className="text-xs text-primary/35">{subject.index}</span>
                <div>
                  <h3 className="font-serif text-lg text-primary group-hover:text-accent">{subject.name}</h3>
                  <p className="mt-1 text-xs text-primary/40">{subject.count} works</p>
                </div>
                <span className={`mt-4 h-px bg-primary/15 ${index % 2 === 0 ? "w-10" : "w-16"}`} />
              </Link>
            ))}
          </div>

          <Link href="/subjects" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent sm:hidden">
            All subjects <ArrowIcon />
          </Link>
        </div>
      </section>

      <section id="discover" className="border-b border-primary/10 bg-white py-18 sm:py-22 dark:bg-secondary">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Curated by Avenor" title="Shelves worth starting from" description="Small, purposeful collections for the days when a blank search box feels like too much." href="/search" linkLabel="Discover more" />

          <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {shelves.map((shelf) => (
              <Link key={shelf.title} href="/search" className="group w-[78vw] max-w-72 shrink-0 snap-start sm:w-auto sm:max-w-none">
                <BookStack palette={shelf.palette} />
                <h3 className="mt-5 font-serif text-xl leading-6 text-primary transition-colors group-hover:text-accent">{shelf.title}</h3>
                <p className="mt-2 text-sm text-primary/45">{shelf.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="saved" className="bg-secondary py-18 sm:py-22">
        <div className="mx-auto grid w-full max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-20 lg:px-10">
          <div>
            <SectionHeading eyebrow="Your reading" title="Pick up where you left off" description="Saved locally in this browser. No account wall, no interruption." />
            <div className="divide-y divide-primary/10 border-y border-primary/10">
              {recentBooks.map((book) => (
                <div key={book.title} className="flex items-center gap-4 py-4 sm:gap-5">
                  <div className="h-18 w-12 shrink-0 rounded-[2px_5px_5px_2px] border border-black/10 shadow-md" style={{ backgroundColor: book.color }} />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-serif text-base text-primary sm:text-lg">{book.title}</h3>
                    <p className="mt-1 text-xs text-primary/45">{book.author}</p>
                    <div className="mt-3 h-1 w-full max-w-60 overflow-hidden rounded-full bg-primary/10">
                      <span className="block h-full rounded-full bg-accent" style={{ width: `${book.progress}%` }} />
                    </div>
                  </div>
                  <Link href="/favorites" className="text-xs font-bold text-accent hover:text-primary sm:text-sm">Resume</Link>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Follow a thread" title="Authors to know better" description="Move from one voice to the body of work around it." />
            <div className="grid grid-cols-2 gap-3">
              {authors.map((author, index) => (
                <Link key={author.name} href="/search" className="group flex items-center gap-3 rounded-2xl border border-primary/10 bg-white p-3.5 transition-colors hover:border-accent/50 dark:bg-white/[0.035]">
                  <span className={`grid size-11 shrink-0 place-items-center rounded-full font-serif text-sm ${index % 2 === 0 ? "bg-primary text-secondary" : "bg-accent/18 text-primary"}`}>
                    {author.initials}
                  </span>
                  <span className="text-sm font-semibold leading-5 text-primary/75 group-hover:text-primary">{author.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
