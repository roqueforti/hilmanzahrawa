'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, MessageCircle, Mail, Bookmark, Compass } from 'lucide-react';
import { AnimeTemplate, ProjectItem } from '@/data/animeTemplates';

interface ArchetypeProps {
  template: AnimeTemplate;
  onSelectProject: (p: ProjectItem) => void;
}

export default function EditorialLookbookLayout({ template, onSelectProject }: ArchetypeProps) {
  const { colors } = template;
  const isPng = template.bustUrl.endsWith('.png');

  return (
    <div style={{ position: 'relative', zIndex: 10, color: '#0f172a' }}>
      {/* 1. EDITORIAL LOOKBOOK HERO */}
      <section style={{ position: 'relative', width: '100%', padding: '1.5rem 2rem 4.5rem 2rem' }}>
        {/* Subtle background magazine issue imprint watermark */}
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '5%',
          fontFamily: 'var(--font-serif-display)',
          fontSize: 'clamp(6rem, 14vw, 15rem)',
          fontStyle: 'italic',
          color: 'rgba(15, 23, 42, 0.02)',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0
        }}>
          N°26
        </div>

        <div style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 460px) 1fr',
          gap: '3.5rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10
        }}>
          {/* Left: Framed High-Fashion Archival Figure Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              borderRadius: '24px',
              background: '#ffffff',
              border: `1.5px solid ${colors.borderSubtle || '#e2e8f0'}`,
              padding: '1.5rem',
              boxShadow: `0 25px 60px -15px ${colors.accentGlow || 'rgba(0,0,0,0.08)'}`,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Catalog Serial Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '1rem',
              marginBottom: '1rem',
              borderBottom: '1px solid #f1f5f9',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#64748b'
            }}>
              <span>FIGURE N° 01 // ARCHIVE</span>
              <span style={{ color: colors.accent }}>{template.japaneseName}</span>
            </div>

            {/* Framed Image Container */}
            <div style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#f8fafc',
              height: '420px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: colors.gradientHero,
                opacity: 0.65,
                pointerEvents: 'none'
              }} />
              <img
                src={template.bustUrl}
                alt={template.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                  position: 'relative',
                  zIndex: 2,
                  mixBlendMode: isPng ? 'normal' : 'multiply'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                background: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(8px)',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                zIndex: 10
              }}>
                REF: #{template.slug.toUpperCase()}-2026
              </div>
            </div>

            {/* Bottom Card Specifications */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
              marginTop: '1.25rem',
              textAlign: 'center'
            }}>
              {template.stats.map((st, i) => (
                <div key={i} style={{ padding: '0.65rem 0.4rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>{st.value}</div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>{st.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Editorial Narrative & Haute Couture Typography */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: colors.accent
              }}>
                EDITION // {template.series.toUpperCase()}
              </span>
              <span style={{ width: '40px', height: '1px', background: '#cbd5e1' }} />
              <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontStyle: 'italic' }}>
                {template.location}
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(3.2rem, 6.5vw, 5.6rem)',
              fontWeight: 400,
              letterSpacing: '-0.035em',
              lineHeight: 1.02,
              margin: '0 0 1.25rem 0',
              color: '#0f172a'
            }}>
              {template.name}
              <span 
                className="editorial-serif-italic" 
                style={{
                  display: 'block',
                  color: colors.accent,
                  fontSize: '1.05em',
                  fontWeight: 400,
                  marginTop: '0.1rem'
                }}
              >
                {template.roleTitle}
              </span>
            </h1>

            <p style={{
              fontSize: '1.12rem',
              lineHeight: 1.7,
              color: '#334155',
              maxWidth: '560px',
              margin: '0 0 2rem 0',
              fontWeight: 400
            }}>
              {template.statement}
            </p>

            {/* 3 Luxury Lookbook Focus Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem' }}>
              {template.focusPillsLeft.map((p, i) => (
                <div
                  key={i}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.55rem 1.2rem',
                    borderRadius: '9999px',
                    background: '#ffffff',
                    border: `1.5px solid ${p.border || '#e2e8f0'}`,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#0f172a'
                  }}
                >
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: p.color }} />
                  <span>{p.label}</span>
                </div>
              ))}
            </div>

            {/* Companion Trust Bar & CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/6285806003234?text=Hi%20${template.name},%20requesting%20editorial%20collaboration`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.95rem 2.25rem',
                  borderRadius: '9999px',
                  background: '#0f172a',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  boxShadow: '0 12px 30px rgba(15, 23, 42, 0.22)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <span>Request Lookbook Consultation</span>
                <ArrowUpRight size={16} />
              </a>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ display: 'flex' }}>
                  {template.companionAvatars.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Companion"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '2px solid #ffffff',
                        marginLeft: i === 0 ? 0 : '-8px',
                        objectFit: 'cover'
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Curated for elite maisons</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL LOOKBOOK CATALOG (4-COLUMN GALLERY GRID) */}
      <section id="works" style={{ padding: '4rem 2rem 6rem 2rem', maxWidth: '1360px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '3rem',
          flexWrap: 'wrap',
          gap: '1.5rem',
          borderBottom: '1px solid #f1f5f9',
          paddingBottom: '1.5rem'
        }}>
          <div>
            <span style={{
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 800,
              color: colors.accent
            }}>
              CURATED LOOKBOOK CATALOG
            </span>
            <h2 style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
              fontWeight: 400,
              letterSpacing: '-0.025em',
              margin: '0.4rem 0 0 0',
              color: '#0f172a'
            }}>
              Selected Works <span className="editorial-serif-italic" style={{ color: colors.accent }}>2023 — 2026</span>
            </h2>
          </div>
          <p style={{
            fontSize: '0.95rem',
            color: '#64748b',
            maxWidth: '420px',
            lineHeight: 1.6,
            margin: 0
          }}>
            Haute couture systems, visual narratives, and tactical aesthetics crafted for distinctive impact.
          </p>
        </div>

        {/* 4-Column Lookbook Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {template.projects.map((work, idx) => (
            <motion.div
              key={work.id}
              whileHover={{ y: -8 }}
              onClick={() => onSelectProject(work)}
              style={{
                borderRadius: '20px',
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                padding: '2rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '340px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                position: 'relative'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: '2rem', right: '2rem', height: '3px', background: work.color || colors.accent }} />

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span className="editorial-serif-italic" style={{ fontSize: '1.8rem', color: '#cbd5e1', fontWeight: 400 }}>
                    N° 0{idx + 1}
                  </span>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    background: colors.badgeBg,
                    color: colors.badgeText
                  }}>
                    {work.category}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: '#0f172a', margin: '0 0 0.6rem 0', lineHeight: 1.3 }}>
                  {work.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
                  {work.desc}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  {work.tags.map((t) => (
                    <span key={t} style={{ fontSize: '0.74rem', padding: '0.2rem 0.6rem', borderRadius: '6px', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#334155' }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', fontWeight: 600 }}>
                  <span style={{ color: colors.accent }}>{work.metrics}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#0f172a' }}>
                    <span>View Atelier File</span>
                    <ArrowUpRight size={15} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. ATELIER DISCIPLINES / CRAFTSMANSHIP */}
      <section id="mastery" style={{ padding: '4rem 2rem 5rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 800, color: colors.accent }}>
            HAUTE CRAFTSMANSHIP & DISCIPLINES
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 400, letterSpacing: '-0.025em', margin: '0.4rem 0 0 0', color: '#0f172a' }}>
            Refined with <span className="editorial-serif-italic" style={{ color: colors.accent }}>Meticulous Rigor</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.75rem' }}>
          {template.skills.map((sk, idx) => (
            <div
              key={idx}
              style={{
                padding: '2rem',
                borderRadius: '20px',
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 6px 20px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '200px'
              }}
            >
              <div>
                <span className="editorial-serif-italic" style={{ fontSize: '1.6rem', color: '#cbd5e1' }}>
                  0{idx + 1}
                </span>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#0f172a', margin: '0.5rem 0 0.3rem 0' }}>{sk.name}</h4>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Category: {sk.category}</span>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  <span style={{ color: '#475569' }}>Standard Rating</span>
                  <span style={{ color: colors.accent }}>{sk.level}%</span>
                </div>
                <div style={{ width: '100%', height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${sk.level}%`, height: '100%', background: colors.accent, borderRadius: '2px' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PROVEN RUNWAYS & RETROSPECTIVE (TIMELINE) */}
      <section id="timeline" style={{ padding: '4rem 2rem 5rem 2rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
          gap: '3.5rem',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 800, color: colors.accent }}>
              ARCHIVE RETROSPECTIVE
            </span>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 400, letterSpacing: '-0.025em', margin: '0.5rem 0 1.5rem 0', color: '#0f172a' }}>
              Historical <span className="editorial-serif-italic" style={{ color: colors.accent }}>Milestones</span>
            </h2>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.65, color: '#475569', margin: '0 0 2rem 0' }}>
              {template.bio}
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href={`https://wa.me/6285806003234?text=Hi%20${template.name}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: colors.accent, fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>
                <MessageCircle size={16} />
                <span>Instant Consultation</span>
              </a>
              <a href="mailto:budiarto3788@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>
                <Mail size={16} />
                <span>Private Correspondence</span>
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {template.experiences.map((exp, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1.25rem 0',
                  borderTop: '1px solid #f1f5f9',
                  fontSize: '0.92rem'
                }}
              >
                <div style={{ flex: '1 1 40%' }}>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{exp.role}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{exp.organization}</div>
                </div>
                <div style={{ color: colors.accent, fontWeight: 700, textAlign: 'right', flex: '1 1 20%' }}>
                  {exp.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FRONT-ROW ENDORSEMENTS */}
      <section id="testimonials" style={{ padding: '4rem 2rem 6rem 2rem', maxWidth: '1360px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 800, color: colors.accent }}>
            CRITICAL ACCLAIM & ENDORSEMENTS
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 400, letterSpacing: '-0.025em', margin: '0.4rem 0 0 0', color: '#0f172a' }}>
            Words from <span className="editorial-serif-italic" style={{ color: colors.accent }}>Front-Row Peers</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {template.testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                padding: '2.25rem',
                borderRadius: '24px',
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 8px 24px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '260px'
              }}
            >
              <p style={{ fontSize: '1.02rem', lineHeight: 1.7, fontStyle: 'italic', color: '#334155', margin: '0 0 2rem 0' }}>
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
                    border: `2px solid ${colors.accent}`
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

      {/* 6. EDITORIAL FOOTER */}
      <footer style={{ padding: '3rem 2rem 1rem 2rem', maxWidth: '1360px', margin: '0 auto', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', paddingBottom: '2.5rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
            © {new Date().getFullYear()} {template.name} Lookbook Edition. Part of Anime Portfolio Collection.
          </div>
          <Link href="/templates" style={{ fontSize: '0.85rem', color: colors.accent, fontWeight: 700, textDecoration: 'none' }}>
            Explore All 20 Portfolio Archetypes →
          </Link>
        </div>

        <div style={{ textAlign: 'center', padding: '2rem 0 0 0', overflow: 'hidden' }}>
          <span
            className="editorial-serif-italic"
            style={{
              fontSize: 'clamp(4rem, 12vw, 12rem)',
              lineHeight: 0.85,
              color: 'rgba(15, 23, 42, 0.05)',
              display: 'inline-block',
              whiteSpace: 'nowrap',
              letterSpacing: '-0.02em',
              fontWeight: 400,
              userSelect: 'none'
            }}
          >
            {template.name}
          </span>
        </div>
      </footer>
    </div>
  );
}
