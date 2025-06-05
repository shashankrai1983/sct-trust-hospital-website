import Link from 'next/link';
import Image from 'next/image';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  Search,
  Tag,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PostPreview from '@/components/blog/post-preview';
import { getPosts, getFeaturedPost, getAllCategories } from '@/lib/api';
import { format } from 'date-fns';

/*
* Converted to Server Component for better performance and SEO
* - Moved data fetching to server-side
* - Fixed client-side rendering issues
* - Improved loading experience
*/

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

    const formattedDate = featuredPost?.publishedAt 
      ? format(new Date(featuredPost.publishedAt), 'MMMM d, yyyy')
      : '';

    return (
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 bg-accent-cream/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 green-title-text">
                Health & Wellness Blog
              </h1>
              <p className="text-lg text-text-brown/80 mb-6">
                Informative articles on women's health, pregnancy, and gynecological care
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 green-title-text">
                Featured Article
              </h2>
            </div>

            {featuredPost ? (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                <div className="lg:col-span-3 order-2 lg:order-1">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary-green/10 text-primary-green text-sm font-medium mb-4">
                    {featuredPost.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-text-brown">
                    {featuredPost.title}
                  </h3>
                  <p className="text-lg text-text-brown/80 mb-6">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center text-sm text-text-brown/70 mb-6 gap-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{featuredPost.readTime} min read</span>
                    </div>
                  </div>

                  <Button asChild className="btn-green">
                    <Link href={`/blog/${featuredPost.slug?.current || '#'}`}>
                      Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="lg:col-span-2 order-1 lg:order-2">
                  <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-warm">
                    <Image
                      src={featuredPost.mainImage}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-text-brown/70">No featured article available.</p>
              </div>
            )}
          </div>
        </section>

        {/* Blog List Section */}
        <section className="py-16 bg-accent-cream/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Blog Posts */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 green-title-text">
                    Latest Articles
                  </h2>
                </div>

                {blogPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {blogPosts.slice(1).map((post, i) => (
                      <PostPreview 
                        key={post._id} 
                        post={post} 
                        index={i} 
                        inView={true} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-text-brown/70">No blog posts found. Check back soon for new content!</p>
                  </div>
                )}

                {blogPosts.length > 6 && (
                  <div className="mt-12 flex justify-center">
                    <Button variant="outline" className="px-6">
                      Load More Articles
                    </Button>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="space-y-8">
                  {/* Search Box */}
                  <div className="bg-white p-6 rounded-xl shadow-warm">
                    <h3 className="text-lg font-bold mb-4 text-text-brown">Search Articles</h3>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Search..."
                        className="pr-10"
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-brown/50" />
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="bg-white p-6 rounded-xl shadow-warm">
                    <h3 className="text-lg font-bold mb-4 text-text-brown">Categories</h3>
                    {validCategories.length > 0 ? (
                      <ul className="space-y-2">
                        {validCategories.map((category) => (
                          <li key={category._id}>
                            <Link 
                              href={`/blog/category/${category.slug?.current || ''}`}
                              className="flex justify-between items-center py-2 px-3 rounded-md hover:bg-accent-cream/50 transition-colors"
                            >
                              <span className="flex items-center text-text-brown">
                                <Tag className="h-3 w-3 mr-2" />
                                {category.title}
                              </span>
                              <span className="text-sm text-text-brown/60">{category.count}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-text-brown/70 text-center py-4">No categories found</p>
                    )}
                  </div>

                  {/* Recent Posts */}
                  <div className="bg-white p-6 rounded-xl shadow-warm">
                    <h3 className="text-lg font-bold mb-4 text-text-brown">Recent Posts</h3>
                    {blogPosts.length > 0 ? (
                      <div className="space-y-4">
                        {blogPosts.slice(0, 3).map(post => (
                          <Link href={`/blog/${post.slug?.current || '#'}`} key={post._id} className="group">
                            <div className="flex items-start gap-3">
                              <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                                <Image
                                  src={post.mainImage}
                                  alt={post.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-text-brown group-hover:text-primary-green transition-colors line-clamp-2">
                                  {post.title}
                                </h4>
                                <p className="text-xs text-text-brown/60 mt-1">
                                  {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-text-brown/70 text-center py-4">No recent posts</p>
                    )}
                  </div>

                  {/* Newsletter */}
                  <div className="bg-primary-green/10 p-6 rounded-xl shadow-warm">
                    <h3 className="text-lg font-bold mb-2 text-text-brown">Subscribe to Our Newsletter</h3>
                    <p className="text-text-brown/80 text-sm mb-4">Stay updated with the latest health tips and news</p>
                    <div className="space-y-4">
                      <Input
                        type="email"
                        placeholder="Your email address"
                      />
                      <Button className="w-full btn-green">
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Topics Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 green-title-text">
                  Popular Topics
                </h2>
                <p className="text-text-brown/80">
                  Explore our most commonly covered health topics
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {['Pregnancy', 'Fertility', 'PCOS', 'Women\'s Health', 'Menopause', 'Nutrition', 'Exercise', 'Mental Health'].map((topic) => (
                  <Link 
                    key={topic} 
                    href={`/blog/tag/${topic.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-6 py-3 rounded-full bg-accent-cream hover:bg-primary-green/10 text-text-brown transition-colors"
                  >
                    {topic}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary-green/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 green-title-text">
                Have a Health Question?
              </h2>
              <p className="text-lg text-text-brown/80 mb-8">
                Schedule a consultation with Dr. Amita Shukla for personalized care and expert advice
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
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center text-sm font-medium text-text-brown hover:text-primary-green">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="h-4 w-4 text-text-brown/50" />
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
        <section className="py-16 bg-accent-cream/30">
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