"use client";

import ServiceHero from '@/components/services/service-hero';
import ContentSection from '@/components/services/content-section';
import RiskFactorsList from '@/components/services/risk-factors-list';
import WarningSignsAlert from '@/components/services/warning-signs-alert';
import FAQSection from '@/components/services/faq-section';
import ServiceCTA from '@/components/services/service-cta';
import ComprehensiveGuidelinesSection from '@/components/services/comprehensive-guidelines-section';
import { 
  Calendar, 
  Heart, 
  Shield, 
  Users, 
  Stethoscope,
  Apple,
  Clock,
  AlertCircle
} from 'lucide-react';

export default function HighRiskPregnancyClient() {
  // Data based on provided content
  const riskFactors = [
    {
      category: "Age Factors",
      description: "Maternal age significantly impacts pregnancy risk levels",
      items: ["Under 17 years old", "Over 35 years old"]
    },
    {
      category: "Pregnancy History",
      description: "Previous pregnancy experiences and patterns",
      items: [
        "Multiparity (having five or more children)",
        "Short interpregnancy interval (becoming pregnant within three months of previous delivery)",
        "Complications in prior pregnancies",
        "Recurrent miscarriages or preterm deliveries"
      ]
    },
    {
      category: "Lifestyle Factors",
      description: "Personal choices that can affect pregnancy safety",
      items: ["Smoking", "Alcohol consumption", "Illegal drug use"]
    },
    {
      category: "Medical Conditions",
      description: "Underlying health conditions requiring specialized monitoring",
      items: [
        "Obesity", "Diabetes", "High blood pressure", "Epilepsy", "Anemia",
        "Infections", "Kidney disease", "Mental health conditions", "Cancer",
        "Heart disease", "Lupus", "Rheumatoid arthritis", "Inflammatory bowel disease",
        "Autoimmune disorders"
      ]
    },
    {
      category: "Surgical History",
      description: "Previous surgical procedures affecting reproductive organs",
      items: ["Previous C-sections", "Fibroid removal", "Other uterine surgeries"]
    },
    {
      category: "Pregnancy Type & Genetics",
      description: "Special pregnancy circumstances and genetic factors",
      items: [
        "Multiple pregnancies (twins or more)",
        "Personal or family history of birth defects",
        "Uterine or placental abnormalities"
      ]
    }
  ];

  const complications = [
    "Uterine, cervical, or placental problems",
    "Severe morning sickness (hyperemesis gravidarum)",
    "Rh (rhesus) sensitization",
    "Preterm labor",
    "Hypertension in pregnancy",
    "Placental abruption",
    "Gestational diabetes",
    "Cervical incompetence",
    "Placenta previa",
    "Intrauterine growth restriction (IUGR)/Fetal Growth Restriction (FGR)",
    "Polyhydramnios/oligohydramnios (excess or deficient amniotic fluid)",
    "Overdue pregnancy"
  ];

  const comprehensiveGuidelines = [
    {
      title: "Pre-Pregnancy Planning",
      description: "Essential steps to take before conception for optimal pregnancy outcomes",
      icon: <Calendar className="w-6 h-6" />,
      priority: "high" as const,
      steps: [
        "Schedule preconception appointment with a gynecologist when planning pregnancy",
        "Discuss family medical history and genetic counseling if needed",
        "Careful consideration and planning for Assisted Reproductive Technology (ART) or IVF",
        "Optimize overall health status before conception"
      ]
    },
    {
      title: "Medical Care & Monitoring",
      description: "Comprehensive medical supervision throughout your pregnancy journey",
      icon: <Stethoscope className="w-6 h-6" />,
      priority: "high" as const,
      steps: [
        "Attend all prenatal care appointments without missing check-ups",
        "Follow prescribed medication regimens as directed by your healthcare team",
        "Monitor for any warning signs and report them immediately",
        "Coordinate care between multiple specialists as needed"
      ]
    },
    {
      title: "Lifestyle & Nutrition",
      description: "Healthy lifestyle choices that support both mother and baby",
      icon: <Apple className="w-6 h-6" />,
      priority: "medium" as const,
      steps: [
        "Maintain a healthy, nutritious diet rich in essential nutrients",
        "Follow weight management guidelines according to medical advice",
        "Stay appropriately hydrated and get adequate rest",
        "Engage in safe, doctor-approved physical activities"
      ]
    },
    {
      title: "Risk Prevention",
      description: "Protective measures to minimize potential complications",
      icon: <Shield className="w-6 h-6" />,
      priority: "high" as const,
      steps: [
        "Completely avoid risky substances including alcohol, smoking, and drugs",
        "Practice infection prevention by avoiding contact with infected individuals",
        "Maintain proper hygiene and food safety practices",
        "Follow environmental safety guidelines to avoid harmful exposures"
      ]
    }
  ];

  const warningSignsData = [
    "Vaginal bleeding",
    "Fever, diarrhea, or persistent vomiting",
    "Pain or burning sensation during urination",
    "Pain, cramping, or pelvic pressure in the lower abdomen",
    "Watery vaginal discharge, either in a gush or a trickle",
    "Regular or frequent contractions, indicating tightening in the abdomen",
    "Decreased fetal movement",
    "Vision changes, such as blurred vision",
    "Sudden swelling of the face, hands, or feet",
    "Persistent headaches"
  ];

  const faqData = [
    {
      question: "What exactly is a high-risk pregnancy?",
      answer: "A high-risk pregnancy is one where the mother or baby has an increased chance of health problems during pregnancy, labor, or delivery. The term 'high-risk' doesn't mean something will definitely go wrong, but rather indicates that closer monitoring and specialized care are needed to ensure the best outcomes for both mother and baby."
    },
    {
      question: "Does having a high-risk pregnancy mean my baby will have problems?",
      answer: "No, being classified as high-risk doesn't mean your baby will definitely have problems. Many women with high-risk pregnancies deliver healthy babies with proper care and monitoring. The classification simply means you need extra attention and specialized care to ensure the best possible outcomes."
    },
    {
      question: "How often will I need to visit the doctor during a high-risk pregnancy?",
      answer: "High-risk pregnancies typically require more frequent antenatal visits for closer monitoring. The exact frequency depends on your specific risk factors and how your pregnancy progresses. Your doctor will create a personalized schedule that may include additional tests, ultrasounds, and specialist consultations."
    },
    {
      question: "What specialists might I need to see during my high-risk pregnancy?",
      answer: "Depending on your specific situation, you may be referred to specialists in maternal-fetal medicine, genetics, pediatrics, cardiology, endocrinology, or other relevant fields. The goal is to have a team of experts monitoring different aspects of your health and your baby's development."
    },
    {
      question: "Can I do anything to reduce my pregnancy risks?",
      answer: "Yes, there are several steps you can take: attend all prenatal appointments, maintain a healthy diet, manage weight gain according to medical advice, avoid alcohol, smoking, and drugs, prevent infections, take prescribed medications, and follow your doctor's recommendations closely."
    },
    {
      question: "What should I do if I experience warning signs?",
      answer: "If you experience any warning signs such as vaginal bleeding, severe headaches, vision changes, decreased fetal movement, or any other concerning symptoms, contact your doctor immediately. It's always better to be cautious and seek medical advice promptly."
    },
    {
      question: "Will I need to deliver at a special hospital?",
      answer: "High-risk pregnancies often require care at tertiary hospitals with advanced facilities like level 3 nurseries and ICUs. These hospitals are equipped with specialized equipment and staff to handle any complications that might arise during delivery."
    },
    {
      question: "Can my pregnancy change from low-risk to high-risk?",
      answer: "Yes, a pregnancy that starts as low-risk can become high-risk if complications develop, such as gestational diabetes, preeclampsia, preterm labor, or other conditions. This is why regular prenatal care and monitoring are so important throughout pregnancy."
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <ServiceHero
        title="High Risk Pregnancy"
        subtitle="Specialized Maternal Care"
        description="Dr. Amita Shukla is one of the best Gynecologist Obstetricians & Laparoscopic Surgeons in Lucknow, Uttar Pradesh. She specializes in comprehensive care for high-risk pregnancies, ensuring the best outcomes for both mother and baby through expert monitoring and personalized treatment plans."
        imageUrl="https://i.ibb.co/ycn9SnhQ/High-Risk-Pregnancy-Care.png"
        imageAlt="High Risk Pregnancy Care by Dr. Amita Shukla"
        features={["Expert Maternal-Fetal Medicine", "Advanced Monitoring Technology", "Comprehensive Specialist Care"]}
        specializations={["High-Risk Pregnancy", "Infertility", "PCOS/PCOD", "Menopause", "Advanced Laparoscopy", "Hysteroscopy", "Urogynecology"]}
      />

      {/* Understanding High-Risk Pregnancy */}
      <ContentSection
        title="Understanding High-Risk Pregnancy"
        content={[
          "Pregnancies can range from straightforward and low-risk, requiring routine antenatal care, to high-risk, which necessitates more intensive monitoring and care. The term 'high-risk' is used to indicate that the pregnancy needs extra attention to ensure the health and safety of both mother and baby, not to alarm the parents.",
          "Despite the term, many women with high-risk pregnancies deliver healthy babies with proper care and monitoring."
        ]}
        backgroundColor="white"
        centerText={true}
      />

      {/* What High-Risk Pregnancies Involve */}
      <ContentSection
        title="What High-Risk Pregnancies Typically Involve"
        content={[
          "High-risk pregnancies require specialized care and attention to ensure the best outcomes for both mother and baby."
        ]}
        backgroundColor="cream"
        listTitle="High-risk pregnancies typically involve:"
        listItems={[
          "More frequent antenatal visits for closer monitoring",
          "Referrals to specialists in maternal-fetal medicine, genetics, pediatrics, or other relevant fields",
          "Additional tests, ultrasounds, or procedures beyond routine prenatal screenings",
          "Care at tertiary hospitals with advanced facilities like level 3 nurseries and ICUs"
        ]}
      />

      {/* Risk Factors */}
      <RiskFactorsList
        title="What Constitutes a High-Risk Pregnancy?"
        subtitle="A pregnancy is considered high-risk if the mother has any of the following conditions:"
        riskFactors={riskFactors}
        backgroundColor="white"
      />

      {/* Complications That Can Develop */}
      <ContentSection
        title="When Low-Risk Pregnancies Become High-Risk"
        content={[
          "Additionally, a low-risk pregnancy can become high-risk if complications develop during pregnancy. It's important to monitor for these potential complications throughout pregnancy."
        ]}
        backgroundColor="cream"
        listTitle="Complications that can develop include:"
        listItems={complications}
      />

      {/* Comprehensive Care Guidelines */}
      <ComprehensiveGuidelinesSection
        title="Comprehensive Care Guidelines"
        subtitle="Expert-Recommended Steps for High-Risk Pregnancy Management"
        description="Following these evidence-based guidelines can significantly improve outcomes for both mother and baby. Each category represents critical aspects of comprehensive high-risk pregnancy care."
        guidelines={comprehensiveGuidelines}
        backgroundColor="white"
      />

      {/* Warning Signs */}
      <WarningSignsAlert
        title="Warning Signs to Watch For"
        subtitle="Critical Symptoms Requiring Immediate Medical Attention"
        warningMessage="It is crucial to report the following signs to your doctor immediately. By staying vigilant and following medical advice, women with high-risk pregnancies can improve their chances of having a successful delivery and a healthy baby."
        signs={warningSignsData}
      />

      {/* FAQ Section */}
      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Common questions about high-risk pregnancy care"
        faqs={faqData}
        backgroundColor="cream"
      />

      {/* CTA Section */}
      <ServiceCTA
        title="Ready to Receive Expert High-Risk Pregnancy Care?"
        description="Don't wait to get the specialized care you and your baby deserve. Schedule your consultation with Dr. Amita Shukla today and take the first step towards a healthy pregnancy journey with comprehensive monitoring and expert care."
        features={["24/7 Emergency Support", "Specialized Monitoring", "Expert Medical Team"]}
      />
    </div>
  );
}