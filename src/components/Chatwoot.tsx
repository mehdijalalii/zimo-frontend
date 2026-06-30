"use client";

import { useEffect } from "react";

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

function getChatConfig(): ChatwootConfig {
  const path = window.location.pathname;
  const lang =
    Object.keys(locales).find((code) => path.includes(`/${code}`)) || "fa";
  return locales[lang];
}

export default function Chatwoot() {
  useEffect(() => {
    const config = getChatConfig();

    (window as any).chatwootSettings = {
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
      (window as any).chatwootSDK.run({
        websiteToken: config.websiteToken,
        baseUrl: BASE_URL,
      });
    };
  }, []);

  return null;
}
