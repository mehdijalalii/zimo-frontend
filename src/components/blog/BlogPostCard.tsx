import Link from 'next/link';
import type { BlogPost } from '@/lib/api';

export default function BlogPostCard({ post, locale }: { post: BlogPost; locale: string }) {
  const dateLocale = locale === 'fa' ? 'fa-IR' : locale === 'tr' ? 'tr-TR' : 'en-US';

  return (
    <article className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/${locale === 'fa' ? '' : `${locale}/`}blog/${post.slug}`} className="block">
        <div className="aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#841474]/10 to-pink-100">
          {post.image ? (
            // Blog images are uploaded through the CRM and can live on a separate media host.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.image} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          ) : (
            <div className="flex h-full items-center justify-center text-5xl font-black text-[#841474]/20">Z</div>
          )}
        </div>
        <div className="p-6">
          <div className="mb-3 flex items-center justify-between gap-3 text-xs text-gray-500">
            <span className="rounded-full bg-[#841474]/10 px-3 py-1 font-bold text-[#841474]">{post.category?.name ?? (locale === 'fa' ? 'مقاله' : 'Article')}</span>
            <time dateTime={post.published_at}>{new Intl.DateTimeFormat(dateLocale, { dateStyle: 'medium' }).format(new Date(post.published_at))}</time>
          </div>
          <h2 className="text-xl font-black leading-8 text-gray-900 transition group-hover:text-[#841474]">{post.title}</h2>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-gray-600">{post.summary}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#841474]">
            {locale === 'fa' ? 'ادامه مطلب' : locale === 'tr' ? 'Devamını oku' : 'Read article'}
            <span aria-hidden="true">{locale === 'fa' ? '←' : '→'}</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
