import type { Metadata } from "next";
import { Google_Sans, Freehand, Lora, Geist } from "next/font/google";
import { Navbar } from "@/components/Shared/navbar";
import "./index.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
});

const freehand = Freehand({
  variable: "--font-freehand",
  weight: "400",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Avenor",
    template: "%s · Avenor",
  },
  description: "Discover books, authors, and stories worth keeping.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", googleSans.variable, freehand.variable, lora.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
