import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/chrome/SmoothScrollProvider";
import MagneticCursor from "@/components/chrome/MagneticCursor";
import SkipNav from "@/components/chrome/SkipNav";
import Header from "@/components/chrome/Header";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

const displayFont = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rushikeshpowar.dev"),
  title: {
    default: "Rushikesh Powar | Senior Fullstack Engineer & Creative Technologist",
    template: "%s | Rushikesh Powar",
  },
  description:
    "Portfolio of Rushikesh Powar: production-grade GenAI systems, immersive interaction design, and high-performance fullstack engineering.",
  keywords: [
    "Rushikesh Powar",
    "GenAI Engineer",
    "Fullstack Engineer",
    "LangChain",
    "RAG",
    "FastAPI",
    "Next.js",
  ],
  openGraph: {
    title: "Rushikesh Powar Portfolio",
    description:
      "AI-native products, cinematic interfaces, and resilient architecture built for production scale.",
    type: "website",
    url: "https://rushikeshpowar.dev",
    siteName: "Rushikesh Powar",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body className="bg-background font-body text-foreground antialiased">
        <SkipNav />
        <SmoothScrollProvider>
          <Header />
          <MagneticCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
