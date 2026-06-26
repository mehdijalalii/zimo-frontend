'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({
  items,
  accordionLabel,
}: {
  items: FaqItem[];
  accordionLabel: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className="mx-auto max-w-[770px] space-y-4"
      role="region"
      aria-label={accordionLabel}
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="overflow-hidden rounded-[20px] border border-gray-100 bg-white"
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-4 text-right sm:px-6"
              aria-expanded={isOpen}
            >
              <span className="flex-1 text-sm font-semibold text-gray-900 sm:text-base">
                {item.question}
              </span>
              <svg
                className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="border-t border-gray-100 px-4 pb-6 pt-5 sm:px-6">
                <p className="text-sm leading-relaxed text-gray-600">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
