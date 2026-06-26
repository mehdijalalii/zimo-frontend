import type { Locale } from "./config";
import fa from "@/messages/fa.json";
import en from "@/messages/en.json";
import tr from "@/messages/tr.json";

const messages: Record<Locale, typeof fa> = { fa, en, tr };

export function getMessages(locale: Locale) {
  return messages[locale] ?? messages.fa;
}
