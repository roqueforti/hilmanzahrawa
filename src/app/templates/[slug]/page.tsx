'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X } from 'lucide-react';
import { ANIME_TEMPLATES, ProjectItem } from '@/data/animeTemplates';
import AnimeThreeAccents from '@/components/anime/AnimeThreeAccents';
import AnimeProjectModal from '@/components/anime/AnimeProjectModal';
import TemplateSwitcherBar from '@/components/anime/TemplateSwitcherBar';

// Import all 6 distinct layout archetypes
import FlankedBalancedLayout from '@/components/anime/archetypes/FlankedBalancedLayout';
import AsymmetricSplitLayout from '@/components/anime/archetypes/AsymmetricSplitLayout';
import ZenCenterfoldLayout from '@/components/anime/archetypes/ZenCenterfoldLayout';
import VanguardDynamicLayout from '@/components/anime/archetypes/VanguardDynamicLayout';
import EditorialLookbookLayout from '@/components/anime/archetypes/EditorialLookbookLayout';
import CyberHudLayout from '@/components/anime/archetypes/CyberHudLayout';

export default function AnimeTemplateLandingPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'frieren';
  const template = ANIME_TEMPLATES[slug];

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!template) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: '#ffffff', textAlign: 'center', padding: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Template Not Found</h1>
          <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>The requested anime character template does not exist.</p>
          <Link 
            href="/templates" 
            style={{ 
              display: 'inline-flex', 
              padding: '0.75rem 1.75rem', 
              borderRadius: '9999px', 
              background: '#38bdf8', 
              color: '#0f172a', 
              fontWeight: 700, 
              textDecoration: 'none' 
            }}
          >
            Browse All 20 Templates
          </Link>
        </div>
      </div>
    );
  }

  const { colors, layoutArchetype } = template;

  return (
    <div
      style={{
        background: '#ffffff',
        color: '#0f172a',
        fontFamily: 'var(--font-sans-display)',
        minHeight: '100vh',
        overflowX: 'hidden',
        position: 'relative',
        transition: 'background-color 0.4s ease'
      }}
    >
      {/* 1. Global Top Sticky Template Switcher Bar */}
      <TemplateSwitcherBar 
        currentTemplate={template} 
        activeDevice={activeDevice}
        onDeviceChange={setActiveDevice}
      />

      {/* 2. Three.js 3D Ambient Particle Engine (Modeled after BlueMoonPetals) */}
      <AnimeThreeAccents 
        mode={template.particle3DMode || 'falling-petals'} 
        color={colors.accent} 
      />

      {/* Viewport Frame Wrapper (If tablet or mobile mode toggled) */}
      <div
        className="template-viewport-frame"
        style={{
          width: activeDevice === 'desktop' ? '100%' : activeDevice === 'tablet' ? '768px' : '390px',
          maxWidth: '100vw',
          margin: '0 auto',
          transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: activeDevice !== 'desktop' ? '0 0 50px rgba(0,0,0,0.18)' : 'none',
          minHeight: '100vh',
          background: '#ffffff',
          position: 'relative',
          zIndex: 2,
          containerType: 'inline-size',
          overflowX: 'hidden'
        }}
      >
        {/* =========================================================================
           TOP NAVIGATION (Clean Editorial Standard)
           ========================================================================= */}
        <header
          className="landing-header"
          style={{
            padding: '2rem 2.5rem',
            maxWidth: '1380px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            zIndex: 50
          }}
        >
          {/* Character Name in Editorial Serif Italic */}
          <Link href={`/templates/${template.slug}`} style={{ textDecoration: 'none', color: '#0f172a' }}>
            <span 
              className="editorial-serif-italic landing-logo"
              style={{
                fontSize: '2.2rem',
                letterSpacing: '-0.01em',
                color: '#0f172a',
                display: 'inline-block'
              }}
            >
              {template.name}
            </span>
          </Link>

          {/* Right Navigation & Templates Store Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <Link
              href="/templates"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.55rem 1.25rem',
                borderRadius: '9999px',
                background: colors.accent,
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: `0 4px 14px ${colors.accentGlow}`,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <Sparkles size={14} />
              <span>All 20 Templates</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1.5px solid #e2e8f0',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#0f172a',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'background 0.2s'
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>

        {/* Mobile Slide-down Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="mobile-nav-dropdown"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                position: 'fixed',
                top: '85px',
                right: '2.5rem',
                background: '#ffffff',
                borderRadius: '20px',
                padding: '1.5rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                border: '1px solid #e2e8f0',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                minWidth: '220px'
              }}
            >
              <Link href="/templates" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: colors.accent, fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={16} />
                <span>All 20 Templates</span>
              </Link>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, fontSize: '0.95rem' }}>About & Philosophy</a>
              <a href="#works" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, fontSize: '0.95rem' }}>Selected Works</a>
              <a href="#mastery" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, fontSize: '0.95rem' }}>Mastery & Process</a>
              <a href="#timeline" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, fontSize: '0.95rem' }}>Historical Timeline</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, fontSize: '0.95rem' }}>Endorsements</a>
              <a href={`https://wa.me/6285806003234?text=Hi%20${template.name}`} onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: colors.accent, fontWeight: 600, fontSize: '0.95rem' }}>Transmission (Chat)</a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================================
           DISTINCT LAYOUT ARCHETYPE ROUTER
           Renders one of 6 completely different layout systems:
           1. flanked-balanced      : Frieren, Luffy, Tanjiro
           2. asymmetric-split      : Stark, Levi, Ace, Inosuke
           3. zen-minimal-centerfold: Fern, Hinata, Giyuu
           4. vanguard-dynamic      : Eren, Sabo, Zenitsu
           5. editorial-dual-scroll : Mikasa, Sakura, Nami
           6. cyber-hud-minimal     : Zero Two, Sasuke, Naruto, Shinobu
           ========================================================================= */}
        {layoutArchetype === 'asymmetric-split' ? (
          <AsymmetricSplitLayout template={template} onSelectProject={setSelectedProject} />
        ) : layoutArchetype === 'zen-minimal-centerfold' ? (
          <ZenCenterfoldLayout template={template} onSelectProject={setSelectedProject} />
        ) : layoutArchetype === 'vanguard-dynamic' ? (
          <VanguardDynamicLayout template={template} onSelectProject={setSelectedProject} />
        ) : layoutArchetype === 'editorial-dual-scroll' ? (
          <EditorialLookbookLayout template={template} onSelectProject={setSelectedProject} />
        ) : layoutArchetype === 'cyber-hud-minimal' ? (
          <CyberHudLayout template={template} onSelectProject={setSelectedProject} />
        ) : (
          <FlankedBalancedLayout template={template} onSelectProject={setSelectedProject} />
        )}
      </div>

      {/* Project Detail Modal Overlay */}
      <AnimeProjectModal
        project={selectedProject}
        colors={colors}
        characterName={template.name}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
