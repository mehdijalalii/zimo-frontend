export const locales = ["fa", "en", "tr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fa";
