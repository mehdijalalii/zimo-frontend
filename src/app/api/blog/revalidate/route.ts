import { timingSafeEqual } from 'node:crypto';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { BLOG_CACHE_TAG, getBlogCategories, getBlogPost, getBlogPosts } from '@/lib/api';
import { locales, type Locale } from '@/i18n/config';

function isAuthorized(request: NextRequest, secret: string): boolean {
  const provided = Buffer.from(request.headers.get('authorization') ?? '');
  const expected = Buffer.from(`Bearer ${secret}`);

  return provided.length === expected.length && timingSafeEqual(provided, expected);
}

export async function POST(request: NextRequest) {
  const secret = process.env.BLOG_REVALIDATION_SECRET;
  if (!secret) {
    return NextResponse.json({ message: 'Blog revalidation is not configured.' }, { status: 503 });
  }

  if (!isAuthorized(request, secret)) {
    return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  }

  let payload: { locale?: unknown; slug?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON payload.' }, { status: 400 });
  }

  const slug = payload.slug;
  if (slug !== undefined && slug !== null && (typeof slug !== 'string' || !/^[\p{L}\p{N}][\p{L}\p{N}_-]{0,254}$/u.test(slug))) {
    return NextResponse.json({ message: 'Invalid article slug.' }, { status: 400 });
  }

  const locale = payload.locale;
  if (locale !== undefined && locale !== null && (typeof locale !== 'string' || !locales.includes(locale as Locale))) {
    return NextResponse.json({ message: 'Invalid blog locale.' }, { status: 400 });
  }

  revalidateTag(BLOG_CACHE_TAG, { expire: 0 });
  revalidatePath('/[locale]', 'page');
  revalidatePath('/[locale]/blog', 'page');
  revalidatePath('/[locale]/blog/[slug]', 'page');
  revalidatePath('/sitemap.xml');

  try {
    await Promise.all([
      ...locales.flatMap(currentLocale => [
        getBlogPosts({ locale: currentLocale }),
        getBlogCategories(currentLocale),
      ]),
      typeof slug === 'string'
        ? getBlogPost(slug, (locale as Locale | undefined) ?? 'fa')
        : Promise.resolve(null),
    ]);
  } catch {
    return NextResponse.json({ message: 'Cache invalidated, but warming the blog cache failed.' }, { status: 502 });
  }

  return NextResponse.json({ revalidated: true });
}
