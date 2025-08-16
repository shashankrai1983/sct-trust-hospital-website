"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, Heart, ChevronDown, Home, User, FileText, Phone, Calculator } from 'lucide-react';

const navLinks = [
  { title: 'Home', href: '/', icon: Home },
  { title: 'About', href: '/about', icon: User },
  { 
    title: 'Services', 
    href: '/services',
    icon: FileText,
    submenu: [
      { title: 'High Risk Pregnancy', href: '/services/high-risk-pregnancy' },
      { title: 'Pregnancy Complications', href: '/services/pregnancy-complications' },
      { title: 'Infertility Treatment', href: '/services/infertility-treatment' },
      { title: 'PCOS/PCOD Treatment', href: '/services/pcos-pcod-treatment' },
      { title: 'Laparoscopy', href: '/services/laparoscopy' },
      { title: 'Antenatal Care', href: '/services/antenatal-care' },
      { title: 'Well Women Health', href: '/services/well-women-health' },
    ]
  },
  { 
    title: 'Women\'s Health Calculator', 
    href: '/calculators',
    icon: Calculator,
    submenu: [
      { title: 'Due Date Calculator', href: '/calculators/due-date-calculator' },
      { title: 'Pregnancy Week Calculator', href: '/calculators/pregnancy-week-calculator' },
      { title: 'Conception Date Calculator', href: '/calculators/conception-date-calculator' },
      { title: 'High-Risk Pregnancy Assessment', href: '/calculators/high-risk-pregnancy-assessment' },
      { title: 'Ovulation Calculator', href: '/calculators/ovulation-calculator' },
      { title: 'Fertile Window Calculator', href: '/calculators/fertile-window-calculator' },
      { title: 'BMI Calculator', href: '/calculators/bmi-calculator' },
      { title: 'Weight Gain Calculator', href: '/calculators/weight-gain-calculator' },
      { title: 'Prenatal Vitamin Calculator', href: '/calculators/prenatal-vitamin-calculator' },
    ]
  },
  { title: 'Blog', href: '/blog', icon: FileText },
  { title: 'Contact', href: '/contact', icon: Phone },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Home');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set active tab based on current path
    const path = window.location.pathname;
    const currentPage = navLinks.find(link => {
      if (path === '/') return link.href === '/';
      return path.includes(link.href) && link.href !== '/';
    });
    
    if (currentPage) {
      setActiveTab(currentPage.title);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleSubmenu = (title: string) => {
    setActiveSubmenu(prev => prev === title ? null : title);
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 navbar-container",
      isScrolled ? "bg-white shadow-warm py-2" : "bg-white/90 backdrop-blur-sm py-4"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div 
              className="flex items-center" 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Heart className="h-7 w-7 text-primary-green mr-2" />
              <div>
                <h1 className="text-lg font-bold text-text-brown">Dr. Amita Shukla</h1>
                <p className="text-xs text-primary-beige -mt-1">Gynecologist & Obstetrician</p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation - Tubelight Style */}
          <div className="hidden md:block">
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeTab === link.title;
                
                return link.submenu ? (
                  <div key={link.title} className="relative" onMouseEnter={() => toggleSubmenu(link.title)} onMouseLeave={() => setActiveSubmenu(null)}>
                    <button 
                      onClick={() => {
                        setActiveTab(link.title);
                        if (isMobile) toggleSubmenu(link.title);
                      }}
                      className={cn(
                        "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors flex items-center",
                        "text-text-brown/80 hover:text-primary-green",
                        isActive && "text-primary-green"
                      )}
                    >
                      {link.title}
                      <ChevronDown className="ml-1 h-4 w-4" />
                      
                      {isActive && (
                        <motion.div
                          layoutId="tube-lamp"
                          className="absolute inset-0 w-full bg-primary-green/5 rounded-full -z-10"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        >
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary-green rounded-t-full">
                            <div className="absolute w-12 h-6 bg-primary-green/20 rounded-full blur-md -top-2 -left-2" />
                            <div className="absolute w-8 h-6 bg-primary-green/20 rounded-full blur-md -top-1" />
                            <div className="absolute w-4 h-4 bg-primary-green/20 rounded-full blur-sm top-0 left-2" />
                          </div>
                        </motion.div>
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {activeSubmenu === link.title && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 w-56 rounded-md shadow-warm bg-white p-2 z-50"
                        >
                          {link.submenu.map((sublink) => (
                            <Link
                              key={sublink.title}
                              href={sublink.href}
                              className="block px-4 py-2 text-sm text-text-brown hover:bg-accent-cream rounded-md transition-colors"
                              onClick={() => setActiveSubmenu(null)}
                            >
                              {sublink.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.title}
                    href={link.href}
                    onClick={() => setActiveTab(link.title)}
                    className={cn(
                      "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                      "text-text-brown/80 hover:text-primary-green",
                      isActive && "text-primary-green"
                    )}
                  >
                    {link.title}
                    
                    {isActive && (
                      <motion.div
                        layoutId="tube-lamp"
                        className="absolute inset-0 w-full bg-primary-green/5 rounded-full -z-10"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary-green rounded-t-full">
                          <div className="absolute w-12 h-6 bg-primary-green/20 rounded-full blur-md -top-2 -left-2" />
                          <div className="absolute w-8 h-6 bg-primary-green/20 rounded-full blur-md -top-1" />
                          <div className="absolute w-4 h-4 bg-primary-green/20 rounded-full blur-sm top-0 left-2" />
                        </div>
                      </motion.div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild variant="ghost" className="btn-green">
              <Link href="/contact">Book Appointment</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text-brown"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <div key={link.title} className="py-1">
                    {link.submenu ? (
                      <>
                        <button 
                          onClick={() => toggleSubmenu(link.title)}
                          className="flex items-center justify-between w-full text-text-brown hover:text-primary-green transition-colors py-2"
                        >
                          {link.title}
                          <ChevronDown className={cn(
                            "h-4 w-4 transition-transform",
                            activeSubmenu === link.title ? "rotate-180" : ""
                          )} />
                        </button>
                        <AnimatePresence>
                          {activeSubmenu === link.title && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4 mt-1 border-l-2 border-accent-cream"
                            >
                              {link.submenu.map((sublink) => (
                                <Link
                                  key={sublink.title}
                                  href={sublink.href}
                                  className="block py-2 text-sm text-text-brown hover:text-primary-green transition-colors"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {sublink.title}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        className="block py-2 text-text-brown hover:text-primary-green transition-colors"
                        onClick={() => {
                          setActiveTab(link.title);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <div className="flex items-center">
                          {link.icon && <link.icon className="mr-2 h-5 w-5" />}
                          {link.title}
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-2">
                  <Button asChild variant="ghost" className="btn-green w-full">
                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                      Book Appointment
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;