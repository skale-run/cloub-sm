import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Activity, Award, BarChart3, Users, X } from "../../lucide-react";
import { useAthletePortalModal } from "./AthletePortalModalContext";

const highlightConfig = [
  {
    titleKey: "auth.modal.highlights.items.eliteTraining.title",
    descriptionKey: "auth.modal.highlights.items.eliteTraining.description",
    icon: Activity,
  },
  {
    titleKey: "auth.modal.highlights.items.performanceIntelligence.title",
    descriptionKey:
      "auth.modal.highlights.items.performanceIntelligence.description",
    icon: BarChart3,
  },
  {
    titleKey: "auth.modal.highlights.items.communityRecognition.title",
    descriptionKey:
      "auth.modal.highlights.items.communityRecognition.description",
    icon: Award,
  },
  {
    titleKey: "auth.modal.highlights.items.supportCrew.title",
    descriptionKey: "auth.modal.highlights.items.supportCrew.description",
    icon: Users,
  },
];

type AuthMode = "login" | "register";

const LOGIN_FORM_STORAGE_KEY = "cloub-auth-login-form" as const;
const REGISTER_FORM_STORAGE_KEY = "cloub-auth-register-form" as const;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

type LoginFormState = {
  email: string;
  password: string;
};

type RegisterFormState = {
  fullName: string;
  email: string;
  password: string;
  role: string;
  squadTier: string;
  emergencyContact: string;
  membershipId: string;
  profilePhotoUrl: string;
};

const authCopy: Record<
  AuthMode,
  { headingKey: string; descriptionKey: string; ctaKey: string }
> = {
  login: {
    headingKey: "auth.modal.copy.login.heading",
    descriptionKey: "auth.modal.copy.login.description",
    ctaKey: "auth.modal.copy.login.cta",
  },
  register: {
    headingKey: "auth.modal.copy.register.heading",
    descriptionKey: "auth.modal.copy.register.description",
    ctaKey: "auth.modal.copy.register.cta",
  },
};

const supportEmail = "coach@aerodash.com" as const;

