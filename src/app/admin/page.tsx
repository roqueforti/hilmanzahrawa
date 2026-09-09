'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderGit2, 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Database, 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Save, 
  Upload, 
  Check, 
  X, 
  AlertCircle, 
  Lock, 
  LogOut, 
  Sparkles, 
  Search, 
  Layers, 
  Eye, 
  Copy,
  ChevronRight,
  Code,
  ShieldCheck,
  Globe,
  Settings,
  ArrowRight
} from 'lucide-react';
import { slugify } from '@/lib/imageHelper';

// Reusable styling helpers for consistent landing-page aesthetic
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.8rem 1rem',
  borderRadius: '12px',
  background: '#f8fafc',
  border: '1px solid #cbd5e1',
  color: '#0f172a',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: 'inherit'
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.75rem',
  fontFamily: 'var(--font-mono, monospace)',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: '#475569',
  marginBottom: '0.45rem'
};

const focusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.target.style.borderColor = '#0ea5e9';
  e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.15)';
};

const blurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.target.style.borderColor = '#cbd5e1';
  e.target.style.boxShadow = 'none';
};

export default function AdminCMSPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Active Tab: 'projects' | 'bio' | 'experiences' | 'education' | 'certificates' | 'database'
  const [activeTab, setActiveTab] = useState<string>('projects');

  // Data State
  const [loading, setLoading] = useState<boolean>(true);
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [bio, setBio] = useState<any>({});
  const [experiences, setExperiences] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [honors, setHonors] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [organizations, setOrganizations] = useState<any[]>([]);

  // Search & Filters
  const [projectSearch, setProjectSearch] = useState<string>('');
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<string>('all');

  // Modals
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [editingExperience, setEditingExperience] = useState<any | null>(null);
  const [editingCertificate, setEditingCertificate] = useState<any | null>(null);
  const [editingEducation, setEditingEducation] = useState<any | null>(null);

  // Toast notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [copiedSql, setCopiedSql] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Check existing session
  useEffect(() => {
    const savedToken = sessionStorage.getItem('admin_token');
    if (savedToken) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });

      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem('admin_token', data.token);
        setIsAuthenticated(true);
        fetchData();
      } else {
        setAuthError(data.error || 'Password salah');
      }
    } catch (err: any) {
      setAuthError('Gagal terhubung ke server auth');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    setIsAuthenticated(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/data');
      const json = await res.json();

      setIsConfigured(json.isConfigured);
      if (json.data) {
        setProjects(json.data.projects || []);
        setBio(json.data.bio || {});
        setExperiences(json.data.experiences || []);
        setEducation(json.data.education || []);
        setHonors(json.data.honors || []);
        setCertificates(json.data.certificates || []);
        setOrganizations(json.data.organizations || []);
      }
    } catch (err) {
      showToast('Gagal memuat data dari API', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Media upload handler
  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>, onSuccess: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });

      const json = await res.json();
      if (json.success) {
        onSuccess(json.url);
        showToast('Media berhasil diunggah!');
      } else {
        showToast(json.error || 'Gagal mengunggah file', 'error');
      }
    } catch (err) {
      showToast('Terjadi kesalahan saat upload', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  // Save item helper
  const handleSaveItem = async (table: string, item: any, onDone: () => void) => {
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table, item })
      });

      const json = await res.json();
      if (json.success) {
        showToast('Perubahan berhasil disimpan ke database!');
        onDone();
        fetchData();
      } else {
        showToast(json.error || 'Gagal menyimpan perubahan', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Error saat menghubungi API', 'error');
    }
  };

  // Delete item helper
  const handleDeleteItem = async (table: string, id: string) => {
    if (!confirm('Apakah kamu yakin ingin menghapus data ini?')) return;

    try {
      const res = await fetch(`/api/admin/data?table=${table}&id=${id}`, {
        method: 'DELETE'
      });

      const json = await res.json();
      if (json.success) {
        showToast('Data berhasil dihapus');
        fetchData();
      } else {
        showToast(json.error || 'Gagal menghapus data', 'error');
      }
    } catch (err) {
      showToast('Error saat menghapus data', 'error');
    }
  };

  // Filtered projects
  const filteredProjects = projects.filter(p => {
    const matchSearch = (p.title || '').toLowerCase().includes(projectSearch.toLowerCase()) ||
                        (p.subtitle || '').toLowerCase().includes(projectSearch.toLowerCase()) ||
                        (p.tags || []).some((t: string) => t.toLowerCase().includes(projectSearch.toLowerCase()));
    if (projectCategoryFilter === 'all') return matchSearch;
    if (projectCategoryFilter === 'featured') return matchSearch && p.featured;
    return matchSearch && p.category === projectCategoryFilter;
  });

  // =========================================================================
  // LOGIN SCREEN (Matching Landing Page's Minimal Editorial Style)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f8fafc',
        backgroundImage: 'radial-gradient(ellipse at 50% 25%, rgba(56, 189, 248, 0.12) 0%, rgba(248, 250, 252, 0.95) 65%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        color: '#0f172a',
        fontFamily: 'var(--font-sans-display), system-ui, sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Soft studio feather effect */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '560px',
          height: '380px',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(248, 250, 252, 0) 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <motion.div 
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: '440px',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '28px',
            padding: '3rem 2.5rem',
            boxShadow: '0 20px 50px -12px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(0,0,0,0.03)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.15)'
            }}>
              <Lock size={24} color="#38bdf8" />
            </div>

            <h1 style={{ 
              fontSize: '1.85rem', 
              fontWeight: 800, 
              letterSpacing: '-0.02em', 
              color: '#0f172a',
              margin: 0
            }}>
              Hilman <span className="editorial-serif-italic" style={{ fontWeight: 400, color: '#0ea5e9' }}>CMS Studio</span>
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem', lineHeight: 1.5 }}>
              Portal Manajemen Konten Portofolio &amp; Integrasi Supabase
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>
                Admin Passcode / PIN
              </label>
              <input 
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Masukkan PIN Admin (default: hilman2026)"
                style={inputStyle}
                onFocus={focusHandler}
                onBlur={blurHandler}
                required
              />
              {authError && (
                <p style={{ color: '#ef4444', fontSize: '0.825rem', marginTop: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                  <AlertCircle size={15} /> {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              style={{
                width: '100%',
                padding: '0.95rem',
                borderRadius: '9999px',
                background: '#0f172a',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.95rem',
                border: 'none',
                cursor: isLoggingIn ? 'not-allowed' : 'pointer',
                opacity: isLoggingIn ? 0.7 : 1,
                boxShadow: '0 8px 20px rgba(15, 23, 42, 0.2)',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                if (!isLoggingIn) (e.currentTarget as HTMLElement).style.background = '#0284c7';
              }}
              onMouseLeave={(e) => {
                if (!isLoggingIn) (e.currentTarget as HTMLElement).style.background = '#0f172a';
              }}
            >
              <span>{isLoggingIn ? 'Memverifikasi...' : 'Buka Dashboard CMS'}</span>
              {!isLoggingIn && <ArrowRight size={16} />}
            </button>
          </form>

          <div style={{ marginTop: '2.25rem', textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
            <Link 
              href="/" 
              style={{ 
                color: '#64748b', 
                fontSize: '0.85rem', 
                fontWeight: 600,
                textDecoration: 'none', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.4rem',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = '#0ea5e9'}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = '#64748b'}
            >
              ← Kembali ke Beranda Portofolio
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // =========================================================================
  // MAIN DASHBOARD (Landing Page Matching Theme)
  // =========================================================================
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      color: '#0f172a',
      fontFamily: 'var(--font-sans-display), system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            style={{
              position: 'fixed',
              top: '1.5rem',
              right: '1.5rem',
              zIndex: 99999,
              background: toast.type === 'error' ? '#ef4444' : '#0f172a',
              color: '#ffffff',
              padding: '0.85rem 1.4rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              boxShadow: '0 12px 36px rgba(15, 23, 42, 0.18)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem'
            }}
          >
            {toast.type === 'error' ? <AlertCircle size={17} /> : <Check size={17} color="#38bdf8" />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP STICKY HEADER */}
      <header className="admin-header" style={{
        background: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #e2e8f0',
        padding: '1.1rem 2.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.95rem',
            color: '#38bdf8',
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.1)'
          }}>
            HZ
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>
                Hilman <span className="editorial-serif-italic" style={{ fontWeight: 400, color: '#0ea5e9' }}>CMS Studio</span>
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
              <span style={{
                display: 'inline-block',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: isConfigured ? '#10b981' : '#f59e0b',
                boxShadow: isConfigured ? '0 0 8px rgba(16, 185, 129, 0.5)' : '0 0 8px rgba(245, 158, 11, 0.5)'
              }} />
              <span style={{ 
                fontSize: '0.72rem', 
                fontFamily: 'var(--font-mono, monospace)', 
                color: isConfigured ? '#059669' : '#d97706', 
                fontWeight: 700,
                textTransform: 'uppercase', 
                letterSpacing: '0.04em' 
              }}>
                {isConfigured ? 'Supabase Live Connected' : 'Local Fallback Mode'}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link 
            href="/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '0.55rem 1.1rem',
              borderRadius: '9999px',
              background: '#f0f9ff',
              color: '#0284c7',
              border: '1px solid #bae6fd',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#e0f2fe';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#f0f9ff';
            }}
          >
            Lihat Web Live <ExternalLink size={13} />
          </Link>

          <button
            onClick={handleLogout}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '0.55rem 1.1rem',
              borderRadius: '9999px',
              background: '#ffffff',
              color: '#64748b',
              border: '1px solid #e2e8f0',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#fef2f2';
              (e.currentTarget as HTMLElement).style.color = '#ef4444';
              (e.currentTarget as HTMLElement).style.borderColor = '#fecaca';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#ffffff';
              (e.currentTarget as HTMLElement).style.color = '#64748b';
              (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0';
            }}
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      {/* SUB-NAV HORIZONTAL PILL TABS */}
      <nav className="admin-subnav" style={{
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '0.65rem 2.25rem',
        display: 'flex',
        gap: '0.5rem',
        overflowX: 'auto'
      }}>
        {[
          { id: 'projects', label: 'Proyek Portofolio', icon: FolderGit2, count: projects.length },
          { id: 'bio', label: 'Profil & Bio', icon: User },
          { id: 'experiences', label: 'Pengalaman', icon: Briefcase, count: experiences.length },
          { id: 'education', label: 'Edukasi & Prestasi', icon: GraduationCap, count: education.length + certificates.length },
          { id: 'database', label: 'Setup Supabase & SQL', icon: Database }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0.6rem 1.15rem',
                borderRadius: '12px',
                border: 'none',
                background: isActive ? '#0f172a' : 'transparent',
                color: isActive ? '#ffffff' : '#64748b',
                fontSize: '0.85rem',
                fontWeight: isActive ? 700 : 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.background = '#f1f5f9';
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              <Icon size={16} color={isActive ? '#38bdf8' : 'currentColor'} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span style={{
                  fontSize: '0.7rem',
                  padding: '0.15rem 0.55rem',
                  borderRadius: '9999px',
                  background: isActive ? 'rgba(255, 255, 255, 0.18)' : '#f1f5f9',
                  color: isActive ? '#ffffff' : '#475569',
                  fontWeight: 700
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="admin-main" style={{ flex: 1, padding: '2.5rem 2.25rem', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>

        {/* =========================================================================
           TAB 1: PROJECTS
           ========================================================================= */}
        {activeTab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', color: '#0f172a' }}>
                  Daftar Proyek
                </h1>
                <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.3rem' }}>
                  Kelola showcase proyek IT, desain grafis, dan aplikasi web Anda.
                </p>
              </div>

              <button
                onClick={() => setEditingProject({
                  title: '',
                  slug: '',
                  category: 'it',
                  role: '',
                  year: new Date().getFullYear().toString(),
                  subtitle: '',
                  description: '',
                  content: '',
                  tags: [],
                  featured: false,
                  device_type: 'desktop',
                  media_type: 'image',
                  image_url: '',
                  link: '',
                  sort_order: projects.length + 1
                })}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.4rem',
                  borderRadius: '9999px',
                  background: '#0f172a',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(15, 23, 42, 0.15)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = '#0ea5e9'}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = '#0f172a'}
              >
                <Plus size={18} /> Tambah Proyek Baru
              </button>
            </div>

            {/* Filter & Search Toolbar */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              flexWrap: 'wrap',
              background: '#ffffff',
              padding: '0.85rem 1.25rem',
              borderRadius: '18px',
              border: '1px solid #e2e8f0',
              marginBottom: '2rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}>
              <div style={{ position: 'relative', flex: '1 1 280px' }}>
                <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text"
                  placeholder="Cari berdasarkan judul, tag, atau keterangan..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 1rem 0.65rem 2.5rem',
                    borderRadius: '10px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    color: '#0f172a',
                    fontSize: '0.875rem',
                    outline: 'none',
                    transition: 'border 0.2s'
                  }}
                  onFocus={focusHandler}
                  onBlur={blurHandler}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {[
                  { id: 'all', label: 'Semua' },
                  { id: 'it', label: 'IT & Dev' },
                  { id: 'design', label: 'Design' },
                  { id: 'featured', label: '★ Featured' }
                ].map(cat => {
                  const isSelected = projectCategoryFilter === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setProjectCategoryFilter(cat.id)}
                      style={{
                        padding: '0.55rem 1rem',
                        borderRadius: '9999px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        border: '1px solid',
                        borderColor: isSelected ? '#0f172a' : '#e2e8f0',
                        cursor: 'pointer',
                        background: isSelected ? '#0f172a' : '#ffffff',
                        color: isSelected ? '#ffffff' : '#64748b',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Project Grid Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
              gap: '1.75rem'
            }}>
              {filteredProjects.map((p, idx) => (
                <motion.div
                  key={p.id || p._id || idx}
                  layout
                  style={{
                    background: '#ffffff',
                    borderRadius: '22px',
                    border: '1px solid #e2e8f0',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)' }}
                >
                  <div style={{ height: '175px', background: '#f1f5f9', position: 'relative', overflow: 'hidden' }}>
                    {(p.image || p.image_url) ? (
                      <img 
                        src={p.image || p.image_url} 
                        alt={p.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', opacity: 0.4 }}>
                        💻
                      </div>
                    )}

                    <div style={{ position: 'absolute', top: '0.85rem', left: '0.85rem', display: 'flex', gap: '0.4rem' }}>
                      <span style={{
                        padding: '0.3rem 0.75rem',
                        borderRadius: '9999px',
                        background: p.category === 'it' ? '#0ea5e9' : '#f07167',
                        color: '#ffffff',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono, monospace)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
                      }}>
                        {p.category || 'it'}
                      </span>
                      {p.featured && (
                        <span style={{
                          padding: '0.3rem 0.75rem',
                          borderRadius: '9999px',
                          background: '#fef3c7',
                          color: '#d97706',
                          border: '1px solid #fde68a',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          fontFamily: 'var(--font-mono, monospace)',
                          textTransform: 'uppercase'
                        }}>
                          ★ Featured
                        </span>
                      )}
                    </div>

                    <span style={{
                      position: 'absolute',
                      top: '0.85rem',
                      right: '0.85rem',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '9999px',
                      background: 'rgba(15, 23, 42, 0.75)',
                      backdropFilter: 'blur(8px)',
                      color: '#ffffff',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono, monospace)'
                    }}>
                      {p.year || '2026'}
                    </span>
                  </div>

                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem', letterSpacing: '-0.01em' }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.55, marginBottom: '1.1rem', flex: 1 }}>
                      {p.subtitle || p.description}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                      {(Array.isArray(p.tags) ? p.tags : []).slice(0, 4).map((t: string) => (
                        <span key={t} style={{
                          padding: '0.25rem 0.6rem',
                          borderRadius: '8px',
                          background: '#f1f5f9',
                          color: '#0284c7',
                          fontSize: '0.7rem',
                          fontFamily: 'var(--font-mono, monospace)',
                          fontWeight: 700
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '1rem',
                      borderTop: '1px solid #f1f5f9'
                    }}>
                      <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#94a3b8' }}>
                        /{p.slug}
                      </span>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => setEditingProject(p)}
                          style={{
                            padding: '0.45rem 0.85rem',
                            borderRadius: '10px',
                            background: '#f0f9ff',
                            color: '#0284c7',
                            border: '1px solid #bae6fd',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = '#e0f2fe'}
                          onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = '#f0f9ff'}
                        >
                          <Edit3 size={13} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem('projects', p.id || p._id)}
                          style={{
                            padding: '0.45rem 0.75rem',
                            borderRadius: '10px',
                            background: '#fef2f2',
                            color: '#ef4444',
                            border: '1px solid #fecaca',
                            fontSize: '0.78rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = '#fee2e2'}
                          onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = '#fef2f2'}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
           TAB 2: PROFILE & BIO
           ========================================================================= */}
        {activeTab === 'bio' && (
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', color: '#0f172a' }}>
                Profil &amp; Informasi Personal
              </h1>
              <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.3rem' }}>
                Atur identitas, bio pembuka, detail kontak, link media sosial, dan keahlian yang tampil di landing page.
              </p>
            </div>

            <div style={{
              background: '#ffffff',
              borderRadius: '24px',
              border: '1px solid #e2e8f0',
              padding: '2.5rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSaveItem('bio', bio, () => {});
              }}>
                <div className="admin-grid-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={labelStyle}>
                      Nama Lengkap
                    </label>
                    <input 
                      type="text"
                      value={bio.name || ''}
                      onChange={(e) => setBio({ ...bio, name: e.target.value })}
                      style={inputStyle}
                      onFocus={focusHandler}
                      onBlur={blurHandler}
                      required
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Headline / Jabatan
                    </label>
                    <input 
                      type="text"
                      value={bio.headline || ''}
                      onChange={(e) => setBio({ ...bio, headline: e.target.value })}
                      style={inputStyle}
                      onFocus={focusHandler}
                      onBlur={blurHandler}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={labelStyle}>
                    Tagline Hero (Teks Utama Halaman Utama)
                  </label>
                  <input 
                    type="text"
                    value={bio.tagline || ''}
                    onChange={(e) => setBio({ ...bio, tagline: e.target.value })}
                    style={inputStyle}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={labelStyle}>
                    Tentang Saya (About Paragraph)
                  </label>
                  <textarea 
                    rows={4}
                    value={bio.about || ''}
                    onChange={(e) => setBio({ ...bio, about: e.target.value })}
                    style={{ ...inputStyle, lineHeight: 1.6 }}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                  />
                </div>

                <div className="admin-grid-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={labelStyle}>
                      Email
                    </label>
                    <input 
                      type="email"
                      value={bio.email || ''}
                      onChange={(e) => setBio({ ...bio, email: e.target.value })}
                      style={inputStyle}
                      onFocus={focusHandler}
                      onBlur={blurHandler}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Nomor WhatsApp (Kode Negara, e.g. 6285806003234)
                    </label>
                    <input 
                      type="text"
                      value={bio.whatsapp || ''}
                      onChange={(e) => setBio({ ...bio, whatsapp: e.target.value })}
                      style={inputStyle}
                      onFocus={focusHandler}
                      onBlur={blurHandler}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Lokasi / Domisili
                    </label>
                    <input 
                      type="text"
                      value={bio.location || ''}
                      onChange={(e) => setBio({ ...bio, location: e.target.value })}
                      style={inputStyle}
                      onFocus={focusHandler}
                      onBlur={blurHandler}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={labelStyle}>
                    Medium Username (e.g. hilmanzahrawa)
                  </label>
                  <input 
                    type="text"
                    value={bio.medium_username || bio.mediumUsername || ''}
                    onChange={(e) => setBio({ ...bio, medium_username: e.target.value, mediumUsername: e.target.value })}
                    style={inputStyle}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                    placeholder="hilmanzahrawa"
                  />
                  <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                    Artikel Medium akan otomatis ditarik melalui RSS feed berdasarkan username ini.
                  </p>
                </div>

                <div style={{ marginBottom: '2.25rem' }}>
                  <label style={labelStyle}>
                    Keahlian &amp; Tech Stack (Pisahkan dengan koma)
                  </label>
                  <textarea 
                    rows={2}
                    value={bio.skills || ''}
                    onChange={(e) => setBio({ ...bio, skills: e.target.value })}
                    placeholder="Next.js, TypeScript, Laravel, Tailwind, Supabase, Figma"
                    style={{ ...inputStyle, lineHeight: 1.6 }}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.85rem 2rem',
                    borderRadius: '9999px',
                    background: '#0f172a',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(15, 23, 42, 0.15)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = '#0ea5e9'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = '#0f172a'}
                >
                  <Save size={16} /> Simpan Profil Bio
                </button>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================================
           TAB 3: EXPERIENCES
           ========================================================================= */}
        {activeTab === 'experiences' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', color: '#0f172a' }}>
                  Riwayat Pengalaman Kerja
                </h1>
                <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.3rem' }}>
                  Kelola pengalaman kerja, magang, dan freelance yang tampil di tab About.
                </p>
              </div>

              <button
                onClick={() => setEditingExperience({
                  company: '',
                  role: '',
                  slug: '',
                  start_date: '2024',
                  end_date: 'Present',
                  description: '',
                  details: '',
                  sort_order: experiences.length + 1
                })}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.4rem',
                  borderRadius: '9999px',
                  background: '#0f172a',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(15, 23, 42, 0.15)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = '#0ea5e9'}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = '#0f172a'}
              >
                <Plus size={18} /> Tambah Pengalaman
              </button>
            </div>

            <div style={{ display: 'grid', gap: '1.25rem' }}>
              {experiences.map((exp, idx) => (
                <div
                  key={exp.id || idx}
                  style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    border: '1px solid #e2e8f0',
                    padding: '1.75rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '1.5rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                        {exp.role}
                      </h3>
                      <span style={{ 
                        fontSize: '0.85rem', 
                        color: '#0284c7', 
                        fontWeight: 700,
                        background: '#f0f9ff',
                        padding: '0.2rem 0.65rem',
                        borderRadius: '8px',
                        border: '1px solid #bae6fd'
                      }}>
                        @{exp.company}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono, monospace)', color: '#64748b', display: 'block', marginBottom: '0.85rem' }}>
                      {exp.start_date || exp.startDate} — {exp.end_date || exp.endDate || 'Present'}
                    </span>
                    <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6, margin: 0 }}>
                      {exp.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                    <button
                      onClick={() => setEditingExperience(exp)}
                      style={{
                        padding: '0.5rem 0.85rem',
                        borderRadius: '10px',
                        background: '#f0f9ff',
                        color: '#0284c7',
                        border: '1px solid #bae6fd',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = '#e0f2fe'}
                      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = '#f0f9ff'}
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteItem('experiences', exp.id)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        borderRadius: '10px',
                        background: '#fef2f2',
                        color: '#ef4444',
                        border: '1px solid #fecaca',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = '#fee2e2'}
                      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = '#fef2f2'}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
           TAB 4: EDUCATION & CERTIFICATES
           ========================================================================= */}
        {activeTab === 'education' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', color: '#0f172a' }}>
                  Edukasi, Sertifikasi &amp; Prestasi
                </h1>
                <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.3rem' }}>
                  Kelola riwayat studi formal, sertifikat keahlian, dan lisensi.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => setEditingEducation({
                    school: '',
                    degree: '',
                    start_date: '2022',
                    end_date: 'Present',
                    description: '',
                    sort_order: education.length + 1
                  })}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.7rem 1.25rem',
                    borderRadius: '9999px',
                    background: '#ffffff',
                    color: '#0f172a',
                    border: '1px solid #cbd5e1',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = '#f1f5f9'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = '#ffffff'}
                >
                  <Plus size={16} /> Tambah Pendidikan
                </button>

                <button
                  onClick={() => setEditingCertificate({
                    title: '',
                    issuer: '',
                    date: new Date().getFullYear().toString(),
                    image_url: '',
                    sort_order: certificates.length + 1
                  })}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.7rem 1.25rem',
                    borderRadius: '9999px',
                    background: '#0f172a',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(15, 23, 42, 0.15)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = '#0ea5e9'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = '#0f172a'}
                >
                  <Plus size={16} /> Tambah Sertifikat
                </button>
              </div>
            </div>

            {/* Education List */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
              Riwayat Pendidikan
            </h3>
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '3rem' }}>
              {education.map((edu, idx) => (
                <div
                  key={edu.id || idx}
                  style={{
                    background: '#ffffff',
                    borderRadius: '18px',
                    border: '1px solid #e2e8f0',
                    padding: '1.35rem 1.75rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>{edu.school}</h4>
                    <p style={{ fontSize: '0.875rem', color: '#0ea5e9', fontWeight: 600, margin: '0.25rem 0' }}>{edu.degree}</p>
                    <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono, monospace)', color: '#64748b' }}>
                      {edu.start_date || edu.startDate} — {edu.end_date || edu.endDate || 'Present'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => setEditingEducation(edu)}
                      style={{ padding: '0.5rem 0.8rem', borderRadius: '10px', background: '#f0f9ff', color: '#0284c7', border: '1px solid #bae6fd', cursor: 'pointer' }}
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteItem('education', edu.id)}
                      style={{ padding: '0.5rem 0.75rem', borderRadius: '10px', background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', cursor: 'pointer' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Certificates List */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
              Sertifikasi &amp; Lisensi
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
              {certificates.map((cert, idx) => (
                <div
                  key={cert.id || idx}
                  style={{
                    background: '#ffffff',
                    borderRadius: '18px',
                    border: '1px solid #e2e8f0',
                    padding: '1.35rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
                  }}
                >
                  {(cert.image_url || cert.imageUrl) && (
                    <img 
                      src={cert.image_url || cert.imageUrl} 
                      alt={cert.title} 
                      style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '12px', marginBottom: '0.85rem' }} 
                    />
                  )}
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>{cert.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: '#0ea5e9', fontWeight: 600, margin: '0.25rem 0' }}>{cert.issuer}</p>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#64748b' }}>
                      {cert.date}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.25rem' }}>
                    <button
                      onClick={() => setEditingCertificate(cert)}
                      style={{ padding: '0.45rem 0.75rem', borderRadius: '8px', background: '#f0f9ff', color: '#0284c7', border: '1px solid #bae6fd', cursor: 'pointer' }}
                    >
                      <Edit3 size={13} />
                    </button>
                    <button
                      onClick={() => handleDeleteItem('certificates', cert.id)}
                      style={{ padding: '0.45rem 0.65rem', borderRadius: '8px', background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', cursor: 'pointer' }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
           TAB 5: SUPABASE SETUP & SQL
           ========================================================================= */}
        {activeTab === 'database' && (
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', color: '#0f172a' }}>
                Koneksi &amp; Skema Supabase
              </h1>
              <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.3rem' }}>
                Panduan integrasi database PostgreSQL Supabase dan konfigurasi Environment Variable.
              </p>
            </div>

            {/* Connection Status Card */}
            <div style={{
              background: isConfigured ? '#f0fdf4' : '#fffbeb',
              border: `1px solid ${isConfigured ? '#bbf7d0' : '#fde68a'}`,
              borderRadius: '20px',
              padding: '1.75rem',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.25rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: isConfigured ? '#10b981' : '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Database size={22} color="#ffffff" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: isConfigured ? '#166534' : '#92400e', margin: 0 }}>
                  Status: {isConfigured ? '🟢 Database Supabase Aktif & Terhubung' : '🟡 Menunggu Konfigurasi .env.local'}
                </h3>
                <p style={{ fontSize: '0.875rem', color: isConfigured ? '#15803d' : '#b45309', marginTop: '0.45rem', lineHeight: 1.6 }}>
                  {isConfigured 
                    ? 'Proyek portofolio Anda saat ini membaca dan menyimpan data secara langsung dari database Supabase PostgreSQL.' 
                    : 'Aplikasi saat ini berjalan menggunakan data default (fallback). Untuk menghubungkan ke project Supabase Anda, masukkan variabel NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY di file .env.local.'}
                </p>
              </div>
            </div>

            {/* Step-by-step instructions */}
            <div style={{
              background: '#ffffff',
              borderRadius: '24px',
              border: '1px solid #e2e8f0',
              padding: '2.25rem',
              marginBottom: '2rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
                Langkah Cepat Setup Supabase:
              </h3>

              <ol style={{ paddingLeft: '1.25rem', lineHeight: 1.8, fontSize: '0.92rem', color: '#334155' }}>
                <li>Buka dashboard Supabase di <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" style={{ color: '#0ea5e9', fontWeight: 700, textDecoration: 'none' }}>supabase.com/dashboard ↗</a>.</li>
                <li>Pilih proyek Anda, lalu buka menu <strong>SQL Editor</strong> di sidebar kiri.</li>
                <li>Salin script SQL di bawah ini dan klik tombol <strong>RUN</strong> di Supabase untuk membuat seluruh tabel, storage bucket, dan sample data secara otomatis.</li>
                <li>Buka menu <strong>Project Settings &gt; API</strong> di Supabase, lalu salin <strong>Project URL</strong> dan <strong>anon key</strong> ke dalam file <code>.env.local</code>.</li>
              </ol>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono, monospace)', fontWeight: 700, color: '#0ea5e9', textTransform: 'uppercase' }}>
                  supabase/schema.sql
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`-- Buka file d:\\PAL\\hilmanzahrawa\\supabase\\schema.sql untuk skema lengkap`);
                    setCopiedSql(true);
                    setTimeout(() => setCopiedSql(false), 2500);
                    showToast('Path file schema.sql berhasil disalin!');
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    background: '#f0f9ff',
                    color: '#0284c7',
                    border: '1px solid #bae6fd',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Copy size={13} /> {copiedSql ? 'Tersalin!' : 'Salin Info SQL'}
                </button>
              </div>

              <div style={{
                background: '#0f172a',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid #1e293b',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.82rem',
                color: '#38bdf8',
                lineHeight: 1.65,
                maxHeight: '260px',
                overflowY: 'auto'
              }}>
                <pre style={{ margin: 0 }}>
{`-- Skema SQL sudah siap di: supabase/schema.sql
-- Berisi tabel: projects, bio, experiences, education, honors, certificates, organizations, landing_page
-- Dilengkapi storage bucket 'portfolio' untuk media upload!`}
                </pre>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* =========================================================================
         MODALS: PROJECT ADD / EDIT MODAL
         ========================================================================= */}
      <AnimatePresence>
        {editingProject && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(15, 23, 42, 0.55)',
            backdropFilter: 'blur(12px)',
            zIndex: 9000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}>
            <motion.div
              className="admin-modal-box"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              style={{
                background: '#ffffff',
                borderRadius: '28px',
                border: '1px solid #e2e8f0',
                width: '100%',
                maxWidth: '780px',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '2.5rem',
                boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.25)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0, color: '#0f172a', letterSpacing: '-0.02em' }}>
                  {editingProject.id || editingProject._id ? 'Edit Proyek' : 'Tambah Proyek Baru'}
                </h2>
                <button
                  onClick={() => setEditingProject(null)}
                  style={{ 
                    background: '#f1f5f9', 
                    border: 'none', 
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748b', 
                    cursor: 'pointer' 
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                handleSaveItem('projects', editingProject, () => setEditingProject(null));
              }}>
                <div className="admin-grid-2col" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={labelStyle}>
                      Judul Proyek
                    </label>
                    <input 
                      type="text"
                      value={editingProject.title || ''}
                      onChange={(e) => {
                        const title = e.target.value;
                        setEditingProject({
                          ...editingProject,
                          title,
                          slug: editingProject.id ? editingProject.slug : slugify(title)
                        });
                      }}
                      style={inputStyle}
                      onFocus={focusHandler}
                      onBlur={blurHandler}
                      required
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Kategori
                    </label>
                    <select
                      value={editingProject.category || 'it'}
                      onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                      style={inputStyle}
                      onFocus={focusHandler}
                      onBlur={blurHandler}
                    >
                      <option value="it">IT &amp; Software</option>
                      <option value="design">Creative &amp; Design</option>
                    </select>
                  </div>
                </div>

                <div className="admin-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={labelStyle}>
                      URL Slug
                    </label>
                    <input 
                      type="text"
                      value={editingProject.slug || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, slug: slugify(e.target.value) })}
                      style={inputStyle}
                      onFocus={focusHandler}
                      onBlur={blurHandler}
                      required
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Tahun Proyek
                    </label>
                    <input 
                      type="text"
                      value={editingProject.year || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                      style={inputStyle}
                      onFocus={focusHandler}
                      onBlur={blurHandler}
                    />
                  </div>
                </div>

                <div className="admin-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={labelStyle}>
                      Peran / Role Anda
                    </label>
                    <input 
                      type="text"
                      value={editingProject.role || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, role: e.target.value })}
                      placeholder="e.g. Lead Full-Stack Developer"
                      style={inputStyle}
                      onFocus={focusHandler}
                      onBlur={blurHandler}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Link Proyek Live (URL)
                    </label>
                    <input 
                      type="url"
                      value={editingProject.link || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, link: e.target.value })}
                      placeholder="https://example.com"
                      style={inputStyle}
                      onFocus={focusHandler}
                      onBlur={blurHandler}
                    />
                  </div>
                </div>

                {/* Image Upload / URL */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={labelStyle}>
                    Gambar Utama (Thumbnail)
                  </label>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <input 
                      type="text"
                      value={editingProject.image_url || editingProject.image || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, image_url: e.target.value, image: e.target.value })}
                      placeholder="https://... atau upload file"
                      style={{ ...inputStyle, flex: 1 }}
                      onFocus={focusHandler}
                      onBlur={blurHandler}
                    />
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      style={{ display: 'none' }} 
                      accept="image/*"
                      onChange={(e) => handleUploadFile(e, (url) => {
                        setEditingProject({ ...editingProject, image_url: url, image: url });
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImage}
                      style={{
                        padding: '0.8rem 1.4rem',
                        borderRadius: '12px',
                        background: '#f0f9ff',
                        color: '#0284c7',
                        border: '1px solid #bae6fd',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = '#e0f2fe'}
                      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = '#f0f9ff'}
                    >
                      <Upload size={14} /> {uploadingImage ? 'Mengunggah...' : 'Upload'}
                    </button>
                  </div>

                  {(editingProject.image_url || editingProject.image) && (
                    <div style={{ marginTop: '0.85rem', height: '130px', width: '240px', borderRadius: '14px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                      <img 
                        src={editingProject.image_url || editingProject.image} 
                        alt="Preview" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={labelStyle}>
                    Subtitle Singkat
                  </label>
                  <input 
                    type="text"
                    value={editingProject.subtitle || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                    placeholder="Deskripsi satu kalimat untuk preview card"
                    style={inputStyle}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={labelStyle}>
                    Tags / Teknologi (pisahkan dengan koma)
                  </label>
                  <input 
                    type="text"
                    value={Array.isArray(editingProject.tags) ? editingProject.tags.join(', ') : (editingProject.tags || '')}
                    onChange={(e) => {
                      const tagsArray = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                      setEditingProject({ ...editingProject, tags: tagsArray });
                    }}
                    placeholder="Next.js, TypeScript, PostgreSQL"
                    style={inputStyle}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={labelStyle}>
                    Deskripsi Detail &amp; Outcome
                  </label>
                  <textarea 
                    rows={4}
                    value={editingProject.description || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    style={{ ...inputStyle, lineHeight: 1.6 }}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                  />
                </div>

                <div style={{ marginBottom: '1.75rem' }}>
                  <label style={labelStyle}>
                    Konten Lengkap (Format Markdown / Halaman Detail)
                  </label>
                  <textarea 
                    rows={6}
                    value={typeof editingProject.content === 'string' ? editingProject.content : ''}
                    onChange={(e) => setEditingProject({ ...editingProject, content: e.target.value })}
                    placeholder="### Overview&#10;Penjelasan mendalam mengenai arsitektur dan hasil implementasi..."
                    style={{ ...inputStyle, fontFamily: 'var(--font-mono, monospace)', fontSize: '0.85rem', lineHeight: 1.6 }}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '2.25rem' }}>
                  <input 
                    type="checkbox"
                    id="featured"
                    checked={Boolean(editingProject.featured)}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: '#0ea5e9', cursor: 'pointer' }}
                  />
                  <label htmlFor="featured" style={{ fontSize: '0.875rem', fontWeight: 700, color: '#334155', cursor: 'pointer' }}>
                    Tandai sebagai Featured Project (tampil di bagian atas Selected Work)
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.85rem' }}>
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    style={{
                      padding: '0.8rem 1.6rem',
                      borderRadius: '9999px',
                      background: '#f1f5f9',
                      color: '#64748b',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: '0.875rem'
                    }}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '0.8rem 2rem',
                      borderRadius: '9999px',
                      background: '#0f172a',
                      color: '#ffffff',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 800,
                      fontSize: '0.875rem',
                      boxShadow: '0 4px 14px rgba(15, 23, 42, 0.15)'
                    }}
                  >
                    Simpan Proyek
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
         MODAL: EXPERIENCE ADD / EDIT
         ========================================================================= */}
      <AnimatePresence>
        {editingExperience && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(15, 23, 42, 0.55)',
            backdropFilter: 'blur(12px)',
            zIndex: 9000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}>
            <motion.div
              className="admin-modal-box"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: '#ffffff',
                borderRadius: '28px',
                border: '1px solid #e2e8f0',
                width: '100%',
                maxWidth: '600px',
                padding: '2.5rem',
                boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.25)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#0f172a', letterSpacing: '-0.02em' }}>
                  {editingExperience.id ? 'Edit Pengalaman' : 'Tambah Pengalaman'}
                </h2>
                <button
                  onClick={() => setEditingExperience(null)}
                  style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer' }}
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                handleSaveItem('experiences', editingExperience, () => setEditingExperience(null));
              }}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={labelStyle}>
                    Nama Perusahaan / Organisasi
                  </label>
                  <input 
                    type="text"
                    value={editingExperience.company || ''}
                    onChange={(e) => setEditingExperience({
                      ...editingExperience,
                      company: e.target.value,
                      slug: editingExperience.id ? editingExperience.slug : slugify(e.target.value)
                    })}
                    style={inputStyle}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                    required
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={labelStyle}>
                    Jabatan / Role
                  </label>
                  <input 
                    type="text"
                    value={editingExperience.role || ''}
                    onChange={(e) => setEditingExperience({ ...editingExperience, role: e.target.value })}
                    style={inputStyle}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                    required
                  />
                </div>

                <div className="admin-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={labelStyle}>
                      Tanggal Mulai
                    </label>
                    <input 
                      type="text"
                      value={editingExperience.start_date || editingExperience.startDate || ''}
                      onChange={(e) => setEditingExperience({ ...editingExperience, start_date: e.target.value, startDate: e.target.value })}
                      placeholder="e.g. Jan 2024"
                      style={inputStyle}
                      onFocus={focusHandler}
                      onBlur={blurHandler}
                      required
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Tanggal Selesai
                    </label>
                    <input 
                      type="text"
                      value={editingExperience.end_date || editingExperience.endDate || ''}
                      onChange={(e) => setEditingExperience({ ...editingExperience, end_date: e.target.value, endDate: e.target.value })}
                      placeholder="Present / Sekarang"
                      style={inputStyle}
                      onFocus={focusHandler}
                      onBlur={blurHandler}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={labelStyle}>
                    Deskripsi Pekerjaan
                  </label>
                  <textarea 
                    rows={4}
                    value={editingExperience.description || ''}
                    onChange={(e) => setEditingExperience({ ...editingExperience, description: e.target.value })}
                    style={{ ...inputStyle, lineHeight: 1.55 }}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.85rem' }}>
                  <button
                    type="button"
                    onClick={() => setEditingExperience(null)}
                    style={{ padding: '0.75rem 1.4rem', borderRadius: '9999px', background: '#f1f5f9', color: '#64748b', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    style={{ padding: '0.75rem 1.8rem', borderRadius: '9999px', background: '#0f172a', color: '#ffffff', border: 'none', cursor: 'pointer', fontWeight: 800 }}
                  >
                    Simpan Pengalaman
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
         MODAL: CERTIFICATE ADD / EDIT
         ========================================================================= */}
      <AnimatePresence>
        {editingCertificate && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(15, 23, 42, 0.55)',
            backdropFilter: 'blur(12px)',
            zIndex: 9000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}>
            <motion.div
              className="admin-modal-box"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: '#ffffff',
                borderRadius: '28px',
                border: '1px solid #e2e8f0',
                width: '100%',
                maxWidth: '560px',
                padding: '2.5rem',
                boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.25)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#0f172a', letterSpacing: '-0.02em' }}>
                  {editingCertificate.id ? 'Edit Sertifikat' : 'Tambah Sertifikat'}
                </h2>
                <button
                  onClick={() => setEditingCertificate(null)}
                  style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer' }}
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                handleSaveItem('certificates', editingCertificate, () => setEditingCertificate(null));
              }}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={labelStyle}>
                    Nama Sertifikat / Lisensi
                  </label>
                  <input 
                    type="text"
                    value={editingCertificate.title || ''}
                    onChange={(e) => setEditingCertificate({ ...editingCertificate, title: e.target.value })}
                    style={inputStyle}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                    required
                  />
                </div>

                <div className="admin-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={labelStyle}>
                      Penerbit (Issuer)
                    </label>
                    <input 
                      type="text"
                      value={editingCertificate.issuer || ''}
                      onChange={(e) => setEditingCertificate({ ...editingCertificate, issuer: e.target.value })}
                      placeholder="e.g. Google, Coursera, Dicoding"
                      style={inputStyle}
                      onFocus={focusHandler}
                      onBlur={blurHandler}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Tahun / Tanggal Diterima
                    </label>
                    <input 
                      type="text"
                      value={editingCertificate.date || ''}
                      onChange={(e) => setEditingCertificate({ ...editingCertificate, date: e.target.value })}
                      placeholder="e.g. 2025"
                      style={inputStyle}
                      onFocus={focusHandler}
                      onBlur={blurHandler}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={labelStyle}>
                    Gambar Sertifikat (URL)
                  </label>
                  <input 
                    type="text"
                    value={editingCertificate.image_url || editingCertificate.imageUrl || ''}
                    onChange={(e) => setEditingCertificate({ ...editingCertificate, image_url: e.target.value, imageUrl: e.target.value })}
                    placeholder="URL gambar sertifikat"
                    style={inputStyle}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.85rem' }}>
                  <button
                    type="button"
                    onClick={() => setEditingCertificate(null)}
                    style={{ padding: '0.75rem 1.4rem', borderRadius: '9999px', background: '#f1f5f9', color: '#64748b', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    style={{ padding: '0.75rem 1.8rem', borderRadius: '9999px', background: '#0f172a', color: '#ffffff', border: 'none', cursor: 'pointer', fontWeight: 800 }}
                  >
                    Simpan Sertifikat
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
         MODAL: EDUCATION ADD / EDIT
         ========================================================================= */}
      <AnimatePresence>
        {editingEducation && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(15, 23, 42, 0.55)',
            backdropFilter: 'blur(12px)',
            zIndex: 9000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}>
            <motion.div
              className="admin-modal-box"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: '#ffffff',
                borderRadius: '28px',
                border: '1px solid #e2e8f0',
                width: '100%',
                maxWidth: '560px',
                padding: '2.5rem',
                boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.25)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#0f172a', letterSpacing: '-0.02em' }}>
                  {editingEducation.id ? 'Edit Edukasi' : 'Tambah Edukasi'}
                </h2>
                <button
                  onClick={() => setEditingEducation(null)}
                  style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer' }}
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                handleSaveItem('education', editingEducation, () => setEditingEducation(null));
              }}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={labelStyle}>
                    Institusi / Universitas / Sekolah
                  </label>
                  <input 
                    type="text"
                    value={editingEducation.school || ''}
                    onChange={(e) => setEditingEducation({ ...editingEducation, school: e.target.value })}
                    style={inputStyle}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                    required
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={labelStyle}>
                    Gelar / Jurusan
                  </label>
                  <input 
                    type="text"
                    value={editingEducation.degree || ''}
                    onChange={(e) => setEditingEducation({ ...editingEducation, degree: e.target.value })}
                    style={inputStyle}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                    required
                  />
                </div>

                <div className="admin-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                  <div>
                    <label style={labelStyle}>
                      Tahun Mulai
                    </label>
                    <input 
                      type="text"
                      value={editingEducation.start_date || editingEducation.startDate || ''}
                      onChange={(e) => setEditingEducation({ ...editingEducation, start_date: e.target.value, startDate: e.target.value })}
                      style={inputStyle}
                      onFocus={focusHandler}
                      onBlur={blurHandler}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Tahun Selesai
                    </label>
                    <input 
                      type="text"
                      value={editingEducation.end_date || editingEducation.endDate || ''}
                      onChange={(e) => setEditingEducation({ ...editingEducation, end_date: e.target.value, endDate: e.target.value })}
                      style={inputStyle}
                      onFocus={focusHandler}
                      onBlur={blurHandler}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.85rem' }}>
                  <button
                    type="button"
                    onClick={() => setEditingEducation(null)}
                    style={{ padding: '0.75rem 1.4rem', borderRadius: '9999px', background: '#f1f5f9', color: '#64748b', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    style={{ padding: '0.75rem 1.8rem', borderRadius: '9999px', background: '#0f172a', color: '#ffffff', border: 'none', cursor: 'pointer', fontWeight: 800 }}
                  >
                    Simpan Edukasi
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
