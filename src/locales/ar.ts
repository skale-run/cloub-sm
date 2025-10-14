export const ar = {
  translation: {
    common: {
      languageSwitcher: {
        label: "اختر اللغة",
        languages: {
          en: "الإنجليزية",
          ar: "العربية",
        },
      },
      navigation: {
        open: "فتح التنقل",
        close: "إغلاق التنقل",
        collapse: "طيّ التنقل",
        expand: "توسيع التنقل",
        primary: "التنقل الرئيسي",
      },
    },
    app: {
      pageTitles: {
        landing: "مرحبًا بك في كلوب",
        calendar: "نظرة على التقويم",
        academicRecord: "السجل الأكاديمي",
        billing: "الفوترة",
        trainingAttendance: "سجل الحضور التدريبي",
        coachEvaluation: "تقييم المدرب",
        progressOverview: "متابعة التقدم",
        performanceTracking: "تتبع الأداء",
        profile: "الملف الشخصي",
        access: "إدارة الوصول",
        overview: "نظرة عامة",
      },
      statusMessages: {
        completeRequired:
          "يرجى استكمال الاسم الكامل ومعرّف العضوية قبل الحفظ.",
        saved: "تم حفظ الملف الشخصي. تم تحديث رمز الاستجابة السريعة بأحدث البيانات.",
        reverted: "تمت إعادة المسودة إلى آخر نسخة محفوظة.",
        cleared: "تمت تهيئة مسودة الملف الشخصي.",
        deleted: "تم حذف الملف الشخصي. أنشئ ملفًا جديدًا للحصول على رمز QR.",
      },
      defaults: {
        teamMember: "عضو الفريق",
      },
    },
    header: {
      aria: {
        toggleNavigation: {
          open: "فتح التنقل",
          close: "إغلاق التنقل",
        },
      },
    },
    auth: {
      modal: {
        aria: {
          close: "إغلاق نافذة المصادقة",
          loginForm: "نموذج تسجيل الدخول",
          registerForm: "نموذج التسجيل",
        },
        badge: "بوابة الرياضي",
        modes: {
          login: "تسجيل الدخول",
          register: "تسجيل",
        },
        copy: {
          login: {
            heading: "سجّل الدخول إلى مقر الرياضي",
            description:
              "عد إلى قمرة الأداء الخاصة بك ونسّق تركيز اليوم.",
            cta: "تسجيل الدخول",
          },
          register: {
            heading: "فعّل جواز الرياضي الخاص بك",
            description:
              "أنشئ بيانات اعتمادك لفتح الحصص المخصصة ودعم الفريق.",
            cta: "إنشاء حساب",
          },
        },
        loginForm: {
          email: {
            label: "البريد الإلكتروني",
            placeholder: "you@club.com",
          },
          password: {
            label: "كلمة المرور",
            placeholder: "••••••••",
          },
          forgotPassword: "نسيت كلمة المرور؟ تواصل مع مدربك لإعادة الوصول.",
        },
        registerForm: {
          fullName: {
            label: "الاسم الكامل",
            placeholder: "جوردان أديبايو",
          },
          email: {
            label: "البريد الإلكتروني",
            placeholder: "you@club.com",
          },
          password: {
            label: "كلمة المرور",
            placeholder: "أنشئ عبارة مرور آمنة",
          },
          disclaimer:
            "بإنشائك حسابًا فإنك توافق على ميثاق الرياضي وتقر بمراقبة الأداء.",
        },
        highlights: {
          heading: "لماذا يحبها الرياضيون",
          items: {
            eliteTraining: {
              title: "خطط تدريب نخبوية",
              description:
                "افتح الجلسات الأسبوعية المنسقة من المدرب والمخصصة لمسارك الموسمي.",
            },
            performanceIntelligence: {
              title: "ذكاء الأداء",
              description:
                "تتبّع السرعة والتعافي وجهوزية اليوم عبر رؤى تكيفية.",
            },
            communityRecognition: {
              title: "تقدير المجتمع",
              description:
                "شارك إنجازاتك، اجمع الشارات، وارتقِ في لوحة شرف الفريق.",
            },
            supportCrew: {
              title: "طاقم دعم متاح بالكامل",
              description:
                "نسّق مع العلاج الطبيعي والتغذية والمرشدين من مركز واحد.",
            },
          },
        },
        support: {
          heading: "تحتاج مساعدة للانطلاق؟",
          intro: "أرسل رسالة إلى",
          outro: "أو تواصل مع جهازك التدريبي في قناة الفريق.",
        },
      },
    },
    sidebar: {
      brand: {
        name: "وداد تايكواندو",
        label: "لوحة المعلومات",
      },
      sections: [
        {
          heading: "التقويم",
          items: [
            {
              to: "/calendar",
              label: "تقويم الموسم",
              description: "مراجعة البطولات والحصص الأساسية",
            },
          ],
        },
        {
          heading: "المعلومات",
          items: [
            {
              to: "/academic-record",
              label: "السجل الأكاديمي",
              description: "متابعة الأهلية الدراسية",
            },
            {
              to: "/billing",
              label: "نظرة على الفوترة",
              description: "تتبع الفواتير والمدفوعات",
            },
            {
              to: "/training-attendance",
              label: "الحضور التدريبي",
              description: "عرض تسجيلات الدخول حسب الأسبوع",
            },
          ],
        },
        {
          heading: "التقييمات",
          items: [
            {
              to: "/coach-evaluation",
              label: "تقييم المدرب",
              description: "أحدث ملاحظات الجهاز الفني",
            },
            {
              to: "/progress-overview",
              label: "رؤى التقدم",
              description: "منحنيات النمو والتنبيهات",
            },
          ],
        },
        {
          heading: "تتبع الأداء",
          items: [
            {
              to: "/performance-tracking",
              label: "لوحة أداء",
              description: "إنجازات تقنية وحمل تدريبي",
            },
          ],
        },
        {
          heading: "الملف والوصول",
          items: [
            {
              to: "/profile",
              label: "ملف الرياضي",
              description: "إدارة بيانات العضو",
            },
            {
              to: "/access",
              label: "الوصول الرقمي",
              description: "مشاركة رمز العضوية",
            },
          ],
        },
      ],
      readinessHeading: "جاهزية اليوم",
      readinessHighlights: [
        { label: "الجاهزية", value: "٪82 · جاهز" },
        { label: "جودة النوم", value: "7س 10د" },
        { label: "الترطيب", value: "ضمن الهدف" },
      ],
      memberSnapshot: {
        heading: "لمحة العضو",
        memberCard: {
          label: "بطاقة العضو",
          status: "نشط",
          idLabel: "المعرف",
          roleLabel: "الدور",
          squadLabel: "الفريق",
        },
        details: {
          role: {
            label: "الدور",
            fallback: "حدد دورًا",
          },
          squad: {
            label: "الفريق",
            fallback: "حدّث الفريق لتخصيص التمارين",
          },
          membershipId: {
            label: "معرف العضوية",
            fallback: "قيد التخصيص",
          },
        },
        complete: "الملف مكتمل — يمكن للمدربين الاطلاع على أحدث البيانات.",
        nextUpdate: "التحديث التالي: {{field}}.",
        emptyState: "احفظ ملفك الشخصي لتحصل على إرشادات مخصصة في التنقل.",
      },
      seasonSummary: {
        line1: "موسم 2025 · مجموعة الموجة 2",
        line2: "يوم الراحة التالي: الأحد 20 أبريل",
      },
    },
    calendar: {
      title: "تقويم الفريق المتكامل",
      description:
        "تنقّل بين العرض الشهري والأسبوعي واليومي لتنظيم كل حصة تدريب وكل منافسة.",
      viewOptions: {
        month: "شهر",
        week: "أسبوع",
        day: "يوم",
      },
      workload: {
        heading: "لمحة عن الحمل",
        summary_zero: "لا توجد التزامات قادمة للفريق",
        summary_one: "التزام واحد قادم للفريق",
        summary_two: "التزامان قادمان للفريق",
        summary_few: "{{count}} التزامات قادمة للفريق",
        summary_many: "{{count}} التزامًا قادمًا للفريق",
        summary_other: "{{count}} التزام قادم للفريق",
        description:
          "تتبّع كيفية تراكم أوقات التدريب والمنافسات وفق عوامل التصفية المحددة.",
        metrics: {
          all: {
            label: "جميع الفعاليات",
            sublabel: "المدة الإجمالية",
          },
          training: {
            label: "حصص التدريب",
            sublabel: "زمن التدريب الفعلي",
          },
          competition: {
            label: "أيام المنافسات",
            sublabel: "فترات السفر والتنفيذ",
          },
        },
      },
      upcoming: {
        heading: "القادم على الجدول",
        empty: "لا توجد فعاليات ظاهرة",
        fallback:
          "عدّل عوامل التصفية لإظهار الحصة التدريبية أو المنافسة التالية في الجدول المشترك.",
        coach: "المدرب المسؤول: {{name}}",
        competitionDetails: "بطولة مستوى {{level}} · تسجيل الوصول الساعة {{time}}",
      },
      filters: {
        heading: "عوامل التركيز",
        title: "سلّط الضوء على اللحظات المهمة",
        description:
          "بدّل الفئات للتركيز على تجهيز التدريب القادم أو تنفيذ المنافسة.",
        status: {
          all: "كلتا الفئتين ظاهرتان.",
          single:
            "فئة واحدة مفعّلة فقط — اضغط مجددًا لإرجاع الجدول كاملًا.",
          none: "لم يتم تحديد أي فئة — فعّل إحداها لمشاهدة الجدول القادم.",
        },
      },
      categories: {
        training: {
          label: "حصص التدريب",
          description:
            "تطوير المهارات، والتهيئة البدنية، ونقاط مراجعة الفيديو.",
          shortLabel: "تدريب",
          badge: "حصة تدريبية",
        },
        competition: {
          label: "أيام المنافسات",
          description:
            "لوجستيات السفر، الأدوار التأهيلية، والبطولات النهائية.",
          shortLabel: "منافسة",
          badge: "يوم منافسة",
        },
      },
      states: {
        noEventsFiltered:
          "لا تتطابق أي فعاليات مع عوامل التصفية الحالية. فعّل فئة أو عدّل اختيارك لعرض جدول الفريق مجددًا.",
        noDaySelected: "لم يتم اختيار يوم",
        noScheduled: "لا توجد فعاليات مجدولة",
        noScheduledDay: "لا توجد أنشطة مجدولة في هذا التاريخ.",
      },
      monthView: {
        eventsCount_zero: "لا فعاليات",
        eventsCount_one: "فعالية واحدة",
        eventsCount_two: "فعاليتان",
        eventsCount_few: "{{count}} فعاليات",
        eventsCount_many: "{{count}} فعالية",
        eventsCount_other: "{{count}} فعالية",
      },
      weekView: {
        weekLabel: "أسبوع {{start}}",
        scheduledEvents_zero: "لا فعاليات مجدولة",
        scheduledEvents_one: "فعالية مجدولة واحدة",
        scheduledEvents_two: "فعاليتان مجدولتان",
        scheduledEvents_few: "{{count}} فعاليات مجدولة",
        scheduledEvents_many: "{{count}} فعالية مجدولة",
        scheduledEvents_other: "{{count}} فعالية مجدولة",
        today: "اليوم",
      },
      dayView: {
        headerDescription:
          "جميع حصص التدريب ومسؤوليات المنافسة في هذا التاريخ.",
        eventCount_zero: "لا فعاليات",
        eventCount_one: "فعالية واحدة",
        eventCount_two: "فعاليتان",
        eventCount_few: "{{count}} فعاليات",
        eventCount_many: "{{count}} فعالية",
        eventCount_other: "{{count}} فعالية",
        coachLabel: "المسؤول · {{name}}",
        checkIn: "تسجيل الوصول الساعة {{time}}",
      },
      relativeDay: {
        inDays_zero: "اليوم",
        inDays_one: "بعد يوم",
        inDays_two: "بعد يومين",
        inDays_few: "بعد {{count}} أيام",
        inDays_many: "بعد {{count}} يومًا",
        inDays_other: "بعد {{count}} يوم",
        tomorrow: "غدًا",
        today: "اليوم",
        yesterday: "أمس",
        daysAgo_zero: "اليوم",
        daysAgo_one: "منذ يوم",
        daysAgo_two: "منذ يومين",
        daysAgo_few: "منذ {{count}} أيام",
        daysAgo_many: "منذ {{count}} يومًا",
        daysAgo_other: "منذ {{count}} يوم",
      },
      duration: {
        none: "0س",
        hours_zero: "0س",
        hours_one: "{{count}}س",
        hours_two: "{{count}}س",
        hours_few: "{{count}}س",
        hours_many: "{{count}}س",
        hours_other: "{{count}}س",
        minutes_zero: "0د",
        minutes_one: "{{count}}د",
        minutes_two: "{{count}}د",
        minutes_few: "{{count}}د",
        minutes_many: "{{count}}د",
        minutes_other: "{{count}}د",
      },
      levels: {
        regional: "إقليمي",
        national: "وطني",
        international: "دولي",
      },
      events: {
        ts1: {
          title: "قوة انفجارية وتمارين بلومترية",
          location: "استوديو الساحة 2",
          coach: "المدربة أمارة لويس",
        },
        ts2: {
          title: "تدريبات تقنية واستشفاء",
          location: "المضمار 1",
          coach: "المدرب هوغو مارتين",
        },
        ts3: {
          title: "مراجعة فيديو ومختبر الخطط",
          location: "قاعة الإحاطة بالمقر الرئيسي",
          coach: "فريق التحليل",
        },
        cc1: {
          title: "دعوة متروبوليتان",
          location: "ملعب نيو كريست",
        },
        cc2: {
          title: "تصفيات الوطن الصيفية",
          location: "صالة العاصمة",
        },
        cc3: {
          title: "الجائزة الكبرى القارية",
          location: "حديقة لشبونة لألعاب القوى",
        },
      },
    },
    training: {
      title: "تقويم الحصص التدريبية",
      description: "ابق متناغمًا مع الفريق وأكد توافرك مبكرًا.",
      weekLabel: "الأسبوع {{week}}",
      lead: "المدرب المسؤول · {{coach}}",
      confirmAvailability: "تأكيد التوفر",
    },
    coachEvaluation: {
      heading: "تقييم المدرب",
      description: "لمحة من أحدث اجتماع نصف شهري مع الجهاز الفني.",
      overallLabel: "الإجمالي",
      focusLabel: "محور المراجعة القادمة",
      addNote: "أضف ملاحظة المدرب",
      summary: {
        focusStatement: "صقل السرعة القصوى استعدادًا لتجارب المنتخب في مايو.",
        leadCoach: {
          label: "المدرب الرئيسي",
          value: "المدربة أمارا لويس",
        },
        lastReview: {
          label: "آخر مراجعة",
          value: "18 أبريل 2024",
        },
        nextTouchpoint: {
          label: "الموعد التالي",
          value: "2 مايو 2024",
        },
        momentum: {
          label: "الزخم",
          value: "اتجاه إيجابي",
        },
      },
      highlightWins: {
        heading: "محركات الزخم",
        items: [
          {
            title: "تماسك العمل من الكتل",
            detail:
              "المرحلة الانفجارية أصبحت أنظف بعد سباقات التضاد · حافظ على تمارين الإيقاع مرتين أسبوعيًا.",
          },
          {
            title: "بروفة السباق",
            detail:
              "الثقة مرتفعة بعد محاكاة بطولة داخلية · روتين ما قبل السباق بات ثابتًا.",
          },
        ],
      },
      watchList: {
        heading: "راقب عن كثب",
        items: [
          {
            title: "الاسترخاء في نهاية السباق",
            detail:
              "توتر الرقبة والفك يعود مع الإجهاد · أدرج إشارة لإعادة ضبط التنفس.",
          },
          {
            title: "مرحلة الاستشفاء",
            detail:
              "جودة النوم انخفضت في أسبوع السفر · نسّق تفريغ العلاج الطبيعي مع يوم إيقاع خفيف.",
          },
        ],
      },
      accountability: {
        heading: "لوحة المتابعة",
        updatedLabel: "يُحدَّث أسبوعيًا",
        ownerPrefix: "المسؤول · {{owner}}",
        dueLabel: "مستحق في {{date}}",
        items: [
          {
            title: "توقيت الطيران 30م",
            owner: "المدربة لويس",
            due: "26 أبريل",
            status: "مجدول",
          },
          {
            title: "مراجعة فيديو ميكانيكا العدو",
            owner: "الرياضي",
            due: "24 أبريل",
            status: "قيد التنفيذ",
          },
          {
            title: "متابعة سجل الترطيب",
            owner: "فريق الأداء",
            due: "أسبوعي",
            status: "على المسار",
          },
        ],
      },
      competencySnapshot: {
        heading: "نظرة على الكفاءات",
        scores: [
          {
            label: "انطلاقات انفجارية",
            score: 4.5,
            note: "تحسن الخروج من الكتل · حافظ على تمارين زاوية الساق.",
          },
          {
            label: "تحمل السرعة",
            score: 4.2,
            note: "حافظ على الشكل في آخر 60م · أضف جريًا بالمقاومة.",
          },
          {
            label: "تكتيكات السباق",
            score: 4.0,
            note: "واصل الملخصات المرئية · حسّن التموضع في الحارة.",
          },
          {
            label: "عادات الاستشفاء",
            score: 3.8,
            note: "الالتزام يتحسن · سجّل الترطيب يوميًا.",
          },
        ],
      },
    },
    progressOverview: {
      heading: "رؤى التقدم",
      description: "التقدم منذ بداية الربع نحو أهداف الأداء للموسم.",
      statusChip: "متقدم على الخطة",
      summaryMetrics: [
        {
          label: "تقييم الربع",
          value: "82",
          suffix: "/100",
          change: "+5.4",
          changeDescriptor: "مقارنة بالربع السابق",
        },
        {
          label: "فارق الهدف",
          value: "+3.1%",
          change: "متقدم",
          changeDescriptor: "عن هدف الأداء",
        },
        {
          label: "جلسات مكتملة",
          value: "47",
          change: "92%",
          changeDescriptor: "الالتزام بالتدريب",
        },
        {
          label: "درجة الاستشفاء",
          value: "86",
          suffix: "/100",
          change: "+6",
          changeDescriptor: "كفاءة النوم",
        },
      ],
      performanceTrend: {
        heading: "منحنى الأداء",
        subheading: "تقييم الموسم · يُحدَّث أسبوعيًا",
        chip: "علامات الهدف تُظهر أهداف الربع",
        pointSummary: "{{performance}}٪ أداء · {{target}}٪ هدف",
        points: [
          { label: "يناير", performance: 72, target: 70 },
          { label: "فبراير", performance: 75, target: 72 },
          { label: "مارس", performance: 78, target: 75 },
          { label: "أبريل", performance: 82, target: 78 },
        ],
        summary:
          "يحافظ التحسن المستمر خلال الدورات الدقيقة الأربع الماضية على تفوق الفريق على التطور المتوقع. حافظ على كثافة التدريب الحالية، وواصل تتبع النوم، وكرر فحص الجاهزية في حصص يوم الاثنين.",
        focus: {
          label: "تركيز الأسبوع القادم",
          detail:
            "عزّز شكل التسارع خلال الحصص التقنية يومي الثلاثاء والجمعة.",
        },
      },
      momentumWatch: {
        heading: "مراقبة الزخم",
        items: [
          {
            title: "عمل السرعة",
            detail: "حافظ على تسلسل سباقات التضاد مرتين أسبوعيًا.",
          },
          {
            title: "كتلة القوة",
            detail: "حوّل تركيز القرفصاء الأمامية إلى أوزان عالية السرعة.",
          },
          {
            title: "الاستشفاء",
            detail: "احمِ يوم الخميس كيوم استشفاء كامل + مراقبة.",
          },
        ],
      },
      coachAlerts: {
        heading: "تنبيهات المدرب",
        items: [
          {
            title: "فارق التسارع",
            detail:
              "متوسط زمن 30م انخفض بمقدار ‎0.11‎ ث · استمر في كتلة العدو بالمقاومة.",
          },
          {
            title: "تقدم القوة",
            detail:
              "القرفصاء الخلفية عند ‎1.8×‎ وزن الجسم · حافظ على تحميل موجي لمدة 3 أسابيع.",
          },
        ],
      },
    },
    landing: {
      badge: "إدارة رياضية سحابية",
      heroTitle: "بسّط تشغيل النادي وألهم كل رياضي",
      heroDescription:
        "تمكّن منصة كلوب المدربين والرياضيين والإداريين من التخطيط الموحد، وتتبع الأداء، والتواصل اللحظي. ابنِ برامج أقوى برؤى تُبقي الجميع على المسار نفسه.",
      ctas: {
        primary: "إنشاء حساب",
        secondary: "تسجيل الدخول",
        tertiary: "تواصل معنا",
      },
      features: [
        {
          title: "جدولة مركزية",
          description:
            "نظّم الحصص والبطولات والسفر مع تذكيرات تلقائية تُبقي جميع أعضاء القائمة على اطلاع.",
        },
        {
          title: "ذكاء الأداء",
          description:
            "اعرض تقدم الرياضيين عبر لوحات تجمع بين الحضور، الحمل التدريبي، ورؤى التقييم.",
        },
        {
          title: "وصول آمن للجميع",
          description:
            "صلاحيات مبنية على الأدوار تمنح المدربين والرياضيين والأوصياء الرؤية المناسبة مع حماية البيانات الحساسة.",
        },
      ],
      experience: {
        title: "قدّم تجربة نادي عالمية",
        description:
          "تجاوز الجداول المبعثرة واعتمد سير عمل عصري لكل أفراد النادي. كلوب يسهّل التسجيل والتواصل والتحليل التنافسي لتتفرغ لتطوير الرياضيين.",
        bullets: [
          "لوحات مخصصة للمدربين تضم التمارين، اتجاهات الحضور، وتنبيهات الرياضيين في مكان واحد.",
          "بوابة ذاتية للرياضي تتضمن الأهداف التدريبية، النقاط الأكاديمية، وتخزينًا آمنًا للمستندات.",
          "فواتير وإشعارات مؤتمتة تقلل العمل الإداري اليدوي وتحافظ على تواصل العائلات.",
        ],
        stats: {
          label: "موثوق من الأندية",
          value: "+12 ألف",
          description:
            "فرق تدير مواسمها عبر كلوب لرفع رضا الأعضاء وتقليل الجهد الإداري.",
        },
      },
      contact: {
        title: "تحدث مع فريقنا",
        description:
          "هل أنت مستعد لتحديث ناديك؟ شاركنا أهدافك وسنعد جولة مخصصة تناسب جدول موسمك.",
        email: "hello@cloub.co",
        schedule: "حدد مكالمة تعريفية: الاثنين–الجمعة · 9 صباحًا – 6 مساءً بتوقيت المحيط الهادئ",
      },
      footer: {
        copyright:
          "© {{year}} إدارة كلوب الرياضية. جميع الحقوق محفوظة.",
        links: {
          privacy: "الخصوصية",
          terms: "الشروط",
          support: "الدعم",
        },
      },
    },
    profile: {
      heading: {
        title: "ملفي الرياضي",
        description:
          "حافظ على بيانات اعتمادك محدثة لتحصل على تمارين مخصصة وإمكانية الوصول.",
        badge: "إدارة وتحديث",
      },
      photo: {
        title: "صورة الملف",
        description: "اسحب صورة شخصية واضحة أو اختر لتحميلها.",
        uploadedAlt: "صورة الرياضي المرفوعة",
        uploaded: {
          hint: "اسقط صورة جديدة أو اضغط إدخال لاستبدال صورتك.",
          note: "PNG أو JPG حتى 5 ميجابايت.",
        },
        empty: {
          heading: "اسحب وأفلت صورة الرياضي هنا",
          note: "PNG أو JPG حتى 5 ميجابايت، أو انقر للاختيار.",
        },
        errors: {
          invalidType: "يرجى تحميل ملف صورة.",
          fileTooLarge: "يرجى اختيار صورة أصغر من {{size}} ميجابايت.",
        },
      },
      fields: {
        fullName: {
          label: "الاسم الكامل",
          placeholder: "مثال: لينا كارتر",
          readinessLabel: "الاسم الكامل",
        },
        role: {
          label: "الدور",
          placeholder: "عدّاء سرعة / متسابق مسافات متوسطة",
          readinessLabel: "الدور",
        },
        squad: {
          label: "الفريق / المستوى",
          placeholder: "فريق الأداء النخبوي",
          readinessLabel: "الفريق",
        },
        email: {
          label: "البريد الإلكتروني",
          placeholder: "athlete@clubpulse.io",
          readinessLabel: "البريد الإلكتروني",
        },
        emergencyContact: {
          label: "جهة الاتصال للطوارئ",
          placeholder: "جوردان كارتر · ‎+44 7700 000000",
          readinessLabel: "جهة الاتصال للطوارئ",
        },
        membershipId: {
          label: "معرف العضوية",
          placeholder: "CP-2025-184",
          helperText: "يُستخدم للتحقق من الدخول ومزامنة بيانات الأجهزة القابلة للارتداء.",
          readinessLabel: "معرف العضوية",
        },
      },
      actions: {
        save: "حفظ الملف الشخصي",
        reset: "إعادة تعيين المسودة",
        delete: "حذف الملف الشخصي",
        remove: "إزالة",
        add: "إضافة",
      },
      readiness: {
        heading: "جاهزية الملف",
        completeDescription: "كل التفاصيل جاهزة.",
        incompleteDescription: "أكمل الملف لتحصل على تجربة كاملة.",
        readyMessage: "يمكنك الآن مشاركة هذا الملف مع المدربين.",
        nextField: "التالي: أضف {{field}}.",
        remaining: "أضف التفاصيل المتبقية لإكمال ملفك.",
      },
      summary: {
        heading: "لمحة العضوية",
        fallbackName: "بانتظار تفاصيل الرياضي",
        membershipIdLabel: "معرف العضوية",
        membershipIdFallback: "قيد التعيين",
        roleLabel: "الدور",
        roleFallback: "حدّد تركيز تدريبك",
        squadLabel: "الفريق",
        squadFallback: "عيّن فريقًا للحصول على تمارين مخصصة",
      },
      achievements: {
        heading: "أبرز اللحظات والإنجازات",
        description: "دوّن انتصارات الموسم لإبقاء لوحة التحفيز محدثة.",
        placeholder: "أضف إنجازًا جديدًا",
        removeAria: "إزالة الإنجاز",
        empty: "لا توجد أبرز لحظات بعد. ابدأ بالاحتفال بفوز حديث.",
      },
    },
    access: {
      heading: {
        title: "رمز QR للوصول إلى النادي",
        description:
          "احصل فورًا على بطاقة البوابة الذكية بعد حفظ ملفك الشخصي.",
        badge: "تصريح فوري",
      },
      instructions: {
        showCode: "أبرز هذا الرمز عند البوابة الذكية للدخول إلى المنشأة.",
        profileMissing: "احفظ ملفك الشخصي لإنشاء رمز QR مخصص.",
        profileRequiredBadge: "يلزم الملف الشخصي",
        squadFallback: "عيّن الفريق لتخصيص صلاحيات الوصول",
      },
      readiness: {
        heading: "جاهزية الوصول",
        percentageLabel: "{{percentage}}٪ جاهزية الوصول",
        percentageBadge: "{{percentage}}٪ جاهز",
        status: {
          setupRequired: "يلزم الإعداد",
          ready: "جاهز للدخول",
          almost: "جاهز تقريبًا",
        },
        checks: {
          profile: "تم حفظ الملف الشخصي",
          membership: "معرّف العضوية نشط",
          squad: "تم تعيين الفريق",
          contact: "تم تسجيل جهة الاتصال للطوارئ",
        },
        nextStepComplete: "تم استكمال جميع فحوصات الامتثال.",
        checkStatus: {
          ready: "جاهز",
          pending: "قيد الانتظار",
        },
      },
      quickActions: {
        heading: "إدارة الوصول",
        download: {
          label: "احفظ التصريح دون اتصال",
          description: {
            ready: "أضفه إلى محفظة جهازك للدخول في يوم المنافسة.",
            empty: "احفظ ملفك الشخصي لإنشاء تصريح قابل للتنزيل.",
          },
        },
        share: {
          label: "شارك مع الوصي",
          description: {
            ready: "أرسل رابطًا آمنًا لأولياء الأمور لتنسيق الاستلام.",
            empty: "فعّل المشاركة بعد حفظ بيانات ملفك الشخصي.",
          },
        },
        checklist: {
          label: "فحص الالتزام بالسلامة",
          description: {
            ready: "جهة الاتصال للطوارئ محفوظة — راجعها قبل أيام السفر.",
            empty: "أضف جهة اتصال للطوارئ لإكمال متطلبات الامتثال.",
          },
        },
      },
      tips: {
        title: "نصائح الوصول",
        items: [
          "يُحدَّث رمز QR تلقائيًا في كل مرة تحفظ فيها ملفك الشخصي.",
          "حافظ على سطوع الشاشة مرتفعًا لأجهزة المسح عند البوابة ب.",
          "أضف جهة الاتصال في حالات الطوارئ لاستكمال متطلبات التصريح.",
        ],
      },
      eventChecklist: {
        title: "قائمة يوم الفعالية",
        items: [
          "احضر قبل موعد بوابتك المخصص بخمس عشرة دقيقة.",
          "احمل هوية ورقية لإجراء التحقق اليدوي عند الحاجة.",
          "تأكد من أن أولياء الأمور لديهم أحدث تعليمات الاستلام.",
        ],
      },
      qr: {
        alt: "رمز QR للوصول إلى النادي",
      },
    },
    performanceTracking: {
      title: "تتبع الأداء",
      description:
        "لوحة مسودة لمراقبة التقدم التقني ومحطات الحضور والجاهزية للمنافسة.",
      technicalProgress: {
        title: "التقدم التقني",
        lastAudit: "آخر مراجعة · 12 أبريل",
        milestones: [
          {
            phase: "مرحلة الكتل",
            milestone: "زوايا الساق ضمن 45° في أول ثلاث خطوات",
            status: "تم التحقق في مراجعة فيديو 12 أبريل",
          },
          {
            phase: "التسارع",
            milestone: "الحفاظ على القوة الأفقية حتى علامة 30 م",
            status: "يحتاج إلى تذكير ثانٍ · جدولة عدو بالمزلجة",
          },
        ],
      },
      attendance: {
        title: "إجمالي الحضور",
        totalSessionsLabel_zero: "0 حصص",
        totalSessionsLabel_one: "حصة واحدة",
        totalSessionsLabel_two: "حصتان",
        totalSessionsLabel_few: "{{count}} حصص",
        totalSessionsLabel_many: "{{count}} حصة",
        totalSessionsLabel_other: "{{count}} حصة",
        summary: {
          totalSessions: 46,
          attended: 42,
          excused: 3,
          unexcused: 1,
        },
        labels: {
          attended: "حضور",
          excused: "غياب مبرر",
          unexcused: "غياب غير مبرر",
        },
      },
      trainingStatistics: {
        title: "إحصائيات التدريب",
        subtitle: "ملخص الدورة",
        items: [
          { label: "إجمالي الساعات", value: "118س", trend: "+6% مقارنة بالدورة السابقة" },
          { label: "جلسات مسجلة", value: "64", trend: "الهدف: 72 حصة" },
          { label: "مؤشر الحمل", value: "متوسط", trend: "المحافظة خلال التخفيف" },
        ],
      },
      competitionResults: {
        title: "نتائج المنافسات",
        subtitle: "أبرز أحداث الموسم",
        placementFormat: "المركز · {{placement}}",
        items: [
          {
            event: "بطولة متروبوليتان الدعوية",
            result: "400م · 49.20ث",
            placing: "برونزية",
          },
          {
            event: "بطولة الولاية داخل القاعة",
            result: "200م · 21.80ث",
            placing: "متأهل للنهائي",
          },
        ],
      },
      weightTracking: {
        title: "سجل الوزن",
        subtitle: "متابعة أسبوعية",
        entries: [
          { label: "الأسبوع 13", weight: "78.4 كجم" },
          { label: "الأسبوع 14", weight: "78.1 كجم" },
          { label: "الأسبوع 15", weight: "77.9 كجم" },
          { label: "الأسبوع 16", weight: "78.0 كجم" },
        ],
        rangeNote:
          "النطاق المستهدف 77.8 كجم – 78.4 كجم. اطلب مراجعة تغذية إذا خرج الوزن عن النطاق لأسبوعين متتاليين.",
      },
    },
    competitions: {
      heading: "تقويم البطولات",
      description: "تتبّع خطط السفر واستعد لقوائم مهام يوم السباق.",
      badge: "ذروة الموسم",
      checkIn: "تسجيل الوصول الساعة {{time}}",
      logistics: "اللوجستيات",
      cta: "موجز السفر",
      levels: {
        Regional: "إقليمي",
        National: "وطني",
        International: "دولي",
      },
    },
  },
  information: {
    academic: {
      heading: "السجل الأكاديمي",
      description:
        "تابع متطلبات الأهلية وخطة هذا الفصل الدراسي في مكان واحد.",
      creditBadge: {
        label: "تقدم الساعات",
        value: "{{current}} / {{target}} ساعة مؤكدة",
        helper: "هامش الأهلية آمن",
      },
      creditLoad: {
        heading: "ملخص حمل الساعات",
        caption:
          "تم اعتماد {{current}} من أصل {{target}} ساعة مستهدفة لهذا الفصل",
        helper:
          "لا يزال بإمكانك إضافة {{available}} ساعات اختيارية للحفاظ على الأهلية.",
      },
      creditDistribution: {
        coreSciences: {
          label: "العلوم الأساسية",
          value: "9 ساعات",
          context: "كتل الميكانيكا الحيوية والفسيولوجيا",
        },
        performanceLabs: {
          label: "مختبرات الأداء",
          value: "6 ساعات",
          context: "ساعات المختبر المسجلة أسبوعيًا",
        },
        leadershipElectives: {
          label: "القيادة والمساقات الاختيارية",
          value: "3 ساعات",
          context: "علم النفس الرياضي والإرشاد",
        },
      },
      programInsights: {
        heading: "رؤى البرنامج",
      },
      summaryInsights: {
        currentGpa: {
          label: "المعدل التراكمي الحالي",
          value: "3.82",
          context: "بزيادة 0.12 هذا الفصل",
        },
        scholarshipEligibility: {
          label: "أهلية المنحة",
          value: "مؤمّنة",
          context: "يستوفي حد 3.5 للمعدل",
        },
        graduationPath: {
          label: "مسار التخرّج",
          value: "62 / 90 ساعة",
          context: "على الجدول — تبقّى فصلان",
        },
      },
      modules: {
        credits: "{{count}} ساعة",
        focusCheckpoint: "نقطة تركيز",
        progress: "{{percent}}٪ مكتمل",
        nextEvaluationLabel: "التقييم القادم · {{date}}",
        appliedSportsPsychology: {
          title: "علم النفس الرياضي التطبيقي",
          focus: "مشروع تركيز التهيئة الذهنية",
          nextEvaluationDate: "12 مايو",
        },
        advancedBiomechanicsLab: {
          title: "مختبر الميكانيكا الحيوية المتقدم",
          focus: "تحليل المشية بالفيديو وتقرير",
          nextEvaluationDate: "28 أبريل",
        },
        performanceNutritionStrategies: {
          title: "استراتيجيات التغذية للأداء",
          focus: "تسليم بروتوكولات تغذية الفريق",
          nextEvaluationDate: "—",
        },
      },
      moduleStatuses: {
        onTrack: "ضمن المسار",
        completed: "مكتمل",
        labReportDue: "تقرير المختبر مستحق",
      },
      upcomingEvaluations: {
        heading: "التقييمات القادمة",
        helper: "خلال 30 يومًا",
        dateLabel: "مستحق في {{date}}",
        appliedSportsPsychology: {
          module: "علم النفس الرياضي التطبيقي",
          type: "تأمل منتصف الفصل",
          date: "12 مايو",
        },
        advancedBiomechanicsLab: {
          module: "مختبر الميكانيكا الحيوية المتقدم",
          type: "تسليم تقرير مختبر",
          date: "28 أبريل",
        },
        performanceNutritionStrategies: {
          module: "استراتيجيات التغذية للأداء",
          type: "ورشة عمل ختامية",
          date: "02 يونيو",
        },
      },
      checklist: {
        heading: "قائمة الأهلية",
        helper: "تتم المزامنة تلقائيًا كل يوم",
        statuses: {
          onTrack: "ضمن المسار",
          reviewNeeded: "بحاجة إلى مراجعة",
          scheduled: "مجدول",
        },
        items: {
          ncaaMinimum: {
            label: "الحفاظ على الحد الأدنى 12 ساعة لـ NCAA",
            detail: "تم تأكيد 18 ساعة مع إمكانية إضافة مقرر اختياري.",
          },
          labReport: {
            label: "تسليم تقرير مختبر الميكانيكا الحيوية",
            detail:
              "المسودة مكتملة بنسبة 60٪ — حمّلها قبل 28 أبريل لتجنب الخصم.",
          },
          advisingSession: {
            label: "جلسة إرشاد مع المدرب ريفيرا",
            detail: "موعد التخطيط المهني مؤكد في 22 أبريل.",
          },
        },
      },
      advisor: {
        heading: "إرشادات المستشار",
        helper: "آخر مزامنة في 10 أبريل",
        notes: {
          capstoneIntegration: {
            title: "دمج المشروع الختامي",
            description:
              "اربط مخرجات التغذية بالأداء مع انعكاس علم النفس الرياضي القادم لتقديم موحّد.",
            action: "دمج المواد",
          },
          scholarshipRenewal: {
            title: "تجديد المنحة",
            description:
              "المعدل فوق 3.5 بفارق مريح — أرسل مستندات التجديد بعد إعلان درجات الربيع.",
            action: "تحضير المستندات",
          },
          leadershipHours: {
            title: "ساعات القيادة",
            description:
              "سجّل آخر جلستين للإرشاد الزملائي لإكمال متطلب مادة القيادة قبل أسبوع الاختبارات.",
          },
        },
      },
    },
    billing: {
      heading: "نظرة على الفوترة",
      description:
        "راقب الرسوم المتكررة، والإضافات، والأرصدة المستحقة في لوحة واحدة.",
      balanceBadge: {
        label: "الرصيد",
        value: "{{amount}}",
      },
      summaryCards: {
        balance: {
          label: "الرصيد المستحق",
          value: "{{amount}}",
          helper: "مستحق في 25 أبريل 2025",
        },
        autopay: {
          label: "الخصم التلقائي القادم",
          value: "01 مايو 2025",
          helper: "رسوم عضوية الربيع",
        },
        lastPayment: {
          label: "آخر دفعة مستلمة",
          value: "{{amount}}",
          helper: "مُقيدة في 18 مارس 2025",
        },
      },
      invoices: {
        heading: "الفواتير",
        helper: "سجل الكشوف لآخر 6 أشهر",
        download: "تنزيل الكشف",
        sendReceipt: "إرسال إيصال",
        pending: {
          label: "فواتير قيد الانتظار",
          count_zero: "لا توجد فواتير مستحقة",
          count_one: "فاتورة واحدة مستحقة",
          count_two: "فاتورتان مستحقتان",
          count_few: "{{count}} فواتير مستحقة",
          count_many: "{{count}} فاتورة مستحقة",
          count_other: "{{count}} فاتورة مستحقة",
          total: "{{amount}} متبقية",
        },
        paid: {
          label: "مدفوع هذا الموسم",
          total: "{{amount}}",
          count_zero: "بدون فواتير مدفوعة",
          count_one: "عبر فاتورة واحدة",
          count_two: "عبر فاتورتين",
          count_few: "عبر {{count}} فواتير",
          count_many: "عبر {{count}} فاتورة",
          count_other: "عبر {{count}} فاتورة",
        },
        filters: {
          label: "عوامل التصفية",
          items: {
            all: "الكل",
            pending: "قيد الانتظار",
            paid: "مدفوع",
          },
        },
        table: {
          invoice: "الفاتورة",
          dueDate: "تاريخ الاستحقاق",
          amount: "المبلغ",
          status: "الحالة",
        },
        items: {
          springMembershipDues: {
            label: "رسوم عضوية الربيع",
            dueDate: {
              apr252025: "25 أبريل 2025",
            },
          },
          strengthLabAccess: {
            label: "الوصول إلى مختبر القوة",
            dueDate: {
              mar182025: "18 مارس 2025",
            },
          },
          travelContribution: {
            label: "مساهمة السفر · نهائيات القاعة المغلقة",
            dueDate: {
              feb022025: "02 فبراير 2025",
            },
          },
        },
        statuses: {
          pending: "قيد الانتظار",
          paid: "مدفوع",
        },
        empty:
          "لا توجد فواتير تطابق عامل التصفية المختار. جرّب حالة أخرى لمراجعة الكشوف السابقة.",
      },
      autoPay: {
        heading: "الخصم التلقائي",
        helper: "مفعل للاشتراكات الشهرية",
        manage: "إدارة",
      },
      paymentMethods: {
        primaryCard: {
          label: "طريقة الدفع الأساسية",
          detail: "فيزا •••• 4298",
          expires: "تنتهي 08/27",
          status: "الخصم التلقائي مفعّل",
        },
        backupAccount: {
          label: "طريقة الدفع الاحتياطية",
          detail: "حساب جاري · بنك فيرست بينينسولا",
          status: "يُستخدم للأرصدة المتأخرة",
        },
      },
      upcomingCharges: {
        heading: "الرسوم القادمة",
        helper: "مجدولة تلقائيًا طوال الموسم",
        items: {
          physiotherapyBlock: {
            label: "حزمة العلاج الطبيعي للفريق",
            date: {
              may082025: "08 مايو 2025",
            },
          },
          facilityLevy: {
            label: "رسم تطوير المرافق",
            date: {
              jun122025: "12 يونيو 2025",
            },
          },
          summerTravelFund: {
            label: "صندوق سفر الصيف",
            date: {
              jul012025: "01 يوليو 2025",
            },
          },
        },
      },
    },
    trainingAttendance: {
      heading: "الحضور التدريبي",
      description:
        "نظرة أسبوعية على تسجيلات الدخول المؤكدة وأبرز ملاحظات الطاقم.",
      seasonRate: {
        label: "نسبة الموسم",
        value: "{{percent}}٪",
      },
      rateDelta: "{{value}}٪ مقارنة بالكتلة السابقة",
      byWeek: {
        heading: "الحضور حسب الأسبوع",
        summary: "حُضر {{attended}} من أصل {{planned}} جلسة",
        peak: "أفضل أسبوع: {{label}} · {{highlight}}",
        focus: "أسبوع التركيز: {{label}} · {{highlight}}",
        weeklyAttendance: "{{percent}}٪ حضور",
        sessions: "{{attended}} من أصل {{planned}} جلسات · {{highlight}}",
        items: {
          week14: {
            label: "الأسبوع 14",
            highlight: "حضور كامل",
          },
          week15: {
            label: "الأسبوع 15",
            highlight: "تم تفويت حصة القوة · تأخر الرحلة",
          },
          week16: {
            label: "الأسبوع 16",
            highlight: "كتلة تعافٍ · إخلاء من أخصائي العلاج الطبيعي",
          },
        },
      },
      insights: {
        consistencyStreak: {
          label: "سلسلة الالتزام",
          value: "6 حصص",
          detail: "لا غيابات منذ 2 أبريل · رقم شخصي جديد",
        },
        availabilityForms: {
          label: "نماذج التوفر",
          value: "3 معلّقة",
          detail: "تأكيدات فريق السفر مطلوبة قبل الجمعة",
        },
        readinessIndex: {
          label: "مؤشر الجهوزية",
          value: "92٪",
          detail: "تعليقات المدرب وموافقة العلاج الطبيعي في تصاعد",
        },
      },
      upcoming: {
        heading: "عمليات التحقق القادمة",
      },
      followUp: {
        heading: "إجراءات المتابعة",
        helper: "أولويات تسجيل الحضور هذا الأسبوع",
        actions: {
          pending: {
            label: "تأكيد الوصولات للسفر",
            detail_zero: "لا أحد ينتظر تأكيد مكتب السفر.",
            detail_one:
              "لاعب واحد ينتظر تأكيد مكتب السفر وتوجيه الموقع.",
            detail_two:
              "لاعبان ينتظران تأكيد مكتب السفر وتوجيه الموقع.",
            detail_few:
              "{{count}} لاعبين ينتظرون تأكيد مكتب السفر وتوجيه الموقع.",
            detail_many:
              "{{count}} لاعبًا ينتظرون تأكيد مكتب السفر وتوجيه الموقع.",
            detail_other:
              "{{count}} لاعب ينتظر تأكيد مكتب السفر وتوجيه الموقع.",
            emphasis_zero:
              "لا حاجة لإرسال تذكيرات هذا الأسبوع.",
            emphasis_one:
              "أرسل تذكيرًا قبل اجتماع الخدمات اللوجستية ظهر الخميس.",
            emphasis_two:
              "أرسل تذكيرًا قبل اجتماع الخدمات اللوجستية ظهر الخميس.",
            emphasis_few:
              "أرسل تذكيرات قبل اجتماع الخدمات اللوجستية ظهر الخميس.",
            emphasis_many:
              "أرسل تذكيرًا قبل اجتماع الخدمات اللوجستية ظهر الخميس.",
            emphasis_other:
              "أرسل تذكيرًا قبل اجتماع الخدمات اللوجستية ظهر الخميس.",
          },
          medical: {
            label: "تنسيق المراجعات الطبية",
            detail_zero: "لا توجد ملفات طبية معلّقة.",
            detail_one:
              "لاعب واحد بحاجة إلى تحديث جدول العودة من الإيقاف الطبي.",
            detail_two:
              "لاعبان بحاجة إلى تحديث جدول العودة من الإيقاف الطبي.",
            detail_few:
              "{{count}} لاعبين بحاجة إلى تحديث جدول العودة من الإيقاف الطبي.",
            detail_many:
              "{{count}} لاعبًا بحاجة إلى تحديث جدول العودة من الإيقاف الطبي.",
            detail_other:
              "{{count}} لاعب بحاجة إلى تحديث جدول العودة من الإيقاف الطبي.",
            emphasis_zero:
              "لا حاجة لمزامنة إضافية مع الطاقم الطبي.",
            emphasis_one:
              "زامن ملاحظات العلاج الطبيعي مع الجهاز الفني قبل خطة الجمعة.",
            emphasis_two:
              "زامن ملاحظات العلاج الطبيعي مع الجهاز الفني قبل خطة الجمعة.",
            emphasis_few:
              "زامن ملاحظات العلاج الطبيعي مع الجهاز الفني قبل خطة الجمعة.",
            emphasis_many:
              "زامن ملاحظات العلاج الطبيعي مع الجهاز الفني قبل خطة الجمعة.",
            emphasis_other:
              "زامن ملاحظات العلاج الطبيعي مع الجهاز الفني قبل خطة الجمعة.",
          },
        },
      },
      sessions: {
        ts1: {
          focus:
            "اختبار السرعة أثناء مجموعات القوة — عيّن أجهزة التسجيل قرب الرفوف.",
          emphasis:
            "يفتح استبيان العافية قبل 30 دقيقة؛ سجّل RPE بعد كل كتلة.",
        },
        ts2: {
          focus:
            "جلسة ضبط لفريق السفر مع بروتوكولات مرونة فردية عند الوصول.",
          emphasis:
            "تأكد من تسجيل فحوصات الترطيب قبل لفة الإحماء الرئيسية.",
        },
        ts3: {
          focus:
            "تحليل بالفيديو في غرفة الاجتماعات مع أزواج المراكز وجلسات القيادة.",
          emphasis:
            "وزّع رابط تسجيل الدخول عن بُعد للاعبين ذوي الخطط المعدّلة.",
        },
      },
      teamStatus: {
        heading: "حالة تسجيل الفريق",
        helper: "جاهزية التشكيلة المباشرة",
      },
      statuses: {
        confirmed: {
          label: "مؤكد",
          count_zero: "لا لاعب مؤكد",
          count_one: "لاعب واحد مؤكد",
          count_two: "لاعبان مؤكدان",
          count_few: "{{count}} لاعبين مؤكدين",
          count_many: "{{count}} لاعبًا مؤكدًا",
          count_other: "{{count}} لاعب مؤكد",
        },
        pending: {
          label: "معلق",
          count_zero: "لا لاعب معلق",
          count_one: "لاعب واحد معلق",
          count_two: "لاعبان معلقان",
          count_few: "{{count}} لاعبين معلقين",
          count_many: "{{count}} لاعبًا معلقًا",
          count_other: "{{count}} لاعب معلق",
        },
        medicalHold: {
          label: "إيقاف طبي",
          count_zero: "لا لاعب تحت الإيقاف الطبي",
          count_one: "لاعب واحد تحت الإيقاف الطبي",
          count_two: "لاعبان تحت الإيقاف الطبي",
          count_few: "{{count}} لاعبين تحت الإيقاف الطبي",
          count_many: "{{count}} لاعبًا تحت الإيقاف الطبي",
          count_other: "{{count}} لاعب تحت الإيقاف الطبي",
        },
        percent: "{{percent}}٪ من التشكيلة",
      },
      roster: {
        names: {
          linaReyes: "لينا رييس",
          noahPetrov: "نواه بيتروف",
          aishaKato: "عائشة كاتو",
          jonahHill: "جونا هيل",
        },
        roles: {
          linaReyes: "400 متر حواجز",
          noahPetrov: "800 متر",
          aishaKato: "العداءة الأخيرة للتتابع",
          jonahHill: "دفع الجلة",
        },
        notes: {
          linaReyes: "تم تسجيل الحضور عبر التطبيق · 18:05",
          noahPetrov: "تصل الرحلة 14:20 · يحتاج إلى موجز إحماء عن بُعد",
          aishaKato: "إتمام اختبار العودة للركض السريع لدى العلاج الطبيعي الخميس",
          jonahHill: "تم نقل حصة القوة إلى 07:30 مع هوغو",
        },
      },
    },
  },
};
