import { useCallback, useEffect, useMemo } from "react";

export const typographyScale = {
  50: {
    fontSize: "clamp(0.6875rem, 0.6725rem + 0.1vw, 0.725rem)",
    lineHeight: "clamp(1rem, 0.97rem + 0.08vw, 1.05rem)",
    letterSpacing: "0.04em",
  },
  75: {
    fontSize: "clamp(0.75rem, 0.73rem + 0.12vw, 0.82rem)",
    lineHeight: "clamp(1.05rem, 1rem + 0.1vw, 1.12rem)",
    letterSpacing: "0.03em",
  },
  100: {
    fontSize: "clamp(0.8125rem, 0.78rem + 0.15vw, 0.9rem)",
    lineHeight: "clamp(1.1rem, 1.04rem + 0.12vw, 1.22rem)",
    letterSpacing: "0.02em",
  },
  200: {
    fontSize: "clamp(0.875rem, 0.82rem + 0.2vw, 1rem)",
    lineHeight: "clamp(1.2rem, 1.12rem + 0.16vw, 1.35rem)",
    letterSpacing: "0.015em",
  },
  300: {
    fontSize: "clamp(0.9375rem, 0.87rem + 0.24vw, 1.06rem)",
    lineHeight: "clamp(1.35rem, 1.25rem + 0.2vw, 1.55rem)",
    letterSpacing: "0.01em",
  },
  400: {
    fontSize: "clamp(1rem, 0.94rem + 0.3vw, 1.125rem)",
    lineHeight: "clamp(1.45rem, 1.32rem + 0.36vw, 1.68rem)",
    letterSpacing: "0em",
  },
  500: {
    fontSize: "clamp(1.125rem, 1.03rem + 0.38vw, 1.3rem)",
    lineHeight: "clamp(1.55rem, 1.42rem + 0.4vw, 1.85rem)",
    letterSpacing: "-0.005em",
  },
  600: {
    fontSize: "clamp(1.25rem, 1.12rem + 0.48vw, 1.5rem)",
    lineHeight: "clamp(1.6rem, 1.48rem + 0.45vw, 2rem)",
    letterSpacing: "-0.01em",
  },
  700: {
    fontSize: "clamp(1.5rem, 1.32rem + 0.62vw, 1.85rem)",
    lineHeight: "clamp(1.75rem, 1.58rem + 0.58vw, 2.2rem)",
    letterSpacing: "-0.012em",
  },
  800: {
    fontSize: "clamp(1.875rem, 1.62rem + 0.82vw, 2.25rem)",
    lineHeight: "clamp(2.1rem, 1.88rem + 0.75vw, 2.55rem)",
    letterSpacing: "-0.015em",
  },
  900: {
    fontSize: "clamp(2.25rem, 1.96rem + 1vw, 2.65rem)",
    lineHeight: "clamp(2.4rem, 2.1rem + 0.9vw, 2.95rem)",
    letterSpacing: "-0.018em",
  },
  1000: {
    fontSize: "clamp(3rem, 2.5rem + 1.4vw, 3.5rem)",
    lineHeight: "clamp(3.2rem, 2.7rem + 1.6vw, 3.8rem)",
    letterSpacing: "-0.02em",
  },
};

export const fontFamilyTokens = {
  sans: "'Plus Jakarta Sans', 'Inter', 'Segoe UI', system-ui, sans-serif",
  display:
    "'Space Grotesk', 'Plus Jakarta Sans', 'Inter', 'Segoe UI', system-ui, sans-serif",
  mono: "'JetBrains Mono', 'SFMono-Regular', Consolas, monospace",
};

export const fontWeightTokens = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
};