function AuthenticationExperienceModal() {
  const { isOpen, close } = useAthletePortalModal();
  const { t } = useTranslation();
  const [mode, setMode] = useState<AuthMode>("login");
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const activeRequestRef = useRef<AbortController | null>(null);
  const profilePhotoInputRef = useRef<HTMLInputElement | null>(null);
  const [loginForm, setLoginForm] = useState<LoginFormState>(() => {
    if (typeof window === "undefined") {
      return { email: "", password: "" };
    }

    try {
      const rawValue = window.localStorage.getItem(LOGIN_FORM_STORAGE_KEY);
      if (!rawValue) {
        return { email: "", password: "" };
      }

      const parsed = JSON.parse(rawValue) as Partial<
        Record<"email" | "password", string>
      >;

      return {
        email: parsed.email ?? "",
        password: parsed.password ?? "",
      };
    } catch (error) {
      console.error("Failed to parse stored login form", error);
      return { email: "", password: "" };
    }
  });
  const [registerForm, setRegisterForm] = useState<RegisterFormState>(() => {
    if (typeof window === "undefined") {
      return {
        fullName: "",
        email: "",
        password: "",
        role: "",
        squadTier: "",
        emergencyContact: "",
        membershipId: "",
        profilePhotoUrl: "",
      };
    }

    try {
      const rawValue = window.localStorage.getItem(REGISTER_FORM_STORAGE_KEY);
      if (!rawValue) {
        return {
          fullName: "",
          email: "",
          password: "",
          role: "",
          squadTier: "",
          emergencyContact: "",
          membershipId: "",
          profilePhotoUrl: "",
        };
      }

      const parsed = JSON.parse(rawValue) as Partial<
        Record<
          | "fullName"
          | "email"
          | "password"
          | "role"
          | "squadTier"
          | "emergencyContact"
          | "membershipId"
          | "profilePhotoUrl",
          string
        >
      >;

      return {
        fullName: parsed.fullName ?? "",
        email: parsed.email ?? "",
        password: parsed.password ?? "",
        role: parsed.role ?? "",
        squadTier: parsed.squadTier ?? "",
        emergencyContact: parsed.emergencyContact ?? "",
        membershipId: parsed.membershipId ?? "",
        profilePhotoUrl: parsed.profilePhotoUrl ?? "",
      };
    } catch (error) {
      console.error("Failed to parse stored registration form", error);
      return {
        fullName: "",
        email: "",
        password: "",
        role: "",
        squadTier: "",
        emergencyContact: "",
        membershipId: "",
        profilePhotoUrl: "",
      };
    }
  });
  const [loginState, setLoginState] = useState<SubmissionState>({
    status: "idle",
  });
  const [registerState, setRegisterState] = useState<SubmissionState>({
    status: "idle",
  });

  const handleProfilePhotoSelect = useCallback(
    (file: File | undefined | null) => {
      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
          setRegisterForm((previous) => ({
            ...previous,
            profilePhotoUrl: result,
          }));
        }
      };
      reader.readAsDataURL(file);
    },
    [setRegisterForm],
  );

  const handleProfilePhotoInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const [file] = event.target.files ?? [];
      handleProfilePhotoSelect(file);
    },
    [handleProfilePhotoSelect],
  );

  const handleProfilePhotoDrop = useCallback((event: DragEvent<HTMLElement>) => {
      event.preventDefault();
      const [file] = event.dataTransfer.files ?? [];
      handleProfilePhotoSelect(file);
    },
    [handleProfilePhotoSelect],
  );

  const handleProfilePhotoClear = useCallback(() => {
    setRegisterForm((previous) => ({
      ...previous,
      profilePhotoUrl: "",
    }));
    if (profilePhotoInputRef.current) {
      profilePhotoInputRef.current.value = "";
    }
  }, [setRegisterForm]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      LOGIN_FORM_STORAGE_KEY,
      JSON.stringify(loginForm),
    );
  }, [loginForm]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      REGISTER_FORM_STORAGE_KEY,
      JSON.stringify(registerForm),
    );
  }, [registerForm]);

  useEffect(() => () => {
    activeRequestRef.current?.abort();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      if (activeRequestRef.current) {
        activeRequestRef.current.abort();
        activeRequestRef.current = null;
      }

      setLoginState({ status: "idle" });
      setRegisterState({ status: "idle" });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previouslyFocusedElementRef.current =
      document.activeElement as HTMLElement | null;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    };

    const { style } = document.body;
    const originalOverflow = style.overflow;
    style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    const timer = window.setTimeout(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    }, 0);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      style.overflow = originalOverflow;
      previouslyFocusedElementRef.current?.focus({ preventScroll: true });
    };
  }, [close, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setMode("login");
    }
  }, [isOpen]);

  const { heading, description, cta } = useMemo(() => {
    const { headingKey, descriptionKey, ctaKey } = authCopy[mode];

    return {
      heading: t(headingKey),
      description: t(descriptionKey),
      cta: t(ctaKey),
    };
  }, [mode, t]);

  const highlights = useMemo(
    () =>
      highlightConfig.map((item) => ({
        ...item,
        title: t(item.titleKey),
        description: t(item.descriptionKey),
      })),
    [t],
  );

  const handleModeChange = useCallback(
    (value: AuthMode) => {
      setMode(value);

      if (value === "login") {
        setRegisterState({ status: "idle" });
      } else {
        setLoginState({ status: "idle" });
      }
    },
    [setMode, setLoginState, setRegisterState],
  );

  const handleLoginSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const controller = new AbortController();
      if (activeRequestRef.current) {
        activeRequestRef.current.abort();
      }
      activeRequestRef.current = controller;

      setLoginState({ status: "submitting" });

      try {
        const response = await fetch(`${API_BASE_URL}/members/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginForm.email.trim(),
            password: loginForm.password,
          }),
          signal: controller.signal,
        });

        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;

        if (!response.ok) {
          const message =
            payload?.error ??
            (response.status === 401
              ? t("auth.modal.status.login.invalid")
              : t("auth.modal.status.generic"));

          setLoginState({
            status: "error",
            message,
          });
          return;
        }

        setLoginState({
          status: "success",
          message: t("auth.modal.status.login.success"),
        });

        setLoginForm((previous) => ({
          ...previous,
          password: "",
        }));
      } catch (error) {
        if (
          (error instanceof DOMException && error.name === "AbortError") ||
          (error instanceof Error && error.name === "AbortError")
        ) {
          return;
        }

        console.error("Failed to sign in", error);
        setLoginState({
          status: "error",
          message: t("auth.modal.status.network"),
        });
      } finally {
        if (activeRequestRef.current === controller) {
          activeRequestRef.current = null;
        }
      }
    },
    [loginForm.email, loginForm.password, setLoginForm, setLoginState, t],
  );

  const handleRegisterSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const trimmedFullName = registerForm.fullName.trim();
      const trimmedEmail = registerForm.email.trim();
      const trimmedRole = registerForm.role.trim();
      const trimmedSquadTier = registerForm.squadTier.trim();
      const trimmedEmergencyContact = registerForm.emergencyContact.trim();
      const trimmedMembershipId = registerForm.membershipId.trim();
      const trimmedProfilePhotoUrl = registerForm.profilePhotoUrl.trim();

      const controller = new AbortController();
      if (activeRequestRef.current) {
        activeRequestRef.current.abort();
      }
      activeRequestRef.current = controller;

      setRegisterState({ status: "submitting" });

      try {
        const response = await fetch(`${API_BASE_URL}/members`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: trimmedFullName,
            email: trimmedEmail,
            password: registerForm.password,
            role: trimmedRole,
            squadTier: trimmedSquadTier,
            emergencyContact: trimmedEmergencyContact,
            membershipId: trimmedMembershipId,
            profilePhotoUrl: trimmedProfilePhotoUrl,
          }),
          signal: controller.signal,
        });

        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;

        if (!response.ok) {
          const message =
            payload?.error ??
            (response.status === 409
              ? t("auth.modal.status.register.duplicate")
              : t("auth.modal.status.generic"));

          setRegisterState({
            status: "error",
            message,
          });
          return;
        }

        setRegisterForm({
          fullName: "",
          email: "",
          password: "",
          role: "",
          squadTier: "",
          emergencyContact: "",
          membershipId: "",
          profilePhotoUrl: "",
        });
        setRegisterState({ status: "idle" });
        setLoginForm((previous) => ({
          ...previous,
          email: trimmedEmail,
        }));
        setMode("login");
        setLoginState({
          status: "success",
          message: t("auth.modal.status.register.success"),
        });
      } catch (error) {
        if (
          (error instanceof DOMException && error.name === "AbortError") ||
          (error instanceof Error && error.name === "AbortError")
        ) {
          return;
        }

        console.error("Failed to create account", error);
        setRegisterState({
          status: "error",
          message: t("auth.modal.status.network"),
        });
      } finally {
        if (activeRequestRef.current === controller) {
          activeRequestRef.current = null;
        }
      }
    },
    [
      registerForm.email,
      registerForm.fullName,
      registerForm.password,
      registerForm.role,
      registerForm.squadTier,
      registerForm.emergencyContact,
      registerForm.membershipId,
      registerForm.profilePhotoUrl,
      setLoginForm,
      setLoginState,
      setMode,
      setRegisterForm,
      setRegisterState,
      t,
    ],
  );

  const isLoginSubmitting = loginState.status === "submitting";
  const isRegisterSubmitting = registerState.status === "submitting";

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="athlete-auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-red-950/90 p-6 backdrop-blur-lg"
    >
      <div className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-[28px] border border-red-400/30 bg-gradient-to-br from-red-950/95 via-red-950/80 to-red-900/70 shadow-[0_55px_160px_rgba(127,29,29,0.55)]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.18),transparent_55%)]"
          aria-hidden
        />

        <button
          ref={closeButtonRef}
          type="button"
          onClick={close}
          className="absolute right-6 top-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-red-400/40 bg-red-950/40 text-red-100 transition hover:border-red-300/60 hover:bg-red-900/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
          aria-label={t("auth.modal.aria.close")}
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        <div className="grid flex-1 grid-cols-1 gap-8 overflow-y-auto p-10 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="flex flex-col justify-between gap-10">
            <div className="space-y-5">
              <p className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-red-200/80">
                {t("auth.modal.badge")}
              </p>
              <h2
                id="athlete-auth-modal-title"
                className="text-3xl font-semibold text-white sm:text-4xl"
              >
                {heading}
              </h2>
              <p className="max-w-xl text-base text-red-100/80">
                {description}
              </p>
            </div>

            <div className="space-y-6">
              <div className="inline-flex rounded-full border border-red-400/35 bg-red-950/35 p-1 text-sm text-red-100/85">
                {(
                  [
                    {
                      label: t("auth.modal.modes.login"),
                      value: "login",
                    },
                    {
                      label: t("auth.modal.modes.register"),
                      value: "register",
                    },
                  ] as const
                ).map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleModeChange(option.value)}
                    className={`flex-1 rounded-full px-6 py-2 font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 ${
                      mode === option.value
                        ? "bg-red-500 text-red-50 shadow-[0_18px_45px_rgba(220,38,38,0.45)]"
                        : "text-red-200/75 hover:text-red-100"
                    }`}
                    aria-pressed={mode === option.value}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {mode === "login" ? (
                <form
                  className="space-y-4"
                  aria-label={t("auth.modal.aria.loginForm")}
                  aria-busy={isLoginSubmitting}
                  onSubmit={handleLoginSubmit}
                >
                  <label className="block text-sm font-medium text-red-100">
                    {t("auth.modal.loginForm.email.label")}
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      className="mt-2 w-full rounded-2xl border border-red-400/30 bg-red-950/35 px-4 py-3 text-base text-red-50 placeholder:text-red-200/70 focus:border-red-400/50 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                      placeholder={t("auth.modal.loginForm.email.placeholder")}
                      required
                      value={loginForm.email}
                      onChange={(event) =>
                        setLoginForm((previous) => ({
                          ...previous,
                          email: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className="block text-sm font-medium text-red-100">
                    {t("auth.modal.loginForm.password.label")}
                    <input
                      type="password"
                      name="password"
                      autoComplete="current-password"
                      className="mt-2 w-full rounded-2xl border border-red-400/30 bg-red-950/35 px-4 py-3 text-base text-red-50 placeholder:text-red-200/70 focus:border-red-400/50 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                      placeholder={t("auth.modal.loginForm.password.placeholder")}
                      required
                      value={loginForm.password}
                      onChange={(event) =>
                        setLoginForm((previous) => ({
                          ...previous,
                          password: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={isLoginSubmitting}
                    className="w-full rounded-2xl bg-gradient-to-r from-red-400 via-red-500 to-amber-300 px-4 py-3 text-base font-semibold text-slate-950 shadow-[0_25px_65px_rgba(220,38,38,0.45)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-200 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLoginSubmitting ? `${cta}…` : cta}
                  </button>
                  {loginState.status === "error" && (
                    <p
                      className="text-center text-xs text-red-200/85"
                      role="alert"
                      aria-live="polite"
                    >
                      {loginState.message}
                    </p>
                  )}
                  {loginState.status === "success" && (
                    <p
                      className="text-center text-xs text-emerald-200/85"
                      role="status"
                      aria-live="polite"
                    >
                      {loginState.message}
                    </p>
                  )}
                  <p className="text-center text-xs text-red-200/75">
                    {t("auth.modal.loginForm.forgotPassword")}
                  </p>
                </form>
              ) : (
                <form
                  className="space-y-4"
                  aria-label={t("auth.modal.aria.registerForm")}
                  aria-busy={isRegisterSubmitting}
                  onSubmit={handleRegisterSubmit}
                >
                  <div
                    className="rounded-2xl border border-red-400/30 bg-red-950/35 p-4 text-red-100"
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={handleProfilePhotoDrop}
                  >
                    <p className="text-sm font-medium">
                      {t("auth.modal.registerForm.profilePhoto.label")}
                    </p>
                    <div className="mt-3 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-red-400/40 bg-red-950/35 px-4 py-6 text-center">
                      {registerForm.profilePhotoUrl ? (
                        <img
                          src={registerForm.profilePhotoUrl}
                          alt={t("auth.modal.registerForm.profilePhoto.previewAlt")}
                          className="h-24 w-24 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-sm text-red-100/80">
                          <span className="text-base font-medium text-red-50">
                            {t("auth.modal.registerForm.profilePhoto.dropLabel")}
                          </span>
                          <span className="text-xs text-red-100/70">
                            {t("auth.modal.registerForm.profilePhoto.helpText")}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => profilePhotoInputRef.current?.click()}
                          onDragOver={(event) => event.preventDefault()}
                          onDrop={handleProfilePhotoDrop}
                          className="rounded-xl border border-red-400/40 bg-red-500/20 px-4 py-2 text-sm font-medium text-red-50 transition hover:border-red-300/60 hover:bg-red-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-200"
                        >
                          {registerForm.profilePhotoUrl
                            ? t("auth.modal.registerForm.profilePhoto.changeButton")
                            : t("auth.modal.registerForm.profilePhoto.uploadButton")}
                        </button>
                        {registerForm.profilePhotoUrl && (
                          <button
                            type="button"
                            onClick={handleProfilePhotoClear}
                            className="rounded-xl border border-red-400/30 px-4 py-2 text-sm font-medium text-red-100 transition hover:border-red-300/50 hover:text-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-200"
                          >
                            {t("auth.modal.registerForm.profilePhoto.removeButton")}
                          </button>
                        )}
                      </div>
                    </div>
                    <input
                      ref={profilePhotoInputRef}
                      type="file"
                      accept="image/png,image/jpeg"
                      className="sr-only"
                      onChange={handleProfilePhotoInputChange}
                    />
                  </div>
                  <label className="block text-sm font-medium text-red-100">
                    {t("auth.modal.registerForm.fullName.label")}
                    <input
                      type="text"
                      name="fullName"
                      autoComplete="name"
                      className="mt-2 w-full rounded-2xl border border-red-400/30 bg-red-950/35 px-4 py-3 text-base text-red-50 placeholder:text-red-200/70 focus:border-red-400/50 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                      placeholder={t(
                        "auth.modal.registerForm.fullName.placeholder",
                      )}
                      required
                      value={registerForm.fullName}
                      onChange={(event) =>
                        setRegisterForm((previous) => ({
                          ...previous,
                          fullName: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className="block text-sm font-medium text-red-100">
                    {t("auth.modal.registerForm.role.label")}
                    <input
                      type="text"
                      name="role"
                      autoComplete="organization-title"
                      className="mt-2 w-full rounded-2xl border border-red-400/30 bg-red-950/35 px-4 py-3 text-base text-red-50 placeholder:text-red-200/70 focus:border-red-400/50 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                      placeholder={t("auth.modal.registerForm.role.placeholder")}
                      value={registerForm.role}
                      onChange={(event) =>
                        setRegisterForm((previous) => ({
                          ...previous,
                          role: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className="block text-sm font-medium text-red-100">
                    {t("auth.modal.registerForm.squadTier.label")}
                    <input
                      type="text"
                      name="squadTier"
                      autoComplete="organization"
                      className="mt-2 w-full rounded-2xl border border-red-400/30 bg-red-950/35 px-4 py-3 text-base text-red-50 placeholder:text-red-200/70 focus:border-red-400/50 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                      placeholder={t("auth.modal.registerForm.squadTier.placeholder")}
                      value={registerForm.squadTier}
                      onChange={(event) =>
                        setRegisterForm((previous) => ({
                          ...previous,
                          squadTier: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className="block text-sm font-medium text-red-100">
                    {t("auth.modal.registerForm.email.label")}
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      className="mt-2 w-full rounded-2xl border border-red-400/30 bg-red-950/35 px-4 py-3 text-base text-red-50 placeholder:text-red-200/70 focus:border-red-400/50 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                      placeholder={t("auth.modal.registerForm.email.placeholder")}
                      required
                      value={registerForm.email}
                      onChange={(event) =>
                        setRegisterForm((previous) => ({
                          ...previous,
                          email: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className="block text-sm font-medium text-red-100">
                    {t("auth.modal.registerForm.emergencyContact.label")}
                    <input
                      type="tel"
                      name="emergencyContact"
                      autoComplete="tel"
                      className="mt-2 w-full rounded-2xl border border-red-400/30 bg-red-950/35 px-4 py-3 text-base text-red-50 placeholder:text-red-200/70 focus:border-red-400/50 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                      placeholder={t("auth.modal.registerForm.emergencyContact.placeholder")}
                      value={registerForm.emergencyContact}
                      onChange={(event) =>
                        setRegisterForm((previous) => ({
                          ...previous,
                          emergencyContact: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className="block text-sm font-medium text-red-100">
                    {t("auth.modal.registerForm.membershipId.label")}
                    <input
                      type="text"
                      name="membershipId"
                      autoComplete="off"
                      className="mt-2 w-full rounded-2xl border border-red-400/30 bg-red-950/35 px-4 py-3 text-base text-red-50 placeholder:text-red-200/70 focus:border-red-400/50 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                      placeholder={t("auth.modal.registerForm.membershipId.placeholder")}
                      required
                      value={registerForm.membershipId}
                      onChange={(event) =>
                        setRegisterForm((previous) => ({
                          ...previous,
                          membershipId: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className="block text-sm font-medium text-red-100">
                    {t("auth.modal.registerForm.password.label")}
                    <input
                      type="password"
                      name="password"
                      autoComplete="new-password"
                      minLength={8}
                      className="mt-2 w-full rounded-2xl border border-red-400/30 bg-red-950/35 px-4 py-3 text-base text-red-50 placeholder:text-red-200/70 focus:border-red-400/50 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                      placeholder={t(
                        "auth.modal.registerForm.password.placeholder",
                      )}
                      required
                      value={registerForm.password}
                      onChange={(event) =>
                        setRegisterForm((previous) => ({
                          ...previous,
                          password: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={isRegisterSubmitting}
                    className="w-full rounded-2xl bg-gradient-to-r from-red-500 via-amber-400 to-orange-300 px-4 py-3 text-base font-semibold text-slate-950 shadow-[0_25px_70px_rgba(220,38,38,0.42)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-200 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isRegisterSubmitting ? `${cta}…` : cta}
                  </button>
                  {registerState.status === "error" && (
                    <p
                      className="text-center text-xs text-red-200/85"
                      role="alert"
                      aria-live="polite"
                    >
                      {registerState.message}
                    </p>
                  )}
                  <p className="text-center text-xs text-red-200/75">
                    {t("auth.modal.registerForm.disclaimer")}
                  </p>
                </form>
              )}
            </div>
          </section>

          <aside className="flex flex-col justify-between gap-8 rounded-3xl border border-red-400/35 bg-red-950/35 p-8 text-red-100/85 backdrop-blur">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.35em] text-red-200/70">
                {t("auth.modal.highlights.heading")}
              </p>
              <ul className="space-y-4">
                {highlights.map((highlight) => {
                  const Icon = highlight.icon;
                  return (
                    <li
                      key={highlight.titleKey}
                      className="group flex gap-4 rounded-2xl border border-red-400/35 bg-red-950/45 p-4 transition hover:border-red-400/50 hover:bg-red-500/15"
                    >
                      <span className="mt-1 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-500/15 text-red-200">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <div className="space-y-1">
                        <p className="font-semibold text-red-50">
                          {highlight.title}
                        </p>
                        <p className="text-sm text-red-100/80">
                          {highlight.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-3xl border border-red-400/30 bg-gradient-to-br from-red-500/20 via-amber-500/10 to-transparent p-6 text-sm text-red-100/85">
              <p className="font-semibold text-red-50">
                {t("auth.modal.support.heading")}
              </p>
              <p className="mt-2 text-red-200/75">
                {t("auth.modal.support.intro")} {" "}
                <span className="font-medium text-red-200">{supportEmail}</span>{" "}
                {t("auth.modal.support.outro")}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default AuthenticationExperienceModal;
