'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Activity, ShieldCheck, Zap } from 'lucide-react';
import { AnimeTemplate } from '@/data/animeTemplates';

interface AnimeHeroStageProps {
  template: AnimeTemplate;
}

export default function AnimeHeroStage({ template }: AnimeHeroStageProps) {
  const { colors, layoutArchetype } = template;
  const isPng = template.bustUrl.endsWith('.png');

  // =========================================================================
  // ARCHETYPE 1: FLANKED-BALANCED (Frieren, Luffy, Tanjiro)
  // Exact Himmel Symmetrical Flanked Architecture
  // =========================================================================
  if (layoutArchetype === 'flanked-balanced') {
    return (
      <section className="hero-section-wrapper" style={{ position: 'relative', width: '100%', padding: '1.5rem 1.5rem 3.5rem 1.5rem' }}>
        <div
          style={{
            maxWidth: '1380px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            zIndex: 10
          }}
        >
          {/* Top Micro-Kicker */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.85rem',
              color: '#475569',
              fontWeight: 500,
              letterSpacing: '0.02em',
              marginBottom: '0.85rem',
              zIndex: 10
            }}
          >
            <span>( 1/1 ) {template.location}</span>
          </motion.div>

          {/* Hero Main Headline */}
          <motion.h1
            className="hero-headline"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            style={{
              fontSize: 'clamp(3.5rem, 7.5vw, 6.2rem)',
              fontWeight: 500,
              letterSpacing: '-0.035em',
              lineHeight: 0.98,
              margin: 0,
              zIndex: 10,
              color: '#0f172a'
            }}
          >
            Hi I'm {template.name}
            <span 
              className="editorial-serif-italic"
              style={{
                display: 'block',
                fontSize: '1.22em',
                fontWeight: 400,
                color: '#0f172a',
                marginTop: '-0.15rem',
                letterSpacing: '-0.02em'
              }}
            >
              {template.roleTitle}
            </span>
          </motion.h1>

          {/* Symmetrical Flanked Stage */}
          <div className="hero-stage-container">
            {/* Radiant Studio Glow Aura */}
            <div 
              style={{
                position: 'absolute',
                top: '42%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'min(960px, 95vw)',
                height: 'min(580px, 80vw)',
                background: colors.gradientHero,
                filter: 'blur(35px)',
                pointerEvents: 'none',
                zIndex: 1,
                borderRadius: '50%'
              }} 
            />

            {/* Left Flank */}
            <div className="hero-flank-left">
              <motion.div
                className="hero-badge-available"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.65rem 1.35rem',
                  borderRadius: '9999px',
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  boxShadow: `0 8px 24px ${colors.accentGlow}, 0 2px 6px rgba(0,0,0,0.03)`,
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#0f172a',
                  width: 'fit-content',
                  marginTop: '3.75rem'
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors.accent, boxShadow: `0 0 10px ${colors.accent}` }} />
                <span>Available for missions & roles</span>
              </motion.div>

              <motion.div
                className="hero-trusted-avatars"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}
              >
                <div style={{ display: 'flex' }}>
                  {template.companionAvatars.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Companion"
                      style={{ width: '34px', height: '34px', borderRadius: '50%', border: '2px solid #ffffff', marginLeft: i === 0 ? 0 : '-10px', objectFit: 'cover', background: '#f1f5f9' }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.45, fontWeight: 400 }}>
                  {template.companionTrustText}
                </span>
              </motion.div>
            </div>

            {/* Center Cutout Portrait */}
            <div className="hero-portrait-wrap">
              <img 
                src={template.bustUrl} 
                alt={`${template.name} - ${template.roleTitle}`}
                className="hero-portrait-img"
                style={{ mixBlendMode: isPng ? 'normal' : 'multiply' }}
              />
            </div>

            {/* Right Flank */}
            <div className="hero-flank-right">
              <motion.p
                className="hero-statement-right"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                style={{ fontSize: '0.98rem', lineHeight: 1.55, color: '#334155', fontWeight: 400, margin: 0, maxWidth: '280px', marginTop: '3.75rem' }}
              >
                {template.statement}
              </motion.p>

              <motion.a
                className="hero-cta-btn"
                href={`https://wa.me/6285806003234?text=Hi%20${template.name},%20let's%20talk!`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.85rem 2rem',
                  borderRadius: '9999px',
                  background: '#0f172a',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.2)',
                  width: 'fit-content'
                }}
              >
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
    );
  }

  // =========================================================================
  // ARCHETYPE 2: ASYMMETRIC-SPLIT (Stark, Levi, Ace, Inosuke)
  // Left 58% Bold Metrics & Heavy Punch // Right 42% Tall Portrait Pedestal
  // =========================================================================
  if (layoutArchetype === 'asymmetric-split') {
    return (
      <section style={{ position: 'relative', width: '100%', padding: '2rem 1.5rem 4rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '3rem', alignItems: 'center' }}>
          {/* Left Column: 7 Cols */}
          <div style={{ gridColumn: 'span 7' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '9999px', background: colors.badgeBg, color: colors.badgeText, fontSize: '0.8rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.accent }} />
              <span>{template.location}</span>
            </div>

            <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5.2rem)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.02, margin: '0 0 1.25rem 0', color: '#0f172a' }}>
              {template.name}
              <span className="editorial-serif-italic" style={{ display: 'block', color: colors.accent, fontSize: '1.1em', marginTop: '-0.1rem', fontWeight: 400 }}>
                {template.roleTitle}
              </span>
            </h1>

            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#475569', maxWidth: '520px', margin: '0 0 2rem 0' }}>
              {template.statement}
            </p>

            {/* 3 Metric Counter Blocks */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {template.stats.map((st, i) => (
                <div key={i} style={{ padding: '1rem', borderRadius: '16px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.2rem' }}>
                    {st.value}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>
                    {st.label}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <a
                href={`https://wa.me/6285806003234?text=Hi%20${template.name},%20let's%20collaborate!`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.9rem 2.25rem',
                  borderRadius: '9999px',
                  background: colors.accent,
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  boxShadow: `0 8px 24px ${colors.accentGlow}`,
                }}
              >
                <span>Deploy Assignment</span>
                <ArrowUpRight size={16} />
              </a>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ display: 'flex' }}>
                  {template.companionAvatars.map((src, i) => (
                    <img key={i} src={src} alt="Ally" style={{ width: '30px', height: '30px', borderRadius: '50%', border: '2px solid #ffffff', marginLeft: i === 0 ? 0 : '-8px', objectFit: 'cover' }} />
                  ))}
                </div>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Vetted Partners</span>
              </div>
            </div>
          </div>

          {/* Right Column: 5 Cols (Tall Cutout with Pedestal Aura) */}
          <div style={{ gridColumn: 'span 5', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', minHeight: '520px' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '380px', height: '380px', borderRadius: '50%', background: colors.gradientHero, filter: 'blur(45px)', pointerEvents: 'none' }} />
            
            <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '380px' }}>
              <img
                src={template.bustUrl}
                alt={template.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '480px',
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
    );
  }

  // =========================================================================
  // ARCHETYPE 3: ZEN-MINIMAL-CENTERFOLD (Fern, Hinata, Giyuu)
  // Serene Centerfold // Japanese Watermark Kanji // Horizontal Ribbon Pill
  // =========================================================================
  if (layoutArchetype === 'zen-minimal-centerfold') {
    return (
      <section style={{ position: 'relative', width: '100%', padding: '2rem 1.5rem 4rem 1.5rem', textAlign: 'center' }}>
        {/* Subtle Japanese Watermark Kanji */}
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 'min(180px, 24vw)', fontFamily: 'var(--font-serif-display)', fontStyle: 'italic', color: 'rgba(15, 23, 42, 0.03)', userSelect: 'none', pointerEvents: 'none', zIndex: 0 }}>
          {template.japaneseName}
        </div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{ fontSize: '0.82rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#64748b', fontWeight: 600, marginBottom: '0.85rem' }}>
            • {template.location} •
          </div>

          <h1 style={{ fontSize: 'clamp(3.2rem, 7vw, 5.8rem)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#0f172a', margin: '0 auto 1.5rem auto' }}>
            {template.name}{' '}
            <span className="editorial-serif-italic" style={{ color: colors.accent }}>
              {template.roleTitle}
            </span>
          </h1>

          {/* Centered Portrait with Wide Oval Aura */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '420px', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '480px', height: '340px', borderRadius: '50%', background: colors.gradientHero, filter: 'blur(40px)', pointerEvents: 'none' }} />
            
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

          {/* Horizontal Companion Ribbon Pill Card */}
          <div style={{ maxWidth: '780px', margin: '2rem auto 0 auto', background: '#ffffff', borderRadius: '9999px', border: '1.5px solid #e2e8f0', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex' }}>
                {template.companionAvatars.map((src, i) => (
                  <img key={i} src={src} alt="Companion" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #ffffff', marginLeft: i === 0 ? 0 : '-8px', objectFit: 'cover' }} />
                ))}
              </div>
              <span style={{ fontSize: '0.84rem', color: '#475569', fontStyle: 'italic', maxWidth: '380px', textAlign: 'left', lineHeight: 1.4 }}>
                "{template.statement}"
              </span>
            </div>

            <a
              href={`https://wa.me/6285806003234?text=Hi%20${template.name}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1.5rem', borderRadius: '9999px', background: '#0f172a', color: '#ffffff', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}
            >
              <span>Connect</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // ARCHETYPE 4: VANGUARD-DYNAMIC (Eren, Sabo, Zenitsu)
  // Angular Energy // High-Velocity Mission Ticker // Bursting Radar Badges
  // =========================================================================
  if (layoutArchetype === 'vanguard-dynamic') {
    return (
      <section style={{ position: 'relative', width: '100%', padding: '2rem 1.5rem 4rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2.5rem', alignItems: 'center' }}>
          {/* Left Column: 6.5 Cols */}
          <div style={{ gridColumn: 'span 7' }}>
            {/* Live Mission Ticker */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.95rem', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '1.25rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
              <span>ACTIVE MISSION: {template.location}</span>
            </div>

            <h1 style={{ fontSize: 'clamp(3.2rem, 6.5vw, 5.5rem)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 0.98, margin: '0 0 1.25rem 0', color: '#0f172a' }}>
              {template.name}
              <span style={{ display: 'block', color: colors.accent, fontFamily: 'var(--font-serif-display)', fontStyle: 'italic', fontWeight: 400, fontSize: '0.95em' }}>
                {template.roleTitle}
              </span>
            </h1>

            <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: '#475569', maxWidth: '500px', margin: '0 0 2rem 0' }}>
              {template.statement}
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <a
                href={`https://wa.me/6285806003234?text=Hi%20${template.name}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 2.2rem',
                  borderRadius: '9999px',
                  background: '#0f172a',
                  color: '#ffffff',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.2)'
                }}
              >
                <span>Deploy Operation</span>
                <ArrowUpRight size={16} />
              </a>

              <a
                href="#works"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.85rem 1.75rem',
                  borderRadius: '9999px',
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  color: '#0f172a',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                <span>View Directives</span>
              </a>
            </div>
          </div>

          {/* Right Column: 5.5 Cols (Bursting Portrait with Floating Badges) */}
          <div style={{ gridColumn: 'span 5', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '480px' }}>
            <div style={{ position: 'absolute', width: '420px', height: '420px', borderRadius: '50%', background: colors.gradientHero, filter: 'blur(50px)', pointerEvents: 'none' }} />

            {/* Top Floating Badge */}
            <div style={{ position: 'absolute', top: '10%', right: '5%', zIndex: 20, background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0.6rem 1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={14} color={colors.accent} />
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}>{template.stats[0]?.value}</div>
                <div style={{ fontSize: '0.65rem', color: '#64748b' }}>{template.stats[0]?.label}</div>
              </div>
            </div>

            {/* Bottom Floating Badge */}
            <div style={{ position: 'absolute', bottom: '12%', left: '0%', zIndex: 20, background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0.6rem 1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={14} color="#22c55e" />
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}>{template.stats[1]?.value}</div>
                <div style={{ fontSize: '0.65rem', color: '#64748b' }}>{template.stats[1]?.label}</div>
              </div>
            </div>

            <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '360px' }}>
              <img
                src={template.bustUrl}
                alt={template.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '460px',
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
    );
  }

  // =========================================================================
  // ARCHETYPE 5: EDITORIAL-DUAL-SCROLL (Mikasa, Sakura, Nami)
  // High-Fashion Magazine Lookbook // 50/50 Split Frame // Catalog Tags
  // =========================================================================
  if (layoutArchetype === 'editorial-dual-scroll') {
    return (
      <section style={{ position: 'relative', width: '100%', padding: '1.5rem 1.5rem 4rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Top Lookbook Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', marginBottom: '2.5rem', fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            <span>PORTFOLIO COLLECTION // VOL. 01</span>
            <span>{template.series}</span>
            <span>REF: #{template.id.toUpperCase()}-2026</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '3.5rem', alignItems: 'center' }}>
            {/* Left Column: 5 Cols (Framed Lookbook Portrait) */}
            <div style={{ gridColumn: 'span 5' }}>
              <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', background: '#f8fafc', border: '1.5px solid #e2e8f0', boxShadow: '0 20px 45px rgba(0,0,0,0.04)', padding: '2rem 1.5rem 1rem 1.5rem' }}>
                <div style={{ position: 'absolute', top: '1rem', left: '1.25rem', fontSize: '0.72rem', fontWeight: 600, color: '#94a3b8' }}>
                  FIGURE NO. 01
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', minHeight: '380px', alignItems: 'flex-end' }}>
                  <img
                    src={template.bustUrl}
                    alt={template.name}
                    style={{ width: '100%', maxHeight: '400px', objectFit: 'contain', mixBlendMode: isPng ? 'normal' : 'multiply' }}
                  />
                </div>

                <div style={{ paddingTop: '1rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0f172a' }}>{template.name}</span>
                  <span style={{ fontSize: '0.75rem', color: colors.accent, fontWeight: 700 }}>VERIFIED ELITE</span>
                </div>
              </div>
            </div>

            {/* Right Column: 7 Cols (Narrative Bio & Editorial Typography) */}
            <div style={{ gridColumn: 'span 7' }}>
              <span className="editorial-kicker">
                / Exclusive Profile /
              </span>

              <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.05, margin: '0 0 1.25rem 0', color: '#0f172a' }}>
                {template.name}
                <span className="editorial-serif-italic" style={{ display: 'block', color: colors.accent, fontSize: '1.15em', marginTop: '-0.1rem' }}>
                  {template.roleTitle}
                </span>
              </h1>

              <blockquote style={{ fontSize: '1.15rem', fontStyle: 'italic', color: '#334155', lineHeight: 1.6, borderLeft: `3px solid ${colors.accent}`, paddingLeft: '1.25rem', margin: '0 0 1.75rem 0' }}>
                "{template.statement}"
              </blockquote>

              <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: '#64748b', margin: '0 0 2.5rem 0' }}>
                {template.bio}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <a
                  href={`https://wa.me/6285806003234?text=Hi%20${template.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2.25rem', borderRadius: '9999px', background: '#0f172a', color: '#ffffff', fontWeight: 600, fontSize: '0.92rem', textDecoration: 'none' }}
                >
                  <span>Book Consultation</span>
                  <ArrowUpRight size={16} />
                </a>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ display: 'flex' }}>
                    {template.companionAvatars.map((src, i) => (
                      <img key={i} src={src} alt="Companion" style={{ width: '30px', height: '30px', borderRadius: '50%', border: '2px solid #ffffff', marginLeft: i === 0 ? 0 : '-8px', objectFit: 'cover' }} />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Endorsed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // ARCHETYPE 6: CYBER-HUD-MINIMAL (Zero Two, Sasuke, Naruto, Shinobu)
  // Futuristic Minimal HUD // Coordinate Brackets // Circular Reticle
  // =========================================================================
  return (
    <section style={{ position: 'relative', width: '100%', padding: '1.5rem 1.5rem 4rem 1.5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
        {/* Technical Coordinate Brackets */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', fontFamily: 'monospace', fontSize: '0.78rem', color: '#64748b', padding: '0.35rem 1rem', borderRadius: '6px', background: '#f8fafc', border: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
          <span>[ COORD: 35.6762° N // 139.6503° E ]</span>
          <span style={{ color: colors.accent }}>[ STATUS: ONLINE ]</span>
          <span>[ {template.universeBadge.toUpperCase()} ]</span>
        </div>

        <h1 style={{ fontSize: 'clamp(3.2rem, 7vw, 5.8rem)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.02, color: '#0f172a', margin: '0 auto 1.5rem auto' }}>
          {template.name}{' '}
          <span className="editorial-serif-italic" style={{ color: colors.accent }}>
            {template.roleTitle}
          </span>
        </h1>

        {/* Central HUD Portrait Stage with Circular Reticle Rings */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '820px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Subtle Concentric Radar Rings */}
          <svg style={{ position: 'absolute', width: '520px', height: '520px', pointerEvents: 'none', opacity: 0.15 }} viewBox="0 0 520 520">
            <circle cx="260" cy="260" r="240" fill="none" stroke={colors.accent} strokeWidth="1" strokeDasharray="6 6" />
            <circle cx="260" cy="260" r="180" fill="none" stroke={colors.accent} strokeWidth="1" />
            <circle cx="260" cy="260" r="120" fill="none" stroke={colors.accent} strokeWidth="1" strokeDasharray="4 4" />
          </svg>

          {/* Radial Studio Aura */}
          <div style={{ position: 'absolute', width: '450px', height: '450px', borderRadius: '50%', background: colors.gradientHero, filter: 'blur(45px)', pointerEvents: 'none' }} />

          {/* Left HUD Telemetry Module */}
          <div className="hidden md:flex" style={{ position: 'absolute', left: '0', top: '35%', flexDirection: 'column', gap: '1rem', textAlign: 'left', maxWidth: '200px', zIndex: 20 }}>
            <div style={{ padding: '0.85rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 8px 20px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Sync Ratio</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: colors.accent }}>99.8%</div>
            </div>
            <div style={{ padding: '0.85rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 8px 20px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Core Status</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>OPERATIONAL</div>
            </div>
          </div>

          {/* Center Cutout */}
          <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '380px' }}>
            <img
              src={template.bustUrl}
              alt={template.name}
              style={{
                width: '100%',
                maxHeight: '460px',
                objectFit: 'contain',
                mixBlendMode: isPng ? 'normal' : 'multiply',
                maskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)'
              }}
            />
          </div>

          {/* Right HUD Telemetry Module */}
          <div className="hidden md:flex" style={{ position: 'absolute', right: '0', top: '35%', flexDirection: 'column', gap: '1rem', textAlign: 'left', maxWidth: '200px', zIndex: 20 }}>
            <div style={{ padding: '0.85rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 8px 20px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Primary Directive</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>DEFENSE READY</div>
            </div>
            <a
              href={`https://wa.me/6285806003234?text=Hi%20${template.name}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.75rem 1.25rem', borderRadius: '12px', background: colors.accent, color: '#ffffff', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none' }}
            >
              <span>Initiate Link</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Marquee Partner Strip */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap', marginTop: '2.5rem', opacity: 0.65 }}>
          {template.brandPartners.map((b, i) => (
            <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', fontWeight: 500, color: '#64748b' }}>
              <span style={{ color: colors.accent }}>{b.icon}</span>
              <span>{b.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
