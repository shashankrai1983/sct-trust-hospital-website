import { SharedData, ContactInfo } from '@/types/services';

export const sharedData: SharedData = {
  doctor: {
    name: "Dr. Amita Shukla",
    title: "Gynecologist, Obstetrician & Laparoscopic Surgeon",
    qualifications: [
      "MBBS",
      "MS (Obstetrics & Gynecology)",
      "Fellowship in Laparoscopic Surgery",
      "Diploma in Endoscopy"
    ],
    experience: "10+ years",
    specializations: [
      "High-Risk Pregnancy Management",
      "Infertility Treatment & IVF",
      "Advanced Laparoscopic Surgery",
      "PCOS/PCOD Treatment",
      "Maternal-Fetal Medicine",
      "Gynecological Oncology",
      "Adolescent Gynecology",
      "Menopause Management"
    ],
    image: "https://i.ibb.co/...", // Add actual image URL
    bio: "Dr. Amita Shukla is a highly experienced gynecologist and obstetrician practicing in Lucknow, with over 10 years of dedicated service in women's healthcare. She specializes in high-risk pregnancy management, advanced laparoscopic surgery, and comprehensive fertility treatments. Dr. Shukla is committed to providing personalized, compassionate care while utilizing the latest medical technologies and evidence-based treatments.",
    achievements: [
      "Successfully managed 500+ high-risk pregnancies",
      "Performed 1000+ laparoscopic procedures",
      "95% success rate in fertility treatments",
      "Published researcher in gynecological journals",
      "Speaker at national medical conferences"
    ],
    memberships: [
      "Indian Medical Association (IMA)",
      "Federation of Obstetric & Gynaecological Societies of India (FOGSI)",
      "Association of Gynecologic Laparoscopists of India (AGLI)",
      "Indian Society for Assisted Reproduction (ISAR)"
    ]
  },

  hospital: {
    name: "SCT Trust Hospital",
    address: "Lucknow, Uttar Pradesh, India",
    phone: "+91 522-4242424",
    email: "info@scttrusthospital.com",
    website: "https://scttrusthospital.com",
    facilities: [
      "Level 3 NICU (Neonatal Intensive Care Unit)",
      "Advanced Operation Theaters",
      "24/7 Emergency Services",
      "State-of-the-art Diagnostic Center",
      "ICU with Advanced Life Support",
      "Blood Bank & Transfusion Services",
      "Pharmacy & Laboratory Services",
      "Patient Comfort Rooms"
    ],
    accreditations: [
      "NABH Accredited Hospital",
      "ISO 9001:2015 Certified",
      "Government Approved Medical Facility"
    ],
    timings: [
      {
        days: "Monday - Saturday",
        hours: "9:00 AM - 8:00 PM"
      },
      {
        days: "Sunday",
        hours: "10:00 AM - 4:00 PM"
      },
      {
        days: "Emergency Services",
        hours: "24/7 Available"
      }
    ]
  },

  emergency: [
    {
      type: 'primary',
      name: 'Dr. Amita Shukla',
      phone: '+91 8303222222',
      description: 'Primary consultation and emergencies'
    },
    {
      type: 'hospital',
      name: 'SCT Trust Hospital Emergency',
      phone: '+91 522-4242424',
      description: '24/7 emergency services and ambulance'
    },
    {
      type: 'emergency',
      name: 'Medical Emergency Helpline',
      phone: '102',
      description: 'Government medical emergency services'
    }
  ],

  legal: {
    disclaimer: "The information provided on this website is for educational purposes only and should not be considered as medical advice. Every individual's medical situation is unique, and treatment plans should always be personalized based on thorough medical evaluation. Please consult Dr. Amita Shukla or another qualified healthcare provider for proper diagnosis and treatment recommendations. This website does not establish a doctor-patient relationship, and emergency medical situations require immediate professional medical attention.",
    
    privacy: "We are committed to protecting your privacy and personal health information. All patient information is handled in accordance with medical privacy laws and regulations. Your personal and medical information will never be shared without your explicit consent, except as required by law or in emergency medical situations.",
    
    terms: "By using this website and our medical services, you acknowledge that you have read and agree to our terms of service. Medical treatments carry inherent risks, and individual results may vary. Dr. Amita Shukla and SCT Trust Hospital are committed to providing the highest standard of care, but cannot guarantee specific outcomes. Please discuss all risks and benefits with your healthcare provider before making treatment decisions."
  }
};

