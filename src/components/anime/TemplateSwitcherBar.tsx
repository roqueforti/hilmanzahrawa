'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ChevronDown, 
  Smartphone, 
  Monitor, 
  Tablet, 
  ArrowLeft, 
  ShoppingBag, 
  Check, 
  ChevronUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ANIME_TEMPLATES, AnimeTemplate } from '@/data/animeTemplates';

interface TemplateSwitcherBarProps {
  currentTemplate: AnimeTemplate;
  onDeviceChange?: (device: 'desktop' | 'tablet' | 'mobile') => void;
  activeDevice?: 'desktop' | 'tablet' | 'mobile';
  onOpenCustomizer?: () => void;
  activeSectionCount?: number;
}

export default function TemplateSwitcherBar({ 
  currentTemplate, 
  onDeviceChange,
  activeDevice = 'desktop',
  onOpenCustomizer,
  activeSectionCount
}: TemplateSwitcherBarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const templatesList = Object.values(ANIME_TEMPLATES);

  // Find prev and next characters
  const currentIndex = templatesList.findIndex((t) => t.slug === currentTemplate.slug);
  const prevTemplate = currentIndex > 0 ? templatesList[currentIndex - 1] : templatesList[templatesList.length - 1];
  const nextTemplate = currentIndex < templatesList.length - 1 ? templatesList[currentIndex + 1] : templatesList[0];

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        background: 'rgba(15, 23, 42, 0.94)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#ffffff',
        fontSize: '0.85rem',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Invisible backdrop to close dropdown on click outside */}
      {dropdownOpen && (
        <div
          onClick={() => setDropdownOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 95, cursor: 'default' }}
        />
      )}

      <div
        style={{
          maxWidth: '1500px',
          margin: '0 auto',
          padding: collapsed ? '0.35rem 1.25rem' : '0.55rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          position: 'relative',
          minHeight: collapsed ? '44px' : '54px',
        }}
      >
        {/* =========================================================================
           LEFT: Back to Store Hub + Anime Character Selector Dropdown + Prev/Next
           ========================================================================= */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
          <Link
            href="/templates"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.38rem 0.85rem',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              color: '#f1f5f9',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.78rem',
              whiteSpace: 'nowrap',
              transition: 'background 0.15s ease',
            }}
          >
            <ArrowLeft size={13} />
            <span>Store Hub</span>
          </Link>

          {/* Current Template Dropdown Pill */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.38rem 0.95rem',
                borderRadius: '9999px',
                background: currentTemplate.colors.accent,
                border: 'none',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                boxShadow: `0 2px 10px ${currentTemplate.colors.accentGlow}`,
                whiteSpace: 'nowrap',
                transition: 'transform 0.15s ease',
                position: 'relative',
                zIndex: 100,
              }}
            >
              <Sparkles size={13} />
              <span>{currentTemplate.name}</span>
              <span style={{ opacity: 0.85, fontWeight: 500, fontSize: '0.74rem' }}>
                ({currentTemplate.series})
              </span>
              <ChevronDown 
                size={13} 
                style={{ 
                  transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.2s ease'
                }} 
              />
            </button>

            {/* Dropdown Menu of All 20 Templates */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: 0,
                    width: 'min(350px, calc(100vw - 2rem))',
                    maxHeight: '460px',
                    overflowY: 'auto',
                    background: '#0f172a',
                    borderRadius: '16px',
                    border: '1.5px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
                    padding: '0.5rem',
                    zIndex: 110,
                  }}
                >
                  <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8' }}>
                    Select Anime Template (20 Available)
                  </div>
                  {templatesList.map((tmpl) => {
                    const isSelected = tmpl.id === currentTemplate.id;
                    return (
                      <Link
                        key={tmpl.id}
                        href={`/templates/${tmpl.slug}`}
                        onClick={() => setDropdownOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.55rem 0.75rem',
                          borderRadius: '10px',
                          background: isSelected ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                          color: '#ffffff',
                          textDecoration: 'none',
                          marginBottom: '2px',
                          transition: 'background 0.15s ease',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <span
                            style={{
                              width: '10px',
                              height: '10px',
                              borderRadius: '50%',
                              background: tmpl.colors.accent,
                              boxShadow: `0 0 6px ${tmpl.colors.accentGlow}`,
                            }}
                          />
                          <div>
                            <div style={{ fontWeight: isSelected ? 700 : 500, fontSize: '0.82rem' }}>
                              {tmpl.name}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                              {tmpl.series} • Gaya #{tmpl.styleId}
                            </div>
                          </div>
                        </div>

                        {isSelected ? (
                          <Check size={14} color={tmpl.colors.accent} />
                        ) : (
                          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                            ${tmpl.price}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Prev / Next Arrows */}
          <div className="hidden sm:flex items-center gap-1">
            <Link
              href={`/templates/${prevTemplate.slug}`}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#cbd5e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
              }}
              title={`Previous: ${prevTemplate.name}`}
            >
              <ChevronLeft size={14} />
            </Link>
            <Link
              href={`/templates/${nextTemplate.slug}`}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#cbd5e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
              }}
              title={`Next: ${nextTemplate.name}`}
            >
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Cross-Link to Dashboard Templates */}
          <Link
            href="/templates/dashboard/classic-admin"
            className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 hover:bg-emerald-900/60 transition"
            title="Explore 20 Dashboard & SaaS Templates"
          >
            <span>📊</span>
            <span>Dashboards (20)</span>
          </Link>
        </div>

        {/* =========================================================================
           CENTER: Interactive Device Switcher Simulation
           ========================================================================= */}
        <div 
          className="hidden md:flex"
          style={{ 
            alignItems: 'center', 
            background: 'rgba(0, 0, 0, 0.45)', 
            padding: '0.22rem', 
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          {[
            { id: 'desktop', icon: Monitor, label: 'Desktop' },
            { id: 'tablet', icon: Tablet, label: 'Tablet (768px)' },
            { id: 'mobile', icon: Smartphone, label: 'Mobile (390px)' },
          ].map((dev) => {
            const Icon = dev.icon;
            const isCurrent = activeDevice === dev.id;
            return (
              <button
                key={dev.id}
                onClick={() => onDeviceChange && onDeviceChange(dev.id as any)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.32rem 0.75rem',
                  borderRadius: '9999px',
                  background: isCurrent ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  color: isCurrent ? '#ffffff' : '#94a3b8',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.74rem',
                  fontWeight: isCurrent ? 700 : 500,
                  transition: 'all 0.15s ease',
                }}
                title={dev.label}
              >
                <Icon size={13} />
                <span>{dev.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
           RIGHT: Customizer Drawer Trigger + Buy CTA
           ========================================================================= */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {onOpenCustomizer && (
            <button
              onClick={onOpenCustomizer}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.38rem 0.95rem',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              title="Open Section Customizer & Reorder Engine"
            >
              <Sparkles size={13} color={currentTemplate.colors.accent} />
              <span>Customize Sections</span>
              {activeSectionCount !== undefined && (
                <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '9999px', background: `${currentTemplate.colors.accent}30`, color: currentTemplate.colors.accent, fontWeight: 700 }}>
                  {activeSectionCount}
                </span>
              )}
            </button>
          )}

          {/* Buy CTA */}
          <a
            href={`https://wa.me/6285806003234?text=Hi!%20I%20want%20to%20purchase%20the%20${currentTemplate.name}%20Anime%20Portfolio%20Template%20($${currentTemplate.price})`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.42rem 1.15rem',
              borderRadius: '9999px',
              background: currentTemplate.colors.accent,
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.78rem',
              textDecoration: 'none',
              boxShadow: `0 2px 12px ${currentTemplate.colors.accentGlow}`,
              transition: 'transform 0.15s ease',
            }}
          >
            <ShoppingBag size={13} />
            <span>Buy (${currentTemplate.price})</span>
          </a>

          {/* Collapse Bar Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.2rem',
            }}
            title={collapsed ? 'Expand bar' : 'Minimize bar'}
          >
            {collapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}
