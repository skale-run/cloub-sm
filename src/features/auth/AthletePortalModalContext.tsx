import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

type AthletePortalModalContextValue = {
  isOpen: boolean
  open: () => void
  close: () => void
}

const AthletePortalModalContext = createContext<AthletePortalModalContextValue | undefined>(undefined)

type AthletePortalModalProviderProps = {
  children: ReactNode
}

export function AthletePortalModalProvider({ children }: AthletePortalModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  const value = useMemo(
    () => ({
      isOpen,
      open,
      close,
    }),
    [isOpen, open, close],
  )

  return <AthletePortalModalContext.Provider value={value}>{children}</AthletePortalModalContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAthletePortalModal() {
  const context = useContext(AthletePortalModalContext)

  if (!context) {
    throw new Error('useAthletePortalModal must be used within an AthletePortalModalProvider')
  }

  return context
}