export const spacingScale = {
  0: "0px",
  1: "clamp(0.25rem, 0.22rem + 0.12vw, 0.4rem)",
  2: "clamp(0.45rem, 0.38rem + 0.16vw, 0.65rem)",
  3: "clamp(0.6rem, 0.5rem + 0.2vw, 0.85rem)",
  4: "clamp(0.85rem, 0.72rem + 0.26vw, 1.2rem)",
  5: "clamp(1.1rem, 0.92rem + 0.32vw, 1.5rem)",
  6: "clamp(1.35rem, 1.12rem + 0.4vw, 1.85rem)",
  7: "clamp(1.6rem, 1.28rem + 0.48vw, 2.1rem)",
  8: "clamp(1.9rem, 1.5rem + 0.6vw, 2.4rem)",
  9: "clamp(2.2rem, 1.7rem + 0.72vw, 2.8rem)",
  10: "clamp(2.6rem, 2rem + 0.84vw, 3.4rem)",
  11: "clamp(3rem, 2.3rem + 0.96vw, 3.8rem)",
  12: "clamp(3.4rem, 2.6rem + 1.05vw, 4.2rem)",
  13: "clamp(3.8rem, 2.9rem + 1.2vw, 4.8rem)",
  14: "clamp(4.4rem, 3.3rem + 1.35vw, 5.6rem)",
  15: "clamp(5rem, 3.7rem + 1.5vw, 6.6rem)",
};

export const layoutTokens = {
  gutterInline: "clamp(0.9rem, 3.75vw, 2.5rem)",
  gutterBlock: "clamp(1.1rem, 5.25vw, 3rem)",
  stackGap: "clamp(1rem, 4vw, 2.75rem)",
  clusterGap: "clamp(0.6rem, 3.5vw, 1.75rem)",
  contentMaxWidth: "min(70rem, 92vw)",
  contentNarrow: "min(40rem, 94vw)",
  cardPadding: "clamp(1rem, 2.75vw, 2rem)",
  sectionHeaderGap: "clamp(0.75rem, 2.5vw, 1.5rem)",
  touchTargetMin: "clamp(2.75rem, 2.4rem + 0.8vw, 3.25rem)",
};

export const radiusScale = {
  xs: "6px",
  sm: "10px",
  md: "14px",
  lg: "20px",
  xl: "28px",
  pill: "999px",
  full: "9999px",
};

export const motionTokens = {
  duration: {
    instant: "80ms",
    shortest: "120ms",
    shorter: "160ms",
    short: "220ms",
    medium: "320ms",
    long: "480ms",
  },
  easing: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    emphasized: "cubic-bezier(0.32, 0.94, 0.6, 1)",
    entrance: "cubic-bezier(0.3, 0, 0.45, 1)",
    exit: "cubic-bezier(0.35, 0, 0.65, 1)",
  },
  reduceMotionPreference: "(prefers-reduced-motion: reduce)",
};

export const shadowTokens = {
  xs: "0 1px 2px rgba(154, 17, 44, 0.18)",
  sm: "0 4px 12px rgba(154, 17, 44, 0.24)",
  md: "0 12px 24px rgba(200, 24, 58, 0.3)",
  lg: "0 18px 40px rgba(200, 24, 58, 0.36)",
};

const colorRamps = {
  primary: {
    50: "#FFF3F5",
    100: "#FFE0E5",
    200: "#FFBAC4",
    300: "#FF8899",
    400: "#F85A73",
    500: "#E83856",
    600: "#C8183A",
    700: "#9A112C",
    800: "#6C0A1D",
    900: "#39040F",
  },
  accent: {
    50: "#FFF6F1",
    100: "#FFE7D9",
    200: "#FFCEB3",
    300: "#FFAF86",
    400: "#FF905C",
    500: "#F26F3E",
    600: "#CC5126",
    700: "#A03A1B",
    800: "#702611",
    900: "#3A1409",
  },
  neutral: {
    50: "#FFF7F7",
    100: "#FBE9E9",
    200: "#F3D4D5",
    300: "#E4B4B7",
    400: "#C89094",
    500: "#A76F74",
    600: "#825359",
    700: "#5D3A3F",
    800: "#3A2327",
    900: "#1F1114",
  },
  success: {
    50: "#ECFDF5",
    100: "#D1FAE5",
    200: "#A7F3D0",
    300: "#6EE7B7",
    400: "#34D399",
    500: "#10B981",
    600: "#059669",
  },
  info: {
    50: "#F0F9FF",
    100: "#E0F2FE",
    200: "#BAE6FD",
    300: "#7DD3FC",
    400: "#38BDF8",
    500: "#0EA5E9",
    600: "#0284C7",
  },
  warning: {
    50: "#FFFBEB",
    100: "#FEF3C7",
    200: "#FDE68A",
    300: "#FCD34D",
    400: "#FBBF24",
    500: "#F59E0B",
    600: "#D97706",
  },
  danger: {
    50: "#FFF2F3",
    100: "#FFE1E3",
    200: "#FFC1C6",
    300: "#FF969F",
    400: "#F56A78",
    500: "#E23D4E",
    600: "#BB1F32",
  },
};

