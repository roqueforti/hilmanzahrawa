import './globals.css';
import type { Metadata } from 'next';
import Background from '@/components/Background';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Hilman Zahrawa | Digital Excellence',
  description: 'Personal portfolio of Hilman Zahrawa, a Full Stack Developer.',
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
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Background />
        <div className="nav-wrapper">
          <Navbar />
        </div>
        {children}
      </body>
    </html>
  );
}
