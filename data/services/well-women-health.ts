import { 
  ServicePageData, 
  ProcessStep,
  TreatmentOption,
  FAQ,
  Differentiator,
  RiskFactor
} from '@/types/services';

export const wellWomenHealthData: ServicePageData = {
  service: {
    name: "Well Women Health",
    slug: "well-women-health",
    category: "Preventive Care",
    description: "Comprehensive preventive healthcare services for women including regular check-ups, screening tests, health education, and wellness programs to maintain optimal health throughout all life stages.",
    shortDescription: "Preventive healthcare services focused on maintaining and improving women's health at every life stage.",
    icon: "UserRound",
    featured: true
  },

  hero: {
    title: "Well Women Health",
    subtitle: "Comprehensive Preventive Healthcare for Women",
    description: "Complete well women health services in Lucknow with Dr. Amita Shukla. Comprehensive preventive care including regular health screenings, wellness check-ups, health education, and personalized guidance to maintain optimal health throughout all stages of a woman's life.",
    image: "https://i.ibb.co/Q3HthvMW/women-health.png",
    imageAlt: "Well Women Health Services by Dr. Amita Shukla in Lucknow",
    badges: [
      "Preventive Care",
      "Health Screenings",
      "Wellness Programs",
      "Life Stage Care"
    ],
    primaryCTA: {
      text: "Schedule Check-up",
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
      successRate: "Comprehensive",
      specialization: "Preventive"
    }
  },

  overview: {
    introduction: "Well women health focuses on preventive care and health maintenance for women throughout their lives. Dr. Amita Shukla provides comprehensive well women services in Lucknow, emphasizing early detection of health issues, health promotion, and disease prevention through regular screenings, health education, and personalized wellness planning.",
    keyPoints: [
      "Regular health screenings and preventive examinations for early detection",
      "Age-appropriate health maintenance and wellness counseling",
      "Reproductive health planning and contraceptive counseling",
      "Menopause management and hormone health optimization",
      "Health education about nutrition, exercise, and lifestyle modifications",
      "Coordination of care with other specialists for comprehensive health management"
    ],
    statistics: [
      {
        label: "Age Groups Served",
        value: "All",
        description: "From adolescence to elderly",
        icon: "Users"
      },
      {
        label: "Screening Tests",
        value: "15+",
        description: "Comprehensive assessments",
        icon: "FileText"
      },
      {
        label: "Years Experience",
        value: "10+",
        description: "In women's healthcare",
        icon: "Award"
      },
      {
        label: "Prevention Focus",
        value: "Primary",
        description: "Early detection emphasis",
        icon: "Shield"
      }
    ],
    benefits: [
      "Early detection of health problems before symptoms develop",
      "Prevention of serious health conditions through proactive care",
      "Personalized health recommendations based on individual risk factors",
      "Improved quality of life through optimal health maintenance",
      "Cost-effective healthcare through prevention rather than treatment",
      "Enhanced understanding of personal health and wellness needs",
      "Better preparation for life transitions and health changes"
    ],
    whoCanBenefit: [
      "Adolescents beginning reproductive health care",
      "Women of reproductive age seeking family planning and health maintenance",
      "Those approaching or experiencing menopause",
      "Women with family history of certain health conditions",
      "Anyone seeking preventive care and health optimization",
      "Those wanting comprehensive health screenings and wellness guidance",
      "Women at any life stage focused on maintaining optimal health"
    ],
    disclaimer: "Well women care is individualized based on age, health history, and risk factors. Screening recommendations may vary based on current medical guidelines and individual circumstances. Regular preventive care is recommended for optimal health maintenance."
  },

  process: {
    title: "Comprehensive Well Women Care Process",
    subtitle: "Systematic approach to preventive healthcare throughout life stages",
    description: "Our well women health program provides comprehensive preventive care tailored to each life stage, with emphasis on early detection, health promotion, and personalized wellness planning.",
    steps: [
      {
        step: 1,
        title: "Comprehensive Health Assessment",
        description: "Thorough evaluation of current health status and risk factors",
        duration: "Initial visit 60-90 minutes",
        includes: [
          "Complete medical history including family history and lifestyle factors",
          "Physical examination including breast and pelvic examination",
          "Review of current medications, supplements, and health practices",
          "Assessment of personal and family risk factors for various conditions",
          "Discussion of health goals and concerns"
        ],
        icon: "Stethoscope"
      },
      {
        step: 2,
        title: "Age-Appropriate Screening Tests",
        description: "Evidence-based screening tests based on age and risk factors",
        duration: "Various timeframes based on specific tests",
        includes: [
          "Cervical cancer screening (Pap smear) based on current guidelines",
          "Breast cancer screening recommendations and clinical breast examination",
          "Bone density testing when indicated for osteoporosis risk",
          "Cardiovascular risk assessment and screening tests",
          "Laboratory tests including blood counts, metabolic panel, and lipid profile"
        ],
        icon: "Microscope"
      },
      {
        step: 3,
        title: "Health Education and Counseling",
        description: "Personalized guidance on health maintenance and disease prevention",
        duration: "Ongoing throughout visits",
        includes: [
          "Nutrition counseling and weight management guidance",
          "Exercise recommendations appropriate for age and health status",
          "Reproductive health education and family planning counseling",
          "Lifestyle modification recommendations for health optimization",
          "Health risk reduction strategies based on individual factors"
        ],
        icon: "FileText"
      },
      {
        step: 4,
        title: "Personalized Care Planning",
        description: "Development of individualized health maintenance plan",
        duration: "Developed and updated at each visit",
        includes: [
          "Customized screening schedule based on age and risk factors",
          "Preventive care recommendations and immunization updates",
          "Referrals to specialists when indicated for specific health needs",
          "Follow-up scheduling for ongoing health maintenance",
          "Action plan for addressing identified health concerns"
        ],
        icon: "Heart"
      }
    ],
    timeline: {
      totalDuration: "Ongoing throughout life with regular check-ups",
      frequency: "Annual visits with additional screenings as recommended",
      followUp: "Continuous health maintenance with updated care plans"
    }
  },

  treatments: {
    title: "Well Women Health Services",
    subtitle: "Comprehensive preventive healthcare services for every life stage",
    description: "Our well women health program offers a complete range of preventive services designed to maintain optimal health and detect potential issues early for better outcomes.",
    options: [
      {
        name: "Annual Well Women Examinations",
        description: "Comprehensive yearly check-ups focusing on prevention and early detection",
        suitableFor: [
          "All women aged 18 and older for routine health maintenance",
          "Those seeking comprehensive preventive healthcare",
          "Women with family history of certain health conditions",
          "Anyone wanting to establish baseline health status and ongoing care"
        ],
        successRate: "High effectiveness in early detection and prevention when combined with regular participation",
        duration: "60-90 minutes for comprehensive examination",
        procedure: [
          "Complete physical examination including breast and pelvic examination",
          "Review of health history, medications, and lifestyle factors",
          "Age-appropriate screening tests and laboratory work",
          "Health counseling and preventive care recommendations"
        ],
        benefits: [
          "Early detection of potential health problems",
          "Establishment of baseline health parameters",
          "Personalized health recommendations",
          "Peace of mind through comprehensive evaluation"
        ],
        recovery: "No recovery needed; routine examination with immediate results discussion"
      },
      {
        name: "Reproductive Health and Family Planning",
        description: "Comprehensive reproductive health services and contraceptive counseling",
        suitableFor: [
          "Women of reproductive age seeking family planning guidance",
          "Those needing contraceptive counseling and management",
          "Women planning pregnancy with preconception care needs",
          "Those with reproductive health concerns or questions"
        ],
        successRate: "Excellent outcomes with appropriate contraceptive selection and family planning guidance",
        duration: "30-60 minutes depending on complexity of needs",
        procedure: [
          "Assessment of reproductive health needs and goals",
          "Discussion of contraceptive options and their benefits/risks",
          "Physical examination and necessary testing",
          "Prescription or placement of chosen contraceptive method"
        ],
        benefits: [
          "Informed decision-making about reproductive choices",
          "Effective family planning and birth spacing",
          "Prevention of unintended pregnancies",
          "Optimization of reproductive health"
        ],
        recovery: "Minimal recovery for most contraceptive methods; specific instructions provided"
      },
      {
        name: "Menopause Management and Hormone Health",
        description: "Comprehensive care for perimenopause and menopause transition",
        suitableFor: [
          "Women experiencing perimenopausal symptoms",
          "Those in menopause seeking symptom management",
          "Women with concerns about hormone changes and health",
          "Those needing guidance about menopause-related health risks"
        ],
        successRate: "Significant symptom improvement and better quality of life for most women",
        duration: "45-60 minutes for initial consultation, shorter for follow-up visits",
        procedure: [
          "Assessment of menopausal symptoms and their impact on life",
          "Discussion of treatment options including hormonal and non-hormonal approaches",
          "Evaluation of hormone therapy benefits and risks",
          "Development of personalized management plan"
        ],
        benefits: [
          "Relief from menopausal symptoms",
          "Better understanding of hormone changes",
          "Reduced risk of long-term health complications",
          "Improved quality of life during transition"
        ],
        recovery: "Gradual improvement in symptoms with appropriate management"
      },
      {
        name: "Cancer Screening and Prevention",
        description: "Evidence-based screening programs for early detection of cancers",
        suitableFor: [
          "All women following age-appropriate screening guidelines",
          "Those with family history of cancer requiring enhanced screening",
          "Women with personal risk factors for specific cancers",
          "Anyone seeking comprehensive cancer prevention guidance"
        ],
        successRate: "High effectiveness in early detection when screening guidelines are followed",
        duration: "15-30 minutes per screening test",
        procedure: [
          "Cervical cancer screening (Pap smear and HPV testing)",
          "Clinical breast examination and mammography referrals",
          "Assessment for other cancer risk factors",
          "Counseling about cancer prevention strategies"
        ],
        benefits: [
          "Early detection of pre-cancerous and cancerous changes",
          "Reduced cancer mortality through timely intervention",
          "Peace of mind through regular screening",
          "Education about cancer prevention strategies"
        ],
        recovery: "No recovery needed for screening tests; results discussed when available"
      },
      {
        name: "Osteoporosis Prevention and Bone Health",
        description: "Assessment and management of bone health throughout life",
        suitableFor: [
          "Women approaching or past menopause",
          "Those with family history of osteoporosis",
          "Women with risk factors for bone loss",
          "Anyone concerned about bone health and fracture prevention"
        ],
        successRate: "Effective prevention and management of bone loss with appropriate interventions",
        duration: "30-45 minutes for assessment and counseling",
        procedure: [
          "Assessment of bone health risk factors",
          "Bone density testing when indicated",
          "Nutritional counseling for calcium and vitamin D optimization",
          "Exercise recommendations for bone health"
        ],
        benefits: [
          "Prevention of osteoporosis and fractures",
          "Early identification of bone loss",
          "Lifestyle modifications for bone health",
          "Reduced risk of disability from fractures"
        ],
        recovery: "Lifestyle changes implemented gradually with ongoing monitoring"
      },
      {
        name: "Cardiovascular Health Assessment",
        description: "Comprehensive evaluation and management of heart disease risk factors",
        suitableFor: [
          "Women with family history of heart disease",
          "Those with risk factors such as hypertension, diabetes, or high cholesterol",
          "Women seeking cardiovascular disease prevention",
          "Those experiencing symptoms suggestive of heart problems"
        ],
        successRate: "Significant risk reduction with appropriate lifestyle modifications and treatment",
        duration: "45-60 minutes for comprehensive cardiovascular assessment",
        procedure: [
          "Assessment of cardiovascular risk factors",
          "Blood pressure monitoring and cholesterol screening",
          "Discussion of lifestyle modifications for heart health",
          "Referral to cardiologist when indicated"
        ],
        benefits: [
          "Early identification of cardiovascular risk",
          "Prevention of heart disease through risk modification",
          "Better management of existing risk factors",
          "Improved long-term cardiovascular outcomes"
        ],
        recovery: "Ongoing lifestyle modifications with regular monitoring"
      }
    ],
    consultationNote: "Well women care is personalized based on your age, health history, and individual risk factors. Dr. Amita Shukla will work with you to develop a comprehensive preventive care plan that addresses your specific health needs and goals for optimal wellness throughout your life."
  },

  riskFactors: {
    title: "Women's Health Risk Factors",
    subtitle: "Understanding factors that influence women's health throughout life",
    description: "Various factors can affect women's health outcomes. Understanding these risk factors helps in developing appropriate preventive care strategies and health maintenance plans.",
    factors: [
      {
        category: "Age-Related Risk Factors",
        description: "Health considerations that change with different life stages",
        factors: [
          "Increased cancer risk with advancing age requiring enhanced screening",
          "Cardiovascular disease risk increases significantly after menopause",
          "Bone density loss accelerates after menopause increasing fracture risk",
          "Cognitive changes and dementia risk may increase with age"
        ],
        riskLevel: "moderate",
        prevention: [
          "Age-appropriate screening schedules for early detection",
          "Lifestyle modifications to reduce age-related disease risk",
          "Hormone therapy consideration for appropriate candidates",
          "Regular physical activity and cognitive engagement"
        ]
      },
      {
        category: "Genetic and Family History Factors",
        description: "Hereditary factors that may influence health outcomes",
        factors: [
          "Family history of breast, ovarian, or other cancers",
          "Genetic predisposition to heart disease, diabetes, or osteoporosis",
          "Inherited conditions affecting reproductive health",
          "Family history of mental health conditions"
        ],
        riskLevel: "high",
        prevention: [
          "Enhanced screening protocols for high-risk individuals",
          "Genetic counseling and testing when appropriate",
          "Preventive medications or interventions when indicated",
          "Early and more frequent monitoring for at-risk conditions"
        ]
      },
      {
        category: "Lifestyle and Environmental Factors",
        description: "Modifiable factors that significantly impact women's health",
        factors: [
          "Smoking, excessive alcohol consumption, or substance use",
          "Sedentary lifestyle and poor nutrition habits",
          "Chronic stress and inadequate sleep patterns",
          "Environmental exposures and occupational hazards"
        ],
        riskLevel: "moderate",
        prevention: [
          "Smoking cessation programs and substance abuse counseling",
          "Nutritional counseling and exercise program development",
          "Stress management techniques and sleep hygiene education",
          "Environmental safety assessment and risk reduction"
        ]
      },
      {
        category: "Reproductive and Hormonal Factors",
        description: "Reproductive history and hormonal factors affecting health",
        factors: [
          "Early menarche or late menopause affecting hormone exposure",
          "Nulliparity or late first pregnancy affecting cancer risk",
          "Use of hormonal medications including birth control or hormone therapy",
          "History of pregnancy complications affecting future health risk"
        ],
        riskLevel: "moderate",
        prevention: [
          "Individualized screening based on reproductive history",
          "Careful consideration of hormone therapy risks and benefits",
          "Lifestyle modifications to balance hormonal factors",
          "Regular monitoring for hormone-related health conditions"
        ]
      }
    ]
  },

  faqs: {
    title: "Well Women Health FAQs",
    subtitle: "Common questions about preventive healthcare for women",
    description: "Expert answers to frequently asked questions about well women health services, preventive care, and health maintenance throughout life.",
    faqs: [
      {
        question: "How often should I have a well women examination?",
        answer: "Most women should have annual well women examinations starting at age 18 or when sexually active. Some screening tests may be done less frequently based on current guidelines and individual risk factors. Dr. Amita will recommend the appropriate schedule based on your age and health status.",
        category: "general"
      },
      {
        question: "What should I expect during a well women visit?",
        answer: "A well women visit includes a comprehensive health history, physical examination including breast and pelvic exam, age-appropriate screening tests, discussion of health concerns, and personalized health education. The visit typically takes 60-90 minutes for a comprehensive evaluation.",
        category: "appointments"
      },
      {
        question: "At what age should I start getting Pap smears?",
        answer: "Current guidelines recommend starting cervical cancer screening at age 21, regardless of sexual activity onset. Pap smears are typically done every 3 years for women aged 21-29, and every 3-5 years for women 30-65 depending on the type of test used.",
        category: "screening"
      },
      {
        question: "When should I start getting mammograms?",
        answer: "Most women should begin annual mammography at age 40-50, depending on current guidelines and risk factors. Women with family history of breast cancer may need to start earlier. Dr. Amita will recommend the appropriate screening schedule based on your individual risk factors.",
        category: "screening"
      },
      {
        question: "What contraceptive options are available?",
        answer: "Many contraceptive options are available including pills, patches, injections, IUDs, implants, barrier methods, and permanent sterilization. The best choice depends on your health, lifestyle, and family planning goals. Dr. Amita will discuss all options to help you make an informed decision.",
        category: "contraception"
      },
      {
        question: "How can I manage menopause symptoms?",
        answer: "Menopause symptoms can be managed through lifestyle modifications, non-hormonal treatments, or hormone therapy depending on your symptoms and health status. Options include dietary changes, exercise, stress management, and various medications. Treatment is individualized based on your specific needs.",
        category: "menopause"
      },
      {
        question: "What can I do to prevent osteoporosis?",
        answer: "Osteoporosis prevention includes adequate calcium and vitamin D intake, regular weight-bearing exercise, avoiding smoking and excessive alcohol, and bone density testing when appropriate. Some women may benefit from medications to prevent bone loss, especially after menopause.",
        category: "prevention"
      },
      {
        question: "How can I reduce my risk of heart disease?",
        answer: "Heart disease prevention includes maintaining healthy blood pressure and cholesterol levels, regular exercise, healthy diet, weight management, not smoking, and managing stress. Regular check-ups help monitor risk factors and implement preventive strategies early.",
        category: "prevention"
      },
      {
        question: "Should I take vitamins or supplements?",
        answer: "Most women benefit from a daily multivitamin with folic acid, especially if planning pregnancy. Calcium and vitamin D supplements may be recommended based on dietary intake and bone health needs. Dr. Amita will assess your individual needs and make appropriate recommendations.",
        category: "nutrition"
      },
      {
        question: "What lifestyle changes can improve my overall health?",
        answer: "Key lifestyle factors include regular physical activity, balanced nutrition, adequate sleep, stress management, avoiding smoking, limiting alcohol, and maintaining healthy relationships. Small, consistent changes often lead to significant long-term health benefits.",
        category: "lifestyle"
      },
      {
        question: "How do I know if I need to see a specialist?",
        answer: "Dr. Amita will recommend specialist referrals when specific expertise is needed for complex conditions, abnormal screening results, or specialized procedures. She coordinates care with specialists while maintaining your overall health management.",
        category: "referrals"
      },
      {
        question: "What should I do to prepare for my well women visit?",
        answer: "Prepare by listing current medications, noting any health concerns or symptoms, bringing previous medical records if new to the practice, and writing down questions you want to discuss. Avoid intercourse, douching, or vaginal medications 24 hours before pelvic examination.",
        category: "preparation"
      }
    ],
    contactNote: "Well women health care is personalized based on your individual needs, age, and health status. This information is educational and should complement regular preventive care visits. Schedule your well women examination with Dr. Amita Shukla for comprehensive healthcare tailored to your needs."
  },

  differentiators: {
    title: "Why Choose Our Well Women Health Program",
    subtitle: "Comprehensive preventive care with personalized attention and evidence-based guidance",
    description: "Our well women health program provides comprehensive preventive healthcare with focus on early detection, health promotion, and personalized care throughout all stages of a woman's life.",
    items: [
      {
        title: "Comprehensive Preventive Care",
        description: "Complete health assessment and screening programs for optimal health maintenance",
        features: [
          "Age-appropriate screening tests following current medical guidelines",
          "Comprehensive physical examinations with attention to detail",
          "Personalized risk assessment based on individual and family history",
          "Coordinated care with specialists when additional expertise needed",
          "Focus on prevention and early detection for better outcomes"
        ],
        icon: "Shield",
        highlights: ["Evidence-based screening", "Comprehensive assessment"]
      },
      {
        title: "Life Stage Specialized Care",
        description: "Healthcare services tailored to each stage of a woman's life",
        features: [
          "Adolescent health services for young women starting healthcare",
          "Reproductive age care including family planning and preconception counseling",
          "Perimenopausal and menopausal care with symptom management",
          "Post-menopausal health maintenance and disease prevention",
          "Elderly care focusing on age-related health concerns"
        ],
        icon: "Users",
        highlights: ["All life stages", "Specialized care"]
      },
      {
        title: "Expert Women's Healthcare",
        description: "Specialized knowledge in women's health issues and preventive care",
        features: [
          "10+ years of experience in women's healthcare and preventive medicine",
          "Up-to-date knowledge of current screening guidelines and recommendations",
          "Expertise in reproductive health, menopause, and age-related health changes",
          "Understanding of women-specific disease risks and prevention strategies",
          "Commitment to evidence-based practice and continuing education"
        ],
        icon: "Award",
        highlights: ["10+ years experience", "Women's health expertise"]
      },
      {
        title: "Personalized Health Education",
        description: "Comprehensive education and counseling for informed health decisions",
        features: [
          "Individualized health education based on personal risk factors",
          "Clear explanation of screening tests and their importance",
          "Lifestyle counseling for nutrition, exercise, and wellness",
          "Family planning education and contraceptive counseling",
          "Menopause education and management option discussions"
        ],
        icon: "FileText",
        highlights: ["Personalized education", "Informed decisions"]
      },
      {
        title: "Holistic Health Approach",
        description: "Comprehensive care addressing physical, emotional, and social health aspects",
        features: [
          "Assessment of mental health and stress factors affecting overall wellness",
          "Attention to work-life balance and its impact on health",
          "Social support system assessment and community resource connections",
          "Integration of complementary approaches when appropriate",
          "Focus on quality of life improvement alongside disease prevention"
        ],
        icon: "Heart",
        highlights: ["Holistic approach", "Quality of life focus"]
      },
      {
        title: "Coordinated Healthcare Management",
        description: "Seamless coordination with other healthcare providers for comprehensive care",
        features: [
          "Referrals to specialists coordinated efficiently when needed",
          "Communication with other healthcare providers for integrated care",
          "Management of chronic conditions in coordination with appropriate specialists",
          "Insurance navigation assistance for covered preventive services",
          "Electronic health records for continuity of care"
        ],
        icon: "Activity",
        highlights: ["Coordinated care", "Seamless referrals"]
      }
    ],
    trustStatistics: [
      {
        label: "Age Groups",
        value: "All",
        description: "Comprehensive life stage care",
        icon: "Users"
      },
      {
        label: "Screening Tests",
        value: "15+",
        description: "Comprehensive assessments",
        icon: "FileText"
      },
      {
        label: "Years Experience",
        value: "10+",
        description: "In women's healthcare",
        icon: "Award"
      },
      {
        label: "Prevention Focus",
        value: "Primary",
        description: "Early detection emphasis",
        icon: "Shield"
      }
    ]
  },

  cta: {
    title: "Well Women Health Care",
    subtitle: "Comprehensive Preventive Healthcare",
    description: "Invest in your long-term health with comprehensive well women care. Dr. Amita Shukla provides personalized preventive healthcare services to help you maintain optimal health at every stage of life.",
    primaryAction: {
      text: "Schedule Check-up",
      href: "/contact",
      icon: "Calendar"
    },
    secondaryAction: {
      text: "Call +91 8303222222",
      href: "tel:+918303222222", 
      icon: "Phone"
    },
    features: [
      "Comprehensive Health Screenings",
      "Personalized Preventive Care",
      "Life Stage Specialized Services"
    ],
    urgencyNote: "Regular preventive care is the foundation of long-term health and wellness",
    trustIndicators: [
      { text: "10+ Years Women's Healthcare Experience", icon: "Award" },
      { text: "Comprehensive Preventive Care Programs", icon: "Shield" },
      { text: "Personalized Health Education", icon: "Heart" }
    ]
  },

  seo: {
    title: "Well Women Health Care Lucknow | Dr. Amita Shukla",
    description: "Comprehensive well women health services in Lucknow. Preventive care, health screenings, reproductive health, menopause management. Expert women's healthcare with Dr. Amita Shukla.",
    keywords: [
      "well women health Lucknow",
      "women's health checkup Lucknow",
      "preventive care women Lucknow",
      "gynecologist checkup Lucknow",
      "women's health screening Lucknow",
      "Dr. Amita Shukla women's health",
      "reproductive health Lucknow",
      "menopause treatment Lucknow",
      "women's wellness Lucknow",
      "contraceptive counseling Lucknow",
      "cancer screening women Lucknow",
      "osteoporosis prevention Lucknow",
      "women's healthcare UP",
      "annual checkup women Lucknow",
      "preventive gynecology Lucknow"
    ],
    ogImage: "https://i.ibb.co/Q3HthvMW/women-health.png",
    canonicalUrl: "https://dramitashukla.com/services/well-women-health",
    structuredData: {
      "@type": "MedicalProcedure",
      "name": "Well Women Health Care",
      "description": "Comprehensive preventive healthcare services for women including regular check-ups, screening tests, health education, and wellness programs for optimal health throughout all life stages."
    }
  },

  config: {
    theme: "primary",
    showEmergencyBanner: false,
    customSections: ["process", "treatments", "riskFactors", "differentiators"]
  }
};