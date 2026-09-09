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
  ArrowRight,
  ExternalLink,
  Code2,
  Terminal,
  Cpu,
  Layers,
  Star,
  Quote,
  Flame,
  Zap,
  Menu,
  X
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
        background: colors.bgPrimary,
        color: colors.textPrimary,
        minHeight: '100vh',
        fontFamily: "'Urbanist', -apple-system, sans-serif",
        position: 'relative',
        overflowX: 'hidden',
        transition: 'background-color 0.4s ease, color 0.4s ease'
      }}
    >
      {/* 1. Global Top Sticky Template Switcher Bar */}
      <TemplateSwitcherBar 
        currentTemplate={template} 
        activeDevice={activeDevice}
        onDeviceChange={setActiveDevice}
      />

      {/* 2. Signature Accent Particle Engine */}
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
          boxShadow: activeDevice !== 'desktop' ? '0 0 50px rgba(0,0,0,0.5)' : 'none',
          minHeight: '100vh',
          background: colors.bgPrimary,
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Navigation Bar */}
        <header
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 10
          }}
        >
          {/* Brand Logo */}
          <Link
            href={`/templates/${template.slug}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              textDecoration: 'none',
              color: colors.textPrimary,
            }}
          >
            <span
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: colors.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '1rem',
                boxShadow: `0 4px 12px ${colors.accentGlow}`
              }}
            >
              {template.name.charAt(0)}
            </span>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                {template.name}
              </div>
              <div style={{ fontSize: '0.74rem', color: colors.textMuted, fontWeight: 500 }}>
                {template.universeBadge}
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav
            className="hidden md:flex"
            style={{
              alignItems: 'center',
              gap: '1.75rem',
              background: colors.bgGlass,
              padding: '0.5rem 1.5rem',
              borderRadius: '9999px',
              border: `1px solid ${colors.borderSubtle}`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <a href="#projects" style={{ color: colors.textSecondary, textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600 }}>Showcase</a>
            <a href="#skills" style={{ color: colors.textSecondary, textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600 }}>Mastery</a>
            <a href="#experience" style={{ color: colors.textSecondary, textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600 }}>Timeline</a>
            <a href="#testimonials" style={{ color: colors.textSecondary, textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600 }}>Endorsements</a>
            <a href="#contact" style={{ color: colors.textSecondary, textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600 }}>Contact</a>
          </nav>

          {/* CTA Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.6rem 1.35rem',
                borderRadius: '9999px',
                background: colors.accent,
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.88rem',
                textDecoration: 'none',
                boxShadow: `0 4px 15px ${colors.accentGlow}`,
              }}
            >
              <span>Initiate Contact</span>
              <ArrowUpRight size={15} />
            </a>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              style={{
                padding: '0.5rem',
                borderRadius: '8px',
                background: colors.bgSurface,
                border: `1px solid ${colors.borderSubtle}`,
                color: colors.textPrimary,
                cursor: 'pointer'
              }}
            >
              {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                background: colors.bgSurface,
                borderBottom: `1px solid ${colors.borderSubtle}`,
                padding: '1.25rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                textAlign: 'center',
                zIndex: 20,
                position: 'relative'
              }}
            >
              <a href="#projects" onClick={() => setMobileNavOpen(false)} style={{ color: colors.textPrimary, textDecoration: 'none', fontWeight: 600 }}>Showcase</a>
              <a href="#skills" onClick={() => setMobileNavOpen(false)} style={{ color: colors.textPrimary, textDecoration: 'none', fontWeight: 600 }}>Mastery</a>
              <a href="#experience" onClick={() => setMobileNavOpen(false)} style={{ color: colors.textPrimary, textDecoration: 'none', fontWeight: 600 }}>Timeline</a>
              <a href="#testimonials" onClick={() => setMobileNavOpen(false)} style={{ color: colors.textPrimary, textDecoration: 'none', fontWeight: 600 }}>Endorsements</a>
              <a href="#contact" onClick={() => setMobileNavOpen(false)} style={{ color: colors.textPrimary, textDecoration: 'none', fontWeight: 600 }}>Contact</a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. Hero Stage (Adapts to Archetype) */}
        <AnimeHeroStage template={template} />

        {/* 4. Marquee Brand Logos / Partners */}
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto 4rem',
            padding: '1.5rem',
            borderTop: `1px solid ${colors.borderSubtle}`,
            borderBottom: `1px solid ${colors.borderSubtle}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '2rem',
            opacity: 0.75
          }}
        >
          {['Aether Engine', 'Valence Labs', 'Nexus Protocol', 'Astral Architecture', 'Obsidian Forge'].map((brand, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 700, color: colors.textSecondary }}>
              <span style={{ color: colors.accent }}>✦</span>
              <span>{brand}</span>
            </div>
          ))}
        </div>

        {/* 5. Selected Works Showcase (2x2 Grid with Interactive Modal) */}
        <section id="projects" style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: colors.accent, marginBottom: '0.5rem' }}>
                <Sparkles size={14} />
                <span>Curated Portfolio</span>
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', color: colors.textPrimary }}>
                Featured Engineering & Works
              </h2>
            </div>
            <p style={{ maxWidth: '420px', fontSize: '0.95rem', color: colors.textMuted, lineHeight: 1.6, margin: 0 }}>
              Specialized systems, custom algorithms, and high-performance applications crafted to perfection.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {template.projects.map((proj) => (
              <motion.div
                key={proj.id}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(proj)}
                style={{
                  borderRadius: '24px',
                  background: colors.bgSurface,
                  border: `1.5px solid ${colors.borderSubtle}`,
                  padding: '2rem',
                  boxShadow: colors.cardShadow,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '320px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                {/* Accent Top Bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: proj.color || colors.accent }} />

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        background: colors.badgeBg,
                        color: colors.badgeText,
                      }}
                    >
                      {proj.category}
                    </span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: colors.accent }}>
                      {proj.metrics}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: colors.textPrimary, marginBottom: '0.75rem', lineHeight: 1.3 }}>
                    {proj.title}
                  </h3>

                  <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: colors.textSecondary, marginBottom: '1.5rem' }}>
                    {proj.desc}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                    {proj.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          padding: '0.2rem 0.65rem',
                          borderRadius: '6px',
                          background: colors.isDark ? 'rgba(255,255,255,0.06)' : '#f1f5f9',
                          color: colors.textPrimary
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: colors.accent }}>
                    <span>Inspect Case Study</span>
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6. Skills & Mastery Section */}
        <section id="skills" style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem' }}>
          <div style={{ borderRadius: '32px', background: colors.bgSecondary, border: `1.5px solid ${colors.borderSubtle}`, padding: 'clamp(2rem, 4vw, 3.5rem)' }}>
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: colors.accent, marginBottom: '0.5rem' }}>
                <Cpu size={14} />
                <span>Technical Specifications</span>
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: colors.textPrimary, marginBottom: '0.75rem' }}>
                Core Competencies & Mastery
              </h2>
              <p style={{ fontSize: '0.95rem', color: colors.textSecondary, lineHeight: 1.6 }}>
                Disciplines honed across extreme battlefield environments and distributed production networks.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
              {template.skills.map((skill, i) => (
                <div
                  key={i}
                  style={{
                    padding: '1.5rem',
                    borderRadius: '20px',
                    background: colors.bgSurface,
                    border: `1px solid ${colors.borderSubtle}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '1rem', color: colors.textPrimary }}>{skill.name}</span>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: colors.accent }}>{skill.level}%</span>
                  </div>
                  {/* Progress bar */}
                  <div style={{ width: '100%', height: '8px', borderRadius: '9999px', background: colors.isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      style={{ height: '100%', borderRadius: '9999px', background: colors.accent }}
                    />
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: colors.textMuted, marginTop: '0.65rem', textTransform: 'uppercase' }}>
                    Category: {skill.category}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Experience Timeline Section */}
        <section id="experience" style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: colors.accent, marginBottom: '0.5rem' }}>
              <Layers size={14} />
              <span>Historical Milestones</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: colors.textPrimary }}>
              Campaigns & Timeline
            </h2>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {template.experiences.map((exp, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  padding: '1.75rem',
                  borderRadius: '24px',
                  background: colors.bgSurface,
                  border: `1.5px solid ${colors.borderSubtle}`,
                  boxShadow: colors.cardShadow
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: colors.badgeBg,
                    color: colors.badgeText,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    flexShrink: 0
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: colors.textPrimary, margin: 0 }}>
                      {exp.role}
                    </h3>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: colors.accent, padding: '0.2rem 0.65rem', borderRadius: '6px', background: colors.badgeBg }}>
                      {exp.year}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: colors.textMuted, marginBottom: '0.75rem' }}>
                    {exp.organization}
                  </div>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: colors.textSecondary, margin: 0 }}>
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Companion Endorsements / Testimonials */}
        <section id="testimonials" style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: colors.accent, marginBottom: '0.5rem' }}>
              <Quote size={14} />
              <span>Peer Verification</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: colors.textPrimary }}>
              Endorsements from the Frontline
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {template.testimonials.map((t, i) => (
              <div
                key={i}
                style={{
                  padding: '2rem',
                  borderRadius: '24px',
                  background: colors.bgSurface,
                  border: `1.5px solid ${colors.borderSubtle}`,
                  boxShadow: colors.cardShadow,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <p style={{ fontSize: '1.05rem', lineHeight: 1.65, fontStyle: 'italic', color: colors.textSecondary, marginBottom: '2rem' }}>
                  "{t.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img
                    src={t.avatar}
                    alt={t.author}
                    style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${colors.accent}` }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: colors.textPrimary }}>{t.author}</div>
                    <div style={{ fontSize: '0.82rem', color: colors.textMuted }}>{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. Contact / Commission Footer CTA */}
        <section id="contact" style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem 6rem' }}>
          <div
            style={{
              borderRadius: '36px',
              background: colors.isDark ? colors.bgSecondary : '#ffffff',
              border: `2px solid ${colors.borderStrong}`,
              boxShadow: `0 30px 80px -20px ${colors.accentGlow}`,
              padding: 'clamp(2.5rem, 5vw, 4.5rem)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ position: 'relative', zIndex: 2, maxWidth: '720px', margin: '0 auto' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 1.15rem',
                  borderRadius: '9999px',
                  background: colors.badgeBg,
                  color: colors.badgeText,
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem'
                }}
              >
                <Sparkles size={14} />
                <span>Ready for Collaboration</span>
              </div>

              <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, letterSpacing: '-0.02em', color: colors.textPrimary, marginBottom: '1.25rem', lineHeight: 1.15 }}>
                Let's Build Something Legendary Together
              </h2>

              <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: colors.textSecondary, marginBottom: '2.5rem' }}>
                Whether you need ultra-scalable cloud architectures, precision UI/UX design, or battle-tested codebases, {template.name} is ready for dispatch.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href={`https://wa.me/6285806003234?text=Hi%20${template.name},%20I%20saw%20your%20portfolio%20template%20and%20would%20love%20to%20connect!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '1rem 2.25rem',
                    borderRadius: '9999px',
                    background: '#22c55e',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    textDecoration: 'none',
                    boxShadow: '0 10px 30px -5px rgba(34, 197, 94, 0.45)'
                  }}
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp Transmission</span>
                </a>

                <a
                  href="mailto:budiarto3788@gmail.com"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '1rem 2.25rem',
                    borderRadius: '9999px',
                    background: colors.bgPrimary,
                    border: `1.5px solid ${colors.borderStrong}`,
                    color: colors.textPrimary,
                    fontWeight: 700,
                    fontSize: '1rem',
                    textDecoration: 'none'
                  }}
                >
                  <Mail size={18} />
                  <span>Direct Dispatch (Email)</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '2rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: `1px solid ${colors.borderSubtle}`,
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.85rem',
            color: colors.textMuted
          }}
        >
          <div>
            © {new Date().getFullYear()} {template.name} Portfolio Template. Part of the Anime Template Collection.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <Link href="/templates" style={{ color: colors.accent, textDecoration: 'none', fontWeight: 600 }}>
              All 20 Anime Templates
            </Link>
            <Link href="/" style={{ color: colors.textSecondary, textDecoration: 'none' }}>
              Original Himmel
            </Link>
          </div>
        </footer>
      </div>

      {/* Interactive Project Case Study Modal */}
      <AnimeProjectModal
        project={selectedProject}
        colors={colors}
        characterName={template.name}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
