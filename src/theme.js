import { useCallback, useEffect, useMemo, useState } from 'react'

export const typographyScale = {
  50: {
    fontSize: 'clamp(0.6875rem, 0.6725rem + 0.1vw, 0.725rem)',
    lineHeight: 'clamp(1rem, 0.97rem + 0.08vw, 1.05rem)',
    letterSpacing: '0.04em',
  },
  75: {
    fontSize: 'clamp(0.75rem, 0.73rem + 0.12vw, 0.82rem)',
    lineHeight: 'clamp(1.05rem, 1rem + 0.1vw, 1.12rem)',
    letterSpacing: '0.03em',
  },
  100: {
    fontSize: 'clamp(0.8125rem, 0.78rem + 0.15vw, 0.9rem)',
    lineHeight: 'clamp(1.1rem, 1.04rem + 0.12vw, 1.22rem)',
    letterSpacing: '0.02em',
  },
  200: {
    fontSize: 'clamp(0.875rem, 0.82rem + 0.2vw, 1rem)',
    lineHeight: 'clamp(1.2rem, 1.12rem + 0.16vw, 1.35rem)',
    letterSpacing: '0.015em',
  },
  300: {
    fontSize: 'clamp(0.9375rem, 0.87rem + 0.24vw, 1.06rem)',
    lineHeight: 'clamp(1.35rem, 1.25rem + 0.2vw, 1.55rem)',
    letterSpacing: '0.01em',
  },
  400: {
    fontSize: 'clamp(1rem, 0.94rem + 0.3vw, 1.125rem)',
    lineHeight: 'clamp(1.45rem, 1.32rem + 0.36vw, 1.68rem)',
    letterSpacing: '0em',
  },
  500: {
    fontSize: 'clamp(1.125rem, 1.03rem + 0.38vw, 1.3rem)',
    lineHeight: 'clamp(1.55rem, 1.42rem + 0.4vw, 1.85rem)',
    letterSpacing: '-0.005em',
  },
  600: {
    fontSize: 'clamp(1.25rem, 1.12rem + 0.48vw, 1.5rem)',
    lineHeight: 'clamp(1.6rem, 1.48rem + 0.45vw, 2rem)',
    letterSpacing: '-0.01em',
  },
  700: {
    fontSize: 'clamp(1.5rem, 1.32rem + 0.62vw, 1.85rem)',
    lineHeight: 'clamp(1.75rem, 1.58rem + 0.58vw, 2.2rem)',
    letterSpacing: '-0.012em',
  },
  800: {
    fontSize: 'clamp(1.875rem, 1.62rem + 0.82vw, 2.25rem)',
    lineHeight: 'clamp(2.1rem, 1.88rem + 0.75vw, 2.55rem)',
    letterSpacing: '-0.015em',
  },
  900: {
    fontSize: 'clamp(2.25rem, 1.96rem + 1vw, 2.65rem)',
    lineHeight: 'clamp(2.4rem, 2.1rem + 0.9vw, 2.95rem)',
    letterSpacing: '-0.018em',
  },
  1000: {
    fontSize: 'clamp(3rem, 2.5rem + 1.4vw, 3.5rem)',
    lineHeight: 'clamp(3.2rem, 2.7rem + 1.6vw, 3.8rem)',
    letterSpacing: '-0.02em',
  },
}

export const fontFamilyTokens = {
  sans: "'Inter', 'Segoe UI', system-ui, sans-serif",
  display: "'Satoshi', 'Inter', 'Segoe UI', system-ui, sans-serif",
  mono: "'JetBrains Mono', 'SFMono-Regular', Consolas, monospace",
}

export const fontWeightTokens = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
}

export const spacingScale = {
  0: '0px',
  1: 'clamp(0.25rem, 0.22rem + 0.12vw, 0.4rem)',
  2: 'clamp(0.45rem, 0.38rem + 0.16vw, 0.65rem)',
  3: 'clamp(0.6rem, 0.5rem + 0.2vw, 0.85rem)',
  4: 'clamp(0.85rem, 0.72rem + 0.26vw, 1.2rem)',
  5: 'clamp(1.1rem, 0.92rem + 0.32vw, 1.5rem)',
  6: 'clamp(1.35rem, 1.12rem + 0.4vw, 1.85rem)',
  7: 'clamp(1.6rem, 1.28rem + 0.48vw, 2.1rem)',
  8: 'clamp(1.9rem, 1.5rem + 0.6vw, 2.4rem)',
  9: 'clamp(2.2rem, 1.7rem + 0.72vw, 2.8rem)',
  10: 'clamp(2.6rem, 2rem + 0.84vw, 3.4rem)',
  11: 'clamp(3rem, 2.3rem + 0.96vw, 3.8rem)',
  12: 'clamp(3.4rem, 2.6rem + 1.05vw, 4.2rem)',
  13: 'clamp(3.8rem, 2.9rem + 1.2vw, 4.8rem)',
  14: 'clamp(4.4rem, 3.3rem + 1.35vw, 5.6rem)',
  15: 'clamp(5rem, 3.7rem + 1.5vw, 6.6rem)',
}

