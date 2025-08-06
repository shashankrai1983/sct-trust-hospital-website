import { 
  ServicePageData, 
  ProcessStep,
  TreatmentOption,
  RiskFactor,
  FAQ,
  Differentiator,
  Testimonial 
} from '@/types/services';

export const infertilityTreatmentData: ServicePageData = {
  service: {
    name: "Infertility Treatment",
    slug: "infertility-treatment",
    category: "Fertility",
    description: "Comprehensive fertility evaluation and advanced reproductive treatments for couples facing challenges in conceiving naturally.",
    shortDescription: "Expert fertility care with personalized treatment plans and advanced reproductive technologies.",
    icon: "Baby",
    featured: true
  },

  hero: {
    title: "Infertility Treatment",
    subtitle: "Comprehensive Fertility Care for Your Journey to Parenthood",
    description: "Expert fertility evaluation and personalized treatment plans using advanced reproductive technologies. Dr. Amita Shukla provides compassionate care with cutting-edge treatments to help you achieve your dream of parenthood.",
    image: "https://i.ibb.co/zT9kR7kq/Infertility-Care.png",
    imageAlt: "Infertility Treatment by Dr. Amita Shukla in Lucknow",
    badges: [
      "Personalized Care",
      "10+ Years Experience",
      "Expert Consultation",
      "Advanced Technology"
    ],
    primaryCTA: {
      text: "Schedule Fertility Consultation",
      href: "/contact",
      icon: "Calendar"
    },
    secondaryCTA: {
      text: "Call +91 8303222222",
      href: "tel:+918303222222",
      icon: "Phone"
    },
    trustIndicators: {
      experience: "10+",
      successRate: "Expert Care",
      specialization: "500+"
    }
  },

  overview: {
    introduction: "Infertility affects approximately 1 in 6 couples worldwide. At our fertility center in Lucknow, we understand the emotional and physical challenges of infertility. Dr. Amita Shukla combines advanced reproductive technologies with personalized care to provide comprehensive fertility treatments. Many fertility challenges stem from conditions like <a href='/services/pcos-pcod-treatment' class='text-primary-green hover:text-primary-green/80 underline'>PCOS/PCOD</a>, which we also specialize in treating, ensuring a holistic approach to reproductive health.",
    keyPoints: [
      "Comprehensive fertility evaluation for both partners using state-of-the-art diagnostic technologies",
      "Advanced reproductive treatments including IVF, IUI, ICSI, and fertility preservation techniques",
      "Specialized treatment for <a href='/services/pcos-pcod-treatment' class='text-primary-green hover:text-primary-green/80 underline'>PCOS-related fertility issues</a> and other hormonal disorders",
      "Minimally invasive surgical options through <a href='/services/laparoscopy' class='text-primary-green hover:text-primary-green/80 underline'>advanced laparoscopy</a> when required",
      "Emotional support and counseling throughout the fertility journey with dedicated patient care coordinators",
      "Seamless transition to <a href='/services/high-risk-pregnancy' class='text-primary-green hover:text-primary-green/80 underline'>high-risk pregnancy care</a> for successful IVF pregnancies"
    ],
    statistics: [
      {
        label: "Treatment Options",
        value: "15+",
        description: "Available fertility protocols",
        icon: "Award"
      },
      {
        label: "Years Experience",
        value: "10+",
        description: "In reproductive medicine",
        icon: "Clock"
      },
      {
        label: "Happy Families",
        value: "500+",
        description: "Successful pregnancies achieved",
        icon: "Heart"
      },
      {
        label: "Expert Care",
        value: "24/7",
        description: "Patient support available",
        icon: "Shield"
      }
    ],
    benefits: [
      "Comprehensive diagnostic workup identifies specific causes of infertility",
      "Minimally invasive procedures with faster recovery times",
      "Advanced laboratory techniques improve fertilization success rates",
      "Personalized medication protocols minimize side effects",
      "Psychological support reduces stress and improves outcomes",
      "Flexible treatment schedules accommodate work and personal commitments"
    ],
    whoCanBenefit: [
      "Couples trying to conceive for more than 12 months (6 months if over 35)",
      "Women with irregular menstrual cycles or ovulation disorders", 
      "Men with sperm count, motility, or morphology issues",
      "Couples with unexplained infertility after basic testing",
      "Women with blocked fallopian tubes or endometriosis",
      "Couples with recurrent pregnancy loss (2 or more miscarriages)",
      "Single women or same-sex couples seeking fertility assistance",
      "Cancer survivors requiring fertility preservation before treatment"
    ],
    disclaimer: "Fertility treatment success rates vary based on individual factors including age, cause of infertility, and overall health. Treatment plans are personalized after comprehensive evaluation. Multiple cycles may be required for optimal success."
  },

  process: {
    title: "Your Fertility Treatment Journey",
    subtitle: "Step-by-step guidance from consultation to pregnancy",
    description: "Our comprehensive fertility treatment process is designed to identify the root causes of infertility and provide the most effective treatment path for your unique situation.",
    steps: [
      {
        step: 1,
        title: "Initial Consultation & Evaluation",
        description: "Comprehensive medical history, physical examination, and initial fertility assessment for both partners",
        duration: "90 minutes",
        includes: [
          "Detailed medical and reproductive history review",
          "Physical examination and pelvic ultrasound",
          "Initial blood work and hormone testing",
          "Semen analysis for male partner",
          "Treatment plan discussion and timeline"
        ],
        icon: "Stethoscope"
      },
      {
        step: 2,
        title: "Advanced Diagnostic Testing", 
        description: "Specialized tests to identify specific causes of infertility and determine optimal treatment approach",
        duration: "1-2 weeks",
        includes: [
          "Ovarian reserve testing (AMH, FSH, Antral follicle count)",
          "Tubal patency assessment (HSG or HyCoSy)",
          "Advanced sperm function tests if indicated",
          "Genetic screening when recommended",
          "Thyroid and metabolic evaluation"
        ],
        icon: "Microscope"
      },
      {
        step: 3,
        title: "Personalized Treatment Plan",
        description: "Custom fertility protocol based on diagnostic results, age, and personal preferences",
        duration: "Ongoing",
        includes: [
          "Treatment option review and selection",
          "Medication protocols and injection training", 
          "Cycle scheduling and monitoring plan",
          "Financial counseling and insurance verification",
          "Emotional support resource coordination"
        ],
        icon: "Heart"
      },
      {
        step: 4,
        title: "Treatment Implementation",
        description: "Active fertility treatment with close monitoring and support throughout the process",
        duration: "Variable by treatment",
        includes: [
          "Medication administration and monitoring",
          "Regular ultrasounds and blood work",
          "Procedure scheduling (IUI, IVF, etc.)",
          "24/7 support for questions and concerns",
          "Adjustment of protocols as needed"
        ],
        icon: "Activity"
      }
    ],
    timeline: {
      totalDuration: "3-6 months per treatment cycle",
      frequency: "Weekly monitoring during active treatment",
      followUp: "Ongoing support through pregnancy and beyond"
    }
  },

  treatments: {
    title: "Advanced Fertility Treatment Options",
    subtitle: "Cutting-edge reproductive technologies tailored to your needs",
    description: "We offer the complete spectrum of fertility treatments, from basic ovulation induction to advanced assisted reproductive technologies, all performed in our state-of-the-art facility.",
    options: [
      {
        name: "Ovulation Induction",
        description: "Medications to stimulate ovulation in women with irregular or absent ovulation",
        suitableFor: [
          "Women with PCOS or irregular cycles",
          "Unexplained infertility cases",
          "Women with ovulation disorders"
        ],
        successRate: "80-85%",
        duration: "3-6 months",
        procedure: [
          "Oral medications (Clomiphene, Letrozole) or injectable hormones",
          "Regular monitoring with ultrasounds and blood tests",
          "Timed intercourse or IUI coordination",
          "Cycle tracking and ovulation confirmation"
        ],
        benefits: [
          "Less invasive than advanced procedures",
          "Lower cost compared to IVF",
          "Can be combined with other treatments",
          "Suitable for women with mild fertility issues"
        ],
        recovery: "No recovery time needed, normal activities can be continued"
      },
      {
        name: "Intrauterine Insemination (IUI)",
        description: "Placement of prepared sperm directly into the uterus during ovulation",
        suitableFor: [
          "Mild male factor infertility",
          "Cervical factor infertility", 
          "Unexplained infertility",
          "Single women or same-sex couples"
        ],
        successRate: "15-20% per cycle",
        duration: "1 menstrual cycle",
        procedure: [
          "Ovulation monitoring and timing",
          "Sperm collection and preparation",
          "Intrauterine insemination procedure",
          "Luteal phase support if needed"
        ],
        benefits: [
          "Minimally invasive outpatient procedure",
          "Lower cost than IVF",
          "Natural conception process",
          "Can be repeated multiple times"
        ],
        recovery: "15-20 minutes rest, then normal activities"
      },
      {
        name: "In Vitro Fertilization (IVF)",
        description: "Fertilization of eggs outside the body with embryo transfer to the uterus",
        suitableFor: [
          "Blocked or damaged fallopian tubes",
          "Severe male factor infertility",
          "Advanced maternal age",
          "Failed IUI cycles"
        ],
        successRate: "60-70% under age 35",
        duration: "4-6 weeks per cycle",
        procedure: [
          "Ovarian stimulation with hormone injections",
          "Egg retrieval under light sedation",
          "Laboratory fertilization and embryo culture",
          "Embryo transfer and pregnancy testing"
        ],
        benefits: [
          "Highest success rates for most conditions",
          "Genetic testing of embryos possible",
          "Multiple embryos for future cycles",
          "Comprehensive fertility solution"
        ],
        recovery: "2-3 days rest after egg retrieval, normal activities after transfer"
      },
      {
        name: "Intracytoplasmic Sperm Injection (ICSI)",
        description: "Direct injection of a single sperm into an egg for severe male factor infertility",
        suitableFor: [
          "Severe oligospermia (low sperm count)",
          "Poor sperm motility or morphology",
          "Previous IVF fertilization failure",
          "Sperm obtained surgically"
        ],
        successRate: "65-75%",
        duration: "Same as IVF cycle",
        procedure: [
          "Standard IVF protocol for egg retrieval",
          "Individual sperm injection into each mature egg",
          "Embryo culture and monitoring",
          "Embryo transfer and luteal support"
        ],
        benefits: [
          "Overcomes severe male fertility issues",
          "High fertilization rates",
          "Can use surgically retrieved sperm",
          "Improves IVF success in male factor cases"
        ],
        recovery: "Same as IVF procedure"
      },
      {
        name: "Preimplantation Genetic Testing (PGT)",
        description: "Genetic screening of embryos before transfer to prevent genetic disorders",
        suitableFor: [
          "Advanced maternal age (>35)",
          "Recurrent pregnancy loss",
          "Known genetic disorders in family",
          "Previous chromosome abnormalities"
        ],
        successRate: "Improves IVF success by 10-15%",
        duration: "Additional 1-2 weeks to IVF",
        procedure: [
          "Standard IVF with embryo biopsy",
          "Genetic analysis of embryo cells",
          "Selection of chromosomally normal embryos",
          "Transfer of tested embryos"
        ],
        benefits: [
          "Reduces miscarriage risk",
          "Prevents genetic disorders",
          "Improves pregnancy success rates",
          "Provides genetic information about embryos"
        ],
        recovery: "Same as IVF with additional waiting period for results"
      },
      {
        name: "Fertility Preservation",
        description: "Egg, sperm, or embryo freezing for future use",
        suitableFor: [
          "Cancer patients before treatment",
          "Women delaying childbearing",
          "Military deployment",
          "Occupational hazard exposure"
        ],
        successRate: "90%+ survival rates after thawing",
        duration: "2-4 weeks for egg freezing",
        procedure: [
          "Ovarian stimulation (for egg freezing)",
          "Egg or sperm collection",
          "Cryopreservation using vitrification",
          "Long-term storage in specialized facility"
        ],
        benefits: [
          "Preserves fertility for future",
          "Peace of mind during medical treatment",
          "Flexibility in family planning timing",
          "High success rates with modern techniques"
        ],
        recovery: "2-3 days for egg freezing, immediate for sperm freezing"
      }
    ],
    consultationNote: "Treatment selection depends on multiple factors including age, cause of infertility, duration of trying, and personal preferences. Dr. Amita Shukla will discuss all options during your consultation and recommend the most appropriate treatment path for your specific situation."
  },

  faqs: {
    title: "Fertility Treatment FAQs",
    subtitle: "Common questions about infertility and treatment options",
    description: "Expert answers to help you understand fertility treatments and what to expect during your journey to parenthood.",
    faqs: [
      {
        question: "How long should we try to conceive before seeking fertility treatment?",
        answer: "Generally, couples under 35 should try for 12 months, while those over 35 should seek evaluation after 6 months. However, if you have known risk factors like irregular periods, previous pelvic surgery, or male factor issues, earlier consultation is recommended.",
        category: "general"
      },
      {
        question: "What causes infertility?",
        answer: "Infertility can be caused by female factors (40%), male factors (40%), or unexplained reasons (20%). Common female causes include ovulation disorders, blocked tubes, and endometriosis. Male factors often involve sperm count, motility, or morphology issues.",
        category: "general"
      },
      {
        question: "How successful are fertility treatments?",
        answer: "Success rates vary by treatment type and individual factors. IUI success is 15-20% per cycle, while IVF success ranges from 40-70% depending on age. Our clinic maintains above-average success rates through personalized care and advanced techniques.",
        category: "treatment"
      },
      {
        question: "Is IVF painful?",
        answer: "Most patients experience minimal discomfort. Hormone injections may cause mild bruising, and egg retrieval involves brief cramping. We provide pain management and sedation during procedures to ensure comfort throughout treatment.",
        category: "treatment"
      },
      {
        question: "How much do fertility treatments cost?",
        answer: "Costs vary by treatment complexity. Basic evaluation ranges from ₹15,000-25,000, IUI costs ₹20,000-30,000 per cycle, and IVF ranges from ₹1,50,000-2,50,000. We accept insurance and offer payment plans to make treatment accessible.",
        category: "cost"
      },
      {
        question: "Can age affect fertility treatment success?",
        answer: "Yes, age significantly impacts success rates. Women under 35 have the highest success rates, while chances decrease after 35 and more significantly after 40. However, successful pregnancies are possible at older ages with appropriate treatment.",
        category: "general"
      },
      {
        question: "What lifestyle changes can improve fertility?",
        answer: "Maintain healthy weight, exercise moderately, eat a balanced diet rich in folate and antioxidants, limit alcohol and caffeine, quit smoking, manage stress, and ensure adequate sleep. These changes can improve treatment success rates.",
        category: "general"
      },
      {
        question: "Do you offer emotional support during treatment?",
        answer: "Absolutely. We provide counseling services, support groups, and stress management resources. Our patient coordinators offer emotional support throughout your journey, understanding that fertility treatment affects mental health as much as physical health.",
        category: "treatment"
      },
      {
        question: "How many IVF cycles might I need?",
        answer: "Most patients achieve pregnancy within 2-3 IVF cycles. However, this varies based on individual factors. We discuss realistic expectations and create treatment plans that optimize your chances while considering your emotional and financial comfort.",
        category: "treatment"
      },
      {
        question: "Can we choose the gender of our baby?",
        answer: "Gender selection for medical reasons (preventing genetic disorders) is available through PGT. However, gender selection for family balancing is not permitted under Indian law. We focus on achieving healthy pregnancies regardless of gender.",
        category: "treatment"
      },
      {
        question: "What happens to unused embryos?",
        answer: "Unused embryos can be frozen for future use, donated to research (with consent), or discarded according to your wishes. We discuss all options thoroughly and respect your personal, religious, and ethical considerations in decision-making.",
        category: "treatment"
      },
      {
        question: "Are there any risks with fertility treatments?",
        answer: "Modern fertility treatments are generally safe. Possible risks include ovarian hyperstimulation syndrome (rare), multiple pregnancies, and slight increase in birth defects (similar to natural conception at advanced age). We monitor closely to minimize risks.",
        category: "risk"
      }
    ],
    contactNote: "Every fertility journey is unique. These answers provide general information, but your specific situation may require personalized advice. Schedule a consultation for detailed discussion about your fertility concerns and treatment options."
  },

  differentiators: {
    title: "Why Choose Our Fertility Center",
    subtitle: "Excellence in reproductive medicine with compassionate care",
    description: "Our fertility center combines advanced reproductive technologies with personalized care, achieving exceptional success rates while supporting you emotionally throughout your journey to parenthood.",
    items: [
      {
        title: "Modern Laboratory Facilities",
        description: "State-of-the-art fertility laboratory with strict quality control and advanced technologies",
        features: [
          "Time-lapse incubation system for optimal embryo selection",
          "Preimplantation genetic testing (PGT-A/PGT-M) available",
          "Vitrification technology for egg and embryo freezing",
          "ICSI capability for severe male factor infertility",
          "Clean room environment with HEPA filtration"
        ],
        icon: "Microscope",
        highlights: ["International lab standards", "Excellent embryo survival rates"]
      },
      {
        title: "Personalized Treatment Protocols",
        description: "Customized fertility treatments based on individual medical history and preferences",
        features: [
          "Detailed diagnostic workup for both partners",
          "Tailored medication protocols to minimize side effects",
          "Flexible scheduling around work and personal commitments",
          "Multiple treatment options discussed thoroughly",
          "Regular protocol adjustments based on response"
        ],
        icon: "Heart",
        highlights: ["High patient satisfaction", "Individualized care plans"]
      },
      {
        title: "Comprehensive Support Services",
        description: "Complete emotional and practical support throughout your fertility journey",
        features: [
          "Dedicated fertility counselors and support groups",
          "24/7 nurse hotline for questions and concerns",
          "Financial counseling and insurance coordination",
          "Injection training and medication management",
          "Stress reduction and wellness programs"
        ],
        icon: "Users",
        highlights: ["Holistic care approach", "24/7 support availability"]
      },
      {
        title: "High Success Rates",
        description: "Above-average pregnancy rates through evidence-based protocols and expert care",
        features: [
          "High success rates with transparent reporting",
          "Transparent reporting of all outcomes",
          "Continuous quality improvement programs",
          "Regular staff training on latest techniques",
          "Participation in national fertility registries"
        ],
        icon: "TrendingUp",
        highlights: ["Above-average success rates", "Transparent outcome reporting"]
      },
      {
        title: "Male Fertility Specialization",
        description: "Comprehensive male fertility evaluation and treatment options",
        features: [
          "Advanced sperm analysis and function testing",
          "Surgical sperm retrieval (PESA, TESA, micro-TESE)",
          "Male fertility counseling and lifestyle optimization",
          "Hormone therapy for male factor infertility",
          "Coordination with urologists when needed"
        ],
        icon: "Shield",
        highlights: ["Complete male fertility services", "Surgical expertise available"]
      },
      {
        title: "Fertility Preservation Excellence",
        description: "Leading expertise in egg, sperm, and embryo freezing for future use",
        features: [
          "Rapid fertility preservation for cancer patients",
          "Social egg freezing with counseling support",
          "Long-term storage with 24/7 monitoring",
          "High survival rates with vitrification technology",
          "Comprehensive pre-freezing consultations"
        ],
        icon: "Clock",
        highlights: ["Emergency protocols available", "Excellent thaw survival rates"]
      }
    ],
    trustStatistics: [
      {
        label: "Years of Excellence",
        value: "10+",
        description: "In reproductive medicine",
        icon: "Award"
      },
      {
        label: "Expert Care",
        value: "Premium",
        description: "Quality treatment protocols",
        icon: "TrendingUp"
      },
      {
        label: "Happy Families",
        value: "500+",
        description: "Babies born through our care",
        icon: "Heart"
      },
      {
        label: "Advanced Procedures",
        value: "24/7",
        description: "Lab monitoring and support",
        icon: "Clock"
      }
    ]
  },


  cta: {
    title: "Ready to Start Your",
    subtitle: "Journey to Parenthood?",
    description: "Take the first step toward your dream of becoming parents. Dr. Amita Shukla and our fertility team are here to guide you with expert care, advanced treatments, and unwavering support throughout your journey.",
    primaryAction: {
      text: "Schedule Fertility Consultation",
      href: "/contact",
      icon: "Calendar"
    },
    secondaryAction: {
      text: "Call +91 8303222222",
      href: "tel:+918303222222", 
      icon: "Phone"
    },
    features: [
      "Comprehensive Fertility Evaluation",
      "Advanced IVF Laboratory",
      "Personalized Treatment Plans"
    ],
    urgencyNote: "Early intervention improves success rates significantly",
    trustIndicators: [
      { text: "500+ Successful Pregnancies", icon: "Heart" },
      { text: "Excellent Treatment Outcomes", icon: "TrendingUp" },
      { text: "10+ Years Fertility Expertise", icon: "Award" }
    ]
  },

  seo: {
    title: "Infertility Treatment Lucknow | IVF Specialist | Dr. Amita Shukla",
    description: "Expert infertility treatment in Lucknow by Dr. Amita Shukla. Advanced IVF, IUI, ICSI & fertility preservation. Personalized care with excellent outcomes. Book consultation +91 8303222222",
    keywords: [
      "infertility treatment Lucknow",
      "IVF specialist Lucknow", 
      "fertility doctor Lucknow",
      "Dr. Amita Shukla fertility",
      "IUI treatment Lucknow",
      "ICSI specialist Lucknow",
      "fertility clinic Lucknow",
      "reproductive medicine Lucknow",
      "egg freezing Lucknow",
      "male infertility treatment Lucknow",
      "PCOS treatment infertility",
      "fertility preservation Lucknow",
      "IVF success rates Lucknow",
      "best fertility center Lucknow",
      "assisted reproductive technology UP"
    ],
    ogImage: "https://i.ibb.co/zT9kR7kq/Infertility-Care.png",
    canonicalUrl: "https://dramitashukla.com/services/infertility-treatment",
    structuredData: {
      "@type": "MedicalProcedure",
      "name": "Infertility Treatment",
      "description": "Comprehensive fertility evaluation and advanced reproductive treatments including IVF, IUI, and ICSI for couples facing infertility challenges.",
      "procedureType": "Fertility Treatment and Assisted Reproduction",
      "bodyLocation": "Reproductive system",
      "preparation": "Fertility evaluation, hormonal tests, imaging studies, semen analysis",
      "followup": "Regular monitoring during treatment cycles, pregnancy testing, ongoing support",
      "benefits": [
        "Improved chances of pregnancy",
        "Personalized treatment approach",
        "Advanced reproductive technologies",
        "Comprehensive fertility care"
      ],
      "indication": [
        "Inability to conceive after 12 months of trying",
        "Known fertility disorders",
        "Advanced maternal age",
        "Recurrent pregnancy loss"
      ],
      "medicalCode": {
        "@type": "MedicalCode",
        "code": "N97.9",
        "codingSystem": "ICD-10"
      }
    }
  },

  config: {
    theme: "primary",
    showEmergencyBanner: false,
    customSections: ["process", "treatments", "differentiators"]
  }
};