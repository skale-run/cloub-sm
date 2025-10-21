export const en = {
  translation: {
    common: {
      languageSwitcher: {
        label: "Select language",
        languages: {
          en: "English",
          ar: "العربية",
          fr: "French",
        },
      },
      badges: {
        soon: "Soon",
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
        calendar: "Training & tournament calendar",
        academicRecord: "Academic record",
        billing: "Billing",
        trainingAttendance: "Dojang attendance",
        coachEvaluation: "Master evaluation",
        progressOverview: "Progress overview",
        performanceTracking: "Taekwondo performance tracking",
        profile: "Practitioner profile",
        guardianPortal: "Parent & guardian portal",
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
        saveError:
          "Couldn't update the profile. Check your connection and try again.",
        deleteError:
          "We couldn't remove the profile right now. Please try again shortly.",
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
        avatarNavigation: {
          profile: "Go to your profile",
          access: "Go to access management",
        },
      },
      menu: {
        label: "Account options",
        profile: "Complete your profile",
        profileDescription: "Finish your details to unlock full access.",
        access: "Manage access",
        accessDescription: "Update QR codes and share credentials.",
        logout: "Log out",
        logoutDescription: "Sign out of the dashboard.",
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
            heading: "Sign in to your dojang HQ",
            description:
              "Return to your Taekwondo command center and sync with today’s focus.",
            cta: "Sign in",
          },
          register: {
            heading: "Activate your Taekwondo passport",
            description:
              "Create your account to unlock tailored poomsae sessions and squad support.",
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
          profilePhoto: {
            label: "Profile photo",
            dropLabel: "Drag & drop your practitioner photo here",
            helpText: "PNG or JPG up to 5MB, or click to browse.",
            uploadButton: "Upload photo",
            changeButton: "Change photo",
            removeButton: "Remove photo",
            previewAlt: "Selected profile photo preview",
          },
          fullName: {
            label: "Full name",
            placeholder: "Jordan Adebayo",
          },
          role: {
            label: "Role",
            placeholder: "Athlete",
          },
          squad: {
            label: "Squad / Tier",
            placeholder: "Elite sparring squad",
          },
          email: {
            label: "Email",
            placeholder: "you@club.com",
          },
          emergencyContact: {
            label: "Emergency contact",
            placeholder: "+212 676 005 071",
          },
          membershipId: {
            label: "Membership ID",
            placeholder: "CP-E43-K4",
          },
          password: {
            label: "Password",
            placeholder: "Create a secure passphrase",
          },
          disclaimer:
            "By creating an account you accept the dojang charter and consent to performance tracking.",
        },
        highlights: {
          heading: "Why athletes love the hub",
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
          intro: "Send a note to",
          outro: "or chat with your coaching team in the squad channel.",
        },
        status: {
          network:
            "We couldn't reach the server. Please try again in a moment.",
          generic: "Something went wrong. Please try again.",
          login: {
            success: "Welcome back! You're signed in.",
            invalid:
              "We couldn't find an account with that email and password.",
          },
          register: {
            success:
              "Account created. You can sign in with your new credentials.",
            duplicate: "An account with that email already exists.",
          },
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
              description: "Track invoices and payments",
              status: "soon",
            },
            {
              to: "/training-attendance",
              label: "Training attendance",
              description: "See dojang check-ins by week",
            },
            {
              to: "/guardian-portal",
              label: "Guardian portal",
              description: "Family view across attendance, billing, and events",
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
              description: "Growth trends and belt alerts",
            },
          ],
        },
        {
          heading: "Performance tracking",
          items: [
            {
              to: "/performance-tracking",
              label: "Performance dashboard",
              description: "Technical milestones and sparring load",
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
      seasonSummary: {
        line1: "Season 2025 · Elite Dan Team",
        line2: "Next rest day: Sun, 20 Apr",
      },
      logout: {
        label: "Log out",
        description: "Return to the athlete portal sign-in screen.",
        ariaLabel: "Log out of the athlete portal",
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
      actions: {
        addEvent: "New event",
        editEvent: "Edit event",
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
            sublabel: "Travel and ring windows",
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
        loading: "Loading the latest schedule...",
        loadFailed: "We couldn't refresh the schedule. Showing cached events.",
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
        previous: "Previous month",
        next: "Next month",
        previousShort: "Prev",
        nextShort: "Next",
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
      eventModal: {
        aria: {
          close: "Close event details",
        },
        occursOn: "{{date}} · {{relative}}",
        occursOnWithoutRelative: "{{date}}",
        schedule: {
          heading: "Schedule",
          start: "Starts",
          end: "Ends",
          duration: "Duration",
        },
        details: {
          heading: "Details",
          location: "Location",
          coach: "Lead master",
          level: "Tournament level",
          checkInLabel: "Ring check-in",
          checkInValue: "Check-in at {{time}}",
        },
      },
      eventForm: {
        aria: {
          close: "Close event form",
        },
        createTitle: "Create new event",
        createDescription:
          "Capture the key details for a new training session or tournament appearance.",
        editTitle: "Edit event",
        editDescription:
          "Update the schedule information for this calendar entry.",
        fields: {
          title: "Event title",
          start: "Starts",
          end: "Ends",
          location: "Location",
          category: "Category",
          eventType: "Event type",
          coach: "Lead coach",
          level: "Competition level",
          checkIn: "Check-in",
        },
        actions: {
          cancel: "Cancel",
          createEvent: "Create event",
          saveChanges: "Save changes",
        },
        status: {
          missingTitle: "Please add a title for the event.",
          missingLocation: "Enter where the event will take place.",
          invalidDates: "Start and end times must be valid dates.",
          invalidRange: "The end time needs to be after the start time.",
          missingCoach: "Training events need a coach or lead assigned.",
          missingCheckIn: "Competition events need a check-in time.",
          requestError:
            "We couldn't save the event. Check your connection and try again.",
        },
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
      eventTypes: {
        training: "Training session",
        competition: "Competition",
        meet: "Meet & greet",
        other: "Other",
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
      description:
        "Stay aligned with the squad and confirm your availability early.",
      weekLabel: "Week {{week}}",
      lead: "Lead · {{coach}}",
      confirmAvailability: "Confirm availability",
    },
    coachEvaluation: {
      heading: "Master evaluation",
      description:
        "Snapshot from the latest bi-weekly meeting with the coaching staff.",
      overallLabel: "Overall",
      focusLabel: "Focus for next review",
      addNote: "Add coach note",
      summary: {
        focusStatement:
          "Sharpen spinning heel kick accuracy ahead of national championships in May.",
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
      commitsModal: {
        trigger: {
          label: "Commits & PRs",
          helper: "Review repository activity and release readiness.",
        },
        title: "Commits & PRs activity",
        subtitle: "Sprint 24 · dojo operations dash",
        metadata: [
          { label: "Repository", value: "dojo-hq/dash" },
          { label: "Default branch", value: "main" },
          { label: "Synced", value: "Updated 8 minutes ago" },
        ],
        tabs: {
          changes: "Changes",
          overview: "Overview",
          heatmap: "Heatmap",
        },
        changes: {
          heading: "Latest shipped work",
          helper:
            "Merged pull requests and direct commits from the last 72 hours.",
          items: [
            {
              id: "pr-421",
              kind: "pullRequest",
              badge: "Merged",
              badgeTone: "success",
              title:
                "Bring match-readiness heatmap into the dashboard modal",
              description:
                "Connected the dojo attendance feed to the new analysis modal and aligned the overview metrics.",
              author: "Jordan Adebayo",
              timestamp: "Merged 2 hours ago",
              identifier: "PR #421",
              stats: [
                { label: "Commits", value: "4" },
                { label: "Files", value: "7" },
                { label: "Reviews", value: "2" },
              ],
              reviewersLabel: "Reviewers",
              reviewers: ["Master Amara Lewis", "Coach Hanae Idrissi"],
              tags: ["UX polish", "Analytics"],
            },
            {
              id: "commit-8794",
              kind: "commit",
              badge: "Commit",
              badgeTone: "neutral",
              title: "Calibrate velocity charts for fractional rounds",
              description:
                "Normalised sparring cycle calculations and smoothed the session delta display for the overview tab.",
              author: "Noor El Fassi",
              timestamp: "Pushed 5 hours ago",
              identifier: "c8794ab",
              stats: [
                { label: "Lines", value: "+186 / -42" },
                { label: "Scope", value: "performance-overview" },
              ],
              reviewersLabel: "Touched modules",
              reviewers: [
                "analytics/useVelocityTrend.ts",
                "components/TrendSparkline.tsx",
              ],
              tags: ["Data"],
            },
            {
              id: "pr-420",
              kind: "pullRequest",
              badge: "In review",
              badgeTone: "warning",
              title: "Surface commit health in the operations modal",
              description:
                "Adds repository summary tiles and integrates release readiness signals for the heatmap tab.",
              author: "Lina Serrano",
              timestamp: "Waiting on review",
              identifier: "PR #420",
              stats: [
                { label: "Commits", value: "3" },
                { label: "Checks", value: "All green" },
                { label: "ETA", value: "Review due 18:00" },
              ],
              reviewersLabel: "Requested",
              reviewers: ["Coach Idris", "Master Chen"],
              tags: ["Modal", "Release"],
            },
          ],
          pipeline: {
            heading: "Delivery checks",
            items: [
              { label: "CI · dojo-hq/dash", status: "Pass · 12m ago" },
              { label: "Preview deploy", status: "Pass · 18m ago" },
              { label: "Bundle size guard", status: "+1.2% vs baseline" },
            ],
          },
        },
        overview: {
          heading: "Activity overview",
          helper: "Sprint 24 velocity snapshots.",
          summary: [
            { label: "Commits merged", value: "36", helper: "+8 vs last sprint" },
            { label: "PRs merged", value: "12", helper: "Median cycle 21h" },
            {
              label: "Review turnaround",
              value: "3.6h",
              helper: "-1.1h vs last sprint",
            },
            {
              label: "Deployment cadence",
              value: "Daily",
              helper: "4 production releases",
            },
          ],
          quality: {
            heading: "Quality signals",
            items: [
              {
                label: "Test pass rate",
                value: "98%",
                helper: "211 checks across 12 pipelines",
              },
              {
                label: "Rollback alerts",
                value: "0",
                helper: "No regression flags in the last 2 weeks",
              },
              {
                label: "Accessibility score",
                value: "96",
                helper: "Lighthouse average for new surfaces",
              },
            ],
          },
          highlights: {
            heading: "Highlights",
            items: [
              {
                title: "Release guard tightened",
                detail:
                  "Production deploys now wait for modal smoke tests plus analytics sample validations.",
              },
              {
                title: "Faster reviewer routing",
                detail:
                  "Auto-assign now pairs dojo analytics PRs with the roster covering timezone gaps.",
              },
            ],
          },
        },
        heatmap: {
          heading: "Contribution heatmap",
          helper: "Commits, reviews, and merges over the last five weeks.",
          legend: {
            none: "No activity",
            low: "Light",
            medium: "Active",
            high: "Intense",
          },
          weeks: [
            {
              label: "Week 20",
              days: [
                { label: "Mon", tooltip: "4 updates", intensity: "medium" },
                { label: "Tue", tooltip: "6 updates", intensity: "medium" },
                { label: "Wed", tooltip: "10 updates", intensity: "high" },
                { label: "Thu", tooltip: "7 updates", intensity: "medium" },
                { label: "Fri", tooltip: "3 updates", intensity: "low" },
                { label: "Sat", tooltip: "1 update", intensity: "low" },
                { label: "Sun", tooltip: "0 updates", intensity: "none" },
              ],
            },
            {
              label: "Week 19",
              days: [
                { label: "Mon", tooltip: "2 updates", intensity: "low" },
                { label: "Tue", tooltip: "5 updates", intensity: "medium" },
                { label: "Wed", tooltip: "7 updates", intensity: "medium" },
                { label: "Thu", tooltip: "4 updates", intensity: "medium" },
                { label: "Fri", tooltip: "5 updates", intensity: "medium" },
                { label: "Sat", tooltip: "2 updates", intensity: "low" },
                { label: "Sun", tooltip: "1 update", intensity: "low" },
              ],
            },
            {
              label: "Week 18",
              days: [
                { label: "Mon", tooltip: "1 update", intensity: "low" },
                { label: "Tue", tooltip: "3 updates", intensity: "low" },
                { label: "Wed", tooltip: "5 updates", intensity: "medium" },
                { label: "Thu", tooltip: "2 updates", intensity: "low" },
                { label: "Fri", tooltip: "4 updates", intensity: "medium" },
                { label: "Sat", tooltip: "0 updates", intensity: "none" },
                { label: "Sun", tooltip: "0 updates", intensity: "none" },
              ],
            },
            {
              label: "Week 17",
              days: [
                { label: "Mon", tooltip: "3 updates", intensity: "low" },
                { label: "Tue", tooltip: "4 updates", intensity: "medium" },
                { label: "Wed", tooltip: "6 updates", intensity: "medium" },
                { label: "Thu", tooltip: "5 updates", intensity: "medium" },
                { label: "Fri", tooltip: "2 updates", intensity: "low" },
                { label: "Sat", tooltip: "1 update", intensity: "low" },
                { label: "Sun", tooltip: "0 updates", intensity: "none" },
              ],
            },
            {
              label: "Week 16",
              days: [
                { label: "Mon", tooltip: "2 updates", intensity: "low" },
                { label: "Tue", tooltip: "2 updates", intensity: "low" },
                { label: "Wed", tooltip: "3 updates", intensity: "low" },
                { label: "Thu", tooltip: "4 updates", intensity: "medium" },
                { label: "Fri", tooltip: "3 updates", intensity: "low" },
                { label: "Sat", tooltip: "0 updates", intensity: "none" },
                { label: "Sun", tooltip: "0 updates", intensity: "none" },
              ],
            },
          ],
          callouts: {
            heading: "Callouts",
            items: [
              { label: "Peak day", value: "Week 20 · Wed" },
              { label: "Quiet streak", value: "Week 18 · Sat–Sun" },
            ],
          },
          footnote:
            "Updated 8 minutes ago. Heatmap includes commits, reviews, and merges.",
        },
      },
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
            detail: "Back squat at 1.8x BW · maintain 3-week wave loading.",
          },
        ],
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
        incompleteDescription:
          "Complete the profile to unlock the full experience.",
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
        description:
          "Capture belt tests and tournament wins to keep your motivation board updated.",
        placeholder: "Add new highlight",
        removeAria: "Remove highlight",
        empty:
          "No highlights yet. Start by celebrating a recent sparring or poomsae win.",
        newLabel: "Badge highlight",
        categoryLabel: "Badge category",
        filters: {
          all: "All badges",
          tournament: "Tournaments",
          leadership: "Leadership",
          communityService: "Community service",
          discipline: "Discipline",
        },
        categories: {
          tournament: {
            label: "Tournament badge",
            description:
              "Celebrate competition performances and podium finishes.",
          },
          leadership: {
            label: "Leadership badge",
            description:
              "Spotlight the times you guided younger belts or led warm-ups.",
          },
          communityService: {
            label: "Community service badge",
            description:
              "Document volunteer work and outreach that lifted up the wider community.",
          },
          discipline: {
            label: "Discipline badge",
            description:
              "Recognise streaks of focus, self-control, and relentless practice.",
          },
        },
        badgeWall: {
          title: "Dojo badge wall",
          subtitle:
            "Filter by track to relive every milestone you’ve unlocked.",
          countLabel: "{{count}} dojo badge",
          countLabel_plural: "{{count}} dojo badges",
          empty:
            "No badges yet. Add your first highlight to energise the wall.",
          filterEmpty:
            "No badges in this track yet. Add one to represent your journey.",
        },
        status: {
          verified: "Verified badge",
          pending: "Awaiting verification",
        },
        submission: {
          prompt:
            "Share a story or photo so the masters can verify your badge.",
          cta: "Submit story or photo",
          confirmation:
            "Thanks! Coaches will review your submission and mark the badge once confirmed.",
        },
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
      permissions: {
        heading: "Granular permissions",
        description:
          "Review how responsibilities and controls shift for each role.",
        roleColumn: "Role access",
        capabilityLabels: {
          communications: "Communications",
          attendance: "Attendance",
          evaluations: "Evaluations",
          billing: "Billing",
          documents: "Documents",
        },
        legend: {
          full: "Full control",
          manage: "Manage",
          edit: "Edit",
          view: "View only",
          restricted: "No access",
        },
        matrix: [
          {
            id: "master",
            role: "Master instructor",
            permissions: {
              communications: "full",
              attendance: "manage",
              evaluations: "full",
              billing: "manage",
              documents: "full",
            },
          },
          {
            id: "coach",
            role: "Assistant coach",
            permissions: {
              communications: "manage",
              attendance: "edit",
              evaluations: "manage",
              billing: "restricted",
              documents: "view",
            },
          },
          {
            id: "frontdesk",
            role: "Front-desk admin",
            permissions: {
              communications: "manage",
              attendance: "view",
              evaluations: "view",
              billing: "manage",
              documents: "manage",
            },
          },
          {
            id: "parent",
            role: "Parent / guardian",
            permissions: {
              communications: "view",
              attendance: "view",
              evaluations: "view",
              billing: "manage",
              documents: "view",
            },
          },
          {
            id: "athlete",
            role: "Athlete",
            permissions: {
              communications: "restricted",
              attendance: "view",
              evaluations: "view",
              billing: "restricted",
              documents: "view",
            },
          },
        ],
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
        open: "Expand QR code",
        close: "Close QR code preview",
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
          {
            label: "Sparring rounds",
            value: "118",
            trend: "+6% vs last block",
          },
          { label: "Video reviews", value: "16", trend: "Target: 20 reviews" },
          {
            label: "Explosive kick score",
            value: "Moderate",
            trend: "Maintain during taper",
          },
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

    /* ---- MOVED HERE: previously at root ---- */
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
          caption: "{{current}} of {{target}} credits confirmed for this term",
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
            focus: "Finalise dashboard deliverables and peer review results.",
            nextEvaluationDate: "Apr 28",
          },
          communityImpactSeminar: {
            title: "Community impact seminar",
            focus:
              "Submit reflective brief documenting service-learning outcomes.",
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
      guardianPortal: {
        badge: "Guardian view",
        title: "Stay aligned with your athlete",
        description:
          "Monitor attendance momentum, keep billing on track, and prepare for upcoming commitments in one streamlined feed.",
        summaryCards: {
          attendance: {
            label: "Attendance this month",
            value: "12 / 14 sessions",
            helper: "On track for the dojang attendance goal",
          },
          billing: {
            label: "Outstanding balance",
            value: "MAD 180",
            helper: "Spring membership dues · due Apr 25",
          },
          events: {
            label: "Next commitments",
            value: "2 upcoming events",
            helper: "Regional invitational & guardian forum",
          },
        },
        feed: {
          heading: "Family activity feed",
          helper:
            "Attendance patterns, billing status, and upcoming events in one stream.",
          items: {
            attendance: {
              badge: "Attendance update",
              title: "Five-session streak intact",
              description:
                "Jordan has checked in for every dojang session this week. Energy notes remain strong.",
              timestamp: "Updated 2 hours ago",
              patternLabel: "Last 7 sessions",
              days: {
                mon: "Mon",
                tue: "Tue",
                wed: "Wed",
                thu: "Thu",
                fri: "Fri",
                sat: "Sat",
                sun: "Sun",
              },
              callout:
                "Keep Thursday’s active recovery window to protect the streak.",
            },
            billing: {
              badge: "Billing status",
              title: "Auto-pay set for Apr 25",
              description:
                "Remaining spring membership dues will draft automatically. No further action needed.",
              timestamp: "Synced this morning",
              balanceLabel: "Balance due",
              balanceValue: "MAD 180 outstanding",
              balanceHelper: "Invoice INV-2045 · due Apr 25",
              autopayLabel: "Auto-pay",
              autopayValue: "Runs Apr 25 at 09:00",
              autopayHelper: "Visa •••• 4298",
            },
            events: {
              badge: "Upcoming events",
              title: "Two commitments next week",
              description:
                "Regional sparring invitational and guardian forum are on the calendar.",
              timestamp: "Updated just now",
              list: {
                regional: {
                  title: "Regional sparring invitational",
                  date: "Apr 21 · Arrival 08:00",
                  helper: "Confirm travel check-in by Fri, Apr 18.",
                },
                parentForum: {
                  title: "Guardian coordination forum",
                  date: "Apr 24 · 19:00",
                  helper: "In-person at the high performance studio.",
                },
              },
            },
          },
        },
        messaging: {
          heading: "Message coaching staff",
          helper: "Secure channel with the lead masters for quick updates.",
          messages: {
            masterLewis: {
              author: "Master Amara Lewis",
              role: "Lead coach",
              body: "Jordan kept excellent pop through the plyometric ladder today. We’re seeing great focus.",
              timestamp: "Sent 4:10 PM",
            },
            guardian: {
              author: "You",
              role: "Guardian",
              body: "Thank you! We’ll reinforce hydration tonight before tomorrow’s morning block.",
              timestamp: "Sent 4:18 PM",
            },
            masterLewisFollowUp: {
              author: "Master Amara Lewis",
              role: "Lead coach",
              body: "Perfect. We’ll send a short clip from the sparring preview once it’s uploaded.",
              timestamp: "Sent 4:26 PM",
            },
          },
          quickReplies: {
            transport: "Share pickup update",
            billing: "Question about invoice",
            checkIn: "Confirm arrival time",
          },
          composer: {
            label: "Write a message",
            placeholder: "Type a quick update or question…",
            cta: "Send message",
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
            label: "Travel confirmations",
            value_one: "{{count}} pending form",
            value_other: "{{count}} pending forms",
            detailPending_one:
              "{{count}} travel confirmation still needs logistics sign-off before Friday.",
            detailPending_other:
              "{{count}} travel confirmations still need logistics sign-off before Friday.",
            detailCleared: "All travel confirmations received for this block.",
          },
          readinessIndex: {
            label: "Readiness index",
            value: "92%",
            detail: "Master feedback and physio clearance trending up",
        },
      },
      logs: {
        heading: "Recent attendance activity",
        description: "Latest check-ins for your account",
        requireAuth: "Sign in to view your attendance history.",
        empty: "No attendance has been recorded for your profile yet.",
        error: "We couldn't load your attendance history right now.",
        status: {
          present: "Present",
          late: "Late",
          excused: "Excused",
          absent: "Absent",
        },
        recordedAt: {
          label: "Recorded",
          missing: "Time not recorded",
        },
        noteLabel: "Note",
        unknownSession: "Training session",
        unknownSchedule: "Schedule unavailable",
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
              emphasis_one:
                "Send reminder before Thursday noon logistics call.",
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
            emphasis: "Ensure hydration scans are logged before main warm-up.",
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
  },
};