export const layoutTokens = {
  gutterInline: 'clamp(0.9rem, 3.75vw, 2.5rem)',
  gutterBlock: 'clamp(1.1rem, 5.25vw, 3rem)',
  stackGap: 'clamp(1rem, 4vw, 2.75rem)',
  clusterGap: 'clamp(0.6rem, 3.5vw, 1.75rem)',
  contentMaxWidth: 'min(70rem, 92vw)',
  contentNarrow: 'min(40rem, 94vw)',
  cardPadding: 'clamp(1rem, 2.75vw, 2rem)',
  sectionHeaderGap: 'clamp(0.75rem, 2.5vw, 1.5rem)',
  touchTargetMin: 'clamp(2.75rem, 2.4rem + 0.8vw, 3.25rem)',
}

export const radiusScale = {
  xs: '6px',
  sm: '10px',
  md: '14px',
  lg: '20px',
  xl: '28px',
  pill: '999px',
  full: '9999px',
}

export const motionTokens = {
  duration: {
    instant: '80ms',
    shortest: '120ms',
    shorter: '160ms',
    short: '220ms',
    medium: '320ms',
    long: '480ms',
  },
  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    emphasized: 'cubic-bezier(0.32, 0.94, 0.6, 1)',
    entrance: 'cubic-bezier(0.3, 0, 0.45, 1)',
    exit: 'cubic-bezier(0.35, 0, 0.65, 1)',
  },
  reduceMotionPreference: '(prefers-reduced-motion: reduce)',
}

export const shadowTokens = {
  xs: '0 1px 2px rgba(15, 23, 42, 0.16)',
  sm: '0 4px 12px rgba(15, 23, 42, 0.22)',
  md: '0 12px 24px rgba(15, 23, 42, 0.28)',
  lg: '0 18px 40px rgba(15, 23, 42, 0.32)',
}

const colorRamps = {
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  accent: {
    50: '#ECFEFF',
    100: '#CFFAFE',
    200: '#A5F3FC',
    300: '#67E8F9',
    400: '#22D3EE',
    500: '#06B6D4',
    600: '#0891B2',
    700: '#0E7490',
    800: '#155E75',
    900: '#164E63',
  },
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5F5',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  success: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
  },
  info: {
    50: '#F0F9FF',
    100: '#E0F2FE',
    200: '#BAE6FD',
    300: '#7DD3FC',
    400: '#38BDF8',
    500: '#0EA5E9',
    600: '#0284C7',
  },
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
  },
  danger: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
  },
}

const lightTheme = {
  name: 'Light+',
  bg: colorRamps.neutral[50],
  surface: '#FFFFFF',
  surfaceAlt: colorRamps.neutral[100],
  surfaceMuted: colorRamps.neutral[200],
  text: colorRamps.neutral[900],
  textMuted: colorRamps.neutral[600],
  textMutedStrong: colorRamps.neutral[800],
  textInverse: '#FFFFFF',
  buttonText: '#0F172A',
  primary: colorRamps.primary[600],
  primaryContrast: '#FFFFFF',
  primarySoft: 'rgba(37, 99, 235, 0.14)',
  secondary: '#7C3AED',
  accent: colorRamps.accent[600],
  success: colorRamps.success[500],
  info: colorRamps.info[500],
  warning: colorRamps.warning[500],
  danger: colorRamps.danger[600],
  border: 'rgba(148, 163, 184, 0.35)',
  borderMuted: 'rgba(148, 163, 184, 0.18)',
  borderStrong: 'rgba(15, 23, 42, 0.32)',
  muted: 'rgba(15, 23, 42, 0.06)',
  ring: 'rgba(59, 130, 246, 0.45)',
  overlay: 'rgba(15, 23, 42, 0.55)',
  scrim: 'rgba(15, 23, 42, 0.38)',
}

const darkTheme = {
  name: 'Dark+',
  bg: '#050A18',
  surface: '#0B1120',
  surfaceAlt: '#111C2E',
  surfaceMuted: '#14213B',
  text: '#F8FAFC',
  textMuted: '#94A3B8',
  textMutedStrong: '#CBD5F5',
  textInverse: '#050A18',
  buttonText: '#0B1120',
  primary: colorRamps.primary[300],
  primaryContrast: '#020617',
  primarySoft: 'rgba(96, 165, 250, 0.14)',
  secondary: '#A855F7',
  accent: colorRamps.accent[300],
  success: colorRamps.success[300],
  info: colorRamps.info[300],
  warning: colorRamps.warning[400],
  danger: colorRamps.danger[400],
  border: 'rgba(148, 163, 184, 0.24)',
  borderMuted: 'rgba(148, 163, 184, 0.16)',
  borderStrong: 'rgba(148, 163, 184, 0.32)',
  muted: 'rgba(148, 163, 184, 0.12)',
  ring: 'rgba(56, 189, 248, 0.65)',
  overlay: 'rgba(2, 6, 23, 0.68)',
  scrim: 'rgba(2, 6, 23, 0.5)',
}

