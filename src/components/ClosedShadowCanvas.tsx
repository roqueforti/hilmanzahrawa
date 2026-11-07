'use client';

import React, { useRef, useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

interface ClosedShadowCanvasProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * ClosedShadowCanvas isolates Three.js WebGL canvas elements inside a closed ShadowRoot.
 * 
 * Why this is crucial for extensions like Swarm Rebuild:
 * 1. Background extension scripts query `document.querySelectorAll("canvas")` to detect media.
 *    Because `querySelectorAll` cannot pierce shadow boundaries, no disruptive screenshot crop
 *    or MEDIA_ONLY_CSS is triggered.
 * 2. Swarm's DOM walker (`swarm.js`) inspects `el.shadowRoot` to walk subtrees. In mode 'closed',
 *    `el.shadowRoot` evaluates to `null`, completely preventing Swarm from generating giant,
 *    chaotic grey image placeholders with camera icons over 3D ambient scenes.
 * 3. The real WebGL scene remains visually seamless and active for website visitors.
 */
export default function ClosedShadowCanvas({
  children,
  className,
  style,
}: ClosedShadowCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [closedShadow, setClosedShadow] = useState<ShadowRoot | null>(null);

  useLayoutEffect(() => {
    if (hostRef.current && !closedShadow) {
      try {
        const root = hostRef.current.attachShadow({ mode: 'closed' });
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
          :host {
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            inset: 0;
            pointer-events: none;
          }
          * {
            box-sizing: border-box;
          }
          div, canvas {
            width: 100% !important;
            height: 100% !important;
            display: block;
            pointer-events: none;
          }
        `;
        root.appendChild(styleSheet);
        setClosedShadow(root);
      } catch (err) {
        // Fallback for environments that do not support shadow DOM
        console.warn('[ClosedShadowCanvas] attachShadow fallback:', err);
      }
    }
  }, [closedShadow]);

  return (
    <div
      ref={hostRef}
      className={className}
      style={{
        ...style,
      }}
    >
      {closedShadow ? createPortal(children, closedShadow) : null}
    </div>
  );
}
