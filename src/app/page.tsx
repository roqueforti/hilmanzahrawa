'use client';

import { client, urlFor } from "@/sanity/client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import StravaActivity from "@/components/StravaActivity";
import MediumArticles from "@/components/MediumArticles";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'umum' | 'it' | 'design' | 'strava' | 'medium'>('it');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [stravaData, setStravaData] = useState<any>(null);
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
            "gallery": gallery[].asset->url
          },
          designProjectsOrder[]->{
            _id, title, description, tags, "slug": slug.current, image, featured, link, year, subtitle, category, role, deviceType,
            "gallery": gallery[].asset->url
          }
        }
      }`;
      try {
        const result = await client.fetch(query);
        setData(result);
        
        // Set initial tab based on landing page sections if available
        if (result.landingPage?.sections?.length > 0) {
          setActiveTab(result.landingPage.sections[0].type);
        }
      } catch (err) {
        console.error("Failed to fetch data from Sanity:", err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchStrava() {
      try {
        const response = await fetch('/api/strava');
        const res = await response.json();
        setStravaData(res);
      } catch (e) {
        console.error("Failed to fetch Strava data", e);
      }
    }
    fetchStrava();
  }, []);

  if (!data) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ width: 40, height: 40, border: '4px solid var(--accent)', borderTopColor: 'transparent', borderRadius: '50%' }} /></div>;

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
    skills: bio?.skills || ["Java", "PHP", "Laravel", "SQL", "Python", "JavaScript", "HTML", "CSS", "Figma", "Adobe Photoshop", "Adobe Illustrator", "Power BI", "Looker Studio"],
    mediumUsername: bio?.mediumUsername
  };

  const displayProjects = projects?.length > 0 ? projects : [
    { _id: "1", title: "Brewtech", year: "2026", subtitle: "Innovillage", tags: ["SaaS", "LMS", "IT"], description: "Platform pendidikan vokasi disabilitas. Mencetak talenta barista melalui BREWTECH.", slug: "brewtech", category: 'it' },
    { _id: "2", title: "ProFile+", year: "2025", subtitle: "Profile Image Studio", tags: ["UI/UX", "HR"], description: "Platform manajemen SDM yang mendukung pengelolaan data karyawan, absensi, dan kinerja.", slug: "profile-plus", category: 'design' },
    { _id: "3", title: "Disnakertrans Jatim", year: "2025", subtitle: "Government", tags: ["Web", "IT"], description: "Merancang antarmuka website yang modern, aksesibel, dan user-friendly.", slug: "disnakertrans-jatim", category: 'it' },
    { _id: "4", title: "NZ Box Laundry", year: "2026", subtitle: "Marketing", tags: ["Digital Marketing"], description: "Strategi digital marketing berbasis data untuk retensi pelanggan.", slug: "nz-box", category: 'design' },
    { _id: "5", title: "Mandala Pure Love", year: "2025", subtitle: "Community", tags: ["Social"], description: "Pemberdayaan masyarakat dan pengembangan sociopreneurship.", slug: "mandala", category: 'it' },
  ];

  // Sort by year (newest first), then by ID (oldest/lowest first)
  const sortedProjects = [...displayProjects].sort((a: any, b: any) => {
    const yearA = parseInt(a.year || "0", 10);
    const yearB = parseInt(b.year || "0", 10);
    if (yearB !== yearA) {
      return yearB - yearA; // Year descending (newest first)
    }
    // If same year, sort by ID ascending (oldest ID first)
    const idA = parseInt(a._id || "999", 10);
    const idB = parseInt(b._id || "999", 10);
    return idA - idB;
  });

  // Sorting projects for sections
  const itProjects = data.landingPage?.itProjectsOrder?.length > 0 
    ? data.landingPage.itProjectsOrder.filter(Boolean) 
    : sortedProjects.filter((p: any) => p.tags?.some((t: string) => ['SaaS', 'LMS', 'Web', 'Dev', 'SQL', 'IT'].includes(t)) || p.category === 'it');

  const designProjects = data.landingPage?.designProjectsOrder?.length > 0 
    ? data.landingPage.designProjectsOrder.filter(Boolean) 
    : sortedProjects.filter((p: any) => p.tags?.some((t: string) => ['UI/UX', 'Creative', 'Design', 'Visual', 'Logo'].includes(t)) || p.category === 'design');

  const containerVariants: any = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
  };

  return (
    <main style={{ background: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <nav className="switcher-nav">
        <div className="container">
          <div className="nav-brand">
            <span className="name">{displayBio.name}</span>
            <span className="tagline">{data.landingPage?.tagline || "Developer / Designer / Walker / Runner"}</span>
          </div>
          
          <div className="nav-links">
            {data.landingPage?.sections?.length > 0 ? (
              data.landingPage.sections.map((section: any) => (
                <button 
                  key={section.type}
                  className={`work-toggle ${activeTab === section.type ? 'active' : ''} ${section.type === 'umum' ? 'switcher-btn' : ''}`}
                  onClick={() => setActiveTab(section.type as any)}
                >
                  {section.title || section.type}
                </button>
              ))
            ) : (
              <>
                <button 
                  className={`work-toggle ${activeTab === 'it' ? 'active' : ''}`}
                  onClick={() => setActiveTab('it')}
                >
                  it
                </button>
                <button 
                  className={`work-toggle ${activeTab === 'design' ? 'active' : ''}`}
                  onClick={() => setActiveTab('design')}
                >
                  design
                </button>
                <button 
                  className={`switcher-btn ${activeTab === 'umum' ? 'active' : ''}`}
                  onClick={() => setActiveTab('umum')}
                >
                  about
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: '5rem', paddingBottom: '4rem' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'umum' && (
            <motion.div key="umum" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
              <div className="grid-responsive" style={{ marginTop: '3rem' }}>
                <div>
                  <span className="text-meta-compact" style={{ marginBottom: '1.5rem', display: 'block' }}>About</span>
                  <p className="bio-headline">
                    {displayBio.about}
                  </p>
                  
                  {/* Reorderable About Blocks */}
                  {(() => {
                    const blockOrder = data.landingPage?.aboutSections || [
                      { title: 'Experience', type: 'experience' },
                      { title: 'Education', type: 'education' },
                      { title: 'Achievements', type: 'achievements' },
                      { title: 'Organizations', type: 'organizations' },
                      { title: 'Certificates', type: 'certificates' }
                    ];

                    const renderBlock = (block: any) => {
                      switch (block.type) {
                        case 'experience':
                          return (
                            <div key="experience">
                              <h2 className="text-heading-compact" style={{ marginBottom: '2rem', fontSize: '0.75rem' }}>{block.title || 'Experience'}</h2>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {(data.experiences?.length > 0 ? data.experiences : [
                                  { _id: "e1", role: "Digital Marketing", company: "NZ Box Smart Laundry", startDate: "2026-02-01" },
                                  { _id: "e2", role: "Web Developer", company: "Mandala Pure Love", startDate: "2025-09-01" },
                                  { _id: "e3", role: "UI/UX Designer Magang", company: "Profile Image Studio", startDate: "2025-08-01" },
                                ]).map((exp: any) => (
                                  <div key={exp._id}>
                                    <h4 style={{ fontSize: '0.85rem', fontWeight: 800 }}>{exp.role}</h4>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{exp.company} • {exp.startDate?.split('-')[0] || 'Present'}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        case 'education':
                          return (
                            <div key="education">
                              <h2 className="text-heading-compact" style={{ marginBottom: '2rem', fontSize: '0.75rem' }}>{block.title || 'Education'}</h2>
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
                          );
                        case 'achievements':
                          return (
                            <div key="achievements">
                              <h2 className="text-heading-compact" style={{ marginBottom: '2rem', fontSize: '0.75rem' }}>{block.title || 'Achievements'}</h2>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {(data.honors?.length > 0 ? data.honors : [
                                  { _id: "h1", title: "Most Inspiring Community Empowerment", issuer: "Mandala Pure Love", date: "2024" },
                                  { _id: "h2", title: "Mawapres Non-Akademik Jurusan TI", issuer: "Polinema", date: "2024" },
                                ]).map((honor: any) => (
                                  <div key={honor._id}>
                                    <h4 style={{ fontSize: '0.85rem', fontWeight: 800 }}>{honor.title}</h4>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{honor.issuer} • {honor.date}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        case 'organizations':
                          return (
                            <div key="organizations">
                              <h2 className="text-heading-compact" style={{ marginBottom: '2rem', fontSize: '0.75rem' }}>{block.title || 'Organizations'}</h2>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {(data.organizations?.length > 0 ? data.organizations : [
                                  { id: "o1", role: "Ketua Umum", organization: "HMTI Polinema", period: "2024 - 2025" },
                                ]).map((org: any) => (
                                  <div key={org._id || org.id}>
                                    <h4 style={{ fontSize: '0.85rem', fontWeight: 800 }}>{org.organization}</h4>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{org.role} • {org.period}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        case 'certificates':
                          return (
                            <div key="certificates" style={{ marginTop: '4rem', gridColumn: '1 / -1' }}>
                              <h2 className="text-heading-compact" style={{ marginBottom: '2rem', fontSize: '0.75rem' }}>{block.title || 'Certificates'}</h2>
                              <div className="certificates-grid">
                                {(data.certificates?.length > 0 ? data.certificates : [
                                  { _id: "cert1", title: "Memulai Pemrograman dengan Python", issuer: "Dicoding Indonesia", date: "2024" },
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
                          );
                        case 'strava':
                          return (
                            <div key="strava" style={{ gridColumn: '1 / -1' }}>
                              <StravaActivity 
                                activities={stravaData?.activities || []} 
                                stats={stravaData?.stats} 
                                profile={stravaData?.profile} 
                                clubs={stravaData?.clubs || []} 
                              />
                            </div>
                          );
                        case 'medium':
                          return (
                            <div key="medium" style={{ gridColumn: '1 / -1' }}>
                              <MediumArticles username={displayBio.mediumUsername} title={block.title} />
                            </div>
                          );
                        default:
                          return null;
                      }
                    };

                    // Group non-certificate blocks into pairs for the grid layout
                    const groupedBlocks = [];
                    let currentGroup: any[] = [];
                    
                    blockOrder.forEach((block: any) => {
                      if (block.type === 'certificates' || block.type === 'strava' || block.type === 'medium') {
                        if (currentGroup.length > 0) {
                          groupedBlocks.push({ type: 'grid', items: currentGroup });
                          currentGroup = [];
                        }
                        groupedBlocks.push({ type: 'single', item: block });
                      } else {
                        currentGroup.push(block);
                        if (currentGroup.length === 2) {
                          groupedBlocks.push({ type: 'grid', items: currentGroup });
                          currentGroup = [];
                        }
                      }
                    });
                    
                    if (currentGroup.length > 0) {
                      groupedBlocks.push({ type: 'grid', items: currentGroup });
                    }

                    return (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        {(groupedBlocks as any[]).map((group: any, idx: number) => (
                          group.type === 'grid' ? (
                            <div key={idx} className="grid-split">
                              {group.items.map((block: any) => renderBlock(block))}
                            </div>
                          ) : (
                            renderBlock(group.item)
                          )
                        ))}
                      </div>
                    );
                  })()}
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', background: 'var(--bg-secondary)', filter: 'grayscale(100%) brightness(0.8)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-light)' }}>
                    {displayBio.avatarUrl && <img src={displayBio.avatarUrl} alt={displayBio.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />}
                  </div>
                  <div style={{ marginTop: '2rem', textAlign: 'left' }}>
                    <span className="text-meta-compact" style={{ display: 'block', marginBottom: '1rem' }}>Contact</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                      <a href={`mailto:${displayBio.email}`} style={{ fontSize: '0.85rem', textDecoration: 'none', color: 'white', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{displayBio.email}</a>
                      {displayBio.whatsapp && (
                        <a href={`https://wa.me/${displayBio.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', textDecoration: 'none', color: 'var(--accent)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>WhatsApp: +{displayBio.whatsapp}</a>
                      )}
                    </div>
                    
                    {/* Social Links on About Page */}
                    <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                      {displayBio.socialLinks.map((link: any) => (
                        <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'none', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>{link.platform}</a>
                      ))}
                    </div>

                    <div style={{ marginTop: '3rem' }}>
                      <span className="text-meta-compact" style={{ display: 'block', marginBottom: '1.2rem' }}>Expertise</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                        {displayBio.skills.map((skill: string) => (
                          <span key={skill} style={{ fontSize: '0.65rem', fontWeight: 600, padding: '0.4rem 0.8rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '4px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>{skill}</span>
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
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 className="text-heading-compact">Selected IT Projects</h2>
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
                      <div className="metadata-row secondary" style={{ marginTop: '0.1rem' }}>
                        <p className="subtitle">{project.subtitle || project.description}</p>
                        <div className="tags" style={{ textAlign: 'right', textTransform: 'uppercase' }}>
                          {project.category || (project.tags && project.tags[0]) || 'Project'}
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
              <div style={{ marginBottom: '1.2rem' }}>
                <h2 className="text-heading-compact">Visual Works</h2>
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
                      <div className="metadata-row secondary" style={{ marginTop: '0.1rem' }}>
                        <p className="subtitle">{project.subtitle || project.description}</p>
                        <div className="tags" style={{ textAlign: 'right', textTransform: 'uppercase' }}>
                          {project.category || 'Visual'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'strava' && (
            <motion.div 
              key="strava" 
              variants={containerVariants} 
              initial="hidden" 
              animate="visible" 
              exit="exit"
              style={{ marginTop: '3rem' }}
            >
              <div style={{ maxWidth: '1400px' }}>
                <StravaActivity 
                  activities={stravaData?.activities || []} 
                  stats={stravaData?.stats} 
                  profile={stravaData?.profile} 
                  clubs={stravaData?.clubs || []} 
                />
              </div>
            </motion.div>
          )}
          {activeTab === 'medium' && (
            <motion.div 
              key="medium" 
              variants={containerVariants} 
              initial="hidden" 
              animate="visible" 
              exit="exit"
              style={{ marginTop: '3rem' }}
            >
              <div style={{ maxWidth: '1400px' }}>
                <MediumArticles username={displayBio.mediumUsername} />
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
              background: 'var(--bg-primary)', 
              zIndex: 10000,
              padding: '2rem',
              color: 'var(--text-primary)',
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

              <div className="grid-responsive">
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
                      background: 'var(--bg-secondary)', 
                      position: 'relative', 
                      overflow: 'hidden',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-light)',
                      boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
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
                          <span key={t} style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>#{t}</span>
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
                        <span style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem', fontFamily: 'var(--font-mono)' }}>Link</span>
                        <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-mono)' }}>Live Site ↗</a>
                      </div>
                    )}

                    {selectedProject.deviceType === 'mobile' && (
                      <div style={{ marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2.5rem' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white', textTransform: 'uppercase', lineHeight: '1.3' }}>{selectedProject.title}</h3>
                        <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '1rem', lineHeight: '1.6' }}>{selectedProject.description}</p>
                        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                          {selectedProject.tags?.map((t: string) => (
                            <span key={t} style={{ fontSize: '0.65rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>#{t}</span>
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

      <footer style={{ padding: '6rem 0', borderTop: '1px solid var(--border-light)', background: 'var(--bg-secondary)' }}>
        <div className="container footer-container">
          <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>© 2026 {displayBio.name}</span>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {displayBio.socialLinks.map((link: any) => (
              <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>{link.platform}</a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
