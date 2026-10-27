"use client";

import { useEffect } from "react";

interface ChatwootConfig {
  locale: string;
  position: string;
  websiteToken: string;
}

type ChatwootWindow = Window & {
  $chatwoot?: { toggle: (state: string) => void };
  chatwootSDK?: { run: (config: { websiteToken: string; baseUrl: string }) => void };
  chatwootSettings?: { position: string; locale: string; type: string; launcherTitle: string };
};

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
  const w = window as ChatwootWindow;
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

  useEffect(() => {
    const config = locales[locale] || locales.fa;
    if (!config.websiteToken) return;

    destroyChatwoot();

    const w = window as ChatwootWindow;
    w.chatwootSettings = {
      position: config.position,
      locale: config.locale,
      type: "standard",
      launcherTitle: "",
    };

    let script: HTMLScriptElement | null = null;
    const load = () => {
      script = document.createElement("script");
      script.src = `${BASE_URL}/packs/js/sdk.js`;
      script.async = true;
      script.onload = () => w.chatwootSDK?.run({
        websiteToken: config.websiteToken,
        baseUrl: BASE_URL,
      });
      document.body.appendChild(script);
    };

    // The support widget is available shortly after page load without competing
    // with the hero image and initial hydration for the critical path.
    let timer: number | undefined;
    const schedule = () => { timer = window.setTimeout(load, 5000); };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      window.removeEventListener("load", schedule);
      if (timer !== undefined) window.clearTimeout(timer);
      if (script) { script.onload = null; script.remove(); }
      destroyChatwoot();
    };
  }, [locale]);

  return null;
}
