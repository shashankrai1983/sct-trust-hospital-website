import Link from 'next/link';
import Image from 'next/image';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  Search,
  Tag,
  ChevronRight,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PostPreview from '@/components/blog/post-preview';
import { getPosts, getFeaturedPost, getAllCategories } from '@/lib/api';
import { format } from 'date-fns';

// Enable ISR with revalidation for blog listing
export const revalidate = 1800; // Revalidate every 30 minutes

export default async function Blog() {
  try {
    // Fetch all data server-side
    const [blogPosts, featuredPost, categories] = await Promise.all([
      getPosts(),
      getFeaturedPost(),
      getAllCategories()
    ]);

    // Filter out categories that don't have valid slugs
    const validCategories = categories.filter(
      (category: { slug?: { current?: string } }) => category?.slug && category.slug.current
    );

    // Sort posts by publishedAt to show latest first
    const sortedPosts = blogPosts.sort((a: any, b: any) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    const latestPosts = sortedPosts.slice(0, 12); // Show first 12 posts

    return (
      <div className="pt-24 pb-16 bg-gray-50/50">
        {/* Compact Header */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-3 green-title-text">
                    Health & Wellness Blog
                  </h1>
                  <p className="text-lg text-text-brown/70">
                    Latest insights on women's health, pregnancy, and wellness
                  </p>
                </div>

                {/* Modern Search Bar */}
                <div className="flex-shrink-0 w-full lg:w-96">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-brown/40" />
                    <Input
                      type="text"
                      placeholder="Search articles..."
                      className="pl-10 pr-4 py-3 bg-gray-50 border-gray-200 focus:bg-white focus:border-primary-green transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Category Pills */}
              <div className="mt-8 flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full bg-primary-green text-white border-primary-green hover:bg-primary-green/90"
                >
                  All Posts
                </Button>
                {validCategories.slice(0, 6).map((category: any) => (
                  <Button 
                    key={category._id}
                    variant="outline" 
                    size="sm" 
                    asChild
                    className="rounded-full hover:bg-primary-green hover:text-white hover:border-primary-green transition-all"
                  >
                    <Link href={`/blog/category/${category.slug?.current || ''}`}>
                      {category.title}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              
              {/* Featured Post - More Compact */}
              {featuredPost && (
                <div className="mb-12">
                  <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      <div className="relative h-64 lg:h-80">
                        <Image
                          src={featuredPost.mainImage}
                          alt={featuredPost.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="inline-block px-3 py-1 rounded-full bg-primary-green text-white text-xs font-medium">
                            Featured
                          </span>
                        </div>
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-4 text-sm text-text-brown/60 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {featuredPost.publishedAt && format(new Date(featuredPost.publishedAt), 'MMM d, yyyy')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {featuredPost.readTime} min read
                          </span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-text-brown line-clamp-2">
                          {featuredPost.title}
                        </h2>
                        <p className="text-text-brown/70 mb-6 line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                        <Button asChild className="btn-green w-fit">
                          <Link href={`/blog/${featuredPost.slug?.current || '#'}`}>
                            Read Article <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Blog Grid - Modern and Compact */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-text-brown">
                    Latest Articles ({latestPosts.length})
                  </h2>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>

                {latestPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {latestPosts.map((post: any, index: number) => (
                      <article key={post._id} className="group">
                        <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 overflow-hidden">
                          {/* Image */}
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={post.mainImage}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {post.category && (
                              <div className="absolute top-3 left-3">
                                <span className="inline-block px-2 py-1 rounded-md bg-white/90 text-xs font-medium text-text-brown">
                                  {post.category}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            {/* Meta */}
                            <div className="flex items-center gap-4 text-xs text-text-brown/60 mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {post.readTime} min
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className="font-bold text-text-brown mb-3 line-clamp-2 group-hover:text-primary-green transition-colors">
                              <Link href={`/blog/${post.slug?.current || '#'}`}>
                                {post.title}
                              </Link>
                            </h3>

                            {/* Excerpt */}
                            <p className="text-sm text-text-brown/70 line-clamp-3 mb-4">
                              {post.excerpt}
                            </p>

                            {/* Author & Read More */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-xs text-text-brown/60">
                                <User className="h-3 w-3" />
                                <span>{post.author}</span>
                              </div>
                              <Link 
                                href={`/blog/${post.slug?.current || '#'}`}
                                className="text-primary-green text-sm font-medium hover:text-primary-green/80 transition-colors flex items-center gap-1"
                              >
                                Read more
                                <ArrowRight className="h-3 w-3" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-text-brown/60 text-lg">No blog posts found. Check back soon for new content!</p>
                  </div>
                )}

                {/* Load More */}
                {blogPosts.length > 12 && (
                  <div className="mt-12 text-center">
                    <Button variant="outline" className="px-8 py-3">
                      Load More Articles
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Compact CTA */}
        <section className="py-12 bg-primary-green/5 border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-3 green-title-text">
                Have a Health Question?
              </h2>
              <p className="text-text-brown/70 mb-6">
                Schedule a consultation with Dr. Amita Shukla for personalized care
              </p>
              <Button asChild className="btn-green">
                <Link href="/contact">Book an Appointment</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link href="/" className="text-sm font-medium text-text-brown/60 hover:text-primary-green transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="h-4 w-4 text-text-brown/40" />
                  <span className="ms-1 text-sm font-medium text-text-brown md:ms-2">Blog</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return (
      <div className="pt-24 pb-16">
        <section className="py-16 bg-gray-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 green-title-text">
                Health & Wellness Blog
              </h1>
              <p className="text-lg text-text-brown/80 mb-6">
                Currently unable to load blog content. Please try again later.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}