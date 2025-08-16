'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HomeIcon, PhoneIcon, CalendarIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { animate as anime, svg, utils } from 'animejs'

export default function NotFound() {
  const svgRef = useRef<SVGSVGElement>(null)
  const doctorRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const pillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // Initialize animations after component mounts
    const initAnimations = () => {
      // Check if animations should be disabled
      if (prefersReducedMotion) {
        // Show static version for accessibility
        return
      }

      try {
        // Heartbeat pulse animation
        const heartbeatPath = svg.createMotionPath('#heartbeat-path')
        anime({
          targets: '.heartbeat-dot',
          translateX: heartbeatPath.translateX,
          translateY: heartbeatPath.translateY,
          duration: 3000,
          loop: true,
          easing: 'linear'
        })

        // Doctor walking animation
        const doctorPath = svg.createMotionPath('#doctor-walk-path')
        anime({
          targets: '.doctor-character',
          translateX: doctorPath.translateX,
          translateY: doctorPath.translateY,
          duration: 8000,
          loop: true,
          easing: 'easeInOutSine'
        })

        // Stethoscope following path (mobile-optimized)
        const stethoscopePath = svg.createMotionPath('#stethoscope-path')
        anime({
          targets: '.stethoscope',
          translateX: stethoscopePath.translateX,
          translateY: stethoscopePath.translateY,
          rotate: stethoscopePath.rotate,
          duration: window.innerWidth < 768 ? 6000 : 4000, // Slower on mobile
          loop: true,
          easing: 'easeInOutQuad'
        })

        // Medical charts floating
        const chartPath = svg.createMotionPath('#chart-path')
        anime({
          targets: '.medical-chart',
          translateX: chartPath.translateX,
          translateY: chartPath.translateY,
          duration: 6000,
          loop: true,
          delay: (target, index) => index * 1000,
          easing: 'easeInOutSine'
        })

        // Prescription pen writing
        const signaturePath = svg.createMotionPath('#signature-path')
        anime({
          targets: '.prescription-pen',
          translateX: signaturePath.translateX,
          translateY: signaturePath.translateY,
          rotate: signaturePath.rotate,
          duration: 5000,
          delay: 2000,
          loop: true,
          easing: 'easeInOutSine'
        })

        // Pills floating animation (reduced on mobile)
        anime({
          targets: '.floating-pill',
          translateY: () => utils.random(-20, 20),
          translateX: () => utils.random(-10, 10),
          rotateZ: () => utils.random(-180, 180),
          duration: () => utils.random(3000, 5000),
          loop: window.innerWidth >= 768, // Only loop on desktop
          direction: 'alternate',
          delay: (target, index) => index * 500,
          easing: 'easeInOutSine'
        })

        // 404 numbers entrance animation
        anime({
          targets: '.error-number',
          translateY: [-50, 0],
          opacity: [0, 1],
          scale: [0.5, 1],
          duration: 1000,
          delay: (target, index) => index * 300,
          easing: 'easeOutElastic(1, .6)'
        })

        // Medical bag opening animation
        anime({
          targets: '.medical-bag',
          scaleY: [0, 1],
          duration: 1500,
          delay: 1000,
          easing: 'easeOutBounce'
        })

        // Auto-pause animations after 30 seconds to save battery
        setTimeout(() => {
          utils.remove('.heartbeat-dot, .doctor-character, .stethoscope, .floating-pill')
        }, 30000)

      } catch (error) {
        console.log('Animation initialization failed:', error)
        // Fallback: show content without animations
      }
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initAnimations, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-cream via-white to-green-50 relative overflow-hidden">
      {/* Background SVG with motion paths */}
      <svg 
        ref={svgRef}
        className="absolute inset-0 w-full h-full z-0" 
        viewBox="0 0 1200 800" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Motion Paths */}
          <path id="heartbeat-path" d="M50,400 Q150,350 250,400 Q350,450 450,400 Q550,350 650,400 Q750,450 850,400 Q950,350 1050,400" />
          <path id="doctor-walk-path" d="M-100,600 Q300,580 600,600 Q900,620 1300,600" />
          <path id="stethoscope-path" d="M200,200 Q300,150 400,200 Q500,250 600,200 Q700,150 800,200" />
          <path id="chart-path" d="M100,100 Q300,50 500,100 Q700,150 900,100 Q1100,50 1200,100" />
          <path id="signature-path" d="M700,500 Q750,480 800,500 Q850,520 900,500 Q950,480 1000,500" />
          
          {/* Gradients */}
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
          
          <linearGradient id="pillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
        </defs>

        {/* Heartbeat line */}
        <path 
          d="M0,400 Q100,350 200,400 T400,400 T600,400 T800,400 T1000,400 T1200,400" 
          stroke="#ef4444" 
          strokeWidth="3" 
          fill="none"
          opacity="0.3"
        />
        
        {/* Moving heartbeat dot */}
        <circle className="heartbeat-dot" r="6" fill="url(#heartGradient)" />
        
        {/* Hospital building silhouette */}
        <rect x="900" y="200" width="200" height="300" fill="#22c55e" opacity="0.1" />
        <rect x="920" y="220" width="20" height="20" fill="#22c55e" opacity="0.2" />
        <rect x="950" y="220" width="20" height="20" fill="#22c55e" opacity="0.2" />
        <rect x="980" y="220" width="20" height="20" fill="#22c55e" opacity="0.2" />
        
        {/* Medical cross */}
        <g transform="translate(980, 150)">
          <rect x="-3" y="-15" width="6" height="30" fill="#ef4444" opacity="0.3" />
          <rect x="-15" y="-3" width="30" height="6" fill="#ef4444" opacity="0.3" />
        </g>
      </svg>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 py-8">
        <div className="max-w-4xl mx-auto w-full">
          {/* Animated doctor character */}
          <div className="doctor-character absolute top-20 left-0 w-16 h-16 opacity-60">
            <div className="w-full h-full rounded-full bg-primary-green flex items-center justify-center">
              <span className="text-white text-xl">👩‍⚕️</span>
            </div>
          </div>

          {/* Floating medical elements */}
          <div className="floating-pill absolute top-32 right-20 w-8 h-4 bg-blue-500 rounded-full opacity-40"></div>
          <div className="floating-pill absolute top-40 right-40 w-6 h-6 bg-green-500 rounded-full opacity-40"></div>
          <div className="floating-pill absolute top-60 right-60 w-10 h-5 bg-red-500 rounded-full opacity-40"></div>
          
          {/* Stethoscope */}
          <div className="stethoscope absolute top-10 left-40 w-8 h-8 opacity-30">
            <div className="w-full h-full rounded-full bg-gray-600"></div>
          </div>

          {/* Medical charts */}
          <div className="medical-chart absolute top-16 left-20 w-6 h-8 bg-white border border-gray-300 opacity-50"></div>
          <div className="medical-chart absolute top-24 left-60 w-6 h-8 bg-white border border-gray-300 opacity-50"></div>

          {/* Main 404 Section */}
          <div className="text-center mb-8 mt-16">
            <div className="mb-12">
              <div className="flex justify-center items-center space-x-2 md:space-x-4 mb-8 mt-8">
                <span className="error-number text-6xl md:text-8xl lg:text-9xl font-bold text-primary-green leading-none">4</span>
                <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg md:text-2xl lg:text-3xl">❤️</span>
                </div>
                <span className="error-number text-6xl md:text-8xl lg:text-9xl font-bold text-primary-green leading-none">4</span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Page Under Treatment</h1>
              <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                The page you're looking for seems to have wandered into the wrong ward. Let Dr. Amita help you find the right treatment.
              </p>
            </div>

            {/* Content Cards Container */}
            <div className="space-y-6">
              {/* Medical Chart Diagnosis */}
              <Card className="text-left max-w-2xl mx-auto shadow-lg">
                <CardHeader>
                  <CardTitle className="text-primary-green flex items-center">
                    <span className="mr-2">📋</span>
                    Medical Chart - Patient: Lost Visitor
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div><strong>Chief Complaint:</strong> "Cannot find desired page"</div>
                  <div><strong>Diagnosis:</strong> HTTP 404 - Page Not Found Syndrome</div>
                  <div><strong>Vital Signs:</strong> Navigation: Confused, Patience: Declining</div>
                  <div><strong>Treatment Plan:</strong></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    <Link href="/" className="block">
                      <Button variant="outline" className="w-full justify-start hover:bg-green-50 h-12">
                        <HomeIcon className="w-4 h-4 mr-2" />
                        🏥 Emergency Homepage
                      </Button>
                    </Link>
                    
                    <Link href="/contact" className="block">
                      <Button variant="outline" className="w-full justify-start hover:bg-green-50 h-12">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        📅 Book Appointment
                      </Button>
                    </Link>

                    <Link href="/services" className="block">
                      <Button variant="outline" className="w-full justify-start hover:bg-green-50 h-12">
                        <span className="w-4 h-4 mr-2">🩺</span>
                        Medical Services
                      </Button>
                    </Link>

                    <Link href="/about" className="block">
                      <Button variant="outline" className="w-full justify-start hover:bg-green-50 h-12">
                        <span className="w-4 h-4 mr-2">👩‍⚕️</span>
                        About Dr. Amita
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Prescription */}
              <Card className="text-left max-w-lg mx-auto border-2 border-green-200 shadow-lg">
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-primary-green text-center">
                    ℞ PRESCRIPTION
                  </CardTitle>
                  <CardDescription className="text-center">
                    Dr. Amita Shukla, MD - SCT Trust Hospital
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4 relative">
                  <div className="space-y-2 text-sm">
                    <div><strong>For:</strong> Confused Web Visitor</div>
                    <div><strong>Date:</strong> {new Date().toLocaleDateString()}</div>
                    <div className="pt-2"><strong>Take one of the following as needed:</strong></div>
                    <div>□ 1x Homepage (immediate relief)</div>
                    <div>□ 1x Services (comprehensive care)</div>
                    <div>□ 1x Contact (direct consultation)</div>
                    <div className="pt-2"><strong>Instructions:</strong> Click any remedy above</div>
                    <div><strong>Refills:</strong> Unlimited</div>
                  </div>
                  
                  {/* Animated prescription pen */}
                  <div className="prescription-pen absolute bottom-4 right-4 w-1 h-6 bg-blue-600 opacity-60"></div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="bg-red-50 border-red-200 max-w-md mx-auto shadow-lg">
                <CardContent className="p-6 text-center">
                  <h3 className="text-red-600 font-semibold mb-3 flex items-center justify-center">
                    🚨 Emergency Medical Contact
                  </h3>
                  <a 
                    href="tel:+918303222222" 
                    className="inline-flex items-center text-red-600 font-bold text-xl hover:underline"
                  >
                    <PhoneIcon className="w-5 h-5 mr-2" />
                    +91-8303222222
                  </a>
                  <p className="text-sm text-red-500 mt-2">For urgent medical assistance</p>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 space-y-4 text-center">
              {/* Medical bag with navigation */}
              <div className="medical-bag">
                <Button asChild size="lg" className="bg-primary-green hover:bg-primary-green/90 h-12">
                  <Link href="/">
                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                    Return to Health Center
                  </Link>
                </Button>
              </div>
              
              <div className="text-sm text-gray-500 pt-4">
                <p>For website issues, contact us at:</p>
                <a 
                  href="mailto:amitaobg@gmail.com" 
                  className="text-primary-green hover:underline"
                >
                  amitaobg@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}