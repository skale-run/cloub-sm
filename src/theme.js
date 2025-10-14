import { useCallback, useEffect, useMemo } from "react";

export const typographyScale = {
  50: { fontSize: "clamp(0.6875rem, 0.6725rem + 0.1vw, 0.725rem)", lineHeight: "clamp(1rem, 0.97rem + 0.08vw, 1.05rem)", letterSpacing: "0.04em" },
  75: { fontSize: "clamp(0.75rem, 0.73rem + 0.12vw, 0.82rem)", lineHeight: "clamp(1.05rem, 1rem + 0.1vw, 1.12rem)", letterSpacing: "0.03em" },
  100:{ fontSize: "clamp(0.8125rem, 0.78rem + 0.15vw, 0.9rem)", lineHeight: "clamp(1.1rem, 1.04rem + 0.12vw, 1.22rem)", letterSpacing: "0.02em" },
  200:{ fontSize: "clamp(0.875rem, 0.82rem + 0.2vw, 1rem)", lineHeight: "clamp(1.2rem, 1.12rem + 0.16vw, 1.35rem)", letterSpacing: "0.015em" },
  300:{ fontSize: "clamp(0.9375rem, 0.87rem + 0.24vw, 1.06rem)", lineHeight: "clamp(1.35rem, 1.25rem + 0.2vw, 1.55rem)", letterSpacing: "0.01em" },
  400:{ fontSize: "clamp(1rem, 0.94rem + 0.3vw, 1.125rem)", lineHeight: "clamp(1.45rem, 1.32rem + 0.36vw, 1.68rem)", letterSpacing: "0em" },
  500:{ fontSize: "clamp(1.125rem, 1.03rem + 0.38vw, 1.3rem)", lineHeight: "clamp(1.55rem, 1.42rem + 0.4vw, 1.85rem)", letterSpacing: "-0.005em" },
  600:{ fontSize: "clamp(1.25rem, 1.12rem + 0.48vw, 1.5rem)", lineHeight: "clamp(1.6rem, 1.48rem + 0.45vw, 2rem)", letterSpacing: "-0.01em" },
  700:{ fontSize: "clamp(1.5rem, 1.32rem + 0.62vw, 1.85rem)", lineHeight: "clamp(1.75rem, 1.58rem + 0.58vw, 2.2rem)", letterSpacing: "-0.012em" },
  800:{ fontSize: "clamp(1.875rem, 1.62rem + 0.82vw, 2.25rem)", lineHeight: "clamp(2.1rem, 1.88rem + 0.75vw, 2.55rem)", letterSpacing: "-0.015em" },
  900:{ fontSize: "clamp(2.25rem, 1.96rem + 1vw, 2.65rem)", lineHeight: "clamp(2.4rem, 2.1rem + 0.9vw, 2.95rem)", letterSpacing: "-0.018em" },
  1000:{ fontSize: "clamp(3rem, 2.5rem + 1.4vw, 3.5rem)", lineHeight: "clamp(3.2rem, 2.7rem + 1.6vw, 3.8rem)", letterSpacing: "-0.02em" },
};

export const fontFamilyTokens = {
  sans: "'Plus Jakarta Sans', 'Inter', 'Segoe UI', system-ui, sans-serif",
  display: "'Space Grotesk', 'Plus Jakarta Sans', 'Inter', 'Segoe UI', system-ui, sans-serif",
  mono: "'JetBrains Mono', 'SFMono-Regular', Consolas, monospace",
};

export const fontWeightTokens = { regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800 };

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
  10:"clamp(2.6rem, 2rem + 0.84vw, 3.4rem)",
  11:"clamp(3rem, 2.3rem + 0.96vw, 3.8rem)",
  12:"clamp(3.4rem, 2.6rem + 1.05vw, 4.2rem)",
  13:"clamp(3.8rem, 2.9rem + 1.2vw, 4.8rem)",
  14:"clamp(4.4rem, 3.3rem + 1.35vw, 5.6rem)",
  15:"clamp(5rem, 3.7rem + 1.5vw, 6.6rem)",
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

