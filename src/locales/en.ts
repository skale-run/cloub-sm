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
    calendar: {
      title: "Integrated Team Calendar",
      description:
        "Switch between monthly, weekly, and daily perspectives to coordinate every training session and competition.",
      viewOptions: {
        month: "Month",
        week: "Week",
        day: "Day",
      },
      workload: {
        heading: "Workload snapshot",
        summary: {
          one: "{{count}} upcoming team commitment",
          other: "{{count}} upcoming team commitments",
        },
        description:
          "Track how training and competition time adds up across the selected focus filters.",
        metrics: {
          all: {
            label: "All events",
            sublabel: "Combined duration",
          },
          training: {
            label: "Training sessions",
            sublabel: "Active coaching time",
          },
          competition: {
            label: "Competition days",
            sublabel: "Travel & execution windows",
          },
        },
      },
      upcoming: {
        heading: "Next on the agenda",
        empty: "No visible events",
        fallback:
          "Adjust the focus filters to surface the next training session or competition on the shared schedule.",
        coach: "Lead coach: {{name}}",
        competitionDetails: "{{level}} meet · Check-in {{time}}",
      },
      filters: {
        heading: "Focus filters",
        title: "Highlight the moments that matter",
        description:
          "Toggle categories to focus on upcoming training preparation or competition execution.",
        status: {
          all: "Both categories are visible.",
          single:
            "Only one category is active—tap again to bring the full schedule back.",
          none: "No categories selected—turn one on to see the upcoming schedule.",
        },
      },
      categories: {
        training: {
          label: "Training Sessions",
          description:
            "Skill development, conditioning, and video review touchpoints.",
          shortLabel: "Training",
          badge: "Training Session",
        },
        competition: {
          label: "Competition Days",
          description:
            "Travel logistics, qualifying rounds, and championship meets.",
          shortLabel: "Competition",
          badge: "Competition Day",
        },
      },
      states: {
        noEventsFiltered:
          "No events match the current focus filters. Re-enable a category or adjust your selection to view the team schedule again.",
        noDaySelected: "No day selected",
        noScheduled: "No events scheduled",
        noScheduledDay: "No scheduled activity on this date.",
      },
      monthView: {
        eventsCount: {
          one: "{{count}} event",
          other: "{{count}} events",
        },
      },
      weekView: {
        weekLabel: "Week of {{start}}",
        scheduledEvents: {
          one: "{{count}} scheduled event",
          other: "{{count}} scheduled events",
        },
        today: "Today",
      },
      dayView: {
        headerDescription:
          "All training sessions and competition duties for this date.",
        eventCount: {
          one: "{{count}} event",
          other: "{{count}} events",
        },
        coachLabel: "Lead · {{name}}",
        checkIn: "Check-in {{time}}",
      },
      relativeDay: {
        inDays: {
          one: "In {{count}} day",
          other: "In {{count}} days",
        },
        tomorrow: "Tomorrow",
        today: "Today",
        yesterday: "Yesterday",
        daysAgo: {
          one: "{{count}} day ago",
          other: "{{count}} days ago",
        },
      },
      duration: {
        none: "0h",
        hours: {
          one: "{{count}}h",
          other: "{{count}}h",
        },
        minutes: {
          one: "{{count}}m",
          other: "{{count}}m",
        },
      },
      levels: {
        regional: "Regional",
        national: "National",
        international: "International",
      },
      events: {
        ts1: {
          title: "Explosive Strength & Plyometrics",
          location: "Arena Studio 2",
          coach: "Coach Amara Lewis",
        },
        ts2: {
          title: "Technical Drills & Recovery",
          location: "Track 1",
          coach: "Coach Hugo Martín",
        },
        ts3: {
          title: "Video Review & Strategy Lab",
          location: "HQ Briefing Room",
          coach: "Analyst Team",
        },
        cc1: {
          title: "Metropolitan Invitational",
          location: "New Crest Stadium",
        },
        cc2: {
          title: "Summer National Trials",
          location: "Capital City Arena",
        },
        cc3: {
          title: "Continental Grand Prix",
          location: "Lisbon Athletics Park",
        },
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
  },
} as const;
