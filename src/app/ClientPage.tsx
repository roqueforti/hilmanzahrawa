'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Mail, 
  MessageCircle, 
  Linkedin, 
  Github, 
  X,
  Menu,
  TrendingUp,
  Search,
  Calendar,
  Star,
  Users,
  Eye,
  Sliders,
  Smartphone,
  Layers,
  Sparkle
} from 'lucide-react';
import SkyOrbCanvas from '@/components/SkyOrbCanvas';
import SkyWaves3D from '@/components/SkyWaves3D';
import BlueMoonPetals from '@/components/BlueMoonPetals';

interface ClientPageProps {
  initialData?: any;
}

export default function ClientPage({ initialData }: ClientPageProps) {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [processHovered, setProcessHovered] = useState(false);
  const [hoveredProcessCard, setHoveredProcessCard] = useState<number | null>(null);

  const bio = initialData?.bio || {};
  const rawName = bio?.name || "Hilman Zahrawa";
  const name = rawName === rawName.toUpperCase() && rawName.length > 3
    ? rawName.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
    : rawName;
  const headline = bio?.headline || "Software Developer & Product Designer";
  const email = bio?.email || "budiarto3788@gmail.com";
  const whatsapp = bio?.whatsapp || "6285806003234";

  // Selected works matching the reference image's 2x2 showcase
  const showcaseWorks = [
    {
      id: "fintech-club",
      title: "FinTech Club Brand",
      category: "Fintech",
      subtag: "Product Design",
      desc: "Modular financial ecosystem designed for cross-border transactions, liquidity monitoring, and institutional portfolio analytics.",
      previewType: "fintech"
    },
    {
      id: "modern-real-estate",
      title: "Modern Real Estate",
      category: "Web App",
      subtag: "UI/UX Design",
      desc: "Luxury residential listing platform featuring virtual property tours, neighborhood metric overlays, and instant escrow scheduling.",
      previewType: "realestate"
    },
    {
      id: "online-learning",
      title: "Online Learning Platform",
      category: "EdTech",
      subtag: "Mobile Design",
      desc: "Next-generation cohort learning platform with video streaming, peer critique channels, and adaptive interactive modules.",
      previewType: "learning"
    },
    {
      id: "health-wellbeing",
      title: "Health & Well-being",
      category: "Health",
      subtag: "App Dev",
      desc: "Comprehensive telehealth mobile suite supporting biometric tracking, asynchronous physician messaging, and wellness schedules.",
      previewType: "health"
    }
  ];

  // Marquee partner logos
  const brandLogos = [
    { name: "FocalPoint", icon: "✦" },
    { name: "FramerBite", icon: "◬" },
    { name: "Segment", icon: "⬡" },
    { name: "Shutterframe", icon: "◌" },
    { name: "Lightspeed", icon: "⊚" },
    { name: "MatrixLab", icon: "❖" }
  ];

  return (
    <div style={{
      background: '#ffffff',
      color: '#0f172a',
      fontFamily: 'var(--font-sans-display)',
      minHeight: '100vh',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* 3D Falling Blue Moon Weed Petals (Subtle ambient background) */}
      <BlueMoonPetals />

      {/* =========================================================================
         1. TOP NAVIGATION (Exact Match: Logo left, Hamburger right)
         ========================================================================= */}
      <header style={{
        padding: '2rem 2.5rem',
        maxWidth: '1380px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 50
      }}>
        {/* Brand Logo in Italic Editorial Serif */}
        <Link href="/" style={{ textDecoration: 'none', color: '#0f172a' }}>
          <span 
            className="editorial-serif-italic"
            style={{
              fontSize: '2.2rem',
              letterSpacing: '-0.01em',
              color: '#0f172a',
              display: 'inline-block'
            }}
          >
            {name}
          </span>
        </Link>

        {/* Right Hamburger Circular Button (Clean Minimalist matching reference) */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1.5px solid #e2e8f0',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#0f172a',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'background 0.2s'
            }}
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile Slide-down Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '85px',
              right: '2.5rem',
              background: '#ffffff',
              borderRadius: '20px',
              padding: '1.5rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
              border: '1px solid #e2e8f0',
              zIndex: 100,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              minWidth: '220px'
            }}
          >
            <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, fontSize: '0.95rem' }}>About</a>
            <a href="#process" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, fontSize: '0.95rem' }}>Process</a>
            <a href="#works" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, fontSize: '0.95rem' }}>Selected Works</a>
            <a href={`mailto:${email}`} onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#0ea5e9', fontWeight: 600, fontSize: '0.95rem' }}>Drop a Line</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
         2. HERO SECTION WITH SKY-BLUE RADIANT STUDIO AURA & FLANKING ELEMENTS
         ========================================================================= */}
      <section className="hero-section-wrapper">
        <div style={{
          maxWidth: '1380px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10
        }}>
          {/* Top Micro-Kicker: Location & Availability matching ( 1/2 ) format */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            fontSize: '0.85rem',
            color: '#475569',
            fontWeight: 500,
            letterSpacing: '0.02em',
            marginBottom: '0.85rem',
            zIndex: 10
          }}>
            <span>( 1/1 ) Malang, Indonesia</span>
          </div>

          {/* Hero Main Headline (Urbanist + Instrument Serif Italic) */}
          <h1 style={{
            fontSize: 'clamp(3.5rem, 7.5vw, 6.2rem)',
            fontWeight: 500,
            letterSpacing: '-0.035em',
            lineHeight: 0.98,
            margin: 0,
            zIndex: 10,
            color: '#0f172a'
          }}>
            Hi I'm Hilman
            <span 
              className="editorial-serif-italic"
              style={{
                display: 'block',
                fontSize: '1.22em',
                fontWeight: 400,
                color: '#0f172a',
                marginTop: '-0.15rem',
                letterSpacing: '-0.02em'
              }}
            >
              Product Designer
            </span>
          </h1>

          {/* Central Hero Stage (Himmel Cutout Centered, Flanked Perfectly) */}
          <div className="hero-stage-container">
            {/* Radiant Studio Glow Aura (Completely smooth Gaussian falloff, zero cropped edges) */}
            <div 
              style={{
                position: 'absolute',
                top: '42%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'min(960px, 95vw)',
                height: 'min(580px, 80vw)',
                background: 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.35) 0%, rgba(125, 211, 252, 0.22) 32%, rgba(186, 230, 253, 0.08) 55%, transparent 72%)',
                filter: 'blur(35px)',
                pointerEvents: 'none',
                zIndex: 1,
                borderRadius: '50%'
              }} 
            />

            {/* Left Flank: Badge at Mid-Height + Avatars at Bottom */}
            <div className="hero-flank-left">
              {/* Available for new opportunities */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.65rem 1.35rem',
                  borderRadius: '9999px',
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  boxShadow: '0 8px 24px rgba(14, 165, 233, 0.08), 0 2px 6px rgba(0,0,0,0.03)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#0f172a',
                  width: 'fit-content',
                  marginTop: '3.75rem'
                }}
              >
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#0ea5e9',
                  boxShadow: '0 0 10px #0ea5e9'
                }} />
                <span>Available for new opportunities</span>
              </motion.div>

              {/* Bottom: Trusted Avatars + Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem'
                }}
              >
                <div style={{ display: 'flex' }}>
                  {['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces',
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces'].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Client"
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        border: '2px solid #ffffff',
                        marginLeft: i === 0 ? 0 : '-10px',
                        objectFit: 'cover'
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.45, fontWeight: 400 }}>
                  Trusted by over 100+ clients worldwide for exceptional UI/UX.
                </span>
              </motion.div>
            </div>

            {/* Center: Clean Cutout Character Portrait */}
            <div className="hero-portrait-wrap">
              <img 
                src="/himmel_bust.png" 
                alt="Hilman Zahrawa - Product Designer"
                className="hero-portrait-img"
              />
            </div>

            {/* Right Flank: Editorial Statement at Mid-Height + Let's Talk CTA at Bottom */}
            <div className="hero-flank-right">
              {/* Statement */}
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                style={{
                  fontSize: '0.98rem',
                  lineHeight: 1.55,
                  color: '#334155',
                  fontWeight: 400,
                  margin: 0,
                  maxWidth: '280px',
                  marginTop: '3.75rem'
                }}
              >
                passionate about creating intuitive digital experiences that connect users with value.
              </motion.p>

              {/* Let's Talk Pill Button (Matching exact reference format) */}
              <motion.a
                href={`https://wa.me/${whatsapp}?text=Hi%20Hilman,%20let's%20talk`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.85rem 2rem',
                  borderRadius: '9999px',
                  background: '#0f172a',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.2)',
                  width: 'fit-content'
                }}
              >
                Let's Talk <ArrowUpRight size={16} />
              </motion.a>
            </div>
          </div>

          {/* Client / Partner Logo Marquee Strip */}
          <div style={{
            width: '100%',
            maxWidth: '1100px',
            margin: '2.5rem auto 0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            gap: '2.5rem',
            opacity: 0.65,
            zIndex: 10,
            scrollbarWidth: 'none'
          }}>
            {brandLogos.map((b, i) => (
              <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: 500, color: '#64748b', whiteSpace: 'nowrap' }}>
                <span style={{ color: '#0ea5e9', fontSize: '1.1rem' }}>{b.icon}</span>
                <span>{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
         3. BENTO SHOWCASE (Large Radiant Sky-Blue Container matching sec2_bento.png)
         ========================================================================= */}
      <section style={{
        padding: '2rem 1.5rem 5rem 1.5rem',
        maxWidth: '1380px',
        margin: '0 auto'
      }}>
        <div style={{
          borderRadius: '36px',
          padding: '2.5rem',
          background: 'radial-gradient(ellipse at 50% 40%, #7dd3fc 0%, #38bdf8 35%, #0ea5e9 75%, #0284c7 100%)',
          boxShadow: '0 30px 70px -15px rgba(14, 165, 233, 0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Bento Asymmetrical 4-Card Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '1.75rem',
            position: 'relative'
          }}>
            {/* 1. Top-Left: Analytics & Financial Dashboard UI Mockup (7 cols) */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              style={{
                gridColumn: 'span 7',
                background: '#ffffff',
                borderRadius: '24px',
                padding: '1.5rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {/* Mockup Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>
                    ▲
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>FinTech Portfolio Cloud</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#64748b' }}>
                  <span>Overview</span>
                  <span style={{ color: '#0ea5e9', fontWeight: 600 }}>Analytics</span>
                  <span>Reports</span>
                </div>
              </div>

              {/* Metrics Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '14px' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>Total Volume</span>
                  <span style={{ fontSize: '1.15rem', fontWeight: 600, color: '#0f172a' }}>$128,450.00</span>
                </div>
                <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '14px' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>Conversion</span>
                  <span style={{ fontSize: '1.15rem', fontWeight: 600, color: '#0284c7' }}>+24.8%</span>
                </div>
                <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '14px' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>Active Nodes</span>
                  <span style={{ fontSize: '1.15rem', fontWeight: 600, color: '#0f172a' }}>1,840</span>
                </div>
              </div>

              {/* Mini Bar Chart Mockup */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '60px', padding: '0.5rem 0' }}>
                {[45, 70, 35, 85, 60, 95, 80, 65, 100, 75, 90, 85].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${h}%`,
                      borderRadius: '4px',
                      background: i === 8 ? '#0284c7' : '#bae6fd',
                      transition: 'height 0.3s'
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* 2. Top-Right: Architecture & Real Estate Website (5 cols) */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              style={{
                gridColumn: 'span 5',
                background: '#ffffff',
                borderRadius: '24px',
                padding: '1.5rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ height: '140px', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=300&fit=crop" 
                  alt="Modern Villa"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(255,255,255,0.9)', padding: '0.3rem 0.75rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 600, color: '#0f172a' }}>
                  ✦ Featured Estate
                </div>
              </div>
              <div style={{ marginTop: '0.85rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#0f172a', margin: '0 0 0.25rem 0' }}>The Nordic Horizon Villa</h4>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Copenhagen, Denmark • $2.4M</span>
              </div>
            </motion.div>

            {/* 3. Bottom-Left: Telemedicine / Healthcare Portal (5 cols) */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              style={{
                gridColumn: 'span 5',
                background: '#ffffff',
                borderRadius: '24px',
                padding: '1.5rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&h=120&fit=crop&crop=faces" 
                  alt="Doctor"
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f172a', margin: 0 }}>Dr. Aris Thorne, MD</h4>
                  <span style={{ fontSize: '0.75rem', color: '#0ea5e9', fontWeight: 500 }}>Chief Neurological Consultant</span>
                </div>
              </div>

              <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '0.85rem', margin: '1rem 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.35rem' }}>
                  <span style={{ color: '#64748b' }}>Next Consultation:</span>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>14:30 GMT</span>
                </div>
                <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '70%', height: '100%', background: '#0284c7' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#64748b' }}>
                <span>✦ Verified Telehealth API</span>
                <span style={{ color: '#0284c7', fontWeight: 600 }}>Active</span>
              </div>
            </motion.div>

            {/* 4. Bottom-Right: Scandinavian Furniture & Interior Design (7 cols) */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              style={{
                gridColumn: 'span 7',
                background: '#ffffff',
                borderRadius: '24px',
                padding: '1.5rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                minHeight: '280px',
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'center'
              }}
            >
              <div style={{ flex: '1 1 50%', height: '180px', borderRadius: '16px', overflow: 'hidden' }}>
                <img 
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop" 
                  alt="Living Room"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ flex: '1 1 50%' }}>
                <span style={{ fontSize: '0.75rem', color: '#0ea5e9', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nordic Collection</span>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', margin: '0.4rem 0 0.5rem 0' }}>Oak Lounge Chair & Credenza</h4>
                <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.45, margin: '0 0 1rem 0' }}>
                  Artisanal solid oak woodwork engineered with sustainable fabric upholstery.
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a' }}>$1,250.00</span>
                  <span style={{ fontSize: '0.75rem', padding: '0.35rem 0.85rem', background: '#0f172a', color: '#fff', borderRadius: '20px' }}>Explore</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         4. STATEMENT & FLANKING PILL BADGES ("I like" / Exact Match to sec3_focus.png)
         ========================================================================= */}
      <section id="about" style={{
        padding: '5rem 1.5rem',
        maxWidth: '1240px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Kicker Italic Serif: I like */}
        <span 
          className="editorial-serif-italic"
          style={{
            fontSize: '2.4rem',
            color: '#0f172a',
            display: 'block',
            marginBottom: '2.5rem'
          }}
        >
          I like
        </span>

        {/* 3-Column Symmetrical Layout: 3 Pills Left | Statement Center | 3 Pills Right */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(180px, 220px) 1fr minmax(180px, 220px)',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          {/* Left Column (3 floating pill badges) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', alignItems: 'flex-start' }}>
            {[
              { label: "Mobile Design", color: "#ea580c", bg: "#fff7ed", border: "#fed7aa" },
              { label: "UX Design", color: "#0284c7", bg: "#f0f9ff", border: "#bae6fd" },
              { label: "User Research", color: "#334155", bg: "#f8fafc", border: "#e2e8f0" }
            ].map((p, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.04, x: 4 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.55rem 1.25rem',
                  borderRadius: '9999px',
                  background: '#ffffff',
                  border: `1.5px solid ${p.border}`,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  color: '#0f172a'
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color }} />
                <span>{p.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Center Column: Exact Statement Typography */}
          <blockquote style={{
            fontSize: 'clamp(1.9rem, 3.8vw, 3rem)',
            fontWeight: 400,
            letterSpacing: '-0.025em',
            lineHeight: 1.25,
            color: '#0f172a',
            margin: 0,
            textAlign: 'center'
          }}>
            focus is on blending clear strategy, thoughtful design, and user empathy to{' '}
            <span style={{ color: '#94a3b8' }}>
              craft experiences that solve real problems
            </span>
          </blockquote>

          {/* Right Column (3 floating pill badges) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', alignItems: 'flex-end' }}>
            {[
              { label: "Design Systems", color: "#ca8a04", bg: "#fefce8", border: "#fef08a" },
              { label: "Website Tuning", color: "#db2777", bg: "#fdf2f8", border: "#fbcfe8" },
              { label: "Motion Design", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" }
            ].map((p, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.04, x: -4 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.55rem 1.25rem',
                  borderRadius: '9999px',
                  background: '#ffffff',
                  border: `1.5px solid ${p.border}`,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  color: '#0f172a'
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color }} />
                <span>{p.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
         5. PROCESS SECTION ("Here's how it works" - Rotated Cards + Squiggles + Staggered Testimonials)
         ========================================================================= */}
      <section id="process" style={{
        padding: '5rem 1.5rem',
        maxWidth: '1380px',
        margin: '0 auto',
        position: 'relative'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <span className="editorial-kicker">
            / How The Process /
          </span>
          <h2 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            fontWeight: 400,
            letterSpacing: '-0.025em',
            margin: 0,
            color: '#0f172a'
          }}>
            Here's how it works
          </h2>
        </div>

        {/* 3 Interactive Process Cards (Tilts by default, straightens in unison on hover) */}
        <div 
          onMouseEnter={() => setProcessHovered(true)}
          onMouseLeave={() => {
            setProcessHovered(false);
            setHoveredProcessCard(null);
          }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            position: 'relative',
            padding: '1.5rem 0'
          }}
        >
          {/* SVG Squiggle Connector 1 (Card 01 -> Card 02) */}
          <motion.svg
            width="100"
            height="56"
            viewBox="0 0 100 56"
            fill="none"
            animate={{
              x: '-50%',
              y: processHovered ? 0 : 20,
              rotate: processHovered ? 0 : -15
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            style={{
              position: 'absolute',
              top: '4px',
              left: '32.8%',
              zIndex: 15,
              pointerEvents: 'none'
            }}
            className="desktop-connector"
          >
            <circle cx="14" cy="36" r="3.5" stroke="#0ea5e9" strokeWidth="2" fill="#ffffff" />
            <path 
              d="M 18 34 C 34 16, 64 10, 84 14" 
              stroke="#0ea5e9" 
              strokeWidth="2" 
              strokeLinecap="round" 
            />
            <circle cx="88" cy="15" r="3.5" stroke="#0ea5e9" strokeWidth="2" fill="#ffffff" />
          </motion.svg>

          {/* SVG Squiggle Connector 2 (Card 02 -> Card 03 Loop-the-loop) */}
          <motion.svg
            width="100"
            height="74"
            viewBox="0 0 100 74"
            fill="none"
            animate={{
              x: '-50%',
              y: processHovered ? 0 : 31,
              rotate: processHovered ? 0 : 30
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            style={{
              position: 'absolute',
              bottom: '22px',
              left: '66%',
              zIndex: 15,
              pointerEvents: 'none'
            }}
            className="desktop-connector"
          >
            <circle cx="12" cy="34" r="3.5" stroke="#0ea5e9" strokeWidth="2" fill="#ffffff" />
            <path
              d="M 16 34 C 30 34, 42 24, 50 10 C 55 4, 60 7, 56 22 C 50 40, 44 58, 56 62 C 66 64, 78 52, 84 44"
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="88" cy="44" r="3.5" stroke="#0ea5e9" strokeWidth="2" fill="#ffffff" />
          </motion.svg>

          {/* Card 01: Discover */}
          <motion.div
            animate={{
              rotate: processHovered ? 0 : -5,
              y: processHovered ? (hoveredProcessCard === 1 ? -8 : 0) : 12,
              scale: hoveredProcessCard === 1 ? 1.015 : 1
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 22, mass: 0.8 }}
            onMouseEnter={() => setHoveredProcessCard(1)}
            onMouseLeave={() => setHoveredProcessCard(null)}
            style={{
              background: '#ffffff',
              borderRadius: '28px',
              padding: '2.5rem',
              boxShadow: hoveredProcessCard === 1 
                ? '0 28px 56px -10px rgba(14, 165, 233, 0.16), 0 2px 10px rgba(0,0,0,0.04)'
                : '0 20px 40px -10px rgba(14, 165, 233, 0.08), 0 2px 10px rgba(0,0,0,0.03)',
              border: '1.5px solid #e2e8f0',
              minHeight: '380px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              cursor: 'pointer'
            }}
          >
            <span style={{
              fontSize: '2.8rem',
              fontWeight: 300,
              color: '#0f172a',
              lineHeight: 1
            }}>
              01
            </span>
            <div>
              <h3 style={{
                fontSize: '1.45rem',
                fontWeight: 600,
                color: '#0f172a',
                marginBottom: '0.65rem'
              }}>
                Discover
              </h3>
              <p style={{
                fontSize: '0.9rem',
                color: '#64748b',
                lineHeight: 1.55,
                margin: 0
              }}>
                Deep research into user workflows, market patterns, and technical requirements to discover foundational opportunities.
              </p>
            </div>
          </motion.div>

          {/* Card 02: Design */}
          <motion.div
            animate={{
              rotate: processHovered ? 0 : 2.5,
              y: processHovered ? (hoveredProcessCard === 2 ? -8 : 0) : -26,
              scale: hoveredProcessCard === 2 ? 1.015 : 1
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 22, mass: 0.8 }}
            onMouseEnter={() => setHoveredProcessCard(2)}
            onMouseLeave={() => setHoveredProcessCard(null)}
            style={{
              background: '#ffffff',
              borderRadius: '28px',
              padding: '2.5rem',
              boxShadow: hoveredProcessCard === 2 
                ? '0 32px 64px -10px rgba(14, 165, 233, 0.2), 0 2px 10px rgba(0,0,0,0.04)'
                : '0 25px 50px -10px rgba(14, 165, 233, 0.12), 0 2px 10px rgba(0,0,0,0.03)',
              border: '1.5px solid #e2e8f0',
              minHeight: '380px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              zIndex: 5,
              cursor: 'pointer'
            }}
          >
            <span style={{
              fontSize: '2.8rem',
              fontWeight: 300,
              color: '#0f172a',
              lineHeight: 1
            }}>
              02
            </span>
            <div>
              <h3 style={{
                fontSize: '1.45rem',
                fontWeight: 600,
                color: '#0f172a',
                marginBottom: '0.65rem'
              }}>
                Design
              </h3>
              <p style={{
                fontSize: '0.9rem',
                color: '#64748b',
                lineHeight: 1.55,
                margin: 0
              }}>
                Crafting cohesive design systems, high-fidelity prototypes, and human-centered user experiences that feel intuitive.
              </p>
            </div>
          </motion.div>

          {/* Card 03: Deliver */}
          <motion.div
            animate={{
              rotate: processHovered ? 0 : -2.5,
              y: processHovered ? (hoveredProcessCard === 3 ? -8 : 0) : 28,
              scale: hoveredProcessCard === 3 ? 1.015 : 1
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 22, mass: 0.8 }}
            onMouseEnter={() => setHoveredProcessCard(3)}
            onMouseLeave={() => setHoveredProcessCard(null)}
            style={{
              background: '#ffffff',
              borderRadius: '28px',
              padding: '2.5rem',
              boxShadow: hoveredProcessCard === 3 
                ? '0 28px 56px -10px rgba(14, 165, 233, 0.16), 0 2px 10px rgba(0,0,0,0.04)'
                : '0 20px 40px -10px rgba(14, 165, 233, 0.08), 0 2px 10px rgba(0,0,0,0.03)',
              border: '1.5px solid #e2e8f0',
              minHeight: '380px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              cursor: 'pointer'
            }}
          >
            <span style={{
              fontSize: '2.8rem',
              fontWeight: 300,
              color: '#0f172a',
              lineHeight: 1
            }}>
              03
            </span>
            <div>
              <h3 style={{
                fontSize: '1.45rem',
                fontWeight: 600,
                color: '#0f172a',
                marginBottom: '0.65rem'
              }}>
                Deliver
              </h3>
              <p style={{
                fontSize: '0.9rem',
                color: '#64748b',
                lineHeight: 1.55,
                margin: 0
              }}>
                Production-ready engineering, rigorous testing, and seamless deployment delivering measurable business outcomes.
              </p>
            </div>
          </motion.div>
        </div>

        {/* 2 Staggered Testimonials Underneath (Matching sec4_process.png) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '4rem',
          maxWidth: '1080px',
          margin: '7rem auto 0 auto',
          alignItems: 'flex-start'
        }}>
          {/* Testimonial 1 (Left) */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '1.75rem',
            border: '1px solid #f1f5f9',
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            position: 'relative'
          }}>
            <span style={{ position: 'absolute', top: '1.25rem', right: '1.5rem', fontSize: '1.5rem', color: '#0f172a', fontWeight: 700 }}>
              ”
            </span>
            <p style={{ fontSize: '0.95rem', color: '#1e293b', lineHeight: 1.6, margin: '0 0 1.5rem 0', fontWeight: 400 }}>
              "Hilman's ability to balance technical complexity with exceptional aesthetics is rare. He delivered our design system and engineering integration weeks ahead of schedule."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces" 
                alt="Dedy Sejati"
                style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a', display: 'block' }}>Dedy Sejati</span>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Product Director at FinTech Co</span>
              </div>
            </div>
          </div>

          {/* Testimonial 2 (Right, shifted down for staggered editorial rhythm) */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '1.75rem',
            border: '1px solid #f1f5f9',
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            position: 'relative',
            marginTop: '3.5rem'
          }}>
            <span style={{ position: 'absolute', top: '1.25rem', right: '1.5rem', fontSize: '1.5rem', color: '#0f172a', fontWeight: 700 }}>
              ”
            </span>
            <p style={{ fontSize: '0.95rem', color: '#1e293b', lineHeight: 1.6, margin: '0 0 1.5rem 0', fontWeight: 400 }}>
              "Working with Hilman transformed our product entirely. The intuitive UX and robust architecture led to an immediate increase in user satisfaction and retention."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" 
                alt="Sarah Wijaya"
                style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a', display: 'block' }}>Sarah Wijaya</span>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Head of Product at CloudSphere</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         6. SELECTED WORKS (2x2 Grid Matching sec5_works.png)
         ========================================================================= */}
      <section id="works" style={{
        padding: '5rem 1.5rem',
        maxWidth: '1380px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="editorial-kicker">
            / More Projects /
          </span>
          <h2 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            fontWeight: 400,
            letterSpacing: '-0.025em',
            margin: 0,
            color: '#0f172a'
          }}>
            Selected Works
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
          gap: '2.5rem'
        }}>
          {showcaseWorks.map((work) => (
            <motion.div
              key={work.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedProject(work)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              {/* Project Preview Window Mockup */}
              <div style={{
                height: '320px',
                borderRadius: '24px',
                background: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                boxShadow: '0 15px 35px -10px rgba(0,0,0,0.04)'
              }}>
                {work.previewType === 'fintech' && (
                  <div style={{ width: '100%', height: '100%', background: '#ffffff', borderRadius: '16px', padding: '1.25rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>✦ Treasury Dashboard</span>
                      <span style={{ fontSize: '0.75rem', color: '#0ea5e9', background: '#f0f9ff', padding: '0.2rem 0.5rem', borderRadius: '12px' }}>Live v2.4</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', height: '120px' }}>
                      <div style={{ width: '45%', height: '100%', borderRadius: '12px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7', fontWeight: 600, fontSize: '0.85rem' }}>
                        Asset Distribution
                      </div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ height: '24px', background: '#f1f5f9', borderRadius: '6px', width: '90%' }} />
                        <div style={{ height: '24px', background: '#f1f5f9', borderRadius: '6px', width: '70%' }} />
                        <div style={{ height: '24px', background: '#0284c7', borderRadius: '6px', width: '85%' }} />
                      </div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Centralized Multi-chain Settlements</span>
                  </div>
                )}

                {work.previewType === 'realestate' && (
                  <div style={{ width: '100%', height: '100%', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&h=450&fit=crop" 
                      alt="Modern Real Estate"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', bottom: '15px', left: '15px', right: '15px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', padding: '0.75rem 1rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>Villa Solaire Estate</span>
                      <span style={{ fontSize: '0.75rem', color: '#0ea5e9', fontWeight: 600 }}>Explore Tour →</span>
                    </div>
                  </div>
                )}

                {work.previewType === 'learning' && (
                  <div style={{ width: '100%', height: '100%', background: '#0f172a', borderRadius: '16px', padding: '1.25rem', color: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#38bdf8' }}>Interactive Curriculum</span>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Module 04</span>
                    </div>
                    <div>
                      <h5 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0', fontWeight: 500 }}>Advanced System Architecture</h5>
                      <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>4.8 Rating • 1,240 active students</p>
                    </div>
                    <div style={{ height: '6px', background: '#334155', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: '65%', height: '100%', background: '#38bdf8' }} />
                    </div>
                  </div>
                )}

                {work.previewType === 'health' && (
                  <div style={{ width: '100%', height: '100%', display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '90px', height: '180px', borderRadius: '18px', background: '#ffffff', border: '3px solid #0f172a', padding: '0.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 20px rgba(0,0,0,0.06)' }}>
                      <div style={{ width: '30px', height: '4px', background: '#e2e8f0', borderRadius: '2px', margin: '0 auto' }} />
                      <div style={{ width: '100%', height: '50px', background: '#e0f2fe', borderRadius: '8px' }} />
                      <span style={{ fontSize: '0.55rem', color: '#0284c7', textAlign: 'center', display: 'block' }}>Vitals Log</span>
                    </div>
                    <div style={{ width: '105px', height: '210px', borderRadius: '20px', background: '#ffffff', border: '3px solid #0ea5e9', padding: '0.6rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 12px 25px rgba(14,165,233,0.15)' }}>
                      <div style={{ width: '35px', height: '4px', background: '#e2e8f0', borderRadius: '2px', margin: '0 auto' }} />
                      <div style={{ width: '100%', height: '70px', background: 'linear-gradient(180deg, #bae6fd, #7dd3fc)', borderRadius: '10px' }} />
                      <span style={{ fontSize: '0.6rem', fontWeight: 600, color: '#0f172a', textAlign: 'center', display: 'block' }}>Dr. Telehealth</span>
                    </div>
                    <div style={{ width: '90px', height: '180px', borderRadius: '18px', background: '#ffffff', border: '3px solid #0f172a', padding: '0.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 20px rgba(0,0,0,0.06)' }}>
                      <div style={{ width: '30px', height: '4px', background: '#e2e8f0', borderRadius: '2px', margin: '0 auto' }} />
                      <div style={{ width: '100%', height: '50px', background: '#f1f5f9', borderRadius: '8px' }} />
                      <span style={{ fontSize: '0.55rem', color: '#64748b', textAlign: 'center', display: 'block' }}>Schedule</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Tags Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', margin: 0 }}>
                  {work.title}
                </h3>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#475569', background: '#f1f5f9', padding: '0.25rem 0.65rem', borderRadius: '9999px' }}>
                    {work.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#475569', background: '#f1f5f9', padding: '0.25rem 0.65rem', borderRadius: '9999px' }}>
                    {work.subtag}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================================================================
         7. ABOUT & CAREER TIMELINE ("Pushing Boundaries since 2011" / sec6_about.png)
         ========================================================================= */}
      <section style={{
        padding: '5rem 1.5rem',
        maxWidth: '1240px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="editorial-kicker">
            / Who Am I /
          </span>
          <h2 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            fontWeight: 500,
            letterSpacing: '-0.025em',
            margin: 0,
            color: '#0f172a'
          }}>
            Pushing Boundaries <span style={{ fontWeight: 300, color: '#94a3b8' }}>since 2021</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
          gap: '3.5rem',
          alignItems: 'center'
        }} className="about-2col">
          {/* Left: Dark Portrait Card Matching Reference */}
          <div style={{
            background: '#0f172a',
            borderRadius: '24px',
            padding: '1.75rem',
            color: '#ffffff',
            boxShadow: '0 20px 50px rgba(15, 23, 42, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '380px'
          }}>
            <div style={{
              width: '100%',
              height: '260px',
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#1e293b',
              marginBottom: '1.25rem'
            }}>
              <img 
                src="/himmel_card.jpg" 
                alt="Hilman Zahrawa - Product Designer"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  objectPosition: 'center 15%' 
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                  Hilman Zahrawa
                </h4>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Product Designer
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.85rem' }}>
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8' }}><MessageCircle size={17} /></a>
                <a href={`mailto:${email}`} style={{ color: '#94a3b8' }}><Mail size={17} /></a>
                <a href="https://linkedin.com/in/hilmanzahrawa" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8' }}><Linkedin size={17} /></a>
              </div>
            </div>
          </div>

          {/* Right: Paragraph + Minimal Experience Rows */}
          <div>
            <p style={{
              fontSize: '1.05rem',
              color: '#334155',
              lineHeight: 1.65,
              fontWeight: 400,
              margin: '0 0 2.5rem 0'
            }}>
              A product designer passionate about creating intuitive digital experiences. I've collaborated with companies to design products that drive value and create impact for users and organizations through human-centered design principles.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { role: "Product Designer", company: "TechStudio Agency", period: "2024 — Present" },
                { role: "Senior UI/UX Designer", company: "Creative Capital", period: "2023 — 2024" },
                { role: "Visual Designer", company: "Arise Media", period: "2022 — 2023" },
                { role: "Junior UX Researcher", company: "Solid Creative", period: "2021 — 2022" },
              ].map((exp, i) => (
                <div 
                  key={i} 
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.15rem 0',
                    borderTop: '1px solid #f1f5f9',
                    fontSize: '0.9rem'
                  }}
                >
                  <span style={{ fontWeight: 600, color: '#0f172a', flex: '1 1 35%' }}>{exp.role}</span>
                  <span style={{ color: '#64748b', flex: '1 1 35%' }}>{exp.company}</span>
                  <span style={{ color: '#94a3b8', textAlign: 'right', flex: '1 1 30%' }}>{exp.period}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         8. CTA BANNER WITH 3D WAVES (Exact Match: "Let's Make It Happen")
         ========================================================================= */}
      <section style={{
        padding: '3rem 1.5rem',
        maxWidth: '1380px',
        margin: '0 auto'
      }}>
        <div style={{
          borderRadius: '36px',
          padding: '5rem 2rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse at center, #7dd3fc 0%, #38bdf8 35%, #0284c7 100%)',
          boxShadow: '0 30px 60px -15px rgba(14, 165, 233, 0.4)'
        }}>
          {/* 3D Wave Particle Canvas */}
          <SkyWaves3D />

          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{
              fontSize: 'clamp(2.8rem, 6.5vw, 4.8rem)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              margin: 0,
              color: '#0f172a',
              lineHeight: 1.05
            }}>
              Let’s Make It Happen
            </h2>

            <p style={{
              fontSize: '1rem',
              color: '#0f172a',
              maxWidth: '560px',
              marginTop: '1.25rem',
              marginBottom: '2.5rem',
              lineHeight: 1.55,
              fontWeight: 400
            }}>
              always open for new opportunities, collaborations, and creative challenges. Let's work together to bring your ideas to life
            </p>

            <a
              href={`https://wa.me/${whatsapp}?text=Hi%20Hilman,%20let's%20make%20it%20happen`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.85rem 2.2rem',
                borderRadius: '9999px',
                background: '#0f172a',
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textDecoration: 'none',
                boxShadow: '0 10px 25px rgba(15, 23, 42, 0.35)',
                transition: 'transform 0.2s'
              }}
            >
              ✦ DROP A LINE
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
         9. FOOTER NAVIGATION & GIANT WATERMARK NAME (Exact Match to sec7_footer.png)
         ========================================================================= */}
      <footer style={{
        padding: '2.5rem 1.5rem 0 1.5rem',
        maxWidth: '1380px',
        margin: '0 auto',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid #f1f5f9'
        }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/" style={{ color: '#0f172a', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>Home</Link>
            <a href="#about" style={{ color: '#64748b', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>About</a>
            <a href="#works" style={{ color: '#64748b', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>Portfolio</a>
            <a href={`mailto:${email}`} style={{ color: '#64748b', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>Contact</a>
          </div>

          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            © {new Date().getFullYear()} Hilman Zahrawa. All rights reserved.
          </span>
        </div>

        {/* Massive Display Watermark Name Spanning Bottom Edge */}
        <div style={{
          textAlign: 'center',
          padding: '2.5rem 0 0 0',
          userSelect: 'none',
          pointerEvents: 'none',
          overflow: 'hidden',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <span 
            className="editorial-serif-italic"
            style={{
              fontSize: 'clamp(4.2rem, 13vw, 13.5rem)',
              lineHeight: 0.85,
              color: '#0f172a',
              display: 'inline-block',
              whiteSpace: 'nowrap',
              letterSpacing: '-0.02em',
              fontWeight: 400
            }}
          >
            {name}
          </span>
        </div>
      </footer>

      {/* Project Detail Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                maxWidth: '650px',
                width: '100%',
                padding: '2.5rem',
                position: 'relative',
                boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0f172a'
                }}
              >
                <X size={18} />
              </button>

              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0ea5e9' }}>
                {selectedProject.category} • {selectedProject.subtag}
              </span>

              <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#0f172a', margin: '0.5rem 0 1rem 0' }}>
                {selectedProject.title}
              </h2>

              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '2rem' }}>
                {selectedProject.desc}
              </p>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <a
                  href={`https://wa.me/${whatsapp}?text=Hi%20Hilman,%20I'm%20interested%20in%20${encodeURIComponent(selectedProject.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '9999px',
                    background: '#0f172a',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    textDecoration: 'none'
                  }}
                >
                  Discuss Project <ArrowUpRight size={15} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