export const radiusScale = { xs:"6px", sm:"10px", md:"14px", lg:"20px", xl:"28px", pill:"999px", full:"9999px" };

export const motionTokens = {
  duration: { instant:"80ms", shortest:"120ms", shorter:"160ms", short:"220ms", medium:"320ms", long:"480ms" },
  easing: { standard:"cubic-bezier(0.2, 0, 0, 1)", emphasized:"cubic-bezier(0.32, 0.94, 0.6, 1)", entrance:"cubic-bezier(0.3, 0, 0.45, 1)", exit:"cubic-bezier(0.35, 0, 0.65, 1)" },
  reduceMotionPreference: "(prefers-reduced-motion: reduce)",
};

export const shadowTokens = {
  xs: "0 1px 2px rgba(24, 9, 14, 0.18)",
  sm: "0 4px 12px rgba(24, 9, 14, 0.24)",
  md: "0 12px 24px rgba(30, 11, 18, 0.28)",
  lg: "0 18px 40px rgba(30, 11, 18, 0.34)",
};

const colorRamps = {
  primary: { 50:"#FFF1F3",100:"#FFE0E5",200:"#FFC2CC",300:"#FF96A8",400:"#F8678A",500:"#E63B62",600:"#C81E4D",700:"#9E153C",800:"#6E0E2A",900:"#3A0716" },
  accent:  { 50:"#FDF2FF",100:"#F9D7FE",200:"#F2B5FD",300:"#E885F9",400:"#D95BF2",500:"#B93CDA",600:"#8E28AF",700:"#6C1E86",800:"#47155A",900:"#2A0C36" },
  neutral: { 50:"#F8FAFC",100:"#EEF2F7",200:"#E2E8F0",300:"#CBD5E1",400:"#A7B0C0",500:"#8B94A3",600:"#5E6673",700:"#3F4651",800:"#252A32",900:"#12161B" },
  success: { 50:"#EBFFF6",100:"#CFFAE6",200:"#A3F2CF",300:"#6BE7B3",400:"#2FD699",500:"#14B884",600:"#0A8F67" },
  info:    { 50:"#EEF8FF",100:"#D9EEFF",200:"#B8E0FF",300:"#86CBFF",400:"#4FB3FF",500:"#1996F3",600:"#0E74C7" },
  warning: { 50:"#FFF8EB",100:"#FEEBC8",200:"#FED78A",300:"#FDC34D",400:"#F7A928",500:"#E08A0A",600:"#B86E07" },
  danger:  { 50:"#FFF1F2",100:"#FFE1E3",200:"#FFC6CB",300:"#FFA0AB",400:"#F66D7D",500:"#E04057",600:"#C21F38" },
};

const lightTheme = {
  name: "Light+ (Crimson Aurora)",
  bg: "#FFFFFF",
  surface: "#FDF7F9",
  surfaceAlt: "#FAEFF3",
  surfaceMuted: "#F6E4EA",
  text: "#1A0A0E",
  textMuted: "#6C1E35",
  textMutedStrong: "#3E0F1E",
  textInverse: "#FFF9FC",
  buttonText: "#19070D",
  primary: colorRamps.primary[600],
  primaryContrast: "#FFFFFF",
  primarySoft: "rgba(200,30,77,0.12)",
  secondary: colorRamps.accent[500],
  accent: colorRamps.accent[500],
  success: colorRamps.success[500],
  info: colorRamps.info[500],
  warning: colorRamps.warning[500],
  danger: colorRamps.danger[600],
  border: "rgba(30, 7, 16, 0.16)",
  borderMuted: "rgba(30, 7, 16, 0.08)",
  borderStrong: "rgba(30, 7, 16, 0.28)",
  muted: "rgba(200, 30, 77, 0.08)",
  ring: "rgba(230, 59, 98, 0.36)",
  overlay: "rgba(24, 9, 14, 0.12)",
  scrim: "rgba(24, 9, 14, 0.08)",
  backgroundImage: `radial-gradient(1240px 620px at 12% -14%, rgba(230,59,98,0.16), transparent 72%), radial-gradient(920px 520px at 88% -6%, rgba(185, 50, 110, 0.12), transparent 78%)`,
};

