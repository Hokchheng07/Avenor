import { getFeaturedAuthors, getFeaturedWork, getShelfBooks, subjects } from "@/Api/home";
import { AuthorsSection } from "@/Components/HomePage/authors-section";
import { FeaturedWorkSection } from "@/Components/HomePage/featured-work";
import { HeroSection } from "@/Components/HomePage/hero-section";
import { ShelfSection } from "@/Components/HomePage/shelf-section";
import { SubjectMarquee } from "@/Components/HomePage/subject-marquee";
import { Footer } from "@/Components/Shared/footer";

export default async function Home() {
  const [books, featured, authors] = await Promise.all([
    getShelfBooks(),
    getFeaturedWork(),
    getFeaturedAuthors(),
  ]);

  return (
    <main className="flex-1 overflow-hidden">
      <HeroSection />
      <SubjectMarquee subjects={subjects} />
      <ShelfSection books={books} />
      <FeaturedWorkSection work={featured} />
      <AuthorsSection authors={authors} />
      <Footer />
    </main>
  );
}
