import type { Locale } from '@/i18n/config';

export interface Plan {
  id: number;
  name: string;
  code: string;
  landing_subtitle: string | null;
  tagline: string | null;
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
      landing_subtitle: 'برای تیم‌های کوچک با نیازهای ساده',
      tagline: 'کسب‌وکارتون رو با ابزارهای حرفه‌ای شروع کنید و تجربه بی‌نقصی به مشتریان بدید.',
      price: 299000,
      pricing_type: 'fixed',
      is_featured: false,
      ribbon_text: null,
      features: [
        { text: 'نوبت‌دهی هوشمند ۷ لایه' },
        { text: 'پروفایل دیجیتال مشتری' },
        { text: 'صورت‌حساب و تسویه' },
        { text: 'گزارش‌های استاندارد' },
        { text: 'پشتیبانی آنلاین' },
      ],
      comparison_values: {
        branches: { active: false, custom_text: '۱' },
        users: { active: false, custom_text: '۳' },
        sms: { active: false, custom_text: '۵۰' },
        api: { active: false, custom_text: null },
        custom_reports: { active: false, custom_text: null },
        support_priority: { active: false, custom_text: 'آنلاین' },
      },
    },
    {
      id: 2,
      name: 'حرفه‌ای',
      code: 'professional',
      landing_subtitle: 'برای کسب‌وکارهای در حال رشد',
      tagline: 'قابلیت‌های پیشرفته برای تیم‌هایی که نوبت‌دهی، پرسنل و عملیات پیچیده‌تری دارن.',
      price: 599000,
      pricing_type: 'fixed',
      is_featured: true,
      ribbon_text: 'محبوب‌ترین',
      features: [
        { text: 'مدیریت مرخصی و حضور' },
        { text: 'صندوق و شیفت' },
        { text: 'برنامه وفاداری و اشتراک' },
        { text: 'اتوماسیون حقوق و دستمزد' },
        { text: 'پشتیبانی ۲۴/۷' },
      ],
      comparison_values: {
        branches: { active: false, custom_text: '۳' },
        users: { active: false, custom_text: '۱۵' },
        sms: { active: false, custom_text: '۲۰۰' },
        api: { active: true, custom_text: null },
        custom_reports: { active: true, custom_text: null },
        support_priority: { active: false, custom_text: '۲۴/۷' },
      },
    },
    {
      id: 3,
      name: 'سازمانی',
      code: 'enterprise',
      landing_subtitle: 'برای مجموعه‌های حرفه‌ای و پیشرفته',
      tagline: 'همه چیز حرفه‌ای به‌علاوه ارزش اضافه برای مجموعه‌های قدرتمند سالن‌داری.',
      price: null,
      pricing_type: 'custom',
      is_featured: false,
      ribbon_text: null,
      features: [
        { text: 'مدیریت متمرکز شعب' },
        { text: 'گزارش‌های سفارشی' },
        { text: 'حسابدار اختصاصی' },
        { text: 'آموزش حضوری' },
        { text: 'شعبه و پرسنل نامحدود' },
      ],
      comparison_values: {
        branches: { active: false, custom_text: 'نامحدود' },
        users: { active: false, custom_text: 'نامحدود' },
        sms: { active: false, custom_text: 'نامحدود' },
        api: { active: true, custom_text: null },
        custom_reports: { active: true, custom_text: null },
        support_priority: { active: false, custom_text: null },
      },
    },
  ],
  en: [
    {
      id: 1,
      name: 'Essentials',
      code: 'starter',
      landing_subtitle: 'For small teams with simple needs',
      tagline: 'Start strong with professional tools and deliver an exceptional experience to every client.',
      price: 9,
      pricing_type: 'fixed',
      is_featured: false,
      ribbon_text: null,
      features: [
        'Smart Scheduling (7-layer)',
        'Digital Client Profiles',
        'Invoicing & Checkout',
        'Standard Reports',
        'Online Support',
      ].map((text) => ({ text })),
      comparison_values: {
        branches: { active: false, custom_text: '1' },
        users: { active: false, custom_text: '3' },
        sms: { active: false, custom_text: '50' },
        api: { active: false, custom_text: null },
        custom_reports: { active: false, custom_text: null },
        support_priority: { active: false, custom_text: 'Online' },
      },
    },
    {
      id: 2,
      name: 'Professional',
      code: 'professional',
      landing_subtitle: 'For growing self-care businesses',
      tagline: 'Advanced features for growing teams with complex scheduling, staff, and operations.',
      price: 29,
      pricing_type: 'fixed',
      is_featured: true,
      ribbon_text: 'Most Popular',
      features: [
        'Leave Management & Attendance',
        'Cash Register & Shifts',
        'Loyalty Program & Memberships',
        'Payroll Automation',
        '24/7 Support',
      ].map((text) => ({ text })),
      comparison_values: {
        branches: { active: false, custom_text: '3' },
        users: { active: false, custom_text: '15' },
        sms: { active: false, custom_text: '200' },
        api: { active: true, custom_text: null },
        custom_reports: { active: true, custom_text: null },
        support_priority: { active: false, custom_text: '24/7' },
      },
    },
    {
      id: 3,
      name: 'Enterprise',
      code: 'enterprise',
      landing_subtitle: 'For professional, high-performance salons',
      tagline: 'Everything in Professional plus extra value for large-scale, high-performance salons.',
      price: null,
      pricing_type: 'custom',
      is_featured: false,
      ribbon_text: null,
      features: [
        'Centralized Branch Management',
        'Custom Reports',
        'Dedicated Account Manager',
        'On-site Training',
        'Unlimited Branches & Staff',
      ].map((text) => ({ text })),
      comparison_values: {
        branches: { active: false, custom_text: 'Unlimited' },
        users: { active: false, custom_text: 'Unlimited' },
        sms: { active: false, custom_text: 'Unlimited' },
        api: { active: true, custom_text: null },
        custom_reports: { active: true, custom_text: null },
        support_priority: { active: false, custom_text: null },
      },
    },
  ],
  tr: [
    {
      id: 1,
      name: 'Başlangıç',
      code: 'starter',
      landing_subtitle: 'Küçük ekipler için basit ihtiyaçlar',
      tagline: 'Profesyonel araçlarla işinizi kurun ve müşterilerinize kusursuz bir deneyim sunun.',
      price: 299,
      pricing_type: 'fixed',
      is_featured: false,
      ribbon_text: null,
      features: [
        'Akıllı Randevu (7 katmanlı)',
        'Dijital Müşteri Profili',
        'Fatura & Ödeme',
        'Standart Raporlar',
        'Çevrimiçi Destek',
      ].map((text) => ({ text })),
      comparison_values: {
        branches: { active: false, custom_text: '1' },
        users: { active: false, custom_text: '3' },
        sms: { active: false, custom_text: '50' },
        api: { active: false, custom_text: null },
        custom_reports: { active: false, custom_text: null },
        support_priority: { active: false, custom_text: 'Çevrimiçi' },
      },
    },
    {
      id: 2,
      name: 'Profesyonel',
      code: 'professional',
      landing_subtitle: 'Büyüyen bakım işletmeleri için',
      tagline: 'Büyük randevu, personel ve operasyon ihtiyaçları için gelişmiş özellikler.',
      price: 599,
      pricing_type: 'fixed',
      is_featured: true,
      ribbon_text: 'En Popüler',
      features: [
        'İzin & Devam Yönetimi',
        'Kasa & Vardiyalar',
        'Sadakat Programı & Üyelikler',
        'Maaş Otomasyonu',
        '7/24 Destek',
      ].map((text) => ({ text })),
      comparison_values: {
        branches: { active: false, custom_text: '3' },
        users: { active: false, custom_text: '15' },
        sms: { active: false, custom_text: '200' },
        api: { active: true, custom_text: null },
        custom_reports: { active: true, custom_text: null },
        support_priority: { active: false, custom_text: '7/24' },
      },
    },
    {
      id: 3,
      name: 'Kurumsal',
      code: 'enterprise',
      landing_subtitle: 'Profesyonel, yüksek performanslı salonlar için',
      tagline: 'Profesyonel planın her şeyi artı büyük ölçekli salonlar için ekstra değer.',
      price: null,
      pricing_type: 'custom',
      is_featured: false,
      ribbon_text: null,
      features: [
        'Merkezi Şube Yönetimi',
        'Özel Raporlar',
        'Özel Hesap Yöneticisi',
        'Yerinde Eğitim',
        'Sınırsız Şube & Personel',
      ].map((text) => ({ text })),
      comparison_values: {
        branches: { active: false, custom_text: 'Sınırsız' },
        users: { active: false, custom_text: 'Sınırsız' },
        sms: { active: false, custom_text: 'Sınırsız' },
        api: { active: true, custom_text: null },
        custom_reports: { active: true, custom_text: null },
        support_priority: { active: false, custom_text: null },
      },
    },
  ],
};

