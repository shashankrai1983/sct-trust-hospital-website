import './globals.css';
import type { Metadata } from 'next';
import { Inter, Lato } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { GridPattern } from '@/components/ui/grid-pattern';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const lato = Lato({ 
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dr. Amita Shukla - Gynecologist in Lucknow | SCT Trust Hospital',
  description: 'Dr. Amita Shukla is a leading gynecologist in Lucknow with 10+ years experience specializing in High-Risk Pregnancy, Infertility, PCOS/PCOD, Laparoscopy, and Hysteroscopy.',
  keywords: 'gynecologist, obstetrician, Lucknow, Dr. Amita Shukla, high-risk pregnancy, infertility, PCOS, PCOD, laparoscopy, hysteroscopy, SCT Trust Hospital',
  icons: {
    icon: 'https://i.ibb.co/Xk4ZJ7K1/doctor-image.jpg',
    apple: 'https://i.ibb.co/Xk4ZJ7K1/doctor-image.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://i.ibb.co/Xk4ZJ7K1/doctor-image.jpg" />
      </head>
      <body className={`${inter.variable} ${lato.variable} font-sans bg-accent-cream`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="relative overflow-hidden min-h-screen">
            <div className="relative">
              <GridPattern 
                width={50} 
                height={50}
                strokeDasharray="1 1"
                className="text-primary-green/5 dark:text-primary-green/10"
              />
              <Navbar />
              <main className="relative">{children}</main>
            </div>
            <Footer />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}