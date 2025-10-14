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
        totalSessionsLabel: "{{count}} حصة",
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
  },
} as const;
