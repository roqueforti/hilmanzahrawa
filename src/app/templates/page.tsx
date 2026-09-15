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
  Filter,
  X,
  HelpCircle,
  MessageCircle,
  ArrowUpRight,
  PackageCheck
} from 'lucide-react';
import { ANIME_TEMPLATES, ANIME_UNIVERSES, AnimeTemplate } from '@/data/animeTemplates';

const ARCHETYPE_FILTERS = [
  { id: 'all', name: 'All Layouts' },
  { id: 'flanked-balanced', name: 'Flanked Balanced' },
  { id: 'asymmetric-split', name: 'Asymmetric Split' },
  { id: 'zen-minimal-centerfold', name: 'Zen Centerfold' },
  { id: 'vanguard-dynamic', name: 'Vanguard Dynamic' },
  { id: 'editorial-dual-scroll', name: 'Editorial Lookbook' },
  { id: 'cyber-hud-minimal', name: 'Cyber HUD' },
];

export default function TemplatesMarketplacePage() {
  const [selectedUniverse, setSelectedUniverse] = useState('all');
  const [selectedArchetype, setSelectedArchetype] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const allTemplates = Object.values(ANIME_TEMPLATES);

  const filteredTemplates = allTemplates.filter((tmpl) => {
    const matchesUniverse = selectedUniverse === 'all' || tmpl.series === selectedUniverse;
    const matchesArchetype = selectedArchetype === 'all' || tmpl.layoutArchetype === selectedArchetype;
    const matchesSearch = 
      tmpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.layoutArchetype.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesUniverse && matchesArchetype && matchesSearch;
  });

  const faqs = [
    {
      q: "Apa saja yang didapatkan saat membeli template ini?",
      a: "Anda mendapatkan kode sumber (source code) lengkap Next.js 16 + React 19 + TypeScript + Framer Motion, Three.js 3D canvas particle engine, aset grafis tema, panduan instalasi singkat (README), dan hak lisensi komersial seumur hidup."
    },
    {
      q: "Apakah saya bisa mengubah warna, teks, dan foto karakternya?",
      a: "Sangat mudah! Semua data profil, portfolio proyek, warna tema, dan timeline tersimpan rapi dalam satu file konfigurasi TypeScript terpusat. Anda cukup mengubah teks, warna HEX, dan mengganti foto sesuai portofolio pribadi atau klien Anda."
    },
    {
      q: "Bisakah template ini dipakai untuk proyek klien komersial?",
      a: "Ya, 100%! Lisensi komersial berlaku seumur hidup tanpa royalti tersembunyi. Anda bebas menggunakannya untuk portofolio pribadi, website klien, agensi, maupun showcase profesional."
    },
    {
      q: "Teknologi apa saja yang digunakan pada template ini?",
      a: "Dibangun dengan standar modern: Next.js 16 (App Router), React 19, TypeScript, Framer Motion untuk micro-interactions, Three.js / HTML5 Canvas untuk particle animation 60fps, dan CSS responsif di semua perangkat."
    },
    {
      q: "Bagaimana cara melakukan pembelian dan pengiriman file?",
      a: "Klik tombol 'Beli' pada template yang Anda inginkan atau tombol 'Claim Bundle'. Anda akan terhubung langsung ke WhatsApp kami dengan template pesan otomatis. Pengiriman file source code ZIP atau akses repository GitHub dilakukan instan setelah konfirmasi pembayaran."
    },
    {
      q: "Apakah template ini siap dideploy ke Vercel?",
      a: "Ya, sudah terkonfigurasi out-of-the-box. Anda cukup push ke GitHub dan import ke Vercel, website akan live dalam hitungan detik tanpa error konfigurasi build."
    }
  ];

  return (
    <div style={{ background: '#090d16', color: '#f8fafc', minHeight: '100vh', fontFamily: "'Urbanist', sans-serif" }}>
      {/* Top Banner Notice */}
      <div 
        style={{ 
          background: 'linear-gradient(90deg, #0284c7 0%, #8b5cf6 50%, #ec4899 100%)', 
          color: '#ffffff', 
          padding: '0.6rem 1rem', 
          textAlign: 'center', 
          fontSize: '0.84rem', 
          fontWeight: 700, 
          letterSpacing: '0.04em' 
        }}
      >
        <span>⚡ 20 ANIME PORTFOLIO TEMPLATES READY TO DEPLOY • BUNDLE ALL-ACCESS ONLY $149 (DISCOUNT 80%)</span>
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
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          flexWrap: 'wrap',
          gap: '1rem'
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
            <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Official Digital Marketplace</div>
          </div>
        </Link>

        {/* Navigation Items: Link to Hilman's Portfolio & Store CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <Link
            href="/"
            style={{
              fontSize: '0.86rem',
              fontWeight: 600,
              color: '#cbd5e1',
              textDecoration: 'none',
              padding: '0.5rem 1.1rem',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              background: 'rgba(255, 255, 255, 0.04)',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <span>← Hilman's Portfolio</span>
          </Link>

          <a
            href="https://wa.me/6285806003234?text=Hi!%20I%20want%20to%20order%20the%20All-Access%20Anime%20Portfolio%20Template%20Bundle!"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 1.35rem',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.86rem',
              textDecoration: 'none',
              boxShadow: '0 4px 18px rgba(2, 132, 199, 0.4)'
            }}
          >
            <ShoppingBag size={15} />
            <span>Get Bundle ($149)</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '4.5rem 1.5rem 3rem', textAlign: 'center', position: 'relative' }}>
        {/* Glow Aura */}
        <div 
          style={{
            position: 'absolute',
            top: '25%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(800px, 90vw)',
            height: '400px',
            background: 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.2) 0%, rgba(168, 85, 247, 0.12) 40%, transparent 70%)',
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
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '1.5rem'
            }}
          >
            <Sparkles size={14} />
            <span>20 Premium Anime Themes • 6 Distinct Layout Archetypes</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              maxWidth: '980px',
              margin: '0 auto 1.25rem',
            }}
          >
            The Ultimate{' '}
            <span style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #a855f7 50%, #f43f5e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Anime Portfolio
            </span>{' '}
            Website Template Store
          </motion.h1>

          <p style={{ fontSize: 'clamp(1.02rem, 2vw, 1.2rem)', color: '#94a3b8', maxWidth: '720px', margin: '0 auto 2.5rem', lineHeight: 1.65 }}>
            Production-grade Next.js 16 codebases with signature 60fps particle accelerators, bespoke color harmonies, and battle-tested responsive architectures.
          </p>

          {/* Quick Value Metrics Strip */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.75rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
            fontSize: '0.85rem',
            color: '#cbd5e1'
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <PackageCheck size={16} color="#38bdf8" />
              <span><strong>20</strong> Unique Themes</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <Layers size={16} color="#a855f7" />
              <span><strong>6</strong> Layout Systems</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <Code2 size={16} color="#10b981" />
              <span>Next.js 16 + TypeScript</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={16} color="#f59e0b" />
              <span>Commercial License</span>
            </span>
          </div>

          {/* Search Bar */}
          <div style={{ maxWidth: '600px', margin: '0 auto 2.5rem', position: 'relative' }}>
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
                padding: '0.95rem 3rem 0.95rem 3rem',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1.5px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                fontSize: '0.95rem',
                outline: 'none',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '1.25rem',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Universe Filter Tabs */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', fontWeight: 700, marginBottom: '0.75rem' }}>
              FILTER BY ANIME UNIVERSE
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              {ANIME_UNIVERSES.map((uni) => (
                <button
                  key={uni.id}
                  onClick={() => setSelectedUniverse(uni.id)}
                  style={{
                    padding: '0.5rem 1.15rem',
                    borderRadius: '9999px',
                    background: selectedUniverse === uni.id ? '#38bdf8' : 'rgba(255, 255, 255, 0.05)',
                    color: selectedUniverse === uni.id ? '#0f172a' : '#cbd5e1',
                    border: `1px solid ${selectedUniverse === uni.id ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)'}`,
                    fontSize: '0.82rem',
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

          {/* Layout Archetype Filter Pills */}
          <div style={{ marginBottom: '3.5rem' }}>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', fontWeight: 700, marginBottom: '0.75rem' }}>
              FILTER BY DESIGN ARCHETYPE
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
              {ARCHETYPE_FILTERS.map((arch) => (
                <button
                  key={arch.id}
                  onClick={() => setSelectedArchetype(arch.id)}
                  style={{
                    padding: '0.4rem 0.95rem',
                    borderRadius: '8px',
                    background: selectedArchetype === arch.id ? '#a855f7' : 'rgba(255, 255, 255, 0.03)',
                    color: selectedArchetype === arch.id ? '#ffffff' : '#94a3b8',
                    border: `1px solid ${selectedArchetype === arch.id ? '#a855f7' : 'rgba(255, 255, 255, 0.08)'}`,
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {arch.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Templates Marketplace Grid */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              AVAILABLE THEMES
            </span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.2rem 0 0 0', color: '#ffffff' }}>
              Showing {filteredTemplates.length} of {allTemplates.length} Templates
            </h2>
          </div>
          {(selectedUniverse !== 'all' || selectedArchetype !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedUniverse('all');
                setSelectedArchetype('all');
                setSearchQuery('');
              }}
              style={{
                fontSize: '0.8rem',
                color: '#f43f5e',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Reset Filters
            </button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {filteredTemplates.map((tmpl) => (
            <motion.div
              key={tmpl.id}
              whileHover={{ y: -6 }}
              style={{
                borderRadius: '24px',
                background: '#111827',
                border: `1.5px solid ${tmpl.colors.accent}40`,
                boxShadow: `0 20px 45px -10px ${tmpl.colors.accentGlow}`,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
              }}
            >
              {/* Card Top: Preview Visual */}
              <div>
                <div 
                  style={{ 
                    position: 'relative', 
                    height: '240px', 
                    background: '#0a0f1d', 
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  {/* Subtle Character Theme Aura Glow */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '220px',
                      height: '220px',
                      borderRadius: '50%',
                      background: tmpl.colors.gradientHero,
                      filter: 'blur(35px)',
                      opacity: 0.8
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
                      objectPosition: 'center 15%',
                      borderRadius: '16px',
                      position: 'relative',
                      zIndex: 1,
                      border: `1.5px solid ${tmpl.colors.borderStrong || 'rgba(255,255,255,0.15)'}`
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
                      fontSize: '0.88rem',
                      fontWeight: 800,
                      padding: '0.3rem 0.75rem',
                      borderRadius: '9999px',
                      background: 'rgba(0,0,0,0.75)',
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
                      background: 'rgba(0,0,0,0.65)',
                      color: '#cbd5e1',
                      border: '1px solid rgba(255,255,255,0.1)',
                      zIndex: 2
                    }}
                  >
                    Layout: {tmpl.layoutArchetype.replace('-', ' ')}
                  </span>
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '0.76rem', fontWeight: 700, color: tmpl.colors.accent, textTransform: 'uppercase' }}>
                        {tmpl.series}
                      </span>
                      <span style={{ fontSize: '0.76rem', color: '#64748b' }}>
                        {tmpl.japaneseName}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.35rem 0' }}>
                      {tmpl.name}
                    </h3>

                    <p style={{ fontSize: '0.86rem', fontWeight: 600, color: tmpl.colors.accent, margin: '0 0 0.65rem 0' }}>
                      {tmpl.roleTitle}
                    </p>

                    <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.55, margin: '0 0 1.25rem 0', minHeight: '40px' }}>
                      "{tmpl.tagline}"
                    </p>
                  </div>

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
              <div style={{ padding: '1.25rem 1.5rem', background: 'rgba(0, 0, 0, 0.3)', borderTop: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', gap: '0.75rem' }}>
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
                    padding: '0.75rem 1.25rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <ShoppingBag size={14} />
                  <span>Buy</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Value Proposition Grid */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
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
                desc: 'Type-safe architecture with React 19, Framer Motion, and Tailwind CSS v4 ready.'
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

      {/* Pricing Comparison: Single vs All-Access Universe Pass */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#38bdf8', letterSpacing: '0.08em' }}>
            PRICING OPTIONS
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 800, color: '#ffffff', margin: '0.5rem 0 0 0' }}>
            Choose Your Tier
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {/* Option 1: Single Template */}
          <div style={{
            padding: '2.5rem',
            borderRadius: '28px',
            background: '#111827',
            border: '1.5px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Individual License</span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', margin: '0.4rem 0 1rem 0' }}>Single Template</h3>
              <div style={{ fontSize: '2.8rem', fontWeight: 900, color: '#ffffff', marginBottom: '1.5rem' }}>
                $39 <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}>/ character theme</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem', color: '#cbd5e1' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} color="#38bdf8" />
                  <span>1 Full Next.js 16 Source Code Project</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} color="#38bdf8" />
                  <span>Dedicated Character 3D Particle Accents</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} color="#38bdf8" />
                  <span>Commercial License for 1 End Product</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} color="#38bdf8" />
                  <span>Lifetime Bug Fixes & Code Updates</span>
                </li>
              </ul>
            </div>
            <a
              href="https://wa.me/6285806003234?text=Hi!%20I%20want%20to%20order%201%20Anime%20Portfolio%20Template%20($39)"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '0.95rem 1.5rem',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none'
              }}
            >
              Order Single Theme ($39)
            </a>
          </div>

          {/* Option 2: All-Access Universe Pass (Featured) */}
          <div style={{
            padding: '2.5rem',
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
            border: '2px solid #6366f1',
            boxShadow: '0 25px 70px -15px rgba(99, 102, 241, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: '-12px', right: '2rem', background: 'linear-gradient(90deg, #ec4899, #8b5cf6)', color: '#ffffff', fontSize: '0.72rem', fontWeight: 800, padding: '0.25rem 0.85rem', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Most Popular • Save 80%
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#c7d2fe', textTransform: 'uppercase' }}>Lifetime Pass</span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', margin: '0.4rem 0 1rem 0' }}>All-Access Universe Pass</h3>
              <div style={{ fontSize: '2.8rem', fontWeight: 900, color: '#ffffff', marginBottom: '1.5rem' }}>
                $149 <span style={{ fontSize: '1.1rem', color: '#94a3b8', textDecoration: 'line-through', fontWeight: 500 }}>$780</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem', color: '#e0e7ff' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} color="#a855f7" />
                  <span><strong>All 20 Anime Character Codebases</strong></span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} color="#a855f7" />
                  <span><strong>All 6 Distinct Architectural Layouts</strong></span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} color="#a855f7" />
                  <span>Unlimited Client & Commercial Projects</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} color="#a855f7" />
                  <span>All Future Anime Universes & Themes Added Free</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} color="#a855f7" />
                  <span>Priority WhatsApp & Email Support</span>
                </li>
              </ul>
            </div>
            <a
              href="https://wa.me/6285806003234?text=Hi!%20I%20want%20to%20get%20the%20All-Access%20Anime%20Universe%20Bundle%20for%20$149!"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.95rem 1.5rem',
                borderRadius: '9999px',
                background: '#22c55e',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '0 10px 25px rgba(34, 197, 94, 0.4)'
              }}
            >
              <ShoppingBag size={18} />
              <span>Claim All 20 Themes Now</span>
            </a>
          </div>
        </div>
      </section>

      {/* Customer Testimonials / Reviews */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#38bdf8', letterSpacing: '0.08em' }}>
            CREATOR TESTIMONIALS
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 800, color: '#ffffff', margin: '0.5rem 0 0 0' }}>
            What Developers Say
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {[
            {
              quote: "The Frieren and Luffy templates blew my clients away. The Three.js ambient particles and typography feel so premium. Saved me 3 weeks of design work.",
              author: "Ardiansyah Pratama",
              role: "Full-Stack Engineer & Freelancer",
              rating: 5
            },
            {
              quote: "Having 6 different layout archetypes is insane value. I bought the bundle and used Stark for my developer portfolio, and Zero Two for a design client.",
              author: "Kenji Sato",
              role: "Creative Technologist at NeoLabs",
              rating: 5
            },
            {
              quote: "Next.js 16 and TypeScript setup was totally turnkey. Extracted the ZIP, ran npm install, and deployed to Vercel in 5 minutes flat.",
              author: "Michelle Tan",
              role: "Product Designer & Indie Maker",
              rating: 5
            }
          ].map((rev, i) => (
            <div key={i} style={{ padding: '2rem', borderRadius: '24px', background: '#111827', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px' }}>
              <div>
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} size={15} color="#f59e0b" fill="#f59e0b" />
                  ))}
                </div>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: '#cbd5e1', margin: '0 0 1.5rem 0', fontStyle: 'italic' }}>
                  "{rev.quote}"
                </p>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>{rev.author}</div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{rev.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 6rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#38bdf8', letterSpacing: '0.08em' }}>
            HELP & QUESTIONS
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 800, color: '#ffffff', margin: '0.5rem 0 0 0' }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                borderRadius: '18px',
                background: '#111827',
                border: '1px solid rgba(255,255,255,0.08)',
                overflow: 'hidden'
              }}
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '1.02rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>{faq.q}</span>
                <span style={{ fontSize: '1.2rem', color: '#38bdf8', transform: activeFaq === idx ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>
                  +
                </span>
              </button>
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.65 }}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
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
          gap: '1.5rem',
          color: '#64748b',
          fontSize: '0.85rem'
        }}
      >
        <div>
          © {new Date().getFullYear()} Anime Portfolio Template Store. Created by Hilman Zahrawa.
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 600 }}>← Back to Portfolio</Link>
          <Link href="/templates/frieren" style={{ color: '#94a3b8', textDecoration: 'none' }}>Frieren</Link>
          <Link href="/templates/eren" style={{ color: '#94a3b8', textDecoration: 'none' }}>Eren</Link>
          <Link href="/templates/luffy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Luffy</Link>
          <Link href="/templates/sasuke" style={{ color: '#94a3b8', textDecoration: 'none' }}>Sasuke</Link>
          <Link href="/templates/zero-two" style={{ color: '#94a3b8', textDecoration: 'none' }}>Zero Two</Link>
        </div>
      </footer>
    </div>
  );
}
