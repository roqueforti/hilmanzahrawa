'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="nav" 
      style={{ 
        borderRadius: '50px',
        padding: '0.8rem 2.5rem',
        background: 'rgba(255, 255, 255, 0.85)',
        border: '1px solid var(--pocari-blue-light)',
        boxShadow: '0 10px 30px rgba(0, 91, 172, 0.1)'
      }}
    >
      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
        <li><a href="#home" style={{ textDecoration: 'none', color: 'var(--pocari-blue)', fontWeight: 700 }}>Home</a></li>
        <li><a href="#experience" style={{ textDecoration: 'none', color: 'var(--pocari-blue)', fontWeight: 700 }}>CV</a></li>
        <li><a href="#projects" style={{ textDecoration: 'none', color: 'var(--pocari-blue)', fontWeight: 700 }}>Work</a></li>
        <li><a href="#contact" style={{ textDecoration: 'none', color: 'var(--pocari-blue)', fontWeight: 700 }}>Connect</a></li>
      </ul>
    </motion.nav>
  );
};

export default Navbar;
