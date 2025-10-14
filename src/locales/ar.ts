export const ar = {
  translation: {
    common: {
      languageSwitcher: {
        label: "اختر اللغة",
        languages: {
          en: "English",
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
        summary: {
          zero: "لا توجد التزامات قادمة للفريق",
          one: "التزام واحد قادم للفريق",
          two: "التزامان قادمان للفريق",
          few: "{{count}} التزامات قادمة للفريق",
          many: "{{count}} التزامًا قادمًا للفريق",
          other: "{{count}} التزام قادم للفريق",
        },
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
        competitionDetails: "بطولة مستوى {{level}} · تسجيل الوصول {{time}}",
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
        eventsCount: {
          zero: "لا فعاليات",
          one: "فعالية واحدة",
          two: "فعاليتان",
          few: "{{count}} فعاليات",
          many: "{{count}} فعالية",
          other: "{{count}} فعالية",
        },
      },
      weekView: {
        weekLabel: "أسبوع {{start}}",
        scheduledEvents: {
          zero: "لا فعاليات مجدولة",
          one: "فعالية مجدولة واحدة",
          two: "فعاليتان مجدولتان",
          few: "{{count}} فعاليات مجدولة",
          many: "{{count}} فعالية مجدولة",
          other: "{{count}} فعالية مجدولة",
        },
        today: "اليوم",
      },
      dayView: {
        headerDescription:
          "جميع حصص التدريب ومسؤوليات المنافسة في هذا التاريخ.",
        eventCount: {
          zero: "لا فعاليات",
          one: "فعالية واحدة",
          two: "فعاليتان",
          few: "{{count}} فعاليات",
          many: "{{count}} فعالية",
          other: "{{count}} فعالية",
        },
        coachLabel: "المسؤول · {{name}}",
        checkIn: "تسجيل الوصول {{time}}",
      },
      relativeDay: {
        inDays: {
          zero: "اليوم",
          one: "بعد يوم",
          two: "بعد يومين",
          few: "بعد {{count}} أيام",
          many: "بعد {{count}} يومًا",
          other: "بعد {{count}} يوم",
        },
        tomorrow: "غدًا",
        today: "اليوم",
        yesterday: "أمس",
        daysAgo: {
          zero: "اليوم",
          one: "منذ يوم",
          two: "منذ يومين",
          few: "منذ {{count}} أيام",
          many: "منذ {{count}} يومًا",
          other: "منذ {{count}} يوم",
        },
      },
      duration: {
        none: "0س",
        hours: {
          zero: "0س",
          one: "{{count}}س",
          two: "{{count}}س",
          few: "{{count}}س",
          many: "{{count}}س",
          other: "{{count}}س",
        },
        minutes: {
          zero: "0د",
          one: "{{count}}د",
          two: "{{count}}د",
          few: "{{count}}د",
          many: "{{count}}د",
          other: "{{count}}د",
        },
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
  },
} as const;
