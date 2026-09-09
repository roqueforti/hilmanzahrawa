'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { AnimeTemplate, ProjectItem } from '@/data/animeTemplates';

interface ArchetypeProps {
  template: AnimeTemplate;
  onSelectProject: (p: ProjectItem) => void;
}

export default function ZenCenterfoldLayout({ template, onSelectProject }: ArchetypeProps) {
  const { colors } = template;
  const isPng = template.bustUrl.endsWith('.png');

  return (
    <div style={{ position: 'relative', zIndex: 10, color: '#0f172a' }}>
      {/* 1. ZEN CENTERFOLD HERO */}
      <section style={{ position: 'relative', width: '100%', padding: '2.5rem 1.25rem 4.5rem 1.25rem', textAlign: 'center' }}>
        {/* Subtle Japanese Watermark Kanji */}
        <div style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'min(200px, 26vw)',
          fontFamily: 'var(--font-serif-display)',
          fontStyle: 'italic',
          color: 'rgba(15, 23, 42, 0.025)',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0
        }}>
          {template.japaneseName}
        </div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{
            fontSize: '0.8rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#64748b',
            fontWeight: 600,
            marginBottom: '1rem'
          }}>
            • {template.location} •
          </div>

          <h1 style={{
            fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: '#0f172a',
            margin: '0 auto 1.5rem auto'
          }}>
            {template.name}{' '}
            <span className="editorial-serif-italic" style={{ color: colors.accent }}>
              {template.roleTitle}
            </span>
          </h1>

          {/* Centered Portrait with Wide Oval Aura */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '420px', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              position: 'absolute',
              top: '45%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(440px, 90vw)',
              height: 'min(340px, 70vw)',
              borderRadius: '50%',
              background: colors.gradientHero,
              filter: 'blur(40px)',
              pointerEvents: 'none'
            }} />
            <img
              src={template.bustUrl}
              alt={template.name}
              style={{
                width: '100%',
                maxHeight: '440px',
                objectFit: 'contain',
                position: 'relative',
                zIndex: 10,
                mixBlendMode: isPng ? 'normal' : 'multiply',
                maskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)'
              }}
            />
          </div>

          {/* Horizontal Companion Ribbon Pill Card (Responsive) */}
          <div className="zen-ribbon-pill" style={{
            maxWidth: '840px',
            margin: '2rem auto 0 auto',
            background: '#ffffff',
            borderRadius: '9999px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
            padding: '0.85rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
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
              <span style={{ fontSize: '0.86rem', color: '#475569', fontStyle: 'italic', maxWidth: '440px', textAlign: 'left', lineHeight: 1.45 }}>
                "{template.statement}"
              </span>
            </div>

            <a
              href={`https://wa.me/6285806003234?text=Hi%20${template.name}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.65rem 1.5rem',
                borderRadius: '9999px',
                background: '#0f172a',
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                whiteSpace: 'nowrap'
              }}
            >
              <span>Connect</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* 2. ZEN PHILOSOPHY & HARMONY STATEMENT */}
      <section id="about" style={{ padding: '3rem 1.25rem 4.5rem 1.25rem', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <span className="editorial-serif-italic" style={{ fontSize: '2rem', color: '#0f172a', display: 'block', marginBottom: '1.25rem' }}>
          Quietude & Mastery
        </span>
        <blockquote style={{
          fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)',
          fontWeight: 400,
          lineHeight: 1.4,
          letterSpacing: '-0.02em',
          color: '#0f172a',
          margin: '0 0 2rem 0'
        }}>
          {template.focusQuote.main}{' '}
          <span style={{ color: colors.accent }}>
            {template.focusQuote.highlight}
          </span>
        </blockquote>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {template.focusPillsLeft.concat(template.focusPillsRight.slice(0, 1)).map((p, idx) => (
            <div
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.45rem 1.15rem',
                borderRadius: '9999px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                fontSize: '0.82rem',
                color: '#475569',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: p.color }} />
              <span>{p.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. HORIZONTAL ZEN PROJECT SUITE (Clean Design) */}
      <section id="works" style={{ padding: '4rem 1.25rem 5rem 1.25rem', maxWidth: '1140px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.accent, fontWeight: 700 }}>
            CURATED DISCIPLINE
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 400, letterSpacing: '-0.025em', margin: '0.4rem 0 0 0', color: '#0f172a' }}>
            Selected Works & Formulations
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {template.projects.map((work, idx) => (
            <motion.div
              key={work.id}
              className="zen-work-strip"
              whileHover={{ x: 6, boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}
              onClick={() => onSelectProject(work)}
              style={{
                borderRadius: '20px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                padding: '1.75rem 2rem',
                boxShadow: '0 2px 14px rgba(0,0,0,0.02)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1.5rem',
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif-display)', fontStyle: 'italic', color: '#cbd5e1' }}>
                  0{idx + 1}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.25rem' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: colors.accent }} />
                    <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.06em' }}>
                      {work.category} // {work.subtag}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.28rem', fontWeight: 600, color: '#0f172a', margin: '0 0 0.35rem 0' }}>
                    {work.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, maxWidth: '580px', lineHeight: 1.55 }}>
                    {work.desc}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', alignSelf: 'flex-end', minWidth: 'fit-content' }}>
                {work.metrics && (
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.accent, background: colors.badgeBg, padding: '0.25rem 0.65rem', borderRadius: '9999px' }}>
                    {work.metrics}
                  </span>
                )}
                <span style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.accent }}>
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. MASTERY DISCIPLINE TILES */}
      <section id="mastery" style={{ padding: '3.5rem 1.25rem 4.5rem 1.25rem', maxWidth: '1140px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.accent, fontWeight: 700 }}>
            SURGICAL HARMONY
          </span>
          <h2 style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.2rem)', fontWeight: 400, letterSpacing: '-0.025em', margin: '0.4rem 0 0 0', color: '#0f172a' }}>
            Disciplines & Focus Ratings
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1.25rem' }}>
          {template.skills.map((s, i) => (
            <div key={i} style={{ padding: '1.5rem', borderRadius: '18px', background: '#f8fafc', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.accent, margin: '0 auto 0.75rem auto' }} />
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a', margin: '0 0 0.35rem 0' }}>{s.name}</h4>
              <div style={{ fontSize: '0.78rem', color: colors.accent, fontWeight: 700 }}>{s.level}% Purity</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. LINEAGE & TIMELINE */}
      <section id="timeline" style={{ padding: '3.5rem 1.25rem 4.5rem 1.25rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.accent, fontWeight: 700 }}>
            LINEAGE & ARCHIVE
          </span>
          <h2 style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.2rem)', fontWeight: 400, letterSpacing: '-0.025em', margin: '0.4rem 0 0 0', color: '#0f172a' }}>
            Proven Path <span className="editorial-serif-italic" style={{ color: colors.accent }}>{template.sinceYear}</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {template.experiences.map((exp, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.15rem 0',
                borderTop: '1px solid #f1f5f9',
                fontSize: '0.92rem',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}
            >
              <span style={{ fontWeight: 600, color: '#0f172a' }}>{exp.role}</span>
              <span style={{ color: '#64748b' }}>{exp.organization}</span>
              <span style={{ color: colors.accent, fontWeight: 600 }}>{exp.year}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. COMPANION TESTIMONIALS */}
      <section id="testimonials" style={{ padding: '3.5rem 1.25rem 4.5rem 1.25rem', maxWidth: '1140px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.accent, fontWeight: 700 }}>
            PEER TESTIMONIALS
          </span>
          <h2 style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.2rem)', fontWeight: 400, letterSpacing: '-0.025em', margin: '0.4rem 0 0 0', color: '#0f172a' }}>
            Quiet Trust & Endorsements
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem' }}>
          {template.testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                padding: '1.75rem',
                borderRadius: '20px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '200px'
              }}
            >
              <p style={{ fontSize: '0.94rem', lineHeight: 1.65, fontStyle: 'italic', color: '#334155', margin: '0 0 1.5rem 0' }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img
                  src={t.avatar}
                  alt={t.author}
                  style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${colors.accent}` }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0f172a' }}>{t.author}</div>
                  <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. ZEN FOOTER */}
      <footer style={{ padding: '3rem 1.25rem 1rem 1.25rem', maxWidth: '1140px', margin: '0 auto', borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingBottom: '2rem' }}>
          <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
            © {new Date().getFullYear()} {template.name} Portfolio Template. Crafted with Serene Minimalism.
          </div>
          <Link href="/templates" style={{ fontSize: '0.82rem', color: colors.accent, fontWeight: 700, textDecoration: 'none' }}>
            Browse All 20 Templates →
          </Link>
        </div>
        <div className="editorial-serif-italic" style={{ fontSize: 'clamp(3rem, 10vw, 8.5rem)', color: 'rgba(15, 23, 42, 0.04)', userSelect: 'none', lineHeight: 0.85 }}>
          {template.name}
        </div>
      </footer>
    </div>
  );
}
