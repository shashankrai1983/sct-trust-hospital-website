"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ServiceProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  imageUrl: string;
}

interface ServiceCardProps {
  service: ServiceProps;
  index: number;
  inView: boolean;
}

const ServiceCard = ({ service, index, inView }: ServiceCardProps) => {
  return (
    <motion.div
      className="service-card p-6 md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ y: -5 }}
    >
      <motion.div 
        className="relative w-full h-48 rounded-lg overflow-hidden mb-6"
        whileHover="hover"
      >
        <motion.div
          className="absolute inset-0 bg-primary-green/10 z-10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-3 rounded-full bg-white/80 backdrop-blur-sm">
            {service.icon}
          </div>
        </motion.div>
        <motion.div
          className="w-full h-full"
          variants={{
            hover: {
              scale: 1.05,
              transition: { duration: 0.5 }
            }
          }}
        >
          <Image
            src={service.imageUrl}
            alt={service.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={index < 3}
          />
        </motion.div>
      </motion.div>
      <motion.h3 
        className="text-xl font-bold mb-3 text-text-brown"
        initial={{ opacity: 0.8 }}
        whileHover={{ 
          opacity: 1,
          color: "#606c38",
          transition: { duration: 0.2 }
        }}
      >
        {service.title}
      </motion.h3>
      <p className="text-text-brown/80 mb-6">{service.description}</p>
      <motion.div
        initial={{ x: 0 }}
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Link 
          href={service.href}
          className="inline-flex items-center text-text-brown hover:text-primary-green transition-colors font-medium"
        >
          Learn More <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ServiceCard;