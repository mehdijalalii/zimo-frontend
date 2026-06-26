import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "زیمو | CRM سالن زیبایی",
  description: "زیمو CRM فارسی برای مدیریت نوبت، شعبه، پرسنل، تسویه و باشگاه زیباجویان سالن‌های زیبایی است.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
