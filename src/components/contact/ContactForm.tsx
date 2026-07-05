'use client';

import { useState } from 'react';
import { submitContact } from '@/lib/api';

interface ContactFormProps {
  translations: {
    name_label: string;
    name_placeholder: string;
    phone_label: string;
    phone_placeholder: string;
    salon_label: string;
    salon_placeholder: string;
    message_label: string;
    message_placeholder: string;
    submit: string;
  };
}

export default function ContactForm({ translations: t }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = (data.get('name') as string || '').trim();
    const phone = (data.get('phone') as string || '').trim();
    const salon = (data.get('salon') as string || '').trim();
    const message = (data.get('message') as string || '').trim();

    if (!name || !phone || !message) return;

    setLoading(true);
    setError(null);

    try {
      await submitContact({
        name,
        email_or_phone: phone,
        subject: salon || undefined,
        message,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در ارسال پیام');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[28px] border border-[var(--color-zimo-border)] bg-white p-6 shadow-[var(--shadow-zimo-card)] md:p-8">
      {submitted ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-[#841474]/10 text-[#841474]">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">پیام شما ارسال شد</h3>
          <p className="mt-2 text-gray-600">تیم زیمو در سریع‌ترین زمان پاسخگوی شماست.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</div>
          )}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-gray-700">{t.name_label}</label>
            <input name="name" type="text" placeholder={t.name_placeholder} required className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#841474] focus:ring-2 focus:ring-[#841474]/10" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-bold text-gray-700">{t.phone_label}</label>
            <input name="phone" type="tel" placeholder={t.phone_placeholder} required dir="ltr" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#841474] focus:ring-2 focus:ring-[#841474]/10" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-bold text-gray-700">{t.salon_label}</label>
            <input name="salon" type="text" placeholder={t.salon_placeholder} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#841474] focus:ring-2 focus:ring-[#841474]/10" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-bold text-gray-700">{t.message_label}</label>
            <textarea name="message" rows={4} placeholder={t.message_placeholder} required className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#841474] focus:ring-2 focus:ring-[#841474]/10" />
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-xl bg-[#841474] py-3.5 text-sm font-bold text-white transition hover:bg-[#6b105d] disabled:opacity-50">
            {loading ? '...' : t.submit}
          </button>
        </form>
      )}
    </div>
  );
}
