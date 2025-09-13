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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 print-area">
        
        {/* Small Action Buttons - Top right corner */}
        <div className="no-print flex justify-end mb-4">
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-primary-green hover:bg-primary-green/10 rounded-full transition-colors"
              title="Print"
            >
              <Printer className="h-4 w-4" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 text-primary-green hover:bg-primary-green/10 rounded-full transition-colors"
              title="Share"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <Link href="/contact">
              <button
                className="p-2 text-primary-green hover:bg-primary-green/10 rounded-full transition-colors"
                title="Contact Us"
              >
                <Phone className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
        <motion.div
          ref={campRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isCampInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Letterhead Container with Green Border */}
          <div className="letterhead-container relative bg-white rounded-lg shadow-2xl overflow-hidden border-4 md:border-8 border-primary-green p-4 sm:p-6 md:p-12">
            {/* Decorative Corner Elements */}
            <div className="absolute top-0 left-0 w-16 sm:w-24 h-16 sm:h-24 border-t-2 sm:border-t-4 border-l-2 sm:border-l-4 border-primary-green/50 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-16 sm:w-24 h-16 sm:h-24 border-t-2 sm:border-t-4 border-r-2 sm:border-r-4 border-primary-green/50 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 border-b-2 sm:border-b-4 border-l-2 sm:border-l-4 border-primary-green/50 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-16 sm:w-24 h-16 sm:h-24 border-b-2 sm:border-b-4 border-r-2 sm:border-r-4 border-primary-green/50 rounded-br-lg"></div>

            {/* Hospital Header */}
            <div className="text-center mb-6 sm:mb-8">
              {/* Mobile Layout */}
              <div className="flex sm:hidden flex-col items-center mb-4">
                <div className="relative mb-3">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-green/20 to-secondary-brown/20 rounded-full flex items-center justify-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                      <Heart className="h-10 w-10 text-primary-green" />
                    </div>
                  </div>
                  <p className="text-xs font-bold text-primary-green mt-1 text-center">ESTD 2010</p>
                </div>
                <div className="flex justify-between w-full text-xs">
                  <div className="text-left">
                    <p className="text-gray-600 font-medium">Regd No. 13122</p>
                    <p className="text-gray-600">Trust Hospital</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">0522 4102222</p>
                    <p className="text-gray-600">8303222222</p>
                  </div>
                </div>
              </div>
              
              {/* Desktop Layout */}
              <div className="hidden sm:flex justify-between items-start mb-6">
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
              <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-text-brown mb-2 leading-tight">
                <span className="block sm:inline">LATE SHRI S C TRIVEDI MEMORIAL</span>
                <span className="block sm:inline"> MOTHER & CHILD TRUST HOSPITAL</span>
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed px-2 sm:px-0">
                A1/7, Sector-H, Aliganj, (Near Kendriya Bhawan)<br className="sm:hidden" />
                <span className="hidden sm:inline"> </span>Lucknow - 226024 U.P., INDIA
              </p>
            </div>

            {/* Camp Title */}
            <div className="bg-gradient-to-r from-primary-green via-primary-green/90 to-primary-green text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg mb-6 sm:mb-8 shadow-lg">
              <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center tracking-wide leading-tight">
                FREE MEDICAL INVESTIGATION CAMP
              </h2>
            </div>

            {/* Date and Day */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-8 sm:mb-10">
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-base sm:text-xl font-bold text-text-brown">ON DATE:</span>
                <span className="text-lg sm:text-2xl font-bold text-primary-green underline underline-offset-4">
                  19.09.2025
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-base sm:text-xl font-bold text-text-brown">DAY:</span>
                <span className="text-lg sm:text-2xl font-bold text-primary-green underline underline-offset-4">
                  FRIDAY
                </span>
              </div>
            </div>

            {/* Medical Tests List */}
            <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
              {medicalTests.map((test) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isCampInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: test.id * 0.1 }}
                  className="flex items-start gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg hover:bg-primary-green/5 transition-colors"
                >
                  <span className="text-lg sm:text-2xl font-bold text-primary-green flex-shrink-0">
                    {test.id}-
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-xl font-bold text-text-brown">
                      {test.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">{test.description}</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary-green mt-1 flex-shrink-0" />
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-8 sm:mt-12 pt-4 sm:pt-6 border-t-2 border-primary-green/20 gap-4 sm:gap-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-green/20 to-secondary-brown/20 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-primary-green" />
                  </div>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-primary-green">Mother & Child Care</p>
                  <p className="text-xs text-gray-600">Helpline: 0522-4102222</p>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-xs text-gray-600">Healthcare with Compassion</p>
                <p className="text-xs text-gray-600">Excellence Since 2010</p>
              </div>
            </div>
          </div>

          {/* Additional Information - Hidden in print */}
          <div className="no-print mt-8 sm:mt-12 bg-white rounded-lg shadow-lg p-4 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-primary-green mb-4 sm:mb-6 text-center">
              Camp Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary-green mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold text-text-brown text-sm sm:text-base">Date & Time</p>
                    <p className="text-gray-600 text-xs sm:text-sm">September 19, 2025 (Friday)</p>
                    <p className="text-gray-600 text-xs sm:text-sm">9:00 AM - 5:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary-green mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold text-text-brown text-sm sm:text-base">Venue</p>
                    <p className="text-gray-600 text-xs sm:text-sm">SCT Trust Hospital</p>
                    <p className="text-gray-600 text-xs sm:text-sm">A1/7, Sector-H, Aliganj</p>
                    <p className="text-gray-600 text-xs sm:text-sm">Lucknow - 226024</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3">
                  <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-primary-green mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold text-text-brown text-sm sm:text-base">Who Can Attend?</p>
                    <p className="text-gray-600 text-xs sm:text-sm">Open to all age groups</p>
                    <p className="text-gray-600 text-xs sm:text-sm">No prior registration required</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary-green mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold text-text-brown text-sm sm:text-base">Contact</p>
                    <p className="text-gray-600 text-xs sm:text-sm">Phone: 0522 4102222</p>
                    <p className="text-gray-600 text-xs sm:text-sm">Mobile: 8303222222</p>
                    <p className="text-gray-600 text-xs sm:text-sm break-all">Email: trusttrivedi@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-primary-green/10 rounded-lg">
              <p className="text-center text-text-brown font-semibold text-sm sm:text-base">
                All tests are completely FREE of charge
              </p>
              <p className="text-center text-gray-600 mt-2 text-xs sm:text-sm">
                Please bring your previous medical reports if available
              </p>
            </div>

            <div className="mt-6 sm:mt-8 text-center">
              <Link href="/contact">
                <Button size="lg" className="bg-primary-green hover:bg-primary-green/90 text-white text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
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