import type { Locale } from '@/i18n/config';

export interface Plan {
  id: number;
  name: string;
  code: string;
  landing_subtitle: string | null;
  price: string | number | null;
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

const plans: Record<Locale, Plan[]> = {
  fa: [
    {
      id: 1,
      name: 'پایه',
      code: 'starter',
      landing_subtitle: 'برای کسب‌وکارهای کوچک',
      price: 299000,
      pricing_type: 'fixed',
      is_featured: false,
      ribbon_text: null,
      features: [
        { text: 'تا ۳ شعبه' },
        { text: 'گزارش‌های پایه' },
        { text: 'پشتیبانی ایمیلی' },
        { text: 'داشبورد مدیریتی' },
      ],
      comparison_values: {
        branches: { active: false, custom_text: '۳' },
        users: { active: false, custom_text: '۲' },
        sms: { active: false, custom_text: '۱۰۰۰' },
        api: { active: false, custom_text: null },
        custom_reports: { active: false, custom_text: null },
        support_priority: { active: false, custom_text: 'ایمیلی' },
      },
    },
    {
      id: 2,
      name: 'حرفه‌ای',
      code: 'professional',
      landing_subtitle: 'محبوب‌ترین انتخاب',
      price: 599000,
      pricing_type: 'fixed',
      is_featured: true,
      ribbon_text: 'محبوب‌ترین',
      features: [
        { text: 'تا ۱۰ شعبه' },
        { text: 'گزارش‌های پیشرفته' },
        { text: 'پشتیبانی تلفنی' },
        { text: 'داشبورد مدیریتی' },
        { text: 'API اختصاصی' },
        { text: 'پنل پیامکی' },
      ],
      comparison_values: {
        branches: { active: false, custom_text: '۱۰' },
        users: { active: false, custom_text: '۱۰' },
        sms: { active: false, custom_text: '۵۰۰۰' },
        api: { active: true, custom_text: null },
        custom_reports: { active: true, custom_text: null },
        support_priority: { active: false, custom_text: 'تلفنی' },
      },
    },
    {
      id: 3,
      name: 'سازمانی',
      code: 'enterprise',
      landing_subtitle: 'برای سازمان‌های بزرگ',
      price: null,
      pricing_type: 'custom',
      is_featured: false,
      ribbon_text: null,
      features: [
        { text: 'شعبه نامحدود' },
        { text: 'گزارش‌های سفارشی' },
        { text: 'پشتیبانی اختصاصی ۲۴/۷' },
        { text: 'داشبورد مدیریتی پیشرفته' },
        { text: 'API اختصاصی' },
        { text: 'پنل پیامکی نامحدود' },
        { text: 'آموزش حضوری' },
      ],
      comparison_values: {
        branches: { active: false, custom_text: 'نامحدود' },
        users: { active: false, custom_text: 'نامحدود' },
        sms: { active: false, custom_text: 'نامحدود' },
        api: { active: true, custom_text: null },
        custom_reports: { active: true, custom_text: null },
        support_priority: { active: false, custom_text: '۲۴/۷' },
      },
    },
  ],
  en: [
    {
      id: 1,
      name: 'Starter',
      code: 'starter',
      landing_subtitle: 'For small businesses',
      price: 9,
      pricing_type: 'fixed',
      is_featured: false,
      ribbon_text: null,
      features: [
        { text: 'Up to 3 branches' },
        { text: 'Basic reports' },
        { text: 'Email support' },
        { text: 'Management dashboard' },
      ],
      comparison_values: {
        branches: { active: false, custom_text: '3' },
        users: { active: false, custom_text: '2' },
        sms: { active: false, custom_text: '1,000' },
        api: { active: false, custom_text: null },
        custom_reports: { active: false, custom_text: null },
        support_priority: { active: false, custom_text: 'Email' },
      },
    },
    {
      id: 2,
      name: 'Professional',
      code: 'professional',
      landing_subtitle: 'Most popular choice',
      price: 29,
      pricing_type: 'fixed',
      is_featured: true,
      ribbon_text: 'Most Popular',
      features: [
        { text: 'Up to 10 branches' },
        { text: 'Advanced reports' },
        { text: 'Phone support' },
        { text: 'Management dashboard' },
        { text: 'Dedicated API' },
        { text: 'SMS panel' },
      ],
      comparison_values: {
        branches: { active: false, custom_text: '10' },
        users: { active: false, custom_text: '10' },
        sms: { active: false, custom_text: '5,000' },
        api: { active: true, custom_text: null },
        custom_reports: { active: true, custom_text: null },
        support_priority: { active: false, custom_text: 'Phone' },
      },
    },
    {
      id: 3,
      name: 'Enterprise',
      code: 'enterprise',
      landing_subtitle: 'For large organizations',
      price: null,
      pricing_type: 'custom',
      is_featured: false,
      ribbon_text: null,
      features: [
        { text: 'Unlimited branches' },
        { text: 'Custom reports' },
        { text: 'Dedicated 24/7 support' },
        { text: 'Advanced management dashboard' },
        { text: 'Dedicated API' },
        { text: 'Unlimited SMS panel' },
        { text: 'On-site training' },
      ],
      comparison_values: {
        branches: { active: false, custom_text: 'Unlimited' },
        users: { active: false, custom_text: 'Unlimited' },
        sms: { active: false, custom_text: 'Unlimited' },
        api: { active: true, custom_text: null },
        custom_reports: { active: true, custom_text: null },
        support_priority: { active: false, custom_text: '24/7' },
      },
    },
  ],
  tr: [
    {
      id: 1,
      name: 'Başlangıç',
      code: 'starter',
      landing_subtitle: 'Küçük işletmeler için',
      price: 299,
      pricing_type: 'fixed',
      is_featured: false,
      ribbon_text: null,
      features: [
        { text: '3 Şubeye kadar' },
        { text: 'Temel raporlar' },
        { text: 'E-posta desteği' },
        { text: 'Yönetim paneli' },
      ],
      comparison_values: {
        branches: { active: false, custom_text: '3' },
        users: { active: false, custom_text: '2' },
        sms: { active: false, custom_text: '1.000' },
        api: { active: false, custom_text: null },
        custom_reports: { active: false, custom_text: null },
        support_priority: { active: false, custom_text: 'E-posta' },
      },
    },
    {
      id: 2,
      name: 'Profesyonel',
      code: 'professional',
      landing_subtitle: 'En popüler seçim',
      price: 599,
      pricing_type: 'fixed',
      is_featured: true,
      ribbon_text: 'En Popüler',
      features: [
        { text: '10 Şubeye kadar' },
        { text: 'Gelişmiş raporlar' },
        { text: 'Telefon desteği' },
        { text: 'Yönetim paneli' },
        { text: 'Özel API' },
        { text: 'SMS paneli' },
      ],
      comparison_values: {
        branches: { active: false, custom_text: '10' },
        users: { active: false, custom_text: '10' },
        sms: { active: false, custom_text: '5.000' },
        api: { active: true, custom_text: null },
        custom_reports: { active: true, custom_text: null },
        support_priority: { active: false, custom_text: 'Telefon' },
      },
    },
    {
      id: 3,
      name: 'Kurumsal',
      code: 'enterprise',
      landing_subtitle: 'Büyük kuruluşlar için',
      price: null,
      pricing_type: 'custom',
      is_featured: false,
      ribbon_text: null,
      features: [
        { text: 'Sınırsız şube' },
        { text: 'Özel raporlar' },
        { text: '7/24 özel destek' },
        { text: 'Gelişmiş yönetim paneli' },
        { text: 'Özel API' },
        { text: 'Sınırsız SMS paneli' },
        { text: 'Yerinde eğitim' },
      ],
      comparison_values: {
        branches: { active: false, custom_text: 'Sınırsız' },
        users: { active: false, custom_text: 'Sınırsız' },
        sms: { active: false, custom_text: 'Sınırsız' },
        api: { active: true, custom_text: null },
        custom_reports: { active: true, custom_text: null },
        support_priority: { active: false, custom_text: '7/24' },
      },
    },
  ],
};

const comparisonFeatures: Record<Locale, ComparisonFeature[]> = {
  fa: [
    { id: 1, key: 'branches', label: 'تعداد شعب', sort_order: 1 },
    { id: 2, key: 'users', label: 'تعداد کاربران', sort_order: 2 },
    { id: 3, key: 'sms', label: 'پیامک ماهانه', sort_order: 3 },
    { id: 4, key: 'api', label: 'دسترسی API', sort_order: 4 },
    { id: 5, key: 'custom_reports', label: 'گزارش‌های سفارشی', sort_order: 5 },
    { id: 6, key: 'support_priority', label: 'اولویت پشتیبانی', sort_order: 6 },
  ],
  en: [
    { id: 1, key: 'branches', label: 'Number of branches', sort_order: 1 },
    { id: 2, key: 'users', label: 'Number of users', sort_order: 2 },
    { id: 3, key: 'sms', label: 'Monthly SMS', sort_order: 3 },
    { id: 4, key: 'api', label: 'API access', sort_order: 4 },
    { id: 5, key: 'custom_reports', label: 'Custom reports', sort_order: 5 },
    { id: 6, key: 'support_priority', label: 'Support priority', sort_order: 6 },
  ],
  tr: [
    { id: 1, key: 'branches', label: 'Şube sayısı', sort_order: 1 },
    { id: 2, key: 'users', label: 'Kullanıcı sayısı', sort_order: 2 },
    { id: 3, key: 'sms', label: 'Aylık SMS', sort_order: 3 },
    { id: 4, key: 'api', label: 'API erişimi', sort_order: 4 },
    { id: 5, key: 'custom_reports', label: 'Özel raporlar', sort_order: 5 },
    { id: 6, key: 'support_priority', label: 'Destek önceliği', sort_order: 6 },
  ],
};

export function getStaticPlans(locale: Locale): Plan[] {
  return plans[locale] || plans.fa;
}

export function getStaticComparisonFeatures(locale: Locale): ComparisonFeature[] {
  return comparisonFeatures[locale] || comparisonFeatures.fa;
}
