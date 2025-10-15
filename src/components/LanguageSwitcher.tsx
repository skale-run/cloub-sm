import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", flag: "🇬🇧" },
  { code: "fr", flag: "🇫🇷" },
  { code: "ar", flag: "🇲🇦" },
] as const;

type SupportedLanguage = (typeof languages)[number]["code"];

function LanguageSwitcher() {
  const { i18n, t } = useTranslation("common");

  const handleSelect = useCallback(
    (nextLanguage: SupportedLanguage) => {
      if (i18n.language !== nextLanguage) {
        void i18n.changeLanguage(nextLanguage);
      }
    },
    [i18n],
  );

  return (
    <div className="inline-flex items-center gap-2">
      <span className="sr-only">{t("languageSwitcher.label")}</span>
      <div
        role="group"
        aria-label={t("languageSwitcher.label")}
        className="inline-flex items-center gap-1 rounded-2xl border border-red-500/40 bg-red-950/60 p-1 shadow-inner"
      >
        {languages.map((language) => {
          const isActive = i18n.language === language.code;
          return (
            <button
              key={language.code}
              type="button"
              onClick={() => handleSelect(language.code)}
              className={`flex items-center justify-center rounded-xl px-2 py-1 text-lg transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300 ${
                isActive
                  ? "bg-red-500/20 text-red-50 shadow-[inset_0_0_0_1px_rgba(248,113,113,0.35)]"
                  : "text-red-200/80 hover:bg-red-500/10 hover:text-red-50"
              }`}
              aria-pressed={isActive}
            >
              <span aria-hidden>{language.flag}</span>
              <span className="sr-only">
                {t(`languageSwitcher.languages.${language.code}`)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default LanguageSwitcher;