const darkTheme = {
  name: "Dark+ (Crimson Aurora)",
  bg: "#0F0A0C",
  surface: "#150D12",
  surfaceAlt: "#1D1218",
  surfaceMuted: "#261822",
  text: "#FFE8F0",
  textMuted: "#F395AE",
  textMutedStrong: "#FFC0D0",
  textInverse: "#12070D",
  buttonText: "#11060B",
  primary: colorRamps.primary[400],
  primaryContrast: "#11060B",
  primarySoft: "rgba(230,59,98,0.22)",
  secondary: colorRamps.accent[400],
  accent: colorRamps.accent[400],
  success: colorRamps.success[300],
  info: colorRamps.info[300],
  warning: colorRamps.warning[400],
  danger: colorRamps.danger[400],
  border: "rgba(230, 59, 98, 0.28)",
  borderMuted: "rgba(230, 59, 98, 0.18)",
  borderStrong: "rgba(230, 59, 98, 0.38)",
  muted: "rgba(230, 59, 98, 0.14)",
  ring: "rgba(230, 59, 98, 0.52)",
  overlay: "rgba(8, 3, 5, 0.72)",
  scrim: "rgba(8, 3, 5, 0.52)",
  backgroundImage: `radial-gradient(1320px 600px at 12% -16%, rgba(230,59,98,0.32), transparent 72%), radial-gradient(1000px 600px at 84% -8%, rgba(185, 50, 110, 0.26), transparent 76%), linear-gradient(180deg, #0F0A0C 0%, #1A0E16 46%, #2A1622 100%)`,
};

