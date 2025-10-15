import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AuthMode = "login" | "register";

type AthletePortalModalContextValue = {
  isOpen: boolean;
  open: (mode?: AuthMode) => void;
  close: () => void;
  requestedMode: AuthMode;
};

const AthletePortalModalContext = createContext<
  AthletePortalModalContextValue | undefined
>(undefined);

type AthletePortalModalProviderProps = {
  children: ReactNode;
};

export function AthletePortalModalProvider({
  children,
}: AthletePortalModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [requestedMode, setRequestedMode] = useState<AuthMode>("login");

  const open = useCallback((mode: AuthMode = "login") => {
    setRequestedMode(mode);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      open,
      close,
      requestedMode,
    }),
    [close, isOpen, open, requestedMode],
  );

  return (
    <AthletePortalModalContext.Provider value={value}>
      {children}
    </AthletePortalModalContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAthletePortalModal() {
  const context = useContext(AthletePortalModalContext);

  if (!context) {
    throw new Error(
      "يجب استخدام useAthletePortalModal ضمن AthletePortalModalProvider",
    );
  }

  return context;
}
