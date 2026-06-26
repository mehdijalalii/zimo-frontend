import Image from 'next/image';
import Link from 'next/link';
import { getDashboardImage } from '@/lib/utils';

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
          <p className="section-kicker">{hero.kicker}</p>
          <h1
            className="hero-title max-w-3xl"
            dangerouslySetInnerHTML={{ __html: hero.title }}
          />
          <p className="section-lead section-lead--center max-w-2xl">
            {hero.description}
          </p>
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
        </div>

        <div className="relative mx-auto mt-12 max-w-5xl md:mt-14">
          <div className="hero-frame">
            <figure className="overflow-hidden rounded-[20px]">
              <Image
                src={getDashboardImage(locale)}
                alt={hero.image_alt}
                width={1200}
                height={600}
                className="h-full min-h-[320px] w-full object-cover md:min-h-[360px]"
                priority
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
