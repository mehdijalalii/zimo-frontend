import Link from 'next/link';

interface DemoCtaProps {
  locale: string;
  translations: {
    demo_cta: {
      heading: string;
      lead: string;
      demo_cta: string;
      features_cta: string;
    };
  };
}

function getHref(locale: string, slug: string): string {
  const prefix = locale === 'fa' ? '' : `/${locale}`;
  if (slug === 'features') return `${prefix}/features`;
  if (slug === 'demo') return `${prefix}/demo`;
  return prefix || '/';
}

export default function DemoCta({ locale, translations }: DemoCtaProps) {
  const { demo_cta } = translations;

  return (
    <section className="section-block">
      <div className="mx-auto max-w-[1290px] px-5">
        <div className="cta-panel relative z-0 mx-auto flex flex-col items-center justify-center gap-8 rounded-[28px] bg-[#841474] px-8 py-16 text-center sm:px-12 sm:py-20 lg:px-16 lg:py-24">
          <div className="relative z-10 space-y-4">
            <h2
              className="relative z-10 text-white"
              style={{
                fontSize: 'clamp(1.35rem, 2.8vw, 1.75rem)',
                lineHeight: 1.35,
                fontWeight: 850,
                textWrap: 'balance',
              }}
            >
              {demo_cta.heading}
            </h2>
            <p
              className="mx-auto max-w-[32rem] text-white/88"
              style={{
                fontSize: '1.0625rem',
                lineHeight: 1.75,
              }}
            >
              {demo_cta.lead}
            </p>
          </div>

          <div className="relative z-10 flex w-full flex-col items-center justify-center gap-3 md:w-auto md:flex-row">
            <Link
              href={getHref(locale, 'demo')}
              className="inline-flex min-h-[3rem] w-[min(100%,280px)] items-center justify-center rounded-full bg-white px-7 text-[0.9375rem] font-extrabold text-[#841474] shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition hover:bg-white/95 hover:-translate-y-0.5 md:w-auto"
            >
              {demo_cta.demo_cta}
            </Link>
            <Link
              href={getHref(locale, 'features')}
              className="inline-flex min-h-[3rem] w-[min(100%,280px)] items-center justify-center rounded-full border border-white/45 px-7 text-[0.9375rem] font-extrabold text-white transition hover:bg-white/10 hover:border-white/70 hover:-translate-y-0.5 md:w-auto"
            >
              {demo_cta.features_cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
