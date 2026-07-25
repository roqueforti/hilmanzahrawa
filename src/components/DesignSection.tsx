'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
}

interface DesignSectionProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const DesignSection: React.FC<DesignSectionProps> = ({ projects, onProjectClick }) => {
  return (
    <div className="compact-grid">
      {projects.map((project, index) => (
        <motion.div
          key={project._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
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
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-tertiary)', fontSize: '2rem' }}>
                🎨
              </div>
            )}

            {/* Media Type Badge (Clean Floating Pill) */}
            {project.mediaType && project.mediaType !== 'image' && (
              <span 
                style={{
                  position: 'absolute',
                  top: '0.65rem',
                  right: '0.65rem',
                  background: 'rgba(9, 9, 11, 0.85)',
                  color: '#FFFFFF',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '20px',
                  fontSize: '0.625rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  backdropFilter: 'blur(8px)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  zIndex: 2
                }}
              >
                {project.mediaType === 'video' ? '▶ Video' : '🖼 Gallery'}
              </span>
            )}
          </div>

          <div className="content">
            <div className="metadata-row">
              <h4 className="title">{project.title}</h4>
              <span className="year">{project.year || new Date().getFullYear()}</span>
            </div>
            <div className="metadata-row secondary" style={{ marginTop: '0.2rem' }}>
              <p className="subtitle">{project.subtitle || project.description || 'Creative Design'}</p>
              <div className="tags">
                {project.category || (project.mediaType === 'video' ? 'Video' : 'Design')}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DesignSection;
