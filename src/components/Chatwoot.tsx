"use client";

import { useEffect, useRef } from "react";

interface ChatwootConfig {
  locale: string;
  position: string;
  websiteToken: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL || "https://chat.zimo.beauty";

const locales: Record<string, ChatwootConfig> = {
  en: {
    locale: "en",
    position: "left",
    websiteToken: process.env.NEXT_PUBLIC_CHATWOOT_EN_TOKEN || "",
  },
  fa: {
    locale: "fa",
    position: "right",
    websiteToken: process.env.NEXT_PUBLIC_CHATWOOT_FA_TOKEN || "",
  },
  tr: {
    locale: "tr",
    position: "left",
    websiteToken: process.env.NEXT_PUBLIC_CHATWOOT_TR_TOKEN || "",
  },
};

function destroyChatwoot() {
  const w = window as any;
  if (w.$chatwoot) {
    w.$chatwoot.toggle("close");
    const holder = document.querySelector(".woot-widget-holder");
    if (holder) holder.remove();
    const bubble = document.querySelector(".woot--bubble-holder");
    if (bubble) bubble.remove();
    const container = document.querySelector("#chatwoot-widget-container");
    if (container) container.remove();
    delete w.$chatwoot;
    delete w.chatwootSDK;
  }
}

export default function Chatwoot({ locale }: { locale: string }) {
  const currentLocale = useRef(locale);

  useEffect(() => {
    const config = locales[locale] || locales.fa;
    if (!config.websiteToken) return;

    destroyChatwoot();

    const w = window as any;
    w.chatwootSettings = {
      position: config.position,
      locale: config.locale,
      type: "standard",
      launcherTitle: "",
    };

    const script = document.createElement("script");
    script.src = `${BASE_URL}/packs/js/sdk.js`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      w.chatwootSDK.run({
        websiteToken: config.websiteToken,
        baseUrl: BASE_URL,
      });
    };

    return () => {
      destroyChatwoot();
    };
  }, [locale]);

  return null;
}
