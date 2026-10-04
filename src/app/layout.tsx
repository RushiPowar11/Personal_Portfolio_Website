import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/chrome/SmoothScrollProvider";
import MagneticCursor from "@/components/chrome/MagneticCursor";
import SkipNav from "@/components/chrome/SkipNav";
import Header from "@/components/chrome/Header";

const siteUrl = "https://rushikeshpowarportfolio.vercel.app";

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
  metadataBase: new URL(siteUrl),
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
    url: siteUrl,
    siteName: "Rushikesh Powar",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Rushikesh Powar - GenAI Engineer and Creative Technologist",
      },
    ],
  },
  alternates: {
    canonical: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Rushikesh Powar Portfolio",
    description:
      "AI-native products, cinematic interfaces, and resilient architecture built for production scale.",
    images: ["/opengraph-image"],
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