const componentButtonTokensLight = {
  primary: {
    bg: lightTheme.primary,
    fg: lightTheme.primaryContrast,
    border: 'transparent',
    hoverBg: colorRamps.primary[500],
    hoverFg: lightTheme.primaryContrast,
    hoverBorder: 'transparent',
    shadow: '0 12px 32px rgba(37, 99, 235, 0.22)',
    hoverShadow: '0 16px 36px rgba(37, 99, 235, 0.28)',
    spinner: 'rgba(255, 255, 255, 0.7)',
  },
  secondary: {
    bg: lightTheme.surfaceAlt,
    fg: lightTheme.text,
    border: 'rgba(148, 163, 184, 0.45)',
    hoverBg: lightTheme.surface,
    hoverFg: lightTheme.primary,
    hoverBorder: 'rgba(96, 165, 250, 0.55)',
    shadow: '0 6px 18px rgba(148, 163, 184, 0.18)',
    hoverShadow: '0 8px 20px rgba(148, 163, 184, 0.26)',
    spinner: 'rgba(15, 23, 42, 0.55)',
  },
  subtle: {
    bg: lightTheme.primarySoft,
    fg: lightTheme.primary,
    border: 'rgba(96, 165, 250, 0.35)',
    hoverBg: 'rgba(37, 99, 235, 0.22)',
    hoverFg: lightTheme.primary,
    hoverBorder: 'rgba(96, 165, 250, 0.55)',
    shadow: 'none',
    hoverShadow: 'none',
    spinner: 'rgba(37, 99, 235, 0.75)',
  },
  ghost: {
    bg: 'transparent',
    fg: lightTheme.text,
    border: 'transparent',
    hoverBg: 'rgba(15, 23, 42, 0.06)',
    hoverFg: lightTheme.primary,
    hoverBorder: 'transparent',
    shadow: 'none',
    hoverShadow: 'none',
    spinner: 'rgba(15, 23, 42, 0.55)',
  },
  destructive: {
    bg: lightTheme.danger,
    fg: lightTheme.buttonText,
    border: 'transparent',
    hoverBg: colorRamps.danger[500],
    hoverFg: lightTheme.buttonText,
    hoverBorder: 'transparent',
    shadow: '0 12px 30px rgba(239, 68, 68, 0.22)',
    hoverShadow: '0 16px 34px rgba(239, 68, 68, 0.28)',
    spinner: 'rgba(15, 23, 42, 0.6)',
  },
  tone: {
    neutral: {
      bg: lightTheme.surfaceMuted,
      fg: lightTheme.text,
      border: 'rgba(148, 163, 184, 0.38)',
      hoverBg: lightTheme.surface,
      hoverFg: lightTheme.text,
      hoverBorder: 'rgba(148, 163, 184, 0.5)',
      shadow: 'none',
      hoverShadow: 'none',
      spinner: 'rgba(148, 163, 184, 0.6)',
    },
    accent: {
      bg: 'rgba(6, 182, 212, 0.16)',
      fg: lightTheme.accent,
      border: 'rgba(6, 182, 212, 0.42)',
      hoverBg: 'rgba(6, 182, 212, 0.22)',
      hoverFg: lightTheme.accent,
      hoverBorder: 'rgba(6, 182, 212, 0.55)',
      shadow: 'none',
      hoverShadow: 'none',
      spinner: 'rgba(6, 182, 212, 0.82)',
    },
    info: {
      bg: 'rgba(14, 165, 233, 0.16)',
      fg: lightTheme.info,
      border: 'rgba(14, 165, 233, 0.42)',
      hoverBg: 'rgba(14, 165, 233, 0.23)',
      hoverFg: lightTheme.info,
      hoverBorder: 'rgba(14, 165, 233, 0.55)',
      shadow: 'none',
      hoverShadow: 'none',
      spinner: 'rgba(14, 165, 233, 0.82)',
    },
    success: {
      bg: 'rgba(16, 185, 129, 0.16)',
      fg: lightTheme.success,
      border: 'rgba(16, 185, 129, 0.42)',
      hoverBg: 'rgba(16, 185, 129, 0.22)',
      hoverFg: lightTheme.success,
      hoverBorder: 'rgba(16, 185, 129, 0.55)',
      shadow: 'none',
      hoverShadow: 'none',
      spinner: 'rgba(16, 185, 129, 0.8)',
    },
    warning: {
      bg: 'rgba(245, 158, 11, 0.22)',
      fg: lightTheme.warning,
      border: 'rgba(245, 158, 11, 0.45)',
      hoverBg: 'rgba(245, 158, 11, 0.28)',
      hoverFg: lightTheme.warning,
      hoverBorder: 'rgba(245, 158, 11, 0.58)',
      shadow: 'none',
      hoverShadow: 'none',
      spinner: 'rgba(245, 158, 11, 0.8)',
    },
    danger: {
      bg: 'rgba(239, 68, 68, 0.22)',
      fg: lightTheme.danger,
      border: 'rgba(239, 68, 68, 0.48)',
      hoverBg: 'rgba(239, 68, 68, 0.28)',
      hoverFg: lightTheme.danger,
      hoverBorder: 'rgba(239, 68, 68, 0.6)',
      shadow: 'none',
      hoverShadow: 'none',
      spinner: 'rgba(239, 68, 68, 0.8)',
    },
  },
}

