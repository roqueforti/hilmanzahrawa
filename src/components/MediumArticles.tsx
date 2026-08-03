'use client';

import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

interface MediumArticlesProps {
  username?: string;
  title?: string;
}

interface MediumArticlesProps {
  username?: string;
  title?: string;
}

export default function MediumArticles({ username, title }: MediumArticlesProps) {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    async function fetchArticles() {
      try {
        const response = await fetch(`/api/medium?username=${username}`);
        const data = await response.json();
        if (data.articles) {
          setArticles(data.articles);
        }
      } catch (error) {
        console.error("Failed to fetch Medium articles", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [username]);

  if (!username && !loading) {
    return (
      <div style={{ 
        padding: '3rem 2rem', 
        textAlign: 'center', 
        background: 'var(--bg-secondary)', 
        borderRadius: 'var(--radius-lg)', 
        border: '1px dashed var(--border-light)',
        marginTop: '2rem'
      }}>
        <BookOpen size={32} className="text-accent" style={{ opacity: 0.3, marginBottom: '1rem', margin: '0 auto' }} />
        <h3 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Medium Username Missing</h3>
        <p style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '0.5rem' }}>Add your Medium username in Sanity Studio to display your articles.</p>
      </div>
    );
  }

  if (!loading && articles.length === 0 && username) {
    return (
      <div style={{ 
        padding: '3rem 2rem', 
        textAlign: 'center', 
        background: 'var(--bg-secondary)', 
        borderRadius: 'var(--radius-lg)', 
        border: '1px dashed var(--border-light)',
        marginTop: '2rem'
      }}>
        <BookOpen size={32} className="text-accent" style={{ opacity: 0.3, marginBottom: '1rem', margin: '0 auto' }} />
        <h3 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>No Articles Found</h3>
        <p style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '0.5rem' }}>
          Could not find any articles for Medium username: <strong>{username}</strong>. 
          Make sure your username is correct in Sanity Studio.
        </p>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div style={{ marginTop: '3rem', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2.5rem' }}>
        <div style={{ width: '1.8rem', height: '1.8rem', borderRadius: '4px', background: 'var(--text-primary)', color: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BookOpen size={16} />
        </div>
        <div>
          <h2 className="text-heading-compact" style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {title || "LATEST WRITINGS"}
          </h2>
          <p style={{ fontSize: '0.65rem', opacity: 0.5, marginTop: '0.2rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Articles and insights on Medium</p>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ height: '180px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', animation: 'pulse 2s infinite' }} className="skeleton" />
          ))}
        </div>
      ) : (
        <div className="dynamic-grid-3-cols">
          {articles.map((article, index) => (
            <motion.a
              key={article.guid || article.link || `medium-article-${index}`}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="article-card"
              style={{ 
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textDecoration: 'none',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '180px'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.7 }}>
                    <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{formatDate(article.pubDate)}</span>
                  </div>
                  <ExternalLink size={14} style={{ opacity: 0.5, color: 'var(--text-primary)' }} />
                </div>
                <h3 style={{ 
                  fontSize: '1rem', 
                  fontWeight: 800, 
                  color: 'var(--text-primary)', 
                  lineHeight: '1.4',
                  marginBottom: '1rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {article.title}
                </h3>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>Read Article</span>
                <div className="article-line" style={{ flex: 1, height: '1px', background: 'var(--text-primary)', opacity: 0.2 }} />
              </div>
            </motion.a>
          ))}
        </div>
      )}

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <a 
          href={username?.includes('.') ? (username.startsWith('http') ? username : `https://${username}`) : `https://medium.com/${username?.startsWith('@') ? username : `@${username}`}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '0.7rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            opacity: 0.4,
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            transition: 'opacity 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.4'}
        >
          View all on Medium
        </a>
      </div>
    </div>
  );
}
