'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Calendar, 
  Layers, 
  Activity, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  BarChart3, 
  FileText, 
  Key, 
  RefreshCw, 
  Plus, 
  Filter, 
  Server, 
  Bot, 
  Workflow, 
  Check, 
  Award, 
  BookOpen, 
  Briefcase 
} from 'lucide-react';
import { DashboardSectionKey, DashboardTemplate } from '@/data/dashboardTemplates';

interface DynamicDashboardRendererProps {
  sectionKey: DashboardSectionKey;
  template: DashboardTemplate;
  index: number;
}

export default function DynamicDashboardRenderer({
  sectionKey,
  template,
  index
}: DynamicDashboardRendererProps) {
  const { accentColor, accentGlow } = template;

  // 1. HEADERS & GREETINGS
  if (
    sectionKey === 'header' ||
    sectionKey === 'welcome-header' ||
    sectionKey === 'greeting' ||
    sectionKey === 'welcome' ||
    sectionKey === 'business-overview' ||
    sectionKey === 'academic-summary' ||
    sectionKey === 'todays-overview'
  ) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          padding: '1.75rem 2rem',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.85) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.2rem 0.65rem',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: `1px solid ${accentColor}`,
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: 700,
              }}
            >
              <Sparkles size={11} color={accentColor} />
              <span>Gaya #{template.styleId}: {template.styleName}</span>
            </span>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Live Telemetry • Ready
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 0.35rem 0', letterSpacing: '-0.02em' }}>
            {template.name}
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: 0, maxWidth: '640px', lineHeight: 1.5 }}>
            {template.subtitle} • {template.description}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.5rem 1rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'right' }}>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>System Status</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 700, color: '#22c55e' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
              <span>100% Operational</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // 2. KPI CARDS & OVERVIEW GRIDS
  if (
    sectionKey === 'kpi-cards' ||
    sectionKey === 'kpi-overview' ||
    sectionKey === 'sales-kpi' ||
    sectionKey === 'employee-kpi' ||
    sectionKey === 'strategic-kpi' ||
    sectionKey === 'balance' ||
    sectionKey === 'income' ||
    sectionKey === 'expense' ||
    sectionKey === 'expenses' ||
    sectionKey === 'profit' ||
    sectionKey === 'growth' ||
    sectionKey === 'orders' ||
    sectionKey === 'revenue' ||
    sectionKey === 'customers' ||
    sectionKey === 'products' ||
    sectionKey === 'total-orders' ||
    sectionKey === 'active-services' ||
    sectionKey === 'customer-growth' ||
    sectionKey === 'business-health' ||
    sectionKey === 'gpa'
  ) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
          gap: '1.25rem',
          marginBottom: '1.5rem',
        }}
      >
        {template.kpis.map((kpi, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4, borderColor: accentColor }}
            style={{
              padding: '1.5rem',
              borderRadius: '18px',
              background: '#1e293b',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.2s ease',
            }}
          >
            {/* Top accent line */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: idx === 0 ? accentColor : 'rgba(255, 255, 255, 0.1)' }} />

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>
                  {kpi.title}
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.55rem',
                    borderRadius: '9999px',
                    background: kpi.isPositive ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                    color: kpi.isPositive ? '#4ade80' : '#f87171',
                  }}
                >
                  {kpi.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  <span>{kpi.change}</span>
                </span>
              </div>

              <div style={{ fontSize: 'clamp(1.75rem, 3vw, 2.2rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '0.45rem' }}>
                {kpi.value}
              </div>
            </div>

            {kpi.period && (
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
                {kpi.period}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    );
  }

  // 3. CHARTS & ANALYTICS VISUALS
  if (
    sectionKey === 'revenue-chart' ||
    sectionKey === 'performance-chart' ||
    sectionKey === 'main-chart' ||
    sectionKey === 'sales-chart' ||
    sectionKey === 'sales-trend' ||
    sectionKey === 'cash-flow-chart' ||
    sectionKey === 'usage-trend' ||
    sectionKey === 'performance-trend' ||
    sectionKey === 'main-performance'
  ) {
    const maxVal = Math.max(...template.chartData.map(d => d.value), 100);

    return (
      <div
        style={{
          padding: '1.75rem 2rem',
          borderRadius: '20px',
          background: '#1e293b',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: '0 0 0.25rem 0' }}>
              {template.chartTitle}
            </h3>
            {template.chartSubtitle && (
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0 }}>
                {template.chartSubtitle}
              </p>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#cbd5e1' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: accentColor }} />
              <span>Current Cycle</span>
            </span>
            {template.chartData[0]?.secondaryValue !== undefined && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#64748b', marginLeft: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#64748b' }} />
                <span>Target Baseline</span>
              </span>
            )}
          </div>
        </div>

        {/* CSS/SVG Bar & Spark Chart */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', height: '180px', paddingTop: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          {template.chartData.map((pt, i) => {
            const pct = Math.round((pt.value / maxVal) * 100);
            const secPct = pt.secondaryValue ? Math.round((pt.secondaryValue / maxVal) * 100) : null;

            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', width: '100%', justifyContent: 'center', height: '100%' }}>
                  {secPct !== null && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${secPct}%` }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      style={{
                        width: '14px',
                        borderRadius: '4px 4px 0 0',
                        background: 'rgba(255, 255, 255, 0.15)',
                      }}
                      title={`Target: ${pt.secondaryValue}`}
                    />
                  )}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${pct}%` }}
                    transition={{ duration: 0.6, delay: i * 0.06 }}
                    style={{
                      width: '18px',
                      borderRadius: '4px 4px 0 0',
                      background: accentColor,
                      boxShadow: `0 0 12px ${accentGlow}`,
                    }}
                    title={`Actual: ${pt.value}`}
                  />
                </div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                  {pt.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 4. PROGRESS, GROWTH, CONVERSION, MAPPING & FUNNELS
  if (
    sectionKey === 'user-growth' ||
    sectionKey === 'conversion-rate' ||
    sectionKey === 'conversion' ||
    sectionKey === 'traffic-sources' ||
    sectionKey === 'target-progress' ||
    sectionKey === 'department-distribution' ||
    sectionKey === 'attendance' ||
    sectionKey === 'employee-growth' ||
    sectionKey === 'performance' ||
    sectionKey === 'progress-overview' ||
    sectionKey === 'service-performance' ||
    sectionKey === 'employee-performance' ||
    sectionKey === 'cpu-ram-storage' ||
    sectionKey === 'network-traffic' ||
    sectionKey === 'server-status' ||
    sectionKey === 'sales-pipeline' ||
    sectionKey === 'operational-performance' ||
    sectionKey === 'model-performance' ||
    sectionKey === 'accuracy' ||
    sectionKey === 'performance-ranking' ||
    sectionKey === 'learning-progress' ||
    sectionKey === 'completion-rate' ||
    sectionKey === 'expense-breakdown'
  ) {
    const bars = [
      { label: 'Core Workload / Allocation', val: 88, color: accentColor },
      { label: 'Secondary Throughput', val: 64, color: '#38bdf8' },
      { label: 'Residual Capacity', val: 94, color: '#4ade80' },
      { label: 'Cache Efficiency', val: 42, color: '#f59e0b' },
    ];

    return (
      <div
        style={{
          padding: '1.75rem 2rem',
          borderRadius: '20px',
          background: '#1e293b',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
            {sectionKey.replace('-', ' ').toUpperCase()} Breakdown
          </h3>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Aggregated Telemetry</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {bars.map((b, idx) => (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '0.35rem', fontWeight: 500 }}>
                <span>{b.label}</span>
                <span style={{ fontWeight: 700, color: b.color }}>{b.val}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${b.val}%` }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  style={{ height: '100%', background: b.color, borderRadius: '4px' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 5. QUICK ACTIONS & TASKS
  if (
    sectionKey === 'quick-actions' ||
    sectionKey === 'tasks' ||
    sectionKey === 'follow-ups' ||
    sectionKey === 'schedule'
  ) {
    const actions = template.quickActions || [
      { label: 'Export PDF Report', icon: 'FileText', action: 'export' },
      { label: 'Sync Database Pods', icon: 'RefreshCw', action: 'sync' },
      { label: 'Create New Ticket', icon: 'Plus', action: 'ticket' },
      { label: 'Manage Permissions', icon: 'Key', action: 'perms' },
    ];

    return (
      <div
        style={{
          padding: '1.5rem 1.75rem',
          borderRadius: '20px',
          background: '#1e293b',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8', marginBottom: '0.85rem' }}>
          Instant Workspace Actions
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {actions.map((act, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.03, borderColor: accentColor }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.25rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <Zap size={14} color={accentColor} />
              <span>{act.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // 6. TABLES: RECENT TRANSACTIONS, ORDERS, PROJECTS, LOGS, ETC.
  if (
    sectionKey === 'recent-transactions' ||
    sectionKey === 'transactions' ||
    sectionKey === 'recent-orders' ||
    sectionKey === 'recent-projects' ||
    sectionKey === 'active-projects' ||
    sectionKey === 'deadlines' ||
    sectionKey === 'upcoming-deadlines' ||
    sectionKey === 'detailed-table' ||
    sectionKey === 'top-products' ||
    sectionKey === 'top-customers' ||
    sectionKey === 'recent-logs' ||
    sectionKey === 'logs' ||
    sectionKey === 'alerts' ||
    sectionKey === 'assignment-progress' ||
    sectionKey === 'courses' ||
    sectionKey === 'certificates' ||
    sectionKey === 'recommended-courses' ||
    sectionKey === 'recent-deals' ||
    sectionKey === 'requests' ||
    sectionKey === 'token-cost' ||
    sectionKey === 'deployments' ||
    sectionKey === 'staff-status'
  ) {
    return (
      <div
        style={{
          padding: '1.75rem 2rem',
          borderRadius: '20px',
          background: '#1e293b',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
          marginBottom: '1.5rem',
          overflowX: 'auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', margin: '0 0 0.2rem 0' }}>
              {sectionKey.replace('-', ' ').toUpperCase()}
            </h3>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>
              Live synchronized ledger entries ({template.tableItems.length} records)
            </p>
          </div>

          <span
            style={{
              fontSize: '0.75rem',
              color: accentColor,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontWeight: 600,
            }}
          >
            <CheckCircle2 size={13} />
            <span>Verified Stream</span>
          </span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '0.75rem 0.5rem' }}>Identifier</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Entity / Subject</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Category</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Metric / Value</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {template.tableItems.map((row) => (
              <tr
                key={row.id}
                style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  color: '#f1f5f9',
                  transition: 'background 0.15s ease',
                }}
              >
                <td style={{ padding: '0.9rem 0.5rem', fontFamily: 'monospace', color: accentColor, fontWeight: 700 }}>
                  {row.id}
                </td>
                <td style={{ padding: '0.9rem 0.5rem', fontWeight: 600 }}>
                  {row.name}
                </td>
                <td style={{ padding: '0.9rem 0.5rem', color: '#94a3b8' }}>
                  {row.category}
                </td>
                <td style={{ padding: '0.9rem 0.5rem', fontWeight: 700, color: '#ffffff' }}>
                  {row.value}
                </td>
                <td style={{ padding: '0.9rem 0.5rem' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '9999px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      background:
                        row.status === 'completed'
                          ? 'rgba(34, 197, 94, 0.12)'
                          : row.status === 'active'
                          ? 'rgba(59, 130, 246, 0.12)'
                          : 'rgba(245, 158, 11, 0.12)',
                      color:
                        row.status === 'completed'
                          ? '#4ade80'
                          : row.status === 'active'
                          ? '#60a5fa'
                          : '#fbbf24',
                    }}
                  >
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'currentColor' }} />
                    <span style={{ textTransform: 'capitalize' }}>{row.status}</span>
                  </span>
                </td>
                <td style={{ padding: '0.9rem 0.5rem', textAlign: 'right', color: '#64748b' }}>
                  {row.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // 7. RECENT ACTIVITY & AUDIT TIMELINE
  if (
    sectionKey === 'recent-activity' ||
    sectionKey === 'activity' ||
    sectionKey === 'study-activity' ||
    sectionKey === 'customer-activity' ||
    sectionKey === 'git-activity'
  ) {
    return (
      <div
        style={{
          padding: '1.75rem 2rem',
          borderRadius: '20px',
          background: '#1e293b',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
            Real-Time Activity Feed
          </h3>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Auto-refreshed</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {template.activities.map((act) => (
            <div
              key={act.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: accentColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {act.user.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f1f5f9' }}>
                    {act.title}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                    Initiated by {act.user}
                  </div>
                </div>
              </div>

              <span style={{ fontSize: '0.74rem', color: '#94a3b8', whiteSpace: 'nowrap', flexShrink: 0 }}>
                {act.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 8. KEY INSIGHTS & AI EXECUTIVE INTELLIGENCE
  if (
    sectionKey === 'key-insights' ||
    sectionKey === 'insights'
  ) {
    return (
      <div
        style={{
          padding: '1.75rem 2rem',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
          border: `1px solid ${accentColor}40`,
          boxShadow: `0 8px 30px ${accentGlow}`,
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Sparkles size={16} color={accentColor} />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
            Executive AI Insights & Action Items
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', borderRadius: '14px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: accentColor, marginBottom: '0.35rem' }}>Revenue Velocity Spike</div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              Expansion revenue from Enterprise Tier is pacing 28% above projections. Recommend increasing dedicated support capacity.
            </p>
          </div>

          <div style={{ padding: '1rem', borderRadius: '14px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.35rem' }}>Infrastructure Optimization</div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              Edge cache hit ratio reached 99.4%, reducing backend egress costs by an estimated $14,200 this billing cycle.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 9. SYSTEM STATUS, DEPLOYMENTS & API USAGE
  if (
    sectionKey === 'system-status' ||
    sectionKey === 'api-usage' ||
    sectionKey === 'server-metrics' ||
    sectionKey === 'system-health' ||
    sectionKey === 'ai-usage'
  ) {
    return (
      <div
        style={{
          padding: '1.5rem 1.75rem',
          borderRadius: '18px',
          background: '#1e293b',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={16} color={accentColor} />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
              System Health & Node Status
            </h4>
          </div>
          <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#4ade80' }}>ALL NODES HEALTHY</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '0.85rem', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.04)' }}>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>CPU Load</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>34.2%</div>
          </div>
          <div style={{ padding: '0.85rem', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.04)' }}>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Memory (RAM)</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>51.8%</div>
          </div>
          <div style={{ padding: '0.85rem', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.04)' }}>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Disk NVMe</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>42.1%</div>
          </div>
          <div style={{ padding: '0.85rem', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.04)' }}>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>P99 Latency</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#4ade80' }}>18ms</div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback
  return null;
}
