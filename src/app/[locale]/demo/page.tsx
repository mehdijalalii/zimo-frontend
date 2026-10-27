import type { Metadata } from 'next';
import { getMessages } from '@/i18n/request';
import type { Locale } from '@/i18n/config';
import DemoForm from '@/components/demo/DemoForm';

import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const messages = getMessages(typedLocale);
  const meta = messages.meta;

  return pageMetadata(typedLocale, "/demo", meta.demo);
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const messages = getMessages(typedLocale);

  return (
    <section className="section-block pt-32">
      <div className="mx-auto max-w-6xl">
        {/* Hero */}
        <div className="mb-16 text-center md:mb-20">
          <p className="section-kicker mx-auto mb-4">
            {messages.demo_page.kicker}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#841474]">
            {messages.demo_page.title}
          </h1>
          <p className="section-lead section-lead--center mx-auto mt-3 max-w-2xl">
            {messages.demo_page.description}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* Left: Steps */}
          <div>
            <h2 className="section-heading">{messages.demo_form.heading}</h2>
            <p className="section-copy">{messages.demo_form.lead}</p>

            <ul className="mt-8 space-y-6">
              {messages.demo_form.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#841474]/10 text-xl text-[#841474]">
                    {step.number}
                  </span>
                  <div>
                    <strong className="block text-base text-gray-900">
                      {step.title}
                    </strong>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Form */}
          <DemoForm translations={messages.demo_form.form} />
        </div>
      </div>
    </section>
  );
}
