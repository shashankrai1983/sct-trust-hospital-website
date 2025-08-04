import './globals.css';
import type { Metadata } from 'next';
import { Inter, Lato } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { GridPattern } from '@/components/ui/grid-pattern';
import { Providers } from './providers';
import { ConditionalNavbar } from '@/components/layout/conditional-navbar';
import { ConditionalFooter } from '@/components/layout/conditional-footer';

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
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="https://i.ibb.co/Xk4ZJ7K1/doctor-image.jpg" />
      </head>
      <body className={`${inter.variable} ${lato.variable} font-sans bg-accent-cream antialiased`}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="light">
            <div className="relative overflow-hidden min-h-screen">
              <GridPattern 
                width={50} 
                height={50}
                strokeDasharray="1 1"
                className="fixed inset-0 text-primary-green/5 dark:text-primary-green/10 pointer-events-none"
              />
              <ConditionalNavbar />
              <main className="relative">{children}</main>
              <ConditionalFooter />
              <Toaster />
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}