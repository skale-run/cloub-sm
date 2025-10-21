export type ThemeMode = "dark";

type ThemeTarget = HTMLElement | Document | null | undefined;

export declare function applyThemeToDocument(
  mode?: ThemeMode,
  target?: ThemeTarget,
): void;
