'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  Zap, 
  Shield, 
  Activity, 
  Sparkles, 
  MessageCircle, 
  Mail, 
  Cpu, 
  Radio, 
  Terminal,
  Compass,
  Layers
} from 'lucide-react';
import { AnimeTemplate } from '@/data/animeTemplates';

interface ArchetypeHeroProps {
  template: AnimeTemplate;
}

export default function ArchetypeHero({ template }: ArchetypeHeroProps) {
  const { colors, layoutArchetype } = template;
  const isPng = template.bustUrl.endsWith('.png');

  if (layoutArchetype === 'asymmetric-split') {
    return (
      <div style={{ position: 'relative', zIndex: 10, color: '#0f172a' }}>
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
      </div>
    );
  }

  if (layoutArchetype === 'zen-minimal-centerfold') {
    return (
      <div style={{ position: 'relative', zIndex: 10, color: '#0f172a' }}>
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
      </div>
    );
  }

  if (layoutArchetype === 'vanguard-dynamic') {
    return (
      <div style={{ position: 'relative', zIndex: 10, color: '#0f172a' }}>
<section style={{ position: 'relative', width: '100%', padding: '2rem 1.5rem 4rem 1.5rem' }}>
        <div className="vanguard-hero-grid" style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <div className="asym-span-7">
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
              fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.98,
              margin: '0 0 1.25rem 0',
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
              fontSize: '1.1rem',
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

          <div className="asym-span-5" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '440px' }}>
            <div style={{ position: 'absolute', width: 'min(450px, 90vw)', height: 'min(450px, 90vw)', borderRadius: '50%', background: colors.gradientHero, filter: 'blur(50px)', pointerEvents: 'none' }} />

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

            <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '380px' }}>
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
      </div>
    );
  }

  if (layoutArchetype === 'editorial-dual-scroll') {
    return (
      <div style={{ position: 'relative', zIndex: 10, color: '#0f172a' }}>
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
      </div>
    );
  }

  if (layoutArchetype === 'cyber-hud-minimal') {
    return (
      <div style={{ position: 'relative', zIndex: 10, color: '#0f172a' }}>
{/* 1. TOP TELEMETRY STATUS BAR */}
      <div style={{
        maxWidth: '1360px',
        margin: '0 1.25rem 1.5rem 1.25rem',
        padding: '0.6rem 1.25rem',
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem',
        fontFamily: 'monospace',
        fontSize: '0.74rem',
        color: '#64748b'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#16a34a', fontWeight: 700 }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
            [ SYSTEM: ONLINE // SYNC 100% ]
          </span>
          <span>// LOC: {template.location.toUpperCase()}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <span>CORE: {template.japaneseName}</span>
          <span style={{ color: colors.accent, fontWeight: 700 }}>VER: 2026.4</span>
          <span>LATENCY: 0.84ms</span>
        </div>
      </div>

      {/* 2. CYBER-RETICLE HERO */}
      <section style={{ position: 'relative', width: '100%', padding: '1.5rem 1.5rem 4rem 1.5rem' }}>
        <div className="cyber-hero-grid" style={{
          maxWidth: '1360px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10
        }}>
          {/* Left Telemetry Column */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '6px',
              background: colors.badgeBg,
              color: colors.badgeText,
              fontFamily: 'monospace',
              fontSize: '0.76rem',
              fontWeight: 700,
              marginBottom: '1.25rem'
            }}>
              <Terminal size={14} />
              <span>SYS_ARCHETYPE // {template.slug.toUpperCase()}</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)',
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
            minHeight: '440px'
          }}>
            {/* Outer Rotating HUD Reticle Ring (Responsive) */}
            <div className="cyber-reticle-ring" style={{
              position: 'absolute',
              width: 'min(420px, 85vw)',
              height: 'min(420px, 85vw)',
              borderRadius: '50%',
              border: `1.5px dashed ${colors.accent}`,
              opacity: 0.35,
              pointerEvents: 'none'
            }} />

            {/* Inner Glowing Aura */}
            <div style={{
              position: 'absolute',
              width: 'min(360px, 75vw)',
              height: 'min(360px, 75vw)',
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
              maxWidth: '360px'
            }}>
              <img
                src={template.bustUrl}
                alt={template.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '440px',
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
              background: 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(8px)',
              border: '1px solid #e2e8f0',
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              fontFamily: 'monospace',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#0f172a',
              boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
              zIndex: 20,
              whiteSpace: 'nowrap'
            }}>
              [ TARGET: {template.slug.toUpperCase()} // LOCKED ]
            </div>
          </div>

          {/* Right Telemetry Column (Live Readout Blocks) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
            {template.stats.map((st, i) => (
              <div
                key={i}
                style={{
                  padding: '1.25rem 1.5rem',
                  borderRadius: '16px',
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>METRIC // 0{i + 1}</span>
                  {i === 0 ? <Cpu size={15} color={colors.accent} /> : i === 1 ? <Radio size={15} color="#16a34a" /> : <Zap size={15} color="#f59e0b" />}
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>{st.value}</div>
                <div style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 500 }}>{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
    );
  }

  // Default: Flanked Balanced Hero
  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
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
    </div>
  );
}
