// The image optimizer returned the full 2880px source for every requested width.
// Pre-generated responsive WebP files avoid that transfer.

type DashboardImageProps = {
  locale: string;
  alt: string;
  sizes: string;
  className?: string;
  preload?: boolean;
};

export default function DashboardImage({ locale, alt, sizes, className, preload = false }: DashboardImageProps) {
  const base = `/images/landing/responsive/zimo-dashboard-${locale}`;
  const srcSet = `${base}-750.webp 750w, ${base}-1280.webp 1280w, ${base}-1920.webp 1920w`;

  return (
    <>
      {preload && <link rel="preload" as="image" imageSrcSet={srcSet} imageSizes={sizes} />}
      <picture className="block">
        <img
          src={`${base}-1280.webp`}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={2880}
          height={locale === 'fa' ? 1906 : 1869}
          loading={preload ? 'eager' : 'lazy'}
          decoding="async"
          className={className}
        />
      </picture>
    </>
  );
}
