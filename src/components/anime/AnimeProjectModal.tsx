'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { ProjectItem, ThemeColors } from '@/data/animeTemplates';

interface AnimeProjectModalProps {
  project: ProjectItem | null;
  colors: ThemeColors;
  characterName: string;
  onClose: () => void;
}

export default function AnimeProjectModal({ project, colors, characterName, onClose }: AnimeProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.25rem'
        }}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(12px)',
            cursor: 'pointer'
          }}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '680px',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: colors.isDark ? colors.bgSecondary : '#ffffff',
            borderRadius: '24px',
            border: `1.5px solid ${colors.borderStrong}`,
            boxShadow: `0 25px 60px -15px ${colors.accentGlow}`,
            padding: '2rem',
            color: colors.textPrimary,
            zIndex: 101
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: colors.isDark ? 'rgba(255,255,255,0.1)' : '#f1f5f9',
              border: 'none',
              color: colors.textPrimary,
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
            }}
          >
            <X size={20} />
          </button>

          {/* Subtag & Category */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                background: colors.badgeBg,
                color: colors.badgeText,
              }}
            >
              <Sparkles size={12} />
              {project.category}
            </span>
            <span style={{ fontSize: '0.85rem', color: colors.textMuted }}>•</span>
            <span style={{ fontSize: '0.85rem', color: colors.textMuted, fontWeight: 500 }}>
              {project.subtag}
            </span>
          </div>

          {/* Project Title */}
          <h3 
            style={{ 
              fontSize: '1.75rem', 
              fontWeight: 700, 
              letterSpacing: '-0.02em', 
              lineHeight: 1.25,
              marginBottom: '1rem',
              color: colors.textPrimary
            }}
          >
            {project.title}
          </h3>

          {/* Key Metric Highlight */}
          {project.metrics && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '12px',
                background: colors.isDark ? 'rgba(255,255,255,0.06)' : '#f8fafc',
                border: `1px solid ${colors.borderSubtle}`,
                marginBottom: '1.35rem',
                fontSize: '0.92rem',
                fontWeight: 600,
                color: colors.accent
              }}
            >
              <CheckCircle2 size={16} />
              <span>Benchmark Metric: <strong>{project.metrics}</strong></span>
            </div>
          )}

          {/* Detailed Description */}
          <p 
            style={{ 
              fontSize: '1.02rem', 
              lineHeight: 1.65, 
              color: colors.textSecondary,
              marginBottom: '1.75rem' 
            }}
          >
            {project.desc}
          </p>

          {/* Tech Stack Pills */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.65rem' }}>
              Technologies & Frameworks
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '0.84rem',
                    fontWeight: 500,
                    padding: '0.35rem 0.85rem',
                    borderRadius: '8px',
                    background: colors.isDark ? 'rgba(255,255,255,0.08)' : '#f1f5f9',
                    border: `1px solid ${colors.borderSubtle}`,
                    color: colors.textPrimary
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: `1px solid ${colors.borderSubtle}` }}>
            <a
              href="#contact"
              onClick={onClose}
              style={{
                flex: 1,
                minWidth: '200px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.85rem 1.5rem',
                borderRadius: '9999px',
                background: colors.accent,
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.95rem',
                textDecoration: 'none',
                boxShadow: `0 10px 25px -5px ${colors.accentGlow}`,
                transition: 'transform 0.2s ease',
              }}
            >
              <span>Discuss Project with {characterName}</span>
              <ArrowRight size={16} />
            </a>

            <button
              onClick={onClose}
              style={{
                padding: '0.85rem 1.5rem',
                borderRadius: '9999px',
                background: 'transparent',
                border: `1px solid ${colors.borderSubtle}`,
                color: colors.textSecondary,
                fontWeight: 500,
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
