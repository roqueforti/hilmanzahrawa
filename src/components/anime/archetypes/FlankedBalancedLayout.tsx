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

export default function FlankedBalancedLayout({ template, onSelectProject }: ArchetypeProps) {
  const { colors } = template;
  const isPng = template.bustUrl.endsWith('.png');

  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      {/* 1. HERO STAGE */}
      <section style={{ position: 'relative', width: '100%', padding: '1.5rem 1.5rem 3.5rem 1.5rem' }}>
        <div style={{ maxWidth: '1380px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', color: '#475569', fontWeight: 500, letterSpacing: '0.02em', marginBottom: '0.85rem' }}>
            <span>( 1/1 ) {template.location}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: 'clamp(3.5rem, 7.5vw, 6.2rem)', fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 0.98, margin: 0, color: '#0f172a' }}>
            Hi I'm {template.name}
            <span className="editorial-serif-italic" style={{ display: 'block', fontSize: '1.22em', fontWeight: 400, color: '#0f172a', marginTop: '-0.15rem' }}>
              {template.roleTitle}
            </span>
          </motion.h1>

          <div className="hero-stage-container">
            <div style={{ position: 'absolute', top: '42%', left: '50%', transform: 'translate(-50%, -50%)', width: 'min(960px, 95vw)', height: 'min(580px, 80vw)', background: colors.gradientHero, filter: 'blur(35px)', pointerEvents: 'none', zIndex: 1, borderRadius: '50%' }} />

            {/* Left Flank */}
            <div className="hero-flank-left">
              <motion.div className="hero-badge-available" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', padding: '0.65rem 1.35rem', borderRadius: '9999px', background: '#ffffff', border: '1.5px solid #e2e8f0', boxShadow: `0 8px 24px ${colors.accentGlow}, 0 2px 6px rgba(0,0,0,0.03)`, fontSize: '0.875rem', fontWeight: 500, color: '#0f172a', width: 'fit-content', marginTop: '3.75rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors.accent, boxShadow: `0 0 10px ${colors.accent}` }} />
                <span>Available for missions & roles</span>
              </motion.div>

              <motion.div className="hero-trusted-avatars" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ display: 'flex' }}>
                  {template.companionAvatars.map((src, i) => (
                    <img key={i} src={src} alt="Companion" style={{ width: '34px', height: '34px', borderRadius: '50%', border: '2px solid #ffffff', marginLeft: i === 0 ? 0 : '-10px', objectFit: 'cover', background: '#f1f5f9' }} />
                  ))}
                </div>
                <span style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.45, fontWeight: 400 }}>{template.companionTrustText}</span>
              </motion.div>
            </div>

            {/* Center Cutout */}
            <div className="hero-portrait-wrap">
              <img src={template.bustUrl} alt={template.name} className="hero-portrait-img" style={{ mixBlendMode: isPng ? 'normal' : 'multiply' }} />
            </div>

            {/* Right Flank */}
            <div className="hero-flank-right">
              <motion.p className="hero-statement-right" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ fontSize: '0.98rem', lineHeight: 1.55, color: '#334155', fontWeight: 400, margin: 0, maxWidth: '280px', marginTop: '3.75rem' }}>
                {template.statement}
              </motion.p>
              <motion.a className="hero-cta-btn" href={`https://wa.me/6285806003234?text=Hi%20${template.name}`} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.85rem 2rem', borderRadius: '9999px', background: '#0f172a', color: '#ffffff', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none', boxShadow: '0 10px 25px rgba(15, 23, 42, 0.2)', width: 'fit-content' }}>
                {template.ctaText || "Let's Talk"} <ArrowUpRight size={16} />
              </motion.a>
            </div>
          </div>

          {/* Marquee Partner Logos */}
          <div className="hero-marquee-strip" style={{ width: '100%', maxWidth: '1100px', margin: '2.5rem auto 0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'nowrap', overflowX: 'auto', gap: '2.5rem', opacity: 0.65, zIndex: 10, scrollbarWidth: 'none' }}>
            {template.brandPartners.map((b, i) => (
              <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: 500, color: '#64748b', whiteSpace: 'nowrap' }}>
                <span style={{ color: colors.accent, fontSize: '1.1rem' }}>{b.icon}</span>
                <span>{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. "I LIKE" 3-COLUMN FOCUS */}
      <section id="about" className="focus-section-container" style={{ padding: '5rem 1.5rem', maxWidth: '1240px', margin: '0 auto', textAlign: 'center' }}>
        <span className="editorial-serif-italic" style={{ fontSize: '2.4rem', color: '#0f172a', display: 'block', marginBottom: '2.5rem' }}>I like</span>
        <div className="focus-grid-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(180px, 220px) 1fr minmax(180px, 220px)', gap: '2.5rem', alignItems: 'center' }}>
          <div className="focus-left-pills" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', alignItems: 'flex-start' }}>
            {template.focusPillsLeft.map((p, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.04, x: 4 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', padding: '0.55rem 1.25rem', borderRadius: '9999px', background: '#ffffff', border: `1.5px solid ${p.border}`, boxShadow: '0 4px 14px rgba(0,0,0,0.04)', fontSize: '0.85rem', fontWeight: 500, color: '#0f172a' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color }} />
                <span>{p.label}</span>
              </motion.div>
            ))}
          </div>

          <blockquote className="focus-center-quote" style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3rem)', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.25, color: '#0f172a', margin: 0, textAlign: 'center' }}>
            {template.focusQuote.main} <span style={{ color: '#94a3b8' }}>{template.focusQuote.highlight}</span>
          </blockquote>

          <div className="focus-right-pills" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', alignItems: 'flex-end' }}>
            {template.focusPillsRight.map((p, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.04, x: -4 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', padding: '0.55rem 1.25rem', borderRadius: '9999px', background: '#ffffff', border: `1.5px solid ${p.border}`, boxShadow: '0 4px 14px rgba(0,0,0,0.04)', fontSize: '0.85rem', fontWeight: 500, color: '#0f172a' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color }} />
                <span>{p.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SELECTED WORKS 2x2 GRID */}
      <section id="works" style={{ padding: '4rem 1.5rem 6rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <span className="editorial-kicker">( 2/2 ) Curated Works</span>
            <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 500, letterSpacing: '-0.025em', margin: 0, color: '#0f172a' }}>
              Selected Works <span className="editorial-serif-italic" style={{ marginLeft: '0.6rem', color: colors.accent }}>2021 — 2026</span>
            </h2>
          </div>
          <p style={{ fontSize: '0.95rem', color: '#64748b', maxWidth: '380px', lineHeight: 1.6, margin: 0 }}>
            Curated selection of mission architectures, high-performance systems, and battle-tested deployments.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {template.projects.map((work) => (
            <motion.div key={work.id} whileHover={{ y: -8 }} onClick={() => onSelectProject(work)} style={{ borderRadius: '24px', background: '#f8fafc', border: '1.5px solid #e2e8f0', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '340px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: work.color || colors.accent }} />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', padding: '0.25rem 0.75rem', borderRadius: '9999px', background: colors.badgeBg, color: colors.badgeText }}>{work.category}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: colors.accent }}>{work.metrics}</span>
                </div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.75rem', lineHeight: 1.3 }}>{work.title}</h3>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#475569', marginBottom: '1.5rem' }}>{work.desc}</p>
              </div>
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  {work.tags.map((t) => (
                    <span key={t} style={{ fontSize: '0.75rem', fontWeight: 500, padding: '0.2rem 0.65rem', borderRadius: '6px', background: '#ffffff', border: '1px solid #e2e8f0', color: '#334155' }}>{t}</span>
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

      {/* 4. PROCESS NUMBERED CARDS */}
      <section id="mastery" style={{ padding: '5rem 1.5rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="editorial-kicker">/ Mastery & Approach /</span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 500, letterSpacing: '-0.025em', margin: 0, color: '#0f172a' }}>
            Engineered with <span className="editorial-serif-italic" style={{ color: colors.accent }}>Surgical Precision</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {template.skills.map((skill, idx) => (
            <motion.div key={idx} whileHover={{ y: -6 }} style={{ padding: '2rem', borderRadius: '24px', background: '#ffffff', border: '1.5px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px' }}>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 400, color: '#cbd5e1', marginBottom: '1rem', fontFamily: 'var(--font-serif-display)', fontStyle: 'italic' }}>0{idx + 1}</div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#0f172a', margin: '0 0 0.5rem 0' }}>{skill.name}</h4>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>Category: {skill.category}</span>
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

      {/* 5. TIMELINE & PORTRAIT */}
      <section id="timeline" style={{ padding: '5rem 1.5rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="editorial-kicker">/ Proven Pedigree /</span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 500, letterSpacing: '-0.025em', margin: 0, color: '#0f172a' }}>
            Pushing Boundaries <span style={{ fontWeight: 300, color: '#94a3b8' }}>{template.sinceYear}</span>
          </h2>
        </div>
        <div className="about-2col" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)', gap: '3.5rem', alignItems: 'center' }}>
          <div className="about-portrait-card" style={{ background: '#0f172a', borderRadius: '24px', padding: '1.75rem', color: '#ffffff', boxShadow: '0 20px 50px rgba(15, 23, 42, 0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '380px' }}>
            <div className="about-portrait-img-wrap" style={{ width: '100%', height: '260px', borderRadius: '16px', overflow: 'hidden', background: '#1e293b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={template.bustUrl} alt={template.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>{template.name}</h4>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{template.roleTitle}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.85rem' }}>
                <a href={`https://wa.me/6285806003234?text=Hi%20${template.name}`} target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8' }}><MessageCircle size={17} /></a>
                <a href="mailto:budiarto3788@gmail.com" style={{ color: '#94a3b8' }}><Mail size={17} /></a>
              </div>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.65, fontWeight: 400, margin: '0 0 2.5rem 0' }}>{template.bio}</p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {template.experiences.map((exp, i) => (
                <div key={i} className="about-exp-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.15rem 0', borderTop: '1px solid #f1f5f9', fontSize: '0.9rem' }}>
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

      {/* 6. ENDORSEMENTS */}
      <section id="testimonials" style={{ padding: '5rem 1.5rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="editorial-kicker">/ Peer Endorsements /</span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 500, letterSpacing: '-0.025em', margin: 0, color: '#0f172a' }}>
            Endorsements from <span className="editorial-serif-italic" style={{ color: colors.accent }}>Companions</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {template.testimonials.map((t, i) => (
            <div key={i} style={{ padding: '2rem', borderRadius: '24px', background: '#ffffff', border: '1.5px solid #e2e8f0', boxShadow: '0 8px 25px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '260px' }}>
              <p style={{ fontSize: '1rem', lineHeight: 1.65, fontStyle: 'italic', color: '#334155', marginBottom: '2rem' }}>"{t.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img src={t.avatar} alt={t.author} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${colors.accent}`, background: '#f1f5f9' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#0f172a' }}>{t.author}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CTA BANNER */}
      <section className="cta-banner-wrapper" style={{ padding: '3rem 1.5rem 5rem 1.5rem', maxWidth: '1380px', margin: '0 auto' }}>
        <div className="cta-banner-box" style={{ borderRadius: '36px', padding: '5rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden', background: colors.gradientHero, border: '1.5px solid #e2e8f0', boxShadow: `0 30px 60px -15px ${colors.accentGlow}` }}>
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className="cta-headline" style={{ fontSize: 'clamp(2.8rem, 6.5vw, 4.8rem)', fontWeight: 400, letterSpacing: '-0.03em', margin: 0, color: '#0f172a', lineHeight: 1.05 }}>
              Let’s Make It Happen
            </h2>
            <p style={{ fontSize: '1rem', color: '#334155', maxWidth: '560px', marginTop: '1.25rem', marginBottom: '2.5rem', lineHeight: 1.55, fontWeight: 400 }}>
              always open for new opportunities, collaborations, and creative challenges. Let's work together to bring your ideas to life.
            </p>
            <a href={`https://wa.me/6285806003234?text=Hi%20${template.name}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2.2rem', borderRadius: '9999px', background: '#0f172a', color: '#ffffff', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.06em', textDecoration: 'none', boxShadow: '0 10px 25px rgba(15, 23, 42, 0.25)' }}>
              ✦ DROP A LINE
            </a>
          </div>
        </div>
      </section>

      {/* 8. FOOTER WITH GIANT WATERMARK */}
      <footer style={{ padding: '2.5rem 1.5rem 0 1.5rem', maxWidth: '1380px', margin: '0 auto', overflow: 'hidden' }}>
        <div className="footer-nav-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', paddingBottom: '3rem', borderBottom: '1px solid #f1f5f9' }}>
          <div className="footer-links-wrap" style={{ display: 'flex', gap: '2rem' }}>
            <Link href={`/templates/${template.slug}`} style={{ color: '#0f172a', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>Home</Link>
            <a href="#about" style={{ color: '#64748b', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>About</a>
            <a href="#works" style={{ color: '#64748b', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>Portfolio</a>
            <a href="#testimonials" style={{ color: '#64748b', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>Endorsements</a>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>© {new Date().getFullYear()} {template.name} Portfolio Template.</span>
          <Link href="/templates" style={{ fontSize: '0.82rem', color: colors.accent, textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <Sparkles size={13} />
            <span>Explore All 20 Templates →</span>
          </Link>
        </div>
        <div className="footer-watermark-wrap" style={{ textAlign: 'center', padding: '2.5rem 0 0 0', userSelect: 'none', pointerEvents: 'none', overflow: 'hidden', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <span className="editorial-serif-italic footer-watermark-text" style={{ fontSize: 'clamp(4.2rem, 13vw, 13.5rem)', lineHeight: 0.85, color: '#0f172a', display: 'inline-block', whiteSpace: 'nowrap', letterSpacing: '-0.02em', fontWeight: 400 }}>
            {template.name}
          </span>
        </div>
      </footer>
    </div>
  );
}
