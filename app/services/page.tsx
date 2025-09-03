import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllServices } from '@/data/services';
import { sharedData } from '@/data/services/shared-data';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, MapPin, Clock, Award, Heart, Stethoscope } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gynecologist Services in Lucknow | Dr. Amita Shukla',
  description: 'Comprehensive women\'s healthcare services including high-risk pregnancy, infertility treatment, laparoscopy, and more by Dr. Amita Shukla at SCT Trust Hospital Lucknow.',
  keywords: 'gynecologist services lucknow, women healthcare lucknow, pregnancy care, infertility treatment, laparoscopy lucknow',
  openGraph: {
    title: 'Women\'s Healthcare Services | Dr. Amita Shukla',
    description: 'Expert gynecological and obstetric services in Lucknow',
    type: 'website',
    url: 'https://dramitashukla.com/services',
  },
};

export default function ServicesHubPage() {
  const services = getAllServices();

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Background Grid Pattern - matching home page */}
      <svg
        aria-hidden="true"
        className="h-full w-full fill-gray-400/30 stroke-gray-400/30 fixed inset-0 text-primary-green/5 dark:text-primary-green/10 pointer-events-none"
      >
        <defs>
          <pattern
            id="services-grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
            x="-1"
            y="-1"
          >
            <path d="M.5 50V.5H50" fill="none" strokeDasharray="1 1"></path>
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#services-grid)"></rect>
      </svg>

      {/* Hero Section with luxury styling */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-accent-cream to-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-green to-text-brown bg-clip-text text-transparent">
                Our Services
              </span>
            </h1>
            <p className="text-xl text-text-brown/80 mb-8">
              Comprehensive gynecological and obstetric care for women at every stage of life
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="inline-flex items-center rounded-full border border-primary-green/30 px-4 py-2 text-text-brown bg-white/60 backdrop-blur-sm">
                <Award className="w-4 h-4 mr-2 text-primary-green" />
                <span className="text-sm">10+ Years Experience</span>
              </div>
              <div className="inline-flex items-center rounded-full border border-primary-green/30 px-4 py-2 text-text-brown bg-white/60 backdrop-blur-sm">
                <Clock className="w-4 h-4 mr-2 text-primary-green" />
                <span className="text-sm">24/7 Emergency Care</span>
              </div>
              <div className="inline-flex items-center rounded-full border border-primary-green/30 px-4 py-2 text-text-brown bg-white/60 backdrop-blur-sm">
                <MapPin className="w-4 h-4 mr-2 text-primary-green" />
                <span className="text-sm">SCT Trust Hospital, Lucknow</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Services - luxury card styling */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="service-card p-6 md:p-8 group">
                <div className="relative w-full h-48 rounded-lg overflow-hidden mb-6">
                  <div className="absolute inset-0 bg-primary-green/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-text-brown group-hover:text-primary-green transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-text-brown/80 mb-6">
                  {service.description}
                </p>
                <Link 
                  href={service.href}
                  className="inline-flex items-center text-text-brown hover:text-primary-green transition-colors font-medium group-hover:translate-x-1 transform transition-transform duration-200"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Info Section with luxury glass card */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="glass-card p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-primary-green to-text-brown bg-clip-text text-transparent">
                    {sharedData.doctor.name}
                  </span>
                </h3>
                <p className="text-text-brown/70 mb-4">{sharedData.doctor.title}</p>
                <p className="text-text-brown/80 mb-6">{sharedData.doctor.bio}</p>
                <div className="space-y-2">
                  {sharedData.doctor.achievements.slice(0, 3).map((achievement, idx) => (
                    <div key={idx} className="flex items-start">
                      <Heart className="w-4 h-4 text-primary-green mr-2 mt-1 flex-shrink-0" />
                      <span className="text-text-brown/80 text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-accent-cream/50 to-white p-8 rounded-xl">
                <h4 className="font-semibold text-text-brown mb-6">Book Consultation</h4>
                <div className="space-y-4">
                  <div className="flex items-center text-text-brown/80">
                    <Phone className="w-5 h-5 mr-3 text-primary-green" />
                    <span className="text-sm">{sharedData.emergency[0].phone}</span>
                  </div>
                  <div className="flex items-center text-text-brown/80">
                    <MapPin className="w-5 h-5 mr-3 text-primary-green" />
                    <span className="text-sm">{sharedData.hospital.name}</span>
                  </div>
                  <div className="flex items-center text-text-brown/80">
                    <Clock className="w-5 h-5 mr-3 text-primary-green" />
                    <span className="text-sm">Mon-Sat: 9AM-8PM</span>
                  </div>
                </div>
                <Link href="/contact">
                  <Button className="w-full mt-6 btn-green">
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with forest green gradient */}
      <section className="py-16 bg-gradient-to-r from-primary-green to-forest-green text-white relative">
        <div className="container mx-auto px-4 text-center">
          <Stethoscope className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">Need Emergency Care?</h2>
          <p className="text-xl mb-8 opacity-90">
            Our team is available 24/7 for emergency gynecological and obstetric care
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`tel:${sharedData.emergency[0].phone}`}>
              <Button className="bg-white text-primary-green hover:bg-accent-cream px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <Phone className="w-5 h-5 mr-2" />
                Call Emergency
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="bg-transparent text-white border-2 border-white hover:bg-white/10 px-8 py-3 rounded-full font-medium">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}