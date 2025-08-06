import { 
  ServicePageData, 
  ProcessStep,
  TreatmentOption,
  FAQ,
  Differentiator
} from '@/types/services';

export const pcosPcodTreatmentData: ServicePageData = {
  service: {
    name: "PCOS/PCOD Treatment",
    slug: "pcos-pcod-treatment",
    category: "Wellness",
    description: "Comprehensive management of Polycystic Ovary Syndrome (PCOS) and Polycystic Ovary Disorder (PCOD) with personalized treatment approaches addressing hormonal imbalances, metabolic issues, and reproductive health.",
    shortDescription: "Expert PCOS/PCOD management with holistic treatment approaches for hormonal balance and reproductive health.",
    icon: "Activity",
    featured: true
  },

  hero: {
    title: "PCOS/PCOD Treatment",
    subtitle: "Comprehensive Hormonal Balance & Reproductive Health Management",
    description: "Expert treatment for Polycystic Ovary Syndrome (PCOS) and Polycystic Ovary Disorder (PCOD) in Lucknow. Dr. Amita Shukla provides personalized care addressing hormonal imbalances, irregular periods, fertility concerns, and metabolic complications through evidence-based treatment approaches.",
    image: "https://i.ibb.co/LXHkZKWc/PCOS-PCOD-care.png",
    imageAlt: "PCOS PCOD Treatment by Dr. Amita Shukla in Lucknow",
    badges: [
      "Personalized Treatment Plans",
      "10+ Years Experience",
      "Holistic Care Approach",
      "Lifestyle Management"
    ],
    primaryCTA: {
      text: "Schedule PCOS Consultation",
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
      specialization: "300+"
    }
  },

  overview: {
    introduction: "PCOS (Polycystic Ovary Syndrome) affects 1 in 10 women of reproductive age in India. This complex hormonal disorder can impact menstrual cycles, fertility, metabolism, and overall health. Dr. Amita Shukla provides comprehensive PCOS/PCOD management in Lucknow, combining medical treatment with lifestyle modifications. For women planning families, we seamlessly integrate <a href='/services/infertility-treatment' class='text-primary-green hover:text-primary-green/80 underline'>fertility treatments</a> and may recommend <a href='/services/laparoscopy' class='text-primary-green hover:text-primary-green/80 underline'>minimally invasive surgery</a> when needed for optimal reproductive outcomes.",
    keyPoints: [
      "Comprehensive hormonal evaluation and diagnosis using advanced testing methods",
      "Personalized treatment plans addressing individual symptoms and health goals", 
      "Evidence-based medical management integrated with <a href='/services/well-women-health' class='text-primary-green hover:text-primary-green/80 underline'>preventive health screening</a>",
      "Specialized <a href='/services/infertility-treatment' class='text-primary-green hover:text-primary-green/80 underline'>fertility-focused treatment</a> for women planning pregnancy",
      "Surgical intervention through <a href='/services/laparoscopy' class='text-primary-green hover:text-primary-green/80 underline'>advanced laparoscopy</a> when medication alone is insufficient",
      "Long-term metabolic health monitoring and diabetes prevention strategies with regular follow-up care"
    ],
    statistics: [
      {
        label: "Women Affected",
        value: "1 in 10",
        description: "Of reproductive age in India",
        icon: "Users"
      },
      {
        label: "Treatment Options",
        value: "12+",
        description: "Available management approaches",
        icon: "Award"
      },
      {
        label: "Years Experience",
        value: "10+",
        description: "In PCOS management",
        icon: "Clock"
      },
      {
        label: "Successful Cases",
        value: "300+",
        description: "Women treated successfully",
        icon: "Heart"
      }
    ],
    benefits: [
      "Regulated menstrual cycles with improved predictability",
      "Reduced symptoms including acne, excess hair growth, and weight gain",
      "Improved fertility outcomes for women planning pregnancy",
      "Better insulin sensitivity and reduced diabetes risk",
      "Enhanced quality of life through comprehensive symptom management",
      "Personalized dietary and exercise guidance for optimal results"
    ],
    whoCanBenefit: [
      "Women with irregular or absent menstrual periods",
      "Those experiencing unexplained weight gain or difficulty losing weight",
      "Women with excessive hair growth (hirsutism) or severe acne",
      "Couples facing fertility challenges related to PCOS",
      "Women with family history of diabetes or metabolic syndrome",
      "Those with insulin resistance or pre-diabetes diagnosis",
      "Women seeking to prevent long-term health complications of PCOS"
    ],
    disclaimer: "PCOS is a complex condition requiring individualized treatment. Response to treatment varies based on symptoms, age, overall health, and treatment adherence. Lifestyle modifications are essential components of successful management. Please consult your doctor for personalized medical advice."
  },

  process: {
    title: "Your PCOS Treatment Journey",
    subtitle: "Systematic approach to hormonal balance and symptom management",
    description: "Our comprehensive PCOS treatment process begins with thorough evaluation and continues with personalized management strategies designed to address your specific symptoms and health goals.",
    steps: [
      {
        step: 1,
        title: "Initial Assessment & Diagnosis",
        description: "Comprehensive evaluation including medical history, physical examination, and diagnostic testing",
        duration: "60-90 minutes",
        includes: [
          "Detailed menstrual and reproductive history review",
          "Physical examination including BMI and blood pressure",
          "Pelvic examination and ovarian assessment",
          "Discussion of symptoms and family medical history",
          "Initial treatment goal setting and expectations"
        ],
        icon: "Stethoscope"
      },
      {
        step: 2,
        title: "Advanced Hormonal Testing",
        description: "Comprehensive laboratory evaluation to assess hormonal status and metabolic health",
        duration: "1-2 weeks for results",
        includes: [
          "Hormone levels (LH, FSH, testosterone, insulin)",
          "Thyroid function tests and prolactin levels",
          "Glucose tolerance test and HbA1c",
          "Lipid profile and vitamin D assessment",
          "Ultrasound examination of ovaries"
        ],
        icon: "Microscope"
      },
      {
        step: 3,
        title: "Personalized Treatment Plan",
        description: "Customized management strategy based on test results, symptoms, and individual goals",
        duration: "Ongoing",
        includes: [
          "Medical treatment options and medication selection",
          "Detailed lifestyle modification recommendations",
          "Dietary guidelines and nutritional counseling referrals",
          "Exercise planning and activity recommendations",
          "Fertility planning if pregnancy is desired"
        ],
        icon: "Heart"
      },
      {
        step: 4,
        title: "Regular Monitoring & Follow-up",
        description: "Ongoing assessment and treatment plan adjustments to optimize outcomes",
        duration: "Every 3-6 months",
        includes: [
          "Symptom assessment and treatment response evaluation",
          "Follow-up laboratory testing as needed",
          "Weight management and metabolic health monitoring",
          "Medication adjustments based on response and side effects",
          "Long-term health screening and prevention strategies"
        ],
        icon: "Activity"
      }
    ],
    timeline: {
      totalDuration: "Initial improvement in 3-6 months, long-term management ongoing",
      frequency: "Regular follow-up every 3-6 months",
      followUp: "Lifelong monitoring for optimal health outcomes"
    }
  },

  treatments: {
    title: "PCOS Treatment Options",
    subtitle: "Evidence-based approaches for comprehensive PCOS management",
    description: "We offer a range of treatment options tailored to your specific symptoms, health goals, and life stage. Treatment plans often combine multiple approaches for optimal results.",
    options: [
      {
        name: "Lifestyle Modification",
        description: "Fundamental approach focusing on diet, exercise, and weight management",
        suitableFor: [
          "All women with PCOS regardless of symptoms",
          "Those with insulin resistance or metabolic issues",
          "Women seeking natural management approaches",
          "Pre-diabetes or diabetes prevention"
        ],
        successRate: "Effective for most patients",
        duration: "Ongoing lifestyle changes",
        procedure: [
          "Personalized dietary plan with low glycemic index foods",
          "Regular physical activity program with cardio and strength training",
          "Weight management strategies and realistic goal setting",
          "Stress reduction techniques and sleep optimization"
        ],
        benefits: [
          "Improved insulin sensitivity and glucose metabolism",
          "Natural weight loss and easier weight maintenance",
          "Better menstrual regularity and ovulation",
          "Reduced long-term health risks"
        ],
        recovery: "Gradual improvement over 3-6 months with consistent adherence"
      },
      {
        name: "Hormonal Birth Control",
        description: "Oral contraceptives or hormonal IUDs to regulate cycles and reduce androgen levels",
        suitableFor: [
          "Women not actively trying to conceive",
          "Those with irregular periods or heavy bleeding",
          "Women with severe acne or excess hair growth",
          "Those seeking contraception with PCOS benefits"
        ],
        successRate: "80-90% for cycle regulation",
        duration: "As long as contraception is desired",
        procedure: [
          "Selection of appropriate hormonal formulation",
          "Starting medication at optimal time in cycle",
          "Regular monitoring for side effects and efficacy",
          "Periodic reassessment of treatment goals"
        ],
        benefits: [
          "Regular, predictable menstrual cycles",
          "Reduced acne and excess hair growth",
          "Decreased risk of endometrial cancer",
          "Effective contraception when needed"
        ],
        recovery: "Benefits typically seen within 3-6 months of starting treatment"
      },
      {
        name: "Metformin Therapy",
        description: "Insulin-sensitizing medication to improve metabolic function",
        suitableFor: [
          "Women with insulin resistance or pre-diabetes",
          "Those with difficulty losing weight",
          "Women trying to conceive with PCOS",
          "Those with family history of diabetes"
        ],
        successRate: "70-80% improvement in insulin sensitivity",
        duration: "Long-term use often recommended",
        procedure: [
          "Gradual dose escalation to minimize side effects",
          "Regular monitoring of blood sugar and kidney function",
          "Combination with lifestyle modifications",
          "Periodic assessment of metabolic parameters"
        ],
        benefits: [
          "Improved insulin sensitivity and glucose control",
          "Assistance with weight loss and maintenance",
          "Better ovulation and menstrual regularity",
          "Reduced risk of developing type 2 diabetes"
        ],
        recovery: "Metabolic improvements typically seen within 2-3 months"
      },
      {
        name: "Fertility Treatment",
        description: "Specialized treatment for women with PCOS trying to conceive",
        suitableFor: [
          "Women with PCOS planning pregnancy",
          "Those with ovulation disorders",
          "Couples with PCOS-related infertility",
          "Women requiring assisted reproductive technology"
        ],
        successRate: "Varies by individual factors and treatment type",
        duration: "Several months to achieve pregnancy",
        procedure: [
          "Ovulation induction with medications like Clomiphene or Letrozole",
          "Monitoring of ovulation with ultrasounds and blood tests",
          "Timed intercourse or intrauterine insemination (IUI)",
          "IVF consideration for severe cases or treatment failures"
        ],
        benefits: [
          "Restored ovulation and improved fertility",
          "Higher pregnancy rates with treatment",
          "Reduced miscarriage risk with proper management",
          "Comprehensive prenatal care planning"
        ],
        recovery: "Pregnancy rates improve with each treatment cycle; most conceive within 6 months"
      },
      {
        name: "Anti-androgen Therapy",
        description: "Medications to reduce excess male hormone effects",
        suitableFor: [
          "Women with severe hirsutism (excess hair growth)",
          "Those with persistent acne despite other treatments",
          "Women with male-pattern hair loss",
          "Those not planning pregnancy in near future"
        ],
        successRate: "60-80% improvement in hirsutism",
        duration: "Minimum 6-12 months for full effect",
        procedure: [
          "Selection of appropriate anti-androgen medication",
          "Combination with hormonal contraceptives",
          "Regular monitoring for side effects",
          "Gradual improvement assessment over time"
        ],
        benefits: [
          "Reduced unwanted hair growth over time",
          "Improvement in acne and skin quality",
          "Better self-esteem and quality of life",
          "Prevention of worsening androgenic symptoms"
        ],
        recovery: "Gradual improvement over 6-12 months; ongoing treatment often needed"
      },
      {
        name: "Nutritional Counseling",
        description: "Specialized dietary guidance for PCOS management",
        suitableFor: [
          "All women with PCOS seeking dietary optimization",
          "Those with insulin resistance or metabolic issues",
          "Women struggling with weight management",
          "Those wanting to optimize fertility through nutrition"
        ],
        successRate: "High compliance leads to significant improvement",
        duration: "Initial counseling with ongoing support",
        procedure: [
          "Comprehensive dietary assessment and analysis",
          "Personalized meal planning with PCOS-friendly foods",
          "Education on glycemic index and portion control",
          "Regular follow-up and plan adjustments"
        ],
        benefits: [
          "Better blood sugar control and insulin sensitivity",
          "Sustainable weight loss and maintenance",
          "Improved energy levels and mood",
          "Enhanced fertility and pregnancy outcomes"
        ],
        recovery: "Dietary changes show benefits within 4-8 weeks of implementation"
      }
    ],
    consultationNote: "PCOS treatment is highly individualized. The best approach depends on your specific symptoms, reproductive goals, metabolic health, and personal preferences. Dr. Amita Shukla will work with you to develop a comprehensive treatment plan that addresses your unique needs and health objectives."
  },

  faqs: {
    title: "PCOS/PCOD Treatment FAQs",
    subtitle: "Common questions about PCOS management and treatment",
    description: "Expert answers to help you understand PCOS, treatment options, and what to expect during your journey to better health.",
    faqs: [
      {
        question: "What is the difference between PCOS and PCOD?",
        answer: "PCOS (Polycystic Ovary Syndrome) is a more severe endocrine disorder affecting metabolism, while PCOD (Polycystic Ovary Disorder) is primarily a condition where ovaries produce excess male hormones. PCOS requires more comprehensive medical management, while PCOD may be managed primarily through lifestyle changes.",
        category: "general"
      },
      {
        question: "What are the main symptoms of PCOS?",
        answer: "Common PCOS symptoms include irregular or absent periods, excess hair growth on face and body, acne, weight gain or difficulty losing weight, thinning hair, dark skin patches, and fertility problems. Not all women experience all symptoms, and severity varies significantly.",
        category: "general"
      },
      {
        question: "Can PCOS be cured completely?",
        answer: "PCOS is a chronic condition that cannot be completely cured, but it can be effectively managed with proper treatment. Many symptoms can be significantly improved or controlled through medications, lifestyle changes, and ongoing medical care. Early diagnosis and treatment lead to better long-term outcomes.",
        category: "treatment"
      },
      {
        question: "Will I be able to get pregnant if I have PCOS?",
        answer: "Many women with PCOS can get pregnant with proper treatment. While PCOS can affect ovulation and fertility, various treatments including lifestyle changes, medications, and fertility treatments can help restore ovulation and improve pregnancy chances. Most women with PCOS who want to conceive can do so with appropriate medical support.",
        category: "fertility"
      },
      {
        question: "How is PCOS diagnosed?",
        answer: "PCOS diagnosis typically requires meeting 2 of 3 criteria: irregular or absent ovulation, elevated male hormone levels (or symptoms like excess hair growth), and polycystic ovaries on ultrasound. Blood tests check hormone levels, and pelvic ultrasound examines ovary structure. Additional tests may rule out other conditions.",
        category: "general"
      },
      {
        question: "What lifestyle changes help with PCOS?",
        answer: "Key lifestyle modifications include maintaining a healthy weight through balanced diet and regular exercise, eating low glycemic index foods, reducing refined sugars and processed foods, managing stress through relaxation techniques, getting adequate sleep (7-9 hours), and avoiding smoking. These changes can significantly improve symptoms and treatment outcomes.",
        category: "treatment"
      },
      {
        question: "How long does PCOS treatment take to show results?",
        answer: "Treatment response varies by individual and symptoms being addressed. Menstrual cycle improvements may be seen within 2-3 months, weight loss and metabolic changes within 3-6 months, and hirsutism/acne improvements may take 6-12 months. Consistency with treatment and lifestyle changes is crucial for optimal results.",
        category: "treatment"
      },
      {
        question: "Are there any side effects of PCOS medications?",
        answer: "Side effects vary by medication. Birth control pills may cause nausea or breast tenderness initially. Metformin can cause digestive upset that usually improves over time. Anti-androgen medications may cause fatigue or dizziness. Most side effects are mild and manageable. Your doctor will monitor you and adjust treatment as needed.",
        category: "treatment"
      },
      {
        question: "Can PCOS lead to other health problems?",
        answer: "Untreated PCOS can increase risk of type 2 diabetes, heart disease, high blood pressure, sleep apnea, endometrial cancer, and depression. However, with proper management, these risks can be significantly reduced. Regular monitoring and preventive care are important parts of PCOS management.",
        category: "risk"
      },
      {
        question: "Should I follow a specific diet for PCOS?",
        answer: "While there's no single 'PCOS diet,' eating low glycemic index foods, lean proteins, healthy fats, and plenty of vegetables is beneficial. Limiting refined sugars, processed foods, and excessive carbohydrates helps manage insulin resistance. A nutritionist can help create a personalized meal plan based on your preferences and needs.",
        category: "treatment"
      },
      {
        question: "How often should I see my doctor for PCOS management?",
        answer: "Initially, follow-up visits may be every 3 months to monitor treatment response and adjust medications. Once symptoms are well-controlled, visits every 6 months are typically sufficient. Annual screening for diabetes, heart disease risk factors, and other PCOS-related health issues is recommended regardless of symptom control.",
        category: "treatment"
      },
      {
        question: "Can stress worsen PCOS symptoms?",
        answer: "Yes, chronic stress can worsen PCOS symptoms by increasing cortisol levels, which can affect insulin resistance and hormone balance. Stress management through techniques like yoga, meditation, regular exercise, adequate sleep, and counseling when needed can be beneficial for overall PCOS management.",
        category: "risk"
      }
    ],
    contactNote: "PCOS affects each woman differently, and treatment should be individualized based on your specific symptoms and health goals. These answers provide general information, but your specific situation may require personalized advice. Schedule a consultation to discuss your PCOS concerns and develop an appropriate treatment plan."
  },

  differentiators: {
    title: "Why Choose Our PCOS Care Center",
    subtitle: "Comprehensive PCOS management with personalized treatment approaches",
    description: "Our PCOS treatment center in Lucknow combines evidence-based medical care with holistic lifestyle support, providing comprehensive management for women with PCOS and PCOD at every stage of life.",
    items: [
      {
        title: "Comprehensive Hormonal Assessment",
        description: "Complete evaluation of hormonal status and metabolic health using advanced testing",
        features: [
          "Detailed hormone panel including androgens, insulin, and thyroid",
          "Advanced metabolic testing including glucose tolerance",
          "Ovarian function assessment with specialized ultrasound",
          "Nutritional and vitamin status evaluation",
          "Comprehensive family history and genetic risk assessment"
        ],
        icon: "Microscope",
        highlights: ["Evidence-based diagnosis", "Advanced testing capabilities"]
      },
      {
        title: "Personalized Treatment Plans",
        description: "Individualized management strategies based on symptoms, goals, and life stage",
        features: [
          "Customized medication regimens based on symptom severity",
          "Fertility-focused treatment for women planning pregnancy",
          "Adolescent PCOS management with age-appropriate approaches",
          "Menopause transition support for women with PCOS",
          "Integration of medical treatment with lifestyle modifications"
        ],
        icon: "Heart",
        highlights: ["Individualized care", "Life-stage appropriate treatment"]
      },
      {
        title: "Holistic Lifestyle Support",
        description: "Comprehensive lifestyle modification guidance for optimal PCOS management",
        features: [
          "Personalized nutrition counseling and meal planning",
          "Exercise prescription and fitness guidance",
          "Stress management and mental health support",
          "Weight management strategies and sustainable approaches",
          "Educational resources and self-management tools"
        ],
        icon: "Activity",
        highlights: ["Holistic approach", "Sustainable lifestyle changes"]
      },
      {
        title: "Fertility and Reproductive Health",
        description: "Specialized care for women with PCOS planning pregnancy or managing reproductive health",
        features: [
          "Ovulation induction and fertility optimization",
          "Preconception counseling and preparation",
          "Pregnancy management for women with PCOS",
          "Contraceptive counseling with PCOS considerations",
          "Reproductive life planning and family planning support"
        ],
        icon: "Users",
        highlights: ["Fertility expertise", "Comprehensive reproductive care"]
      },
      {
        title: "Long-term Health Monitoring",
        description: "Preventive care and monitoring for PCOS-related health risks",
        features: [
          "Regular diabetes and cardiovascular risk screening",
          "Endometrial cancer prevention and monitoring",
          "Bone health assessment and osteoporosis prevention",
          "Mental health screening and support resources",
          "Annual comprehensive health assessments"
        ],
        icon: "Shield",
        highlights: ["Preventive care focus", "Long-term health optimization"]
      },
      {
        title: "Educational Support and Resources",
        description: "Comprehensive education and support for informed self-management",
        features: [
          "Detailed education about PCOS and its management",
          "Support group connections and peer resources",
          "Educational materials in Hindi and English",
          "Online resources and self-monitoring tools",
          "Family education and support system involvement"
        ],
        icon: "Award",
        highlights: ["Patient education focus", "Multilingual resources"]
      }
    ],
    trustStatistics: [
      {
        label: "Years of Excellence",
        value: "10+",
        description: "In PCOS management",
        icon: "Award"
      },
      {
        label: "Treatment Success",
        value: "Expert",
        description: "Evidence-based outcomes",
        icon: "TrendingUp"
      },
      {
        label: "Women Helped",
        value: "300+",
        description: "PCOS patients treated",
        icon: "Heart"
      },
      {
        label: "Comprehensive Care",
        value: "24/7",
        description: "Support availability",
        icon: "Clock"
      }
    ]
  },

  cta: {
    title: "Ready to Take Control",
    subtitle: "of Your PCOS Journey?",
    description: "Don't let PCOS symptoms control your life. Dr. Amita Shukla and our specialized team are here to help you achieve hormonal balance, improve your symptoms, and optimize your health through personalized PCOS management.",
    primaryAction: {
      text: "Schedule PCOS Consultation",
      href: "/contact",
      icon: "Calendar"
    },
    secondaryAction: {
      text: "Call +91 8303222222",
      href: "tel:+918303222222", 
      icon: "Phone"
    },
    features: [
      "Comprehensive Hormonal Assessment",
      "Personalized Treatment Plans",
      "Lifestyle Modification Support"
    ],
    urgencyNote: "Early intervention leads to better long-term health outcomes",
    trustIndicators: [
      { text: "300+ Women Successfully Treated", icon: "Heart" },
      { text: "Evidence-Based Treatment Approaches", icon: "Award" },
      { text: "10+ Years PCOS Expertise", icon: "Clock" }
    ]
  },

  seo: {
    title: "PCOS PCOD Treatment Lucknow | Hormonal Balance | Dr. Amita Shukla",
    description: "Expert PCOS PCOD treatment in Lucknow by Dr. Amita Shukla. Comprehensive hormonal balance, fertility support, lifestyle management. Personalized care for better health outcomes. Book consultation +91 8303222222",
    keywords: [
      "PCOS treatment Lucknow",
      "PCOD treatment Lucknow", 
      "polycystic ovary syndrome Lucknow",
      "Dr. Amita Shukla PCOS",
      "hormonal imbalance treatment Lucknow",
      "irregular periods Lucknow",
      "PCOS fertility treatment Lucknow",
      "hirsutism treatment Lucknow",
      "insulin resistance treatment Lucknow",
      "PCOS weight management Lucknow",
      "ovulation induction Lucknow",
      "PCOS lifestyle management",
      "best PCOS doctor Lucknow",
      "PCOS specialist Lucknow",
      "gynecologist PCOS Uttar Pradesh"
    ],
    ogImage: "https://i.ibb.co/LXHkZKWc/PCOS-PCOD-care.png",
    canonicalUrl: "https://dramitashukla.com/services/pcos-pcod-treatment",
    structuredData: {
      "@type": "MedicalProcedure",
      "name": "PCOS/PCOD Treatment",
      "description": "Comprehensive management of Polycystic Ovary Syndrome and Polycystic Ovary Disorder with personalized treatment approaches addressing hormonal imbalances and reproductive health.",
      "procedureType": "Medical Treatment and Management",
      "bodyLocation": "Ovaries, Reproductive system, Endocrine system",
      "preparation": "Medical history review, hormonal tests, ultrasound evaluation",
      "followup": "Regular monitoring every 3-6 months, lifestyle counseling, medication adjustments",
      "benefits": [
        "Improved menstrual regularity",
        "Enhanced fertility potential",
        "Better metabolic health",
        "Reduced long-term health risks"
      ],
      "indication": [
        "Irregular menstrual cycles",
        "Infertility related to PCOS",
        "Metabolic dysfunction",
        "Cosmetic concerns (hirsutism, acne)"
      ],
      "medicalCode": {
        "@type": "MedicalCode",
        "code": "E28.2",
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