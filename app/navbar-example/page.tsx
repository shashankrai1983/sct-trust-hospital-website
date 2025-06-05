"use client"

import { NavBarDemo } from "@/components/ui/tubelight-navbar-demo"
import { NavBar } from "@/components/ui/tubelight-navbar"
import { Home, User, MessageSquare, Calendar, Heart } from "lucide-react"

export default function NavbarExamplePage() {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'About', url: '/about', icon: User },
    { name: 'Blog', url: '/blog', icon: MessageSquare },
    { name: 'Contact', url: '/contact', icon: Calendar },
    { name: 'Services', url: '/services', icon: Heart }
  ]

  return (
    <div className="pt-24 pb-32 min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-accent-cream/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 green-title-text">
              Tubelight Navbar Example
            </h1>
            <p className="text-lg text-text-brown/80 mb-6">
              A beautiful navigation component with a tubelight effect
            </p>
          </div>
        </div>
      </section>

      {/* Demo Sections */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6 green-title-text">Default Demo</h2>
              <div className="border border-gray-200 rounded-xl p-8 relative h-64 flex items-center justify-center">
                <NavBarDemo />
                <p className="text-text-brown/60 text-center">
                  Generic navigation with Home, About, Projects and Resume
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6 green-title-text">Site Navigation Demo</h2>
              <div className="border border-gray-200 rounded-xl p-8 relative h-64 flex items-center justify-center">
                <NavBar items={navItems} />
                <p className="text-text-brown/60 text-center">
                  Navigation with actual site links
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section className="py-16 bg-accent-cream/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 green-title-text">Usage Instructions</h2>
            
            <div className="bg-white rounded-xl p-8 shadow-warm">
              <h3 className="text-xl font-bold mb-4 text-text-brown">Component Features</h3>
              <ul className="list-disc pl-6 space-y-2 mb-8 text-text-brown/80">
                <li>Modern tubelight effect with motion animations</li>
                <li>Fully responsive with mobile and desktop layouts</li>
                <li>Uses Lucide icons for both mobile and desktop views</li>
                <li>Customizable through props and Tailwind classes</li>
              </ul>

              <h3 className="text-xl font-bold mb-4 text-text-brown">Implementation</h3>
              <div className="bg-gray-100 p-4 rounded-md mb-8 overflow-x-auto">
                <pre className="text-sm">
                  {`// Import the component
import { NavBar } from "@/components/ui/tubelight-navbar"
import { Home, User, Mail, Settings } from "lucide-react"

// Define navigation items
const navItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'About', url: '/about', icon: User },
  { name: 'Contact', url: '/contact', icon: Mail },
  { name: 'Settings', url: '/settings', icon: Settings }
]

// Use in your layout or page
<NavBar items={navItems} />`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}