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
    training: {
      title: "تقويم الحصص التدريبية",
      description: "ابق متناغمًا مع الفريق وأكد توافرك مبكرًا.",
      weekLabel: "الأسبوع {{week}}",
      lead: "المدرب المسؤول · {{coach}}",
      confirmAvailability: "تأكيد التوفر",
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
    competitions: {
      heading: "تقويم البطولات",
      description: "تتبّع خطط السفر واستعد لقوائم مهام يوم السباق.",
      badge: "ذروة الموسم",
      checkIn: "تسجيل الوصول {{time}}",
      logistics: "اللوجستيات",
      cta: "موجز السفر",
      levels: {
        Regional: "إقليمي",
        National: "وطني",
        International: "دولي",
      },
    },
  },
} as const;
