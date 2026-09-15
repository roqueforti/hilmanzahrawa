'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  DASHBOARD_TEMPLATES,
  DASHBOARD_STYLES,
  DashboardSectionKey,
  getDashboardTemplate,
  getDashboardSections,
} from '@/data/dashboardTemplates';
import DashboardSwitcherBar from '@/components/dashboard/DashboardSwitcherBar';
import DashboardLayoutShell from '@/components/dashboard/DashboardLayoutShell';
import DynamicDashboardRenderer from '@/components/dashboard/DynamicDashboardRenderer';
import DashboardSectionCustomizerDrawer from '@/components/dashboard/DashboardSectionCustomizerDrawer';

export default function DashboardTemplatePreviewPage() {
  const params = useParams();
  const router = useRouter();
  const rawSlug = (params?.slug as string) || 'classic-admin';
  const template = getDashboardTemplate(rawSlug) || DASHBOARD_TEMPLATES['classic-admin'];

  const [activeDevice, setActiveDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [customizerOpen, setCustomizerOpen] = useState(false);

  // Active section sequence initialized to template default
  const defaultSections = template ? (template.sections || getDashboardSections(template.slug)) : [];
  const [activeSections, setActiveSections] = useState<DashboardSectionKey[]>(defaultSections);

  useEffect(() => {
    if (template) {
      setActiveSections(template.sections || getDashboardSections(template.slug));
    }
  }, [template?.slug]);

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6 text-center">
        <div className="max-w-md p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
          <div className="text-4xl mb-3">📊</div>
          <h1 className="text-2xl font-bold mb-2">Dashboard Template Not Found</h1>
          <p className="text-sm text-slate-400 mb-6">
            The requested dashboard style does not exist in our catalog.
          </p>
          <Link
            href="/templates"
            className="inline-flex px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition"
          >
            ← Return to Templates Catalog
          </Link>
        </div>
      </div>
    );
  }

  // Find current style matching template
  const currentStyle =
    DASHBOARD_STYLES.find((s) => s.slug === template.slug || s.id === template.styleId) ||
    DASHBOARD_STYLES[0];

  const handleReorder = (newSections: DashboardSectionKey[]) => {
    setActiveSections(newSections);
  };

  const handleReset = () => {
    setActiveSections(template.sections || getDashboardSections(template.slug));
  };

  const handleStyleChange = (newSlug: string) => {
    router.push(`/templates/dashboard/${newSlug}`);
  };

  // Find next template for quick forward jump
  const currentIndex = DASHBOARD_STYLES.findIndex((s) => s.slug === currentStyle.slug);
  const nextStyle =
    currentIndex >= 0 && currentIndex < DASHBOARD_STYLES.length - 1
      ? DASHBOARD_STYLES[currentIndex + 1]
      : DASHBOARD_STYLES[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30">
      {/* Top Switcher & Control Header */}
      <DashboardSwitcherBar
        currentTemplate={template}
        activeDevice={activeDevice}
        onDeviceChange={setActiveDevice}
        onOpenCustomizer={() => setCustomizerOpen((prev) => !prev)}
        activeSectionCount={activeSections.length}
      />

      {/* Viewport Frame Simulator */}
      <main className="flex-1 w-full flex flex-col items-center justify-start py-4 px-2 sm:px-4 md:px-6">
        <div
          className={`w-full transition-all duration-300 ${
            activeDevice === 'mobile'
              ? 'max-w-[420px] my-4 rounded-[2.5rem] border-4 border-slate-700 bg-slate-900 shadow-2xl overflow-hidden'
              : activeDevice === 'tablet'
              ? 'max-w-[840px] my-4 rounded-2xl border-2 border-slate-700 bg-slate-900 shadow-2xl overflow-hidden'
              : 'max-w-[1600px] rounded-2xl border border-slate-800/80 bg-slate-950 overflow-hidden shadow-2xl'
          }`}
        >
          {/* Dashboard Application Shell with Nav and Main Container */}
          <DashboardLayoutShell
            template={template}
            onOpenCustomizer={() => setCustomizerOpen(true)}
          >
            <div className="p-4 sm:p-6 md:p-8 space-y-6">
              {activeSections.map((secKey, idx) => (
                <DynamicDashboardRenderer
                  key={`${secKey}-${idx}`}
                  sectionKey={secKey}
                  template={template}
                  index={idx}
                />
              ))}
            </div>
          </DashboardLayoutShell>
        </div>
      </main>

      {/* Floating Action Dock (Bottom Bar) */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-xl shadow-2xl text-xs text-white ring-1 ring-white/10">
        <div className="flex items-center gap-2 pl-1 pr-2 border-r border-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-200">
            #{currentStyle.id} {currentStyle.name}
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            ({activeSections.length} sections)
          </span>
        </div>

        <button
          onClick={() => setCustomizerOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition hover:border-emerald-500/50"
        >
          <span>🎛️</span>
          <span>Customize Layout</span>
        </button>

        <button
          onClick={() => handleStyleChange(nextStyle.slug)}
          className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs"
        >
          <span>Next Style →</span>
        </button>

        <a
          href={`https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20Template%20Dashboard%20${encodeURIComponent(currentStyle.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-950 transition"
        >
          <span>🚀</span>
          <span>Get This Template</span>
        </a>
      </div>

      {/* Side Slide-Over Drawer for Customizing Sections */}
      <DashboardSectionCustomizerDrawer
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        currentStyle={currentStyle}
        sections={activeSections}
        onReorder={handleReorder}
        onReset={handleReset}
        onStyleChange={handleStyleChange}
      />
    </div>
  );
}
