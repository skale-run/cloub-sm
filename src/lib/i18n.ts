import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "../locales/en";
import { ar } from "../locales/ar";

const resources = {
  en,
  ar,
} as const;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
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

const rtlLanguages = new Set(["ar"]);

function applyLanguageAttributes(language: string) {
  const root = document.documentElement;
  const direction = rtlLanguages.has(language) ? "rtl" : "ltr";
  root.lang = language;
  root.dir = direction;
}

if (typeof document !== "undefined") {
  applyLanguageAttributes(i18n.language);

  i18n.on("languageChanged", (nextLanguage) => {
    applyLanguageAttributes(nextLanguage);
  });
}

export default i18n;