// Component tokens (buttons/badges) reuse your structure; values adapt to new ramps
const componentButtonTokensLight = {
  primary: { bg: lightTheme.primary, fg: lightTheme.primaryContrast, border: "transparent", hoverBg: colorRamps.primary[500], hoverFg: lightTheme.primaryContrast, hoverBorder: "transparent", shadow: "0 12px 32px rgba(30, 11, 18, 0.22)", hoverShadow: "0 16px 36px rgba(30, 11, 18, 0.28)", spinner: "rgba(255, 244, 250, 0.78)" },
  secondary: { bg: lightTheme.surfaceAlt, fg: lightTheme.text, border: "rgba(30, 7, 16, 0.22)", hoverBg: lightTheme.surface, hoverFg: lightTheme.primary, hoverBorder: "rgba(30, 7, 16, 0.32)", shadow: "0 6px 18px rgba(30, 11, 18, 0.12)", hoverShadow: "0 8px 22px rgba(30, 11, 18, 0.18)", spinner: "rgba(24, 9, 14, 0.55)" },
  subtle:   { bg: lightTheme.primarySoft, fg: lightTheme.primary, border: "rgba(200,30,77,0.32)", hoverBg: "rgba(200,30,77,0.18)", hoverFg: lightTheme.primary, hoverBorder: "rgba(200,30,77,0.48)", shadow: "none", hoverShadow: "none", spinner: "rgba(200,30,77,0.7)" },
  ghost:    { bg: "transparent", fg: lightTheme.text, border: "transparent", hoverBg: "rgba(200,30,77,0.08)", hoverFg: lightTheme.primary, hoverBorder: "transparent", shadow: "none", hoverShadow: "none", spinner: "rgba(24, 9, 14, 0.5)" },
  destructive: { bg: lightTheme.danger, fg: lightTheme.buttonText, border: "transparent", hoverBg: colorRamps.danger[500], hoverFg: lightTheme.buttonText, hoverBorder: "transparent", shadow: "0 12px 30px rgba(185, 50, 110, 0.18)", hoverShadow: "0 16px 34px rgba(185, 50, 110, 0.24)", spinner: "rgba(24, 9, 14, 0.6)" },
  tone: {
    neutral:{ bg: lightTheme.surfaceMuted, fg: lightTheme.text, border: "rgba(30, 7, 16, 0.22)", hoverBg: lightTheme.surface, hoverFg: lightTheme.text, hoverBorder: "rgba(30, 7, 16, 0.3)", shadow: "none", hoverShadow: "none", spinner: "rgba(24, 9, 14, 0.55)" },
    accent: { bg: "rgba(185, 60, 218, 0.14)", fg: lightTheme.accent, border: "rgba(185, 60, 218, 0.28)", hoverBg: "rgba(185, 60, 218, 0.2)", hoverFg: lightTheme.accent, hoverBorder: "rgba(185, 60, 218, 0.42)", shadow: "none", hoverShadow: "none", spinner: "rgba(185, 60, 218, 0.8)" },
    info:   { bg: "rgba(25, 150, 243, 0.14)", fg: lightTheme.info, border: "rgba(25, 150, 243, 0.28)", hoverBg: "rgba(25, 150, 243, 0.2)", hoverFg: lightTheme.info, hoverBorder: "rgba(25, 150, 243, 0.42)", shadow: "none", hoverShadow: "none", spinner: "rgba(25, 150, 243, 0.82)" },
    success:{ bg: "rgba(20, 184, 132, 0.14)", fg: lightTheme.success, border: "rgba(20, 184, 132, 0.28)", hoverBg: "rgba(20, 184, 132, 0.2)", hoverFg: lightTheme.success, hoverBorder: "rgba(20, 184, 132, 0.42)", shadow: "none", hoverShadow: "none", spinner: "rgba(20, 184, 132, 0.8)" },
    warning:{ bg: "rgba(224, 138, 10, 0.18)", fg: lightTheme.warning, border: "rgba(224, 138, 10, 0.34)", hoverBg: "rgba(224, 138, 10, 0.24)", hoverFg: lightTheme.warning, hoverBorder: "rgba(224, 138, 10, 0.46)", shadow: "none", hoverShadow: "none", spinner: "rgba(224, 138, 10, 0.8)" },
    danger: { bg: "rgba(224, 64, 87, 0.18)", fg: lightTheme.danger, border: "rgba(224, 64, 87, 0.36)", hoverBg: "rgba(224, 64, 87, 0.24)", hoverFg: lightTheme.danger, hoverBorder: "rgba(224, 64, 87, 0.48)", shadow: "none", hoverShadow: "none", spinner: "rgba(224, 64, 87, 0.8)" },
  },
};

