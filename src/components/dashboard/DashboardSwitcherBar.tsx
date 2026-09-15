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
  LayoutDashboard
} from 'lucide-react';
import { DASHBOARD_TEMPLATES, DashboardTemplate } from '@/data/dashboardTemplates';

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
      <div
        style={{
          maxWidth: '1440px',
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
        {/* LEFT: Back to Store Hub + Dashboard Template Selector Dropdown */}
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
              }}
            >
              <LayoutDashboard size={13} />
              <span>{currentTemplate.name}</span>
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
                    width: 'min(340px, calc(100vw - 2rem))',
                    maxHeight: '440px',
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
                    Select Dashboard Template (20 Available)
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
                              boxShadow: `0 0 8px ${tmpl.accentColor}`,
                            }}
                          />
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.84rem', color: '#ffffff' }}>
                              #{tmpl.styleId} {tmpl.name}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                              {tmpl.subtitle}
                            </div>
                          </div>
                        </div>
                        {isSelected && <Check size={16} color={tmpl.accentColor} />}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CENTER: Perfectly Horizontal Segmented Viewport Toggles */}
        {onDeviceChange && (
          <div 
            style={{ 
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center', 
              gap: '0.2rem',
              background: 'rgba(0, 0, 0, 0.45)',
              padding: '0.22rem 0.3rem',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
            <button
              onClick={() => onDeviceChange('desktop')}
              title="Desktop View"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.32rem 0.7rem',
                borderRadius: '9999px',
                border: 'none',
                background: activeDevice === 'desktop' ? 'rgba(255, 255, 255, 0.18)' : 'transparent',
                color: activeDevice === 'desktop' ? '#ffffff' : '#94a3b8',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              <Monitor size={13} />
              <span>Desktop</span>
            </button>

            <button
              onClick={() => onDeviceChange('tablet')}
              title="Tablet View"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.32rem 0.7rem',
                borderRadius: '9999px',
                border: 'none',
                background: activeDevice === 'tablet' ? 'rgba(255, 255, 255, 0.18)' : 'transparent',
                color: activeDevice === 'tablet' ? '#ffffff' : '#94a3b8',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              <Tablet size={13} />
              <span>Tablet</span>
            </button>

            <button
              onClick={() => onDeviceChange('mobile')}
              title="Mobile View"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.32rem 0.7rem',
                borderRadius: '9999px',
                border: 'none',
                background: activeDevice === 'mobile' ? 'rgba(255, 255, 255, 0.18)' : 'transparent',
                color: activeDevice === 'mobile' ? '#ffffff' : '#94a3b8',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              <Smartphone size={13} />
              <span>Mobile</span>
            </button>
          </div>
        )}

        {/* RIGHT: Customize Sections Button + Buy Template CTA + Collapse */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
          {onOpenCustomizer && (
            <button
              onClick={onOpenCustomizer}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.38rem 0.85rem',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: `1.5px solid ${currentTemplate.accentColor}`,
                color: '#ffffff',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: `0 0 12px ${currentTemplate.accentGlow}`,
                whiteSpace: 'nowrap',
                transition: 'transform 0.15s ease, background 0.15s ease',
              }}
              title="Customize Section Order & 20 Presets"
            >
              <Sparkles size={13} color={currentTemplate.accentColor} />
              <span>Gaya #{currentTemplate.styleId}: {currentTemplate.styleName}</span>
              <span 
                style={{ 
                  fontSize: '0.68rem', 
                  padding: '0.12rem 0.45rem', 
                  borderRadius: '9999px', 
                  background: currentTemplate.accentColor, 
                  color: '#ffffff', 
                  fontWeight: 800,
                  marginLeft: '0.15rem'
                }}
              >
                {activeSectionCount || currentTemplate.sections.length} Sec
              </span>
            </button>
          )}

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
              background: '#ffffff',
              color: '#0f172a',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.78rem',
              boxShadow: '0 4px 14px rgba(255, 255, 255, 0.15)',
              whiteSpace: 'nowrap',
              transition: 'transform 0.15s ease',
            }}
          >
            <ShoppingBag size={13} />
            <span>Use Template ${currentTemplate.price}</span>
          </a>

          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle switcher bar size"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {collapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}