const componentButtonTokensDark = {
  primary: {
    bg: darkTheme.primary,
    fg: darkTheme.primaryContrast,
    border: 'transparent',
    hoverBg: colorRamps.primary[400],
    hoverFg: darkTheme.primaryContrast,
    hoverBorder: 'transparent',
    shadow: '0 12px 32px rgba(37, 99, 235, 0.28)',
    hoverShadow: '0 16px 36px rgba(37, 99, 235, 0.35)',
    spinner: 'rgba(255, 255, 255, 0.65)',
  },
  secondary: {
    bg: darkTheme.surfaceAlt,
    fg: darkTheme.text,
    border: 'rgba(148, 163, 184, 0.35)',
    hoverBg: darkTheme.surface,
    hoverFg: darkTheme.primary,
    hoverBorder: 'rgba(96, 165, 250, 0.45)',
    shadow: '0 8px 24px rgba(2, 6, 23, 0.35)',
    hoverShadow: '0 10px 26px rgba(2, 6, 23, 0.42)',
    spinner: 'rgba(148, 163, 184, 0.6)',
  },
  subtle: {
    bg: darkTheme.primarySoft,
    fg: darkTheme.primary,
    border: 'rgba(96, 165, 250, 0.35)',
    hoverBg: 'rgba(37, 99, 235, 0.18)',
    hoverFg: darkTheme.primary,
    hoverBorder: 'rgba(96, 165, 250, 0.55)',
    shadow: 'none',
    hoverShadow: 'none',
    spinner: 'rgba(59, 130, 246, 0.75)',
  },
  ghost: {
    bg: 'transparent',
    fg: darkTheme.text,
    border: 'transparent',
    hoverBg: darkTheme.muted,
    hoverFg: darkTheme.primary,
    hoverBorder: 'transparent',
    shadow: 'none',
    hoverShadow: 'none',
    spinner: 'rgba(148, 163, 184, 0.6)',
  },
  destructive: {
    bg: darkTheme.danger,
    fg: darkTheme.buttonText,
    border: 'transparent',
    hoverBg: colorRamps.danger[500],
    hoverFg: darkTheme.buttonText,
    hoverBorder: 'transparent',
    shadow: '0 12px 30px rgba(248, 113, 113, 0.22)',
    hoverShadow: '0 16px 34px rgba(248, 113, 113, 0.3)',
    spinner: 'rgba(255, 255, 255, 0.68)',
  },
  tone: {
    neutral: {
      bg: darkTheme.surfaceMuted,
      fg: darkTheme.text,
      border: 'rgba(148, 163, 184, 0.25)',
      hoverBg: darkTheme.surface,
      hoverFg: darkTheme.text,
      hoverBorder: 'rgba(148, 163, 184, 0.32)',
      shadow: 'none',
      hoverShadow: 'none',
      spinner: 'rgba(148, 163, 184, 0.55)',
    },
    accent: {
      bg: 'rgba(6, 182, 212, 0.18)',
      fg: darkTheme.accent,
      border: 'rgba(6, 182, 212, 0.45)',
      hoverBg: 'rgba(6, 182, 212, 0.24)',
      hoverFg: darkTheme.accent,
      hoverBorder: 'rgba(6, 182, 212, 0.58)',
      shadow: 'none',
      hoverShadow: 'none',
      spinner: 'rgba(34, 211, 238, 0.82)',
    },
    info: {
      bg: 'rgba(14, 165, 233, 0.2)',
      fg: darkTheme.info,
      border: 'rgba(14, 165, 233, 0.45)',
      hoverBg: 'rgba(14, 165, 233, 0.26)',
      hoverFg: darkTheme.info,
      hoverBorder: 'rgba(14, 165, 233, 0.58)',
      shadow: 'none',
      hoverShadow: 'none',
      spinner: 'rgba(14, 165, 233, 0.8)',
    },
    success: {
      bg: 'rgba(16, 185, 129, 0.2)',
      fg: darkTheme.success,
      border: 'rgba(16, 185, 129, 0.45)',
      hoverBg: 'rgba(16, 185, 129, 0.26)',
      hoverFg: darkTheme.success,
      hoverBorder: 'rgba(16, 185, 129, 0.58)',
      shadow: 'none',
      hoverShadow: 'none',
      spinner: 'rgba(52, 211, 153, 0.82)',
    },
    warning: {
      bg: 'rgba(245, 158, 11, 0.24)',
      fg: darkTheme.warning,
      border: 'rgba(245, 158, 11, 0.52)',
      hoverBg: 'rgba(245, 158, 11, 0.32)',
      hoverFg: darkTheme.warning,
      hoverBorder: 'rgba(245, 158, 11, 0.65)',
      shadow: 'none',
      hoverShadow: 'none',
      spinner: 'rgba(251, 191, 36, 0.82)',
    },
    danger: {
      bg: 'rgba(248, 113, 113, 0.24)',
      fg: darkTheme.danger,
      border: 'rgba(248, 113, 113, 0.5)',
      hoverBg: 'rgba(248, 113, 113, 0.3)',
      hoverFg: darkTheme.danger,
      hoverBorder: 'rgba(248, 113, 113, 0.62)',
      shadow: 'none',
      hoverShadow: 'none',
      spinner: 'rgba(248, 113, 113, 0.85)',
    },
  },
}

