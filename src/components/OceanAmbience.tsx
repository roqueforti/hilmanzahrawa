'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export default function OceanAmbience() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  const startAmbience = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Generate 5 seconds of pink noise buffer
      const bufferSize = ctx.sampleRate * 5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;
      noiseNodeRef.current = noise;

      // Lowpass filter to simulate water depth & muffled surf
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);
      filter.Q.setValueAtTime(2.5, ctx.currentTime);
      filterNodeRef.current = filter;

      // Low frequency oscillator (LFO) to simulate swelling waves every 6 seconds
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.16, ctx.currentTime); // ~6 second wave cycle
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(240, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfoRef.current = lfo;

      // Master gain node
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 1.5);
      gainNodeRef.current = masterGain;

      noise.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      noise.start(0);
      lfo.start(0);
      setIsPlaying(true);
    } catch (e) {
      console.error('AudioContext error:', e);
    }
  };

  const stopAmbience = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 0.8);
      setTimeout(() => {
        try {
          noiseNodeRef.current?.stop();
          lfoRef.current?.stop();
          audioCtxRef.current?.close();
        } catch (e) {}
        setIsPlaying(false);
      }, 900);
    } else {
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAmbience();
    } else {
      startAmbience();
    }
  };

  useEffect(() => {
    return () => {
      try {
        audioCtxRef.current?.close();
      } catch (e) {}
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        zIndex: 9000
      }}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleSound}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0.55rem 1rem',
          background: isPlaying ? 'var(--cerulean)' : 'var(--bg-surface)',
          color: isPlaying ? '#ffffff' : 'var(--text-primary)',
          border: '1.5px solid var(--border-hairline)',
          borderRadius: '30px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: isPlaying ? '0 8px 24px rgba(0, 129, 167, 0.35)' : 'var(--shadow-premium)',
          backdropFilter: 'blur(12px)',
          transition: 'all 0.3s ease'
        }}
      >
        {isPlaying ? (
          <>
            <Volume2 size={16} color="#fdfcdc" />
            <span>SURF AMBIENCE: ON</span>
            {/* Animated Equalizer Wave Bars */}
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', height: '12px' }}>
              {[0.4, 0.8, 0.5, 0.9].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ scaleY: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.8 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    width: '2px',
                    height: '100%',
                    background: '#fdfcdc',
                    borderRadius: '1px',
                    display: 'inline-block'
                  }}
                />
              ))}
            </span>
          </>
        ) : (
          <>
            <VolumeX size={16} color="var(--text-muted)" />
            <span>PLAY BEACH SURF</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
