'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  ExternalLink, 
  CheckCircle2, 
  Mail, 
  MessageCircle, 
  Linkedin, 
  Github, 
  X, 
  Menu, 
  TrendingUp, 
  Calendar, 
  Star, 
  Users, 
  Sliders, 
  Smartphone, 
  Layers, 
  Award,
  Trophy,
  GraduationCap, 
  Briefcase, 
  Code2,
  Shield,
  Workflow,
  Compass, 
  Check, 
  BookOpen,
  Sparkles,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Play,
  Maximize2,
  Eye,
  Globe,
  Anchor,
  HeartHandshake,
  Sprout,
  Shirt,
  Zap,
  RotateCw,
  Landmark
} from 'lucide-react';
import { fallbackPortfolioData } from '@/lib/supabase';
const CircularCarousel = dynamic(() => import('@/components/CircularCarousel'), { ssr: false });
const FlipCard = dynamic(() => import('@/components/FlipCard'), { ssr: false });
const OrbitImages = dynamic(() => import('@/components/OrbitImages'), { ssr: false });

function getYoutubeEmbedUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}?rel=0&playsinline=1` : null;
}
import dynamic from 'next/dynamic';
import MediumArticles from '@/components/MediumArticles';

// Code-split heavy 3D WebGL canvases to keep initial page bundle ultra-light and fast
const SkyWaves3D = dynamic(() => import('@/components/SkyWaves3D'), { 
  ssr: false, 
  loading: () => null 
});

const BlueMoonPetals = dynamic(() => import('@/components/BlueMoonPetals'), { 
  ssr: false, 
  loading: () => null 
});

interface ClientPageProps {
  initialData?: any;
}

export default function ClientPage({ initialData }: ClientPageProps) {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [expandedProject, setExpandedProject] = useState<any | null>(null);
  const [expandedAnchorId, setExpandedAnchorId] = useState<string | null>(null);
  const [expandedImageIndex, setExpandedImageIndex] = useState<number>(0);
  const [galleryFilter, setGalleryFilter] = useState<string>('all');
  const [activeModalImageIndex, setActiveModalImageIndex] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [processHovered, setProcessHovered] = useState(false);
  const [hoveredProcessCard, setHoveredProcessCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isExpandedMediaLoading, setIsExpandedMediaLoading] = useState<boolean>(true);
  const [isModalMediaLoading, setIsModalMediaLoading] = useState<boolean>(true);
  const [selectedExpId, setSelectedExpId] = useState<string | null>("exp-pal");
  const [expCategoryFilter, setExpCategoryFilter] = useState<string>("all");
  const [isRealPhoto, setIsRealPhoto] = useState<boolean>(false);
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0, glowX: 50, glowY: 50 });
  const [activeAwardId, setActiveAwardId] = useState<number | null>(0);
  const [awardsCategoryFilter, setAwardsCategoryFilter] = useState<string>("all");

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    setIsExpandedMediaLoading(true);
    const timer = setTimeout(() => {
      setIsExpandedMediaLoading(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, [expandedProject?.id, expandedProject?.slug, expandedImageIndex]);

  React.useEffect(() => {
    if (selectedProject) {
      setIsModalMediaLoading(true);
      const timer = setTimeout(() => {
        setIsModalMediaLoading(false);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [selectedProject?.id, selectedProject?.slug, activeModalImageIndex]);

  const bio = initialData?.bio || {};
  const rawName = bio?.name || "Hilman Zahrawa";
  const name = rawName === rawName.toUpperCase() && rawName.length > 3
    ? rawName.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
    : rawName;
  const headline = bio?.headline || "Fullstack Developer | UI/UX Designer";
  const email = bio?.email || "budiarto3788@gmail.com";
  const whatsapp = bio?.whatsapp || "6285806003234";
  const location = bio?.location || "Malang, Jawa Timur, Indonesia";
  const about = bio?.about || "Software Engineer passionate about building scalable web applications, AI-powered solutions, and meaningful digital experiences. I bridge engineering, product thinking, and visual design to create software that performs exceptionally and leaves a lasting impression.";
  const mediumUsername = bio?.mediumUsername || bio?.medium_username || "hilmanzahrawa";

  // Authentic Hilman Zahrawa Projects with full gallery screenshots
  const showcaseWorks = (initialData?.projects && initialData.projects.length > 0)
    ? initialData.projects
    : fallbackPortfolioData.projects;

  const galleryCategories = [
    { id: 'all', label: 'All Projects', count: showcaseWorks.length },
    { 
      id: 'web', 
      label: 'Web Apps & SaaS', 
      count: showcaseWorks.filter((p: any) => p.categoryTab === 'web' || p.slug === 'brewtech' || p.slug === 'polinema-creative-center' || p.role?.toLowerCase().includes('fullstack') || p.role?.toLowerCase().includes('developer')).length 
    },
    { 
      id: 'ui', 
      label: 'UI/UX Design', 
      count: showcaseWorks.filter((p: any) => p.categoryTab === 'ui' || p.role?.toLowerCase().includes('designer') || p.slug === 'profile-plus' || p.slug === 'disnakertrans-jatim').length 
    },
    { 
      id: 'landing', 
      label: 'Landing Pages', 
      count: showcaseWorks.filter((p: any) => p.categoryTab === 'landing' || p.title?.toLowerCase().includes('landing') || p.slug === 'among-rasa' || p.slug === 'pos-paud-teratai' || p.slug === 'jayatrans').length 
    },
    { 
      id: 'creative', 
      label: 'Film & Media', 
      count: showcaseWorks.filter((p: any) => p.categoryTab === 'creative' || p.role?.toLowerCase().includes('director') || p.role?.toLowerCase().includes('editor') || Boolean(p.videoUrl)).length 
    }
  ];

  const filteredWorks = React.useMemo(() => {
    return showcaseWorks.filter((work: any) => {
      if (galleryFilter === 'all') return true;
      if (galleryFilter === 'web') {
        return work.categoryTab === 'web' || 
          work.slug === 'brewtech' || 
          work.slug === 'polinema-creative-center' ||
          work.role?.toLowerCase().includes('fullstack') ||
          work.role?.toLowerCase().includes('developer');
      }
      if (galleryFilter === 'ui') {
        return work.categoryTab === 'ui' || 
          work.slug === 'profile-plus' || 
          work.slug === 'disnakertrans-jatim' || 
          work.slug === 'jayatrans' ||
          work.role?.toLowerCase().includes('designer');
      }
      if (galleryFilter === 'landing') {
        return work.categoryTab === 'landing' || 
          work.title?.toLowerCase().includes('landing') ||
          work.slug === 'among-rasa' ||
          work.slug === 'pos-paud-teratai' ||
          work.slug === 'jayatrans';
      }
      if (galleryFilter === 'creative') {
        return work.categoryTab === 'creative' || 
          work.role?.toLowerCase().includes('director') || 
          work.role?.toLowerCase().includes('editor') ||
          work.title?.toLowerCase().includes('nevasca') ||
          work.title?.toLowerCase().includes('mv');
      }
      return true;
    });
  }, [showcaseWorks, galleryFilter]);

  // Authentic partner & organization affiliations
  const partnerLogos = [
    { name: "PT PAL Indonesia", icon: "⚓" },
    { name: "Mandala Pure Love", icon: "♥" },
    { name: "Innovillage", icon: "✦" },
    { name: "Disnakertrans Jatim", icon: "🏛" },
    { name: "Polinema", icon: "🎓" },
    { name: "SEAL Accelerator", icon: "⚡" },
    { name: "Djarum Beasiswa Plus", icon: "★" },
    { name: "Dicoding Indonesia", icon: "❖" }
  ];

  // Authentic Experiences List
  const experiencesList = (initialData?.experiences && initialData.experiences.length > 0)
    ? initialData.experiences
    : [
        {
          id: "exp-pal",
          company: "PT PAL Indonesia (Persero)",
          role: "HRIS Developer – HCM Division",
          period: "Apr 2026 — Present",
          description: "Developing Human Capital Management and HR Information Systems (HRIS) to streamline personnel operations, organizational data, and enterprise human resource workflows."
        },
        {
          id: "exp-mandala-strat",
          company: "Mandala Pure Love",
          role: "Creative Strategist",
          period: "Sept 2025 — Present",
          description: "Led inclusive communication strategies and creative direction to promote disability inclusion and community empowerment. Developed 'The Cup We Share' barista training program with Kafe Among Rasa for SLB YPAC Kota Malang."
        },
        {
          id: "exp-mandala-dev",
          company: "Mandala Pure Love",
          role: "Web Developer",
          period: "Dec 2025 — Apr 2026",
          description: "Contributed to BrewTech under the Innovillage program. Responsible for system requirements analysis, website architecture, front-end and back-end functionalities, database management, and performance optimization."
        },
        {
          id: "exp-nzbox",
          company: "NZ Box Smart Laundry",
          role: "Social Media Specialist",
          period: "Feb 2026 — Apr 2026",
          description: "Developed marketing strategies to increase brand awareness, customer acquisition, and retention. Managed social media campaigns and optimized advertising performance for a 24-hr self-service laundry solution."
        },
        {
          id: "exp-seal",
          company: "Social Economic Accelerator Lab (SEAL)",
          role: "UI/UX Designer",
          period: "Aug 2025 — Dec 2025",
          description: "Designed modern, accessible, and user-friendly website interface for East Java Manpower and Transmigration Office (Disnakertrans Jatim). Created intuitive CMS dashboards and designed UI/UX for ProFile+ HR Management System."
        },
        {
          id: "exp-hmti-chair",
          company: "HMTI Polinema",
          role: "Chairman",
          period: "Feb 2024 — Feb 2025",
          description: "Led student organization overseeing 11 programs and 30+ agendas across 5 departments. Fostered inter-campus collaboration and enhanced student engagement."
        },
        {
          id: "exp-hmti-comm",
          company: "HMTI Polinema",
          role: "Organizing Committee",
          period: "Feb 2023 — Feb 2024",
          description: "Planned and executed departmental events, coordinating logistics, technical readiness, and student-faculty communication."
        },
        {
          id: "exp-debate",
          company: "IT Dept English Community",
          role: "Debate Mentor",
          period: "Dec 2023 — Feb 2025",
          description: "Mentored collegiate debaters in critical reasoning, international relations motion analysis, and British Parliamentary debate formats."
        }
      ];

  // Authentic Education
  const educationList = (initialData?.education && initialData.education.length > 0)
    ? initialData.education
    : [
        {
          school: "Politeknik Negeri Malang (Polinema)",
          degree: "D4 Sistem Informasi Bisnis (Business Information Systems)",
          period: "2022 — 2026",
          desc: "Specialized in Software Engineering, Enterprise Database Systems, Business Process Modeling, and Web Application Architecture."
        },
        {
          school: "SMA Negeri 1 Malang",
          degree: "Mathematics & Natural Science (MIPA)",
          period: "2019 — 2022",
          desc: "Strong foundation in mathematics, analytical problem solving, and science curriculum."
        }
      ];

  // Authentic Honors & Awards
  const honorsList = (initialData?.honors && initialData.honors.length > 0)
    ? initialData.honors
    : [
        {
          title: "\"Mandala Pure Love\" Most Inspiring Community Empowerment",
          issuer: "Djarum Beasiswa Plus",
          year: "2026",
          desc: "Awarded as the most inspiring community empowerment initiative for 2024/2025."
        },
        {
          title: "Innovillage Top 180 for Brewtech",
          issuer: "Innovillage",
          year: "2026",
          desc: "Selected as one of the top 180 social projects in Indonesia for the BrewTech platform under the Innovillage program."
        },
        {
          title: "2nd Runner Up - IT Poly Debate Cup",
          issuer: "IT Debate Society",
          year: "2024",
          desc: "National level public debating event adhering to the British Parliamentary Debate System format."
        },
        {
          title: "Finalis Desain Poster Infografis - 4C National Competition",
          issuer: "Universitas Brawijaya",
          year: "2024",
          desc: "National design competition hosted by the Faculty of Computer Science at University of Brawijaya."
        },
        {
          title: "2nd Best Novice Team - International I&T Open Debate Competition",
          issuer: "Indonesian Student Association in Taiwan",
          year: "2023",
          desc: "Cross-cultural public debating event drawing participants from across Asia."
        }
      ];

  // Services & Specializations
  const servicesList = [
    {
      num: "01",
      badge: "DEVELOPMENT",
      title: "Web App & SaaS Development",
      desc: "Engineering high-performance web applications, internal business management systems, and scalable cloud platforms.",
      checks: [
        "Custom SaaS Platforms & Web Apps (LMS, CRM, Portals)",
        "Corporate Websites & Government Public Portals",
        "Point of Sale & Retail Management Systems",
        "High-Performance, SEO-Optimized Web Applications"
      ]
    },
    {
      num: "02",
      badge: "BRANDING & UI/UX",
      title: "Brand Identity & UI/UX Architecture",
      desc: "Designing distinctive brand identities, design systems, and intuitive user experiences from wireframes to full production.",
      checks: [
        "Brand Identity & Design Systems",
        "Interactive Prototypes & Wireframing in Figma",
        "Web & Mobile App UI/UX Architecture",
        "WCAG-Compliant & Inclusive Design Systems"
      ]
    },
    {
      num: "03",
      badge: "AUTOMATION",
      title: "Workflow Automation & Google Apps Script",
      desc: "Streamlining Google Workspace workflows (Sheets, Docs, Gmail, Forms) to boost operational efficiency without high server costs.",
      checks: [
        "Google Sheets, PDF & Automated Email Generation",
        "WhatsApp & Telegram Bot Integrations",
        "Custom Web Forms via Google Apps Script",
        "Automated Data Cleaning, Sync & Webhooks"
      ]
    }
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
         1. TOP NAVIGATION
         ========================================================================= */}
      <header className="landing-header" style={{
        padding: '1.75rem 2.5rem',
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
            className="editorial-serif-italic landing-logo"
            style={{
              fontSize: '1.9rem',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              fontWeight: 400
            }}
          >
            {name}
          </span>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="desktop-portfolio-nav" style={{ display: 'none', alignItems: 'center', gap: '2rem' }}>
          <a href="#works" style={{ textDecoration: 'none', color: '#0f172a', fontSize: '0.9rem', fontWeight: 600, transition: 'color 0.2s' }}>Works</a>
          <a href="#about" style={{ textDecoration: 'none', color: '#475569', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>About</a>
          <a href="#process" style={{ textDecoration: 'none', color: '#475569', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>Process</a>
          <a href="#experience" style={{ textDecoration: 'none', color: '#475569', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>Experience</a>
          <a href="#credentials" style={{ textDecoration: 'none', color: '#475569', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>Education</a>
          <a href="#articles" style={{ textDecoration: 'none', color: '#475569', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>Articles</a>
        </nav>

        {/* Right Navigation: Primary Contact CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Let's Talk CTA */}
          <a
            href={`https://wa.me/${whatsapp}?text=Hi%20Hilman,%20let's%20talk%20about%20a%20project`}
            target="_blank"
            rel="noopener noreferrer"
            className="desktop-header-cta"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1.25rem',
              borderRadius: '9999px',
              background: '#0f172a',
              color: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(15, 23, 42, 0.15)',
              transition: 'transform 0.2s ease',
            }}
          >
            <span>Let's Talk</span>
            <ArrowUpRight size={14} />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              border: '1.5px solid #e2e8f0',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#0f172a',
              transition: 'background 0.2s'
            }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '5rem',
              right: '2rem',
              background: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: '20px',
              padding: '1.5rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              zIndex: 100,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              minWidth: '240px'
            }}
          >
            <a href="#works" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 700, fontSize: '0.95rem' }}>Selected Works</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#475569', fontWeight: 500, fontSize: '0.95rem' }}>About Me</a>
            <a href="#credentials" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#475569', fontWeight: 500, fontSize: '0.95rem' }}>Education & Honors</a>
            <a href="#process" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#475569', fontWeight: 500, fontSize: '0.95rem' }}>Process</a>
            <a href="#experience" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#475569', fontWeight: 500, fontSize: '0.95rem' }}>Experience & Career</a>
            <a href="#articles" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#475569', fontWeight: 500, fontSize: '0.95rem' }}>Articles</a>
            <a href={`https://wa.me/${whatsapp}?text=Hi%20Hilman,%20let's%20talk`} onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>Let's Talk (WhatsApp)</span>
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
         2. HERO SECTION
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
          {/* Top Micro-Kicker: Location */}
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
            <span>( 1/1 ) {location}</span>
          </div>

          {/* Hero Main Headline */}
          <h1 className="hero-headline" style={{
            fontSize: 'clamp(3.2rem, 7.5vw, 6.2rem)',
            fontWeight: 500,
            letterSpacing: '-0.035em',
            lineHeight: 0.98,
            margin: 0,
            zIndex: 10,
            color: '#0f172a'
          }}>
            Hi I'm {name.split(' ')[0]}
            <span 
              className="editorial-serif-italic"
              style={{
                display: 'block',
                fontSize: '1.05em',
                fontWeight: 400,
                color: '#0f172a',
                marginTop: '0.1rem',
                letterSpacing: '-0.02em'
              }}
            >
              {headline}
            </span>
          </h1>

          {/* Central Hero Stage */}
          <div className="hero-stage-container">
            {/* Radiant Studio Glow Aura */}
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
                className="hero-badge-available"
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
                <span>Available for new projects</span>
              </motion.div>

              {/* Bottom: Real impact metrics */}
              <motion.div
                className="hero-trusted-avatars"
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
                      alt="Partner"
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
                  15+ projects delivered with 100% client satisfaction across web & UI/UX.
                </span>
              </motion.div>
            </div>

            {/* Center: Cutout Portrait */}
            <div className="hero-portrait-wrap">
              <img 
                src="/profilephoto_bust.png" 
                alt={`${name} - ${headline}`}
                className="hero-portrait-img"
                loading="eager"
              />
            </div>

            {/* Right Flank: Statement + Let's Talk CTA */}
            <div className="hero-flank-right">
              <motion.p
                className="hero-statement-right"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                style={{
                  fontSize: '0.98rem',
                  lineHeight: 1.55,
                  color: '#334155',
                  fontWeight: 400,
                  margin: 0,
                  maxWidth: '300px',
                  marginTop: '3.75rem'
                }}
              >
                Bridging robust software engineering, scalable cloud products, and human-centered user experiences.
              </motion.p>

              <motion.a
                className="hero-cta-btn"
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

          {/* Authentic Organizations & Partners Marquee */}
          <div className="hero-marquee-strip" style={{
            width: '100%',
            maxWidth: '1100px',
            margin: '2.5rem auto 0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            gap: '2.5rem',
            opacity: 0.75,
            zIndex: 10,
            scrollbarWidth: 'none'
          }}>
            {partnerLogos.map((b, i) => (
              <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.92rem', fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' }}>
                <span style={{ color: '#0ea5e9', fontSize: '1.05rem' }}>{b.icon}</span>
                <span>{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* =========================================================================
         3. PROJECT SHOWCASE GALLERY (Hilman's Selected Works)
         ========================================================================= */}
      <section id="works" className="works-section" style={{
        padding: '3rem 1.5rem 5.5rem 1.5rem',
        maxWidth: '1380px',
        margin: '0 auto'
      }}>
        {/* Gallery Top Navigation Header (Matching Image 2: "SELECTED WORK" / Location) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span style={{
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#0f172a'
            }}>
              Selected Work
            </span>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.15rem 0.6rem',
              borderRadius: '9999px',
              background: '#f1f5f9',
              color: '#0284c7'
            }}>
              {filteredWorks.length} Projects
            </span>
          </div>

          <span style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#64748b'
          }}>
            {location.split(',')[0]}, ID
          </span>
        </div>

        {/* Interactive Category Filter Pills */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          gap: '0.55rem',
          marginBottom: '2.5rem'
        }}>
          {galleryCategories.map((cat) => {
            const isActive = galleryFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setGalleryFilter(cat.id);
                  setExpandedAnchorId(null);
                  setExpandedProject(null);
                }}
                style={{
                  padding: '0.45rem 1.15rem',
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
                  fontWeight: isActive ? 700 : 500,
                  background: isActive ? '#0f172a' : '#ffffff',
                  color: isActive ? '#ffffff' : '#64748b',
                  border: isActive ? '1px solid #0f172a' : '1px solid #e2e8f0',
                  boxShadow: isActive ? '0 4px 12px rgba(15,23,42,0.15)' : 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{cat.label}</span>
                <span style={{
                  fontSize: '0.74rem',
                  padding: '0.1rem 0.5rem',
                  borderRadius: '9999px',
                  background: isActive ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                  color: isActive ? '#ffffff' : '#0f172a',
                  fontWeight: 700
                }}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

{/* =========================================================================
           PROJECT SHOWCASE GALLERY (Matching Ritchie Ollie Architecture)
           - Active view: Expanded project takes span 3 & span 2 at top of grid.
           - Remaining original cards naturally shift into Column 4 and Row 3+.
           - Smooth FLIP position animation on all cards without distortion or blink.
           - Clicking (X) collapses cleanly back to standard 4-column cards.
           ========================================================================= */}
        {(() => {
          const expandedIdx = expandedProject
            ? filteredWorks.findIndex((w: any) => 
                (w.id && expandedProject.id && w.id === expandedProject.id) ||
                (w.slug && expandedProject.slug && w.slug === expandedProject.slug) ||
                (w.title && expandedProject.title && w.title === expandedProject.title)
              )
            : -1;
          const expandedWork = expandedIdx !== -1 ? filteredWorks[expandedIdx] : expandedProject;
          const remainingWorks = expandedIdx !== -1
            ? [...filteredWorks.slice(expandedIdx + 1), ...filteredWorks.slice(0, expandedIdx)]
            : (expandedWork
                ? filteredWorks.filter((w: any) => 
                    !((w.id && expandedWork.id && w.id === expandedWork.id) ||
                      (w.slug && expandedWork.slug && w.slug === expandedWork.slug) ||
                      (w.title && expandedWork.title && w.title === expandedWork.title))
                  )
                : filteredWorks);

          const renderExpandedPanel = (work: any) => {
            const screenshotCount = Array.isArray(work.gallery) && work.gallery.length > 0
              ? work.gallery.length
              : (work.image || work.coverImage ? 1 : 0);
            const isVideo = Boolean(work.videoUrl || work.categoryTab === 'creative');
            const youtubeEmbed = getYoutubeEmbedUrl(work.videoUrl);
            const projectGallery: string[] = Array.isArray(work.gallery) && work.gallery.length > 0
              ? work.gallery
              : [work.image || work.coverImage].filter(Boolean);
            const activeScreenshot = projectGallery[expandedImageIndex] || projectGallery[0];

            return (
              <motion.div
                layout
                key="gallery-project-expanded"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                className="gallery-project-expanded"
              >
                <motion.div
                  key={`content-${work.id || work.slug}`}
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="expanded-inner-grid"
                >
                  {/* LEFT COLUMN: Media Viewport + Info Row + Screenshots Thumbnails */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Media Viewport (16:9 Aspect Ratio) */}
                    <div style={{
                      width: '100%',
                      aspectRatio: '16 / 9',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      background: '#0f172a',
                      position: 'relative',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.18)'
                    }}>
                      {isVideo && youtubeEmbed ? (
                        <>
                          <div className={`media-skeleton-container ${!isExpandedMediaLoading ? 'is-hidden' : ''}`}>
                            <div className="media-skeleton-wave" />
                            <div className="media-skeleton-badge">
                              <div className="media-skeleton-icon-disc">
                                <Play size={24} style={{ marginLeft: '3px' }} />
                              </div>
                              <div className="media-skeleton-label">Loading Video Player...</div>
                              <div className="media-skeleton-bar-wrap">
                                <div className="media-skeleton-bar-fill" />
                              </div>
                            </div>
                          </div>
                          <iframe
                            key={`yt-${work.id || work.slug}`}
                            src={youtubeEmbed || undefined}
                            title={work.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            referrerPolicy="strict-origin-when-cross-origin"
                            onLoad={() => setIsExpandedMediaLoading(false)}
                            style={{ width: '100%', height: '100%', border: 'none' }}
                          />
                        </>
                      ) : (
                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                          <img
                            key={`img-${activeScreenshot}`}
                            src={activeScreenshot}
                            alt={work.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: 'top center'
                            }}
                          />

                          {/* Navigation Chevrons if multi-screenshot */}
                          {screenshotCount > 1 && (
                            <>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedImageIndex((prev) => (prev > 0 ? prev - 1 : screenshotCount - 1));
                                }}
                                aria-label="Previous screenshot"
                                style={{
                                  position: 'absolute',
                                  left: '0.85rem',
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  width: '38px',
                                  height: '38px',
                                  borderRadius: '50%',
                                  background: 'rgba(15, 23, 42, 0.75)',
                                  backdropFilter: 'blur(8px)',
                                  color: '#ffffff',
                                  border: '1px solid rgba(255,255,255,0.2)',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  transition: 'all 0.2s'
                                }}
                              >
                                <ChevronLeft size={20} />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedImageIndex((prev) => (prev < screenshotCount - 1 ? prev + 1 : 0));
                                }}
                                aria-label="Next screenshot"
                                style={{
                                  position: 'absolute',
                                  right: '0.85rem',
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  width: '38px',
                                  height: '38px',
                                  borderRadius: '50%',
                                  background: 'rgba(15, 23, 42, 0.75)',
                                  backdropFilter: 'blur(8px)',
                                  color: '#ffffff',
                                  border: '1px solid rgba(255,255,255,0.2)',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  transition: 'all 0.2s'
                                }}
                              >
                                <ChevronRight size={20} />
                              </button>

                              {/* Screenshot Counter Pill */}
                              <div style={{
                                position: 'absolute',
                                bottom: '0.85rem',
                                left: '0.85rem',
                                background: 'rgba(15, 23, 42, 0.85)',
                                backdropFilter: 'blur(8px)',
                                color: '#ffffff',
                                fontSize: '0.74rem',
                                fontWeight: 700,
                                padding: '0.25rem 0.65rem',
                                borderRadius: '9999px',
                                border: '1px solid rgba(255,255,255,0.2)'
                              }}>
                                {expandedImageIndex + 1} / {screenshotCount} Screens
                              </div>
                            </>
                          )}
                        </div>
                      )}

                      {/* Top-Right (X) Close Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedAnchorId(null);
                          setExpandedProject(null);

                          // Smoothly keep viewport framed at works section without sudden layout drop
                          const worksEl = document.getElementById('works');
                          if (worksEl) {
                            const rect = worksEl.getBoundingClientRect();
                            if (rect.top < -40 || rect.top > 120) {
                              const targetY = Math.max(0, window.scrollY + rect.top - 15);
                              const startY = window.scrollY;
                              const startTime = performance.now();
                              const duration = 280;
                              const step = (now: number) => {
                                const p = Math.min((now - startTime) / duration, 1);
                                const ease = 1 - Math.pow(1 - p, 3);
                                window.scrollTo(0, startY + (targetY - startY) * ease);
                                if (p < 1) requestAnimationFrame(step);
                              };
                              requestAnimationFrame(step);
                            }
                          }
                        }}
                        title="Close expanded view"
                        aria-label="Close project preview"
                        style={{
                          position: 'absolute',
                          top: '1rem',
                          right: '1rem',
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          background: 'rgba(15, 23, 42, 0.82)',
                          backdropFilter: 'blur(8px)',
                          color: '#ffffff',
                          border: '1px solid rgba(255,255,255,0.25)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 10,
                          transition: 'transform 0.2s ease, background 0.2s ease'
                        }}
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {/* Info Row directly below Media Viewport */}
                    <div style={{ marginTop: '0.25rem' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'space-between',
                        gap: '0.75rem',
                        marginBottom: '0.25rem'
                      }}>
                        <h3 style={{
                          fontSize: '1.35rem',
                          fontWeight: 800,
                          color: '#0f172a',
                          margin: 0,
                          letterSpacing: '-0.02em',
                          lineHeight: 1.3
                        }}>
                          {work.title}
                        </h3>
                        <span style={{
                          fontSize: '0.9rem',
                          fontWeight: 800,
                          color: '#64748b',
                          flexShrink: 0
                        }}>
                          {work.year || '2025'}
                        </span>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.5rem',
                        fontSize: '0.86rem'
                      }}>
                        <span style={{
                          color: '#64748b',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em'
                        }}>
                          {work.subtitle || work.role || 'Project'}
                        </span>
                        <span style={{
                          color: '#0284c7',
                          fontWeight: 700,
                          flexShrink: 0
                        }}>
                          {work.displayCategory || work.category || 'Platform'}
                        </span>
                      </div>

                      {/* Screenshot thumbnails selector if multi-screen */}
                      {screenshotCount > 1 && (
                        <div style={{
                          display: 'flex',
                          gap: '0.5rem',
                          marginTop: '1rem',
                          overflowX: 'auto',
                          paddingBottom: '0.4rem'
                        }}>
                          {projectGallery.slice(0, 8).map((imgUrl: string, idx: number) => (
                            <button
                              type="button"
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedImageIndex(idx);
                              }}
                              style={{
                                width: '56px',
                                height: '36px',
                                borderRadius: '6px',
                                overflow: 'hidden',
                                padding: 0,
                                border: expandedImageIndex === idx ? '2px solid #0284c7' : '1px solid #e2e8f0',
                                cursor: 'pointer',
                                flexShrink: 0,
                                opacity: expandedImageIndex === idx ? 1 : 0.6,
                                transition: 'all 0.2s'
                              }}
                            >
                              <img src={imgUrl} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </button>
                          ))}
                          {screenshotCount > 8 && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProject(work);
                                setActiveModalImageIndex(0);
                              }}
                              style={{
                                height: '36px',
                                padding: '0 0.6rem',
                                borderRadius: '6px',
                                background: '#f1f5f9',
                                border: '1px solid #e2e8f0',
                                fontSize: '0.74rem',
                                fontWeight: 700,
                                color: '#0284c7',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              +{screenshotCount - 8} more
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Credits & Details */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                    borderLeft: '1px solid #f1f5f9',
                    paddingLeft: '1.5rem',
                    height: '100%'
                  }}>
                    <h4 style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#94a3b8',
                      margin: '0 0 0.25rem 0'
                    }}>
                      Credits & Details
                    </h4>

                    <div>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: '#64748b',
                        display: 'block',
                        marginBottom: '0.2rem'
                      }}>
                        Role
                      </span>
                      <span style={{
                        fontSize: '0.94rem',
                        fontWeight: 800,
                        color: '#0f172a'
                      }}>
                        {work.role || 'Fullstack Developer'}
                      </span>
                    </div>

                    <div>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: '#64748b',
                        display: 'block',
                        marginBottom: '0.2rem'
                      }}>
                        Client / Program
                      </span>
                      <span style={{
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        color: '#0f172a'
                      }}>
                        {work.subtitle || 'Independent'}
                      </span>
                    </div>

                    {work.stack && (
                      <div>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          color: '#64748b',
                          display: 'block',
                          marginBottom: '0.35rem'
                        }}>
                          Technologies
                        </span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                          {work.stack.split('·').slice(0, 5).map((t: string, i: number) => (
                            <span
                              key={i}
                              style={{
                                fontSize: '0.74rem',
                                fontWeight: 600,
                                color: '#1e293b',
                                background: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                padding: '0.2rem 0.55rem',
                                borderRadius: '6px'
                              }}
                            >
                              {t.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {work.impact && (
                      <div>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          color: '#64748b',
                          display: 'block',
                          marginBottom: '0.2rem'
                        }}>
                          Key Impact
                        </span>
                        <p style={{
                          fontSize: '0.84rem',
                          color: '#334155',
                          lineHeight: 1.5,
                          margin: 0,
                          fontWeight: 500
                        }}>
                          {work.impact}
                        </p>
                      </div>
                    )}

                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.65rem',
                      marginTop: 'auto',
                      paddingTop: '1rem'
                    }}>
                      {work.link && (
                        <a
                          href={work.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.65rem 0.95rem',
                            borderRadius: '10px',
                            background: '#0f172a',
                            color: '#ffffff',
                            fontSize: '0.84rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                            boxShadow: '0 4px 12px rgba(15,23,42,0.15)'
                          }}
                        >
                          <span>Visit Live Platform</span>
                          <ArrowUpRight size={15} />
                        </a>
                      )}

                      {work.videoUrl && (
                        <a
                          href={work.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.65rem 0.95rem',
                            borderRadius: '10px',
                            background: '#ef4444',
                            color: '#ffffff',
                            fontSize: '0.84rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                            boxShadow: '0 4px 12px rgba(239,68,68,0.2)'
                          }}
                        >
                          <span>Watch on YouTube</span>
                          <Play size={15} fill="#ffffff" />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(work);
                          setActiveModalImageIndex(expandedImageIndex);
                        }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.55rem 0.95rem',
                          borderRadius: '10px',
                          background: '#f0f9ff',
                          color: '#0284c7',
                          border: '1px solid #bae6fd',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        <span>Full Details & Lightbox ({screenshotCount})</span>
                        <Maximize2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          };

          const renderNormalCard = (work: any) => {
            const screenshotCount = Array.isArray(work.gallery) && work.gallery.length > 0
              ? work.gallery.length
              : (work.image || work.coverImage ? 1 : 0);
            const isVideo = Boolean(work.videoUrl || work.categoryTab === 'creative');
            const displayImg = work.image || work.coverImage;

            return (
              <motion.div
                layout="position"
                key={work.id || work.slug}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="gallery-project-item"
                onClick={() => {
                  setExpandedAnchorId(work.id || work.slug);
                  setExpandedProject(work);
                  setExpandedImageIndex(0);
                  setIsExpandedMediaLoading(true);

                  // Smooth mathematical cubic ease-out glide to works section (matching Ritchie Ollie)
                  const worksEl = document.getElementById('works');
                  if (worksEl) {
                    const targetY = Math.max(0, worksEl.getBoundingClientRect().top + window.scrollY - 15);
                    const startY = window.scrollY;
                    if (Math.abs(targetY - startY) > 25) {
                      const startTime = performance.now();
                      const duration = 280;
                      const step = (now: number) => {
                        const p = Math.min((now - startTime) / duration, 1);
                        const ease = 1 - Math.pow(1 - p, 3);
                        window.scrollTo(0, startY + (targetY - startY) * ease);
                        if (p < 1) requestAnimationFrame(step);
                      };
                      requestAnimationFrame(step);
                    }
                  }
                }}
              >
                {/* 16:9 Thumbnail */}
                <div style={{
                  width: '100%',
                  aspectRatio: '16 / 9',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: '#0f172a',
                  position: 'relative',
                  border: '1px solid rgba(15, 23, 42, 0.08)',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)'
                }}>
                  {displayImg ? (
                    <img
                      src={displayImg}
                      alt={work.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top center',
                        transition: 'transform 0.4s ease'
                      }}
                      className="gallery-item-img"
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff'
                    }}>
                      <Code2 size={24} style={{ opacity: 0.4 }} />
                    </div>
                  )}

                  {/* Screenshot Count or Video pill badge on top-right */}
                  <div style={{
                    position: 'absolute',
                    top: '0.65rem',
                    right: '0.65rem',
                    background: isVideo ? 'rgba(239, 68, 68, 0.9)' : 'rgba(15, 23, 42, 0.82)',
                    backdropFilter: 'blur(6px)',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.55rem',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}>
                    {isVideo ? (
                      <>
                        <Play size={10} fill="#ffffff" />
                        <span>Video</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon size={10} />
                        <span>{screenshotCount} {screenshotCount === 1 ? 'Screen' : 'Screens'}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Metadata underneath */}
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    marginBottom: '0.2rem'
                  }}>
                    <h3 style={{
                      fontSize: '0.94rem',
                      fontWeight: 800,
                      color: '#0f172a',
                      margin: 0,
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase',
                      lineHeight: 1.3,
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                    className="gallery-item-title"
                    >
                      {work.title}
                    </h3>
                    <span style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#64748b',
                      flexShrink: 0
                    }}>
                      {work.year || '2025'}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    fontSize: '0.82rem'
                  }}>
                    <span style={{
                      color: '#64748b',
                      fontWeight: 500,
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {work.subtitle || work.role || 'Project'}
                    </span>
                    <span style={{
                      color: '#0284c7',
                      fontWeight: 700,
                      flexShrink: 0
                    }}>
                      {work.displayCategory || work.category || 'Platform'}
                    </span>
                  </div>

                  <p style={{
                    fontSize: '0.82rem',
                    color: '#475569',
                    lineHeight: 1.5,
                    margin: '0.35rem 0 0 0',
                    fontWeight: 400,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {work.outcome || (work.description ? work.description.replace(/\n+/g, ' ') : work.subtitle)}
                  </p>
                </div>
              </motion.div>
            );
          };

          return (
            <div
              className="works-grid-image1"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1.75rem 1.25rem',
                alignItems: 'start'
              }}
            >
              <AnimatePresence>
                {expandedWork && renderExpandedPanel(expandedWork)}
                {remainingWorks.map((work: any) => renderNormalCard(work))}
              </AnimatePresence>
            </div>
          );
        })()}      </section>

      {/* =========================================================================
         4. STATEMENT & FOCUS AREAS ("I focus on")
         ========================================================================= */}
      <section id="about" className="focus-section-container" style={{
        padding: '5rem 1.5rem',
        maxWidth: '1240px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative'
      }}>
        <span 
          className="editorial-serif-italic"
          style={{
            fontSize: '2.4rem',
            color: '#0f172a',
            display: 'block',
            marginBottom: '2.5rem'
          }}
        >
          I focus on
        </span>

        <div className="focus-grid-layout" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(180px, 220px) 1fr minmax(180px, 220px)',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          {/* Left Column */}
          <div className="focus-left-pills" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', alignItems: 'flex-start' }}>
            {[
              { label: "Fullstack Web Apps", color: "#ea580c", bg: "#fff7ed", border: "#fed7aa" },
              { label: "UI/UX Architecture", color: "#0284c7", bg: "#f0f9ff", border: "#bae6fd" },
              { label: "Enterprise Systems", color: "#4f46e5", bg: "#eef2ff", border: "#c7d2fe" }
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

          {/* Center Column: Statement */}
          <blockquote className="focus-center-quote" style={{
            fontSize: 'clamp(1.8rem, 3.8vw, 2.9rem)',
            fontWeight: 400,
            letterSpacing: '-0.025em',
            lineHeight: 1.25,
            color: '#0f172a',
            margin: 0,
            textAlign: 'center'
          }}>
            focus is on blending scalable engineering, human-centered UI/UX, and empathetic strategy to{' '}
            <span style={{ color: '#94a3b8' }}>
              solve real problems and deliver measurable impact
            </span>
          </blockquote>

          {/* Right Column */}
          <div className="focus-right-pills" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', alignItems: 'flex-end' }}>
            {[
              { label: "Workflow Automation", color: "#059669", bg: "#f0fdf4", border: "#bbf7d0" },
              { label: "Google Apps Script", color: "#0d9488", bg: "#f0fdfa", border: "#99f6e4" },
              { label: "Inclusive Design", color: "#db2777", bg: "#fdf2f8", border: "#fbcfe8" }
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
         5. SERVICES & SPECIALIZATIONS (from previous website)
         ========================================================================= */}
      {false && (
      <section id="specializations" style={{
        padding: '5rem 1.5rem',
        maxWidth: '1380px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="editorial-kicker">
            / What I Deliver /
          </span>
          <h2 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            fontWeight: 400,
            letterSpacing: '-0.025em',
            margin: 0,
            color: '#0f172a'
          }}>
            Services & Specializations
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
          gap: '2rem'
        }}>
          {servicesList.map((svc) => (
            <motion.div
              key={svc.num}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              style={{
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '24px',
                padding: '2.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: 300, color: '#0ea5e9', lineHeight: 1 }}>{svc.num}</span>
                  <span style={{ fontSize: '0.8rem', background: '#f8fafc', color: '#0f172a', padding: '0.3rem 0.75rem', borderRadius: '9999px', fontWeight: 700, border: '1px solid #e2e8f0' }}>
                    {svc.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                  {svc.title}
                </h3>
                <p style={{ fontSize: '0.94rem', color: '#334155', lineHeight: 1.6, marginBottom: '1.5rem', fontWeight: 400 }}>
                  {svc.desc}
                </p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {svc.checks.map((chk, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.9rem', color: '#1e293b', lineHeight: 1.5, fontWeight: 500 }}>
                      <Check size={18} color="#0284c7" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{chk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`https://wa.me/${whatsapp}?text=Hi%20Hilman,%20I'm%20interested%20in%20${encodeURIComponent(svc.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  color: '#0284c7',
                  textDecoration: 'none',
                  paddingTop: '1rem',
                  borderTop: '1px solid #f1f5f9'
                }}
              >
                <span>Consult on WhatsApp</span>
                <ArrowUpRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </section>
      )}

      {/* =========================================================================
         6. PROCESS SECTION
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

        {/* 3 Interactive Process Cards */}
        <div 
          className="process-cards-grid"
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
          {/* SVG Connector 1 */}
          <motion.svg
            width="144"
            height="56"
            viewBox="0 0 144 56"
            fill="none"
            animate={{
              x: '-50%',
              y: processHovered ? 0 : 16,
              rotate: processHovered ? 0 : -14
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
            <path d="M 18 34 C 48 14, 96 8, 126 15" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
            <circle cx="130" cy="15" r="3.5" stroke="#0ea5e9" strokeWidth="2" fill="#ffffff" />
          </motion.svg>

          {/* SVG Connector 2 */}
          <motion.svg
            width="152"
            height="76"
            viewBox="0 0 152 76"
            fill="none"
            animate={{
              x: '-50%',
              y: processHovered ? 0 : 28,
              rotate: processHovered ? 0 : 28
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            style={{
              position: 'absolute',
              bottom: '22px',
              left: '67%',
              zIndex: 15,
              pointerEvents: 'none'
            }}
            className="desktop-connector"
          >
            <circle cx="14" cy="34" r="3.5" stroke="#0ea5e9" strokeWidth="2" fill="#ffffff" />
            <path d="M 18 34 C 40 34, 58 22, 70 8 C 76 2, 82 6, 78 22 C 70 42, 62 62, 78 64 C 94 66, 122 54, 134 46" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
            <circle cx="138" cy="46" r="3.5" stroke="#0ea5e9" strokeWidth="2" fill="#ffffff" />
          </motion.svg>

          {/* Card 01: Discover */}
          <motion.div
            className="process-card"
            animate={{
              rotate: isMobile ? 0 : (processHovered ? 0 : -5),
              y: isMobile ? 0 : (processHovered ? (hoveredProcessCard === 1 ? -8 : 0) : 12),
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
            <span style={{ fontSize: '2.8rem', fontWeight: 300, color: '#0f172a', lineHeight: 1 }}>01</span>
            <div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.65rem' }}>Discover & Scope</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.55, margin: 0 }}>
                In-depth user research, stakeholder requirement analysis, accessibility audits, and technical scoping to establish high-impact objectives.
              </p>
            </div>
          </motion.div>

          {/* Card 02: Design */}
          <motion.div
            className="process-card"
            animate={{
              rotate: isMobile ? 0 : (processHovered ? 0 : 2.5),
              y: isMobile ? 0 : (processHovered ? (hoveredProcessCard === 2 ? -8 : 0) : -26),
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
            <span style={{ fontSize: '2.8rem', fontWeight: 300, color: '#0f172a', lineHeight: 1 }}>02</span>
            <div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.65rem' }}>Design & Prototype</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.55, margin: 0 }}>
                Architecting modular Figma design systems, interactive prototypes, and human-centered user flows validated against real use cases.
              </p>
            </div>
          </motion.div>

          {/* Card 03: Deliver */}
          <motion.div
            className="process-card"
            animate={{
              rotate: isMobile ? 0 : (processHovered ? 0 : -2.5),
              y: isMobile ? 0 : (processHovered ? (hoveredProcessCard === 3 ? -8 : 0) : 28),
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
            <span style={{ fontSize: '2.8rem', fontWeight: 300, color: '#0f172a', lineHeight: 1 }}>03</span>
            <div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.65rem' }}>Engineer & Deploy</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.55, margin: 0 }}>
                Clean, production-ready codebases (Next.js, TypeScript, Laravel), database architecture, automated testing, and scalable deployment.
              </p>
            </div>
          </motion.div>
        </div>

        
      </section>

            {/* =========================================================================
         7. ABOUT & CAREER TIMELINE (Full-Stage Interactive Experience Orbit)
         ========================================================================= */}
      <section id="experience" style={{
        padding: '5rem 1.5rem',
        maxWidth: '1380px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="editorial-kicker">
            / Career & Trajectory /
          </span>
          <h2 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            fontWeight: 500,
            letterSpacing: '-0.025em',
            margin: '0 0 0.85rem 0',
            color: '#0f172a'
          }}>
            Pushing Boundaries <span style={{ fontWeight: 300, color: '#94a3b8' }}>since 2021</span>
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#64748b',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Interactive Career Orbit · Click any organization satellite or swipe across the trajectory to inspect roles, milestones, and technological impact.
          </p>
        </div>

        {(() => {
          const compMetaMap: Record<string, { icon: React.ReactNode; bg: string; color: string; short: string; tags: string[] }> = {
            'exp-pal': { 
              icon: <Anchor size={22} strokeWidth={2.2} />, 
              bg: 'linear-gradient(135deg, rgba(2, 132, 199, 0.12) 0%, rgba(56, 189, 248, 0.06) 100%)', 
              color: '#0284c7', 
              short: 'PT PAL Indonesia', 
              tags: ['HRIS Architecture', 'Next.js', 'Enterprise Workflows', 'Relational DB'] 
            },
            'exp-mandala-strat': { 
              icon: <HeartHandshake size={22} strokeWidth={2.2} />, 
              bg: 'linear-gradient(135deg, rgba(225, 29, 72, 0.12) 0%, rgba(251, 113, 133, 0.06) 100%)', 
              color: '#e11d48', 
              short: 'Mandala Pure Love', 
              tags: ['Inclusive Strategy', 'Kafe Among Rasa', 'Sociopreneurship', 'Creative Direction'] 
            },
            'exp-mandala-dev': { 
              icon: <Sprout size={22} strokeWidth={2.2} />, 
              bg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(52, 211, 153, 0.06) 100%)', 
              color: '#059669', 
              short: 'BrewTech (Innovillage)', 
              tags: ['BrewTech', 'Next.js', 'TypeScript', 'Innovillage Top 180'] 
            },
            'exp-nzbox': { 
              icon: <Shirt size={22} strokeWidth={2.2} />, 
              bg: 'linear-gradient(135deg, rgba(147, 51, 234, 0.12) 0%, rgba(192, 132, 252, 0.06) 100%)', 
              color: '#9333ea', 
              short: 'NZ Box Smart Laundry', 
              tags: ['Campaign Strategy', 'Performance Ads', 'Brand Marketing', 'Growth'] 
            },
            'exp-seal': { 
              icon: <Zap size={22} strokeWidth={2.2} />, 
              bg: 'linear-gradient(135deg, rgba(217, 119, 6, 0.12) 0%, rgba(251, 191, 36, 0.06) 100%)', 
              color: '#d97706', 
              short: 'SEAL Accelerator', 
              tags: ['Disnakertrans Jatim', 'ProFile+ HRIS', 'Figma', 'Design Systems'] 
            },
            'exp-hmti-chair': { 
              icon: <GraduationCap size={22} strokeWidth={2.2} />, 
              bg: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(96, 165, 250, 0.06) 100%)', 
              color: '#2563eb', 
              short: 'HMTI Polinema', 
              tags: ['Executive Leadership', '30+ Agendas', 'Inter-Campus Collaboration'] 
            }
          };

          const activeExpId = selectedExpId || experiencesList[0]?.id || 'exp-pal';
          const activeExp = experiencesList.find((e: any) => e.id === activeExpId) || experiencesList[0];
          const activeMeta = compMetaMap[activeExp.id] || { icon: <Briefcase size={22} strokeWidth={2.2} />, bg: '#f1f5f9', color: '#0f172a', short: activeExp.company, tags: ['Fullstack', 'UI/UX'] };

          const orbitExperiences = experiencesList.slice(0, 6);

          const orbitImagesData = orbitExperiences.map((exp: any) => {
            const meta = compMetaMap[exp.id] || { icon: '✦', bg: '#f1f5f9', color: '#0f172a', short: exp.company, tags: [] };
            const isSelected = exp.id === activeExpId;
            const periodStr = (exp.period || exp.start_date || '');
            const isCurrent = periodStr.toLowerCase().includes('present');
            const displayPeriod = periodStr.includes('—') 
              ? periodStr.split('—').map((s: string) => s.trim()).join(' – ') 
              : periodStr;

            return {
              src: '',
              alt: exp.company,
              node: (
                <div 
                  className="orbit-card-glass"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '24px',
                    background: isSelected 
                      ? 'linear-gradient(145deg, #0f172a 0%, #1e293b 85%, #0284c7 180%)' 
                      : 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: isSelected 
                      ? '2px solid #38bdf8' 
                      : '1.5px solid rgba(226, 232, 240, 0.85)',
                    boxShadow: isSelected 
                      ? '0 20px 40px -10px rgba(2, 132, 199, 0.42), 0 0 28px rgba(56, 189, 248, 0.28)' 
                      : '0 12px 30px -8px rgba(15, 23, 42, 0.08), 0 2px 8px rgba(0, 0, 0, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.05rem 0.85rem 0.9rem 0.85rem',
                    color: isSelected ? '#ffffff' : '#0f172a',
                    textAlign: 'center',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    cursor: 'pointer',
                    userSelect: 'none',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Subtle Top Specular Sheen */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '35%',
                    background: isSelected 
                      ? 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 100%)' 
                      : 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%)',
                    pointerEvents: 'none',
                    borderRadius: '24px 24px 0 0'
                  }} />

                  {/* Clean Vector SVG Brand Badge */}
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: isSelected ? 'rgba(255,255,255,0.12)' : meta.bg,
                    color: isSelected ? '#38bdf8' : meta.color,
                    border: isSelected ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(226, 232, 240, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isSelected 
                      ? '0 6px 18px rgba(0,0,0,0.25)' 
                      : '0 2px 8px rgba(0,0,0,0.03)',
                    flexShrink: 0,
                    position: 'relative',
                    zIndex: 2
                  }}>
                    {meta.icon}
                  </div>

                  {/* Company & Role Headline */}
                  <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
                    <span style={{
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      lineHeight: 1.25,
                      letterSpacing: '-0.015em',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      color: isSelected ? '#ffffff' : '#0f172a'
                    }}>
                      {meta.short}
                    </span>
                  </div>

                  {/* Period or Current Status Pill Badge */}
                  <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
                    {isCurrent ? (
                      <span style={{
                        fontSize: '0.66rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.55rem',
                        borderRadius: '9999px',
                        background: isSelected ? 'rgba(34, 197, 94, 0.22)' : '#dcfce7',
                        color: isSelected ? '#4ade80' : '#15803d',
                        border: isSelected ? '1px solid rgba(74, 222, 128, 0.4)' : '1px solid rgba(34, 197, 94, 0.25)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.28rem',
                        lineHeight: 1
                      }}>
                        <span style={{
                          width: '5px',
                          height: '5px',
                          borderRadius: '50%',
                          background: isSelected ? '#4ade80' : '#16a34a',
                          boxShadow: '0 0 6px rgba(34, 197, 94, 0.6)'
                        }} />
                        Current
                      </span>
                    ) : (
                      <span style={{
                        fontSize: '0.68rem',
                        fontWeight: 600,
                        color: isSelected ? '#93c5fd' : '#64748b',
                        padding: '0.15rem 0.45rem',
                        borderRadius: '6px',
                        background: isSelected ? 'rgba(255,255,255,0.08)' : '#f8fafc',
                        border: isSelected ? '1px solid rgba(255,255,255,0.1)' : '1px solid #f1f5f9',
                        display: 'inline-block',
                        lineHeight: 1.2
                      }}>
                        {displayPeriod}
                      </span>
                    )}
                  </div>
                </div>
              )
            };
          });

          return (
            <div>
              {/* Full-width Orbit Images Interactive Stage */}
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '1180px',
                margin: '0 auto',
                minHeight: '380px'
              }}>
                <OrbitImages
                  images={orbitImagesData}
                  shape="ellipse"
                  radiusX={560}
                  radiusY={135}
                  rotation={-4}
                  duration={38}
                  itemSize={142}
                  itemRadius={24}
                  depth={0.7}
                  showPath={true}
                  pathColor="rgba(2, 132, 199, 0.22)"
                  pathWidth={2}
                  pathDash={6}
                  hoverSpeed={0.15}
                  clickToFront={true}
                  onItemClick={(idx) => {
                    const selected = orbitExperiences[idx];
                    if (selected) {
                      setSelectedExpId(selected.id);
                    }
                  }}
                  centerContent={
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      pointerEvents: 'auto'
                    }}>
                      <div style={{
                        width: '136px',
                        height: '136px',
                        borderRadius: '50%',
                        padding: '4px',
                        background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 50%, #fde68a 100%)',
                        boxShadow: '0 16px 36px -8px rgba(2, 132, 199, 0.35)',
                        position: 'relative',
                        marginBottom: '0.75rem'
                      }}>
                        <div style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          overflow: 'hidden',
                          background: '#0f172a',
                          position: 'relative'
                        }}>
                          <img 
                            src={isRealPhoto ? '/profilephoto.jpg' : '/himmel_card.jpg'} 
                            alt={name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: isRealPhoto ? 'center 20%' : 'center 15%'
                            }}
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsRealPhoto(prev => !prev);
                            }}
                            title="Toggle Himmel / Real Avatar"
                            style={{
                              position: 'absolute',
                              bottom: '4px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              background: 'rgba(15, 23, 42, 0.88)',
                              backdropFilter: 'blur(6px)',
                              border: '1px solid rgba(255,255,255,0.3)',
                              borderRadius: '9999px',
                              padding: '0.15rem 0.5rem',
                              color: '#ffffff',
                              fontSize: '0.62rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            <Sparkles size={10} color="#38bdf8" />
                            <span>{isRealPhoto ? 'Himmel' : 'Real'}</span>
                          </button>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>
                        {name}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: '#0284c7', fontWeight: 600 }}>
                        Trajectory Nexus
                      </span>
                    </div>
                  }
                />
              </div>

              {/* Inspected Experience Milestone Showcase Card */}
              {activeExp && (
                <motion.div
                  key={activeExp.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    maxWidth: '860px',
                    margin: '2.5rem auto 0 auto',
                    background: '#ffffff',
                    border: '1.5px solid #0284c7',
                    borderRadius: '26px',
                    padding: '2.25rem 2.5rem',
                    boxShadow: '0 20px 50px -15px rgba(2, 132, 199, 0.18), 0 4px 16px rgba(15, 23, 42, 0.04)',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '1.5rem',
                    flexWrap: 'wrap',
                    marginBottom: '1.25rem',
                    paddingBottom: '1.25rem',
                    borderBottom: '1px solid #f1f5f9'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '260px' }}>
                      <div style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '16px',
                        background: activeMeta.bg,
                        color: activeMeta.color,
                        border: '1px solid rgba(226, 232, 240, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.04)'
                      }}>
                        {activeMeta.icon}
                      </div>
                      <div>
                        <span style={{
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: '#0284c7',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          display: 'block'
                        }}>
                          {activeExp.company}
                        </span>
                        <h3 style={{
                          fontSize: '1.45rem',
                          fontWeight: 800,
                          color: '#0f172a',
                          margin: '0.15rem 0 0 0',
                          letterSpacing: '-0.02em'
                        }}>
                          {activeExp.role}
                        </h3>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      {((activeExp.period || activeExp.start_date || '').toLowerCase().includes('present')) && (
                        <span style={{
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          color: '#15803d',
                          background: '#dcfce7',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '9999px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          border: '1px solid rgba(22, 163, 74, 0.25)'
                        }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a', boxShadow: '0 0 6px #16a34a' }} />
                          Current Role
                        </span>
                      )}
                      <div style={{
                        padding: '0.45rem 1rem',
                        borderRadius: '9999px',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        color: '#334155',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem'
                      }}>
                        <Calendar size={14} color="#64748b" />
                        <span>{(activeExp.period || activeExp.start_date || '').replace('—', '–')}</span>
                      </div>
                    </div>
                  </div>

                  <p style={{
                    fontSize: '1.02rem',
                    color: '#334155',
                    lineHeight: 1.72,
                    margin: '0 0 1.5rem 0',
                    fontWeight: 400
                  }}>
                    {activeExp.description}
                  </p>

                  {/* Skills / Key Focus Highlights */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '0.55rem'
                  }}>
                    <span style={{
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginRight: '0.25rem'
                    }}>
                      Key Focus:
                    </span>
                    {activeMeta.tags.map((tag: string, tIdx: number) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          padding: '0.3rem 0.75rem',
                          borderRadius: '9999px',
                          background: '#f0f9ff',
                          color: '#0284c7',
                          border: '1px solid #bae6fd'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          );
        })()}
      </section>

      {/* =========================================================================
         9. CREDENTIALS, EDUCATION & AWARDS (Interactive Academic Journey & Trophy Cabinet)
         ========================================================================= */}
      <section id="credentials" style={{
        padding: '5rem 0 3rem 0',
        width: '100%',
        margin: '0 auto',
        overflow: 'hidden'
      }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3.5rem',
          maxWidth: '1240px',
          margin: '0 auto 3.5rem auto',
          padding: '0 1.5rem'
        }}>
          <span className="editorial-kicker">
            / Academic Foundations /
          </span>
          <h2 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            fontWeight: 500,
            letterSpacing: '-0.025em',
            margin: 0,
            color: '#0f172a'
          }}>
            Education
          </h2>
          <p style={{
            color: '#64748b',
            fontSize: '1rem',
            margin: '0.65rem 0 0 0',
            fontWeight: 400
          }}>
            Formal academic background, institutional milestones, and core engineering competencies.
          </p>
        </div>

        {/* 1. Academic Journey (Interactive 3D FlipCards) */}
        <div style={{
          maxWidth: '860px',
          margin: '0 auto 4.5rem auto',
          padding: '0 1.5rem'
        }}>
          {/* Interactive Flip Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: '2.5rem',
            justifyItems: 'center',
            alignItems: 'stretch'
          }}>
            {/* Card 1: Politeknik Negeri Malang (Academic Pass) */}
            <FlipCard
              width="100%"
              height={460}
              radius={28}
              perspective={1200}
              background="transparent"
              color="#0f172a"
              shadowColor="#0284c7"
              shadowOpacity={0.16}
              glareOpacity={0.24}
              tiltMax={10}
              front={
                <div style={{
                  height: '100%',
                  borderRadius: '28px',
                  background: 'linear-gradient(150deg, #091326 0%, #0f172a 55%, #071938 100%)',
                  border: '1.5px solid rgba(56, 189, 248, 0.28)',
                  padding: '2.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  color: '#ffffff',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px -12px rgba(2, 132, 199, 0.22)'
                }}>
                  {/* Subtle Background Glow & Radial Watermark */}
                  <div style={{
                    position: 'absolute',
                    top: '-30%',
                    right: '-20%',
                    width: '260px',
                    height: '260px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, rgba(56, 189, 248, 0) 70%)',
                    pointerEvents: 'none'
                  }} />

                  {/* Watermark Monogram */}
                  <span style={{
                    position: 'absolute',
                    bottom: '-15px',
                    right: '10px',
                    fontSize: '6.5rem',
                    fontWeight: 900,
                    color: 'rgba(255, 255, 255, 0.03)',
                    letterSpacing: '-0.05em',
                    lineHeight: 1,
                    userSelect: 'none',
                    pointerEvents: 'none'
                  }}>
                    POLINEMA
                  </span>

                  {/* Top Bar: Holographic Header & Status Badge */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '12px',
                          background: 'rgba(56, 189, 248, 0.14)',
                          border: '1px solid rgba(56, 189, 248, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#38bdf8'
                        }}>
                          <GraduationCap size={20} strokeWidth={2.2} />
                        </div>
                        <div>
                          <span style={{
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: '#38bdf8',
                            display: 'block'
                          }}>
                            Undergraduate Pass
                          </span>
                          <span style={{ fontSize: '0.62rem', color: '#94a3b8', letterSpacing: '0.04em' }}>
                            REG NO. 22417600
                          </span>
                        </div>
                      </div>

                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#4ade80',
                        background: 'rgba(34, 197, 94, 0.14)',
                        border: '1px solid rgba(74, 222, 128, 0.3)',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
                        2022 – 2026
                      </span>
                    </div>

                    {/* Institution Title & Major */}
                    <h3 style={{
                      fontSize: '1.45rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      margin: '0 0 0.35rem 0',
                      letterSpacing: '-0.02em'
                    }}>
                      Politeknik Negeri Malang
                    </h3>
                    <div style={{
                      fontSize: '0.96rem',
                      color: '#38bdf8',
                      fontWeight: 600,
                      lineHeight: 1.45,
                      marginBottom: '1rem'
                    }}>
                      D4 Sistem Informasi Bisnis (Business Information Systems)
                    </div>

                    <p style={{
                      fontSize: '0.86rem',
                      color: '#94a3b8',
                      lineHeight: 1.62,
                      margin: 0,
                      fontWeight: 400
                    }}>
                      Specialized in Software Engineering, Enterprise Database Systems, Business Process Modeling, and Web Application Architecture.
                    </p>
                  </div>

                  {/* Bottom Footer: Minimalist Interactive Hint */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1.1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    marginTop: '1.25rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#64748b', fontSize: '0.76rem', fontWeight: 600 }}>
                      <RotateCw size={13} color="#38bdf8" />
                      <span>Click or drag to flip</span>
                    </div>
                    <span style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: '#38bdf8',
                      background: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid rgba(56, 189, 248, 0.25)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px'
                    }}>
                      View Core Modules
                    </span>
                  </div>
                </div>
              }
              back={
                <div style={{
                  height: '100%',
                  borderRadius: '28px',
                  background: 'linear-gradient(150deg, #091326 0%, #0f172a 60%, #03142e 100%)',
                  border: '1.5px solid rgba(56, 189, 248, 0.35)',
                  padding: '2.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  color: '#ffffff',
                  boxShadow: '0 25px 50px -12px rgba(2, 132, 199, 0.25)'
                }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.15rem' }}>
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        color: '#38bdf8',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em'
                      }}>
                        Curriculum & Competencies
                      </span>
                      <span style={{
                        fontSize: '0.7rem',
                        color: '#94a3b8',
                        background: 'rgba(255,255,255,0.06)',
                        padding: '0.15rem 0.55rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(255,255,255,0.08)'
                      }}>
                        GPA: High Standing
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.65rem 0', letterSpacing: '-0.02em' }}>
                      Core Technical Modules
                    </h4>
                    <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.55, margin: '0 0 1.25rem 0' }}>
                      Deep-dive curriculum covering enterprise application lifecycles, database normalization, and modern microservice paradigms.
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                      {[
                        'Enterprise Database Systems',
                        'Web Architecture & API',
                        'Business Process (BPMN)',
                        'Fullstack Development',
                        'Systems Analysis',
                        'PostgreSQL & Supabase'
                      ].map((mod, mIdx) => (
                        <span 
                          key={mIdx}
                          style={{
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            padding: '0.35rem 0.75rem',
                            borderRadius: '9999px',
                            background: 'rgba(56, 189, 248, 0.08)',
                            color: '#e0f2fe',
                            border: '1px solid rgba(56, 189, 248, 0.2)',
                            backdropFilter: 'blur(8px)'
                          }}
                        >
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1.1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                  }}>
                    <span style={{ fontSize: '0.76rem', color: '#64748b' }}>
                      Polinema (2022 – 2026)
                    </span>
                    <span style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: '#38bdf8'
                    }}>
                      Flip Back ↺
                    </span>
                  </div>
                </div>
              }
            />

            {/* Card 2: SMA Negeri 1 Malang (Academic Pass) */}
            <FlipCard
              width="100%"
              height={460}
              radius={28}
              perspective={1200}
              background="transparent"
              color="#0f172a"
              shadowColor="#059669"
              shadowOpacity={0.16}
              glareOpacity={0.24}
              tiltMax={10}
              front={
                <div style={{
                  height: '100%',
                  borderRadius: '28px',
                  background: 'linear-gradient(150deg, #061f18 0%, #0f172a 55%, #05261d 100%)',
                  border: '1.5px solid rgba(52, 211, 153, 0.28)',
                  padding: '2.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  color: '#ffffff',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px -12px rgba(5, 150, 105, 0.22)'
                }}>
                  {/* Subtle Background Glow & Radial Watermark */}
                  <div style={{
                    position: 'absolute',
                    top: '-30%',
                    right: '-20%',
                    width: '260px',
                    height: '260px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(52, 211, 153, 0.18) 0%, rgba(52, 211, 153, 0) 70%)',
                    pointerEvents: 'none'
                  }} />

                  {/* Watermark Monogram */}
                  <span style={{
                    position: 'absolute',
                    bottom: '-15px',
                    right: '10px',
                    fontSize: '6.5rem',
                    fontWeight: 900,
                    color: 'rgba(255, 255, 255, 0.03)',
                    letterSpacing: '-0.05em',
                    lineHeight: 1,
                    userSelect: 'none',
                    pointerEvents: 'none'
                  }}>
                    MITREKA
                  </span>

                  {/* Top Bar: Holographic Header & Status Badge */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '12px',
                          background: 'rgba(52, 211, 153, 0.14)',
                          border: '1px solid rgba(52, 211, 153, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#34d399'
                        }}>
                          <Landmark size={20} strokeWidth={2.2} />
                        </div>
                        <div>
                          <span style={{
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: '#34d399',
                            display: 'block'
                          }}>
                            Secondary Education Pass
                          </span>
                          <span style={{ fontSize: '0.62rem', color: '#94a3b8', letterSpacing: '0.04em' }}>
                            MITREKA SATATA
                          </span>
                        </div>
                      </div>

                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#94a3b8',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}>
                        2019 – 2022
                      </span>
                    </div>

                    {/* Institution Title & Major */}
                    <h3 style={{
                      fontSize: '1.45rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      margin: '0 0 0.35rem 0',
                      letterSpacing: '-0.02em'
                    }}>
                      SMA Negeri 1 Malang
                    </h3>
                    <div style={{
                      fontSize: '0.96rem',
                      color: '#34d399',
                      fontWeight: 600,
                      lineHeight: 1.45,
                      marginBottom: '1rem'
                    }}>
                      Mathematics & Natural Science (MIPA)
                    </div>

                    <p style={{
                      fontSize: '0.86rem',
                      color: '#94a3b8',
                      lineHeight: 1.62,
                      margin: 0,
                      fontWeight: 400
                    }}>
                      Rigorous foundation in mathematics, analytical problem solving, and science curriculum at one of East Java's top academic high schools.
                    </p>
                  </div>

                  {/* Bottom Footer: Minimalist Interactive Hint */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1.1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    marginTop: '1.25rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#64748b', fontSize: '0.76rem', fontWeight: 600 }}>
                      <RotateCw size={13} color="#34d399" />
                      <span>Click or drag to flip</span>
                    </div>
                    <span style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: '#34d399',
                      background: 'rgba(52, 211, 153, 0.1)',
                      border: '1px solid rgba(52, 211, 153, 0.25)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px'
                    }}>
                      View Foundation Areas
                    </span>
                  </div>
                </div>
              }
              back={
                <div style={{
                  height: '100%',
                  borderRadius: '28px',
                  background: 'linear-gradient(150deg, #061f18 0%, #0f172a 60%, #031c15 100%)',
                  border: '1.5px solid rgba(52, 211, 153, 0.35)',
                  padding: '2.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  color: '#ffffff',
                  boxShadow: '0 25px 50px -12px rgba(5, 150, 105, 0.25)'
                }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.15rem' }}>
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        color: '#34d399',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em'
                      }}>
                        Academic Base
                      </span>
                      <span style={{
                        fontSize: '0.7rem',
                        color: '#94a3b8',
                        background: 'rgba(255,255,255,0.06)',
                        padding: '0.15rem 0.55rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(255,255,255,0.08)'
                      }}>
                        Distinction Cohort
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.65rem 0', letterSpacing: '-0.02em' }}>
                      Foundation Areas
                    </h4>
                    <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.55, margin: '0 0 1.25rem 0' }}>
                      Early development of rigorous analytical thinking, competitive parliamentary debating, and computational mathematics.
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                      {[
                        'Analytical Logic',
                        'Mathematical Modeling',
                        'Scientific Research',
                        'Public Speaking',
                        'English Debate'
                      ].map((mod, mIdx) => (
                        <span 
                          key={mIdx}
                          style={{
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            padding: '0.35rem 0.75rem',
                            borderRadius: '9999px',
                            background: 'rgba(52, 211, 153, 0.08)',
                            color: '#d1fae5',
                            border: '1px solid rgba(52, 211, 153, 0.2)',
                            backdropFilter: 'blur(8px)'
                          }}
                        >
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1.1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                  }}>
                    <span style={{ fontSize: '0.76rem', color: '#64748b' }}>
                      SMAN 1 Malang (2019 – 2022)
                    </span>
                    <span style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: '#34d399'
                    }}>
                      Flip Back ↺
                    </span>
                  </div>
                </div>
              }
            />
          </div>
        </div>

        {/* 2. Honors & Awards: Full-Width Seamless 3D Circular Carousel (No Card Enclosure) */}
        <div style={{
          width: '100%',
          position: 'relative'
        }}>
          {/* Header & Subtitle */}
          <div style={{
            textAlign: 'center',
            maxWidth: '1240px',
            margin: '0 auto 0.75rem auto',
            padding: '0 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <span className="editorial-kicker" style={{ marginBottom: '0.4rem', fontSize: '1.05rem' }}>
              / Honors & Accolades /
            </span>

            <h3 style={{
              fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)',
              fontWeight: 400,
              letterSpacing: '-0.025em',
              margin: '0 0 0.35rem 0',
              color: '#0f172a',
              lineHeight: 1.15
            }}>
              Competitive Trophies <span style={{ fontWeight: 300, color: '#94a3b8' }}>& Grants</span>
            </h3>
            <p style={{
              fontSize: 'clamp(0.92rem, 1.6vw, 1.05rem)',
              color: '#64748b',
              margin: 0,
              maxWidth: '580px',
              lineHeight: 1.5
            }}>
              Recognitions across national and international competitions, social grants, and leadership initiatives.
            </p>
          </div>

          {/* Full-Width Interactive 3D Circular Carousel Ring */}
          <div style={{
            width: '100vw',
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            height: '490px',
            overflow: 'hidden'
          }}>
            <CircularCarousel
              className="circular-carousel-showcase"
              items={[
                {
                  src: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=900&q=80&auto=format&fit=crop',
                  alt: 'Mandala Pure Love Most Inspiring Community Empowerment',
                  title: '🏆 "Mandala Pure Love" Initiative',
                  subtitle: 'Djarum Beasiswa Plus (2026) • National Winner'
                },
                {
                  src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80&auto=format&fit=crop',
                  alt: 'Innovillage Top 180 for Brewtech',
                  title: '🚀 Top 180 for Brewtech',
                  subtitle: 'Telkom Indonesia / Innovillage (2026) • Social Venture Grant'
                },
                {
                  src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&q=80&auto=format&fit=crop',
                  alt: '2nd Runner Up - IT Poly Debate Cup',
                  title: '🎙️ 2nd Runner Up - Debate Cup',
                  subtitle: 'IT Debate Society (2024) • National Parliamentary Debate'
                },
                {
                  src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=900&q=80&auto=format&fit=crop',
                  alt: 'Finalis Desain Poster Infografis 4C',
                  title: '🎨 Finalis Desain Infografis 4C',
                  subtitle: 'Universitas Brawijaya (2024) • National Design Contest'
                },
                {
                  src: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=900&q=80&auto=format&fit=crop',
                  alt: '2nd Best Novice Team - International Debate',
                  title: '🌏 2nd Best Novice Team',
                  subtitle: 'PPI Taiwan Open Debate (2023) • International Competition'
                }
              ]}
              preset="cylinder"
              intro="rise"
              scaleMode="fill"
              curve={0}
              cardWidth={390}
              aspectRatio={1.42}
              spread={1.45}
              speed={10}
              gap={36}
              autoplay="drift"
              fadeColor="#ffffff"
              innerShade={0.16}
              depthFade={0.28}
              cornerRadius={18}
              captions={true}
            />
          </div>
        </div>
      </section>
      {/* =========================================================================
         10. MEDIUM ARTICLES (Integrated from previous website)
         ========================================================================= */}
      <section id="articles" style={{
        padding: '5rem 1.5rem',
        maxWidth: '1240px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="editorial-kicker">
            / Writings & Thoughts /
          </span>
          <h2 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            fontWeight: 400,
            letterSpacing: '-0.025em',
            margin: 0,
            color: '#0f172a'
          }}>
            Articles & Publications
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            color: '#64748b',
            maxWidth: '600px',
            margin: '0.75rem auto 0 auto',
            lineHeight: 1.6
          }}>
            Essays and reflections on technology, governance, human connection, and personal growth.
          </p>
        </div>

        <MediumArticles username={mediumUsername} title="Articles & Publications" />
      </section>

      {/* =========================================================================
         11. CTA BANNER WITH 3D WAVES
         ========================================================================= */}
      <section className="cta-banner-wrapper" style={{
        padding: '3rem 1.5rem',
        maxWidth: '1380px',
        margin: '0 auto'
      }}>
        <div className="cta-banner-box" style={{
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
            <h2 className="cta-headline" style={{
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
              Always open for new software engineering challenges, UI/UX collaborations, and impactful digital products. Let's work together to bring your ideas to life.
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
         12. FOOTER NAVIGATION & GIANT WATERMARK NAME
         ========================================================================= */}
      <footer style={{
        padding: '2.5rem 1.5rem 0 1.5rem',
        maxWidth: '1380px',
        margin: '0 auto',
        overflow: 'hidden'
      }}>
        <div className="footer-nav-row" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid #f1f5f9'
        }}>
          <div className="footer-links-wrap" style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/" style={{ color: '#0f172a', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>Home</Link>
            <a href="#works" style={{ color: '#64748b', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>Works</a>
            <a href="#about" style={{ color: '#64748b', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>About</a>
            <a href="#process" style={{ color: '#64748b', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>Process</a>
            <a href="#experience" style={{ color: '#64748b', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>Experience</a>
            <a href="#credentials" style={{ color: '#64748b', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>Education</a>
            <a href={`mailto:${email}`} style={{ color: '#64748b', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>Contact</a>
          </div>

          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            © {new Date().getFullYear()} {name}. All rights reserved.
          </span>
        </div>

        {/* Massive Display Watermark Name Spanning Bottom Edge */}
        <div className="footer-watermark-wrap" style={{
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
            className="editorial-serif-italic footer-watermark-text"
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

      {/* =========================================================================
         PROJECT DETAIL & MULTI-IMAGE GALLERY LIGHTBOX MODAL
         ========================================================================= */}
      <AnimatePresence>
        {selectedProject && (() => {
          const projectGallery: string[] = Array.isArray(selectedProject.gallery) && selectedProject.gallery.length > 0
            ? selectedProject.gallery
            : [selectedProject.image || selectedProject.coverImage].filter(Boolean);
          const currentImg = projectGallery[activeModalImageIndex] || projectGallery[0] || selectedProject.image || selectedProject.coverImage;
          const youtubeEmbed = getYoutubeEmbedUrl(selectedProject.videoUrl);

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(15, 23, 42, 0.82)',
                backdropFilter: 'blur(12px)',
                zIndex: 99999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem'
              }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="project-gallery-modal"
                initial={{ scale: 0.94, y: 25, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.94, y: 25, opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: '#ffffff',
                  borderRadius: '28px',
                  maxWidth: '960px',
                  width: '100%',
                  maxHeight: '92vh',
                  overflowY: 'auto',
                  position: 'relative',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
                  padding: '2.5rem'
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    background: '#f1f5f9',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0f172a',
                    zIndex: 10,
                    transition: 'all 0.2s ease'
                  }}
                  title="Close modal"
                >
                  <X size={20} />
                </button>

                {/* Top Badges */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#0284c7',
                    background: '#e0f2fe',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}>
                    {selectedProject.displayCategory || selectedProject.category || 'Project'}
                  </span>
                  {selectedProject.role && (
                    <span style={{
                      fontSize: '0.75rem',
                      background: '#f1f5f9',
                      color: '#475569',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontWeight: 600
                    }}>
                      Role: {selectedProject.role}
                    </span>
                  )}
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8', marginLeft: 'auto' }}>
                    Year: {selectedProject.year || '2025'}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h2 style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
                  fontWeight: 700,
                  color: '#0f172a',
                  margin: '0 0 0.5rem 0',
                  lineHeight: 1.25
                }}>
                  {selectedProject.title}
                </h2>
                {selectedProject.subtitle && (
                  <p style={{ fontSize: '0.95rem', color: '#0284c7', fontWeight: 600, margin: '0 0 1.5rem 0' }}>
                    {selectedProject.subtitle}
                  </p>
                )}

                {/* =======================================================
                    MEDIA VIEWER (Video Player or Multi-Image Lightbox)
                    ======================================================= */}
                {youtubeEmbed ? (
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16/9',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    marginBottom: '1.5rem',
                    background: '#000000',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.15)'
                  }}>
                    <div className={`media-skeleton-container ${!isModalMediaLoading ? 'is-hidden' : ''}`}>
                      <div className="media-skeleton-wave" />
                      <div className="media-skeleton-badge">
                        <div className="media-skeleton-icon-disc">
                          <Play size={24} style={{ marginLeft: '3px' }} />
                        </div>
                        <div className="media-skeleton-label">
                          Loading Video Player...
                        </div>
                        <div className="media-skeleton-bar-wrap">
                          <div className="media-skeleton-bar-fill" />
                        </div>
                      </div>
                    </div>
                    <iframe
                      key={`modal-yt-${selectedProject.id || selectedProject.slug}`}
                      src={youtubeEmbed}
                      title={selectedProject.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      onLoad={() => setIsModalMediaLoading(false)}
                      style={{ width: '100%', height: '100%', border: 'none' }}
                    />
                  </div>
                ) : projectGallery.length > 0 ? (
                  <div style={{ marginBottom: '1.75rem' }}>
                    {/* Main High-Res Image Viewport */}
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      height: 'clamp(300px, 45vh, 480px)',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      background: '#090d16',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.12)'
                    }}>
                      <div className={`media-skeleton-container ${!isModalMediaLoading ? 'is-hidden' : ''}`}>
                        <div className="media-skeleton-wave" />
                        <div className="media-skeleton-badge">
                          <div className="media-skeleton-icon-disc">
                            <ImageIcon size={24} />
                          </div>
                          <div className="media-skeleton-label">
                            Loading Screenshot...
                          </div>
                          <div className="media-skeleton-bar-wrap">
                            <div className="media-skeleton-bar-fill" />
                          </div>
                        </div>
                      </div>
                      <img
                        key={`modal-img-${currentImg}`}
                        src={currentImg}
                        alt={`${selectedProject.title} screenshot ${activeModalImageIndex + 1}`}
                        onLoad={() => setIsModalMediaLoading(false)}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain'
                        }}
                      />

                      {/* Navigation Arrows (if > 1 image) */}
                      {projectGallery.length > 1 && (
                        <>
                          <button
                            onClick={() => setActiveModalImageIndex((prev) => (prev > 0 ? prev - 1 : projectGallery.length - 1))}
                            style={{
                              position: 'absolute',
                              left: '1rem',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'rgba(15, 23, 42, 0.75)',
                              backdropFilter: 'blur(6px)',
                              border: '1px solid rgba(255,255,255,0.2)',
                              borderRadius: '50%',
                              width: '44px',
                              height: '44px',
                              color: '#ffffff',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.2s ease'
                            }}
                            title="Previous image"
                          >
                            <ChevronLeft size={24} />
                          </button>

                          <button
                            onClick={() => setActiveModalImageIndex((prev) => (prev < projectGallery.length - 1 ? prev + 1 : 0))}
                            style={{
                              position: 'absolute',
                              right: '1rem',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'rgba(15, 23, 42, 0.75)',
                              backdropFilter: 'blur(6px)',
                              border: '1px solid rgba(255,255,255,0.2)',
                              borderRadius: '50%',
                              width: '44px',
                              height: '44px',
                              color: '#ffffff',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.2s ease'
                            }}
                            title="Next image"
                          >
                            <ChevronRight size={24} />
                          </button>

                          {/* Image Counter Badge */}
                          <div style={{
                            position: 'absolute',
                            bottom: '1rem',
                            right: '1rem',
                            background: 'rgba(15, 23, 42, 0.8)',
                            backdropFilter: 'blur(8px)',
                            color: '#ffffff',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '0.35rem 0.85rem',
                            borderRadius: '9999px',
                            border: '1px solid rgba(255,255,255,0.15)'
                          }}>
                            {activeModalImageIndex + 1} / {projectGallery.length}
                          </div>
                        </>
                      )}

                      {/* Fullscreen view link */}
                      <a
                        href={currentImg}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          position: 'absolute',
                          top: '1rem',
                          left: '1rem',
                          background: 'rgba(15, 23, 42, 0.75)',
                          backdropFilter: 'blur(8px)',
                          color: '#ffffff',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          padding: '0.35rem 0.75rem',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          textDecoration: 'none',
                          border: '1px solid rgba(255,255,255,0.15)'
                        }}
                        title="View Full Resolution"
                      >
                        <Maximize2 size={12} />
                        <span>HD View</span>
                      </a>
                    </div>

                    {/* Thumbnail Carousel Bar */}
                    {projectGallery.length > 1 && (
                      <div style={{
                        display: 'flex',
                        gap: '0.65rem',
                        overflowX: 'auto',
                        padding: '0.85rem 0.25rem 0.25rem 0.25rem',
                        scrollbarWidth: 'thin'
                      }}>
                        {projectGallery.map((img: string, idx: number) => {
                          const isActiveThumb = activeModalImageIndex === idx;
                          return (
                            <button
                              key={idx}
                              onClick={() => setActiveModalImageIndex(idx)}
                              style={{
                                flexShrink: 0,
                                width: '76px',
                                height: '54px',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                border: isActiveThumb ? '2.5px solid #0284c7' : '1.5px solid #e2e8f0',
                                opacity: isActiveThumb ? 1 : 0.55,
                                transform: isActiveThumb ? 'scale(1.05)' : 'none',
                                transition: 'all 0.2s ease',
                                cursor: 'pointer',
                                padding: 0,
                                background: '#0f172a'
                              }}
                            >
                              <img
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : null}

                {/* Description */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.86rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.5rem 0' }}>
                    Project Overview
                  </h4>
                  <p style={{ fontSize: '1.02rem', color: '#1e293b', lineHeight: 1.7, margin: 0, fontWeight: 400 }}>
                    {selectedProject.description || selectedProject.desc || selectedProject.subtitle}
                  </p>
                </div>

                {/* Key Outcome & Social Impact */}
                {selectedProject.outcome && (
                  <div style={{
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    padding: '1.25rem 1.35rem',
                    borderRadius: '16px',
                    marginBottom: '1.5rem'
                  }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
                      <CheckCircle2 size={18} />
                      Key Outcome & Social Impact
                    </span>
                    <p style={{ fontSize: '0.96rem', color: '#15803d', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                      {selectedProject.outcome}
                    </p>
                  </div>
                )}

                {/* Stack & Architecture */}
                {selectedProject.stack && (
                  <div style={{ marginBottom: '2rem' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.6rem' }}>
                      Technology Stack & Architecture
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                      {selectedProject.stack.split('·').map((tech: string, i: number) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '0.86rem',
                            fontFamily: 'monospace',
                            color: '#0f172a',
                            background: '#f8fafc',
                            border: '1px solid #cbd5e1',
                            padding: '0.4rem 0.85rem',
                            borderRadius: '8px',
                            fontWeight: 700
                          }}
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons Row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid #f1f5f9',
                  flexWrap: 'wrap'
                }}>
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.55rem',
                        padding: '0.85rem 1.65rem',
                        borderRadius: '9999px',
                        background: '#0284c7',
                        color: '#ffffff',
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        boxShadow: '0 4px 14px rgba(2, 132, 199, 0.25)'
                      }}
                    >
                      <ExternalLink size={17} />
                      <span>Visit Live Website</span>
                    </a>
                  )}

                  {selectedProject.videoUrl && (
                    <a
                      href={selectedProject.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.55rem',
                        padding: '0.85rem 1.65rem',
                        borderRadius: '9999px',
                        background: '#ef4444',
                        color: '#ffffff',
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        boxShadow: '0 4px 14px rgba(239, 68, 68, 0.25)'
                      }}
                    >
                      <Play size={17} fill="#ffffff" />
                      <span>Watch on YouTube</span>
                    </a>
                  )}

                  <a
                    href={`https://wa.me/${whatsapp}?text=Hi%20Hilman,%20I'm%20interested%20in%20discussing%20${encodeURIComponent(selectedProject.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.55rem',
                      padding: '0.85rem 1.65rem',
                      borderRadius: '9999px',
                      background: '#0f172a',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}
                  >
                    <MessageCircle size={17} />
                    <span>Discuss on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setSelectedProject(null)}
                    style={{
                      marginLeft: 'auto',
                      padding: '0.85rem 1.4rem',
                      borderRadius: '9999px',
                      background: '#f8fafc',
                      color: '#475569',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
