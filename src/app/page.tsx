import { client, urlFor } from "@/sanity/client";

async function getProjects() {
  const query = `*[_type == "project"] {
    _id,
    title,
    description,
    tags,
    link,
    image
  }`;
  return await client.fetch(query);
}

async function getBio() {
  const query = `*[_type == "bio"][0]`;
  return await client.fetch(query);
}

export default async function Home() {
  const projects = await getProjects();
  const bio = await getBio();

  // Fallback data if CMS is empty
  const displayProjects = projects.length > 0 ? projects : [
    {
      _id: "1",
      title: "FinTech Dashboard",
      description: "A real-time financial tracking application with deep analytics.",
      tags: ["Next.js", "Chart.js", "Tailwind"]
    }
  ];

  const displayBio = bio || {
    name: "Full Stack Developer",
    headline: "Crafting Digital Experiences with Purpose.",
    about: "I am a developer who believes in the intersection of aesthetics and functionality. My journey in tech is driven by curiosity and a desire to build tools that make a difference.",
    experience: "5+ Years Developing",
    location: "Remote / Global"
  };

  return (
    <main>
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content animate">
            <span className="hero-tag">Welcome to my space</span>
            <h1>{displayBio.headline}</h1>
            <p>I&apos;m {displayBio.name} specializing in building high-performance web applications that users love.</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#projects" className="btn btn-primary">View My Work</a>
              <a href="#contact" className="btn" style={{ border: '1px solid var(--glass-border)' }}>Get in Touch</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="container">
          <div className="section-title">
            <h2>Selected Projects</h2>
            <p style={{ color: 'var(--text-muted)' }}>A collection of things I&apos;ve built with passion.</p>
          </div>
          <div className="project-grid">
            {displayProjects.map((project: any) => (
              <div key={project._id} className="project-card glass animate">
                <div className="project-img">
                  {project.image ? (
                    <img 
                      src={urlFor(project.image).width(400).url()} 
                      alt={project.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ 
                      width: '100%', 
                      height: '100%', 
                      background: 'linear-gradient(45deg, #1e293b, #334155)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(255,255,255,0.1)',
                      fontSize: '2rem',
                      fontWeight: 'bold'
                    }}>
                      PREVIEW
                    </div>
                  )}
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.tags && (
                  <div className="project-tags">
                    {project.tags.map((tag: string) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="tag" style={{ marginTop: '1rem', display: 'inline-block', color: 'var(--primary)' }}>
                    Visit Project →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <div className="glass" style={{ padding: '4rem', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>About Me</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
              {displayBio.about}
            </p>
            <div style={{ display: 'flex', gap: '3rem' }}>
              <div>
                <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Experience</h4>
                <p>{displayBio.experience}</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Location</h4>
                <p>{displayBio.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="contact" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Let&apos;s Build Something Together.</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Ready to start your next project? I&apos;m currently available for freelance work.</p>
          <a href="mailto:hello@example.com" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1.2rem 3rem' }}>Say Hello</a>
        </div>
      </section>
    </main>
  );
}
