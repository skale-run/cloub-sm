import type { TFunction, i18n as I18nInstance } from "i18next";

const DEFAULT_FALLBACK_LANGUAGE = "en";
const DEFAULT_NAMESPACE = "translation";

type FallbackLngConfig =
  | string
  | readonly string[]
  | { readonly default?: string | readonly string[] | undefined }
  | undefined;

type DefaultNSConfig = string | readonly string[] | undefined;

function resolveFallbackLanguage(config: FallbackLngConfig): string {
  if (typeof config === "string") {
    return config;
  }

  if (Array.isArray(config)) {
    return config[0] ?? DEFAULT_FALLBACK_LANGUAGE;
  }

  if (config && typeof config === "object") {
    const defaultFallback = config.default;

    if (typeof defaultFallback === "string") {
      return defaultFallback;
    }

    if (Array.isArray(defaultFallback)) {
      return defaultFallback[0] ?? DEFAULT_FALLBACK_LANGUAGE;
    }
  }

  return DEFAULT_FALLBACK_LANGUAGE;
}

function resolveNamespace(config: DefaultNSConfig): string {
  if (typeof config === "string") {
    return config;
  }

  if (Array.isArray(config)) {
    return config[0] ?? DEFAULT_NAMESPACE;
  }

  return DEFAULT_NAMESPACE;
}

export function getFallbackTranslator(i18n: I18nInstance): TFunction {
  const fallbackLanguage = resolveFallbackLanguage(i18n.options.fallbackLng);
  const namespace = resolveNamespace(i18n.options.defaultNS);
  return i18n.getFixedT(fallbackLanguage, namespace);
}
