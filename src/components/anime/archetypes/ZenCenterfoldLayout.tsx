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

export default function ZenCenterfoldLayout({ template, onSelectProject }: ArchetypeProps) {
  const { colors } = template;
  const isPng = template.bustUrl.endsWith('.png');

  return (
    <div style={{ position: 'relative', zIndex: 10, color: '#0f172a' }}>
      {/* 1. ZEN CENTERFOLD HERO */}
      <section style={{ position: 'relative', width: '100%', padding: '2.5rem 1.5rem 5rem 1.5rem', textAlign: 'center' }}>
        {/* Subtle Japanese Watermark Kanji */}
        <div style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'min(220px, 28vw)',
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
            fontSize: '0.82rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#64748b',
            fontWeight: 600,
            marginBottom: '1rem'
          }}>
            • {template.location} •
          </div>

          <h1 style={{
            fontSize: 'clamp(3.2rem, 7vw, 5.8rem)',
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
          <div style={{ position: 'relative', width: '100%', maxWidth: '440px', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              position: 'absolute',
              top: '45%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '480px',
              height: '340px',
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
                maxHeight: '460px',
                objectFit: 'contain',
                position: 'relative',
                zIndex: 10,
                mixBlendMode: isPng ? 'normal' : 'multiply',
                maskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)'
              }}
            />
          </div>

          {/* Horizontal Companion Ribbon Pill Card */}
          <div style={{
            maxWidth: '840px',
            margin: '2rem auto 0 auto',
            background: '#ffffff',
            borderRadius: '9999px',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
            padding: '0.85rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
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
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      border: '2px solid #ffffff',
                      marginLeft: i === 0 ? 0 : '-8px',
                      objectFit: 'cover'
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: '0.88rem', color: '#475569', fontStyle: 'italic', maxWidth: '440px', textAlign: 'left', lineHeight: 1.45 }}>
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
                padding: '0.65rem 1.6rem',
                borderRadius: '9999px',
                background: '#0f172a',
                color: '#ffffff',
                fontSize: '0.88rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              <span>Connect</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* 2. ZEN PHILOSOPHY & HARMONY STATEMENT */}
      <section id="about" style={{ padding: '3rem 1.5rem 5rem 1.5rem', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <span className="editorial-serif-italic" style={{ fontSize: '2.2rem', color: '#0f172a', display: 'block', marginBottom: '1.5rem' }}>
          Quietude & Mastery
        </span>
        <blockquote style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
          fontWeight: 400,
          lineHeight: 1.35,
          letterSpacing: '-0.02em',
          color: '#0f172a',
          margin: '0 0 2rem 0'
        }}>
          {template.focusQuote.main}{' '}
          <span style={{ color: colors.accent }}>
            {template.focusQuote.highlight}
          </span>
        </blockquote>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {template.focusPillsLeft.concat(template.focusPillsRight.slice(0, 1)).map((p, idx) => (
            <div
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                fontSize: '0.85rem',
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

      {/* 3. HORIZONTAL ZEN PROJECT SUITE */}
      <section id="works" style={{ padding: '4rem 1.5rem 6rem 1.5rem', maxWidth: '1140px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ fontSize: '0.82rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.accent, fontWeight: 700 }}>
            CURATED DISCIPLINE
          </span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 400, letterSpacing: '-0.025em', margin: '0.5rem 0 0 0', color: '#0f172a' }}>
            Selected Works & Formulations
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {template.projects.map((work, idx) => (
            <motion.div
              key={work.id}
              whileHover={{ x: 8 }}
              onClick={() => onSelectProject(work)}
              style={{
                borderRadius: '20px',
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                padding: '2rem 2.5rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                <div style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif-display)', fontStyle: 'italic', color: '#cbd5e1' }}>
                  0{idx + 1}
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: colors.accent, fontWeight: 700, marginBottom: '0.25rem' }}>
                    {work.category} // {work.subtag}
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#0f172a', margin: '0 0 0.4rem 0' }}>
                    {work.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, maxWidth: '580px', lineHeight: 1.55 }}>
                    {work.desc}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0f172a' }}>{work.metrics}</span>
                <span style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.accent }}>
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. MASTERY DISCIPLINE TILES */}
      <section id="mastery" style={{ padding: '4rem 1.5rem 5rem 1.5rem', maxWidth: '1140px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.accent, fontWeight: 700 }}>
            SURGICAL HARMONY
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 400, letterSpacing: '-0.025em', margin: '0.4rem 0 0 0', color: '#0f172a' }}>
            Disciplines & Focus Ratings
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {template.skills.map((s, i) => (
            <div key={i} style={{ padding: '1.75rem', borderRadius: '20px', background: '#f8fafc', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors.accent, margin: '0 auto 1rem auto' }} />
              <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#0f172a', margin: '0 0 0.5rem 0' }}>{s.name}</h4>
              <div style={{ fontSize: '0.8rem', color: colors.accent, fontWeight: 700 }}>{s.level}% Purity</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. LINEAGE & TIMELINE */}
      <section id="timeline" style={{ padding: '4rem 1.5rem 5rem 1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.accent, fontWeight: 700 }}>
            LINEAGE & ARCHIVE
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 400, letterSpacing: '-0.025em', margin: '0.4rem 0 0 0', color: '#0f172a' }}>
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
                padding: '1.35rem 0',
                borderTop: '1px solid #f1f5f9',
                fontSize: '0.95rem'
              }}
            >
              <div style={{ flex: '1 1 35%' }}>
                <span style={{ fontWeight: 600, color: '#0f172a' }}>{exp.role}</span>
              </div>
              <div style={{ flex: '1 1 35%', color: '#64748b' }}>
                {exp.organization}
              </div>
              <div style={{ flex: '1 1 30%', textAlign: 'right', color: colors.accent, fontWeight: 600 }}>
                {exp.year}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. COMPANION TESTIMONIALS */}
      <section id="testimonials" style={{ padding: '4rem 1.5rem 5rem 1.5rem', maxWidth: '1140px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.accent, fontWeight: 700 }}>
            PEER TESTIMONIALS
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 400, letterSpacing: '-0.025em', margin: '0.4rem 0 0 0', color: '#0f172a' }}>
            Quiet Trust & Endorsements
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {template.testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                padding: '2rem',
                borderRadius: '20px',
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '220px'
              }}
            >
              <p style={{ fontSize: '0.95rem', lineHeight: 1.65, fontStyle: 'italic', color: '#334155', margin: '0 0 1.5rem 0' }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img
                  src={t.avatar}
                  alt={t.author}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${colors.accent}` }}
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

      {/* 7. ZEN FOOTER */}
      <footer style={{ padding: '3rem 1.5rem 1rem 1.5rem', maxWidth: '1140px', margin: '0 auto', borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingBottom: '2rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            © {new Date().getFullYear()} {template.name} Portfolio Template. Crafted with Serene Minimalism.
          </div>
          <Link href="/templates" style={{ fontSize: '0.85rem', color: colors.accent, fontWeight: 700, textDecoration: 'none' }}>
            Browse All 20 Templates →
          </Link>
        </div>
        <div className="editorial-serif-italic" style={{ fontSize: 'clamp(3.5rem, 10vw, 8.5rem)', color: 'rgba(15, 23, 42, 0.04)', userSelect: 'none', lineHeight: 0.85 }}>
          {template.name}
        </div>
      </footer>
    </div>
  );
}
