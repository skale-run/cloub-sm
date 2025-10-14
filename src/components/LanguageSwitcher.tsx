import { useCallback } from "react";
import type { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n, t } = useTranslation("common");

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const nextLanguage = event.target.value;
      void i18n.changeLanguage(nextLanguage);
    },
    [i18n],
  );

  return (
    <label className="inline-flex items-center gap-2 text-xs font-medium text-red-200/80">
      <span className="sr-only">{t("languageSwitcher.label")}</span>
      <select
        value={i18n.language}
        onChange={handleChange}
        className="rounded-xl border border-red-400/40 bg-red-950/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-red-100 transition hover:border-red-400/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
      >
        <option value="en">{t("languageSwitcher.languages.en")}</option>
        <option value="ar">{t("languageSwitcher.languages.ar")}</option>
      </select>
    </label>
  );
}

export default LanguageSwitcher;
