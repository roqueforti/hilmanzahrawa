'use client';

import { client, urlFor } from "@/sanity/client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'umum' | 'it' | 'design'>('it');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
    const walk = (y - startY) * 2; // Scroll speed
    sliderRef.current.scrollTop = scrollTopPos - walk;
  };

  useEffect(() => {
    if (selectedProject) {
      document.body.classList.add('cursor-detail-open');
      setCurrentImageIndex(0);
    } else {
      document.body.classList.remove('cursor-detail-open');
    }
  }, [selectedProject]);

  useEffect(() => {
    async function fetchData() {
      const query = `{
        "projects": *[_type == "project"] | order(_createdAt desc) {
          _id, title, description, tags, "slug": slug.current, image, featured, link, year, subtitle, category, role, deviceType,
          "gallery": gallery[].asset->url
        },
        "bio": *[_type == "bio"][0] {
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
        }
      }`;
      const result = await client.fetch(query);
      setData(result);
    }
    fetchData();
  }, []);

  if (!data) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ width: 40, height: 40, border: '4px solid var(--pocari-blue-soft)', borderTopColor: 'transparent', borderRadius: '50%' }} /></div>;

  const { projects, bio, experiences, education, honors } = data;
  
  const displayBio = {
    name: bio?.name || "HILMAN ZAHRAWA BUDIARTO",
    headline: bio?.headline || "Transforming Ideas into Impactful Digital Solutions.",
    about: bio?.about || "Mahasiswa Sistem Informasi Bisnis di Politeknik Negeri Malang dan penerima Djarum Beasiswa Plus dengan minat pada software development, UI/UX design, dan data analysis. Memiliki pengalaman mengembangkan solusi digital sebagai Web Developer dan UI/UX Designer, termasuk membangun platform BrewTech dalam program Innovillage dengan fokus pada arsitektur sistem, pengembangan web, dan optimasi performa aplikasi. Terbiasa merancang produk digital yang scalable, user-centered, dan berbasis kebutuhan sistem.",
    location: bio?.location || "Malang, Indonesia",
    email: bio?.email || "budiarto3788@gmail.com",
    whatsapp: bio?.whatsapp || "6285806003234",
    address: bio?.address || "Jl. Candi Bajang Ratu No. 3-B, Kota Malang",
    avatarUrl: bio?.avatarUrl,
    socialLinks: bio?.socialLinks || [
      { platform: "LinkedIn", url: "https://linkedin.com/in/hilmanzahrawa" },
      { platform: "Portfolio", url: "https://hilmanzahrawa.vercel.app" }
    ],
    skills: bio?.skills || ["Java", "PHP", "Laravel", "SQL", "Python", "JavaScript", "HTML", "CSS", "Figma", "Adobe Photoshop", "Adobe Illustrator", "Power BI", "Looker Studio"]
  };

  const displayProjects = projects?.length > 0 ? projects : [
    { _id: "1", title: "Brewtech", year: "2026", subtitle: "Innovillage", tags: ["SaaS", "LMS", "IT"], description: "Platform pendidikan vokasi disabilitas. Mencetak talenta barista melalui BREWTECH.", slug: "brewtech", category: 'it' },
    { _id: "2", title: "ProFile+", year: "2025", subtitle: "Profile Image Studio", tags: ["UI/UX", "HR"], description: "Platform manajemen SDM yang mendukung pengelolaan data karyawan, absensi, dan kinerja.", slug: "profile-plus", category: 'design' },
    { _id: "3", title: "Disnakertrans Jatim", year: "2025", subtitle: "Government", tags: ["Web", "IT"], description: "Merancang antarmuka website yang modern, aksesibel, dan user-friendly.", slug: "disnakertrans-jatim", category: 'it' },
    { _id: "4", title: "NZ Box Laundry", year: "2026", subtitle: "Marketing", tags: ["Digital Marketing"], description: "Strategi digital marketing berbasis data untuk retensi pelanggan.", slug: "nz-box", category: 'design' },
    { _id: "5", title: "Mandala Pure Love", year: "2025", subtitle: "Community", tags: ["Social"], description: "Pemberdayaan masyarakat dan pengembangan sociopreneurship.", slug: "mandala", category: 'it' },
  ];

  // Sorting projects for sections (Simple filter for demo, usually via Sanity tags)
  const itProjects = displayProjects.filter((p: any) => p.tags?.some((t: string) => ['SaaS', 'LMS', 'Web', 'Dev', 'SQL', 'IT'].includes(t)) || p.category === 'it');
  const designProjects = displayProjects.filter((p: any) => p.tags?.some((t: string) => ['UI/UX', 'Creative', 'Design', 'Visual', 'Logo'].includes(t)) || p.category === 'design');

  const containerVariants: any = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
  };

  return (
    <main style={{ background: 'white', minHeight: '100vh' }}>
      <nav className="switcher-nav">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
            <div style={{ fontWeight: 900, textTransform: 'lowercase', fontSize: '0.8rem', letterSpacing: '0.05em' }}>
              {displayBio.name}
            </div>
            
            {/* The Work Toggle Label */}
            <div 
              className={`work-toggle ${activeTab !== 'umum' ? 'active' : ''}`}
              onClick={() => {
                if (activeTab === 'umum') {
                  setActiveTab('it');
                } else {
                  setActiveTab(activeTab === 'it' ? 'design' : 'it');
                }
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeTab === 'umum' ? 'it' : activeTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'inline-block' }}
                >
                  {activeTab === 'umum' ? 'it' : activeTab}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div>
            <button 
              className={`switcher-btn ${activeTab === 'umum' ? 'active' : ''}`}
              onClick={() => setActiveTab('umum')}
            >
              About
            </button>
          </div>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '10rem' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'umum' && (
            <motion.div key="umum" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
              {/* Ritchie style About: Minimal, side image */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '6rem', alignItems: 'start', padding: '4rem 0' }}>
                <div>
                  <span className="text-meta-compact" style={{ marginBottom: '1.5rem', display: 'block' }}>About</span>
                  <p style={{ maxWidth: '650px', color: 'var(--text-primary)', fontSize: '1.4rem', lineHeight: 1.4, marginBottom: '3rem', fontWeight: 500 }}>
                    {displayBio.about}
                  </p>
                  
                  {/* Row 1: Experience & Education */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                    <div>
                      <h2 className="text-heading-compact" style={{ marginBottom: '2rem', fontSize: '0.75rem' }}>Experience</h2>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {(data.experiences?.length > 0 ? data.experiences : [
                          { _id: "e1", role: "Digital Marketing", company: "NZ Box Smart Laundry", startDate: "2026-02-01" },
                          { _id: "e2", role: "Web Developer", company: "Mandala Pure Love", startDate: "2025-09-01" },
                          { _id: "e3", role: "UI/UX Designer Magang", company: "Profile Image Studio", startDate: "2025-08-01" },
                        ]).map((exp: any) => (
                          <div key={exp._id}>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 800 }}>{exp.role}</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{exp.company} • {exp.startDate.split('-')[0]}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-heading-compact" style={{ marginBottom: '2rem', fontSize: '0.75rem' }}>Education</h2>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {(data.education?.length > 0 ? data.education : [
                          { _id: "edu1", school: "Politeknik Negeri Malang", degree: "D4 Sistem Informasi Bisnis", startDate: "2022" },
                          { _id: "edu2", school: "SMAN 1 Malang", degree: "SMA MIPA", startDate: "2019" },
                        ]).map((edu: any) => (
                          <div key={edu._id}>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 800 }}>{edu.school}</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{edu.degree} • {edu.startDate}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Achievements & Organizations */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginTop: '4rem' }}>
                    <div>
                      <h2 className="text-heading-compact" style={{ marginBottom: '2rem', fontSize: '0.75rem' }}>Achievements</h2>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {(data.honors?.length > 0 ? data.honors : [
                          { _id: "h1", title: "Most Inspiring Community Empowerment", issuer: "Mandala Pure Love", date: "2024" },
                          { _id: "h2", title: "Mawapres Non-Akademik Jurusan TI", issuer: "Polinema", date: "2024" },
                          { _id: "h3", title: "2nd Runner Up - IT Poly Debate Cup", issuer: "Debate Cup", date: "2024" },
                          { _id: "h4", title: "Mentor Debat ITDEC", issuer: "ITDEC", date: "2024" },
                          { _id: "h5", title: "Finalis Desain Poster Infografis", issuer: "4C National", date: "2024" },
                        ]).map((honor: any) => (
                          <div key={honor._id}>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 800 }}>{honor.title}</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{honor.issuer} • {honor.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-heading-compact" style={{ marginBottom: '2rem', fontSize: '0.75rem' }}>Organizations</h2>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {[
                          { id: "o1", role: "Ketua Umum", org: "HMTI Polinema", period: "2024 - 2025" },
                          { id: "o2", role: "Kepala Divisi Pubdekdok", org: "RekaDjuang", period: "2024 - 2025" },
                        ].map((org: any) => (
                          <div key={org.id}>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 800 }}>{org.org}</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{org.role} • {org.period}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Certificates Section */}
                  <div style={{ marginTop: '4rem' }}>
                    <h2 className="text-heading-compact" style={{ marginBottom: '2rem', fontSize: '0.75rem' }}>Certificates</h2>
                    <div className="certificates-grid">
                      {(data.certificates?.length > 0 ? data.certificates : [
                        { _id: "cert1", title: "Memulai Pemrograman dengan Python", issuer: "Dicoding Indonesia", date: "2024" },
                        { _id: "cert2", title: "Belajar Dasar AI", issuer: "Dicoding Indonesia", date: "2024" },
                        { _id: "cert3", title: "Character Building & Leadership", issuer: "Djarum Beasiswa Plus", date: "2024" },
                        { _id: "cert4", title: "Leadership Program", issuer: "Outward Bound Indonesia", date: "2024" },
                      ]).map((cert: any) => (
                        <div key={cert._id} className="certificate-card">
                          <div className="cert-img-wrapper">
                            {cert.imageUrl ? (
                              <img src={cert.imageUrl} alt={cert.title} />
                            ) : (
                              <div className="cert-placeholder">📜</div>
                            )}
                          </div>
                          <div className="cert-info">
                            <h4 className="cert-title">{cert.title}</h4>
                            <p className="cert-meta">{cert.issuer} • {cert.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ width: '100%', aspectRatio: '4/5', overflow: 'hidden', background: 'var(--pocari-blue-airy)', filter: 'grayscale(100%)' }}>
                    {displayBio.avatarUrl && <img src={displayBio.avatarUrl} alt={displayBio.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  <div style={{ marginTop: '2rem', textAlign: 'left' }}>
                    <span className="text-meta-compact" style={{ display: 'block', marginBottom: '1rem' }}>Contact</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                      <a href={`mailto:${displayBio.email}`} style={{ fontSize: '0.85rem', textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 700 }}>{displayBio.email}</a>
                      {displayBio.whatsapp && (
                        <a href={`https://wa.me/${displayBio.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', textDecoration: 'none', color: 'var(--pocari-blue-soft)', fontWeight: 700 }}>WhatsApp: +{displayBio.whatsapp}</a>
                      )}
                    </div>
                    
                    {/* Social Links on About Page */}
                    <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                      {displayBio.socialLinks.map((link: any) => (
                        <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--pocari-blue-soft)', textDecoration: 'none', textTransform: 'lowercase' }}>{link.platform}</a>
                      ))}
                    </div>

                    <div style={{ marginTop: '3rem' }}>
                      <span className="text-meta-compact" style={{ display: 'block', marginBottom: '1.2rem' }}>Expertise</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                        {displayBio.skills.map((skill: string) => (
                          <span key={skill} style={{ fontSize: '0.65rem', fontWeight: 800, padding: '0.3rem 0.8rem', background: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: '4px', color: 'var(--text-secondary)', textTransform: 'lowercase' }}>{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'it' && (
            <motion.div key="it" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Selected IT Projects</h2>
              </div>
              <div className="compact-grid">
                {itProjects.map((project: any) => (
                  <div 
                    key={project._id} 
                    className="card-compact" 
                    onClick={() => setSelectedProject(project)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="img-wrapper">
                      {project.image ? <img src={urlFor(project.image).width(800).url()} alt={project.title} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>⚙️</div>}
                    </div>
                    <div className="content">
                      <div className="metadata-row">
                        <h4 className="title">{project.title}</h4>
                        <span className="year">{project.year || (new Date().getFullYear())}</span>
                      </div>
                      <div className="metadata-row secondary">
                        <p className="subtitle">{project.subtitle || project.description}</p>
                        <div className="tags">
                          {project.tags?.slice(0, 2).map((t: string) => <span key={t}>#{t}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'design' && (
            <motion.div key="design" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Visual Works</h2>
              </div>
              <div className="compact-grid">
                {designProjects.map((project: any) => (
                  <div 
                    key={project._id} 
                    className="card-compact"
                    onClick={() => setSelectedProject(project)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="img-wrapper">
                      {project.image ? <img src={urlFor(project.image).width(800).url()} alt={project.title} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🎨</div>}
                    </div>
                    <div className="content">
                      <div className="metadata-row">
                        <h4 className="title">{project.title}</h4>
                        <span className="year">{project.year || (new Date().getFullYear())}</span>
                      </div>
                      <div className="metadata-row secondary">
                        <p className="subtitle">{project.subtitle || project.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Project Detail Overlay - Ritchie Style */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              background: '#0a0a0a', 
              zIndex: 10000,
              padding: '2rem',
              color: '#d1d1d1',
              overflowY: 'auto'
            }}
          >
            <div className="container" style={{ position: 'relative', marginTop: '4rem' }}>
              <button 
                onClick={() => setSelectedProject(null)}
                style={{ 
                  position: 'absolute', 
                  right: 0, 
                  top: '-4rem', 
                  background: 'none', 
                  border: 'none', 
                  color: 'white', 
                  fontSize: '2rem', 
                  cursor: 'pointer',
                  padding: '1rem',
                  zIndex: 10001
                }}
              >
                ✕
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '4rem' }}>
                {/* Media Column - Mobile Optimized */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: selectedProject.deviceType === 'mobile' ? 'center' : 'stretch' 
                }}>
                  <div 
                    className="slider-outer-container" 
                    style={{ 
                      width: '100%', 
                      maxWidth: selectedProject.deviceType === 'mobile' ? '400px' : 'none',
                      height: selectedProject.deviceType === 'mobile' ? '85vh' : '65vh', 
                      background: '#111', 
                      position: 'relative', 
                      overflow: 'hidden',
                      borderRadius: '0',
                      border: selectedProject.deviceType === 'mobile' ? '1px solid #333' : 'none',
                      boxShadow: selectedProject.deviceType === 'mobile' ? '0 30px 60px rgba(0,0,0,0.5)' : 'none'
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
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
                        className="custom-scrollbar"
                      >
                        {(() => {
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
                                    background: 'rgba(0,0,0,0.6)',
                                    color: 'white',
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '50px',
                                    fontSize: '0.65rem',
                                    fontWeight: 800,
                                    textDecoration: 'none',
                                    backdropFilter: 'blur(5px)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    zIndex: 20,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                  }}
                                >
                                  Full View ↗
                                </a>
                              </div>
                            );
                          }
                          return <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>📽️</div>;
                        })()}
                      </motion.div>
                    </AnimatePresence>

                    {/* Slider Controls - Fixed outside the scrolling container */}
                    {(() => {
                      const gallery = selectedProject.gallery || [];
                      const images = gallery.length > 0 ? gallery : [selectedProject.image];
                      if (images.length > 1) {
                        return (
                          <>
                            <button 
                              onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                              style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', border: 'none', color: 'white', width: '2.5rem', height: '2.5rem', borderRadius: '50%', cursor: 'pointer', zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', backdropFilter: 'blur(4px)' }}
                            >
                              ←
                            </button>
                            <button 
                              onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                              style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', border: 'none', color: 'white', width: '2.5rem', height: '2.5rem', borderRadius: '50%', cursor: 'pointer', zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', backdropFilter: 'blur(4px)' }}
                            >
                              →
                            </button>
                            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', zIndex: 30 }}>
                              {currentImageIndex + 1} / {images.length}
                            </div>
                          </>
                        );
                      }
                      return null;
                    })()}
                  </div>
                  {selectedProject.deviceType !== 'mobile' && (
                    <div style={{ marginTop: '2rem' }}>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', textTransform: 'uppercase' }}>{selectedProject.title}</h3>
                      <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '0.5rem' }}>{selectedProject.description}</p>
                      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {selectedProject.tags?.map((t: string) => (
                          <span key={t} style={{ fontSize: '0.7rem', color: 'var(--pocari-blue-soft)', fontWeight: 800, textTransform: 'uppercase' }}>#{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                  {/* Credits Column */}
                  <div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.4, display: 'block', marginBottom: '1.5rem' }}>Credits</span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <span style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: '#555', display: 'block', marginBottom: '0.3rem' }}>Position</span>
                      <span style={{ fontSize: '0.8rem', color: 'white', fontWeight: 500 }}>{selectedProject.role || (selectedProject.category === 'it' ? 'Lead Developer' : 'UI/UX Designer')}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: '#555', display: 'block', marginBottom: '0.3rem' }}>Client / Subtitle</span>
                      <span style={{ fontSize: '0.8rem', color: 'white', fontWeight: 500 }}>{selectedProject.subtitle || 'Personal Project'}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: '#555', display: 'block', marginBottom: '0.3rem' }}>Year</span>
                      <span style={{ fontSize: '0.8rem', color: 'white', fontWeight: 500 }}>{selectedProject.year || '2024'}</span>
                    </div>
                    {selectedProject.link && (
                      <div>
                        <span style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: '#555', display: 'block', marginBottom: '0.3rem' }}>Link</span>
                        <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: 'var(--pocari-blue-soft)', fontWeight: 700, textDecoration: 'none' }}>Live Site ↗</a>
                      </div>
                    )}

                    {selectedProject.deviceType === 'mobile' && (
                      <div style={{ marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2.5rem' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white', textTransform: 'uppercase', lineHeight: '1.3' }}>{selectedProject.title}</h3>
                        <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '1rem', lineHeight: '1.6' }}>{selectedProject.description}</p>
                        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                          {selectedProject.tags?.map((t: string) => (
                            <span key={t} style={{ fontSize: '0.65rem', color: 'var(--pocari-blue-soft)', fontWeight: 800, textTransform: 'uppercase' }}>#{t}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--border-light)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.5 }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'lowercase' }}>© 2026 {displayBio.name}</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {displayBio.socialLinks.map((link: any) => (
              <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', textTransform: 'lowercase' }}>{link.platform}</a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
