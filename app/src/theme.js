import { useCallback, useEffect, useMemo, useState } from "react";
import rawDesignTokens from "./theme-tokens.json";

const TOKEN_REFERENCE_REGEX = /\{([^}]+)\}/g;

function createTokenResolver(rawTokens) {
  const cache = new Map();
  const resolving = new Set();

  const resolvePath = (input) => {
    const segments = Array.isArray(input)
      ? input
      : typeof input === "string" && input.length > 0
      ? input.split(".")
      : [];
    const key = segments.join(".");

    if (cache.has(key)) {
      return cache.get(key);
    }

    if (resolving.has(key)) {
      throw new Error(`Circular design token reference detected for "${key}".`);
    }

    resolving.add(key);

    let node = rawTokens;
    for (const segment of segments) {
      if (node == null) break;
      node = node[segment];
    }

    let resolved;

    if (node == null) {
      resolved = undefined;
    } else if (Array.isArray(node)) {
      resolved = node.map((item, index) =>
        typeof item === "string"
          ? resolveValue(item)
          : resolvePath([...segments, String(index)]),
      );
    } else if (typeof node === "object") {
      if ("$value" in node) {
        resolved = resolveValue(node.$value);
      } else {
        resolved = {};
        for (const [childKey, childValue] of Object.entries(node)) {
          if (childKey.startsWith("$")) continue;
          resolved[childKey] = resolvePath([...segments, childKey]);
        }
      }
    } else {
      resolved = node;
    }

    resolving.delete(key);
    cache.set(key, resolved);
    return resolved;
  };

  const resolveValue = (value) => {
    if (typeof value === "string") {
      return value.replace(TOKEN_REFERENCE_REGEX, (_, refPath) => {
        const resolved = resolvePath(refPath.trim().split("."));
        if (
          resolved != null &&
          (typeof resolved === "string" || typeof resolved === "number")
        ) {
          return resolved;
        }
        return "";
      });
    }

    if (Array.isArray(value)) {
      return value.map((item) => resolveValue(item));
    }

    if (value && typeof value === "object") {
      return Object.fromEntries(
        Object.entries(value).map(([childKey, childValue]) => [
          childKey,
          resolveValue(childValue),
        ]),
      );
    }

    return value;
  };

  return {
    resolveTree: () => resolvePath([]) ?? {},
    resolvePath: (pathString) =>
      resolvePath(
        typeof pathString === "string" ? pathString.split(".") : pathString,
      ),
  };
}

const tokenResolver = createTokenResolver(rawDesignTokens);
const resolvedDesignTokens = tokenResolver.resolveTree();

const colorTokens = resolvedDesignTokens.color ?? {};
const colorRamps = colorTokens.ramps ?? {};
const colorThemes = colorTokens.themes ?? {};
const componentTokens = colorTokens.components ?? {};
const buttonComponentTokens = componentTokens.button ?? {};
const badgeComponentTokens = componentTokens.badge ?? {};

const lightTheme = colorThemes.light ?? {};
const darkTheme = colorThemes.dark ?? {};

export const typographyScale =
  resolvedDesignTokens.typography?.scale ?? {};
export const fontFamilyTokens =
  resolvedDesignTokens.typography?.families ?? {};
export const fontWeightTokens =
  resolvedDesignTokens.typography?.weights ?? {};
export const spacingScale = resolvedDesignTokens.spacing ?? {};
export const layoutTokens = resolvedDesignTokens.layout ?? {};
export const radiusScale = resolvedDesignTokens.radii ?? {};
const shadowTokenData = resolvedDesignTokens.shadow ?? {};
export const shadowTokens = shadowTokenData;
const motionTokenData = resolvedDesignTokens.motion ?? {};
export const motionTokens = {
  duration: motionTokenData.duration ?? {},
  easing: motionTokenData.easing ?? {},
  mediaQueries: motionTokenData.mediaQueries ?? {},
  reduceMotionPreference:
    motionTokenData.mediaQueries?.reduceMotion ??
    motionTokenData.reduceMotionPreference ??
    "(prefers-reduced-motion: reduce)",
};

