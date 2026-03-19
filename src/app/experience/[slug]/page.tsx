import { client } from "@/sanity/client";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

async function getExperience(slug: string) {
  const query = `*[_type == "experience" && slug.current == $slug][0]`;
  return await client.fetch(query, { slug });
}

export default async function ExperienceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exp = await getExperience(slug);

  if (!exp) return <div className="container section">Experience detail not found</div>;

  return (
    <main className="container section" style={{ paddingTop: '8rem', color: 'var(--text-primary)' }}>
      <Link href="/" className="nav-link" style={{ marginBottom: '3rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem', opacity: 1 }}>
        <ArrowLeft size={16} strokeWidth={3} /> <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Back to Home</span>
      </Link>
      
      <div style={{ marginBottom: '4rem' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, fontFamily: 'var(--font-display)', letterSpacing: '-0.04em', marginBottom: '0.5rem', color: 'white' }}>{exp.role}</h1>
        <h2 style={{ color: 'var(--accent)', fontSize: '1.2rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{exp.company}</h2>
        <span className="timeline-date" style={{ marginTop: '1.5rem', display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{exp.startDate} — {exp.endDate || 'Present'}</span>
      </div>

      <div style={{ maxWidth: '800px', fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
        <div className="portable-text">
          {exp.details ? (
            <PortableText value={exp.details} />
          ) : (
            <p>{exp.description}</p>
          )}
        </div>
      </div>
    </main>
  );
}
