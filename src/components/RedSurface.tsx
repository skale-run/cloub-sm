import {
  createElement,
  type ComponentPropsWithoutRef,
  type ElementType,
} from "react";
import { cn } from "../lib/cn";
import "./RedSurface.css";

const toneStyles = {
  primary: "red-surface--primary",
  muted: "red-surface--muted",
  glass: "red-surface--glass",
  dashed: "red-surface--dashed",
} as const;

type Tone = keyof typeof toneStyles;

type RedSurfaceProps<TElement extends ElementType> = {
  as?: TElement;
  tone?: Tone;
} & ComponentPropsWithoutRef<TElement>;

function RedSurface<TElement extends ElementType = "div">({
  as,
  tone = "primary",
  className,
  ...props
}: RedSurfaceProps<TElement>) {
  const Component = as ?? "div";

  return createElement(Component, {
    className: cn("red-surface", toneStyles[tone], className),
    ...props,
  });
}

export default RedSurface;
