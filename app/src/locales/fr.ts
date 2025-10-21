export const fr = {
  translation: {
    common: {
      languageSwitcher: {
        label: "Choisir la langue",
        languages: {
          en: "Anglais",
          ar: "Arabe",
          fr: "Français",
        },
      },
      badges: {
        soon: "Bientôt",
      },
      navigation: {
        open: "Ouvrir la navigation",
        close: "Fermer la navigation",
        collapse: "Réduire la navigation",
        expand: "Développer la navigation",
        primary: "Navigation principale",
      },
    },
    app: {
      pageTitles: {
        calendar: "Calendrier des entraînements et tournois",
        academicRecord: "Dossier académique",
        billing: "Facturation",
        trainingAttendance: "Présence au dojang",
        coachEvaluation: "Évaluation du maître",
        progressOverview: "Vue d'ensemble de la progression",
        performanceTracking: "Suivi des performances taekwondo",
        profile: "Profil du pratiquant",
        guardianPortal: "Portail parents & tuteurs",
        access: "Gestion des accès",
        overview: "Vue d'ensemble",
      },
      statusMessages: {
        completeRequired:
          "Veuillez au minimum renseigner le nom complet et l'identifiant de membre avant d'enregistrer.",
        saved:
          "Profil enregistré. Le QR code a été actualisé avec les dernières informations.",
        reverted:
          "Le brouillon a été rétabli sur la dernière version enregistrée du profil.",
        cleared: "Le brouillon du profil a été effacé.",
        deleted:
          "Profil supprimé. Créez-en un nouveau pour générer un QR code.",
        saveError:
          "Impossible de mettre le profil à jour. Vérifiez votre connexion et réessayez.",
        deleteError:
          "La suppression du profil a échoué. Veuillez réessayer dans un instant.",
      },
      defaults: {
        teamMember: "Pratiquant de taekwondo",
      },
    },
    header: {
      aria: {
        toggleNavigation: {
          open: "Ouvrir la navigation",
          close: "Fermer la navigation",
        },
        avatarNavigation: {
          profile: "Accéder à votre profil",
          access: "Ouvrir la gestion d'accès",
        },
      },
      menu: {
        label: "Options du compte",
        profile: "Compléter votre profil",
        profileDescription:
          "Renseignez vos informations pour débloquer l'accès complet.",
        access: "Gérer les accès",
        accessDescription:
          "Mettre à jour les QR codes et partager les identifiants.",
        logout: "Se déconnecter",
        logoutDescription: "Quitter le tableau de bord en toute sécurité.",
      },
    },
    auth: {
      modal: {
        aria: {
          close: "Fermer la fenêtre d'authentification",
          loginForm: "Formulaire de connexion",
          registerForm: "Formulaire d'inscription",
        },
        badge: "Portail de l'athlète taekwondo",
        modes: {
          login: "Connexion",
          register: "Inscription",
        },
        copy: {
          login: {
            heading: "Connectez-vous à votre QG du dojang",
            description:
              "Revenez à votre centre de commande taekwondo et alignez-vous sur l'objectif du jour.",
            cta: "Se connecter",
          },
          register: {
            heading: "Activez votre passeport taekwondo",
            description:
              "Créez votre compte pour débloquer des séances de poomsae personnalisées et le soutien de l'équipe.",
            cta: "Créer un compte",
          },
        },
        loginForm: {
          email: {
            label: "Email",
            placeholder: "vous@club.com",
          },
          password: {
            label: "Mot de passe",
            placeholder: "••••••••",
          },
          forgotPassword:
            "Mot de passe oublié ? Contactez votre maître ou un administrateur pour rétablir l'accès.",
        },
        registerForm: {
          profilePhoto: {
            label: "Photo de profil",
            dropLabel: "Glissez-déposez votre photo de pratiquant ici",
            helpText: "PNG ou JPG jusqu'à 5 Mo, ou cliquez pour parcourir.",
            uploadButton: "Téléverser une photo",
            changeButton: "Changer de photo",
            removeButton: "Retirer la photo",
            previewAlt: "Aperçu de la photo de profil sélectionnée",
          },
          fullName: {
            label: "Nom complet",
            placeholder: "Jordan Adebayo",
          },
          role: {
            label: "Rôle",
            placeholder: "Athlète",
          },
          squad: {
            label: "Escouade / Niveau",
            placeholder: "Escouade d'élite sparring",
          },
          email: {
            label: "Email",
            placeholder: "vous@club.com",
          },
          emergencyContact: {
            label: "Contact d'urgence",
            placeholder: "+212 676 005 071",
          },
          membershipId: {
            label: "Identifiant de membre",
            placeholder: "CP-E43-K4",
          },
          password: {
            label: "Mot de passe",
            placeholder: "Créez une phrase de passe sécurisée",
          },
          disclaimer:
            "En créant un compte vous acceptez la charte du dojang et consentez au suivi des performances.",
        },
        highlights: {
          heading: "Pourquoi les athlètes adorent le hub",
          items: {
            eliteTraining: {
              title: "Plans d'entraînement du dojo",
              description:
                "Débloquez des blocs hebdomadaires de sparring et de poomsae conçus par les maîtres pour votre progression de ceinture.",
            },
            performanceIntelligence: {
              title: "Intelligence de performance",
              description:
                "Suivez la vitesse des coups de pied, la récupération et l'état de préparation au combat avec des informations adaptatives.",
            },
            communityRecognition: {
              title: "Reconnaissance de la communauté",
              description:
                "Partagez vos jalons de ceinture, collectionnez les badges de tournoi et grimpez dans le classement de l'équipe.",
            },
            supportCrew: {
              title: "Pôle de soutien complet",
              description:
                "Coordonnez-vous avec les maîtres, physiothérapeutes et mentors depuis un seul hub.",
            },
          },
        },
        support: {
          heading: "Besoin d'aide pour commencer ?",
          intro: "Envoyez un message à",
          outro:
            "ou discutez avec votre équipe d'entraîneurs sur le canal du groupe.",
        },
        status: {
          network:
            "Impossible de joindre le serveur. Veuillez réessayer dans un instant.",
          generic: "Une erreur est survenue. Veuillez réessayer.",
          login: {
            success: "Bon retour ! Vous êtes connecté.",
            invalid:
              "Impossible de trouver un compte avec cet e-mail et ce mot de passe.",
          },
          register: {
            success:
              "Compte créé. Vous pouvez vous connecter avec vos nouveaux identifiants.",
            duplicate: "Un compte existe déjà avec cet e-mail.",
          },
        },
      },
    },
    sidebar: {
      brand: {
        name: "Wydad Taekwondo",
        label: "Tableau de bord",
      },
      sections: [
        {
          heading: "Calendrier",
          items: [
            {
              to: "/calendar",
              label: "Calendrier de la saison",
              description:
                "Consultez les tournois et les séances clés du dojang",
            },
          ],
        },
        {
          heading: "Informations",
          items: [
            {
              to: "/academic-record",
              label: "Dossier académique",
              description: "Surveillez l'éligibilité aux cours",
            },
            {
              to: "/billing",
              label: "Vue d'ensemble de la facturation",
              description: "Suivez les factures et les paiements",
              status: "soon",
            },
            {
              to: "/training-attendance",
              label: "Présence à l'entraînement",
              description: "Voyez les passages au dojang par semaine",
            },
            {
              to: "/guardian-portal",
              label: "Portail parents",
              description:
                "Vue familiale sur la présence, la facturation et les événements",
            },
          ],
        },
        {
          heading: "Évaluations",
          items: [
            {
              to: "/coach-evaluation",
              label: "Évaluation du maître",
              description: "Derniers retours des maîtres",
            },
            {
              to: "/progress-overview",
              label: "Analyse de progression",
              description: "Tendances de croissance et alertes de ceinture",
            },
          ],
        },
        {
          heading: "Suivi des performances",
          items: [
            {
              to: "/performance-tracking",
              label: "Tableau de performance",
              description: "Jalons techniques et charge de sparring",
            },
          ],
        },
        {
          heading: "Profil & accès",
          items: [
            {
              to: "/profile",
              label: "Profil taekwondo",
              description: "Gérez l'identité du pratiquant",
            },
            {
              to: "/access",
              label: "Accès au dojang",
              description: "Partagez le QR code de membre",
            },
          ],
        },
      ],
      readinessHeading: "Préparation du jour",
      readinessHighlights: [
        {
          label: "Préparation",
          value: "82 % · Prêt",
        },
        {
          label: "Score de sommeil",
          value: "7 h 10",
        },
        {
          label: "Hydratation",
          value: "Dans l'objectif",
        },
      ],
      seasonSummary: {
        line1: "Saison 2025 · Équipe Dan élite",
        line2: "Prochain jour de repos : dim. 20 avr.",
      },
      logout: {
        label: "Se déconnecter",
        description: "Revenir à l'écran de connexion du portail athlète.",
        ariaLabel: "Se déconnecter du portail athlète",
      },
    },
    calendar: {
      title: "Calendrier intégré du dojang",
      description:
        "Passez de la vue mensuelle à hebdomadaire ou quotidienne pour coordonner chaque cours, séminaire et temps de ring.",
      viewOptions: {
        month: "Mois",
        week: "Semaine",
        day: "Jour",
      },
      actions: {
        addEvent: "Nouvel événement",
        editEvent: "Modifier l'événement",
      },
      workload: {
        heading: "Aperçu de la charge",
        summary_zero: "Aucun engagement d'équipe à venir",
        summary_one: "{{count}} engagement d'équipe à venir",
        summary_other: "{{count}} engagements d'équipe à venir",
        description:
          "Suivez comment les blocs d'entraînement et le temps de tournoi s'accumulent selon les filtres de focus sélectionnés.",
        metrics: {
          all: {
            label: "Tous les événements",
            sublabel: "Durée combinée",
          },
          training: {
            label: "Séances de dojo",
            sublabel: "Temps effectif sur le tatami",
          },
          competition: {
            label: "Journées de tournoi",
            sublabel: "Déplacements et passages sur le ring",
          },
        },
      },
      upcoming: {
        heading: "À l'ordre du jour",
        empty: "Aucun événement visible",
        fallback:
          "Ajustez les filtres de focus pour faire apparaître le prochain cours, passage de grade ou tournoi du planning partagé.",
        coach: "Maître principal : {{name}}",
        competitionDetails: "Tournoi {{level}} · Contrôle de ring à {{time}}",
      },
      filters: {
        heading: "Filtres de focus",
        title: "Mettez en avant les moments clés",
        description:
          "Activez ou désactivez des catégories pour vous concentrer sur la préparation des cours ou l'exécution des tournois.",
        status: {
          all: "Les deux catégories sont visibles.",
          single:
            "Une seule catégorie est active — touchez de nouveau pour réafficher tout le calendrier.",
          none: "Aucune catégorie sélectionnée — activez-en une pour voir le planning à venir.",
        },
      },
      categories: {
        training: {
          label: "Séances de dojo",
          description:
            "Poomsae techniques, exercices de sparring et points de conditionnement.",
          shortLabel: "Entraînement",
          badge: "Séance de dojo",
        },
        competition: {
          label: "Journées de tournoi",
          description:
            "Logistique de déplacement, pesées et tableaux de championnat.",
          shortLabel: "Tournoi",
          badge: "Journée de tournoi",
        },
      },
      states: {
        loading: "Chargement du planning le plus récent...",
        loadFailed:
          "Impossible d'actualiser le planning. Affichage des événements en cache.",
        noEventsFiltered:
          "Aucun événement ne correspond aux filtres actuels. Réactivez une catégorie ou ajustez votre sélection pour revoir le planning de l'équipe.",
        noDaySelected: "Aucun jour sélectionné",
        noScheduled: "Aucun événement planifié",
        noScheduledDay: "Aucune activité prévue à cette date.",
      },
      monthView: {
        eventsCount_zero: "Aucun événement",
        eventsCount_one: "{{count}} événement",
        eventsCount_other: "{{count}} événements",
        previous: "Mois précédent",
        next: "Mois suivant",
        previousShort: "Préc.",
        nextShort: "Suiv.",
      },
      weekView: {
        weekLabel: "Semaine du {{start}}",
        scheduledEvents_zero: "Aucun événement planifié",
        scheduledEvents_one: "{{count}} événement planifié",
        scheduledEvents_other: "{{count}} événements planifiés",
        today: "Aujourd'hui",
      },
      dayView: {
        headerDescription:
          "Tous les cours, séminaires et responsabilités de tournoi pour cette date.",
        eventCount_zero: "Aucun événement",
        eventCount_one: "{{count}} événement",
        eventCount_other: "{{count}} événements",
        coachLabel: "Maître principal · {{name}}",
        checkIn: "Contrôle de ring à {{time}}",
      },
      eventModal: {
        aria: {
          close: "Fermer les détails de l'événement",
        },
        occursOn: "{{date}} · {{relative}}",
        occursOnWithoutRelative: "{{date}}",
        schedule: {
          heading: "Programme",
          start: "Début",
          end: "Fin",
          duration: "Durée",
        },
        details: {
          heading: "Détails",
          location: "Lieu",
          coach: "Maître principal",
          level: "Niveau du tournoi",
          checkInLabel: "Contrôle de ring",
          checkInValue: "Contrôle à {{time}}",
        },
      },
      eventForm: {
        aria: {
          close: "Fermer le formulaire d'événement",
        },
        createTitle: "Créer un nouvel événement",
        createDescription:
          "Saisissez les informations essentielles pour un nouvel entraînement ou tournoi.",
        editTitle: "Modifier l'événement",
        editDescription:
          "Mettez à jour les informations de planning pour cet élément du calendrier.",
        fields: {
          title: "Titre de l'événement",
          start: "Début",
          end: "Fin",
          location: "Lieu",
          category: "Catégorie",
          eventType: "Type d'événement",
          coach: "Coach référent",
          level: "Niveau de compétition",
          checkIn: "Heure de contrôle",
        },
        actions: {
          cancel: "Annuler",
          createEvent: "Créer l'événement",
          saveChanges: "Enregistrer",
        },
        status: {
          missingTitle: "Ajoutez un titre pour l'événement.",
          missingLocation: "Indiquez le lieu de l'événement.",
          invalidDates: "Les horaires doivent être des dates valides.",
          invalidRange:
            "L'heure de fin doit être postérieure à l'heure de début.",
          missingCoach: "Les entraînements doivent avoir un coach assigné.",
          missingCheckIn: "Les compétitions nécessitent une heure de contrôle.",
          requestError:
            "Enregistrement impossible. Vérifiez votre connexion et réessayez.",
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
        training: "Séance d'entraînement",
        competition: "Compétition",
        meet: "Rencontre",
        other: "Autre",
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
        "Recueillez des retours qualitatifs sur les compétences techniques, la discipline et l'esprit d'équipe.",
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
            score: 4,
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
        "Suivez l'évolution des ceintures, la maîtrise des techniques et la discipline dans le cadre du plan de progression.",
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
          {
            label: "Jan",
            performance: 72,
            target: 70,
          },
          {
            label: "Feb",
            performance: 75,
            target: 72,
          },
          {
            label: "Mar",
            performance: 78,
            target: 75,
          },
          {
            label: "Apr",
            performance: 82,
            target: 78,
          },
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
        heading: "Permissions détaillées",
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
        alt: "QR code d'accès au dojang",
        open: "Agrandir le QR code",
        close: "Fermer l'aperçu du QR code",
      },
    },
    performanceTracking: {
      title: "Suivi de performance",
      description:
        "Analysez la vitesse des coups, les charges de sparring et les indicateurs de récupération pour chaque athlète.",
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
          {
            label: "Video reviews",
            value: "16",
            trend: "Target: 20 reviews",
          },
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
          {
            label: "Week 13",
            weight: "78.4 kg",
          },
          {
            label: "Week 14",
            weight: "78.1 kg",
          },
          {
            label: "Week 15",
            weight: "77.9 kg",
          },
          {
            label: "Week 16",
            weight: "78.0 kg",
          },
        ],
        rangeNote:
          "Maintain the -80 kg class: target range 77.8 kg – 78.4 kg. Flag a nutrition review if weight drifts outside band for two consecutive weeks.",
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
        badge: "Vue du tuteur",
        title: "Restez aligné avec votre athlète",
        description:
          "Suivez l'élan de présence, gardez la facturation à jour et préparez-vous aux prochains engagements dans un flux simplifié.",
        summaryCards: {
          attendance: {
            label: "Présence ce mois-ci",
            value: "12 / 14 sessions",
            helper: "En bonne voie pour l'objectif de présence du dojang",
          },
          billing: {
            label: "Solde à régler",
            value: "MAD 180",
            helper: "Cotisation de printemps · échéance 25 avr.",
          },
          events: {
            label: "Prochains engagements",
            value: "2 événements à venir",
            helper: "Invitational régional et forum des tuteurs",
          },
        },
        feed: {
          heading: "Flux d'activité familial",
          helper:
            "Tendances de présence, statut de facturation et prochains événements dans un seul flux.",
          items: {
            attendance: {
              badge: "Mise à jour de présence",
              title: "Série de cinq séances maintenue",
              description:
                "Jordan s'est enregistré à chaque séance de dojang cette semaine. Les notes d'énergie restent solides.",
              timestamp: "Mis à jour il y a 2 heures",
              patternLabel: "7 dernières séances",
              days: {
                mon: "Lun",
                tue: "Mar",
                wed: "Mer",
                thu: "Jeu",
                fri: "Ven",
                sat: "Sam",
                sun: "Dim",
              },
              callout:
                "Conservez la plage de récupération active du jeudi pour préserver la série.",
            },
            billing: {
              badge: "Statut de facturation",
              title: "Prélèvement automatique prévu le 25 avr.",
              description:
                "Le solde de la cotisation de printemps sera prélevé automatiquement. Aucune action supplémentaire requise.",
              timestamp: "Synchronisé ce matin",
              balanceLabel: "Solde dû",
              balanceValue: "MAD 180 restants",
              balanceHelper: "Facture INV-2045 · échéance 25 avr.",
              autopayLabel: "Prélèvement auto.",
              autopayValue: "Traitement le 25 avr. à 09:00",
              autopayHelper: "Visa •••• 4298",
            },
            events: {
              badge: "Événements à venir",
              title: "Deux engagements la semaine prochaine",
              description:
                "L'invitational régional de sparring et le forum des tuteurs sont au calendrier.",
              timestamp: "Mis à jour à l'instant",
              list: {
                regional: {
                  title: "Invitational régional de sparring",
                  date: "21 avr. · Arrivée 08:00",
                  helper: "Confirmez l'arrivée du voyage avant ven. 18 avr.",
                },
                parentForum: {
                  title: "Forum de coordination des tuteurs",
                  date: "24 avr. · 19:00",
                  helper: "En présentiel au studio haute performance.",
                },
              },
            },
          },
        },
        messaging: {
          heading: "Message à l'équipe d'entraîneurs",
          helper:
            "Canal sécurisé avec les maîtres principaux pour des mises à jour rapides.",
          messages: {
            masterLewis: {
              author: "Master Amara Lewis",
              role: "Entraîneuse principale",
              body: "Jordan a gardé une excellente explosivité sur l'échelle pliométrique aujourd'hui. Nous constatons une grande concentration.",
              timestamp: "Envoyé à 16 h 10",
            },
            guardian: {
              author: "Vous",
              role: "Tuteur",
              body: "Merci ! Nous renforcerons l'hydratation ce soir avant le créneau du matin.",
              timestamp: "Envoyé à 16 h 18",
            },
            masterLewisFollowUp: {
              author: "Master Amara Lewis",
              role: "Entraîneuse principale",
              body: "Parfait. Nous enverrons un court extrait de l'aperçu de sparring une fois mis en ligne.",
              timestamp: "Envoyé à 16 h 26",
            },
          },
          quickReplies: {
            transport: "Partager une mise à jour de ramassage",
            billing: "Question sur la facture",
            checkIn: "Confirmer l'heure d'arrivée",
          },
          composer: {
            label: "Écrire un message",
            placeholder: "Saisissez une mise à jour ou une question rapide…",
            cta: "Envoyer le message",
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
          heading: "Historique récent de présence",
          description: "Dernières confirmations d'arrivée pour votre compte",
          requireAuth: "Connectez-vous pour consulter votre historique de présence.",
          empty: "Aucune présence n'a encore été enregistrée pour votre profil.",
          error: "Impossible de charger votre historique de présence pour le moment.",
          status: {
            present: "Présent",
            late: "Retard",
            excused: "Excusé",
            absent: "Absent",
          },
          recordedAt: {
            label: "Enregistré",
            missing: "Horaire non renseigné",
          },
          noteLabel: "Note",
          unknownSession: "Séance d'entraînement",
          unknownSchedule: "Horaire indisponible",
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
