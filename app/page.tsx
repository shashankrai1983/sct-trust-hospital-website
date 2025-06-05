"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { 
  Heart, 
  Baby, 
  Activity, 
  Microscope, 
  Stethoscope, 
  UserRound, 
  Calendar, 
  Award,
  ArrowRight,
  Phone,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import TestimonialSlider from '@/components/home/testimonial-slider';
import StatCounter from '@/components/home/stat-counter';
import ServiceCard from '@/components/home/service-card';
import HospitalGallery from '@/components/home/hospital-gallery';
import { GridPattern } from '@/components/ui/grid-pattern';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isStatsInView = useInView(statsRef, { once: true });
  const isServicesInView = useInView(servicesRef, { once: true });
  const isAboutInView = useInView(aboutRef, { once: true });
  const isGalleryInView = useInView(galleryRef, { once: true });

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });

  const services = [
    { 
      title: 'High Risk Pregnancy', 
      description: 'Specialized care for mothers with complex or high-risk pregnancies, ensuring the best outcomes.', 
      icon: <Baby className="h-10 w-10 text-secondary-brown" />,
      href: '/services/high-risk-pregnancy',
      imageUrl: 'https://i.ibb.co/ycn9SnhQ/High-Risk-Pregnancy-Care.png'
    },
    { 
      title: 'Infertility Treatment', 
      description: 'Comprehensive evaluation and treatment options for couples struggling with fertility issues.', 
      icon: <Heart className="h-10 w-10 text-secondary-brown" />,
      href: '/services/infertility',
      imageUrl: 'https://i.ibb.co/zT9kR7kq/Infertility-Care.png'
    },
    { 
      title: 'PCOS/PCOD Treatment', 
      description: 'Effective management of polycystic ovary syndrome with personalized treatment plans.', 
      icon: <Activity className="h-10 w-10 text-secondary-brown" />,
      href: '/services/pcos-pcod',
      imageUrl: 'https://i.ibb.co/LXHkZKWc/PCOS-PCOD-care.png'
    },
    { 
      title: 'Advanced Laparoscopy', 
      description: 'Minimally invasive surgical procedures with quicker recovery and less discomfort.', 
      icon: <Microscope className="h-10 w-10 text-secondary-brown" />,
      href: '/services/laparoscopy',
      imageUrl: 'https://i.ibb.co/pvsbFHZk/Advance-Laproscopy.png'
    },
    { 
      title: 'Antenatal Care', 
      description: 'Comprehensive pregnancy care including regular check-ups, screenings, and education.', 
      icon: <Stethoscope className="h-10 w-10 text-secondary-brown" />,
      href: '/services/antenatal-care',
      imageUrl: 'https://i.ibb.co/b5DLnkFt/Antenatal.png'
    },
    { 
      title: 'Well Women Health', 
      description: 'Preventive healthcare services focused on maintaining and improving women\'s health.', 
      icon: <UserRound className="h-10 w-10 text-secondary-brown" />,
      href: '/services/well-women-health',
      imageUrl: 'https://i.ibb.co/Q3HthvMW/women-health.png'
    }
  ];

  const stats = [
    { label: 'Years Experience', value: 15, suffix: '+' },
    { label: 'Successful Deliveries', value: 10000, suffix: '+' },
    { label: 'Consultations', value: 60000, suffix: '+' },
    { label: 'Happy Patients', value: 15000, suffix: '+' }
  ];

  const galleryImages = [
    {
      src: "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Hospital Building",
    },
    {
      src: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Hospital Lobby",
    },
    {
      src: "https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Consultation Room",
    },
    {
      src: "https://images.pexels.com/photos/3376799/pexels-photo-3376799.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Examination Room",
    },
    {
      src: "https://images.pexels.com/photos/163714/hospital-laboratory-analysis-medical-163714.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Hospital Laboratory",
    },
    {
      src: "https://images.pexels.com/photos/1250655/pexels-photo-1250655.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Hospital Waiting Area",
    }
  ];

  // Add the ripple effect to buttons
  useEffect(() => {
    const buttons = document.querySelectorAll('.btn-green');
    
    const createRipple = (event: MouseEvent) => {
      const button = event.currentTarget as HTMLElement;
      
      const circle = document.createElement('span');
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;
      
      const rect = button.getBoundingClientRect();
      
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - rect.left - radius}px`;
      circle.style.top = `${event.clientY - rect.top - radius}px`;
      circle.classList.add('ripple');
      
      // Remove existing ripples
      const ripple = button.getElementsByClassName('ripple')[0];
      if (ripple) {
        ripple.remove();
      }
      
      button.appendChild(circle);
      
      // Add stroke animation class
      button.classList.add('animate-stroke');
      
      // Remove animation class after it completes
      setTimeout(() => {
        button.classList.remove('animate-stroke');
      }, 600);
    };
    
    buttons.forEach(button => {
      button.addEventListener('click', createRipple as any);
    });
    
    return () => {
      buttons.forEach(button => {
        button.removeEventListener('click', createRipple as any);
      });
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen pt-24 pb-16 flex items-center bg-gradient-to-b from-bg-offwhite to-accent-cream/30">
        <div 
          ref={heroRef}
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-primary-green font-medium mb-3 flex items-center">
                <Building2 className="h-5 w-5 mr-2" /> SCT Trust Hospital, Lucknow
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 green-title-text">
                Dr. Amita Shukla
              </h1>
              <div className="typewriter overflow-hidden whitespace-nowrap mb-8 text-xl md:text-2xl text-text-brown font-light">
                Gynecologist & Obstetrician
              </div>
              <p className="text-lg text-text-brown/80 mb-8 max-w-xl">
                With over 10 years of experience, Dr. Amita provides compassionate and comprehensive 
                care for women at every stage of life, specializing in high-risk pregnancies, 
                infertility, and minimally invasive surgeries.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="ghost" className="btn-green">
                  <Link href="/contact">Book Appointment</Link>
                </Button>
                <Button asChild variant="outline" className="btn-outline">
                  <Link href="/about">Dr. Amita's Bio</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              animate={isHeroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Ripple animations - concentric circles */}
                <div className="absolute inset-0 rounded-full bg-primary-green/20 animate-ripple"></div>
                <div className="absolute inset-0 rounded-full bg-primary-green/20 animate-ripple-delay-1"></div>
                <div className="absolute inset-0 rounded-full bg-primary-green/20 animate-ripple-delay-2"></div>
                <div className="absolute inset-0 rounded-full bg-primary-green/20 animate-ripple-delay-3"></div>
                <div className="absolute inset-4 rounded-full bg-primary-green/30 animate-breathe"></div>
                <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-white shadow-warm">
                  <Image 
                    src="https://i.ibb.co/v6M89Byz/doctor-image.jpg" 
                    alt="Dr. Amita Shukla" 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Floating elements */}
              <motion.div 
                className="absolute -top-5 -left-5 p-3 glass-card rounded-lg shadow-warm hidden md:block"
                style={{ y: springY1 }}
                animate={{ rotate: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
              >
                <Heart className="h-8 w-8 text-primary-green" />
              </motion.div>

              <motion.div 
                className="absolute top-1/4 -right-8 p-3 glass-card rounded-lg shadow-warm hidden md:block"
                style={{ y: springY2 }}
                animate={{ rotate: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 6, delay: 1 }}
              >
                <Stethoscope className="h-8 w-8 text-primary-green" />
              </motion.div>

              <motion.div 
                className="absolute -bottom-5 left-1/4 p-3 glass-card rounded-lg shadow-warm hidden md:block"
                style={{ y: springY1 }}
                animate={{ rotate: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 7, delay: 0.5 }}
              >
                <Award className="h-8 w-8 text-primary-green" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Background decorative elements */}
        <motion.div 
          className="absolute top-32 left-10 w-64 h-64 rounded-full bg-primary-green/10 blur-3xl"
          style={{ y: springY2 }}
        />
        <motion.div 
          className="absolute bottom-32 right-10 w-80 h-80 rounded-full bg-text-brown/10 blur-3xl"
          style={{ y: springY1 }}
        />
        
        {/* Grid Pattern background */}
        <GridPattern
          width={60}
          height={60}
          x={-1}
          y={-1}
          strokeDasharray={"0.5 3"}
          className="text-primary-green/10 [mask-image:linear-gradient(to_bottom,transparent,white_50%,white_60%,transparent)]"
        />
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="py-16 bg-white relative"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                className="p-6 rounded-xl shadow-warm bg-white border border-accent-cream/30"
                initial={{ opacity: 0, y: 20 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-green mb-2">
                  <StatCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-text-brown/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Grid Pattern background */}
        <GridPattern
          width={40}
          height={40}
          strokeDasharray={"2 4"}
          className="text-primary-green/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white_70%)]"
        />
      </section>

      {/* Services Section */}
      <section 
        ref={servicesRef}
        className="py-20 bg-accent-cream/30 relative"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 green-title-text"
              initial={{ opacity: 0, y: 20 }}
              animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Our Services
            </motion.h2>
            <motion.p 
              className="text-lg text-text-brown/80"
              initial={{ opacity: 0, y: 20 }}
              animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Comprehensive gynecological and obstetric care for women at every stage of life
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <ServiceCard 
                key={service.title}
                service={service}
                index={i}
                inView={isServicesInView}
              />
            ))}
          </div>
        </div>
        
        {/* Grid Pattern background removed */}
      </section>

      {/* About Section */}
      <section 
        ref={aboutRef}
        className="py-20 bg-white relative"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-warm-lg">
                <Image 
                  src="https://i.ibb.co/wNcyfqGS/Amita-Shukla-website-image.png" 
                  alt="Dr. Amita Shukla in her clinic" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-warm">
                <div className="flex items-center gap-3 p-2">
                  <Award className="h-10 w-10 text-primary-green" />
                  <div>
                    <p className="text-sm text-text-brown/70">Gold Medalist</p>
                    <p className="font-bold text-text-brown">MBBS</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 green-title-text">
                About Dr. Amita Shukla
              </h2>
              <p className="text-lg text-text-brown/80 mb-6">
                Dr. Amita Shukla is a highly qualified and experienced Gynecologist and Obstetrician practicing at SCT Trust Hospital in Lucknow. With over a decade of experience, she has helped thousands of women with various gynecological issues and has successfully delivered over 4,000 babies.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary-green"></div>
                  <p className="text-text-brown">MBBS (Gold Medalist)</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary-green"></div>
                  <p className="text-text-brown">MS (OBS & GYNAE)</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary-green"></div>
                  <p className="text-text-brown">Diploma in Aesthetic Gynecology</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary-green"></div>
                  <p className="text-text-brown">10+ Years of Experience</p>
                </div>
              </div>
              <Button asChild variant="ghost" className="btn-green">
                <Link href="/about" className="inline-flex items-center">
                  Dr. Amita's Bio <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Grid Pattern background */}
        <GridPattern
          width={40}
          height={40}
          strokeDasharray={"1 3"}
          className="text-primary-green/5 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_70%)]"
        />
      </section>

      {/* Hospital Gallery Section - NEW */}
      <section 
        ref={galleryRef}
        className="py-20 bg-accent-cream/30 relative"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <HospitalGallery 
            images={galleryImages}
            title="SCT Trust Hospital Gallery"
            subtitle="Take a virtual tour of our state-of-the-art facilities and modern infrastructure"
            limit={3}
          />
        </div>
        
        {/* Grid Pattern background */}
        <GridPattern
          width={40}
          height={40}
          strokeDasharray={"1 2"}
          className="text-primary-green/5 [mask-image:radial-gradient(ellipse_at_center,transparent_40%,white_80%)]"
        />
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 green-title-text">
              Patient Testimonials
            </h2>
            <p className="text-lg text-text-brown/80">
              Hear what our patients have to say about their experience with Dr. Amita Shukla
            </p>
          </div>

          <TestimonialSlider />
        </div>
        
        {/* Grid Pattern background removed */}
      </section>

      {/* Appointment CTA */}
      <section className="py-20 bg-primary-green/10 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 green-title-text">
              Schedule Your Appointment Today
            </h2>
            <p className="text-lg text-text-brown/80 mb-8 max-w-2xl mx-auto">
              Take the first step towards better health. Schedule a consultation with Dr. Amita Shukla and receive personalized care tailored to your needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="ghost" className="btn-green">
                <Link href="/contact">Book Appointment</Link>
              </Button>
              <Button asChild variant="outline" className="btn-outline">
                <a href="tel:+918303222222">
                  <Phone className="mr-2 h-4 w-4" /> Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Grid Pattern background removed */}
      </section>
    </div>
  );
}