const componentBadgeTokensLight = {
  neutral: {
    soft: {
      bg: 'rgba(148, 163, 184, 0.16)',
      border: 'rgba(148, 163, 184, 0.35)',
      fg: lightTheme.textMuted,
    },
    solid: {
      bg: lightTheme.textMuted,
      border: 'transparent',
      fg: lightTheme.textInverse,
    },
    outline: {
      bg: 'transparent',
      border: 'rgba(148, 163, 184, 0.45)',
      fg: lightTheme.textMuted,
    },
  },
  primary: {
    soft: {
      bg: 'rgba(37, 99, 235, 0.12)',
      border: 'rgba(96, 165, 250, 0.32)',
      fg: lightTheme.primary,
    },
    solid: {
      bg: lightTheme.primary,
      border: 'transparent',
      fg: lightTheme.primaryContrast,
    },
    outline: {
      bg: 'transparent',
      border: 'rgba(96, 165, 250, 0.45)',
      fg: lightTheme.primary,
    },
  },
  accent: {
    soft: {
      bg: 'rgba(6, 182, 212, 0.12)',
      border: 'rgba(6, 182, 212, 0.32)',
      fg: lightTheme.accent,
    },
    solid: {
      bg: lightTheme.accent,
      border: 'transparent',
      fg: lightTheme.primaryContrast,
    },
    outline: {
      bg: 'transparent',
      border: 'rgba(6, 182, 212, 0.45)',
      fg: lightTheme.accent,
    },
  },
  success: {
    soft: {
      bg: 'rgba(16, 185, 129, 0.16)',
      border: 'rgba(16, 185, 129, 0.32)',
      fg: lightTheme.success,
    },
    solid: {
      bg: lightTheme.success,
      border: 'transparent',
      fg: lightTheme.textInverse,
    },
    outline: {
      bg: 'transparent',
      border: 'rgba(16, 185, 129, 0.45)',
      fg: lightTheme.success,
    },
  },
  info: {
    soft: {
      bg: 'rgba(14, 165, 233, 0.18)',
      border: 'rgba(14, 165, 233, 0.32)',
      fg: lightTheme.info,
    },
    solid: {
      bg: lightTheme.info,
      border: 'transparent',
      fg: lightTheme.textInverse,
    },
    outline: {
      bg: 'transparent',
      border: 'rgba(14, 165, 233, 0.45)',
      fg: lightTheme.info,
    },
  },
  warning: {
    soft: {
      bg: 'rgba(245, 158, 11, 0.2)',
      border: 'rgba(245, 158, 11, 0.4)',
      fg: lightTheme.warning,
    },
    solid: {
      bg: lightTheme.warning,
      border: 'transparent',
      fg: lightTheme.textInverse,
    },
    outline: {
      bg: 'transparent',
      border: 'rgba(245, 158, 11, 0.55)',
      fg: lightTheme.warning,
    },
  },
  danger: {
    soft: {
      bg: 'rgba(248, 113, 113, 0.16)',
      border: 'rgba(248, 113, 113, 0.4)',
      fg: lightTheme.danger,
    },
    solid: {
      bg: lightTheme.danger,
      border: 'transparent',
      fg: lightTheme.textInverse,
    },
    outline: {
      bg: 'transparent',
      border: 'rgba(248, 113, 113, 0.55)',
      fg: lightTheme.danger,
    },
  },
}

