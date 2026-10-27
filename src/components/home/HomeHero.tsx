import Link from 'next/link';
import DashboardImage from '@/components/DashboardImage';
import FadeIn from '@/components/animations/FadeIn';

interface HomeHeroProps {
  locale: string;
  translations: {
    hero: {
      kicker: string;
      title: string;
      description: string;
      demo_cta: string;
      features_cta: string;
      image_alt: string;
    };
  };
}

function getHref(locale: string, slug: string): string {
  const prefix = locale === 'fa' ? '' : `/${locale}`;
  if (slug === 'features') return `${prefix}/features`;
  if (slug === 'demo') return `${prefix}/demo`;
  return prefix || '/';
}

export default function HomeHero({ locale, translations }: HomeHeroProps) {
  const { hero } = translations;

  return (
    <section className="relative px-4 pb-16 pt-40 md:pb-24 md:pt-48">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center md:gap-8">
          <FadeIn direction="up" delay={0}>
            <p className="section-kicker">{hero.kicker}</p>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <h1
              className="hero-title max-w-3xl"
              dangerouslySetInnerHTML={{ __html: hero.title }}
            />
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className="section-lead section-lead--center max-w-2xl">
              {hero.description}
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.3}>
            <div className="flex flex-col items-center justify-center gap-3 pt-1 sm:flex-row">
              <Link
                href={getHref(locale, 'demo')}
                className="btn-primary"
              >
                {hero.demo_cta}
              </Link>
              <Link
                href={getHref(locale, 'features')}
                className="btn-secondary"
              >
                {hero.features_cta}
              </Link>
            </div>
          </FadeIn>
        </div>

        <div className="relative mx-auto mt-12 max-w-5xl md:mt-14">
          <div className="relative">
            <div className="relative z-10 overflow-hidden rounded-[2.5rem] border-8 border-white bg-white shadow-[0_32px_64px_-16px_rgba(132,20,116,0.12)]">
              <DashboardImage
                locale={locale}
                alt={hero.image_alt}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1024px"
                className="w-full object-cover"
                preload
              />
            </div>
            <div className="absolute -bottom-6 -right-6 -z-10 h-64 w-64 rounded-full bg-[#841474]/5 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
