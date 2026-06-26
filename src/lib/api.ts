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