const componentBadgeTokensDark = {
  neutral: {
    soft: {
      bg: 'rgba(148, 163, 184, 0.16)',
      border: 'rgba(148, 163, 184, 0.35)',
      fg: darkTheme.textMuted,
    },
    solid: {
      bg: darkTheme.textMuted,
      border: 'transparent',
      fg: darkTheme.textInverse,
    },
    outline: {
      bg: 'transparent',
      border: 'rgba(148, 163, 184, 0.45)',
      fg: darkTheme.textMuted,
    },
  },
  primary: {
    soft: {
      bg: 'rgba(37, 99, 235, 0.12)',
      border: 'rgba(96, 165, 250, 0.32)',
      fg: darkTheme.primary,
    },
    solid: {
      bg: darkTheme.primary,
      border: 'transparent',
      fg: darkTheme.primaryContrast,
    },
    outline: {
      bg: 'transparent',
      border: 'rgba(96, 165, 250, 0.45)',
      fg: darkTheme.primary,
    },
  },
  accent: {
    soft: {
      bg: 'rgba(6, 182, 212, 0.14)',
      border: 'rgba(6, 182, 212, 0.35)',
      fg: darkTheme.accent,
    },
    solid: {
      bg: darkTheme.accent,
      border: 'transparent',
      fg: darkTheme.primaryContrast,
    },
    outline: {
      bg: 'transparent',
      border: 'rgba(6, 182, 212, 0.45)',
      fg: darkTheme.accent,
    },
  },
  success: {
    soft: {
      bg: 'rgba(16, 185, 129, 0.16)',
      border: 'rgba(16, 185, 129, 0.32)',
      fg: darkTheme.success,
    },
    solid: {
      bg: darkTheme.success,
      border: 'transparent',
      fg: darkTheme.textInverse,
    },
    outline: {
      bg: 'transparent',
      border: 'rgba(16, 185, 129, 0.45)',
      fg: darkTheme.success,
    },
  },
  info: {
    soft: {
      bg: 'rgba(14, 165, 233, 0.15)',
      border: 'rgba(14, 165, 233, 0.32)',
      fg: darkTheme.info,
    },
    solid: {
      bg: darkTheme.info,
      border: 'transparent',
      fg: darkTheme.textInverse,
    },
    outline: {
      bg: 'transparent',
      border: 'rgba(14, 165, 233, 0.45)',
      fg: darkTheme.info,
    },
  },
  warning: {
    soft: {
      bg: 'rgba(245, 158, 11, 0.18)',
      border: 'rgba(245, 158, 11, 0.4)',
      fg: darkTheme.warning,
    },
    solid: {
      bg: darkTheme.warning,
      border: 'transparent',
      fg: darkTheme.textInverse,
    },
    outline: {
      bg: 'transparent',
      border: 'rgba(245, 158, 11, 0.55)',
      fg: darkTheme.warning,
    },
  },
  danger: {
    soft: {
      bg: 'rgba(248, 113, 113, 0.18)',
      border: 'rgba(248, 113, 113, 0.4)',
      fg: darkTheme.danger,
    },
    solid: {
      bg: darkTheme.danger,
      border: 'transparent',
      fg: darkTheme.textInverse,
    },
    outline: {
      bg: 'transparent',
      border: 'rgba(248, 113, 113, 0.55)',
      fg: darkTheme.danger,
    },
  },
}

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
}

const cssAliasBlueprint = {
  '--vscode-bg': 'bg',
  '--vscode-surface': 'surface',
  '--vscode-surfaceAlt': 'surfaceAlt',
  '--vscode-surfaceMuted': 'surfaceMuted',
  '--vscode-text': 'text',
  '--vscode-textMuted': 'textMuted',
  '--vscode-textMutedStrong': 'textMutedStrong',
  '--vscode-primary': 'primary',
  '--vscode-primaryContrast': 'primaryContrast',
  '--vscode-primarySoft': 'primarySoft',
  '--vscode-secondary': 'secondary',
  '--vscode-accent': 'accent',
  '--vscode-success': 'success',
  '--vscode-danger': 'danger',
  '--vscode-error': 'danger',
  '--vscode-info': 'info',
  '--vscode-warning': 'warning',
  '--vscode-border': 'border',
  '--vscode-muted': 'muted',
  '--vscode-ring': 'ring',
  '--vscode-buttonText': 'buttonText',
  '--color-app-background': 'bg',
  '--color-app-surface': 'surface',
  '--color-app-surface-alt': 'surfaceAlt',
  '--color-app-surface-muted': 'surfaceMuted',
  '--color-primary': 'primary',
  '--color-primary-contrast': 'primaryContrast',
  '--color-primary-soft': 'primarySoft',
  '--color-secondary': 'secondary',
  '--color-accent': 'accent',
  '--color-success': 'success',
  '--color-info': 'info',
  '--color-warning': 'warning',
  '--color-danger': 'danger',
  '--color-text-primary': 'text',
  '--color-text-muted': 'textMuted',
  '--color-text-strong': 'textMutedStrong',
  '--color-text-inverse': 'textInverse',
  '--color-border-default': 'border',
  '--color-border-muted': 'borderMuted',
  '--color-border-strong': 'borderStrong',
  '--color-overlay': 'overlay',
  '--color-scrim': 'scrim',
  '--color-intent-info': 'info',
  '--color-intent-warning': 'warning',
  '--accent-color': 'primary',
  '--theme-name': 'name',
}

Object.entries(colorRamps).forEach(([rampName, rampValues]) => {
  Object.entries(rampValues).forEach(([step]) => {
    if (step.startsWith('$')) return
    cssAliasBlueprint[`--color-${rampName}-${step}`] =
      `color.ramps.${rampName}.${step}`
  })
})

const buttonVariants = [
  'primary',
  'secondary',
  'subtle',
  'ghost',
  'destructive',
]
const buttonProps = [
  'bg',
  'fg',
  'border',
  'hoverBg',
  'hoverFg',
  'hoverBorder',
  'shadow',
  'hoverShadow',
  'spinner',
]

buttonVariants.forEach((variant) => {
  buttonProps.forEach((prop) => {
    cssAliasBlueprint[`--lk-button-${variant}-${prop}`] =
      `components.button.${variant}.${prop}`
  })
})

