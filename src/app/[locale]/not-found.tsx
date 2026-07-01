import Link from 'next/link';

export const metadata = {
  title: "صفحه یافت نشد | زیمو",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="space-y-6">
        <div className="text-7xl font-bold text-[#841474]">404</div>
        <h1 className="text-2xl font-bold text-gray-900">
          صفحه مورد نظر یافت نشد
        </h1>
        <p className="text-gray-500">
          متأسفانه صفحه‌ای که دنبال آن هستید وجود ندارد یا منتقل شده است.
        </p>
        <Link href="/" className="btn-primary mt-4 inline-flex">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </section>
  );
}
