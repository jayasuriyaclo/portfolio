import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, ArrowRight, ExternalLink, Clock, Signal, Search } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { fetchHashnodePosts } from '../utils/hashnode';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6); // Show 6 posts initially
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await fetchHashnodePosts();
        if (result.status === 'ok') {
          // Helper to calculate read time
          const getReadTime = (htmlContent) => {
            const text = (htmlContent || '').replace(/<[^>]+>/g, '');
            const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
            return Math.ceil(wordCount / 200);
          };

          // Transform RSS items to match our existing component structure
          const formattedPosts = result.items.map(item => ({
            node: {
              id: item.guid,
              title: item.title,
              brief: item.description,
              url: item.link,
              coverImage: {
                url: item.enclosure?.link || item.thumbnail
              },
              publishedAt: item.pubDate,
              readTime: getReadTime(item.content),
              difficulty: "Beginner"
            }
          }));
          setPosts(formattedPosts);
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-5 sm:px-6 md:px-10 lg:px-14 flex justify-center" style={{ background: 'var(--color-bg)' }}>
         <div className="animate-pulse flex flex-col items-center gap-4 w-full max-w-7xl">
            <div className="h-8 w-48 bg-[var(--card-border)] rounded-none mb-10"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-96 w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-none"></div>
              ))}
            </div>
         </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-5 sm:px-6 md:px-10 flex flex-col items-center justify-center text-center" style={{ background: 'var(--color-bg)' }}>
        <h3 className="text-xl font-bold text-white mb-2">Oops! Something went wrong</h3>
        <p className="text-[var(--text-secondary)] mb-6">We couldn't load the latest articles. Please try again later.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 border border-[var(--card-border)] bg-[var(--input-bg)] hover:border-[var(--accent-1)] hover:text-[var(--accent-1)] transition-colors text-sm uppercase tracking-widest font-bold"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  if (posts.length === 0) return null;

  // Filter posts based on search query
  const filteredPosts = posts.filter(({ node }) => {
    const query = searchQuery.toLowerCase();
    return (
      node.title.toLowerCase().includes(query) ||
      node.brief.toLowerCase().includes(query)
    );
  });

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-5 sm:px-6 md:px-10 lg:px-14 overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--card-border)] to-transparent" />
      
      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-14 flex flex-col items-center text-center">
          <div className="section-label mx-auto w-fit">
            <BookOpen size={12} />
            Latest Articles
          </div>
          <h2 className="text-4xl font-black tracking-[-0.03em] text-white sm:text-5xl" style={{ fontFamily: 'var(--font-head)' }}>
            From the Blog
          </h2>
          <p className="mt-4 mb-8 mx-auto max-w-2xl text-[16px] leading-[1.8] text-white/50 text-center">
            Insights, tutorials, and deep dives into cybersecurity, cloud administration, and Microsoft 365.
          </p>

          {/* Search Bar */}
          <div className="relative w-full max-w-lg mx-auto group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-tertiary)] group-focus-within:text-[var(--accent-1)] transition-colors">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search articles by title or keyword..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(6); // Reset visible count on search
              }}
              className="w-full bg-[var(--input-bg)] border border-[var(--card-border)] text-white text-sm rounded-none pl-11 pr-4 py-3.5 focus:outline-none focus:border-[var(--accent-1)] focus:ring-1 focus:ring-[var(--accent-1)] transition-all placeholder:text-[var(--text-tertiary)]"
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.length > 0 ? (
            filteredPosts.slice(0, visibleCount).map(({ node }) => {
              const date = new Date(node.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });
            const slug = node.url.split('/').filter(Boolean).pop();

            return (
              <Link 
                key={node.id} 
                to={`/blog/${slug}`}
                className="group relative glass-card p-6 flex flex-col h-full hover:-translate-y-2 hover:shadow-[0_8px_32px_var(--accent-glow)] transition-all duration-300 cursor-pointer block"
              >
                
                {/* Cover Image */}
                {node.coverImage && node.coverImage.url && (
                  <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden border-b border-[var(--card-border)]">
                    <img 
                      src={node.coverImage.url} 
                      alt={node.title} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] to-transparent opacity-80" />
                  </div>
                )}

                {/* Meta Info: Date, Read Time, Difficulty */}
                <div className="flex flex-wrap items-center gap-3 text-[var(--accent-1)] text-[11px] font-bold uppercase tracking-wider mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <span>{date}</span>
                  </div>
                  
                  <div className="w-1 h-1 rounded-full bg-[var(--text-tertiary)] opacity-50" />
                  
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>{node.readTime} min read</span>
                  </div>

                  <div className="w-1 h-1 rounded-full bg-[var(--text-tertiary)] opacity-50" />

                  <div className="flex items-center gap-1.5 text-[var(--accent-1)]">
                    <Signal size={14} />
                    <span>{node.difficulty}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-[19px] font-bold mb-3 text-white leading-snug group-hover:text-[var(--accent-1)] transition-colors">
                  {node.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[var(--text-secondary)] text-sm mb-6 line-clamp-3">
                  {node.brief}
                </p>

                {/* Link (now just a visual indicator since the whole card is a Link) */}
                <div className="mt-auto pt-4 border-t border-[var(--divider)]">
                  <span 
                    className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-[var(--text-secondary)] group-hover:text-[var(--accent-1)] transition-colors"
                  >
                    Read Article 
                    <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--input-bg)] border border-[var(--card-border)] text-[var(--text-tertiary)] mb-4">
              <Search size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
            <p className="text-[var(--text-secondary)] max-w-md mx-auto">
              We couldn't find any articles matching "{searchQuery}". Try adjusting your search terms.
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-6 text-[13px] font-bold uppercase tracking-widest text-[var(--accent-1)] hover:text-[var(--accent-2)] transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
        </div>

        {filteredPosts.length > visibleCount && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="group inline-flex items-center gap-2 rounded-none border border-[var(--card-border)] bg-[var(--input-bg)] px-6 py-3 text-[13px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:border-[var(--accent-1)] hover:text-[var(--accent-1)]"
            >
              Load More Posts
              <ArrowRight size={16} className="transition-transform group-hover:translate-y-1 rotate-90" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
