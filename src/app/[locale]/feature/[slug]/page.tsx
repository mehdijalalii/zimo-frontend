import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getMessages } from '@/i18n/request';
import type { Locale } from '@/i18n/config';

const SITE_URL = "https://zimo.beauty";

const validSlugs = [
  'appointments', 'finance', 'branches', 'loyalty', 'payroll',
  'reporting', 'security', 'staff-performance', 'staff-dashboard', 'marketing-crm',
];

const translationKeyMap: Record<string, string> = {
  appointments: 'feature_appointments',
  finance: 'feature_finance',
  branches: 'feature_branches',
  loyalty: 'feature_loyalty',
  payroll: 'feature_payroll',
  reporting: 'feature_reporting',
  security: 'feature_security',
  'staff-performance': 'feature_staff_performance',
  'staff-dashboard': 'feature_staff_dashboard',
  'marketing-crm': 'feature_marketing_crm',
};

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!validSlugs.includes(slug)) return {};
  const typedLocale = locale as Locale;
  const messages = getMessages(typedLocale);
  const meta = messages.meta;

  const key = translationKeyMap[slug];
  const pageMeta = meta[key as keyof typeof meta] as { title: string; description: string } | undefined;

  const prefix = typedLocale === "fa" ? "" : `/${typedLocale}`;
  const canonical = `${SITE_URL}${prefix}/feature/${slug}`;

  const siteName = typedLocale === "fa" ? "زیمو" : "Zimo";
  return {
    title: `${pageMeta?.title ?? meta.default_title} | ${siteName}`,
    description: pageMeta?.description ?? meta.default_description,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        ["fa", "en", "tr"].map((loc) => [
          loc,
          `${SITE_URL}${loc === "fa" ? "" : `/${loc}`}/feature/${slug}`,
        ])
      ),
    },
    openGraph: {
      title: pageMeta?.title ?? meta.default_title,
      description: pageMeta?.description ?? meta.default_description,
      images: [
        {
          url: `${SITE_URL}/images/landing/zimo-dashboard-${typedLocale}.webp`,
          alt: pageMeta?.title ?? meta.default_title,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageMeta?.title ?? meta.default_title,
      description: pageMeta?.description ?? meta.default_description,
      images: [`${SITE_URL}/images/landing/zimo-dashboard-${typedLocale}.webp`],
    },
  };
}

function getDashboardImage(locale: string): string {
  return `/images/landing/zimo-dashboard-${locale}.webp`;
}

function getHref(locale: string, slug: string): string {
  const prefix = locale === 'fa' ? '' : `/${locale}`;
  if (slug === 'home') return prefix || '/';
  if (slug === 'features') return `${prefix}/features`;
  if (slug === 'demo') return `${prefix}/demo`;
  return prefix || '/';
}

const benefitIcons = [
  <svg key="0" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="1" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="2" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2" /></svg>,
  <svg key="3" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>,
];

const benefitColorSets: Record<string, string[]> = {
  appointments: ['bg-[#841474]/10 text-[#841474]', 'bg-[#841474]/10 text-[#841474]', 'bg-[#841474]/10 text-[#841474]', 'bg-[#841474]/10 text-[#841474]'],
  finance: ['bg-green-50 text-green-600', 'bg-blue-50 text-blue-600', 'bg-purple-50 text-purple-600'],
  branches: ['bg-purple-50 text-purple-600', 'bg-yellow-50 text-yellow-600', 'bg-blue-50 text-blue-600', 'bg-green-50 text-green-600'],
  loyalty: ['bg-pink-50 text-pink-600', 'bg-orange-50 text-orange-600', 'bg-teal-50 text-teal-600'],
  payroll: ['bg-indigo-50 text-indigo-600', 'bg-teal-50 text-teal-600', 'bg-green-50 text-green-600'],
  reporting: ['bg-blue-50 text-blue-600', 'bg-red-50 text-red-600'],
  security: ['bg-green-50 text-green-600', 'bg-blue-50 text-blue-600'],
  'staff-dashboard': ['bg-green-50 text-green-600', 'bg-blue-50 text-blue-600'],
  'staff-performance': ['bg-green-50 text-green-600', 'bg-blue-50 text-blue-600'],
  'marketing-crm': ['bg-green-50 text-green-600', 'bg-blue-50 text-blue-600'],
};

