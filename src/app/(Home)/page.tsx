import { getAuthorPathways, getAvailableBooks, getShelfBooks, heroBooks, subjects } from "@/Api/home";
import { AuthorPathwaysSection } from "@/Components/HomePage/author-pathways";
import { AvailableNowSection } from "@/Components/HomePage/available-now";
import { BookSpotlight } from "@/Components/HomePage/book-spotlight";
import { HeroSection } from "@/Components/HomePage/hero-section";
import { ShelfSection } from "@/Components/HomePage/shelf-section";
import { SubjectMarquee } from "@/Components/HomePage/subject-marquee";
import { Footer } from "@/Components/Shared/footer";

export default async function Home() {
  const [books, availableBooks, authors] = await Promise.all([
    getShelfBooks(),
    getAvailableBooks(),
    getAuthorPathways(),
  ]);

  return (
    <main className="flex-1 overflow-hidden">
      <HeroSection books={heroBooks} />
      <SubjectMarquee subjects={subjects} />
      <ShelfSection books={books} />
      <BookSpotlight books={heroBooks} />
      <AvailableNowSection books={availableBooks} />
      <AuthorPathwaysSection authors={authors} />
      <Footer />
    </main>
  );
}