const toneProps = [
  'bg',
  'fg',
  'border',
  'hoverBg',
  'hoverFg',
  'hoverBorder',
  'shadow',
  'hoverShadow',
  'spinner',
]
const buttonTones = [
  'neutral',
  'accent',
  'info',
  'success',
  'warning',
  'danger',
]
buttonTones.forEach((tone) => {
  toneProps.forEach((prop) => {
    cssAliasBlueprint[`--lk-button-${tone}-${prop}`] =
      `components.button.tone.${tone}.${prop}`
  })
})

const badgeTones = [
  'neutral',
  'primary',
  'accent',
  'success',
  'info',
  'warning',
  'danger',
]
const badgeVariants = ['soft', 'solid', 'outline']
badgeTones.forEach((tone) => {
  badgeVariants.forEach((variant) => {
    ;['bg', 'border', 'fg'].forEach((prop) => {
      cssAliasBlueprint[`--lk-badge-${tone}-${variant}-${prop}`] =
        `components.badge.${tone}.${variant}.${prop}`
    })
  })
})

export const cssVariableTokenMap = cssAliasBlueprint

function getTokenValue(tokens, tokenPath) {
  return tokenPath.split('.').reduce((acc, key) => {
    if (acc == null) return undefined
    return acc[key]
  }, tokens)
}

const aliasFallbackTokens = {
  color: {
    ramps: colorRamps,
  },
}

function buildCssAliasMap(tokens) {
  return Object.fromEntries(
    Object.entries(cssAliasBlueprint).map(([cssVariable, tokenPath]) => {
      const value =
        getTokenValue(tokens, tokenPath) ??
        getTokenValue(aliasFallbackTokens, tokenPath)
      return [cssVariable, value ?? '']
    }),
  )
}

const themeAliasTokens = Object.fromEntries(
  Object.entries(semanticColorTokens).map(([mode, tokens]) => [
    mode,
    buildCssAliasMap(tokens),
  ]),
)

export const themeTokens = semanticColorTokens

export const themeAliases = themeAliasTokens

const componentDesignTokens = {
  button: {
    light: componentButtonTokensLight,
    dark: componentButtonTokensDark,
  },
  badge: {
    light: componentBadgeTokensLight,
    dark: componentBadgeTokensDark,
  },
}

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
}

let globalTokensApplied = false
const lastAppliedTheme = { root: null, mode: null }

function resolveThemeMode(candidate) {
  if (VALID_THEME_MODES.has(candidate)) {
    return candidate
  }

  return DEFAULT_THEME_MODE
}

function applyGlobalTokens(root) {
  if (!root || globalTokensApplied) return
  Object.entries(fontFamilyTokens).forEach(([token, value]) => {
    root.style.setProperty(`--font-family-${token}`, value)
  })

  Object.entries(fontWeightTokens).forEach(([token, value]) => {
    root.style.setProperty(`--font-weight-${token}`, String(value))
  })

  Object.entries(typographyScale).forEach(([token, definition]) => {
    root.style.setProperty(`--font-size-${token}`, definition.fontSize)
    root.style.setProperty(`--line-height-${token}`, definition.lineHeight)
    root.style.setProperty(
      `--letter-spacing-${token}`,
      definition.letterSpacing,
    )
  })

  Object.entries(spacingScale).forEach(([token, value]) => {
    root.style.setProperty(`--space-${token}`, value)
  })

  Object.entries(layoutTokens).forEach(([token, value]) => {
    const kebabToken = token.replace(
      /[A-Z]/g,
      (match) => `-${match.toLowerCase()}`,
    )
    root.style.setProperty(`--layout-${kebabToken}`, value)
  })

  Object.entries(radiusScale).forEach(([token, value]) => {
    root.style.setProperty(`--radius-${token}`, value)
  })

  Object.entries(shadowTokens).forEach(([token, value]) => {
    root.style.setProperty(`--shadow-${token}`, value)
  })

  Object.entries(motionTokens.duration).forEach(([token, value]) => {
    root.style.setProperty(`--motion-duration-${token}`, value)
  })

  Object.entries(motionTokens.easing).forEach(([token, value]) => {
    root.style.setProperty(`--motion-easing-${token}`, value)
  })

  globalTokensApplied = true
}

const VALID_THEME_MODES = new Set(['dark'])
const DEFAULT_THEME_MODE = 'dark'

export function applyThemeToDocument(mode = 'dark', target) {
  const root =
    target ??
    (typeof document !== 'undefined' ? document.documentElement : undefined)
  if (!root) return
  applyGlobalTokens(root)
  const resolvedMode = resolveThemeMode(mode)

  if (
    lastAppliedTheme.root === root &&
    lastAppliedTheme.mode === resolvedMode
  ) {
    return
  }

  const cssAliases = themeAliasTokens[resolvedMode] ?? themeAliasTokens.dark

  Object.entries(cssAliases).forEach(([cssVar, value]) => {
    root.style.setProperty(cssVar, String(value ?? ''))
  })

  root.dataset.theme = resolvedMode
  root.dataset.colorScheme = resolvedMode
  const colorScheme = resolvedMode === 'dark' ? 'dark' : 'light'
  root.style.colorScheme = colorScheme
  root.style.setProperty('color-scheme', colorScheme)

  lastAppliedTheme.root = root
  lastAppliedTheme.mode = resolvedMode
}

