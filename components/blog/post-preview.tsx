"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface PostPreviewProps {
  post: {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt: string;
    mainImage: string;
    publishedAt: string;
    author: string;
    category: string;
    readTime: number;
  };
  index: number;
  inView: boolean;
}

const PostPreview = ({ post, index, inView }: PostPreviewProps) => {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    if (post.publishedAt) {
      setFormattedDate(format(new Date(post.publishedAt), 'MMMM d, yyyy'));
    }
  }, [post.publishedAt]);

  return (
    <motion.div
      key={post._id}
      className="bg-white rounded-xl shadow-warm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.mainImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          priority
        />
      </div>
      <div className="p-6">
        <span className="inline-block px-2 py-1 rounded-full bg-primary-green/10 text-primary-green text-xs font-medium mb-3">
          {post.category}
        </span>
        <h3 className="text-xl font-bold mb-3 text-text-brown line-clamp-2">
          {post.title}
        </h3>
        <p className="text-text-brown/80 mb-4 line-clamp-3">{post.excerpt}</p>
        
        <div className="flex justify-between items-center text-sm text-text-brown/70 mb-4">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{post.readTime} min read</span>
          </div>
        </div>

        <Button asChild variant="outline" className="w-full">
          <Link href={`/blog/${post.slug.current}`}>
            Read Article
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default PostPreview;
