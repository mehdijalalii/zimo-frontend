'use client';

import { useState } from 'react';
import { submitDemo } from '@/lib/api';

interface DemoFormProps {
  translations: {
    manager_name_label: string;
    manager_name_placeholder: string;
    phone_label: string;
    phone_placeholder: string;
    salon_label: string;
    salon_placeholder: string;
    branches_label: string;
    branches_options: Record<string, string>;
    plan_label: string;
    plan_options: Record<string, string>;
    message_label: string;
    message_placeholder: string;
    submit: string;
    disclaimer: string;
  };
}

export default function DemoForm({ translations: t }: DemoFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await submitDemo({
        contact_name: formData.get('contact_name') as string,
        contact_phone: formData.get('contact_phone') as string,
        brand_name: formData.get('brand_name') as string,
        branches_count: formData.get('branches') as string,
        plan_interest: formData.get('plan_interest') as string,
        message: (formData.get('message') as string) || undefined,
      });
      setSubmitted(true);
    } catch {
      setError('خطا در ثبت درخواست. لطفاً دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-[28px] border border-[var(--color-zimo-border)] bg-white p-8 shadow-[var(--shadow-zimo-card)]">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-[#841474]/10 text-[#841474]">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">درخواست دمو ثبت شد</h3>
          <p className="mt-2 text-gray-600">کارشناسان ما حداکثر تا ۲۴ ساعت کاری با شما تماس می‌گیرند.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[28px] border border-[var(--color-zimo-border)] bg-white p-6 shadow-[var(--shadow-zimo-card)] md:p-8">
      <div className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">{t.manager_name_label}</label>
            <input name="contact_name" type="text" placeholder={t.manager_name_placeholder} required className="zimo-input" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">{t.phone_label}</label>
            <input name="contact_phone" type="tel" placeholder={t.phone_placeholder} required dir="ltr" className="zimo-input text-left" />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">{t.salon_label}</label>
          <input name="brand_name" type="text" placeholder={t.salon_placeholder} required className="zimo-input" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">{t.branches_label}</label>
          <select name="branches" className="zimo-input">
            <option value="1">{t.branches_options['1']}</option>
            <option value="2-3">{t.branches_options['2-3']}</option>
            <option value="3+">{t.branches_options['3+']}</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">{t.plan_label}</label>
          <select name="plan_interest" className="zimo-input">
            <option value="unsure">{t.plan_options.unsure}</option>
            <option value="starter">{t.plan_options.starter}</option>
            <option value="professional">{t.plan_options.professional}</option>
            <option value="enterprise_custom">{t.plan_options.enterprise_custom}</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">{t.message_label}</label>
          <textarea name="message" rows={3} placeholder={t.message_placeholder} className="zimo-textarea resize-none" />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-4 text-base shadow-lg shadow-[#841474]/20 hover:shadow-[#841474]/40 transition-all disabled:opacity-50"
        >
          {loading ? 'در حال ثبت...' : t.submit}
        </button>

        <p className="text-center text-xs text-gray-500">{t.disclaimer}</p>
      </div>
    </form>
  );
}
