import { createElement, type ComponentPropsWithoutRef, type ElementType } from 'react'
import { cn } from '../lib/cn'

const toneStyles = {
  primary:
    'border border-red-500/35 bg-gradient-to-br from-red-950/80 via-red-900/70 to-red-800/60 shadow-[0_35px_120px_rgba(127,29,29,0.45)] backdrop-blur',
  muted:
    'border border-red-500/25 bg-red-950/70 shadow-[0_28px_90px_rgba(127,29,29,0.35)] backdrop-blur-sm',
  glass:
    'border border-red-400/30 bg-red-950/30 text-red-100/90 shadow-[0_22px_70px_rgba(127,29,29,0.3)] backdrop-blur-md',
  dashed:
    'border-2 border-dashed border-red-400/50 bg-red-950/20 text-red-100/80 shadow-none backdrop-blur-sm',
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
    className: cn('rounded-3xl text-red-50/95', toneStyles[tone], className),
    ...props,
  })
}

export default RedSurface
