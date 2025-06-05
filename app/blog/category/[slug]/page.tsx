"use client";

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PostPreview from '@/components/blog/post-preview';
import { getPostsByCategory } from '@/lib/api';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: PageProps) {
  const blogListRef = useRef<HTMLDivElement>(null);
  const isBlogListInView = useInView(blogListRef, { once: true });

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryTitle, setCategoryTitle] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getPostsByCategory(params.slug);
        
        setPosts(postsData);
        
        // Extract category title from the slug
        const formattedTitle = params.slug
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        setCategoryTitle(formattedTitle);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching category posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-green"></div>
      </div>
    );
  }

  if (posts.length === 0) {
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
      <section 
        ref={blogListRef}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <PostPreview 
                key={post._id} 
                post={post} 
                index={i} 
                inView={isBlogListInView} 
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
}