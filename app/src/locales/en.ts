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
        landing: "Welcome to Wydad Taekwondo",
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
    landing: {
      badge: "Modern Taekwondo operations platform",
      heroTitle: "Run your dojang with clarity and confidence",
      heroDescription:
        "Cloub unites masters, practitioners, and coordinators in one workspace for class scheduling, belt evaluations, and tournament preparation. Turn attendance, finance, and performance insights into next steps for every team.",
      ctas: {
        primary: "Start free trial",
        secondary: "Log in",
        tertiary: "Talk to us",
      },
      features: [
        {
          title: "Integrated class planning",
          description:
            "Build poomsae, sparring, and conditioning tracks with automated reminders that keep every belt team aligned.",
        },
        {
          title: "Performance intelligence",
          description:
            "Visualize progress with dashboards that blend attendance trends, technical scores, and evaluation notes.",
        },
        {
          title: "Secure access for every role",
          description:
            "Role-based permissions give masters, athletes, and guardians the right visibility while protecting sensitive data.",
        },
      ],
      commandCenter: {
        heading: "Command center for every role",
        subheading:
          "Preview how each persona experiences Cloub's guided insights, task lists, and communication guardrails.",
        roleSwitcherLabel: "Toggle dashboards",
        notifications: {
          title: "Notification hub",
          empty: "You're caught up across every ring team.",
          viewAll: "view alerts",
        },
        statusLabels: {
          completed: "Completed",
          upcoming: "Next up",
          overdue: "Past due",
        },
        focusTitle: "Priority focus",
        focusSubtitle: "Auto-prioritized from attendance and billing signals",
        shortcutsTitle: "Quick actions",
        roleOptions: [
          {
            id: "master",
            label: "Master instructor",
            description:
              "Testing cadence, tuition health, and dojang broadcasts",
          },
          {
            id: "coach",
            label: "Coach",
            description: "Class prep, evaluations, and athlete follow-ups",
          },
          {
            id: "parent",
            label: "Parent",
            description: "Family schedules, dues, and feedback loops",
          },
          {
            id: "athlete",
            label: "Athlete",
            description: "Personal goals, attendance streaks, and highlights",
          },
        ],
        roleVariants: {
          master: {
            welcome: "Master command center",
            tagline:
              "Monitor grading readiness, revenue health, and instructor touchpoints the moment you log in.",
            kpis: [
              {
                id: "testingReady",
                label: "Testing readiness",
                value: "18 candidates",
                helper: "92% paperwork received",
                delta: "+6 vs last week",
                trend: "up",
                icon: "award",
              },
              {
                id: "attendancePulse",
                label: "Attendance pulse",
                value: "96%",
                helper: "Rolling 7-day average",
                delta: "+2%",
                trend: "up",
                icon: "activity",
              },
              {
                id: "financialHealth",
                label: "Financial health",
                value: "$4.3k",
                helper: "Tuition collected this week",
                delta: "+12%",
                trend: "up",
                icon: "creditCard",
              },
              {
                id: "openTasks",
                label: "Open tasks",
                value: "5 queues",
                helper: "Evaluations and outreach pending",
                delta: "2 overdue",
                trend: "down",
                icon: "clipboardCheck",
              },
            ],
            focus: [
              {
                id: "leadershipClass",
                label: "Leadership poomsae block",
                description:
                  "Finalize drills and assign assistant coverage for tonight's 6:00pm session.",
                action: "Review class plan",
                tag: "Tonight",
                icon: "calendar",
              },
              {
                id: "redBeltPrep",
                label: "Red belt promotion window",
                description:
                  "Twelve athletes cleared conditioning. Confirm board setup and judging panel.",
                action: "Confirm grading lineup",
                tag: "Testing",
                icon: "award",
              },
              {
                id: "outstandingInvoices",
                label: "Outstanding tuition",
                description:
                  "$820 overdue across four families. Send reminder before Friday statements.",
                action: "Send reminders",
                tag: "Billing",
                icon: "creditCard",
              },
              {
                id: "coachReviews",
                label: "Coach evaluations",
                description:
                  "Three assistant reviews awaiting signature to unlock their next classes.",
                action: "Sign evaluations",
                tag: "Staff",
                icon: "clipboardCheck",
              },
            ],
            shortcuts: [
              {
                id: "masterSchedule",
                label: "Open master schedule",
                description:
                  "Adjust ring assignments and instructor coverage in one view.",
                icon: "calendar",
              },
              {
                id: "broadcastUpdate",
                label: "Broadcast update",
                description:
                  "Send SMS or email to every squad with two clicks.",
                icon: "users",
              },
              {
                id: "testingPacket",
                label: "Download testing packet",
                description:
                  "Print scorecards, boards, and scoring rubric for Saturday.",
                icon: "clipboardList",
              },
            ],
            notifications: [
              {
                id: "notifyForms",
                title: "Grading paperwork missing",
                category: "Testing",
                time: "Due in 4h",
                icon: "award",
                description:
                  "Blue belts Mia and Jordan still need parental consent forms.",
              },
              {
                id: "notifyRsvp",
                title: "VIP parent RSVP pending",
                category: "Event",
                time: "Updated 1h ago",
                icon: "calendar",
                description:
                  "Winter showcase RSVP closes tonight for front-row seating.",
              },
              {
                id: "notifyMedical",
                title: "Medical clearance expired",
                category: "Compliance",
                time: "Flagged yesterday",
                icon: "shieldCheck",
                description:
                  "Ethan Park needs updated sparring clearance before contact drills.",
              },
            ],
            timeline: {
              title: "Belt journey timeline",
              entries: [
                {
                  id: "timelineAudit",
                  label: "Sparring audit complete",
                  time: "Today · 3:30pm",
                  status: "completed",
                  description:
                    "Coach Kim submitted 5th kup sparring assessments to the board.",
                },
                {
                  id: "timelinePretest",
                  label: "Red belt pretest",
                  time: "Tomorrow · 5:00pm",
                  status: "upcoming",
                  description:
                    "Joint session covers poomsae sequencing and breaking combinations.",
                },
                {
                  id: "timelineBoard",
                  label: "Board review",
                  time: "Fri · 2:00pm",
                  status: "upcoming",
                  description:
                    "Finalize judging panel assignments and ring layout notes.",
                },
                {
                  id: "timelinePayments",
                  label: "Payment deadline",
                  time: "Fri · 6:00pm",
                  status: "overdue",
                  description:
                    "Two families still need to submit testing fees before check-in.",
                },
              ],
            },
            highlights: {
              title: "Program highlights",
              items: [
                {
                  id: "highlightSparring",
                  title: "Elite sparring streak",
                  metric: "7 bouts",
                  description:
                    "Competition team undefeated since April invitational.",
                  icon: "activity",
                },
                {
                  id: "highlightReadiness",
                  title: "Testing readiness",
                  metric: "92%",
                  description:
                    "Students meeting form and conditioning thresholds ahead of exams.",
                  icon: "gauge",
                },
                {
                  id: "highlightCommunity",
                  title: "Community reach",
                  metric: "42 families",
                  description:
                    "New parent portal invites activated this month.",
                  icon: "users",
                },
              ],
            },
            reels: {
              title: "Milestone reels",
              clips: [
                {
                  id: "reelExam",
                  title: "Belt exam spotlight",
                  duration: "00:34",
                  description:
                    "Recap of last weekend's dan promotions and highlights.",
                },
                {
                  id: "reelLeadership",
                  title: "Leadership spotlight",
                  duration: "00:21",
                  description:
                    "Junior leaders mentoring white belts on blocking drills.",
                },
                {
                  id: "reelAnalytics",
                  title: "Sparring analytics",
                  duration: "00:45",
                  description:
                    "Breakdown of counter-attacks landed during camp.",
                },
              ],
            },
          },
          coach: {
            welcome: "Coach operations dashboard",
            tagline:
              "Stay ahead on class prep, grading support, and athlete outreach in one command view.",
            kpis: [
              {
                id: "classesPrepped",
                label: "Classes prepped",
                value: "6 of 7",
                helper: "Ready through Sunday",
                delta: "+1 lesson",
                trend: "up",
                icon: "calendar",
              },
              {
                id: "evaluationQueue",
                label: "Evaluation queue",
                value: "4 reviews",
                helper: "Awaiting your scoring",
                delta: "2 overdue",
                trend: "down",
                icon: "clipboardCheck",
              },
              {
                id: "attendanceRecovery",
                label: "Attendance recovery",
                value: "83%",
                helper: "Students back after absence",
                delta: "+5%",
                trend: "up",
                icon: "activity",
              },
              {
                id: "athleteReach",
                label: "Athlete reach-outs",
                value: "9 sent",
                helper: "This week",
                delta: "3 pending replies",
                trend: "down",
                icon: "users",
              },
            ],
            focus: [
              {
                id: "sparringPlan",
                label: "Advanced sparring lab",
                description:
                  "Upload counter-attack drills for Thursday's competition team block.",
                action: "Upload drills",
                tag: "Prep",
                icon: "sparkles",
              },
              {
                id: "evaluationRun",
                label: "Green belt evaluations",
                description:
                  "Score combinations and add coaching notes before tomorrow's review.",
                action: "Open scorecards",
                tag: "Due tomorrow",
                icon: "clipboardList",
              },
              {
                id: "missedClass",
                label: "Missed class follow-up",
                description:
                  "Send recovery plan to Liam · Junior 2 who missed the last two sessions.",
                action: "Message family",
                tag: "Attendance",
                icon: "users",
              },
              {
                id: "equipmentCheck",
                label: "Gear check",
                description:
                  "Confirm mitts and hogus for the weekend sparring scrimmage.",
                action: "View inventory",
                tag: "Logistics",
                icon: "shieldCheck",
              },
            ],
            shortcuts: [
              {
                id: "startAttendance",
                label: "Start attendance",
                description:
                  "Launch roster tracking with smart absence alerts.",
                icon: "clipboardCheck",
              },
              {
                id: "coachNotes",
                label: "Log coaching notes",
                description:
                  "Capture combinations, corrections, and wins in seconds.",
                icon: "sparkles",
              },
              {
                id: "feedbackLoop",
                label: "Share athlete feedback",
                description:
                  "Push evaluation summaries to parents and athletes.",
                icon: "users",
              },
            ],
            notifications: [
              {
                id: "coachDeadline",
                title: "Testing drill upload due",
                category: "Prep",
                time: "Due tonight",
                icon: "sparkles",
                description: "Add poomsae loop for Junior 3 before 9pm.",
              },
              {
                id: "coachMissed",
                title: "Missed class alert",
                category: "Attendance",
                time: "Flagged 2h ago",
                icon: "calendar",
                description:
                  "Avery Chen absent for second consecutive red belt class.",
              },
              {
                id: "coachMedical",
                title: "New medical note",
                category: "Compliance",
                time: "Posted 30m ago",
                icon: "shieldCheck",
                description:
                  "Maya Ortiz cleared for light-contact sparring only.",
              },
            ],
            timeline: {
              title: "Class build timeline",
              entries: [
                {
                  id: "timelinePlan",
                  label: "Lesson plan drafted",
                  time: "Today · 9:00am",
                  status: "completed",
                  description:
                    "Uploaded combinations and conditioning ladder for white belts.",
                },
                {
                  id: "timelineReview",
                  label: "Master review",
                  time: "Today · 4:30pm",
                  status: "upcoming",
                  description:
                    "Master Youssef will review tomorrow's sparring lesson.",
                },
                {
                  id: "timelineRoster",
                  label: "Roster sync",
                  time: "Tomorrow · 7:45am",
                  status: "upcoming",
                  description:
                    "Attendance list updates with new makeup bookings.",
                },
                {
                  id: "timelineEval",
                  label: "Eval deadline",
                  time: "Tomorrow · 8:00pm",
                  status: "overdue",
                  description:
                    "Complete green belt scoring to release feedback.",
                },
              ],
            },
            highlights: {
              title: "Training highlights",
              items: [
                {
                  id: "highlightSparringCoach",
                  title: "Sparring conversions",
                  metric: "68%",
                  description:
                    "Counter-attack success rate improved week-over-week.",
                  icon: "activity",
                },
                {
                  id: "highlightTechnique",
                  title: "Technique mastery",
                  metric: "14 badges",
                  description:
                    "Athletes awarded new technique badges this cycle.",
                  icon: "sparkles",
                },
                {
                  id: "highlightEngagement",
                  title: "Engagement",
                  metric: "27 notes",
                  description: "Positive athlete shout-outs logged this month.",
                  icon: "users",
                },
              ],
            },
            reels: {
              title: "Session reels",
              clips: [
                {
                  id: "reelDrills",
                  title: "Counter drill mashup",
                  duration: "00:28",
                  description: "Highlights from elite sparring class.",
                },
                {
                  id: "reelCombos",
                  title: "Green belt combo walk-through",
                  duration: "00:33",
                  description: "Step-by-step cueing for forms 3 + 4.",
                },
                {
                  id: "reelCoaching",
                  title: "Coaching wins",
                  duration: "00:19",
                  description:
                    "Shout-outs from parents and athletes this week.",
                },
              ],
            },
          },
          parent: {
            welcome: "Parent overview",
            tagline:
              "Track your family's commitments, tuition status, and instructor feedback in one story.",
            kpis: [
              {
                id: "familyAttendance",
                label: "Attendance streak",
                value: "5 sessions",
                helper: "Team Carter",
                delta: "+2 week gain",
                trend: "up",
                icon: "calendar",
              },
              {
                id: "upcomingEvents",
                label: "Upcoming events",
                value: "3 registered",
                helper: "Showcase + testing",
                delta: "1 RSVP pending",
                trend: "down",
                icon: "calendar",
              },
              {
                id: "tuitionStatus",
                label: "Tuition status",
                value: "$0 due",
                helper: "Auto-pay active",
                delta: "Next draft 6 May",
                trend: "up",
                icon: "creditCard",
              },
              {
                id: "feedbackNotes",
                label: "Coach feedback",
                value: "4 notes",
                helper: "New praise this month",
                delta: "+1 this week",
                trend: "up",
                icon: "sparkles",
              },
            ],
            focus: [
              {
                id: "classPrep",
                label: "Friday family class",
                description:
                  "Arrive 15 min early for leadership photos at check-in.",
                action: "Add to calendar",
                tag: "Tomorrow",
                icon: "calendar",
              },
              {
                id: "beltExamFees",
                label: "Belt exam fee",
                description:
                  "Submit $65 testing fee for Ava before the weekend.",
                action: "Pay now",
                tag: "Billing",
                icon: "creditCard",
              },
              {
                id: "rsvpShowcase",
                label: "Showcase RSVP",
                description:
                  "Confirm seats for the June showcase—two RSVPs still open.",
                action: "Complete RSVP",
                tag: "Event",
                icon: "users",
              },
              {
                id: "coachMessage",
                label: "Coach follow-up",
                description:
                  "Read Coach Lina's note about flexibility drills at home.",
                action: "View note",
                tag: "Feedback",
                icon: "sparkles",
              },
            ],
            shortcuts: [
              {
                id: "familySchedule",
                label: "See family schedule",
                description:
                  "Sync every class, exam, and event with your calendar.",
                icon: "calendar",
              },
              {
                id: "managePayments",
                label: "Manage payments",
                description:
                  "Update billing info or download your latest invoice.",
                icon: "creditCard",
              },
              {
                id: "messageCoach",
                label: "Message coaches",
                description:
                  "Send quick updates or health notes to the instructor team.",
                icon: "users",
              },
            ],
            notifications: [
              {
                id: "parentReminder",
                title: "Leadership photos Friday",
                category: "Event",
                time: "Tomorrow",
                icon: "calendar",
                description:
                  "Arrive 15 minutes early for the family photo wall.",
              },
              {
                id: "parentInvoice",
                title: "New invoice posted",
                category: "Billing",
                time: "Sent 3h ago",
                icon: "creditCard",
                description:
                  "Tournament registration fee for Noah is ready to pay.",
              },
              {
                id: "parentFeedback",
                title: "Coach shout-out",
                category: "Feedback",
                time: "Shared today",
                icon: "sparkles",
                description:
                  "Coach Lina praised Ava's improved kicking control.",
              },
            ],
            timeline: {
              title: "Family journey",
              entries: [
                {
                  id: "timelineClass",
                  label: "Class check-in",
                  time: "Today · 4:00pm",
                  status: "completed",
                  description:
                    "Noah completed conditioning with perfect attendance.",
                },
                {
                  id: "timelineExam",
                  label: "Belt exam payment",
                  time: "Tomorrow · 10:00am",
                  status: "upcoming",
                  description:
                    "Auto-pay will draft for Ava's orange belt test.",
                },
                {
                  id: "timelineShowcase",
                  label: "Showcase RSVP",
                  time: "Sun · 6:00pm",
                  status: "upcoming",
                  description:
                    "Confirm seats and volunteer slot for refreshments.",
                },
                {
                  id: "timelineMakeup",
                  label: "Makeup lesson",
                  time: "Mon · 5:30pm",
                  status: "overdue",
                  description:
                    "Book a catch-up class for Liam after this week's absence.",
                },
              ],
            },
            highlights: {
              title: "Family highlights",
              items: [
                {
                  id: "highlightConsistency",
                  title: "Consistency streak",
                  metric: "5 in a row",
                  description:
                    "Every family member checked in on time this week.",
                  icon: "calendar",
                },
                {
                  id: "highlightFeedback",
                  title: "Positive feedback",
                  metric: "4 notes",
                  description: "Coaches shared personalised praise this month.",
                  icon: "sparkles",
                },
                {
                  id: "highlightCommunityParent",
                  title: "Community points",
                  metric: "120 pts",
                  description:
                    "Earned from volunteering and referral shout-outs.",
                  icon: "users",
                },
              ],
            },
            reels: {
              title: "Family story reels",
              clips: [
                {
                  id: "reelRibbon",
                  title: "Stripe ceremony",
                  duration: "00:18",
                  description: "Watch Ava receive her latest stripe.",
                },
                {
                  id: "reelShowcase",
                  title: "Showcase preview",
                  duration: "00:24",
                  description: "Sneak peek of the June performance routine.",
                },
                {
                  id: "reelParent",
                  title: "Parent spotlight",
                  duration: "00:31",
                  description: "Highlights from the family training session.",
                },
              ],
            },
          },
          athlete: {
            welcome: "Athlete progress hub",
            tagline:
              "Celebrate momentum with a living record of attendance, belt goals, and sparring breakthroughs.",
            kpis: [
              {
                id: "streak",
                label: "Attendance streak",
                value: "12 days",
                helper: "Personal best",
                delta: "+2",
                trend: "up",
                icon: "calendar",
              },
              {
                id: "testingCountdown",
                label: "Next belt window",
                value: "18 days",
                helper: "Orange belt",
                delta: "Forms 3 & 4 ready",
                trend: "up",
                icon: "award",
              },
              {
                id: "sparringScore",
                label: "Sparring score",
                value: "87",
                helper: "Coach goal: 90",
                delta: "+4",
                trend: "up",
                icon: "activity",
              },
              {
                id: "library",
                label: "Skill library",
                value: "9 badges",
                helper: "Earned this season",
                delta: "+1",
                trend: "up",
                icon: "sparkles",
              },
            ],
            focus: [
              {
                id: "classTonight",
                label: "Competition team",
                description:
                  "Bring sparring gear—focus is on ring control drills.",
                action: "View lesson goals",
                tag: "Tonight",
                icon: "calendar",
              },
              {
                id: "beltPrep",
                label: "Belt prep checklist",
                description:
                  "Record a clean run of Poomsae 4 and upload before Sunday.",
                action: "Upload video",
                tag: "Testing",
                icon: "play",
              },
              {
                id: "conditioning",
                label: "Conditioning challenge",
                description:
                  "Complete 3 rounds of plyometric ladder shared by Coach Lina.",
                action: "Mark as done",
                tag: "Training",
                icon: "activity",
              },
              {
                id: "parentNote",
                label: "Parent support",
                description:
                  "Ask your parent to review tomorrow's ride share plan.",
                action: "Send reminder",
                tag: "Logistics",
                icon: "users",
              },
            ],
            shortcuts: [
              {
                id: "practiceLibrary",
                label: "Open practice library",
                description: "Stream drills and slow-motion walkthroughs.",
                icon: "play",
              },
              {
                id: "journal",
                label: "Update training journal",
                description:
                  "Log wins and questions for your next coaching check-in.",
                icon: "sparkles",
              },
              {
                id: "messageCoachAthlete",
                label: "Message coach",
                description: "Share recovery updates or request extra reps.",
                icon: "users",
              },
            ],
            notifications: [
              {
                id: "athleteEval",
                title: "Evaluation feedback ready",
                category: "Progress",
                time: "Posted 2h ago",
                icon: "clipboardCheck",
                description:
                  "Coach Lina left sparring tips from yesterday's class.",
              },
              {
                id: "athleteRSVP",
                title: "Tournament RSVP",
                category: "Event",
                time: "Due in 3d",
                icon: "calendar",
                description: "Confirm your spot for the June scrimmage.",
              },
              {
                id: "athleteGoal",
                title: "New goal unlocked",
                category: "Milestone",
                time: "Today",
                icon: "sparkles",
                description:
                  "Completed the endurance ladder for your testing badge.",
              },
            ],
            timeline: {
              title: "Journey timeline",
              entries: [
                {
                  id: "timelineUpload",
                  label: "Uploaded sparring reel",
                  time: "Today · 7:20am",
                  status: "completed",
                  description: "Coach reviewed and tagged your best exchanges.",
                },
                {
                  id: "timelineDrill",
                  label: "Home drill reminder",
                  time: "Tonight · 8:00pm",
                  status: "upcoming",
                  description:
                    "Record conditioning challenge and sync with journal.",
                },
                {
                  id: "timelineSeminar",
                  label: "Kick clinic",
                  time: "Sat · 11:00am",
                  status: "upcoming",
                  description: "Guest coach leading accuracy and speed ladder.",
                },
                {
                  id: "timelineCheckin",
                  label: "Wellness check-in",
                  time: "Yesterday",
                  status: "overdue",
                  description: "Log recovery status after strength session.",
                },
              ],
            },
            highlights: {
              title: "Progress highlights",
              items: [
                {
                  id: "highlightCombo",
                  title: "Combo mastery",
                  metric: "4 badges",
                  description: "Unlocked advanced spinning kicks this cycle.",
                  icon: "sparkles",
                },
                {
                  id: "highlightSparringAthlete",
                  title: "Sparring score",
                  metric: "87/100",
                  description: "Coach notes improved timing and ring control.",
                  icon: "activity",
                },
                {
                  id: "highlightAttendance",
                  title: "Attendance",
                  metric: "12-day streak",
                  description: "Perfect attendance across squads this month.",
                  icon: "calendar",
                },
              ],
            },
            reels: {
              title: "Momentum reels",
              clips: [
                {
                  id: "reelSparring",
                  title: "Sparring highlight",
                  duration: "00:25",
                  description: "Top exchanges from yesterday's ladder.",
                },
                {
                  id: "reelPoomsae",
                  title: "Poomsae progression",
                  duration: "00:29",
                  description:
                    "Side-by-side compare of your form from March vs. now.",
                },
                {
                  id: "reelJourney",
                  title: "Belt journey",
                  duration: "00:32",
                  description: "Timeline of milestones toward orange belt.",
                },
              ],
            },
          },
          default: {
            welcome: "Unified program snapshot",
            tagline:
              "Explore key insights, story-driven highlights, and tasks tailored to your role in the dojang.",
            kpis: [
              {
                id: "communityHealth",
                label: "Community health",
                value: "89%",
                helper: "Engagement index",
                delta: "+3",
                trend: "up",
                icon: "barChart",
              },
              {
                id: "upcomingFocus",
                label: "Upcoming focus",
                value: "7 items",
                helper: "Across all teams",
                delta: "Auto-prioritised",
                trend: "up",
                icon: "calendar",
              },
              {
                id: "financialPulse",
                label: "Financial pulse",
                value: "$9.8k",
                helper: "Projected this month",
                delta: "+14%",
                trend: "up",
                icon: "creditCard",
              },
              {
                id: "stories",
                label: "Story clips",
                value: "12 new",
                helper: "This week",
                delta: "+5",
                trend: "up",
                icon: "sparkles",
              },
            ],
            focus: [
              {
                id: "defaultTask",
                label: "Review upcoming classes",
                description:
                  "See which squads have new notes or attendance trends to address.",
                action: "Open planner",
                tag: "Priority",
                icon: "calendar",
              },
              {
                id: "defaultInvoices",
                label: "Check billing alerts",
                description:
                  "Identify overdue balances and set up automated nudges.",
                action: "View billing queue",
                tag: "Billing",
                icon: "creditCard",
              },
              {
                id: "defaultEvaluations",
                label: "Evaluation insights",
                description:
                  "Spot athletes who need feedback before the next belt exam.",
                action: "Open evaluations",
                tag: "Coaching",
                icon: "clipboardCheck",
              },
              {
                id: "defaultStories",
                label: "Share progress stories",
                description:
                  "Select clips to showcase on the lobby display this week.",
                action: "Curate reel",
                tag: "Community",
                icon: "sparkles",
              },
            ],
            shortcuts: [
              {
                id: "defaultSchedule",
                label: "Go to calendar",
                description: "Jump into the multi-ring scheduling view.",
                icon: "calendar",
              },
              {
                id: "defaultCommunicate",
                label: "Send update",
                description:
                  "Compose a message to targeted squads or families.",
                icon: "users",
              },
              {
                id: "defaultReports",
                label: "Open insights",
                description:
                  "Launch analytics with attendance and billing trends.",
                icon: "barChart",
              },
            ],
            notifications: [
              {
                id: "defaultAlert",
                title: "3 evaluation tasks pending",
                category: "Coaching",
                time: "Review today",
                icon: "clipboardCheck",
                description:
                  "Masters assigned new scoring requests for the red belt cohort.",
              },
              {
                id: "defaultRSVP",
                title: "Event RSVPs trending low",
                category: "Event",
                time: "Updated 2h ago",
                icon: "calendar",
                description:
                  "Send a reminder to boost attendance for the showcase.",
              },
              {
                id: "defaultInvoice",
                title: "Tuition variance detected",
                category: "Billing",
                time: "Flagged this morning",
                icon: "creditCard",
                description:
                  "Auto-pay failed for two family accounts—review before retry.",
              },
            ],
            timeline: {
              title: "Program timeline",
              entries: [
                {
                  id: "defaultTimeline1",
                  label: "Performance sync",
                  time: "Today · 12:00pm",
                  status: "completed",
                  description:
                    "Coaches aligned on upcoming sparring goals and testing focus.",
                },
                {
                  id: "defaultTimeline2",
                  label: "Belt exam briefing",
                  time: "Tomorrow · 3:00pm",
                  status: "upcoming",
                  description:
                    "Review candidate readiness and confirm volunteer roles.",
                },
                {
                  id: "defaultTimeline3",
                  label: "Family newsletter",
                  time: "Fri · 9:00am",
                  status: "upcoming",
                  description: "Send highlights and reminders for next week.",
                },
                {
                  id: "defaultTimeline4",
                  label: "Billing reconciliation",
                  time: "Mon · 8:00am",
                  status: "overdue",
                  description:
                    "Close the loop on outstanding tuition variance.",
                },
              ],
            },
            highlights: {
              title: "Organization highlights",
              items: [
                {
                  id: "defaultHighlight1",
                  title: "Community growth",
                  metric: "+18 members",
                  description:
                    "New students joined through referral drives this quarter.",
                  icon: "users",
                },
                {
                  id: "defaultHighlight2",
                  title: "Testing success",
                  metric: "94% pass",
                  description: "Average across the last two belt exams.",
                  icon: "award",
                },
                {
                  id: "defaultHighlight3",
                  title: "Engagement clips",
                  metric: "12 reels",
                  description:
                    "Fresh stories ready for lobby and social media.",
                  icon: "sparkles",
                },
              ],
            },
            reels: {
              title: "Storytelling reels",
              clips: [
                {
                  id: "defaultReel1",
                  title: "Weekly recap",
                  duration: "00:36",
                  description: "Highlights across squads and belt levels.",
                },
                {
                  id: "defaultReel2",
                  title: "Coach spotlight",
                  duration: "00:22",
                  description: "Recognize staff going above and beyond.",
                },
                {
                  id: "defaultReel3",
                  title: "Athlete wins",
                  duration: "00:27",
                  description:
                    "Share top performances from the last scrimmage.",
                },
              ],
            },
          },
        },
      },
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
            "Taekwondo programs coordinate their seasons with Cloub to elevate training quality and reduce admin overhead.",
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
        copyright: "© {{year}} Cloub Sports Management. All rights reserved.",
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
