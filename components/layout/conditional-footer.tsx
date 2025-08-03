'use client';

import { usePathname } from 'next/navigation';
import Footer from './footer';

export function ConditionalFooter() {
  const pathname = usePathname();
  
  // Hide footer on dashboard routes (optional - currently keeping footer on dashboard)
  const isDashboardRoute = pathname?.startsWith('/dashboard') || false;
  
  // For now, always show footer. Change this condition if you want to hide footer on dashboard
  if (false && isDashboardRoute) {
    return null;
  }
  
  return <Footer />;
}