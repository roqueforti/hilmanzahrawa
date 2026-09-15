'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ArrowUp, 
  ArrowDown, 
  Trash2, 
  Plus, 
  RotateCcw, 
  Sparkles, 
  Check, 
  Copy, 
  Layers,
  LayoutGrid,
  ChevronRight,
  Eye
} from 'lucide-react';
import { 
  AnimeTemplate, 
  SectionKey, 
  PORTFOLIO_STYLES, 
  PortfolioStyle, 
  getTemplateSections 
} from '@/data/animeTemplates';

interface SectionCustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTemplate: AnimeTemplate;
  activeSections: SectionKey[];
  onUpdateSections: (sections: SectionKey[]) => void;
}

export const ALL_SECTION_META: Record<SectionKey, { label: string; category: string; description: string }> = {
  'hero': { label: 'Hero Stage', category: 'Intro', description: 'Hero banner, signature archetype visual, status & badges' },
  'about': { label: 'About & Philosophy', category: 'Bio', description: 'Core philosophy, personal statement & focus pillars' },
  'about-me': { label: 'About Me', category: 'Bio', description: 'Personal introduction, lore background & philosophy' },
  'manifesto': { label: 'Creative Manifesto', category: 'Bio', description: 'Design manifesto, visionary declaration & creed' },
  'introduction': { label: 'Editorial Introduction', category: 'Bio', description: 'Prologue & curatorial perspective' },
  'my-story': { label: 'Origin & Story', category: 'Bio', description: 'Narrative origin story, background & values' },
  'skills': { label: 'Core Skills & Mastery', category: 'Competency', description: 'Technical & creative disciplines with proficiency meters' },
  'tech-stack': { label: 'Tech Stack & Tooling', category: 'Competency', description: 'Languages, frameworks, tooling & infrastructure ecosystem' },
  'expertise': { label: 'Domain Expertise', category: 'Competency', description: 'Deep technical proficiencies & architectural capabilities' },
  'what-i-do': { label: 'What I Do', category: 'Competency', description: 'Services, specialized competencies & execution domains' },
  'projects': { label: 'Curated Projects', category: 'Works', description: 'Flagship projects with metrics, tech tags & modal inspect' },
  'selected-works': { label: 'Selected Works', category: 'Works', description: 'High-impact selected portfolio pieces and case highlights' },
  'selected-work': { label: 'Selected Work', category: 'Works', description: 'Curated premier work showcase' },
  'selected-projects': { label: 'Selected Projects', category: 'Works', description: 'Curated gallery of primary builds and deployments' },
  'featured-projects': { label: 'Featured Projects', category: 'Works', description: 'Top highlighted flagship projects with high-prominence cards' },
  'featured-work': { label: 'Featured Work', category: 'Works', description: 'Signature creative showcase' },
  'all-projects': { label: 'All Projects Index', category: 'Works', description: 'Comprehensive project catalog and exploration suite' },
  'interactive-projects': { label: 'Interactive Demos', category: 'Works', description: 'Hands-on interactive project simulations and experiments' },
  'case-study': { label: 'Case Study', category: 'Works', description: 'End-to-end architecture teardown and measurable impact' },
  'other-projects': { label: 'Other Explorations', category: 'Works', description: 'Secondary initiatives, labs and open-source tooling' },
  'portfolio': { label: 'Portfolio Gallery', category: 'Works', description: 'Complete portfolio showcase with category filtering' },
  'backend': { label: 'Backend Architecture', category: 'Engineering', description: 'Distributed systems, API scalability, database design & telemetry' },
  'frontend': { label: 'Frontend & UI Systems', category: 'Engineering', description: 'Design systems, responsive UI, micro-animations & web performance' },
  'experience': { label: 'Career Chronicles', category: 'History', description: 'Timeline of deployments, leadership positions & operational impact' },
  'journey': { label: 'Professional Journey', category: 'History', description: 'Milestone-by-milestone expedition through career & battles' },
  'timeline': { label: 'Chronological Timeline', category: 'History', description: 'Historical progression of roles, operations & achievements' },
  'internship': { label: 'Internship & Mentorship', category: 'History', description: 'Apprenticeships, mentored rotations & foundational builds' },
  'education': { label: 'Academic & Training', category: 'Credentials', description: 'Degree programs, academies, guild mentorships & scholastic honors' },
  'research': { label: 'Applied Research', category: 'Intellect', description: 'Research papers, technical whitepapers, patents & findings' },
  'github': { label: 'GitHub & Activity', category: 'Telemetry', description: 'Commit streaks, pull requests, contribution telemetry & code metrics' },
  'process': { label: 'Execution Process', category: 'Methodology', description: '4-phase framework: Discovery, Architecture, Execution, Optimization' },
  'organization': { label: 'Leadership & Guilds', category: 'Credentials', description: 'Guild ranks, student organizations, military divisions & impact' },
  'certificates': { label: 'Certificates & Licenses', category: 'Credentials', description: 'Verified credentials, hunter licenses & accredited badges' },
  'certifications': { label: 'Certifications', category: 'Credentials', description: 'Accredited industry & battle certifications' },
  'achievements': { label: 'Milestones & Honors', category: 'Recognition', description: 'Key victories, high-bounty achievements & industry recognition' },
  'highlights': { label: 'Career Highlights', category: 'Recognition', description: 'Spotlight accolades, records broken & major breakthroughs' },
  'services': { label: 'Commission Services', category: 'Business', description: 'Packaged deliverables, consultation rates & inquiry triggers' },
  'stats': { label: 'Combat Telemetry Stats', category: 'Metrics', description: 'High-impact stat counters: missions, win-rate, uptime, code shipped' },
  'articles': { label: 'Articles & Publications', category: 'Thought Leadership', description: 'Technical essays, thought leadership & publications' },
  'testimonials': { label: 'Endorsements', category: 'Social Proof', description: 'Endorsements from commanders, clients & allied companions' },
  'contact': { label: 'Transmission & Contact', category: 'Conversion', description: 'Direct transmission form, encrypted chat link & character footer' },
};

