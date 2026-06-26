'use client';

import { useEffect } from 'react';

export default function LoginPage() {
  useEffect(() => {
    window.location.href = 'https://zimo.beauty/login';
  }, []);

  return (
    <section className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#841474] border-t-transparent" />
        <p className="text-sm text-gray-500">Redirecting...</p>
      </div>
    </section>
  );
}
