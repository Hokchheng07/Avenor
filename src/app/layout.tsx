import type { Metadata } from "next";
import { Google_Sans, Freehand, Lora } from "next/font/google";
import { Navbar } from "@/Components/Shared/navbar";
import "./index.css";

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
      className={`${googleSans.variable} ${freehand.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
