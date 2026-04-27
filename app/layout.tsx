import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/src/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.sale.metadata.title,
  description: siteConfig.sale.metadata.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.sale.metadata.title,
    description: siteConfig.sale.metadata.description,
    images: [
      {
        url: siteConfig.sale.metadata.ogImage,
        width: 1024,
        height: 1024,
        alt: siteConfig.sale.productName,
      },
    ],
    locale: "es_AR",
    siteName: siteConfig.sale.productName,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.sale.metadata.title,
    description: siteConfig.sale.metadata.description,
    images: [siteConfig.sale.metadata.ogImage],
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
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col">{children}</body>
    </html>
  );
}
