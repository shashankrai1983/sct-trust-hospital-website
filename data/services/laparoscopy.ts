import { 
  ServicePageData, 
  ProcessStep,
  TreatmentOption,
  FAQ,
  Differentiator,
  RiskFactor
} from '@/types/services';

export const laparoscopyData: ServicePageData = {
  service: {
    name: "Advanced Laparoscopy",
    slug: "laparoscopy",
    category: "Surgery",
    description: "Minimally invasive laparoscopic surgery for gynecological conditions including ovarian cysts, endometriosis, fibroids, and diagnostic procedures with faster recovery and reduced complications.",
    shortDescription: "Minimally invasive surgical procedures with advanced laparoscopic techniques for optimal outcomes.",
    icon: "Microscope",
    featured: true
  },

  hero: {
    title: "Advanced Laparoscopic Surgery",
    subtitle: "Minimally Invasive Gynecological Procedures",
    description: "Expert laparoscopic surgery in Lucknow using advanced minimally invasive techniques. Dr. Amita Shukla performs complex gynecological procedures through small incisions, resulting in reduced pain, faster recovery, and minimal scarring with excellent surgical outcomes.",
    image: "https://i.ibb.co/pvsbFHZk/Advance-Laproscopy.png",
    imageAlt: "Advanced Laparoscopic Surgery by Dr. Amita Shukla in Lucknow",
    badges: [
      "Minimally Invasive",
      "Faster Recovery",
      "Expert Surgeon",
      "Advanced Technology"
    ],
    primaryCTA: {
      text: "Consult for Surgery",
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
      specialization: "Advanced"
    }
  },

  overview: {
    introduction: "Laparoscopic surgery, also known as minimally invasive surgery, uses small incisions and specialized instruments to perform complex gynecological procedures. Dr. Amita Shukla specializes in advanced laparoscopic techniques for conditions like endometriosis, ovarian cysts related to PCOS/PCOD, and fertility-enhancing procedures for women undergoing infertility treatment. These minimally invasive approaches offer significant advantages over traditional surgery.",
    keyPoints: [
      "Minimally invasive approach with 3-4 small incisions instead of large surgical cuts",
      "High-definition camera systems for precise visualization during surgery",
      "Advanced energy devices for safe tissue dissection and hemostasis",
      "Reduced post-operative pain and faster return to normal activities",
      "Lower risk of infection, bleeding, and adhesion formation",
      "Excellent cosmetic results with minimal visible scarring"
    ],
    statistics: [
      {
        label: "Incision Size",
        value: "5-10mm",
        description: "Small keyhole incisions",
        icon: "Target"
      },
      {
        label: "Recovery Time",
        value: "1-2 weeks",
        description: "Faster than open surgery",
        icon: "Clock"
      },
      {
        label: "Hospital Stay",
        value: "1-2 days",
        description: "Shorter hospitalization",
        icon: "Building2"
      },
      {
        label: "Success Rate",
        value: "High",
        description: "Excellent outcomes",
        icon: "Award"
      }
    ],
    benefits: [
      "Significantly reduced post-operative pain compared to traditional surgery",
      "Faster recovery with earlier return to work and daily activities",
      "Minimal scarring with excellent cosmetic results",
      "Lower risk of wound infections and complications",
      "Reduced blood loss during surgery",
      "Better visualization of internal structures with magnified view",
      "Preserved fertility in reproductive-age women when applicable"
    ],
    whoCanBenefit: [
      "Women with ovarian cysts requiring surgical removal",
      "Those diagnosed with endometriosis needing treatment",
      "Women with uterine fibroids suitable for laparoscopic approach",
      "Those requiring diagnostic evaluation of pelvic pain or infertility",
      "Women with ectopic pregnancy needing surgical intervention",
      "Those with pelvic adhesions causing symptoms",
      "Women requiring tubal surgery for fertility or sterilization"
    ],
    disclaimer: "Laparoscopic surgery requires careful patient selection and surgical expertise. Not all conditions are suitable for minimally invasive approach. Consult with Dr. Amita Shukla to determine if laparoscopic surgery is appropriate for your specific condition."
  },

  process: {
    title: "Laparoscopic Surgery Process",
    subtitle: "Comprehensive surgical care from evaluation to recovery",
    description: "Our laparoscopic surgery process ensures thorough pre-operative evaluation, expert surgical technique, and comprehensive post-operative care for optimal patient outcomes.",
    steps: [
      {
        step: 1,
        title: "Pre-operative Evaluation",
        description: "Comprehensive assessment to determine suitability for laparoscopic approach",
        duration: "1-2 weeks before surgery",
        includes: [
          "Detailed medical history and physical examination",
          "Imaging studies including ultrasound or MRI as needed",
          "Blood tests and pre-operative investigations",
          "Anesthesia consultation and fitness assessment",
          "Discussion of procedure, risks, and expected outcomes"
        ],
        icon: "Stethoscope"
      },
      {
        step: 2,
        title: "Surgical Procedure",
        description: "Minimally invasive surgery performed under general anesthesia",
        duration: "30 minutes to 3 hours depending on complexity",
        includes: [
          "General anesthesia administration for patient comfort",
          "Creation of 3-4 small incisions (5-10mm) in abdomen",
          "Insertion of laparoscope and specialized instruments",
          "Carbon dioxide insufflation for optimal visualization",
          "Precise surgical technique under magnified view"
        ],
        icon: "Microscope"
      },
      {
        step: 3,
        title: "Immediate Post-operative Care",
        description: "Recovery monitoring and pain management in hospital setting",
        duration: "1-2 days in hospital",
        includes: [
          "Post-anesthesia recovery monitoring and vital signs",
          "Pain management with appropriate medications",
          "Early mobilization to prevent complications",
          "Wound care and dressing management",
          "Discharge planning and home care instructions"
        ],
        icon: "Heart"
      },
      {
        step: 4,
        title: "Recovery and Follow-up",
        description: "Ongoing care and monitoring during healing process",
        duration: "2-6 weeks for complete recovery",
        includes: [
          "Follow-up appointments at 1 week and 4-6 weeks",
          "Wound healing assessment and suture removal if needed",
          "Activity restrictions and gradual return to normal routine",
          "Monitoring for any complications or concerns",
          "Long-term outcome assessment and counseling"
        ],
        icon: "Activity"
      }
    ],
    timeline: {
      totalDuration: "Complete recovery typically within 2-6 weeks",
      frequency: "Single surgical procedure with follow-up visits",
      followUp: "Regular monitoring until full recovery confirmed"
    }
  },

  treatments: {
    title: "Laparoscopic Procedures We Perform",
    subtitle: "Comprehensive minimally invasive gynecological surgery",
    description: "We offer a wide range of laparoscopic procedures for various gynecological conditions, each tailored to provide optimal outcomes with minimal invasiveness.",
    options: [
      {
        name: "Ovarian Cyst Removal (Cystectomy)",
        description: "Minimally invasive removal of ovarian cysts while preserving healthy ovarian tissue",
        suitableFor: [
          "Women with persistent ovarian cysts larger than 5cm",
          "Those with complex cysts or suspicion of malignancy",
          "Women experiencing pain or pressure from ovarian cysts",
          "Those with cysts causing complications like torsion or rupture"
        ],
        successRate: "Excellent outcomes with preserved ovarian function in most cases",
        duration: "45-90 minutes depending on cyst size and complexity",
        procedure: [
          "Laparoscopic visualization of ovaries and cyst characteristics",
          "Careful dissection to separate cyst from healthy ovarian tissue",
          "Removal of cyst contents and cyst wall through small incisions",
          "Hemostasis and preservation of remaining healthy ovarian tissue"
        ],
        benefits: [
          "Preservation of fertility and ovarian function",
          "Relief from pain and pressure symptoms",
          "Prevention of cyst complications like rupture or torsion",
          "Excellent cosmetic results with minimal scarring"
        ],
        recovery: "Return to normal activities within 1-2 weeks, full recovery in 4-6 weeks"
      },
      {
        name: "Endometriosis Treatment",
        description: "Surgical treatment of endometriosis lesions and adhesions",
        suitableFor: [
          "Women with moderate to severe endometriosis",
          "Those with endometriosis-related pain not responding to medication",
          "Women with endometriomas (chocolate cysts) on ovaries",
          "Those with fertility issues related to endometriosis"
        ],
        successRate: "Significant pain relief achieved in 70-90% of patients",
        duration: "1-3 hours depending on extent of disease",
        procedure: [
          "Thorough exploration of pelvic cavity for endometriotic lesions",
          "Excision or ablation of endometriotic implants and nodules",
          "Removal of endometriomas with ovarian tissue preservation",
          "Division of adhesions and restoration of normal anatomy"
        ],
        benefits: [
          "Significant reduction in pelvic pain and dysmenorrhea",
          "Improved fertility potential in many patients",
          "Better response to hormonal treatments post-surgery",
          "Prevention of disease progression and complications"
        ],
        recovery: "Gradual improvement in symptoms over 3-6 months, activity resumption in 2-4 weeks"
      },
      {
        name: "Laparoscopic Myomectomy",
        description: "Removal of uterine fibroids while preserving the uterus",
        suitableFor: [
          "Women with symptomatic fibroids wanting to preserve fertility",
          "Those with subserosal or intramural fibroids suitable for laparoscopic approach",
          "Women experiencing heavy bleeding, pain, or pressure from fibroids",
          "Those with fibroids affecting fertility or causing recurrent pregnancy loss"
        ],
        successRate: "Excellent symptom relief with preserved fertility in appropriate candidates",
        duration: "1-3 hours depending on number, size, and location of fibroids",
        procedure: [
          "Identification and mapping of fibroid locations and characteristics",
          "Injection of vasoconstrictive agents to minimize bleeding",
          "Careful enucleation of fibroids from uterine muscle",
          "Multilayer closure of uterine defects to maintain strength"
        ],
        benefits: [
          "Preservation of uterus and fertility potential",
          "Relief from heavy menstrual bleeding and pain",
          "Improved pregnancy outcomes after healing",
          "Faster recovery compared to open surgery"
        ],
        recovery: "Return to light activities in 1-2 weeks, full recovery in 6-8 weeks"
      },
      {
        name: "Diagnostic Laparoscopy",
        description: "Minimally invasive evaluation of pelvic organs and conditions",
        suitableFor: [
          "Women with chronic pelvic pain of unknown cause",
          "Those undergoing fertility evaluation",
          "Women with suspected endometriosis or adhesions",
          "Those requiring assessment before assisted reproductive techniques"
        ],
        successRate: "High diagnostic accuracy for identifying pelvic pathology",
        duration: "30-60 minutes for diagnostic evaluation",
        procedure: [
          "Systematic examination of pelvic organs and structures",
          "Assessment of fallopian tubes, ovaries, and uterus",
          "Identification of adhesions, endometriosis, or other pathology",
          "Biopsy or therapeutic intervention if indicated during same procedure"
        ],
        benefits: [
          "Accurate diagnosis of previously unidentified conditions",
          "Immediate treatment of simple conditions during same procedure",
          "Minimal recovery time compared to exploratory surgery",
          "Better planning for future treatments if needed"
        ],
        recovery: "Return to normal activities within 3-7 days"
      },
      {
        name: "Laparoscopic Hysterectomy",
        description: "Minimally invasive removal of uterus for various medical conditions",
        suitableFor: [
          "Women with symptomatic fibroids not responding to other treatments",
          "Those with heavy menstrual bleeding affecting quality of life",
          "Women with certain types of gynecological cancers",
          "Those with severe endometriosis or adenomyosis"
        ],
        successRate: "Excellent outcomes with faster recovery than open surgery",
        duration: "1-3 hours depending on complexity and indication",
        procedure: [
          "Systematic mobilization of uterus and supporting structures",
          "Careful identification and protection of adjacent organs",
          "Division of uterine blood supply and supporting ligaments",
          "Removal of uterus through small incisions or vaginal route"
        ],
        benefits: [
          "Complete resolution of symptoms for appropriate conditions",
          "Faster recovery compared to traditional open hysterectomy",
          "Reduced risk of complications and shorter hospital stay",
          "Better cosmetic results with minimal scarring"
        ],
        recovery: "Return to light activities in 2-3 weeks, full recovery in 6-8 weeks"
      },
      {
        name: "Ectopic Pregnancy Surgery",
        description: "Emergency or planned treatment of ectopic pregnancies",
        suitableFor: [
          "Women with confirmed ectopic pregnancy",
          "Those with ruptured ectopic pregnancy requiring emergency surgery",
          "Women with declining beta-hCG levels but persistent ectopic mass",
          "Those preferring surgical over medical management"
        ],
        successRate: "Excellent outcomes with preservation of fertility when possible",
        duration: "30-90 minutes depending on complexity and emergency status",
        procedure: [
          "Identification and assessment of ectopic pregnancy location",
          "Salpingostomy (tube-preserving) or salpingectomy (tube removal) based on condition",
          "Removal of ectopic tissue and hemostasis",
          "Assessment of contralateral tube and ovaries"
        ],
        benefits: [
          "Life-saving treatment for ruptured ectopic pregnancy",
          "Preservation of future fertility potential when possible",
          "Faster recovery compared to open surgery",
          "Lower risk of complications and adhesion formation"
        ],
        recovery: "Return to normal activities in 1-2 weeks, fertility evaluation after 3 months"
      }
    ],
    consultationNote: "The suitability for laparoscopic surgery depends on individual factors including the size, location, and nature of the condition, as well as patient factors such as previous surgery and overall health. Dr. Amita Shukla will evaluate your specific situation and recommend the most appropriate surgical approach for your condition."
  },

  riskFactors: {
    title: "Laparoscopic Surgery Considerations",
    subtitle: "Understanding factors that affect surgical planning and outcomes",
    description: "While laparoscopic surgery is generally safe, certain factors may influence the surgical approach and outcomes. Understanding these helps in proper patient selection and planning.",
    factors: [
      {
        category: "Patient Factors",
        description: "Individual characteristics that may affect laparoscopic surgery",
        factors: [
          "Previous abdominal or pelvic surgery with potential adhesions",
          "Severe obesity (BMI >35) that may limit visualization",
          "Certain medical conditions affecting anesthesia tolerance",
          "Pregnancy (contraindication for elective procedures)"
        ],
        riskLevel: "moderate",
        prevention: [
          "Thorough pre-operative assessment and medical optimization",
          "Discussion of alternative approaches if laparoscopy not suitable",
          "Weight reduction counseling when appropriate",
          "Coordinate care with anesthesia and medical specialists"
        ]
      },
      {
        category: "Anatomical Factors",
        description: "Structural considerations affecting surgical approach",
        factors: [
          "Large masses (>10-12cm) that may require conversion to open surgery",
          "Suspected malignancy requiring oncological surgical principles",
          "Severe adhesions from previous infection or surgery",
          "Anatomical variants that may complicate laparoscopic approach"
        ],
        riskLevel: "moderate",
        prevention: [
          "Detailed pre-operative imaging assessment",
          "Availability of conversion to open surgery if needed",
          "Experienced surgical team familiar with complex cases",
          "Appropriate patient counseling about potential conversion"
        ]
      },
      {
        category: "Surgical Complications",
        description: "Potential complications specific to laparoscopic surgery",
        factors: [
          "Risk of injury to bowel, bladder, or blood vessels (rare but serious)",
          "Carbon dioxide gas retention causing shoulder pain temporarily",
          "Port site complications including bleeding or infection",
          "Need for conversion to open surgery (2-5% of cases)"
        ],
        riskLevel: "low",
        prevention: [
          "Meticulous surgical technique and proper instrument handling",
          "Adequate visualization before making any incisions",
          "Experienced surgeon with high-volume laparoscopic practice",
          "Proper patient selection and pre-operative optimization"
        ]
      },
      {
        category: "Recovery Factors",
        description: "Factors that may affect post-operative recovery",
        factors: [
          "Individual pain tolerance and healing capacity",
          "Adherence to post-operative instructions and activity restrictions",
          "Presence of complications requiring additional treatment",
          "Underlying medical conditions affecting healing"
        ],
        riskLevel: "low",
        prevention: [
          "Clear post-operative instructions and pain management plan",
          "Regular follow-up appointments to monitor recovery",
          "Patient education about warning signs requiring medical attention",
          "Gradual return to activities with appropriate restrictions"
        ]
      }
    ]
  },

  faqs: {
    title: "Laparoscopic Surgery FAQs",
    subtitle: "Common questions about minimally invasive gynecological surgery",
    description: "Expert answers to frequently asked questions about laparoscopic surgery, helping patients understand the benefits, risks, and recovery process.",
    faqs: [
      {
        question: "What are the main advantages of laparoscopic surgery over open surgery?",
        answer: "Laparoscopic surgery offers several advantages: smaller incisions (5-10mm vs several inches), less post-operative pain, faster recovery (1-2 weeks vs 4-6 weeks), minimal scarring, lower infection risk, shorter hospital stay, and better cosmetic results. Most patients can return to normal activities much sooner.",
        category: "general"
      },
      {
        question: "Am I a good candidate for laparoscopic surgery?",
        answer: "Most women with gynecological conditions are candidates for laparoscopic surgery. Factors considered include the size and location of the condition, previous surgeries, overall health, and BMI. Dr. Amita Shukla will evaluate your specific situation through examination and imaging studies to determine the best approach.",
        category: "candidacy"
      },
      {
        question: "How long does laparoscopic surgery take?",
        answer: "Surgery duration varies by procedure complexity: diagnostic laparoscopy (30-60 minutes), ovarian cyst removal (45-90 minutes), endometriosis treatment (1-3 hours), and hysterectomy (1-3 hours). Dr. Amita will provide specific time estimates based on your planned procedure.",
        category: "procedure"
      },
      {
        question: "What can I expect during recovery from laparoscopic surgery?",
        answer: "Most patients experience mild to moderate pain for 2-3 days, managed with prescribed medications. You may have shoulder pain from gas used during surgery, which resolves in 24-48 hours. Light activities can be resumed in 3-7 days, with full recovery in 1-6 weeks depending on the procedure.",
        category: "recovery"
      },
      {
        question: "Are there any risks or complications with laparoscopic surgery?",
        answer: "While laparoscopic surgery is very safe, potential risks include injury to organs (rare, <1%), bleeding, infection, or need for conversion to open surgery (2-5% of cases). Dr. Amita's extensive experience and careful technique minimize these risks significantly.",
        category: "risks"
      },
      {
        question: "Will I have visible scars after laparoscopic surgery?",
        answer: "Laparoscopic surgery leaves 3-4 small scars (5-10mm each), typically placed in inconspicuous locations. These scars fade significantly over time and are barely visible after complete healing. The cosmetic results are excellent compared to traditional surgery.",
        category: "recovery"
      },
      {
        question: "When can I return to work after laparoscopic surgery?",
        answer: "Return to work depends on your job and the procedure performed. Desk jobs: 3-7 days, light physical work: 1-2 weeks, heavy lifting or strenuous work: 4-6 weeks. Dr. Amita will provide specific guidelines based on your procedure and occupation.",
        category: "recovery"
      },
      {
        question: "Will laparoscopic surgery affect my fertility?",
        answer: "When performed for conditions like endometriosis, ovarian cysts, or fibroids, laparoscopic surgery often improves fertility by treating the underlying problem. The minimally invasive approach reduces adhesion formation compared to open surgery, which is beneficial for future fertility.",
        category: "fertility"
      },
      {
        question: "How should I prepare for laparoscopic surgery?",
        answer: "Pre-operative preparation includes fasting from midnight before surgery, stopping certain medications as directed, arranging transportation, and following specific pre-operative instructions. Dr. Amita's team will provide detailed preparation guidelines during your pre-surgical consultation.",
        category: "preparation"
      },
      {
        question: "What happens if laparoscopic surgery needs to be converted to open surgery?",
        answer: "Conversion to open surgery occurs in 2-5% of cases due to technical difficulties, adhesions, or safety concerns. This is a surgical decision made for patient safety, not a complication. Recovery will be longer (similar to traditional surgery), but the same treatment goals are achieved.",
        category: "procedure"
      },
      {
        question: "Can all gynecological conditions be treated laparoscopically?",
        answer: "Most gynecological conditions can be treated laparoscopically, but some factors may require open surgery: very large masses (>12cm), suspected cancer requiring extensive surgery, severe adhesions, or certain emergency situations. Dr. Amita will determine the best approach for your specific condition.",
        category: "candidacy"
      },
      {
        question: "How do I know if my recovery is progressing normally?",
        answer: "Normal recovery includes decreasing pain, gradual increase in activity tolerance, and healing incisions. Contact Dr. Amita immediately for: severe pain, heavy bleeding, fever >101°F, signs of infection at incision sites, or persistent nausea/vomiting. Regular follow-up appointments monitor your progress.",
        category: "recovery"
      }
    ],
    contactNote: "Laparoscopic surgery requires careful evaluation to determine the best approach for your specific condition. This information is educational and should not replace professional medical consultation. Schedule a consultation with Dr. Amita Shukla to discuss whether laparoscopic surgery is right for you."
  },

  differentiators: {
    title: "Why Choose Our Laparoscopic Surgery Program",
    subtitle: "Advanced minimally invasive surgery with expert care and optimal outcomes",
    description: "Our laparoscopic surgery program combines cutting-edge technology with Dr. Amita Shukla's extensive expertise in minimally invasive gynecological surgery, ensuring optimal outcomes with minimal disruption to your life.",
    items: [
      {
        title: "Expert Laparoscopic Surgeon",
        description: "Extensive experience in complex minimally invasive gynecological procedures",
        features: [
          "10+ years of laparoscopic surgery experience with hundreds of procedures",
          "Training in advanced laparoscopic techniques and complex procedures",
          "Expertise in both diagnostic and therapeutic laparoscopic surgery",
          "High-volume practice ensuring maintained surgical skills",
          "Commitment to staying current with latest minimally invasive techniques"
        ],
        icon: "Award",
        highlights: ["10+ years experience", "Complex procedures expertise"]
      },
      {
        title: "Advanced Laparoscopic Equipment",
        description: "State-of-the-art technology for optimal visualization and precision",
        features: [
          "High-definition camera systems with superior image quality",
          "Advanced energy devices for precise tissue handling",
          "Specialized laparoscopic instruments for complex procedures",
          "CO2 insufflation systems for optimal visualization",
          "Modern operating room setup optimized for laparoscopic surgery"
        ],
        icon: "Microscope",
        highlights: ["HD visualization", "Advanced instruments"]
      },
      {
        title: "Comprehensive Surgical Planning",
        description: "Thorough evaluation and personalized surgical approach for each patient",
        features: [
          "Detailed pre-operative assessment and imaging review",
          "Customized surgical plan based on individual anatomy and condition",
          "Discussion of all treatment options and alternatives",
          "Clear explanation of risks, benefits, and expected outcomes",
          "Coordination with anesthesia team for optimal patient comfort"
        ],
        icon: "FileText",
        highlights: ["Personalized planning", "Comprehensive evaluation"]
      },
      {
        title: "Minimally Invasive Expertise",
        description: "Specialization in techniques that minimize patient trauma and recovery time",
        features: [
          "Single-incision laparoscopy (SILS) when appropriate",
          "Tissue-preserving techniques to maintain organ function",
          "Advanced suturing techniques for optimal healing",
          "Adhesion prevention strategies for better long-term outcomes",
          "Experience with complex cases requiring advanced skills"
        ],
        icon: "Target",
        highlights: ["Tissue preservation", "Advanced techniques"]
      },
      {
        title: "Optimal Recovery Support",
        description: "Comprehensive care focused on rapid recovery and return to normal life",
        features: [
          "Enhanced recovery protocols to minimize post-operative discomfort",
          "Effective pain management strategies tailored to individual needs",
          "Clear post-operative instructions and activity guidelines",
          "Regular follow-up appointments to monitor healing progress",
          "24/7 access for post-operative concerns and questions"
        ],
        icon: "Heart",
        highlights: ["Fast recovery", "Comprehensive support"]
      },
      {
        title: "Safety and Quality Focus",
        description: "Commitment to highest safety standards and quality outcomes",
        features: [
          "Rigorous safety protocols and infection prevention measures",
          "Low complication rates through careful patient selection",
          "Quality improvement initiatives and outcome monitoring",
          "Backup plans including conversion to open surgery when needed",
          "Continuous education and training in latest safety practices"
        ],
        icon: "Shield",
        highlights: ["Safety first", "Quality outcomes"]
      }
    ],
    trustStatistics: [
      {
        label: "Recovery Time",
        value: "1-2 weeks",
        description: "Faster than open surgery",
        icon: "Clock"
      },
      {
        label: "Incision Size",
        value: "5-10mm",
        description: "Minimally invasive",
        icon: "Target"
      },
      {
        label: "Years Experience",
        value: "10+",
        description: "In laparoscopic surgery",
        icon: "Award"
      },
      {
        label: "Success Rate",
        value: "High",
        description: "Excellent outcomes",
        icon: "TrendingUp"
      }
    ]
  },

  cta: {
    title: "Advanced Laparoscopic Surgery",
    subtitle: "Minimally Invasive Excellence",
    description: "Experience the benefits of advanced laparoscopic surgery with Dr. Amita Shukla. Achieve excellent outcomes with minimal scarring, faster recovery, and reduced complications through expert minimally invasive techniques.",
    primaryAction: {
      text: "Consult for Surgery",
      href: "/contact",
      icon: "Calendar"
    },
    secondaryAction: {
      text: "Call +91 8303222222",
      href: "tel:+918303222222", 
      icon: "Phone"
    },
    features: [
      "Minimally Invasive Approach",
      "Expert Surgical Care",
      "Faster Recovery Time"
    ],
    urgencyNote: "Early consultation allows for proper evaluation and surgical planning",
    trustIndicators: [
      { text: "10+ Years Laparoscopic Experience", icon: "Award" },
      { text: "Advanced Minimally Invasive Techniques", icon: "Microscope" },
      { text: "Excellent Patient Outcomes", icon: "TrendingUp" }
    ]
  },

  seo: {
    title: "Advanced Laparoscopic Surgery Lucknow | Dr. Amita Shukla",
    description: "Expert laparoscopic surgery in Lucknow. Minimally invasive gynecological procedures including ovarian cyst removal, endometriosis treatment, myomectomy. Faster recovery with Dr. Amita Shukla.",
    keywords: [
      "laparoscopic surgery Lucknow",
      "minimally invasive surgery Lucknow",
      "ovarian cyst removal Lucknow",
      "endometriosis surgery Lucknow",
      "laparoscopic myomectomy Lucknow",
      "diagnostic laparoscopy Lucknow",
      "Dr. Amita Shukla laparoscopy",
      "gynecological surgery Lucknow",
      "keyhole surgery Lucknow",
      "fibroid surgery Lucknow",
      "ectopic pregnancy surgery Lucknow",
      "laparoscopic hysterectomy Lucknow",
      "women surgery Lucknow",
      "advanced surgery techniques UP",
      "minimally invasive gynecology Lucknow"
    ],
    ogImage: "https://i.ibb.co/pvsbFHZk/Advance-Laproscopy.png",
    canonicalUrl: "https://dramitashukla.com/services/laparoscopy",
    structuredData: {
      "@type": "MedicalProcedure",
      "name": "Advanced Laparoscopic Surgery",
      "description": "Minimally invasive laparoscopic surgery for gynecological conditions including ovarian cysts, endometriosis, fibroids, and diagnostic procedures.",
      "procedureType": "Minimally Invasive Surgery",
      "bodyLocation": "Abdomen, Pelvis, Reproductive organs",
      "preparation": "Pre-operative evaluation, fasting, medical clearance",
      "followup": "Post-operative monitoring, follow-up visits at 1 week and 4-6 weeks",
      "duration": "PT30M/PT180M",
      "benefits": [
        "Minimal scarring with small keyhole incisions",
        "Faster recovery compared to open surgery",
        "Reduced post-operative pain and complications",
        "Shorter hospital stay and earlier return to activities"
      ],
      "riskFactor": [
        "Previous abdominal surgery",
        "Severe obesity",
        "Certain medical conditions"
      ],
      "medicalCode": {
        "@type": "MedicalCode",
        "code": "58570-58579",
        "codingSystem": "CPT"
      }
    }
  },

  config: {
    theme: "primary",
    showEmergencyBanner: false,
    customSections: ["process", "treatments", "riskFactors", "differentiators"]
  }
};