const componentButtonTokensLight = buttonComponentTokens.light ?? {};
const componentButtonTokensDark = buttonComponentTokens.dark ?? {};
const componentBadgeTokensLight = badgeComponentTokens.light ?? {};
const componentBadgeTokensDark = badgeComponentTokens.dark ?? {};

const semanticColorTokens = Object.fromEntries(
  Object.entries(colorThemes).map(([mode, themeDefinition]) => [
    mode,
    {
      ...themeDefinition,
      components: {
        button: buttonComponentTokens[mode] ?? {},
        badge: badgeComponentTokens[mode] ?? {},
      },
    },
  ]),
);

const rawAliasTokens = rawDesignTokens.aliases?.css ?? {};

const cssVariableTokenBlueprintByMode = Object.fromEntries(
  Object.entries(rawAliasTokens).map(([mode, entries]) => [
    mode,
    Object.fromEntries(
      Object.entries(entries).map(([cssVar, descriptor]) => {
        const rawValue =
          descriptor && typeof descriptor === "object" ? descriptor.$value : descriptor;
        if (
          typeof rawValue === "string" &&
          rawValue.startsWith("{") &&
          rawValue.endsWith("}")
        ) {
          return [cssVar, rawValue.slice(1, -1)];
        }
        return [cssVar, rawValue];
      }),
    ),
  ]),
);

const themeAliasTokens =
  resolvedDesignTokens.aliases?.css ??
  Object.fromEntries(
    Object.entries(cssVariableTokenBlueprintByMode).map(([mode, mapping]) => [
      mode,
      Object.fromEntries(
        Object.entries(mapping).map(([cssVar, tokenPath]) => {
          if (typeof tokenPath === "string" && tokenPath.length > 0) {
            const value = tokenResolver.resolvePath(tokenPath);
            return [cssVar, value ?? ""];
          }
          return [cssVar, tokenPath ?? ""];
        }),
      ),
    ]),
  );

export const cssVariableTokenMap = cssVariableTokenBlueprintByMode;

export const themeTokens = semanticColorTokens;
export const themeAliases = themeAliasTokens;

const componentDesignTokens = {
  button: {
    light: componentButtonTokensLight,
    dark: componentButtonTokensDark,
  },
  badge: {
    light: componentBadgeTokensLight,
    dark: componentBadgeTokensDark,
  },
};

export const designTokens = {
  color: {
    ramps: colorRamps,
    themes: semanticColorTokens,
    components: componentDesignTokens,
  },
  typography: {
    scale: typographyScale,
    families: fontFamilyTokens,
    weights: fontWeightTokens,
  },
  spacing: spacingScale,
  layout: layoutTokens,
  radii: radiusScale,
  shadow: shadowTokens,
  motion: {
    duration: motionTokens.duration,
    easing: motionTokens.easing,
    mediaQueries: {
      ...(motionTokens.mediaQueries ?? {}),
      reduceMotion: motionTokens.reduceMotionPreference,
    },
  },
  aliases: {
    css: themeAliasTokens,
  },
};

let globalTokensApplied = false;
const lastAppliedTheme = { root: null, mode: null, source: null };

function resolveThemeMode(candidate) {
  if (typeof candidate === "string") {
    const normalized = candidate.toLowerCase();
    if (VALID_THEME_MODES.has(normalized)) {
      return normalized;
    }
  }
  return DEFAULT_THEME_MODE;
}

