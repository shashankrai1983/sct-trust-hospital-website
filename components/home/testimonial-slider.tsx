"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Salman Shakeel',
    content: 'Doctor is very experienced and has a good behaviour and she is very good in consoling the patient and explaining and I&apos;m happy with all the services. And the staff is very good and their behaviour with the patient and attendant is very polite.',
    title: 'Google Review'
  },
  {
    id: 2,
    name: 'Manvendra Pratap',
    content: 'Honestly, I was surprised at how nice the hospital room was. Super clean, well-ventilated, and those big fancy windows made the whole place feel fresh and open. At Sct trust hospital, I had great vibes and really made the stay a lot more pleasant. Thanks to Dr. Amita Shukla ma&apos;am for such facility.',
    title: 'Google Review'
  },
  {
    id: 3,
    name: 'Lal Govind',
    content: 'Hospital balcony at SCT trust hospital offers fresh air, sunlight, and peace making you feel human, not just a patient. It truly supports emotional well-being and accelerates healing. Thanks to Dr. Amita Shukla for such infrastructure in hospital.',
    title: 'Google Review'
  }
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setCurrent((current + 1) % testimonials.length);
  }, [current]);
  
  const prevTestimonial = () => {
    setDirection(-1);
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };
  
  // Auto-advance testimonials
  useEffect(() => {
    const timer = setTimeout(() => {
      nextTestimonial();
    }, 7000);
    
    return () => clearTimeout(timer);
  }, [nextTestimonial]);
  
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };
  
  const testimonial = testimonials[current];
  
  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-primary-beige opacity-20">
        <Quote size={100} />
      </div>
      
      <div className="relative bg-white rounded-2xl shadow-warm p-8 md:p-12 overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={testimonial.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-center"
          >
            <p className="text-lg md:text-xl text-text-brown/90 mb-8 relative z-10">
              &quot;{testimonial.content}&quot;
            </p>
            <div>
              <p className="font-bold text-secondary-brown text-lg">{testimonial.name}</p>
              <p className="text-primary-beige">{testimonial.title}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                i === current ? 'bg-secondary-brown w-4' : 'bg-primary-beige/50'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
      
      <button
        onClick={prevTestimonial}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-warm text-secondary-brown hover:text-primary-beige transition-colors"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextTestimonial}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-3 shadow-warm text-secondary-brown hover:text-primary-beige transition-colors"
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

export default TestimonialSlider;