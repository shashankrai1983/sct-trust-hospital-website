"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  CheckCircle, 
  Phone, 
  AlertTriangle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Heart,
  Shield,
  Star,
  Award,
  Clock,
  Calendar,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GridPattern } from '@/components/ui/grid-pattern';
import PregnancySOPs from '@/components/sops/PregnancySOPs';
import { pregnancySOPsData } from '@/data/pregnancy-sops';

export default function LuxuryHighRiskPregnancy() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const riskFactors = [
    {
      category: "Age Factors",
      description: "Maternal age significantly impacts pregnancy risk levels",
      items: ["Under 17 years old", "Over 35 years old"],
      icon: <Clock className="h-8 w-8" />,
      bgColor: "bg-primary-green",
      borderColor: "border-primary-green/20",
      accentColor: "bg-primary-green/10"
    },
    {
      category: "Medical Conditions", 
      description: "Underlying health conditions requiring specialized monitoring",
      items: ["Diabetes", "High blood pressure", "Heart disease", "Autoimmune disorders"],
      icon: <Heart className="h-8 w-8" />,
      bgColor: "bg-primary-green",
      borderColor: "border-primary-green/20",
      accentColor: "bg-primary-green/10"
    },
    {
      category: "Lifestyle Factors",
      description: "Personal choices that can affect pregnancy safety", 
      items: ["Smoking", "Alcohol consumption", "Illegal drug use"],
      icon: <Shield className="h-8 w-8" />,
      bgColor: "bg-forest-green",
      borderColor: "border-forest-green/20",
      accentColor: "bg-forest-green/10"
    },
    {
      category: "Pregnancy History",
      description: "Previous pregnancy experiences and patterns",
      items: ["Multiple pregnancies", "Previous complications", "Short pregnancy intervals"],
      icon: <Award className="h-8 w-8" />,
      bgColor: "bg-forest-green",
      borderColor: "border-forest-green/20",
      accentColor: "bg-forest-green/10"
    }
  ];

  const warningSigns = [
    { text: "Vaginal bleeding", severity: "critical" },
    { text: "Fever, diarrhea, or persistent vomiting", severity: "high" },
    { text: "Pain or burning sensation during urination", severity: "high" },
    { text: "Decreased fetal movement", severity: "critical" },
    { text: "Vision changes, such as blurred vision", severity: "critical" },
    { text: "Persistent headaches", severity: "high" },
    { text: "Sudden swelling of face, hands, or feet", severity: "critical" },
    { text: "Regular contractions or abdominal tightening", severity: "critical" }
  ];

  const faqs = [
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
      question: "Where will I deliver my baby?",
      answer: "High-risk pregnancies typically require delivery at hospitals with advanced facilities like Level 3 NICU and specialized surgical capabilities. We work with SCT Trust Hospital and other tertiary care centers in Lucknow that are equipped to handle complex deliveries and provide immediate specialized care if needed."
    },
    {
      question: "Can my partner be involved in my appointments and care?",
      answer: "Absolutely! We encourage partner involvement throughout your pregnancy journey. Your partner can attend appointments, participate in care discussions, and be present during ultrasounds. We believe family support is crucial for successful high-risk pregnancy outcomes."
    },
    {
      question: "Will I need to stop working or restrict my activities?",
      answer: "Activity restrictions depend on your specific condition and risk factors. Some women can continue normal activities with modifications, while others may need bed rest or work restrictions. We'll provide personalized guidance based on your situation and monitor your response to activities throughout pregnancy."
    },
    {
      question: "What foods and activities should I avoid during high-risk pregnancy?",
      answer: "You should avoid alcohol, smoking, raw fish, undercooked meats, unpasteurized dairy, and excessive caffeine. Activity restrictions vary by condition - some may need to avoid heavy lifting or high-impact exercise. We'll provide you with a comprehensive list based on your specific risk factors."
    },
    {
      question: "What will my high-risk pregnancy care cost?",
      answer: "Costs vary depending on your specific needs, insurance coverage, and required treatments. We accept most insurance plans and government health schemes. Our team will discuss all costs upfront and work with you to explore payment options and insurance coverage for your care."
    },
    {
      question: "What are the success rates for pregnancies like mine?",
      answer: "Success rates depend on your specific risk factors and conditions. Overall, with proper medical care, most high-risk pregnancies (about 95%) result in healthy outcomes. During your consultation, we'll discuss statistics specific to your situation and provide realistic expectations based on current medical evidence."
    },
    {
      question: "Can I get a second opinion about my high-risk status?",
      answer: "Absolutely, and we encourage it if you have concerns. Getting a second opinion is a normal part of medical care, especially for high-risk pregnancies. We're happy to provide your medical records to another specialist and will continue to support you regardless of your decision."
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Luxury Hero Section */}
      <section className="relative min-h-screen pt-24 pb-20 flex items-center">
        {/* Elegant background with multiple gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-bg-offwhite via-accent-cream to-primary-green/5"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-primary-green/10"></div>
        
        {/* Premium decorative elements */}
        <div className="absolute top-32 left-10 w-72 h-72 rounded-full bg-primary-green/10 blur-3xl"></div>
        <div className="absolute bottom-32 right-10 w-96 h-96 rounded-full bg-forest-green/10 blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[700px]">
            {/* Left Content - Restructured for better balance */}
            <div className="flex flex-col justify-center space-y-6">
              {/* Top Section - Badge and Reassuring Message */}
              <div className="text-center lg:text-left space-y-4">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary-green/10 rounded-full border border-primary-green/20 backdrop-blur-sm">
                  <Star className="h-5 w-5 text-primary-green" />
                  <span className="text-primary-green font-semibold">Premium Specialized Care</span>
                </div>
                
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-md rounded-full shadow-warm">
                  <Heart className="h-5 w-5 text-primary-green" />
                  <span className="text-primary-green font-semibold text-sm">You're Not Alone in This Journey</span>
                </div>
              </div>

              {/* Main heading with luxury styling */}
              <div className="text-center lg:text-left space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-primary-green">
                    High Risk
                  </span>
                  <br />
                  <span className="text-secondary-brown">
                    Pregnancy
                  </span>
                </h1>
                <div className="w-24 h-1 bg-primary-green rounded-full mx-auto lg:mx-0"></div>
              </div>
              
              {/* Premium description */}
              <p className="text-xl text-text-brown/80 leading-relaxed text-center lg:text-left max-w-lg mx-auto lg:mx-0">
                Comprehensive, compassionate care for expectant mothers facing complex pregnancies. 
                Dr. Amita Shukla provides specialized monitoring and personalized treatment plans 
                to ensure the healthiest outcomes for both mother and baby.
              </p>

              
              {/* Doctor info - Compact */}
              <div className="text-center lg:text-left space-y-2">
                <h3 className="text-xl font-semibold text-secondary-brown">Dr. Amita Shukla</h3>
                <p className="text-text-brown/70">
                  Gynecologist Obstetrician & Laparoscopic Surgeon | Lucknow, UP
                </p>
              </div>
              
              {/* Feature badges - Compact 2x2 grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <CheckCircle className="h-5 w-5" />, text: "Expert Care" },
                  { icon: <Shield className="h-5 w-5" />, text: "Advanced Tech" },
                  { icon: <Award className="h-5 w-5" />, text: "10+ Years Exp" },
                  { icon: <Heart className="h-5 w-5" />, text: "Personal Care" }
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="text-primary-green">{feature.icon}</div>
                    <span className="text-text-brown font-medium text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>
              
              {/* Premium CTA buttons */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button asChild className="bg-gradient-to-r from-primary-green to-forest-green hover:from-forest-green hover:to-primary-green text-white px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <Link href="/contact" className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Schedule Consultation
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <a href="tel:+918303222222" className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>

            {/* Premium image section */}
            <div className="relative">
              <div className="relative">
                {/* Elegant frame */}
                <div className="absolute -inset-4 bg-primary-green/10 rounded-3xl blur-xl"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-white/50 to-accent-cream/50 rounded-2xl"></div>
                
                {/* Main image */}
                <div className="relative h-[700px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image 
                    src="https://i.ibb.co/ycn9SnhQ/High-Risk-Pregnancy-Care.png"
                    alt="High Risk Pregnancy Care by Dr. Amita Shukla"
                    fill
                    className="object-cover"
                    priority
                  />
                  
                  {/* Elegant overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
                
                {/* Premium floating badges */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-primary-green to-forest-green rounded-lg">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-text-brown">10+ Years</p>
                      <p className="text-xs text-text-brown/70">Specialized Care</p>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>

        {/* Elegant grid pattern */}
        <GridPattern
          width={60}
          height={60}
          x={-1}
          y={-1}
          strokeDasharray={"0.5 3"}
          className="text-primary-green/5 [mask-image:linear-gradient(to_bottom,transparent,white_20%,white_80%,transparent)]"
        />
      </section>

      {/* Luxury Understanding Section */}
      <section className="py-24 bg-gradient-to-b from-white to-accent-cream/30 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Premium section header */}
            <div className="mb-16 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-green/10 rounded-full">
                <Heart className="h-4 w-4 text-primary-green" />
                <span className="text-primary-green font-semibold text-sm">Understanding Your Care</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-secondary-brown">
                  High-Risk Pregnancy
                </span>
              </h2>
              
              <div className="w-32 h-1 bg-primary-green rounded-full mx-auto"></div>
            </div>
            
            {/* Elegant content cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="p-8 bg-gradient-to-br from-white to-accent-cream/50 rounded-2xl shadow-xl border border-white/50 backdrop-blur-sm">
                <div className="p-3 bg-gradient-to-r from-primary-green to-forest-green rounded-xl w-fit mx-auto mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-brown mb-4">What It Means</h3>
                <p className="text-text-brown/80 leading-relaxed">
                  Pregnancies can range from straightforward and low-risk, requiring routine antenatal care, to high-risk, which necessitates more intensive monitoring and care. The term "high-risk" indicates that the pregnancy needs extra attention to ensure the health and safety of both mother and baby.
                </p>
              </div>
              
              <div className="p-8 bg-gradient-to-br from-white to-primary-green/5 rounded-2xl shadow-xl border border-white/50 backdrop-blur-sm">
                <div className="p-3 bg-primary-green rounded-xl w-fit mx-auto mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-brown mb-4">Positive Outcomes</h3>
                <p className="text-text-brown/80 leading-relaxed">
                  Despite the term, many women with high-risk pregnancies deliver healthy babies with proper care and monitoring. The classification simply means you need specialized attention and expert care to ensure the best possible outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Care Journey Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,transparent_0%,rgba(96,108,56,0.1)_50%,transparent_100%)] transform -skew-y-1"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary-green/10 backdrop-blur-md border border-primary-green/20 rounded-full mb-8 shadow-warm">
              <div className="p-2 bg-primary-green rounded-full">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <span className="text-primary-green font-semibold text-sm tracking-wide">YOUR CARE JOURNEY</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-text-brown">
              What to Expect During Your Care
            </h2>
            
            <p className="text-xl text-text-brown/70 leading-relaxed">
              Understanding your care journey helps reduce anxiety and prepares you for each step ahead.
            </p>
          </div>

          {/* Care Journey Timeline */}
          <div className="max-w-7xl mx-auto">
            {/* Timeline Container with Enhanced Connecting Elements */}
            <div className="relative">
              {/* Enhanced Connecting Line with Gradient */}
              <div className="hidden lg:block absolute top-12 left-1/2 transform -translate-x-1/2 w-full max-w-6xl">
                <div className="relative h-1 bg-gradient-to-r from-transparent via-primary-green/40 to-transparent rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-green/20 via-forest-green/60 to-primary-green/20 rounded-full animate-pulse-light"></div>
                </div>
              </div>

              {/* Timeline Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
                {/* Step 1 */}
                <div className="relative group">
                  <div className="text-center">
                    {/* Enhanced Timeline Circle */}
                    <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-green via-forest-green to-primary-green rounded-full shadow-warm mb-6 border-4 border-white/90 group-hover:scale-105 transition-all duration-300">
                      <span className="text-white font-bold text-xl">1</span>
                      {/* Animated Progress Ring */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary-green to-forest-green rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
                      {/* Connection Dot */}
                      <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary-green rounded-full"></div>
                    </div>
                    
                    {/* Enhanced Step Content */}
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-warm border border-primary-green/10 group-hover:shadow-warm-lg group-hover:border-primary-green/30 transition-all duration-300">
                      <h3 className="text-lg font-bold text-text-brown mb-3 group-hover:text-primary-green transition-colors">
                        Initial Consultation
                      </h3>
                      <p className="text-text-brown/70 text-sm leading-relaxed mb-4">
                        Comprehensive medical history, physical examination, and initial risk assessment
                      </p>
                      <div className="inline-flex items-center gap-2 text-xs text-white font-semibold bg-primary-green px-3 py-1.5 rounded-full shadow-sm">
                        <Clock className="h-3 w-3" />
                        <span>60-90 minutes</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative group">
                  <div className="text-center">
                    {/* Enhanced Timeline Circle */}
                    <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-green via-forest-green to-primary-green rounded-full shadow-warm mb-6 border-4 border-white/90 group-hover:scale-105 transition-all duration-300">
                      <span className="text-white font-bold text-xl">2</span>
                      {/* Animated Progress Ring */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary-green to-forest-green rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
                      {/* Connection Dots */}
                      <div className="hidden lg:block absolute -left-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary-green rounded-full"></div>
                      <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary-green rounded-full"></div>
                    </div>
                    
                    {/* Enhanced Step Content */}
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-warm border border-primary-green/10 group-hover:shadow-warm-lg group-hover:border-primary-green/30 transition-all duration-300">
                      <h3 className="text-lg font-bold text-text-brown mb-3 group-hover:text-primary-green transition-colors">
                        Detailed Assessment
                      </h3>
                      <p className="text-text-brown/70 text-sm leading-relaxed mb-4">
                        Specialized tests, ultrasounds, and consultations with relevant specialists
                      </p>
                      <div className="inline-flex items-center gap-2 text-xs text-white font-semibold bg-forest-green px-3 py-1.5 rounded-full shadow-sm">
                        <Calendar className="h-3 w-3" />
                        <span>1-2 weeks</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative group">
                  <div className="text-center">
                    {/* Enhanced Timeline Circle */}
                    <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-green via-forest-green to-primary-green rounded-full shadow-warm mb-6 border-4 border-white/90 group-hover:scale-105 transition-all duration-300">
                      <span className="text-white font-bold text-xl">3</span>
                      {/* Animated Progress Ring */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary-green to-forest-green rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
                      {/* Connection Dots */}
                      <div className="hidden lg:block absolute -left-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary-green rounded-full"></div>
                      <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary-green rounded-full"></div>
                    </div>
                    
                    {/* Enhanced Step Content */}
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-warm border border-primary-green/10 group-hover:shadow-warm-lg group-hover:border-primary-green/30 transition-all duration-300">
                      <h3 className="text-lg font-bold text-text-brown mb-3 group-hover:text-primary-green transition-colors">
                        Personalized Care Plan
                      </h3>
                      <p className="text-text-brown/70 text-sm leading-relaxed mb-4">
                        Custom monitoring schedule, treatment protocols, and emergency action plan
                      </p>
                      <div className="inline-flex items-center gap-2 text-xs text-white font-semibold bg-primary-green px-3 py-1.5 rounded-full shadow-sm">
                        <Heart className="h-3 w-3" />
                        <span>Ongoing</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative group">
                  <div className="text-center">
                    {/* Enhanced Timeline Circle */}
                    <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-green via-forest-green to-primary-green rounded-full shadow-warm mb-6 border-4 border-white/90 group-hover:scale-105 transition-all duration-300">
                      <span className="text-white font-bold text-xl">4</span>
                      {/* Animated Progress Ring */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary-green to-forest-green rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
                      {/* Connection Dot */}
                      <div className="hidden lg:block absolute -left-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary-green rounded-full"></div>
                    </div>
                    
                    {/* Enhanced Step Content */}
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-warm border border-primary-green/10 group-hover:shadow-warm-lg group-hover:border-primary-green/30 transition-all duration-300">
                      <h3 className="text-lg font-bold text-text-brown mb-3 group-hover:text-primary-green transition-colors">
                        Safe Delivery
                      </h3>
                      <p className="text-text-brown/70 text-sm leading-relaxed mb-4">
                        Coordinated delivery at specialized facility with immediate expert care available
                      </p>
                      <div className="inline-flex items-center gap-2 text-xs text-white font-semibold bg-forest-green px-3 py-1.5 rounded-full shadow-sm">
                        <Star className="h-3 w-3" />
                        <span>Term delivery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Typical Timeline Box */}
            <div className="mt-20 max-w-5xl mx-auto">
              <div className="relative">
                {/* Connection Line from Timeline */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-0.5 h-10 bg-gradient-to-b from-primary-green/40 to-transparent"></div>
                
                {/* Enhanced Box Design */}
                <div className="bg-gradient-to-br from-white via-accent-cream/20 to-primary-green/5 backdrop-blur-sm rounded-3xl border-2 border-primary-green/20 shadow-warm-lg overflow-hidden">
                  {/* Header Section */}
                  <div className="bg-gradient-to-r from-primary-green to-forest-green p-6 text-center">
                    <div className="inline-flex items-center gap-3 text-white">
                      <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                        <Clock className="h-5 w-5" />
                      </div>
                      <span className="font-bold text-lg tracking-wide">Typical Timeline Overview</span>
                    </div>
                  </div>
                  
                  {/* Content Grid */}
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="text-center group">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-green/10 rounded-full mb-4 group-hover:bg-primary-green/20 transition-colors">
                          <Calendar className="h-6 w-6 text-primary-green" />
                        </div>
                        <h4 className="font-bold text-text-brown mb-3 text-lg">Appointment Frequency</h4>
                        <p className="text-text-brown/70 leading-relaxed">Every 2-4 weeks initially, increasing to weekly near delivery</p>
                      </div>
                      
                      <div className="text-center group">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-forest-green/10 rounded-full mb-4 group-hover:bg-forest-green/20 transition-colors">
                          <Heart className="h-6 w-6 text-forest-green" />
                        </div>
                        <h4 className="font-bold text-text-brown mb-3 text-lg">Monitoring Duration</h4>
                        <p className="text-text-brown/70 leading-relaxed">Throughout pregnancy with 24/7 emergency support</p>
                      </div>
                      
                      <div className="text-center group">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-green/10 rounded-full mb-4 group-hover:bg-primary-green/20 transition-colors">
                          <Users className="h-6 w-6 text-primary-green" />
                        </div>
                        <h4 className="font-bold text-text-brown mb-3 text-lg">Team Involvement</h4>
                        <p className="text-text-brown/70 leading-relaxed">2-4 specialists coordinating your complete care</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Care SOPs Section */}
      <PregnancySOPs 
        data={pregnancySOPsData}
        selectedRiskLevel="moderate"
        currentSeason="winter"
        showSeasonalOnly={false}
      />

      {/* Compact Risk Factors Section */}
      <section className="py-16 bg-gradient-to-b from-bg-offwhite via-accent-cream/30 to-white relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(96,108,56,0.03)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(188,108,37,0.03)_0%,transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Compact Section Header */}
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl border border-primary-green/15 rounded-full mb-6 shadow-warm">
              <div className="p-2 bg-gradient-to-br from-primary-green to-forest-green rounded-full">
                <AlertTriangle className="h-4 w-4 text-white" />
              </div>
              <span className="text-primary-green font-semibold text-sm tracking-wide">Risk Assessment</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-text-brown">
              Risk Factors to Consider
            </h2>
            
            <p className="text-lg text-text-brown/70 leading-relaxed max-w-3xl mx-auto">
              Our specialized team provides comprehensive care for each unique situation.
            </p>
          </div>

          {/* Compact Risk Factor Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {riskFactors.map((factor, index) => (
              <div key={index} className="group relative">                
                {/* Compact Card */}
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-warm hover:shadow-warm-lg border border-white/50 overflow-hidden transition-all duration-300 group-hover:-translate-y-1">
                  {/* Compact Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 ${factor.bgColor} rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 text-white`}>
                        {factor.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-text-brown mb-2 group-hover:text-primary-green transition-colors duration-300">
                          {factor.category}
                        </h3>
                        <p className="text-text-brown/70 text-sm leading-relaxed">
                          {factor.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Compact Content */}
                  <div className="px-6 pb-6">
                    <div className="space-y-2">
                      {factor.items.map((item, itemIndex) => (
                        <div 
                          key={itemIndex} 
                          className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-accent-cream/20 to-transparent hover:from-accent-cream/40 transition-all duration-300 border-l-2 border-transparent hover:border-primary-green/30"
                        >
                          <div className={`p-1 ${factor.bgColor} rounded-full flex-shrink-0 mt-1`}>
                            <CheckCircle className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-text-brown font-medium text-sm leading-relaxed hover:text-primary-green transition-colors duration-300">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Bottom accent */}
                  <div className={`h-0.5 ${factor.bgColor} opacity-20 group-hover:opacity-40 transition-all duration-500`}></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Compact Comfort Message */}
          <div className="max-w-3xl mx-auto mt-12 text-center">
            <div className="p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-warm">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-primary-green to-forest-green rounded-full">
                  <Heart className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-text-brown">You're in Expert Hands</h3>
              </div>
              <p className="text-base text-text-brown/80 leading-relaxed">
                Having risk factors doesn't mean complications will occur. With Dr. Amita Shukla's specialized care, 
                most high-risk pregnancies result in healthy outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Warning Signs Section */}
      <section className="py-24 bg-gradient-to-br from-accent-cream/30 via-bg-offwhite to-accent-cream/50 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Premium alert header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary-green rounded-full shadow-xl mb-8">
                <div className="p-2 bg-white/20 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <span className="text-white font-bold text-lg">Critical Alert</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-secondary-brown">
                  Warning Signs
                </span>
              </h2>
              
              <p className="text-xl text-text-brown/80 max-w-3xl mx-auto leading-relaxed">
                It is crucial to report the following signs to your doctor immediately. 
                Early detection and prompt medical attention can make all the difference.
              </p>
            </div>

            {/* Action Hierarchy Guide */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-primary-green/10 rounded-2xl border border-primary-green/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary-green rounded-full">
                      <AlertTriangle className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-primary-green">CRITICAL - Call Immediately</h3>
                  </div>
                  <p className="text-text-brown/80 text-sm leading-relaxed">
                    Don't wait - call <strong>+91 8303222222</strong> right away or go to the nearest emergency room
                  </p>
                </div>
                
                <div className="p-6 bg-forest-green/10 rounded-2xl border border-forest-green/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-forest-green rounded-full">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-forest-green">HIGH - Call Within 24 Hours</h3>
                  </div>
                  <p className="text-text-brown/80 text-sm leading-relaxed">
                    Contact us soon but not necessarily an emergency - schedule an urgent appointment
                  </p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-accent-cream/50 rounded-xl border border-primary-green/10 text-center">
                <p className="text-text-brown/80 text-sm">
                  <strong>When in doubt, always call.</strong> It's better to be safe than sorry. 
                  Our team is here to support you 24/7 during your pregnancy journey.
                </p>
              </div>
            </div>

            {/* Premium warning cards */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {warningSigns.map((sign, index) => (
                  <div 
                    key={index} 
                    className={`group p-6 rounded-xl border-l-4 transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                      Math.floor(index / 2) % 2 === 0 
                        ? 'bg-primary-green/10 border-primary-green hover:bg-primary-green/20' 
                        : 'bg-forest-green/10 border-forest-green hover:bg-forest-green/20'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-full ${Math.floor(index / 2) % 2 === 0 ? 'bg-primary-green' : 'bg-forest-green'}`}>
                        <AlertTriangle className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <span className="text-text-brown font-semibold group-hover:text-gray-900 transition-colors">
                          {sign.text}
                        </span>
                        {sign.severity === 'critical' && (
                          <span className={`inline-block ml-2 px-2 py-1 text-white text-xs rounded-full ${Math.floor(index / 2) % 2 === 0 ? 'bg-primary-green' : 'bg-forest-green'}`}>
                            Critical
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Premium emergency contact */}
              <div className="text-center p-8 bg-primary-green rounded-2xl text-white">
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-4">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="font-semibold">Emergency Protocol</span>
                  </div>
                  <p className="text-xl font-bold mb-2">If you experience any of these symptoms</p>
                  <p className="text-white/90">Contact your doctor immediately - Don't wait!</p>
                </div>
                
                <Button asChild className="bg-white text-secondary-brown hover:bg-gray-100 px-8 py-4 rounded-full shadow-xl font-bold text-lg">
                  <a href="tel:+918303222222" className="flex items-center gap-3">
                    <Phone className="h-6 w-6" />
                    Emergency: +91 8303222222
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-white to-accent-cream/30 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-md border border-primary-green/20 rounded-full mb-8 shadow-lg">
              <div className="p-2 bg-primary-green rounded-full">
                <HelpCircle className="h-4 w-4 text-white" />
              </div>
              <span className="text-primary-green font-bold text-sm tracking-wide">EXPERT ANSWERS</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-primary-green">
                Frequently Asked Questions
              </span>
            </h2>
            
            <p className="text-xl text-text-brown/80 leading-relaxed">
              Expert answers to common questions about high-risk pregnancy care
            </p>
            
            <div className="w-24 h-1.5 bg-primary-green rounded-full mx-auto mt-8 shadow-lg"></div>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl shadow-lg border border-white/50 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full p-8 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-accent-cream/30 hover:to-primary-green/5 transition-all duration-300"
                  >
                    <h3 className="text-lg font-bold text-text-brown pr-6 group-hover:text-primary-green transition-colors">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0 p-2 bg-primary-green rounded-full">
                      {openFAQ === index ? (
                        <ChevronUp className="h-5 w-5 text-white" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-white" />
                      )}
                    </div>
                  </button>
                  
                  {openFAQ === index && (
                    <div className="px-8 pb-8 pt-2 bg-gradient-to-r from-accent-cream/20 to-primary-green/5 border-t border-primary-green/20">
                      <p className="text-text-brown/80 leading-relaxed text-lg">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different Section */}
      <section className="py-24 bg-gradient-to-b from-accent-cream/30 to-white relative overflow-hidden">
        {/* Elegant background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(96,108,56,0.05)_0%,transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(34,139,34,0.05)_0%,transparent_60%)]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-md border border-primary-green/20 rounded-full mb-8 shadow-warm">
              <div className="p-2 bg-primary-green rounded-full">
                <Award className="h-5 w-5 text-white" />
              </div>
              <span className="text-primary-green font-semibold text-sm tracking-wide">SPECIALIZED EXCELLENCE</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-text-brown">
              What Makes Our Care Different
            </h2>
            
            <p className="text-xl text-text-brown/70 leading-relaxed">
              Comprehensive, personalized care that goes beyond standard medical treatment to support you and your family throughout this important journey.
            </p>
          </div>

          {/* Differentiators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Advanced Technology */}
            <div className="group relative">
              <div className="p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-warm hover:shadow-warm-lg border border-white/50 transition-all duration-500 group-hover:-translate-y-2">
                <div className="p-4 bg-gradient-to-br from-primary-green to-forest-green rounded-2xl w-fit mb-6 group-hover:scale-110 transition-all duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-brown mb-4 group-hover:text-primary-green transition-colors duration-300">
                  Advanced Monitoring Technology
                </h3>
                <ul className="space-y-2 text-text-brown/80 text-sm leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary-green mt-0.5 flex-shrink-0" />
                    <span>4D ultrasound for detailed fetal assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary-green mt-0.5 flex-shrink-0" />
                    <span>Continuous fetal heart rate monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary-green mt-0.5 flex-shrink-0" />
                    <span>Advanced genetic screening capabilities</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Team Approach */}
            <div className="group relative">
              <div className="p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-warm hover:shadow-warm-lg border border-white/50 transition-all duration-500 group-hover:-translate-y-2">
                <div className="p-4 bg-gradient-to-br from-primary-green to-forest-green rounded-2xl w-fit mb-6 group-hover:scale-110 transition-all duration-300">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-brown mb-4 group-hover:text-primary-green transition-colors duration-300">
                  Multidisciplinary Team Care
                </h3>
                <ul className="space-y-2 text-text-brown/80 text-sm leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary-green mt-0.5 flex-shrink-0" />
                    <span>Maternal-fetal medicine specialists</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary-green mt-0.5 flex-shrink-0" />
                    <span>Nutritionist and counselor support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary-green mt-0.5 flex-shrink-0" />
                    <span>Coordinated care with pediatric specialists</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 24/7 Support */}
            <div className="group relative">
              <div className="p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-warm hover:shadow-warm-lg border border-white/50 transition-all duration-500 group-hover:-translate-y-2">
                <div className="p-4 bg-gradient-to-br from-primary-green to-forest-green rounded-2xl w-fit mb-6 group-hover:scale-110 transition-all duration-300">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-brown mb-4 group-hover:text-primary-green transition-colors duration-300">
                  24/7 Emergency Support
                </h3>
                <ul className="space-y-2 text-text-brown/80 text-sm leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary-green mt-0.5 flex-shrink-0" />
                    <span>Direct access to Dr. Amita Shukla</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary-green mt-0.5 flex-shrink-0" />
                    <span>Emergency consultation within 30 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary-green mt-0.5 flex-shrink-0" />
                    <span>Immediate hospital admission when needed</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Hospital Partnerships */}
            <div className="group relative">
              <div className="p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-warm hover:shadow-warm-lg border border-white/50 transition-all duration-500 group-hover:-translate-y-2">
                <div className="p-4 bg-gradient-to-br from-primary-green to-forest-green rounded-2xl w-fit mb-6 group-hover:scale-110 transition-all duration-300">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-brown mb-4 group-hover:text-primary-green transition-colors duration-300">
                  Premium Hospital Partnerships
                </h3>
                <ul className="space-y-2 text-text-brown/80 text-sm leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary-green mt-0.5 flex-shrink-0" />
                    <span>SCT Trust Hospital - Level 3 NICU</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary-green mt-0.5 flex-shrink-0" />
                    <span>Advanced surgical facilities available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary-green mt-0.5 flex-shrink-0" />
                    <span>Immediate neonatal intensive care</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Personalized Care */}
            <div className="group relative">
              <div className="p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-warm hover:shadow-warm-lg border border-white/50 transition-all duration-500 group-hover:-translate-y-2">
                <div className="p-4 bg-gradient-to-br from-primary-green to-forest-green rounded-2xl w-fit mb-6 group-hover:scale-110 transition-all duration-300">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-brown mb-4 group-hover:text-primary-green transition-colors duration-300">
                  Personalized Care Plans
                </h3>
                <ul className="space-y-2 text-text-brown/80 text-sm leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary-green mt-0.5 flex-shrink-0" />
                    <span>Customized monitoring schedule</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary-green mt-0.5 flex-shrink-0" />
                    <span>Individual risk assessment protocols</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary-green mt-0.5 flex-shrink-0" />
                    <span>Family-centered care approach</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Patient Education */}
            <div className="group relative">
              <div className="p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-warm hover:shadow-warm-lg border border-white/50 transition-all duration-500 group-hover:-translate-y-2">
                <div className="p-4 bg-gradient-to-br from-primary-green to-forest-green rounded-2xl w-fit mb-6 group-hover:scale-110 transition-all duration-300">
                  <HelpCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-brown mb-4 group-hover:text-primary-green transition-colors duration-300">
                  Comprehensive Education & Support
                </h3>
                <ul className="space-y-2 text-text-brown/80 text-sm leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary-green mt-0.5 flex-shrink-0" />
                    <span>Detailed educational materials provided</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary-green mt-0.5 flex-shrink-0" />
                    <span>Regular progress discussions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary-green mt-0.5 flex-shrink-0" />
                    <span>Partner and family involvement encouraged</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Trust Statistics */}
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="p-8 bg-gradient-to-r from-white/80 to-accent-cream/50 rounded-3xl border border-primary-green/10 shadow-warm backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary-green mb-2">10+</div>
                  <div className="text-text-brown/80 text-sm font-medium">Years Specialized Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-green mb-2">95%</div>
                  <div className="text-text-brown/80 text-sm font-medium">Successful Outcome Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-green mb-2">24/7</div>
                  <div className="text-text-brown/80 text-sm font-medium">Emergency Support</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-green mb-2">500+</div>
                  <div className="text-text-brown/80 text-sm font-medium">Successful High-Risk Deliveries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Premium background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-green to-forest-green"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        
        {/* Elegant decorative elements */}
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center text-white">
            <div className="mb-12 space-y-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                <Star className="h-5 w-5" />
                <span className="font-semibold">Premium Healthcare Excellence</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Ready for Expert<br />
                <span className="text-accent-cream">
                  High-Risk Pregnancy Care?
                </span>
              </h2>
              
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Don't wait to get the specialized care you and your baby deserve. 
                Schedule your consultation with Dr. Amita Shukla today and take the first step 
                towards a healthy pregnancy journey with comprehensive monitoring and expert care.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <Button asChild className="bg-white text-primary-green hover:bg-gray-100 px-10 py-6 rounded-full shadow-2xl font-bold text-lg transform hover:scale-105 transition-all duration-300">
                <Link href="/contact" className="flex items-center gap-3">
                  <Calendar className="h-6 w-6" />
                  Schedule Consultation
                </Link>
              </Button>
              <Button asChild className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 hover:border-white/70 backdrop-blur-md px-10 py-6 rounded-full shadow-xl hover:shadow-2xl font-bold text-lg transform hover:scale-105 transition-all duration-300">
                <a href="tel:+918303222222" className="flex items-center gap-3">
                  <Phone className="h-6 w-6" />
                  Call Now
                </a>
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/80">
              {[
                { icon: <Clock className="h-6 w-6" />, text: "24/7 Emergency Support" },
                { icon: <Shield className="h-6 w-6" />, text: "Specialized Monitoring" },
                { icon: <Award className="h-6 w-6" />, text: "Expert Medical Team" }
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  {feature.icon}
                  <span className="font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}