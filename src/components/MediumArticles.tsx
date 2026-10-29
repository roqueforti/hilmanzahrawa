'use client';

import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ExternalLink, Calendar, Clock, Sparkles, ArrowUpRight, CheckCircle2, User } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

export interface MediumArticle {
  title: string;
  link: string;
  pubDate: string | null;
  thumbnail: string | null;
  categories: string[];
  snippet: string;
  readTime: string;
}

interface MediumArticlesProps {
  username?: string;
  title?: string;
}

// Guaranteed real fallback data from @hilmanzahrawa Medium feed
const FALLBACK_ARTICLES: MediumArticle[] = [
  {
    title: "Maybe Your Type Says More About You Than You Think",
    link: "https://hilmanzahrawa.medium.com/maybe-your-type-says-more-about-you-than-you-think-56cabf47f2dd",
    pubDate: "Wed, 14 Oct 2026 13:20:17 GMT",
    thumbnail: "https://cdn-images-1.medium.com/max/1024/0*a5tHuXsioTXWCNIU",
    categories: ["Self-Awareness", "Relationships", "Psychology", "Life"],
    snippet: "On attraction, admiration, and the qualities we recognize in other people. We all seem to have a type. Some are drawn to confidence, others to intellectual depth and quiet vulnerability.",
    readTime: "12 min read"
  },
  {
    title: "13 Reasons Why We Need to Live",
    link: "https://hilmanzahrawa.medium.com/13-reasons-why-we-need-to-live-b005554ab7b4",
    pubDate: "Wed, 03 Dec 2025 16:23:07 GMT",
    thumbnail: "https://cdn-images-1.medium.com/max/1024/0*iHeSQAgsJY7NXQcz",
    categories: ["Healing", "Self-Improvement", "Life Lessons"],
    snippet: "There was a moment when I asked myself a question that felt too heavy for my own chest: Why should I keep living? The answer did not come in a dramatic revelation, but in the quietest, most human moments.",
    readTime: "4 min read"
  },
  {
    title: "Secangkir Kopi, Sebuah Ruang untuk Semua: Cerita The Cup We Share",
    link: "https://hilmanzahrawa.medium.com/secangkir-kopi-sebuah-ruang-untuk-semua-cerita-the-cup-we-share-fe315f44565f",
    pubDate: "Tue, 25 Nov 2025 12:36:30 GMT",
    thumbnail: "https://cdn-images-1.medium.com/max/1024/1*9lv3ewZ7TrfZaN0LAj3Tew.jpeg",
    categories: ["Community", "Social Impact", "Inclusion"],
    snippet: "Saat pertama kali bergabung dengan Mandala, saya membawa banyak keraguan. Cerita perjalanan mendalam tentang bagaimana secangkir kopi mampu menjembatani empati dan ruang inklusif.",
    readTime: "4 min read"
  },
  {
    title: "OKI Connect: Membangun Budaya Transparansi dalam Tata Kelola Organisasi Mahasiswa #TeamGoogle…",
    link: "https://hilmanzahrawa.medium.com/oki-connect-membangun-budaya-transparansi-dalam-tata-kelola-organisasi-mahasiswa-teamgoogle-2122cb52eaa8",
    pubDate: "Sun, 31 Aug 2025 11:33:08 GMT",
    thumbnail: "https://cdn-images-1.medium.com/max/1024/1*1caNoavSxELHbtkFFmynBQ.png",
    categories: ["Technology", "Governance", "Google Student Ambassador"],
    snippet: "Membangun budaya transparansi dan akuntabilitas dalam tata kelola organisasi mahasiswa melalui pemanfaatan teknologi informasi dan platform digital terintegrasi.",
    readTime: "3 min read"
  },
  {
    title: "Live Like an Anime Main Character: Why Not?",
    link: "https://hilmanzahrawa.medium.com/live-like-an-anime-main-character-why-not-8cbe06af7e29",
    pubDate: "Mon, 28 Jul 2025 18:12:18 GMT",
    thumbnail: "https://cdn-images-1.medium.com/max/1024/0*t57vF3qy2WY9ZH3p",
    categories: ["Self-Growth", "Motivation", "Perspective"],
    snippet: "What if we viewed life not as a repetitive routine, but through the narrative lens of an anime protagonist? Embracing continuous training arcs, growth mindsets, and relentless resilience.",
    readTime: "4 min read"
  },
  {
    title: "“Be wise,” she said.",
    link: "https://hilmanzahrawa.medium.com/be-wise-she-said-4ae80643f00b",
    pubDate: "Sat, 18 Jan 2025 17:34:00 GMT",
    thumbnail: "https://cdn-images-1.medium.com/max/1024/1*VQt05QGoDlu2Ls1MBeV2SA.jpeg",
    categories: ["Wisdom", "Reflection", "Philosophy"],
    snippet: "I've been reading Sherlock Holmes books since 4th grade. A reflection on observation versus perception, and the timeless lesson of navigating complexity with calm wisdom.",
    readTime: "4 min read"
  }
];

