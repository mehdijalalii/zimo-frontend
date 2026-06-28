import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/request";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoCta from "@/components/home/DemoCta";
import "../fonts.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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
        <link rel="preload" href="/fonts/iransansx/IRANSansXV.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning style={{ fontFamily: "'IRANSansX', sans-serif" }} className="min-h-screen bg-background text-foreground">
        <Header locale={typedLocale} translations={messages} />
        <main className="pt-16">{children}</main>
        <DemoCta locale={typedLocale} translations={messages} />
        <Footer locale={typedLocale} translations={messages} />
      </body>
    </html>
  );
}
