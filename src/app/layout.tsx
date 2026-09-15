import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hilman Zahrawa — Software Developer & Product Designer',
  description: 'Personal portfolio of Hilman Zahrawa. Blending clear strategy, thoughtful design, and robust engineering to craft digital experiences that solve real problems.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Local fonts are defined with font-display: swap in globals.css for zero render-blocking */}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
