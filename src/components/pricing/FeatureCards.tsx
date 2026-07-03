'use client';

import { motion } from 'framer-motion';
import type { Locale } from '@/i18n/config';

type FeatureCard = {
  title: string;
  description: string;
};

type FeatureCardsTranslations = {
  title: string;
  title_bold: string;
  cards: FeatureCard[];
};

export default function FeatureCards({
  locale,
  translations,
}: {
  locale: Locale;
  translations: FeatureCardsTranslations;
}) {
  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  return (
    <section className="bg-gray-900 py-20 lg:py-24 mt-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#841474]">
            {translations.title}{' '}
            <span className="text-white">{translations.title_bold}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {translations.cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`group relative border border-white rounded p-6 lg:p-8 transition-colors hover:border-[#841474] hover:bg-[#841474] cursor-default ${
                dir === 'rtl' ? 'text-right' : 'text-left'
              }`}
            >
              {/* Title (visible by default) */}
              <h3 className="text-lg lg:text-xl font-bold text-white transition-opacity group-hover:opacity-0 group-hover:absolute group-hover:inset-0 group-hover:flex group-hover:items-center group-hover:p-6 lg:group-hover:p-8">
                {card.title}
              </h3>

              {/* Description (visible on hover) */}
              <p className="text-sm leading-relaxed text-gray-900 opacity-0 transition-opacity group-hover:opacity-100">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
