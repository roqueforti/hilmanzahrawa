'use client';
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export default function CoastalCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 28, stiffness: 350 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovered, setIsHovered] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    let lastTime = 0;
    const colors = ['#00afb9', '#f07167', '#0081a7', '#fed9b7'];

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Spawn sea bubble trail occasionally on movement
      const now = Date.now();
      if (now - lastTime > 65) {
        lastTime = now;
        const newBubble: Bubble = {
          id: now + Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)]
        };
        setBubbles(prev => [...prev.slice(-18), newBubble]);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .card-compact, .project-bento-card, .filter-pill, .view-btn, .seamless-service-card, .timeline-milestone-card')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Clean up bubbles automatically
  useEffect(() => {
    if (bubbles.length === 0) return;
    const timer = setTimeout(() => {
      setBubbles(prev => prev.slice(1));
    }, 800);
    return () => clearTimeout(timer);
  }, [bubbles]);

  return (
    <>
      <style jsx global>{`
        @media (min-width: 1025px) {
          body, a, button, [role="button"] {
            cursor: none !important;
          }
        }
        @media (max-width: 1024px) {
          .coastal-cursor-wrapper { display: none !important; }
        }
      `}</style>

      <div className="coastal-cursor-wrapper" style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 9999999 }}>
        {/* Sea Bubbles Trail */}
        {bubbles.map(bubble => (
          <motion.div
            key={bubble.id}
            initial={{ opacity: 0.8, scale: 0.8, x: bubble.x - bubble.size / 2, y: bubble.y - bubble.size / 2 }}
            animate={{ opacity: 0, scale: 1.6, y: bubble.y - 30 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              width: bubble.size,
              height: bubble.size,
              borderRadius: '50%',
              backgroundColor: bubble.color,
              border: '1px solid rgba(253, 252, 220, 0.8)',
              boxShadow: `0 0 8px ${bubble.color}`
            }}
          />
        ))}

        {/* Outer Seafoam Ripple Ring */}
        <motion.div
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            x: cursorXSpring,
            y: cursorYSpring,
            marginLeft: '-18px',
            marginTop: '-18px',
            width: 36,
            height: 36,
            borderRadius: '50%',
            backgroundColor: isHovered ? 'rgba(0, 175, 185, 0.15)' : 'transparent',
            border: isHovered ? '2px solid #f07167' : '1.5px solid #00afb9',
            scale: isHovered ? 1.6 : 1,
            boxShadow: isHovered ? '0 0 16px rgba(240, 113, 103, 0.5)' : '0 0 8px rgba(0, 175, 185, 0.3)',
            transition: 'border 0.2s, box-shadow 0.2s'
          }}
        />

        {/* Inner Sunlit Droplet Dot */}
        <motion.div
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            x: cursorX,
            y: cursorY,
            marginLeft: '-5px',
            marginTop: '-5px',
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: isHovered ? '#f07167' : '#0081a7',
            border: '1.5px solid #fdfcdc',
            boxShadow: '0 0 6px rgba(0, 129, 167, 0.6)',
            scale: isHovered ? 0.6 : 1
          }}
        />
      </div>
    </>
  );
}
