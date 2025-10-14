import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "../locales/en";
import { ar } from "../locales/ar";

const resources = {
  en,
  ar,
} as const;

const LANGUAGE_STORAGE_KEY = "preferred-language";
type LanguageKey = keyof typeof resources;
const supportedLanguages = new Set<LanguageKey>(["en", "ar"]);

let initialLanguage: LanguageKey = "en";

if (typeof window !== "undefined") {
  try {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLanguage && supportedLanguages.has(storedLanguage as LanguageKey)) {
      initialLanguage = storedLanguage as LanguageKey;
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn("Failed to read stored language preference", error);
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    returnObjects: true,
    defaultNS: "translation",
  })
  .catch((error) => {
    if (import.meta.env.DEV) {
      console.error("Failed to initialize i18next", error);
    }
  });

const rtlLanguages = new Set<LanguageKey>(["ar"]);

function applyLanguageAttributes(language: string) {
  const root = document.documentElement;
  const direction = rtlLanguages.has(language) ? "rtl" : "ltr";
  root.lang = language;
  root.dir = direction;
}

if (typeof document !== "undefined") {
  applyLanguageAttributes(i18n.language);
}

i18n.on("languageChanged", (nextLanguage) => {
  if (typeof document !== "undefined") {
    applyLanguageAttributes(nextLanguage);
  }

  if (typeof window !== "undefined") {
    try {
      if (supportedLanguages.has(nextLanguage as LanguageKey)) {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
      } else {
        window.localStorage.removeItem(LANGUAGE_STORAGE_KEY);
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn("Failed to persist language preference", error);
      }
    }
  }
});

export default i18n;
