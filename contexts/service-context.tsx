"use client";

import React, { createContext, useContext } from 'react';
import { ServiceInfo } from '@/types/services';

interface ServiceContextType {
  service: ServiceInfo;
}

const ServiceContext = createContext<ServiceContextType | null>(null);

interface ServiceProviderProps {
  children: React.ReactNode;
  service: ServiceInfo;
}

export function ServiceProvider({ children, service }: ServiceProviderProps) {
  return (
    <ServiceContext.Provider value={{ service }}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useService() {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context.service;
}