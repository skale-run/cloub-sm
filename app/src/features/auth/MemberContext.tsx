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

type MemberContextValue = {
  member: Member | null;
  setMember: (member: Member) => void;
  clearMember: () => void;
};

const MemberContext = createContext<MemberContextValue | undefined>(undefined);

type MemberProviderProps = {
  children: ReactNode;
};

export function MemberProvider({ children }: MemberProviderProps) {
  const [member, setMemberState] = useState<Member | null>(getStoredMember);
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
    const initialMember = initialMemberRef.current;
    if (!initialMember) {
      return;
    }

    const controller = new AbortController();

    async function refreshMemberProfile() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/members/${initialMember.id}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          if (response.status === 404) {
            setMemberState(null);
            return;
          }

          throw new Error(`Failed to refresh member (${response.status})`);
        }

        const payload = (await response.json().catch(() => null)) as
          | { member?: Member }
          | null;

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
  }, []);

  const setMember = useCallback((nextMember: Member) => {
    setMemberState(nextMember);
  }, []);

  const clearMember = useCallback(() => {
    setMemberState(null);
  }, []);

  const value = useMemo(
    () => ({
      member,
      setMember,
      clearMember,
    }),
    [member, setMember, clearMember],
  );

  return <MemberContext.Provider value={value}>{children}</MemberContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMember() {
  const context = useContext(MemberContext);

  if (!context) {
    throw new Error(
      "useMember must be used within a MemberProvider",
    );
  }

  return context;
}
