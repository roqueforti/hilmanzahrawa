import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Portfolio | Modern & Dynamic',
  description: 'A beautiful portfolio built with Next.js and Sanity CMS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <nav className="nav">
          <div className="container nav-content">
            <div className="logo">PORTFOLIO.</div>
            <ul className="nav-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </nav>
        {children}
        <footer style={{ padding: '4rem 0', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="container">
            <p style={{ color: 'var(--text-muted)' }}>&copy; {new Date().getFullYear()} My Portfolio. Built with Next.js</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
