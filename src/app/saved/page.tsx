import { Metadata } from "next";
import { SavedPageContent } from "@/Components/Saved/saved-page-content";
import { Footer } from "@/Components/Shared/footer";

export const metadata: Metadata = {
  title: "Saved Books",
  description: "View and manage your personal saved books collection on Avenor.",
  alternates: {
    canonical: "/saved",
  },
  openGraph: {
    title: "Saved Books · Avenor",
    description: "View and manage your personal saved books collection on Avenor.",
    url: "/saved",
  },
};

export default function SavedPage() {
  return (
    <main className="flex-1 bg-secondary min-h-screen overflow-x-clip">
      <SavedPageContent />
      <Footer />
    </main>
  );
}
