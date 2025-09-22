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
  description: "Eén nacht. Veel bieren. Onheilige beats. Berlijns meest duivelse nachtelijke viering van geluid en sterke ales.",
  keywords: ["duvelnacht", "berlijn", "techno", "speciaalbier", "nachtleven", "elektronische muziek", "dark techno", "industrial"],
  authors: [{ name: "Duvelnacht" }],
  creator: "Duvelnacht",
  publisher: "Duvelnacht",
  metadataBase: new URL("https://duvelnacht.com"),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "DUVELNACHT",
    description: "Eén nacht. Veel bieren. Onheilige beats. Sluit je aan bij Berlijns duivelse nachtelijke viering.",
    url: "https://duvelnacht.com",
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
    description: "Eén nacht. Veel bieren. Onheilige beats. Berlijns duivelse nachtelijke viering.",
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
