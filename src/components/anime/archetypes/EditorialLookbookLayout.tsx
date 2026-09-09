'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, MessageCircle, Mail } from 'lucide-react';
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
      <section style={{ position: 'relative', width: '100%', padding: '1.5rem 1.5rem 4rem 1.5rem' }}>
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '5%',
          fontFamily: 'var(--font-serif-display)',
          fontSize: 'clamp(5rem, 14vw, 15rem)',
          fontStyle: 'italic',
          color: 'rgba(15, 23, 42, 0.02)',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0
        }}>
          N°26
        </div>

        <div className="editorial-hero-grid" style={{
          maxWidth: '1360px',
          margin: '0 auto',
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
              overflow: 'hidden',
              width: '100%'
            }}
          >
            {/* Catalog Serial Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '0.85rem',
              marginBottom: '1rem',
              borderBottom: '1px solid #f1f5f9',
              fontSize: '0.74rem',
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
              height: '380px',
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
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '0.76rem',
                fontWeight: 800,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: colors.accent
              }}>
                EDITION // {template.series.toUpperCase()}
              </span>
              <span style={{ width: '30px', height: '1px', background: '#cbd5e1' }} />
              <span style={{ fontSize: '0.76rem', color: '#94a3b8', fontStyle: 'italic' }}>
                {template.location}
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.8rem, 6vw, 5.2rem)',
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
              fontSize: '1.08rem',
              lineHeight: 1.7,
              color: '#334155',
              maxWidth: '560px',
              margin: '0 0 2rem 0',
              fontWeight: 400
            }}>
              {template.statement}
            </p>

            {/* 3 Luxury Lookbook Focus Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '2.5rem' }}>
              {template.focusPillsLeft.map((p, i) => (
                <div
                  key={i}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1.15rem',
                    borderRadius: '9999px',
                    background: '#ffffff',
                    border: `1px solid ${p.border || '#e2e8f0'}`,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: '#0f172a'
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: p.color }} />
                  <span>{p.label}</span>
                </div>
              ))}
            </div>

            {/* Companion Trust Bar & CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/6285806003234?text=Hi%20${template.name},%20requesting%20editorial%20collaboration`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.9rem 2.2rem',
                  borderRadius: '9999px',
                  background: '#0f172a',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  boxShadow: '0 12px 30px rgba(15, 23, 42, 0.22)'
                }}
              >
                <span>Request Lookbook Consultation</span>
                <ArrowUpRight size={16} />
              </a>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ display: 'flex' }}>
                  {template.companionAvatars.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Companion"
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        border: '2px solid #ffffff',
                        marginLeft: i === 0 ? 0 : '-8px',
                        objectFit: 'cover'
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Curated for elite maisons</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL LOOKBOOK CATALOG (Clean 4-Col Grid) */}
      <section id="works" style={{ padding: '4rem 1.5rem 5rem 1.5rem', maxWidth: '1360px', margin: '0 auto' }}>
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
              fontSize: '0.78rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 800,
              color: colors.accent
            }}>
              CURATED LOOKBOOK CATALOG
            </span>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 400,
              letterSpacing: '-0.025em',
              margin: '0.4rem 0 0 0',
              color: '#0f172a'
            }}>
              Selected Works <span className="editorial-serif-italic" style={{ color: colors.accent }}>2023 — 2026</span>
            </h2>
          </div>
          <p style={{
            fontSize: '0.92rem',
            color: '#64748b',
            maxWidth: '420px',
            lineHeight: 1.6,
            margin: 0
          }}>
            Haute couture systems, visual narratives, and tactical aesthetics crafted for distinctive impact.
          </p>
        </div>

        {/* Clean Lookbook Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '1.75rem'
        }}>
          {template.projects.map((work, idx) => (
            <motion.div
              key={work.id}
              whileHover={{ y: -6, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.06)' }}
              onClick={() => onSelectProject(work)}
              style={{
                borderRadius: '22px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                padding: '2rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '320px',
                boxShadow: '0 4px 18px rgba(0,0,0,0.02)',
                position: 'relative',
                transition: 'all 0.25s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span className="editorial-serif-italic" style={{ fontSize: '1.6rem', color: '#cbd5e1', fontWeight: 400 }}>
                    N° 0{idx + 1}
                  </span>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '0.2rem 0.65rem',
                    borderRadius: '9999px',
                    background: colors.badgeBg,
                    color: colors.badgeText
                  }}>
                    {work.category}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#0f172a', margin: '0 0 0.5rem 0', lineHeight: 1.35 }}>
                  {work.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
                  {work.desc}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  {work.tags.map((t) => (
                    <span key={t} style={{ fontSize: '0.74rem', padding: '0.2rem 0.6rem', borderRadius: '6px', background: '#f8fafc', color: '#334155' }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: colors.accent }}>{work.metrics}</span>
                  <span style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.accent }}>
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. ATELIER DISCIPLINES / CRAFTSMANSHIP */}
      <section id="mastery" style={{ padding: '3.5rem 1.5rem 4.5rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 800, color: colors.accent }}>
            HAUTE CRAFTSMANSHIP & DISCIPLINES
          </span>
          <h2 style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.2rem)', fontWeight: 400, letterSpacing: '-0.025em', margin: '0.4rem 0 0 0', color: '#0f172a' }}>
            Refined with <span className="editorial-serif-italic" style={{ color: colors.accent }}>Meticulous Rigor</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '1.5rem' }}>
          {template.skills.map((sk, idx) => (
            <div
              key={idx}
              style={{
                padding: '1.75rem',
                borderRadius: '20px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 18px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '190px'
              }}
            >
              <div>
                <span className="editorial-serif-italic" style={{ fontSize: '1.5rem', color: '#cbd5e1' }}>
                  0{idx + 1}
                </span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a', margin: '0.4rem 0 0.25rem 0' }}>{sk.name}</h4>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Category: {sk.category}</span>
              </div>

              <div style={{ marginTop: '1.25rem' }}>
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
      <section id="timeline" style={{ padding: '3.5rem 1.5rem 4.5rem 1.5rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div className="editorial-timeline-grid">
          <div>
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 800, color: colors.accent }}>
              ARCHIVE RETROSPECTIVE
            </span>
            <h2 style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.2rem)', fontWeight: 400, letterSpacing: '-0.025em', margin: '0.4rem 0 1.25rem 0', color: '#0f172a' }}>
              Historical <span className="editorial-serif-italic" style={{ color: colors.accent }}>Milestones</span>
            </h2>
            <p style={{ fontSize: '0.98rem', lineHeight: 1.65, color: '#475569', margin: '0 0 2rem 0' }}>
              {template.bio}
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={`https://wa.me/6285806003234?text=Hi%20${template.name}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: colors.accent, fontWeight: 600, textDecoration: 'none', fontSize: '0.88rem' }}>
                <MessageCircle size={15} />
                <span>Instant Consultation</span>
              </a>
              <a href="mailto:budiarto3788@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontWeight: 600, textDecoration: 'none', fontSize: '0.88rem' }}>
                <Mail size={15} />
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
                  fontSize: '0.92rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{exp.role}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{exp.organization}</div>
                </div>
                <div style={{ color: colors.accent, fontWeight: 700 }}>
                  {exp.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FRONT-ROW ENDORSEMENTS */}
      <section id="testimonials" style={{ padding: '3.5rem 1.5rem 5rem 1.5rem', maxWidth: '1360px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 800, color: colors.accent }}>
            CRITICAL ACCLAIM & ENDORSEMENTS
          </span>
          <h2 style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.2rem)', fontWeight: 400, letterSpacing: '-0.025em', margin: '0.4rem 0 0 0', color: '#0f172a' }}>
            Words from <span className="editorial-serif-italic" style={{ color: colors.accent }}>Front-Row Peers</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.75rem' }}>
          {template.testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                padding: '2rem',
                borderRadius: '22px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 18px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '230px'
              }}
            >
              <p style={{ fontSize: '0.98rem', lineHeight: 1.7, fontStyle: 'italic', color: '#334155', margin: '0 0 1.5rem 0' }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img
                  src={t.avatar}
                  alt={t.author}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: `2px solid ${colors.accent}`
                  }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#0f172a' }}>{t.author}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. EDITORIAL FOOTER */}
      <footer style={{ padding: '3rem 1.5rem 1rem 1.5rem', maxWidth: '1360px', margin: '0 auto', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem', paddingBottom: '2rem' }}>
          <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
            © {new Date().getFullYear()} {template.name} Lookbook Edition. Part of Anime Portfolio Collection.
          </div>
          <Link href="/templates" style={{ fontSize: '0.82rem', color: colors.accent, fontWeight: 700, textDecoration: 'none' }}>
            Explore All 20 Portfolio Archetypes →
          </Link>
        </div>

        <div style={{ textAlign: 'center', padding: '1.5rem 0 0 0', overflow: 'hidden' }}>
          <span
            className="editorial-serif-italic"
            style={{
              fontSize: 'clamp(3.5rem, 12vw, 11rem)',
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
