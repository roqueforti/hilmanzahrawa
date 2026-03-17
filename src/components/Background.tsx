'use client';

import React, { useEffect, useRef } from 'react';

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const blobs: Blob[] = [];
    const blobCount = 3;

    class Blob {
      x: number = 0;
      y: number = 0;
      radius: number = 0;
      vx: number = 0;
      vy: number = 0;
      color: string = '';

      constructor(canvasWidth: number, canvasHeight: number, color: string) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.radius = Math.random() * 400 + 200;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.color = color;
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -this.radius) this.vx *= -1;
        if (this.x > canvasWidth + this.radius) this.vx *= -1;
        if (this.y < -this.radius) this.vy *= -1;
        if (this.y > canvasHeight + this.radius) this.vy *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }
    }

    const initBlobs = () => {
      blobs.length = 0;
      blobs.push(new Blob(canvas.width, canvas.height, 'rgba(124, 185, 232, 0.05)'));
      blobs.push(new Blob(canvas.width, canvas.height, 'rgba(240, 248, 255, 0.1)'));
      blobs.push(new Blob(canvas.width, canvas.height, 'rgba(124, 185, 232, 0.03)'));
    };



    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBlobs();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      blobs.forEach(blob => {
        blob.update(canvas.width, canvas.height);
        blob.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        background: '#ffffff'
      }}
    />
  );
};

export default Background;
