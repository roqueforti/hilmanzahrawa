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
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { DASHBOARD_TEMPLATES, DASHBOARD_STYLES, DashboardTemplate } from '@/data/dashboardTemplates';

interface DashboardSwitcherBarProps {
  currentTemplate: DashboardTemplate;
  onDeviceChange?: (device: 'desktop' | 'tablet' | 'mobile') => void;
  activeDevice?: 'desktop' | 'tablet' | 'mobile';
  onOpenCustomizer?: () => void;
  activeSectionCount?: number;
}

export default function DashboardSwitcherBar({ 
  currentTemplate, 
  onDeviceChange,
  activeDevice = 'desktop',
  onOpenCustomizer,
  activeSectionCount
}: DashboardSwitcherBarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const templatesList = Object.values(DASHBOARD_TEMPLATES);

  // Find prev and next styles
  const currentIndex = DASHBOARD_STYLES.findIndex((s) => s.slug === currentTemplate.slug);
  const prevStyle = currentIndex > 0 ? DASHBOARD_STYLES[currentIndex - 1] : DASHBOARD_STYLES[DASHBOARD_STYLES.length - 1];
  const nextStyle = currentIndex < DASHBOARD_STYLES.length - 1 ? DASHBOARD_STYLES[currentIndex + 1] : DASHBOARD_STYLES[0];

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
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
          style={{ position: 'fixed', inset: 0, zIndex: 105, cursor: 'default' }}
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
           LEFT: Back to Store Hub + Dashboard Template Selector Dropdown + Prev/Next
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
                background: currentTemplate.accentColor,
                border: 'none',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                boxShadow: `0 2px 10px ${currentTemplate.accentGlow}`,
                whiteSpace: 'nowrap',
                transition: 'transform 0.15s ease',
                position: 'relative',
                zIndex: 106,
              }}
            >
              <LayoutDashboard size={13} />
              <span>#{currentTemplate.styleId} {currentTemplate.name}</span>
              <ChevronDown 
                size={13} 
                style={{ 
                  transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.2s ease'
                }} 
              />
            </button>

            {/* Dropdown Menu of All 20 Dashboard Templates */}
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
                    width: 'min(360px, calc(100vw - 2rem))',
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
                    Select Dashboard Style (20 Presets)
                  </div>
                  {templatesList.map((tmpl) => {
                    const isSelected = tmpl.id === currentTemplate.id;
                    return (
                      <Link
                        key={tmpl.id}
                        href={`/templates/dashboard/${tmpl.slug}`}
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
                              background: tmpl.accentColor,
                              boxShadow: `0 0 6px ${tmpl.accentGlow}`,
                            }}
                          />
                          <div>
                            <div style={{ fontWeight: isSelected ? 700 : 500, fontSize: '0.82rem' }}>
                              #{tmpl.styleId} {tmpl.styleName}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                              {tmpl.name}
                            </div>
                          </div>
                        </div>

                        {isSelected ? (
                          <Check size={14} color={tmpl.accentColor} />
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
              href={`/templates/dashboard/${prevStyle.slug}`}
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
              title={`Previous: ${prevStyle.name}`}
            >
              <ChevronLeft size={14} />
            </Link>
            <Link
              href={`/templates/dashboard/${nextStyle.slug}`}
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
              title={`Next: ${nextStyle.name}`}
            >
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Cross-Link to Anime Universe */}
          <Link
            href="/templates/frieren"
            className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold text-sky-400 bg-sky-950/60 border border-sky-800/60 hover:bg-sky-900/60 transition"
            title="Explore 20 Anime Portfolio Themes"
          >
            <span>✦</span>
            <span>Anime Themes (20)</span>
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
            { id: 'tablet', icon: Tablet, label: 'Tablet (840px)' },
            { id: 'mobile', icon: Smartphone, label: 'Mobile (420px)' },
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
              <Sparkles size={13} color={currentTemplate.accentColor} />
              <span>Customize Sections</span>
              {activeSectionCount !== undefined && (
                <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '9999px', background: `${currentTemplate.accentColor}30`, color: currentTemplate.accentColor, fontWeight: 700 }}>
                  {activeSectionCount}
                </span>
              )}
            </button>
          )}

          {/* Buy / Deploy CTA */}
          <a
            href={`https://wa.me/6285806003234?text=Hi!%20I%20want%20to%20purchase%20the%20${encodeURIComponent(currentTemplate.name)}%20Dashboard%20Template%20($${currentTemplate.price})`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.42rem 1.15rem',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.78rem',
              textDecoration: 'none',
              boxShadow: '0 2px 12px rgba(16, 185, 129, 0.4)',
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
