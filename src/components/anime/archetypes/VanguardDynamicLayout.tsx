'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap, Activity, ShieldAlert, Sparkles, MessageCircle, Mail } from 'lucide-react';
import { AnimeTemplate, ProjectItem } from '@/data/animeTemplates';

interface ArchetypeProps {
  template: AnimeTemplate;
  onSelectProject: (p: ProjectItem) => void;
}

export default function VanguardDynamicLayout({ template, onSelectProject }: ArchetypeProps) {
  const { colors } = template;
  const isPng = template.bustUrl.endsWith('.png');

  return (
    <div style={{ position: 'relative', zIndex: 10, color: '#0f172a' }}>
      {/* 1. VANGUARD DYNAMIC HERO */}
      <section style={{ position: 'relative', width: '100%', padding: '2rem 2rem 4rem 2rem' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '3rem', alignItems: 'center' }}>
          <div style={{ gridColumn: 'span 7' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.4rem 1.1rem',
              borderRadius: '8px',
              background: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '1.5rem'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
              <span>ACTIVE THEATER: {template.location.toUpperCase()}</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(3.4rem, 7vw, 5.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.98,
              margin: '0 0 1.5rem 0',
              color: '#0f172a'
            }}>
              {template.name}
              <span style={{
                display: 'block',
                color: colors.accent,
                fontFamily: 'var(--font-serif-display)',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: '0.98em'
              }}>
                {template.roleTitle}
              </span>
            </h1>

            <p style={{
              fontSize: '1.15rem',
              lineHeight: 1.6,
              color: '#475569',
              maxWidth: '520px',
              margin: '0 0 2.5rem 0'
            }}>
              {template.statement}
            </p>

            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <a
                href={`https://wa.me/6285806003234?text=Hi%20${template.name},%20deploying%20mission`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.95rem 2.4rem',
                  borderRadius: '9999px',
                  background: '#0f172a',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.25)'
                }}
              >
                <span>Deploy Operation</span>
                <ArrowUpRight size={18} />
              </a>

              <a
                href="#works"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.95rem 1.8rem',
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

          <div style={{ gridColumn: 'span 5', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '520px' }}>
            <div style={{ position: 'absolute', width: '450px', height: '450px', borderRadius: '50%', background: colors.gradientHero, filter: 'blur(50px)', pointerEvents: 'none' }} />

            <div style={{ position: 'absolute', top: '8%', right: '5%', zIndex: 20, background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '0.75rem 1.25rem', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Zap size={16} color={colors.accent} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>{template.stats[0]?.value}</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{template.stats[0]?.label}</div>
              </div>
            </div>

            <div style={{ position: 'absolute', bottom: '10%', left: '0%', zIndex: 20, background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '0.75rem 1.25rem', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Activity size={16} color="#22c55e" />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>{template.stats[1]?.value}</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{template.stats[1]?.label}</div>
              </div>
            </div>

            <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '390px' }}>
              <img
                src={template.bustUrl}
                alt={template.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '500px',
                  objectFit: 'contain',
                  mixBlendMode: isPng ? 'normal' : 'multiply',
                  maskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. STAGGERED ZIG-ZAG DIRECTIVES (SELECTED WORKS) */}
      <section id="works" style={{ padding: '4rem 2rem 6rem 2rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3.5rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: colors.accent }}>
            FIELD DIRECTIVES
          </span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.5rem 0 0 0', color: '#0f172a' }}>
            Mission Architecture Portfolio
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {template.projects.map((work, idx) => (
            <motion.div
              key={work.id}
              whileHover={{ y: -6 }}
              onClick={() => onSelectProject(work)}
              style={{
                borderRadius: '24px',
                background: idx % 2 === 0 ? '#f8fafc' : '#ffffff',
                border: '1.5px solid #e2e8f0',
                padding: '2.5rem',
                cursor: 'pointer',
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: '2rem',
                alignItems: 'center',
                boxShadow: '0 8px 25px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ gridColumn: 'span 4' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: colors.accent, marginBottom: '0.5rem' }}>
                  {work.category} // {work.subtag}
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.75rem 0' }}>{work.title}</h3>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: colors.accent }}>{work.metrics}</span>
              </div>

              <div style={{ gridColumn: 'span 8' }}>
                <p style={{ fontSize: '1rem', lineHeight: 1.65, color: '#475569', marginBottom: '1.5rem' }}>{work.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {work.tags.map((t) => (
                      <span key={t} style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.65rem', borderRadius: '6px', background: '#ffffff', border: '1px solid #e2e8f0', color: '#1e293b' }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 700, color: colors.accent }}>
                    <span>View Directive</span>
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. COMBAT CAPABILITIES / MASTERY */}
      <section id="mastery" style={{ padding: '4rem 2rem 5rem 2rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: colors.accent }}>
            TACTICAL MASTERY
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.4rem 0 0 0', color: '#0f172a' }}>
            Combat & Engineering Capabilities
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {template.skills.map((s, idx) => (
            <div
              key={idx}
              style={{
                padding: '2rem',
                borderRadius: '20px',
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '200px'
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: colors.accent }}>CAPABILITY_0{idx + 1}</span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', margin: '0.5rem 0 0.25rem 0' }}>{s.name}</h4>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Domain: {s.category}</span>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  <span>Readiness</span>
                  <span style={{ color: colors.accent }}>{s.level}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${s.level}%`, height: '100%', background: colors.accent, borderRadius: '3px' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. OPERATIONAL DEPLOYMENTS (TIMELINE) */}
      <section id="timeline" style={{ padding: '4rem 2rem 5rem 2rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: colors.accent }}>
            DEPLOYMENT LOGS
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.4rem 0 0 0', color: '#0f172a' }}>
            Operational Record
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {template.experiences.map((exp, i) => (
            <div
              key={i}
              style={{
                padding: '1.75rem 2rem',
                borderRadius: '16px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                display: 'grid',
                gridTemplateColumns: '120px 1.5fr 2fr',
                gap: '2rem',
                alignItems: 'center'
              }}
            >
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: colors.accent }}>{exp.year}</div>
              <div>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '1.05rem' }}>{exp.role}</div>
                <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{exp.organization}</div>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ALLIED COMMAND ENDORSEMENTS */}
      <section id="testimonials" style={{ padding: '4rem 2rem 6rem 2rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: colors.accent }}>
            ALLIED COMMAND ENDORSEMENTS
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.4rem 0 0 0', color: '#0f172a' }}>
            Words from Frontline Comrades
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
              <p style={{ fontSize: '1rem', lineHeight: 1.65, fontStyle: 'italic', color: '#334155', margin: '0 0 1.5rem 0' }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img
                  src={t.avatar}
                  alt={t.author}
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${colors.accent}` }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>{t.author}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. VANGUARD FOOTER */}
      <footer style={{ padding: '3rem 2rem 1.5rem 2rem', maxWidth: '1240px', margin: '0 auto', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', paddingBottom: '2rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
            © {new Date().getFullYear()} {template.name} Portfolio Template. Relentless Forward Momentum.
          </div>
          <Link href="/templates" style={{ fontSize: '0.85rem', color: colors.accent, fontWeight: 700, textDecoration: 'none' }}>
            Explore All 20 Archetypes →
          </Link>
        </div>
        <div style={{ textAlign: 'center', padding: '1rem 0 0 0' }}>
          <span className="editorial-serif-italic" style={{ fontSize: 'clamp(3.5rem, 11vw, 9rem)', color: colors.accent, opacity: 0.15, userSelect: 'none', lineHeight: 0.85 }}>
            {template.name}
          </span>
        </div>
      </footer>
    </div>
  );
}