const lightTheme = {
  name: "Light+",
  bg: "#FFF7F8",
  surface: "#FFE8EC",
  surfaceAlt: "#FFD4DB",
  surfaceMuted: "#F9BEC7",
  text: "#410610",
  textMuted: "#9A112C",
  textMutedStrong: "#6C0A1D",
  textInverse: "#FFF9FA",
  buttonText: "#2C040B",
  primary: colorRamps.primary[600],
  primaryContrast: "#FFF7F8",
  primarySoft: "rgba(200, 24, 58, 0.16)",
  secondary: colorRamps.accent[500],
  accent: colorRamps.accent[500],
  success: colorRamps.success[500],
  info: colorRamps.info[500],
  warning: colorRamps.warning[500],
  danger: colorRamps.danger[600],
  border: "rgba(154, 17, 44, 0.28)",
  borderMuted: "rgba(154, 17, 44, 0.18)",
  borderStrong: "rgba(76, 8, 21, 0.42)",
  muted: "rgba(200, 24, 58, 0.1)",
  ring: "rgba(232, 56, 86, 0.42)",
  overlay: "rgba(62, 6, 20, 0.24)",
  scrim: "rgba(45, 5, 16, 0.2)",

  // Subtle ruby luminous wash for light mode
  backgroundImage: `radial-gradient(1240px 620px at 12% -14%, rgba(232, 56, 86, 0.16), transparent 72%), radial-gradient(920px 520px at 88% -6%, rgba(200, 24, 58, 0.12), transparent 78%)`,
};

const darkTheme = {
  name: "Dark+",
  bg: "#140208",
  surface: "#1C040D",
  surfaceAlt: "#260512",
  surfaceMuted: "#33081A",
  text: "#FFE3E7",
  textMuted: "#FF9FB2",
  textMutedStrong: "#FFC1CC",
  textInverse: "#1B0308",
  buttonText: "#180309",
  primary: colorRamps.primary[400],
  primaryContrast: "#1B0308",
  primarySoft: "rgba(232, 56, 86, 0.22)",
  secondary: colorRamps.accent[400],
  accent: colorRamps.accent[400],
  success: colorRamps.success[300],
  info: colorRamps.info[300],
  warning: colorRamps.warning[400],
  danger: colorRamps.danger[400],
  border: "rgba(232, 56, 86, 0.28)",
  borderMuted: "rgba(232, 56, 86, 0.18)",
  borderStrong: "rgba(232, 56, 86, 0.38)",
  muted: "rgba(232, 56, 86, 0.16)",
  ring: "rgba(232, 56, 86, 0.52)",
  overlay: "rgba(12, 2, 5, 0.72)",
  scrim: "rgba(12, 2, 5, 0.54)",

  // Deep ruby gradient for dark mode
  backgroundImage: `radial-gradient(1320px 600px at 12% -16%, rgba(232, 56, 86, 0.3), transparent 72%), radial-gradient(1000px 600px at 84% -8%, rgba(200, 24, 58, 0.22), transparent 76%), linear-gradient(180deg, #140208 0%, #1F0410 46%, #31081B 100%)`,
};

