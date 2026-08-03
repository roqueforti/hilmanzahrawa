'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { urlFor } from '@/sanity/client';

interface Project {
  _id: string;
  title: string;
  subtitle?: string;
  image?: any;
  mediaType?: 'image' | 'video' | 'gallery';
  videoUrl?: string;
  layoutSize?: 'regular' | 'wide' | 'tall' | 'large';
  year?: string;
  category?: string;
  description?: string;
  deviceType?: string;
  tags?: string[];
  role?: string;
  gallery?: any[];
}

interface DesignSectionProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const DesignSection: React.FC<DesignSectionProps> = ({ projects, onProjectClick }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Creative' },
    { id: 'uiux', label: 'UI/UX Design' },
    { id: 'video', label: 'Video & Motion' },
  ];

  // Group "Nevasca" episodes into a single project card
  const aggregatedProjects: Project[] = [];
  const nevascaEpisodes: Project[] = [];

  projects.forEach(project => {
    if (project.title.toLowerCase().includes('nevasca')) {
      nevascaEpisodes.push(project);
    } else {
      aggregatedProjects.push(project);
    }
  });

  if (nevascaEpisodes.length > 0) {
    const mainEpisode = nevascaEpisodes[0];
    aggregatedProjects.push({
      ...mainEpisode,
      _id: 'nevasca-series',
      title: 'The Nevasca (Web Series)',
      subtitle: `${nevascaEpisodes.length} Episodes • Short Web Series`,
      mediaType: 'gallery',
      // Store all episodes in gallery if possible, or just link to the first one
      gallery: nevascaEpisodes.map(ep => ep.image).filter(Boolean)
    });
  }

  const filteredProjects = aggregatedProjects.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'uiux') {
      return project.mediaType !== 'video' && (!project.category || project.category === 'design' || project.tags?.includes('UI/UX'));
    }
    if (activeFilter === 'video') {
      return project.mediaType === 'video' || project.videoUrl || project.tags?.includes('Video');
    }
    return true;
  });

  return (
    <div>
      {/* Category Filters */}
      <div className="filter-pills">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className={`filter-pill ${activeFilter === cat.id ? 'active' : ''}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Modern Card Grid */}
      <motion.div layout className="compact-grid">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="card-compact"
              onClick={() => onProjectClick(project)}
            >
              <div className="img-wrapper" style={{ position: 'relative' }}>
                {project.image ? (
                  <img 
                    src={urlFor(project.image).width(800).url()} 
                    alt={project.title} 
                    loading="lazy"
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-tertiary)', fontSize: '2.5rem' }}>
                    🎨
                  </div>
                )}

                {/* Geometric Play Overlay for Videos */}
                {project.mediaType === 'video' && (
                  <div className="geometric-play-overlay" />
                )}

                {/* Media Type Floating Pill Badge */}
                {project.mediaType && project.mediaType !== 'image' && (
                  <span 
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      right: '0.75rem',
                      background: 'rgba(9, 9, 11, 0.85)',
                      color: '#FFFFFF',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '20px',
                      fontSize: '0.625rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      backdropFilter: 'blur(8px)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      zIndex: 2,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                    }}
                  >
                    {project.mediaType === 'video' ? '▶ Video' : '🖼 Gallery'}
                  </span>
                )}

              </div>

              <div className="content" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingTop: '0.25rem' }}>
                <div className="metadata-row" style={{ alignItems: 'flex-start' }}>
                  <h4 className="title" style={{ fontSize: '1.05rem', fontWeight: 800 }}>{project.title}</h4>
                </div>
                
                <p className="subtitle" style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
                  {project.subtitle || project.description || 'Creative & Brand System Design'}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-hairline)' }}>
                  <span style={{ fontSize: '0.675rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    {project.role || (project.mediaType === 'video' ? 'Video Producer' : 'UI/UX Designer')} • {project.year || new Date().getFullYear()}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--text-primary)' }}>
                    View Work ↗
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DesignSection;
