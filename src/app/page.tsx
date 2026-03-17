import { client, urlFor } from "@/sanity/client";
import Link from "next/link";

async function getData() {
  const query = `{
    "projects": *[_type == "project"] | order(_createdAt desc) {
      _id, title, description, tags, "slug": slug.current, image, featured, link
    },
    "bio": *[_type == "bio"][0] {
      ...,
      "avatarUrl": avatar.asset->url,
      socialLinks[] {
        platform,
        url,
        icon
      }
    },
    "experiences": *[_type == "experience"] | order(startDate desc) {
      _id, company, role, startDate, endDate, description, "slug": slug.current
    },
    "education": *[_type == "education"] | order(startDate desc) {
      _id, school, degree, startDate, endDate
    },
    "honors": *[_type == "honor"] | order(date desc) {
      _id, title, issuer, date
    },
    "certifications": *[_type == "certification"] | order(date desc) {
      _id, title, issuer, date, link
    }
  }`;
  return await client.fetch(query);
}

export default async function Home() {
  const data = await getData();
  const { projects, bio, experiences, education, honors, certifications } = data;

  const displayBio = bio || {
    name: "Hilman Zahrawa",
    headline: "Architecting Digital Excellence.",
    about: "I build high-performance web applications that merge robust engineering with intuitive user experience.",
    location: "Indonesia",
    avatarUrl: null,
    socialLinks: [
      { platform: "GitHub", url: "#", icon: "Github" },
      { platform: "LinkedIn", url: "#", icon: "Linkedin" },
      { platform: "Twitter", url: "#", icon: "Twitter" }
    ],
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Sanity.io", "CSS3", "Framer Motion"]
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container" style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Avatar / Profile Image */}
          <div style={{ marginBottom: '2rem', position: 'relative' }}>
            <div style={{ 
              width: '120px', 
              height: '120px', 
              borderRadius: '50%', 
              overflow: 'hidden', 
              border: '4px solid var(--accent-primary)',
              padding: '4px',
              background: 'white',
              boxShadow: '0 20px 40px rgba(0, 102, 255, 0.15)'
            }}>
              {displayBio.avatarUrl ? (
                <img src={displayBio.avatarUrl} alt={displayBio.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem', fontWeight: 900 }}>
                  {displayBio.name.charAt(0)}
                </div>
              )}
            </div>
            {/* Status Indicator */}
            <div style={{ 
              position: 'absolute', 
              bottom: '5px', 
              right: '10px', 
              width: '15px', 
              height: '15px', 
              background: '#10b981', 
              borderRadius: '50%', 
              border: '3px solid white' 
            }}></div>
          </div>

          <span style={{ textTransform: 'uppercase', letterSpacing: '0.4em', fontWeight: 800, opacity: 0.6, fontSize: '0.8rem', color: 'var(--accent-primary)', marginBottom: '1rem' }}>
            Hello, I am {displayBio.name}
          </span>
          
          <h1 className="hero-headline" style={{ maxWidth: '900px' }}>
            {displayBio.headline.split(' ').map((word: string, i: number) => (
               <span key={i} style={{ display: 'inline-block', color: i % 2 === 0 ? 'var(--text-main)' : 'var(--accent-primary)', margin: '0 0.2em' }}>{word}</span>
            ))}
          </h1>

          <p style={{ maxWidth: '650px', margin: '2rem auto 3rem', fontSize: '1.2rem', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.6 }}>
            {displayBio.about}
          </p>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '3rem' }}>
            {displayBio.socialLinks?.map((link: any, i: number) => (
              <a 
                key={i} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link-hero"
                style={{ 
                  color: 'var(--text-muted)', 
                  transition: 'var(--transition)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}
              >
                {link.platform}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#projects" className="btn btn-primary">Featured Works</a>
            <a href="#contact" className="btn" style={{ border: '1px solid var(--border-color)', color: 'var(--text-main)' }}>Contact Me</a>
          </div>
        </div>
      </section>

      {/* Projects Section - Precise Bento */}
      <section className="section" id="projects" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ marginBottom: '5rem', textAlign: 'center' }}>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.2em' }}>Selected Works</span>
            <h2 className="section-title" style={{ marginTop: '0.5rem' }}>Portfolio</h2>
          </div>
          
          <div className="bento-grid">
            {projects?.map((project: any) => (
              <div key={project._id} className={`bento-item ${project.featured ? 'featured' : ''}`}>
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                  {project.image ? (
                    <img 
                      src={urlFor(project.image).width(project.featured ? 1200 : 800).url()} 
                      alt={project.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'var(--accent-deep)', opacity: 0.1 }}></div>
                  )}
                  
                  {/* Simplified Hover Overlay */}
                  <div className="bento-overlay">
                    <h3 style={{ fontSize: project.featured ? '2.5rem' : '1.5rem', marginBottom: '1.5rem', fontWeight: 900 }}>{project.title}</h3>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      {project.slug && (
                        <Link href={`/projects/${project.slug}`} className="btn" style={{ background: 'white', color: 'var(--text-main)', padding: '0.8rem 1.5rem', fontSize: '0.9rem' }}>Details</Link>
                      )}
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn" style={{ border: '2px solid white', color: 'white', padding: '0.8rem 1.5rem', fontSize: '0.9rem' }}>Launch Site</a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="section" id="experience">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem' }}>
            <div>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.2em' }}>Engineering Path</span>
              <h2 className="section-title" style={{ fontSize: '3rem', marginTop: '0.5rem' }}>Experience</h2>
              <div className="timeline" style={{ marginTop: '3rem' }}>
                {experiences?.map((exp: any) => (
                  <div key={exp._id} className="timeline-item">
                    <span className="timeline-date">{exp.startDate?.split('-')[0]} — {exp.endDate?.split('-')[0] || 'Current'}</span>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginTop: '0.5rem' }}>{exp.role}</h3>
                    <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{exp.company}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.2em' }}>Education</span>
              <h2 className="section-title" style={{ fontSize: '3rem', marginTop: '0.5rem' }}>Fondation</h2>
              <div className="timeline" style={{ marginTop: '3rem' }}>
                {education?.map((edu: any) => (
                  <div key={edu._id} className="timeline-item">
                    <span className="timeline-date">{edu.startDate?.split('-')[0]} — {edu.endDate?.split('-')[0]}</span>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginTop: '0.5rem' }}>{edu.degree}</h3>
                    <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{edu.school}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Personalized Icons */}
      <section className="section" style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.2em' }}>Tech Stack</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>Tools of the Trade</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {displayBio.skills?.map((skill: string, i: number) => (
              <div key={i} className="skill-tag" style={{ 
                padding: '0.75rem 1.5rem', 
                background: 'white', 
                border: '1px solid var(--border-color)', 
                borderRadius: '50px',
                fontWeight: 600,
                fontSize: '0.9rem',
                color: 'var(--text-main)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
                transition: 'var(--transition)',
                cursor: 'default'
              }}>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '6rem' }}>
            <div>
              <h2 className="section-title" style={{ fontSize: '2.5rem' }}>Awards</h2>
              {honors?.map((h: any) => (
                <div key={h._id} style={{ marginBottom: '2.5rem' }}>
                  <h4 style={{ color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 800 }}>{h.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{h.issuer} • {h.date?.split('-')[0]}</p>
                </div>
              ))}
            </div>
            <div>
              <h2 className="section-title" style={{ fontSize: '2.5rem' }}>Certifications</h2>
              {certifications?.map((c: any) => (
                <div key={c._id} style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 800 }}>{c.title}</h4>
                    <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{c.issuer}</p>
                  </div>
                  {c.link && <a href={c.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', fontWeight: 700, textDecoration: 'none' }}>Verify →</a>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Connect */}
      <footer className="section" id="contact" style={{ padding: '10rem 0', textAlign: 'center' }}>
        <div className="container">
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.4em', fontWeight: 800, opacity: 0.5, fontSize: '0.8rem', color: 'var(--accent-primary)' }}>Open for Collaboration</span>
          <h2 style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', margin: '2rem 0', fontWeight: 950, letterSpacing: '-0.05em' }}>LET&apos;S CONNECT.</h2>
          
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '3.5rem' }}>
             {displayBio.socialLinks?.map((link: any, i: number) => (
              <a 
                key={i} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link-footer"
                style={{ 
                  color: 'var(--text-main)', 
                  transition: 'var(--transition)',
                  fontSize: '1rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  borderBottom: '2px solid transparent'
                }}
              >
                {link.platform}
              </a>
            ))}
          </div>

          <a href="mailto:hello@example.com" className="btn btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1.2rem' }}>Send a Message</a>
          
          <div style={{ marginTop: '8rem', borderTop: '1px solid var(--border-color)', paddingTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Digital Signature */}
            <div style={{ 
              fontFamily: '"Outfit", sans-serif', 
              fontSize: '1.5rem', 
              fontWeight: 800, 
              color: 'var(--accent-primary)', 
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
              opacity: 0.8
            }}>
              {displayBio.name}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
              © {new Date().getFullYear()} • Engineered with passion in {displayBio.location}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
