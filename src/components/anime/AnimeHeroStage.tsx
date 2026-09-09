'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { AnimeTemplate } from '@/data/animeTemplates';

interface AnimeHeroStageProps {
  template: AnimeTemplate;
}

export default function AnimeHeroStage({ template }: AnimeHeroStageProps) {
  const { colors } = template;
  const isPng = template.bustUrl.endsWith('.png');

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
        {/* Top Micro-Kicker: ( 1/1 ) [Origin] */}
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

        {/* Hero Main Headline (Urbanist + Instrument Serif Italic) */}
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

        {/* Central Hero Stage (Character Cutout Centered, Flanked Perfectly) */}
        <div className="hero-stage-container">
          {/* Radiant Studio Glow Aura (Completely smooth Gaussian falloff in signature accent) */}
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

          {/* Left Flank: Badge at Mid-Height + Avatars at Bottom */}
          <div className="hero-flank-left">
            {/* Available for new opportunities / missions */}
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
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: colors.accent,
                  boxShadow: `0 0 10px ${colors.accent}`
                }}
              />
              <span>Available for missions & roles</span>
            </motion.div>

            {/* Bottom: Trusted Avatars + Text */}
            <motion.div
              className="hero-trusted-avatars"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem'
              }}
            >
              <div style={{ display: 'flex' }}>
                {template.companionAvatars.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Companion"
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      border: '2px solid #ffffff',
                      marginLeft: i === 0 ? 0 : '-10px',
                      objectFit: 'cover',
                      background: '#f1f5f9'
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.45, fontWeight: 400 }}>
                {template.companionTrustText}
              </span>
            </motion.div>
          </div>

          {/* Center: Clean Cutout Character Portrait */}
          <div className="hero-portrait-wrap">
            <img 
              src={template.bustUrl} 
              alt={`${template.name} - ${template.roleTitle}`}
              className="hero-portrait-img"
              style={{
                mixBlendMode: isPng ? 'normal' : 'multiply'
              }}
            />
          </div>

          {/* Right Flank: Editorial Statement at Mid-Height + Let's Talk CTA at Bottom */}
          <div className="hero-flank-right">
            {/* Statement */}
            <motion.p
              className="hero-statement-right"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              style={{
                fontSize: '0.98rem',
                lineHeight: 1.55,
                color: '#334155',
                fontWeight: 400,
                margin: 0,
                maxWidth: '280px',
                marginTop: '3.75rem'
              }}
            >
              {template.statement}
            </motion.p>

            {/* Let's Talk Pill Button */}
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

        {/* Client / Partner Logo Marquee Strip */}
        <div 
          className="hero-marquee-strip" 
          style={{
            width: '100%',
            maxWidth: '1100px',
            margin: '2.5rem auto 0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            gap: '2.5rem',
            opacity: 0.65,
            zIndex: 10,
            scrollbarWidth: 'none'
          }}
        >
          {template.brandPartners.map((b, i) => (
            <div 
              key={i} 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                fontSize: '0.95rem', 
                fontWeight: 500, 
                color: '#64748b', 
                whiteSpace: 'nowrap' 
              }}
            >
              <span style={{ color: colors.accent, fontSize: '1.1rem' }}>{b.icon}</span>
              <span>{b.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