export default async function FeatureDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;

  if (!validSlugs.includes(slug)) notFound();

  const messages = getMessages(typedLocale);
  const key = translationKeyMap[slug];
  const feature = messages[key as keyof typeof messages] as Record<string, unknown> | undefined;
  if (!feature) notFound();

  const featureDetail = messages.feature_detail as {
    breadcrumb_home: string;
    breadcrumb_features: string;
    demo_cta: string;
    login_cta: string;
    cta_section: { heading: string; description: string; cta: string };
  };

  const title = feature.title as string;
  const description = feature.description as string;
  const imageAlt = feature.image_alt as string;
  const breadcrumbCurrent = (feature as Record<string, string>).breadcrumb_current ?? '';

  const whySmartTitle = (feature.why_smart_title ?? '') as string;
  const whySmart1 = (feature.why_smart_1 ?? '') as string;
  const whySmart2 = (feature.why_smart_2 ?? '') as string;

  const section1Title = (feature.section_1_title ?? '') as string;
  const section1Desc = (feature.section_1_desc ?? '') as string;

  const stepByStepTitle = (feature.step_by_step_title ?? feature.steps_title ?? feature.capabilities_title ?? feature.dashboards_title ?? feature.tools_title ?? feature.features_title ?? feature.layers_title ?? feature.kpis_title ?? feature.sections_title ?? '') as string;
  const steps = (feature.steps ?? feature.capabilities ?? feature.dashboards ?? feature.tools ?? feature.features_list ?? feature.layers ?? feature.kpis ?? feature.sections ?? []) as { number: string; title: string; description: string }[];

  const cycleTitle = (feature.cycle_title ?? '') as string;
  const cycleItems = (feature.cycle_items ?? []) as { title: string; description: string }[];

  const scenarioTitle = (feature.scenario_title ?? '') as string;
  const scenario = (feature.scenario ?? '') as string;

  const comparisonTitle = (feature.comparison_title ?? '') as string;
  const comparisonHeaders = (feature.comparison_headers ?? []) as string[];
  const comparisonRows = (feature.comparison_rows ?? []) as string[][];

  const benefitsTitle = (feature.benefits_title ?? '') as string;
  const benefits = (feature.benefits ?? []) as { title: string; description: string }[];

  const faqTitle = (feature.faq_title ?? '') as string;
  const faq = (feature.faq ?? []) as { q: string; a: string }[];

  const featurePageName = title.replace(/<[^>]*>/g, '');
  const prefix = typedLocale === 'fa' ? '' : `/${typedLocale}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: featureDetail.breadcrumb_home,
          item: `${SITE_URL}${prefix || '/'}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: featureDetail.breadcrumb_features,
          item: `${SITE_URL}${prefix}/features`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: breadcrumbCurrent,
          item: `${SITE_URL}${prefix}/feature/${slug}`,
        },
      ],
    },
    ...(faq.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          },
        ]
      : []),
  ];

  return (
    <section className="section-block pt-32 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero - Full width, 2 columns: text + image */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <nav className="flex items-center gap-2 text-sm text-gray-500">
              <Link href={getHref(typedLocale, 'home')} className="hover:text-[#841474]">{featureDetail.breadcrumb_home}</Link>
              <span>/</span>
              <Link href={getHref(typedLocale, 'features')} className="hover:text-[#841474]">{featureDetail.breadcrumb_features}</Link>
              <span>/</span>
              <span className="text-[#841474]">{breadcrumbCurrent}</span>
            </nav>
            <div className="space-y-5">
              <h1 className="text-3xl font-extrabold leading-[1.2] text-gray-900 md:text-4xl" dangerouslySetInnerHTML={{ __html: title }} />
              <p className="text-lg leading-relaxed text-gray-600">{description}</p>
            </div>
            <div className="flex flex-wrap gap-4 pt-1">
              <Link href={getHref(typedLocale, 'demo')} className="btn-primary">{featureDetail.demo_cta}</Link>
              <Link href="https://zimo.beauty/login" className="btn-secondary">{featureDetail.login_cta}</Link>
            </div>
          </div>
          <div className="relative group lg:pl-4">
            <div className="relative z-10 overflow-hidden rounded-[2rem] border-8 border-white bg-white shadow-[0_32px_64px_-16px_rgba(132,20,116,0.12)] transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-[0_48px_80px_-16px_rgba(132,20,116,0.18)]">
              <Image src={getDashboardImage(typedLocale)} alt={imageAlt} width={800} height={500} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 600px" className="w-full object-cover" />
            </div>
            <div className={`absolute -bottom-10 ${typedLocale === 'fa' ? '-right-10' : '-left-10'} -z-10 h-80 w-80 rounded-full bg-[#841474]/5 blur-[100px]`} />
          </div>
        </div>

        {/* Content + Sidebar - 3 columns */}
        <div className="mt-24 grid gap-16 lg:grid-cols-3">
          {/* Left: Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Section 1 */}
            {section1Title && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900">{section1Title}</h2>
                <p className="text-lg leading-[1.8] text-gray-600">{section1Desc}</p>
              </div>
            )}

            {/* Why Smart */}
            {whySmartTitle && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900">{whySmartTitle}</h2>
                {whySmart1 && <p className="text-lg leading-[1.8] text-gray-600">{whySmart1}</p>}
                {whySmart2 && <p className="text-lg leading-[1.8] text-gray-600" dangerouslySetInnerHTML={{ __html: whySmart2 }} />}
              </div>
            )}

            {/* Steps */}
            {stepByStepTitle && steps.length > 0 && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900">{stepByStepTitle}</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {steps.map((step, i) => (
                    <div key={i} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                      <div className="mb-4 font-bold text-[#841474]">{step.number}. {step.title}</div>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cycle */}
            {cycleTitle && cycleItems.length > 0 && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900">{cycleTitle}</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {cycleItems.map((item, i) => (
                    <div key={i} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                      <div className="mb-4 font-bold text-[#841474]">{item.title}</div>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Scenario */}
            {scenarioTitle && scenario && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900">{scenarioTitle}</h3>
                <div className="relative rounded-2xl border border-gray-200 bg-gray-50/50 p-8 shadow-sm md:p-10">
                  <div className={`absolute inset-y-0 ${typedLocale === 'fa' ? 'right-0 rounded-r-2xl' : 'left-0 rounded-l-2xl'} w-1.5 bg-[#841474]`} />
                  <svg className={`absolute top-8 h-10 w-10 text-[#841474]/5 md:h-12 md:w-12 ${typedLocale === 'fa' ? 'right-8' : 'left-8'}`} fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10 8v8H6v-8h4zm12 0v8h-4v-8h4zM10 4a4 4 0 00-4 4v8a4 4 0 004 4h4v-4h-4v-4h4V8a4 4 0 00-4-4zm12 0a4 4 0 00-4 4v8a4 4 0 004 4h4v-4h-4v-4h4V8a4 4 0 00-4-4z" />
                  </svg>
                  <p className="relative z-10 text-lg italic leading-relaxed text-gray-700 md:text-xl">{scenario}</p>
                </div>
              </div>
            )}

            {/* Comparison Table */}
            {comparisonTitle && comparisonHeaders.length > 0 && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900">{comparisonTitle}</h3>
                <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-sm">
                  <table className={`w-full border-collapse ${typedLocale === 'fa' ? 'text-right' : 'text-left'}`}>
                    <thead className="bg-gray-100/80">
                      <tr className={`divide-x ${typedLocale === 'fa' ? 'divide-x-reverse' : ''} divide-gray-200`}>
                        {comparisonHeaders.map((h, i) => (
                          <th key={i} className={`p-5 font-bold ${i === 2 ? 'text-[#841474]' : 'text-gray-900'}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {comparisonRows.map((row, i) => (
                        <tr key={i} className={`transition-colors hover:bg-[#841474]/5 divide-x ${typedLocale === 'fa' ? 'divide-x-reverse' : ''} divide-gray-200 even:bg-gray-50/50`}>
                          <td className="p-5 font-medium text-gray-900">{row[0]}</td>
                          <td className="p-5 text-gray-500">{row[1]}</td>
                          <td className="p-5 font-bold text-gray-900">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Right: Sticky Sidebar */}
          <div className="space-y-8">
            <div className="sticky top-28 space-y-8">
              {/* Benefits */}
              {benefits.length > 0 && (
                <div className="rounded-[2rem] border border-gray-100 bg-white p-10 shadow-xl shadow-gray-100">
                  <h3 className="mb-8 text-xl font-bold text-gray-900">{benefitsTitle}</h3>
                  <ul className="space-y-8">
                    {benefits.map((benefit, i) => {
                      const colors = benefitColorSets[slug] ?? benefitColorSets.appointments;
                      return (
                        <li key={i} className="flex gap-5">
                          <div className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${colors[i % colors.length]}`}>
                            {benefitIcons[i % benefitIcons.length]}
                          </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-gray-900">{benefit.title}</h4>
                          <p className="text-sm leading-relaxed text-gray-500">{benefit.description}</p>
                        </div>
                      </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* FAQ */}
              {faq.length > 0 && (
                <div className="rounded-[2rem] bg-gray-900 p-10 text-white shadow-2xl">
                  <h3 className="mb-6 text-xl font-bold">{faqTitle}</h3>
                  <div className="space-y-6">
                    {faq.map((item, i) => (
                      <div key={i} className="space-y-2">
                        <h4 className="text-sm font-bold text-white/90">{item.q}</h4>
                        <p className="text-xs leading-relaxed text-gray-400">{item.a}</p>
                        {i < faq.length - 1 && <div className="h-px bg-white/10" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Features */}
        <div className="mt-24">
          <h3 className="mb-8 text-center text-2xl font-bold text-gray-900">
            {typedLocale === 'fa' ? 'قابلیت‌های مرتبط' :
             typedLocale === 'en' ? 'Related Features' :
             'İlgili Özellikler'}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {validSlugs
              .filter((s) => s !== slug)
              .slice(0, 6)
              .map((relatedSlug) => {
                const relatedKey = translationKeyMap[relatedSlug];
                const pageMeta = messages.meta;
                const relatedMeta = pageMeta[relatedKey as keyof typeof pageMeta] as { title: string; description: string } | undefined;
                const relatedPrefix = typedLocale === 'fa' ? '' : `/${typedLocale}`;
                return (
                  <Link
                    key={relatedSlug}
                    href={`${relatedPrefix}/feature/${relatedSlug}`}
                    className="group rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#841474]/20 hover:shadow-lg"
                  >
                    <h4 className="mb-2 text-sm font-bold text-[#841474] group-hover:underline">
                      {relatedMeta?.title ?? relatedSlug}
                    </h4>
                    <p className="text-xs leading-relaxed text-gray-500 line-clamp-2">
                      {relatedMeta?.description ?? ''}
                    </p>
                  </Link>
                );
              })}
          </div>
        </div>

      </div>
    </section>
  );
}
