import { 
  ServicePageData, 
  ProcessStep,
  TreatmentOption,
  FAQ,
  Differentiator,
  RiskFactor
} from '@/types/services';

export const pregnancyComplicationsData: ServicePageData = {
  service: {
    name: "Pregnancy Complications Management",
    slug: "pregnancy-complications",
    category: "Pregnancy",
    description: "Expert management of pregnancy complications including pre-eclampsia, gestational diabetes, placental disorders, and emergency obstetric conditions with 24/7 specialized care.",
    shortDescription: "Emergency and comprehensive care for high-risk pregnancy complications with immediate intervention capabilities.",
    icon: "AlertTriangle",
    featured: true
  },

  hero: {
    title: "Pregnancy Complications Management",
    subtitle: "Expert Emergency & Critical Care for High-Risk Pregnancies",
    description: "Specialized management of pregnancy complications in Lucknow. Dr. Amita Shukla provides immediate intervention and comprehensive care for emergency obstetric conditions, ensuring the safety of both mother and baby through evidence-based protocols and 24/7 emergency support.",
    image: "https://i.ibb.co/ycn9SnhQ/High-Risk-Pregnancy-Care.png",
    imageAlt: "Pregnancy Complications Management by Dr. Amita Shukla in Lucknow",
    badges: [
      "24/7 Emergency Care",
      "Critical Care Expertise",
      "Advanced Monitoring",
      "Immediate Intervention"
    ],
    primaryCTA: {
      text: "Emergency Consultation",
      href: "/contact",
      icon: "Phone"
    },
    secondaryCTA: {
      text: "Call +91 8303222222",
      href: "tel:+918303222222",
      icon: "AlertTriangle"
    },
    trustIndicators: {
      experience: "10+",
      successRate: "Expert Care",
      specialization: "24/7"
    }
  },

  overview: {
    introduction: "Pregnancy complications can arise suddenly and require immediate expert intervention. Dr. Amita Shukla specializes in managing critical obstetric emergencies and high-risk pregnancy conditions in Lucknow. Our comprehensive approach combines advanced monitoring technology with rapid response protocols to ensure optimal outcomes for both mother and baby during challenging pregnancy situations.",
    keyPoints: [
      "24/7 emergency obstetric care with immediate intervention capabilities",
      "Advanced maternal and fetal monitoring systems for early complication detection",
      "Multidisciplinary team approach including specialists for complex conditions",
      "Evidence-based management protocols for all major pregnancy complications",
      "Emergency delivery capabilities including cesarean section and assisted delivery",
      "Comprehensive postpartum care and monitoring for ongoing complications"
    ],
    statistics: [
      {
        label: "Emergency Care",
        value: "24/7",
        description: "Available round the clock",
        icon: "Clock"
      },
      {
        label: "Complications Managed",
        value: "15+",
        description: "Types of pregnancy emergencies",
        icon: "AlertTriangle"
      },
      {
        label: "Years Experience",
        value: "10+",
        description: "In high-risk obstetrics",
        icon: "Award"
      },
      {
        label: "Emergency Response",
        value: "<30 min",
        description: "Average response time",
        icon: "Activity"
      }
    ],
    benefits: [
      "Immediate access to emergency obstetric care when complications arise",
      "Advanced monitoring to detect problems before they become critical",
      "Coordinated care with neonatal specialists for high-risk deliveries",
      "Reduced risk of maternal and fetal complications through early intervention",
      "Comprehensive follow-up care to prevent recurring complications",
      "Family education and support during stressful emergency situations"
    ],
    whoCanBenefit: [
      "Women experiencing sudden pregnancy complications or emergency symptoms",
      "Those with high-risk pregnancies requiring specialized monitoring",
      "Pregnant women with pre-existing medical conditions",
      "Those with previous pregnancy complications or adverse outcomes",
      "Women requiring emergency delivery or obstetric intervention",
      "Patients referred by other healthcare providers for emergency care",
      "Those needing second opinions for complex pregnancy situations"
    ],
    disclaimer: "Pregnancy complications are medical emergencies requiring immediate professional intervention. This information is educational and should not replace emergency medical care. If you experience severe pregnancy symptoms, seek immediate medical attention or call emergency services."
  },

  process: {
    title: "Emergency Response Protocol",
    subtitle: "Systematic approach to pregnancy complication management",
    description: "Our emergency response process is designed to provide rapid assessment, immediate intervention, and comprehensive care for pregnancy complications with emphasis on maternal and fetal safety.",
    steps: [
      {
        step: 1,
        title: "Immediate Assessment & Triage",
        description: "Rapid evaluation of maternal and fetal condition with immediate stabilization measures",
        duration: "5-15 minutes",
        includes: [
          "Vital signs assessment and maternal condition evaluation",
          "Fetal heart rate monitoring and assessment of fetal well-being",
          "Review of symptoms, timing, and severity of complications",
          "Immediate stabilization measures if required",
          "Emergency laboratory tests and diagnostic imaging as needed"
        ],
        icon: "Stethoscope"
      },
      {
        step: 2,
        title: "Diagnostic Evaluation",
        description: "Comprehensive testing to determine the exact nature and severity of complications",
        duration: "30-60 minutes",
        includes: [
          "Advanced ultrasound examination and Doppler studies",
          "Complete blood count, liver function, and coagulation studies",
          "Urine analysis and protein assessment for pre-eclampsia",
          "Blood pressure monitoring and neurological assessment",
          "Consultation with specialists if multi-organ involvement suspected"
        ],
        icon: "Microscope"
      },
      {
        step: 3,
        title: "Treatment Planning & Intervention",
        description: "Development of immediate treatment plan with consideration for delivery timing if needed",
        duration: "Variable based on condition",
        includes: [
          "Risk assessment for maternal and fetal outcomes",
          "Decision on conservative management vs. immediate delivery",
          "Medication administration for condition stabilization",
          "Preparation for emergency delivery if indicated",
          "Coordination with neonatal team for high-risk delivery"
        ],
        icon: "Heart"
      },
      {
        step: 4,
        title: "Monitoring & Follow-up Care",
        description: "Continuous monitoring during treatment with comprehensive postpartum care planning",
        duration: "Until discharge and beyond",
        includes: [
          "Continuous maternal and fetal monitoring during treatment",
          "Regular assessment of treatment response and condition stability",
          "Postpartum monitoring for ongoing complications",
          "Long-term follow-up care planning and risk assessment",
          "Family education about warning signs and follow-up care"
        ],
        icon: "Activity"
      }
    ],
    timeline: {
      totalDuration: "Emergency care immediate, follow-up care varies by condition",
      frequency: "Continuous monitoring during emergency, scheduled follow-up",
      followUp: "Long-term care based on specific complications and outcomes"
    }
  },

  treatments: {
    title: "Pregnancy Complications We Manage",
    subtitle: "Comprehensive emergency and critical care for obstetric emergencies",
    description: "We provide expert management for a wide range of pregnancy complications, from common conditions to life-threatening emergencies, with protocols designed to optimize outcomes for both mother and baby.",
    options: [
      {
        name: "Pre-eclampsia & Eclampsia",
        description: "High blood pressure disorder in pregnancy that can lead to serious complications",
        suitableFor: [
          "Women with blood pressure >140/90 after 20 weeks pregnancy",
          "Those with protein in urine and pregnancy hypertension",
          "Women with severe headaches, vision changes, or upper abdominal pain",
          "Those with rapidly progressive swelling or sudden weight gain"
        ],
        successRate: "Excellent outcomes with early detection and management",
        duration: "Until delivery, with postpartum monitoring up to 6 weeks",
        procedure: [
          "Blood pressure monitoring and antihypertensive medications",
          "Magnesium sulfate administration to prevent seizures",
          "Corticosteroids for fetal lung maturity if preterm",
          "Delivery planning based on severity and gestational age"
        ],
        benefits: [
          "Prevention of maternal seizures and stroke",
          "Reduced risk of placental abruption and liver rupture",
          "Optimized timing of delivery for maternal and fetal safety",
          "Prevention of progression to life-threatening complications"
        ],
        recovery: "Blood pressure typically normalizes within 6 weeks postpartum with monitoring"
      },
      {
        name: "Gestational Diabetes Complications",
        description: "Management of diabetes-related pregnancy complications and emergencies",
        suitableFor: [
          "Women with uncontrolled gestational diabetes",
          "Those with diabetic ketoacidosis during pregnancy",
          "Women with severe hypoglycemia or hyperglycemia",
          "Those with diabetes-related pregnancy complications"
        ],
        successRate: "Excellent control achieved with proper management",
        duration: "Throughout pregnancy with postpartum glucose monitoring",
        procedure: [
          "Emergency blood glucose stabilization and monitoring",
          "Insulin therapy adjustment and continuous glucose monitoring",
          "Fetal growth assessment and well-being evaluation",
          "Delivery planning considering maternal glucose control and fetal size"
        ],
        benefits: [
          "Prevention of maternal diabetic complications",
          "Reduced risk of fetal macrosomia and birth injuries",
          "Lower likelihood of neonatal hypoglycemia",
          "Decreased risk of future diabetes development"
        ],
        recovery: "Glucose levels typically normalize after delivery with monitoring for type 2 diabetes"
      },
      {
        name: "Placental Disorders",
        description: "Emergency management of placenta previa, abruption, and other placental complications",
        suitableFor: [
          "Women with vaginal bleeding during pregnancy",
          "Those with severe abdominal pain and uterine tenderness",
          "Women with placenta previa requiring emergency care",
          "Those with suspected placental abruption or accreta"
        ],
        successRate: "Outcomes depend on severity and timing of intervention",
        duration: "Emergency management with immediate delivery often required",
        procedure: [
          "Immediate assessment of bleeding source and severity",
          "Ultrasound evaluation of placental location and condition",
          "Blood typing, cross-matching, and coagulation studies",
          "Emergency cesarean delivery if maternal or fetal compromise"
        ],
        benefits: [
          "Prevention of life-threatening hemorrhage",
          "Preservation of maternal hemodynamic stability",
          "Optimization of fetal outcomes through timely delivery",
          "Reduced risk of coagulation disorders and shock"
        ],
        recovery: "Recovery varies by procedure and blood loss; typically requires hospitalization"
      },
      {
        name: "Preterm Labor Management",
        description: "Prevention and management of premature labor and delivery complications",
        suitableFor: [
          "Women with regular contractions before 37 weeks pregnancy",
          "Those with cervical changes indicating preterm labor",
          "Women with premature rupture of membranes",
          "Those at high risk for preterm delivery"
        ],
        successRate: "Successful delay of delivery in 60-80% of cases when appropriate",
        duration: "Variable depending on gestational age and response to treatment",
        procedure: [
          "Tocolytic medications to suppress uterine contractions",
          "Corticosteroids for fetal lung maturity enhancement",
          "Antibiotics if infection suspected or membranes ruptured",
          "Continuous fetal and maternal monitoring"
        ],
        benefits: [
          "Increased fetal maturity and improved neonatal outcomes",
          "Reduced risk of respiratory distress syndrome in baby",
          "Time for maternal transfer to facility with NICU if needed",
          "Opportunity for completion of corticosteroid course"
        ],
        recovery: "Varies by outcome; successful delay allows continued pregnancy monitoring"
      },
      {
        name: "Postpartum Hemorrhage",
        description: "Emergency management of excessive bleeding after delivery",
        suitableFor: [
          "Women with bleeding >500ml after vaginal delivery",
          "Those with bleeding >1000ml after cesarean delivery",
          "Women with signs of hypovolemic shock postpartum",
          "Those with continued bleeding despite initial interventions"
        ],
        successRate: "Excellent outcomes with rapid intervention and protocol adherence",
        duration: "Emergency intervention required within minutes to hours",
        procedure: [
          "Immediate assessment of bleeding source and volume",
          "Uterine massage and uterotonics for uterine atony",
          "Repair of lacerations or surgical intervention if needed",
          "Blood transfusion and fluid resuscitation as required"
        ],
        benefits: [
          "Prevention of hypovolemic shock and organ failure",
          "Preservation of fertility and reproductive function",
          "Reduced risk of emergency hysterectomy",
          "Prevention of maternal mortality from hemorrhage"
        ],
        recovery: "Recovery depends on blood loss and interventions; typically 2-6 weeks"
      },
      {
        name: "Pregnancy-Induced Hypertension",
        description: "Management of high blood pressure disorders specific to pregnancy",
        suitableFor: [
          "Women with new-onset hypertension after 20 weeks",
          "Those with chronic hypertension worsening in pregnancy",
          "Women with hypertensive crisis during pregnancy",
          "Those requiring antihypertensive medication adjustment"
        ],
        successRate: "Good control achieved with appropriate monitoring and treatment",
        duration: "Throughout pregnancy with postpartum monitoring",
        procedure: [
          "Blood pressure monitoring and trend assessment",
          "Safe antihypertensive medications for pregnancy",
          "Fetal growth monitoring and well-being assessment",
          "Delivery timing based on maternal and fetal status"
        ],
        benefits: [
          "Prevention of stroke and cardiovascular complications",
          "Reduced risk of progression to pre-eclampsia",
          "Optimized fetal growth and development",
          "Lower risk of placental insufficiency"
        ],
        recovery: "Blood pressure typically improves after delivery but may require ongoing treatment"
      }
    ],
    consultationNote: "Pregnancy complications are medical emergencies that require immediate professional evaluation. Treatment decisions are made based on maternal and fetal condition, gestational age, and severity of complications. Dr. Amita Shukla will assess your specific situation and recommend the most appropriate emergency management approach."
  },

  riskFactors: {
    title: "Pregnancy Complication Risk Factors",
    subtitle: "Understanding factors that increase risk of pregnancy complications",
    description: "Awareness of risk factors helps in early detection and prevention of pregnancy complications. While some factors cannot be changed, many can be managed with proper care.",
    factors: [
      {
        category: "Maternal Age Factors",
        description: "Age-related risks for pregnancy complications",
        factors: [
          "Maternal age under 18 or over 35",
          "First pregnancy after age 35 (advanced maternal age)",
          "Multiple pregnancies at advanced age",
          "Teenage pregnancy with inadequate prenatal care"
        ],
        riskLevel: "moderate",
        prevention: [
          "Comprehensive preconception counseling",
          "Enhanced prenatal monitoring and testing",
          "Genetic counseling when appropriate",
          "Optimized nutrition and lifestyle before conception"
        ]
      },
      {
        category: "Medical History Factors",
        description: "Pre-existing conditions that increase complication risk",
        factors: [
          "Previous pregnancy complications or adverse outcomes",
          "History of pre-eclampsia, gestational diabetes, or preterm labor",
          "Previous cesarean delivery or uterine surgery",
          "Recurrent pregnancy loss or fertility treatments"
        ],
        riskLevel: "high",
        prevention: [
          "Detailed medical history review and risk assessment",
          "Preconception optimization of underlying conditions",
          "Enhanced prenatal monitoring and specialist care",
          "Early intervention protocols for known risk factors"
        ]
      },
      {
        category: "Chronic Medical Conditions",
        description: "Pre-existing health conditions affecting pregnancy",
        factors: [
          "Diabetes mellitus, hypertension, or heart disease",
          "Kidney disease, autoimmune disorders, or thyroid disease",
          "Blood clotting disorders or previous thrombosis",
          "Mental health conditions requiring medication"
        ],
        riskLevel: "high",
        prevention: [
          "Preconception medical optimization and specialist consultation",
          "Medication safety review and adjustment before pregnancy",
          "Coordinated care with specialists throughout pregnancy",
          "Enhanced monitoring protocols for specific conditions"
        ]
      },
      {
        category: "Lifestyle and Environmental Factors",
        description: "Modifiable factors that can increase complication risk",
        factors: [
          "Smoking, alcohol use, or illicit drug use during pregnancy",
          "Extreme obesity or significant underweight status",
          "Exposure to environmental toxins or infectious diseases",
          "Inadequate prenatal care or poor nutrition"
        ],
        riskLevel: "moderate",
        prevention: [
          "Smoking cessation and substance abuse counseling",
          "Weight optimization before and during pregnancy",
          "Environmental safety assessment and modification",
          "Regular prenatal care and nutritional counseling"
        ]
      }
    ]
  },

  faqs: {
    title: "Pregnancy Complications FAQs",
    subtitle: "Common concerns about pregnancy emergencies and complications",
    description: "Expert guidance on recognizing, managing, and preventing pregnancy complications with emphasis on when to seek immediate medical care.",
    faqs: [
      {
        question: "What are the warning signs that require immediate medical attention during pregnancy?",
        answer: "Seek immediate care for: severe headaches with vision changes, sudden swelling of face and hands, severe abdominal pain, vaginal bleeding, decreased fetal movement, severe nausea/vomiting preventing eating, high fever, or signs of preterm labor including regular contractions before 37 weeks.",
        category: "emergency"
      },
      {
        question: "How quickly should I seek help if I think I have pregnancy complications?",
        answer: "Pregnancy complications can develop rapidly and become life-threatening. Contact your doctor immediately for concerning symptoms, or go to the emergency room if symptoms are severe. Do not wait to see if symptoms improve on their own, as early intervention significantly improves outcomes.",
        category: "emergency"
      },
      {
        question: "What is pre-eclampsia and how dangerous is it?",
        answer: "Pre-eclampsia is a pregnancy complication characterized by high blood pressure and protein in urine after 20 weeks. It can be life-threatening, potentially causing seizures, stroke, liver problems, and placental abruption. With proper monitoring and treatment, most women and babies have good outcomes.",
        category: "complications"
      },
      {
        question: "Can gestational diabetes cause pregnancy complications?",
        answer: "Uncontrolled gestational diabetes can lead to complications including large babies (macrosomia), preterm birth, respiratory problems in the baby, low blood sugar in the newborn, and increased risk of cesarean delivery. Most complications are preventable with proper glucose control and monitoring.",
        category: "complications"
      },
      {
        question: "What should I do if I have vaginal bleeding during pregnancy?",
        answer: "Any vaginal bleeding during pregnancy should be evaluated immediately. Light spotting may be normal in early pregnancy, but heavy bleeding, bleeding with pain, or bleeding in later pregnancy can indicate serious complications like placenta previa or abruption requiring emergency care.",
        category: "emergency"
      },
      {
        question: "How are pregnancy complications diagnosed?",
        answer: "Diagnosis involves physical examination, blood tests, urine tests, ultrasound, and fetal monitoring. Specific tests depend on symptoms but may include blood pressure monitoring, protein measurement, glucose testing, and assessment of fetal well-being through heart rate monitoring.",
        category: "diagnosis"
      },
      {
        question: "Will pregnancy complications affect my baby?",
        answer: "The impact on your baby depends on the type, severity, and timing of complications, as well as how quickly treatment is started. Many complications can be managed successfully with minimal impact on the baby when detected early and treated appropriately by experienced specialists.",
        category: "complications"
      },
      {
        question: "Can pregnancy complications be prevented?",
        answer: "While not all complications can be prevented, risk can be reduced through early prenatal care, managing pre-existing medical conditions, maintaining healthy lifestyle habits, taking prenatal vitamins, avoiding harmful substances, and attending all scheduled prenatal appointments.",
        category: "prevention"
      },
      {
        question: "What happens if I need emergency delivery due to complications?",
        answer: "Emergency delivery may be necessary to protect maternal and fetal health. The delivery method (vaginal or cesarean) depends on the specific situation. Our team is prepared for emergency deliveries with immediate access to operating rooms, anesthesia, and neonatal care specialists.",
        category: "treatment"
      },
      {
        question: "How long will I need to stay in the hospital for pregnancy complications?",
        answer: "Hospital stay depends on the specific complication and severity. Some conditions may require bed rest for days to weeks, while others may need immediate delivery. Length of stay also depends on recovery progress and whether the baby needs special care.",
        category: "treatment"
      },
      {
        question: "Will I have complications in future pregnancies?",
        answer: "Having one pregnancy complication doesn't guarantee problems in future pregnancies, but it may increase risk. Preconception counseling, early prenatal care, and close monitoring in subsequent pregnancies can help identify and manage potential issues early for better outcomes.",
        category: "complications"
      },
      {
        question: "What support is available for families during pregnancy emergencies?",
        answer: "We provide comprehensive support including medical social workers, chaplaincy services, interpreter services, family education about conditions and treatments, assistance with insurance and financial concerns, and connections to community support resources and support groups.",
        category: "support"
      }
    ],
    contactNote: "Pregnancy complications are serious medical situations requiring immediate professional care. This information is for educational purposes and cannot replace emergency medical evaluation. If you are experiencing pregnancy complications or concerning symptoms, seek immediate medical attention or call emergency services."
  },

  differentiators: {
    title: "Why Choose Our Emergency Obstetric Care",
    subtitle: "Expert emergency management with comprehensive maternal-fetal medicine expertise",
    description: "Our pregnancy complications management program combines immediate emergency response capabilities with specialized high-risk obstetric expertise, providing comprehensive care for the most challenging pregnancy situations.",
    items: [
      {
        title: "24/7 Emergency Response Team",
        description: "Round-the-clock availability of specialized obstetric emergency care",
        features: [
          "Immediate physician response for pregnancy emergencies",
          "Advanced life support capabilities and emergency protocols",
          "Direct access to operating rooms for emergency deliveries",
          "Coordination with neonatal intensive care specialists",
          "Emergency blood bank services and massive transfusion protocols"
        ],
        icon: "Clock",
        highlights: ["24/7 availability", "< 30 minute response time"]
      },
      {
        title: "High-Risk Pregnancy Expertise",
        description: "Specialized knowledge in managing complex and high-risk pregnancy conditions",
        features: [
          "Board-certified expertise in maternal-fetal medicine",
          "Experience with rare and complex pregnancy complications",
          "Evidence-based protocols for all major obstetric emergencies",
          "Multidisciplinary team approach with specialist consultations",
          "Research-based treatment approaches and latest medical advances"
        ],
        icon: "Award",
        highlights: ["10+ years expertise", "Complex case management"]
      },
      {
        title: "Advanced Monitoring Technology",
        description: "State-of-the-art equipment for maternal and fetal monitoring",
        features: [
          "Continuous fetal heart rate monitoring and assessment",
          "Advanced ultrasound imaging with Doppler studies",
          "Maternal hemodynamic monitoring capabilities",
          "Laboratory services with rapid turnaround for emergencies",
          "Telemedicine capabilities for remote consultation"
        ],
        icon: "Activity",
        highlights: ["Advanced technology", "Real-time monitoring"]
      },
      {
        title: "Comprehensive Emergency Protocols",
        description: "Standardized evidence-based protocols for all pregnancy emergencies",
        features: [
          "Rapid response protocols for obstetric emergencies",
          "Hemorrhage management and blood conservation strategies",
          "Pre-eclampsia and hypertensive emergency protocols",
          "Preterm labor prevention and management guidelines",
          "Postpartum complication prevention and early intervention"
        ],
        icon: "Shield",
        highlights: ["Evidence-based protocols", "Standardized care"]
      },
      {
        title: "Family-Centered Emergency Care",
        description: "Compassionate support for families during pregnancy emergencies",
        features: [
          "Clear communication about conditions and treatment plans",
          "Family involvement in decision-making when appropriate",
          "Emotional support and counseling services",
          "Cultural sensitivity and language interpretation services",
          "Bereavement support services when needed"
        ],
        icon: "Heart",
        highlights: ["Family-centered care", "Emotional support"]
      },
      {
        title: "Seamless Care Coordination",
        description: "Integrated care with specialists and continuing support services",
        features: [
          "Immediate consultation with maternal-fetal medicine specialists",
          "Coordination with neonatology for high-risk deliveries",
          "Integration with cardiology, endocrinology, and other specialists",
          "Smooth transition to ongoing high-risk pregnancy care",
          "Comprehensive discharge planning and follow-up coordination"
        ],
        icon: "Users",
        highlights: ["Multidisciplinary team", "Coordinated care"]
      }
    ],
    trustStatistics: [
      {
        label: "Emergency Response",
        value: "24/7",
        description: "Available round the clock",
        icon: "Clock"
      },
      {
        label: "Response Time",
        value: "<30min",
        description: "Average emergency response",
        icon: "Activity"
      },
      {
        label: "Years Experience",
        value: "10+",
        description: "In high-risk obstetrics",
        icon: "Award"
      },
      {
        label: "Emergency Protocols",
        value: "15+",
        description: "Standardized emergency procedures",
        icon: "Shield"
      }
    ]
  },

  cta: {
    title: "Emergency Pregnancy Care",
    subtitle: "When Every Minute Matters",
    description: "Pregnancy complications require immediate expert intervention. Dr. Amita Shukla and our emergency obstetric team are available 24/7 to provide life-saving care for pregnancy emergencies. Don't wait when complications arise.",
    primaryAction: {
      text: "Emergency Contact",
      href: "tel:+918303222222",
      icon: "Phone"
    },
    secondaryAction: {
      text: "Schedule Consultation",
      href: "/contact", 
      icon: "Calendar"
    },
    features: [
      "24/7 Emergency Response",
      "Advanced Maternal-Fetal Monitoring",
      "Immediate Intervention Capabilities"
    ],
    urgencyNote: "Pregnancy emergencies require immediate medical attention - call now",
    trustIndicators: [
      { text: "24/7 Emergency Availability", icon: "Clock" },
      { text: "Expert High-Risk Obstetric Care", icon: "Award" },
      { text: "Immediate Response Protocols", icon: "Activity" }
    ]
  },

  seo: {
    title: "Pregnancy Complications Emergency Care Lucknow | Dr. Amita Shukla",
    description: "24/7 emergency pregnancy complications care in Lucknow. Expert management of pre-eclampsia, gestational diabetes, placental disorders. Immediate intervention by Dr. Amita Shukla. Emergency: +91 8303222222",
    keywords: [
      "pregnancy complications Lucknow",
      "pregnancy emergency Lucknow",
      "pre-eclampsia treatment Lucknow",
      "gestational diabetes emergency",
      "placenta previa Lucknow",
      "preterm labor Lucknow",
      "high-risk pregnancy Lucknow",
      "Dr. Amita Shukla emergency",
      "obstetric emergency Lucknow",
      "pregnancy bleeding Lucknow",
      "postpartum hemorrhage Lucknow",
      "pregnancy hypertension emergency",
      "24/7 pregnancy care Lucknow",
      "emergency delivery Lucknow",
      "maternal emergency care UP"
    ],
    ogImage: "https://i.ibb.co/ycn9SnhQ/High-Risk-Pregnancy-Care.png",
    canonicalUrl: "https://dramitashukla.com/services/pregnancy-complications",
    structuredData: {
      "@type": "MedicalProcedure",
      "name": "Pregnancy Complications Management",
      "description": "Emergency and comprehensive management of pregnancy complications including pre-eclampsia, gestational diabetes, placental disorders, and critical obstetric conditions.",
      "procedureType": "Emergency and Specialized Pregnancy Care",
      "bodyLocation": "Uterus, Placenta, Maternal-fetal system",
      "preparation": "Emergency assessment, maternal-fetal monitoring, laboratory tests",
      "followup": "Intensive monitoring, specialized care, delivery planning as needed",
      "benefits": [
        "Life-saving emergency care",
        "Specialized management of complex conditions",
        "Optimal maternal and fetal outcomes",
        "Coordinated multidisciplinary care"
      ],
      "indication": [
        "Pre-eclampsia or eclampsia",
        "Gestational diabetes complications",
        "Placental abruption or previa",
        "Other critical pregnancy emergencies"
      ],
      "medicalCode": {
        "@type": "MedicalCode",
        "code": "O99.9",
        "codingSystem": "ICD-10"
      }
    }
  },

  config: {
    theme: "primary",
    showEmergencyBanner: true,
    customSections: ["process", "treatments", "riskFactors", "differentiators"]
  }
};