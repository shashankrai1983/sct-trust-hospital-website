"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { 
  Award, 
  GraduationCap, 
  Book, 
  Calendar, 
  CheckCheck, 
  ArrowRight,
  Stethoscope 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function About() {
  const certificationRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  
  const isCertificationInView = useInView(certificationRef, { once: true });
  const isExperienceInView = useInView(experienceRef, { once: true });
  const isEducationInView = useInView(educationRef, { once: true });
  const isTeamInView = useInView(teamRef, { once: true });

  const specializations = [
    "High-Risk Pregnancy Management",
    "Infertility Evaluation and Treatment",
    "PCOS/PCOD Treatment",
    "Laparoscopic Surgery",
    "Hysteroscopy",
    "Antenatal Care",
    "Menstrual Disorders",
    "Aesthetic Gynecology"
  ];

  const timeline = [
    {
      year: "2013 - Present",
      title: "Senior Consultant Gynecologist",
      location: "SCT Trust Hospital, Lucknow",
      description: "Providing comprehensive obstetric and gynecological care including high-risk pregnancy management, infertility treatments, and minimally invasive surgeries."
    },
    {
      year: "2010 - 2013",
      title: "Consultant Gynecologist",
      location: "City Hospital, Lucknow",
      description: "Managed gynecological and obstetric cases including normal and operative deliveries, gynecological surgeries, and family planning services."
    },
    {
      year: "2008 - 2010",
      title: "Resident Doctor",
      location: "Medical College Hospital, Lucknow",
      description: "Handled obstetric emergencies, assisted in gynecological surgeries, and provided patient care under senior supervision."
    }
  ];

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="py-16 bg-accent-cream/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 green-title-text">
              About Dr. Amita Shukla
            </h1>
            <p className="text-lg text-text-brown/80 mb-6">
              Dedicated to providing compassionate and comprehensive care for women at every stage of life.
            </p>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-warm-lg">
                <Image 
                  src="https://i.ibb.co/wNcyfqGS/Amita-Shukla-website-image.png" 
                  alt="Dr. Amita Shukla" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-warm">
                <div className="flex items-center gap-3 p-2">
                  <Award className="h-10 w-10 text-primary-green" />
                  <div>
                    <p className="text-sm text-text-brown/70">Experience</p>
                    <p className="font-bold text-text-brown">10+ Years</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 green-title-text">
                Meet Dr. Amita Shukla
              </h2>
              <p className="text-lg text-text-brown/80 mb-6">
                Dr. Amita Shukla is a distinguished gynecologist and obstetrician with 10+ years of experience in providing exceptional care to women across all age groups. As a Gold Medalist in MBBS and with specialized training in gynecological surgeries, Dr. Amita combines clinical excellence with a compassionate approach.
              </p>
              <p className="text-lg text-text-brown/80 mb-6">
                Her practice at SCT Trust Hospital in Aliganj, Lucknow, focuses on providing personalized care for high-risk pregnancies, infertility issues, PCOS/PCOD management, and advanced laparoscopic procedures. Dr. Amita is known for her patient-centered approach, taking time to understand each patient's unique needs and concerns.
              </p>
              <p className="text-lg text-text-brown/80 mb-8">
                With over 4,000 successful deliveries and 60,000+ consultations, Dr. Amita has established herself as a trusted healthcare provider in Lucknow. She remains committed to continuing education and implementing the latest advancements in gynecological care.
              </p>
              <Button asChild variant="ghost" className="btn-green">
                <Link href="/contact">
                  Book Appointment <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section 
        ref={certificationRef}
        className="py-16 bg-accent-cream/30"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 green-title-text">
              Specializations
            </h2>
            <p className="text-lg text-text-brown/80">
              Dr. Amita specializes in a wide range of gynecological and obstetric services, providing comprehensive care for women of all ages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specializations.map((spec, i) => (
              <motion.div
                key={spec}
                className="bg-white p-6 rounded-xl shadow-warm text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isCertificationInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary-green/20">
                    <CheckCheck className="h-6 w-6 text-text-brown" />
                  </div>
                </div>
                <h3 className="font-bold text-text-brown">{spec}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section 
        ref={educationRef}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 green-title-text">
              Education & Certifications
            </h2>
            <p className="text-lg text-text-brown/80">
              Dr. Amita has pursued excellence in her field through rigorous education and specialized training.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-warm border border-accent-cream/30"
              initial={{ opacity: 0, x: -30 }}
              animate={isEducationInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-primary-green/20">
                  <GraduationCap className="h-10 w-10 text-text-brown" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-4 text-text-brown">MBBS</h3>
              <p className="text-center text-text-brown/80">Gold Medalist, Prestigious Medical College, Lucknow</p>
              <p className="text-center text-primary-green mt-2">2004 - 2009</p>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-xl shadow-warm border border-accent-cream/30"
              initial={{ opacity: 0, y: 30 }}
              animate={isEducationInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-primary-green/20">
                  <Book className="h-10 w-10 text-text-brown" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-4 text-text-brown">MS (OBS & GYNAE)</h3>
              <p className="text-center text-text-brown/80">Medical Sciences University, Lucknow</p>
              <p className="text-center text-primary-green mt-2">2009 - 2012</p>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-xl shadow-warm border border-accent-cream/30"
              initial={{ opacity: 0, x: 30 }}
              animate={isEducationInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-primary-green/20">
                  <Award className="h-10 w-10 text-text-brown" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-4 text-text-brown">Diploma in Aesthetic Gynecology</h3>
              <p className="text-center text-text-brown/80">International Academy of Aesthetic Medicine</p>
              <p className="text-center text-primary-green mt-2">2015</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Professional Experience Timeline */}
      <section 
        ref={experienceRef}
        className="py-16 bg-accent-cream/30"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 green-title-text">
              Professional Experience
            </h2>
            <p className="text-lg text-text-brown/80">
              Dr. Amita's career journey reflects her dedication to women's healthcare.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-primary-green/50 transform md:translate-x-px"></div>

            {/* Timeline Items */}
            {timeline.map((item, i) => (
              <motion.div 
                key={item.year}
                className="relative mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={isExperienceInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <div className={`flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline Marker */}
                  <div className="absolute left-0 md:left-1/2 w-6 h-6 rounded-full bg-primary-green transform -translate-x-1/2 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  </div>

                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-warm">
                      <span className="inline-block py-1 px-3 rounded-full bg-primary-green/20 text-text-brown text-sm font-medium mb-2">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-bold text-text-brown mb-2">{item.title}</h3>
                      <p className="text-primary-green mb-3">{item.location}</p>
                      <p className="text-text-brown/80">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hospital & Team */}
      <section 
        ref={teamRef}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isTeamInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold mb-6 green-title-text">
                Our Hospital
              </h2>
              <p className="text-lg text-text-brown/80 mb-6">
                SCT Trust Hospital in Aliganj, Lucknow is a state-of-the-art medical facility dedicated to providing exceptional healthcare services. Our modern infrastructure is equipped with the latest technology to ensure the highest standard of care for our patients.
              </p>
              <p className="text-lg text-text-brown/80 mb-8">
                The gynecology department, led by Dr. Amita Shukla, offers comprehensive services including prenatal care, delivery, gynecological surgeries, and specialized treatments. Our team of skilled healthcare professionals is committed to patient comfort and well-being.
              </p>
              <Button asChild variant="ghost" className="btn-green">
                <Link href="/contact">
                  Visit Our Hospital <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div 
              className="relative h-[400px]"
              initial={{ opacity: 0, x: 30 }}
              animate={isTeamInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-warm-lg h-full">
                <Image 
                  src="https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="SCT Trust Hospital" 
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Appointment CTA */}
      <section className="py-16 bg-primary-green/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 green-title-text">
              Schedule Your Appointment
            </h2>
            <p className="text-lg text-text-brown/80 mb-8 max-w-2xl mx-auto">
              Take the first step towards personalized care with Dr. Amita Shukla. Book your consultation today.
            </p>
            <Button asChild variant="ghost" className="btn-green">
              <Link href="/contact">Book Appointment</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}