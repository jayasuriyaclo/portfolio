import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Signal } from 'lucide-react';
import { fetchHashnodePosts } from '../utils/hashnode';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await fetchHashnodePosts();
        
        if (result.status === 'ok') {
          // Find the specific post by matching the slug from the URL
          const foundPost = result.items.find(item => {
            const itemSlug = item.link.split('/').filter(Boolean).pop();
            return itemSlug === slug;
          });
          
          setPost(foundPost);
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Track and save scroll position
  useEffect(() => {
    if (loading) return; // Don't save the skeleton's scroll position
    
    let timeoutId;
    const handleScroll = () => {
      // Debounce the sessionStorage write
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        sessionStorage.setItem(`scroll-${slug}`, window.scrollY);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [loading, slug]);

  // Restore scroll position after content loads
  useEffect(() => {
    if (!loading) {
      const savedPos = sessionStorage.getItem(`scroll-${slug}`);
      if (savedPos !== null) {
        // Wait a tiny bit for the browser to render the long HTML content
        setTimeout(() => {
          window.scrollTo({ top: parseInt(savedPos, 10), behavior: 'instant' });
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  }, [loading, slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-5 flex justify-center" style={{ background: 'var(--color-bg)' }}>
        <div className="animate-pulse flex flex-col items-start gap-4 w-full max-w-3xl">
          <div className="h-4 w-24 bg-[var(--card-border)] rounded-none mb-8"></div>
          <div className="h-10 w-3/4 bg-[var(--card-border)] rounded-none mb-4"></div>
          <div className="h-64 w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-none mb-8"></div>
          <div className="space-y-3 w-full">
            <div className="h-4 w-full bg-[var(--card-border)]"></div>
            <div className="h-4 w-5/6 bg-[var(--card-border)]"></div>
            <div className="h-4 w-4/6 bg-[var(--card-border)]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center text-center px-5" style={{ background: 'var(--color-bg)' }}>
        <h1 className="text-3xl font-bold mb-4">Error Loading Post</h1>
        <p className="text-[var(--text-secondary)] mb-8">There was a problem loading this article. Please try again.</p>
        <button onClick={() => window.location.reload()} className="px-6 py-2 border border-[var(--card-border)] bg-[var(--input-bg)] hover:border-[var(--accent-1)] hover:text-[var(--accent-1)] transition-colors text-sm font-bold uppercase tracking-widest mb-4">
          Refresh Page
        </button>
        <Link to="/blog" className="text-sm font-bold uppercase tracking-widest text-[var(--accent-1)] hover:text-[var(--accent-2)] transition-colors">
          Back to Blog
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center text-center px-5" style={{ background: 'var(--color-bg)' }}>
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <p className="text-gray-400 mb-8">We couldn't find the article you were looking for.</p>
        <Link to="/blog" className="px-6 py-2 border border-[var(--accent-1)] text-[var(--accent-1)] hover:bg-[var(--accent-soft)] transition-colors">
          Back to Blog
        </Link>
      </div>
    );
  }

  const coverImage = post.enclosure?.link || post.thumbnail;
  const formattedDate = new Date(post.pubDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Calculate read time
  const getReadTime = (htmlContent) => {
    const text = htmlContent.replace(/<[^>]+>/g, ''); // Strip HTML tags
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    const readingTime = Math.ceil(wordCount / 200); // 200 words per minute
    return `${readingTime} min read`;
  };

  const readTime = getReadTime(post.content);

  // For now, hardcode difficulty to Beginner, but this could easily map to tags/categories later
  const difficulty = "Beginner";

  return (
    <article className="min-h-screen pt-32 pb-24 px-5 sm:px-6 md:px-10 overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/blog"
          className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-1)] transition-colors mb-10 text-sm font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={16} />
          Back to Articles
        </Link>

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-[var(--text-tertiary)] text-sm font-medium uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {formattedDate}
            </div>
            
            {/* Dynamic Read Time */}
            <div className="flex items-center gap-2">
              <Clock size={16} />
              {readTime}
            </div>

            {/* Difficulty Badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent-1)] text-[var(--accent-1)] bg-[var(--accent-soft)]">
              <Signal size={14} />
              {difficulty}
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {coverImage && (
          <div className="w-full h-64 sm:h-[300px] md:h-[400px] mb-12 relative border border-[var(--card-border)] overflow-hidden">
            <img 
              src={coverImage} 
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content (HTML rendered using Tailwind Typography) */}
        <div 
          className="prose prose-invert prose-orange max-w-none prose-base lg:prose-lg prose-img:border prose-img:border-[var(--card-border)] prose-a:text-[var(--accent-1)] hover:prose-a:text-[var(--accent-2)] prose-a:transition-colors prose-headings:font-bold prose-hr:border-[var(--card-border)]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
};

export default BlogPost;