export const commonFAQs = [
  {
    question: "What insurance plans do you accept?",
    answer: "We accept most major insurance plans including government health schemes (Ayushman Bharat, UP Health Insurance), private insurance companies, and corporate health plans. Our billing department can verify your coverage and help with pre-authorization requirements. We also offer transparent pricing for self-pay patients.",
    category: 'general' as const
  },
  {
    question: "How do I book an appointment with Dr. Amita Shukla?",
    answer: "You can book an appointment by calling +91 8303222222, using our online appointment form, or visiting SCT Trust Hospital directly. We offer both regular consultations and emergency appointments. For urgent medical concerns, please call immediately rather than waiting for online booking confirmation.",
    category: 'general' as const
  },
  {
    question: "What should I bring to my first appointment?",
    answer: "Please bring a valid photo ID, insurance cards (if applicable), list of current medications, previous medical records related to your condition, any recent test results or imaging, and a list of questions or concerns you'd like to discuss. If you're pregnant, bring any prenatal records from previous providers.",
    category: 'general' as const
  },
  {
    question: "Do you provide second opinions?",
    answer: "Absolutely. Dr. Amita Shukla welcomes patients seeking second opinions for gynecological conditions, treatment plans, or surgical recommendations. We believe informed patients make the best healthcare decisions. Please bring all relevant medical records and test results for comprehensive evaluation.",
    category: 'general' as const
  },
  {
    question: "What are your consultation fees?",
    answer: "Consultation fees vary based on the type of visit and services required. Initial consultations, follow-up visits, and specialized procedures have different fee structures. Please contact our office at +91 8303222222 for current fee information and insurance coverage details.",
    category: 'cost' as const
  },
  {
    question: "Do you offer telemedicine consultations?",
    answer: "Yes, we offer secure telemedicine consultations for follow-up visits, medication management, test result discussions, and initial consultations for certain conditions. However, physical examination may be required for proper diagnosis in many cases. Emergency conditions always require in-person evaluation.",
    category: 'general' as const
  },
  {
    question: "How long should I expect to wait for my appointment?",
    answer: "We strive to see patients on time and minimize waiting periods. Regular appointments typically have minimal wait times, though emergency cases may occasionally cause delays. We'll inform you of any significant delays and offer rescheduling options when possible. Emergency and urgent cases are prioritized accordingly.",
    category: 'general' as const
  },
  {
    question: "What safety protocols do you follow?",
    answer: "We maintain strict infection control protocols, use sterile equipment and techniques, follow all medical safety guidelines, and ensure our facility meets healthcare standards. Our team is trained in the latest safety procedures, and we regularly update our protocols based on current medical guidelines and best practices.",
    category: 'general' as const
  }
];

export const commonStatistics = [
  {
    label: "Years of Experience",
    value: "10+",
    description: "Dedicated to women's healthcare"
  },
  {
    label: "Successful Treatments",
    value: "5000+",
    description: "Across all specializations"
  },
  {
    label: "Patient Satisfaction",
    value: "98%",
    description: "Based on patient feedback"
  },
  {
    label: "Emergency Response",
    value: "24/7",
    description: "Round-the-clock availability"
  }
];

export const commonTrustIndicators = [
  "NABH Accredited Hospital",
  "10+ Years Specialized Experience", 
  "24/7 Emergency Support",
  "Advanced Medical Technology",
  "Personalized Treatment Plans",
  "Multilingual Care Team"
];

export const luknowSpecificInfo = {
  climate: {
    summer: {
      months: "March - June",
      temperature: "Up to 45°C",
      challenges: "Extreme heat, dehydration risk, power cuts"
    },
    monsoon: {
      months: "July - September", 
      temperature: "25-35°C",
      challenges: "High humidity, water-borne diseases, flooding"
    },
    winter: {
      months: "December - February",
      temperature: "5-20°C", 
      challenges: "Air pollution, fog, respiratory issues"
    },
    postMonsoon: {
      months: "October - November",
      temperature: "20-30°C",
      challenges: "Vector-borne diseases, humidity"
    }
  },
  
  culturalConsiderations: [
    "Respect for traditional Awadhi dietary practices",
    "Family involvement in healthcare decisions",
    "Privacy concerns in conservative family settings",
    "Religious considerations for treatment timing",
    "Language preferences (Hindi, Urdu, English)",
    "Extended family support systems"
  ],
  
  localMedicalChallenges: [
    "Seasonal disease patterns (dengue, chikungunya)",
    "Air quality issues affecting respiratory health",
    "Water quality concerns during monsoon",
    "Limited access to specialized care in rural areas",
    "Transportation challenges during extreme weather",
    "Power supply issues affecting medical equipment"
  ],
  
  advantages: [
    "Rich cultural heritage supporting mental health",
    "Strong family support systems",
    "Traditional knowledge complementing modern medicine",
    "Access to seasonal, fresh local produce",
    "Growing medical infrastructure",
    "Increasing health awareness in urban areas"
  ]
};