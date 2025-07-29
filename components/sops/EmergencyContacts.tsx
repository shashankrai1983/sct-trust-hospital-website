"use client";

import { Phone } from 'lucide-react';

interface EmergencyContact {
  type: 'primary' | 'hospital' | 'specialist' | 'emergency';
  name: string;
  phone: string;
  description: string;
}

interface EmergencyContactsProps {
  contacts: EmergencyContact[];
  className?: string;
  variant?: 'compact' | 'detailed';
}

export default function EmergencyContacts({ 
  contacts, 
  className = '',
  variant = 'detailed'
}: EmergencyContactsProps) {
  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {contacts.map((contact, index) => (
          <a
            key={index}
            href={`tel:${contact.phone}`}
            className="inline-flex items-center gap-2 px-3 py-2 bg-secondary-brown text-white rounded-full hover:bg-secondary-brown/90 transition-all duration-300 text-sm font-semibold"
            aria-label={`Call ${contact.name} at ${contact.phone}`}
          >
            <Phone className="h-3 w-3" />
            {contact.name}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <h4 className="text-sm font-semibold text-text-brown mb-3 flex items-center gap-2">
        <Phone className="h-4 w-4 text-secondary-brown" />
        Emergency Contacts
      </h4>
      <div className="flex flex-wrap gap-4">
        {contacts.map((contact, index) => (
          <a
            key={index}
            href={`tel:${contact.phone}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-brown text-white rounded-full hover:bg-secondary-brown/90 transition-all duration-300 text-sm font-semibold shadow-sm"
            aria-label={`Call ${contact.name} at ${contact.phone} for ${contact.description}`}
          >
            <Phone className="h-4 w-4" />
            {contact.name}: {contact.phone}
          </a>
        ))}
      </div>
    </div>
  );
}