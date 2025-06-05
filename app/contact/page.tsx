"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Calendar,
  CheckCircle,
  Stethoscope
} from 'lucide-react';
import ContactForm from '@/components/contact/contact-form';
import AppointmentForm from '@/components/contact/appointment-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Contact() {
  const mapRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  const isMapInView = useInView(mapRef, { once: true });
  const isInfoInView = useInView(infoRef, { once: true });
  const isFormInView = useInView(formRef, { once: true });

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-primary-green" />,
      title: "Address",
      details: "SCT Trust Hospital, A-1/7, Sector-H, Aliganj, Lucknow - 226024"
    },
    {
      icon: <Phone className="h-6 w-6 text-primary-green" />,
      title: "Phone",
      details: "+91 8303222222"
    },
    {
      icon: <Mail className="h-6 w-6 text-primary-green" />,
      title: "Email",
      details: "amitaobg@gmail.com"
    },
    {
      icon: <Clock className="h-6 w-6 text-primary-green" />,
      title: "Hours",
      details: "Open 24 Hours with emergency and NICU facility"
    }
  ];

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="py-16 bg-accent-cream/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 green-title-text">
              Contact & Appointments
            </h1>
            <p className="text-lg text-text-brown/80 mb-6">
              Reach out to us or book an appointment with Dr. Amita Shukla for personalized care
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section 
        ref={infoRef}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, i) => (
              <motion.div 
                key={info.title}
                className="bg-white p-6 rounded-xl shadow-warm text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary-green/20">
                    {info.icon}
                  </div>
                </div>
                <h3 className="font-bold text-text-brown mb-2">{info.title}</h3>
                <p className="text-text-brown/80 whitespace-pre-line">{info.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map and Form Section */}
      <section className="py-16 bg-accent-cream/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map */}
            <motion.div 
              ref={mapRef}
              className="h-[500px] rounded-xl overflow-hidden shadow-warm relative"
              initial={{ opacity: 0, x: -30 }}
              animate={isMapInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.2041290568392!2d80.9404!3d26.8929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd97c4b5ef81%3A0x5c7efd75d47eb1ad!2sSCT%20Trust%20Hospital!5e0!3m2!1sen!2sin!4v1621234567890!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>

            {/* Contact and Appointment Form */}
            <motion.div 
              ref={formRef}
              initial={{ opacity: 0, x: 30 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-white rounded-xl shadow-warm p-8">
                <Tabs defaultValue="appointment">
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="appointment" className="text-base">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Appointment
                    </TabsTrigger>
                    <TabsTrigger value="contact" className="text-base">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Us
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="appointment">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-text-brown mb-2">Book Your Appointment</h2>
                      <p className="text-text-brown/80">Fill out the form below to schedule a consultation with Dr. Amita Shukla</p>
                    </div>
                    <AppointmentForm />
                  </TabsContent>
                  <TabsContent value="contact">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-text-brown mb-2">Get in Touch</h2>
                      <p className="text-text-brown/80">Have questions? Send us a message and we'll get back to you</p>
                    </div>
                    <ContactForm />
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Consultation Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 green-title-text">
              Our Consultation Process
            </h2>
            <p className="text-lg text-text-brown/80">
              What to expect when you visit Dr. Amita Shukla
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white p-6 rounded-xl shadow-warm text-center h-full">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary-green/20">
                    <Calendar className="h-6 w-6 text-text-brown" />
                  </div>
                </div>
                <h3 className="font-bold text-text-brown mb-2">1. Booking</h3>
                <p className="text-text-brown/80">Schedule your appointment online or by phone. Choose a date and time that works for you.</p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <div className="h-0.5 w-8 bg-primary-green"></div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white p-6 rounded-xl shadow-warm text-center h-full">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary-green/20">
                    <CheckCircle className="h-6 w-6 text-text-brown" />
                  </div>
                </div>
                <h3 className="font-bold text-text-brown mb-2">2. Consultation</h3>
                <p className="text-text-brown/80">Meet with Dr. Amita for a thorough evaluation. Discuss your concerns and medical history.</p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <div className="h-0.5 w-8 bg-primary-green"></div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white p-6 rounded-xl shadow-warm text-center h-full">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary-green/20">
                    <Stethoscope className="h-6 w-6 text-text-brown" />
                  </div>
                </div>
                <h3 className="font-bold text-text-brown mb-2">3. Treatment</h3>
                <p className="text-text-brown/80">Receive a personalized treatment plan tailored to your specific needs and concerns.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance and Payment */}
      <section className="py-16 bg-primary-green/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 green-title-text">
              Insurance & Payment
            </h2>
            <p className="text-lg text-text-brown/80 mb-6">
              We accept all major insurance plans and offer flexible payment options to ensure access to quality healthcare.
            </p>
            <p className="text-lg text-text-brown/80 mb-8">
              For questions about insurance coverage or payment options, please contact our office directly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}