const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api/v1';

interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface Plan {
  id: number;
  name: string;
  code: string;
  landing_subtitle: string | null;
  landing_title: string | null;
  price: string | number | null;
  prices: Record<string, string> | null;
  pricing_type: 'fixed' | 'custom';
  is_featured: boolean;
  ribbon_text: string | null;
  features: { text: string }[];
  comparison_values: Record<string, { active: boolean; custom_text: string | null }>;
}

export interface ComparisonFeature {
  id: number;
  key: string;
  label: string;
  sort_order: number;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  posts_count: number;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string | null;
  status: 'published';
  category: Omit<BlogCategory, 'posts_count'> | null;
  tags: BlogTag[];
  seo_title: string | null;
  seo_description: string | null;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface PaginatedBlogPosts {
  data: BlogPost[];
  meta: { current_page: number; last_page: number; per_page: number; total: number };
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || `API error: ${res.status}`);
  }

  return res.json();
}

export async function getPlans(locale: string): Promise<Plan[]> {
  const res = await apiFetch<ApiResponse<Plan[]>>(`/plans?locale=${locale}`);
  return res.data;
}

export async function getComparisonFeatures(locale: string): Promise<ComparisonFeature[]> {
  const res = await apiFetch<ApiResponse<ComparisonFeature[]>>(`/comparison-features?locale=${locale}`);
  return res.data;
}

export async function submitContact(data: {
  name: string;
  email_or_phone: string;
  subject?: string;
  message: string;
}): Promise<{ message: string }> {
  return apiFetch('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function submitDemo(data: {
  contact_name: string;
  contact_phone: string;
  brand_name: string;
  branches_count?: string;
  plan_interest?: string;
  message?: string;
}): Promise<{ message: string }> {
  return apiFetch('/demo', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

async function blogFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Blog API error: ${res.status}`);
  }

  return res.json();
}

export async function getBlogPosts(options: { category?: string; tag?: string; page?: number } = {}): Promise<PaginatedBlogPosts> {
  const query = new URLSearchParams();
  if (options.category) query.set('category', options.category);
  if (options.tag) query.set('tag', options.tag);
  if (options.page && options.page > 1) query.set('page', String(options.page));
  const suffix = query.size ? `?${query.toString()}` : '';

  return blogFetch<PaginatedBlogPosts>(`/blog/posts${suffix}`);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`${API_BASE}/blog/posts/${encodeURIComponent(slug)}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 300 },
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Blog API error: ${res.status}`);

  const response = await res.json() as { data: BlogPost };
  return response.data;
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  const response = await blogFetch<{ data: BlogCategory[] }>('/blog/categories');
  return response.data;
}
