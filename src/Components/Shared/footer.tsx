import Image from "next/image";
import Link from "next/link";

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Discover books", href: "/#discover" },
      { label: "Browse subjects", href: "/#categories" },
      { label: "Saved books", href: "/#saved" },
      { label: "Search library", href: "/#search" },
    ],
  },
  {
    title: "Avenor",
    links: [
      { label: "About us", href: "/#about" },
      { label: "How it works", href: "/#about" },
      { label: "Our purpose", href: "/#about" },
      { label: "GitHub", href: "https://github.com/Hokchheng07/Avenor" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Search help", href: "/#search" },
      { label: "Data sources", href: "https://openlibrary.org/developers/api" },
      {
        label: "Report a problem",
        href: "https://github.com/Hokchheng07/Avenor/issues",
      },
      { label: "Open Library", href: "https://openlibrary.org" },
    ],
  },
] as const;

function Scribble({ color = "accent" }: { color?: "accent" | "primary" }) {
  return (
    <svg
      aria-hidden="true"
      className={`mt-2 h-2 w-30 ${color === "accent" ? "text-accent" : "text-primary/65"}`}
      viewBox="0 0 120 8"
      fill="none"
    >
      <path
        d="M1 5 12 1.5l10 5L34 2l11 4 13-4.5L69 6l12-4 13 4.5 12-4 13 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <>
      <Image
        src="/Brand/GitHub_light_dark/GitHub_light.svg"
        alt=""
        width={1024}
        height={1024}
        className="size-5 dark:hidden"
      />
      <Image
        src="/Brand/GitHub_light_dark/GitHub_dark.svg"
        alt=""
        width={1024}
        height={1024}
        className="hidden size-5 dark:block"
      />
    </>
  );
}

export function Footer() {
  return (
    <footer
      id="about"
      className="relative overflow-hidden border-t border-primary/10 bg-white text-primary dark:bg-secondary"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-45 [background-image:radial-gradient(circle,rgba(187,139,76,.35)_1px,transparent_1.2px)] [background-size:27px_27px] dark:opacity-15"
      />
      <div className="relative mx-auto w-full max-w-7xl px-5 pt-16 pb-7 sm:px-8 lg:px-10 lg:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.25fr_.72fr_.72fr_.78fr_1.25fr] lg:gap-10">
          <div className="sm:col-span-2 lg:-mt-2 lg:col-span-1">
            <Image
              src="/Brand/AvenorLogo.png"
              alt="Avenor"
              width={2172}
              height={824}
              className="h-[5.2rem] w-auto object-contain dark:brightness-0 dark:invert"
            />
            <p className="mt-6 max-w-xs text-sm leading-7 text-primary/60">
              A calmer way to discover, choose, and keep track of books worth
              your time.
            </p>
            <div className="mt-6 flex gap-3" aria-label="Avenor social links">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Avenor on Facebook"
                className="grid size-10 place-items-center rounded-full border border-primary/15 bg-white transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md dark:bg-white/5"
              >
                <Image
                  src="/Brand/facebook-icon.svg"
                  alt=""
                  width={48}
                  height={48}
                  className="size-5"
                />
              </a>
              <a
                href="https://www.google.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Avenor on Google"
                className="grid size-10 place-items-center rounded-full border border-primary/15 bg-white transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md dark:bg-white/5"
              >
                <Image
                  src="/Brand/google (1).svg"
                  alt=""
                  width={48}
                  height={48}
                  className="size-5"
                />
              </a>
              <a
                href="https://github.com/Hokchheng07/Avenor"
                target="_blank"
                rel="noreferrer"
                aria-label="Avenor on GitHub"
                className="grid size-10 place-items-center rounded-full border border-primary/15 bg-white transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md dark:bg-white/5"
              >
                <GitHubIcon />
              </a>
            </div>
          </div>

          {footerGroups.map((group, index) => (
            <nav key={group.title} aria-label={`${group.title} links`}>
              <h2 className="font-serif text-xl font-semibold text-primary">
                {group.title}
              </h2>
              <Scribble color={index === 1 ? "primary" : "accent"} />
              <ul className="mt-6 space-y-4 text-sm text-primary/60">
                {group.links.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer" : undefined}
                        className="transition-colors hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}

          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="font-serif text-xl font-semibold text-primary">
              Supported and Organized By
            </h2>
            <Scribble />
            <Image
              src="/Brand/ISTADLogo(LightMode).png"
              alt="Institute of Science and Technology Advanced Development"
              width={12375}
              height={4500}
              className="mt-5 h-25 w-auto max-w-full object-contain object-left dark:hidden"
            />
            <Image
              src="/Brand/ISTADLogo(DarkMode).png"
              alt="Institute of Science and Technology Advanced Development"
              width={12471}
              height={4500}
              className="mt-5 hidden h-20 w-auto max-w-full object-contain object-left dark:block"
            />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-dashed border-accent/45 pt-7 text-xs text-primary/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Avenor. All rights reserved.</p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-primary">
              Cookie Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