const comparisonFeatures: Record<Locale, ComparisonFeature[]> = {
  fa: [
    { id: 1, key: 'branches', label: 'تعداد شعب', sort_order: 1 },
    { id: 2, key: 'users', label: 'تعداد پرسنل', sort_order: 2 },
    { id: 3, key: 'sms', label: 'پیامک ماهانه', sort_order: 3 },
    { id: 4, key: 'api', label: 'دسترسی API', sort_order: 4 },
    { id: 5, key: 'custom_reports', label: 'گزارش‌های سفارشی', sort_order: 5 },
    { id: 6, key: 'support_priority', label: 'اولویت پشتیبانی', sort_order: 6 },
  ],
  en: [
    { id: 1, key: 'branches', label: 'Number of branches', sort_order: 1 },
    { id: 2, key: 'users', label: 'Number of staff', sort_order: 2 },
    { id: 3, key: 'sms', label: 'Monthly SMS', sort_order: 3 },
    { id: 4, key: 'api', label: 'API access', sort_order: 4 },
    { id: 5, key: 'custom_reports', label: 'Custom reports', sort_order: 5 },
    { id: 6, key: 'support_priority', label: 'Support priority', sort_order: 6 },
  ],
  tr: [
    { id: 1, key: 'branches', label: 'Şube sayısı', sort_order: 1 },
    { id: 2, key: 'users', label: 'Personel sayısı', sort_order: 2 },
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