const componentButtonTokensLight = {
  primary: {
    bg: lightTheme.primary,
    fg: lightTheme.primaryContrast,
    border: "transparent",
    hoverBg: colorRamps.primary[500],
    hoverFg: lightTheme.primaryContrast,
    hoverBorder: "transparent",
    shadow: "0 12px 32px rgba(154, 17, 44, 0.24)",
    hoverShadow: "0 16px 36px rgba(154, 17, 44, 0.3)",
    spinner: "rgba(255, 244, 250, 0.78)",
  },
  secondary: {
    bg: lightTheme.surfaceAlt,
    fg: lightTheme.text,
    border: "rgba(154, 17, 44, 0.35)",
    hoverBg: lightTheme.surface,
    hoverFg: lightTheme.primary,
    hoverBorder: "rgba(154, 17, 44, 0.55)",
    shadow: "0 6px 18px rgba(154, 17, 44, 0.16)",
    hoverShadow: "0 8px 22px rgba(154, 17, 44, 0.22)",
    spinner: "rgba(62, 6, 20, 0.55)",
  },
  subtle: {
    bg: lightTheme.primarySoft,
    fg: lightTheme.primary,
    border: "rgba(200, 24, 58, 0.38)",
    hoverBg: "rgba(154, 17, 44, 0.24)",
    hoverFg: lightTheme.primary,
    hoverBorder: "rgba(200, 24, 58, 0.58)",
    shadow: "none",
    hoverShadow: "none",
    spinner: "rgba(154, 17, 44, 0.72)",
  },
  ghost: {
    bg: "transparent",
    fg: lightTheme.text,
    border: "transparent",
    hoverBg: "rgba(154, 17, 44, 0.1)",
    hoverFg: lightTheme.primary,
    hoverBorder: "transparent",
    shadow: "none",
    hoverShadow: "none",
    spinner: "rgba(62, 6, 20, 0.5)",
  },
  destructive: {
    bg: lightTheme.danger,
    fg: lightTheme.buttonText,
    border: "transparent",
    hoverBg: colorRamps.danger[500],
    hoverFg: lightTheme.buttonText,
    hoverBorder: "transparent",
    shadow: "0 12px 30px rgba(187, 31, 50, 0.24)",
    hoverShadow: "0 16px 34px rgba(187, 31, 50, 0.32)",
    spinner: "rgba(62, 6, 20, 0.6)",
  },
  tone: {
    neutral: {
      bg: lightTheme.surfaceMuted,
      fg: lightTheme.text,
      border: "rgba(154, 17, 44, 0.32)",
      hoverBg: lightTheme.surface,
      hoverFg: lightTheme.text,
      hoverBorder: "rgba(154, 17, 44, 0.45)",
      shadow: "none",
      hoverShadow: "none",
      spinner: "rgba(154, 17, 44, 0.55)",
    },
    accent: {
      bg: "rgba(242, 111, 62, 0.16)",
      fg: lightTheme.accent,
      border: "rgba(242, 111, 62, 0.42)",
      hoverBg: "rgba(242, 111, 62, 0.22)",
      hoverFg: lightTheme.accent,
      hoverBorder: "rgba(242, 111, 62, 0.55)",
      shadow: "none",
      hoverShadow: "none",
      spinner: "rgba(204, 81, 38, 0.82)",
    },
    info: {
      bg: "rgba(14, 165, 233, 0.16)",
      fg: lightTheme.info,
      border: "rgba(14, 165, 233, 0.42)",
      hoverBg: "rgba(14, 165, 233, 0.23)",
      hoverFg: lightTheme.info,
      hoverBorder: "rgba(14, 165, 233, 0.55)",
      shadow: "none",
      hoverShadow: "none",
      spinner: "rgba(14, 165, 233, 0.82)",
    },
    success: {
      bg: "rgba(16, 185, 129, 0.16)",
      fg: lightTheme.success,
      border: "rgba(16, 185, 129, 0.42)",
      hoverBg: "rgba(16, 185, 129, 0.22)",
      hoverFg: lightTheme.success,
      hoverBorder: "rgba(16, 185, 129, 0.55)",
      shadow: "none",
      hoverShadow: "none",
      spinner: "rgba(16, 185, 129, 0.8)",
    },
    warning: {
      bg: "rgba(245, 158, 11, 0.22)",
      fg: lightTheme.warning,
      border: "rgba(245, 158, 11, 0.45)",
      hoverBg: "rgba(245, 158, 11, 0.28)",
      hoverFg: lightTheme.warning,
      hoverBorder: "rgba(245, 158, 11, 0.58)",
      shadow: "none",
      hoverShadow: "none",
      spinner: "rgba(245, 158, 11, 0.8)",
    },
    danger: {
      bg: "rgba(226, 61, 78, 0.22)",
      fg: lightTheme.danger,
      border: "rgba(226, 61, 78, 0.48)",
      hoverBg: "rgba(226, 61, 78, 0.28)",
      hoverFg: lightTheme.danger,
      hoverBorder: "rgba(226, 61, 78, 0.6)",
      shadow: "none",
      hoverShadow: "none",
      spinner: "rgba(226, 61, 78, 0.82)",
    },
  },
};

