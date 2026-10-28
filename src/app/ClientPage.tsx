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
  GraduationCap, 
  Briefcase, 
  Code2, 
  Check, 
  Sparkles,
  BookOpen
} from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [processHovered, setProcessHovered] = useState(false);
  const [hoveredProcessCard, setHoveredProcessCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Authentic Hilman Zahrawa Projects
  const showcaseWorks = [
    {
      id: "brewtech-1",
      _id: "1",
      title: "Brewtech",
      year: "2026",
      subtitle: "Vocational education platform empowering disabled baristas.",
      tags: ["Next.js", "TypeScript", "SaaS", "Accessibility"],
      description: "Vocational learning platform that empowers individuals with disabilities into certified barista talents through tailored interactive modules and curriculum management under the Innovillage program.",
      slug: "brewtech",
      category: "SaaS & LMS",
      subtag: "Social Impact",
      role: "Full-Stack Developer & UI/UX",
      stack: "Next.js · TypeScript · Supabase · Tailwind",
      outcome: "Empowering 50+ disabled youth through structured digital vocational training and barista job placement pipelines.",
      previewType: "brewtech"
    },
    {
      id: "profile-2",
      _id: "2",
      title: "ProFile+",
      year: "2025",
      subtitle: "Employee lifecycle & HR management suite.",
      tags: ["React", "UI/UX", "HR Management", "Analytics"],
      description: "Comprehensive enterprise HR platform supporting personnel data verification, daily attendance tracking, payroll workflows, and employee performance analytics.",
      slug: "profile-plus",
      category: "HRIS Platform",
      subtag: "UI/UX & Frontend",
      role: "UI/UX Designer & Frontend Engineer",
      stack: "React · TailwindCSS · Node.js · REST APIs",
      outcome: "Centralized organizational data operations, cutting manual document verification and administrative time by 40%.",
      previewType: "profile"
    },
    {
      id: "disnakertrans-3",
      _id: "3",
      title: "Disnakertrans Jatim Portal",
      year: "2025",
      subtitle: "Provincial public labor service portal.",
      tags: ["Web App", "Public Sector", "Laravel", "MySQL"],
      description: "Modern government web portal engineered to deliver accessible provincial public services, labor dispute resolutions, and transparent citizen grievance reporting across 38 regencies.",
      slug: "disnakertrans-jatim",
      category: "GovTech",
      subtag: "Fullstack Web",
      role: "Full-Stack Web Developer",
      stack: "Laravel · MySQL · Bootstrap · Livewire",
      outcome: "Standardized regional labor public access for 38 regencies across East Java with responsive WCAG-friendly accessibility.",
      previewType: "disnakertrans"
    },
    {
      id: "mandala-4",
      _id: "4",
      title: "Mandala Pure Love",
      year: "2025",
      subtitle: "Community socio-entrepreneurship digital platform.",
      tags: ["Web Platform", "Socio-tech", "Cloud"],
      description: "Empowerment platform connecting local community entrepreneurs, crowd-financing micro-grants, and local business mentorship networks, promoting disability inclusion and barista internships.",
      slug: "mandala",
      category: "Community Platform",
      subtag: "Creative & Web",
      role: "Lead Web Developer & Creative Strategist",
      stack: "Next.js · Node.js · Cloud Architecture",
      outcome: "Connected 120+ micro-businesses with mentorship programs and automated fundraising progress tracking.",
      previewType: "mandala"
    },
    {
      id: "nzbox-5",
      _id: "5",
      title: "NZ Box Laundry",
      year: "2026",
      subtitle: "Retail strategy & digital operations system.",
      tags: ["Digital Marketing", "Retail System", "Figma", "Brand Strategy"],
      description: "Data-driven customer retention system and digital marketing strategy for retail 24-hour self-service laundry chains.",
      slug: "nz-box",
      category: "Operations & Growth",
      subtag: "Marketing Strategy",
      role: "Digital Strategist & UI Designer",
      stack: "Figma · Analytics · Brand Strategy",
      outcome: "Boosted recurring customer return rates by 28% via tailored digital loyalty loops.",
      previewType: "nzbox"
    },
    {
      id: "jti-6",
      _id: "6",
      title: "JTI Information System",
      year: "2025",
      subtitle: "Internal workload management system for academic faculty.",
      tags: ["Laravel", "MySQL", "Bootstrap", "Livewire"],
      description: "Designed & developed an internal workload management system for academic staff, digitizing trimester schedule coordination and departmental reporting.",
      slug: "jti-information-system",
      category: "Enterprise System",
      subtag: "Fullstack Dev",
      role: "Full-Stack Developer",
      stack: "Laravel · MySQL · Bootstrap · Livewire",
      outcome: "Centralized activity & workload management, eliminating duplicate filing and reducing administrative overhead by 45%.",
      previewType: "jti"
    }
  ];

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
          <a href="#about" style={{ textDecoration: 'none', color: '#475569', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>About</a>
          <a href="#specializations" style={{ textDecoration: 'none', color: '#475569', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>Services</a>
          <a href="#works" style={{ textDecoration: 'none', color: '#475569', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>Works</a>
          <a href="#experience" style={{ textDecoration: 'none', color: '#475569', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>Experience</a>
          <a href="#articles" style={{ textDecoration: 'none', color: '#475569', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>Articles</a>
          <a href={`mailto:${email}`} style={{ textDecoration: 'none', color: '#475569', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>Contact</a>
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
            <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, fontSize: '0.95rem' }}>About Me</a>
            <a href="#specializations" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, fontSize: '0.95rem' }}>Services</a>
            <a href="#works" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, fontSize: '0.95rem' }}>Selected Works</a>
            <a href="#experience" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, fontSize: '0.95rem' }}>Experience & Awards</a>
            <a href="#articles" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, fontSize: '0.95rem' }}>Articles</a>
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

            {/* Center: Cutout Character Portrait */}
            <div className="hero-portrait-wrap">
              <img 
                src="/himmel_bust.png" 
                alt={`${name} - ${headline}`}
                className="hero-portrait-img"
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
         3. BENTO SHOWCASE (Hilman's Real Featured Projects)
         ========================================================================= */}
      <section className="bento-section-wrapper" style={{
        padding: '2rem 1.5rem 5rem 1.5rem',
        maxWidth: '1380px',
        margin: '0 auto'
      }}>
        <div className="bento-container-box" style={{
          borderRadius: '36px',
          padding: '2.5rem',
          background: 'radial-gradient(ellipse at 50% 40%, #7dd3fc 0%, #38bdf8 35%, #0ea5e9 75%, #0284c7 100%)',
          boxShadow: '0 30px 70px -15px rgba(14, 165, 233, 0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div className="bento-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '1.75rem',
            position: 'relative'
          }}>
            {/* 1. Top-Left: Brewtech (7 cols) */}
            <motion.div
              className="bento-col-span-7"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedProject(showcaseWorks[0])}
              style={{
                gridColumn: 'span 7',
                background: '#ffffff',
                borderRadius: '24px',
                padding: '1.75rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                minHeight: '290px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 800 }}>
                      ☕
                    </div>
                    <div>
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', display: 'block' }}>Brewtech Vocational Platform</span>
                      <span style={{ fontSize: '0.72rem', color: '#0284c7', fontWeight: 600 }}>Innovillage Program · Top 180 Social Projects</span>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.72rem', background: '#f0fdf4', color: '#16a34a', padding: '0.25rem 0.65rem', borderRadius: '9999px', fontWeight: 700 }}>
                    Live LMS v2.0
                  </span>
                </div>

                <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
                  Vocational education platform empowering youth with disabilities into certified barista talents with accessible interactive curriculum.
                </p>
              </div>

              {/* Metrics Row */}
              <div className="bento-metrics-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem', marginBottom: '0.75rem' }}>
                <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '12px' }}>
                  <span style={{ fontSize: '0.68rem', color: '#64748b', display: 'block' }}>Youth Empowered</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>50+ Students</span>
                </div>
                <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '12px' }}>
                  <span style={{ fontSize: '0.68rem', color: '#64748b', display: 'block' }}>Accessibility</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0284c7' }}>100% WCAG</span>
                </div>
                <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '12px' }}>
                  <span style={{ fontSize: '0.68rem', color: '#64748b', display: 'block' }}>Completion</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#16a34a' }}>98.4%</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem', color: '#64748b', paddingTop: '0.5rem', borderTop: '1px solid #f1f5f9' }}>
                <span>Stack: Next.js · TypeScript · Supabase · Tailwind</span>
                <span style={{ color: '#0284c7', fontWeight: 700 }}>View Details →</span>
              </div>
            </motion.div>

            {/* 2. Top-Right: ProFile+ HR Suite (5 cols) */}
            <motion.div
              className="bento-col-span-5"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedProject(showcaseWorks[1])}
              style={{
                gridColumn: 'span 5',
                background: '#ffffff',
                borderRadius: '24px',
                padding: '1.75rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                minHeight: '290px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <span style={{ fontSize: '0.72rem', background: '#eff6ff', color: '#1d4ed8', padding: '0.25rem 0.65rem', borderRadius: '9999px', fontWeight: 700 }}>
                    SEAL Accelerator
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>HRIS Suite</span>
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.4rem 0' }}>ProFile+ HR Management</h4>
                <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                  Centralized employee lifecycle management, attendance tracking telemetry, and verified payroll pipelines.
                </p>
              </div>

              <div style={{ background: '#f8fafc', padding: '0.9rem', borderRadius: '14px', margin: '0.85rem 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.4rem' }}>
                  <span style={{ color: '#64748b' }}>Administrative Efficiency:</span>
                  <span style={{ fontWeight: 700, color: '#0284c7' }}>+40% Time Saved</span>
                </div>
                <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '85%', height: '100%', background: '#0284c7' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem', color: '#64748b' }}>
                <span>Role: UI/UX & Frontend</span>
                <span style={{ color: '#0284c7', fontWeight: 700 }}>Explore System →</span>
              </div>
            </motion.div>

            {/* 3. Bottom-Left: Disnakertrans Jatim (5 cols) */}
            <motion.div
              className="bento-col-span-5"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedProject(showcaseWorks[2])}
              style={{
                gridColumn: 'span 5',
                background: '#ffffff',
                borderRadius: '24px',
                padding: '1.75rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                minHeight: '290px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                  <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>GovTech Portal · East Java</span>
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.4rem 0' }}>Disnakertrans Jatim</h4>
                <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                  Accessible public labor portal serving 38 regencies across East Java with dispute resolution and public reporting.
                </p>
              </div>

              <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '0.85rem' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', marginBottom: '0.2rem' }}>Public Coverage:</span>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>38 Regencies & Cities</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem', color: '#64748b' }}>
                <span>Laravel · MySQL · Accessible UX</span>
                <span style={{ color: '#0284c7', fontWeight: 700 }}>View Portal →</span>
              </div>
            </motion.div>

            {/* 4. Bottom-Right: Mandala Pure Love & NZ Box (7 cols) */}
            <motion.div
              className="bento-col-span-7 bento-card-furniture"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedProject(showcaseWorks[3])}
              style={{
                gridColumn: 'span 7',
                background: '#ffffff',
                borderRadius: '24px',
                padding: '1.75rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                minHeight: '290px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Socio-Tech & Creative Strategy
                  </span>
                  <span style={{ fontSize: '0.72rem', background: '#fef3c7', color: '#b45309', padding: '0.25rem 0.65rem', borderRadius: '9999px', fontWeight: 700 }}>
                    ★ Djarum Beasiswa Plus Award
                  </span>
                </div>
                <h4 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                  Mandala Pure Love & NZ Box Smart Laundry
                </h4>
                <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                  Inclusive youth barista development ('The Cup We Share' at SLB YPAC Malang) alongside automated retail loyalty loops that elevated retention by 28%.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', margin: '0.85rem 0' }}>
                <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '12px' }}>
                  <span style={{ fontSize: '0.68rem', color: '#64748b', display: 'block' }}>Micro-Businesses</span>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>120+ Connected</span>
                </div>
                <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '12px' }}>
                  <span style={{ fontSize: '0.68rem', color: '#64748b', display: 'block' }}>Customer Retention</span>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: '#0284c7' }}>+28% Lift</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem', color: '#64748b' }}>
                <span>Strategy · Fullstack Web · Community Impact</span>
                <span style={{ color: '#0284c7', fontWeight: 700 }}>Explore Case Studies →</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
                  <span style={{ fontSize: '2rem', fontWeight: 300, color: '#0ea5e9', lineHeight: 1 }}>{svc.num}</span>
                  <span style={{ fontSize: '0.72rem', background: '#f1f5f9', color: '#475569', padding: '0.25rem 0.65rem', borderRadius: '9999px', fontWeight: 700 }}>
                    {svc.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.75rem' }}>
                  {svc.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.55, marginBottom: '1.5rem' }}>
                  {svc.desc}
                </p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {svc.checks.map((chk, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.84rem', color: '#334155', lineHeight: 1.45 }}>
                      <Check size={16} color="#0284c7" style={{ flexShrink: 0, marginTop: '2px' }} />
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

        {/* Real Impact Testimonials */}
        <div className="process-testimonials-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '4rem',
          maxWidth: '1080px',
          margin: '7rem auto 0 auto',
          alignItems: 'flex-start'
        }}>
          {/* Testimonial 1 */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '1.75rem',
            border: '1px solid #f1f5f9',
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            position: 'relative'
          }}>
            <span style={{ position: 'absolute', top: '1.25rem', right: '1.5rem', fontSize: '1.5rem', color: '#0f172a', fontWeight: 700 }}>”</span>
            <p style={{ fontSize: '0.95rem', color: '#1e293b', lineHeight: 1.6, margin: '0 0 1.5rem 0', fontWeight: 400 }}>
              "Hilman's technical execution and dedication to inclusive design helped Brewtech empower youth with disabilities through accessible digital training."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                IN
              </div>
              <div>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a', display: 'block' }}>Innovillage Partner</span>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Social Impact Program</span>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="process-testimonial-staggered" style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '1.75rem',
            border: '1px solid #f1f5f9',
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            position: 'relative',
            marginTop: '3.5rem'
          }}>
            <span style={{ position: 'absolute', top: '1.25rem', right: '1.5rem', fontSize: '1.5rem', color: '#0f172a', fontWeight: 700 }}>”</span>
            <p style={{ fontSize: '0.95rem', color: '#1e293b', lineHeight: 1.6, margin: '0 0 1.5rem 0', fontWeight: 400 }}>
              "From database architecture to intuitive user interfaces, Hilman delivered our workflow systems with exceptional quality, speed, and attention to detail."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                SL
              </div>
              <div>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a', display: 'block' }}>SEAL Accelerator Lead</span>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Collaborator & Product Director</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         7. SELECTED WORKS (Hilman's Real Work Showcase)
         ========================================================================= */}
      <section id="works" className="works-section" style={{
        padding: '5rem 1.5rem',
        maxWidth: '1380px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="editorial-kicker">
            / Portfolio Showcase /
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

        <div className="works-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
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
              {/* Project Card Preview */}
              <div className="work-preview-window" style={{
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
                {work.previewType === 'brewtech' && (
                  <div style={{ width: '100%', height: '100%', background: '#ffffff', borderRadius: '16px', padding: '1.5rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>☕ Brewtech Barista LMS</span>
                      <span style={{ fontSize: '0.75rem', color: '#0ea5e9', background: '#f0f9ff', padding: '0.2rem 0.6rem', borderRadius: '12px', fontWeight: 600 }}>Innovillage 2026</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', height: '120px' }}>
                      <div style={{ width: '45%', height: '100%', borderRadius: '12px', background: '#e0f2fe', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#0284c7', fontWeight: 700, fontSize: '0.9rem', gap: '0.25rem' }}>
                        <span>50+</span>
                        <span style={{ fontSize: '0.7rem', fontWeight: 500, color: '#0369a1' }}>Youth Certified</span>
                      </div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ height: '24px', background: '#f1f5f9', borderRadius: '6px', width: '90%', display: 'flex', alignItems: 'center', paddingLeft: '8px', fontSize: '0.7rem', color: '#64748b' }}>Curriculum Modules</div>
                        <div style={{ height: '24px', background: '#f1f5f9', borderRadius: '6px', width: '75%', display: 'flex', alignItems: 'center', paddingLeft: '8px', fontSize: '0.7rem', color: '#64748b' }}>Accessibility Checks</div>
                        <div style={{ height: '24px', background: '#0284c7', borderRadius: '6px', width: '95%', display: 'flex', alignItems: 'center', paddingLeft: '8px', fontSize: '0.7rem', color: '#ffffff', fontWeight: 600 }}>Internship Pipeline</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Tailored Interactive Vocational Learning System</span>
                  </div>
                )}

                {work.previewType === 'profile' && (
                  <div style={{ width: '100%', height: '100%', background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#38bdf8' }}>ProFile+ HR Management</span>
                      <span style={{ fontSize: '0.72rem', background: '#1e293b', color: '#94a3b8', padding: '0.2rem 0.5rem', borderRadius: '10px' }}>Enterprise Suite</span>
                    </div>
                    <div>
                      <h5 style={{ fontSize: '1.15rem', margin: '0 0 0.4rem 0', fontWeight: 600 }}>Workforce Telemetry & Lifecycle</h5>
                      <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>40% manual document verification reduction</p>
                    </div>
                    <div style={{ height: '6px', background: '#334155', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: '85%', height: '100%', background: '#38bdf8' }} />
                    </div>
                  </div>
                )}

                {work.previewType === 'disnakertrans' && (
                  <div style={{ width: '100%', height: '100%', background: '#ffffff', borderRadius: '16px', padding: '1.5rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>🏛 Disnakertrans Jatim</span>
                      <span style={{ fontSize: '0.72rem', color: '#059669', background: '#ecfdf5', padding: '0.2rem 0.5rem', borderRadius: '10px', fontWeight: 700 }}>Live Gov Portal</span>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>Public Sector Coverage:</span>
                      <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>38 Regencies Across East Java</span>
                      <span style={{ fontSize: '0.72rem', color: '#0284c7', display: 'block', marginTop: '0.25rem' }}>Dispute Resolution & Grievance Reporting</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Standardized WCAG Public Access Portal</span>
                  </div>
                )}

                {work.previewType === 'mandala' && (
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', borderRadius: '16px', padding: '1.5rem', border: '1px solid #bae6fd', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0369a1' }}>♥ Mandala Pure Love</span>
                      <span style={{ fontSize: '0.72rem', background: '#ffffff', color: '#b45309', padding: '0.2rem 0.5rem', borderRadius: '10px', fontWeight: 700 }}>Djarum Award 2026</span>
                    </div>
                    <div>
                      <h5 style={{ fontSize: '1.1rem', margin: '0 0 0.35rem 0', fontWeight: 700, color: '#0f172a' }}>Socio-Tech & Inclusive Baristas</h5>
                      <p style={{ fontSize: '0.78rem', color: '#0369a1', margin: 0 }}>120+ Micro-businesses & youth empowerment</p>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#475569' }}>Next.js · Node.js · Community Impact Platform</span>
                  </div>
                )}

                {work.previewType === 'nzbox' && (
                  <div style={{ width: '100%', height: '100%', background: '#ffffff', borderRadius: '16px', padding: '1.5rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>🧺 NZ Box Smart Laundry</span>
                      <span style={{ fontSize: '0.72rem', color: '#0284c7', background: '#f0f9ff', padding: '0.2rem 0.5rem', borderRadius: '10px', fontWeight: 700 }}>24-Hr Service</span>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>Customer Retention Lift:</span>
                      <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#16a34a' }}>+28% Recurring Loyalty</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Data-driven Marketing & Digital Strategy</span>
                  </div>
                )}

                {work.previewType === 'jti' && (
                  <div style={{ width: '100%', height: '100%', background: '#ffffff', borderRadius: '16px', padding: '1.5rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>📊 JTI Information System</span>
                      <span style={{ fontSize: '0.72rem', color: '#0284c7', background: '#f0f9ff', padding: '0.2rem 0.5rem', borderRadius: '10px', fontWeight: 700 }}>Faculty Ops</span>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>Administrative Overhead:</span>
                      <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0284c7' }}>-45% Reduction</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Laravel · MySQL · Schedule Coordination</span>
                  </div>
                )}
              </div>

              {/* Title & Tags Row */}
              <div className="work-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.5rem' }}>
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
         8. ABOUT & CAREER TIMELINE (Hilman's Real Experience)
         ========================================================================= */}
      <section id="experience" style={{
        padding: '5rem 1.5rem',
        maxWidth: '1240px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="editorial-kicker">
            / Background & Career /
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
          {/* Left: Portrait Card */}
          <div className="about-portrait-card" style={{
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
            <div className="about-portrait-img-wrap" style={{
              width: '100%',
              height: '260px',
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#1e293b',
              marginBottom: '1.25rem'
            }}>
              <img 
                src="/himmel_card.jpg" 
                alt={`${name} - ${headline}`}
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
                  {name}
                </h4>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  {headline}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.85rem' }}>
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8' }}><MessageCircle size={17} /></a>
                <a href={`mailto:${email}`} style={{ color: '#94a3b8' }}><Mail size={17} /></a>
                <a href="https://linkedin.com/in/hilmanzahrawa" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8' }}><Linkedin size={17} /></a>
              </div>
            </div>
          </div>

          {/* Right: Bio & Experience Rows */}
          <div>
            <p style={{
              fontSize: '1.05rem',
              color: '#334155',
              lineHeight: 1.65,
              fontWeight: 400,
              margin: '0 0 2.5rem 0'
            }}>
              {about}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {experiencesList.slice(0, 6).map((exp: any, i: number) => (
                <div 
                  key={i} 
                  className="about-exp-row"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.15rem 0',
                    borderTop: '1px solid #f1f5f9',
                    fontSize: '0.9rem'
                  }}
                >
                  <span className="about-exp-role" style={{ fontWeight: 600, color: '#0f172a', flex: '1 1 40%' }}>
                    {exp.role}
                  </span>
                  <div className="about-exp-company-period" style={{ display: 'contents' }}>
                    <span style={{ color: '#64748b', flex: '1 1 35%' }}>{exp.company}</span>
                    <span style={{ color: '#94a3b8', textAlign: 'right', flex: '1 1 25%' }}>{exp.period || exp.start_date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         9. CREDENTIALS, EDUCATION & AWARDS (from previous website)
         ========================================================================= */}
      <section style={{
        padding: '5rem 1.5rem',
        maxWidth: '1240px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="editorial-kicker">
            / Qualifications /
          </span>
          <h2 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            fontWeight: 400,
            letterSpacing: '-0.025em',
            margin: 0,
            color: '#0f172a'
          }}>
            Education & Honors
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 540px), 1fr))',
          gap: '3rem'
        }}>
          {/* Education Column */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '2.25rem',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
              <GraduationCap size={22} color="#0284c7" />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#0f172a', margin: 0 }}>Education</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {educationList.map((edu: any, idx: number) => (
                <div key={idx} style={{ borderBottom: idx !== educationList.length - 1 ? '1px solid #f1f5f9' : 'none', paddingBottom: idx !== educationList.length - 1 ? '1.5rem' : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>{edu.school}</h4>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>{edu.period || `${edu.start_date} - ${edu.end_date}`}</span>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: '#0284c7', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>{edu.degree}</span>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>{edu.desc || edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Honors & Awards Column */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '2.25rem',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
              <Award size={22} color="#f59e0b" />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#0f172a', margin: 0 }}>Honors & Awards</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {honorsList.slice(0, 4).map((aw: any, idx: number) => (
                <div key={idx} style={{ borderBottom: idx !== 3 ? '1px solid #f1f5f9' : 'none', paddingBottom: idx !== 3 ? '1.25rem' : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>{aw.title}</h4>
                    <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>{aw.year || aw.date}</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#b45309', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>{aw.issuer}</span>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.45, margin: 0 }}>{aw.desc || aw.description}</p>
                </div>
              ))}
            </div>
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
            <a href="#about" style={{ color: '#64748b', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>About</a>
            <a href="#specializations" style={{ color: '#64748b', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>Services</a>
            <a href="#works" style={{ color: '#64748b', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>Portfolio</a>
            <a href="#experience" style={{ color: '#64748b', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>Experience</a>
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
              className="project-modal-box"
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

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0ea5e9', textTransform: 'uppercase' }}>
                  {selectedProject.category}
                </span>
                {selectedProject.subtag && (
                  <span style={{ fontSize: '0.72rem', background: '#f1f5f9', color: '#64748b', padding: '0.15rem 0.5rem', borderRadius: '9999px', fontWeight: 600 }}>
                    {selectedProject.subtag}
                  </span>
                )}
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: 'auto' }}>
                  {selectedProject.year || '2025'}
                </span>
              </div>

              <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#0f172a', margin: '0.25rem 0 1rem 0' }}>
                {selectedProject.title}
              </h2>

              <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {selectedProject.description || selectedProject.desc}
              </p>

              {selectedProject.outcome && (
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.85rem 1rem', borderRadius: '12px', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                    Key Outcome & Social Impact
                  </span>
                  <span style={{ fontSize: '0.84rem', color: '#15803d', lineHeight: 1.45, fontWeight: 500 }}>
                    {selectedProject.outcome}
                  </span>
                </div>
              )}

              {selectedProject.stack && (
                <div style={{ marginBottom: '1.75rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                    Technologies & Architecture
                  </span>
                  <span style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: '#0f172a', background: '#f8fafc', padding: '0.4rem 0.75rem', borderRadius: '8px', display: 'inline-block', border: '1px solid #e2e8f0' }}>
                    {selectedProject.stack}
                  </span>
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                <a
                  href={`https://wa.me/${whatsapp}?text=Hi%20Hilman,%20I'm%20interested%20in%20discussing%20${encodeURIComponent(selectedProject.title)}`}
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
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  Discuss on WhatsApp <ArrowUpRight size={15} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
