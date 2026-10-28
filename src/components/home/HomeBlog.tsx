import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { getBlogPosts } from '@/lib/api';
import BlogPostCard from '@/components/blog/BlogPostCard';

const copy = {
  fa: { kicker: 'مجله زیمو', title: 'ایده‌هایی برای رشد سالن شما', link: 'همه مقاله‌ها' },
  en: { kicker: 'Zimo Blog', title: 'Ideas to grow your salon', link: 'All articles' },
  tr: { kicker: 'Zimo Blog', title: 'Salonunuzu büyütmek için fikirler', link: 'Tüm yazılar' },
} as const;

export default async function HomeBlog({ locale }: { locale: Locale }) {
  const response = await getBlogPosts({ locale }).catch(() => null);
  const posts = response?.data.slice(0, 3) ?? [];
  if (!posts.length) return null;

  const text = copy[locale] ?? copy.fa;
  const path = `/${locale === 'fa' ? '' : `${locale}/`}blog`;

  return (
    <section className="section-block bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-kicker">{text.kicker}</p>
            <h2 className="section-heading mt-3">{text.title}</h2>
          </div>
          <Link href={path} className="text-sm font-bold text-[#841474] hover:underline">{text.link} ←</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => <BlogPostCard key={post.id} post={post} locale={locale} />)}
        </div>
      </div>
    </section>
  );
}