function applyGlobalTokens(root) {
  if (!root || globalTokensApplied) return;
  Object.entries(fontFamilyTokens).forEach(([token, value]) => {
    root.style.setProperty(`--font-family-${token}`, value);
  });

  Object.entries(fontWeightTokens).forEach(([token, value]) => {
    root.style.setProperty(`--font-weight-${token}`, String(value));
  });

  Object.entries(typographyScale).forEach(([token, definition]) => {
    root.style.setProperty(`--font-size-${token}`, definition.fontSize);
    root.style.setProperty(`--line-height-${token}`, definition.lineHeight);
    root.style.setProperty(
      `--letter-spacing-${token}`,
      definition.letterSpacing,
    );
  });

  Object.entries(spacingScale).forEach(([token, value]) => {
    root.style.setProperty(`--space-${token}`, value);
  });

  Object.entries(layoutTokens).forEach(([token, value]) => {
    const kebabToken = token.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
    root.style.setProperty(`--layout-${kebabToken}`, value);
  });

  Object.entries(radiusScale).forEach(([token, value]) => {
    root.style.setProperty(`--radius-${token}`, value);
  });

  Object.entries(shadowTokens).forEach(([token, value]) => {
    root.style.setProperty(`--shadow-${token}`, value);
  });

  Object.entries(motionTokens.duration).forEach(([token, value]) => {
    root.style.setProperty(`--motion-duration-${token}`, value);
  });

  Object.entries(motionTokens.easing).forEach(([token, value]) => {
    root.style.setProperty(`--motion-easing-${token}`, value);
  });

  globalTokensApplied = true;
}

const VALID_THEME_MODES = new Set(["light", "dark"]);
export const THEME_MODES = Object.freeze([...VALID_THEME_MODES]);
const DEFAULT_THEME_MODE = "dark";

const SYSTEM_MODE_TOKENS = new Set(["system", "auto", "default"]);

function isSystemModeRequest(candidate) {
  if (candidate == null) return true;
  if (typeof candidate !== "string") return false;
  return SYSTEM_MODE_TOKENS.has(candidate.toLowerCase());
}

export function applyThemeToDocument(mode, target) {
  const root =
    target ??
    (typeof document !== "undefined" ? document.documentElement : undefined);
  if (!root) return;
  applyGlobalTokens(root);

  let themeSource = "explicit";
  let candidateMode = mode;

  if (isSystemModeRequest(candidateMode)) {
    themeSource = "system";
    const stored = readStoredMode();
    if (stored) {
      candidateMode = stored;
      themeSource = "storage";
    } else {
      candidateMode = getPreferredColorScheme();
    }
  }

  const resolvedMode = resolveThemeMode(candidateMode);
  if (
    lastAppliedTheme.root === root &&
    lastAppliedTheme.mode === resolvedMode &&
    lastAppliedTheme.source === themeSource
  ) {
    return resolvedMode;
  }

  const cssAliases = themeAliasTokens[resolvedMode] ?? themeAliasTokens.dark;
  Object.entries(cssAliases).forEach(([cssVar, value]) => {
    root.style.setProperty(cssVar, String(value ?? ""));
  });

  const accentColor = cssAliases["--accent-color"];
  if (accentColor != null && accentColor !== "") {
    root.style.accentColor = String(accentColor);
    root.style.setProperty("accent-color", String(accentColor));
  } else {
    root.style.removeProperty("accent-color");
    if ("accentColor" in root.style) {
      root.style.accentColor = "";
    }
  }

  // Apply dataset + color-scheme
  root.dataset.theme = resolvedMode;
  root.dataset.colorScheme = resolvedMode;
  root.dataset.themeSource = themeSource;
  const colorScheme = resolvedMode === "dark" ? "dark" : "light";
  root.style.colorScheme = colorScheme;
  root.style.setProperty("color-scheme", colorScheme);
  root.style.setProperty("--theme-mode", resolvedMode);
  root.style.setProperty("--theme-source", themeSource);

  // If you want body to pick up the gradient automatically:
  // You can reference var(--app-bg-image) in your global CSS
  lastAppliedTheme.root = root;
  lastAppliedTheme.mode = resolvedMode;
  lastAppliedTheme.source = themeSource;

  return resolvedMode;
}

function getElectronThemeBridge() {
  if (typeof window === "undefined") return undefined;
  return window?.electronAPI?.theme;
}

function setElectronTheme(themeSource) {
  const bridge = getElectronThemeBridge();
  if (!bridge || typeof bridge.set !== "function") return;
  try {
    const result = bridge.set(themeSource);
    if (result && typeof result.then === "function") {
      result.catch(() => {});
    }
  } catch {
    // ignore
  }
}

const THEME_STORAGE_KEY = "lkany:theme-mode";

