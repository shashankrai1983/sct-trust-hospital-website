"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    content: 'Dr. Amita is amazing! Her expertise and compassionate care helped me through a complicated pregnancy. She was always available to answer my questions and provide reassurance.',
    title: 'Mother of twins'
  },
  {
    id: 2,
    name: 'Neha Gupta',
    content: 'After struggling with PCOS for years, Dr. Amita\'s treatment plan has made a tremendous difference. She takes time to explain everything and really listens to her patients.',
    title: 'PCOS Patient'
  },
  {
    id: 3,
    name: 'Anjali Patel',
    content: 'Dr. Amita\'s laparoscopic surgery skills are exceptional. I had minimal discomfort and recovered quickly. Her follow-up care was thorough and personalized.',
    title: 'Laparoscopy Patient'
  },
  {
    id: 4,
    name: 'Ritu Agarwal',
    content: 'After years of struggling with infertility, Dr. Amita\'s expertise and care helped us welcome our beautiful baby girl. We\'re forever grateful for her support throughout our journey.',
    title: 'Infertility Patient'
  }
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const nextTestimonial = () => {
    setDirection(1);
    setCurrent((current + 1) % testimonials.length);
  };
  
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
  }, [current]);
  
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
              "{testimonial.content}"
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