const componentButtonTokensDark = {
  primary: {
    bg: darkTheme.primary,
    fg: darkTheme.primaryContrast,
    border: "transparent",
    hoverBg: colorRamps.primary[300],
    hoverFg: darkTheme.primaryContrast,
    hoverBorder: "transparent",
    shadow: "0 12px 32px rgba(154, 17, 44, 0.32)",
    hoverShadow: "0 16px 36px rgba(154, 17, 44, 0.38)",
    spinner: "rgba(255, 237, 245, 0.7)",
  },
  secondary: {
    bg: darkTheme.surfaceAlt,
    fg: darkTheme.text,
    border: "rgba(232, 56, 86, 0.28)",
    hoverBg: darkTheme.surface,
    hoverFg: darkTheme.primary,
    hoverBorder: "rgba(232, 56, 86, 0.45)",
    shadow: "0 8px 24px rgba(12, 1, 5, 0.48)",
    hoverShadow: "0 10px 28px rgba(12, 1, 5, 0.55)",
    spinner: "rgba(232, 56, 86, 0.6)",
  },
  subtle: {
    bg: darkTheme.primarySoft,
    fg: darkTheme.primary,
    border: "rgba(232, 56, 86, 0.38)",
    hoverBg: "rgba(154, 17, 44, 0.22)",
    hoverFg: darkTheme.primary,
    hoverBorder: "rgba(232, 56, 86, 0.58)",
    shadow: "none",
    hoverShadow: "none",
    spinner: "rgba(232, 56, 86, 0.72)",
  },
  ghost: {
    bg: "transparent",
    fg: darkTheme.text,
    border: "transparent",
    hoverBg: "rgba(232, 56, 86, 0.12)",
    hoverFg: darkTheme.primary,
    hoverBorder: "transparent",
    shadow: "none",
    hoverShadow: "none",
    spinner: "rgba(232, 56, 86, 0.6)",
  },
  destructive: {
    bg: darkTheme.danger,
    fg: darkTheme.buttonText,
    border: "transparent",
    hoverBg: colorRamps.danger[500],
    hoverFg: darkTheme.buttonText,
    hoverBorder: "transparent",
    shadow: "0 12px 30px rgba(187, 31, 50, 0.28)",
    hoverShadow: "0 16px 34px rgba(187, 31, 50, 0.36)",
    spinner: "rgba(255, 237, 245, 0.68)",
  },
  tone: {
    neutral: {
      bg: darkTheme.surfaceMuted,
      fg: darkTheme.text,
      border: "rgba(232, 56, 86, 0.24)",
      hoverBg: darkTheme.surface,
      hoverFg: darkTheme.text,
      hoverBorder: "rgba(232, 56, 86, 0.32)",
      shadow: "none",
      hoverShadow: "none",
      spinner: "rgba(232, 56, 86, 0.55)",
    },
    accent: {
      bg: "rgba(242, 111, 62, 0.2)",
      fg: darkTheme.accent,
      border: "rgba(242, 111, 62, 0.45)",
      hoverBg: "rgba(242, 111, 62, 0.26)",
      hoverFg: darkTheme.accent,
      hoverBorder: "rgba(242, 111, 62, 0.58)",
      shadow: "none",
      hoverShadow: "none",
      spinner: "rgba(204, 81, 38, 0.82)",
    },
    info: {
      bg: "rgba(14, 165, 233, 0.2)",
      fg: darkTheme.info,
      border: "rgba(14, 165, 233, 0.45)",
      hoverBg: "rgba(14, 165, 233, 0.26)",
      hoverFg: darkTheme.info,
      hoverBorder: "rgba(14, 165, 233, 0.58)",
      shadow: "none",
      hoverShadow: "none",
      spinner: "rgba(14, 165, 233, 0.8)",
    },
    success: {
      bg: "rgba(16, 185, 129, 0.2)",
      fg: darkTheme.success,
      border: "rgba(16, 185, 129, 0.45)",
      hoverBg: "rgba(16, 185, 129, 0.26)",
      hoverFg: darkTheme.success,
      hoverBorder: "rgba(16, 185, 129, 0.58)",
      shadow: "none",
      hoverShadow: "none",
      spinner: "rgba(52, 211, 153, 0.82)",
    },
    warning: {
      bg: "rgba(245, 158, 11, 0.24)",
      fg: darkTheme.warning,
      border: "rgba(245, 158, 11, 0.52)",
      hoverBg: "rgba(245, 158, 11, 0.32)",
      hoverFg: darkTheme.warning,
      hoverBorder: "rgba(245, 158, 11, 0.65)",
      shadow: "none",
      hoverShadow: "none",
      spinner: "rgba(245, 158, 11, 0.8)",
    },
    danger: {
      bg: "rgba(226, 61, 78, 0.24)",
      fg: darkTheme.danger,
      border: "rgba(226, 61, 78, 0.52)",
      hoverBg: "rgba(226, 61, 78, 0.32)",
      hoverFg: darkTheme.danger,
      hoverBorder: "rgba(226, 61, 78, 0.65)",
      shadow: "none",
      hoverShadow: "none",
      spinner: "rgba(226, 61, 78, 0.82)",
    },
  },
};

