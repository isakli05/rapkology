import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogDetailContent from '../../../components/BlogDetailContent';
import mockData from '../../../mock-data.json';

// Type definitions - Enterprise Pattern
interface BlogDetailParams {
  slug: string;
}

interface BlogDetailPageProps {
  params: Promise<BlogDetailParams>;
}

interface BlogDetailData {
  _id: string;
  attributes: {
    title: string;
    slug: string;
    content: string;
    desc: string;
    img: string;
    authors: string[];
    tags: string[];
    category: string[];
    seo: {
      metaTitle: string;
      metaDescription: string;
      canonicalURL: string;
    };
  };
  createdAt: string;
}

// Senior Level Data Fetching - Mock to Real API Pattern
function getBlogPost(slug: string): BlogDetailData | null {
  const post = mockData.find(item => item.attributes.slug === slug);
  return post ? post as BlogDetailData : null;
}

// SEO Metadata Generation - Enterprise Level
export async function generateMetadata(
  { params }: BlogDetailPageProps
): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Blog Yazısı Bulunamadı - Rapkology',
      description: 'Aradığınız blog yazısı bulunamadı.',
    };
  }

  const { title, desc, img, seo } = post.attributes;
  
  // Performance: Optimized image URL for social sharing
  const ogImage = img.includes('cloudinary') 
    ? img.replace('/upload/', '/upload/w_1200,h_630,c_fill,q_80/')
    : img;

  return {
    title: seo.metaTitle || `${title} - Rapkology`,
    description: seo.metaDescription || desc,
    keywords: post.attributes.tags.join(', '),
    authors: [{ name: post.attributes.authors[0] || 'Rapkology' }],
    openGraph: {
      title: seo.metaTitle || title,
      description: seo.metaDescription || desc,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      type: 'article',
      publishedTime: post.createdAt,
      authors: post.attributes.authors,
      tags: post.attributes.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.metaTitle || title,
      description: seo.metaDescription || desc,
      images: [ogImage],
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Static Generation for Performance - Enterprise Pattern
export async function generateStaticParams() {
  // Generate static params for all blog posts
  return mockData.map((post) => ({
    slug: post.attributes.slug,
  }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  
  // Handle 404 case
  if (!post) {
    notFound();
  }

  // Calculate engagement stats (in real app, from API)
  const mockViewCount = Math.floor(Math.random() * 50000) + 10000;
  const mockLikeCount = Math.floor(Math.random() * 100) + 5;
  const mockCommentCount = Math.floor(Math.random() * 20) + 1;

  // Transform data for component consumption
  const blogData = {
    id: post._id,
    title: post.attributes.title,
    slug: post.attributes.slug,
    content: post.attributes.content,
    excerpt: post.attributes.desc,
    coverImage: post.attributes.img,
    author: {
      name: post.attributes.authors[0] || 'Rapkology',
      avatar: '/images/rapci_dayi.png', // In real app, from author API
    },
    publishDate: new Date(post.createdAt).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    }),
    tags: post.attributes.tags,
    category: post.attributes.category,
    engagement: {
      viewCount: mockViewCount,
      likeCount: mockLikeCount,
      commentCount: mockCommentCount,
    },
    seo: post.attributes.seo,
  };

  return (
    <BlogDetailContent 
      post={blogData}
      slug={slug}
    />
  );
}
