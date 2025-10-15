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
        landing: "Bienvenue chez Wydad Taekwondo",
        calendar: "Calendrier des entraînements et tournois",
        academicRecord: "Dossier académique",
        billing: "Facturation",
        trainingAttendance: "Présence au dojang",
        coachEvaluation: "Évaluation du maître",
        progressOverview: "Vue d'ensemble de la progression",
        performanceTracking: "Suivi des performances taekwondo",
        profile: "Profil du pratiquant",
        access: "Gestion des accès",
        overview: "Vue d'ensemble",
      },
      statusMessages: {
        completeRequired:
          "Veuillez au minimum renseigner le nom complet et l'identifiant de membre avant d'enregistrer.",
        saved: "Profil enregistré. Le QR code a été actualisé avec les dernières informations.",
        reverted: "Le brouillon a été rétabli sur la dernière version enregistrée du profil.",
        cleared: "Le brouillon du profil a été effacé.",
        deleted: "Profil supprimé. Créez-en un nouveau pour générer un QR code.",
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
              "Retrouvez votre centre de commande taekwondo et alignez-vous sur l'objectif du jour.",
            cta: "Se connecter",
          },
          register: {
            heading: "Activez votre passeport taekwondo",
            description:
              "Créez vos identifiants pour débloquer des séances de poomsae personnalisées et le soutien de l'équipe.",
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
          fullName: {
            label: "Nom complet",
            placeholder: "Jordan Adebayo",
          },
          email: {
            label: "Email",
            placeholder: "vous@club.com",
          },
          password: {
            label: "Mot de passe",
            placeholder: "Créez une phrase de passe sécurisée",
          },
          disclaimer:
            "En créant un compte vous acceptez la charte du dojang et consentez au suivi des performances.",
        },
        highlights: {
          heading: "Pourquoi les athlètes adorent",
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
          outro: "ou discutez avec votre équipe d'entraîneurs sur le canal du groupe.",
        },
        status: {
          network: "Impossible de joindre le serveur. Veuillez réessayer dans un instant.",
          generic: "Une erreur est survenue. Veuillez réessayer.",
          login: {
            success: "Bon retour ! Vous êtes connecté.",
            invalid: "Impossible de trouver un compte avec cet e-mail et ce mot de passe.",
          },
          register: {
            success: "Compte créé. Vous pouvez vous connecter avec vos nouveaux identifiants.",
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
              description: "Consultez les tournois et les séances clés du dojang",
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
              description: "Suivez factures et paiements",
            },
            {
              to: "/training-attendance",
              label: "Présence à l'entraînement",
              description: "Voyez les passages au dojang par semaine",
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
        { label: "Préparation", value: "82 % · Prêt" },
        { label: "Score de sommeil", value: "7 h 10" },
        { label: "Hydratation", value: "Dans l'objectif" },
      ],
      seasonSummary: {
        line1: "Saison 2025 · Équipe Dan élite",
        line2: "Prochain jour de repos : dim. 20 avr.",
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
        callouts: {
          travel: "Trajet",
          weighIn: "Pesée",
          warmUp: "Échauffement",
          briefing: "Briefing",
          ringside: "Bord de ring",
        },
        actions: {
          addToCalendar: "Ajouter à mon agenda",
          copyLink: "Copier le lien",
        },
      },
      detailPanel: {
        status: {
          active: "Actif",
          upcoming: "À venir",
          completed: "Terminé",
        },
        focus: {
          training: "Focus entraînement",
          competition: "Focus compétition",
        },
        time: {
          label: "Horaire",
          value: "{{start}} → {{end}}",
        },
        location: {
          label: "Lieu",
        },
        roster: {
          label: "Participants",
          guests: "Invités",
        },
        notes: {
          label: "Notes",
          empty: "Aucune note partagée",
        },
        files: {
          label: "Documents",
          empty: "Aucun fichier joint",
        },
      },
      availability: {
        training: "Disponible pour l'entraînement",
        competition: "Disponible pour le tournoi",
        unavailable: "Indisponible",
        maybe: "À confirmer",
      },
      breakpoints: {
        rest: "Repos",
        conditioning: "Préparation physique",
        sparring: "Sparring",
        poomsae: "Poomsae",
        coaching: "Coaching",
      },
    },
    academicRecord: {
      title: "Éligibilité académique",
      description:
        "Surveillez la progression des cours et la préparation aux passages de grade pour chaque discipline.",
      overview: {
        status: {
          good: "Tout est en ordre",
          warning: "Vérification nécessaire",
          critical: "Action requise",
        },
        summary: {
          heading: "Résumé de la ceinture",
          eligible: "Éligible au prochain passage",
          requirementsMet: "Prérequis remplis",
          requirementsMissing: "Prérequis manquants",
          additionalNotes: "Notes complémentaires",
        },
      },
      courses: {
        heading: "Suivi des cours",
        attendance: "Présence",
        assessments: "Évaluations",
        projects: "Projets",
        status: {
          completed: "Terminé",
          inProgress: "En cours",
          notStarted: "Non commencé",
        },
      },
      eligibility: {
        heading: "Préparation au passage",
        upcomingEvaluations: "Évaluations à venir",
        readiness: {
          ready: "Prêt",
          review: "À revoir",
          hold: "En attente",
        },
        checklist: {
          heading: "Points de contrôle",
          recommendation: "Recommandations du maître",
          requirements: "Conditions",
        },
      },
      endorsements: {
        heading: "Approbations du maître",
        coaches: "Encadrants",
        status: {
          approved: "Approuvé",
          pending: "En attente",
          denied: "Refusé",
        },
      },
      documentation: {
        heading: "Dossier scolaire",
        transcripts: "Relevés",
        certificates: "Certificats",
        upload: "Téléverser",
      },
    },
    billing: {
      title: "Gestion de la facturation",
      description:
        "Suivez les frais d'inscription, paiements et rappels afin que chaque pratiquant reste en règle.",
      overview: {
        balance: {
          label: "Solde actuel",
          paid: "Payé",
          due: "À régler",
        },
        upcoming: {
          label: "À venir",
          autoDraft: "Prélèvement automatique",
          manual: "Paiement manuel",
        },
        actions: {
          newInvoice: "Nouvelle facture",
          recordPayment: "Enregistrer un paiement",
          sendReminder: "Envoyer un rappel",
        },
      },
      invoices: {
        heading: "Factures",
        table: {
          invoice: "Facture",
          issueDate: "Date d'émission",
          dueDate: "Date d'échéance",
          amount: "Montant",
          status: "Statut",
        },
        status: {
          paid: "Payée",
          overdue: "En retard",
          pending: "En attente",
          draft: "Brouillon",
        },
        actions: {
          download: "Télécharger",
          send: "Envoyer",
          delete: "Supprimer",
        },
      },
      payments: {
        heading: "Paiements",
        table: {
          payer: "Payeur",
          date: "Date",
          amount: "Montant",
          method: "Méthode",
          reference: "Référence",
        },
        methods: {
          card: "Carte",
          transfer: "Virement",
          cash: "Espèces",
          cheque: "Chèque",
        },
      },
      reminders: {
        heading: "Rappels",
        scheduled: "Programmé",
        manual: "Manuel",
        channels: {
          email: "Email",
          sms: "SMS",
          call: "Appel",
        },
        status: {
          sent: "Envoyé",
          scheduled: "Planifié",
          draft: "Brouillon",
        },
      },
      notes: {
        heading: "Notes de facturation",
        placeholder: "Ajouter des notes internes ou des observations de suivi",
      },
    },
    trainingAttendance: {
      title: "Présence au dojang",
      description:
        "Consultez les présences par séance, ceintures et type de cours pour maintenir la progression constante.",
      overview: {
        attendanceRate: "Taux de présence",
        streak: "Série actuelle",
        lastAbsent: "Dernière absence",
      },
      filters: {
        heading: "Filtres",
        belt: "Ceinture",
        classType: "Type de cours",
        coach: "Maître",
        status: {
          present: "Présent",
          excused: "Justifié",
          absent: "Absent",
        },
      },
      sessions: {
        heading: "Séances",
        table: {
          date: "Date",
          class: "Cours",
          focus: "Focus",
          status: "Statut",
          notes: "Notes",
        },
        status: {
          present: "Présent",
          late: "En retard",
          excused: "Justifié",
          absent: "Absent",
        },
        actions: {
          addNote: "Ajouter une note",
          markPresent: "Marquer présent",
          markExcused: "Marquer justifié",
          markAbsent: "Marquer absent",
        },
      },
      analytics: {
        heading: "Analyses",
        consistency: {
          label: "Régularité",
          streak: "Série",
          weeklyAverage: "Moyenne hebdomadaire",
        },
        distribution: {
          label: "Répartition par ceinture",
          heading: "Présence par niveau",
        },
        punctuality: {
          label: "Ponctualité",
          onTime: "À l'heure",
          late: "En retard",
        },
      },
      interventions: {
        heading: "Suivi",
        pending: "À contacter",
        escalated: "Escaladé",
        resolved: "Résolu",
        actions: {
          start: "Démarrer un suivi",
          update: "Mettre à jour",
          close: "Clore",
        },
      },
    },
    coachEvaluation: {
      title: "Évaluation du maître",
      description:
        "Recueillez des retours qualitatifs sur les compétences techniques, la discipline et l'esprit d'équipe.",
      overview: {
        rating: {
          label: "Note globale",
          outstanding: "Exceptionnel",
          strong: "Solide",
          developing: "En progression",
          needsFocus: "Doit se concentrer",
        },
        lastEvaluation: "Dernière évaluation",
        evaluator: "Évaluateur",
      },
      competencies: {
        heading: "Compétences",
        technical: {
          label: "Technique",
          description: "Maîtrise des poomsae, précision des coups et timings.",
        },
        tactical: {
          label: "Tactique",
          description: "Lecture du ring, adaptation en sparring, stratégie de combat.",
        },
        physical: {
          label: "Physique",
          description: "Endurance, vitesse de récupération et puissance explosive.",
        },
        mental: {
          label: "Mental",
          description: "Résilience, concentration et régulation émotionnelle.",
        },
      },
      feedback: {
        heading: "Retours détaillés",
        strengths: "Points forts",
        improvements: "Axes de progression",
        recommendations: "Recommandations d'entraînement",
      },
      goals: {
        heading: "Objectifs",
        shortTerm: "Court terme",
        longTerm: "Long terme",
        status: {
          onTrack: "Sur la bonne voie",
          atRisk: "À risque",
          offTrack: "Hors de la voie",
        },
      },
      sessions: {
        heading: "Séances d'évaluation",
        table: {
          date: "Date",
          focus: "Focus",
          format: "Format",
          notes: "Notes",
        },
        formats: {
          live: "En direct",
          video: "Vidéo",
          tournament: "Tournoi",
          grading: "Passage de grade",
        },
      },
      acknowledgements: {
        heading: "Accusés de réception",
        athlete: "Athlète",
        guardian: "Responsable",
        status: {
          acknowledged: "Confirmé",
          pending: "En attente",
        },
      },
    },
    progressOverview: {
      title: "Progression globale",
      description:
        "Suivez l'évolution des ceintures, la maîtrise des techniques et la discipline dans le cadre du plan de progression.",
      beltProgression: {
        heading: "Progression des ceintures",
        current: "Ceinture actuelle",
        next: "Prochaine ceinture",
        readiness: "Préparation",
        ceremony: "Date de cérémonie",
      },
      technique: {
        heading: "Compétences techniques",
        poomsae: "Poomsae",
        sparring: "Sparring",
        breaking: "Casse",
        demonstration: "Démonstration",
      },
      discipline: {
        heading: "Discipline & leadership",
        attendance: "Présence",
        punctuality: "Ponctualité",
        mentorship: "Mentorat",
      },
      milestones: {
        heading: "Jalons",
        beltTest: "Examen de ceinture",
        tournament: "Tournoi",
        seminar: "Séminaire",
        community: "Action communautaire",
      },
      recommendations: {
        heading: "Conseils personnalisés",
        training: "Priorités d'entraînement",
        recovery: "Récupération",
        mindset: "État d'esprit",
      },
    },
    performanceTracking: {
      title: "Suivi de performance",
      description:
        "Analysez la vitesse des coups, les charges de sparring et les indicateurs de récupération pour chaque athlète.",
      metrics: {
        heading: "Indicateurs clés",
        strikingSpeed: {
          label: "Vitesse de frappe",
          units: "kicks/min",
        },
        sparringLoad: {
          label: "Charge de sparring",
          units: "rounds",
        },
        recoveryTime: {
          label: "Temps de récupération",
          units: "h",
        },
        heartRate: {
          label: "Fréquence cardiaque",
          units: "bpm",
        },
        readiness: {
          label: "Préparation",
          units: "indice",
        },
      },
      trends: {
        heading: "Tendances",
        week: "Semaine",
        month: "Mois",
        season: "Saison",
      },
      comparisons: {
        heading: "Comparaisons",
        squadAverage: "Moyenne de l'équipe",
        topPerformer: "Meilleur score",
        personalBest: "Meilleur perso",
      },
      events: {
        heading: "Moments marquants",
        breakthroughs: "Progrès clés",
        setbacks: "Contretemps",
        recoveries: "Récupérations",
      },
      coachingNotes: {
        heading: "Notes d'entraîneur",
        placeholder: "Ajoutez des observations tactiques ou physiques",
      },
      export: {
        heading: "Exporter",
        downloadReport: "Télécharger le rapport",
        share: "Partager",
      },
    },
    profile: {
      title: "Profil du pratiquant",
      description:
        "Centralisez les informations personnelles, médicales et administratives pour un suivi complet.",
      personalInfo: {
        heading: "Informations personnelles",
        fields: {
          fullName: "Nom complet",
          preferredName: "Nom d'usage",
          birthDate: "Date de naissance",
          nationality: "Nationalité",
          gender: "Genre",
        },
      },
      contact: {
        heading: "Coordonnées",
        fields: {
          email: "Email",
          phone: "Téléphone",
          address: "Adresse",
          emergencyContact: "Contact d'urgence",
          guardian: "Responsable légal",
        },
      },
      membership: {
        heading: "Adhésion",
        fields: {
          id: "ID de membre",
          joinDate: "Date d'adhésion",
          belt: "Ceinture actuelle",
          chapter: "Section",
          status: "Statut",
        },
        status: {
          active: "Actif",
          suspended: "Suspendu",
          archived: "Archivé",
        },
      },
      medical: {
        heading: "Santé & sécurité",
        allergies: "Allergies",
        medications: "Médicaments",
        injuries: "Blessures",
        clearance: "Autorisation médicale",
      },
      documents: {
        heading: "Documents",
        uploads: "Téléversements",
        expiration: "Expiration",
        download: "Télécharger",
      },
      qrCode: {
        heading: "Carte d'accès",
        description:
          "Partagez ce QR code avec l'accueil du dojang pour un accès rapide.",
        refresh: "Actualiser le code",
        download: "Télécharger le QR",
      },
    },
    access: {
      title: "Gestion des accès",
      description:
        "Contrôlez les permissions des entraîneurs, du staff médical et des responsables familiaux.",
      overview: {
        heading: "Permissions actives",
        roles: {
          admin: "Administrateur",
          coach: "Maître",
          medical: "Médical",
          guardian: "Responsable",
        },
      },
      permissions: {
        heading: "Permissions détaillées",
        read: "Lecture",
        write: "Écriture",
        manage: "Gestion",
        revoke: "Révoquer",
      },
      invites: {
        heading: "Invitations",
        status: {
          sent: "Envoyée",
          accepted: "Acceptée",
          expired: "Expirée",
        },
        actions: {
          resend: "Renvoyer",
          revoke: "Annuler",
        },
      },
      audit: {
        heading: "Journal d'accès",
        table: {
          actor: "Utilisateur",
          action: "Action",
          target: "Cible",
          date: "Date",
        },
        actions: {
          granted: "Accordé",
          revoked: "Révoqué",
          updated: "Mis à jour",
        },
      },
      recovery: {
        heading: "Récupération",
        guardians: "Responsables",
        instructions:
          "Ajoutez ou mettez à jour les contacts familiaux pouvant récupérer l'accès en cas de perte des identifiants.",
      },
    },
  },
};