const componentBadgeTokensLight = {
  neutral: {
    soft: {
      bg: "rgba(154, 17, 44, 0.16)",
      border: "rgba(154, 17, 44, 0.32)",
      fg: lightTheme.textMuted,
    },
    solid: {
      bg: lightTheme.textMuted,
      border: "transparent",
      fg: lightTheme.textInverse,
    },
    outline: {
      bg: "transparent",
      border: "rgba(154, 17, 44, 0.48)",
      fg: lightTheme.textMuted,
    },
  },
  primary: {
    soft: {
      bg: "rgba(200, 24, 58, 0.12)",
      border: "rgba(200, 24, 58, 0.32)",
      fg: lightTheme.primary,
    },
    solid: {
      bg: lightTheme.primary,
      border: "transparent",
      fg: lightTheme.primaryContrast,
    },
    outline: {
      bg: "transparent",
      border: "rgba(200, 24, 58, 0.48)",
      fg: lightTheme.primary,
    },
  },
  accent: {
    soft: {
      bg: "rgba(242, 111, 62, 0.14)",
      border: "rgba(242, 111, 62, 0.34)",
      fg: lightTheme.accent,
    },
    solid: {
      bg: lightTheme.accent,
      border: "transparent",
      fg: lightTheme.primaryContrast,
    },
    outline: {
      bg: "transparent",
      border: "rgba(242, 111, 62, 0.5)",
      fg: lightTheme.accent,
    },
  },
  success: {
    soft: {
      bg: "rgba(16, 185, 129, 0.16)",
      border: "rgba(16, 185, 129, 0.32)",
      fg: lightTheme.success,
    },
    solid: {
      bg: lightTheme.success,
      border: "transparent",
      fg: lightTheme.textInverse,
    },
    outline: {
      bg: "transparent",
      border: "rgba(16, 185, 129, 0.45)",
      fg: lightTheme.success,
    },
  },
  info: {
    soft: {
      bg: "rgba(14, 165, 233, 0.18)",
      border: "rgba(14, 165, 233, 0.32)",
      fg: lightTheme.info,
    },
    solid: {
      bg: lightTheme.info,
      border: "transparent",
      fg: lightTheme.textInverse,
    },
    outline: {
      bg: "transparent",
      border: "rgba(14, 165, 233, 0.45)",
      fg: lightTheme.info,
    },
  },
  warning: {
    soft: {
      bg: "rgba(245, 158, 11, 0.2)",
      border: "rgba(245, 158, 11, 0.4)",
      fg: lightTheme.warning,
    },
    solid: {
      bg: lightTheme.warning,
      border: "transparent",
      fg: lightTheme.textInverse,
    },
    outline: {
      bg: "transparent",
      border: "rgba(245, 158, 11, 0.55)",
      fg: lightTheme.warning,
    },
  },
  danger: {
    soft: {
      bg: "rgba(226, 61, 78, 0.18)",
      border: "rgba(226, 61, 78, 0.4)",
      fg: lightTheme.danger,
    },
    solid: {
      bg: lightTheme.danger,
      border: "transparent",
      fg: lightTheme.textInverse,
    },
    outline: {
      bg: "transparent",
      border: "rgba(226, 61, 78, 0.55)",
      fg: lightTheme.danger,
    },
  },
};

