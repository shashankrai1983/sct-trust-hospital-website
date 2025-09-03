import { ServicePageData } from '@/types/services';

// Import all service data files
import { antenatalCareData } from './antenatal-care';
import { infertilityTreatmentData } from './infertility-treatment';
import { laparoscopyData } from './laparoscopy';
import { pcosPcodTreatmentData } from './pcos-pcod-treatment';
import { pregnancyComplicationsData } from './pregnancy-complications';
import { wellWomenHealthData } from './well-women-health';

// Service registry with all available services
export const servicesRegistry: Record<string, ServicePageData> = {
  'antenatal-care': antenatalCareData,
  'infertility-treatment': infertilityTreatmentData,
  'laparoscopy': laparoscopyData,
  'pcos-pcod-treatment': pcosPcodTreatmentData,
  'pregnancy-complications': pregnancyComplicationsData,
  'well-women-health': wellWomenHealthData,
};

// Service images interface
export interface ServiceSummary {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  specialties: string[];
  featured?: boolean;
}

// Generate service summaries for the hub page
export const serviceSummaries: ServiceSummary[] = [
  {
    id: 'high-risk-pregnancy',
    title: 'High Risk Pregnancy',
    description: 'Specialized care for complex pregnancies with advanced monitoring and expert management to ensure the best outcomes for mother and baby.',
    href: '/services/high-risk-pregnancy',
    image: 'https://i.ibb.co/ycn9SnhQ/High-Risk-Pregnancy-Care.png',
    specialties: ['Maternal-Fetal Medicine', 'Advanced Monitoring', 'NICU Support'],
    featured: true,
  },
  {
    id: 'pregnancy-complications',
    title: 'Pregnancy Complications',
    description: 'Expert management of gestational diabetes, preeclampsia, placental issues, and other pregnancy-related complications.',
    href: '/services/pregnancy-complications',
    image: 'https://i.ibb.co/ycn9SnhQ/High-Risk-Pregnancy-Care.png',
    specialties: ['Gestational Diabetes', 'Preeclampsia', 'Placental Disorders'],
    featured: true,
  },
  {
    id: 'infertility-treatment',
    title: 'Infertility Treatment',
    description: 'Comprehensive fertility solutions including IUI, IVF, and advanced reproductive technologies with personalized treatment plans.',
    href: '/services/infertility-treatment',
    image: 'https://i.ibb.co/zT9kR7kq/Infertility-Care.png',
    specialties: ['IVF', 'IUI', 'Fertility Assessment'],
    featured: true,
  },
  {
    id: 'pcos-pcod-treatment',
    title: 'PCOS/PCOD Treatment',
    description: 'Holistic management of polycystic ovarian syndrome with medical therapy, lifestyle guidance, and fertility preservation.',
    href: '/services/pcos-pcod-treatment',
    image: 'https://i.ibb.co/LXHkZKWc/PCOS-PCOD-care.png',
    specialties: ['Hormonal Balance', 'Weight Management', 'Fertility Care'],
  },
  {
    id: 'laparoscopy',
    title: 'Laparoscopic Surgery',
    description: 'Minimally invasive surgical solutions for gynecological conditions with faster recovery and minimal scarring.',
    href: '/services/laparoscopy',
    image: 'https://i.ibb.co/pvsbFHZk/Advance-Laproscopy.png',
    specialties: ['Minimally Invasive', 'Endometriosis', 'Fibroid Removal'],
  },
  {
    id: 'antenatal-care',
    title: 'Antenatal Care',
    description: 'Complete prenatal care with regular monitoring, screenings, and guidance throughout your pregnancy journey.',
    href: '/services/antenatal-care',
    image: 'https://i.ibb.co/b5DLnkFt/Antenatal.png',
    specialties: ['Prenatal Screening', 'Growth Monitoring', 'Birth Planning'],
  },
  {
    id: 'well-women-health',
    title: 'Well Women Health',
    description: 'Preventive healthcare and wellness programs for women of all ages, from adolescence through menopause.',
    href: '/services/well-women-health',
    image: 'https://i.ibb.co/Q3HthvMW/women-health.png',
    specialties: ['Health Screening', 'Menopause Care', 'Preventive Medicine'],
  },
];

// Helper function to get service data
export function getServiceData(serviceId: string): ServicePageData | null {
  return servicesRegistry[serviceId] || null;
}

// Helper function to get all services
export function getAllServices(): ServiceSummary[] {
  return serviceSummaries;
}

// Helper function to get featured services
export function getFeaturedServices(): ServiceSummary[] {
  return serviceSummaries.filter(service => service.featured);
}