'use client';

import { usePathname } from 'next/navigation';
import Navbar from './navbar';

export function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Hide navbar on dashboard routes
  const isDashboardRoute = pathname?.startsWith('/dashboard') || false;
  
  if (isDashboardRoute) {
    return null;
  }
  
  return <Navbar />;
}