const componentBadgeTokensDark = {
  neutral: {
    soft: {
      bg: "rgba(232, 56, 86, 0.2)",
      border: "rgba(232, 56, 86, 0.32)",
      fg: darkTheme.textMuted,
    },
    solid: {
      bg: darkTheme.textMuted,
      border: "transparent",
      fg: darkTheme.textInverse,
    },
    outline: {
      bg: "transparent",
      border: "rgba(232, 56, 86, 0.48)",
      fg: darkTheme.textMuted,
    },
  },
  primary: {
    soft: {
      bg: "rgba(232, 56, 86, 0.2)",
      border: "rgba(232, 56, 86, 0.38)",
      fg: darkTheme.primary,
    },
    solid: {
      bg: darkTheme.primary,
      border: "transparent",
      fg: darkTheme.primaryContrast,
    },
    outline: {
      bg: "transparent",
      border: "rgba(232, 56, 86, 0.52)",
      fg: darkTheme.primary,
    },
  },
  accent: {
    soft: {
      bg: "rgba(242, 111, 62, 0.22)",
      border: "rgba(242, 111, 62, 0.42)",
      fg: darkTheme.accent,
    },
    solid: {
      bg: darkTheme.accent,
      border: "transparent",
      fg: darkTheme.primaryContrast,
    },
    outline: {
      bg: "transparent",
      border: "rgba(242, 111, 62, 0.55)",
      fg: darkTheme.accent,
    },
  },
  success: {
    soft: {
      bg: "rgba(16, 185, 129, 0.18)",
      border: "rgba(16, 185, 129, 0.35)",
      fg: darkTheme.success,
    },
    solid: {
      bg: darkTheme.success,
      border: "transparent",
      fg: darkTheme.textInverse,
    },
    outline: {
      bg: "transparent",
      border: "rgba(16, 185, 129, 0.5)",
      fg: darkTheme.success,
    },
  },
  info: {
    soft: {
      bg: "rgba(14, 165, 233, 0.2)",
      border: "rgba(14, 165, 233, 0.38)",
      fg: darkTheme.info,
    },
    solid: {
      bg: darkTheme.info,
      border: "transparent",
      fg: darkTheme.textInverse,
    },
    outline: {
      bg: "transparent",
      border: "rgba(14, 165, 233, 0.5)",
      fg: darkTheme.info,
    },
  },
  warning: {
    soft: {
      bg: "rgba(245, 158, 11, 0.24)",
      border: "rgba(245, 158, 11, 0.48)",
      fg: darkTheme.warning,
    },
    solid: {
      bg: darkTheme.warning,
      border: "transparent",
      fg: darkTheme.textInverse,
    },
    outline: {
      bg: "transparent",
      border: "rgba(245, 158, 11, 0.6)",
      fg: darkTheme.warning,
    },
  },
  danger: {
    soft: {
      bg: "rgba(226, 61, 78, 0.24)",
      border: "rgba(226, 61, 78, 0.48)",
      fg: darkTheme.danger,
    },
    solid: {
      bg: darkTheme.danger,
      border: "transparent",
      fg: darkTheme.textInverse,
    },
    outline: {
      bg: "transparent",
      border: "rgba(226, 61, 78, 0.6)",
      fg: darkTheme.danger,
    },
  },
};

