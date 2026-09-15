'use client';

import React, { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, Sliders } from 'lucide-react';
import { 
  ANIME_TEMPLATES, 
  ProjectItem, 
  SectionKey, 
  getTemplateSections 
} from '@/data/animeTemplates';
import AnimeThreeAccents from '@/components/anime/AnimeThreeAccents';
import AnimeProjectModal from '@/components/anime/AnimeProjectModal';
import TemplateSwitcherBar from '@/components/anime/TemplateSwitcherBar';
import SectionCustomizerDrawer from '@/components/anime/SectionCustomizerDrawer';
import DynamicSectionRenderer from '@/components/anime/DynamicSectionRenderer';

export default function AnimeTemplateLandingPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'frieren';
  const template = ANIME_TEMPLATES[slug];

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);

  // Active section order (defaults to template's preset sequence, user can live-customize)
  const defaultSeq = template ? (template.defaultSections || getTemplateSections(template.slug)) : [];
  const [activeSections, setActiveSections] = useState<SectionKey[]>(defaultSeq);

  // Update active sections when template slug changes
  useEffect(() => {
    if (template) {
      setActiveSections(template.defaultSections || getTemplateSections(template.slug));
    }
  }, [template?.slug]);

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

  const { colors } = template;

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
        onOpenCustomizer={() => setCustomizerOpen(true)}
        activeSectionCount={activeSections.length}
      />

      {/* 2. Three.js 3D Ambient Particle Engine */}
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
        {/* TOP NAVIGATION (Clean Editorial Standard) */}
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

          {/* Right Navigation & Customize Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <button
              onClick={() => setCustomizerOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.55rem 1.15rem',
                borderRadius: '9999px',
                background: '#f8fafc',
                color: '#0f172a',
                border: '1.5px solid #e2e8f0',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <Sliders size={14} color={colors.accent} />
              <span>Customize Sections</span>
            </button>

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
                minWidth: '240px'
              }}
            >
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCustomizerOpen(true);
                }} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  background: 'transparent', 
                  border: 'none', 
                  color: colors.accent, 
                  fontWeight: 700, 
                  fontSize: '0.95rem', 
                  cursor: 'pointer', 
                  padding: 0, 
                  textAlign: 'left' 
                }}
              >
                <Sliders size={16} />
                <span>Customize Sections</span>
              </button>

              <Link href="/templates" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: colors.accent, fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={16} />
                <span>All 20 Templates</span>
              </Link>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, fontSize: '0.95rem' }}>About & Philosophy</a>
              <a href="#works" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, fontSize: '0.95rem' }}>Selected Works</a>
              <a href="#mastery" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, fontSize: '0.95rem' }}>Mastery & Skills</a>
              <a href="#timeline" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, fontSize: '0.95rem' }}>Historical Timeline</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, fontSize: '0.95rem' }}>Endorsements</a>
              <a href={`https://wa.me/6285806003234?text=Hi%20${template.name}`} onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: colors.accent, fontWeight: 600, fontSize: '0.95rem' }}>Transmission (Chat)</a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================================
           DYNAMIC SECTION PIPELINE
           Renders sections in the exact customized or preset sequence:
           e.g. Hero -> About -> Skills -> Projects -> Experience -> Education -> Contact
           ========================================================================= */}
        <div>
          {activeSections.map((secKey, idx) => (
            <DynamicSectionRenderer
              key={`${secKey}-${idx}`}
              sectionKey={secKey}
              template={template}
              onSelectProject={setSelectedProject}
              index={idx}
            />
          ))}
        </div>
      </div>

      {/* Section Customizer Drawer */}
      <SectionCustomizerDrawer
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        currentTemplate={template}
        activeSections={activeSections}
        onUpdateSections={setActiveSections}
      />

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