function readStoredMode() {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage?.getItem(THEME_STORAGE_KEY);
    const normalized =
      typeof stored === "string" ? stored.toLowerCase() : stored ?? undefined;
    if (typeof normalized === "string" && VALID_THEME_MODES.has(normalized)) {
      return normalized;
    }
    if (stored != null) {
      window.localStorage?.removeItem(THEME_STORAGE_KEY);
    }
    return null;
  } catch {
    return null;
  }
}

function storeMode(mode) {
  if (typeof window === "undefined") return;
  try {
    const normalized =
      typeof mode === "string" ? mode.toLowerCase() : undefined;
    if (normalized && VALID_THEME_MODES.has(normalized)) {
      window.localStorage?.setItem(THEME_STORAGE_KEY, normalized);
      return;
    }
    window.localStorage?.removeItem(THEME_STORAGE_KEY);
  } catch {
    // ignore
  }
}

function clearStoredMode() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage?.removeItem(THEME_STORAGE_KEY);
  } catch {
    // ignore
  }
}

function getPreferredColorScheme() {
  if (typeof window === "undefined") return DEFAULT_THEME_MODE;
  try {
    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!media) return DEFAULT_THEME_MODE;
    return media.matches ? "dark" : "light";
  } catch {
    return DEFAULT_THEME_MODE;
  }
}

function subscribeToSystemPreference(callback) {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia?.("(prefers-color-scheme: dark)");
  if (!media) return () => {};

  const notify = (matches) => {
    try {
      callback(Boolean(matches));
    } catch {
      // ignore callback errors
    }
  };

  notify(media.matches);

  const listener = (event) => {
    notify(event?.matches);
  };

  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }

  if (typeof media.addListener === "function") {
    media.addListener(listener);
    return () => media.removeListener(listener);
  }

  return () => {};
}

export function useTheme() {
  const [themeState, setThemeState] = useState(() => {
    const stored = readStoredMode();
    if (stored) {
      return { mode: stored, hasExplicitMode: true };
    }
    return { mode: getPreferredColorScheme(), hasExplicitMode: false };
  });

  useEffect(() => {
    applyThemeToDocument(
      themeState.hasExplicitMode ? themeState.mode : "system",
    );
  }, [themeState.mode, themeState.hasExplicitMode]);

  useEffect(() => {
    if (themeState.hasExplicitMode) {
      storeMode(themeState.mode);
      setElectronTheme(themeState.mode);
      return;
    }

    clearStoredMode();
    setElectronTheme("system");
  }, [themeState.mode, themeState.hasExplicitMode]);

  useEffect(() => {
    if (themeState.hasExplicitMode) return undefined;

    return subscribeToSystemPreference((isDark) => {
      setThemeState((current) => {
        if (current.hasExplicitMode) {
          return current;
        }
        const nextMode = isDark ? "dark" : "light";
        if (current.mode === nextMode) {
          return current;
        }
        return { mode: nextMode, hasExplicitMode: false };
      });
    });
  }, [themeState.hasExplicitMode]);

  const setMode = useCallback((nextMode) => {
    if (isSystemModeRequest(nextMode)) {
      setThemeState(() => ({
        mode: getPreferredColorScheme(),
        hasExplicitMode: false,
      }));
      return;
    }

    setThemeState((current) => {
      const resolved = resolveThemeMode(nextMode);
      if (current.mode === resolved && current.hasExplicitMode) {
        return current;
      }
      return { mode: resolved, hasExplicitMode: true };
    });
  }, []);

  const toggleMode = useCallback(() => {
    setThemeState((current) => {
      const nextMode = current.mode === "dark" ? "light" : "dark";
      return { mode: nextMode, hasExplicitMode: true };
    });
  }, []);

  const resetMode = useCallback(() => {
    setThemeState(() => ({
      mode: getPreferredColorScheme(),
      hasExplicitMode: false,
    }));
  }, []);

  return useMemo(
    () => ({
      mode: themeState.mode,
      isDark: themeState.mode === "dark",
      setMode,
      toggleMode,
      resetMode,
      hasExplicitMode: themeState.hasExplicitMode,
      source: themeState.hasExplicitMode ? "explicit" : "system",
    }),
    [themeState.mode, themeState.hasExplicitMode, setMode, toggleMode, resetMode],
  );
}