const componentButtonTokensDark = {
  primary: { bg: darkTheme.primary, fg: darkTheme.primaryContrast, border: "transparent", hoverBg: colorRamps.primary[300], hoverFg: darkTheme.primaryContrast, hoverBorder: "transparent", shadow: "0 12px 32px rgba(8, 3, 5, 0.42)", hoverShadow: "0 16px 36px rgba(8, 3, 5, 0.5)", spinner: "rgba(255, 237, 245, 0.7)" },
  secondary: { bg: darkTheme.surfaceAlt, fg: darkTheme.text, border: "rgba(230, 59, 98, 0.24)", hoverBg: darkTheme.surface, hoverFg: darkTheme.primary, hoverBorder: "rgba(230, 59, 98, 0.38)", shadow: "0 8px 24px rgba(8, 3, 5, 0.55)", hoverShadow: "0 10px 28px rgba(8, 3, 5, 0.62)", spinner: "rgba(230, 59, 98, 0.6)" },
  subtle:   { bg: darkTheme.primarySoft, fg: darkTheme.primary, border: "rgba(230,59,98,0.38)", hoverBg: "rgba(200,30,77,0.2)", hoverFg: darkTheme.primary, hoverBorder: "rgba(230,59,98,0.58)", shadow: "none", hoverShadow: "none", spinner: "rgba(230, 59, 98, 0.75)" },
  ghost:    { bg: "transparent", fg: darkTheme.text, border: "transparent", hoverBg: "rgba(230, 59, 98, 0.12)", hoverFg: darkTheme.primary, hoverBorder: "transparent", shadow: "none", hoverShadow: "none", spinner: "rgba(230, 59, 98, 0.6)" },
  destructive: { bg: darkTheme.danger, fg: darkTheme.buttonText, border: "transparent", hoverBg: colorRamps.danger[500], hoverFg: darkTheme.buttonText, hoverBorder: "transparent", shadow: "0 12px 30px rgba(185, 50, 110, 0.28)", hoverShadow: "0 16px 34px rgba(185, 50, 110, 0.36)", spinner: "rgba(255, 237, 245, 0.68)" },
  tone: {
    neutral:{ bg: darkTheme.surfaceMuted, fg: darkTheme.text, border: "rgba(230, 59, 98, 0.2)", hoverBg: darkTheme.surface, hoverFg: darkTheme.text, hoverBorder: "rgba(230, 59, 98, 0.3)", shadow: "none", hoverShadow: "none", spinner: "rgba(230, 59, 98, 0.55)" },
    accent: { bg: "rgba(185, 60, 218, 0.22)", fg: darkTheme.accent, border: "rgba(185, 60, 218, 0.38)", hoverBg: "rgba(185, 60, 218, 0.28)", hoverFg: darkTheme.accent, hoverBorder: "rgba(185, 60, 218, 0.52)", shadow: "none", hoverShadow: "none", spinner: "rgba(185, 60, 218, 0.8)" },
    info:   { bg: "rgba(25, 150, 243, 0.2)", fg: darkTheme.info, border: "rgba(25, 150, 243, 0.36)", hoverBg: "rgba(25, 150, 243, 0.26)", hoverFg: darkTheme.info, hoverBorder: "rgba(25, 150, 243, 0.5)", shadow: "none", hoverShadow: "none", spinner: "rgba(25, 150, 243, 0.8)" },
    success:{ bg: "rgba(20, 184, 132, 0.2)", fg: darkTheme.success, border: "rgba(20, 184, 132, 0.36)", hoverBg: "rgba(20, 184, 132, 0.26)", hoverFg: darkTheme.success, hoverBorder: "rgba(20, 184, 132, 0.5)", shadow: "none", hoverShadow: "none", spinner: "rgba(20, 184, 132, 0.8)" },
    warning:{ bg: "rgba(224, 138, 10, 0.24)", fg: darkTheme.warning, border: "rgba(224, 138, 10, 0.48)", hoverBg: "rgba(224, 138, 10, 0.32)", hoverFg: darkTheme.warning, hoverBorder: "rgba(224, 138, 10, 0.6)", shadow: "none", hoverShadow: "none", spinner: "rgba(224, 138, 10, 0.82)" },
    danger: { bg: "rgba(224, 64, 87, 0.24)", fg: darkTheme.danger, border: "rgba(224, 64, 87, 0.48)", hoverBg: "rgba(224, 64, 87, 0.32)", hoverFg: darkTheme.danger, hoverBorder: "rgba(224, 64, 87, 0.62)", shadow: "none", hoverShadow: "none", spinner: "rgba(224, 64, 87, 0.82)" },
  },
};

