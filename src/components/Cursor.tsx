'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .card-compact, .switcher-btn, .work-toggle, .project-card, .certificate-card, .swiper-button-next, .swiper-button-prev, .close-btn, .work-tag')) {
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

  return (
    <>
      <style jsx global>{`
        * { cursor: none !important; }
        @media (max-width: 1024px) {
          * { cursor: auto !important; }
          .custom-cinematic-cursor { display: none !important; }
        }
      `}</style>
      
      {/* Outer Lagging Ring */}
      <motion.div
        className="custom-cinematic-cursor"
        style={{
          position: 'fixed', left: 0, top: 0, x: cursorXSpring, y: cursorYSpring,
          marginLeft: '-16px', marginTop: '-16px',
          width: 32, height: 32, borderRadius: '50%',
          backgroundColor: 'transparent',
          border: '1.5px solid rgba(255, 255, 255, 0.4)',
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 0.2 : 1,
          mixBlendMode: 'difference', pointerEvents: 'none', zIndex: 9999998,
        }}
      />

      {/* Inner Fast Dot */}
      <motion.div
        className="custom-cinematic-cursor"
        style={{
          position: 'fixed', left: 0, top: 0, 
          x: cursorX, y: cursorY,
          marginLeft: '-4px', marginTop: '-4px',
          width: 8, height: 8, borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 1)',
          scale: isHovered ? 0 : 1, // Hides on hover
          mixBlendMode: 'difference', pointerEvents: 'none', zIndex: 9999999,
        }}
      />
    </>
  );
}
