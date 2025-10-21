import designTokenManifest from "./theme-tokens.json";

export const themeManifest = designTokenManifest;

function cloneTokens(value) {
  return JSON.parse(JSON.stringify(value));
}

const typographyTokens = designTokenManifest.typography ?? {};
export const typographyScale = typographyTokens.scale ?? {};
export const fontFamilyTokens = typographyTokens.families ?? {};
export const fontWeightTokens = typographyTokens.weights ?? {};

function unwrapTokenValue(token) {
  if (token && typeof token === "object" && "$value" in token) {
    return token.$value;
  }
  return token;
}

function normalizeColorRamps(ramps) {
  if (!ramps || typeof ramps !== "object") return {};

  return Object.fromEntries(
    Object.entries(ramps).map(([rampName, rampValues]) => {
      if (!rampValues || typeof rampValues !== "object") {
        return [rampName, rampValues];
      }

      const normalizedRamp = Object.fromEntries(
        Object.entries(rampValues)
          .filter(([step]) => !step.startsWith("$"))
          .map(([step, value]) => [step, unwrapTokenValue(value)]),
      );

      return [rampName, normalizedRamp];
    }),
  );
}

export const spacingScale = designTokenManifest.spacing ?? {};
export const layoutTokens = designTokenManifest.layout ?? {};
export const radiusScale = designTokenManifest.radii ?? {};
export const shadowTokens = designTokenManifest.shadow ?? {};

const motionTokenSource = designTokenManifest.motion ?? {};
export const motionTokens = {
  duration: motionTokenSource.duration ?? {},
  easing: motionTokenSource.easing ?? {},
  reduceMotionPreference:
    motionTokenSource.mediaQueries?.reduceMotion ??
    motionTokenSource.reduceMotionPreference ??
    "(prefers-reduced-motion: reduce)",
};

const colorRamps = normalizeColorRamps(designTokenManifest.color?.ramps);
const themeColorTokens = cloneTokens(designTokenManifest.color?.themes ?? {});

const lightTheme = themeColorTokens.light ?? {};
const darkTheme = themeColorTokens.dark ?? {};

const { components: lightComponentTokens = {}, ...lightThemePrimitives } =
  lightTheme;
const { components: darkComponentTokens = {}, ...darkThemePrimitives } =
  darkTheme;

const componentDesignTokens = {
  button: {
    light: lightComponentTokens.button ?? {},
    dark: darkComponentTokens.button ?? {},
  },
  badge: {
    light: lightComponentTokens.badge ?? {},
    dark: darkComponentTokens.badge ?? {},
  },
};

const semanticColorTokens = {
  light: {
    ...lightThemePrimitives,
    components: {
      button: componentDesignTokens.button.light,
      badge: componentDesignTokens.badge.light,
    },
  },
  dark: {
    ...darkThemePrimitives,
    components: {
      button: componentDesignTokens.button.dark,
      badge: componentDesignTokens.badge.dark,
    },
  },
};

const cssAliasBlueprint = {
  "--vscode-bg": "bg",
  "--vscode-surface": "surface",
  "--vscode-surfaceAlt": "surfaceAlt",
  "--vscode-surfaceMuted": "surfaceMuted",
  "--vscode-text": "text",
  "--vscode-textMuted": "textMuted",
  "--vscode-textMutedStrong": "textMutedStrong",
  "--vscode-primary": "primary",
  "--vscode-primaryContrast": "primaryContrast",
  "--vscode-primarySoft": "primarySoft",
  "--vscode-secondary": "secondary",
  "--vscode-accent": "accent",
  "--vscode-success": "success",
  "--vscode-danger": "danger",
  "--vscode-error": "danger",
  "--vscode-info": "info",
  "--vscode-warning": "warning",
  "--vscode-border": "border",
  "--vscode-muted": "muted",
  "--vscode-ring": "ring",
  "--vscode-buttonText": "buttonText",

  "--color-app-background": "bg",
  "--color-app-surface": "surface",
  "--color-app-surface-alt": "surfaceAlt",
  "--color-app-surface-muted": "surfaceMuted",

  "--color-primary": "primary",
  "--color-primary-contrast": "primaryContrast",
  "--color-primary-soft": "primarySoft",
  "--color-secondary": "secondary",
  "--color-accent": "accent",
  "--color-success": "success",
  "--color-info": "info",
  "--color-warning": "warning",
  "--color-danger": "danger",

  "--color-text-primary": "text",
  "--color-text-muted": "textMuted",
  "--color-text-strong": "textMutedStrong",
  "--color-text-inverse": "textInverse",

  "--color-border-default": "border",
  "--color-border-muted": "borderMuted",
  "--color-border-strong": "borderStrong",

  "--color-overlay": "overlay",
  "--color-scrim": "scrim",
  "--color-intent-info": "info",
  "--color-intent-warning": "warning",
  "--accent-color": "primary",
  "--theme-name": "name",

  // new: expose the page background gradient via CSS var
  "--app-bg-image": "backgroundImage",
};

