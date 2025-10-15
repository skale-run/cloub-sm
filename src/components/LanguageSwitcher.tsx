import type { ChangeEvent } from "react";
import { useCallback, useId } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", flag: "🇬🇧" },
  { code: "fr", flag: "🇫🇷" },
  { code: "ar", flag: "🇲🇦" },
] as const;

type SupportedLanguage = (typeof languages)[number]["code"];

function LanguageSwitcher() {
  const { i18n, t } = useTranslation("common");
  const selectId = useId();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const nextLanguage = event.target.value as SupportedLanguage;
      if (i18n.language !== nextLanguage) {
        void i18n.changeLanguage(nextLanguage);
      }
    },
    [i18n],
  );

  return (
    <div className="inline-flex items-center gap-2">
      <label className="sr-only" htmlFor={selectId}>
        {t("languageSwitcher.label")}
      </label>
      <div className="relative inline-flex items-center">
        <select
          id={selectId}
          value={i18n.language}
          onChange={handleChange}
          className="appearance-none rounded-2xl border border-red-500/40 bg-red-950/60 px-3 py-1.5 pr-9 text-red-50 shadow-inner transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {`${language.flag} ${t(`languageSwitcher.languages.${language.code}`)}`}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-3 text-red-200/80"
        >
          ▾
        </span>
      </div>
    </div>
  );
}

export default LanguageSwitcher;
