import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const query = `
        query Publication {
          publication(host: "admincentre.hashnode.dev") {
            posts(first: 3) {
              edges {
                node {
                  id
                  title
                  brief
                  url
                  coverImage {
                    url
                  }
                  publishedAt
                }
              }
            }
          }
        }
      `;

      try {
        const response = await fetch('https://gql.hashnode.com/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });
        const result = await response.json();
        setPosts(result.data?.publication?.posts?.edges || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section id="blog" className="py-24 px-5 sm:px-6 md:px-10 lg:px-14 flex justify-center" style={{ background: 'var(--color-bg)' }}>
         <div className="animate-pulse flex flex-col items-center gap-4 w-full max-w-7xl">
            <div className="h-8 w-48 bg-[var(--card-border)] rounded-none mb-10"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-96 w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-none"></div>
              ))}
            </div>
         </div>
      </section>
    );
  }

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="relative overflow-hidden scroll-mt-20 md:scroll-mt-28 py-24 px-5 sm:px-6 md:px-10 lg:px-14" style={{ background: 'var(--color-bg)' }}>
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
          <p className="mt-4 mx-auto max-w-2xl text-[16px] leading-[1.8] text-white/50 text-center">
            Insights, tutorials, and deep dives into cybersecurity, cloud administration, and Microsoft 365.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(({ node }) => {
            const date = new Date(node.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });

            return (
              <a
                key={node.id}
                href={node.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("Blog", "Click", node.title)}
                className="group relative flex flex-col overflow-hidden rounded-none border border-[var(--card-border)] bg-[var(--card-bg)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-1)] hover:shadow-[0_12px_40px_rgba(99,102,241,0.12)]"
              >
                {/* Image */}
                {node.coverImage?.url && (
                  <div className="relative aspect-video w-full overflow-hidden border-b border-[var(--card-border)] bg-[var(--input-bg)]">
                    <img
                      src={node.coverImage.url}
                      alt={node.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] to-transparent opacity-60" />
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--accent-1)]">
                    <Calendar size={13} />
                    {date}
                  </div>
                  
                  <h3 className="mb-3 text-[18px] font-black leading-snug text-white group-hover:text-[var(--accent-1)] transition-colors line-clamp-2" style={{ fontFamily: 'var(--font-head)' }}>
                    {node.title}
                  </h3>
                  
                  <p className="mb-6 text-[14px] leading-[1.7] text-white/50 line-clamp-3 flex-1">
                    {node.brief}
                  </p>

                  <div className="mt-auto flex items-center text-[12px] font-bold uppercase tracking-widest text-white/40 group-hover:text-[var(--accent-1)] transition-colors">
                    Read Article
                    <ExternalLink size={14} className="ml-2" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="https://admincentre.hashnode.dev"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("CTA", "Click", "View All Posts")}
            className="group inline-flex items-center gap-2 rounded-none border border-[var(--card-border)] bg-[var(--input-bg)] px-6 py-3 text-[13px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:border-[var(--accent-1)] hover:text-[var(--accent-1)]"
          >
            View All Posts
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
