'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  return (
    <div className="nav-wrapper">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="nav-pill" 
      >
        <a href="#home" className="nav-link">Home</a>
        <a href="#projects" className="nav-link">Works</a>
        <a href="#experience" className="nav-link">Career</a>
        <a href="#contact" className="nav-link">Connect</a>
      </motion.nav>
    </div>
  );
};



export default Navbar;
