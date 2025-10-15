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
        landing: "Welcome to Cloub Dojang",
        calendar: "Training & tournament calendar",
        academicRecord: "Academic record",
        billing: "Billing",
        trainingAttendance: "Dojang attendance",
        coachEvaluation: "Master evaluation",
        progressOverview: "Progress overview",
        performanceTracking: "Taekwondo performance tracking",
        profile: "Practitioner profile",
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
        teamMember: "Taekwondo practitioner",
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
        badge: "Taekwondo athlete portal",
        modes: {
          login: "Log in",
          register: "Register",
        },
        copy: {
          login: {
            heading: "Log in to your dojang HQ",
            description:
              "Step back into your Taekwondo command center and sync with today’s focus.",
            cta: "Sign in",
          },
          register: {
            heading: "Activate your Taekwondo passport",
            description:
              "Create your credentials to unlock tailored poomsae sessions and squad support.",
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
            "Forgot password? Contact your master or administrator to reset access.",
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
            "By creating an account you accept the dojang charter and consent to performance tracking.",
        },
        highlights: {
          heading: "Why athletes love it",
          items: {
            eliteTraining: {
              title: "Dojo training blueprints",
              description:
                "Unlock master-curated weekly sparring and poomsae blocks tailored to your belt journey.",
            },
            performanceIntelligence: {
              title: "Performance intelligence",
              description:
                "Track kick speed, recovery, and ring-readiness trends with adaptive insights.",
            },
            communityRecognition: {
              title: "Community recognition",
              description:
                "Share belt milestones, capture tournament badges, and climb the squad leaderboard.",
            },
            supportCrew: {
              title: "All-access support corner",
              description:
                "Coordinate with masters, physiotherapists, and mentors from a single hub.",
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
              description: "Review tournaments and key dojang sessions",
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
              description: "See dojang check-ins by week",
            },
          ],
        },
        {
          heading: "Evaluations",
          items: [
            {
              to: "/coach-evaluation",
              label: "Master evaluation",
              description: "Latest master feedback",
            },
            {
              to: "/progress-overview",
              label: "Progress insight",
              description: "Growth trends & belt alerts",
            },
          ],
        },
        {
          heading: "Performance tracking",
          items: [
            {
              to: "/performance-tracking",
              label: "Performance dashboard",
              description: "Technical milestones & sparring load",
            },
          ],
        },
        {
          heading: "Profile & access",
          items: [
            {
              to: "/profile",
              label: "Taekwondo profile",
              description: "Manage practitioner identity",
            },
            {
              to: "/access",
              label: "Dojang access",
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
        complete: "Profile complete — masters can access the latest details.",
        nextUpdate: "Next update: {{field}}.",
        emptyState:
          "Save your athlete profile to unlock tailored navigation insights.",
      },
      seasonSummary: {
        line1: "Season 2025 · Elite Dan Team",
        line2: "Next rest day: Sun, 20 Apr",
      },
    },
    calendar: {
      title: "Integrated Dojang Calendar",
      description:
        "Switch between monthly, weekly, and daily perspectives to coordinate every class, seminar, and tournament ring time.",
      viewOptions: {
        month: "Month",
        week: "Week",
        day: "Day",
      },
      workload: {
        heading: "Workload snapshot",
        summary_zero: "No upcoming squad commitments",
        summary_one: "{{count}} upcoming squad commitment",
        summary_other: "{{count}} upcoming squad commitments",
        description:
          "Track how training blocks and tournament time add up across the selected focus filters.",
        metrics: {
          all: {
            label: "All events",
            sublabel: "Combined duration",
          },
          training: {
            label: "Dojo sessions",
            sublabel: "Active mat time",
          },
          competition: {
            label: "Tournament days",
            sublabel: "Travel & ring windows",
          },
        },
      },
      upcoming: {
        heading: "Next on the agenda",
        empty: "No visible events",
        fallback:
          "Adjust the focus filters to surface the next class, grading, or tournament on the shared schedule.",
        coach: "Lead master: {{name}}",
        competitionDetails: "{{level}} tournament · Ring check-in at {{time}}",
      },
      filters: {
        heading: "Focus filters",
        title: "Highlight the moments that matter",
        description:
          "Toggle categories to focus on upcoming class preparation or tournament execution.",
        status: {
          all: "Both categories are visible.",
          single:
            "Only one category is active—tap again to bring the full schedule back.",
          none: "No categories selected—turn one on to see the upcoming schedule.",
        },
      },
      categories: {
        training: {
          label: "Dojo Sessions",
          description:
            "Technical poomsae, sparring drills, and conditioning touchpoints.",
          shortLabel: "Training",
          badge: "Dojo Session",
        },
        competition: {
          label: "Tournament Days",
          description:
            "Travel logistics, weigh-ins, and championship brackets.",
          shortLabel: "Tournament",
          badge: "Tournament Day",
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
          "All classes, seminars, and tournament duties for this date.",
        eventCount_zero: "No events",
        eventCount_one: "{{count}} event",
        eventCount_other: "{{count}} events",
        coachLabel: "Lead master · {{name}}",
        checkIn: "Ring check-in at {{time}}",
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
          title: "Explosive Kicking & Plyometrics",
          location: "Dojang Studio 2",
          coach: "Master Amara Lewis",
        },
        ts2: {
          title: "Technical Sparring & Mobility",
          location: "Main Dojang",
          coach: "Master Hugo Martín",
        },
        ts3: {
          title: "Video Review & Strategy Lab",
          location: "HQ Briefing Room",
          coach: "Analyst Team",
        },
        cc1: {
          title: "Metropolitan Taekwondo Open",
          location: "New Crest Arena",
        },
        cc2: {
          title: "Summer National Team Trials",
          location: "Capital City Pavilion",
        },
        cc3: {
          title: "Continental Grand Prix",
          location: "Lisbon Martial Arts Park",
        },
      },
    },
    training: {
      title: "Dojo Session Calendar",
      description: "Stay aligned with the squad and confirm your availability early.",
      weekLabel: "Week {{week}}",
      lead: "Lead · {{coach}}",
      confirmAvailability: "Confirm availability",
    },
    coachEvaluation: {
      heading: "Master evaluation",
      description: "Snapshot from the latest bi-weekly meeting with the coaching staff.",
      overallLabel: "Overall",
      focusLabel: "Focus for next review",
      addNote: "Add coach note",
      summary: {
        focusStatement: "Sharpen spinning heel kick accuracy ahead of national championships in May.",
        leadCoach: {
          label: "Head master",
          value: "Master Amara Lewis",
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
            title: "Poomsae precision",
            detail:
              "Accuracy up 4% after mirror drills · maintain 2x weekly pattern rehearsals.",
          },
          {
            title: "Ring rehearsal",
            detail:
              "Confidence high after mock tournament · pre-bout visualization dialed in.",
          },
        ],
      },
      watchList: {
        heading: "Watch closely",
        items: [
          {
            title: "Guard discipline",
            detail:
              "Guard drops during counter combos · integrate breathing reset cue between rounds.",
          },
          {
            title: "Recovery block",
            detail:
              "Sleep quality dipped on travel week · align physiotherapy flush with light technical day.",
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
            title: "Sparring timing review",
            owner: "Master Lewis",
            due: "Apr 26",
            status: "Scheduled",
          },
          {
            title: "Video breakdown: counter-kick mechanics",
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
            label: "Explosive kicking",
            score: 4.5,
            note: "Faster execution after plyo focus · maintain med-ball tosses",
          },
          {
            label: "Ring endurance",
            score: 4.2,
            note: "Hold form late in round three · add interval sparring",
          },
          {
            label: "Ring tactics",
            score: 4.0,
            note: "Continue video briefs · refine corner positioning",
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
          "Sustained improvement over the last four microcycles keeps the squad comfortably ahead of projected development. Maintain current class density, continue sleep tracking, and repeat readiness screening on Monday sessions.",
        focus: {
          label: "Focus next week",
          detail:
            "Refine spinning kick entries during Tuesday and Friday technical blocks.",
        },
      },
      momentumWatch: {
        heading: "Momentum watch",
        items: [
          {
            title: "Speed kicks",
            detail: "Maintain contrast pad sequencing 2x weekly.",
          },
          {
            title: "Strength block",
            detail: "Shift lower-body strength work to high velocity loads.",
          },
          {
            title: "Recovery",
            detail: "Protect Thursday as full regen + monitoring day.",
          },
        ],
      },
      coachAlerts: {
        heading: "Master alerts",
        items: [
          {
            title: "Combo timing",
            detail:
              "Average counter window improved by 0.3s · keep resisted pad block.",
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
      badge: "Cloud-based Taekwondo management",
      heroTitle: "Unify your dojang and empower every martial artist",
      heroDescription:
        "Cloub equips masters, practitioners, and coordinators with a unified hub for class scheduling, belt assessments, and tournament preparation. Strengthen your program with insights that keep every ring team aligned.",
      ctas: {
        primary: "Sign up",
        secondary: "Log in",
        tertiary: "Contact",
      },
      features: [
        {
          title: "Integrated class planning",
          description:
            "Organize poomsae, sparring, and conditioning blocks with automated reminders that keep every belt group informed.",
        },
        {
          title: "Performance intelligence",
          description:
            "Visualize practitioner progress with dashboards that combine attendance, technique scores, and evaluation insights.",
        },
        {
          title: "Secure access for all",
          description:
            "Role-based permissions give masters, athletes, and guardians the right visibility while protecting sensitive data.",
        },
      ],
      experience: {
        title: "Deliver a world-class dojang experience",
        description:
          "Leave behind disconnected spreadsheets and embrace a modern workflow for the entire dojang. Cloub streamlines registration, communication, and competitive analysis so you can focus on Taekwondo mastery.",
        bullets: [
          "Personalized dashboards for masters with drills, attendance trends, and practitioner alerts in one place.",
          "Self-service athlete portal with belt goals, testing checkpoints, and secure document storage.",
          "Automated billing and notifications reduce manual admin work and keep every family in the loop.",
        ],
        stats: {
          label: "Trusted by dojangs",
          value: "650+",
          description:
            "martial arts programs coordinate their seasons with Cloub to elevate training quality and reduce admin overhead.",
        },
      },
      contact: {
        title: "Talk with our team",
        description:
          "Ready to modernize your dojang? Share your goals and we’ll tailor a walkthrough that fits your belt-testing timeline.",
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
        title: "My Taekwondo profile",
        description:
          "Keep your credentials current to unlock personalised drills and access.",
        badge: "Manage & update",
      },
      photo: {
        title: "Profile photo",
        description: "Drag a clear headshot or browse to upload.",
        uploadedAlt: "Uploaded practitioner portrait",
        uploaded: {
          hint: "Drop a new image or press enter to replace your photo.",
          note: "PNG or JPG up to 5MB.",
        },
        empty: {
          heading: "Drag & drop your practitioner photo here",
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
          placeholder: "Fighter / Poomsae specialist",
          readinessLabel: "a role",
        },
        squad: {
          label: "Squad / Tier",
          placeholder: "Elite Dan Squad",
          readinessLabel: "a squad assignment",
        },
        email: {
          label: "Email",
          placeholder: "practitioner@dojang.io",
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
          helperText: "Used to verify belt tests and facility entry.",
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
        readyMessage: "You're ready to share this profile with masters.",
        nextField: "Next up: add {{field}}.",
        remaining: "Add the remaining details to finish your profile.",
      },
      summary: {
        heading: "Membership snapshot",
        fallbackName: "Awaiting practitioner details",
        membershipIdLabel: "Membership ID",
        membershipIdFallback: "Pending assignment",
        roleLabel: "Role",
        roleFallback: "Define your training focus",
        squadLabel: "Squad",
        squadFallback: "Assign a ring team for tailored drills",
      },
      achievements: {
        heading: "Highlights & achievements",
        description: "Capture belt tests and tournament wins to keep your motivation board updated.",
        placeholder: "Add new highlight",
        removeAria: "Remove highlight",
        empty: "No highlights yet. Start by celebrating a recent sparring or poomsae win.",
      },
    },
    access: {
      heading: {
        title: "Dojang access QR",
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
            ready: "Add it to your device wallet for ring-day entry.",
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
          "Keep screen brightness high for the scanners at the dojang entrance.",
          "Add your emergency contact for compliant competition accreditation.",
        ],
      },
      eventChecklist: {
        title: "Event day checklist",
        items: [
          "Arrive 15 minutes before your ring call time.",
          "Carry a physical ID and Kukkiwon card for manual verification when required.",
          "Ensure guardians have the latest pick-up instructions.",
        ],
      },
      qr: {
        alt: "Dojang access QR code",
      },
    },
    performanceTracking: {
      title: "Taekwondo performance tracking",
      description:
        "Draft dashboard for monitoring technical precision, dojang presence, and ring readiness.",
      technicalProgress: {
        title: "Technical progress",
        lastAudit: "Last audit · Apr 12",
        milestones: [
          {
            phase: "Poomsae",
            milestone: "Taegeuk 5 judged at 92% accuracy in internal review",
            status: "Verified during Apr 12 video analysis",
          },
          {
            phase: "Kyorugi",
            milestone: "Maintain three-point kicking combo under 10 seconds",
            status: "Needs second cue · schedule high-intensity sparring",
          },
        ],
      },
      attendance: {
        title: "Total dojo attendance",
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
          { label: "Sparring rounds", value: "118", trend: "+6% vs last block" },
          { label: "Video reviews", value: "16", trend: "Target: 20 reviews" },
          { label: "Explosive kick score", value: "Moderate", trend: "Maintain during taper" },
        ],
      },
      competitionResults: {
        title: "Competition results",
        subtitle: "Season highlights",
        placementFormat: "Placement · {{placement}}",
        items: [
          {
            event: "Metropolitan Taekwondo Open",
            result: "Senior -68kg · Final score 18–9",
            placing: "Gold",
          },
          {
            event: "State Team Trials",
            result: "Poomsae pair · Average 8.45",
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
          "Maintain the -80 kg class: target range 77.8 kg – 78.4 kg. Flag a nutrition review if weight drifts outside band for two consecutive weeks.",
      },
    },
    competitions: {
      heading: "Tournament Calendar",
      description:
        "Visualise your travel blocks and prepare your ring-day checklists.",
      badge: "Season Peak",
      checkIn: "Ring check-in at {{time}}",
      logistics: "Logistics",
      cta: "Ring briefing",
      levels: {
        Regional: "Regional",
        National: "National",
        International: "International",
      },
    },
  },
  information: {
    academic: {
      heading: "Academic record & planning",
      description:
        "Monitor credit progress, milestone evaluations, and advisor follow-ups in one place.",
      creditBadge: {
        label: "Credits this term",
        value: "{{current}} / {{target}} credits confirmed",
        helper: "On pace for graduation review",
      },
      creditLoad: {
        heading: "Credit load overview",
        caption:
          "{{current}} of {{target}} credits confirmed for this term",
        helper:
          "{{available}} elective credits remain to personalise your schedule.",
      },
      creditDistribution: {
        coreCurriculum: {
          label: "Core curriculum",
          value: "9 credits",
          context: "Major requirements in progress",
        },
        researchLabs: {
          label: "Research & labs",
          value: "6 credits",
          context: "Lab attendance verified with faculty",
        },
        electives: {
          label: "Electives",
          value: "3 credits",
          context: "Advisor approval submitted",
        },
      },
      programInsights: {
        heading: "Program insights",
      },
      summaryInsights: {
        currentGpa: {
          label: "Current GPA",
          value: "3.72",
          context: "Calculated across upper-division courses",
        },
        scholarshipStanding: {
          label: "Scholarship standing",
          value: "Maintained",
          context: "Renewal review scheduled for May 15",
        },
        graduationPlan: {
          label: "Graduation plan",
          value: "Spring 2026",
          context: "Capstone proposal approved",
        },
      },
      modules: {
        credits: "{{count}} credits",
        focusCheckpoint: "Focus checkpoint",
        progress: "{{percent}}% complete",
        nextEvaluationLabel: "Next milestone · {{date}}",
        capstoneResearchStudio: {
          title: "Capstone research studio",
          focus:
            "Compile findings with faculty feedback ahead of the final defence.",
          nextEvaluationDate: "May 10",
        },
        dataVisualizationLab: {
          title: "Data visualisation lab",
          focus:
            "Finalise dashboard deliverables and peer review results.",
          nextEvaluationDate: "Apr 28",
        },
        communityImpactSeminar: {
          title: "Community impact seminar",
          focus: "Submit reflective brief documenting service-learning outcomes.",
          nextEvaluationDate: "—",
        },
      },
      moduleStatuses: {
        onTrack: "On track",
        completed: "Completed",
        actionNeeded: "Action needed",
      },
      upcomingEvaluations: {
        heading: "Upcoming evaluations",
        helper: "Next 30 days",
        dateLabel: "Due {{date}}",
        capstonePresentation: {
          module: "Capstone research studio",
          type: "Faculty presentation",
          date: "May 10",
        },
        researchColloquium: {
          module: "Undergraduate research colloquium",
          type: "Poster submission",
          date: "Apr 28",
        },
        internshipReflection: {
          module: "Internship reflection",
          type: "Portfolio review",
          date: "May 30",
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
          financialAid: {
            label: "Confirm financial aid requirements",
            detail:
              "Documentation received — upload signed award letter to the portal.",
          },
          internshipPaperwork: {
            label: "Submit internship paperwork",
            detail:
              "Awaiting updated employer agreement from career services.",
          },
          advisorMeeting: {
            label: "Schedule advisor meeting",
            detail:
              "Coordinate degree-planning session ahead of autumn registration.",
          },
        },
      },
      advisor: {
        heading: "Advisor guidance",
        helper: "Last updated Apr 10",
        notes: {
          degreeAudit: {
            title: "Degree audit review",
            description:
              "Verify general education substitutions before submission.",
            action: "Upload documents",
          },
          researchFunding: {
            title: "Research funding follow-up",
            description:
              "Prepare summary for undergraduate research grant renewal.",
            action: "Share update",
          },
          careerMentorship: {
            title: "Career mentorship hours",
            description:
              "Log mentorship sessions to complete graduation requirement.",
          },
        },
      },
    },
    billing: {
      heading: "Billing overview",
      description:
        "Stay on top of dojang dues, travel levies, and service add-ons from a single taekwondo finance dashboard.",
      balanceBadge: {
        label: "Current balance",
        value: "{{amount}}",
      },
      summaryCards: {
        balance: {
          label: "Outstanding balance",
          value: "{{amount}}",
          helper: "WT Grand Prix travel support · due Apr 25, 2025",
        },
        autopay: {
          label: "Next auto-pay draft",
          value: "May 01, 2025",
          helper: "National team residency dues · scheduled monthly",
        },
        lastPayment: {
          label: "Last payment received",
          value: "{{amount}}",
          helper: "Elite sparring camp · Posted Mar 18, 2025",
        },
      },
      invoices: {
        heading: "Invoices",
        helper: "Statement history for the current taekwondo season.",
        download: "Download statement",
        sendReceipt: "Send receipt",
        pending: {
          label: "Pending invoices",
          count_one: "{{count}} due",
          count_other: "{{count}} due",
          total: "Totaling {{amount}} outstanding",
        },
        paid: {
          label: "Paid this season",
          total: "{{amount}} posted",
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
            label: "Spring dojang membership",
            dueDate: {
              apr252025: "Apr 25, 2025",
            },
          },
          strengthLabAccess: {
            label: "High-performance kicking lab access",
            dueDate: {
              mar182025: "Mar 18, 2025",
            },
          },
          travelContribution: {
            label: "World Taekwondo Grand Prix travel contribution",
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
          "No invoices match the selected filter. Try another status to review prior taekwondo statements.",
      },
      autoPay: {
        heading: "Auto-pay",
        helper: "Auto-pay is enabled for monthly taekwondo subscriptions.",
        manage: "Manage auto-pay",
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
          status: "Reserved for championship travel charges",
        },
      },
      upcomingCharges: {
        heading: "Upcoming charges",
        helper: "Scheduled across the championship season.",
        items: {
          physiotherapyBlock: {
            label: "Post-tournament physiotherapy block",
            date: {
              may082025: "May 08, 2025",
            },
          },
          facilityLevy: {
            label: "Electronic hogu maintenance levy",
            date: {
              jun122025: "Jun 12, 2025",
            },
          },
          summerTravelFund: {
            label: "International circuit travel fund",
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
        "Weekly overview of confirmed dojang check-ins and key staff notes.",
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
            highlight: "Missed morning sparring · travel delay",
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
          detail: "Master feedback and physio clearance trending up",
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
              "{{count}} practitioner is awaiting travel desk confirmation and ring assignment briefing.",
            detail_other:
              "{{count}} practitioners are awaiting travel desk confirmation and ring assignment briefings.",
            emphasis_one: "Send reminder before Thursday noon logistics call.",
            emphasis_other:
              "Send reminders before Thursday noon logistics call.",
          },
          medical: {
            label: "Coordinate medical reviews",
            detail_one:
              "{{count}} practitioner flagged for clearance needs an updated return timeline.",
            detail_other:
              "{{count}} practitioners flagged for clearance need updated return timelines.",
            emphasis_one:
              "Sync physio notes with masters before Friday block plan.",
            emphasis_other:
              "Sync physio notes with masters before Friday block plan.",
          },
        },
      },
      sessions: {
        ts1: {
          focus:
            "Reaction testing during pad rounds—assign check-in tablets near rings.",
          emphasis:
            "Wellness survey opens 30 minutes prior; capture RPE after each block.",
        },
        ts2: {
          focus:
            "Travel squad tune-up with individualized mobility protocols staged on arrival.",
          emphasis:
            "Ensure hydration scans are logged before main warm-up.",
        },
        ts3: {
          focus:
            "Film room breakdown with sparring pairings and leadership huddles.",
          emphasis:
            "Circulate remote check-in link for practitioners on modified plans.",
        },
      },
      teamStatus: {
        heading: "Team check-in status",
        helper: "Live roster availability",
      },
      statuses: {
        confirmed: {
          label: "Confirmed",
          count_one: "{{count}} practitioner confirmed",
          count_other: "{{count}} practitioners confirmed",
        },
        pending: {
          label: "Pending",
          count_one: "{{count}} practitioner pending",
          count_other: "{{count}} practitioners pending",
        },
        medicalHold: {
          label: "Medical hold",
          count_one: "{{count}} practitioner on medical hold",
          count_other: "{{count}} practitioners on medical hold",
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
          linaReyes: "Featherweight fighter",
          noahPetrov: "Lightweight fighter",
          aishaKato: "Poomsae specialist",
          jonahHill: "Heavyweight fighter",
        },
        notes: {
          linaReyes: "Checked in via mobile app · 18:05",
          noahPetrov: "Flight arrives 14:20 · needs remote warm-up brief",
          aishaKato: "Clearing return-to-kick test at Thursday physio",
          jonahHill: "Strength block moved to 07:30 with Hugo",
        },
      },
    },
  },
};