export default function SectionCustomizerDrawer({
  isOpen,
  onClose,
  currentTemplate,
  activeSections,
  onUpdateSections
}: SectionCustomizerDrawerProps) {
  const [selectedPresetId, setSelectedPresetId] = useState<number>(currentTemplate.styleId || 1);
  const [copied, setCopied] = useState(false);

  // Identify all available sections not yet active
  const availableSections = (Object.keys(ALL_SECTION_META) as SectionKey[]).filter(
    (key) => !activeSections.includes(key)
  );

  // Active current style metadata
  const currentActiveStyle = PORTFOLIO_STYLES.find(s => s.id === selectedPresetId) || PORTFOLIO_STYLES[0];

  const moveUp = (index: number) => {
    if (index <= 0) return;
    const next = [...activeSections];
    const temp = next[index];
    next[index] = next[index - 1];
    next[index - 1] = temp;
    onUpdateSections(next);
  };

  const moveDown = (index: number) => {
    if (index >= activeSections.length - 1) return;
    const next = [...activeSections];
    const temp = next[index];
    next[index] = next[index + 1];
    next[index + 1] = temp;
    onUpdateSections(next);
  };

  const removeSection = (index: number) => {
    const next = activeSections.filter((_, i) => i !== index);
    onUpdateSections(next);
  };

  const addSection = (key: SectionKey) => {
    onUpdateSections([...activeSections, key]);
  };

  const applyPreset = (style: PortfolioStyle) => {
    setSelectedPresetId(style.id);
    onUpdateSections([...style.sections]);
  };

  const resetToDefault = () => {
    const defaultSeq = currentTemplate.defaultSections || getTemplateSections(currentTemplate.slug);
    setSelectedPresetId(currentTemplate.styleId || 1);
    onUpdateSections(defaultSeq);
  };

  const copyFlowSequence = () => {
    const flow = activeSections.map(s => ALL_SECTION_META[s]?.label || s).join(' → ');
    navigator.clipboard.writeText(flow);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(4px)',
              zIndex: 999,
            }}
          />

          {/* Slide-out Drawer from Right */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(480px, 94vw)',
              background: '#0f172a',
              color: '#f8fafc',
              borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.5)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Drawer Header */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(30, 41, 59, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '6px',
                      background: currentTemplate.colors.accent,
                      color: '#ffffff',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                    }}
                  >
                    CUSTOMIZER
                  </span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>
                    Section Architecture
                  </h3>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>
                  Customize live section order & presets for {currentTemplate.name}
                </p>
              </div>

              <button
                onClick={onClose}
                aria-label="Close Customizer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              {/* 1. 20 PRESET STYLES SELECTOR */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Sparkles size={14} color={currentTemplate.colors.accent} />
                    <span>20 Portfolio Style Presets</span>
                  </label>
                  <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                    Active: #{currentActiveStyle.id}
                  </span>
                </div>

                <div style={{ position: 'relative' }}>
                  <select
                    value={selectedPresetId}
                    onChange={(e) => {
                      const id = Number(e.target.value);
                      const matched = PORTFOLIO_STYLES.find(s => s.id === id);
                      if (matched) applyPreset(matched);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: '#1e293b',
                      color: '#ffffff',
                      border: '1.5px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '12px',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      outline: 'none',
                    }}
                  >
                    {PORTFOLIO_STYLES.map((style) => (
                      <option key={style.id} value={style.id} style={{ background: '#0f172a', color: '#ffffff' }}>
                        #{style.id} {style.badge} ({style.sections.length} Sections)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preset Description Card */}
                <div
                  style={{
                    marginTop: '0.65rem',
                    padding: '0.75rem 0.95rem',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    fontSize: '0.78rem',
                    lineHeight: 1.5,
                    color: '#94a3b8',
                  }}
                >
                  <div style={{ color: currentTemplate.colors.accent, fontWeight: 600, marginBottom: '0.25rem' }}>
                    {currentActiveStyle.badge}
                  </div>
                  {currentActiveStyle.description}
                </div>
              </div>

              {/* 2. ACTIVE SECTIONS LIST (LIVE REORDER & TOGGLE) */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Layers size={14} color={currentTemplate.colors.accent} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#cbd5e1' }}>
                      Active Sections ({activeSections.length})
                    </span>
                  </div>
                  
                  <button
                    onClick={resetToDefault}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      padding: '0.25rem 0.55rem',
                      borderRadius: '6px',
                      background: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#94a3b8',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                    title="Reset to Template Default Sections"
                  >
                    <RotateCcw size={11} />
                    <span>Reset Default</span>
                  </button>
                </div>

                {/* Section Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {activeSections.map((secKey, index) => {
                    const meta = ALL_SECTION_META[secKey] || { label: secKey, category: 'Section', description: '' };
                    const isFirst = index === 0;
                    const isLast = index === activeSections.length - 1;

                    return (
                      <div
                        key={`${secKey}-${index}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '10px',
                          background: '#1e293b',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          gap: '0.6rem',
                        }}
                      >
                        {/* Number & Name */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
                          <span
                            style={{
                              width: '22px',
                              height: '22px',
                              borderRadius: '6px',
                              background: 'rgba(255, 255, 255, 0.08)',
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              color: currentTemplate.colors.accent,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            {index + 1}
                          </span>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 600, fontSize: '0.82rem', color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {meta.label}
                            </div>
                            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                              {secKey}  {meta.category}
                            </div>
                          </div>
                        </div>

                        {/* Reorder Buttons */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0 }}>
                          <button
                            onClick={() => moveUp(index)}
                            disabled={isFirst}
                            aria-label="Move Section Up"
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '6px',
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              color: isFirst ? '#475569' : '#cbd5e1',
                              cursor: isFirst ? 'not-allowed' : 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <ArrowUp size={13} />
                          </button>

                          <button
                            onClick={() => moveDown(index)}
                            disabled={isLast}
                            aria-label="Move Section Down"
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '6px',
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              color: isLast ? '#475569' : '#cbd5e1',
                              cursor: isLast ? 'not-allowed' : 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <ArrowDown size={13} />
                          </button>

                          <button
                            onClick={() => removeSection(index)}
                            disabled={activeSections.length <= 1}
                            aria-label="Remove Section"
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '6px',
                              background: 'rgba(239, 68, 68, 0.12)',
                              border: '1px solid rgba(239, 68, 68, 0.25)',
                              color: '#f87171',
                              cursor: activeSections.length <= 1 ? 'not-allowed' : 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              opacity: activeSections.length <= 1 ? 0.4 : 1,
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. AVAILABLE SECTIONS TO ADD */}
              {availableSections.length > 0 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Plus size={14} color={currentTemplate.colors.accent} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#cbd5e1' }}>
                      Add More Sections ({availableSections.length} Available)
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.65rem' }}>
                    {availableSections.slice(0, 14).map((key) => {
                      const meta = ALL_SECTION_META[key] || { label: key };
                      return (
                        <button
                          key={key}
                          onClick={() => addSection(key)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            padding: '0.4rem 0.75rem',
                            borderRadius: '8px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px dashed rgba(255, 255, 255, 0.2)',
                            color: '#cbd5e1',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <Plus size={12} color={currentTemplate.colors.accent} />
                          <span>{meta.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer CTA */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(15, 23, 42, 0.95)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <button
                onClick={copyFlowSequence}
                style={{
                  flex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {copied ? <Check size={14} color="#4ade80" /> : <Copy size={14} />}
                <span>{copied ? 'Flow Copied!' : 'Copy Section Flow'}</span>
              </button>

              <button
                onClick={onClose}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  background: currentTemplate.colors.accent,
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: `0 4px 14px ${currentTemplate.colors.accentGlow}`,
                }}
              >
                Done
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
