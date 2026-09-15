'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  BarChart3, 
  Layers, 
  Users, 
  CreditCard, 
  Settings, 
  Bell, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  Sparkles,
  Command,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import { DashboardTemplate } from '@/data/dashboardTemplates';

interface DashboardLayoutShellProps {
  template: DashboardTemplate;
  children: React.ReactNode;
  onOpenCustomizer?: () => void;
}

export default function DashboardLayoutShell({
  template,
  children,
  onOpenCustomizer
}: DashboardLayoutShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('overview');

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics & KPI', icon: BarChart3 },
    { id: 'projects', label: 'Projects / Feed', icon: Layers },
    { id: 'team', label: 'Team & Access', icon: Users },
    { id: 'billing', label: 'Billing & Treasury', icon: CreditCard },
    { id: 'settings', label: 'Settings & API', icon: Settings },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0f1d', color: '#ffffff', fontFamily: 'var(--font-sans-display)' }}>
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 90, backdropFilter: 'blur(4px)' }}
        />
      )}

      {/* =========================================================================
         SIDEBAR NAVIGATION
         ========================================================================= */}
      <aside
        style={{
          width: sidebarCollapsed ? '80px' : '260px',
          background: '#0f172a',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 95,
          transition: 'width 0.25s ease',
          flexShrink: 0,
        }}
      >
        <div>
          {/* Sidebar Header / Brand */}
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: sidebarCollapsed ? 'center' : 'space-between',
            }}
          >
            {!sidebarCollapsed && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    background: template.accentColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 14px ${template.accentGlow}`,
                    fontWeight: 800,
                    fontSize: '1rem',
                    color: '#ffffff',
                  }}
                >
                  {template.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#ffffff', letterSpacing: '-0.02em' }}>
                    {template.name}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                    Style #{template.styleId}
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              aria-label="Toggle Sidebar"
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#cbd5e1',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
          </div>

          {/* Nav Items */}
          <nav style={{ padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  title={sidebarCollapsed ? item.label : undefined}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: sidebarCollapsed ? '0.65rem' : '0.65rem 0.95rem',
                    borderRadius: '10px',
                    background: isActive ? template.accentColor : 'transparent',
                    border: 'none',
                    color: isActive ? '#ffffff' : '#94a3b8',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                    transition: 'all 0.15s ease',
                    boxShadow: isActive ? `0 2px 12px ${template.accentGlow}` : 'none',
                  }}
                >
                  <Icon size={16} color={isActive ? '#ffffff' : '#94a3b8'} />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          {onOpenCustomizer && !sidebarCollapsed && (
            <button
              onClick={onOpenCustomizer}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                padding: '0.55rem 0.75rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: `1px dashed ${template.accentColor}`,
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: '0.65rem',
              }}
            >
              <Sparkles size={12} color={template.accentColor} />
              <span>Customize Sections</span>
            </button>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.45rem',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.03)',
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
            }}
          >
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#ffffff' }}>
              HZ
            </div>
            {!sidebarCollapsed && (
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Hilman Admin</div>
                <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Pro Tier User</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* =========================================================================
         MAIN CONTENT AREA
         ========================================================================= */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowX: 'hidden' }}>
        {/* Top App Bar */}
        <header
          style={{
            padding: '0.75rem 2rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 80,
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, maxWidth: '480px' }}>
            {/* Search Box */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Search size={14} color="#64748b" style={{ position: 'absolute', left: '0.75rem' }} />
              <input
                type="text"
                placeholder="Search telemetry, users, orders or logs (Press ⌘K)..."
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem 0.5rem 2.25rem',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#cbd5e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
              }}
              title="Notifications"
            >
              <Bell size={15} />
              <span style={{ position: 'absolute', top: '6px', right: '6px', width: '6px', height: '6px', borderRadius: '50%', background: template.accentColor }} />
            </button>

            <Link
              href="/templates"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.95rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                fontSize: '0.78rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <span>Marketplace</span>
            </Link>
          </div>
        </header>

        {/* Dashboard Content Container */}
        <main style={{ padding: '2rem', flex: 1, maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
