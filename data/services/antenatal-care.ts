import { 
  ServicePageData, 
  ProcessStep,
  TreatmentOption,
  FAQ,
  Differentiator,
  RiskFactor
} from '@/types/services';

export const antenatalCareData: ServicePageData = {
  service: {
    name: "Comprehensive Antenatal Care",
    slug: "antenatal-care",
    category: "Pregnancy",
    description: "Complete pregnancy care including regular check-ups, screening tests, monitoring, and education to ensure healthy outcomes for both mother and baby throughout pregnancy.",
    shortDescription: "Comprehensive prenatal care for healthy pregnancy outcomes with expert monitoring and guidance.",
    icon: "Stethoscope",
    featured: true
  },

  hero: {
    title: "Comprehensive Antenatal Care",
    subtitle: "Expert Pregnancy Care from Conception to Delivery",
    description: "Complete antenatal care in Lucknow with Dr. Amita Shukla. Comprehensive pregnancy monitoring, screening tests, health education, and personalized care to ensure the best outcomes for both mother and baby throughout your pregnancy journey.",
    image: "https://i.ibb.co/b5DLnkFt/Antenatal.png",
    imageAlt: "Comprehensive Antenatal Care by Dr. Amita Shukla in Lucknow",
    badges: [
      "Complete Pregnancy Care",
      "Regular Monitoring",
      "Expert Guidance",
      "Health Education"
    ],
    primaryCTA: {
      text: "Book Antenatal Visit",
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
      specialization: "Complete"
    }
  },

  overview: {
    introduction: "Antenatal care is essential healthcare for pregnant women, providing comprehensive monitoring, screening, and support throughout pregnancy. Dr. Amita Shukla offers complete prenatal care in Lucknow, combining evidence-based medical care with personalized attention to ensure healthy outcomes for both mother and baby during this important journey.",
    keyPoints: [
      "Regular monitoring of maternal and fetal health throughout pregnancy",
      "Comprehensive screening tests to detect potential complications early",
      "Personalized nutrition counseling and lifestyle guidance",
      "Education about pregnancy, labor, delivery, and newborn care",
      "Management of pregnancy-related discomforts and concerns",
      "Preparation for labor, delivery, and postpartum period"
    ],
    statistics: [
      {
        label: "Pregnancy Visits",
        value: "12-15",
        description: "Recommended throughout pregnancy",
        icon: "Calendar"
      },
      {
        label: "Screening Tests",
        value: "10+",
        description: "Comprehensive assessments",
        icon: "FileText"
      },
      {
        label: "Years Experience",
        value: "10+",
        description: "In pregnancy care",
        icon: "Award"
      },
      {
        label: "Successful Outcomes",
        value: "High",
        description: "Healthy deliveries",
        icon: "TrendingUp"
      }
    ],
    benefits: [
      "Early detection and prevention of pregnancy complications",
      "Optimal maternal and fetal health monitoring throughout pregnancy",
      "Reduced risk of pregnancy-related problems through early intervention",
      "Comprehensive health education for informed decision-making",
      "Personalized care plans based on individual risk factors",
      "Better preparation for labor, delivery, and parenthood",
      "Improved pregnancy outcomes and maternal satisfaction"
    ],
    whoCanBenefit: [
      "All pregnant women from confirmation of pregnancy through delivery",
      "First-time mothers needing comprehensive guidance and education",
      "Women with previous pregnancy complications requiring specialized monitoring",
      "Those with medical conditions requiring coordinated pregnancy care",
      "Women planning pregnancy who want preconception counseling",
      "Those experiencing pregnancy-related concerns or discomforts",
      "Anyone seeking expert prenatal care and delivery planning"
    ],
    disclaimer: "Antenatal care should begin as early as possible in pregnancy for optimal outcomes. Individual care plans may vary based on medical history, risk factors, and pregnancy progress. Regular attendance at scheduled appointments is important for comprehensive monitoring."
  },

  process: {
    title: "Comprehensive Antenatal Care Timeline",
    subtitle: "Structured pregnancy care from early pregnancy through delivery",
    description: "Our antenatal care program follows evidence-based guidelines to provide comprehensive monitoring and support throughout your pregnancy, with care intensity increasing as pregnancy progresses.",
    steps: [
      {
        step: 1,
        title: "First Trimester Care (0-12 weeks)",
        description: "Initial assessment, early pregnancy monitoring, and foundation establishment",
        duration: "Visits every 4-6 weeks",
        includes: [
          "Confirmation of pregnancy and dating ultrasound",
          "Comprehensive medical history and physical examination",
          "Initial blood tests including blood type, infections, and genetic screening",
          "Folic acid supplementation and nutritional counseling",
          "Early pregnancy education and lifestyle modifications"
        ],
        icon: "Stethoscope"
      },
      {
        step: 2,
        title: "Second Trimester Care (13-27 weeks)",
        description: "Detailed anatomical assessment and continued monitoring",
        duration: "Visits every 4 weeks",
        includes: [
          "Detailed anomaly scan (18-20 weeks) to assess fetal development",
          "Maternal serum screening for chromosomal abnormalities",
          "Glucose screening test for gestational diabetes (24-28 weeks)",
          "Blood pressure monitoring and weight management",
          "Preparation for third trimester and delivery planning"
        ],
        icon: "Activity"
      },
      {
        step: 3,
        title: "Third Trimester Care (28-40 weeks)",
        description: "Intensive monitoring and delivery preparation",
        duration: "Visits every 2-4 weeks, then weekly after 36 weeks",
        includes: [
          "Growth scans to monitor fetal development and position",
          "Group B Streptococcus screening and treatment if needed",
          "Blood pressure monitoring for pre-eclampsia detection",
          "Labor preparation classes and birth plan discussion",
          "Final preparations for delivery and postpartum care"
        ],
        icon: "Heart"
      },
      {
        step: 4,
        title: "Delivery and Immediate Postpartum",
        description: "Labor management and immediate post-delivery care",
        duration: "Continuous during labor, immediate postpartum assessment",
        includes: [
          "Labor progress monitoring and pain management options",
          "Continuous fetal monitoring during labor",
          "Delivery assistance and immediate newborn care",
          "Immediate postpartum assessment and complication monitoring",
          "Initiation of breastfeeding and newborn care education"
        ],
        icon: "Baby"
      }
    ],
    timeline: {
      totalDuration: "Comprehensive care throughout pregnancy (approximately 40 weeks)",
      frequency: "Regular visits increasing from monthly to weekly near term",
      followUp: "Postpartum care continues for 6 weeks after delivery"
    }
  },

  treatments: {
    title: "Antenatal Care Services",
    subtitle: "Comprehensive pregnancy monitoring and support services",
    description: "Our antenatal care program includes all essential services for healthy pregnancy management, from routine monitoring to specialized interventions based on individual needs.",
    options: [
      {
        name: "Routine Pregnancy Monitoring",
        description: "Regular assessments to monitor maternal and fetal health throughout pregnancy",
        suitableFor: [
          "All pregnant women throughout their pregnancy journey",
          "First-time mothers needing comprehensive guidance",
          "Women with previous normal pregnancies",
          "Those seeking routine preventive pregnancy care"
        ],
        successRate: "Excellent outcomes with regular monitoring and care adherence",
        duration: "Throughout pregnancy with visit frequency increasing near term",
        procedure: [
          "Regular weight, blood pressure, and urine monitoring",
          "Fetal heart rate assessment and growth monitoring",
          "Abdominal examination to assess uterine growth",
          "Discussion of pregnancy progress and any concerns"
        ],
        benefits: [
          "Early detection of potential complications",
          "Optimal maternal and fetal health maintenance",
          "Reduced anxiety through regular reassurance",
          "Better preparation for labor and delivery"
        ],
        recovery: "Ongoing throughout pregnancy with postpartum follow-up"
      },
      {
        name: "Comprehensive Screening Tests",
        description: "Evidence-based screening to detect potential problems early in pregnancy",
        suitableFor: [
          "All pregnant women as part of routine antenatal care",
          "Women with family history of genetic conditions",
          "Those with previous pregnancy complications",
          "Women over 35 or with additional risk factors"
        ],
        successRate: "High detection rates for major complications when combined with clinical assessment",
        duration: "Specific tests performed at optimal gestational ages",
        procedure: [
          "First trimester screening for chromosomal abnormalities",
          "Detailed anomaly scan at 18-20 weeks gestation",
          "Glucose tolerance test for gestational diabetes screening",
          "Group B Streptococcus screening in third trimester"
        ],
        benefits: [
          "Early identification of fetal abnormalities",
          "Timely detection of gestational diabetes",
          "Prevention of Group B Strep transmission to baby",
          "Informed decision-making based on results"
        ],
        recovery: "No recovery needed for non-invasive screening tests"
      },
      {
        name: "High-Risk Pregnancy Management",
        description: "Specialized care for pregnancies with increased risk factors",
        suitableFor: [
          "Women with pre-existing medical conditions",
          "Those with previous pregnancy complications",
          "Multiple pregnancies (twins, triplets)",
          "Women with pregnancy complications requiring specialized care"
        ],
        successRate: "Excellent outcomes with appropriate specialist care and monitoring",
        duration: "More frequent visits and monitoring throughout pregnancy",
        procedure: [
          "Enhanced monitoring with additional tests and scans",
          "Coordination with specialist physicians as needed",
          "Customized care plans based on specific risk factors",
          "More frequent fetal surveillance and maternal monitoring"
        ],
        benefits: [
          "Optimized outcomes despite high-risk factors",
          "Prevention of complications through intensive monitoring",
          "Coordinated care with multiple specialists when needed",
          "Reduced maternal and fetal risks through expert management"
        ],
        recovery: "May require extended monitoring postpartum depending on conditions"
      },
      {
        name: "Nutrition and Lifestyle Counseling",
        description: "Comprehensive guidance on optimal nutrition and healthy lifestyle during pregnancy",
        suitableFor: [
          "All pregnant women seeking optimal health outcomes",
          "Those with specific dietary restrictions or requirements",
          "Women with pregnancy-related nausea or appetite changes",
          "Those needing weight management guidance during pregnancy"
        ],
        successRate: "Improved pregnancy outcomes with proper nutrition and lifestyle modifications",
        duration: "Ongoing counseling throughout pregnancy visits",
        procedure: [
          "Assessment of current diet and nutritional status",
          "Personalized nutrition recommendations based on individual needs",
          "Guidance on safe exercise and activity during pregnancy",
          "Education about foods to avoid and optimal weight gain"
        ],
        benefits: [
          "Optimal fetal growth and development",
          "Reduced risk of pregnancy complications",
          "Better maternal energy and well-being",
          "Preparation for healthy breastfeeding"
        ],
        recovery: "Continued healthy habits benefit long-term maternal and child health"
      },
      {
        name: "Pregnancy Education and Preparation",
        description: "Comprehensive education about pregnancy, labor, delivery, and newborn care",
        suitableFor: [
          "First-time parents needing comprehensive education",
          "Those wanting to understand pregnancy changes and processes",
          "Women preparing for labor and delivery",
          "Couples planning for parenthood and newborn care"
        ],
        successRate: "Improved confidence and satisfaction with childbirth experience",
        duration: "Progressive education throughout pregnancy visits",
        procedure: [
          "Education about pregnancy changes and what to expect",
          "Labor and delivery preparation including pain management options",
          "Breastfeeding education and newborn care basics",
          "Postpartum recovery and family adjustment guidance"
        ],
        benefits: [
          "Reduced anxiety and fear about childbirth",
          "Better preparation for labor and delivery experience",
          "Improved confidence in newborn care abilities",
          "Better family adjustment to parenthood"
        ],
        recovery: "Knowledge and skills benefit entire family experience"
      },
      {
        name: "Labor and Delivery Planning",
        description: "Personalized planning for labor, delivery, and immediate postpartum period",
        suitableFor: [
          "All pregnant women approaching term",
          "Those with specific preferences for labor and delivery",
          "Women with medical conditions requiring delivery planning",
          "Those planning specific birthing experiences"
        ],
        successRate: "Higher satisfaction when delivery experience aligns with informed preferences",
        duration: "Planning discussions intensify in third trimester",
        procedure: [
          "Discussion of labor and delivery preferences and options",
          "Planning for pain management during labor",
          "Preparation for different delivery scenarios",
          "Coordination with delivery team and hospital preferences"
        ],
        benefits: [
          "More positive birthing experience",
          "Better preparation for various delivery scenarios",
          "Reduced anxiety about unknowns during labor",
          "Improved communication with delivery team"
        ],
        recovery: "Better prepared families often have smoother postpartum adjustment"
      }
    ],
    consultationNote: "Antenatal care is individualized based on your specific health history, risk factors, and pregnancy progress. Dr. Amita Shukla will work with you to develop a comprehensive care plan that meets your needs and ensures the best possible outcomes for you and your baby."
  },

  riskFactors: {
    title: "Pregnancy Risk Factors and Management",
    subtitle: "Understanding and managing factors that may affect pregnancy outcomes",
    description: "While many pregnancies progress normally, certain risk factors may require additional monitoring or specialized care. Understanding these factors helps ensure appropriate care planning.",
    factors: [
      {
        category: "Maternal Age Factors",
        description: "Age-related considerations for pregnancy care",
        factors: [
          "Pregnancy under age 18 with increased nutritional and social needs",
          "First pregnancy over age 35 (advanced maternal age)",
          "Previous pregnancies with complications related to maternal age",
          "Multiple pregnancies at advanced maternal age"
        ],
        riskLevel: "moderate",
        prevention: [
          "Enhanced monitoring with additional screening tests",
          "Nutritional counseling appropriate for age-specific needs",
          "Genetic counseling when indicated by maternal age",
          "Social support and education tailored to life stage"
        ]
      },
      {
        category: "Medical History Factors",
        description: "Pre-existing conditions and previous pregnancy history",
        factors: [
          "Chronic medical conditions such as diabetes, hypertension, or heart disease",
          "Previous pregnancy complications including pre-eclampsia or preterm birth",
          "History of recurrent pregnancy loss or fertility treatments",
          "Previous cesarean delivery or uterine surgery"
        ],
        riskLevel: "high",
        prevention: [
          "Preconception optimization of chronic medical conditions",
          "Enhanced monitoring protocols for known risk factors",
          "Coordination with specialists for complex medical conditions",
          "Individualized care plans based on specific history"
        ]
      },
      {
        category: "Current Pregnancy Factors",
        description: "Factors that develop during the current pregnancy",
        factors: [
          "Multiple pregnancy (twins, triplets, or higher-order multiples)",
          "Pregnancy complications such as gestational diabetes or hypertension",
          "Fetal growth restriction or other fetal complications",
          "Placental problems such as placenta previa or abruption"
        ],
        riskLevel: "high",
        prevention: [
          "Increased frequency of antenatal visits and monitoring",
          "Specialized testing and surveillance as indicated",
          "Early intervention and management of developing complications",
          "Delivery planning appropriate for specific complications"
        ]
      },
      {
        category: "Lifestyle and Social Factors",
        description: "Modifiable factors that can affect pregnancy outcomes",
        factors: [
          "Smoking, alcohol use, or substance use during pregnancy",
          "Poor nutrition or extreme weight (underweight or obese)",
          "Lack of social support or high levels of stress",
          "Environmental exposures or occupational hazards"
        ],
        riskLevel: "moderate",
        prevention: [
          "Counseling and support for lifestyle modifications",
          "Nutritional counseling and weight management guidance",
          "Social work referrals and community resource connections",
          "Environmental safety assessment and recommendations"
        ]
      }
    ]
  },

  faqs: {
    title: "Antenatal Care FAQs",
    subtitle: "Common questions about pregnancy care and monitoring",
    description: "Expert answers to frequently asked questions about antenatal care, helping expectant mothers understand what to expect during pregnancy care.",
    faqs: [
      {
        question: "When should I start antenatal care?",
        answer: "Antenatal care should begin as soon as you know you're pregnant, ideally by 8-10 weeks of pregnancy. Early care allows for proper dating, initial health assessment, and early detection of any complications. If you're planning pregnancy, preconception counseling is also beneficial.",
        category: "general"
      },
      {
        question: "How often will I need antenatal appointments?",
        answer: "For normal pregnancies, visits are typically every 4-6 weeks until 28 weeks, then every 2-4 weeks until 36 weeks, and weekly thereafter until delivery. High-risk pregnancies may require more frequent visits. Dr. Amita will customize your visit schedule based on your specific needs.",
        category: "appointments"
      },
      {
        question: "What happens during a typical antenatal visit?",
        answer: "Each visit includes weight and blood pressure checks, urine testing, measurement of uterine growth, listening to the baby's heartbeat, and discussion of any concerns. Additional tests like blood work or ultrasounds are performed at specific times during pregnancy.",
        category: "appointments"
      },
      {
        question: "What screening tests will I need during pregnancy?",
        answer: "Common screening tests include first trimester screening for chromosomal abnormalities, detailed ultrasound at 18-20 weeks, glucose tolerance test for gestational diabetes, and Group B Streptococcus screening. Dr. Amita will explain each test and when it's performed.",
        category: "testing"
      },
      {
        question: "How can I prepare for my antenatal appointments?",
        answer: "Bring a list of questions or concerns, any medications you're taking, and your pregnancy notes from previous visits. It's helpful to keep track of your baby's movements and any symptoms you're experiencing between visits.",
        category: "preparation"
      },
      {
        question: "What should I eat during pregnancy?",
        answer: "A balanced diet rich in fruits, vegetables, whole grains, lean proteins, and dairy is important. Take prenatal vitamins with folic acid, avoid alcohol and limit caffeine, and avoid high-mercury fish and unpasteurized foods. Dr. Amita will provide personalized nutrition guidance.",
        category: "nutrition"
      },
      {
        question: "Is it safe to exercise during pregnancy?",
        answer: "For most women, regular moderate exercise is safe and beneficial during pregnancy. Walking, swimming, and prenatal yoga are generally safe options. Avoid contact sports and activities with fall risk. Always consult Dr. Amita before starting any exercise program during pregnancy.",
        category: "lifestyle"
      },
      {
        question: "What pregnancy symptoms should I be concerned about?",
        answer: "Contact Dr. Amita immediately for severe headaches, vision changes, severe abdominal pain, vaginal bleeding, decreased fetal movement, severe swelling, or persistent vomiting. Regular communication about any concerning symptoms is important for safe pregnancy management.",
        category: "symptoms"
      },
      {
        question: "How will I know when labor is starting?",
        answer: "Signs of labor include regular contractions that get stronger and closer together, water breaking, bloody show, or strong back pain. Dr. Amita will discuss labor signs in detail during your third trimester visits and provide clear guidelines about when to call or come to the hospital.",
        category: "labor"
      },
      {
        question: "Can I travel during pregnancy?",
        answer: "Travel is generally safe during pregnancy, especially in the second trimester. Avoid travel to areas with infectious disease risks, stay hydrated, move frequently during long trips, and carry your pregnancy records. Discuss travel plans with Dr. Amita, especially for long trips or air travel.",
        category: "lifestyle"
      },
      {
        question: "What medications are safe during pregnancy?",
        answer: "Many medications are safe during pregnancy, but always check with Dr. Amita before taking any medications, including over-the-counter drugs and supplements. She will review all your medications and make recommendations for safe alternatives if needed.",
        category: "medications"
      },
      {
        question: "How do I prepare for breastfeeding?",
        answer: "Breastfeeding education begins during pregnancy with information about benefits, techniques, and common challenges. Dr. Amita will provide guidance on breast care, positioning, and what to expect. Consider attending breastfeeding classes if available in your area.",
        category: "breastfeeding"
      }
    ],
    contactNote: "Antenatal care is individualized based on your specific needs and risk factors. This information is educational and should supplement, not replace, regular antenatal visits. Schedule regular appointments with Dr. Amita Shukla for comprehensive pregnancy care tailored to your needs."
  },

  differentiators: {
    title: "Why Choose Our Antenatal Care Program",
    subtitle: "Comprehensive pregnancy care with personalized attention and expert guidance",
    description: "Our antenatal care program combines evidence-based medical care with personalized attention, providing comprehensive support throughout your pregnancy journey for optimal maternal and fetal outcomes.",
    items: [
      {
        title: "Comprehensive Pregnancy Monitoring",
        description: "Complete assessment and monitoring throughout your pregnancy journey",
        features: [
          "Regular monitoring of maternal and fetal health parameters",
          "Timely screening tests performed at optimal gestational ages",
          "Advanced ultrasound capabilities for detailed fetal assessment",
          "Comprehensive documentation and tracking of pregnancy progress",
          "Coordination of care with specialists when additional expertise needed"
        ],
        icon: "Activity",
        highlights: ["Complete monitoring", "Evidence-based care"]
      },
      {
        title: "Personalized Care Plans",
        description: "Individualized pregnancy care based on your specific needs and risk factors",
        features: [
          "Customized care plans based on medical history and risk assessment",
          "Flexible scheduling to accommodate your needs and preferences",
          "Personalized nutrition and lifestyle counseling",
          "Individual attention and time for questions and concerns",
          "Cultural sensitivity and respect for personal preferences"
        ],
        icon: "Heart",
        highlights: ["Individualized care", "Personal attention"]
      },
      {
        title: "Expert Medical Care",
        description: "Experienced obstetric care with focus on optimal outcomes",
        features: [
          "10+ years of experience in pregnancy care and delivery",
          "Up-to-date knowledge of current obstetric guidelines and practices",
          "Expertise in both normal and high-risk pregnancy management",
          "Strong background in managing pregnancy complications",
          "Commitment to continuing education and best practices"
        ],
        icon: "Award",
        highlights: ["10+ years experience", "Expert knowledge"]
      },
      {
        title: "Comprehensive Education and Support",
        description: "Thorough preparation for pregnancy, labor, delivery, and parenthood",
        features: [
          "Progressive education throughout pregnancy about changes and expectations",
          "Detailed preparation for labor, delivery, and pain management options",
          "Breastfeeding education and newborn care guidance",
          "Postpartum preparation and family adjustment support",
          "Resources and referrals for additional support services"
        ],
        icon: "FileText",
        highlights: ["Complete education", "Family preparation"]
      },
      {
        title: "Advanced Screening and Testing",
        description: "State-of-the-art screening technology for early detection of potential issues",
        features: [
          "High-resolution ultrasound equipment for detailed fetal imaging",
          "Comprehensive screening protocols for genetic and structural abnormalities",
          "Efficient laboratory services for timely test results",
          "Clear explanation of all test results and their implications",
          "Genetic counseling referrals when indicated"
        ],
        icon: "Microscope",
        highlights: ["Advanced technology", "Comprehensive screening"]
      },
      {
        title: "Seamless Care Coordination",
        description: "Integrated care with smooth transitions from pregnancy through delivery",
        features: [
          "Coordinated care with pediatricians for newborn care planning",
          "Integration with delivery team for smooth labor management",
          "Referrals to specialists coordinated when additional care needed",
          "Communication with insurance providers for coverage optimization",
          "Postpartum care coordination for mother and baby"
        ],
        icon: "Users",
        highlights: ["Coordinated care", "Smooth transitions"]
      }
    ],
    trustStatistics: [
      {
        label: "Pregnancy Visits",
        value: "12-15",
        description: "Comprehensive monitoring",
        icon: "Calendar"
      },
      {
        label: "Screening Tests",
        value: "10+",
        description: "Thorough assessment",
        icon: "FileText"
      },
      {
        label: "Years Experience",
        value: "10+",
        description: "In pregnancy care",
        icon: "Award"
      },
      {
        label: "Success Rate",
        value: "High",
        description: "Healthy outcomes",
        icon: "TrendingUp"
      }
    ]
  },

  cta: {
    title: "Comprehensive Antenatal Care",
    subtitle: "Expert Pregnancy Care for Healthy Outcomes",
    description: "Begin your pregnancy journey with confidence. Dr. Amita Shukla provides comprehensive antenatal care with personalized attention, ensuring optimal health for both you and your baby throughout pregnancy.",
    primaryAction: {
      text: "Book Antenatal Visit",
      href: "/contact",
      icon: "Calendar"
    },
    secondaryAction: {
      text: "Call +91 8303222222",
      href: "tel:+918303222222", 
      icon: "Phone"
    },
    features: [
      "Complete Pregnancy Monitoring",
      "Personalized Care Plans",
      "Expert Medical Guidance"
    ],
    urgencyNote: "Early antenatal care ensures the best outcomes for you and your baby",
    trustIndicators: [
      { text: "10+ Years Pregnancy Care Experience", icon: "Award" },
      { text: "Comprehensive Monitoring Throughout Pregnancy", icon: "Activity" },
      { text: "Personalized Care and Education", icon: "Heart" }
    ]
  },

  seo: {
    title: "Comprehensive Antenatal Care Lucknow | Dr. Amita Shukla",
    description: "Expert antenatal care in Lucknow. Complete pregnancy monitoring, screening tests, and personalized guidance throughout pregnancy. Healthy outcomes with Dr. Amita Shukla's comprehensive prenatal care.",
    keywords: [
      "antenatal care Lucknow",
      "pregnancy care Lucknow",
      "prenatal care Lucknow",
      "pregnancy checkup Lucknow",
      "pregnancy monitoring Lucknow",
      "Dr. Amita Shukla pregnancy care",
      "pregnancy doctor Lucknow",
      "obstetric care Lucknow",
      "pregnancy screening Lucknow",
      "comprehensive pregnancy care UP",
      "pregnancy management Lucknow",
      "maternal care Lucknow",
      "pregnancy consultation Lucknow",
      "prenatal screening Lucknow",
      "healthy pregnancy Lucknow"
    ],
    ogImage: "https://i.ibb.co/b5DLnkFt/Antenatal.png",
    canonicalUrl: "https://dramitashukla.com/services/antenatal-care",
    structuredData: {
      "@type": "MedicalProcedure",
      "name": "Comprehensive Antenatal Care",
      "description": "Complete pregnancy care including regular monitoring, screening tests, health education, and personalized guidance throughout pregnancy for optimal maternal and fetal outcomes.",
      "procedureType": "Prenatal Care and Monitoring",
      "bodyLocation": "Uterus, Reproductive system",
      "preparation": "Pregnancy confirmation, medical history review, initial blood tests",
      "followup": "Regular visits increasing from monthly to weekly, postpartum care for 6 weeks",
      "duration": "PT40W",
      "benefits": [
        "Early detection of pregnancy complications",
        "Optimal maternal and fetal health monitoring",
        "Comprehensive health education for informed decisions",
        "Better preparation for labor and delivery"
      ],
      "indication": [
        "Confirmed pregnancy",
        "Routine pregnancy monitoring",
        "High-risk pregnancy management",
        "Preconception counseling"
      ],
      "medicalCode": {
        "@type": "MedicalCode",
        "code": "Z34.9",
        "codingSystem": "ICD-10"
      }
    }
  },

  config: {
    theme: "forest",
    showEmergencyBanner: false,
    customSections: ["process", "treatments", "riskFactors", "differentiators"]
  }
};