'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="space-y-6">
        <div className="text-7xl font-bold text-[#841474]">!</div>
        <h1 className="text-2xl font-bold text-gray-900">
          مشکلی پیش آمد
        </h1>
        <p className="text-gray-500">
          متأسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.
        </p>
        <div className="flex gap-4 justify-center">
          <button onClick={reset} className="btn-primary">
            تلاش مجدد
          </button>
          <Link href="/" className="btn-secondary">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </section>
  );
}
