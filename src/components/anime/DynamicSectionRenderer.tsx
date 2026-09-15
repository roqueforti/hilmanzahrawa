'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  Sparkles, 
  MessageCircle, 
  Mail, 
  ExternalLink,
  Github, 
  GraduationCap, 
  BookOpen, 
  Award, 
  ShieldCheck, 
  Briefcase, 
  CheckCircle2, 
  Terminal, 
  Activity, 
  Layers, 
  FileText, 
  Users, 
  Zap, 
  Cpu, 
  Flame, 
  Star,
  Check
} from 'lucide-react';
import { AnimeTemplate, ProjectItem, SectionKey } from '@/data/animeTemplates';
import ArchetypeHero from '@/components/anime/ArchetypeHero';

interface DynamicSectionRendererProps {
  sectionKey: SectionKey;
  template: AnimeTemplate;
  onSelectProject: (p: ProjectItem) => void;
  index: number;
}

export default function DynamicSectionRenderer({
  sectionKey,
  template,
  onSelectProject,
  index
}: DynamicSectionRendererProps) {
  const { colors } = template;

  // 1. HERO SECTION (Signature Archetype Hero)
  if (sectionKey === 'hero') {
    return <ArchetypeHero template={template} />;
  }

  // 2. ABOUT / PHILOSOPHY / MANIFESTO / INTRODUCTION / MY STORY
  if (
    sectionKey === 'about' ||
    sectionKey === 'about-me' ||
    sectionKey === 'manifesto' ||
    sectionKey === 'introduction' ||
    sectionKey === 'my-story'
  ) {
    const kickerMap: Record<string, string> = {
      manifesto: '/ The Creative Manifesto /',
      'my-story': '/ Lore & Origin Story /',
      introduction: '/ Curatorial Introduction /',
      'about-me': '/ Identity & Principles /',
      about: '/ Philosophy & Principles /',
    };

    return (
      <section id="about" style={{ padding: '4.5rem 1.5rem 5.5rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="editorial-kicker">{kickerMap[sectionKey] || '/ Philosophy & Focus /'}</span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 500, letterSpacing: '-0.025em', margin: 0, color: '#0f172a' }}>
            Deciphering Truth with <span className="editorial-serif-italic" style={{ color: colors.accent }}>Clarity</span>
          </h2>
        </div>

        {/* 3-Column Focus Quote & Pills */}
        <div className="focus-3col-container" style={{ display: 'grid', gridTemplateColumns: '1fr minmax(auto, 680px) 1fr', gap: '2.5rem', alignItems: 'center', margin: '0 auto 3rem auto' }}>
          {/* Left Pills */}
          <div className="focus-left-pills" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
            {template.focusPillsLeft.map((p, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.04, x: 4 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', padding: '0.55rem 1.25rem', borderRadius: '9999px', background: '#ffffff', border: `1.5px solid ${p.border}`, boxShadow: '0 4px 14px rgba(0,0,0,0.04)', fontSize: '0.85rem', fontWeight: 500, color: '#0f172a' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color }} />
                <span>{p.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Center Main Quote */}
          <blockquote className="focus-center-quote" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.25, color: '#0f172a', margin: 0, textAlign: 'center' }}>
            {template.focusQuote.main} <span style={{ color: '#94a3b8' }}>{template.focusQuote.highlight}</span>
          </blockquote>

          {/* Right Pills */}
          <div className="focus-right-pills" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-end' }}>
            {template.focusPillsRight.map((p, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.04, x: -4 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', padding: '0.55rem 1.25rem', borderRadius: '9999px', background: '#ffffff', border: `1.5px solid ${p.border}`, boxShadow: '0 4px 14px rgba(0,0,0,0.04)', fontSize: '0.85rem', fontWeight: 500, color: '#0f172a' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color }} />
                <span>{p.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bio Narrative Card */}
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '2.5rem', borderRadius: '24px', background: '#f8fafc', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#334155', margin: 0 }}>
            {template.bio}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.75rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Active Base: <strong style={{ color: '#0f172a' }}>{template.location}</strong></span>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Operating Since: <strong style={{ color: '#0f172a' }}>{template.sinceYear}</strong></span>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Guild / Series: <strong style={{ color: '#0f172a' }}>{template.series}</strong></span>
          </div>
        </div>
      </section>
    );
  }

  // 3. SKILLS / TECH-STACK / EXPERTISE / WHAT-I-DO
  if (
    sectionKey === 'skills' ||
    sectionKey === 'tech-stack' ||
    sectionKey === 'expertise' ||
    sectionKey === 'what-i-do'
  ) {
    const headerTitle =
      sectionKey === 'tech-stack'
        ? 'Tooling & Ecosystem'
        : sectionKey === 'expertise'
        ? 'Domain Expertise'
        : sectionKey === 'what-i-do'
        ? 'Operational Capabilities'
        : 'Mastery & Approach';

    return (
      <section id="mastery" style={{ padding: '4.5rem 1.5rem 5.5rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="editorial-kicker">/ Tactical Proficiencies /</span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 500, letterSpacing: '-0.025em', margin: 0, color: '#0f172a' }}>
            Engineered with <span className="editorial-serif-italic" style={{ color: colors.accent }}>{headerTitle}</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {template.skills.map((skill, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.06)' }}
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
                <div style={{ fontSize: '1.8rem', fontWeight: 400, color: '#cbd5e1', marginBottom: '0.75rem', fontFamily: 'var(--font-serif-display)', fontStyle: 'italic' }}>
                  0{idx + 1}
                </div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#0f172a', margin: '0 0 0.5rem 0' }}>{skill.name}</h4>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>Category: {skill.category}</span>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: '#475569' }}>
                  <span>Proficiency Rating</span>
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
    );
  }

  // 4. PROJECTS / SELECTED WORKS / SELECTED-PROJECTS / FEATURED-PROJECTS / ALL-PROJECTS / INTERACTIVE-PROJECTS / PORTFOLIO
  if (
    sectionKey === 'projects' ||
    sectionKey === 'selected-works' ||
    sectionKey === 'selected-work' ||
    sectionKey === 'selected-projects' ||
    sectionKey === 'featured-projects' ||
    sectionKey === 'featured-work' ||
    sectionKey === 'all-projects' ||
    sectionKey === 'interactive-projects' ||
    sectionKey === 'portfolio'
  ) {
    const isFeatured = sectionKey === 'featured-projects' || sectionKey === 'featured-work';
    const displayProjects = isFeatured ? template.projects.slice(0, 2) : template.projects;

    return (
      <section id="works" style={{ padding: '4.5rem 1.5rem 6rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <span className="editorial-kicker">/ Portfolio Showcase /</span>
            <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 500, letterSpacing: '-0.025em', margin: 0, color: '#0f172a' }}>
              {isFeatured ? 'Featured Flagships' : 'Selected Works'} <span className="editorial-serif-italic" style={{ marginLeft: '0.6rem', color: colors.accent }}>2021 — 2026</span>
            </h2>
          </div>
          <p style={{ fontSize: '0.95rem', color: '#64748b', maxWidth: '380px', lineHeight: 1.6, margin: 0 }}>
            Curated selection of mission architectures, high-performance systems, and battle-tested deployments.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2rem' }}>
          {displayProjects.map((work) => (
            <motion.div
              key={work.id}
              whileHover={{ y: -6, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.06)' }}
              onClick={() => onSelectProject(work)}
              style={{
                borderRadius: '24px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                padding: '2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '340px',
                position: 'relative',
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.accent }} />
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: colors.accent }}>
                      {work.category}
                    </span>
                  </div>
                  {work.metrics && (
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: colors.accent, background: colors.badgeBg, padding: '0.25rem 0.7rem', borderRadius: '9999px' }}>
                      {work.metrics}
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.65rem', lineHeight: 1.35, letterSpacing: '-0.02em' }}>
                  {work.title}
                </h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#64748b', margin: '0 0 1.5rem 0', flex: 1 }}>
                  {work.desc}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.25rem' }}>
                  {work.tags.map((t) => (
                    <span key={t} style={{ fontSize: '0.74rem', fontWeight: 500, padding: '0.25rem 0.65rem', borderRadius: '8px', background: '#f8fafc', color: '#475569', border: '1px solid #f1f5f9' }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>
                    Inspect Architecture
                  </span>
                  <span style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.accent }}>
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  // 5. CASE STUDY (Deep Dive Case Study Spotlight)
  if (sectionKey === 'case-study') {
    const featured = template.projects[0];
    return (
      <section style={{ padding: '4.5rem 1.5rem 5.5rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="editorial-kicker">/ Featured Deep Dive /</span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 500, letterSpacing: '-0.025em', margin: 0, color: '#0f172a' }}>
            Primary Case Study: <span className="editorial-serif-italic" style={{ color: colors.accent }}>{featured.title}</span>
          </h2>
        </div>

        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => onSelectProject(featured)}
          style={{
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
            border: '1.5px solid #e2e8f0',
            padding: '3rem 2.5rem',
            boxShadow: '0 12px 35px rgba(0,0,0,0.04)',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <span style={{ display: 'inline-flex', padding: '0.35rem 1rem', borderRadius: '9999px', background: colors.accent, color: '#ffffff', fontSize: '0.8rem', fontWeight: 700 }}>
              {featured.category}
            </span>
            {featured.metrics && (
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: colors.accent, background: colors.badgeBg, padding: '0.35rem 0.95rem', borderRadius: '9999px' }}>
                Metric: {featured.metrics}
              </span>
            )}
          </div>

          <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', lineHeight: 1.3 }}>
            {featured.title}
          </h3>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#475569', maxWidth: '880px', marginBottom: '2rem' }}>
            {featured.desc}
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {featured.tags.map(t => (
                <span key={t} style={{ padding: '0.35rem 0.8rem', borderRadius: '8px', background: '#ffffff', border: '1px solid #e2e8f0', fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>
                  {t}
                </span>
              ))}
            </div>

            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.4rem', borderRadius: '9999px', background: '#0f172a', color: '#ffffff', fontSize: '0.85rem', fontWeight: 600 }}>
              <span>View Case Teardown</span>
              <ArrowUpRight size={15} />
            </span>
          </div>
        </motion.div>
      </section>
    );
  }

  // 6. OTHER PROJECTS
  if (sectionKey === 'other-projects') {
    const secondary = template.projects.slice(1);
    return (
      <section style={{ padding: '3rem 1.5rem 5rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="editorial-kicker">/ Secondary Deployments /</span>
          <h3 style={{ fontSize: '2.2rem', fontWeight: 600, color: '#0f172a', margin: 0 }}>
            Other Noteworthy Projects
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {secondary.map((work) => (
            <motion.div
              key={work.id}
              whileHover={{ y: -4 }}
              onClick={() => onSelectProject(work)}
              style={{
                padding: '1.5rem',
                borderRadius: '18px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: colors.accent, marginBottom: '0.5rem' }}>
                {work.category}
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem' }}>
                {work.title}
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                {work.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  // 7. BACKEND SYSTEMS ARCHITECTURE
  if (sectionKey === 'backend') {
    return (
      <section style={{ padding: '4.5rem 1.5rem 5.5rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="editorial-kicker">/ Backend & Infrastructure /</span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 500, letterSpacing: '-0.025em', margin: 0, color: '#0f172a' }}>
            High-Throughput <span className="editorial-serif-italic" style={{ color: colors.accent }}>Distributed Systems</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{ padding: '2rem', borderRadius: '24px', background: '#ffffff', border: '1.5px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
            <Cpu size={28} color={colors.accent} style={{ marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem' }}>Distributed Microservices</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>
              Fault-tolerant event-driven microservices designed for mission-critical loads and zero-downtime hot reloading.
            </p>
          </div>

          <div style={{ padding: '2rem', borderRadius: '24px', background: '#ffffff', border: '1.5px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
            <Terminal size={28} color={colors.accent} style={{ marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem' }}>API Scalability & Security</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>
              Strict crypt-cipher authentication, rate-limiting, edge-caching gateways, and sub-millisecond response latency.
            </p>
          </div>

          <div style={{ padding: '2rem', borderRadius: '24px', background: '#ffffff', border: '1.5px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
            <Activity size={28} color={colors.accent} style={{ marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem' }}>Database Sharding & Caching</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>
              Multi-region replication, automated failover triggers, Redis caching pipelines, and real-time query telemetry.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // 8. FRONTEND SYSTEMS ARCHITECTURE
  if (sectionKey === 'frontend') {
    return (
      <section style={{ padding: '4.5rem 1.5rem 5.5rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="editorial-kicker">/ Frontend & Interaction /</span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 500, letterSpacing: '-0.025em', margin: 0, color: '#0f172a' }}>
            Fluid Interfaces & <span className="editorial-serif-italic" style={{ color: colors.accent }}>Design Systems</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{ padding: '2rem', borderRadius: '24px', background: '#ffffff', border: '1.5px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
            <Layers size={28} color={colors.accent} style={{ marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem' }}>Atomic Design Systems</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>
              Reusable accessible token-driven UI components with WCAG 2.1 AA compliance and dark-mode elegance.
            </p>
          </div>

          <div style={{ padding: '2rem', borderRadius: '24px', background: '#ffffff', border: '1.5px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
            <Zap size={28} color={colors.accent} style={{ marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem' }}>60 FPS Micro-Interactions</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>
              Fluid Framer Motion choreographies, hardware-accelerated transforms, and responsive viewport adapters.
            </p>
          </div>

          <div style={{ padding: '2rem', borderRadius: '24px', background: '#ffffff', border: '1.5px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
            <Activity size={28} color={colors.accent} style={{ marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem' }}>Web Vitals Optimization</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>
              100/100 Lighthouse performance metrics, sub-second LCP, zero CLS, and instant server-side hydration.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // 9. EXPERIENCE / JOURNEY / TIMELINE / INTERNSHIP
  if (
    sectionKey === 'experience' ||
    sectionKey === 'journey' ||
    sectionKey === 'timeline' ||
    sectionKey === 'internship'
  ) {
    const isIntern = sectionKey === 'internship';
    return (
      <section id="timeline" style={{ padding: '4.5rem 1.5rem 5.5rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="editorial-kicker">/ Chronicle & Trajectory /</span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 500, letterSpacing: '-0.025em', margin: 0, color: '#0f172a' }}>
            {isIntern ? 'Internship & Mentorship' : 'Historical Chronicles'} <span className="editorial-serif-italic" style={{ color: colors.accent }}>Timeline</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {template.experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 6 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(120px, 160px) 1fr',
                gap: '2rem',
                padding: '2rem 2.25rem',
                borderRadius: '20px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                alignItems: 'baseline',
              }}
            >
              <div>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: colors.accent, display: 'inline-block', marginBottom: '0.25rem' }}>
                  {exp.year}
                </span>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Active Station</div>
              </div>

              <div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', margin: '0 0 0.35rem 0' }}>
                  {exp.role}
                </h4>
                <div style={{ fontSize: '0.88rem', fontWeight: 500, color: colors.accent, marginBottom: '0.75rem' }}>
                  {exp.organization}
                </div>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.65, color: '#475569', margin: 0 }}>
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  // 10. EDUCATION
  if (sectionKey === 'education') {
    const eduList = template.education || [
      { institution: 'Grand Magic Academy', degree: 'First-Class Master of Sorcery', year: '2018 - 2022', description: 'Graduated top percentile in spell analysis, continuous mana containment, and historical grimoire translation.' }
    ];

    return (
      <section style={{ padding: '4.5rem 1.5rem 5.5rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="editorial-kicker">/ Scholastic Credentials /</span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 500, letterSpacing: '-0.025em', margin: 0, color: '#0f172a' }}>
            Academic & <span className="editorial-serif-italic" style={{ color: colors.accent }}>Guild Education</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {eduList.map((edu, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.5rem',
                padding: '2rem',
                borderRadius: '20px',
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: colors.badgeBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.accent, flexShrink: 0 }}>
                <GraduationCap size={24} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0f172a', margin: 0 }}>{edu.degree}</h4>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: colors.accent, background: colors.badgeBg, padding: '0.2rem 0.65rem', borderRadius: '9999px' }}>{edu.year}</span>
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>{edu.institution}</div>
                <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#64748b', margin: 0 }}>{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 11. RESEARCH
  if (sectionKey === 'research') {
    const researchList = template.research || [
      { title: 'Decentralized Mana Flux Analysis in Ancient Barrier Formations', field: 'Applied Theoretical Architecture', year: '2024', summary: 'Empirical documentation of multi-century defensive wards with zero packet loss across contested boundary perimeters.' }
    ];

    return (
      <section style={{ padding: '4.5rem 1.5rem 5.5rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="editorial-kicker">/ Empirical Inquiry /</span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 500, letterSpacing: '-0.025em', margin: 0, color: '#0f172a' }}>
            Applied Research & <span className="editorial-serif-italic" style={{ color: colors.accent }}>Whitepapers</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {researchList.map((res, idx) => (
            <div
              key={idx}
              style={{
                padding: '2rem 2.25rem',
                borderRadius: '20px',
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: colors.accent, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {res.field}
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>Published: {res.year}</span>
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                {res.title}
              </h4>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.65, color: '#475569', margin: 0 }}>
                {res.summary}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 12. GITHUB & ACTIVITY TELEMETRY
  if (sectionKey === 'github') {
    const rawStats = template.githubStats;
    const stats = {
      commits: typeof rawStats?.commits === 'number' ? `${rawStats.commits}+` : (rawStats?.commits || '3,420+'),
      pullRequests: (rawStats && 'pullRequests' in rawStats) ? String(rawStats.pullRequests) : '184',
      contributions: (rawStats && 'contributions' in rawStats) ? String(rawStats.contributions) : '99.4%',
      streakDays: (rawStats && 'streakDays' in rawStats) ? String(rawStats.streakDays) : '248',
      topLanguages: (rawStats && 'topLanguages' in rawStats && Array.isArray(rawStats.topLanguages)) ? rawStats.topLanguages : ['TypeScript', 'Go', 'Rust', 'Python']
    };

    return (
      <section style={{ padding: '4.5rem 1.5rem 5.5rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="editorial-kicker">/ Open Source Telemetry /</span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 500, letterSpacing: '-0.025em', margin: 0, color: '#0f172a' }}>
            Code Activity & <span className="editorial-serif-italic" style={{ color: colors.accent }}>GitHub Telemetry</span>
          </h2>
        </div>

        <div style={{ padding: '2.5rem', borderRadius: '24px', background: '#0f172a', color: '#ffffff', boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Github size={24} color={colors.accent} />
              <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>GitHub Performance Radar</span>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'monospace' }}>STATUS: ACTIVE // STREAK: {stats.streakDays} DAYS</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: colors.accent }}>{stats.commits}</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Total Commits (2025-2026)</div>
            </div>
            <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8' }}>{stats.pullRequests}</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Merged Pull Requests</div>
            </div>
            <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#4ade80' }}>{stats.contributions}</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Code Review Accuracy</div>
            </div>
            <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b' }}>{stats.streakDays}</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Continuous Day Streak</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.82rem', color: '#94a3b8', marginRight: '0.5rem' }}>Top Core Languages:</span>
            {stats.topLanguages.map((lang) => (
              <span key={lang} style={{ padding: '0.3rem 0.75rem', borderRadius: '9999px', background: 'rgba(255,255,255,0.1)', fontSize: '0.75rem', fontWeight: 600, color: '#ffffff' }}>
                {lang}
              </span>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 13. PROCESS
  if (sectionKey === 'process') {
    const steps = template.processSteps || [
      { step: '01', title: 'Discovery & Recon', desc: 'Conducting rigorous boundary reconnaissance, requirement telemetry, and edge-case mapping.' },
      { step: '02', title: 'System Blueprint', desc: 'Modeling decoupled scalable architecture, state flow pipelines, and database contracts.' },
      { step: '03', title: 'Battle Testing', desc: 'Executing stress simulations, penetration audits, and 100% test coverage verification.' },
      { step: '04', title: 'Deployment & Scale', desc: 'Continuous integration rollouts, edge CDN distribution, and telemetry monitoring.' },
    ];

    return (
      <section style={{ padding: '4.5rem 1.5rem 5.5rem 1.5rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="editorial-kicker">/ Execution Methodology /</span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 500, letterSpacing: '-0.025em', margin: 0, color: '#0f172a' }}>
            Strategic <span className="editorial-serif-italic" style={{ color: colors.accent }}>Execution Process</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {steps.map((st, idx) => (
            <div
              key={idx}
              style={{
                padding: '2.25rem 2rem',
                borderRadius: '22px',
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '240px',
              }}
            >
              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: 400, color: '#cbd5e1', fontFamily: 'var(--font-serif-display)', fontStyle: 'italic', marginBottom: '0.75rem' }}>
                  {st.step}
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.65rem' }}>
                  {st.title}
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                  {st.desc}
                </p>
              </div>

              <div style={{ height: '4px', width: '40px', background: colors.accent, borderRadius: '2px', marginTop: '1.5rem' }} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 14. ORGANIZATION / GUILDS
  if (sectionKey === 'organization') {
    const orgs = template.organization || [
      { name: 'Demon Slayer Corps / Survey Regiment', role: 'Chief Tactical Commander', period: '2021 - Present', impact: 'Directed 40+ tactical deployments with zero civilian casualties and 99.8% mission success.' }
    ];

    return (
      <section style={{ padding: '4.5rem 1.5rem 5.5rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="editorial-kicker">/ Leadership & Alliances /</span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 500, letterSpacing: '-0.025em', margin: 0, color: '#0f172a' }}>
            Organization & <span className="editorial-serif-italic" style={{ color: colors.accent }}>Guild Leadership</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orgs.map((org, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.5rem',
                padding: '2rem 2.25rem',
                borderRadius: '20px',
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: colors.badgeBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.accent, flexShrink: 0 }}>
                <Users size={24} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', margin: 0 }}>{org.role}</h4>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: colors.accent }}>{org.period}</span>
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>{org.name}</div>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#64748b', margin: 0 }}>{org.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 15. CERTIFICATES & LICENSES
  if (sectionKey === 'certificates' || sectionKey === 'certifications') {
    const certs = template.certificates || [
      { name: 'First-Class Wizard License', issuer: 'Continental Magic Association', year: '2024', id: 'CMA-WIZ-001' },
      { name: 'Certified Systems Architect', issuer: 'Global Tech Syndicate', year: '2023', id: 'GTS-ARCH-982' }
    ];

    return (
      <section style={{ padding: '4.5rem 1.5rem 5.5rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="editorial-kicker">/ Verified Credentials /</span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 500, letterSpacing: '-0.025em', margin: 0, color: '#0f172a' }}>
            Accredited <span className="editorial-serif-italic" style={{ color: colors.accent }}>Licenses & Certifications</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {certs.map((c, idx) => (
            <div
              key={idx}
              style={{
                padding: '1.75rem 2rem',
                borderRadius: '20px',
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.25rem',
              }}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: colors.badgeBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.accent, flexShrink: 0 }}>
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a', margin: '0 0 0.35rem 0' }}>{c.name}</h4>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>{c.issuer}  {c.year}</div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: colors.accent, background: '#f8fafc', padding: '0.2rem 0.5rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  ID: {c.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 16. ACHIEVEMENTS & HIGHLIGHTS
  if (sectionKey === 'achievements' || sectionKey === 'highlights') {
    const achs = template.achievements || [
      { title: 'Demon King Subjugation', metric: '1000-Year Milestone', year: 'Era 1', description: 'Orchestrated complete defeat of the Demon King army as head tactician alongside Hero Himmel.' },
      { title: 'Zero System Downfall Record', metric: '99.999% Uptime', year: '2024', description: 'Architected disaster recovery mesh handling peak battle queries with zero packet loss.' }
    ];

    return (
      <section style={{ padding: '4.5rem 1.5rem 5.5rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="editorial-kicker">/ Honors & Milestones /</span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 500, letterSpacing: '-0.025em', margin: 0, color: '#0f172a' }}>
            Notable <span className="editorial-serif-italic" style={{ color: colors.accent }}>Achievements & Honors</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {achs.map((ach, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              style={{
                padding: '2.25rem',
                borderRadius: '24px',
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.6rem', fontWeight: 800, color: colors.accent }}>{ach.metric}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>{ach.year}</span>
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.65rem' }}>{ach.title}</h4>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#64748b', margin: 0 }}>{ach.description}</p>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: colors.accent, fontSize: '0.8rem', fontWeight: 600 }}>
                <Award size={16} />
                <span>Verified Milestone Record</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  // 17. SERVICES / PROFESSIONAL COMMISSIONS
  if (sectionKey === 'services') {
    const srvs = template.services || [
      { title: 'Full Stack Systems Architecture', category: 'Engineering', description: 'End-to-end architecture modeling, distributed backends, database sharding, and edge frontend orchestration.', deliverables: ['High-availability architecture blueprint', 'Full stack implementation & testing', 'Performance audit & 60fps tuning'] },
      { title: 'Custom UI/UX & Design Systems', category: 'Design', description: 'World-class aesthetic interfaces, token-driven atomic libraries, fluid Framer Motion animations.', deliverables: ['Figma design system & tokens', 'Production React / Next.js code', 'Accessibility & responsive QA'] }
    ];

    return (
      <section style={{ padding: '4.5rem 1.5rem 5.5rem 1.5rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="editorial-kicker">/ Commission Packages /</span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 500, letterSpacing: '-0.025em', margin: 0, color: '#0f172a' }}>
            Professional <span className="editorial-serif-italic" style={{ color: colors.accent }}>Services & Capabilities</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {srvs.map((s, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              style={{
                padding: '2.5rem 2rem',
                borderRadius: '24px',
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: colors.accent }}>
                  {s.category}
                </span>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#0f172a', margin: '0.4rem 0 0.75rem 0' }}>
                  {s.title}
                </h4>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#64748b', margin: '0 0 1.5rem 0' }}>
                  {s.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem' }}>
                  {s.deliverables.map((del, dIdx) => (
                    <div key={dIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: '#334155' }}>
                      <Check size={16} color={colors.accent} />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={`https://wa.me/6285806003234?text=Hi%20${template.name},%20I%20am%20interested%20in%20commissioning%20${encodeURIComponent(s.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.5rem',
                  borderRadius: '9999px',
                  background: '#0f172a',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 14px rgba(15, 23, 42, 0.15)',
                }}
              >
                <span>Commission Package</span>
                <ArrowUpRight size={15} />
              </a>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  // 18. STATS / QUICK STATS
  if (sectionKey === 'stats') {
    return (
      <section style={{ padding: '3.5rem 1.5rem 4.5rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {template.stats.map((st, idx) => (
            <div
              key={idx}
              style={{
                padding: '2rem 1.5rem',
                borderRadius: '20px',
                background: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: colors.accent, marginBottom: '0.35rem' }}>
                {st.value}
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>
                {st.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 19. ARTICLES / WRITING
  if (sectionKey === 'articles') {
    const articles = template.articles || [
      { title: 'Deconstructing High-Dimensional Mana Spells for Modern Software Engineers', readTime: '6 min read', date: 'Jan 2026', platform: 'Engineering Chronicle' },
      { title: 'The Art of Patient Architecture: Why Decades-Old Codebases Still Reign', readTime: '8 min read', date: 'Nov 2025', platform: 'Arch Digest' }
    ];

    return (
      <section style={{ padding: '4.5rem 1.5rem 5.5rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="editorial-kicker">/ Thought Leadership /</span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 500, letterSpacing: '-0.025em', margin: 0, color: '#0f172a' }}>
            Articles & <span className="editorial-serif-italic" style={{ color: colors.accent }}>Engineering Essays</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {articles.map((art, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 6 }}
              style={{
                padding: '2rem 2.25rem',
                borderRadius: '20px',
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: colors.accent, textTransform: 'uppercase' }}>{art.platform}</span>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>• {art.date} • {art.readTime}</span>
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', margin: 0 }}>
                  {art.title}
                </h4>
              </div>

              <span style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.accent }}>
                <ArrowUpRight size={16} />
              </span>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  // 20. TESTIMONIALS
  if (sectionKey === 'testimonials') {
    return (
      <section id="testimonials" style={{ padding: '4.5rem 1.5rem 5.5rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="editorial-kicker">/ Peer Endorsements /</span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 500, letterSpacing: '-0.025em', margin: 0, color: '#0f172a' }}>
            Trusted by <span className="editorial-serif-italic" style={{ color: colors.accent }}>Allies & Commanders</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {template.testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              style={{
                padding: '2.5rem',
                borderRadius: '24px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#334155', fontStyle: 'italic', margin: '0 0 2rem 0' }}>
                "{test.quote}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
                <img
                  src={test.avatar}
                  alt={test.author}
                  style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', background: '#f1f5f9' }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#0f172a' }}>{test.author}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{test.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  // 21. CONTACT & TRANSMISSION
  if (sectionKey === 'contact') {
    return (
      <section style={{ position: 'relative', zIndex: 10, padding: '5rem 1.5rem 4rem 1.5rem' }}>
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            borderRadius: '32px',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: '#ffffff',
            padding: '4.5rem 2.5rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.4)',
          }}
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '600px',
              height: '300px',
              background: colors.accent,
              opacity: 0.15,
              filter: 'blur(90px)',
              pointerEvents: 'none',
              borderRadius: '50%',
            }}
          />

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: colors.accent, display: 'inline-block', marginBottom: '1rem' }}>
              // OPEN TRANSMISSION CHANNEL //
            </span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, letterSpacing: '-0.03em', margin: '0 auto 1.5rem auto', maxWidth: '850px', lineHeight: 1.15 }}>
              Ready to collaborate with <span className="editorial-serif-italic" style={{ color: colors.accent }}>{template.name}</span>?
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: '#94a3b8', maxWidth: '540px', margin: '0 auto 2.5rem auto' }}>
              {template.statement}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                href={`https://wa.me/6285806003234?text=Hi%20${template.name},%20let's%20work%20together!`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '1rem 2.25rem',
                  borderRadius: '9999px',
                  background: colors.accent,
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  boxShadow: `0 8px 25px ${colors.accentGlow}`,
                }}
              >
                <MessageCircle size={18} />
                <span>Initiate Direct Transmission</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                href="mailto:contact@hilmanzahrawa.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '1rem 2rem',
                  borderRadius: '9999px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  border: '1.5px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                <Mail size={18} />
                <span>Send Encrypted Email</span>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Footer with giant watermark */}
        <footer style={{ maxWidth: '1280px', margin: '4rem auto 1rem auto', padding: '0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #f1f5f9', paddingTop: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: colors.accent }} />
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>{template.name} Portfolio Template</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>• Gaya #{template.styleId || 1} {template.styleName || ''}</span>
          </div>

          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Designed & Engineered by Hilman Zahrawa • 2026 Edition
          </div>
        </footer>
      </section>
    );
  }

  // Fallback for any unknown section
  return null;
}
