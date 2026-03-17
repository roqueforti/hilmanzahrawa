import { client, urlFor } from "@/sanity/client";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

async function getProject(slug: string) {
  const query = `*[_type == "project" && slug.current == $slug][0]`;
  return await client.fetch(query, { slug });
}

export default async function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);

  if (!project) return <div className="container section">Project not found</div>;

  return (
    <main className="container section" style={{ paddingTop: '8rem' }}>
      <Link href="/" className="btn" style={{ marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--pocari-blue)' }}>
        <ArrowLeft size={20} /> Back to Home
      </Link>
      
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3.5rem', color: 'var(--pocari-blue)', marginBottom: '1rem' }}>{project.title}</h1>
        <div className="project-tags">
          {project.tags?.map((tag: string) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 2fr) 1fr', gap: '4rem' }}>
        <div className="compact-content">
          {project.image && (
            <div className="project-img" style={{ height: '400px', marginBottom: '2rem' }}>
              <img 
                src={urlFor(project.image).width(1200).url()} 
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          )}
          <div className="portable-text">
            {project.content ? (
              <PortableText value={project.content} />
            ) : (
              <p>{project.description}</p>
            )}
          </div>
        </div>

        <div className="sidebar">
          <div className="glass" style={{ padding: '2rem', border: '2px solid var(--pocari-blue-light)' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--pocari-blue)' }}>Project Links</h3>
            {project.link ? (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                Visit Live Site
              </a>
            ) : (
              <p style={{ color: 'var(--text-light)' }}>No links available</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
