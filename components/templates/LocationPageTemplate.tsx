"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Car, 
  Users, 
  Heart, 
  Award, 
  Phone, 
  ArrowRight,
  Building2,
  Stethoscope,
  CheckCircle,
  Navigation,
  CreditCard,
  Shield,
  FileText,
  UserCheck,
  Calendar,
  MessageCircle,
  Star,
  Camera,
  Microscope
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { GridPattern } from '@/components/ui/grid-pattern';
import { getLocationDirectionsEmbedURL, generateDirectionsURLWithMode, getDynamicRouteInfo } from '@/lib/maps-utils';
import type { LocationSEOData, LocationPageProps } from '@/types/location';

// Hospital gallery images from homepage
const hospitalGalleryImages = [
  {
    src: "https://i.ibb.co/8gGt9HFG/1.png",
    alt: "Modern Hospital Facility",
  },
  {
    src: "https://i.ibb.co/W4zLWNP2/3.jpg",
    alt: "Advanced Medical Equipment",
  },
  {
    src: "https://i.ibb.co/rRgGgfzF/2.jpg",
    alt: "Comfortable Patient Areas",
  },
  {
    src: "https://i.ibb.co/cK4m5zrD/Whats-App-Image-2025-05-02-at-2-15-39-PM.jpg",
    alt: "Professional Medical Staff",
  },
  {
    src: "https://i.ibb.co/Tq2DgD8F/t3.jpg",
    alt: "Clean Healthcare Environment",
  },
  {
    src: "https://i.ibb.co/G4C9tm8g/30-3.jpg",
    alt: "State-of-the-art Medical Technology",
  }
];

