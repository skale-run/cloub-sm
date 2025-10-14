import { forwardRef } from 'react'
import type { SVGProps, ReactNode } from 'react'

type LucideProps = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number | string
  strokeWidth?: number | string
}

export type { LucideProps }
export type LucideIcon = ReturnType<typeof createLucideIcon>

function createLucideIcon(children: ReactNode) {
  return forwardRef<SVGSVGElement, LucideProps>(
    ({ color = 'currentColor', size = 24, strokeWidth = 1.8, ...rest }, ref) => (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...rest}
      >
        {children}
      </svg>
    ),
  )
}

export const Activity = createLucideIcon(
  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
)

export const CalendarDays = createLucideIcon(
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M8 14h.01" />
    <path d="M12 14h.01" />
    <path d="M16 14h.01" />
    <path d="M8 18h.01" />
    <path d="M12 18h.01" />
    <path d="M16 18h.01" />
  </>,
)

export const Flag = createLucideIcon(
  <>
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-2 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </>,
)

export const BarChart3 = createLucideIcon(
  <>
    <line x1="3" y1="22" x2="21" y2="22" />
    <line x1="6" y1="18" x2="6" y2="12" />
    <line x1="12" y1="18" x2="12" y2="8" />
    <line x1="18" y1="18" x2="18" y2="4" />
  </>,
)

export const UserCircle = createLucideIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M9 10a3 3 0 0 1 6 0" />
    <path d="M7 18c1.5-2 7.5-2 10 0" />
  </>,
)

export const ScanQrCode = createLucideIcon(
  <>
    <rect x="3" y="3" width="6" height="6" rx="1" />
    <rect x="15" y="3" width="6" height="6" rx="1" />
    <rect x="3" y="15" width="6" height="6" rx="1" />
    <path d="M15 15h3v3h3" />
    <path d="M15 9v6" />
    <path d="M9 15h6" />
  </>,
)

export const Sun = createLucideIcon(
  <>
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
    <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
    <line x1="2" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
    <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
  </>,
)

export const Moon = createLucideIcon(
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
)

export const X = createLucideIcon(
  <>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </>,
)

export const Menu = createLucideIcon(
  <>
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </>,
)
