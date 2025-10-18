import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "cloub-auth-member" as const;
const TOKEN_STORAGE_KEY = "cloub-auth-token" as const;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

export type Member = {
  id: string;
  fullName: string;
  email: string;
  role: string | null;
  squad: string | null;
  emergencyContact: string | null;
  membershipId: string | null;
  profilePhotoUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

function getStoredMember(): Member | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue);
    if (parsed === null || typeof parsed !== "object") {
      return null;
    }

    return parsed as Member;
  } catch (error) {
    console.error("Failed to parse stored member", error);
    return null;
  }
}

function getStoredToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    return rawValue;
  } catch (error) {
    console.error("Failed to read stored auth token", error);
    return null;
  }
}

type MemberContextValue = {
  member: Member | null;
  authToken: string | null;
  setMember: (member: Member, token?: string | null) => void;
  clearMember: () => void;
};

const MemberContext = createContext<MemberContextValue | undefined>(undefined);

type MemberProviderProps = {
  children: ReactNode;
};

export function MemberProvider({ children }: MemberProviderProps) {
  const [member, setMemberState] = useState<Member | null>(getStoredMember);
  const [authToken, setAuthToken] = useState<string | null>(getStoredToken);
  const initialMemberRef = useRef(member);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (member) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(member));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [member]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (authToken) {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, authToken);
    } else {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  }, [authToken]);

  useEffect(() => {
    const initialMember = initialMemberRef.current;
    if (!initialMember) {
      return;
    }

    if (!authToken) {
      setMemberState(null);
      return;
    }

    const controller = new AbortController();

    async function refreshMemberProfile() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/members/${initialMember.id}`,
          {
            signal: controller.signal,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        );

        if (!response.ok) {
          if (response.status === 404) {
            setMemberState(null);
            setAuthToken(null);
            return;
          }

          if (response.status === 401 || response.status === 403) {
            setMemberState(null);
            setAuthToken(null);
            return;
          }

          throw new Error(`Failed to refresh member (${response.status})`);
        }

        const payload = (await response.json().catch(() => null)) as {
          member?: Member;
        } | null;

        if (payload?.member) {
          setMemberState(payload.member);
        }
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        console.warn("Failed to refresh member profile", error);
      }
    }

    refreshMemberProfile();

    return () => {
      controller.abort();
    };
  }, [authToken, setAuthToken, setMemberState]);

  const setMember = useCallback(
    (nextMember: Member, token?: string | null) => {
      setMemberState(nextMember);

      if (typeof token === "string" && token) {
        setAuthToken(token);
      } else if (token === null) {
        setAuthToken(null);
      }
    },
    [setAuthToken, setMemberState],
  );

  const clearMember = useCallback(() => {
    setMemberState(null);
    setAuthToken(null);
  }, [setAuthToken, setMemberState]);

  const value = useMemo(
    () => ({
      member,
      authToken,
      setMember,
      clearMember,
    }),
    [member, authToken, setMember, clearMember],
  );

  return (
    <MemberContext.Provider value={value}>{children}</MemberContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMember() {
  const context = useContext(MemberContext);

  if (!context) {
    throw new Error("useMember must be used within a MemberProvider");
  }

  return context;
}