export default function MediumArticles({ username = "hilmanzahrawa", title }: MediumArticlesProps) {
  const [articles, setArticles] = useState<MediumArticle[]>(FALLBACK_ARTICLES);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    let isMounted = true;
    async function fetchArticles() {
      try {
        const cleanUser = username?.replace(/^@/, "") || "hilmanzahrawa";
        const response = await fetch(`/api/medium?username=${cleanUser}`);
        if (!response.ok) throw new Error("Fetch failed");
        const data = await response.json();
        if (isMounted && data.articles && data.articles.length > 0) {
          setArticles(data.articles);
        }
      } catch (error) {
        console.warn("Using fallback Medium articles:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchArticles();
    return () => { isMounted = false; };
  }, [username]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Recently published";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  // Filter categories
  const categoriesList = [
    { id: "all", label: "All Stories" },
    { id: "psychology", label: "Self & Psychology", keywords: ["self", "relationships", "healing", "life", "wisdom", "growth"] },
    { id: "tech", label: "Tech & Governance", keywords: ["technology", "governance", "google", "information-technology"] },
    { id: "community", label: "Community & Impact", keywords: ["community", "social", "inclusion", "stories", "anime"] }
  ];

  const filteredArticles = useMemo(() => {
    if (activeCategory === "all") return articles;
    const cat = categoriesList.find(c => c.id === activeCategory);
    if (!cat || !cat.keywords) return articles;

    const matched = articles.filter(art => {
      const allText = `${art.title} ${art.categories?.join(" ") || ""} ${art.snippet}`.toLowerCase();
      return cat.keywords.some(kw => allText.includes(kw.toLowerCase()));
    });
    return matched.length > 0 ? matched : articles;
  }, [articles, activeCategory]);

  const featuredArticle = filteredArticles[0] || articles[0];
  const gridArticles = filteredArticles.slice(1);

  const mediumUrl = username?.includes('.')
    ? (username.startsWith('http') ? username : `https://${username}`)
    : `https://medium.com/${username?.startsWith('@') ? username : `@${username}`}`;

  return (
    <div className="articles-showcase-container">
      {/* Top Profile & Context Bar */}
      <div className="articles-top-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
          <div style={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '12px',
            background: '#0f172a',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)'
          }}>
            {/* Medium 3-ellipse Logo */}
            <svg width="20" height="20" viewBox="0 0 1043.63 592.71" fill="currentColor">
              <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460.03 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94" />
            </svg>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0284c7' }}>
                MEDIUM WRITINGS
              </span>
              <span style={{
                background: '#e0f2fe',
                color: '#0369a1',
                padding: '0.15rem 0.5rem',
                borderRadius: '9999px',
                fontSize: '0.65rem',
                fontWeight: 700
              }}>
                {articles.length} Stories Published
              </span>
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: '0.1rem 0 0 0' }}>
              Hilman Zahrawa on Medium
            </h3>
          </div>
        </div>

        <a
          href={mediumUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="medium-profile-capsule"
        >
          <div style={{
            width: '1.6rem',
            height: '1.6rem',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.7rem',
            fontWeight: 800
          }}>
            HZ
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0f172a' }}>
            @{username?.replace(/^@/, '') || 'hilmanzahrawa'}
          </span>
          <ArrowUpRight size={15} style={{ color: '#64748b' }} />
        </a>
      </div>

      {/* Category Filter Pills */}
      <div className="articles-filter-pills">
        {categoriesList.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`article-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
          >
            {cat.id === 'all' && <Sparkles size={14} />}
            <span>{cat.label}</span>
            {cat.id === 'all' && (
              <span style={{
                opacity: 0.75,
                fontSize: '0.7rem',
                marginLeft: '0.2rem',
                padding: '0.1rem 0.35rem',
                borderRadius: '9999px',
                background: activeCategory === 'all' ? 'rgba(255,255,255,0.2)' : '#e2e8f0'
              }}>
                {articles.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Featured Publication Hero Card */}
      {featuredArticle && (
        <motion.a
          key={`featured-${featuredArticle.link}`}
          href={featuredArticle.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="featured-story-card"
        >
          {/* Visual Half */}
          <div className="featured-story-media">
            {featuredArticle.thumbnail ? (
              <img
                src={featuredArticle.thumbnail}
                alt={featuredArticle.title}
                loading="eager"
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <BookOpen size={48} style={{ opacity: 0.4 }} />
              </div>
            )}

            {/* Gradient Vignette */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0.1) 50%, transparent 100%)',
              pointerEvents: 'none'
            }} />

            {/* Top-Left Featured Badge */}
            <div style={{
              position: 'absolute',
              top: '1.25rem',
              left: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              color: '#ffffff',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}>
              <span style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#38bdf8',
                boxShadow: '0 0 8px #38bdf8'
              }} />
              Featured Story
            </div>

            {/* Bottom-Left Meta Pills */}
            <div style={{
              position: 'absolute',
              bottom: '1.25rem',
              left: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.92)',
                color: '#0f172a',
                backdropFilter: 'blur(6px)',
                padding: '0.3rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.72rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <Calendar size={13} style={{ color: '#0284c7' }} />
                <span>{formatDate(featuredArticle.pubDate)}</span>
              </div>
              <div style={{
                background: 'rgba(15, 23, 42, 0.85)',
                color: '#e2e8f0',
                backdropFilter: 'blur(6px)',
                padding: '0.3rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.72rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <Clock size={13} style={{ color: '#38bdf8' }} />
                <span>{featuredArticle.readTime || '5 min read'}</span>
              </div>
            </div>
          </div>

          {/* Editorial Content Half */}
          <div className="featured-story-body">
            <div>
              {/* Category Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '0.75rem' }}>
                {featuredArticle.categories?.slice(0, 3).map((cat, i) => (
                  <span
                    key={i}
                    style={{
                      background: '#f1f5f9',
                      color: '#475569',
                      border: '1px solid #e2e8f0',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      textTransform: 'capitalize'
                    }}
                  >
                    #{cat}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="featured-story-headline">
                {featuredArticle.title}
              </h3>

              {/* Excerpt */}
              <p className="featured-story-snippet">
                {featuredArticle.snippet}
              </p>
            </div>

            {/* Author & Read Action */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '1.25rem',
              borderTop: '1px solid #f1f5f9'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  HZ
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    Hilman Zahrawa
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    Author on Medium
                  </div>
                </div>
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: '#0284c7',
                color: '#ffffff',
                padding: '0.55rem 1.15rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.02em',
                boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)'
              }}>
                <span>Read Story</span>
                <ArrowUpRight size={15} />
              </div>
            </div>
          </div>
        </motion.a>
      )}

      {/* Grid of Remaining Articles */}
      <div className="articles-modern-grid">
        <AnimatePresence>
          {gridArticles.map((article, index) => (
            <motion.a
              key={article.link || `art-${index}`}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="article-card-modern"
            >
              {/* Media Thumbnail */}
              <div className="article-card-thumb">
                {article.thumbnail ? (
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    loading="lazy"
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #0284c7 0%, #0f172a 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff'
                  }}>
                    <BookOpen size={32} style={{ opacity: 0.5 }} />
                  </div>
                )}

                {/* Primary Category Badge Floating on Image */}
                {article.categories && article.categories.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '0.85rem',
                    left: '0.85rem',
                    background: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(6px)',
                    color: '#ffffff',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '9999px',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'capitalize',
                    letterSpacing: '0.03em'
                  }}>
                    {article.categories[0]}
                  </div>
                )}
              </div>

              {/* Content Body */}
              <div className="article-card-content">
                <div>
                  {/* Date & Read Time */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.72rem',
                    color: '#64748b',
                    fontWeight: 600
                  }}>
                    <span>{formatDate(article.pubDate)}</span>
                    <span style={{ opacity: 0.4 }}>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={11} style={{ color: '#0284c7' }} />
                      {article.readTime || '4 min read'}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="article-card-title">
                    {article.title}
                  </h4>

                  {/* Snippet */}
                  <p className="article-card-snippet">
                    {article.snippet}
                  </p>
                </div>

                {/* Footer Action */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid #f1f5f9'
                }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#0284c7',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}>
                    Read on Medium
                    <ArrowUpRight size={14} />
                  </span>
                  <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 600 }}>
                    Medium.com
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>

      {/* Medium Hub Callout Banner */}
      <div className="medium-hub-banner">
        <div style={{ maxWidth: '640px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)'
            }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#047857' }}>
              Always Writing & Reflecting
            </span>
          </div>
          <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.4rem 0', letterSpacing: '-0.015em' }}>
            Curious about my perspectives on engineering, life & governance?
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
            I publish thoughtful essays, technical case studies, and personal reflections on Medium. Follow along to read new pieces as they drop.
          </p>
        </div>

        <a
          href={mediumUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: '#0f172a',
            color: '#ffffff',
            padding: '0.85rem 1.6rem',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            fontWeight: 700,
            textDecoration: 'none',
            letterSpacing: '0.02em',
            boxShadow: '0 8px 20px rgba(15, 23, 42, 0.15)',
            transition: 'all 0.25s ease',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 25px rgba(15, 23, 42, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(15, 23, 42, 0.15)';
          }}
        >
          <span>View All on Medium</span>
          <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  );
}