const componentBadgeTokensLight = {
  neutral:{ soft:{ bg:"rgba(30, 7, 16, 0.08)", border:"rgba(30, 7, 16, 0.18)", fg: lightTheme.textMuted },
            solid:{ bg: lightTheme.textMuted, border:"transparent", fg: lightTheme.textInverse },
            outline:{ bg:"transparent", border:"rgba(30,7,16,0.28)", fg: lightTheme.textMuted } },
  primary:{ soft:{ bg:"rgba(200,30,77,0.12)", border:"rgba(200,30,77,0.28)", fg: lightTheme.primary },
            solid:{ bg: lightTheme.primary, border:"transparent", fg: lightTheme.primaryContrast },
            outline:{ bg:"transparent", border:"rgba(200,30,77,0.42)", fg: lightTheme.primary } },
  accent: { soft:{ bg:"rgba(185,60,218,0.12)", border:"rgba(185,60,218,0.28)", fg: lightTheme.accent },
            solid:{ bg: lightTheme.accent, border:"transparent", fg: lightTheme.primaryContrast },
            outline:{ bg:"transparent", border:"rgba(185,60,218,0.42)", fg: lightTheme.accent } },
  success:{ soft:{ bg:"rgba(20,184,132,0.12)", border:"rgba(20,184,132,0.28)", fg: lightTheme.success },
            solid:{ bg: lightTheme.success, border:"transparent", fg: lightTheme.textInverse },
            outline:{ bg:"transparent", border:"rgba(20,184,132,0.42)", fg: lightTheme.success } },
  info:   { soft:{ bg:"rgba(25,150,243,0.12)", border:"rgba(25,150,243,0.28)", fg: lightTheme.info },
            solid:{ bg: lightTheme.info, border:"transparent", fg: lightTheme.textInverse },
            outline:{ bg:"transparent", border:"rgba(25,150,243,0.42)", fg: lightTheme.info } },
  warning:{ soft:{ bg:"rgba(224,138,10,0.16)", border:"rgba(224,138,10,0.32)", fg: lightTheme.warning },
            solid:{ bg: lightTheme.warning, border:"transparent", fg: lightTheme.textInverse },
            outline:{ bg:"transparent", border:"rgba(224,138,10,0.46)", fg: lightTheme.warning } },
  danger: { soft:{ bg:"rgba(224,64,87,0.14)", border:"rgba(224,64,87,0.3)", fg: lightTheme.danger },
            solid:{ bg: lightTheme.danger, border:"transparent", fg: lightTheme.textInverse },
            outline:{ bg:"transparent", border:"rgba(224,64,87,0.46)", fg: lightTheme.danger } },
};

const componentBadgeTokensDark = {
  neutral:{ soft:{ bg:"rgba(230,59,98,0.16)", border:"rgba(230,59,98,0.28)", fg: darkTheme.textMuted },
            solid:{ bg: darkTheme.textMuted, border:"transparent", fg: darkTheme.textInverse },
            outline:{ bg:"transparent", border:"rgba(230,59,98,0.42)", fg: darkTheme.textMuted } },
  primary:{ soft:{ bg:"rgba(230,59,98,0.18)", border:"rgba(230,59,98,0.32)", fg: darkTheme.primary },
            solid:{ bg: darkTheme.primary, border:"transparent", fg: darkTheme.primaryContrast },
            outline:{ bg:"transparent", border:"rgba(230,59,98,0.52)", fg: darkTheme.primary } },
  accent: { soft:{ bg:"rgba(185,60,218,0.2)", border:"rgba(185,60,218,0.36)", fg: darkTheme.accent },
            solid:{ bg: darkTheme.accent, border:"transparent", fg: darkTheme.primaryContrast },
            outline:{ bg:"transparent", border:"rgba(185,60,218,0.5)", fg: darkTheme.accent } },
  success:{ soft:{ bg:"rgba(20,184,132,0.18)", border:"rgba(20,184,132,0.34)", fg: darkTheme.success },
            solid:{ bg: darkTheme.success, border:"transparent", fg: darkTheme.textInverse },
            outline:{ bg:"transparent", border:"rgba(20,184,132,0.5)", fg: darkTheme.success } },
  info:   { soft:{ bg:"rgba(25,150,243,0.18)", border:"rgba(25,150,243,0.34)", fg: darkTheme.info },
            solid:{ bg: darkTheme.info, border:"transparent", fg: darkTheme.textInverse },
            outline:{ bg:"transparent", border:"rgba(25,150,243,0.5)", fg: darkTheme.info } },
  warning:{ soft:{ bg:"rgba(224,138,10,0.2)", border:"rgba(224,138,10,0.4)", fg: darkTheme.warning },
            solid:{ bg: darkTheme.warning, border:"transparent", fg: darkTheme.textInverse },
            outline:{ bg:"transparent", border:"rgba(224,138,10,0.55)", fg: darkTheme.warning } },
  danger: { soft:{ bg:"rgba(224,64,87,0.22)", border:"rgba(224,64,87,0.42)", fg: darkTheme.danger },
            solid:{ bg: darkTheme.danger, border:"transparent", fg: darkTheme.textInverse },
            outline:{ bg:"transparent", border:"rgba(224,64,87,0.6)", fg: darkTheme.danger } },
};

