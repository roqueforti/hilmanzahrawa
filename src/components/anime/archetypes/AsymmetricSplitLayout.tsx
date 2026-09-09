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
    <div style={{ position: 'relative', zIndex: 10, color: '#0f172a' }}>
      {/* 1. ASYMMETRIC HERO */}
      <section style={{ position: 'relative', width: '100%', padding: '2rem 1.5rem 4rem 1.5rem' }}>
        <div className="asym-hero-grid" style={{ maxWidth: '1360px', margin: '0 auto' }}>
          {/* Left Column (7 cols on desktop, 12 cols on mobile) */}
          <div className="asym-span-7">
            <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.15rem', borderRadius: '9999px', background: colors.badgeBg, color: colors.badgeText, fontSize: '0.82rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors.accent, boxShadow: `0 0 8px ${colors.accent}` }} />
              <span>VANGUARD DEPLOYMENT // {template.location.toUpperCase()}</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.98, margin: '0 0 1.25rem 0', color: '#0f172a' }}>
              {template.name}
              <span className="editorial-serif-italic" style={{ display: 'block', color: colors.accent, fontSize: '1.05em', fontWeight: 400, marginTop: '-0.1rem' }}>
                {template.roleTitle}
              </span>
            </motion.h1>

            <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: '#334155', maxWidth: '540px', margin: '0 0 2.5rem 0', fontWeight: 400 }}>
              {template.statement}
            </p>

            {/* 3 Bold Metric Blocks */}
            <div className="asym-metrics-grid" style={{ marginBottom: '2.5rem' }}>
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
                  padding: '0.95rem 2.5rem',
                  borderRadius: '9999px',
                  background: '#0f172a',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.25)'
                }}
              >
                <span>Initiate Assignment</span>
                <ArrowUpRight size={18} />
              </a>

              <a
                href="#works"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.95rem 2rem',
                  borderRadius: '9999px',
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  color: '#0f172a',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                <span>Directives ({template.projects.length})</span>
              </a>
            </div>
          </div>

          {/* Right Column (5 cols on desktop, 12 cols on mobile) */}
          <div className="asym-span-5" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', minHeight: '440px' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'min(450px, 90vw)', height: 'min(450px, 90vw)', borderRadius: '50%', background: colors.gradientHero, filter: 'blur(45px)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '380px' }}>
              <img
                src={template.bustUrl}
                alt={template.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '520px',
                  objectFit: 'contain',
                  mixBlendMode: isPng ? 'normal' : 'multiply',
                  maskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)'
                }}
              />
            </div>

            <div style={{ position: 'absolute', bottom: '1.5rem', right: 0, background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '0.75rem 1.25rem', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '0.75rem', zIndex: 20 }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>COMBAT READY</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Response: &lt; 15 mins</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MASONRY PROJECT SHOWCASE (Clean Aesthetic) */}
      <section id="works" style={{ padding: '4rem 1.5rem 5rem 1.5rem', maxWidth: '1360px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: colors.accent, letterSpacing: '0.08em' }}>ENGINEERED MISSIONS // 2026</span>
          <h2 style={{ fontSize: 'clamp(2.3rem, 5vw, 3.8rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.4rem 0 0 0', color: '#0f172a' }}>
            Operational Deployments
          </h2>
        </div>

        <div className="asym-works-grid">
          {/* Main Huge Feature Card (Clean Design) */}
          {template.projects[0] && (
            <motion.div
              className="asym-span-7"
              whileHover={{ y: -6, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.08)' }}
              onClick={() => onSelectProject(template.projects[0])}
              style={{
                borderRadius: '26px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                padding: '2.5rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '420px',
                position: 'relative',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                transition: 'all 0.25s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.accent }} />
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b' }}>
                      KEY OPERATION // {template.projects[0].category}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: colors.accent, background: colors.badgeBg, padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
                    {template.projects[0].metrics}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.85rem', letterSpacing: '-0.02em' }}>
                  {template.projects[0].title}
                </h3>
                <p style={{ fontSize: '1.02rem', lineHeight: 1.65, color: '#475569', marginBottom: '2rem' }}>
                  {template.projects[0].desc}
                </p>
              </div>
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.5rem' }}>
                  {template.projects[0].tags.map((t) => (
                    <span key={t} style={{ fontSize: '0.75rem', fontWeight: 500, padding: '0.25rem 0.65rem', borderRadius: '8px', background: '#f8fafc', color: '#334155' }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>Examine Blueprint</span>
                  <span style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.accent }}>
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Stacked Projects Column */}
          <div className="asym-span-5" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {template.projects.slice(1, 4).map((work) => (
              <motion.div
                key={work.id}
                whileHover={{ y: -4, boxShadow: '0 15px 30px -8px rgba(0,0,0,0.06)' }}
                onClick={() => onSelectProject(work)}
                style={{
                  borderRadius: '22px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  padding: '1.75rem',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '130px',
                  transition: 'all 0.25s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: colors.accent, letterSpacing: '0.06em' }}>{work.category}</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>{work.metrics}</span>
                  </div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.35rem 0' }}>{work.title}</h4>
                  <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>{work.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. COMBAT & CAMPAIGN TIMELINE */}
      <section id="timeline" style={{ padding: '4rem 1.5rem 5rem 1.5rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: colors.accent }}>CAMPAIGN ARCHIVE</span>
          <h2 style={{ fontSize: 'clamp(2.3rem, 5vw, 3.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.4rem 0 0 0', color: '#0f172a' }}>
            Historic Engagements & Milestones
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {template.experiences.map((exp, i) => (
            <div key={i} className="asym-timeline-row" style={{ padding: '1.75rem 2rem', borderRadius: '20px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: colors.accent }}>{exp.year}</div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.25rem 0' }}>{exp.role}</h4>
                <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 500 }}>{exp.organization}</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FRONT-LINE ENDORSEMENTS */}
      <section id="testimonials" style={{ padding: '4rem 1.5rem 5rem 1.5rem', maxWidth: '1360px', margin: '0 auto' }}>
        <div className="asym-testimonials-grid">
          {template.testimonials.map((t, i) => (
            <div key={i} style={{ padding: '2rem', borderRadius: '24px', background: '#ffffff', border: '1.5px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '230px' }}>
              <p style={{ fontSize: '1.02rem', lineHeight: 1.65, fontStyle: 'italic', color: '#334155', margin: '0 0 1.5rem 0' }}>"{t.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img src={t.avatar} alt={t.author} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${colors.accent}` }} />
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
      <footer style={{ padding: '2.5rem 1.5rem', maxWidth: '1360px', margin: '0 auto', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>© {new Date().getFullYear()} {template.name}. Built with High-Impact Resilience.</div>
        <Link href="/templates" style={{ fontSize: '0.85rem', color: colors.accent, fontWeight: 700, textDecoration: 'none' }}>
          Browse All 20 Portfolio Archetypes →
        </Link>
      </footer>
    </div>
  );
}
