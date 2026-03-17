'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [dotPos, setDotPos] = useState({ x: 0, y: 0 });
  
  const circleSpringConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const circleX = useSpring(0, circleSpringConfig);
  const circleY = useSpring(0, circleSpringConfig);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setDotPos({ x: e.clientX, y: e.clientY });
      circleX.set(e.clientX);
      circleY.set(e.clientY);
    };

    window.addEventListener('mousemove', mouseMove);
    return () => window.removeEventListener('mousemove', mouseMove);
  }, [circleX, circleY]);

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        @media (max-width: 1024px) {
          * {
            cursor: auto !important;
          }
          .custom-cursor {
            display: none !important;
          }
        }
        
        /* Adaptive Cursor Colors */
        body.cursor-detail-open .custom-cursor.dot {
          background-color: white !important;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        body.cursor-detail-open .custom-cursor.circle {
          border-color: rgba(255, 255, 255, 0.8) !important;
        }
      `}</style>
      
      {/* The Central Dot */}
      <motion.div
        className="custom-cursor dot"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '6px',
          height: '6px',
          backgroundColor: 'var(--pocari-blue-deep)',
          borderRadius: '50%',
          zIndex: 20000,
          pointerEvents: 'none',
          x: dotPos.x,
          y: dotPos.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* The Lagging Circle */}
      <motion.div
        className="custom-cursor circle"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '32px',
          height: '32px',
          border: '1.5px solid var(--pocari-blue-soft)',
          borderRadius: '50%',
          zIndex: 19999,
          pointerEvents: 'none',
          x: circleX,
          y: circleY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: 0.6,
        }}
      />
    </>
  );
}
