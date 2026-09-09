'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap, Shield, Activity, Sparkles, MessageCircle, Mail } from 'lucide-react';
import { AnimeTemplate, ProjectItem } from '@/data/animeTemplates';

interface ArchetypeProps {
  template: AnimeTemplate;
  onSelectProject: (p: ProjectItem) => void;
}

export default function AsymmetricSplitLayout({ template, onSelectProject }: ArchetypeProps) {
  const { colors } = template;
  const isPng = template.bustUrl.endsWith('.png');

  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      {/* 1. ASYMMETRIC HERO */}
      <section style={{ position: 'relative', width: '100%', padding: '2rem 2rem 4rem 2rem' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '3rem', alignItems: 'center' }}>
          {/* Left 7 Columns */}
          <div style={{ gridColumn: 'span 7' }}>
            <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.15rem', borderRadius: '9999px', background: colors.badgeBg, color: colors.badgeText, fontSize: '0.82rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors.accent, boxShadow: `0 0 8px ${colors.accent}` }} />
              <span>VANGUARD DEPLOYMENT // {template.location.toUpperCase()}</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: 'clamp(3.4rem, 7vw, 6rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.96, margin: '0 0 1.5rem 0', color: '#0f172a' }}>
              {template.name}
              <span className="editorial-serif-italic" style={{ display: 'block', color: colors.accent, fontSize: '1.05em', fontWeight: 400, marginTop: '-0.1rem' }}>
                {template.roleTitle}
              </span>
            </motion.h1>

            <p style={{ fontSize: '1.15rem', lineHeight: 1.6, color: '#334155', maxWidth: '540px', margin: '0 0 2.5rem 0', fontWeight: 400 }}>
              {template.statement}
            </p>

            {/* 3 Bold Metric Blocks */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {template.stats.map((st, i) => (
                <div key={i} style={{ padding: '1.25rem', borderRadius: '18px', background: '#f8fafc', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>{st.value}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>{st.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/6285806003234?text=Hi%20${template.name},%20let's%20work!`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2.5rem',
                  borderRadius: '9999px',
                  background: colors.accent,
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.98rem',
                  textDecoration: 'none',
                  boxShadow: `0 10px 30px ${colors.accentGlow}`
                }}
              >
                <span>Deploy Assignment</span>
                <ArrowUpRight size={18} />
              </a>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ display: 'flex' }}>
                  {template.companionAvatars.map((src, i) => (
                    <img key={i} src={src} alt="Companion" style={{ width: '34px', height: '34px', borderRadius: '50%', border: '2px solid #ffffff', marginLeft: i === 0 ? 0 : '-10px', objectFit: 'cover' }} />
                  ))}
                </div>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>Vetted by Frontline Vanguard</span>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Tall Cutout with Ambient Pedestal */}
          <div style={{ gridColumn: 'span 5', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', minHeight: '560px' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '420px', height: '420px', borderRadius: '50%', background: colors.gradientHero, filter: 'blur(50px)', pointerEvents: 'none' }} />
            
            <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '420px' }}>
              <img
                src={template.bustUrl}
                alt={template.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '520px',
                  objectFit: 'contain',
                  display: 'block',
                  mixBlendMode: isPng ? 'normal' : 'multiply',
                  maskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. MASONRY PROJECT SHOWCASE (7 Cols Massive Feature + 5 Cols Stacked) */}
      <section id="works" style={{ padding: '5rem 2rem', maxWidth: '1360px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', color: colors.accent, letterSpacing: '0.08em' }}>ENGINEERED MISSIONS // 2026</span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.5rem 0 0 0', color: '#0f172a' }}>
            Operational Deployments
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2.5rem' }}>
          {/* Main Huge 7-Col Feature */}
          {template.projects[0] && (
            <motion.div
              whileHover={{ y: -8 }}
              onClick={() => onSelectProject(template.projects[0])}
              style={{
                gridColumn: 'span 7',
                borderRadius: '28px',
                background: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                padding: '3rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '460px',
                position: 'relative'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: template.projects[0].color || colors.accent }} />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', padding: '0.3rem 0.85rem', borderRadius: '9999px', background: colors.badgeBg, color: colors.badgeText }}>
                    KEY OPERATION // {template.projects[0].category}
                  </span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: colors.accent }}>{template.projects[0].metrics}</span>
                </div>
                <h3 style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>{template.projects[0].title}</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: '#475569', marginBottom: '2.5rem' }}>{template.projects[0].desc}</p>
              </div>
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {template.projects[0].tags.map((t) => (
                    <span key={t} style={{ fontSize: '0.8rem', fontWeight: 600, padding: '0.3rem 0.8rem', borderRadius: '8px', background: '#ffffff', border: '1px solid #e2e8f0', color: '#1e293b' }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: 700, color: colors.accent }}>
                  <span>Examine Blueprint</span>
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </motion.div>
          )}

          {/* Stacked 5-Col Projects */}
          <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {template.projects.slice(1, 4).map((work) => (
              <motion.div
                key={work.id}
                whileHover={{ y: -6 }}
                onClick={() => onSelectProject(work)}
                style={{
                  borderRadius: '22px',
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  padding: '1.75rem',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.02)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '130px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, color: colors.accent }}>{work.category}</span>
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#64748b' }}>{work.metrics}</span>
                  </div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.4rem 0' }}>{work.title}</h4>
                  <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>{work.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. COMBAT & CAMPAIGN TIMELINE */}
      <section id="timeline" style={{ padding: '4rem 2rem 6rem 2rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', color: colors.accent }}>CAMPAIGN ARCHIVE</span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.5rem 0 0 0', color: '#0f172a' }}>
            Historic Engagements & Milestones
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {template.experiences.map((exp, i) => (
            <div key={i} style={{ padding: '2rem', borderRadius: '20px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: '120px 1fr 2fr', gap: '2rem', alignItems: 'center' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: colors.accent }}>{exp.year}</div>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.25rem 0' }}>{exp.role}</h4>
                <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 500 }}>{exp.organization}</span>
              </div>
              <p style={{ fontSize: '0.92rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FRONT-LINE ENDORSEMENTS */}
      <section id="testimonials" style={{ padding: '4rem 2rem 6rem 2rem', maxWidth: '1360px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {template.testimonials.map((t, i) => (
            <div key={i} style={{ padding: '2rem', borderRadius: '24px', background: '#ffffff', border: '1.5px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '240px' }}>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.65, fontStyle: 'italic', color: '#334155', margin: '0 0 1.5rem 0' }}>"{t.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img src={t.avatar} alt={t.author} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${colors.accent}` }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>{t.author}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MINIMALIST FOOTER */}
      <footer style={{ padding: '2.5rem 2rem', maxWidth: '1360px', margin: '0 auto', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>© {new Date().getFullYear()} {template.name}. Built with High-Impact Resilience.</div>
        <Link href="/templates" style={{ fontSize: '0.85rem', color: colors.accent, fontWeight: 700, textDecoration: 'none' }}>
          Browse All 20 Portfolio Archetypes →
        </Link>
      </footer>
    </div>
  );
}
