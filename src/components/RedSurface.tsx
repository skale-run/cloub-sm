import { createElement, type ComponentPropsWithoutRef, type ElementType } from 'react'
import { cn } from '../lib/cn'

const toneStyles = {
  primary:
    'border border-rose-500/35 bg-gradient-to-br from-rose-950/80 via-rose-900/70 to-rose-800/60 shadow-[0_35px_120px_rgba(136,19,55,0.45)] backdrop-blur',
  muted:
    'border border-rose-500/25 bg-rose-950/70 shadow-[0_28px_90px_rgba(136,19,55,0.35)] backdrop-blur-sm',
  glass:
    'border border-rose-400/30 bg-rose-950/30 text-rose-100/90 shadow-[0_22px_70px_rgba(136,19,55,0.3)] backdrop-blur-md',
  dashed:
    'border-2 border-dashed border-rose-400/50 bg-rose-950/20 text-rose-100/80 shadow-none backdrop-blur-sm',
} as const

type Tone = keyof typeof toneStyles

type RedSurfaceProps<TElement extends ElementType> = {
  as?: TElement
  tone?: Tone
} & ComponentPropsWithoutRef<TElement>

function RedSurface<TElement extends ElementType = 'div'>(
  { as, tone = 'primary', className, ...props }: RedSurfaceProps<TElement>,
) {
  const Component = as ?? 'div'

  return createElement(Component, {
    className: cn('rounded-3xl text-rose-50/95', toneStyles[tone], className),
    ...props,
  })
}

export default RedSurface
