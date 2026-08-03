'use client';

import { client, urlFor } from "@/sanity/client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import MediumArticles from "@/components/MediumArticles";
import DesignSection from "@/components/DesignSection";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [itViewMode, setItViewMode] = useState<'grid' | 'table'>('grid');
  const [itFilter, setItFilter] = useState<string>('all');
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTopPos, setScrollTopPos] = useState(0);

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
    async function fetchData() {
      const query = `{
        "projects": *[_type == "project"] | order(_createdAt desc) {
          _id, title, description, tags, "slug": slug.current, image, featured, link, year, subtitle, category, role, deviceType,
          mediaType, videoUrl, layoutSize,
          "gallery": gallery[].asset->url
        },
        "bio": *[_type == "bio"] | order(_updatedAt desc)[0] {
          ...,
          "avatarUrl": avatar.asset->url,
          socialLinks[] { platform, url }
        },
        "experiences": *[_type == "experience"] | order(startDate desc) {
          _id, company, role, startDate, endDate, description, "slug": slug.current
        },
        "education": *[_type == "education"] | order(startDate desc) {
          _id, school, degree, startDate, endDate, details
        },
        "honors": *[_type == "honor"] | order(date desc) {
          _id, title, issuer, date
        },
        "certificates": *[_type == "certificate"] | order(date desc) {
          _id, title, issuer, date, "imageUrl": image.asset->url
        },
        "organizations": *[_type == "organization"] | order(startDate desc) {
          _id, role, organization, period
        },
        "landingPage": *[_type == "landingPage"][0] {
          ...,
          itProjectsOrder[]->{
            _id, title, description, tags, "slug": slug.current, image, featured, link, year, subtitle, category, role, deviceType,
            mediaType, videoUrl, layoutSize,
            "gallery": gallery[].asset->url
          },
          designProjectsOrder[]->{
            _id, title, description, tags, "slug": slug.current, image, featured, link, year, subtitle, category, role, deviceType,
            mediaType, videoUrl, layoutSize,
            "gallery": gallery[].asset->url
          }
        }
      }`;
      try {
        const result = await client.fetch(query);
        setData(result);
      } catch (err) {
        console.error("Failed to fetch data from Sanity:", err);
        setData({});
      }
    }
    fetchData();
  }, []);

  const { projects = [], bio = {} } = data || {};
  
  const displayBio = {
    name: bio?.name || "HILMAN ZAHRAWA BUDIARTO",
    headline: bio?.headline || "Fullstack Developer | UI UX Designer",
    about: bio?.about || "Business Information System student based in Malang and a recipient of the Djarum Beasiswa Plus scholarship. Skilled in software development, UI/UX design, and video editing. Experienced as a Chairman of Information Technology Student Association (HMTI), successfully leading 11 programs and coordinating 5 departments. Accustomed to working in a team, taking initiative, and being adaptive in various situations.",
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
      {data && (
        <main style={{ background: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-primary)' }}>
          
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
            
            {/* SEAMLESS HERO PROFILE SECTION */}
            <section id="hero" style={{ marginBottom: '5rem', paddingBottom: '4rem', borderBottom: '1px solid var(--border-hairline)' }}>
              <div className="hero-seamless-grid">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.75rem', background: '#DCFCE7', border: '1px solid #86EFAC', borderRadius: '4px', fontSize: '0.725rem', fontWeight: 700, color: '#15803D', fontFamily: 'var(--font-mono)' }}>
                      ● Available for Hire & Freelance
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                      #HZ-2026
                    </span>
                  </div>

                  <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.035em', marginBottom: '1.25rem' }}>
                    Engineering Scalable Web Products & Iconic Brand Systems.
                  </h1>

                  <p style={{ fontSize: '1.1rem', lineHeight: '1.65', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '640px' }}>
                    {displayBio.about}
                  </p>

                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <a 
                      href={`https://wa.me/${displayBio.whatsapp}?text=Hello%20Hilman,%20I%20would%20like%20to%20consult%20about%20a%20project`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ background: 'var(--text-primary)', color: '#FFFFFF', padding: '0.8rem 1.6rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-mono)' }}
                    >
                      Free Consultation via WhatsApp ↗
                    </a>
                    <a 
                      href={`mailto:${displayBio.email}`}
                      style={{ background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-hairline)', padding: '0.8rem 1.6rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-mono)' }}
                    >
                      Send Email ✉
                    </a>
                  </div>
                </div>

                {/* Portrait & Track Record Summary */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start' }}>
                  {displayBio.avatarUrl && (
                    <div style={{ width: '180px', height: '180px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-hairline)', background: 'var(--bg-tertiary)' }}>
                      <img src={displayBio.avatarUrl} alt={displayBio.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                    </div>
                  )}

                  <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', borderTop: '1px solid var(--border-hairline)', paddingTop: '1.5rem' }}>
                    <div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>100%</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>Client Satisfaction</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>15+</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>Projects Completed</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>100%</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>On-Time Delivery</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>3+ Years</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>Experience</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEAMLESS SERVICES SECTION */}
            <section id="services" style={{ marginBottom: '5.5rem' }}>
              <div className="section-header-seamless">
                <h2 className="section-title-seamless">Services & Project Specializations</h2>
                <span className="section-tag">01 / SERVICES</span>
              </div>

              <div className="seamless-service-grid">
                
                {/* 1. WEB & SAAS */}
                <div className="seamless-service-card">
                  <div>
                    <div className="service-card-header" style={{ marginBottom: '1.25rem' }}>
                      <div className="service-card-icon">
                        <img src="/icon-dev.png" alt="Development" />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)' }}>01 / DEVELOPMENT</span>
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
                </div>

                {/* 2. BRANDING & UI/UX */}
                <div className="seamless-service-card">
                  <div>
                    <div className="service-card-header" style={{ marginBottom: '1.25rem' }}>
                      <div className="service-card-icon">
                        <img src="/icon-branding.png" alt="Branding" />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)' }}>02 / BRANDING & UI/UX</span>
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
                </div>

                {/* 3. AUTOMATION */}
                <div className="seamless-service-card">
                  <div>
                    <div className="service-card-header" style={{ marginBottom: '1.25rem' }}>
                      <div className="service-card-icon">
                        <img src="/icon-script.png" alt="Apps Script" />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)' }}>03 / AUTOMATION</span>
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
                </div>
              </div>
            </section>

            {/* SEAMLESS IT PROJECTS SECTION */}
            <section id="it" style={{ marginBottom: '5.5rem' }}>
              <div className="section-header-seamless" style={{ alignItems: 'center' }}>
                <div>
                  <h2 className="section-title-seamless">Software & Web Engineering Projects</h2>
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
                    onClick={() => setItViewMode('table')}
                    className={`view-btn ${itViewMode === 'table' ? 'active' : ''}`}
                  >
                    <span>☰</span> Executive Table
                  </button>
                </div>
              </div>

              {/* Filter Pills */}
              <div className="filter-pills">
                <button
                  onClick={() => setItFilter('all')}
                  className={`filter-pill ${itFilter === 'all' ? 'active' : ''}`}
                >
                  All Projects ({itProjects.length})
                </button>
                <button
                  onClick={() => setItFilter('saas')}
                  className={`filter-pill ${itFilter === 'saas' ? 'active' : ''}`}
                >
                  SaaS & Platforms
                </button>
                <button
                  onClick={() => setItFilter('web')}
                  className={`filter-pill ${itFilter === 'web' ? 'active' : ''}`}
                >
                  Web Apps & Portals
                </button>
              </div>

              {itViewMode === 'grid' ? (
                <div className="bento-projects-grid">
                  {filteredItProjects.map((project: any, index: number) => (
                    <motion.div
                      key={project._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="project-bento-card"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="bento-img-container">
                        {project.image ? (
                          <img src={urlFor(project.image).width(800).url()} alt={project.title} loading="lazy" />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                            ⚙️
                          </div>
                        )}
                        
                        {/* Top floating status badge */}
                        <div style={{ position: 'absolute', top: '0.85rem', left: '0.85rem', zIndex: 2 }}>
                          {project.featured ? (
                            <span className="featured-star-badge">★ Featured</span>
                          ) : (
                            <span className="live-pulse-badge">
                              <span className="pulse-dot" /> Live System
                            </span>
                          )}
                        </div>

                        <div style={{ position: 'absolute', top: '0.85rem', right: '0.85rem', zIndex: 2 }}>
                          <span style={{ padding: '0.25rem 0.6rem', background: 'rgba(9, 9, 11, 0.8)', color: '#FFFFFF', borderRadius: '4px', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', fontWeight: 700, backdropFilter: 'blur(6px)' }}>
                            {project.year || '2026'}
                          </span>
                        </div>
                      </div>

                      <div className="bento-card-body">
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                            <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                              {project.role || 'Full-Stack Developer'}
                            </span>
                          </div>
                          <h3 className="bento-project-title">{project.title}</h3>
                          <p className="bento-project-subtitle" style={{ marginTop: '0.4rem' }}>
                            {project.subtitle || project.description}
                          </p>
                        </div>

                        <div>
                          {project.tags?.length > 0 && (
                            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                              {project.tags.slice(0, 4).map((tag: string) => (
                                <span key={tag} className="tech-tag-chip">{tag}</span>
                              ))}
                            </div>
                          )}

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-hairline)' }}>
                            <span className="bento-action-btn">
                              Explore Project ↗
                            </span>
                            <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)' }}>
                              {project.category?.toUpperCase() || 'IT'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
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
                              style={{ background: 'var(--text-primary)', color: '#FFFFFF', border: 'none', padding: '0.45rem 0.9rem', borderRadius: '4px', fontSize: '0.725rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
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
            </section>

            {/* SEAMLESS DESIGN SECTION */}
            <section id="design" style={{ marginBottom: '5.5rem' }}>
              <div className="section-header-seamless">
                <h2 className="section-title-seamless">UI/UX & Creative Portfolio</h2>
                <span className="section-tag">03 / CREATIVE & DESIGN</span>
              </div>

              <DesignSection 
                projects={designProjects} 
                onProjectClick={(project) => setSelectedProject(project)} 
              />
            </section>

            {/* SEAMLESS ABOUT SECTION */}
            <section id="about" style={{ marginBottom: '5.5rem' }}>
              <div className="section-header-seamless">
                <h2 className="section-title-seamless">Experience & Credentials</h2>
                <span className="section-tag">04 / BACKGROUND</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: '3.5rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem', color: 'var(--text-muted)' }}>Experience</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
                    {(data.experiences?.length > 0 ? data.experiences : [
                      { _id: "e1", role: "HRIS Developer – HCM Division", company: "PT PAL Indonesia (Persero)", startDate: "2026", displayDate: "April 2026 - Present" },
                      { _id: "e2", role: "Creative Strategist", company: "Mandala Pure Love", startDate: "2025", displayDate: "Sept 2025 - Present" },
                      { _id: "e3", role: "Web Developer", company: "Mandala Pure Love", startDate: "2025", displayDate: "Dec 2025 - Apr 2026" },
                      { _id: "e4", role: "Social Media Specialist", company: "NZ Box Smart Laundry", startDate: "2026", displayDate: "Feb 2026 - Apr 2026" },
                      { _id: "e5", role: "UI/UX Designer", company: "Social Economic Accelerator Lab", startDate: "2025", displayDate: "Aug 2025 - Dec 2025" },
                      { _id: "e6", role: "Chairman", company: "HMTI Polinema", startDate: "2024", displayDate: "Feb 2024 - Feb 2025" },
                      { _id: "e7", role: "Organizing Committee", company: "HMTI Polinema", startDate: "2023", displayDate: "Feb 2023 - Feb 2024" },
                      { _id: "e8", role: "Debate Mentor", company: "IT Dept English Community", startDate: "2023", displayDate: "Dec 2023 - Feb 2025" },
                    ]).map((exp: any) => (
                      <div key={exp._id} style={{ borderBottom: '1px solid var(--border-hairline)', paddingBottom: '0.85rem' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 800 }}>{exp.role}</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{exp.company} • {exp.displayDate || (exp.startDate?.split('-')[0] || 'Present')}</p>
                      </div>
                    ))}
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem', color: 'var(--text-muted)' }}>Education</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {(data.education?.length > 0 ? data.education : [
                      { _id: "edu1", school: "Politeknik Negeri Malang", degree: "Business Information System", startDate: "Aug 2022 - 2026" },
                      { _id: "edu2", school: "SMA Negeri 1 Malang", degree: "Mathematics and Natural Science", startDate: "Jul 2019 - May 2022" },
                    ]).map((edu: any) => (
                      <div key={edu._id} style={{ borderBottom: '1px solid var(--border-hairline)', paddingBottom: '0.85rem' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 800 }}>{edu.school}</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{edu.degree} • {edu.startDate}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem', color: 'var(--text-muted)' }}>Skills & Expertise</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
                    {displayBio.skills.map((skill: string) => (
                      <span key={skill} style={{ fontSize: '0.725rem', fontWeight: 700, padding: '0.3rem 0.7rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '4px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem', color: 'var(--text-muted)' }}>Certificates</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {(data.certificates?.length > 0 ? data.certificates : [
                      { _id: "cert1", title: "2nd Best Novice Team International I&T Open Debate Competition", issuer: "Award", date: "2024" },
                      { _id: "cert2", title: "2nd Place Video Competition Expo Kelembagaan OKI Polinema", issuer: "Award", date: "2023" },
                      { _id: "cert3", title: "Finalist Poster Infographic Design 4C National Competition", issuer: "Award", date: "2023" },
                      { _id: "cert4", title: "2nd Runner Up IT Poly Debate Cup", issuer: "Award", date: "2024" },
                      { _id: "cert5", title: "How to Validate Your Social Project Leadership Program", issuer: "Innovillage", date: "2025" },
                      { _id: "cert6", title: "Communicating for Community Engagement and Influence", issuer: "Innovillage", date: "2025" },
                      { _id: "cert7", title: "Memulai Pemrograman dengan Python", issuer: "Dicoding", date: "2024" },
                      { _id: "cert8", title: "Belajar Dasar AI", issuer: "Dicoding", date: "2024" },
                    ]).map((cert: any) => (
                      <div key={cert._id} style={{ border: '1px solid var(--border-light)', borderRadius: '6px', padding: '0.75rem', background: 'var(--bg-secondary)' }}>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: 800, lineHeight: 1.3 }}>{cert.title}</h4>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>{cert.issuer} • {cert.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* SEAMLESS MEDIUM SECTION */}
            <section id="medium" style={{ marginBottom: '5.5rem' }}>
              <div className="section-header-seamless">
                <h2 className="section-title-seamless">Articles & Publications</h2>
                <span className="section-tag">05 / ARTICLES</span>
              </div>

              <MediumArticles username={displayBio.mediumUsername} />
            </section>

            {/* SEAMLESS BOTTOM CTA BANNER */}
            <section id="contact-cta" style={{ padding: '4.5rem 2rem', background: '#09090B', color: '#FFFFFF', borderRadius: '8px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', marginBottom: '3rem' }}>
              <span style={{ fontSize: '0.725rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#A1A1AA', letterSpacing: '0.12em' }}>INITIATE A PROJECT</span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em', maxWidth: '720px', lineHeight: 1.25 }}>
                Let's Bring Your Digital Vision to Life with Hilman Zahrawa.
              </h2>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
                <a 
                  href={`https://wa.me/${displayBio.whatsapp}?text=Hello%20Hilman,%20I%20would%20like%20to%20discuss%20a%20project`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: '#FFFFFF', color: '#09090B', padding: '0.8rem 1.8rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 800, textDecoration: 'none', fontFamily: 'var(--font-mono)' }}
                >
                  Chat on WhatsApp 💬
                </a>
                <a 
                  href={`mailto:${displayBio.email}`}
                  style={{ background: 'transparent', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)', padding: '0.8rem 1.8rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 800, textDecoration: 'none', fontFamily: 'var(--font-mono)' }}
                >
                  Send Email ✉️
                </a>
              </div>
            </section>

          </div>

          {/* SEAMLESS FOOTER */}
          <footer style={{ padding: '3.5rem 0', borderTop: '1px solid var(--border-hairline)', background: 'var(--bg-secondary)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
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
                <div style={{ position: 'relative', margin: '0 auto', maxWidth: '1536px', width: '100%', padding: '2rem 0', minHeight: 'calc(100vh - 8rem)', display: 'flex', alignItems: 'center' }}>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    style={{ 
                      position: 'fixed', 
                      right: '2rem', 
                      top: '2rem', 
                      background: 'var(--text-primary)', 
                      border: 'none', 
                      color: '#FFFFFF', 
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
                          height: selectedProject.deviceType === 'mobile' ? '80vh' : '75vh', 
                          background: 'var(--bg-tertiary)', 
                          position: 'relative', 
                          overflow: 'hidden',
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
                              height: '100%', 
                              overflowY: 'auto',
                              cursor: isDragging ? 'grabbing' : 'grab',
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
                                  <div style={{ width: '100%', height: '100%', background: '#000' }}>
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
                                        color: '#FFFFFF',
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
                                  style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'var(--text-primary)', border: 'none', color: '#FFFFFF', width: '2.2rem', height: '2.2rem', borderRadius: '50%', cursor: 'pointer', zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}
                                >
                                  ←
                                </button>
                                <button 
                                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'var(--text-primary)', border: 'none', color: '#FFFFFF', width: '2.2rem', height: '2.2rem', borderRadius: '50%', cursor: 'pointer', zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}
                                >
                                  →
                                </button>
                                <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'var(--text-primary)', color: '#FFFFFF', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700, zIndex: 30 }}>
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
                              color: '#FFFFFF', 
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
