import Image from "next/image";
import ScrollReveal from "@/Components/lightswind/scroll-reveal";
import { SearchIcon } from "./icons";

export function HeroSection() {
  return (
    <section id="search" className="relative isolate min-h-[600px] overflow-hidden bg-[#172019] text-white sm:min-h-[650px]">
      <Image src="/Images/avenor-hero.png" alt="A quiet green library with books and botanical details" fill priority sizes="100vw" className="hero-backdrop -z-20 object-cover object-center" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(11,20,14,.92)_0%,rgba(14,25,18,.72)_50%,rgba(11,18,13,.3)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(8,15,10,.62)_0%,transparent_62%)]" />

      <div className="mx-auto flex min-h-[600px] w-full max-w-7xl items-center px-5 py-18 sm:min-h-[650px] sm:px-8 lg:px-10">
        <div className="w-full max-w-5xl">
          <h1 className="max-w-5xl font-serif text-[3.25rem] leading-[0.98] tracking-[-0.045em] text-white sm:text-7xl lg:text-[5.1rem]">
            <span className="hero-line block">Find the book that meets</span>
            <span className="hero-line hero-line--second block">you where you are.</span>
          </h1>
          <ScrollReveal size="sm" baseOpacity={0} threshold={0.1} containerClassName="mt-7 max-w-3xl" textClassName="!text-base !font-normal !leading-7 !text-white/72 sm:!text-xl sm:!leading-9">
            Search millions of stories, follow a curious thread, or start with a shelf made for the mood you are in.
          </ScrollReveal>

          <form action="/search" className="hero-search mt-11 flex max-w-3xl flex-col gap-3 sm:mt-14 sm:flex-row">
            <label className="flex h-14 flex-1 items-center gap-3 rounded-full border border-white/35 bg-white/95 px-5 text-[#223023] shadow-2xl shadow-black/15 focus-within:ring-2 focus-within:ring-[#d7aa69]">
              <span className="sr-only">Search books</span>
              <SearchIcon />
              <input type="search" name="q" placeholder="Title, author, subject…" className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-[#223023]/50" />
            </label>
            <button type="submit" className="h-14 rounded-full bg-[#d1a15f] px-8 text-sm font-bold text-[#172019] shadow-xl shadow-black/20 transition-colors duration-150 hover:bg-[#e0b878] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Search library</button>
          </form>
        </div>
      </div>
    </section>
  );
}
