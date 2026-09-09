'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  Shield, 
  Zap, 
  Cpu, 
  Eye, 
  Activity, 
  Layers, 
  Flame, 
  Compass, 
  Droplets,
  Star
} from 'lucide-react';
import { AnimeTemplate } from '@/data/animeTemplates';

interface AnimeHeroStageProps {
  template: AnimeTemplate;
}

export default function AnimeHeroStage({ template }: AnimeHeroStageProps) {
  const { colors, layoutArchetype } = template;

  // Render archetype 1: Flanked-Centered (Himmel / Frieren baseline style)
  if (layoutArchetype === 'flanked-centered') {
    return (
      <div style={{ position: 'relative', width: '100%', padding: '2rem 1rem 4rem' }}>
        {/* Top Headline Banner */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem', position: 'relative', zIndex: 2 }}>
          {/* Kanji Watermark Backdrop */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 'min(160px, 20vw)',
              fontWeight: 900,
              color: colors.isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
              userSelect: 'none',
              pointerEvents: 'none',
              letterSpacing: '0.15em',
              zIndex: 0
            }}
          >
            {template.japaneseName}
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 1.15rem',
              borderRadius: '9999px',
              background: colors.badgeBg,
              color: colors.badgeText,
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              border: `1px solid ${colors.borderStrong}`
            }}
          >
            <Sparkles size={14} />
            <span>{template.universeBadge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: colors.textPrimary,
              margin: '0 auto 0.75rem',
              maxWidth: '900px'
            }}
          >
            {template.name}
            <span 
              style={{ 
                display: 'block', 
                fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', 
                fontWeight: 400, 
                fontFamily: 'Instrument Serif, serif',
                fontStyle: 'italic',
                color: colors.accent,
                marginTop: '0.35rem' 
              }}
            >
              {template.roleTitle}
            </span>
          </motion.h1>
        </div>

        {/* Central Flanked Stage */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            maxWidth: '1200px',
            margin: '0 auto',
            minHeight: '460px',
          }}
        >
          {/* Radial Studio Aura Glow */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(760px, 92vw)',
              height: 'min(480px, 80vw)',
              background: template.colors.gradientHero,
              filter: 'blur(45px)',
              pointerEvents: 'none',
              zIndex: 1,
              borderRadius: '50%'
            }}
          />

          {/* Left Flank */}
          <div 
            className="hidden md:flex"
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '320px',
              maxWidth: '280px',
              zIndex: 3,
              marginRight: 'auto'
            }}
          >
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.65rem 1.25rem',
                borderRadius: '9999px',
                background: colors.bgSurface,
                border: `1.5px solid ${colors.borderSubtle}`,
                boxShadow: colors.cardShadow,
                fontSize: '0.85rem',
                fontWeight: 600,
                color: colors.textPrimary,
                width: 'fit-content'
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors.accent, boxShadow: `0 0 10px ${colors.accent}` }} />
              <span>Available for Missions</span>
            </motion.div>

            {/* Trusted stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                padding: '1rem 1.25rem',
                borderRadius: '16px',
                background: colors.bgSurface,
                border: `1px solid ${colors.borderSubtle}`,
                boxShadow: colors.cardShadow,
              }}
            >
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: colors.accent, marginBottom: '0.2rem' }}>
                {template.stats[0]?.value}
              </div>
              <div style={{ fontSize: '0.8rem', color: colors.textMuted }}>
                {template.stats[0]?.label}
              </div>
            </motion.div>
          </div>

          {/* Center Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            style={{
              position: 'relative',
              zIndex: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 1rem',
            }}
          >
            <div
              style={{
                width: 'clamp(260px, 32vw, 380px)',
                height: 'clamp(280px, 36vw, 420px)',
                borderRadius: '32px',
                overflow: 'hidden',
                position: 'relative',
                border: `2px solid ${colors.borderStrong}`,
                boxShadow: `0 25px 60px -15px ${colors.accentGlow}`,
                background: colors.isDark ? colors.bgSecondary : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src={template.bustUrl}
                alt={template.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 15%'
                }}
              />
              {/* Bottom Gradient Fade */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(to top, ${colors.isDark ? colors.bgPrimary : '#ffffff'} 0%, transparent 40%)`,
                  pointerEvents: 'none'
                }}
              />
            </div>
          </motion.div>

          {/* Right Flank */}
          <div 
            className="hidden md:flex"
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '320px',
              maxWidth: '280px',
              zIndex: 3,
              marginLeft: 'auto',
              textAlign: 'right'
            }}
          >
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              style={{
                fontSize: '0.98rem',
                lineHeight: 1.6,
                color: colors.textSecondary,
                fontWeight: 500,
                margin: 0
              }}
            >
              "{template.statement}"
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <a
                href="#projects"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.75rem',
                  borderRadius: '9999px',
                  background: colors.accent,
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                  boxShadow: `0 10px 25px -5px ${colors.accentGlow}`,
                }}
              >
                <span>View Works</span>
                <ArrowUpRight size={16} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Render archetype 2: Asymmetric Split (Fern, Mikasa, Sabo)
  if (layoutArchetype === 'asymmetric-split') {
    return (
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
          {/* Left Column: Visual & Spec Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ position: 'relative' }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: '28px',
                overflow: 'hidden',
                border: `2px solid ${colors.borderStrong}`,
                boxShadow: `0 30px 70px -15px ${colors.accentGlow}`,
                background: colors.isDark ? colors.bgSecondary : '#ffffff',
                height: '480px',
              }}
            >
              <img
                src={template.bustUrl}
                alt={template.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(to top, ${colors.isDark ? colors.bgPrimary : 'rgba(255,255,255,0.9)'} 10%, transparent 70%)`
                }}
              />
              {/* Floating Stat Badges on Image */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  background: colors.bgGlass,
                  backdropFilter: 'blur(12px)',
                  padding: '1rem 1.25rem',
                  borderRadius: '18px',
                  border: `1px solid ${colors.borderSubtle}`
                }}
              >
                {template.stats.map((s, idx) => (
                  <div key={idx} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: colors.accent }}>{s.value}</div>
                    <div style={{ fontSize: '0.72rem', color: colors.textMuted, textTransform: 'uppercase' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-Impact Editorial Statement */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 1rem',
                borderRadius: '9999px',
                background: colors.badgeBg,
                color: colors.badgeText,
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
                border: `1px solid ${colors.borderStrong}`
              }}
            >
              <Zap size={14} />
              <span>{template.series} • {template.japaneseName}</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.12,
                color: colors.textPrimary,
                marginBottom: '1rem'
              }}
            >
              {template.name}
            </h1>

            <p style={{ fontSize: '1.4rem', fontWeight: 600, color: colors.accent, marginBottom: '1.25rem' }}>
              {template.roleTitle}
            </p>

            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: colors.textSecondary, marginBottom: '2rem' }}>
              {template.bio}
            </p>

            {/* Quote Block */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderRadius: '18px',
                background: colors.bgGlass,
                borderLeft: `4px solid ${colors.accent}`,
                borderTop: `1px solid ${colors.borderSubtle}`,
                borderRight: `1px solid ${colors.borderSubtle}`,
                borderBottom: `1px solid ${colors.borderSubtle}`,
                marginBottom: '2rem',
                fontStyle: 'italic',
                color: colors.textPrimary,
                fontSize: '0.98rem',
                lineHeight: 1.6
              }}
            >
              "{template.statement}"
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="#projects"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.85rem',
                  borderRadius: '9999px',
                  background: colors.accent,
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  boxShadow: `0 10px 25px -5px ${colors.accentGlow}`
                }}
              >
                <span>Explore Showcase</span>
                <ArrowUpRight size={16} />
              </a>

              <a
                href="#skills"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.85rem',
                  borderRadius: '9999px',
                  background: 'transparent',
                  border: `1.5px solid ${colors.borderStrong}`,
                  color: colors.textPrimary,
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textDecoration: 'none'
                }}
              >
                <span>Mastery Metrics</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Render archetype 3: Warrior Vanguard (Stark, Eren, Ace, Inosuke)
  if (layoutArchetype === 'warrior-vanguard') {
    return (
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        {/* Battle Banner Top */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1.5rem',
            borderRadius: '16px',
            background: colors.badgeBg,
            border: `1.5px solid ${colors.borderStrong}`,
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Flame size={18} color={colors.accent} />
            <span style={{ fontSize: '0.84rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: colors.textPrimary }}>
              COMBAT READINESS: 100% • VANGUARD STATUS ACTIVE
            </span>
          </div>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: colors.accent }}>
            {template.series} • {template.japaneseName}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          {/* Left: Heavy Typography & Battle stats */}
          <div>
            <h1
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                color: colors.textPrimary,
                marginBottom: '1rem'
              }}
            >
              {template.name}
            </h1>

            <div
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: colors.accent,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '1.5rem'
              }}
            >
              {template.roleTitle}
            </div>

            <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: colors.textSecondary, marginBottom: '2rem' }}>
              {template.tagline} {template.statement}
            </p>

            {/* Tactical stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
              {template.stats.map((st, i) => (
                <div
                  key={i}
                  style={{
                    padding: '1.15rem 1rem',
                    borderRadius: '16px',
                    background: colors.bgSurface,
                    border: `1.5px solid ${colors.borderStrong}`,
                    textAlign: 'center',
                    boxShadow: colors.cardShadow
                  }}
                >
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: colors.accent, marginBottom: '0.2rem' }}>
                    {st.value}
                  </div>
                  <div style={{ fontSize: '0.74rem', fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase' }}>
                    {st.label}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2.25rem',
                borderRadius: '14px',
                background: colors.accent,
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                boxShadow: `0 12px 30px -5px ${colors.accentGlow}`
              }}
            >
              <span>Engage Operations</span>
              <ArrowUpRight size={18} />
            </a>
          </div>

          {/* Right: Framed Cutout with Angle Cuts */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                width: '100%',
                maxWidth: '440px',
                height: '520px',
                borderRadius: '32px',
                overflow: 'hidden',
                border: `3px solid ${colors.accent}`,
                boxShadow: `0 25px 60px -15px ${colors.accentGlow}`,
                position: 'relative',
                background: colors.bgSecondary
              }}
            >
              <img
                src={template.bustUrl}
                alt={template.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 10%' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(to top, ${colors.bgPrimary} 15%, transparent 65%)`
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem',
                  padding: '1rem',
                  borderRadius: '14px',
                  background: 'rgba(0,0,0,0.7)',
                  backdropFilter: 'blur(8px)',
                  border: `1px solid ${colors.borderStrong}`,
                  color: '#ffffff',
                  fontSize: '0.85rem'
                }}
              >
                <div style={{ fontWeight: 800, color: colors.accent, marginBottom: '0.2rem' }}>{template.headline}</div>
                <div style={{ opacity: 0.85, fontSize: '0.78rem' }}>{template.bio}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render archetype 4: Cyberpunk HUD (Levi, Sasuke, Zero Two)
  if (layoutArchetype === 'cyberpunk-hud') {
    return (
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        {/* Top Telemetry Ticker */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            color: colors.accent,
            padding: '0.5rem 1rem',
            border: `1px solid ${colors.borderSubtle}`,
            borderRadius: '8px',
            marginBottom: '2.5rem',
            background: 'rgba(0,0,0,0.4)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={14} />
            <span>SYS_ONLINE // NEURAL_SYNC: 99.8% // STATUS: ACTIVE</span>
          </div>
          <div>LOC: {template.universeBadge} // TARGET: HIGH_PRECISION</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
          {/* Left HUD Information Block */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '6px',
                background: colors.badgeBg,
                color: colors.accent,
                border: `1px solid ${colors.borderStrong}`,
                marginBottom: '1.25rem'
              }}
            >
              <Cpu size={14} />
              <span>{template.series} // {template.japaneseName}</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: colors.textPrimary,
                marginBottom: '0.75rem'
              }}
            >
              {template.name}
            </h1>

            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: colors.accent, marginBottom: '1.5rem' }}>
              {template.roleTitle}
            </div>

            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: colors.textSecondary, marginBottom: '2rem' }}>
              {template.tagline} {template.statement}
            </p>

            {/* Metrics HUD Box */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                padding: '1.25rem',
                borderRadius: '16px',
                background: colors.bgSurface,
                border: `1.5px solid ${colors.borderStrong}`,
                marginBottom: '2rem',
                boxShadow: colors.cardShadow
              }}
            >
              {template.stats.map((s, i) => (
                <div key={i} style={{ fontFamily: 'monospace' }}>
                  <div style={{ fontSize: '0.72rem', color: colors.textMuted, textTransform: 'uppercase' }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: colors.accent, marginTop: '0.2rem' }}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.85rem 1.85rem',
                borderRadius: '10px',
                background: colors.accent,
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.95rem',
                fontFamily: 'monospace',
                textDecoration: 'none',
                boxShadow: `0 10px 25px -5px ${colors.accentGlow}`
              }}
            >
              <span>ACCESS_SCHEMATICS</span>
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Right: Cybernetic Portrait with Corner Brackets */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <div
              style={{
                width: '100%',
                maxWidth: '440px',
                height: '500px',
                borderRadius: '24px',
                overflow: 'hidden',
                border: `2px solid ${colors.borderStrong}`,
                boxShadow: `0 25px 60px -15px ${colors.accentGlow}`,
                position: 'relative',
                background: colors.bgSecondary
              }}
            >
              <img
                src={template.bustUrl}
                alt={template.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 10%' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(to top, ${colors.bgPrimary} 15%, transparent 65%)`
                }}
              />
              {/* Corner Bracket Overlays */}
              <div style={{ position: 'absolute', top: '15px', left: '15px', width: '20px', height: '20px', borderTop: `3px solid ${colors.accent}`, borderLeft: `3px solid ${colors.accent}` }} />
              <div style={{ position: 'absolute', top: '15px', right: '15px', width: '20px', height: '20px', borderTop: `3px solid ${colors.accent}`, borderRight: `3px solid ${colors.accent}` }} />
              <div style={{ position: 'absolute', bottom: '15px', left: '15px', width: '20px', height: '20px', borderBottom: `3px solid ${colors.accent}`, borderLeft: `3px solid ${colors.accent}` }} />
              <div style={{ position: 'absolute', bottom: '15px', right: '15px', width: '20px', height: '20px', borderBottom: `3px solid ${colors.accent}`, borderRight: `3px solid ${colors.accent}` }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render archetype 5: Dynamic Hero (Naruto, Luffy, Zenitsu)
  if (layoutArchetype === 'dynamic-hero') {
    return (
      <div style={{ position: 'relative', maxWidth: '1360px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 1.25rem',
              borderRadius: '9999px',
              background: colors.badgeBg,
              color: colors.badgeText,
              fontWeight: 800,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '1rem',
              border: `1.5px solid ${colors.borderStrong}`
            }}
          >
            <Star size={14} />
            <span>{template.universeBadge} • {template.japaneseName}</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: colors.textPrimary,
              marginBottom: '0.85rem'
            }}
          >
            {template.name}
          </h1>

          <div
            style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              fontWeight: 700,
              color: colors.accent,
              maxWidth: '800px',
              margin: '0 auto 1.5rem'
            }}
          >
            {template.headline} — {template.roleTitle}
          </div>

          <p style={{ fontSize: '1.15rem', lineHeight: 1.6, color: colors.textSecondary, maxWidth: '720px', margin: '0 auto 2.5rem' }}>
            "{template.statement}"
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="#projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.95rem 2.25rem',
                borderRadius: '9999px',
                background: colors.accent,
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: `0 12px 30px -5px ${colors.accentGlow}`
              }}
            >
              <span>Explore Epic Works</span>
              <ArrowUpRight size={18} />
            </a>

            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.95rem 2.25rem',
                borderRadius: '9999px',
                background: colors.bgSurface,
                border: `1.5px solid ${colors.borderStrong}`,
                color: colors.textPrimary,
                fontWeight: 700,
                fontSize: '1rem',
                textDecoration: 'none'
              }}
            >
              <span>Join Alliance</span>
            </a>
          </div>
        </div>

        {/* Central Kinetic Display */}
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(700px, 90vw)',
              height: '400px',
              background: template.colors.gradientHero,
              filter: 'blur(50px)',
              borderRadius: '50%',
              zIndex: 1
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 2,
              width: 'clamp(280px, 35vw, 420px)',
              height: 'clamp(320px, 40vw, 460px)',
              borderRadius: '36px',
              overflow: 'hidden',
              border: `3px solid ${colors.borderStrong}`,
              boxShadow: `0 30px 70px -15px ${colors.accentGlow}`,
              background: colors.bgSecondary
            }}
          >
            <img
              src={template.bustUrl}
              alt={template.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 10%' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(to top, ${colors.bgPrimary} 15%, transparent 65%)`
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Render archetype 6: Zen Minimal (Hinata, Giyuu, Shinobu)
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3.5rem 1.5rem 5rem', textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1.15rem',
          borderRadius: '9999px',
          background: colors.badgeBg,
          color: colors.badgeText,
          fontSize: '0.82rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
          border: `1px solid ${colors.borderSubtle}`
        }}
      >
        <Droplets size={14} />
        <span>{template.series} • {template.japaneseName}</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          color: colors.textPrimary,
          marginBottom: '0.85rem'
        }}
      >
        {template.name}
      </motion.h1>

      <div
        style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
          fontFamily: 'Instrument Serif, serif',
          fontStyle: 'italic',
          color: colors.accent,
          marginBottom: '1.75rem'
        }}
      >
        {template.roleTitle}
      </div>

      <p style={{ fontSize: '1.08rem', lineHeight: 1.75, color: colors.textSecondary, maxWidth: '680px', margin: '0 auto 2.5rem' }}>
        "{template.statement}"
      </p>

      {/* Elegant Portrait Frame with Subtle Radial Pulse */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem', position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(600px, 85vw)',
            height: '350px',
            background: template.colors.gradientHero,
            filter: 'blur(45px)',
            borderRadius: '50%',
            zIndex: 1
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            width: 'clamp(260px, 30vw, 360px)',
            height: 'clamp(300px, 35vw, 420px)',
            borderRadius: '28px',
            overflow: 'hidden',
            border: `1.5px solid ${colors.borderStrong}`,
            boxShadow: `0 20px 50px -15px ${colors.accentGlow}`,
            background: colors.bgSurface
          }}
        >
          <img
            src={template.bustUrl}
            alt={template.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 12%' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to top, ${colors.bgPrimary} 10%, transparent 60%)`
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <a
          href="#projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.85rem 1.85rem',
            borderRadius: '9999px',
            background: colors.accent,
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '0.92rem',
            textDecoration: 'none',
            boxShadow: `0 8px 20px -4px ${colors.accentGlow}`
          }}
        >
          <span>View Archive</span>
          <ArrowUpRight size={16} />
        </a>

        <a
          href="#contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.85rem 1.85rem',
            borderRadius: '9999px',
            background: colors.bgSurface,
            border: `1px solid ${colors.borderSubtle}`,
            color: colors.textPrimary,
            fontWeight: 500,
            fontSize: '0.92rem',
            textDecoration: 'none'
          }}
        >
          <span>Quiet Inquiry</span>
        </a>
      </div>
    </div>
  );
}
