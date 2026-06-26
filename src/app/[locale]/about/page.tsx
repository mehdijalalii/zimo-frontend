import { getMessages } from '@/i18n/request';
import type { Locale } from '@/i18n/config';
import { getDashboardImage } from '@/lib/utils';

export default async function AboutPage({
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
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="section-kicker">{messages.about_page.kicker}</p>
            <h1 className="page-title">
              {messages.about_page.title}
            </h1>
            <p className="section-lead">
              {messages.about_page.description}
            </p>
            <div className="space-y-4 text-lg leading-relaxed text-gray-600">
              <p>{messages.about.story_1}</p>
              <p>{messages.about.story_2}</p>
            </div>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-[#841474]">
                  {messages.about.stat_1_value}
                </div>
                <div className="text-sm text-gray-500">
                  {messages.about.stat_1_label}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-[#841474]">
                  {messages.about.stat_2_value}
                </div>
                <div className="text-sm text-gray-500">
                  {messages.about.stat_2_label}
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 overflow-hidden rounded-[2.5rem] border-8 border-white bg-white shadow-[0_32px_64px_-16px_rgba(132,20,116,0.12)]">
              <img
                src={getDashboardImage(typedLocale)}
                alt={messages.about.image_alt}
                className="w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 -z-10 h-64 w-64 rounded-full bg-[#841474]/5 blur-3xl" />
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="mt-32 grid gap-8 md:grid-cols-3">
          <div className="group rounded-3xl border border-gray-100 bg-white p-8 transition-all hover:border-[#841474]/20 hover:shadow-xl hover:shadow-[#841474]/5">
            <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-[#841474]/10 text-[#841474]">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-bold text-gray-900">
              {messages.about.mission.title}
            </h3>
            <p className="leading-relaxed text-gray-600">
              {messages.about.mission.description}
            </p>
          </div>

          <div className="group rounded-3xl border border-gray-100 bg-white p-8 transition-all hover:border-[#841474]/20 hover:shadow-xl hover:shadow-[#841474]/5">
            <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-[#841474]/10 text-[#841474]">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-bold text-gray-900">
              {messages.about.vision.title}
            </h3>
            <p className="leading-relaxed text-gray-600">
              {messages.about.vision.description}
            </p>
          </div>

          <div className="group rounded-3xl border border-gray-100 bg-white p-8 transition-all hover:border-[#841474]/20 hover:shadow-xl hover:shadow-[#841474]/5">
            <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-[#841474]/10 text-[#841474]">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-bold text-gray-900">
              {messages.about.values.title}
            </h3>
            <p className="leading-relaxed text-gray-600">
              {messages.about.values.description}
            </p>
          </div>
        </div>

        {/* Migration */}
        <div className="mt-32 overflow-hidden rounded-[3rem] bg-gray-900 p-8 text-white md:p-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">
                {messages.about.migration.heading}
              </h2>
              <p className="text-lg leading-relaxed text-gray-400">
                {messages.about.migration.description}
              </p>
              <ul className="space-y-4">
                {messages.about.migration.items.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 text-[#841474]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl bg-white/5 p-6 text-center">
                <div className="text-2xl font-bold">
                  {messages.about.migration.stat_1_value}
                </div>
                <div className="text-xs text-gray-400">
                  {messages.about.migration.stat_1_label}
                </div>
              </div>
              <div className="rounded-3xl bg-white/5 p-6 text-center">
                <div className="text-2xl font-bold">
                  {messages.about.migration.stat_2_value}
                </div>
                <div className="text-xs text-gray-400">
                  {messages.about.migration.stat_2_label}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust / How Zimo Works */}
        <div className="mt-32">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              {messages.trust.heading}
            </h2>
            <p className="section-lead section-lead--center mx-auto mt-3 max-w-2xl">
              {messages.trust.lead}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              <svg key="b" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>,
              <svg key="s" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>,
              <svg key="f" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>,
            ].map((icon, i) => (
              <div
                key={i}
                className="group rounded-3xl border border-gray-100 bg-white p-8 transition-all hover:border-[#841474]/20 hover:shadow-xl hover:shadow-[#841474]/5"
              >
                <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-[#841474]/10 text-[#841474]">
                  {icon}
                </div>
                <h3 className="mb-3 text-center text-xl font-bold text-gray-900">
                  {messages.trust.items[i].title}
                </h3>
                <p className="leading-relaxed text-center text-gray-600">
                  {messages.trust.items[i].description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