function getElectronThemeBridge() {
  if (typeof window === 'undefined') return undefined
  return window?.electronAPI?.theme
}

function setElectronTheme(themeSource) {
  const bridge = getElectronThemeBridge()
  if (!bridge || typeof bridge.set !== 'function') return

  try {
    const result = bridge.set(themeSource)
    if (result && typeof result.then === 'function') {
      result.catch(() => {})
    }
  } catch {
    // Ignore errors from the native bridge
  }
}
const THEME_STORAGE_KEY = 'lkany:theme-mode'

function readStoredMode() {
  if (typeof window === 'undefined') return null
  try {
    const stored = window.localStorage?.getItem(THEME_STORAGE_KEY)
    if (VALID_THEME_MODES.has(stored ?? '')) {
      return stored
    }

    if (stored != null) {
      window.localStorage?.removeItem(THEME_STORAGE_KEY)
    }

    return null
  } catch {
    return null
  }
}

function storeMode(mode) {
  if (typeof window === 'undefined') return
  try {
    if (mode === 'dark') {
      window.localStorage?.setItem(THEME_STORAGE_KEY, mode)
    } else {
      window.localStorage?.removeItem(THEME_STORAGE_KEY)
    }
  } catch {
    // Ignore storage failures (private mode, quota exceeded, etc.)
  }
}

function clearStoredMode() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage?.removeItem(THEME_STORAGE_KEY)
  } catch {
    // Ignore storage failures (private mode, quota exceeded, etc.)
  }
}

function getPreferredColorScheme() {
  return DEFAULT_THEME_MODE
}

export function useTheme() {
  const { initialMode, initialHasExplicit } = useMemo(() => {
    const stored = readStoredMode()
    if (stored) {
      return { initialMode: resolveThemeMode(stored), initialHasExplicit: true }
    }

    return {
      initialMode: resolveThemeMode(getPreferredColorScheme()),
      initialHasExplicit: false,
    }
  }, [])

  const [mode, setModeState] = useState(initialMode)
  const [hasExplicitMode, setHasExplicitMode] = useState(initialHasExplicit)

  useEffect(() => {
    applyThemeToDocument(mode)
  }, [mode])

  useEffect(() => {
    if (hasExplicitMode) return undefined
    setModeState(DEFAULT_THEME_MODE)
    return undefined
  }, [hasExplicitMode])

  const persistMode = useCallback((nextMode) => {
    if (!VALID_THEME_MODES.has(nextMode)) return
    storeMode(nextMode)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const bridge = getElectronThemeBridge()

    if (!bridge) {
      return undefined
    }

    let disposed = false
    let initialSync = true

    const applyNativeThemeState = (state) => {
      if (!state || disposed) return

      const { themeSource } = state
      const resolvedMode = 'dark'

      setModeState((prev) => (prev === resolvedMode ? prev : resolvedMode))

      if (themeSource === 'system') {
        if (!initialSync || !initialHasExplicit) {
          setHasExplicitMode(false)
          clearStoredMode()
        }
      } else if (VALID_THEME_MODES.has(themeSource)) {
        setHasExplicitMode(true)
        persistMode(themeSource)
      }

      initialSync = false
    }

    const requestNativeThemeState = () => {
      bridge
        .get?.()
        .then((state) => {
          applyNativeThemeState(state)
        })
        .catch(() => {})
    }

    if (initialHasExplicit && typeof bridge.set === 'function') {
      try {
        const result = bridge.set(initialMode)
        if (result && typeof result.then === 'function') {
          result
            .catch(() => {})
            .finally(() => {
              requestNativeThemeState()
            })
        } else {
          requestNativeThemeState()
        }
      } catch {
        requestNativeThemeState()
      }
    } else {
      requestNativeThemeState()
    }

    const unsubscribe = bridge.onChange?.((state) => {
      applyNativeThemeState(state)
    })

    return () => {
      disposed = true
      if (typeof unsubscribe === 'function') {
        unsubscribe()
      }
    }
  }, [initialHasExplicit, initialMode, persistMode])

  const resolveSystemMode = useCallback(() => {
    return DEFAULT_THEME_MODE
  }, [])

  const setMode = useCallback(
    (nextMode) => {
      if (nextMode === 'system') {
        clearStoredMode()
        setHasExplicitMode(false)
        setModeState(resolveSystemMode())
        setElectronTheme('system')
        return
      }

      if (!VALID_THEME_MODES.has(nextMode)) return

      setHasExplicitMode(true)
      persistMode(nextMode)
      setModeState((current) => (current === nextMode ? current : nextMode))
      setElectronTheme(nextMode)
    },
    [persistMode, resolveSystemMode],
  )

  const toggleMode = useCallback(() => {
    setMode('dark')
  }, [setMode])

  return useMemo(
    () => ({
      mode,
      isDark: mode === 'dark',
      setMode,
      toggleMode,
      hasExplicitMode,
    }),
    [mode, setMode, toggleMode, hasExplicitMode],
  )
}
