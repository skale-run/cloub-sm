export const ar = {
  translation: {
    common: {
      languageSwitcher: {
        label: "اختر اللغة",
        languages: {
          en: "English",
          ar: "العربية",
          fr: "الفرنسية",
        },
      },
      navigation: {
        open: "فتح التنقّل",
        close: "إغلاق التنقّل",
        collapse: "طيّ قائمة التنقّل",
        expand: "توسيع قائمة التنقّل",
        primary: "التنقّل الرئيسي",
      },
    },
    app: {
      pageTitles: {
        landing: "مرحبًا بك في Wydad Taekwondo",
        calendar: "تقويم التدريب والبطولات",
        academicRecord: "السجل الأكاديمي",
        billing: "الفوترة",
        trainingAttendance: "الحضور في الدوجان",
        coachEvaluation: "تقييم الماستر",
        progressOverview: "نظرة عامة على التقدّم",
        performanceTracking: "تتبّع أداء التايكواندو",
        profile: "ملف الممارس",
        access: "إدارة الوصول",
        overview: "نظرة عامة",
      },
      statusMessages: {
        completeRequired:
          "يرجى إكمال الاسم الكامل ورقم العضوية على الأقل قبل الحفظ.",
        saved: "تم حفظ الملف. تم تحديث رمز QR بأحدث التفاصيل.",
        reverted: "تمت استعادة المسودة إلى آخر ملف محفوظ.",
        cleared: "تم مسح مسودة الملف.",
        deleted: "تم حذف الملف. أنشئ ملفًا جديدًا لإنشاء رمز QR.",
      },
      defaults: {
        teamMember: "ممارس تايكواندو",
      },
    },
    header: {
      aria: {
        toggleNavigation: {
          open: "فتح التنقّل",
          close: "إغلاق التنقّل",
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
        badge: "بوابة رياضيّي التايكواندو",
        modes: {
          login: "تسجيل الدخول",
          register: "إنشاء حساب",
        },
        copy: {
          login: {
            heading: "سجّل الدخول إلى مقر الدوجان الخاص بك",
            description:
              "عد إلى مركز قيادة التايكواندو الخاص بك ونسّق مع تركيز اليوم.",
            cta: "تسجيل الدخول",
          },
          register: {
            heading: "فعّل جواز التايكواندو الخاص بك",
            description:
              "أنشئ بيانات اعتمادك لفتح جلسات بومسي مخصّصة ودعم الفريق.",
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
          forgotPassword:
            "هل نسيت كلمة المرور؟ تواصل مع الماستر أو المشرف لإعادة ضبط الوصول.",
        },
        registerForm: {
          profilePhoto: {
            label: "صورة الملف الشخصي",
            dropLabel: "اسحب وأفلت صورة الممارس هنا",
            helpText: "ملف PNG أو JPG حتى 5 ميغابايت، أو انقر للاستعراض.",
            uploadButton: "تحميل صورة",
            changeButton: "تغيير الصورة",
            removeButton: "إزالة الصورة",
            previewAlt: "معاينة صورة الملف المختارة",
          },
          fullName: {
            label: "الاسم الكامل",
            placeholder: "Jordan Adebayo",
          },
          role: {
            label: "الدور",
            placeholder: "رياضي",
          },
          squadTier: {
            label: "الفريق / المستوى",
            placeholder: "فريق السبارينغ النخبوي",
          },
          email: {
            label: "البريد الإلكتروني",
            placeholder: "you@club.com",
          },
          emergencyContact: {
            label: "جهة الاتصال للطوارئ",
            placeholder: "+212 676 005 071",
          },
          membershipId: {
            label: "رقم العضوية",
            placeholder: "CP-E43-K4",
          },
          password: {
            label: "كلمة المرور",
            placeholder: "أنشئ عبارة مرور آمنة",
          },
          disclaimer:
            "بإنشائك حسابًا، فإنك تقبل ميثاق الدوجان وتوافق على تتبّع الأداء.",
        },
        highlights: {
          heading: "لماذا يحبها الرياضيون",
          items: {
            eliteTraining: {
              title: "مخططات تدريب الدوجو",
              description:
                "افتح كتل السبارينغ والبومسي الأسبوعية المُعدّة من قِبل الماستر حسب رحلة حزامك.",
            },
            performanceIntelligence: {
              title: "ذكاء الأداء",
              description:
                "تتبّع سرعة الركلة والتعافي وجاهزية الحلبة مع رؤى تكيفية.",
            },
            communityRecognition: {
              title: "تقدير المجتمع",
              description:
                "شارك إنجازات الأحزمة، واحصل على شارات البطولات، وتقدّم في لوحة المتصدرين.",
            },
            supportCrew: {
              title: "ركن الدعم الشامل",
              description:
                "نسّق مع الماسترز، وأخصائيي العلاج الفيزيائي، والمرشدين من مركز واحد.",
            },
          },
        },
        support: {
          heading: "هل تحتاج مساعدة للبدء؟",
          intro: "أرسل رسالة إلى",
          outro: "أو تواصل مع فريق التدريب في قناة السكواد.",
        },
        status: {
          network: "تعذّر الوصول إلى الخادم. حاول مرة أخرى بعد لحظات.",
          generic: "حدث خطأ غير متوقع. يرجى المحاولة من جديد.",
          login: {
            success: "مرحبًا بعودتك! تم تسجيل دخولك.",
            invalid: "لم نعثر على حساب يطابق هذا البريد الإلكتروني وكلمة المرور.",
          },
          register: {
            success: "تم إنشاء الحساب. يمكنك تسجيل الدخول ببياناتك الجديدة.",
            duplicate: "يوجد حساب مسجّل بهذا البريد الإلكتروني بالفعل.",
          },
        },
      },
    },
    sidebar: {
      brand: {
        name: "Wydad Taekwondo",
        label: "لوحة التحكّم",
      },
      sections: [
        {
          heading: "التقويم",
          items: [
            {
              to: "/calendar",
              label: "تقويم الموسم",
              description: "راجع البطولات وجلسات الدوجان الأساسية",
            },
          ],
        },
        {
          heading: "المعلومات",
          items: [
            {
              to: "/academic-record",
              label: "السجل الأكاديمي",
              description: "راقب أهلية المقررات",
            },
            {
              to: "/billing",
              label: "نظرة عامة على الفوترة",
              description: "تتبّع الفواتير والمدفوعات",
            },
            {
              to: "/training-attendance",
              label: "حضور التدريب",
              description: "اطّلع على تسجيلات الدخول أسبوعيًا",
            },
          ],
        },
        {
          heading: "التقييمات",
          items: [
            {
              to: "/coach-evaluation",
              label: "تقييم الماستر",
              description: "أحدث ملاحظات الماستر",
            },
            {
              to: "/progress-overview",
              label: "رؤى التقدّم",
              description: "اتجاهات النمو وتنبيهات الأحزمة",
            },
          ],
        },
        {
          heading: "تتبّع الأداء",
          items: [
            {
              to: "/performance-tracking",
              label: "لوحة أداء",
              description: "المعالم التقنية وحِمْل السبارينغ",
            },
          ],
        },
        {
          heading: "الملف والوصول",
          items: [
            {
              to: "/profile",
              label: "ملف التايكواندو",
              description: "إدارة هوية الممارس",
            },
            {
              to: "/access",
              label: "وصول الدوجان",
              description: "شارك رمز العضوية QR",
            },
          ],
        },
      ],
      readinessHeading: "جاهزية اليوم",
      readinessHighlights: [
        { label: "الجاهزية", value: "٪82 · جاهز" },
        { label: "درجة النوم", value: "7س 10د" },
        { label: "الترطيب", value: "على المسار" },
      ],
      seasonSummary: {
        line1: "موسم 2025 · فريق دان النخبوي",
        line2: "يوم الراحة التالي: الأحد، 20 أبريل",
      },
    },
    calendar: {
      title: "تقويم الدوجان الموحّد",
      description:
        "بدّل بين العرض الشهري والأسبوعي واليومي لتنسيق كل حصة وندوة ووقت حلبة.",
      viewOptions: {
        month: "شهر",
        week: "أسبوع",
        day: "يوم",
      },
      workload: {
        heading: "لمحة الحمل",
        summary_zero: "لا التزامات قادمة للسكواد",
        summary_one: "التزام سكواد واحد قادم",
        summary_other: "{{count}} من التزامات السكواد القادمة",
        description:
          "تتبّع كيف تتراكم كتل التدريب ووقت البطولات وفق مرشّحات التركيز المحددة.",
        metrics: {
          all: {
            label: "جميع الأحداث",
            sublabel: "المدة المجمّعة",
          },
          training: {
            label: "جلسات الدوجو",
            sublabel: "وقت الحصير الفعّال",
          },
          competition: {
            label: "أيام البطولات",
            sublabel: "السفر ونوافذ الحلبة",
          },
        },
      },
      upcoming: {
        heading: "القادم على الجدول",
        empty: "لا توجد أحداث مرئية",
        fallback:
          "عدّل مرشّحات التركيز لإظهار الحصة أو الترقية أو البطولة التالية على الجدول المشترك.",
        coach: "الماستر القائد: {{name}}",
        competitionDetails: "بطولة مستوى {{level}} · تسجيل الحلبة عند {{time}}",
      },
      filters: {
        heading: "مرشّحات التركيز",
        title: "أبرز اللحظات المهمة",
        description:
          "بدّل الفئات للتركيز على التحضير للحصص القادمة أو تنفيذ البطولات.",
        status: {
          all: "كلتا الفئتين مرئيتان.",
          single:
            "فئة واحدة فعّالة—انقر مرة أخرى لإرجاع الجدول كاملًا.",
          none: "لا توجد فئات محددة—فعّل واحدة لعرض الجدول.",
        },
      },
      categories: {
        training: {
          label: "جلسات الدوجو",
          description:
            "بومسي تقني، جولات السبارينغ، ونقاط القوة والتهيئة.",
          shortLabel: "تدريب",
          badge: "جلسة دوجو",
        },
        competition: {
          label: "أيام البطولات",
          description:
            "لوجستيات السفر، الوزن، وجداول المنافسات.",
          shortLabel: "بطولة",
          badge: "يوم بطولة",
        },
      },
      states: {
        noEventsFiltered:
          "لا توجد أحداث مطابقة لمرشّحات التركيز الحالية. أعد تفعيل فئة أو عدّل اختيارك لعرض جدول الفريق.",
        noDaySelected: "لم يتم اختيار يوم",
        noScheduled: "لا توجد أحداث مجدولة",
        noScheduledDay: "لا نشاط مجدول في هذا التاريخ.",
      },
      monthView: {
        eventsCount_zero: "لا أحداث",
        eventsCount_one: "حدث واحد",
        eventsCount_other: "{{count}} أحداث",
      },
      weekView: {
        weekLabel: "أسبوع {{start}}",
        scheduledEvents_zero: "لا أحداث مجدولة",
        scheduledEvents_one: "حدث مجدول واحد",
        scheduledEvents_other: "{{count}} أحداث مجدولة",
        today: "اليوم",
      },
      dayView: {
        headerDescription:
          "كل الحصص والندوات وواجبات البطولة لهذا التاريخ.",
        eventCount_zero: "لا أحداث",
        eventCount_one: "حدث واحد",
        eventCount_other: "{{count}} أحداث",
        coachLabel: "الماستر القائد · {{name}}",
        checkIn: "تسجيل الحلبة عند {{time}}",
      },
      relativeDay: {
        inDays_one: "خلال يوم",
        inDays_other: "خلال {{count}} أيام",
        tomorrow: "غدًا",
        today: "اليوم",
        yesterday: "أمس",
        daysAgo_one: "قبل يوم",
        daysAgo_other: "قبل {{count}} أيام",
      },
      duration: {
        none: "0س",
        hours_one: "{{count}}س",
        hours_other: "{{count}}س",
        minutes_one: "{{count}}د",
        minutes_other: "{{count}}د",
      },
      levels: {
        regional: "إقليمي",
        national: "وطني",
        international: "دولي",
      },
      events: {
        ts1: {
          title: "ركلات انفجارية وبلايومتريكس",
          location: "استوديو الدوجان 2",
          coach: "الماستر أمارا لويس",
        },
        ts2: {
          title: "سبارينغ تقني وحركة",
          location: "الدوجان الرئيسي",
          coach: "الماستر هوجو مارتين",
        },
        ts3: {
          title: "مراجعة فيديو ومختبر الاستراتيجية",
          location: "قاعة الإحاطة HQ",
          coach: "فريق التحليل",
        },
        cc1: {
          title: "بطولة التايكواندو الحضرية المفتوحة",
          location: "صالة نيو كريست",
        },
        cc2: {
          title: "تجارب المنتخب الوطنية الصيفية",
          location: "قاعة كابيتال سيتي",
        },
        cc3: {
          title: "الجائزة الكبرى القارية",
          location: "حديقة فنون القتال لشبونة",
        },
      },
    },
    training: {
      title: "تقويم جلسات الدوجو",
      description: "ابقَ متوافقًا مع الفريق وأكّد توافرك مبكرًا.",
      weekLabel: "الأسبوع {{week}}",
      lead: "القائد · {{coach}}",
      confirmAvailability: "تأكيد التوافر",
    },
    coachEvaluation: {
      heading: "تقييم الماستر",
      description: "لقطة من اجتماع كل أسبوعين مع طاقم التدريب.",
      overallLabel: "الإجمالي",
      focusLabel: "تركيز المراجعة القادمة",
      addNote: "إضافة ملاحظة الماستر",
      summary: {
        focusStatement:
          "تحسين دقّة ركلة الكعب الدوّارة قبل بطولات مايو الوطنية.",
        leadCoach: {
          label: "الماستر الرئيسي",
          value: "الماستر أمارا لويس",
        },
        lastReview: {
          label: "آخر مراجعة",
          value: "18 أبريل 2024",
        },
        nextTouchpoint: {
          label: "نقطة المتابعة التالية",
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
            title: "دقة البومسي",
            detail:
              "ارتفاع الدقة 4٪ بعد تمارين المرآة · حافظ على تكرارين أسبوعيًا لنماذج الحركات.",
          },
          {
            title: "بروفة الحلبة",
            detail:
              "ثقة عالية بعد بطولة تجريبية · ضبط التصوّر قبل النزال.",
          },
        ],
      },
      watchList: {
        heading: "مراقبة عن كثب",
        items: [
          {
            title: "انضباط الحراسة",
            detail:
              "انخفاض الحراسة أثناء الكاونتر كومبو · أضِف إشارة تنفّس بين الجولات.",
          },
          {
            title: "كتلة التعافي",
            detail:
              "انخفضت جودة النوم خلال أسبوع السفر · نسّق تفريغ العلاج الفيزيائي مع يوم تقني خفيف.",
          },
        ],
      },
      accountability: {
        heading: "لوحة المساءلة",
        updatedLabel: "يُحدّث أسبوعيًا",
        ownerPrefix: "المالك · {{owner}}",
        dueLabel: "مستحق {{date}}",
        items: [
          {
            title: "مراجعة توقيت السبارينغ",
            owner: "الماستر لويس",
            due: "26 أبريل",
            status: "مجدول",
          },
          {
            title: "تفكيك فيديو: ميكانيكا الركلة المضادّة",
            owner: "الرياضي",
            due: "24 أبريل",
            status: "قيد التنفيذ",
          },
          {
            title: "متابعة متعقّب الترطيب",
            owner: "طاقم الأداء",
            due: "أسبوعي",
            status: "على المسار",
          },
        ],
      },
      competencySnapshot: {
        heading: "لقطة الكفاءات",
        scores: [
          {
            label: "الركل الانفجاري",
            score: 4.5,
            note: "تنفيذ أسرع بعد تركيز البلايومتريكس · حافظ على رميات الكرة الطبية",
          },
          {
            label: "تحمّل الحلبة",
            score: 4.2,
            note: "حافظ على الشكل في نهاية الجولة الثالثة · أضِف سبارينغ متقطّع",
          },
          {
            label: "تكتيكات الحلبة",
            score: 4.0,
            note: "واصل الإحاطات بالفيديو · حسّن التموضع عند الزاوية",
          },
          {
            label: "عادات التعافي",
            score: 3.8,
            note: "تحسّن الاتساق · سجّل الترطيب يوميًا",
          },
        ],
      },
    },
    progressOverview: {
      heading: "رؤى التقدّم",
      description:
        "التقدّم منذ بداية الربع نحو أهداف أداء الموسم.",
      statusChip: "متقدّم على الخطة",
      summaryMetrics: [
        {
          label: "تقييم الربع",
          value: "82",
          suffix: "/100",
          change: "+5.4",
          changeDescriptor: "مقارنة بالربع الماضي",
        },
        {
          label: "فجوة الهدف",
          value: "+3.1%",
          change: "متقدّم",
          changeDescriptor: "عن هدف الأداء",
        },
        {
          label: "الجلسات المنجزة",
          value: "47",
          change: "92%",
          changeDescriptor: "التزام تدريبي",
        },
        {
          label: "درجة التعافي",
          value: "86",
          suffix: "/100",
          change: "+6",
          changeDescriptor: "كفاءة النوم",
        },
      ],
      performanceTrend: {
        heading: "اتجاه الأداء",
        subheading: "تقييم الموسم · يُحدّث أسبوعيًا",
        chip: "علامات الهدف تُظهر أهداف الربع",
        pointSummary: "{{performance}}٪ أداء · {{target}}٪ هدف",
        points: [
          { label: "يناير", performance: 72, target: 70 },
          { label: "فبراير", performance: 75, target: 72 },
          { label: "مارس", performance: 78, target: 75 },
          { label: "أبريل", performance: 82, target: 78 },
        ],
        summary:
          "تحسّن مستمر عبر آخر أربع ميكروسايكل يُبقي الفريق متقدّمًا على التوقّعات. حافظ على كثافة الحصص، وواصل تتبّع النوم، وأعِد فحص الجاهزية في حصص الاثنين.",
        focus: {
          label: "تركيز الأسبوع القادم",
          detail:
            "صقْل دخول الركلات الدوّارة في حصص الثلاثاء والجمعة التقنية.",
        },
      },
      momentumWatch: {
        heading: "مراقبة الزخم",
        items: [
          { title: "ركلات السرعة", detail: "حافظ على تسلسل الباد المتباين مرتين أسبوعيًا." },
          { title: "كتلة القوة", detail: "حوّل عمل الجزء السفلي إلى أحمال عالية السرعة." },
          { title: "التعافي", detail: "احمِ الخميس كيوم تعافٍ ومراقبة كامل." },
        ],
      },
      coachAlerts: {
        heading: "تنبيهات الماستر",
        items: [
          {
            title: "توقيت الكومبو",
            detail:
              "تحسّن متوسط نافذة الكاونتر بمقدار 0.3 ث · استمر في كتلة الباد المقاومة.",
          },
          {
            title: "تقدّم القوة",
            detail:
              "سكوات خلفي 1.8× وزن الجسم · حافظ على تموّج 3 أسابيع.",
          },
        ],
      },
    },
    landing: {
      badge: "إدارة تايكواندو سحابية",
      heroTitle: "وحّد دوجانك وامنح كل لاعب دفعة",
      heroDescription:
        "توفر Cloub للماسترز والممارسين والمنسّقين مركزًا موحّدًا لجدولة الحصص وتقييم الأحزمة والتحضير للبطولات. قوِّ برنامجك برؤى تُبقي كل فريق حلبة متناغمًا.",
      ctas: {
        primary: "إنشاء حساب",
        secondary: "تسجيل الدخول",
        tertiary: "تواصل معنا",
      },
      features: [
        {
          title: "تخطيط حصص متكامل",
          description:
            "نظّم البومسي والسبارينغ والتهيئة مع تذكيرات تلقائية تبقي كل فئة أحزمة على اطلاع.",
        },
        {
          title: "ذكاء الأداء",
          description:
            "تصوّر تقدّم الممارس بلوحات تجمع الحضور ودرجات التقنية وملاحظات التقييم.",
        },
        {
          title: "وصول آمن للجميع",
          description:
            "أذونات قائمة على الأدوار تمنح الماسترز والرياضيين والأولياء رؤية مناسبة مع حماية البيانات الحساسة.",
        },
      ],
      experience: {
        title: "قدّم تجربة دوجان عالمية",
        description:
          "اترك الجداول المتفرّقة واعتمد سير عمل حديثًا للدوجان بأكمله. تعمل Cloub على تبسيط التسجيل والتواصل وتحليل المنافسة كي تركز على إتقان التايكواندو.",
        bullets: [
          "لوحات شخصية للماسترز تضم التمارين واتجاهات الحضور وتنبيهات الممارسين في مكان واحد.",
          "بوابة ذاتية الخدمة للرياضي مع أهداف الأحزمة ونقاط الاختبار وتخزين مستندات آمن.",
          "الفوترة والتنبيهات التلقائية تقلّل العمل اليدوي وتُبقي كل عائلة في الصورة.",
        ],
        stats: {
          label: "موثوق بها من الدوجانات",
          value: "650+",
          description:
            "برنامجًا لفنون القتال ينسّق مواسمه مع Cloub لرفع جودة التدريب وتقليل الأعباء الإدارية.",
        },
      },
      contact: {
        title: "تحدّث إلى فريقنا",
        description:
          "جاهز لتحديث دوجانك؟ شاركنا أهدافك وسنخصّص جولة تتماشى مع جدول اختبارات الأحزمة.",
        email: "hello@cloub.co",
        schedule: "احجز مكالمة تعريفية: الإثنين–الجمعة · 9ص–6م PT",
      },
      footer: {
        copyright:
          "© {{year}} Cloub Sports Management. جميع الحقوق محفوظة.",
        links: {
          privacy: "الخصوصية",
          terms: "الشروط",
          support: "الدعم",
        },
      },
    },
    profile: {
      heading: {
        title: "ملفي في التايكواندو",
        description:
          "أبقِ بياناتك محدّثة لفتح تمارين مخصّصة وإمكانية الوصول.",
        badge: "إدارة وتحديث",
      },
      photo: {
        title: "صورة الملف",
        description: "اسحب صورة واضحة للوجه أو اختر للرفع.",
        uploadedAlt: "صورة الممارس المرفوعة",
        uploaded: {
          hint: "أسقط صورة جديدة أو اضغط Enter لاستبدال صورتك.",
          note: "PNG أو JPG حتى 5MB.",
        },
        empty: {
          heading: "اسحب وأفلِت صورة الممارس هنا",
          note: "PNG أو JPG حتى 5MB، أو انقر للتصفح.",
        },
        errors: {
          invalidType: "يرجى رفع ملف صورة.",
          fileTooLarge: "يرجى اختيار صورة أصغر من {{size}}MB.",
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
          placeholder: "مقاتل / مختص بومسي",
          readinessLabel: "دورًا",
        },
        squad: {
          label: "السكواد / المستوى",
          placeholder: "فريق دان النخبوي",
          readinessLabel: "تعيين سكواد",
        },
        email: {
          label: "البريد الإلكتروني",
          placeholder: "practitioner@dojang.io",
          readinessLabel: "بريدًا إلكترونيًا",
        },
        emergencyContact: {
          label: "جهة اتصال للطوارئ",
          placeholder: "جوردان كارتر · +44 7700 000000",
          readinessLabel: "جهة اتصال للطوارئ",
        },
        membershipId: {
          label: "رقم العضوية",
          placeholder: "CP-2025-184",
          helperText: "يُستخدم للتحقق من اختبارات الأحزمة ودخول المرفق.",
          readinessLabel: "رقم العضوية",
        },
      },
      actions: {
        save: "حفظ الملف",
        reset: "إعادة ضبط المسودة",
        delete: "حذف الملف",
        remove: "إزالة",
        add: "إضافة",
      },
      readiness: {
        heading: "جاهزية الملف",
        completeDescription: "كل التفاصيل جاهزة.",
        incompleteDescription: "أكمل الملف لفتح التجربة الكاملة.",
        readyMessage: "أنت جاهز لمشاركة هذا الملف مع الماسترز.",
        nextField: "التالي: أضف {{field}}.",
        remaining: "أضف التفاصيل المتبقية لإنهاء ملفك.",
      },
      summary: {
        heading: "ملخص العضوية",
        fallbackName: "بانتظار تفاصيل الممارس",
        membershipIdLabel: "رقم العضوية",
        membershipIdFallback: "قيد التعيين",
        roleLabel: "الدور",
        roleFallback: "حدّد تركيز تدريبك",
        squadLabel: "السكواد",
        squadFallback: "خصّص فريق الحلبة لتمارين موجهة",
      },
      achievements: {
        heading: "أبرز الإنجازات",
        description:
          "سجّل اختبارات الأحزمة وانتصارات البطولات لإبقاء لوحة التحفيز محدثة.",
        placeholder: "أضف إنجازًا جديدًا",
        removeAria: "إزالة الإنجاز",
        empty:
          "لا توجد إنجازات بعد. ابدأ بالاحتفال بفوز حديث في السبارينغ أو البومسي.",
      },
    },
    access: {
      heading: {
        title: "رمز QR للوصول إلى الدوجان",
        description:
          "احصل فورًا على بطاقة الدخول الذكية بمجرد حفظ ملفك.",
        badge: "تصريح فوري",
      },
      instructions: {
        showCode: "اعرض هذا الرمز عند البوابة الذكية لدخول المرفق.",
        profileMissing:
          "احفظ ملفك لإنشاء رمز QR مخصّص.",
        profileRequiredBadge: "الملف مطلوب",
        squadFallback: "عيّن سكواد لتخصيص الوصول",
      },
      readiness: {
        heading: "جاهزية الوصول",
        percentageLabel: "{{percentage}}٪ جاهزية الوصول",
        percentageBadge: "{{percentage}}٪ جاهز",
        status: {
          setupRequired: "يلزم الإعداد",
          ready: "جاهز للدخول",
          almost: "على وشك الجاهزية",
        },
        checks: {
          profile: "تم حفظ الملف",
          membership: "رقم العضوية فعّال",
          squad: "تم تعيين السكواد",
          contact: "تم تسجيل جهة اتصال للطوارئ",
        },
        nextStepComplete: "تم استكمال جميع فحوصات الالتزام.",
        checkStatus: {
          ready: "جاهز",
          pending: "قيد الانتظار",
        },
      },
      quickActions: {
        heading: "إدارة الوصول",
        download: {
          label: "حفظ بطاقة بدون اتصال",
          description: {
            ready: "أضِفها إلى محفظة جهازك للدخول يوم الحلبة.",
            empty: "احفظ ملفك لإنشاء بطاقة قابلة للتنزيل.",
          },
        },
        share: {
          label: "المشاركة مع الولي",
          description: {
            ready: "أرسِل رابطًا آمنًا للوالدين لتنسيق الاستلام.",
            empty: "يُتاح المشاركة بعد حفظ تفاصيل ملفك.",
          },
        },
        checklist: {
          label: "فحص السلامة والامتثال",
          description: {
            ready: "جهة اتصال للطوارئ مسجلة — راجع قبل أيام السفر.",
            empty: "أضِف جهة اتصال للطوارئ لإكمال الامتثال.",
          },
        },
      },
      tips: {
        title: "نصائح الوصول",
        items: [
          "يُحدّث رمز QR تلقائيًا في كل مرة تحفظ فيها ملفك.",
          "ارفع سطوع الشاشة من أجل الماسحات عند مدخل الدوجان.",
          "أضِف جهة اتصال للطوارئ لاعتماد البطولات.",
        ],
      },
      eventChecklist: {
        title: "قائمة يوم البطولة",
        items: [
          "احضر قبل 15 دقيقة من وقت نداء الحلبة.",
          "احمل هوية شخصية وبطاقة كوكيوون للتحقق اليدوي عند الحاجة.",
          "تأكد من حصول الأولياء على آخر تعليمات الاستلام.",
        ],
      },
      qr: {
        alt: "رمز QR للوصول إلى الدوجان",
      },
    },
    performanceTracking: {
      title: "تتبّع أداء التايكواندو",
      description:
        "مسودة لوحة لقياس الدقة التقنية، والحضور في الدوجان، وجاهزية الحلبة.",
      technicalProgress: {
        title: "التقدّم التقني",
        lastAudit: "آخر تدقيق · 12 أبريل",
        milestones: [
          {
            phase: "بومسي",
            milestone:
              "تقييم تايجوك 5 بدقة 92٪ في مراجعة داخلية",
            status: "تم التحقق خلال تحليل فيديو 12 أبريل",
          },
          {
            phase: "كيوروغي",
            milestone:
              "الحفاظ على كومبو ركلات ثلاثي تحت 10 ثوانٍ",
            status:
              "يحتاج إشارة ثانية · جدولة سبارينغ عالي الكثافة",
          },
        ],
      },
      attendance: {
        title: "إجمالي حضور الدوجان",
        totalSessionsLabel_one: "جلسة واحدة",
        totalSessionsLabel_other: "{{count}} جلسات",
        summary: {
          totalSessions: 46,
          attended: 42,
          excused: 3,
          unexcused: 1,
        },
        labels: {
          attended: "حضر",
          excused: "معذور",
          unexcused: "غير معذور",
        },
      },
      trainingStatistics: {
        title: "إحصاءات التدريب",
        subtitle: "ملخص الكتلة",
        items: [
          { label: "جولات السبارينغ", value: "118", trend: "+6٪ مقابل الكتلة الماضية" },
          { label: "مراجعات الفيديو", value: "16", trend: "الهدف: 20 مراجعة" },
          { label: "درجة الركلة الانفجارية", value: "متوسط", trend: "حافظ خلال التخفيف" },
        ],
      },
      competitionResults: {
        title: "نتائج البطولات",
        subtitle: "أبرز أحداث الموسم",
        placementFormat: "المركز · {{placement}}",
        items: [
          {
            event: "بطولة التايكواندو الحضرية المفتوحة",
            result: "فئة الكبار -68كغ · النتيجة النهائية 18–9",
            placing: "ذهب",
          },
          {
            event: "تجارب فريق الولاية",
            result: "ثنائي بومسي · متوسط 8.45",
            placing: "نهائي",
          },
        ],
      },
      weightTracking: {
        title: "سجل الوزن",
        subtitle: "متابعة أسبوعية",
        entries: [
          { label: "الأسبوع 13", weight: "78.4 كغ" },
          { label: "الأسبوع 14", weight: "78.1 كغ" },
          { label: "الأسبوع 15", weight: "77.9 كغ" },
          { label: "الأسبوع 16", weight: "78.0 كغ" },
        ],
        rangeNote:
          "حافظ على فئة -80 كغ: النطاق المستهدف 77.8 – 78.4 كغ. فعّل مراجعة تغذوية إذا خرج الوزن عن النطاق لأسبوعين متتاليين.",
      },
    },
    competitions: {
      heading: "تقويم البطولات",
      description:
        "صوّر كتل السفر واستعد لقوائم يوم الحلبة.",
      badge: "ذروة الموسم",
      checkIn: "تسجيل الحلبة عند {{time}}",
      logistics: "اللوجستيات",
      cta: "إحاطة الحلبة",
      levels: {
        Regional: "إقليمي",
        National: "وطني",
        International: "دولي",
      },
    },

    /* ---- المعلومات (نُقلت ضمن translation) ---- */
    information: {
      academic: {
        heading: "السجل الأكاديمي والتخطيط",
        description:
          "راقب تقدّم الساعات، وتقييمات المعالم، ومتابعات المرشد في مكان واحد.",
        creditBadge: {
          label: "الساعات هذا الفصل",
          value: "{{current}} / {{target}} ساعة مؤكَّدة",
          helper: "على وتيرة مراجعة التخرّج",
        },
        creditLoad: {
          heading: "نظرة عامة على العبء الدراسي",
          caption: "{{current}} من {{target}} ساعة مؤكَّدة لهذا الفصل",
          helper:
            "{{available}} ساعات اختيارية متبقية لتخصيص جدولك.",
        },
        creditDistribution: {
          coreCurriculum: {
            label: "المنهج الأساسي",
            value: "9 ساعات",
            context: "متطلبات التخصص قيد الإنجاز",
          },
          researchLabs: {
            label: "الأبحاث والمختبرات",
            value: "6 ساعات",
            context: "تم التحقق من الحضور لدى الهيئة التدريسية",
          },
          electives: {
            label: "اختيارات",
            value: "3 ساعات",
            context: "تم إرسال موافقة المرشد",
          },
        },
        programInsights: {
          heading: "رؤى البرنامج",
        },
        summaryInsights: {
          currentGpa: {
            label: "المعدل الحالي",
            value: "3.72",
            context: "محسوب عبر مقررات المستوى المتقدّم",
          },
          scholarshipStanding: {
            label: "وضع المنحة",
            value: "مستمر",
            context: "مراجعة التجديد مجدولة في 15 مايو",
          },
          graduationPlan: {
            label: "خطة التخرّج",
            value: "ربيع 2026",
            context: "تم اعتماد مقترح المشروع الختامي",
          },
        },
        modules: {
          credits: "{{count}} ساعة",
          focusCheckpoint: "نقطة تركيز",
          progress: "{{percent}}٪ مكتمل",
          nextEvaluationLabel: "المعلَم التالي · {{date}}",
          capstoneResearchStudio: {
            title: "استوديو بحث المشروع الختامي",
            focus:
              "جمّع النتائج مع تعقيبات الهيئة قبل المناقشة النهائية.",
            nextEvaluationDate: "10 مايو",
          },
          dataVisualizationLab: {
            title: "مختبر تصوير البيانات",
            focus:
              "أنهِ لوحات المعلومات ونتائج المراجعة الزملائية.",
            nextEvaluationDate: "28 أبريل",
          },
          communityImpactSeminar: {
            title: "ندوة الأثر المجتمعي",
            focus:
              "قدّم ملخصًا توثيقيًا لنتائج التعلّم الخدمي.",
            nextEvaluationDate: "—",
          },
        },
        moduleStatuses: {
          onTrack: "على المسار",
          completed: "مكتمل",
          actionNeeded: "يلزم إجراء",
        },
        upcomingEvaluations: {
          heading: "تقييمات قادمة",
          helper: "خلال 30 يومًا",
          dateLabel: "مستحق {{date}}",
          capstonePresentation: {
            module: "استوديو بحث المشروع الختامي",
            type: "عرض أمام الهيئة",
            date: "10 مايو",
          },
          researchColloquium: {
            module: "ندوة الأبحاث الجامعية",
            type: "تقديم ملصق",
            date: "28 أبريل",
          },
          internshipReflection: {
            module: "تقرير التدريب",
            type: "مراجعة ملف",
            date: "30 مايو",
          },
        },
        checklist: {
          heading: "قائمة الأهلية",
          helper: "تتزامن تلقائيًا كل يوم",
          statuses: {
            onTrack: "على المسار",
            reviewNeeded: "تحتاج مراجعة",
            scheduled: "مجدول",
          },
          items: {
            financialAid: {
              label: "تأكيد متطلبات المساعدة المالية",
              detail:
                "تم استلام المستندات — ارفع خطاب المنحة الموقّع على البوابة.",
            },
            internshipPaperwork: {
              label: "تسليم أوراق التدريب",
              detail:
                "بانتظار اتفاقية صاحب العمل المحدّثة من خدمات المهن.",
            },
            advisorMeeting: {
              label: "جدولة لقاء المرشد",
              detail:
                "نسّق جلسة تخطيط الدرجة قبل تسجيل الخريف.",
            },
          },
        },
        advisor: {
          heading: "إرشادات المرشد",
          helper: "آخر تحديث 10 أبريل",
          notes: {
            degreeAudit: {
              title: "مراجعة تدقيق الدرجة",
              description:
                "تحقّق من بدائل المتطلبات العامة قبل التقديم.",
              action: "رفع المستندات",
            },
            researchFunding: {
              title: "متابعة تمويل الأبحاث",
              description:
                "حضّر ملخصًا لتجديد منحة الأبحاث الجامعية.",
              action: "مشاركة تحديث",
            },
            careerMentorship: {
              title: "ساعات الإرشاد المهني",
              description:
                "سجّل جلسات الإرشاد لاستكمال متطلبات التخرج.",
            },
          },
        },
      },
      billing: {
        heading: "نظرة عامة على الفوترة",
        description:
          "ابقَ على اطلاع برسوم الدوجان، ورسوم السفر، والإضافات من لوحة مالية واحدة للتايكواندو.",
        balanceBadge: {
          label: "الرصيد الحالي",
          value: "{{amount}}",
        },
        summaryCards: {
          balance: {
            label: "الرصيد المستحق",
            value: "{{amount}}",
            helper: "دعم سفر WT Grand Prix · مستحق 25 أبريل 2025",
          },
          autopay: {
            label: "خصم الدفع التلقائي القادم",
            value: "01 مايو 2025",
            helper: "رسوم إقامة المنتخب الوطني · مجدولة شهريًا",
          },
          lastPayment: {
            label: "آخر دفعة مستلمة",
            value: "{{amount}}",
            helper: "معسكر سبارينغ نخبوي · مُدرج 18 مارس 2025",
          },
        },
        invoices: {
          heading: "الفواتير",
          helper: "سجل البيانات لموسم التايكواندو الحالي.",
          download: "تنزيل البيان",
          sendReceipt: "إرسال إيصال",
          pending: {
            label: "فواتير معلّقة",
            count_one: "فاتورة واحدة مستحقة",
            count_other: "{{count}} فواتير مستحقة",
            total: "بإجمالي {{amount}} غير مسدّد",
          },
          paid: {
            label: "المدفوع هذا الموسم",
            total: "{{amount}} مُدرج",
            count_one: "عبر فاتورة واحدة",
            count_other: "عبر {{count}} فواتير",
          },
          filters: {
            label: "مرشّحات",
            items: {
              all: "الكل",
              pending: "معلّق",
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
              label: "عضوية الدوجان لفصل الربيع",
              dueDate: {
                apr252025: "25 أبريل 2025",
              },
            },
            strengthLabAccess: {
              label: "وصول مختبر الركلات عالية الأداء",
              dueDate: {
                mar182025: "18 مارس 2025",
              },
            },
            travelContribution: {
              label: "مساهمة سفر الجائزة الكبرى للتايكواندو",
              dueDate: {
                feb022025: "02 فبراير 2025",
              },
            },
          },
          statuses: {
            pending: "معلّق",
            paid: "مدفوع",
          },
          empty:
            "لا توجد فواتير مطابقة للمرشّح المحدد. جرّب حالة أخرى لمراجعة البيانات السابقة.",
          },
        autoPay: {
          heading: "الدفع التلقائي",
          helper: "الدفع التلقائي مفعّل لاشتراكات التايكواندو الشهرية.",
          manage: "إدارة الدفع التلقائي",
        },
        paymentMethods: {
          primaryCard: {
            label: "طريقة الدفع الأساسية",
            detail: "Visa •••• 4298",
            expires: "تنتهي 08/27",
            status: "الدفع التلقائي مفعّل",
          },
          backupAccount: {
            label: "طريقة دفع احتياطية",
            detail: "حساب جاري · First Peninsula Bank",
            status: "مخصّص لرسوم السفر للبطولات",
          },
        },
        upcomingCharges: {
          heading: "الرسوم القادمة",
          helper: "مجدولة طوال موسم البطولات.",
          items: {
            physiotherapyBlock: {
              label: "كتلة علاج فيزيائي بعد البطولة",
              date: {
                may082025: "08 مايو 2025",
              },
            },
            facilityLevy: {
              label: "رسوم صيانة الدرع الإلكتروني (هوغو)",
              date: {
                jun122025: "12 يونيو 2025",
              },
            },
            summerTravelFund: {
              label: "صندوق سفر الدورات الدولية الصيفية",
              date: {
                jul012025: "01 يوليو 2025",
              },
            },
          },
        },
      },
      trainingAttendance: {
        heading: "حضور التدريب",
        description:
          "عرض أسبوعي لتأكيدات تسجيل الدخول وملاحظات الطاقم الأساسية.",
        seasonRate: {
          label: "معدل الموسم",
          value: "{{percent}}٪",
        },
        rateDelta: "{{value}}٪ مقابل الكتلة الماضية",
        byWeek: {
          heading: "الحضور حسب الأسبوع",
          summary: "حضر {{attended}} من {{planned}} جلسات",
          peak: "أفضل أسبوع: {{label}} · {{highlight}}",
          focus: "أسبوع التركيز: {{label}} · {{highlight}}",
          weeklyAttendance: "{{percent}}٪ حضور",
          sessions: "{{attended}} من {{planned}} جلسات · {{highlight}}",
          items: {
            week14: {
              label: "الأسبوع 14",
              highlight: "حضور مثالي",
            },
            week15: {
              label: "الأسبوع 15",
              highlight: "فاتت حصة صباحية · تأخير سفر",
            },
            week16: {
              label: "الأسبوع 16",
              highlight: "كتلة تعافٍ · موافقة الفيزيائي",
            },
          },
        },
        insights: {
          consistencyStreak: {
            label: "سلسلة الاتساق",
            value: "6 جلسات",
            detail: "لا غيابات منذ 2 أبريل · رقم شخصي جديد",
          },
          availabilityForms: {
            label: "تأكيدات السفر",
            value_one: "نموذج واحد معلّق",
            value_other: "{{count}} نماذج معلّقة",
            detailPending_one:
              "تأكيد سفر واحد ما زال يحتاج موافقة اللوجستيات قبل الجمعة.",
            detailPending_other:
              "{{count}} تأكيدات سفر ما زالت تحتاج موافقة اللوجستيات قبل الجمعة.",
            detailCleared:
              "تم استلام كل تأكيدات السفر لهذه الكتلة.",
          },
          readinessIndex: {
            label: "مؤشر الجاهزية",
            value: "92٪",
            detail: "ملاحظات الماستر وموافقة الفيزيائي تتحسن",
          },
        },
        upcoming: {
          heading: "تسجيلات الدخول القادمة",
        },
        followUp: {
          heading: "إجراءات المتابعة",
          helper: "أولويات هذا الأسبوع",
          actions: {
            pending: {
              label: "تأكيد وصول المسافرين",
              detail_one:
                "ممارس واحد بانتظار تأكيد مكتب السفر وإحاطة تعيين الحلبة.",
              detail_other:
                "{{count}} ممارسين بانتظار تأكيد مكتب السفر وإحاطات تعيين الحلبة.",
              emphasis_one:
                "أرسل تذكيرًا قبل اتصال لوجستيات الخميس ظهرًا.",
              emphasis_other:
                "أرسل تذكيرات قبل اتصال لوجستيات الخميس ظهرًا.",
            },
            medical: {
              label: "تنسيق المراجعات الطبية",
              detail_one:
                "ممارس واحد موضوع على إيقاف طبي يحتاج جدول عودة محدّث.",
              detail_other:
                "{{count}} ممارسين على إيقاف طبي يحتاجون جداول عودة محدّثة.",
              emphasis_one:
                "زامن ملاحظات الفيزيائي مع الماسترز قبل خطة كتلة الجمعة.",
              emphasis_other:
                "زامن ملاحظات الفيزيائي مع الماسترز قبل خطة كتلة الجمعة.",
            },
          },
        },
        sessions: {
          ts1: {
            focus:
              "اختبار الاستجابة أثناء جولات الباد—ضع أجهزة التسجيل قرب الحلبات.",
            emphasis:
              "يفتح استبيان العافية قبل 30 دقيقة؛ سجّل RPE بعد كل كتلة.",
          },
          ts2: {
            focus:
              "تهيئة سكواد السفر مع بروتوكولات حركة فردية عند الوصول.",
            emphasis:
              "تأكد من تسجيل فحوصات الترطيب قبل الإحماء الرئيسي.",
          },
          ts3: {
            focus:
              "غرفة الأفلام مع أزواج السبارينغ واجتماعات القيادة.",
            emphasis:
              "انشر رابط تسجيل الدخول عن بُعد للممارسين على خطط معدّلة.",
          },
        },
        teamStatus: {
          heading: "حالة تسجيل الفريق",
          helper: "توفر القائمة المباشر",
        },
        statuses: {
          confirmed: {
            label: "مؤكّد",
            count_one: "ممارس واحد مؤكّد",
            count_other: "{{count}} ممارسين مؤكّدين",
          },
          pending: {
            label: "معلّق",
            count_one: "ممارس واحد معلّق",
            count_other: "{{count}} ممارسين معلّقين",
          },
          medicalHold: {
            label: "إيقاف طبي",
            count_one: "ممارس واحد على إيقاف طبي",
            count_other: "{{count}} ممارسين على إيقاف طبي",
          },
          percent: "{{percent}}٪ من القائمة",
        },
        roster: {
          names: {
            linaReyes: "لينا رييس",
            noahPetrov: "نواه بيتروف",
            aishaKato: "عائشة كاتو",
            jonahHill: "جونا هيل",
          },
          roles: {
            linaReyes: "مقاتلة وزن ريشة",
            noahPetrov: "مقاتل وزن خفيف",
            aishaKato: "مختصة بومسي",
            jonahHill: "مقاتل وزن ثقيل",
          },
          notes: {
            linaReyes: "تم التسجيل عبر الجوال · 18:05",
            noahPetrov:
              "الرحلة تصل 14:20 · يحتاج إحاطة إحماء عن بُعد",
            aishaKato:
              "اختبار العودة للركل يوم الخميس لدى الفيزيائي",
            jonahHill:
              "نُقلت كتلة القوة إلى 07:30 مع هوجو",
          },
        },
      },
    },
  },
};
