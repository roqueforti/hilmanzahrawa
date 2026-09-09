'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu, Radio, Terminal, Zap, Shield, Activity, Sparkles } from 'lucide-react';
import { AnimeTemplate, ProjectItem } from '@/data/animeTemplates';

interface ArchetypeProps {
  template: AnimeTemplate;
  onSelectProject: (p: ProjectItem) => void;
}

export default function CyberHudLayout({ template, onSelectProject }: ArchetypeProps) {
  const { colors } = template;
  const isPng = template.bustUrl.endsWith('.png');

  return (
    <div style={{ position: 'relative', zIndex: 10, color: '#0f172a' }}>
      {/* 1. TOP TELEMETRY STATUS BAR */}
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto 1.5rem auto',
        padding: '0.65rem 1.5rem',
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        fontFamily: 'monospace',
        fontSize: '0.75rem',
        color: '#64748b'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#16a34a', fontWeight: 700 }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
            [ SYSTEM: ONLINE // SYNC 100% ]
          </span>
          <span>// LOC: {template.location.toUpperCase()}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span>CORE: {template.japaneseName}</span>
          <span style={{ color: colors.accent, fontWeight: 700 }}>VER: 2026.4.0</span>
          <span>LATENCY: 0.84ms</span>
        </div>
      </div>

      {/* 2. CYBER-RETICLE HERO */}
      <section style={{ position: 'relative', width: '100%', padding: '2rem 2rem 5rem 2rem' }}>
        <div style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr minmax(340px, 480px) 1fr',
          gap: '2.5rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10
        }}>
          {/* Left Telemetry Column */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.9rem',
              borderRadius: '6px',
              background: colors.badgeBg,
              color: colors.badgeText,
              fontFamily: 'monospace',
              fontSize: '0.78rem',
              fontWeight: 700,
              marginBottom: '1.25rem'
            }}>
              <Terminal size={14} />
              <span>SYS_ARCHETYPE // {template.slug.toUpperCase()}</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.02,
              margin: '0 0 1rem 0',
              color: '#0f172a'
            }}>
              {template.name}
              <span style={{
                display: 'block',
                color: colors.accent,
                fontFamily: 'var(--font-serif-display)',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: '0.9em',
                marginTop: '0.2rem'
              }}>
                {template.roleTitle}
              </span>
            </h1>

            <p style={{
              fontSize: '1.05rem',
              lineHeight: 1.65,
              color: '#475569',
              margin: '0 0 2rem 0'
            }}>
              {template.statement}
            </p>

            <a
              href={`https://wa.me/6285806003234?text=INITIALIZE_UPLINK%20${template.name}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.9rem 2.2rem',
                borderRadius: '8px',
                background: '#0f172a',
                color: '#ffffff',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 10px 25px rgba(15, 23, 42, 0.2)'
              }}
            >
              <span>&gt; INITIALIZE_COMM_LINK</span>
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Center: Concentric HUD Radar Reticle with Character Portrait */}
          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '480px'
          }}>
            {/* Outer Rotating HUD Reticle Ring */}
            <div style={{
              position: 'absolute',
              width: '440px',
              height: '440px',
              borderRadius: '50%',
              border: `1.5px dashed ${colors.accent}`,
              opacity: 0.35,
              pointerEvents: 'none'
            }} />

            {/* Inner Glowing Aura */}
            <div style={{
              position: 'absolute',
              width: '380px',
              height: '380px',
              borderRadius: '50%',
              background: colors.gradientHero,
              filter: 'blur(30px)',
              pointerEvents: 'none'
            }} />

            {/* Center Portrait */}
            <div style={{
              position: 'relative',
              zIndex: 10,
              width: '100%',
              maxWidth: '380px'
            }}>
              <img
                src={template.bustUrl}
                alt={template.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '460px',
                  objectFit: 'contain',
                  mixBlendMode: isPng ? 'normal' : 'multiply',
                  maskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)'
                }}
              />
            </div>

            {/* HUD Coordinate Target Tag */}
            <div style={{
              position: 'absolute',
              bottom: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid #e2e8f0',
              padding: '0.35rem 1rem',
              borderRadius: '9999px',
              fontFamily: 'monospace',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#0f172a',
              boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
              zIndex: 20
            }}>
              [ TARGET: {template.slug.toUpperCase()} // LOCKED ]
            </div>
          </div>

          {/* Right Telemetry Column (Live Readout Blocks) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{
              padding: '1.25rem',
              borderRadius: '16px',
              background: '#f8fafc',
              border: '1.5px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>METRIC // 01</span>
                <Cpu size={15} color={colors.accent} />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>{template.stats[0]?.value}</div>
              <div style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 500 }}>{template.stats[0]?.label}</div>
            </div>

            <div style={{
              padding: '1.25rem',
              borderRadius: '16px',
              background: '#f8fafc',
              border: '1.5px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>METRIC // 02</span>
                <Radio size={15} color="#16a34a" />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>{template.stats[1]?.value}</div>
              <div style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 500 }}>{template.stats[1]?.label}</div>
            </div>

            <div style={{
              padding: '1.25rem',
              borderRadius: '16px',
              background: '#f8fafc',
              border: '1.5px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>METRIC // 03</span>
                <Zap size={15} color="#f59e0b" />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>{template.stats[2]?.value}</div>
              <div style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 500 }}>{template.stats[2]?.label}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TELEMETRY DIRECTIVES / SELECTED PROJECTS */}
      <section id="works" style={{ padding: '4rem 2rem 6rem 2rem', maxWidth: '1360px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '3rem',
          flexWrap: 'wrap',
          gap: '1.5rem',
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: '1.5rem'
        }}>
          <div>
            <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 700, color: colors.accent }}>
              [ SECTION: DIRECTIVES // TELEMETRY_SUITE ]
            </span>
            <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 800, letterSpacing: '-0.035em', margin: '0.4rem 0 0 0', color: '#0f172a' }}>
              Operational Modules & Protocols
            </h2>
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: '#64748b' }}>
            STATUS: 4/4 DEPLOYED // READY FOR INGESTION
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {template.projects.map((work, idx) => (
            <motion.div
              key={work.id}
              whileHover={{ y: -6 }}
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
                boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                position: 'relative'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: work.color || colors.accent }} />

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', fontWeight: 700, color: colors.accent }}>
                    NODE_0{idx + 1} // {work.category.toUpperCase()}
                  </span>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 700, color: '#16a34a' }}>
                    {work.metrics}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.75rem 0' }}>
                  {work.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
                  {work.desc}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  {work.tags.map((t) => (
                    <span key={t} style={{ fontFamily: 'monospace', fontSize: '0.72rem', padding: '0.2rem 0.55rem', borderRadius: '4px', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#334155' }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 700, color: colors.accent }}>
                  <span>&gt; ACCESS_SPECIFICATIONS</span>
                  <ArrowUpRight size={15} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. KERNEL DIAGNOSTICS (MASTERY) */}
      <section id="mastery" style={{ padding: '4rem 2rem 5rem 2rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 700, color: colors.accent }}>
            [ SUBSYSTEM DIAGNOSTICS & EFFICIENCY ]
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.4rem 0 0 0', color: '#0f172a' }}>
            Kernel Mastery & Telemetry
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.75rem' }}>
          {template.skills.map((s, idx) => (
            <div
              key={idx}
              style={{
                padding: '1.75rem',
                borderRadius: '16px',
                background: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '190px'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: '0.72rem', color: '#64748b', marginBottom: '0.75rem' }}>
                  <span>SUBROUTINE_{idx + 1}</span>
                  <span style={{ color: colors.accent, fontWeight: 700 }}>[ ACTIVE ]</span>
                </div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.25rem 0' }}>{s.name}</h4>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Domain: {s.category}</span>
              </div>

              <div style={{ marginTop: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  <span>EFFICIENCY</span>
                  <span style={{ color: colors.accent }}>{s.level}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${s.level}%`, height: '100%', background: colors.accent, borderRadius: '3px' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MISSION LOG & TIMELINE */}
      <section id="timeline" style={{ padding: '4rem 2rem 5rem 2rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 700, color: colors.accent }}>
            [ SYSTEM LOGS // FIELD REPUTATION ]
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.4rem 0 0 0', color: '#0f172a' }}>
            Mission Execution History
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {template.experiences.map((exp, i) => (
            <div
              key={i}
              style={{
                padding: '1.5rem 2rem',
                borderRadius: '16px',
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                display: 'grid',
                gridTemplateColumns: '140px 1fr 2fr',
                gap: '1.5rem',
                alignItems: 'center'
              }}
            >
              <div style={{ fontFamily: 'monospace', fontSize: '1.05rem', fontWeight: 800, color: colors.accent }}>
                &gt; {exp.year}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem' }}>{exp.role}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{exp.organization}</div>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0, lineHeight: 1.55 }}>
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. DECRYPTED TRANSMISSIONS (TESTIMONIALS) */}
      <section id="testimonials" style={{ padding: '4rem 2rem 6rem 2rem', maxWidth: '1360px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 700, color: colors.accent }}>
            [ DECRYPTED SENDER TRANSMISSIONS ]
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.4rem 0 0 0', color: '#0f172a' }}>
            Network Endorsements
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
                minHeight: '240px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.02)'
              }}
            >
              <div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#94a3b8', marginBottom: '1rem' }}>
                  // TRANSMISSION_PAYLOAD_{i + 1}
                </div>
                <p style={{ fontSize: '0.98rem', lineHeight: 1.65, fontStyle: 'italic', color: '#334155', margin: '0 0 1.5rem 0' }}>
                  "{t.quote}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img
                  src={t.avatar}
                  alt={t.author}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: `2px solid ${colors.accent}`
                  }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a' }}>{t.author}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CYBER FOOTER */}
      <footer style={{ padding: '3rem 2rem 1.5rem 2rem', maxWidth: '1360px', margin: '0 auto', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', fontFamily: 'monospace', fontSize: '0.82rem', color: '#64748b' }}>
          <div>© {new Date().getFullYear()} {template.name}. CYBER-HUD TELEMETRY INTERFACE.</div>
          <Link href="/templates" style={{ color: colors.accent, fontWeight: 700, textDecoration: 'none' }}>
            &gt; VIEW_ALL_20_ARCHETYPES
          </Link>
        </div>
        <div style={{ textAlign: 'center', padding: '2rem 0 0 0', overflow: 'hidden' }}>
          <span style={{
            fontSize: 'clamp(3.5rem, 11vw, 10.5rem)',
            lineHeight: 0.85,
            color: 'rgba(15, 23, 42, 0.04)',
            fontFamily: 'monospace',
            fontWeight: 800,
            display: 'inline-block',
            letterSpacing: '-0.04em',
            userSelect: 'none'
          }}>
            {template.slug.toUpperCase()}
          </span>
        </div>
      </footer>
    </div>
  );
}
