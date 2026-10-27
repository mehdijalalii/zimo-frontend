import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
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

  return {
    title: meta.default_title,
    description: meta.default_description,
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


  return (
    <html lang={typedLocale} dir={dir}>
      <head>
        <meta name="enamad" content="23808545" />
        <link rel="preload" href="/fonts/iransansx/IRANSansXV.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <Script id="google-analytics" strategy="lazyOnload">{`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-3Y9SHF971S');
var analyticsScript = document.createElement('script');
analyticsScript.async = true;
analyticsScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-3Y9SHF971S';
document.head.appendChild(analyticsScript);`}</Script>
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
