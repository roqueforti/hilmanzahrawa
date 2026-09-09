'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ChevronDown, 
  Layers, 
  Smartphone, 
  Monitor, 
  Tablet, 
  ArrowLeft, 
  ShoppingBag, 
  Check, 
  ExternalLink,
  ChevronUp
} from 'lucide-react';
import { ANIME_TEMPLATES, AnimeTemplate } from '@/data/animeTemplates';

interface TemplateSwitcherBarProps {
  currentTemplate: AnimeTemplate;
  onDeviceChange?: (device: 'desktop' | 'tablet' | 'mobile') => void;
  activeDevice?: 'desktop' | 'tablet' | 'mobile';
}

export default function TemplateSwitcherBar({ 
  currentTemplate, 
  onDeviceChange,
  activeDevice = 'desktop' 
}: TemplateSwitcherBarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const templatesList = Object.values(ANIME_TEMPLATES);

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        background: 'rgba(15, 23, 42, 0.88)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        color: '#ffffff',
        fontSize: '0.85rem',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: collapsed ? '0.35rem 1.25rem' : '0.65rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'nowrap',
        }}
      >
        {/* Left: Back to Marketplace Hub & Current Template Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
          <Link
            href="/templates"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.78rem',
              whiteSpace: 'nowrap',
              transition: 'background 0.2s ease',
            }}
          >
            <ArrowLeft size={14} />
            <span>Store Hub</span>
          </Link>

          {/* Quick Switcher Dropdown Button */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0.95rem',
                borderRadius: '9999px',
                background: currentTemplate.colors.accent,
                border: 'none',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                boxShadow: `0 4px 14px ${currentTemplate.colors.accentGlow}`,
                whiteSpace: 'nowrap',
              }}
            >
              <Sparkles size={14} />
              <span>{currentTemplate.name}</span>
              <span style={{ opacity: 0.75, fontSize: '0.74rem', fontWeight: 500 }}>
                ({currentTemplate.series})
              </span>
              <ChevronDown 
                size={14} 
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
                    width: '340px',
                    maxHeight: '440px',
                    overflowY: 'auto',
                    background: '#0f172a',
                    borderRadius: '16px',
                    border: '1.5px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
                    padding: '0.5rem',
                    zIndex: 100,
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
                              boxShadow: `0 0 8px ${tmpl.colors.accent}`,
                            }}
                          />
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.84rem' }}>{tmpl.name}</div>
                            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{tmpl.series}</div>
                          </div>
                        </div>
                        {isSelected && <Check size={16} color={tmpl.colors.accent} />}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Center: Device Simulation Viewport Toggles */}
        {onDeviceChange && (
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.25rem',
              background: 'rgba(0, 0, 0, 0.35)',
              padding: '0.2rem',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <button
              onClick={() => onDeviceChange('desktop')}
              title="Desktop View"
              style={{
                padding: '0.35rem 0.65rem',
                borderRadius: '9999px',
                border: 'none',
                background: activeDevice === 'desktop' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                color: activeDevice === 'desktop' ? '#ffffff' : '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.75rem',
                fontWeight: 600
              }}
            >
              <Monitor size={14} />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => onDeviceChange('tablet')}
              title="Tablet View"
              style={{
                padding: '0.35rem 0.65rem',
                borderRadius: '9999px',
                border: 'none',
                background: activeDevice === 'tablet' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                color: activeDevice === 'tablet' ? '#ffffff' : '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.75rem',
                fontWeight: 600
              }}
            >
              <Tablet size={14} />
              <span className="hidden sm:inline">Tablet</span>
            </button>
            <button
              onClick={() => onDeviceChange('mobile')}
              title="Mobile View"
              style={{
                padding: '0.35rem 0.65rem',
                borderRadius: '9999px',
                border: 'none',
                background: activeDevice === 'mobile' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                color: activeDevice === 'mobile' ? '#ffffff' : '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.75rem',
                fontWeight: 600
              }}
            >
              <Smartphone size={14} />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>
        )}

        {/* Right: Buy Template CTA & Collapse Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <a
            href={`https://wa.me/6285806003234?text=Hi!%20I%20want%20to%20purchase%20the%20${currentTemplate.name}%20Anime%20Portfolio%20Template%20($${currentTemplate.price})`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem 1.15rem',
              borderRadius: '9999px',
              background: '#22c55e',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.82rem',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(34, 197, 94, 0.35)',
              whiteSpace: 'nowrap',
            }}
          >
            <ShoppingBag size={14} />
            <span>Use Template (${currentTemplate.price})</span>
          </a>

          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle switcher bar size"
            style={{
              padding: '0.35rem',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {collapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}
