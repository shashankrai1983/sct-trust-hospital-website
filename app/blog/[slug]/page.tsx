import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs } from '@/lib/api';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface PageProps {
  params: {
    slug: string;
  };
}

// Custom components for rendering Portable Text
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-8">
          <Image
            src={value.asset.url}
            alt={value.alt || ''}
            width={800}
            height={400}
            className="w-full h-auto rounded-lg"
          />
          {value.caption && (
            <div className="text-center text-sm text-gray-500 mt-2">{value.caption}</div>
          )}
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a 
          href={value.href} 
          rel={rel} 
          className="text-primary-green underline hover:text-primary-green/80 transition-colors"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-8 mb-4 text-text-brown">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-8 mb-4 text-text-brown">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold mt-6 mb-3 text-text-brown">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg font-bold mt-6 mb-2 text-text-brown">{children}</h4>,
    normal: ({ children }: any) => <p className="mb-4 text-text-brown/90 leading-relaxed">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary-green pl-4 italic my-6 text-text-brown/80">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-6 space-y-2 text-text-brown/90">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-text-brown/90">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
};

// Generate static params for ISR - only for essential pages
export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    // Only pre-generate first 5 posts, others will be generated on-demand
    return slugs.slice(0, 5);
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Enable ISR with revalidation
export const revalidate = 3600; // Revalidate every hour

export default async function BlogPost({ params }: PageProps) {
  try {
    const post = await getPostBySlug(params.slug);
    
    if (!post) {
      notFound();
    }

    const formattedDate = post.publishedAt 
      ? format(new Date(post.publishedAt), 'MMMM d, yyyy')
      : '';

    return (
      <div className="pt-24 pb-16">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
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
                  <span className="ms-1 text-sm font-medium text-text-brown md:ms-2 line-clamp-1">
                    {post.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Button asChild variant="outline">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Article Content */}
        <article className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 green-title-text">
                {post.title}
              </h1>
              
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-text-brown/70 mb-6">
                {formattedDate && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formattedDate}</span>
                  </div>
                )}
                {post.author?.name && (
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{post.author.name}</span>
                  </div>
                )}
                {post.readTime && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{post.readTime} min read</span>
                  </div>
                )}
              </div>

              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.categories.map((category: { title: string }, index: number) => (
                    <span 
                      key={index}
                      className="inline-block px-3 py-1 rounded-full bg-primary-green/10 text-primary-green text-sm font-medium"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              )}

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-text-brown/80 leading-relaxed mb-8">
                  {post.excerpt}
                </p>
              )}
            </header>
            
            {/* Featured Image */}
            {post.mainImage && (
              <div className="relative mb-8">
                <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-warm">
                  <Image
                    src={post.mainImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            )}

            {/* Author Info */}
            {post.author && (
              <div className="flex items-center mb-8 p-6 bg-accent-cream/30 rounded-xl">
                {post.author.avatar && (
                  <div className="relative w-16 h-16 mr-4">
                    <Image 
                      src={post.author.avatar} 
                      alt={post.author.name} 
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-text-brown mb-1">About {post.author.name}</h3>
                  {post.author.bio && (
                    <div className="text-text-brown/80 text-sm">
                      <PortableText value={post.author.bio} components={ptComponents} />
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              {post.body ? (
                <PortableText 
                  value={post.body} 
                  components={ptComponents}
                />
              ) : post.content ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                <p className="text-text-brown/70 italic text-center py-8">
                  No content available for this post.
                </p>
              )}
            </div>

            {/* Navigation */}
            <div className="mt-12 pt-8 border-t border-text-brown/10">
              <div className="flex justify-center">
                <Button asChild className="btn-green">
                  <Link href="/blog">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to All Articles
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    notFound();
  }
}