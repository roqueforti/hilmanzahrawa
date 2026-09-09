'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface WaveDividerProps {
  fillColor?: string;
  accentColor?: string;
  flip?: boolean;
  className?: string;
  height?: number;
}

export default function WaveDivider({
  fillColor = '#fdfcdc',
  accentColor = '#00afb9',
  flip = false,
  className = '',
  height = 90
}: WaveDividerProps) {
  return (
    <div
      className={`wave-divider-wrapper ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: `${height}px`,
        overflow: 'hidden',
        transform: flip ? 'rotate(180deg)' : 'none',
        lineHeight: 0,
        zIndex: 2,
        pointerEvents: 'none'
      }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '200%',
          height: '100%',
          transform: 'translateZ(0)'
        }}
      >
        {/* Layer 1: Background Gentle Dune / Swell */}
        <motion.path
          d="M0,32L60,42.7C120,53,240,75,360,80C480,85,600,75,720,58.7C840,43,960,21,1080,21.3C1200,21,1320,43,1380,53.3L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          fill={accentColor}
          opacity={0.35}
          animate={{
            x: [0, -720],
          }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 18,
          }}
        />

        {/* Layer 2: Midground Wave Crest */}
        <motion.path
          d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,53.3C672,53,768,75,864,85.3C960,96,1056,96,1152,85.3C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          fill={accentColor}
          opacity={0.65}
          animate={{
            x: [-720, 0],
          }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 12,
          }}
        />

        {/* Layer 3: Foreground Main Sand / Foam Wave */}
        <motion.path
          d="M0,48L60,58.7C120,69,240,91,360,96C480,101,600,91,720,74.7C840,59,960,37,1080,37.3C1200,37,1320,59,1380,69.3L1440,80L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          fill={fillColor}
          animate={{
            x: [0, -720],
          }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 9,
          }}
        />
      </svg>
    </div>
  );
}
