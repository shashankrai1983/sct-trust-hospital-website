import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PostPreview from '@/components/blog/post-preview';
import { getPostsByCategory } from '@/lib/api';

interface PageProps {
  params: {
    slug: string;
  };
}

// Enable ISR for category pages
export const revalidate = 1800; // Revalidate every 30 minutes

// Generate metadata for blog category pages
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const categoryTitle = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const categoryDescriptions: { [key: string]: string } = {
    'pregnancy-care': 'Expert pregnancy care advice and tips from Dr. Amita Shukla. Learn about prenatal care, high-risk pregnancy management, and safe delivery practices.',
    'pcos-treatment': 'Comprehensive PCOS/PCOD treatment guides by Dr. Amita Shukla. Understand symptoms, treatment options, and lifestyle management for hormonal balance.',
    'fertility-care': 'Fertility care and infertility treatment insights from leading gynecologist Dr. Amita Shukla. Expert guidance on conception and reproductive health.',
    'womens-health': 'Women\'s health articles covering gynecological issues, wellness tips, and preventive care by Dr. Amita Shukla, Lucknow\'s trusted gynecologist.'
  };

  const title = `${categoryTitle} Articles | Dr. Amita Shukla Blog`;
  const description = categoryDescriptions[params.slug] || `Read expert articles about ${categoryTitle.toLowerCase()} from Dr. Amita Shukla, leading gynecologist in Lucknow. Professional medical insights and advice.`;
  const url = `https://dramitashukla.com/blog/category/${params.slug}`;

  return {
    title,
    description,
    keywords: [
      categoryTitle,
      'Dr. Amita Shukla',
      'gynecologist blog',
      'medical articles',
      'women health',
      'Lucknow',
      'SCT Trust Hospital'
    ],
    openGraph: {
      title,
      description,
      url,
      siteName: 'Dr. Amita Shukla - SCT Trust Hospital',
      images: [{
        url: 'https://i.ibb.co/wNcyfqGS/Amita-Shukla-website-image.png',
        width: 1200,
        height: 630,
        alt: `${categoryTitle} Articles by Dr. Amita Shukla`,
      }],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://i.ibb.co/wNcyfqGS/Amita-Shukla-website-image.png'],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  try {
    const posts = await getPostsByCategory(params.slug);
    
    // Extract category title from the slug
    const categoryTitle = params.slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    if (!posts || posts.length === 0) {
      return (
        <div className="pt-24 pb-16">
          <section className="py-16 bg-accent-cream/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 green-title-text">
                  {categoryTitle}
                </h1>
                <p className="text-lg text-text-brown/80 mb-6">
                  No articles found in this category.
                </p>
                <Button asChild variant="outline">
                  <Link href="/blog">
                    Back to All Articles
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Breadcrumbs */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <Link href="/" className="inline-flex items-center text-sm font-medium text-text-brown hover:text-primary-green">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-text-brown/50" />
                    <Link href="/blog" className="ms-1 text-sm font-medium text-text-brown hover:text-primary-green md:ms-2">
                      Blog
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-text-brown/50" />
                    <span className="ms-1 text-sm font-medium text-text-brown md:ms-2">
                      {categoryTitle}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      );
    }

    return (
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 bg-accent-cream/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 green-title-text">
                {categoryTitle}
              </h1>
              <p className="text-lg text-text-brown/80 mb-6">
                Browse articles about {categoryTitle.toLowerCase()}
              </p>
            </div>
          </div>
        </section>

        {/* Blog List Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any, i: number) => (
                <PostPreview 
                  key={post._id} 
                  post={post} 
                  index={i} 
                  inView={true}
                />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button asChild variant="outline">
                <Link href="/blog">
                  Back to All Articles
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center text-sm font-medium text-text-brown hover:text-primary-green">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="h-4 w-4 text-text-brown/50" />
                  <Link href="/blog" className="ms-1 text-sm font-medium text-text-brown hover:text-primary-green md:ms-2">
                    Blog
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="h-4 w-4 text-text-brown/50" />
                  <span className="ms-1 text-sm font-medium text-text-brown md:ms-2">
                    {categoryTitle}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in CategoryPage:", error);
    notFound();
  }
}