const semanticColorTokens = {
  light: { ...lightTheme, components: { button: componentButtonTokensLight, badge: componentBadgeTokensLight } },
  dark:  { ...darkTheme,  components: { button: componentButtonTokensDark,  badge: componentBadgeTokensDark  } },
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
  "--app-bg-image": "backgroundImage",
};

Object.entries(colorRamps).forEach(([rampName, rampValues]) => {
  Object.entries(rampValues).forEach(([step]) => {
    if (String(step).startsWith("$")) return;
    cssAliasBlueprint[`--color-${rampName}-${step}`] = `color.ramps.${rampName}.${step}`;
  });
});

const buttonVariants = ["primary","secondary","subtle","ghost","destructive"];
const buttonProps = ["bg","fg","border","hoverBg","hoverFg","hoverBorder","shadow","hoverShadow","spinner"];

buttonVariants.forEach((variant) => {
  buttonProps.forEach((prop) => {
    cssAliasBlueprint[`--lk-button-${variant}-${prop}`] = `components.button.${variant}.${prop}`;
  });
});

const toneProps = ["bg","fg","border","hoverBg","hoverFg","hoverBorder","shadow","hoverShadow","spinner"];
const buttonTones = ["neutral","accent","info","success","warning","danger"];
buttonTones.forEach((tone) => {
  toneProps.forEach((prop) => {
    cssAliasBlueprint[`--lk-button-${tone}-${prop}`] = `components.button.tone.${tone}.${prop}`;
  });
});

const badgeTones = ["neutral","primary","accent","success","info","warning","danger"];
const badgeVariants = ["soft","solid","outline"];
badgeTones.forEach((tone) => {
  badgeVariants.forEach((variant) => {
    ["bg","border","fg"].forEach((prop) => {
      cssAliasBlueprint[`--lk-badge-${tone}-${variant}-${prop}`] = `components.badge.${tone}.${variant}.${prop}`;
    });
  });
});

export const cssVariableTokenMap = cssAliasBlueprint;

function getTokenValue(tokens, tokenPath) {
  return tokenPath.split(".").reduce((acc, key) => (acc==null? undefined : acc[key]), tokens);
}

const aliasFallbackTokens = { color: { ramps: colorRamps } };

function buildCssAliasMap(tokens) {
  return Object.fromEntries(Object.entries(cssAliasBlueprint).map(([cssVariable, tokenPath]) => {
    const value = getTokenValue(tokens, tokenPath) ?? getTokenValue(aliasFallbackTokens, tokenPath);
    return [cssVariable, value ?? ""];
  }));
}

const themeAliasTokens = Object.fromEntries(Object.entries(semanticColorTokens).map(([mode, tokens]) => [mode, buildCssAliasMap(tokens)]));

export const themeTokens = semanticColorTokens;
export const themeAliases = themeAliasTokens;

const componentDesignTokens = {
  button: { light: componentButtonTokensLight, dark: componentButtonTokensDark },
  badge:  { light: componentBadgeTokensLight,  dark: componentBadgeTokensDark  },
};

