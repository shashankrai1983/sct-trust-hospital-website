"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  Clock,
  Heart,
  Activity,
  CheckCircle2,
  Download,
  Share2,
  Printer
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FreeMedicalCamp() {
  const campRef = useRef<HTMLDivElement>(null);
  const isCampInView = useInView(campRef, { once: true });

  const medicalTests = [
    { id: 1, name: "Thyroid", description: "Complete thyroid function test" },
    { id: 2, name: "Hemoglobin", description: "Blood hemoglobin level assessment" },
    { id: 3, name: "RBS", description: "Random blood sugar test" },
    { id: 4, name: "Protein test", description: "Total protein level evaluation" },
    { id: 5, name: "BMD", description: "Bone mineral density assessment" },
    { id: 6, name: "BMI", description: "Body mass index calculation" },
    { id: 7, name: "Vitamin D", description: "Vitamin D deficiency screening" }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Free Medical Investigation Camp - SCT Trust Hospital',
          text: 'Join us for a Free Medical Investigation Camp on September 19, 2025. Get 7 essential health tests absolutely free!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent-cream via-white to-accent-cream">
      {/* Print-only styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
          .letterhead-container {
            border: 4px solid #606c38 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

      {/* Action Buttons - Hidden in print */}
      <div className="no-print sticky top-20 z-40 bg-white/90 backdrop-blur-sm border-b border-primary-green/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-center gap-4">
            <Button
              onClick={handlePrint}
              variant="outline"
              className="border-primary-green text-primary-green hover:bg-primary-green/10"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              className="border-primary-green text-primary-green hover:bg-primary-green/10"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Link href="/contact">
              <Button className="bg-primary-green hover:bg-primary-green/90 text-white">
                <Phone className="h-4 w-4 mr-2" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 print-area">
        <motion.div
          ref={campRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isCampInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Letterhead Container with Green Border */}
          <div className="letterhead-container relative bg-white rounded-lg shadow-2xl overflow-hidden border-8 border-primary-green p-8 md:p-12">
            {/* Decorative Corner Elements */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-primary-green/50 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-primary-green/50 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-primary-green/50 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-primary-green/50 rounded-br-lg"></div>

            {/* Hospital Header */}
            <div className="text-center mb-8">
              <div className="flex justify-between items-start mb-6">
                <div className="text-left">
                  <p className="text-sm text-gray-600 font-medium">Regd No. 13122</p>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <span className="font-medium">Trust Hospital</span>
                  </p>
                </div>
                <div className="flex justify-center flex-1">
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-primary-green/20 to-secondary-brown/20 rounded-full flex items-center justify-center">
                      <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center">
                        <Heart className="h-12 w-12 text-primary-green" />
                      </div>
                    </div>
                    <p className="text-xs font-bold text-primary-green mt-2 text-center">ESTD 2010</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Phone : 0522 4102222</p>
                  <p className="text-sm text-gray-600">Email : trusttrivedi@gmail.com</p>
                  <p className="text-sm text-gray-600">Mob : 8303222222</p>
                </div>
              </div>

              {/* Hospital Name */}
              <h1 className="text-2xl md:text-3xl font-bold text-text-brown mb-2">
                LATE SHRI S C TRIVEDI MEMORIAL MOTHER & CHILD TRUST HOSPITAL
              </h1>
              <p className="text-gray-600 text-sm">
                A1/7, Sector-H, Aliganj, (Near Kendriya Bhawan) Lucknow - 226024 U.P., INDIA
              </p>
            </div>

            {/* Camp Title */}
            <div className="bg-gradient-to-r from-primary-green via-primary-green/90 to-primary-green text-white py-4 px-6 rounded-lg mb-8 shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold text-center tracking-wide">
                FREE MEDICAL INVESTIGATION CAMP
              </h2>
            </div>

            {/* Date and Day */}
            <div className="flex justify-center gap-8 mb-10">
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-text-brown">ON DATE:</span>
                <span className="text-2xl font-bold text-primary-green underline underline-offset-4">
                  19.09.2025
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-text-brown">DAY:</span>
                <span className="text-2xl font-bold text-primary-green underline underline-offset-4">
                  FRIDAY
                </span>
              </div>
            </div>

            {/* Medical Tests List */}
            <div className="space-y-4 mb-10">
              {medicalTests.map((test) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isCampInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: test.id * 0.1 }}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-primary-green/5 transition-colors"
                >
                  <span className="text-2xl font-bold text-primary-green">
                    {test.id}-
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text-brown">
                      {test.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{test.description}</p>
                  </div>
                  <CheckCircle2 className="h-6 w-6 text-primary-green mt-1" />
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-12 pt-6 border-t-2 border-primary-green/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-green/20 to-secondary-brown/20 rounded-full flex items-center justify-center">
                    <Heart className="h-8 w-8 text-primary-green" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-primary-green">Mother & Child Care</p>
                  <p className="text-xs text-gray-600">Helpline: 0522-4102222</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600">Healthcare with Compassion</p>
                <p className="text-xs text-gray-600">Since 2010</p>
              </div>
            </div>
          </div>

          {/* Additional Information - Hidden in print */}
          <div className="no-print mt-12 bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-primary-green mb-6 text-center">
              Camp Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary-green mt-1" />
                  <div>
                    <p className="font-semibold text-text-brown">Date & Time</p>
                    <p className="text-gray-600">September 19, 2025 (Friday)</p>
                    <p className="text-gray-600">9:00 AM - 5:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary-green mt-1" />
                  <div>
                    <p className="font-semibold text-text-brown">Venue</p>
                    <p className="text-gray-600">SCT Trust Hospital</p>
                    <p className="text-gray-600">A1/7, Sector-H, Aliganj</p>
                    <p className="text-gray-600">Lucknow - 226024</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Activity className="h-5 w-5 text-primary-green mt-1" />
                  <div>
                    <p className="font-semibold text-text-brown">Who Can Attend?</p>
                    <p className="text-gray-600">Open to all age groups</p>
                    <p className="text-gray-600">No prior registration required</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary-green mt-1" />
                  <div>
                    <p className="font-semibold text-text-brown">Contact</p>
                    <p className="text-gray-600">Phone: 0522 4102222</p>
                    <p className="text-gray-600">Mobile: 8303222222</p>
                    <p className="text-gray-600">Email: trusttrivedi@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-primary-green/10 rounded-lg">
              <p className="text-center text-text-brown font-semibold">
                All tests are completely FREE of charge
              </p>
              <p className="text-center text-gray-600 mt-2">
                Please bring your previous medical reports if available
              </p>
            </div>

            <div className="mt-8 text-center">
              <Link href="/contact">
                <Button size="lg" className="bg-primary-green hover:bg-primary-green/90 text-white">
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Us for More Information
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}