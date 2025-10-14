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
    training: {
      title: "Training Session Calendar",
      description: "Stay aligned with the squad and confirm your availability early.",
      weekLabel: "Week {{week}}",
      lead: "Lead · {{coach}}",
      confirmAvailability: "Confirm availability",
    coachEvaluation: {
      heading: "Coach evaluation",
      description: "Snapshot from the latest bi-weekly meeting with the coaching staff.",
      overallLabel: "Overall",
      focusLabel: "Focus for next review",
      addNote: "Add coach note",
      summary: {
        focusStatement: "Sharpen top-end speed for national trials in May.",
        leadCoach: {
          label: "Lead coach",
          value: "Coach Amara Lewis",
        },
        lastReview: {
          label: "Last review",
          value: "Apr 18, 2024",
        },
        nextTouchpoint: {
          label: "Next touchpoint",
          value: "May 2, 2024",
        },
        momentum: {
          label: "Momentum",
          value: "Positive trend",
        },
      },
      highlightWins: {
        heading: "Momentum drivers",
        items: [
          {
            title: "Block work clicking",
            detail:
              "Explosive phase is cleaner after contrast sprints · keep 2x weekly rhythm drills.",
          },
          {
            title: "Race rehearsal",
            detail:
              "Confidence high following indoor meet simulation · pre-race routine locked in.",
          },
        ],
      },
      watchList: {
        heading: "Watch closely",
        items: [
          {
            title: "Late-race relaxation",
            detail:
              "Neck and jaw tension returning under fatigue · integrate breathing reset cue.",
          },
          {
            title: "Regeneration block",
            detail:
              "Sleep quality dipped on travel week · align physio flush with light tempo day.",
          },
        ],
      },
      accountability: {
        heading: "Accountability board",
        updatedLabel: "Updated weekly",
        ownerPrefix: "Owner · {{owner}}",
        dueLabel: "Due {{date}}",
        items: [
          {
            title: "30m fly timing",
            owner: "Coach Lewis",
            due: "Apr 26",
            status: "Scheduled",
          },
          {
            title: "Sprint mechanics video review",
            owner: "Athlete",
            due: "Apr 24",
            status: "In progress",
          },
          {
            title: "Hydration tracker check-in",
            owner: "Performance staff",
            due: "Weekly",
            status: "On track",
          },
        ],
      },
      competencySnapshot: {
        heading: "Competency snapshot",
        scores: [
          {
            label: "Explosive starts",
            score: 4.5,
            note: "Improved block exit · maintain shin angle drills",
          },
          {
            label: "Speed endurance",
            score: 4.2,
            note: "Hold form in final 60m · add resisted runs",
          },
          {
            label: "Race tactics",
            score: 4.0,
            note: "Continue video briefs · refine lane positioning",
          },
          {
            label: "Recovery habits",
            score: 3.8,
            note: "Consistency improving · log hydration daily",
          },
        ],
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
    performanceTracking: {
      title: "Performance tracking",
      description:
        "Draft dashboard for monitoring technical progress, presence milestones and competitive readiness.",
      technicalProgress: {
        title: "Technical progress",
        lastAudit: "Last audit · Apr 12",
        milestones: [
          {
            phase: "Block phase",
            milestone: "Shin angles within 45° for first three steps",
            status: "Verified on Apr 12 video review",
          },
          {
            phase: "Acceleration",
            milestone: "Maintain horizontal force through 30m mark",
            status: "Needs second cue · schedule sled sprints",
          },
        ],
      },
      attendance: {
        title: "Total attendance",
        totalSessionsLabel: "{{count}} sessions",
        summary: {
          totalSessions: 46,
          attended: 42,
          excused: 3,
          unexcused: 1,
        },
        labels: {
          attended: "Attended",
          excused: "Excused",
          unexcused: "Unexcused",
        },
      },
      trainingStatistics: {
        title: "Training statistics",
        subtitle: "Block summary",
        items: [
          { label: "Total hours", value: "118h", trend: "+6% vs last block" },
          { label: "Sessions logged", value: "64", trend: "Target: 72 sessions" },
          { label: "Load score", value: "Moderate", trend: "Maintain during taper" },
        ],
      },
      competitionResults: {
        title: "Competition results",
        subtitle: "Season highlights",
        placementFormat: "Placement · {{placement}}",
        items: [
          {
            event: "Metropolitan Invitational",
            result: "400m · 49.20s",
            placing: "Bronze",
          },
          {
            event: "State Indoor Championships",
            result: "200m · 21.80s",
            placing: "Finalist",
          },
        ],
      },
      weightTracking: {
        title: "Body weight log",
        subtitle: "Weekly check-ins",
        entries: [
          { label: "Week 13", weight: "78.4 kg" },
          { label: "Week 14", weight: "78.1 kg" },
          { label: "Week 15", weight: "77.9 kg" },
          { label: "Week 16", weight: "78.0 kg" },
        ],
        rangeNote:
          "Range target 77.8 kg – 78.4 kg. Flag a nutrition review if weight drifts outside band for two consecutive weeks.",
    competitions: {
      heading: "Competition Calendar",
      description:
        "Visualise your travel blocks and prepare your race-day checklists.",
      badge: "Season Peak",
      checkIn: "Check-in {{time}}",
      logistics: "Logistics",
      cta: "Travel briefing",
      levels: {
        Regional: "Regional",
        National: "National",
        International: "International",
      },
    },
  },
} as const;
