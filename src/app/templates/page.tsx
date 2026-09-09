'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Search, 
  ExternalLink, 
  ArrowRight, 
  Check, 
  ShoppingBag, 
  Layers, 
  Zap, 
  Code2, 
  Monitor, 
  ShieldCheck, 
  Star,
  Flame,
  Filter
} from 'lucide-react';
import { ANIME_TEMPLATES, ANIME_UNIVERSES, AnimeTemplate } from '@/data/animeTemplates';

export default function TemplatesMarketplacePage() {
  const [selectedUniverse, setSelectedUniverse] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allTemplates = Object.values(ANIME_TEMPLATES);

  const filteredTemplates = allTemplates.filter((tmpl) => {
    const matchesUniverse = selectedUniverse === 'all' || tmpl.series === selectedUniverse;
    const matchesSearch = 
      tmpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.layoutArchetype.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesUniverse && matchesSearch;
  });

  return (
    <div style={{ background: '#090d16', color: '#f8fafc', minHeight: '100vh', fontFamily: "'Urbanist', sans-serif" }}>
      {/* Top Banner Notice */}
      <div 
        style={{ 
          background: 'linear-gradient(90deg, #0284c7 0%, #8b5cf6 50%, #ec4899 100%)', 
          color: '#ffffff', 
          padding: '0.5rem 1rem', 
          textAlign: 'center', 
          fontSize: '0.84rem', 
          fontWeight: 700, 
          letterSpacing: '0.04em' 
        }}
      >
        <span>⚡ ALL 20 ANIME PORTFOLIO TEMPLATES ARE LIVE • GET THE LIFETIME ALL-ACCESS BUNDLE FOR $149</span>
      </div>

      {/* Navigation Header */}
      <header
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <Link 
          href="/templates" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            textDecoration: 'none', 
            color: '#ffffff' 
          }}
        >
          <span 
            style={{ 
              width: '38px', 
              height: '38px', 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, #38bdf8 0%, #a855f7 100%)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: '#ffffff', 
              fontWeight: 900, 
              fontSize: '1.1rem' 
            }}
          >
            ✦
          </span>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              AnimePortfolio
            </div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Template Collection</div>
          </div>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link
            href="/"
            style={{
              fontSize: '0.88rem',
              fontWeight: 600,
              color: '#94a3b8',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              transition: 'color 0.2s ease'
            }}
          >
            Original Himmel
          </Link>

          <a
            href="https://wa.me/6285806003234?text=Hi!%20I%20want%20to%20order%20the%20All-Access%20Anime%20Portfolio%20Template%20Bundle!"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.45rem',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.88rem',
              textDecoration: 'none',
              boxShadow: '0 4px 18px rgba(2, 132, 199, 0.4)'
            }}
          >
            <ShoppingBag size={16} />
            <span>Get Bundle ($149)</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 1.5rem 3.5rem', textAlign: 'center', position: 'relative' }}>
        {/* Glow Aura */}
        <div 
          style={{
            position: 'absolute',
            top: '25%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(800px, 90vw)',
            height: '400px',
            background: 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.18) 0%, rgba(168, 85, 247, 0.12) 40%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
            borderRadius: '50%',
            zIndex: 0
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 1.25rem',
              borderRadius: '9999px',
              background: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: '#38bdf8',
              fontSize: '0.84rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '1.5rem'
            }}
          >
            <Sparkles size={14} />
            <span>20 Premium Themed Landing Pages • Next.js 16 + Framer Motion</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.6rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              maxWidth: '960px',
              margin: '0 auto 1.5rem',
            }}
          >
            Sell Your Work with{' '}
            <span style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #a855f7 50%, #f43f5e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Anime-Themed
            </span>{' '}
            Portfolio Templates
          </motion.h1>

          <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: '#94a3b8', maxWidth: '720px', margin: '0 auto 2.5rem', lineHeight: 1.65 }}>
            Each template is engineered with a unique anime identity, custom color palette, dedicated layout archetype, and signature particle accent animation.
          </p>

          {/* Search & Filter Bar */}
          <div style={{ maxWidth: '580px', margin: '0 auto 3rem', position: 'relative' }}>
            <Search 
              size={18} 
              style={{ position: 'absolute', top: '50%', left: '1.25rem', transform: 'translateY(-50%)', color: '#64748b' }} 
            />
            <input
              type="text"
              placeholder="Search by character, anime, or layout archetype..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.95rem 1.25rem 0.95rem 3rem',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1.5px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                fontSize: '0.95rem',
                outline: 'none',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)'
              }}
            />
          </div>

          {/* Universe Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            {ANIME_UNIVERSES.map((uni) => (
              <button
                key={uni.id}
                onClick={() => setSelectedUniverse(uni.id)}
                style={{
                  padding: '0.55rem 1.25rem',
                  borderRadius: '9999px',
                  background: selectedUniverse === uni.id ? '#38bdf8' : 'rgba(255, 255, 255, 0.06)',
                  color: selectedUniverse === uni.id ? '#0f172a' : '#cbd5e1',
                  border: `1px solid ${selectedUniverse === uni.id ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)'}`,
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {uni.name} ({uni.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid Section */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.5rem 6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {filteredTemplates.map((tmpl) => (
            <motion.div
              key={tmpl.id}
              whileHover={{ y: -8 }}
              style={{
                borderRadius: '24px',
                background: '#131c2e',
                border: `1.5px solid ${tmpl.colors.accent}40`,
                boxShadow: `0 20px 45px -10px ${tmpl.colors.accentGlow}`,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
              }}
            >
              {/* Card Header & Preview Visual */}
              <div>
                <div 
                  style={{ 
                    position: 'relative', 
                    height: '240px', 
                    background: tmpl.colors.bgPrimary, 
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  {/* Subtle Aura Glow */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '200px',
                      height: '200px',
                      borderRadius: '50%',
                      background: tmpl.colors.gradientHero,
                      filter: 'blur(30px)'
                    }}
                  />

                  {/* Character Bust */}
                  <img
                    src={tmpl.bustUrl}
                    alt={tmpl.name}
                    style={{
                      width: '160px',
                      height: '200px',
                      objectFit: 'cover',
                      objectPosition: 'center 10%',
                      borderRadius: '16px',
                      position: 'relative',
                      zIndex: 1,
                      border: `1.5px solid ${tmpl.colors.borderStrong}`
                    }}
                  />

                  {/* Featured Tag */}
                  {tmpl.featuredTag && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        background: tmpl.colors.accent,
                        color: '#ffffff',
                        boxShadow: `0 4px 12px ${tmpl.colors.accentGlow}`,
                        zIndex: 2
                      }}
                    >
                      {tmpl.featuredTag}
                    </span>
                  )}

                  {/* Price Tag */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      padding: '0.3rem 0.75rem',
                      borderRadius: '9999px',
                      background: 'rgba(0,0,0,0.7)',
                      color: '#ffffff',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      zIndex: 2
                    }}
                  >
                    ${tmpl.price}
                  </span>

                  {/* Layout Archetype Badge */}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '0.75rem',
                      left: '1rem',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      textTransform: 'capitalize',
                      padding: '0.2rem 0.65rem',
                      borderRadius: '6px',
                      background: 'rgba(0,0,0,0.6)',
                      color: '#cbd5e1',
                      zIndex: 2
                    }}
                  >
                    Layout: {tmpl.layoutArchetype.replace('-', ' ')}
                  </span>
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: tmpl.colors.accent, textTransform: 'uppercase' }}>
                      {tmpl.series}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      {tmpl.japaneseName}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
                    {tmpl.name}
                  </h3>

                  <p style={{ fontSize: '0.88rem', fontWeight: 600, color: tmpl.colors.accent, marginBottom: '0.75rem' }}>
                    {tmpl.roleTitle}
                  </p>

                  <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.55, marginBottom: '1.25rem', minHeight: '40px' }}>
                    "{tmpl.tagline}"
                  </p>

                  {/* Color Swatches & Accent Pill */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: tmpl.colors.accent }} />
                      <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: tmpl.colors.accentSecondary }} />
                      <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: tmpl.colors.bgPrimary, border: '1px solid rgba(255,255,255,0.2)' }} />
                    </div>
                    <span style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Zap size={12} color={tmpl.colors.accent} />
                      <span>{tmpl.accentAnimationType.replace('-', ' ')}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div style={{ padding: '1.25rem 1.5rem', background: 'rgba(0, 0, 0, 0.25)', borderTop: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', gap: '0.75rem' }}>
                <Link
                  href={`/templates/${tmpl.slug}`}
                  style={{
                    flex: 1,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    background: tmpl.colors.accent,
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                    boxShadow: `0 4px 14px ${tmpl.colors.accentGlow}`,
                  }}
                >
                  <span>Live Preview</span>
                  <ExternalLink size={14} />
                </Link>

                <a
                  href={`https://wa.me/6285806003234?text=Hi!%20I%20want%20to%20purchase%20the%20${tmpl.name}%20Anime%20Portfolio%20Template%20($${tmpl.price})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  Buy
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Value Grid */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem 6rem' }}>
        <div style={{ borderRadius: '32px', background: '#111827', border: '1px solid rgba(255, 255, 255, 0.1)', padding: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>
              Why Developers & Creators Love These Templates
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Production-grade code crafted for maximum aesthetic impact, fast loading times, and effortless customization.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              {
                icon: <Zap size={24} color="#38bdf8" />,
                title: 'Signature Particle Accents',
                desc: 'GPU-accelerated 60fps HTML5 Canvas particle systems customized to each character’s lore.'
              },
              {
                icon: <Layers size={24} color="#a855f7" />,
                title: '6 Distinct Layout Archetypes',
                desc: 'From centered flanked heroes to brutalist warrior cards and cyberpunk telemetry HUDs.'
              },
              {
                icon: <Code2 size={24} color="#ec4899" />,
                title: 'Next.js 16 & TypeScript',
                desc: 'Type-safe architecture with React 19, Framer Motion, and Tailwind CSS v4.'
              },
              {
                icon: <Monitor size={24} color="#10b981" />,
                title: '100% Mobile Responsive',
                desc: 'Flawlessly optimized across smartphones, tablets, and ultra-wide desktop monitors.'
              },
              {
                icon: <ShieldCheck size={24} color="#f59e0b" />,
                title: 'Commercial License',
                desc: 'Use for personal portfolios, client deliverables, or commercial agency showcases with zero restrictions.'
              },
              {
                icon: <Star size={24} color="#f43f5e" />,
                title: '1-Click Vercel Deploy',
                desc: 'Pre-configured environment settings and build pipelines ready to deploy to production in seconds.'
              }
            ].map((f, i) => (
              <div key={i} style={{ padding: '1.75rem', borderRadius: '20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ marginBottom: '1rem' }}>{f.icon}</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>{f.title}</h3>
                <p style={{ fontSize: '0.92rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Bundle Tier */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem 6rem' }}>
        <div
          style={{
            borderRadius: '36px',
            background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
            border: '2px solid #6366f1',
            boxShadow: '0 25px 70px -15px rgba(99, 102, 241, 0.35)',
            padding: 'clamp(2.5rem, 5vw, 4rem)',
            textAlign: 'center'
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.15rem', borderRadius: '9999px', background: 'rgba(99, 102, 241, 0.25)', color: '#c7d2fe', fontWeight: 700, fontSize: '0.84rem', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            <Sparkles size={14} />
            <span>Limited Time Launch Bundle</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 900, color: '#ffffff', marginBottom: '1rem' }}>
            All-Access Anime Universe Pass
          </h2>

          <p style={{ fontSize: '1.1rem', color: '#c7d2fe', maxWidth: '640px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Get instant source code access to all 20 anime character templates, all future updates, and commercial usage rights.
          </p>

          <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.5rem' }}>
            $149 <span style={{ fontSize: '1.25rem', color: '#94a3b8', textDecoration: 'line-through' }}>$780</span>
          </div>
          <div style={{ fontSize: '0.9rem', color: '#a5b4fc', marginBottom: '2.5rem' }}>One-time payment • Lifetime updates • All 20 templates included</div>

          <a
            href="https://wa.me/6285806003234?text=Hi!%20I%20want%20to%20get%20the%20All-Access%20Anime%20Universe%20Bundle%20for%20$149!"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '1.1rem 2.8rem',
              borderRadius: '9999px',
              background: '#22c55e',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '1.05rem',
              textDecoration: 'none',
              boxShadow: '0 10px 30px -5px rgba(34, 197, 94, 0.5)',
              transition: 'transform 0.2s ease'
            }}
          >
            <ShoppingBag size={20} />
            <span>Claim All 20 Templates Now</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '2.5rem 1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          color: '#64748b',
          fontSize: '0.85rem'
        }}
      >
        <div>
          © {new Date().getFullYear()} Anime Portfolio Template Store. Built for passionate developers & creators.
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</Link>
          <Link href="/templates/frieren" style={{ color: '#38bdf8', textDecoration: 'none' }}>Frieren</Link>
          <Link href="/templates/naruto" style={{ color: '#f59e0b', textDecoration: 'none' }}>Naruto</Link>
          <Link href="/templates/luffy" style={{ color: '#ef4444', textDecoration: 'none' }}>Luffy</Link>
          <Link href="/templates/zero-two" style={{ color: '#f43f5e', textDecoration: 'none' }}>Zero Two</Link>
        </div>
      </footer>
    </div>
  );
}
