'use client';

import { client, urlFor } from "@/sanity/client";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent, animate, useInView, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { CheckCircle, Briefcase, Clock, Star, Terminal, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";
import MediumArticles from "@/components/MediumArticles";
import DesignSection from "@/components/DesignSection";
import Lenis from "lenis";

const CountUp = ({ to, suffix = "", duration = 2 }: { to: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  useEffect(() => {
    if (inView) {
      const controls = animate(0, to, {
        duration,
        onUpdate: (value) => setCount(Math.round(value)),
        ease: "easeOut"
      });
      return controls.stop;
    }
  }, [inView, to, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const getDynamicContainerClass = (len: number, baseClass = '') => {
  if (len > 6) return `${baseClass} dynamic-slider-container`.trim();
  if (len >= 4 && len <= 6) return `${baseClass} dynamic-grid-2-rows`.trim();
  return `${baseClass} dynamic-grid-1-row`.trim();
};

const getDynamicItemClass = (len: number, baseClass = '') => {
  return len > 6 ? `${baseClass} dynamic-slider-item`.trim() : baseClass;
};

const MiniDeco = () => (
  <motion.div 
    animate={{ rotate: 360 }}
    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', opacity: 0.6 }}
  >
    <svg viewBox="0 0 50 50" width="18" height="18" style={{ overflow: 'visible' }}>
      <motion.path
        animate={{ 
          d: [
            "M 25 5 L 45 25 L 25 45 L 5 25 Z",
            "M 25 15 L 35 25 L 25 35 L 15 25 Z",
            "M 25 5 L 30 20 L 45 25 L 30 30 L 25 45 L 20 30 L 5 25 L 20 20 Z",
            "M 25 5 L 45 25 L 25 45 L 5 25 Z"
          ],
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
      />
      <circle cx="25" cy="25" r="3" fill="var(--accent)" />
    </svg>
  </motion.div>
);

const BackgroundDecorations = () => {
  const decos = [
    { top: '5%', left: '4%', type: 'cross' },
    { top: '8%', right: '6%', type: 'dots' },
    { top: '15%', left: '85%', type: 'circle' },
    { top: '22%', left: '3%', type: 'cross' },
    { top: '28%', right: '8%', type: 'circle' },
    { top: '35%', left: '7%', type: 'dots' },
    { top: '42%', right: '5%', type: 'cross' },
    { top: '48%', left: '88%', type: 'dots' },
    { top: '55%', left: '4%', type: 'circle' },
    { top: '62%', right: '7%', type: 'cross' },
    { top: '68%', left: '82%', type: 'dots' },
    { top: '75%', left: '6%', type: 'cross' },
    { top: '82%', right: '4%', type: 'circle' },
    { top: '88%', left: '90%', type: 'dots' },
    { top: '95%', left: '5%', type: 'cross' },
    { top: '98%', right: '10%', type: 'circle' },
  ];

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {decos.map((deco, i) => (
        <motion.div
          key={i}
          style={{ position: 'absolute', top: deco.top, left: deco.left, right: deco.right, opacity: 0.15 }}
          animate={{
            y: [0, -30, 0],
            rotate: deco.type === 'cross' ? 360 : (deco.type === 'circle' ? -360 : 0)
          }}
          transition={{
            y: { duration: 10 + (i % 5), repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 },
            rotate: { duration: 30 + i * 2, repeat: Infinity, ease: 'linear' }
          }}
        >
          {deco.type === 'cross' && (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="var(--text-muted)" strokeWidth="0.5">
              <path d="M 16 0 L 16 32 M 0 16 L 32 16" />
              <circle cx="16" cy="16" r="6" />
              <circle cx="16" cy="16" r="2" fill="var(--text-muted)" />
            </svg>
          )}
          {deco.type === 'dots' && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--text-muted)">
              <circle cx="4" cy="4" r="1.5" />
              <circle cx="20" cy="4" r="1.5" />
              <circle cx="4" cy="20" r="1.5" />
              <circle cx="20" cy="20" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
            </svg>
          )}
          {deco.type === 'circle' && (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="var(--text-muted)" strokeWidth="0.5">
              <circle cx="24" cy="24" r="20" strokeDasharray="4 6" />
              <circle cx="24" cy="24" r="10" />
              <path d="M 24 14 L 24 10 M 24 34 L 24 38 M 14 24 L 10 24 M 34 24 L 38 24" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
};

const ScrollParallaxDecorations = () => {
  const { scrollYProgress } = useScroll();
  
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -540]);
  const rotate3 = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 1.1]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {/* Large Hexagon - Top Left */}
      <motion.div style={{ position: 'absolute', top: '8%', left: '2%', rotate: rotate1, y: y1, scale: scale1, opacity: 0.12 }}>
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" stroke="var(--accent)" strokeWidth="0.8">
          <path d="M 100 10 L 178 55 L 178 145 L 100 190 L 22 145 L 22 55 Z" />
          <path d="M 100 40 L 152 67.5 L 152 132.5 L 100 160 L 48 132.5 L 48 67.5 Z" />
          <path d="M 100 70 L 126 82.5 L 126 117.5 L 100 130 L 74 117.5 L 74 82.5 Z" />
          <line x1="100" y1="10" x2="100" y2="190" strokeDasharray="6 8" />
          <line x1="22" y1="55" x2="178" y2="145" strokeDasharray="6 8" />
          <line x1="22" y1="145" x2="178" y2="55" strokeDasharray="6 8" />
        </svg>
      </motion.div>

      {/* Large Triangle - Right Side */}
      <motion.div style={{ position: 'absolute', top: '30%', right: '3%', rotate: rotate2, y: y2, opacity: 0.1 }}>
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" stroke="var(--text-primary)" strokeWidth="0.6">
          <polygon points="90,10 170,160 10,160" />
          <polygon points="90,50 140,135 40,135" />
          <polygon points="90,80 115,115 65,115" />
          <circle cx="90" cy="110" r="4" fill="var(--accent)" fillOpacity="0.3" />
        </svg>
      </motion.div>

      {/* Large Grid/Square - Bottom Left */}
      <motion.div style={{ position: 'absolute', top: '55%', left: '3%', rotate: rotate3, y: y3, scale: scale2, opacity: 0.1 }}>
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none" stroke="var(--accent)" strokeWidth="0.5">
          <rect x="10" y="10" width="140" height="140" />
          <rect x="30" y="30" width="100" height="100" transform="rotate(15 80 80)" />
          <rect x="50" y="50" width="60" height="60" transform="rotate(30 80 80)" />
          <circle cx="80" cy="80" r="50" strokeDasharray="3 5" />
          <circle cx="80" cy="80" r="25" strokeDasharray="3 5" />
        </svg>
      </motion.div>

      {/* Large Diamond - Right Bottom */}
      <motion.div style={{ position: 'absolute', top: '72%', right: '4%', rotate: rotate1, y: y4, opacity: 0.12 }}>
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" stroke="var(--text-primary)" strokeWidth="0.6">
          <path d="M 75 5 L 145 75 L 75 145 L 5 75 Z" />
          <path d="M 75 30 L 120 75 L 75 120 L 30 75 Z" />
          <path d="M 75 50 L 100 75 L 75 100 L 50 75 Z" />
          <line x1="75" y1="5" x2="75" y2="145" strokeDasharray="4 6" />
          <line x1="5" y1="75" x2="145" y2="75" strokeDasharray="4 6" />
          <circle cx="75" cy="75" r="6" fill="var(--accent)" fillOpacity="0.2" />
        </svg>
      </motion.div>

      {/* Large Circle Compass - Mid Center Left */}
      <motion.div style={{ position: 'absolute', top: '45%', left: '5%', rotate: rotate2, y: y2, opacity: 0.08 }}>
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none" stroke="var(--accent)" strokeWidth="0.4">
          <circle cx="110" cy="110" r="100" strokeDasharray="8 12" />
          <circle cx="110" cy="110" r="70" />
          <circle cx="110" cy="110" r="40" strokeDasharray="4 6" />
          <line x1="110" y1="10" x2="110" y2="210" />
          <line x1="10" y1="110" x2="210" y2="110" />
          <line x1="39" y1="39" x2="181" y2="181" strokeDasharray="6 8" />
          <line x1="181" y1="39" x2="39" y2="181" strokeDasharray="6 8" />
          <circle cx="110" cy="110" r="5" fill="var(--accent)" fillOpacity="0.3" />
        </svg>
      </motion.div>
    </div>
  );
};

export default function ClientPage({ initialData }: { initialData: any }) {
  const [data, setData] = useState<any>(initialData);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [itViewMode, setItViewMode] = useState<'grid' | 'table'>('grid');
  const [itFilter, setItFilter] = useState<string>('all');
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTopPos, setScrollTopPos] = useState(0);
  
  const awardsRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);

  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const [showBackToTop, setShowBackToTop] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowBackToTop(latest > 500);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartY(e.pageY - sliderRef.current.offsetTop);
    setScrollTopPos(sliderRef.current.scrollTop);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const y = e.pageY - sliderRef.current.offsetTop;
    const walk = (y - startY) * 2;
    sliderRef.current.scrollTop = scrollTopPos - walk;
  };

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProject]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);


  const { projects = [], bio = {} } = data || {};
  
  const displayBio = {
    name: bio?.name || "HILMAN ZAHRAWA BUDIARTO",
    headline: bio?.headline || "Fullstack Developer | UI UX Designer",
    about: "Software Engineer passionate about building scalable web applications, AI-powered solutions, and meaningful digital experiences. I bridge engineering, product thinking, and visual design to create software that performs exceptionally and leaves a lasting impression.",
    location: bio?.location || "Malang, Jawa Timur, Indonesia",
    email: bio?.email || "budiarto3788@gmail.com",
    whatsapp: bio?.whatsapp || "6285806003234",
    address: bio?.address || "Malang, Indonesia",
    avatarUrl: bio?.avatarUrl,
    socialLinks: bio?.socialLinks || [
      { platform: "LinkedIn", url: "https://linkedin.com/in/hilmanzahrawa" },
      { platform: "Portfolio", url: "https://hilmanzahrawa.vercel.app" }
    ],
    skills: typeof bio?.skills === 'string' 
      ? bio.skills.split(',').map((s: string) => s.trim()).filter(Boolean)
      : (bio?.skills || ["Software Development", "UI/UX Design", "Video Editing", "Creative Strategy", "Content Strategy", "Fostering inclusivity", "English (Full Professional)"]),
    mediumUsername: bio?.mediumUsername
  };

  const displayProjects = projects?.length > 0 ? projects : [
    { _id: "1", title: "Brewtech", year: "2026", subtitle: "Innovillage Platform", tags: ["SaaS", "LMS", "IT"], description: "Vocational education platform empowering disabled individuals into barista talents through BREWTECH.", slug: "brewtech", category: 'it', role: 'Full-Stack Lead' },
    { _id: "2", title: "ProFile+", year: "2025", subtitle: "Profile Image Studio", tags: ["UI/UX", "HR"], description: "HR management platform supporting employee data management, attendance tracking, and performance analytics.", slug: "profile-plus", category: 'design', role: 'UI/UX Designer' },
    { _id: "3", title: "Disnakertrans Jatim", year: "2025", subtitle: "Government Portal", tags: ["Web", "IT"], description: "Designing modern, accessible, and user-friendly web interfaces for public government services.", slug: "disnakertrans-jatim", category: 'it', role: 'Web Developer' },
    { _id: "4", title: "NZ Box Laundry", year: "2026", subtitle: "Marketing Strategy", tags: ["Digital Marketing"], description: "Data-driven digital marketing strategy aimed at driving customer retention and engagement.", slug: "nz-box", category: 'design', role: 'Digital Marketer' },
    { _id: "5", title: "Mandala Pure Love", year: "2025", subtitle: "Community Web", tags: ["Social"], description: "Community empowerment platform fostering sociopreneurship and local business growth.", slug: "mandala", category: 'it', role: 'Web Developer' },
  ];

  const sortedProjects = [...displayProjects].sort((a: any, b: any) => {
    const yearA = parseInt(a.year || "0", 10);
    const yearB = parseInt(b.year || "0", 10);
    if (yearB !== yearA) return yearB - yearA;
    const idA = parseInt(a._id || "999", 10);
    const idB = parseInt(b._id || "999", 10);
    return idA - idB;
  });

  const itProjects = data?.landingPage?.itProjectsOrder?.length > 0 
    ? data.landingPage.itProjectsOrder.filter(Boolean) 
    : sortedProjects.filter((p: any) => p.tags?.some((t: string) => ['SaaS', 'LMS', 'Web', 'Dev', 'SQL', 'IT'].includes(t)) || p.category === 'it');

  const designProjects = data?.landingPage?.designProjectsOrder?.length > 0 
    ? data.landingPage.designProjectsOrder.filter(Boolean) 
    : sortedProjects.filter((p: any) => p.tags?.some((t: string) => ['UI/UX', 'Creative', 'Design', 'Visual', 'Logo'].includes(t)) || p.category === 'design');

  const filteredItProjects = itProjects.filter((p: any) => {
    if (itFilter === 'all') return true;
    if (itFilter === 'saas') return p.tags?.some((t: string) => ['SaaS', 'LMS', 'Platform', 'HR', 'POS'].includes(t));
    if (itFilter === 'web') return p.tags?.some((t: string) => ['Web', 'Portal', 'Dev', 'Social', 'IT'].includes(t)) || p.category === 'it';
    return true;
  });

  return (
    <>
      {/* Subtle Noise Texture */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: 0.05, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Scroll-Driven Parallax Decorations */}
      <ScrollParallaxDecorations />

      {/* Scroll Progress Bar */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: 'var(--text-primary)', originX: 0, scaleX, zIndex: 10000 }} />

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            style={{ position: 'fixed', bottom: '2rem', right: '2rem', width: '3rem', height: '3rem', borderRadius: '50%', background: 'var(--bg-secondary)', backdropFilter: 'blur(12px)', border: '1px solid var(--border-hairline)', color: 'var(--text-primary)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 9000, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      {!data ? (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--text-primary)' }}
          />
        </div>
      ) : (
        <main style={{ background: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-primary)', position: 'relative' }}>
          {/* Global Noise Overlay */}
          <div className="global-noise" />
          
          {/* Scatter Ambient Decorations */}
          <BackgroundDecorations />
          
          {/* SEAMLESS NAVBAR */}
          <nav className="seamless-nav">
            <div className="container">
              <a href="#hero" className="nav-brand">
                <span className="brand-name">{displayBio.name}</span>
                <span className="brand-tagline">{data.landingPage?.tagline || "Software Engineer & Product Designer"}</span>
              </a>
              
              <div className="nav-links">
                <a href="#services" className="nav-link">Services</a>
                <a href="#it" className="nav-link">IT Projects</a>
                <a href="#design" className="nav-link">Design</a>
                <a href="#about" className="nav-link">About</a>
                <a href="#medium" className="nav-link">Articles</a>
                <a 
                  href={`https://wa.me/${displayBio.whatsapp}?text=Hello%20Hilman,%20I%20am%20interested%20in%20working%20with%20you`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hire"
                >
                  Hire Me ↗
                </a>
              </div>
            </div>
          </nav>

          <div className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
            
            {/* SEAMLESS HERO PROFILE SECTION (SWISS GRID) */}
            <section id="hero" style={{ position: 'relative', marginBottom: '5rem', paddingBottom: '4rem', borderBottom: '1px solid var(--border-hairline)', minHeight: '75vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {/* Massive Radial Glow */}
              <div style={{ position: 'absolute', top: '10%', left: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 60%)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none', opacity: 0.6 }} />
              {/* Architectural Tracking Grid Background */}
              <div className="hero-mesh-background" style={{ opacity: 0.5 }} />
              
              <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', textAlign: 'left', width: '100%' }}>
                
                {/* LEFT: TEXT CONTENT */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                      <span className="hero-badge-pulse" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1.2rem', background: 'var(--bg-tint)', border: '1px solid var(--border-tint)', borderRadius: '30px', fontSize: '0.725rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                        <span className="hero-pulse-dot" style={{ background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} /> AVAILABLE FOR HIRE
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.05em' }}>
                        // HZ-2026
                      </span>
                    </div>
                  </motion.div>

                  <motion.h1 
                    initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } }, hidden: {} }}
                    style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.15em', textAlign: 'left' }}
                  >
                    {"Engineering Scalable Web Products & Iconic Brand Systems.".split(" ").map((word, idx) => (
                      <span key={idx} style={{ overflow: 'hidden', display: 'inline-block', paddingBottom: '0.15em', marginBottom: '-0.15em' }}>
                        <motion.span variants={{ hidden: { y: '100%', opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 20, stiffness: 100 } } }} style={{ display: 'inline-block' }}>
                          {word}
                        </motion.span>
                      </span>
                    ))}
                  </motion.h1>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.65', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '540px' }}>
                      {displayBio.about}
                    </p>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="hero-btn-group" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <motion.a 
                      whileHover={{ scale: 1.05, boxShadow: 'var(--shadow-glow)' }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      href={`https://wa.me/${displayBio.whatsapp}?text=Hello%20Hilman,%20I%20would%20like%20to%20consult%20about%20a%20project`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-block', background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)', color: '#FFFFFF', padding: '1.2rem 2.8rem', borderRadius: '40px', fontSize: '0.85rem', fontWeight: 800, textDecoration: 'none', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', boxShadow: 'var(--shadow-premium)' }}
                    >
                      Hire Me ↗
                    </motion.a>
                    <motion.a 
                      whileHover={{ backgroundColor: 'var(--bg-tint)', borderColor: 'var(--accent)', color: 'var(--accent)' }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      href={`mailto:${displayBio.email}`}
                      style={{ display: 'inline-block', background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-light)', padding: '1.15rem 2.8rem', borderRadius: '40px', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', boxShadow: 'var(--shadow-premium)' }}
                    >
                      Email ✉
                    </motion.a>
                  </motion.div>
                </div>

                {/* RIGHT: FOCAL VISUAL */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1, y: [0, -15, 0] }} 
                  transition={{ 
                    opacity: { duration: 1, delay: 0.4, ease: "easeOut" },
                    scale: { duration: 1, delay: 0.4, ease: "easeOut" },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                  }}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', width: '100%', height: '100%' }}
                >
                  <div style={{ width: '100%', maxWidth: '400px', aspectRatio: '1', border: '1px solid var(--border-hairline)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}>
                    {/* SVG Wireframe Anchor */}
                    <motion.svg 
                      viewBox="-5 -5 110 110" 
                      style={{ width: '65%', height: '65%', color: 'var(--text-primary)', opacity: 0.8, overflow: 'visible' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      {/* Outer Proportional Hexagon (6 sides) */}
                      <path d="M 50 0 L 93.3 25 L 93.3 75 L 50 100 L 6.7 75 L 6.7 25 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      {/* Intersecting Diagonals */}
                      <path d="M 50 0 L 50 100" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <path d="M 6.7 25 L 93.3 75" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <path d="M 6.7 75 L 93.3 25" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      {/* Glowing Nodes */}
                      <circle cx="50" cy="0" r="1.5" fill="var(--accent)" />
                      <circle cx="93.3" cy="25" r="1.5" fill="var(--accent)" />
                      <circle cx="93.3" cy="75" r="1.5" fill="var(--accent)" />
                      <circle cx="50" cy="100" r="1.5" fill="var(--accent)" />
                      <circle cx="6.7" cy="75" r="1.5" fill="var(--accent)" />
                      <circle cx="6.7" cy="25" r="1.5" fill="var(--accent)" />
                      {/* Animated Radar Chart Data Area */}
                      <motion.path 
                        animate={{ 
                          d: [
                            "M 50 20 L 88.97 27.5 L 71.65 62.5 L 50 90 L 32.68 60 L 19.69 32.5 Z",
                            "M 50 0 L 58.66 45 L 84.64 70 L 50 60 L 15.36 70 L 41.34 45 Z",
                            "M 50 40 L 88.97 27.5 L 58.66 55 L 50 95 L 41.34 55 L 11.03 27.5 Z",
                            "M 50 45 L 88.97 27.5 L 88.97 72.5 L 50 55 L 11.03 72.5 L 11.03 27.5 Z",
                            "M 50 5 L 75.98 35 L 58.66 55 L 50 95 L 41.34 55 L 24.02 35 Z",
                            "M 50 20 L 88.97 27.5 L 71.65 62.5 L 50 90 L 32.68 60 L 19.69 32.5 Z"
                          ] 
                        }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                        fill="currentColor" 
                        fillOpacity="0.1" 
                        stroke="currentColor" 
                        strokeWidth="1" 
                      />
                      {/* Inner Circles */}
                      <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
                      <circle cx="50" cy="50" r="5" fill="currentColor" />
                    </motion.svg>
                    
                    {/* Architectural crosshairs */}
                    <div style={{ position: 'absolute', top: '15px', left: '15px', width: '10px', height: '10px', borderTop: '1px solid var(--text-primary)', borderLeft: '1px solid var(--text-primary)' }} />
                    <div style={{ position: 'absolute', top: '15px', right: '15px', width: '10px', height: '10px', borderTop: '1px solid var(--text-primary)', borderRight: '1px solid var(--text-primary)' }} />
                    <div style={{ position: 'absolute', bottom: '15px', left: '15px', width: '10px', height: '10px', borderBottom: '1px solid var(--text-primary)', borderLeft: '1px solid var(--text-primary)' }} />
                    <div style={{ position: 'absolute', bottom: '15px', right: '15px', width: '10px', height: '10px', borderBottom: '1px solid var(--text-primary)', borderRight: '1px solid var(--text-primary)' }} />
                  </div>
                </motion.div>

              </div>

              {/* Swiss Grid Stats */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} style={{ width: '100%', marginTop: '5rem', maxWidth: '1200px', margin: '5rem auto 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', borderTop: '1px solid var(--text-primary)', borderBottom: '1px solid var(--text-primary)' }}>
                  <motion.div whileHover={{ backgroundColor: 'var(--bg-secondary)' }} style={{ padding: '2rem', borderRight: '1px solid var(--border-hairline)' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <Star size={24} strokeWidth={2.5} /> <CountUp to={100} suffix="%" />
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.05em' }}>Client Satisfaction</div>
                  </motion.div>
                  <motion.div whileHover={{ backgroundColor: 'var(--bg-secondary)' }} style={{ padding: '2rem', borderRight: '1px solid var(--border-hairline)' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <Briefcase size={24} strokeWidth={2.5} /> <CountUp to={15} suffix="+" />
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.05em' }}>Projects Completed</div>
                  </motion.div>
                  <motion.div whileHover={{ backgroundColor: 'var(--bg-secondary)' }} style={{ padding: '2rem', borderRight: '1px solid var(--border-hairline)' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <CheckCircle size={24} strokeWidth={2.5} /> <CountUp to={100} suffix="%" />
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.05em' }}>On-Time Delivery</div>
                  </motion.div>
                  <motion.div whileHover={{ backgroundColor: 'var(--bg-secondary)' }} style={{ padding: '2rem' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <Clock size={24} strokeWidth={2.5} /> <CountUp to={3} suffix="+" />
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.05em' }}>Years Experience</div>
                  </motion.div>
                </div>
              </motion.div>
            </section>

            {/* SEAMLESS SERVICES SECTION */}
            <motion.section id="services" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} style={{ marginBottom: '5.5rem' }}>
              <div className="section-header-seamless">
                <h2 className="section-title-seamless">Services & Project Specializations</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <MiniDeco />
                  <span className="section-tag">01 / SERVICES</span>
                </div>
              </div>

              <motion.div 
                className={getDynamicContainerClass(3, "seamless-service-grid")}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  visible: { transition: { staggerChildren: 0.15 } },
                  hidden: {}
                }}
              >
                
                {/* 1. WEB & SAAS */}
                <motion.div className="seamless-service-card" style={{ position: 'relative', overflow: 'hidden' }} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } }}>
                  <div style={{ position: 'absolute', top: '-5%', right: '-5%', fontSize: '10rem', fontWeight: 900, color: 'var(--border-hairline)', opacity: 0.3, zIndex: 0, fontFamily: 'var(--font-display)', pointerEvents: 'none', lineHeight: 1 }}>01</div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div className="service-card-header" style={{ marginBottom: '1.25rem' }}>
                      <div className="service-card-icon">
                        <img src="/icon-dev.png" alt="Development" />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)' }}>01 // DEVELOPMENT</span>
                        <h3>Web App & SaaS Development</h3>
                      </div>
                    </div>

                    <p style={{ marginBottom: '1.5rem' }}>
                      Engineering high-performance web applications, internal business management systems, and scalable SaaS platforms.
                    </p>

                    <ul className="service-checklist" style={{ marginBottom: '1.5rem' }}>
                      <li><span className="check">✓</span> <span><strong>Custom SaaS Platforms & Web Apps</strong> (LMS, CRM, Portals)</span></li>
                      <li><span className="check">✓</span> <span><strong>Corporate Websites & Government Portals</strong></span></li>
                      <li><span className="check">✓</span> <span><strong>Point of Sale & Retail Management Systems</strong></span></li>
                      <li><span className="check">✓</span> <span><strong>High-Performance, SEO-Optimized Landing Pages</strong></span></li>
                    </ul>
                  </div>

                  <a 
                    href={`https://wa.me/${displayBio.whatsapp}?text=Hello%20Hilman,%20I%20am%20interested%20in%20Web%20%26%20SaaS%20Development`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="order-btn"
                  >
                    Order Web Development ↗
                  </a>
                </motion.div>

                {/* 2. BRANDING & UI/UX */}
                <motion.div className="seamless-service-card" style={{ position: 'relative', overflow: 'hidden' }} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } }}>
                  <div style={{ position: 'absolute', top: '-5%', right: '-5%', fontSize: '10rem', fontWeight: 900, color: 'var(--border-hairline)', opacity: 0.3, zIndex: 0, fontFamily: 'var(--font-display)', pointerEvents: 'none', lineHeight: 1 }}>02</div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div className="service-card-header" style={{ marginBottom: '1.25rem' }}>
                      <div className="service-card-icon">
                        <img src="/icon-branding.png" alt="Branding" />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)' }}>02 // BRANDING & UI/UX</span>
                        <h3>Brand Identity & UI/UX Design</h3>
                      </div>
                    </div>

                    <p style={{ marginBottom: '1.5rem' }}>
                      Designing distinctive brand identities and intuitive UI/UX design systems from logos to full product applications.
                    </p>

                    <ul className="service-checklist" style={{ marginBottom: '1.5rem' }}>
                      <li><span className="check">✓</span> <span><strong>Brand Identity & Professional Logo Design</strong></span></li>
                      <li><span className="check">✓</span> <span><strong>Packaging & Marketing Asset Design</strong></span></li>
                      <li><span className="check">✓</span> <span><strong>Web & Mobile App UI/UX Design</strong></span></li>
                      <li><span className="check">✓</span> <span><strong>Interactive High-Fidelity Prototypes</strong></span></li>
                    </ul>
                  </div>

                  <a 
                    href={`https://wa.me/${displayBio.whatsapp}?text=Hello%20Hilman,%20I%20am%20interested%20in%20Brand%20Identity%20%26%20UI%2FUX%20Design`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="order-btn"
                  >
                    Order Design & Branding ↗
                  </a>
                </motion.div>

                {/* 3. AUTOMATION */}
                <motion.div className="seamless-service-card" style={{ position: 'relative', overflow: 'hidden' }} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } }}>
                  <div style={{ position: 'absolute', top: '-5%', right: '-5%', fontSize: '10rem', fontWeight: 900, color: 'var(--border-hairline)', opacity: 0.3, zIndex: 0, fontFamily: 'var(--font-display)', pointerEvents: 'none', lineHeight: 1 }}>03</div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div className="service-card-header" style={{ marginBottom: '1.25rem' }}>
                      <div className="service-card-icon">
                        <img src="/icon-script.png" alt="Apps Script" />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)' }}>03 // AUTOMATION</span>
                        <h3>Workflow Automation & Google Apps Script</h3>
                      </div>
                    </div>

                    <p style={{ marginBottom: '1.5rem' }}>
                      Streamlining Google Workspace workflows (Sheets, Docs, Gmail, Forms) to boost operational efficiency without high server costs.
                    </p>

                    <ul className="service-checklist" style={{ marginBottom: '1.5rem' }}>
                      <li><span className="check">✓</span> <span><strong>Google Sheets, PDF & Email Automation</strong></span></li>
                      <li><span className="check">✓</span> <span><strong>WhatsApp & Telegram Bot Integration</strong></span></li>
                      <li><span className="check">✓</span> <span><strong>Custom Web Forms via Apps Script</strong></span></li>
                      <li><span className="check">✓</span> <span><strong>Automated Data Cleaning & Synchronization</strong></span></li>
                    </ul>
                  </div>

                  <a 
                    href={`https://wa.me/${displayBio.whatsapp}?text=Hello%20Hilman,%20I%20am%20interested%20in%20Automation%20Services`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="order-btn"
                  >
                    Order Automation Services ↗
                  </a>
                </motion.div>
              </motion.div>
            </motion.section>

            {/* SEAMLESS IT PROJECTS SECTION */}
            <motion.section id="it" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} style={{ marginBottom: '5.5rem' }}>
              <div className="section-header-seamless" style={{ alignItems: 'center' }}>
                <div>
                  <h2 className="section-title-seamless">Software, Web, & UI/UX Projects</h2>
                  <span className="section-tag" style={{ marginTop: '0.25rem', display: 'block' }}>02 / IT PROJECTS ({filteredItProjects.length})</span>
                </div>

                <div className="view-switcher">
                  <button 
                    onClick={() => setItViewMode('grid')}
                    className={`view-btn ${itViewMode === 'grid' ? 'active' : ''}`}
                  >
                    <span>田</span> Grid View
                  </button>
                  <button 
                    onClick={() => setItViewMode('list')}
                    className={`view-btn ${itViewMode === 'list' ? 'active' : ''}`}
                  >
                    <span>𝌆</span> Editorial List
                  </button>
                  <button 
                    onClick={() => setItViewMode('table')}
                    className={`view-btn ${itViewMode === 'table' ? 'active' : ''}`}
                  >
                    <span>☰</span> Executive Table
                  </button>
                </div>
              </div>

              {/* Filter Pills */}
              <div className="filter-pills">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setItFilter('all')}
                  className={`filter-pill ${itFilter === 'all' ? 'active' : ''}`}
                >
                  All Projects ({itProjects.length})
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setItFilter('saas')}
                  className={`filter-pill ${itFilter === 'saas' ? 'active' : ''}`}
                >
                  SaaS & Platforms
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setItFilter('web')}
                  className={`filter-pill ${itFilter === 'web' ? 'active' : ''}`}
                >
                  Web Apps & Portals
                </motion.button>
              </div>

              {itViewMode === 'list' ? (
                <motion.div layout className="editorial-list-container">
                  <AnimatePresence mode="popLayout">
                  {filteredItProjects.map((project: any, index: number) => (
                    <motion.div
                      layout
                      key={project._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4 }}
                      className="editorial-project-row"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="editorial-row-content">
                        <div className="editorial-title-col">
                          <h3 className="editorial-project-title">{project.title}</h3>
                          <p className="editorial-project-subtitle">{project.subtitle || project.description}</p>
                        </div>
                        
                        <div className="editorial-meta-col">
                          <span className="editorial-meta-role">{project.role || 'Full-Stack Developer'} // {project.year || '2026'}</span>
                          {project.tags?.length > 0 && (
                            <div className="editorial-tags">
                              {project.tags.slice(0, 3).map((tag: string) => (
                                <span key={tag} className="editorial-tag">{tag}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="editorial-img-col">
                        <div className="editorial-img-container">
                          {project.image ? (
                            <img src={urlFor(project.image).width(800).url()} alt={project.title} loading="lazy" />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>⚙️</div>
                          )}
                          {project.featured && (
                            <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--text-primary)', color: 'var(--bg-primary)', padding: '0.2rem 0.6rem', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', fontWeight: 700, zIndex: 2 }}>
                              FEATURED
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  </AnimatePresence>
                </motion.div>
              ) : itViewMode === 'grid' ? (
                <motion.div layout className={getDynamicContainerClass(filteredItProjects.length, "compact-grid")}>
                  <AnimatePresence mode="popLayout">
                    {filteredItProjects.map((project: any, index: number) => (
                      <motion.div
                        layout
                        key={project._id}
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ duration: 0.3, delay: index * 0.04 }}
                        className={getDynamicItemClass(filteredItProjects.length, "card-compact")}
                        onClick={() => setSelectedProject(project)}
                      >
                        <div className="img-wrapper" style={{ position: 'relative', aspectRatio: '16/10' }}>
                          {project.image ? (
                            <img 
                              src={urlFor(project.image).width(800).url()} 
                              alt={project.title} 
                              loading="lazy"
                              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                            />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-tertiary)', fontSize: '2.5rem' }}>
                              ⚙️
                            </div>
                          )}
                          {project.featured && (
                            <span style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'var(--text-primary)', color: 'var(--bg-primary)', padding: '0.2rem 0.6rem', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', fontWeight: 700, zIndex: 2 }}>
                              FEATURED
                            </span>
                          )}
                        </div>

                        <div className="content" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingTop: '0.25rem' }}>
                          <div className="metadata-row" style={{ alignItems: 'flex-start' }}>
                            <h4 className="title" style={{ fontSize: '1.05rem', fontWeight: 800 }}>{project.title}</h4>
                          </div>
                          
                          <p className="subtitle" style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: '1.45', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {project.subtitle || project.description}
                          </p>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-hairline)' }}>
                            <span style={{ fontSize: '0.675rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                              {project.role || 'Full-Stack Developer'} • {project.year || '2026'}
                            </span>
                            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--text-primary)' }}>
                              View Work ↗
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="flat-table-container">
                  <table className="redesigned-table">
                    <thead>
                      <tr>
                        <th>Project Title</th>
                        <th>Category / Tag</th>
                        <th>Year</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItProjects.map((project: any) => (
                        <tr key={project._id} onClick={() => setSelectedProject(project)}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', background: 'var(--bg-tertiary)', flexShrink: 0, border: '1px solid var(--border-hairline)' }}>
                                {project.image ? <img src={urlFor(project.image).width(120).url()} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '⚙️'}
                              </div>
                              <div>
                                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>{project.title}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{project.subtitle || project.description}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-secondary)' }}>
                            <span className="tech-tag-chip">{project.category || (project.tags && project.tags[0]) || 'IT Project'}</span>
                          </td>
                          <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{project.year || '2026'}</td>
                          <td style={{ fontSize: '0.85rem', fontWeight: 700 }}>{project.role || 'Full-Stack Developer'}</td>
                          <td>
                            {project.featured ? (
                              <span className="featured-star-badge">★ Featured</span>
                            ) : (
                              <span className="live-pulse-badge">
                                <span className="pulse-dot" /> Live
                              </span>
                            )}
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }} 
                              style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', padding: '0.45rem 0.9rem', borderRadius: '4px', fontSize: '0.725rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
                            >
                              Details ↗
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.section>

            {/* SEAMLESS DESIGN SECTION */}
            <motion.section id="design" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} style={{ marginBottom: '5.5rem' }}>
              <div className="section-header-seamless">
                <h2 className="section-title-seamless">Creative Portfolio</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <MiniDeco />
                  <span className="section-tag">03 / CREATIVE PORTFOLIO</span>
                </div>
              </div>

              <DesignSection 
                projects={designProjects} 
                onProjectClick={(project) => setSelectedProject(project)} 
              />
            </motion.section>

            {/* SEAMLESS ABOUT SECTION */}
            <motion.section id="about" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} style={{ marginBottom: '5.5rem' }}>
              <div className="section-header-seamless">
                <h2 className="section-title-seamless">Experience & Credentials</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <MiniDeco />
                  <span className="section-tag">04 / BACKGROUND</span>
                </div>
              </div>

              <div className="about-grid">
                <div>
                  <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem', color: 'var(--text-muted)' }}>Experience</h3>
                  <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                    variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
                    style={{ position: 'relative', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '2.5rem' }}
                  >
                    <div style={{ position: 'absolute', left: '11px', top: '0', bottom: '0', width: '2px', background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
                    {(data.experiences?.length > 0 ? data.experiences : [
                      { _id: "e1", role: "HRIS Developer – HCM Division", company: "PT PAL Indonesia (Persero)", startDate: "2026", displayDate: "April 2026 - Present" },
                      { _id: "e2", role: "Creative Strategist", company: "Mandala Pure Love", startDate: "2025", displayDate: "Sept 2025 - Present", desc: "Led inclusive communication strategies and creative direction to promote disability inclusion and community empowerment. Developed insights-driven campaigns and collaborated with disability communities and partners. Contributed to the development of the The Cup We Share barista training program with Kafe Among Rasa (outputs), which supported the establishment of sociopreneurship initiatives at SLB YPAC Kota Malang and enabled students to participate in real-world coffee shop internships (outcomes)." },
                      { _id: "e3", role: "Web Developer", company: "Mandala Pure Love", startDate: "2025", displayDate: "Dec 2025 - Apr 2026", desc: "As a Web Developer at Mandala Pure Love, I contributed to the development of BrewTech, a digital platform designed to support technology-driven entrepreneurship and community empowerment initiatives under the Innovillage program. I was responsible for analyzing system requirements, designing and developing the website architecture, implementing both front-end and back-end functionalities, managing databases, and optimizing performance to ensure scalability, security, and responsiveness across devices. Through this project, I helped deliver a sustainable digital solution that aligns technological innovation with measurable social impact." },
                      { _id: "e4", role: "Social Media Specialist", company: "NZ Box Smart Laundry", startDate: "2026", displayDate: "Feb 2026 - Apr 2026", desc: "Developed marketing strategies to increase brand awareness, customer acquisition, and retention. Managed social media campaigns, created engaging content and promotional materials, optimized paid advertising performance, analyzed campaign metrics, and identified growth opportunities based on market insights to strengthen NZ Box Laundry’s presence as a 24-hour self-service laundry solution." },
                      { _id: "e5", role: "UI/UX Designer", company: "Social Economic Accelerator Lab", startDate: "2025", displayDate: "Aug 2025 - Dec 2025", desc: "Designed a modern, accessible, and user-friendly website interface for the East Java Manpower and Transmigration Office (Disnakertrans Jatim). Created an intuitive CMS dashboard to improve internal workflows and administrative efficiency. Developed UI/UX for ProFile+ HR Management System, supporting employee data, attendance, and performance processes." },
                      { _id: "e6", role: "Chairman", company: "HMTI Polinema", startDate: "2024", displayDate: "Feb 2024 - Feb 2025", desc: "Led a student organization overseeing 11 programs and 30+ agendas with 5 departments involved. Fostered inter-campus collaboration and enhanced student engagement. Developed organizational guidelines and strategic planning for Himpunan Mahasiswa Teknologi Informasi (HMTI) Polinema." },
                      { _id: "e7", role: "Organizing Committee", company: "HMTI Polinema", startDate: "2023", displayDate: "Feb 2023 - Feb 2024", desc: "Led the planning and execution of various events, ensuring seamless coordination and logistics. Managed communication strategies between students and faculty, fostering positive relationships. Oversaw time management and technical readiness to ensure successful event outcomes." },
                      { _id: "e8", role: "Debate Mentor", company: "IT Dept English Community", startDate: "2023", displayDate: "Dec 2023 - Feb 2025" },
                    ]).map((exp: any) => {
                      const monogram = exp.company.split(' ').map((w: string) => w[0]).join('').substring(0, 2).toUpperCase();
                      return (
                        <motion.div key={exp._id} variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} style={{ position: 'relative' }}>
                          <div style={{ position: 'absolute', left: '-1.1rem', top: '0.35rem', width: '10px', height: '10px', background: 'var(--bg-primary)', border: '2px solid var(--accent)', borderRadius: '50%', boxShadow: '0 0 8px var(--accent-glow)' }} />
                          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, lineHeight: 1.2 }}>{exp.role}</h4>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: '0.25rem', letterSpacing: '0.02em' }}>
                            <strong style={{ color: 'var(--text-primary)' }}>{exp.company}</strong> • {exp.displayDate || (exp.startDate?.split('-')[0] || 'Present')}
                          </p>
                          {exp.desc && (
                            <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: 1.6 }}>
                              {exp.desc}
                            </p>
                          )}
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>

                <div>
                  <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem', color: 'var(--text-muted)' }}>Skills & Expertise</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                    {(() => {
                      const devSkills = displayBio.skills.filter((s: string) => /dev|code|react|node|next|script|python|web|software/i.test(s));
                      const designSkills = displayBio.skills.filter((s: string) => /design|ui|ux|video|creative|figma/i.test(s));
                      const otherSkills = displayBio.skills.filter((s: string) => !devSkills.includes(s) && !designSkills.includes(s));
                      
                      const SkillGroup = ({ title, skills }: { title: string, skills: string[] }) => skills.length > 0 ? (
                        <div>
                          <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>{title}</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                            {skills.map((skill: string) => (
                              <span key={skill} className="premium-chip">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null;

                      return (
                        <>
                          <SkillGroup title="Engineering" skills={devSkills} />
                          <SkillGroup title="Design & Creative" skills={designSkills} />
                          <SkillGroup title="General & Soft Skills" skills={otherSkills} />
                        </>
                      );
                        })()}
                      </div>

                      <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem', color: 'var(--text-muted)', marginTop: '3rem' }}>Education</h3>
                      <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                        variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
                        style={{ position: 'relative', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}
                      >
                        <div style={{ position: 'absolute', left: '11px', top: '0', bottom: '0', width: '2px', background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
                        {(data.education?.length > 0 ? data.education : [
                          { _id: "edu1", school: "Politeknik Negeri Malang", degree: "Business Information System", startDate: "Aug 2022 - 2026" },
                          { _id: "edu2", school: "SMA Negeri 1 Malang", degree: "Mathematics and Natural Science", startDate: "Jul 2019 - May 2022" },
                        ]).map((edu: any) => {
                          const monogram = edu.school.split(' ').map((w: string) => w[0]).join('').substring(0, 2).toUpperCase();
                          return (
                            <motion.div key={edu._id} variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} style={{ position: 'relative' }}>
                              <div style={{ position: 'absolute', left: '-1.1rem', top: '0.35rem', width: '10px', height: '10px', background: 'var(--bg-primary)', border: '2px solid var(--accent)', borderRadius: '50%', boxShadow: '0 0 8px var(--accent-glow)' }} />
                              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, lineHeight: 1.2 }}>{edu.school}</h4>
                              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: '0.25rem', letterSpacing: '0.02em' }}>
                                {edu.degree} • {edu.startDate}
                              </p>
                            </motion.div>
                          );
                        })}
                      </motion.div>

                      <div style={{ marginTop: '3rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', margin: 0 }}>Certificates</h3>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => certsRef.current?.scrollBy({ left: -350, behavior: 'smooth' })} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--border-light)', background: 'transparent', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                              <ChevronLeft size={16} />
                            </button>
                            <button onClick={() => certsRef.current?.scrollBy({ left: 350, behavior: 'smooth' })} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--border-light)', background: 'transparent', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                              <ChevronRight size={16} />
                            </button>
                          </div>
                        </div>
                        <motion.div 
                          ref={certsRef}
                          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                          variants={{ visible: { transition: { staggerChildren: 0.05 } }, hidden: {} }}
                          className={getDynamicContainerClass(data.certificates?.length || 8)}
                        >
                          {(data.certificates?.length > 0 ? data.certificates : [
                            { _id: "cert1", title: "2nd Best Novice Team International I&T Open Debate Competition", issuer: "Award", date: "2024" },
                            { _id: "cert2", title: "2nd Place Video Competition Expo Kelembagaan OKI Polinema", issuer: "Award", date: "2023" },
                            { _id: "cert3", title: "Finalist Poster Infographic Design 4C National Competition", issuer: "Award", date: "2023" },
                            { _id: "cert4", title: "2nd Runner Up IT Poly Debate Cup", issuer: "Award", date: "2024" },
                            { _id: "cert5", title: "How to Validate Your Social Project Leadership Program", issuer: "Innovillage", date: "2025" },
                            { _id: "cert6", title: "Communicating for Community Engagement and Influence", issuer: "Innovillage", date: "2025" },
                            { _id: "cert7", title: "Memulai Pemrograman dengan Python", issuer: "Dicoding", date: "2024" },
                            { _id: "cert8", title: "Belajar Dasar AI", issuer: "Dicoding", date: "2024" },
                          ]).map((cert: any, _, arr) => (
                            <motion.div key={cert._id} variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } } }} className={getDynamicItemClass(arr.length)} style={{ border: '1px solid var(--border-light)', borderRadius: '6px', padding: '0.75rem', background: 'var(--bg-secondary)', height: '100%' }}>
                              <h4 style={{ fontSize: '0.8rem', fontWeight: 800, lineHeight: 1.3 }}>{cert.title}</h4>
                              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>{cert.issuer} • {cert.date}</p>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', margin: 0 }}>Awards & Achievements</h3>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => awardsRef.current?.scrollBy({ left: -350, behavior: 'smooth' })} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--border-light)', background: 'transparent', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                          <ChevronLeft size={16} />
                        </button>
                        <button onClick={() => awardsRef.current?.scrollBy({ left: 350, behavior: 'smooth' })} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--border-light)', background: 'transparent', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                    <motion.div 
                        ref={awardsRef}
                        initial="hidden" animate="visible"
                        variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
                        className="dynamic-slider-container"
                        style={{ marginBottom: '3rem' }}
                      >
                        {[
                          { 
                            id: "aw1", 
                            title: "\"Mandala Pure Love\" Most Inspiring Community Empowerment", 
                            issuer: "Djarum Beasiswa Plus", 
                            date: "2026", 
                            assoc: "Mandala Pure Love", 
                            desc: "Awarded as the most inspiring community empowerment initiative for 2024/2025."
                          },
                          { 
                            id: "aw2", 
                            title: "Innovillage Top 180 for Brewtech", 
                            issuer: "Innovillage", 
                            date: "2026", 
                            assoc: "BrewTech", 
                            desc: "Selected as one of the top 180 social projects in Indonesia for the BrewTech platform under the Innovillage program." 
                          },
                          { 
                            id: "aw3", 
                            title: "2nd Runner Up - IT Poly Debate Cup", 
                            issuer: "IT Debate Society", 
                            date: "2024", 
                            assoc: "Politeknik Negeri Malang", 
                            desc: "National level public debating event adhering to the British Parliamentary Debate System format." 
                          },
                          { 
                            id: "aw4", 
                            title: "Finalis Desain Poster Infografis - 4C National Competition", 
                            issuer: "Universitas Brawijaya", 
                            date: "2024", 
                            assoc: "Politeknik Negeri Malang", 
                            desc: "The 4C National Competition is an event hosted by the Faculty of Computer Science at the University of Brawijaya." 
                          },
                          { 
                            id: "aw5", 
                            title: "2nd Best Novice Team - International I&T Open Debate Competition", 
                            issuer: "Indonesian Student Association in Taiwan", 
                            date: "2023", 
                            assoc: "Politeknik Negeri Malang", 
                            desc: "Cross-cultural public debating event drawing participants from diverse Asian nations including Indonesia, Taiwan, the Philippines, and China." 
                          },
                          { 
                            id: "aw6", 
                            title: "Finalis Desain Poster Infografis - 4C National Competition", 
                            issuer: "Universitas Brawijaya", 
                            date: "2023", 
                            assoc: "Politeknik Negeri Malang", 
                            desc: "The 4C National Competition is an event hosted by the Faculty of Computer Science at the University of Brawijaya." 
                          }
                        ].map((award) => (
                          <motion.div key={award.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="award-card dynamic-slider-item">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.3 }}>{award.title}</h4>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{award.issuer}</span>
                                <span style={{ color: 'var(--text-muted)' }}>•</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{award.date}</span>
                              </div>
                              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Associated with {award.assoc}</span>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{award.desc}</p>
                          </motion.div>
                        ))}
                      </motion.div>
                  </div>
            </motion.section>

            {/* SEAMLESS ARTICLES SECTION */}
            <motion.section id="medium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} style={{ marginBottom: '5.5rem' }}>
              <div className="section-header-seamless">
                <h2 className="section-title-seamless">Articles & Publications</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <MiniDeco />
                  <span className="section-tag">05 / ARTICLES</span>
                </div>
              </div>

              <MediumArticles username={displayBio.mediumUsername} />
            </motion.section>

            {/* SEAMLESS CALL TO ACTION */}
            <motion.section id="contact-cta" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} style={{ position: 'relative', padding: '6rem 2rem', background: 'radial-gradient(circle at center, var(--bg-secondary) 0%, var(--bg-surface) 100%)', color: 'var(--text-primary)', border: '1px solid var(--border-glow)', borderRadius: '16px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', marginBottom: '3rem', overflow: 'hidden', boxShadow: 'var(--shadow-premium)' }}>
              <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 50%)', filter: 'blur(80px)', zIndex: 0, opacity: 0.4, pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
                <span style={{ fontSize: '0.725rem', fontFamily: 'var(--font-mono)', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.12em', background: 'var(--bg-tint)', padding: '0.4rem 1rem', borderRadius: '20px', border: '1px solid var(--border-tint)' }}>INITIATE A PROJECT</span>
                <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em', maxWidth: '720px', lineHeight: 1.25, textShadow: '0 0 20px rgba(255,255,255,0.1)' }}>
                  Let's Bring Your Digital Vision to Life with Hilman Zahrawa.
                </h2>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1.5rem' }}>
                  <motion.a 
                    whileHover={{ scale: 1.05, boxShadow: 'var(--shadow-glow)' }}
                    whileTap={{ scale: 0.95 }}
                    href={`https://wa.me/${displayBio.whatsapp}?text=Hello%20Hilman,%20I%20would%20like%20to%20discuss%20a%20project`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)', color: '#FFFFFF', padding: '1rem 2.2rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 800, textDecoration: 'none', fontFamily: 'var(--font-mono)', boxShadow: 'var(--shadow-premium)' }}
                  >
                    Chat on WhatsApp 💬
                  </motion.a>
                  <motion.a 
                    whileHover={{ backgroundColor: 'var(--bg-tint)', borderColor: 'var(--accent)', color: 'var(--accent)' }}
                    whileTap={{ scale: 0.95 }}
                    href={`mailto:${displayBio.email}`}
                    style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-light)', padding: '0.95rem 2.2rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 800, textDecoration: 'none', fontFamily: 'var(--font-mono)', boxShadow: 'var(--shadow-premium)' }}
                  >
                    Send Email ✉️
                  </motion.a>
                </div>
              </div>
            </motion.section>

          </div>

          {/* SEAMLESS FOOTER */}
          <footer style={{ position: 'relative', padding: '4.5rem 0', borderTop: '1px solid var(--border-hairline)', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
            <div className="footer-mesh-background" />
            <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>© 2026 {displayBio.name}</span>
              <div style={{ display: 'flex', gap: '2rem' }}>
                {displayBio.socialLinks.map((link: any) => (
                  <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>{link.platform}</a>
                ))}
              </div>
            </div>
          </footer>

          {/* Project Detail Overlay Modal */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ 
                  position: 'fixed', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '100%', 
                  background: 'rgba(255, 255, 255, 0.97)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  zIndex: 10000,
                  padding: '2rem 1rem',
                  color: 'var(--text-primary)',
                  overflowY: 'auto'
                }}
              >
                <div style={{ position: 'relative', margin: '0 auto', maxWidth: '1536px', width: '100%', padding: '2rem 0', minHeight: 'calc(100vh - 8rem)', display: 'flex', alignItems: 'flex-start' }}>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    style={{ 
                      position: 'fixed', 
                      right: '2rem', 
                      top: '2rem', 
                      background: 'var(--text-primary)', 
                      border: 'none', 
                      color: 'var(--text-primary)', 
                      fontSize: '1rem', 
                      fontWeight: 700,
                      cursor: 'pointer',
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10001
                    }}
                  >
                    ✕
                  </button>

                  <div style={{ display: 'grid', gap: '4rem', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)', width: '100%' }}>
                    {/* Media Column */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div 
                        className="slider-outer-container" 
                        style={{ 
                          width: '100%', 
                          maxWidth: selectedProject.deviceType === 'mobile' ? '360px' : 'none',
                          height: selectedProject.deviceType === 'mobile' ? '80vh' : 'auto', 
                          background: 'var(--bg-tertiary)', 
                          position: 'relative', 
                          overflow: selectedProject.deviceType === 'mobile' ? 'hidden' : 'visible',
                          borderRadius: '12px',
                          border: '1px solid var(--border-hairline)',
                          margin: selectedProject.deviceType === 'mobile' ? '0 auto' : '0'
                        }}
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            ref={sliderRef}
                            onMouseDown={handleMouseDown}
                            onMouseLeave={handleMouseLeave}
                            onMouseUp={handleMouseUp}
                            onMouseMove={handleMouseMove}
                            style={{ 
                              width: '100%', 
                              height: selectedProject.deviceType === 'mobile' ? '100%' : 'auto', 
                              overflowY: selectedProject.deviceType === 'mobile' ? 'auto' : 'visible',
                              cursor: selectedProject.deviceType === 'mobile' ? (isDragging ? 'grabbing' : 'grab') : 'auto',
                              userSelect: isDragging ? 'none' : 'auto'
                            }}
                          >
                            {(() => {
                              if (selectedProject.mediaType === 'video' && selectedProject.videoUrl) {
                                let embedUrl = selectedProject.videoUrl;
                                if (embedUrl.includes('youtube.com/watch?v=')) {
                                  embedUrl = embedUrl.replace('watch?v=', 'embed/');
                                } else if (embedUrl.includes('youtu.be/')) {
                                  embedUrl = embedUrl.replace('youtu.be/', 'youtube.com/embed/');
                                } else if (embedUrl.includes('vimeo.com/')) {
                                  embedUrl = embedUrl.replace('vimeo.com/', 'player.vimeo.com/video/');
                                }

                                return (
                                  <div style={{ width: '100%', aspectRatio: selectedProject.deviceType === 'mobile' ? 'auto' : '16/9', height: selectedProject.deviceType === 'mobile' ? '100%' : 'auto', background: '#000' }}>
                                    <iframe 
                                      src={embedUrl} 
                                      style={{ width: '100%', height: '100%', border: 'none' }}
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                    />
                                  </div>
                                );
                              }

                              const gallery = selectedProject.gallery || [];
                              const images = gallery.length > 0 ? gallery : [selectedProject.image];
                              const currentImg = images[currentImageIndex];

                              if (currentImg) {
                                const imgUrl = typeof currentImg === 'string' ? currentImg : urlFor(currentImg).width(1200).url();
                                return (
                                  <div style={{ width: '100%', position: 'relative' }}>
                                    <img 
                                      src={imgUrl} 
                                      alt={`${selectedProject.title} ${currentImageIndex + 1}`} 
                                      draggable="false"
                                      onDragStart={(e) => e.preventDefault()}
                                      style={{ 
                                        width: '100%', 
                                        height: 'auto', 
                                        display: 'block',
                                        userSelect: 'none',
                                        pointerEvents: isDragging ? 'none' : 'auto'
                                      }} 
                                    />
                                    <a 
                                      href={imgUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        right: '1rem',
                                        background: 'var(--text-primary)',
                                        color: 'var(--bg-primary)',
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '4px',
                                        fontSize: '0.7rem',
                                        fontWeight: 700,
                                        textDecoration: 'none',
                                        zIndex: 20,
                                        textTransform: 'uppercase',
                                        fontFamily: 'var(--font-mono)'
                                      }}
                                    >
                                      Full View ↗
                                    </a>
                                  </div>
                                );
                              }
                              return <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>📽️</div>;
                            })()}
                          </motion.div>
                        </AnimatePresence>

                        {/* Slider Controls */}
                        {(() => {
                          const gallery = selectedProject.gallery || [];
                          const images = gallery.length > 0 ? gallery : [selectedProject.image];
                          if (images.length > 1) {
                            return (
                              <>
                                <button 
                                  onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                                  style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'var(--text-primary)', border: 'none', color: 'var(--bg-primary)', width: '2.2rem', height: '2.2rem', borderRadius: '50%', cursor: 'pointer', zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}
                                >
                                  ←
                                </button>
                                <button 
                                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'var(--text-primary)', border: 'none', color: 'var(--bg-primary)', width: '2.2rem', height: '2.2rem', borderRadius: '50%', cursor: 'pointer', zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}
                                >
                                  →
                                </button>
                                <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'var(--text-primary)', color: 'var(--bg-primary)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700, zIndex: 30 }}>
                                  {currentImageIndex + 1} / {images.length}
                                </div>
                              </>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    </div>

                    {/* Project Info Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'sticky', top: '2rem', height: 'max-content' }}>
                      <div>
                        <span style={{ display: 'block', marginBottom: '0.35rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.725rem', fontWeight: 700, textTransform: 'uppercase' }}>
                          {selectedProject.subtitle || (selectedProject.category === 'it' ? 'IT Solution' : 'UI/UX Design')}
                        </span>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                          {selectedProject.title}
                        </h2>
                      </div>

                      <div>
                        <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Description</h4>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
                          {selectedProject.description}
                        </p>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', borderTop: '1px solid var(--border-hairline)', borderBottom: '1px solid var(--border-hairline)', padding: '1.25rem 0' }}>
                        <div>
                          <span style={{ display: 'block', marginBottom: '0.2rem', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Role</span>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 700 }}>{selectedProject.role || (selectedProject.category === 'it' ? 'Lead Developer' : 'UI/UX Designer')}</span>
                        </div>
                        <div>
                          <span style={{ display: 'block', marginBottom: '0.2rem', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Year</span>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 700 }}>{selectedProject.year || '2026'}</span>
                        </div>
                      </div>

                      {selectedProject.tags?.length > 0 && (
                        <div>
                          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Technologies & Tags</h4>
                          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                            {selectedProject.tags.map((t: string) => (
                              <span key={t} style={{ fontSize: '0.68rem', fontWeight: 600, padding: '0.3rem 0.65rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-hairline)', borderRadius: '4px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedProject.link && (
                        <div>
                          <a 
                            href={selectedProject.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{ 
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              background: 'var(--text-primary)', 
                              color: 'var(--bg-primary)', 
                              padding: '0.75rem 1.5rem', 
                              borderRadius: '4px', 
                              fontSize: '0.825rem', 
                              fontWeight: 700, 
                              textDecoration: 'none',
                              fontFamily: 'var(--font-mono)'
                            }}
                          >
                            Visit Project ↗
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </main>
      )}
    </>
  );
}
