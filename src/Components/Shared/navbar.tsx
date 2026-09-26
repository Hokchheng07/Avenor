import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Discover", href: "/#discover" },
  { label: "Categories", href: "/#categories" },
  { label: "About", href: "/about" },
] as const;

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-white/90 backdrop-blur-xl dark:bg-secondary/90">
      <nav
        aria-label="Primary navigation"
        className="relative mx-auto flex h-18 w-full max-w-7xl items-center gap-8 px-5 sm:px-8 lg:px-10"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 rounded-md text-primary outline-none transition-opacity hover:opacity-75 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-offset-secondary"
          aria-label="Avenor home"
        >
          <Image
            src="/Brand/AvenorLogo.png"
            alt=""
            width={2172}
            height={724}
            priority
            className="h-10 w-auto object-contain dark:brightness-0 dark:invert sm:h-11"
          />
        </Link>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-full px-4 py-2 text-sm font-medium text-primary/70 outline-none transition-colors hover:bg-primary/6 hover:text-primary focus-visible:ring-2 focus-visible:ring-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link
            href="/#search"
            className="grid size-10 place-items-center rounded-full text-primary/70 outline-none transition-colors hover:bg-primary/6 hover:text-primary focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Search books"
          >
            <SearchIcon />
          </Link>
          <Link
            href="/#saved"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-primary/15 px-4 text-sm font-semibold text-primary outline-none transition-colors hover:border-primary/30 hover:bg-primary/6 focus-visible:ring-2 focus-visible:ring-accent"
          >
            <HeartIcon />
            Saved
          </Link>
        </div>

        <details className="group relative ml-auto md:hidden">
          <summary className="grid size-10 cursor-pointer list-none place-items-center rounded-full border border-primary/15 text-primary outline-none transition-colors hover:bg-primary/6 focus-visible:ring-2 focus-visible:ring-accent [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Open navigation menu</span>
            <span className="relative block h-4 w-5">
              <span className="absolute left-0 top-0 h-px w-5 bg-current transition-transform group-open:translate-y-[7px] group-open:rotate-45" />
              <span className="absolute left-0 top-[7px] h-px w-5 bg-current transition-opacity group-open:opacity-0" />
              <span className="absolute left-0 top-[14px] h-px w-5 bg-current transition-transform group-open:-translate-y-[7px] group-open:-rotate-45" />
            </span>
          </summary>

          <div className="absolute right-0 top-13 w-64 rounded-2xl border border-primary/10 bg-white p-2 shadow-[0_20px_60px_rgba(34,48,35,0.14)] dark:bg-secondary">
            <ul className="flex flex-col">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-primary/75 outline-none transition-colors hover:bg-primary/6 hover:text-primary focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-t border-primary/10 pt-2">
              <Link
                href="/#search"
                className="flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-medium text-primary/75 hover:bg-primary/6 hover:text-primary"
              >
                <SearchIcon /> Search
              </Link>
              <ThemeToggle />
              <Link
                href="/#saved"
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-3 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 dark:text-secondary"
              >
                <HeartIcon /> Saved
              </Link>
            </div>
          </div>
        </details>
      </nav>
    </header>
  );
}
