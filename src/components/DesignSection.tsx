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
    <div className="design-grid">
      {projects.map((project, index) => (
        <motion.div
          key={project._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05, duration: 0.5 }}
          className={`design-card ${project.layoutSize || 'regular'}`}
          onClick={() => onProjectClick(project)}
        >
          {/* Media Type Badge */}
          {project.mediaType && project.mediaType !== 'image' && (
            <div className="design-type-badge">
              {project.mediaType === 'video' ? 'Video' : 'Gallery'}
            </div>
          )}

          {/* Media Content */}
          {project.image ? (
            <img 
              src={urlFor(project.image).width(1200).url()} 
              alt={project.title} 
              loading="lazy"
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)', fontSize: '2rem' }}>
              🎨
            </div>
          )}

          {/* Overlay Info */}
          <div className="design-overlay">
            <span style={{ fontSize: '0.6rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.4rem' }}>
              {project.subtitle || 'Creative Work'}
            </span>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {project.title}
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
              <p style={{ fontSize: '0.65rem', opacity: 0.6 }}>
                {project.year || new Date().getFullYear()}
              </p>
              <div style={{ width: '15px', height: '1px', background: 'var(--accent)', opacity: 0.5 }}></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DesignSection;
