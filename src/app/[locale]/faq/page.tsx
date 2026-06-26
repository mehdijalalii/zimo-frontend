import { getMessages } from '@/i18n/request';
import type { Locale } from '@/i18n/config';
import FaqAccordion from '@/components/faq/FaqAccordion';

export default async function FaqPage({
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
        <div className="mb-12 text-center md:mb-16">
          <p className="section-kicker mx-auto mb-4">
            {messages.faq_page.kicker}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#841474]">
            {messages.faq_page.title}
          </h1>
          <p className="section-lead section-lead--center mx-auto mt-3 max-w-2xl">
            {messages.faq_page.description}
          </p>
        </div>

        <FaqAccordion
          items={messages.faq_page.items}
          accordionLabel={messages.faq_page.accordion_label}
        />
      </div>
    </section>
  );
}
