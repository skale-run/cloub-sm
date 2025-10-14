export const en = {
  translation: {
    common: {
      languageSwitcher: {
        label: "Select language",
        languages: {
          en: "English",
          ar: "العربية",
        },
      },
      navigation: {
        open: "Open navigation",
        close: "Close navigation",
        collapse: "Collapse navigation",
        expand: "Expand navigation",
        primary: "Primary navigation",
      },
    },
    app: {
      pageTitles: {
        landing: "Welcome to Cloub",
        calendar: "Calendar overview",
        academicRecord: "Academic record",
        billing: "Billing",
        trainingAttendance: "Training attendance",
        coachEvaluation: "Coach evaluation",
        progressOverview: "Progress overview",
        performanceTracking: "Performance tracking",
        profile: "Profile",
        access: "Access management",
        overview: "Overview",
      },
      statusMessages: {
        completeRequired:
          "Please complete at least the full name and membership ID before saving.",
        saved: "Profile saved. QR code refreshed with the latest details.",
        reverted: "Draft reverted to the last saved profile.",
        cleared: "Profile draft cleared.",
        deleted: "Profile deleted. Create a new one to generate a QR code.",
      },
      defaults: {
        teamMember: "Team member",
      },
    },
    header: {
      aria: {
        toggleNavigation: {
          open: "Open navigation",
          close: "Close navigation",
        },
      },
    },
    sidebar: {
      brand: {
        name: "Wydad Taekwondo",
        label: "Dashboard",
      },
      sections: [
        {
          heading: "Calendar",
          items: [
            {
              to: "/calendar",
              label: "Season calendar",
              description: "Review meets and key sessions",
            },
          ],
        },
        {
          heading: "Information",
          items: [
            {
              to: "/academic-record",
              label: "Academic record",
              description: "Monitor course eligibility",
            },
            {
              to: "/billing",
              label: "Billing overview",
              description: "Track invoices & payments",
            },
            {
              to: "/training-attendance",
              label: "Training attendance",
              description: "See check-ins by week",
            },
          ],
        },
        {
          heading: "Evaluations",
          items: [
            {
              to: "/coach-evaluation",
              label: "Coach evaluation",
              description: "Latest staff feedback",
            },
            {
              to: "/progress-overview",
              label: "Progress insight",
              description: "Growth trends & alerts",
            },
          ],
        },
        {
          heading: "Performance tracking",
          items: [
            {
              to: "/performance-tracking",
              label: "Performance dashboard",
              description: "Technical milestones & load",
            },
          ],
        },
        {
          heading: "Profile & access",
          items: [
            {
              to: "/profile",
              label: "Athlete profile",
              description: "Manage member identity",
            },
            {
              to: "/access",
              label: "Digital access",
              description: "Share membership QR code",
            },
          ],
        },
      ],
      readinessHeading: "Today’s readiness",
      readinessHighlights: [
        { label: "Readiness", value: "82% · Primed" },
        { label: "Sleep score", value: "7h 10m" },
        { label: "Hydration", value: "On target" },
      ],
      memberSnapshot: {
        heading: "Member snapshot",
        memberCard: {
          label: "Member card",
          status: "Active",
          idLabel: "ID",
          roleLabel: "Role",
          squadLabel: "Squad",
        },
        details: {
          role: {
            label: "Role",
            fallback: "Assign a role",
          },
          squad: {
            label: "Squad",
            fallback: "Update squad to personalise drills",
          },
          membershipId: {
            label: "Membership ID",
            fallback: "Pending assignment",
          },
        },
        complete: "Profile complete — coaches can access the latest details.",
        nextUpdate: "Next update: {{field}}.",
        emptyState:
          "Save your athlete profile to unlock tailored navigation insights.",
      },
      seasonSummary: {
        line1: "Season 2025 · Wave 2 Squad",
        line2: "Next rest day: Sun, 20 Apr",
      },
    },
    landing: {
      badge: "Cloud-based sports management",
      heroTitle: "Simplify club operations and inspire every athlete",
      heroDescription:
        "Cloub empowers coaches, athletes, and administrators with a unified platform for scheduling, performance tracking, and real-time communication. Build stronger programs with insights that keep everyone aligned.",
      ctas: {
        primary: "Sign up",
        secondary: "Log in",
        tertiary: "Contact",
      },
      features: [
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
      ],
      experience: {
        title: "Deliver a world-class club experience",
        description:
          "Move beyond disconnected spreadsheets and embrace a modern workflow for the entire organization. Cloub streamlines registration, communication, and competitive analysis so you can focus on athlete development.",
        bullets: [
          "Personalized dashboards for coaches with drills, attendance trends, and athlete alerts in one place.",
          "Self-service athlete portal with training goals, academic checkpoints, and secure document storage.",
          "Automated billing and notifications reduce manual admin work and keep every family in the loop.",
        ],
        stats: {
          label: "Trusted by clubs",
          value: "12k+",
          description:
            "teams coordinate their seasons with Cloub to boost member satisfaction and reduce admin overhead.",
        },
      },
      contact: {
        title: "Talk with our team",
        description:
          "Ready to modernize your club? Share your goals and we’ll tailor a walkthrough that fits your season timeline.",
        email: "hello@cloub.co",
        schedule: "Schedule a discovery call: Mon–Fri · 9am–6pm PT",
      },
      footer: {
        copyright:
          "© {{year}} Cloub Sports Management. All rights reserved.",
        links: {
          privacy: "Privacy",
          terms: "Terms",
          support: "Support",
        },
      },
    },
    profile: {
      heading: {
        title: "My athlete profile",
        description:
          "Keep your credentials current to unlock personalised drills and access.",
        badge: "Manage & update",
      },
      photo: {
        title: "Profile photo",
        description: "Drag a clear headshot or browse to upload.",
        uploadedAlt: "Uploaded athlete portrait",
        uploaded: {
          hint: "Drop a new image or press enter to replace your photo.",
          note: "PNG or JPG up to 5MB.",
        },
        empty: {
          heading: "Drag & drop your athlete photo here",
          note: "PNG or JPG up to 5MB, or click to browse.",
        },
        errors: {
          invalidType: "Please upload an image file.",
          fileTooLarge: "Please choose an image smaller than {{size}}MB.",
        },
      },
      fields: {
        fullName: {
          label: "Full name",
          placeholder: "e.g. Lina Carter",
          readinessLabel: "the full name",
        },
        role: {
          label: "Role",
          placeholder: "Sprinter / Mid-distance",
          readinessLabel: "a role",
        },
        squad: {
          label: "Squad / Tier",
          placeholder: "Elite Performance Squad",
          readinessLabel: "a squad assignment",
        },
        email: {
          label: "Email",
          placeholder: "athlete@clubpulse.io",
          readinessLabel: "an email address",
        },
        emergencyContact: {
          label: "Emergency contact",
          placeholder: "Jordan Carter · +44 7700 000000",
          readinessLabel: "an emergency contact",
        },
        membershipId: {
          label: "Membership ID",
          placeholder: "CP-2025-184",
          helperText: "Used to verify entry and sync wearable data.",
          readinessLabel: "the membership ID",
        },
      },
      actions: {
        save: "Save profile",
        reset: "Reset draft",
        delete: "Delete profile",
        remove: "Remove",
        add: "Add",
      },
      readiness: {
        heading: "Profile readiness",
        completeDescription: "Every detail is in place.",
        incompleteDescription: "Complete the profile to unlock the full experience.",
        readyMessage: "You're ready to share this profile with coaches.",
        nextField: "Next up: add {{field}}.",
        remaining: "Add the remaining details to finish your profile.",
      },
      summary: {
        heading: "Membership snapshot",
        fallbackName: "Awaiting athlete details",
        membershipIdLabel: "Membership ID",
        membershipIdFallback: "Pending assignment",
        roleLabel: "Role",
        roleFallback: "Define your training focus",
        squadLabel: "Squad",
        squadFallback: "Assign a squad for tailored drills",
      },
      achievements: {
        heading: "Highlights & achievements",
        description: "Capture season wins to keep your motivation board updated.",
        placeholder: "Add new highlight",
        removeAria: "Remove highlight",
        empty: "No highlights yet. Start by celebrating a recent win.",
      },
    },
  },
} as const;
