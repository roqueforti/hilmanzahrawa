'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  Mail, 
  MessageCircle, 
  ExternalLink,
  Menu,
  X,
  Cpu,
  Layers,
  Star,
  Quote
} from 'lucide-react';
import { ANIME_TEMPLATES, ProjectItem } from '@/data/animeTemplates';
import AnimeAccents from '@/components/anime-accents/AnimeAccents';
import AnimeHeroStage from '@/components/anime/AnimeHeroStage';
import AnimeProjectModal from '@/components/anime/AnimeProjectModal';
import TemplateSwitcherBar from '@/components/anime/TemplateSwitcherBar';

export default function AnimeTemplateLandingPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'frieren';
  const template = ANIME_TEMPLATES[slug];

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!template) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: '#ffffff', textAlign: 'center', padding: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Template Not Found</h1>
          <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>The requested anime character template does not exist.</p>
          <Link 
            href="/templates" 
            style={{ 
              display: 'inline-flex', 
              padding: '0.75rem 1.75rem', 
              borderRadius: '9999px', 
              background: '#38bdf8', 
              color: '#0f172a', 
              fontWeight: 700, 
              textDecoration: 'none' 
            }}
          >
            Browse All 20 Templates
          </Link>
        </div>
      </div>
    );
  }

  const { colors } = template;

  return (
    <div
      style={{
        background: '#ffffff',
        color: '#0f172a',
        fontFamily: 'var(--font-sans-display)',
        minHeight: '100vh',
        overflowX: 'hidden',
        position: 'relative',
        transition: 'background-color 0.4s ease'
      }}
    >
      {/* 1. Global Top Sticky Template Switcher Bar */}
      <TemplateSwitcherBar 
        currentTemplate={template} 
        activeDevice={activeDevice}
        onDeviceChange={setActiveDevice}
      />

      {/* 2. Signature Ambient Particle Accent Engine (Renders Behind Content) */}
      <AnimeAccents 
        type={template.accentAnimationType} 
        color={colors.accent} 
        accentSecondary={colors.accentSecondary}
      />

      {/* Viewport Frame Wrapper (If tablet or mobile mode toggled) */}
      <div
        style={{
          width: activeDevice === 'desktop' ? '100%' : activeDevice === 'tablet' ? '768px' : '390px',
          margin: '0 auto',
          transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: activeDevice !== 'desktop' ? '0 0 50px rgba(0,0,0,0.18)' : 'none',
          minHeight: '100vh',
          background: '#ffffff',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* =========================================================================
           TOP NAVIGATION (Minimalist Himmel Standard)
           ========================================================================= */}
        <header
          className="landing-header"
          style={{
            padding: '2rem 2.5rem',
            maxWidth: '1380px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            zIndex: 50
          }}
        >
          {/* Character Name in Editorial Serif Italic */}
          <Link href={`/templates/${template.slug}`} style={{ textDecoration: 'none', color: '#0f172a' }}>
            <span 
              className="editorial-serif-italic landing-logo"
              style={{
                fontSize: '2.2rem',
                letterSpacing: '-0.01em',
                color: '#0f172a',
                display: 'inline-block'
              }}
            >
              {template.name}
            </span>
          </Link>

          {/* Right Navigation & Templates Store Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <Link
              href="/templates"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.55rem 1.25rem',
                borderRadius: '9999px',
                background: colors.accent,
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: `0 4px 14px ${colors.accentGlow}`,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <Sparkles size={14} />
              <span>All 20 Templates</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1.5px solid #e2e8f0',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#0f172a',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'background 0.2s'
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>

        {/* Mobile Slide-down Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="mobile-nav-dropdown"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                position: 'fixed',
                top: '85px',
                right: '2.5rem',
                background: '#ffffff',
                borderRadius: '20px',
                padding: '1.5rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                border: '1px solid #e2e8f0',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                minWidth: '220px'
              }}
            >
              <Link href="/templates" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: colors.accent, fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={16} />
                <span>All 20 Templates</span>
              </Link>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, fontSize: '0.95rem' }}>About & Philosophy</a>
              <a href="#works" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, fontSize: '0.95rem' }}>Selected Works</a>
              <a href="#mastery" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, fontSize: '0.95rem' }}>Mastery & Process</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, fontSize: '0.95rem' }}>Endorsements</a>
              <a href={`https://wa.me/6285806003234?text=Hi%20${template.name}`} onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: colors.accent, fontWeight: 600, fontSize: '0.95rem' }}>Transmission (Chat)</a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================================
           3. HERO STAGE (Seamless Himmel Structure with Studio Aura & Free Cutout)
           ========================================================================= */}
        <AnimeHeroStage template={template} />

        {/* =========================================================================
           4. "I LIKE" / FOCUS PHILOSOPHY SECTION (Exact Match to Himmel sec3_focus)
           ========================================================================= */}
        <section id="about" className="focus-section-container" style={{
          padding: '5rem 1.5rem',
          maxWidth: '1240px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative'
        }}>
          {/* Kicker Italic Serif: I like */}
          <span 
            className="editorial-serif-italic"
            style={{
              fontSize: '2.4rem',
              color: '#0f172a',
              display: 'block',
              marginBottom: '2.5rem'
            }}
          >
            I like
          </span>

          {/* 3-Column Symmetrical Layout: 3 Pills Left | Statement Center | 3 Pills Right */}
          <div className="focus-grid-layout" style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(180px, 220px) 1fr minmax(180px, 220px)',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            {/* Left Column (3 floating pill badges) */}
            <div className="focus-left-pills" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', alignItems: 'flex-start' }}>
              {template.focusPillsLeft.map((p, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.04, x: 4 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.55rem 1.25rem',
                    borderRadius: '9999px',
                    background: '#ffffff',
                    border: `1.5px solid ${p.border}`,
                    boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: '#0f172a'
                  }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color }} />
                  <span>{p.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Center Column: Exact Statement Typography */}
            <blockquote className="focus-center-quote" style={{
              fontSize: 'clamp(1.9rem, 3.8vw, 3rem)',
              fontWeight: 400,
              letterSpacing: '-0.025em',
              lineHeight: 1.25,
              color: '#0f172a',
              margin: 0,
              textAlign: 'center'
            }}>
              {template.focusQuote.main}{' '}
              <span style={{ color: '#94a3b8' }}>
                {template.focusQuote.highlight}
              </span>
            </blockquote>

            {/* Right Column (3 floating pill badges) */}
            <div className="focus-right-pills" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', alignItems: 'flex-end' }}>
              {template.focusPillsRight.map((p, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.04, x: -4 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.55rem 1.25rem',
                    borderRadius: '9999px',
                    background: '#ffffff',
                    border: `1.5px solid ${p.border}`,
                    boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: '#0f172a'
                  }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color }} />
                  <span>{p.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
           5. SELECTED WORKS (2x2 Grid Matching Himmel Standard)
           ========================================================================= */}
        <section id="works" style={{
          padding: '4rem 1.5rem 6rem 1.5rem',
          maxWidth: '1280px',
          margin: '0 auto'
        }}>
          {/* Header Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}>
            <div>
              <span className="editorial-kicker">
                ( 2/2 ) Curated Works
              </span>
              <h2 style={{
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                fontWeight: 500,
                letterSpacing: '-0.025em',
                margin: 0,
                color: '#0f172a'
              }}>
                Selected Works
                <span className="editorial-serif-italic" style={{ marginLeft: '0.6rem', color: colors.accent }}>
                  2021 — 2026
                </span>
              </h2>
            </div>
            <p style={{
              fontSize: '0.95rem',
              color: '#64748b',
              maxWidth: '380px',
              lineHeight: 1.6,
              margin: 0
            }}>
              A curated selection of mission architectures, high-performance systems, and battle-tested deployments.
            </p>
          </div>

          {/* 2x2 Showcase Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem'
          }}>
            {template.projects.map((work) => (
              <motion.div
                key={work.id}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(work)}
                style={{
                  borderRadius: '24px',
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  padding: '2rem',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '340px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
              >
                {/* Accent Top Bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: work.color || colors.accent }} />

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        background: colors.badgeBg,
                        color: colors.badgeText,
                      }}
                    >
                      {work.category}
                    </span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: colors.accent }}>
                      {work.metrics}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.45rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                    {work.title}
                  </h3>

                  <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#475569', marginBottom: '1.5rem' }}>
                    {work.desc}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                    {work.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          padding: '0.2rem 0.65rem',
                          borderRadius: '6px',
                          background: '#ffffff',
                          border: '1px solid #e2e8f0',
                          color: '#334155'
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: colors.accent }}>
                    <span>Inspect Case Study</span>
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* =========================================================================
           6. MASTERY / PROCESS (Clean Numbered Steps matching Himmel Standard)
           ========================================================================= */}
        <section id="mastery" style={{
          padding: '5rem 1.5rem',
          maxWidth: '1240px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="editorial-kicker">
              / Mastery & Approach /
            </span>
            <h2 style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 500,
              letterSpacing: '-0.025em',
              margin: 0,
              color: '#0f172a'
            }}>
              Engineered with <span className="editorial-serif-italic" style={{ color: colors.accent }}>Surgical Precision</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem'
          }}>
            {template.skills.map((skill, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                style={{
                  padding: '2rem',
                  borderRadius: '24px',
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '220px'
                }}
              >
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 400, color: '#cbd5e1', marginBottom: '1rem', fontFamily: 'var(--font-serif-display)', fontStyle: 'italic' }}>
                    0{idx + 1}
                  </div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                    {skill.name}
                  </h4>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>
                    Category: {skill.category}
                  </span>
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: '#475569' }}>
                    <span>Efficiency Rating</span>
                    <span style={{ color: colors.accent }}>{skill.level}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: '#f1f5f9', overflow: 'hidden' }}>
                    <div style={{ width: `${skill.level}%`, height: '100%', background: colors.accent, borderRadius: '3px' }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* =========================================================================
           7. ABOUT & TIMELINE (Exact Match to Himmel sec6_about)
           ========================================================================= */}
        <section id="timeline" style={{
          padding: '5rem 1.5rem',
          maxWidth: '1240px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="editorial-kicker">
              / Proven Pedigree /
            </span>
            <h2 style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 500,
              letterSpacing: '-0.025em',
              margin: 0,
              color: '#0f172a'
            }}>
              Pushing Boundaries <span style={{ fontWeight: 300, color: '#94a3b8' }}>{template.sinceYear}</span>
            </h2>
          </div>

          <div 
            className="about-2col"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
              gap: '3.5rem',
              alignItems: 'center'
            }}
          >
            {/* Left: Dark Portrait Card Matching Himmel */}
            <div 
              className="about-portrait-card" 
              style={{
                background: '#0f172a',
                borderRadius: '24px',
                padding: '1.75rem',
                color: '#ffffff',
                boxShadow: '0 20px 50px rgba(15, 23, 42, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '380px'
              }}
            >
              <div 
                className="about-portrait-img-wrap" 
                style={{
                  width: '100%',
                  height: '260px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: '#1e293b',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img 
                  src={template.bustUrl} 
                  alt={template.name}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    objectPosition: 'center 15%' 
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                    {template.name}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    {template.roleTitle}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem' }}>
                  <a href={`https://wa.me/6285806003234?text=Hi%20${template.name}`} target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8' }}>
                    <MessageCircle size={17} />
                  </a>
                  <a href="mailto:budiarto3788@gmail.com" style={{ color: '#94a3b8' }}>
                    <Mail size={17} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Paragraph + Minimal Experience Rows */}
            <div>
              <p style={{
                fontSize: '1.05rem',
                color: '#334155',
                lineHeight: 1.65,
                fontWeight: 400,
                margin: '0 0 2.5rem 0'
              }}>
                {template.bio}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {template.experiences.map((exp, i) => (
                  <div 
                    key={i} 
                    className="about-exp-row"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1.15rem 0',
                      borderTop: '1px solid #f1f5f9',
                      fontSize: '0.9rem'
                    }}
                  >
                    <span className="about-exp-role" style={{ fontWeight: 600, color: '#0f172a', flex: '1 1 35%' }}>{exp.role}</span>
                    <div className="about-exp-company-period" style={{ display: 'contents' }}>
                      <span style={{ color: '#64748b', flex: '1 1 35%' }}>{exp.organization}</span>
                      <span style={{ color: '#94a3b8', textAlign: 'right', flex: '1 1 30%' }}>{exp.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
           8. COMPANION ENDORSEMENTS / TESTIMONIALS
           ========================================================================= */}
        <section id="testimonials" style={{
          padding: '5rem 1.5rem',
          maxWidth: '1240px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="editorial-kicker">
              / Peer Endorsements /
            </span>
            <h2 style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 500,
              letterSpacing: '-0.025em',
              margin: 0,
              color: '#0f172a'
            }}>
              Endorsements from <span className="editorial-serif-italic" style={{ color: colors.accent }}>Companions</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {template.testimonials.map((t, i) => (
              <div
                key={i}
                style={{
                  padding: '2rem',
                  borderRadius: '24px',
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '260px'
                }}
              >
                <p style={{
                  fontSize: '1rem',
                  lineHeight: 1.65,
                  fontStyle: 'italic',
                  color: '#334155',
                  marginBottom: '2rem'
                }}>
                  "{t.quote}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <img
                    src={t.avatar}
                    alt={t.author}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: `2px solid ${colors.accent}`,
                      background: '#f1f5f9'
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#0f172a' }}>{t.author}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
           9. CTA BANNER (Radiant Sky-Blue Container Matching Himmel)
           ========================================================================= */}
        <section className="cta-banner-wrapper" style={{
          padding: '3rem 1.5rem 5rem 1.5rem',
          maxWidth: '1380px',
          margin: '0 auto'
        }}>
          <div className="cta-banner-box" style={{
            borderRadius: '36px',
            padding: '5rem 2rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: colors.gradientHero,
            border: '1.5px solid #e2e8f0',
            boxShadow: `0 30px 60px -15px ${colors.accentGlow}`
          }}>
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 className="cta-headline" style={{
                fontSize: 'clamp(2.8rem, 6.5vw, 4.8rem)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                margin: 0,
                color: '#0f172a',
                lineHeight: 1.05
              }}>
                Let’s Make It Happen
              </h2>

              <p style={{
                fontSize: '1rem',
                color: '#334155',
                maxWidth: '560px',
                marginTop: '1.25rem',
                marginBottom: '2.5rem',
                lineHeight: 1.55,
                fontWeight: 400
              }}>
                always open for new opportunities, collaborations, and creative challenges. Let's work together to bring your ideas to life.
              </p>

              <a
                href={`https://wa.me/6285806003234?text=Hi%20${template.name},%20let's%20make%20it%20happen!`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 2.2rem',
                  borderRadius: '9999px',
                  background: '#0f172a',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textDecoration: 'none',
                  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.25)',
                  transition: 'transform 0.2s'
                }}
              >
                ✦ DROP A LINE
              </a>
            </div>
          </div>
        </section>

        {/* =========================================================================
           10. FOOTER NAVIGATION & MASSIVE DISPLAY WATERMARK NAME
           ========================================================================= */}
        <footer style={{
          padding: '2.5rem 1.5rem 0 1.5rem',
          maxWidth: '1380px',
          margin: '0 auto',
          overflow: 'hidden'
        }}>
          <div className="footer-nav-row" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid #f1f5f9'
          }}>
            <div className="footer-links-wrap" style={{ display: 'flex', gap: '2rem' }}>
              <Link href={`/templates/${template.slug}`} style={{ color: '#0f172a', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>Home</Link>
              <a href="#about" style={{ color: '#64748b', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>About</a>
              <a href="#works" style={{ color: '#64748b', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>Portfolio</a>
              <a href="#testimonials" style={{ color: '#64748b', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>Endorsements</a>
            </div>

            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              © {new Date().getFullYear()} {template.name} Portfolio Template. Part of Anime Portfolio Collection.
            </span>

            <Link 
              href="/templates" 
              style={{ 
                fontSize: '0.82rem', 
                color: colors.accent, 
                textDecoration: 'none', 
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Sparkles size={13} />
              <span>Explore All 20 Templates →</span>
            </Link>
          </div>

          {/* Massive Display Watermark Name Spanning Bottom Edge */}
          <div className="footer-watermark-wrap" style={{
            textAlign: 'center',
            padding: '2.5rem 0 0 0',
            userSelect: 'none',
            pointerEvents: 'none',
            overflow: 'hidden',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <span 
              className="editorial-serif-italic footer-watermark-text"
              style={{
                fontSize: 'clamp(4.2rem, 13vw, 13.5rem)',
                lineHeight: 0.85,
                color: '#0f172a',
                display: 'inline-block',
                whiteSpace: 'nowrap',
                letterSpacing: '-0.02em',
                fontWeight: 400
              }}
            >
              {template.name}
            </span>
          </div>
        </footer>
      </div>

      {/* Project Detail Modal Overlay */}
      <AnimeProjectModal
        project={selectedProject}
        colors={colors}
        characterName={template.name}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
