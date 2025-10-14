export type ThemeMode = 'dark'

type ThemeTarget = HTMLElement | Document | null | undefined

export interface ThemeController {
  mode: ThemeMode
  isDark: true
  setMode: (mode: ThemeMode) => void
  toggleMode: () => void
  hasExplicitMode: true
}

export declare function applyThemeToDocument(
  mode?: ThemeMode,
  target?: ThemeTarget,
): void

export declare function useTheme(): ThemeController