export default function LocationPageTemplate({ location }: LocationPageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const demographicsRef = useRef<HTMLDivElement>(null);
  const competitiveRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);
  const accessibilityRef = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);
  const costsRef = useRef<HTMLDivElement>(null);
  const whatToExpectRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const healthConcernsRef = useRef<HTMLDivElement>(null);
  const lifeStageRef = useRef<HTMLDivElement>(null);
  const facilitiesRef = useRef<HTMLDivElement>(null);

  // Get dynamic route information
  const dynamicRouteInfo = getDynamicRouteInfo(location);

  const isHeroInView = useInView(heroRef, { once: true });
  const isDemographicsInView = useInView(demographicsRef, { once: true });
  const isCompetitiveInView = useInView(competitiveRef, { once: true });
  const isServicesInView = useInView(servicesRef, { once: true });
  const isStoriesInView = useInView(storiesRef, { once: true });
  const isAccessibilityInView = useInView(accessibilityRef, { once: true });
  const isCommunityInView = useInView(communityRef, { once: true });
  const isCostsInView = useInView(costsRef, { once: true });
  const isWhatToExpectInView = useInView(whatToExpectRef, { once: true });
  const isPhilosophyInView = useInView(philosophyRef, { once: true });
  const isHealthConcernsInView = useInView(healthConcernsRef, { once: true });
  const isLifeStageInView = useInView(lifeStageRef, { once: true });
  const isFacilitiesInView = useInView(facilitiesRef, { once: true });

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="py-16 bg-gradient-to-b from-accent-cream to-accent-cream/30 relative"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-white font-medium mb-3 flex items-center">
                <Building2 className="h-5 w-5 mr-2" /> SCT Trust Hospital, Lucknow
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 green-title-text">
                {location.seoData.title}
              </h1>
              <div className="text-xl md:text-2xl text-text-brown font-light mb-6">
                {location.uniquePositioning.tagline}
              </div>
              
              {/* Key Features - Simplified */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {location.uniquePositioning.keyFeatures.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-white flex-shrink-0" />
                    <span className="text-sm text-text-brown/80">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild variant="ghost" className="btn-green">
                  <Link href="/contact">Book Appointment</Link>
                </Button>
                <Button asChild variant="outline" className="btn-outline">
                  <a href="tel:+918303222222">
                    <Phone className="mr-2 h-4 w-4" /> Call Now
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-warm-lg">
                <Image 
                  src="https://i.ibb.co/wNcyfqGS/Amita-Shukla-website-image.png" 
                  alt={`Dr. Amita Shukla - Best Gynecologist in ${location.displayName}`}
                  fill
                  className="object-cover"
                />
              </div>
              
            </motion.div>
          </div>
        </div>
        
        <GridPattern
          width={60}
          height={60}
          strokeDasharray={"0.5 3"}
          className="text-white/10 [mask-image:linear-gradient(to_bottom,transparent,white_50%,white_60%,transparent)]"
        />
      </section>


      {/* What to Expect Section */}
      <section 
        ref={whatToExpectRef}
        className="py-16 bg-white relative"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isWhatToExpectInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 green-title-text">
                What to Expect During Your Visit
              </h2>
              <p className="text-lg text-text-brown/80 max-w-3xl mx-auto">
                We understand that visiting a gynecologist can feel overwhelming. Here's what you can expect 
                during your appointment with Dr. Amita Shukla to help you feel more comfortable and prepared.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* First Visit */}
              <motion.div 
                className="bg-gradient-to-br from-primary-green/5 to-accent-cream/30 p-8 rounded-2xl shadow-warm border border-primary-green/10"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#387F29] flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-text-brown">First Visit</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown leading-relaxed">Detailed medical history discussion in a private, comfortable environment</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown leading-relaxed">Discussion of your health concerns, questions, and goals</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown leading-relaxed">Physical examination only if necessary and with your consent</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown leading-relaxed">Clear explanation of any recommended tests or treatments</span>
                  </div>
                </div>
              </motion.div>

              {/* During Consultation */}
              <motion.div 
                className="bg-gradient-to-br from-accent-cream/20 to-primary-green/5 p-8 rounded-2xl shadow-warm border border-primary-green/10"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#387F29] flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-text-brown">During Consultation</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown leading-relaxed">Open, non-judgmental conversation about your health concerns</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown leading-relaxed">Patient privacy and confidentiality strictly maintained</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown leading-relaxed">Clear explanations in easy-to-understand language</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown leading-relaxed">Ample time to ask questions and discuss concerns</span>
                  </div>
                </div>
              </motion.div>

              {/* Follow-up Care */}
              <motion.div 
                className="bg-gradient-to-br from-primary-green/10 to-accent-cream/20 p-8 rounded-2xl shadow-warm border border-primary-green/10"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#387F29] flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-text-brown">Follow-up Care</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown leading-relaxed">Personalized treatment plan based on your specific needs</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown leading-relaxed">Clear instructions for any prescribed medications or procedures</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown leading-relaxed">Scheduling of follow-up appointments as needed</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown leading-relaxed">Ongoing support and guidance for your health journey</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Comfort & Privacy Assurance */}
            <motion.div 
              className="mt-12 bg-gradient-to-r from-primary-green/10 to-accent-cream/30 p-8 rounded-2xl shadow-warm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isWhatToExpectInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#387F29] flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-text-brown mb-4">Your Comfort is Our Priority</h3>
                <p className="text-text-brown/80 max-w-3xl mx-auto">
                  Dr. Amita Shukla understands that gynecological visits can be sensitive. She creates a welcoming, 
                  non-judgmental environment where you can feel comfortable discussing your health concerns openly. 
                  Your privacy and dignity are always respected, and you have control over your examination and treatment.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <GridPattern
          width={60}
          height={60}
          strokeDasharray={"1 3"}
          className="text-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white_70%)]"
        />
      </section>

      {/* Location-Specific Services Section */}
      <section 
        ref={servicesRef}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold mb-6 green-title-text text-center">
              Specialized Services for {location.displayName} Residents
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-text-brown mb-4 flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-white" />
                  Primary Services
                </h3>
                <div className="space-y-3">
                  {location.serviceFocus.primary.map((service, index) => {
                    // Map services to their corresponding page links
                    const getServiceLink = (serviceName: string) => {
                      const lowerService = serviceName.toLowerCase();
                      if (lowerService.includes('high risk') || lowerService.includes('high-risk')) return '/services/high-risk-pregnancy';
                      if (lowerService.includes('pcos') || lowerService.includes('pcod')) return '/services/pcos-pcod-treatment';
                      if (lowerService.includes('fertility') || lowerService.includes('infertility')) return '/services/infertility-treatment';
                      if (lowerService.includes('laparoscop')) return '/services/laparoscopy';
                      if (lowerService.includes('pregnancy') && lowerService.includes('complication')) return '/services/pregnancy-complications';
                      if (lowerService.includes('antenatal') || lowerService.includes('prenatal')) return '/services/antenatal-care';
                      if (lowerService.includes('preventive') || lowerService.includes('screening') || lowerService.includes('well women') || lowerService.includes('women health')) return '/services/well-women-health';
                      return null;
                    };
                    
                    const serviceLink = getServiceLink(service);
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-white" />
                        {serviceLink ? (
                          <Link href={serviceLink} className="text-text-brown hover:text-primary-green hover:underline transition-colors">
                            {service}
                          </Link>
                        ) : (
                          <span className="text-text-brown">{service}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-text-brown mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-white" />
                  Specialized Programs
                </h3>
                <div className="space-y-3">
                  {location.serviceFocus.unique.map((service, index) => {
                    // Map unique services to their corresponding page links  
                    const getServiceLink = (serviceName: string) => {
                      const lowerService = serviceName.toLowerCase();
                      if (lowerService.includes('pcos') || lowerService.includes('pcod')) return '/services/pcos-pcod-treatment';
                      if (lowerService.includes('fertility') || lowerService.includes('infertility')) return '/services/infertility-treatment';
                      if (lowerService.includes('laparoscop')) return '/services/laparoscopy';
                      if (lowerService.includes('telemedicine') || lowerService.includes('consultation')) return '/contact';
                      if (lowerService.includes('package') || lowerService.includes('screening')) return '/services/well-women-health';
                      return null;
                    };
                    
                    const serviceLink = getServiceLink(service);
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-white" />
                        {serviceLink ? (
                          <Link href={serviceLink} className="text-text-brown hover:text-primary-green hover:underline transition-colors">
                            {service}
                          </Link>
                        ) : (
                          <span className="text-text-brown">{service}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Dr. Amita's Philosophy Section */}
      <section 
        ref={philosophyRef}
        className="py-16 bg-gradient-to-b from-accent-cream/30 to-white relative"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isPhilosophyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 green-title-text">
                Dr. Amita's Approach to Patient Care
              </h2>
              <p className="text-lg text-text-brown/80 max-w-3xl mx-auto">
                With over a decade of experience in women's healthcare, <Link href="/about" className="text-primary-green hover:text-primary-green/80 underline">Dr. Amita Shukla</Link> combines 
                medical expertise with compassionate, personalized care for every patient. Her comprehensive training in <Link href="/services/high-risk-pregnancy" className="text-primary-green hover:text-primary-green/80 underline">high-risk pregnancy management</Link> and <Link href="/services/laparoscopy" className="text-primary-green hover:text-primary-green/80 underline">advanced laparoscopic procedures</Link> ensures the highest standard of care.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Philosophy Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isPhilosophyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-text-brown mb-6 flex items-center gap-3">
                  <Heart className="h-6 w-6 text-white" />
                  Compassionate Care Philosophy
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#387F29] flex items-center justify-center flex-shrink-0">
                      <UserCheck className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-text-brown mb-2">Patient-Centered Approach</h4>
                      <p className="text-text-brown/80">Every treatment plan is tailored to your individual needs, 
                      lifestyle, and health goals. Your comfort and understanding are always my top priority.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#387F29] flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-text-brown mb-2">Open Communication</h4>
                      <p className="text-text-brown/80">I believe in creating a safe space where you can openly 
                      discuss your concerns without judgment. Clear, honest communication builds trust and better outcomes.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#387F29] flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-text-brown mb-2">Evidence-Based Excellence</h4>
                      <p className="text-text-brown/80">Combining the latest medical research with time-tested 
                      practices to provide you with the most effective and safest treatment options available.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Doctor's Image */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                animate={isPhilosophyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-warm-lg">
                  <Image 
                    src="https://i.ibb.co/wNcyfqGS/Amita-Shukla-website-image.png" 
                    alt="Dr. Amita Shukla - Compassionate Gynecologist"
                    fill
                    className="object-cover"
                  />
                  {/* Overlay with credentials */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="text-center">
                      <h4 className="text-lg font-bold text-text-brown mb-2">Dr. Amita Shukla</h4>
                      <p className="text-sm text-text-brown/80 mb-3">MS (OBS & GYNAE) • MBBS Gold Medalist</p>
                      <div className="flex items-center justify-center gap-4 text-xs text-text-brown/70">
                        <span className="flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          10+ Years Experience
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          1000+ Successful Deliveries
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Core Values */}
            <motion.div 
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isPhilosophyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-warm text-center">
                <div className="w-12 h-12 rounded-full bg-[#387F29] flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-text-brown mb-2">Privacy & Respect</h4>
                <p className="text-sm text-text-brown/80">Your privacy is sacred. Every consultation is conducted 
                with the utmost respect for your dignity and confidentiality.</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-warm text-center">
                <div className="w-12 h-12 rounded-full bg-[#387F29] flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-text-brown mb-2">Time & Attention</h4>
                <p className="text-sm text-text-brown/80">No rushed appointments. I dedicate adequate time to understand 
                your concerns and provide thoughtful, comprehensive care.</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-warm text-center">
                <div className="w-12 h-12 rounded-full bg-[#387F29] flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-text-brown mb-2">Holistic Wellness</h4>
                <p className="text-sm text-text-brown/80">Beyond treating symptoms, I focus on your overall 
                well-being, considering physical, emotional, and lifestyle factors.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <GridPattern
          width={40}
          height={40}
          strokeDasharray={"2 4"}
          className="text-white/10 [mask-image:linear-gradient(to_bottom,transparent,white_40%,white_60%,transparent)]"
        />
      </section>

      {/* Common Health Concerns Section */}
      <section 
        ref={healthConcernsRef}
        className="py-16 bg-gradient-to-b from-white to-accent-cream/20 relative"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isHealthConcernsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 green-title-text">
                Common Health Concerns in {location.displayName}
              </h2>
              <p className="text-lg text-text-brown/80 max-w-3xl mx-auto">
                Understanding the unique health challenges faced by women in {location.displayName} helps us provide 
                targeted, effective care. Here are the most common concerns we address in our practice. Our comprehensive approach includes <Link href="/services/pcos-pcod-treatment" className="text-primary-green hover:text-primary-green/80 underline">PCOS management</Link>, <Link href="/services/infertility-treatment" className="text-primary-green hover:text-primary-green/80 underline">fertility treatments</Link>, and <Link href="/services/well-women-health" className="text-primary-green hover:text-primary-green/80 underline">preventive healthcare services</Link>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {location.healthProfile.commonConcerns.map((concern, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-warm border border-primary-green/10 hover:border-primary-green/20 transition-all duration-300"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHealthConcernsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#387F29] flex items-center justify-center flex-shrink-0">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-text-brown leading-relaxed">{concern}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-white" />
                        <Link 
                          href={
                            concern.toLowerCase().includes('pcos') || concern.toLowerCase().includes('pcod') ? '/services/pcos-pcod-treatment' :
                            concern.toLowerCase().includes('fertility') || concern.toLowerCase().includes('conceiv') ? '/services/infertility-treatment' :
                            concern.toLowerCase().includes('pregnancy') && concern.toLowerCase().includes('delay') ? '/services/high-risk-pregnancy' :
                            concern.toLowerCase().includes('stress') || concern.toLowerCase().includes('irregular') ? '/services/pcos-pcod-treatment' :
                            concern.toLowerCase().includes('preventive') || concern.toLowerCase().includes('screening') ? '/services/well-women-health' :
                            '/contact'
                          }
                          className="text-xs text-white font-medium hover:text-primary-green/80 underline"
                        >
                          Specialized Treatment Available
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Lifestyle & Environmental Factors */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Lifestyle Factors */}
              <motion.div 
                className="bg-gradient-to-br from-primary-green/5 to-accent-cream/30 p-8 rounded-2xl shadow-warm border border-primary-green/10"
                initial={{ opacity: 0, x: -30 }}
                animate={isHealthConcernsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#387F29] flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-brown">Lifestyle Impact Factors</h3>
                  <p className="text-sm text-text-brown/70 mt-2">
                    How {location.displayName} lifestyle affects women's health
                  </p>
                </div>
                <div className="space-y-3">
                  {location.healthProfile.lifestyleFactors.map((factor, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-primary-green mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-text-brown leading-relaxed">{factor}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Environmental Factors */}
              <motion.div 
                className="bg-gradient-to-br from-accent-cream/20 to-primary-green/10 p-8 rounded-2xl shadow-warm border border-primary-green/10"
                initial={{ opacity: 0, x: 30 }}
                animate={isHealthConcernsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#387F29] flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-brown">Environmental Considerations</h3>
                  <p className="text-sm text-text-brown/70 mt-2">
                    {location.displayName} environmental factors we consider in treatment
                  </p>
                </div>
                <div className="space-y-3">
                  {location.healthProfile.environmentalFactors.map((factor, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-primary-green mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-text-brown leading-relaxed">{factor}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Age Group Focus */}
            <motion.div 
              className="mt-12 bg-gradient-to-r from-primary-green/10 to-accent-cream/30 p-8 rounded-2xl shadow-warm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isHealthConcernsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#387F29] flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-text-brown mb-4">Our Focus for {location.displayName}</h3>
                <p className="text-text-brown/80 max-w-3xl mx-auto">
                  {location.healthProfile.ageGroupFocus}
                </p>
                <div className="mt-6 flex justify-center">
                  <Button asChild variant="ghost" className="btn-green">
                    <Link href="/contact">Schedule Consultation</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <GridPattern
          width={50}
          height={50}
          strokeDasharray={"1 3"}
          className="text-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,white_80%)]"
        />
      </section>

      {/* Health by Life Stage Section */}
      <section 
        ref={lifeStageRef}
        className="py-16 bg-gradient-to-b from-accent-cream/20 to-white relative"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isLifeStageInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 green-title-text">
                Women's Health by Life Stage
              </h2>
              <p className="text-lg text-text-brown/80 max-w-3xl mx-auto">
                Your health needs evolve throughout different stages of life. Our comprehensive approach ensures 
                you receive age-appropriate care and guidance at every phase of your journey.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Adolescent & Young Women (13-22) */}
              <motion.div
                className="bg-gradient-to-br from-primary-green/5 to-accent-cream/30 p-6 rounded-xl shadow-warm border border-primary-green/10"
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                initial={{ opacity: 0, y: 20 }}
                animate={isLifeStageInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-pink-600" />
                  </div>
                  <h3 className="text-lg font-bold text-text-brown">Adolescent Care</h3>
                  <p className="text-sm text-text-brown/70">Ages 13-22</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown">Menstrual health education and management</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown">Body changes and puberty guidance</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown">Reproductive health awareness</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown">Vaccination counseling (HPV, others)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown">Body confidence and self-care habits</span>
                  </div>
                </div>
              </motion.div>

              {/* Reproductive Years (23-35) */}
              <motion.div
                className="bg-gradient-to-br from-accent-cream/20 to-primary-green/10 p-6 rounded-xl shadow-warm border border-primary-green/10"
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                initial={{ opacity: 0, y: 20 }}
                animate={isLifeStageInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-text-brown">Reproductive Prime</h3>
                  <p className="text-sm text-text-brown/70">Ages 23-35</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <Link href="/services/well-women-health" className="text-sm text-text-brown hover:text-primary-green hover:underline transition-colors">Family planning and contraception</Link>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <Link href="/services/infertility-treatment" className="text-sm text-text-brown hover:text-primary-green hover:underline transition-colors">Pre-conception counseling and care</Link>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <Link href="/services/antenatal-care" className="text-sm text-text-brown hover:text-primary-green hover:underline transition-colors">Pregnancy care and monitoring</Link>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <Link href="/services/pcos-pcod-treatment" className="text-sm text-text-brown hover:text-primary-green hover:underline transition-colors">PCOS and fertility management</Link>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown">Career-health balance guidance</span>
                  </div>
                </div>
              </motion.div>

              {/* Established Adulthood (36-45) */}
              <motion.div
                className="bg-gradient-to-br from-primary-green/10 to-accent-cream/20 p-6 rounded-xl shadow-warm border border-primary-green/10"
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                initial={{ opacity: 0, y: 20 }}
                animate={isLifeStageInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-text-brown">Established Years</h3>
                  <p className="text-sm text-text-brown/70">Ages 36-45</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <Link href="/services/high-risk-pregnancy" className="text-sm text-text-brown hover:text-primary-green hover:underline transition-colors">High-risk pregnancy management</Link>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <Link href="/services/infertility-treatment" className="text-sm text-text-brown hover:text-primary-green hover:underline transition-colors">Fertility preservation options</Link>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown">Preventive screening programs</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown">Hormonal health monitoring</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown">Stress management and wellness</span>
                  </div>
                </div>
              </motion.div>

              {/* Midlife & Beyond (45+) */}
              <motion.div
                className="bg-gradient-to-br from-accent-cream/30 to-primary-green/5 p-6 rounded-xl shadow-warm border border-primary-green/10"
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                initial={{ opacity: 0, y: 20 }}
                animate={isLifeStageInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-text-brown">Midlife & Beyond</h3>
                  <p className="text-sm text-text-brown/70">Ages 45+</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown">Menopause management and support</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown">Hormone replacement therapy</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown">Bone health and osteoporosis prevention</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown">Cardiovascular health monitoring</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-brown">Quality of life optimization</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Personalized Care Approach */}
            <motion.div 
              className="mt-12 bg-gradient-to-r from-primary-green/10 to-accent-cream/30 p-8 rounded-2xl shadow-warm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isLifeStageInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#387F29] flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-text-brown mb-4">Personalized Care at Every Stage</h3>
                <p className="text-text-brown/80 max-w-4xl mx-auto mb-6">
                  <Link href="/about" className="text-primary-green hover:text-primary-green/80 underline">Dr. Amita Shukla</Link> understands that every woman's health journey is unique. We provide personalized care 
                  that adapts to your life stage, individual needs, and personal health goals, ensuring you receive the 
                  most appropriate and effective treatment at every phase of your life. From <Link href="/services/antenatal-care" className="text-primary-green hover:text-primary-green/80 underline">comprehensive pregnancy care</Link> to <Link href="/services/well-women-health" className="text-primary-green hover:text-primary-green/80 underline">preventive health screening</Link>, every service is tailored to your unique needs.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white/50 p-4 rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <UserCheck className="h-5 w-5 text-white" />
                      <span className="font-semibold text-text-brown">Individual Assessment</span>
                    </div>
                    <p className="text-sm text-text-brown/80">Comprehensive evaluation of your unique health profile</p>
                  </div>
                  <div className="bg-white/50 p-4 rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Calendar className="h-5 w-5 text-white" />
                      <span className="font-semibold text-text-brown">Ongoing Support</span>
                    </div>
                    <p className="text-sm text-text-brown/80">Continuous care that evolves with your changing needs</p>
                  </div>
                  <div className="bg-white/50 p-4 rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <MessageCircle className="h-5 w-5 text-white" />
                      <span className="font-semibold text-text-brown">Expert Guidance</span>
                    </div>
                    <p className="text-sm text-text-brown/80">Evidence-based advice tailored to your life stage</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <GridPattern
          width={60}
          height={60}
          strokeDasharray={"2 4"}
          className="text-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white_70%)]"
        />
      </section>

      {/* Modern Facilities Section */}
      <section 
        ref={facilitiesRef}
        className="py-16 bg-white relative"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isFacilitiesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 green-title-text">
                State-of-the-Art Medical Facilities
              </h2>
              <p className="text-lg text-text-brown/80 max-w-3xl mx-auto">
                SCT Trust Hospital features modern medical equipment and comfortable facilities designed to provide 
                the highest standard of gynecological and obstetric care in a welcoming environment.
              </p>
            </div>

            {/* Hospital Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {hospitalGalleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="relative group aspect-video rounded-xl overflow-hidden shadow-warm border border-primary-green/10 hover:border-primary-green/20 transition-all duration-300"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFacilitiesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-text-brown/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-primary-green"></div>
                        <span className="text-white font-medium text-sm">{image.alt}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Camera className="h-4 w-4 text-white/80" />
                        <span className="text-white/80 text-xs">SCT Trust Hospital</span>
                      </div>
                    </div>
                  </div>
                  {/* Hover Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Facilities Features */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Medical Equipment */}
              <motion.div 
                className="bg-gradient-to-br from-primary-green/5 to-accent-cream/30 p-8 rounded-2xl shadow-warm border border-primary-green/10"
                initial={{ opacity: 0, x: -30 }}
                animate={isFacilitiesInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#387F29] flex items-center justify-center mx-auto mb-4">
                    <Microscope className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-brown">Advanced Medical Technology</h3>
                  <p className="text-sm text-text-brown/70 mt-2">
                    Latest equipment for accurate diagnosis and treatment
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-white mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-text-brown text-sm">State of Art NICU for Newborns</p>
                      <p className="text-xs text-text-brown/70">Advanced neonatal intensive care unit with specialized equipment for newborn care</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-white mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-text-brown text-sm">Modern Operation Theaters</p>
                      <p className="text-xs text-text-brown/70">Sterile, well-equipped surgical environments with latest monitoring</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Patient Comfort */}
              <motion.div 
                className="bg-gradient-to-br from-accent-cream/20 to-primary-green/10 p-8 rounded-2xl shadow-warm border border-primary-green/10"
                initial={{ opacity: 0, x: 30 }}
                animate={isFacilitiesInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#387F29] flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-brown">Patient Comfort & Safety</h3>
                  <p className="text-sm text-text-brown/70 mt-2">
                    Comfortable, hygienic environment designed for your well-being
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-white mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-text-brown text-sm">Private Consultation Rooms</p>
                      <p className="text-xs text-text-brown/70">Comfortable, confidential spaces for personal discussions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-white mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-text-brown text-sm">Spacious Waiting Areas</p>
                      <p className="text-xs text-text-brown/70">Clean, well-ventilated seating areas with natural lighting</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-white mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-text-brown text-sm">Infection Control Systems</p>
                      <p className="text-xs text-text-brown/70">Strict hygiene protocols and sterilization procedures</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-white mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-text-brown text-sm">Accessible Design</p>
                      <p className="text-xs text-text-brown/70">Wheelchair accessible with elevators and ramps</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Support Services */}
            <motion.div 
              className="bg-gradient-to-r from-primary-green/10 to-accent-cream/30 p-8 rounded-2xl shadow-warm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isFacilitiesInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-[#387F29] flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-text-brown mb-4">Comprehensive Support Services</h3>
                <p className="text-text-brown/80 max-w-3xl mx-auto">
                  Beyond medical care, SCT Trust Hospital provides comprehensive support services to ensure 
                  your complete healthcare experience is smooth and stress-free.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/50 p-6 rounded-xl text-center">
                  <div className="w-12 h-12 rounded-full bg-[#387F29] flex items-center justify-center mx-auto mb-4">
                    <Car className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-text-brown mb-2">Ample Parking</h4>
                  <p className="text-sm text-text-brown/80">Free parking for 100+ vehicles with valet service available</p>
                </div>

                <div className="bg-white/50 p-6 rounded-xl text-center">
                  <div className="w-12 h-12 rounded-full bg-[#387F29] flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-text-brown mb-2">Flexible Hours</h4>
                  <p className="text-sm text-text-brown/80">Extended consultation hours to accommodate your schedule</p>
                </div>

                <div className="bg-white/50 p-6 rounded-xl text-center">
                  <div className="w-12 h-12 rounded-full bg-[#387F29] flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-text-brown mb-2">24/7 Support</h4>
                  <p className="text-sm text-text-brown/80">Emergency consultation and patient support available</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <GridPattern
          width={50}
          height={50}
          strokeDasharray={"1 2"}
          className="text-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,white_80%)]"
        />
      </section>

      {/* Enhanced Easy Access Section */}
      <section 
        ref={accessibilityRef}
        className="py-16 bg-gradient-to-b from-white to-accent-cream/30 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <GridPattern
            width={40}
            height={40}
            strokeDasharray={"1 2"}
            className="text-white"
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isAccessibilityInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 green-title-text">
                Convenient Access from {location.displayName}
              </h2>
              <p className="text-lg text-text-brown/80 max-w-3xl mx-auto">
                Multiple convenient routes and transportation options make reaching SCT Trust Hospital 
                easy and accessible for {location.displayName} residents.
              </p>
            </div>
            
            {/* Transportation Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Driving Option */}
              <motion.div 
                className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-warm border border-primary-green/10 text-center"
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-green/20 to-primary-green/30 flex items-center justify-center mx-auto mb-6">
                  <Car className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-brown mb-4">Private Vehicle</h3>
                <div className="space-y-3">
                  <div className="bg-accent-cream/40 p-3 rounded-lg">
                    <p className="text-sm font-medium text-text-brown/70">Distance</p>
                    <p className="text-lg font-bold text-white">{dynamicRouteInfo.distance}</p>
                  </div>
                  <div className="bg-accent-cream/40 p-3 rounded-lg">
                    <p className="text-sm font-medium text-text-brown/70">Travel Time</p>
                    <p className="text-base font-semibold text-text-brown">{dynamicRouteInfo.currentTravelTime}</p>
                    <div className="flex gap-2 mt-1 text-xs text-text-brown/60">
                      <span>Peak: {dynamicRouteInfo.peakTravelTime}</span>
                      <span>•</span>
                      <span>Off-peak: {dynamicRouteInfo.offPeakTravelTime}</span>
                    </div>
                  </div>
                  <div className="text-sm text-white font-medium">
                    Via {location.accessibility.drivingRoutes.primary.split(' → ')[0]} → {location.accessibility.drivingRoutes.primary.split(' → ')[1]}
                  </div>
                </div>
                <div className="mt-4 p-3 bg-primary-green/10 rounded-lg">
                  <div className="flex items-center justify-center gap-2 text-sm text-text-brown">
                    <Car className="h-4 w-4" />
                    <span>Free Parking Available</span>
                  </div>
                </div>
              </motion.div>

              {/* Public Transport Option */}
              <motion.div 
                className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-warm border border-primary-green/10 text-center"
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-green/20 to-primary-green/30 flex items-center justify-center mx-auto mb-6">
                  <Navigation className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-brown mb-4">Public Transport</h3>
                <div className="space-y-3 text-left">
                  {location.accessibility.publicTransport.metro.length > 0 && (
                    <div className="bg-accent-cream/40 p-3 rounded-lg">
                      <p className="text-sm font-medium text-text-brown/70 mb-1">Metro Route</p>
                      <p className="text-sm text-text-brown">{location.accessibility.publicTransport.metro[0]}</p>
                    </div>
                  )}
                  {location.accessibility.publicTransport.bus.length > 0 && (
                    <div className="bg-accent-cream/40 p-3 rounded-lg">
                      <p className="text-sm font-medium text-text-brown/70 mb-1">Bus Routes</p>
                      <div className="flex flex-wrap gap-1">
                        {location.accessibility.publicTransport.bus.map((bus, index) => (
                          <span key={index} className="text-xs bg-[#387F29] px-2 py-1 rounded">
                            {bus}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="bg-accent-cream/40 p-3 rounded-lg">
                    <p className="text-sm font-medium text-text-brown/70 mb-1">Auto-Rickshaw</p>
                    <p className="text-sm text-text-brown">{dynamicRouteInfo.autoRickshawRange}</p>
                  </div>
                  <div className="bg-accent-cream/40 p-3 rounded-lg">
                    <p className="text-sm font-medium text-text-brown/70 mb-1">Cab Services</p>
                    <p className="text-sm text-text-brown">{dynamicRouteInfo.cabServices}</p>
                  </div>
                </div>
              </motion.div>

              {/* Best Times Option */}
              <motion.div 
                className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-warm border border-primary-green/10 text-center"
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-green/20 to-primary-green/30 flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-brown mb-4">Optimal Visit Times</h3>
                <div className="space-y-3">
                  {location.accessibility.bestVisitingHours.map((time, index) => (
                    <div key={index} className="bg-gradient-to-r from-primary-green/10 to-accent-cream/30 p-3 rounded-lg">
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="h-4 w-4 text-white" />
                        <span className="text-sm font-medium text-text-brown">{time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-primary-green/10 rounded-lg">
                  <p className="text-xs text-text-brown/80">Less traffic & shorter wait times</p>
                </div>
              </motion.div>
            </div>

            {/* Landmarks Section */}
            {location.accessibility.landmarks.length > 0 && (
              <motion.div 
                className="bg-gradient-to-r from-white/90 to-accent-cream/40 backdrop-blur-sm p-8 rounded-2xl shadow-warm border border-primary-green/10"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isAccessibilityInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#387F29] flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-brown">Distance from SCT Trust Hospital</h3>
                  <p className="text-text-brown/70 mt-2">Distances from our hospital to familiar {location.displayName} landmarks</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {location.accessibility.landmarks.map((landmark, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl text-center shadow-sm border border-primary-green/5 hover:border-primary-green/20 transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary-green"></div>
                        <span className="text-sm font-medium text-text-brown">{landmark}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Interactive Google Maps Embed */}
            <div className="mt-12">
              <motion.div 
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-warm border border-primary-green/10 overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isAccessibilityInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <div className="p-6" style={{background: '#3A7E2A'}}>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <Navigation className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Route from {location.displayName} to SCT Trust Hospital
                    </h3>
                    <p className="text-white/80">
                      Interactive map showing the best route • Distance: {dynamicRouteInfo.distance} • Time: {dynamicRouteInfo.offPeakTravelTime}
                    </p>
                  </div>
                </div>
                
                {/* Google Maps Embed - API Free */}
                <div className="relative">
                  <iframe
                    src={getLocationDirectionsEmbedURL(location)}
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                    title={`Directions from ${location.displayName} to SCT Trust Hospital`}
                  ></iframe>
                  
                  {/* Map Overlay Controls */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-xs text-white hover:bg-primary-green/10"
                        asChild
                      >
                        <a 
                          href={generateDirectionsURLWithMode(location, 'driving')} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Navigation className="mr-1 h-3 w-3" />
                          Open in Maps
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Quick Direction Summary */}
                <div className="p-6" style={{background: '#3A7E2A'}}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Car className="h-5 w-5 text-white" />
                      <div>
                        <p className="text-sm font-medium text-white">Distance</p>
                        <p className="text-xs text-white/80">{dynamicRouteInfo.distance}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="h-5 w-5 text-white" />
                      <div>
                        <p className="text-sm font-medium text-white">Travel Time</p>
                        <p className="text-xs text-white/80">{dynamicRouteInfo.offPeakTravelTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Navigation className="h-5 w-5 text-white" />
                      <div>
                        <p className="text-sm font-medium text-white">Primary Route</p>
                        <p className="text-xs text-white/80">Via {location.accessibility.drivingRoutes.primary.split(' → ')[0]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Insurance & Costs Section */}
      <section 
        ref={costsRef}
        className="py-16 bg-accent-cream/30"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isCostsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold mb-6 green-title-text text-center">
              Insurance & PM-JAY
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-warm">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-white" />
                  <h3 className="text-lg font-bold text-text-brown">Insurance Accepted</h3>
                </div>
                <div className="space-y-2">
                  {location.insuranceAndCosts.popularInsurance.map((insurance, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-white" />
                      <span className="text-text-brown">{insurance}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-warm">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="h-6 w-6 text-white" />
                  <h3 className="text-lg font-bold text-text-brown">Payment Options</h3>
                </div>
                <div className="space-y-2">
                  {location.insuranceAndCosts.paymentOptions.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-white" />
                      <span className="text-text-brown">{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demographics & Medical Needs Section */}
      <section 
        ref={demographicsRef}
        className="py-16 bg-gradient-to-br from-accent-cream/20 via-white to-primary-green/5"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isDemographicsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 green-title-text">
                Understanding {location.displayName} Healthcare Needs
              </h2>
              <p className="text-lg text-text-brown/80 max-w-3xl mx-auto">
                Tailored gynecological care that addresses the unique health patterns and lifestyle factors 
                of {location.displayName} residents, ensuring personalized treatment approaches. <Link href="/about" className="text-primary-green hover:text-primary-green/80 underline">Dr. Amita Shukla's expertise</Link> in women's healthcare allows for customized treatment plans that suit each patient's individual needs.
              </p>
            </div>
            
            {/* Main Demographics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Demographics Card */}
              <motion.div 
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-warm border border-primary-green/10"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#387F29] flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-text-brown">Community Profile</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-accent-cream/30 rounded-lg">
                    <span className="text-sm font-medium text-text-brown/70">Population</span>
                    <span className="text-sm font-bold text-text-brown">{location.demographics.population}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-accent-cream/30 rounded-lg">
                    <span className="text-sm font-medium text-text-brown/70">Age Group</span>
                    <span className="text-sm font-bold text-text-brown">{location.demographics.averageAge}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-accent-cream/30 rounded-lg">
                    <span className="text-sm font-medium text-text-brown/70">Profile</span>
                    <span className="text-sm font-bold text-text-brown capitalize">
                      {location.demographics.economicProfile.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Health Concerns Card */}
              <motion.div 
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-warm border border-primary-green/10"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#387F29] flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-text-brown">Health Focus Areas</h3>
                </div>
                <div className="space-y-3">
                  {location.healthProfile.commonConcerns.slice(0, 4).map((concern, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-accent-cream/20 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                      <span className="text-sm text-text-brown leading-relaxed">{concern}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Healthcare Approach Card */}
              <motion.div 
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-warm border border-primary-green/10"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#387F29] flex items-center justify-center mx-auto mb-4">
                    <Stethoscope className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-text-brown">Care Approach</h3>
                </div>
                <div className="space-y-3">
                  {location.demographics.healthcareExpectations.map((expectation, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-primary-green/5 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                      <span className="text-sm text-text-brown leading-relaxed">{expectation}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Lifestyle Factors Section */}
            <motion.div 
              className="bg-gradient-to-r from-primary-green/10 to-accent-cream/30 p-8 rounded-2xl shadow-warm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isDemographicsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-text-brown mb-3">
                  Lifestyle-Informed Healthcare
                </h3>
                <p className="text-text-brown/70">
                  Understanding how {location.displayName}'s unique lifestyle patterns influence women's health needs and providing targeted solutions through specialized services like <Link href="/services/pcos-pcod-treatment" className="text-primary-green hover:text-primary-green/80 underline">PCOS management</Link> and <Link href="/services/infertility-treatment" className="text-primary-green hover:text-primary-green/80 underline">fertility care</Link>.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                <div className="flex flex-col h-full pl-8">
                  <h4 className="text-lg font-semibold text-text-brown mb-4 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-white" />
                    Lifestyle Considerations
                  </h4>
                  <div className="space-y-2 flex-1">
                    {location.healthProfile.lifestyleFactors.map((factor, index) => (
                      <div key={index} className="flex items-start gap-3 text-sm text-text-brown/80">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary-green mt-2 flex-shrink-0"></div>
                        <span>{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col h-full pr-4">
                  <h4 className="text-lg font-semibold text-text-brown mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-white" />
                    Our Healthcare Response
                  </h4>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-start gap-3 text-sm text-text-brown/80">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary-green mt-2 flex-shrink-0"></div>
                      <span>Flexible scheduling to accommodate work patterns</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-text-brown/80">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary-green mt-2 flex-shrink-0"></div>
                      <span>Stress-related health condition management</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-text-brown/80">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary-green mt-2 flex-shrink-0"></div>
                      <span>Preventive care programs for busy lifestyles</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-text-brown/80">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary-green mt-2 flex-shrink-0"></div>
                      <span>Comprehensive health monitoring and follow-up</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Appointment CTA Section */}
      <section className="py-16 bg-primary-green/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 green-title-text">
              Book Your Appointment Today
            </h2>
            <p className="text-lg text-text-brown/80 mb-8 max-w-2xl mx-auto">
              Experience personalized gynecological care with convenient access from {location.displayName}. 
              <Link href="/about" className="text-primary-green hover:text-primary-green/80 underline">Dr. Amita Shukla</Link> is committed to your health and well-being, offering comprehensive services from <Link href="/services/infertility-treatment" className="text-primary-green hover:text-primary-green/80 underline">fertility treatments</Link> to <Link href="/services/high-risk-pregnancy" className="text-primary-green hover:text-primary-green/80 underline">high-risk pregnancy care</Link>.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="ghost" className="btn-green">
                <Link href="/contact">Book Appointment</Link>
              </Button>
              <Button asChild variant="outline" className="btn-outline">
                <a href="tel:+918303222222">
                  <Phone className="mr-2 h-4 w-4" /> Call: +91-8303222222
                </a>
              </Button>
            </div>
            <p className="text-sm text-text-brown/70 mt-4">
              Serving {location.displayName} and surrounding areas with excellence since 2013. We also provide specialized care for residents of nearby areas including 
              <Link href="/gynecologist-in/gomti-nagar" className="text-primary-green hover:text-primary-green/80 underline">Gomti Nagar</Link>, 
              <Link href="/gynecologist-in/hazratganj" className="text-primary-green hover:text-primary-green/80 underline">Hazratganj</Link>, and 
              <Link href="/gynecologist-in/aliganj" className="text-primary-green hover:text-primary-green/80 underline">Aliganj</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}