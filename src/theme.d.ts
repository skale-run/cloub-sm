export type ThemeMode = 'light' | 'dark'

type ThemeTarget = HTMLElement | Document | null | undefined

export interface ThemeController {
  mode: ThemeMode
  isDark: boolean
  setMode: (mode: ThemeMode | 'system') => void
  toggleMode: () => void
  hasExplicitMode: boolean
}

export declare function applyThemeToDocument(
  mode?: ThemeMode,
  target?: ThemeTarget,
): void

export declare function useTheme(): ThemeController