Object.entries(colorRamps).forEach(([rampName, rampValues]) => {
  Object.entries(rampValues).forEach(([step]) => {
    if (step.startsWith("$")) return;
    cssAliasBlueprint[`--color-${rampName}-${step}`] =
      `color.ramps.${rampName}.${step}`;
  });
});

const buttonVariants = [
  "primary",
  "secondary",
  "subtle",
  "ghost",
  "destructive",
];
const buttonProps = [
  "bg",
  "fg",
  "border",
  "hoverBg",
  "hoverFg",
  "hoverBorder",
  "shadow",
  "hoverShadow",
  "spinner",
];

buttonVariants.forEach((variant) => {
  buttonProps.forEach((prop) => {
    cssAliasBlueprint[`--lk-button-${variant}-${prop}`] =
      `components.button.${variant}.${prop}`;
  });
});

const toneProps = [
  "bg",
  "fg",
  "border",
  "hoverBg",
  "hoverFg",
  "hoverBorder",
  "shadow",
  "hoverShadow",
  "spinner",
];
const buttonTones = [
  "neutral",
  "accent",
  "info",
  "success",
  "warning",
  "danger",
];
buttonTones.forEach((tone) => {
  toneProps.forEach((prop) => {
    cssAliasBlueprint[`--lk-button-${tone}-${prop}`] =
      `components.button.tone.${tone}.${prop}`;
  });
});

const badgeTones = [
  "neutral",
  "primary",
  "accent",
  "success",
  "info",
  "warning",
  "danger",
];
const badgeVariants = ["soft", "solid", "outline"];
badgeTones.forEach((tone) => {
  badgeVariants.forEach((variant) => {
    ["bg", "border", "fg"].forEach((prop) => {
      cssAliasBlueprint[`--lk-badge-${tone}-${variant}-${prop}`] =
        `components.badge.${tone}.${variant}.${prop}`;
    });
  });
});

export const cssVariableTokenMap = cssAliasBlueprint;

function getTokenValue(tokens, tokenPath) {
  return tokenPath.split(".").reduce((acc, key) => {
    if (acc == null) return undefined;
    return acc[key];
  }, tokens);
}

const aliasFallbackTokens = {
  color: {
    ramps: colorRamps,
  },
};

function buildCssAliasMap(tokens) {
  return Object.fromEntries(
    Object.entries(cssAliasBlueprint).map(([cssVariable, tokenPath]) => {
      const value =
        getTokenValue(tokens, tokenPath) ??
        getTokenValue(aliasFallbackTokens, tokenPath);
      return [cssVariable, value ?? ""];
    }),
  );
}

const themeAliasTokens = Object.fromEntries(
  Object.entries(semanticColorTokens).map(([mode, tokens]) => [
    mode,
    buildCssAliasMap(tokens),
  ]),
);

export const themeTokens = semanticColorTokens;
export const themeAliases = themeAliasTokens;

export const designTokens = {
  metadata: designTokenManifest.$metadata ?? {},
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

const THEME_STORAGE_KEY = "lkany:theme-mode";

function readStoredMode() {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage?.getItem(THEME_STORAGE_KEY);
    const normalized =
      typeof stored === "string" ? stored.toLowerCase() : (stored ?? undefined);
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
