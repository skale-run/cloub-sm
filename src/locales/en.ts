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
    auth: {
      modal: {
        aria: {
          close: "Close authentication modal",
          loginForm: "Log in form",
          registerForm: "Register form",
        },
        badge: "Athlete portal",
        modes: {
          login: "Log in",
          register: "Register",
        },
        copy: {
          login: {
            heading: "Log in to your athlete HQ",
            description:
              "Jump back into your performance cockpit and sync with today’s focus.",
            cta: "Sign in",
          },
          register: {
            heading: "Activate your athlete passport",
            description:
              "Create your credentials to unlock tailored sessions and squad support.",
            cta: "Create account",
          },
        },
        loginForm: {
          email: {
            label: "Email",
            placeholder: "you@club.com",
          },
          password: {
            label: "Password",
            placeholder: "••••••••",
          },
          forgotPassword:
            "Forgot password? Contact your coach to reset access.",
        },
        registerForm: {
          fullName: {
            label: "Full name",
            placeholder: "Jordan Adebayo",
          },
          email: {
            label: "Email",
            placeholder: "you@club.com",
          },
          password: {
            label: "Password",
            placeholder: "Create a secure passphrase",
          },
          disclaimer:
            "By creating an account you accept the athlete charter and consent to performance tracking.",
        },
        highlights: {
          heading: "Why athletes love it",
          items: {
            eliteTraining: {
              title: "Elite training blueprints",
              description:
                "Unlock coach-curated weekly blocks personalised to your season arc.",
            },
            performanceIntelligence: {
              title: "Performance intelligence",
              description:
                "Track velocity, recovery, and readiness trends with adaptive insights.",
            },
            communityRecognition: {
              title: "Community recognition",
              description:
                "Share milestones, capture badges, and climb the squad leaderboard.",
            },
            supportCrew: {
              title: "All-access support crew",
              description:
                "Coordinate with physio, nutrition, and mentors from a single hub.",
            },
          },
        },
        support: {
          heading: "Need help getting started?",
          intro: "Drop a note to",
          outro: "or chat with your coaching team in the squad channel.",
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
        summary_zero: "No upcoming team commitments",
        summary_one: "{{count}} upcoming team commitment",
        summary_other: "{{count}} upcoming team commitments",
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
        competitionDetails: "{{level}} meet · Check-in at {{time}}",
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
        eventsCount_zero: "No events",
        eventsCount_one: "{{count}} event",
        eventsCount_other: "{{count}} events",
      },
      weekView: {
        weekLabel: "Week of {{start}}",
        scheduledEvents_zero: "No scheduled events",
        scheduledEvents_one: "{{count}} scheduled event",
        scheduledEvents_other: "{{count}} scheduled events",
        today: "Today",
      },
      dayView: {
        headerDescription:
          "All training sessions and competition duties for this date.",
        eventCount_zero: "No events",
        eventCount_one: "{{count}} event",
        eventCount_other: "{{count}} events",
        coachLabel: "Lead · {{name}}",
        checkIn: "Check-in at {{time}}",
      },
      relativeDay: {
        inDays_one: "In {{count}} day",
        inDays_other: "In {{count}} days",
        tomorrow: "Tomorrow",
        today: "Today",
        yesterday: "Yesterday",
        daysAgo_one: "{{count}} day ago",
        daysAgo_other: "{{count}} days ago",
      },
      duration: {
        none: "0h",
        hours_one: "{{count}}h",
        hours_other: "{{count}}h",
        minutes_one: "{{count}}m",
        minutes_other: "{{count}}m",
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
    training: {
      title: "Training Session Calendar",
      description: "Stay aligned with the squad and confirm your availability early.",
      weekLabel: "Week {{week}}",
      lead: "Lead · {{coach}}",
      confirmAvailability: "Confirm availability",
    },
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
    progressOverview: {
      heading: "Progress insight",
      description:
        "Quarter-to-date progression towards the season performance targets.",
      statusChip: "Ahead of plan",
      summaryMetrics: [
        {
          label: "Quarter rating",
          value: "82",
          suffix: "/100",
          change: "+5.4",
          changeDescriptor: "vs. last quarter",
        },
        {
          label: "Target delta",
          value: "+3.1%",
          change: "Ahead",
          changeDescriptor: "of performance target",
        },
        {
          label: "Sessions completed",
          value: "47",
          change: "92%",
          changeDescriptor: "training adherence",
        },
        {
          label: "Recovery score",
          value: "86",
          suffix: "/100",
          change: "+6",
          changeDescriptor: "sleep efficiency",
        },
      ],
      performanceTrend: {
        heading: "Performance trend",
        subheading: "Season rating · updated weekly",
        chip: "Target markers show quarter goals",
        pointSummary: "{{performance}}% performance · {{target}}% target",
        points: [
          { label: "Jan", performance: 72, target: 70 },
          { label: "Feb", performance: 75, target: 72 },
          { label: "Mar", performance: 78, target: 75 },
          { label: "Apr", performance: 82, target: 78 },
        ],
        summary:
          "Sustained improvement over the last four microcycles keeps the squad comfortably ahead of projected development. Maintain current training density, continue sleep tracking, and repeat readiness screening on Monday sessions.",
        focus: {
          label: "Focus next week",
          detail:
            "Reinforce acceleration form during Tuesday and Friday technical blocks.",
        },
      },
      momentumWatch: {
        heading: "Momentum watch",
        items: [
          {
            title: "Speed work",
            detail: "Maintain contrast sprint sequencing 2x weekly.",
          },
          {
            title: "Strength block",
            detail: "Shift front squat emphasis to high velocity loads.",
          },
          {
            title: "Recovery",
            detail: "Protect Thursday as full regen + monitoring day.",
          },
        ],
      },
      coachAlerts: {
        heading: "Coach alerts",
        items: [
          {
            title: "Acceleration split",
            detail:
              "Average 30m time dropped by 0.11s · keep resisted sprint block.",
          },
          {
            title: "Strength progression",
            detail:
              "Back squat at 1.8x BW · maintain 3-week wave loading.",
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
    access: {
      heading: {
        title: "Club access QR",
        description:
          "Instantly retrieve your smart gate pass once your profile is saved.",
        badge: "Instant pass",
      },
      instructions: {
        showCode: "Show this code at the smart gate to enter the facility.",
        profileMissing: "Save your profile to generate a personalised QR code.",
        profileRequiredBadge: "Profile required",
        squadFallback: "Assign squad to personalise access",
      },
      readiness: {
        heading: "Access readiness",
        percentageLabel: "{{percentage}}% access readiness",
        percentageBadge: "{{percentage}}% ready",
        status: {
          setupRequired: "Setup required",
          ready: "Ready for entry",
          almost: "Almost ready",
        },
        checks: {
          profile: "Profile saved",
          membership: "Membership ID active",
          squad: "Squad assigned",
          contact: "Emergency contact recorded",
        },
        nextStepComplete: "All compliance checks are complete.",
        checkStatus: {
          ready: "Ready",
          pending: "Pending",
        },
      },
      quickActions: {
        heading: "Access management",
        download: {
          label: "Save offline pass",
          description: {
            ready: "Add it to your device wallet for match-day entry.",
            empty: "Save your profile to generate a downloadable pass.",
          },
        },
        share: {
          label: "Share with guardian",
          description: {
            ready: "Send a secure link to parents for pickup coordination.",
            empty: "Unlock sharing once your profile details are saved.",
          },
        },
        checklist: {
          label: "Safety compliance check",
          description: {
            ready: "Emergency contact on file — review before travel days.",
            empty: "Add an emergency contact to complete compliance.",
          },
        },
      },
      tips: {
        title: "Access tips",
        items: [
          "QR refreshes automatically every time you save your profile.",
          "Keep screen brightness high for the scanners at Gate B.",
          "Add your emergency contact for compliant access accreditation.",
        ],
      },
      eventChecklist: {
        title: "Event day checklist",
        items: [
          "Arrive 15 minutes before your allocated gate slot.",
          "Carry a physical ID for manual verification when required.",
          "Ensure guardians have the latest pick-up instructions.",
        ],
      },
      qr: {
        alt: "Club access QR code",
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
        totalSessionsLabel_one: "{{count}} session",
        totalSessionsLabel_other: "{{count}} sessions",
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
      },
    },
    competitions: {
      heading: "Competition Calendar",
      description:
        "Visualise your travel blocks and prepare your race-day checklists.",
      badge: "Season Peak",
      checkIn: "Check-in at {{time}}",
      logistics: "Logistics",
      cta: "Travel briefing",
      levels: {
        Regional: "Regional",
        National: "National",
        International: "International",
      },
    },
  },
  information: {
    academic: {
      heading: "Academic record",
      description:
        "Track your eligibility requirements alongside this semester's plan.",
      creditBadge: {
        label: "Credit progress",
        value: "{{current}} / {{target}} credits confirmed",
        helper: "Eligibility margin secure",
      },
      creditLoad: {
        heading: "Credit load snapshot",
        caption:
          "{{current}} of {{target}} target credits confirmed for this term",
        helper:
          "{{available}} optional credits still available to stay eligible.",
      },
      creditDistribution: {
        coreSciences: {
          label: "Core sciences",
          value: "9 credits",
          context: "Biomechanics and physiology blocks",
        },
        performanceLabs: {
          label: "Performance labs",
          value: "6 credits",
          context: "Weekly lab hours logged",
        },
        leadershipElectives: {
          label: "Leadership & electives",
          value: "3 credits",
          context: "Sport psych and mentoring",
        },
      },
      programInsights: {
        heading: "Program insights",
      },
      summaryInsights: {
        currentGpa: {
          label: "Current GPA",
          value: "3.82",
          context: "Up 0.12 this term",
        },
        scholarshipEligibility: {
          label: "Scholarship eligibility",
          value: "Secure",
          context: "Meets 3.5 GPA minimum",
        },
        graduationPath: {
          label: "Graduation path",
          value: "62 / 90 credits",
          context: "On schedule — two terms remaining",
        },
      },
      modules: {
        credits: "{{count}} credits",
        focusCheckpoint: "Focus checkpoint",
        progress: "{{percent}}% complete",
        nextEvaluationLabel: "Next evaluation · {{date}}",
        appliedSportsPsychology: {
          title: "Applied Sports Psychology",
          focus: "Mental conditioning project",
          nextEvaluationDate: "May 12",
        },
        advancedBiomechanicsLab: {
          title: "Advanced Biomechanics Lab",
          focus: "Video gait analysis and report",
          nextEvaluationDate: "Apr 28",
        },
        performanceNutritionStrategies: {
          title: "Performance Nutrition Strategies",
          focus: "Team fueling protocols delivered",
          nextEvaluationDate: "—",
        },
      },
      moduleStatuses: {
        onTrack: "On track",
        completed: "Completed",
        labReportDue: "Lab report due",
      },
      upcomingEvaluations: {
        heading: "Upcoming evaluations",
        helper: "Next 30 days",
        dateLabel: "Due {{date}}",
        appliedSportsPsychology: {
          module: "Applied Sports Psychology",
          type: "Midterm reflection",
          date: "May 12",
        },
        advancedBiomechanicsLab: {
          module: "Advanced Biomechanics Lab",
          type: "Lab report submission",
          date: "Apr 28",
        },
        performanceNutritionStrategies: {
          module: "Performance Nutrition Strategies",
          type: "Capstone workshop",
          date: "Jun 02",
        },
      },
      checklist: {
        heading: "Eligibility checklist",
        helper: "Synced automatically each day",
        statuses: {
          onTrack: "On track",
          reviewNeeded: "Review needed",
          scheduled: "Scheduled",
        },
        items: {
          ncaaMinimum: {
            label: "Maintain 12-credit NCAA minimum",
            detail: "18 credits secured with room for one elective add-on.",
          },
          labReport: {
            label: "Submit biomechanics lab report",
            detail:
              "Draft 60% complete — upload by Apr 28 to avoid penalty.",
          },
          advisingSession: {
            label: "Advising session with Coach Rivera",
            detail: "Career planning touchpoint confirmed for Apr 22.",
          },
        },
      },
      advisor: {
        heading: "Advisor guidance",
        helper: "Last synced Apr 10",
        notes: {
          capstoneIntegration: {
            title: "Capstone integration",
            description:
              "Tie performance nutrition deliverables into upcoming sport psychology reflection for a cohesive submission.",
            action: "Combine artifacts",
          },
          scholarshipRenewal: {
            title: "Scholarship renewal",
            description:
              "GPA comfortably above 3.5 threshold — submit renewal paperwork after final spring grades are posted.",
            action: "Prep documents",
          },
          leadershipHours: {
            title: "Leadership hours",
            description:
              "Log final two peer-mentoring sessions to close out leadership elective requirement before finals week.",
          },
        },
      },
    },
    billing: {
      heading: "Billing overview",
      description:
        "Monitor recurring fees, add-ons, and outstanding balances in one dashboard.",
      balanceBadge: {
        label: "Balance",
        value: "{{amount}}",
      },
      summaryCards: {
        balance: {
          label: "Outstanding balance",
          value: "{{amount}}",
          helper: "Due Apr 25, 2025",
        },
        autopay: {
          label: "Next auto-pay",
          value: "May 01, 2025",
          helper: "Spring membership dues",
        },
        lastPayment: {
          label: "Last payment received",
          value: "{{amount}}",
          helper: "Posted Mar 18, 2025",
        },
      },
      invoices: {
        heading: "Invoices",
        helper: "Statement history from the last 6 months",
        download: "Download statement",
        sendReceipt: "Send receipt",
        pending: {
          label: "Pending invoices",
          count_one: "{{count}} due",
          count_other: "{{count}} due",
          total: "{{amount}} outstanding",
        },
        paid: {
          label: "Paid this season",
          total: "{{amount}}",
          count_one: "Across {{count}} invoice",
          count_other: "Across {{count}} invoices",
        },
        filters: {
          label: "Filters",
          items: {
            all: "All",
            pending: "Pending",
            paid: "Paid",
          },
        },
        table: {
          invoice: "Invoice",
          dueDate: "Due date",
          amount: "Amount",
          status: "Status",
        },
        items: {
          springMembershipDues: {
            label: "Spring membership dues",
            dueDate: {
              apr252025: "Apr 25, 2025",
            },
          },
          strengthLabAccess: {
            label: "Strength lab access",
            dueDate: {
              mar182025: "Mar 18, 2025",
            },
          },
          travelContribution: {
            label: "Travel contribution · Indoor finals",
            dueDate: {
              feb022025: "Feb 02, 2025",
            },
          },
        },
        statuses: {
          pending: "Pending",
          paid: "Paid",
        },
        empty:
          "No invoices match the selected filter. Try another status to review previous statements.",
      },
      autoPay: {
        heading: "Auto-pay",
        helper: "Enabled for monthly subscriptions",
        manage: "Manage",
      },
      paymentMethods: {
        primaryCard: {
          label: "Primary payment method",
          detail: "Visa •••• 4298",
          expires: "Exp. 08/27",
          status: "Auto-pay enabled",
        },
        backupAccount: {
          label: "Backup payment method",
          detail: "Checking · First Peninsula Bank",
          status: "Used for overdue balances",
        },
      },
      upcomingCharges: {
        heading: "Upcoming charges",
        helper: "Automatically scheduled through the season",
        items: {
          physiotherapyBlock: {
            label: "Team physiotherapy block",
            date: {
              may082025: "May 08, 2025",
            },
          },
          facilityLevy: {
            label: "Facility upgrade levy",
            date: {
              jun122025: "Jun 12, 2025",
            },
          },
          summerTravelFund: {
            label: "Summer travel fund",
            date: {
              jul012025: "Jul 01, 2025",
            },
          },
        },
      },
    },
    trainingAttendance: {
      heading: "Training attendance",
      description:
        "Weekly overview of confirmed check-ins and key staff notes.",
      seasonRate: {
        label: "Season rate",
        value: "{{percent}}%",
      },
      rateDelta: "{{value}}% vs last block",
      byWeek: {
        heading: "Attendance by week",
        summary: "Attended {{attended}} of {{planned}} sessions",
        peak: "Top week: {{label}} · {{highlight}}",
        focus: "Focus week: {{label}} · {{highlight}}",
        weeklyAttendance: "{{percent}}% attendance",
        sessions: "{{attended}} of {{planned}} sessions · {{highlight}}",
        items: {
          week14: {
            label: "Week 14",
            highlight: "Perfect attendance",
          },
          week15: {
            label: "Week 15",
            highlight: "Missed strength lift · travel delay",
          },
          week16: {
            label: "Week 16",
            highlight: "Recovery block · cleared by physio",
          },
        },
      },
      insights: {
        consistencyStreak: {
          label: "Consistency streak",
          value: "6 sessions",
          detail: "Zero misses since Apr 2 · new personal best",
        },
        availabilityForms: {
          label: "Availability forms",
          value: "3 pending",
          detail: "Travel squad confirmations required before Friday",
        },
        readinessIndex: {
          label: "Readiness index",
          value: "92%",
          detail: "Coach feedback and physio clearance trending up",
        },
      },
      upcoming: {
        heading: "Upcoming check-ins",
      },
      followUp: {
        heading: "Follow-up actions",
        helper: "Check-in priorities this week",
        actions: {
          pending: {
            label: "Confirm travel arrivals",
            detail_one:
              "{{count}} athlete is awaiting travel desk confirmation and location briefing.",
            detail_other:
              "{{count}} athletes are awaiting travel desk confirmation and location briefings.",
            emphasis_one: "Send reminder before Thursday noon logistics call.",
            emphasis_other:
              "Send reminders before Thursday noon logistics call.",
          },
          medical: {
            label: "Coordinate medical reviews",
            detail_one:
              "{{count}} athlete flagged for clearance needs an updated return timeline.",
            detail_other:
              "{{count}} athletes flagged for clearance need updated return timelines.",
            emphasis_one:
              "Sync physio notes with coaching staff before Friday block plan.",
            emphasis_other:
              "Sync physio notes with coaching staff before Friday block plan.",
          },
        },
      },
      sessions: {
        ts1: {
          focus:
            "Velocity testing during strength sets—assign check-in tablets near racks.",
          emphasis:
            "Wellness survey opens 30 minutes prior; capture RPE after each block.",
        },
        ts2: {
          focus:
            "Travel squad tune-up with individual mobility protocols staged on arrival.",
          emphasis:
            "Ensure hydration scans are logged before main warm-up lap.",
        },
        ts3: {
          focus:
            "Film room breakdown with positional pairings and leadership huddles.",
          emphasis:
            "Circulate remote check-in link for athletes on modified plans.",
        },
      },
      teamStatus: {
        heading: "Team check-in status",
        helper: "Live roster availability",
      },
      statuses: {
        confirmed: {
          label: "Confirmed",
          count_one: "{{count}} athlete confirmed",
          count_other: "{{count}} athletes confirmed",
        },
        pending: {
          label: "Pending",
          count_one: "{{count}} athlete pending",
          count_other: "{{count}} athletes pending",
        },
        medicalHold: {
          label: "Medical hold",
          count_one: "{{count}} athlete on medical hold",
          count_other: "{{count}} athletes on medical hold",
        },
        percent: "{{percent}}% of roster",
      },
      roster: {
        names: {
          linaReyes: "Lina Reyes",
          noahPetrov: "Noah Petrov",
          aishaKato: "Aisha Kato",
          jonahHill: "Jonah Hill",
        },
        roles: {
          linaReyes: "400m hurdles",
          noahPetrov: "800m",
          aishaKato: "Relay anchor",
          jonahHill: "Shot put",
        },
        notes: {
          linaReyes: "Checked in via mobile app · 18:05",
          noahPetrov: "Flight arrives 14:20 · needs remote warm-up brief",
          aishaKato: "Clearing return-to-sprint test at Thursday physio",
          jonahHill: "Strength block moved to 07:30 with Hugo",
        },
      },
    },
  },
};
