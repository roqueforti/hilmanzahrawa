import { client, urlFor } from "@/sanity/client";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

async function getProject(slug: string) {
  const query = `*[_type == "project" && slug.current == $slug][0]`;
  return await client.fetch(query, { slug });
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return <div className="container section">Project not found</div>;

  return (
    <main className="container section" style={{ paddingTop: '8rem', color: 'var(--text-primary)' }}>
      <Link href="/" className="nav-link" style={{ marginBottom: '3rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem', opacity: 1 }}>
        <ArrowLeft size={16} strokeWidth={3} /> <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Back to Home</span>
      </Link>
      
      <div style={{ marginBottom: '4rem' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, fontFamily: 'var(--font-display)', letterSpacing: '-0.04em', marginBottom: '1.5rem', color: 'white' }}>{project.title}</h1>
        <div className="project-tags" style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          {project.tags?.map((tag: string) => (
            <span key={tag} className="badge" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{tag}</span>
          ))}
        </div>
      </div>
 
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '6rem' }}>
        <div className="compact-content">
          {project.image && (
            <div className="project-img" style={{ height: 'auto', marginBottom: '3rem', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-light)', boxShadow: '0 40px 100px rgba(0,0,0,0.4)', background: 'var(--bg-secondary)' }}>
              <img 
                src={urlFor(project.image).width(1600).url()} 
                alt={project.title}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          )}
          <div className="portable-text" style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
            {project.content ? (
              <PortableText value={project.content} />
            ) : (
              <p>{project.description}</p>
            )}
          </div>
        </div>
 
        <div className="sidebar">
          <div className="glass" style={{ padding: '3rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)' }}>
            <h3 style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--accent)', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>Project Links</h3>
            {project.link ? (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-premium" style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}>
                Visit Live Site ↗
              </a>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>No links available</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
