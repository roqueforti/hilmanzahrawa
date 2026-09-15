'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Search, 
  ExternalLink, 
  Check, 
  ShoppingBag, 
  Layers, 
  Zap, 
  Code2, 
  Monitor, 
  ShieldCheck, 
  Star,
  X,
  PackageCheck
} from 'lucide-react';
import { ANIME_TEMPLATES, ANIME_UNIVERSES, PORTFOLIO_STYLES } from '@/data/animeTemplates';
import { 
  DASHBOARD_TEMPLATES, 
  DASHBOARD_STYLES
} from '@/data/dashboardTemplates';

const ARCHETYPE_FILTERS = [
  { id: 'all', name: 'All Layouts' },
  { id: 'flanked-balanced', name: 'Flanked Balanced' },
  { id: 'asymmetric-split', name: 'Asymmetric Split' },
  { id: 'zen-minimal-centerfold', name: 'Zen Centerfold' },
  { id: 'vanguard-dynamic', name: 'Vanguard Dynamic' },
  { id: 'editorial-dual-scroll', name: 'Editorial Lookbook' },
  { id: 'cyber-hud-minimal', name: 'Cyber HUD' },
];

const DASHBOARD_CATEGORIES = [
  { id: 'all', name: 'All 20 Dashboards' },
  { id: 'admin', name: 'Admin & Operations' },
  { id: 'finance', name: 'Finance & Sales' },
  { id: 'analytics', name: 'Analytics & BI' },
  { id: 'tech', name: 'DevOps & AI' },
  { id: 'hr-edu', name: 'HR & LMS' },
];

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') === 'dashboard' ? 'dashboard' : 'anime';

  const [categoryTab, setCategoryTab] = useState<'anime' | 'dashboard'>(initialCategory);
  const [selectedUniverse, setSelectedUniverse] = useState('all');
  const [selectedArchetype, setSelectedArchetype] = useState('all');
  const [selectedStyleId, setSelectedStyleId] = useState<number | 'all'>('all');
  const [selectedDashboardCategory, setSelectedDashboardCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat === 'dashboard') {
      setCategoryTab('dashboard');
    }
  }, [searchParams]);

  const allAnimeTemplates = Object.values(ANIME_TEMPLATES);
  const allDashboardTemplates = Object.values(DASHBOARD_TEMPLATES);

  const filteredAnimeTemplates = allAnimeTemplates.filter((tmpl) => {
    const matchesUniverse = selectedUniverse === 'all' || tmpl.series === selectedUniverse;
    const matchesArchetype = selectedArchetype === 'all' || tmpl.layoutArchetype === selectedArchetype;
    const matchesStyle = selectedStyleId === 'all' || tmpl.styleId === selectedStyleId;
    const matchesSearch = 
      tmpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.layoutArchetype.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesUniverse && matchesArchetype && matchesStyle && matchesSearch;
  });

  const filteredDashboardTemplates = allDashboardTemplates.filter((tmpl) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      tmpl.name.toLowerCase().includes(query) ||
      tmpl.styleName.toLowerCase().includes(query) ||
      tmpl.subtitle.toLowerCase().includes(query) ||
      tmpl.description.toLowerCase().includes(query) ||
      tmpl.sections.some((s) => s.toLowerCase().includes(query));

    let matchesCategory = true;
    if (selectedDashboardCategory === 'admin') {
      matchesCategory = [1, 2, 4, 18].includes(tmpl.styleId);
    } else if (selectedDashboardCategory === 'finance') {
      matchesCategory = [5, 6, 9, 10, 14, 17].includes(tmpl.styleId);
    } else if (selectedDashboardCategory === 'analytics') {
      matchesCategory = [3, 15, 20].includes(tmpl.styleId);
    } else if (selectedDashboardCategory === 'tech') {
      matchesCategory = [11, 16, 19].includes(tmpl.styleId);
    } else if (selectedDashboardCategory === 'hr-edu') {
      matchesCategory = [7, 8, 12, 13].includes(tmpl.styleId);
    }

    return matchesSearch && matchesCategory;
  });

  const faqs = [
    {
      q: "Apa saja yang didapatkan saat membeli template ini?",
      a: "Anda mendapatkan kode sumber (source code) lengkap Next.js 16 + React 19 + TypeScript + Framer Motion, Three.js 3D canvas particle engine, aset grafis tema, panduan instalasi singkat (README), dan hak lisensi komersial seumur hidup."
    },
    {
      q: "Apakah saya bisa mengubah warna, teks, dan tata letak bagiannya?",
      a: "Sangat mudah! Baik template anime maupun 20 dashboard dilengkapi interactive section reorder engine terpusat. Anda cukup mengubah konfigurasi TypeScript atau memakai slide drawer customizer bawaan."
    },
    {
      q: "Bisakah template ini dipakai untuk proyek klien komersial?",
      a: "Ya, 100%! Lisensi komersial berlaku seumur hidup tanpa royalti tersembunyi. Anda bebas menggunakannya untuk portofolio pribadi, website klien, agensi, maupun SaaS profesional."
    },
    {
      q: "Teknologi apa saja yang digunakan pada template ini?",
      a: "Dibangun dengan standar modern: Next.js 16 (App Router), React 19, TypeScript, Framer Motion untuk micro-interactions, Three.js / HTML5 Canvas untuk particle animation 60fps, dan SVG charts tanpa dependensi bloated."
    },
    {
      q: "Bagaimana cara melakukan pembelian dan pengiriman file?",
      a: "Klik tombol 'Beli' atau 'Get Template'. Anda akan terhubung langsung ke WhatsApp kami dengan template pesan otomatis. Pengiriman file source code ZIP atau akses repository GitHub dilakukan instan setelah konfirmasi pembayaran."
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
          background: categoryTab === 'dashboard' 
            ? 'linear-gradient(90deg, #059669 0%, #0284c7 50%, #6366f1 100%)' 
            : 'linear-gradient(90deg, #0284c7 0%, #8b5cf6 50%, #ec4899 100%)', 
          color: '#ffffff', 
          padding: '0.6rem 1rem', 
          textAlign: 'center', 
          fontSize: '0.84rem', 
          fontWeight: 700, 
          letterSpacing: '0.04em',
          transition: 'background 0.3s ease'
        }}
      >
        {categoryTab === 'dashboard' ? (
          <span>📊 20 PRODUCTION DASHBOARD & SAAS TEMPLATES READY • REALTIME SVG CHARTS • REORDER ENGINE</span>
        ) : (
          <span>⚡ 20 ANIME PORTFOLIO TEMPLATES READY TO DEPLOY • BUNDLE ALL-ACCESS ONLY $149 (DISCOUNT 80%)</span>
        )}
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
              background: categoryTab === 'dashboard' 
                ? 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)' 
                : 'linear-gradient(135deg, #38bdf8 0%, #a855f7 100%)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: '#ffffff', 
              fontWeight: 900, 
              fontSize: '1.1rem',
              transition: 'background 0.3s ease'
            }}
          >
            {categoryTab === 'dashboard' ? '📊' : '✦'}
          </span>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              {categoryTab === 'dashboard' ? 'DashboardSaaS' : 'AnimePortfolio'}
            </div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Official Digital Marketplace</div>
          </div>
        </Link>

        {/* Center Category Switcher */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: 'rgba(255, 255, 255, 0.05)', 
            padding: '0.3rem', 
            borderRadius: '9999px', 
            border: '1px solid rgba(255, 255, 255, 0.1)' 
          }}
        >
          <button
            onClick={() => {
              setCategoryTab('anime');
              setSearchQuery('');
            }}
            style={{
              padding: '0.45rem 1.1rem',
              borderRadius: '9999px',
              background: categoryTab === 'anime' ? 'linear-gradient(135deg, #38bdf8 0%, #a855f7 100%)' : 'transparent',
              color: categoryTab === 'anime' ? '#ffffff' : '#94a3b8',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: categoryTab === 'anime' ? '0 4px 15px rgba(56, 189, 248, 0.3)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <span>✦</span>
            <span>Anime Portfolios (20)</span>
          </button>
          <button
            onClick={() => {
              setCategoryTab('dashboard');
              setSearchQuery('');
            }}
            style={{
              padding: '0.45rem 1.1rem',
              borderRadius: '9999px',
              background: categoryTab === 'dashboard' ? 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)' : 'transparent',
              color: categoryTab === 'dashboard' ? '#ffffff' : '#94a3b8',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: categoryTab === 'dashboard' ? '0 4px 15px rgba(16, 185, 129, 0.3)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <span>📊</span>
            <span>Dashboard & SaaS (20)</span>
          </button>
        </div>

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
            href={
              categoryTab === 'dashboard'
                ? "https://wa.me/6285806003234?text=Hi!%20I%20want%20to%20order%20the%20All-Access%20Dashboard%20Templates%20Bundle!"
                : "https://wa.me/6285806003234?text=Hi!%20I%20want%20to%20order%20the%20All-Access%20Anime%20Portfolio%20Template%20Bundle!"
            }
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 1.35rem',
              borderRadius: '9999px',
              background: categoryTab === 'dashboard'
                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                : 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.86rem',
              textDecoration: 'none',
              boxShadow: categoryTab === 'dashboard'
                ? '0 4px 18px rgba(16, 185, 129, 0.4)'
                : '0 4px 18px rgba(2, 132, 199, 0.4)'
            }}
          >
            <ShoppingBag size={15} />
            <span>Get Bundle ($149)</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem 2.5rem', textAlign: 'center', position: 'relative' }}>
        {/* Glow Aura */}
        <div 
          style={{
            position: 'absolute',
            top: '25%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(800px, 90vw)',
            height: '400px',
            background: categoryTab === 'dashboard'
              ? 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.18) 0%, rgba(6, 182, 212, 0.12) 40%, transparent 70%)'
              : 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.2) 0%, rgba(168, 85, 247, 0.12) 40%, transparent 70%)',
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
              background: categoryTab === 'dashboard' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(56, 189, 248, 0.12)',
              border: `1px solid ${categoryTab === 'dashboard' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(56, 189, 248, 0.3)'}`,
              color: categoryTab === 'dashboard' ? '#10b981' : '#38bdf8',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '1.5rem'
            }}
          >
            <Sparkles size={14} />
            <span>
              {categoryTab === 'dashboard'
                ? '20 Dashboard Styles • 40+ Modular Components • Reorder Engine'
                : '20 Premium Anime Themes • 6 Distinct Layout Archetypes'}
            </span>
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
            {categoryTab === 'dashboard' ? (
              <>
                Production-Grade{' '}
                <span style={{ background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Dashboard & SaaS
                </span>{' '}
                UI Templates
              </>
            ) : (
              <>
                The Ultimate{' '}
                <span style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #a855f7 50%, #f43f5e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Anime Portfolio
                </span>{' '}
                Website Template Store
              </>
            )}
          </motion.h1>

          <p style={{ fontSize: 'clamp(1.02rem, 2vw, 1.2rem)', color: '#94a3b8', maxWidth: '750px', margin: '0 auto 2.5rem', lineHeight: 1.65 }}>
            {categoryTab === 'dashboard'
              ? 'Complete suite of 20 tailored dashboard styles for SaaS, analytics, executive reporting, DevOps telemetry, finance and HR. Built with interactive section reordering, collapsible navigation, and pure SVG charts.'
              : 'Production-grade Next.js 16 codebases with signature 60fps particle accelerators, bespoke color harmonies, and battle-tested responsive architectures.'}
          </p>

          {/* Quick Value Metrics Strip */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.75rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
            fontSize: '0.85rem',
            color: '#cbd5e1'
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <PackageCheck size={16} color={categoryTab === 'dashboard' ? '#10b981' : '#38bdf8'} />
              <span><strong>20</strong> {categoryTab === 'dashboard' ? 'Dashboard Styles' : 'Unique Themes'}</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <Layers size={16} color="#a855f7" />
              <span><strong>{categoryTab === 'dashboard' ? '40+' : '6'}</strong> {categoryTab === 'dashboard' ? 'Modular Sections' : 'Layout Systems'}</span>
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
              placeholder={
                categoryTab === 'dashboard'
                  ? 'Search by style (e.g. Sales, AI, HR, Analytics, Executive)...'
                  : 'Search by character, anime, or layout archetype...'
              }
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

          {/* Dashboard Category Tabs (Only when Dashboard tab active) */}
          {categoryTab === 'dashboard' && (
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', fontWeight: 700, marginBottom: '0.75rem' }}>
                FILTER BY DASHBOARD DOMAIN
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                {DASHBOARD_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedDashboardCategory(cat.id)}
                    style={{
                      padding: '0.5rem 1.15rem',
                      borderRadius: '9999px',
                      background: selectedDashboardCategory === cat.id ? '#10b981' : 'rgba(255, 255, 255, 0.05)',
                      color: selectedDashboardCategory === cat.id ? '#042f2e' : '#cbd5e1',
                      border: `1px solid ${selectedDashboardCategory === cat.id ? '#10b981' : 'rgba(255, 255, 255, 0.1)'}`,
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Anime Filters (Only when Anime tab active) */}
          {categoryTab === 'anime' && (
            <>
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

              {/* Portfolio Style Filter Pills (20 Styles) */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', fontWeight: 700, marginBottom: '0.75rem' }}>
                  FILTER BY GAYA PORTOFOLIO (20 STYLES PRESETS)
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', flexWrap: 'wrap', maxWidth: '1050px', margin: '0 auto' }}>
                  <button
                    onClick={() => setSelectedStyleId('all')}
                    style={{
                      padding: '0.35rem 0.85rem',
                      borderRadius: '9999px',
                      background: selectedStyleId === 'all' ? '#10b981' : 'rgba(255, 255, 255, 0.05)',
                      color: selectedStyleId === 'all' ? '#ffffff' : '#cbd5e1',
                      border: `1px solid ${selectedStyleId === 'all' ? '#10b981' : 'rgba(255, 255, 255, 0.1)'}`,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    All 20 Styles
                  </button>
                  {PORTFOLIO_STYLES.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => setSelectedStyleId(st.id)}
                      style={{
                        padding: '0.35rem 0.85rem',
                        borderRadius: '9999px',
                        background: selectedStyleId === st.id ? '#10b981' : 'rgba(255, 255, 255, 0.03)',
                        color: selectedStyleId === st.id ? '#ffffff' : '#94a3b8',
                        border: `1px solid ${selectedStyleId === st.id ? '#10b981' : 'rgba(255, 255, 255, 0.08)'}`,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      #{st.id} {st.badge}
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
            </>
          )}
        </div>
      </section>

      {/* DASHBOARDS SECTION (When categoryTab === 'dashboard') */}
      {categoryTab === 'dashboard' && (
        <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                DASHBOARD TEMPLATE PREVIEWS
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.2rem 0 0 0', color: '#ffffff' }}>
                Showing {filteredDashboardTemplates.length} of {allDashboardTemplates.length} Dashboard Styles
              </h2>
            </div>
            {(selectedDashboardCategory !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedDashboardCategory('all');
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
            {filteredDashboardTemplates.map((tmpl) => (
              <motion.div
                key={tmpl.id}
                whileHover={{ y: -6 }}
                style={{
                  borderRadius: '24px',
                  background: '#0d1322',
                  border: `1.5px solid ${tmpl.accentColor}40`,
                  boxShadow: `0 20px 45px -10px ${tmpl.accentGlow}`,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                }}
              >
                {/* Card Top: Simulated Dashboard HUD Preview */}
                <div>
                  <div 
                    style={{ 
                      position: 'relative', 
                      height: '210px', 
                      background: 'linear-gradient(180deg, #090e1a 0%, #111827 100%)', 
                      overflow: 'hidden',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    {/* Glow Aura */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '-30px',
                        right: '-30px',
                        width: '180px',
                        height: '180px',
                        borderRadius: '50%',
                        background: tmpl.accentColor,
                        filter: 'blur(50px)',
                        opacity: 0.25,
                        pointerEvents: 'none'
                      }}
                    />

                    {/* Window Controls & Style Tag */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                        <span style={{ fontSize: '0.72rem', color: '#64748b', marginLeft: '0.4rem', fontFamily: 'monospace' }}>
                          /dashboard/{tmpl.slug}
                        </span>
                      </div>

                      <span
                        style={{
                          fontSize: '0.84rem',
                          fontWeight: 800,
                          padding: '0.25rem 0.65rem',
                          borderRadius: '9999px',
                          background: 'rgba(0,0,0,0.7)',
                          color: '#ffffff',
                          border: '1px solid rgba(255,255,255,0.12)',
                          backdropFilter: 'blur(8px)'
                        }}
                      >
                        ${tmpl.price}
                      </span>
                    </div>

                    {/* Miniature Chart & KPI Preview */}
                    <div style={{ position: 'relative', zIndex: 1, marginTop: '0.75rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.65rem' }}>
                        {tmpl.kpis.slice(0, 3).map((kpi, kIdx) => (
                          <div 
                            key={kIdx} 
                            style={{ 
                              background: 'rgba(255, 255, 255, 0.04)', 
                              border: '1px solid rgba(255, 255, 255, 0.08)', 
                              borderRadius: '8px', 
                              padding: '0.45rem',
                              textAlign: 'center' 
                            }}
                          >
                            <div style={{ fontSize: '0.64rem', color: '#94a3b8', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {kpi.title.split(' ')[0]}
                            </div>
                            <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#ffffff' }}>
                              {kpi.value}
                            </div>
                            <div style={{ fontSize: '0.62rem', color: kpi.isPositive ? '#10b981' : '#f43f5e', fontWeight: 700 }}>
                              {kpi.change}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Mini Bar Chart Wave */}
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '36px', padding: '0 0.5rem' }}>
                        {tmpl.chartData.slice(0, 10).map((d, dIdx) => (
                          <div
                            key={dIdx}
                            style={{
                              flex: 1,
                              height: `${Math.max(15, Math.min(100, (d.value / 120) * 100))}%`,
                              borderRadius: '3px 3px 0 0',
                              background: dIdx === 5 ? tmpl.accentColor : 'rgba(255,255,255,0.15)',
                              boxShadow: dIdx === 5 ? `0 0 8px ${tmpl.accentColor}` : 'none'
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Bottom Tag */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.5rem',
                          borderRadius: '6px',
                          background: 'rgba(0,0,0,0.6)',
                          color: tmpl.accentColor,
                          border: `1px solid ${tmpl.accentColor}50`
                        }}
                      >
                        Style #{tmpl.styleId}: {tmpl.styleName}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: '#64748b' }}>
                        {tmpl.sections.length} Modular Sections
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: '0.74rem', fontWeight: 700, color: tmpl.accentColor, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          {tmpl.badge ? `${tmpl.badge} ` : ''}{tmpl.styleName}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: '#64748b', background: 'rgba(255,255,255,0.04)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                          Next.js 16 + SVG
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.35rem 0' }}>
                        {tmpl.name}
                      </h3>

                      <p style={{ fontSize: '0.84rem', fontWeight: 600, color: '#94a3b8', margin: '0 0 0.75rem 0' }}>
                        {tmpl.subtitle}
                      </p>

                      <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.55, margin: '0 0 0.85rem 0', minHeight: '40px' }}>
                        {tmpl.description}
                      </p>

                      {/* Section Sequence Flow Summary */}
                      <div style={{ 
                        fontSize: '0.72rem', 
                        color: '#64748b', 
                        marginBottom: '1rem', 
                        background: 'rgba(0,0,0,0.35)', 
                        padding: '0.5rem 0.75rem', 
                        borderRadius: '8px', 
                        border: '1px solid rgba(255,255,255,0.06)' 
                      }}>
                        <div style={{ color: tmpl.accentColor, fontWeight: 700, marginBottom: '0.2rem' }}>
                          COMPONENT SEQUENCE:
                        </div>
                        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {tmpl.sections.map((s) => s.replace('-', ' ')).join(' → ')}
                        </div>
                      </div>
                    </div>

                    {/* Features Badges */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <span style={{ fontSize: '0.7rem', color: '#cbd5e1', background: 'rgba(255,255,255,0.06)', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                        📑 Collapsible Nav
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#cbd5e1', background: 'rgba(255,255,255,0.06)', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                        📈 SVG Charts
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#cbd5e1', background: 'rgba(255,255,255,0.06)', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                        🎛️ Reorder Engine
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div style={{ padding: '1.25rem 1.5rem', background: 'rgba(0, 0, 0, 0.3)', borderTop: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', gap: '0.75rem' }}>
                  <Link
                    href={`/templates/dashboard/${tmpl.slug}`}
                    style={{
                      flex: 1,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      background: tmpl.accentColor,
                      color: '#0f172a',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      textDecoration: 'none',
                      boxShadow: `0 4px 14px ${tmpl.accentGlow}`,
                    }}
                  >
                    <span>Live Preview & Customize</span>
                    <ExternalLink size={14} />
                  </Link>

                  <a
                    href={`https://wa.me/6285806003234?text=Hi!%20I%20want%20to%20purchase%20the%20${encodeURIComponent(tmpl.name)}%20Dashboard%20Template%20($${tmpl.price})`}
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
      )}

      {/* ANIME TEMPLATES SECTION (When categoryTab === 'anime') */}
      {categoryTab === 'anime' && (
        <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                AVAILABLE THEMES
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.2rem 0 0 0', color: '#ffffff' }}>
                Showing {filteredAnimeTemplates.length} of {allAnimeTemplates.length} Templates
              </h2>
            </div>
            {(selectedUniverse !== 'all' || selectedArchetype !== 'all' || selectedStyleId !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedUniverse('all');
                  setSelectedArchetype('all');
                  setSelectedStyleId('all');
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
            {filteredAnimeTemplates.map((tmpl) => (
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
                      loading="lazy"
                      decoding="async"
                      width={160}
                      height={200}
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

                      {/* Portfolio Style & Section Badge */}
                      <div style={{ margin: '0 0 0.85rem 0', display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            padding: '0.2rem 0.65rem',
                            borderRadius: '9999px',
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: `1px solid ${tmpl.colors.accent}`,
                            color: '#ffffff',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                          }}
                        >
                          <Sparkles size={11} color={tmpl.colors.accent} />
                          <span>Gaya #{tmpl.styleId || 1}: {tmpl.styleName || 'Classic Professional'}</span>
                        </span>

                        <span
                          style={{
                            fontSize: '0.7rem',
                            color: '#94a3b8',
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '6px',
                          }}
                        >
                          {tmpl.defaultSections?.length || 7} Secs
                        </span>
                      </div>

                      <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.55, margin: '0 0 0.85rem 0', minHeight: '40px' }}>
                        "{tmpl.tagline}"
                      </p>

                      {/* Section Sequence Flow Summary */}
                      <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: '1.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Flow: {tmpl.defaultSections?.join(' → ') || 'Hero → About → Skills → Projects → Experience → Education → Contact'}
                      </div>
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
      )}

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
                title: categoryTab === 'dashboard' ? 'Realtime SVG Metrics Engine' : 'Signature Particle Accents',
                desc: categoryTab === 'dashboard' ? 'Ultra-fast, zero-bloat pure SVG charts for revenue, trends, and SLA telemetry without heavy chart libraries.' : 'GPU-accelerated 60fps HTML5 Canvas particle systems customized to each character’s lore.'
              },
              {
                icon: <Layers size={24} color="#a855f7" />,
                title: categoryTab === 'dashboard' ? '20 Tailored Presets & Customizer' : '6 Distinct Layout Archetypes',
                desc: categoryTab === 'dashboard' ? 'Slide-over drawer customizer allows live drag-reorder, toggling sections, and instant layout switching.' : 'From centered flanked heroes to brutalist warrior cards and cyberpunk telemetry HUDs.'
              },
              {
                icon: <Code2 size={24} color="#ec4899" />,
                title: 'Next.js 16 & TypeScript',
                desc: 'Type-safe architecture with React 19, Framer Motion, and Tailwind CSS v4 ready.'
              },
              {
                icon: <Monitor size={24} color="#10b981" />,
                title: 'Multi-Device Viewport Engine',
                desc: 'Integrated desktop, tablet, and mobile frame simulation for testing responsive dashboards in realtime.'
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

      {/* Pricing Comparison */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: categoryTab === 'dashboard' ? '#10b981' : '#38bdf8', letterSpacing: '0.08em' }}>
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
                $39 <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}>/ codebase</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem', color: '#cbd5e1' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} color={categoryTab === 'dashboard' ? '#10b981' : '#38bdf8'} />
                  <span>1 Full Next.js 16 Source Code Project</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} color={categoryTab === 'dashboard' ? '#10b981' : '#38bdf8'} />
                  <span>Interactive Customizer & Modular Sections</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} color={categoryTab === 'dashboard' ? '#10b981' : '#38bdf8'} />
                  <span>Commercial License for 1 End Product</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} color={categoryTab === 'dashboard' ? '#10b981' : '#38bdf8'} />
                  <span>Lifetime Bug Fixes & Code Updates</span>
                </li>
              </ul>
            </div>
            <a
              href={`https://wa.me/6285806003234?text=Hi!%20I%20want%20to%20order%201%20${categoryTab === 'dashboard' ? 'Dashboard' : 'Anime'}%20Template%20($39)`}
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
            background: categoryTab === 'dashboard' 
              ? 'linear-gradient(135deg, #064e3b 0%, #0f172a 100%)' 
              : 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
            border: `2px solid ${categoryTab === 'dashboard' ? '#10b981' : '#6366f1'}`,
            boxShadow: categoryTab === 'dashboard'
              ? '0 25px 70px -15px rgba(16, 185, 129, 0.4)'
              : '0 25px 70px -15px rgba(99, 102, 241, 0.4)',
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
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', margin: '0.4rem 0 1rem 0' }}>
                {categoryTab === 'dashboard' ? 'All-Access Dashboard Pass' : 'All-Access Universe Pass'}
              </h3>
              <div style={{ fontSize: '2.8rem', fontWeight: 900, color: '#ffffff', marginBottom: '1.5rem' }}>
                $149 <span style={{ fontSize: '1.1rem', color: '#94a3b8', textDecoration: 'line-through', fontWeight: 500 }}>$780</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem', color: '#e0e7ff' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} color={categoryTab === 'dashboard' ? '#10b981' : '#a855f7'} />
                  <span><strong>All 20 {categoryTab === 'dashboard' ? 'Dashboard Codebases' : 'Anime Character Codebases'}</strong></span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} color={categoryTab === 'dashboard' ? '#10b981' : '#a855f7'} />
                  <span><strong>All {categoryTab === 'dashboard' ? '40+ Modular Components' : '6 Distinct Layout Systems'}</strong></span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} color={categoryTab === 'dashboard' ? '#10b981' : '#a855f7'} />
                  <span>Unlimited Client & Commercial Projects</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} color={categoryTab === 'dashboard' ? '#10b981' : '#a855f7'} />
                  <span>All Future Updates & New Layouts Added Free</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} color={categoryTab === 'dashboard' ? '#10b981' : '#a855f7'} />
                  <span>Priority WhatsApp & Email Support</span>
                </li>
              </ul>
            </div>
            <a
              href={`https://wa.me/6285806003234?text=Hi!%20I%20want%20to%20get%20the%20All-Access%20${categoryTab === 'dashboard' ? 'Dashboard' : 'Anime%20Universe'}%20Bundle%20for%20$149!`}
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
              <span>Claim All 20 Templates Now</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section style={{ maxWidth: '880px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#a855f7', letterSpacing: '0.08em' }}>
            QUESTIONS & ANSWERS
          </span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff', margin: '0.4rem 0 0 0' }}>
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
          © {new Date().getFullYear()} Modern Templates Marketplace. Created by Hilman Zahrawa.
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 600 }}>← Back to Portfolio</Link>
          <Link href="/templates/dashboard/classic-admin" style={{ color: '#10b981', textDecoration: 'none' }}>Classic Admin</Link>
          <Link href="/templates/dashboard/modern-saas" style={{ color: '#10b981', textDecoration: 'none' }}>Modern SaaS</Link>
          <Link href="/templates/dashboard/executive-dashboard" style={{ color: '#10b981', textDecoration: 'none' }}>Executive</Link>
          <Link href="/templates/dashboard/ai-dashboard" style={{ color: '#10b981', textDecoration: 'none' }}>AI Dashboard</Link>
          <Link href="/templates/frieren" style={{ color: '#94a3b8', textDecoration: 'none' }}>Frieren</Link>
        </div>
      </footer>
    </div>
  );
}

export default function TemplatesMarketplacePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading Templates...</div>}>
      <MarketplaceContent />
    </Suspense>
  );
}
