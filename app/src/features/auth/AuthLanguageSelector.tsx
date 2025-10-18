import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "../../lib/cn";

const languages = [
  { code: "en", flag: "🇬🇧" },
  { code: "fr", flag: "🇫🇷" },
  { code: "ar", flag: "🇲🇦" },
] as const;

type SupportedLanguage = (typeof languages)[number]["code"];

type AuthLanguageSelectorProps = {
  className?: string;
};

function AuthLanguageSelector({ className }: AuthLanguageSelectorProps) {
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
    <div className={cn("inline-flex items-center gap-1", className)}>
      <span className="sr-only">{t("languageSwitcher.label")}</span>
      <div className="flex items-center gap-1 rounded-full border border-red-400/40 bg-red-950/60 p-1">
        {languages.map((language) => {
          const isActive = i18n.language === language.code;

          return (
            <button
              key={language.code}
              type="button"
              onClick={() => handleSelect(language.code)}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-full text-lg transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300",
                isActive
                  ? "bg-red-500 text-red-50 shadow-[0_10px_25px_rgba(220,38,38,0.45)]"
                  : "text-red-100/80 hover:text-red-50",
              )}
              aria-pressed={isActive}
              aria-label={t(`languageSwitcher.languages.${language.code}`)}
              title={t(`languageSwitcher.languages.${language.code}`)}
            >
              <span aria-hidden>{language.flag}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default AuthLanguageSelector;
