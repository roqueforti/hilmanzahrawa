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
    <main className="container section" style={{ paddingTop: '8rem' }}>
      <Link href="/" className="btn" style={{ marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--pocari-blue)' }}>
        <ArrowLeft size={20} /> Back to Home
      </Link>
      
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3.5rem', color: 'var(--pocari-blue)', marginBottom: '0.5rem' }}>{exp.role}</h1>
        <h2 style={{ color: 'var(--pocari-blue-vibrant)', fontSize: '1.5rem' }}>{exp.company}</h2>
        <span className="timeline-date" style={{ marginTop: '1rem', display: 'block' }}>{exp.startDate} — {exp.endDate || 'Present'}</span>
      </div>

      <div style={{ maxWidth: '800px' }}>
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
