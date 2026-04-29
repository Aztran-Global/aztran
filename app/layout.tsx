import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { COMPANY_LEGAL_NAME, SITE_LOGO_PATH } from "@/lib/brand";
import {
  CONTACT_ADDRESS_LINES,
  CONTACT_EMAIL,
  CONTACT_PHONE_TEL,
  CONTACT_SOCIAL,
} from "@/lib/contact-info";
import { absoluteUrl, SITE_URL } from "@/lib/seo";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
} from "@/lib/site-metadata";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    template: "%s | Aztran Global Investments",
  },
  description: SITE_DESCRIPTION,
  keywords: [...SITE_KEYWORDS],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: absoluteUrl("/images/hero-bg.jpg"),
        alt: COMPANY_LEGAL_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [absoluteUrl("/images/hero-bg.jpg")],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: "en-NG",
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      name: SITE_NAME,
      legalName: COMPANY_LEGAL_NAME,
      url: SITE_URL,
      logo: absoluteUrl(SITE_LOGO_PATH),
      image: absoluteUrl("/images/hero-bg.jpg"),
      description: SITE_DESCRIPTION,
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE_TEL,
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT_ADDRESS_LINES[0],
        addressLocality: CONTACT_ADDRESS_LINES[1],
        addressRegion: "Lagos",
        addressCountry: "NG",
      },
      areaServed: ["Nigeria", "Lagos", "Global"],
      knowsAbout: [
        "Asset management",
        "Investment management",
        "Portfolio management",
        "Global markets",
        "Brokerage services",
        "Fixed income investments",
        "Treasury bills",
        "Capital advisory",
      ],
      sameAs: Object.values(CONTACT_SOCIAL),
    },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${inter.variable} min-h-svh flex flex-col bg-[var(--color-offwhite)] font-body text-body text-[var(--color-navy)] antialiased dark:bg-[var(--color-navy)] dark:text-[var(--color-offwhite)]`}
      >
        {/* Third-party scripts must be outside client provider trees to avoid React script-in-client errors */}
        {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
