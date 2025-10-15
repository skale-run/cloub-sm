import type { CSSProperties, FC } from "react";
import { useTranslation } from "react-i18next";

interface LandingPageProps {
  onSignup: () => void;
  onLogin: () => void;
  onContact: () => void;
}

const mixColor = (token: string, amount: number): string =>
  `color-mix(in srgb, var(${token}) ${amount}%, transparent)`;

const LandingPage: FC<LandingPageProps> = ({ onSignup, onLogin, onContact }) => {
  const { t } = useTranslation();
  const features = t("landing.features", {
    returnObjects: true,
  }) as Array<{ title: string; description: string }>;
  const experience = t("landing.experience", {
    returnObjects: true,
  }) as {
    title: string;
    description: string;
    bullets: string[];
    stats: { label: string; value: string; description: string };
  };
  const footerLinks = t("landing.footer.links", {
    returnObjects: true,
  }) as { privacy: string; terms: string; support: string };

  const heroBackground: CSSProperties = {
    background:
      `radial-gradient(120% 80% at 18% 5%, ${mixColor("--color-primary-soft", 30)} 0%, transparent 70%), ` +
      `radial-gradient(140% 70% at 85% 12%, ${mixColor("--color-accent", 26)} 0%, transparent 72%), ` +
      `var(--color-app-background)`
  };

  const badgeStyles: CSSProperties = {
    background: mixColor("--color-app-surface", 68),
    color: mixColor("--color-text-muted", 82),
    borderColor: mixColor("--color-border-default", 45),
  };

  const heroDescriptionStyles: CSSProperties = {
    color: mixColor("--color-text-muted", 88),
  };

  const primaryCtaStyles: CSSProperties = {
    "--btn-bg": "var(--color-primary)",
    "--btn-bg-hover": mixColor("--color-primary", 85),
    "--btn-shadow": `0 20px 35px ${mixColor("--color-primary", 35)}`,
    color: "var(--color-primary-contrast)",
  } as CSSProperties;

  const secondaryCtaStyles: CSSProperties = {
    "--btn-bg": mixColor("--color-app-surface", 72),
    "--btn-bg-hover": mixColor("--color-app-surface", 82),
    "--btn-border": mixColor("--color-border-default", 55),
    color: mixColor("--color-text-primary", 92),
  } as CSSProperties;

  const tertiaryCtaStyles: CSSProperties = {
    "--btn-bg": mixColor("--color-app-surface", 55),
    "--btn-bg-hover": mixColor("--color-app-surface", 65),
    color: mixColor("--color-text-muted", 90),
  } as CSSProperties;

  const featureSectionStyles: CSSProperties = {
    background: mixColor("--color-app-surface", 86),
    boxShadow: `0 30px 80px ${mixColor("--color-primary", 26)}`,
  };

  const featureCardStyles: CSSProperties = {
    background: mixColor("--color-app-surface-alt", 74),
    color: mixColor("--color-text-muted", 90),
  };

  const experienceDescriptionStyles: CSSProperties = {
    color: mixColor("--color-text-muted", 88),
  };

  const bulletAccentStyles: CSSProperties = {
    background: mixColor("--color-primary", 60),
  };

  const statsCardStyles: CSSProperties = {
    background: mixColor("--color-app-surface", 80),
    boxShadow: `0 25px 60px ${mixColor("--color-primary", 30)}`,
  };

  const statsLabelStyles: CSSProperties = {
    color: mixColor("--color-text-muted", 78),
  };

  const statsDescriptionStyles: CSSProperties = {
    color: mixColor("--color-text-muted", 86),
  };

  const contactSectionStyles: CSSProperties = {
    background: mixColor("--color-app-surface", 82),
    boxShadow: `0 20px 60px ${mixColor("--color-primary", 28)}`,
  };

  const contactDescriptionStyles: CSSProperties = {
    color: mixColor("--color-text-muted", 86),
  };

  const contactLinkStyles: CSSProperties = {
    "--btn-border": mixColor("--color-border-default", 55),
    "--btn-bg": mixColor("--color-app-surface", 76),
    "--btn-bg-hover": mixColor("--color-app-surface", 86),
    color: mixColor("--color-text-muted", 90),
  } as CSSProperties;

  const dividerStyles: CSSProperties = {
    color: mixColor("--color-text-muted", 60),
  };

  const footerStyles: CSSProperties = {
    background: mixColor("--color-app-surface", 78),
    borderColor: mixColor("--color-border-default", 40),
  };

  const footerTextStyles: CSSProperties = {
    color: mixColor("--color-text-muted", 82),
  };

  const footerLinkStyles: CSSProperties = {
    color: mixColor("--color-text-muted", 86),
  };

  return (
    <div className="min-h-screen text-[color:var(--color-text-primary)]" style={heroBackground}>
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: mixColor("--color-primary", 30) }}
          />
          <div
            className="absolute -left-24 top-12 h-56 w-56 rounded-full blur-3xl"
            style={{ background: mixColor("--color-primary-soft", 35) }}
          />
          <div
            className="absolute -right-32 bottom-0 h-72 w-72 rounded-full blur-3xl"
            style={{ background: mixColor("--color-accent", 24) }}
          />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 text-center sm:gap-12 sm:py-24">
          <p
            className="mx-auto w-fit rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em]"
            style={badgeStyles}
          >
            {t("landing.badge")}
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {t("landing.heroTitle")}
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg" style={heroDescriptionStyles}>
            {t("landing.heroDescription")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onSignup}
              className="rounded-full px-7 py-3 text-sm font-semibold transition [background:var(--btn-bg)] [box-shadow:var(--btn-shadow)] hover:[background:var(--btn-bg-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={primaryCtaStyles}
            >
              {t("landing.ctas.primary")}
            </button>
            <button
              type="button"
              onClick={onLogin}
              className="rounded-full border px-7 py-3 text-sm font-semibold transition [background:var(--btn-bg)] hover:[background:var(--btn-bg-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ ...secondaryCtaStyles, borderColor: "var(--btn-border)" }}
            >
              {t("landing.ctas.secondary")}
            </button>
            <button
              type="button"
              onClick={onContact}
              className="rounded-full border border-transparent px-7 py-3 text-sm font-semibold transition [background:var(--btn-bg)] hover:[background:var(--btn-bg-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={tertiaryCtaStyles}
            >
              {t("landing.ctas.tertiary")}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24">
        <section className="grid gap-8 rounded-3xl border p-8 sm:grid-cols-3" style={featureSectionStyles}>
          {features.map((feature) => (
            <article key={feature.title} className="rounded-2xl p-6" style={featureCardStyles}>
              <h2 className="text-xl font-semibold text-[color:var(--color-text-primary)]">{feature.title}</h2>
              <p className="mt-3 text-sm" style={{ color: mixColor("--color-text-muted", 86) }}>
                {feature.description}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {experience.title}
            </h2>
            <p className="text-base sm:text-lg" style={experienceDescriptionStyles}>
              {experience.description}
            </p>
            <ul className="space-y-4 text-left text-sm" style={{ color: mixColor("--color-text-muted", 90) }}>
              {experience.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full" style={bulletAccentStyles} />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border p-8 text-center" style={statsCardStyles}>
            <p className="text-sm uppercase tracking-[0.35em]" style={statsLabelStyles}>
              {experience.stats.label}
            </p>
            <p className="mt-6 text-5xl font-bold text-[color:var(--color-text-primary)]">{experience.stats.value}</p>
            <p className="mt-3 text-sm" style={statsDescriptionStyles}>
              {experience.stats.description}
            </p>
          </div>
        </section>

        <section id="landing-contact" className="rounded-3xl border p-10 text-center" style={contactSectionStyles}>
          <h2 className="text-3xl font-semibold">{t("landing.contact.title")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base" style={contactDescriptionStyles}>
            {t("landing.contact.description")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm sm:flex-row" style={{ color: mixColor("--color-text-muted", 88) }}>
            <a
              href={`mailto:${t("landing.contact.email")}`}
              className="rounded-full border px-6 py-2.5 transition [background:var(--btn-bg)] hover:[background:var(--btn-bg-hover)]"
              style={{ ...contactLinkStyles, borderColor: "var(--btn-border)" }}
            >
              {t("landing.contact.email")}
            </a>
            <span className="hidden sm:inline" style={dividerStyles}>
              •
            </span>
            <p>{t("landing.contact.schedule")}</p>
          </div>
        </section>
      </main>

      <footer className="border-t py-8" style={footerStyles}>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs sm:flex-row" style={footerTextStyles}>
          <p>{t("landing.footer.copyright", { year: new Date().getFullYear() })}</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#" className="transition-colors hover:text-[color:var(--color-primary)]" style={footerLinkStyles}>
              {footerLinks.privacy}
            </a>
            <a href="#" className="transition-colors hover:text-[color:var(--color-primary)]" style={footerLinkStyles}>
              {footerLinks.terms}
            </a>
            <a href="#" className="transition-colors hover:text-[color:var(--color-primary)]" style={footerLinkStyles}>
              {footerLinks.support}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
