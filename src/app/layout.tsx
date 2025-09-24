import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import { getSiteData } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DUVELNACHT",
  description: "Duvelnacht: de legendarische fuif van Chiro Balegem in Den Amb8 (Oosterzele). Harde beats, dikke sfeer en frisse bieren.",
  keywords: ["duvelnacht", "chiro balegem", "oosterzele", "den amb8", "fuif", "party", "techno", "speciaalbier", "nachtleven", "elektronische muziek"],
  authors: [{ name: "Duvelnacht" }],
  creator: "Duvelnacht",
  publisher: "Duvelnacht",
  metadataBase: new URL("https://www.duvelnacht.be"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/media/gallery/profiel.jpg", type: "image/jpeg" },
    ],
    shortcut: [
      "/favicon.ico",
    ],
    apple: [
      { url: "/media/gallery/profiel.jpg", sizes: "180x180" },
    ],
  },
  openGraph: {
    title: "DUVELNACHT",
    description: "Duvelnacht: de legendarische fuif van Chiro Balegem in Den Amb8 (Oosterzele). Harde beats, dikke sfeer en frisse bieren.",
    url: "https://www.duvelnacht.be",
    siteName: "Duvelnacht",
    images: [
      {
        url: "/media/gallery/duvelnachtfoto.jpg",
        width: 1200,
        height: 630,
        alt: "Duvelnacht - Where good beers meet bad influence",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DUVELNACHT",
    description: "Duvelnacht: de legendarische fuif van Chiro Balegem in Den Amb8 (Oosterzele). Harde beats, dikke sfeer en frisse bieren.",
    images: ["/media/gallery/duvelnachtfoto.jpg"],
    creator: "@duvelnacht",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteData = getSiteData();
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload hero background image so it renders first */}
        <link rel="preload" as="image" href={siteData.heroPoster} fetchPriority="high" />
      </head>
      <body
        className={`${inter.variable} ${cinzel.variable} bg-grain min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
