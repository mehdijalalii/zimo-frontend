import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/request";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoCta from "@/components/home/DemoCta";
import Chatwoot from "@/components/Chatwoot";
import "../fonts.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const SITE_URL = "https://zimo.beauty";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const typedLocale = locale as Locale;
  const messages = getMessages(typedLocale);
  const meta = messages.meta;

  const basePath = typedLocale === "fa" ? "" : `/${typedLocale}`;
  const canonical = `${SITE_URL}${basePath || "/"}`;

  const ogImages = locales.map((loc) => ({
    url: `${SITE_URL}/images/landing/zimo-dashboard-${loc}.webp`,
    alt: meta.home.title,
    width: 1200,
    height: 630,
  }));

  return {
    metadataBase: new URL(SITE_URL),
    title: meta.default_title,
    description: meta.default_description,
    alternates: {
      canonical,
      languages: {
        fa: `${SITE_URL}/`,
        en: `${SITE_URL}/en`,
        tr: `${SITE_URL}/tr`,
      },
    },
    openGraph: {
      type: "website",
      locale: typedLocale === "fa" ? "fa_IR" : typedLocale === "en" ? "en_US" : "tr_TR",
      siteName: "Zimo CRM",
      title: meta.home.title,
      description: meta.home.description,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.home.title,
      description: meta.home.description,
      images: ogImages.map((img) => img.url),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const messages = getMessages(typedLocale);
  const dir = typedLocale === "fa" ? "rtl" : "ltr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Zimo CRM",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: messages.meta.default_description,
    url: SITE_URL,
    inLanguage: typedLocale,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "IRR",
    },
    provider: {
      "@type": "Organization",
      name: "Zimo",
      url: SITE_URL,
    },
  };

  return (
    <html lang={typedLocale} dir={dir}>
      <head>
        <meta name="enamad" content="23808545" />
        <link rel="preload" href="/fonts/iransansx/IRANSansXV.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning style={{ fontFamily: "'IRANSansX', sans-serif" }} className="min-h-screen bg-background text-foreground">
        <Header locale={typedLocale} translations={messages} />
        <main className="pt-16 overflow-x-hidden">{children}</main>
        <DemoCta locale={typedLocale} translations={messages} />
        <Footer locale={typedLocale} translations={messages} />
        <Chatwoot locale={typedLocale} />
      </body>
    </html>
  );
}
