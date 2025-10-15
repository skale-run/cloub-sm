import { FormEvent, useMemo, useState } from "react";

type AuthMode = "login" | "register";

interface AuthFormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function createInitialState(): AuthFormState {
  return {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
}

function AuthToggle({
  activeMode,
  onChange,
}: {
  activeMode: AuthMode;
  onChange: (mode: AuthMode) => void;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white/5 p-1 text-sm">
      {(["login", "register"] as const).map((mode) => {
        const isActive = mode === activeMode;
        return (
          <button
            key={mode}
            type="button"
            onClick={() => onChange(mode)}
            className={`flex-1 rounded-full px-4 py-2 font-medium transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
              isActive ? "bg-white text-slate-900 shadow" : "text-white/70"
            }`}
          >
            {mode === "login" ? "Log in" : "Create account"}
          </button>
        );
      })}
    </div>
  );
}

function AuthField({
  id,
  label,
  type = "text",
  value,
  onChange,
  autoComplete,
  required,
}: {
  id: keyof AuthFormState;
  label: string;
  type?: string;
  value: string;
  onChange: (id: keyof AuthFormState, value: string) => void;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-white/80">
      <span>{label}</span>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        required={required}
        onChange={(event) => onChange(id, event.target.value)}
        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-base text-white shadow-sm outline-none transition placeholder:text-white/40 focus:border-white/30 focus:bg-white/10 focus:ring-2 focus:ring-white/30"
      />
    </label>
  );
}

function App() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [formState, setFormState] = useState<AuthFormState>(() => createInitialState());
  const [message, setMessage] = useState<string>("");

  const isRegistering = mode === "register";

  const buttonLabel = useMemo(
    () => (isRegistering ? "Sign up" : "Log in"),
    [isRegistering],
  );

  const description = useMemo(
    () =>
      isRegistering
        ? "Create a free account to access your athlete dashboard."
        : "Enter your details to access your athlete dashboard.",
    [isRegistering],
  );

  function handleFieldChange(id: keyof AuthFormState, value: string) {
    setFormState((previous) => ({ ...previous, [id]: value }));
  }

  function handleModeChange(newMode: AuthMode) {
    setMode(newMode);
    setMessage("");
    setFormState(createInitialState());
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (isRegistering && formState.password !== formState.confirmPassword) {
      setMessage("Passwords do not match. Please try again.");
      return;
    }

    const modeLabel = isRegistering ? "registered" : "logged in";
    setMessage(
      `Successfully ${modeLabel} as ${formState.email || "your account"}. This is a demo submission.`,
    );
    setFormState(createInitialState());
  }

  return (
    <div className="app-root min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white">
      <div className="w-full max-w-md space-y-8 rounded-3xl bg-white/5 p-8 shadow-2xl backdrop-blur">
        <header className="space-y-3 text-center">
          <AuthToggle activeMode={mode} onChange={handleModeChange} />
          <h1 className="text-3xl font-semibold">Cloub Athlete Portal</h1>
          <p className="text-sm text-white/70">{description}</p>
        </header>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {isRegistering && (
            <AuthField
              id="name"
              label="Full name"
              value={formState.name}
              onChange={handleFieldChange}
              autoComplete="name"
              required
            />
          )}

          <AuthField
            id="email"
            label="Email address"
            type="email"
            value={formState.email}
            onChange={handleFieldChange}
            autoComplete="email"
            required
          />

          <AuthField
            id="password"
            label="Password"
            type="password"
            value={formState.password}
            onChange={handleFieldChange}
            autoComplete={isRegistering ? "new-password" : "current-password"}
            required
          />

          {isRegistering && (
            <AuthField
              id="confirmPassword"
              label="Confirm password"
              type="password"
              value={formState.confirmPassword}
              onChange={handleFieldChange}
              autoComplete="new-password"
              required
            />
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-white px-4 py-2.5 text-base font-semibold text-slate-900 shadow transition hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {buttonLabel}
          </button>
        </form>

        <footer className="space-y-3 text-center text-xs text-white/50">
          <p>
            By continuing you agree to our
            <button type="button" className="ml-1 underline decoration-white/30 decoration-dotted underline-offset-4">
              Terms of Service
            </button>
            .
          </p>
          {message && (
            <p className="rounded-xl bg-emerald-400/10 px-4 py-2 text-emerald-200">
              {message}
            </p>
          )}
        </footer>
      </div>
    </div>
  );
}

export default App;