const semanticColorTokens = {
  light: {
    ...lightTheme,
    components: {
      button: componentButtonTokensLight,
      badge: componentBadgeTokensLight,
    },
  },
  dark: {
    ...darkTheme,
    components: {
      button: componentButtonTokensDark,
      badge: componentBadgeTokensDark,
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
      reduceMotion: motionTokens.reduceMotionPreference,
    },
  },
  aliases: {
    css: themeAliasTokens,
  },
};

let globalTokensApplied = false;
const lastAppliedTheme = { root: null, mode: null };

function resolveThemeMode(candidate) {
  if (VALID_THEME_MODES.has(candidate)) {
    return candidate;
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

const VALID_THEME_MODES = new Set(["dark"]); // single-mode by design
const DEFAULT_THEME_MODE = "dark";

export function applyThemeToDocument(mode = "dark", target) {
  const root =
    target ??
    (typeof document !== "undefined" ? document.documentElement : undefined);
  if (!root) return;
  applyGlobalTokens(root);

  const resolvedMode = resolveThemeMode(mode);
  if (
    lastAppliedTheme.root === root &&
    lastAppliedTheme.mode === resolvedMode
  ) {
    return;
  }

  const cssAliases = themeAliasTokens[resolvedMode] ?? themeAliasTokens.dark;
  Object.entries(cssAliases).forEach(([cssVar, value]) => {
    root.style.setProperty(cssVar, String(value ?? ""));
  });

  // Apply dataset + color-scheme
  root.dataset.theme = resolvedMode;
  root.dataset.colorScheme = resolvedMode;
  const colorScheme = resolvedMode === "dark" ? "dark" : "light";
  root.style.colorScheme = colorScheme;
  root.style.setProperty("color-scheme", colorScheme);

  // If you want body to pick up the gradient automatically:
  // You can reference var(--app-bg-image) in your global CSS
  lastAppliedTheme.root = root;
  lastAppliedTheme.mode = resolvedMode;
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
    if (VALID_THEME_MODES.has(stored ?? "")) {
      return stored;
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
    if (VALID_THEME_MODES.has(mode)) {
      window.localStorage?.setItem(THEME_STORAGE_KEY, mode);
    } else {
      window.localStorage?.removeItem(THEME_STORAGE_KEY);
    }
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

export function useTheme() {
  useEffect(() => {
    applyThemeToDocument("dark");
  }, []);

  const setMode = useCallback(() => {}, []);
  const toggleMode = useCallback(() => {}, []);

  return useMemo(
    () => ({
      mode: "dark",
      isDark: true,
      setMode,
      toggleMode,
      hasExplicitMode: true,
    }),
    [setMode, toggleMode],
  );
}