export const designTokens = {
  color: { ramps: colorRamps, themes: semanticColorTokens, components: componentDesignTokens },
  typography: { scale: typographyScale, families: fontFamilyTokens, weights: fontWeightTokens },
  spacing: spacingScale,
  layout: layoutTokens,
  radii: radiusScale,
  shadow: shadowTokens,
  motion: {
    duration: motionTokens.duration,
    easing: motionTokens.easing,
    mediaQueries: { reduceMotion: motionTokens.reduceMotionPreference },
  },
  aliases: { css: themeAliasTokens },
};

let globalTokensApplied = false; // (kept same API; fixed below)
const lastAppliedTheme = { root: null, mode: null };

function resolveThemeMode(candidate) {
  if (VALID_THEME_MODES.has(candidate)) return candidate;
  return DEFAULT_THEME_MODE;
}

function applyGlobalTokens(root) {
  if (!root || globalTokensApplied) return;
  Object.entries(fontFamilyTokens).forEach(([token, value]) => root.style.setProperty(`--font-family-${token}`, value));
  Object.entries(fontWeightTokens).forEach(([token, value]) => root.style.setProperty(`--font-weight-${token}`, String(value)));
  Object.entries(typographyScale).forEach(([token, d]) => {
    root.style.setProperty(`--font-size-${token}`, d.fontSize);
    root.style.setProperty(`--line-height-${token}`, d.lineHeight);
    root.style.setProperty(`--letter-spacing-${token}`, d.letterSpacing);
  });
  Object.entries(spacingScale).forEach(([token, value]) => root.style.setProperty(`--space-${token}`, value));
  Object.entries(layoutTokens).forEach(([token, value]) => {
    const kebab = token.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
    root.style.setProperty(`--layout-${kebab}`, value);
  });
  Object.entries(radiusScale).forEach(([token, value]) => root.style.setProperty(`--radius-${token}`, value));
  Object.entries(shadowTokens).forEach(([token, value]) => root.style.setProperty(`--shadow-${token}`, value));
  Object.entries(motionTokens.duration).forEach(([token, value]) => root.style.setProperty(`--motion-duration-${token}`, value));
  Object.entries(motionTokens.easing).forEach(([token, value]) => root.style.setProperty(`--motion-easing-${token}`, value));
  globalTokensApplied = true;
}

const VALID_THEME_MODES = new Set(["dark", "light"]);
const DEFAULT_THEME_MODE = "dark";

export function applyThemeToDocument(mode = "dark", target) {
  const root = target ?? (typeof document !== "undefined" ? document.documentElement : undefined);
  if (!root) return;
  applyGlobalTokens(root);

  const resolvedMode = resolveThemeMode(mode);
  if (lastAppliedTheme.root === root && lastAppliedTheme.mode === resolvedMode) return;

  const cssAliases = themeAliasTokens[resolvedMode] ?? themeAliasTokens.dark;
  Object.entries(cssAliases).forEach(([cssVar, value]) => {
    root.style.setProperty(cssVar, String(value ?? ""));
  });

  root.dataset.theme = resolvedMode;
  root.dataset.colorScheme = resolvedMode;
  const colorScheme = resolvedMode === "dark" ? "dark" : "light";
  root.style.colorScheme = colorScheme;
  root.style.setProperty("color-scheme", colorScheme);

  // expose background image gradient
  const bgImage = cssAliases["--app-bg-image"];
  if (bgImage) {
    root.style.setProperty("--app-bg-image", String(bgImage));
  }

  lastAppliedTheme.root = root;
  lastAppliedTheme.mode = resolvedMode;
}

export function useTheme() {
  useEffect(() => { applyThemeToDocument("dark"); }, []);
  const setMode = useCallback((m) => applyThemeToDocument(m ?? "dark"), []);
  const toggleMode = useCallback(() => {
    const root = typeof document !== "undefined" ? document.documentElement : undefined;
    const current = root?.dataset?.theme === "light" ? "dark" : "light";
    applyThemeToDocument(current);
  }, []);

  return useMemo(() => ({ mode: "dark", isDark: true, setMode, toggleMode, hasExplicitMode: true }), [setMode, toggleMode]);
}
