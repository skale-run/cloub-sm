import type { FC } from "react";

interface LandingPageProps {
  onSignup: () => void;
  onLogin: () => void;
  onContact: () => void;
}

const LandingPage: FC<LandingPageProps> = ({ onSignup, onLogin, onContact }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-950 via-red-900 to-red-950 text-red-50">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/20 blur-3xl" />
          <div className="absolute -left-24 top-12 h-56 w-56 rounded-full bg-red-500/20 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-red-400/10 blur-3xl" />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 text-center sm:gap-12 sm:py-24">
          <p className="mx-auto w-fit rounded-full border border-red-300/30 bg-red-900/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-red-200/80">
            Cloud-based sports management
          </p>
          <h1 className="text-4xl font-bold leading-tight text-red-50 sm:text-5xl lg:text-6xl">
            Simplify club operations and inspire every athlete
          </h1>
          <p className="mx-auto max-w-2xl text-base text-red-100/90 sm:text-lg">
            Cloub empowers coaches, athletes, and administrators with a unified platform for scheduling, performance tracking, and real-time communication.
            Build stronger programs with insights that keep everyone aligned.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onSignup}
              className="rounded-full bg-red-500 px-7 py-3 text-sm font-semibold text-red-50 shadow-[0_20px_35px_rgba(248,113,113,0.25)] transition hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-200"
            >
              Sign up
            </button>
            <button
              type="button"
              onClick={onLogin}
              className="rounded-full border border-red-200/40 px-7 py-3 text-sm font-semibold text-red-50 transition hover:border-red-200/80 hover:bg-red-900/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-200"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={onContact}
              className="rounded-full border border-transparent bg-red-900/60 px-7 py-3 text-sm font-semibold text-red-100 transition hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-200"
            >
              Contact
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24">
        <section className="grid gap-8 rounded-3xl border border-red-200/10 bg-red-950/60 p-8 shadow-[0_30px_80px_rgba(127,29,29,0.35)] sm:grid-cols-3">
          {[
            {
              title: "Centralized scheduling",
              description:
                "Organize practices, competitions, and travel with automated reminders that keep every roster member informed.",
            },
            {
              title: "Performance intelligence",
              description:
                "Visualize athlete progress with dashboards that combine attendance, training load, and evaluation insights.",
            },
            {
              title: "Secure access for all",
              description:
                "Role-based permissions give coaches, athletes, and guardians the right visibility while protecting sensitive data.",
            },
          ].map((feature) => (
            <article key={feature.title} className="rounded-2xl bg-red-900/30 p-6">
              <h2 className="text-xl font-semibold text-red-50">{feature.title}</h2>
              <p className="mt-3 text-sm text-red-100/80">{feature.description}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-red-50 sm:text-4xl">
              Deliver a world-class club experience
            </h2>
            <p className="text-base text-red-100/90 sm:text-lg">
              Move beyond disconnected spreadsheets and embrace a modern workflow for the entire organization.
              Cloub streamlines registration, communication, and competitive analysis so you can focus on athlete development.
            </p>
            <ul className="space-y-4 text-left text-sm text-red-100/90">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-red-400" />
                <span>
                  Personalized dashboards for coaches with drills, attendance trends, and athlete alerts in one place.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-red-400" />
                <span>
                  Self-service athlete portal with training goals, academic checkpoints, and secure document storage.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-red-400" />
                <span>
                  Automated billing and notifications reduce manual admin work and keep every family in the loop.
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-red-300/20 bg-red-900/40 p-8 text-center shadow-[0_25px_60px_rgba(127,29,29,0.45)]">
            <p className="text-sm uppercase tracking-[0.35em] text-red-200/70">Trusted by clubs</p>
            <p className="mt-6 text-5xl font-bold text-red-50">12k+</p>
            <p className="mt-3 text-sm text-red-100/80">
              teams coordinate their seasons with Cloub to boost member satisfaction and reduce admin overhead.
            </p>
          </div>
        </section>

        <section
          id="landing-contact"
          className="rounded-3xl border border-red-200/20 bg-red-900/40 p-10 text-center shadow-[0_20px_60px_rgba(127,29,29,0.4)]"
        >
          <h2 className="text-3xl font-semibold text-red-50">Talk with our team</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-red-100/80 sm:text-base">
            Ready to modernize your club? Share your goals and we&apos;ll tailor a walkthrough that fits your season timeline.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-red-100/80 sm:flex-row">
            <a
              href="mailto:hello@cloub.co"
              className="rounded-full border border-red-200/30 px-6 py-2.5 text-red-100 transition hover:border-red-200/60 hover:bg-red-900/70"
            >
              hello@cloub.co
            </a>
            <span className="hidden text-red-200/40 sm:inline">•</span>
            <p>Schedule a discovery call: <span className="font-semibold text-red-50">Mon–Fri · 9am–6pm PT</span></p>
          </div>
        </section>
      </main>

      <footer className="border-t border-red-200/10 bg-red-950/80 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-red-300/80 sm:flex-row">
          <p>© {new Date().getFullYear()} Cloub Sports Management. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#" className="transition hover:text-red-200">
              Privacy
            </a>
            <a href="#" className="transition hover:text-red-200">
              Terms
            </a>
            <a href="#" className="transition hover:text-red-200">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
