'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Code
} from 'lucide-react';
import { slugify } from '@/lib/imageHelper';

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

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at top, #002b3a 0%, #00121a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        color: '#fdfcdc',
        fontFamily: 'var(--font-sans, system-ui, sans-serif)'
      }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: '100%',
            maxWidth: '440px',
            background: 'rgba(0, 43, 58, 0.65)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 175, 185, 0.3)',
            borderRadius: '24px',
            padding: '2.75rem',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #0081a7, #00afb9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto',
              boxShadow: '0 8px 24px rgba(0, 175, 185, 0.3)'
            }}>
              <Lock size={26} color="#ffffff" />
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fdfcdc' }}>
              Hilman CMS Studio
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'rgba(253, 252, 220, 0.65)', marginTop: '0.4rem' }}>
              Portal Manajemen Konten Portofolio & Supabase
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', color: '#00afb9' }}>
                Admin Passcode / PIN
              </label>
              <input 
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Masukkan PIN Admin (default: hilman2026)"
                style={{
                  width: '100%',
                  padding: '0.9rem 1.1rem',
                  borderRadius: '12px',
                  background: 'rgba(0, 18, 26, 0.6)',
                  border: '1px solid rgba(0, 175, 185, 0.3)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#00afb9'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(0, 175, 185, 0.3)'}
                required
              />
              {authError && (
                <p style={{ color: '#fed9b7', fontSize: '0.8rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <AlertCircle size={14} /> {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              style={{
                width: '100%',
                padding: '0.95rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0081a7, #00afb9)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.95rem',
                border: 'none',
                cursor: isLoggingIn ? 'not-allowed' : 'pointer',
                opacity: isLoggingIn ? 0.7 : 1,
                boxShadow: '0 6px 20px rgba(0, 129, 167, 0.35)',
                transition: 'all 0.2s'
              }}
            >
              {isLoggingIn ? 'Memverifikasi...' : 'Buka Dashboard CMS →'}
            </button>
          </form>

          <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.25rem' }}>
            <a href="/" style={{ color: '#00afb9', fontSize: '0.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              ← Kembali ke Beranda Portofolio
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#00141d',
      color: '#fdfcdc',
      fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '1.5rem',
              right: '1.5rem',
              zIndex: 99999,
              background: toast.type === 'error' ? '#e63946' : '#0081a7',
              color: '#ffffff',
              padding: '0.85rem 1.4rem',
              borderRadius: '12px',
              fontSize: '0.85rem',
              fontWeight: 700,
              boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {toast.type === 'error' ? <AlertCircle size={16} /> : <Check size={16} />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP HEADER */}
      <header style={{
        background: 'rgba(0, 27, 38, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0, 175, 185, 0.2)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #0081a7, #00afb9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: '1rem',
            color: '#fff'
          }}>
            HZ
          </div>
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fdfcdc', letterSpacing: '-0.02em', margin: 0 }}>
              Hilman CMS Studio
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
              <span style={{
                display: 'inline-block',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: isConfigured ? '#55a630' : '#f4a261',
                boxShadow: isConfigured ? '0 0 8px #55a630' : '0 0 8px #f4a261'
              }} />
              <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: isConfigured ? '#a7c957' : '#f4a261', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {isConfigured ? 'Supabase Live Connected' : 'Local Fallback Mode'}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <a 
            href="/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.78rem',
              fontWeight: 700,
              padding: '0.55rem 1rem',
              borderRadius: '10px',
              background: 'rgba(0, 175, 185, 0.15)',
              color: '#00afb9',
              border: '1px solid rgba(0, 175, 185, 0.3)',
              textDecoration: 'none'
            }}
          >
            Lihat Web Live <ExternalLink size={14} />
          </a>

          <button
            onClick={handleLogout}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.78rem',
              fontWeight: 700,
              padding: '0.55rem 1rem',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.06)',
              color: 'rgba(253, 252, 220, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              cursor: 'pointer'
            }}
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      {/* SUB-NAV TABS */}
      <nav style={{
        background: 'rgba(0, 20, 29, 0.95)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '0.5rem 2rem',
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
                gap: '0.5rem',
                padding: '0.65rem 1.15rem',
                borderRadius: '10px',
                border: 'none',
                background: isActive ? 'rgba(0, 175, 185, 0.2)' : 'transparent',
                color: isActive ? '#00afb9' : 'rgba(253, 252, 220, 0.65)',
                fontSize: '0.85rem',
                fontWeight: isActive ? 800 : 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span style={{
                  fontSize: '0.68rem',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '12px',
                  background: isActive ? '#00afb9' : 'rgba(255, 255, 255, 0.1)',
                  color: isActive ? '#00141d' : '#fdfcdc',
                  fontWeight: 800
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, padding: '2rem', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>

        {/* TAB 1: PROJECTS */}
        {activeTab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
              <div>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>Daftar Proyek</h1>
                <p style={{ fontSize: '0.85rem', color: 'rgba(253, 252, 220, 0.6)', marginTop: '0.2rem' }}>
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
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #0081a7, #00afb9)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(0, 129, 167, 0.4)'
                }}
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
              background: 'rgba(0, 27, 38, 0.5)',
              padding: '1rem 1.25rem',
              borderRadius: '16px',
              border: '1px solid rgba(0, 175, 185, 0.15)',
              marginBottom: '2rem'
            }}>
              <div style={{ position: 'relative', flex: '1 1 280px' }}>
                <Search size={16} color="rgba(253, 252, 220, 0.5)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text"
                  placeholder="Cari berdasarkan judul, tag, atau keterangan..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 1rem 0.65rem 2.5rem',
                    borderRadius: '10px',
                    background: 'rgba(0, 18, 26, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {[
                  { id: 'all', label: 'Semua' },
                  { id: 'it', label: 'IT & Dev' },
                  { id: 'design', label: 'Design' },
                  { id: 'featured', label: '★ Featured' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setProjectCategoryFilter(cat.id)}
                    style={{
                      padding: '0.5rem 0.9rem',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      background: projectCategoryFilter === cat.id ? '#00afb9' : 'rgba(255, 255, 255, 0.06)',
                      color: projectCategoryFilter === cat.id ? '#00141d' : 'rgba(253, 252, 220, 0.8)'
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Project Grid Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '1.5rem'
            }}>
              {filteredProjects.map((p, idx) => (
                <motion.div
                  key={p.id || p._id || idx}
                  layout
                  style={{
                    background: 'rgba(0, 31, 43, 0.7)',
                    borderRadius: '18px',
                    border: '1px solid rgba(0, 175, 185, 0.2)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.25)'
                  }}
                >
                  <div style={{ height: '160px', background: 'rgba(0, 18, 26, 0.8)', position: 'relative', overflow: 'hidden' }}>
                    {(p.image || p.image_url) ? (
                      <img 
                        src={p.image || p.image_url} 
                        alt={p.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', opacity: 0.3 }}>
                        💻
                      </div>
                    )}

                    <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', gap: '0.4rem' }}>
                      <span style={{
                        padding: '0.25rem 0.65rem',
                        borderRadius: '20px',
                        background: p.category === 'it' ? 'rgba(0, 129, 167, 0.85)' : 'rgba(240, 113, 103, 0.85)',
                        color: '#ffffff',
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        fontFamily: 'var(--font-mono)',
                        textTransform: 'uppercase',
                        backdropFilter: 'blur(8px)'
                      }}>
                        {p.category || 'it'}
                      </span>
                      {p.featured && (
                        <span style={{
                          padding: '0.25rem 0.65rem',
                          borderRadius: '20px',
                          background: 'rgba(254, 217, 183, 0.9)',
                          color: '#001824',
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          fontFamily: 'var(--font-mono)',
                          textTransform: 'uppercase'
                        }}>
                          ★ Featured
                        </span>
                      )}
                    </div>

                    <span style={{
                      position: 'absolute',
                      top: '0.75rem',
                      right: '0.75rem',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '20px',
                      background: 'rgba(0, 20, 29, 0.85)',
                      color: 'rgba(253, 252, 220, 0.75)',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)'
                    }}>
                      {p.year || '2026'}
                    </span>
                  </div>

                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.35rem' }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: '0.825rem', color: 'rgba(253, 252, 220, 0.65)', lineHeight: 1.5, marginBottom: '1rem', flex: 1 }}>
                      {p.subtitle || p.description}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                      {(Array.isArray(p.tags) ? p.tags : []).slice(0, 4).map((t: string) => (
                        <span key={t} style={{
                          padding: '0.2rem 0.5rem',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.07)',
                          color: '#00afb9',
                          fontSize: '0.65rem',
                          fontFamily: 'var(--font-mono)',
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
                      paddingTop: '0.85rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                    }}>
                      <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'rgba(253, 252, 220, 0.5)' }}>
                        /{p.slug}
                      </span>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => setEditingProject(p)}
                          style={{
                            padding: '0.45rem 0.75rem',
                            borderRadius: '8px',
                            background: 'rgba(0, 175, 185, 0.2)',
                            color: '#00afb9',
                            border: '1px solid rgba(0, 175, 185, 0.3)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                          }}
                        >
                          <Edit3 size={13} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem('projects', p.id || p._id)}
                          style={{
                            padding: '0.45rem 0.65rem',
                            borderRadius: '8px',
                            background: 'rgba(230, 57, 70, 0.15)',
                            color: '#e63946',
                            border: '1px solid rgba(230, 57, 70, 0.25)',
                            fontSize: '0.75rem',
                            cursor: 'pointer'
                          }}
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

        {/* TAB 2: PROFILE & BIO */}
        {activeTab === 'bio' && (
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>Profil & Informasi Personal</h1>
              <p style={{ fontSize: '0.85rem', color: 'rgba(253, 252, 220, 0.6)', marginTop: '0.2rem' }}>
                Atur identitas, bio pembuka, detail kontak, link media sosial, dan keahlian yang tampil di landing page.
              </p>
            </div>

            <div style={{
              background: 'rgba(0, 31, 43, 0.7)',
              borderRadius: '20px',
              border: '1px solid rgba(0, 175, 185, 0.2)',
              padding: '2rem',
              boxShadow: '0 12px 36px rgba(0,0,0,0.3)'
            }}>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSaveItem('bio', bio, () => {});
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.5rem' }}>
                      Nama Lengkap
                    </label>
                    <input 
                      type="text"
                      value={bio.name || ''}
                      onChange={(e) => setBio({ ...bio, name: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.5rem' }}>
                      Headline / Jabatan
                    </label>
                    <input 
                      type="text"
                      value={bio.headline || ''}
                      onChange={(e) => setBio({ ...bio, headline: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.5rem' }}>
                    Tagline Hero (Teks Utama Halaman Utama)
                  </label>
                  <input 
                    type="text"
                    value={bio.tagline || ''}
                    onChange={(e) => setBio({ ...bio, tagline: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.5rem' }}>
                    Tentang Saya (About Paragraph)
                  </label>
                  <textarea 
                    rows={4}
                    value={bio.about || ''}
                    onChange={(e) => setBio({ ...bio, about: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none', lineHeight: 1.6 }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.5rem' }}>
                      Email
                    </label>
                    <input 
                      type="email"
                      value={bio.email || ''}
                      onChange={(e) => setBio({ ...bio, email: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.5rem' }}>
                      Nomor WhatsApp (dengan kode negara, e.g. 6285806003234)
                    </label>
                    <input 
                      type="text"
                      value={bio.whatsapp || ''}
                      onChange={(e) => setBio({ ...bio, whatsapp: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.5rem' }}>
                      Lokasi / Domisili
                    </label>
                    <input 
                      type="text"
                      value={bio.location || ''}
                      onChange={(e) => setBio({ ...bio, location: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.5rem' }}>
                    Medium Username (e.g. hilmanzahrawa)
                  </label>
                  <input 
                    type="text"
                    value={bio.medium_username || bio.mediumUsername || ''}
                    onChange={(e) => setBio({ ...bio, medium_username: e.target.value, mediumUsername: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                    placeholder="hilmanzahrawa"
                  />
                  <p style={{ fontSize: '0.75rem', color: 'rgba(253, 252, 220, 0.5)', marginTop: '0.35rem' }}>
                    Artikel Medium akan otomatis ditarik melalui RSS feed berdasarkan username ini.
                  </p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.5rem' }}>
                    Keahlian & Tech Stack (Pisahkan dengan koma)
                  </label>
                  <textarea 
                    rows={2}
                    value={bio.skills || ''}
                    onChange={(e) => setBio({ ...bio, skills: e.target.value })}
                    placeholder="Next.js, TypeScript, Laravel, Tailwind, Supabase, Figma"
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.85rem 1.8rem',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #0081a7, #00afb9)',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(0, 129, 167, 0.4)'
                  }}
                >
                  <Save size={16} /> Simpan Profil Bio
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: EXPERIENCES */}
        {activeTab === 'experiences' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
              <div>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>Riwayat Pengalaman Kerja</h1>
                <p style={{ fontSize: '0.85rem', color: 'rgba(253, 252, 220, 0.6)', marginTop: '0.2rem' }}>
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
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #0081a7, #00afb9)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Plus size={18} /> Tambah Pengalaman
              </button>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              {experiences.map((exp, idx) => (
                <div
                  key={exp.id || idx}
                  style={{
                    background: 'rgba(0, 31, 43, 0.7)',
                    borderRadius: '16px',
                    border: '1px solid rgba(0, 175, 185, 0.2)',
                    padding: '1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '1.5rem'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                        {exp.role}
                      </h3>
                      <span style={{ fontSize: '0.85rem', color: '#00afb9', fontWeight: 700 }}>
                        @ {exp.company}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'rgba(253, 252, 220, 0.6)', display: 'block', marginBottom: '0.75rem' }}>
                      {exp.start_date || exp.startDate} — {exp.end_date || exp.endDate || 'Present'}
                    </span>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(253, 252, 220, 0.8)', lineHeight: 1.5, margin: 0 }}>
                      {exp.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                    <button
                      onClick={() => setEditingExperience(exp)}
                      style={{
                        padding: '0.45rem 0.75rem',
                        borderRadius: '8px',
                        background: 'rgba(0, 175, 185, 0.2)',
                        color: '#00afb9',
                        border: '1px solid rgba(0, 175, 185, 0.3)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteItem('experiences', exp.id)}
                      style={{
                        padding: '0.45rem 0.65rem',
                        borderRadius: '8px',
                        background: 'rgba(230, 57, 70, 0.15)',
                        color: '#e63946',
                        border: '1px solid rgba(230, 57, 70, 0.25)',
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: EDUCATION & CERTIFICATES */}
        {activeTab === 'education' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
              <div>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>Edukasi, Sertifikasi & Prestasi</h1>
                <p style={{ fontSize: '0.85rem', color: 'rgba(253, 252, 220, 0.6)', marginTop: '0.2rem' }}>
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
                    padding: '0.7rem 1.2rem',
                    borderRadius: '10px',
                    background: 'rgba(0, 175, 185, 0.2)',
                    color: '#00afb9',
                    border: '1px solid rgba(0, 175, 185, 0.3)',
                    fontWeight: 700,
                    fontSize: '0.825rem',
                    cursor: 'pointer'
                  }}
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
                    padding: '0.7rem 1.2rem',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #0081a7, #00afb9)',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.825rem',
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={16} /> Tambah Sertifikat
                </button>
              </div>
            </div>

            {/* Education List */}
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#00afb9', marginBottom: '1rem' }}>
              Riwayat Pendidikan
            </h3>
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '2.5rem' }}>
              {education.map((edu, idx) => (
                <div
                  key={edu.id || idx}
                  style={{
                    background: 'rgba(0, 31, 43, 0.7)',
                    borderRadius: '16px',
                    border: '1px solid rgba(0, 175, 185, 0.2)',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', margin: 0 }}>{edu.school}</h4>
                    <p style={{ fontSize: '0.85rem', color: '#00afb9', margin: '0.2rem 0' }}>{edu.degree}</p>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'rgba(253, 252, 220, 0.6)' }}>
                      {edu.start_date || edu.startDate} — {edu.end_date || edu.endDate || 'Present'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => setEditingEducation(edu)}
                      style={{ padding: '0.45rem 0.75rem', borderRadius: '8px', background: 'rgba(0, 175, 185, 0.2)', color: '#00afb9', border: '1px solid rgba(0, 175, 185, 0.3)', cursor: 'pointer' }}
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteItem('education', edu.id)}
                      style={{ padding: '0.45rem 0.65rem', borderRadius: '8px', background: 'rgba(230, 57, 70, 0.15)', color: '#e63946', border: '1px solid rgba(230, 57, 70, 0.25)', cursor: 'pointer' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Certificates List */}
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#00afb9', marginBottom: '1rem' }}>
              Sertifikasi & Lisensi
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {certificates.map((cert, idx) => (
                <div
                  key={cert.id || idx}
                  style={{
                    background: 'rgba(0, 31, 43, 0.7)',
                    borderRadius: '16px',
                    border: '1px solid rgba(0, 175, 185, 0.2)',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  {(cert.image_url || cert.imageUrl) && (
                    <img 
                      src={cert.image_url || cert.imageUrl} 
                      alt={cert.title} 
                      style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '10px', marginBottom: '0.75rem' }} 
                    />
                  )}
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', margin: 0 }}>{cert.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: '#00afb9', margin: '0.2rem 0' }}>{cert.issuer}</p>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'rgba(253, 252, 220, 0.6)' }}>
                      {cert.date}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
                    <button
                      onClick={() => setEditingCertificate(cert)}
                      style={{ padding: '0.4rem 0.65rem', borderRadius: '8px', background: 'rgba(0, 175, 185, 0.2)', color: '#00afb9', border: '1px solid rgba(0, 175, 185, 0.3)', cursor: 'pointer' }}
                    >
                      <Edit3 size={13} />
                    </button>
                    <button
                      onClick={() => handleDeleteItem('certificates', cert.id)}
                      style={{ padding: '0.4rem 0.65rem', borderRadius: '8px', background: 'rgba(230, 57, 70, 0.15)', color: '#e63946', border: '1px solid rgba(230, 57, 70, 0.25)', cursor: 'pointer' }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SUPABASE SETUP & SQL */}
        {activeTab === 'database' && (
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>Koneksi & Skema Supabase</h1>
              <p style={{ fontSize: '0.85rem', color: 'rgba(253, 252, 220, 0.6)', marginTop: '0.2rem' }}>
                Panduan integrasi database PostgreSQL Supabase dan konfigurasi Environment Variable.
              </p>
            </div>

            {/* Connection Status Card */}
            <div style={{
              background: isConfigured ? 'rgba(85, 166, 48, 0.15)' : 'rgba(244, 162, 97, 0.15)',
              border: `1px solid ${isConfigured ? '#55a630' : '#f4a261'}`,
              borderRadius: '16px',
              padding: '1.5rem',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: isConfigured ? '#55a630' : '#f4a261',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Database size={20} color="#00141d" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                  Status: {isConfigured ? '🟢 Database Supabase Aktif & Terhubung' : '🟡 Menunggu Konfigurasi .env.local'}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(253, 252, 220, 0.85)', marginTop: '0.4rem', lineHeight: 1.5 }}>
                  {isConfigured 
                    ? 'Proyek portofolio Anda saat ini membaca dan menyimpan data secara langsung dari database Supabase PostgreSQL.' 
                    : 'Aplikasi saat ini berjalan menggunakan data default (fallback). Untuk menghubungkan ke project Supabase Anda, masukkan variabel NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY di file .env.local.'}
                </p>
              </div>
            </div>

            {/* Step-by-step instructions */}
            <div style={{
              background: 'rgba(0, 31, 43, 0.7)',
              borderRadius: '20px',
              border: '1px solid rgba(0, 175, 185, 0.2)',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#00afb9', marginBottom: '1.25rem' }}>
                Langkah Cepat Setup Supabase:
              </h3>

              <ol style={{ paddingLeft: '1.25rem', lineHeight: 1.8, fontSize: '0.9rem', color: 'rgba(253, 252, 220, 0.85)' }}>
                <li>Buka dashboard Supabase di <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" style={{ color: '#00afb9', fontWeight: 700 }}>supabase.com/dashboard</a>.</li>
                <li>Pilih proyek Anda, lalu buka menu <strong>SQL Editor</strong> di sidebar kiri.</li>
                <li>Salin script SQL di bawah ini dan klik tombol <strong>RUN</strong> di Supabase untuk membuat seluruh tabel, storage bucket, dan sample data secara otomatis.</li>
                <li>Buka menu <strong>Project Settings &gt; API</strong> di Supabase, lalu salin <strong>Project URL</strong> dan <strong>anon key</strong> ke dalam file <code>.env.local</code>.</li>
              </ol>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.75rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#00afb9', textTransform: 'uppercase' }}>
                  supabase/schema.sql
                </span>
                <button
                  onClick={() => {
                    const sqlScript = `-- Salin dari file supabase/schema.sql di workspace`;
                    fetch('/api/admin/data')
                      .then(() => {
                        navigator.clipboard.writeText(`-- Buka file d:\\PAL\\hilmanzahrawa\\supabase\\schema.sql untuk skema lengkap`);
                        setCopiedSql(true);
                        setTimeout(() => setCopiedSql(false), 2500);
                        showToast('Path file schema.sql berhasil disalin!');
                      });
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.45rem 0.9rem',
                    borderRadius: '8px',
                    background: 'rgba(0, 175, 185, 0.2)',
                    color: '#00afb9',
                    border: '1px solid rgba(0, 175, 185, 0.3)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Copy size={13} /> {copiedSql ? 'Tersalin!' : 'Salin Info SQL'}
                </button>
              </div>

              <div style={{
                background: 'rgba(0, 18, 26, 0.85)',
                borderRadius: '12px',
                padding: '1.25rem',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: '#a7c957',
                lineHeight: 1.6,
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
            background: 'rgba(0, 18, 26, 0.85)',
            backdropFilter: 'blur(16px)',
            zIndex: 9000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              style={{
                background: '#00222e',
                borderRadius: '24px',
                border: '1px solid rgba(0, 175, 185, 0.3)',
                width: '100%',
                maxWidth: '780px',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '2.5rem',
                boxShadow: '0 30px 80px rgba(0,0,0,0.6)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#fff' }}>
                  {editingProject.id || editingProject._id ? 'Edit Proyek' : 'Tambah Proyek Baru'}
                </h2>
                <button
                  onClick={() => setEditingProject(null)}
                  style={{ background: 'transparent', border: 'none', color: 'rgba(253, 252, 220, 0.6)', cursor: 'pointer' }}
                >
                  <X size={22} />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                handleSaveItem('projects', editingProject, () => setEditingProject(null));
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.4rem' }}>
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
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.4rem' }}>
                      Kategori
                    </label>
                    <select
                      value={editingProject.category || 'it'}
                      onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                    >
                      <option value="it">IT & Software</option>
                      <option value="design">Creative & Design</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.4rem' }}>
                      URL Slug
                    </label>
                    <input 
                      type="text"
                      value={editingProject.slug || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, slug: slugify(e.target.value) })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.4rem' }}>
                      Tahun Proyek
                    </label>
                    <input 
                      type="text"
                      value={editingProject.year || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.4rem' }}>
                      Peran / Role Anda
                    </label>
                    <input 
                      type="text"
                      value={editingProject.role || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, role: e.target.value })}
                      placeholder="e.g. Lead Full-Stack Developer"
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.4rem' }}>
                      Link Proyek Live (URL)
                    </label>
                    <input 
                      type="url"
                      value={editingProject.link || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, link: e.target.value })}
                      placeholder="https://example.com"
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                    />
                  </div>
                </div>

                {/* Image Upload / URL */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.4rem' }}>
                    Gambar Utama (Thumbnail)
                  </label>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <input 
                      type="text"
                      value={editingProject.image_url || editingProject.image || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, image_url: e.target.value, image: e.target.value })}
                      placeholder="https://... atau upload file"
                      style={{ flex: 1, padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
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
                        padding: '0.75rem 1.25rem',
                        borderRadius: '10px',
                        background: 'rgba(0, 175, 185, 0.25)',
                        color: '#00afb9',
                        border: '1px solid rgba(0, 175, 185, 0.4)',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}
                    >
                      <Upload size={14} /> {uploadingImage ? 'Mengunggah...' : 'Upload'}
                    </button>
                  </div>

                  {(editingProject.image_url || editingProject.image) && (
                    <div style={{ marginTop: '0.75rem', height: '120px', width: '220px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <img 
                        src={editingProject.image_url || editingProject.image} 
                        alt="Preview" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.4rem' }}>
                    Subtitle Singkat
                  </label>
                  <input 
                    type="text"
                    value={editingProject.subtitle || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                    placeholder="Deskripsi satu kalimat untuk preview card"
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.4rem' }}>
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
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.4rem' }}>
                    Deskripsi Detail & Outcome
                  </label>
                  <textarea 
                    rows={4}
                    value={editingProject.description || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none', lineHeight: 1.6 }}
                  />
                </div>

                <div style={{ marginBottom: '1.75rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.4rem' }}>
                    Konten Lengkap (Format Markdown / Halaman Detail)
                  </label>
                  <textarea 
                    rows={6}
                    value={typeof editingProject.content === 'string' ? editingProject.content : ''}
                    onChange={(e) => setEditingProject({ ...editingProject, content: e.target.value })}
                    placeholder="### Overview&#10;Penjelasan mendalam mengenai arsitektur dan hasil implementasi..."
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.6 }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem' }}>
                  <input 
                    type="checkbox"
                    id="featured"
                    checked={Boolean(editingProject.featured)}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: '#00afb9', cursor: 'pointer' }}
                  />
                  <label htmlFor="featured" style={{ fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
                    Tandai sebagai Featured Project (tampil di bagian atas Selected Work)
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.85rem' }}>
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    style={{
                      padding: '0.8rem 1.4rem',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#fdfcdc',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 700
                    }}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '0.8rem 1.8rem',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #0081a7, #00afb9)',
                      color: '#ffffff',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 800
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
            background: 'rgba(0, 18, 26, 0.85)',
            backdropFilter: 'blur(16px)',
            zIndex: 9000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: '#00222e',
                borderRadius: '24px',
                border: '1px solid rgba(0, 175, 185, 0.3)',
                width: '100%',
                maxWidth: '600px',
                padding: '2.5rem',
                boxShadow: '0 30px 80px rgba(0,0,0,0.6)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#fff' }}>
                  {editingExperience.id ? 'Edit Pengalaman' : 'Tambah Pengalaman'}
                </h2>
                <button
                  onClick={() => setEditingExperience(null)}
                  style={{ background: 'transparent', border: 'none', color: 'rgba(253, 252, 220, 0.6)', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                handleSaveItem('experiences', editingExperience, () => setEditingExperience(null));
              }}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.4rem' }}>
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
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                    required
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.4rem' }}>
                    Jabatan / Role
                  </label>
                  <input 
                    type="text"
                    value={editingExperience.role || ''}
                    onChange={(e) => setEditingExperience({ ...editingExperience, role: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.4rem' }}>
                      Tanggal Mulai
                    </label>
                    <input 
                      type="text"
                      value={editingExperience.start_date || editingExperience.startDate || ''}
                      onChange={(e) => setEditingExperience({ ...editingExperience, start_date: e.target.value, startDate: e.target.value })}
                      placeholder="e.g. Jan 2024"
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.4rem' }}>
                      Tanggal Selesai
                    </label>
                    <input 
                      type="text"
                      value={editingExperience.end_date || editingExperience.endDate || ''}
                      onChange={(e) => setEditingExperience({ ...editingExperience, end_date: e.target.value, endDate: e.target.value })}
                      placeholder="Present / Sekarang"
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.75rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.4rem' }}>
                    Deskripsi Pekerjaan
                  </label>
                  <textarea 
                    rows={4}
                    value={editingExperience.description || ''}
                    onChange={(e) => setEditingExperience({ ...editingExperience, description: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none', lineHeight: 1.5 }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => setEditingExperience(null)}
                    style={{ padding: '0.75rem 1.25rem', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.08)', color: '#fdfcdc', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    style={{ padding: '0.75rem 1.6rem', borderRadius: '10px', background: 'linear-gradient(135deg, #0081a7, #00afb9)', color: '#ffffff', border: 'none', cursor: 'pointer', fontWeight: 800 }}
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
            background: 'rgba(0, 18, 26, 0.85)',
            backdropFilter: 'blur(16px)',
            zIndex: 9000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: '#00222e',
                borderRadius: '24px',
                border: '1px solid rgba(0, 175, 185, 0.3)',
                width: '100%',
                maxWidth: '560px',
                padding: '2.5rem',
                boxShadow: '0 30px 80px rgba(0,0,0,0.6)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#fff' }}>
                  {editingCertificate.id ? 'Edit Sertifikat' : 'Tambah Sertifikat'}
                </h2>
                <button
                  onClick={() => setEditingCertificate(null)}
                  style={{ background: 'transparent', border: 'none', color: 'rgba(253, 252, 220, 0.6)', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                handleSaveItem('certificates', editingCertificate, () => setEditingCertificate(null));
              }}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.4rem' }}>
                    Nama Sertifikat / Lisensi
                  </label>
                  <input 
                    type="text"
                    value={editingCertificate.title || ''}
                    onChange={(e) => setEditingCertificate({ ...editingCertificate, title: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.4rem' }}>
                      Penerbit (Issuer)
                    </label>
                    <input 
                      type="text"
                      value={editingCertificate.issuer || ''}
                      onChange={(e) => setEditingCertificate({ ...editingCertificate, issuer: e.target.value })}
                      placeholder="e.g. Google, Coursera, Dicoding"
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.4rem' }}>
                      Tahun / Tanggal Diterima
                    </label>
                    <input 
                      type="text"
                      value={editingCertificate.date || ''}
                      onChange={(e) => setEditingCertificate({ ...editingCertificate, date: e.target.value })}
                      placeholder="e.g. 2025"
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.75rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.4rem' }}>
                    Gambar Sertifikat
                  </label>
                  <input 
                    type="text"
                    value={editingCertificate.image_url || editingCertificate.imageUrl || ''}
                    onChange={(e) => setEditingCertificate({ ...editingCertificate, image_url: e.target.value, imageUrl: e.target.value })}
                    placeholder="URL gambar sertifikat"
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => setEditingCertificate(null)}
                    style={{ padding: '0.75rem 1.25rem', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.08)', color: '#fdfcdc', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    style={{ padding: '0.75rem 1.6rem', borderRadius: '10px', background: 'linear-gradient(135deg, #0081a7, #00afb9)', color: '#ffffff', border: 'none', cursor: 'pointer', fontWeight: 800 }}
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
            background: 'rgba(0, 18, 26, 0.85)',
            backdropFilter: 'blur(16px)',
            zIndex: 9000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: '#00222e',
                borderRadius: '24px',
                border: '1px solid rgba(0, 175, 185, 0.3)',
                width: '100%',
                maxWidth: '560px',
                padding: '2.5rem',
                boxShadow: '0 30px 80px rgba(0,0,0,0.6)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#fff' }}>
                  {editingEducation.id ? 'Edit Edukasi' : 'Tambah Edukasi'}
                </h2>
                <button
                  onClick={() => setEditingEducation(null)}
                  style={{ background: 'transparent', border: 'none', color: 'rgba(253, 252, 220, 0.6)', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                handleSaveItem('education', editingEducation, () => setEditingEducation(null));
              }}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.4rem' }}>
                    Institusi / Universitas / Sekolah
                  </label>
                  <input 
                    type="text"
                    value={editingEducation.school || ''}
                    onChange={(e) => setEditingEducation({ ...editingEducation, school: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                    required
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.4rem' }}>
                    Gelar / Jurusan
                  </label>
                  <input 
                    type="text"
                    value={editingEducation.degree || ''}
                    onChange={(e) => setEditingEducation({ ...editingEducation, degree: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.4rem' }}>
                      Tahun Mulai
                    </label>
                    <input 
                      type="text"
                      value={editingEducation.start_date || editingEducation.startDate || ''}
                      onChange={(e) => setEditingEducation({ ...editingEducation, start_date: e.target.value, startDate: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#00afb9', marginBottom: '0.4rem' }}>
                      Tahun Selesai
                    </label>
                    <input 
                      type="text"
                      value={editingEducation.end_date || editingEducation.endDate || ''}
                      onChange={(e) => setEditingEducation({ ...editingEducation, end_date: e.target.value, endDate: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(0, 18, 26, 0.8)', border: '1px solid rgba(0, 175, 185, 0.3)', color: '#fff', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => setEditingEducation(null)}
                    style={{ padding: '0.75rem 1.25rem', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.08)', color: '#fdfcdc', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    style={{ padding: '0.75rem 1.6rem', borderRadius: '10px', background: 'linear-gradient(135deg, #0081a7, #00afb9)', color: '#ffffff', border: 'none', cursor: 'pointer', fontWeight: 800 }}
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
