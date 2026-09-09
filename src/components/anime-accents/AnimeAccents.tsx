'use client';

import React, { useEffect, useRef } from 'react';
import { AccentAnimationType } from '@/data/animeTemplates';

interface AnimeAccentsProps {
  type: AccentAnimationType;
  color?: string;
  accentSecondary?: string;
}

export default function AnimeAccents({ type, color = '#0284c7', accentSecondary = '#38bdf8' }: AnimeAccentsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle state collection
    const particles: any[] = [];
    const count = 45;

    // Initialize particles based on anime type
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 4 + 1.5,
        alpha: Math.random() * 0.7 + 0.2,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.05,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
        colorIndex: Math.random() > 0.5 ? 1 : 2
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Render based on accent type
      switch (type) {
        case 'frieren-aura': {
          // Floating golden & cyan mana glyphs and celestial flower dust
          particles.forEach((p, idx) => {
            p.y -= 0.6;
            p.x += Math.sin(time + p.phase) * 0.5;
            p.rot += p.vRot;
            if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.fillStyle = p.colorIndex === 1 ? 'rgba(56, 189, 248, ' + (p.alpha * 0.6) + ')' : 'rgba(234, 179, 8, ' + (p.alpha * 0.5) + ')';
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.colorIndex === 1 ? '#38bdf8' : '#eab308';
            // Draw diamond glyph or flower petal
            if (idx % 3 === 0) {
              ctx.beginPath();
              ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 2);
              ctx.fill();
            } else {
              ctx.beginPath();
              ctx.moveTo(0, -p.size * 1.4);
              ctx.lineTo(p.size * 0.9, 0);
              ctx.lineTo(0, p.size * 1.4);
              ctx.lineTo(-p.size * 0.9, 0);
              ctx.closePath();
              ctx.fill();
            }
            ctx.restore();
          });
          break;
        }

        case 'stark-sparks': {
          // Blazing crimson & molten orange combat sparks flying upward diagonally
          particles.forEach((p) => {
            p.y -= Math.random() * 2.5 + 1.2;
            p.x += (Math.random() - 0.45) * 1.8;
            p.alpha -= 0.005;
            if (p.y < -10 || p.alpha <= 0) {
              p.y = height + 10;
              p.x = Math.random() * width;
              p.alpha = Math.random() * 0.8 + 0.3;
            }
            ctx.save();
            ctx.shadowBlur = 14;
            ctx.shadowColor = '#ef4444';
            ctx.fillStyle = p.colorIndex === 1 ? `rgba(239, 68, 68, ${p.alpha})` : `rgba(249, 115, 22, ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });
          break;
        }

        case 'fern-zoltraak': {
          // Concentrated purple Zoltraak mana orbs pulsing with intense core glow
          particles.forEach((p, idx) => {
            p.y -= 0.8;
            p.x += Math.cos(time * 1.5 + p.phase) * 0.8;
            if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; }
            const pulse = 1 + Math.sin(time * 3 + p.phase) * 0.3;

            ctx.save();
            ctx.shadowBlur = 16;
            ctx.shadowColor = '#a855f7';
            ctx.fillStyle = `rgba(168, 85, 247, ${p.alpha * 0.7})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
            ctx.fill();

            // Inner white-hot core
            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.9})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, (p.size * pulse) * 0.4, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });
          break;
        }

        case 'eren-steam-embers': {
          // Attack Titan volcanic steam clouds & rising golden heat embers
          particles.forEach((p, idx) => {
            p.y -= 1.4;
            p.x += Math.sin(time + p.phase) * 0.8;
            if (p.y < -30) { p.y = height + 20; p.x = Math.random() * width; }

            ctx.save();
            if (idx % 2 === 0) {
              // Soft steam puff
              ctx.fillStyle = `rgba(16, 185, 129, ${p.alpha * 0.15})`;
              ctx.shadowBlur = 20;
              ctx.shadowColor = '#10b981';
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
              ctx.fill();
            } else {
              // Glowing ember
              ctx.fillStyle = `rgba(245, 158, 11, ${p.alpha * 0.85})`;
              ctx.shadowBlur = 12;
              ctx.shadowColor = '#f59e0b';
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size * 0.9, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.restore();
          });
          break;
        }

        case 'levi-blade-slashes': {
          // Surgical green and silver ODM blade tracer streaks
          particles.forEach((p, idx) => {
            p.x += Math.cos(p.rot) * 2.2;
            p.y += Math.sin(p.rot) * 1.5;
            if (p.x > width + 50 || p.y > height + 50 || p.x < -50 || p.y < -50) {
              p.x = Math.random() * width;
              p.y = Math.random() * height;
            }

            ctx.save();
            ctx.strokeStyle = idx % 2 === 0 ? 'rgba(34, 197, 94, 0.4)' : 'rgba(226, 232, 240, 0.35)';
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#22c55e';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - Math.cos(p.rot) * 24, p.y - Math.sin(p.rot) * 16);
            ctx.stroke();
            ctx.restore();
          });
          break;
        }

        case 'mikasa-scarf-wind': {
          // Floating red scarf silk threads & soft rose petal dust
          particles.forEach((p) => {
            p.x += 1.2 + Math.sin(time + p.phase) * 0.5;
            p.y += 0.8 + Math.cos(time + p.phase) * 0.4;
            p.rot += p.vRot * 0.5;
            if (p.x > width + 20) p.x = -20;
            if (p.y > height + 20) p.y = -20;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.fillStyle = `rgba(225, 29, 72, ${p.alpha * 0.65})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#e11d48';
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size * 2, p.size * 0.8, Math.PI / 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });
          break;
        }

        case 'naruto-rasengan-chakra': {
          // Swirling golden Rasengan chakra vortex lines & Sage Mode embers
          particles.forEach((p) => {
            p.x += Math.cos(time * 1.5 + p.phase) * 1.6;
            p.y -= 1.1;
            p.rot += 0.05;
            if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; }

            ctx.save();
            ctx.shadowBlur = 14;
            ctx.shadowColor = '#f59e0b';
            ctx.fillStyle = p.colorIndex === 1 ? `rgba(234, 88, 12, ${p.alpha * 0.7})` : `rgba(245, 158, 11, ${p.alpha * 0.8})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 1.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });
          break;
        }

        case 'sasuke-chidori-lightning': {
          // Crackling electric purple and cobalt lightning bolts
          particles.forEach((p) => {
            p.y -= 0.5;
            p.x += (Math.random() - 0.5) * 4;
            if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; }

            ctx.save();
            ctx.shadowBlur = 16;
            ctx.shadowColor = '#6366f1';
            ctx.strokeStyle = `rgba(139, 92, 246, ${p.alpha * 0.85})`;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + (Math.random() - 0.5) * 12, p.y - 14);
            ctx.stroke();
            ctx.restore();
          });
          break;
        }

        case 'sakura-cherry-byakugou': {
          // Drifting cherry petals with emerald healing chakra glow
          particles.forEach((p) => {
            p.y += 0.9;
            p.x += Math.sin(time + p.phase) * 1.2;
            p.rot += 0.02;
            if (p.y > height + 20) { p.y = -20; p.x = Math.random() * width; }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.fillStyle = p.colorIndex === 1 ? `rgba(236, 72, 153, ${p.alpha * 0.65})` : `rgba(16, 185, 129, ${p.alpha * 0.55})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ec4899';
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size * 1.8, p.size * 0.9, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });
          break;
        }

        case 'hinata-gentle-fist': {
          // Flowing lavender chakra mist and gentle ripple waves
          particles.forEach((p) => {
            p.y -= 0.7;
            p.x += Math.cos(time + p.phase) * 0.9;
            if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; }

            ctx.save();
            ctx.shadowBlur = 18;
            ctx.shadowColor = '#8b5cf6';
            ctx.fillStyle = `rgba(139, 92, 246, ${p.alpha * 0.4})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });
          break;
        }

        case 'luffy-nika-clouds': {
          // Sun God Nika white cloud wisps and joyful bouncy gold motes
          particles.forEach((p) => {
            p.y -= 0.8;
            p.x += Math.sin(time * 2 + p.phase) * 1.1;
            if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; }

            ctx.save();
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#f59e0b';
            ctx.fillStyle = p.colorIndex === 1 ? `rgba(255, 255, 255, ${p.alpha * 0.7})` : `rgba(245, 158, 11, ${p.alpha * 0.65})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });
          break;
        }

        case 'ace-fire-embers': {
          // Rising flame embers and glowing heat plumes
          particles.forEach((p) => {
            p.y -= Math.random() * 2.2 + 1.2;
            p.x += (Math.random() - 0.48) * 2;
            if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }

            ctx.save();
            ctx.shadowBlur = 16;
            ctx.shadowColor = '#f97316';
            ctx.fillStyle = `rgba(249, 115, 22, ${p.alpha * 0.85})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });
          break;
        }

        case 'sabo-dragon-flames': {
          // Dual blue and orange revolutionary flames
          particles.forEach((p) => {
            p.y -= 1.6;
            p.x += Math.sin(time + p.phase) * 1.2;
            if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; }

            ctx.save();
            const isBlue = p.colorIndex === 1;
            ctx.shadowBlur = 15;
            ctx.shadowColor = isBlue ? '#0284c7' : '#f97316';
            ctx.fillStyle = isBlue ? `rgba(2, 132, 199, ${p.alpha * 0.75})` : `rgba(249, 115, 22, ${p.alpha * 0.75})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 1.1, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });
          break;
        }

        case 'nami-clima-tact': {
          // Rain clouds, gold sparks, and thunder flashes
          particles.forEach((p) => {
            p.y += 1.4;
            p.x += 0.4;
            if (p.y > height + 20) { p.y = -20; p.x = Math.random() * width; }

            ctx.save();
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#06b6d4';
            ctx.fillStyle = p.colorIndex === 1 ? `rgba(6, 182, 212, ${p.alpha * 0.6})` : `rgba(249, 115, 22, ${p.alpha * 0.5})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.9, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });
          break;
        }

        case 'zero-two-cyber-hex': {
          // Strelitzia cybernetic hex particles & neon telemetry pulses
          particles.forEach((p) => {
            p.y -= 0.6;
            p.rot += 0.01;
            if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.strokeStyle = `rgba(244, 63, 94, ${p.alpha * 0.75})`;
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#f43f5e';
            ctx.lineWidth = 1.2;
            // Draw hexagon
            ctx.beginPath();
            for (let s = 0; s < 6; s++) {
              const a = (s * Math.PI) / 3;
              const hx = Math.cos(a) * (p.size * 1.6);
              const hy = Math.sin(a) * (p.size * 1.6);
              if (s === 0) ctx.moveTo(hx, hy);
              else ctx.lineTo(hx, hy);
            }
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
          });
          break;
        }

        case 'tanjiro-dual-breathing': {
          // Hinokami Kagura fire sparks & Water Breathing fluid wave crests
          particles.forEach((p) => {
            p.y -= 1.1;
            p.x += Math.sin(time * 1.5 + p.phase) * 1.4;
            if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; }

            ctx.save();
            const isWater = p.colorIndex === 1;
            ctx.shadowBlur = 14;
            ctx.shadowColor = isWater ? '#16a34a' : '#dc2626';
            ctx.fillStyle = isWater ? `rgba(22, 163, 74, ${p.alpha * 0.7})` : `rgba(220, 38, 38, ${p.alpha * 0.75})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 1.1, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });
          break;
        }

        case 'zenitsu-thunderclap': {
          // High-voltage lightning zigzag bolts and golden sparks
          particles.forEach((p) => {
            p.y -= 0.5;
            p.x += (Math.random() - 0.5) * 5;
            if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; }

            ctx.save();
            ctx.shadowBlur = 18;
            ctx.shadowColor = '#eab308';
            ctx.strokeStyle = `rgba(234, 179, 8, ${p.alpha * 0.9})`;
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + (Math.random() - 0.5) * 16, p.y - 12);
            ctx.lineTo(p.x + (Math.random() - 0.5) * 8, p.y - 24);
            ctx.stroke();
            ctx.restore();
          });
          break;
        }

        case 'inosuke-beast-slashes': {
          // Dual serrated slash marks & wild mountain dust
          particles.forEach((p) => {
            p.x += (Math.random() - 0.5) * 3;
            p.y += Math.random() * 2 - 0.5;
            if (p.y > height + 20) { p.y = -20; p.x = Math.random() * width; }

            ctx.save();
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#0284c7';
            ctx.strokeStyle = `rgba(2, 132, 199, ${p.alpha * 0.6})`;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + 14, p.y - 8);
            ctx.stroke();
            ctx.restore();
          });
          break;
        }

        case 'giyuu-dead-calm': {
          // Concentric peaceful water ripples
          particles.forEach((p, idx) => {
            p.size += 0.25;
            p.alpha -= 0.005;
            if (p.alpha <= 0 || p.size > 80) {
              p.x = Math.random() * width;
              p.y = Math.random() * height;
              p.size = 2;
              p.alpha = Math.random() * 0.4 + 0.2;
            }

            ctx.save();
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#0284c7';
            ctx.strokeStyle = `rgba(2, 132, 199, ${p.alpha})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          });
          break;
        }

        case 'shinobu-wisteria-butterflies': {
          // Fluttering wisteria butterflies and purple spore particles
          particles.forEach((p) => {
            p.y -= 0.8;
            p.x += Math.sin(time * 2 + p.phase) * 1.5;
            p.rot += 0.05;
            if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.fillStyle = `rgba(139, 92, 246, ${p.alpha * 0.75})`;
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#8b5cf6';

            // Draw butterfly wings
            ctx.beginPath();
            ctx.ellipse(-p.size, 0, p.size * 1.2, p.size * 0.6, Math.PI / 4, 0, Math.PI * 2);
            ctx.ellipse(p.size, 0, p.size * 1.2, p.size * 0.6, -Math.PI / 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });
          break;
        }

        default:
          break;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [type, color, accentSecondary]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.85
      }}
    />
  );
}
