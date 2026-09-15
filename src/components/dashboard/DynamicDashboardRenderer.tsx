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
  PieChart, 
  CreditCard, 
  LayoutDashboard, 
  Target, 
  Database, 
  Workflow, 
  Check, 
  Award, 
  BookOpen, 
  Briefcase,
  Compass,
  GitBranch,
  Search,
  Code2,
  Lock,
  ExternalLink
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

  // 1. HEADERS, GREETINGS & BANNER OVERVIEWS
  if (
    sectionKey === 'header' ||
    sectionKey === 'welcome-header' ||
    sectionKey === 'greeting' ||
    sectionKey === 'welcome' ||
    sectionKey === 'business-overview' ||
    sectionKey === 'academic-summary' ||
    sectionKey === 'todays-overview' ||
    sectionKey === 'project-summary'
  ) {
    const isProjectSummary = sectionKey === 'project-summary';
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
              {isProjectSummary ? 'Sprint 42 Live Pacing' : 'Live Telemetry • Ready'}
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 0.35rem 0', letterSpacing: '-0.02em' }}>
            {isProjectSummary ? 'Agile Sprint & Roadmap Deliverables' : template.name}
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: 0, maxWidth: '640px', lineHeight: 1.5 }}>
            {isProjectSummary
              ? 'Tracking active epics, burn-down trajectory, and engineering milestones across squads.'
              : `${template.subtitle} • ${template.description}`}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isProjectSummary ? (
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <div style={{ padding: '0.5rem 0.85rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase' }}>Velocity</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#10b981' }}>94%</div>
              </div>
              <div style={{ padding: '0.5rem 0.85rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase' }}>Epics Active</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: accentColor }}>12</div>
              </div>
            </div>
          ) : (
            <div style={{ padding: '0.5rem 1rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>System Status</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 700, color: '#22c55e' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
                <span>100% Operational</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  // 1B. INLINE SIDEBAR / DIRECTORY HUB SECTION
  if (sectionKey === 'sidebar') {
    const directoryItems = [
      { name: 'Analytics Hub', desc: 'Realtime telemetry and metrics data', icon: BarChart3, badge: 'Live' },
      { name: 'Customer & CRM', desc: 'Accounts, pipeline and active contracts', icon: Users, badge: '2.4K' },
      { name: 'Billing & Ledger', desc: 'Invoices, reconciliations and payouts', icon: CreditCard, badge: 'Settled' },
      { name: 'Cloud Infrastructure', desc: 'Cluster nodes, latency and SLA uptime', icon: Server, badge: '99.99%' },
      { name: 'Automations & AI', desc: 'Inference calls, token usage and queues', icon: Bot, badge: 'Ready' },
      { name: 'Security & Access', desc: 'Role permissions and MFA audit logs', icon: ShieldCheck, badge: 'Active' },
    ];

    return (
      <div
        style={{
          padding: '1.5rem',
          borderRadius: '20px',
          background: '#131b2e',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 6px 25px rgba(0, 0, 0, 0.2)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
              Navigation Directory & Module Workspace
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
              Quick access shortcuts to all platform micro-frontends and management consoles.
            </p>
          </div>
          <span style={{ fontSize: '0.74rem', color: accentColor, fontWeight: 700, background: `${accentColor}18`, padding: '0.25rem 0.65rem', borderRadius: '6px', border: `1px solid ${accentColor}40` }}>
            6 Modules Connected
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
          {directoryItems.map((item, dIdx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={dIdx}
                style={{
                  padding: '1rem',
                  borderRadius: '14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${accentColor}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor }}>
                    <IconComponent size={16} />
                  </div>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94a3b8', background: 'rgba(255,255,255,0.06)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                    {item.badge}
                  </span>
                </div>
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#ffffff' }}>{item.name}</div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '0.15rem' }}>{item.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
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
    sectionKey === 'gpa' ||
    sectionKey === 'leads'
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
    sectionKey === 'main-performance' ||
    sectionKey === 'user-growth' ||
    sectionKey === 'employee-growth' ||
    sectionKey === 'team-performance'
  ) {
    const isTeamPerformance = sectionKey === 'team-performance';
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
              {isTeamPerformance ? 'Squad Velocity & Story Point Burn-Down' : template.chartTitle}
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0 }}>
              {isTeamPerformance
                ? 'Bi-weekly throughput across Frontend, Backend, AI Infrastructure, and Mobile squads.'
                : (template.chartSubtitle || 'Measured against benchmark targets and seasonal pacing.')}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#cbd5e1' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: accentColor }} />
              <span>{isTeamPerformance ? 'Delivered Points' : 'Current Cycle'}</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#64748b', marginLeft: '0.5rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#64748b' }} />
              <span>{isTeamPerformance ? 'Committed Target' : 'Target Baseline'}</span>
            </span>
          </div>
        </div>

        {/* CSS/SVG Bar & Spark Chart */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', height: '180px', paddingTop: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          {template.chartData.map((pt, i) => {
            const pct = Math.round((pt.value / maxVal) * 100);
            const secPct = pt.secondaryValue ? Math.round((pt.secondaryValue / maxVal) * 100) : 60;

            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', width: '100%', justifyContent: 'center', height: '100%' }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${secPct}%` }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    style={{
                      width: '14px',
                      borderRadius: '4px 4px 0 0',
                      background: 'rgba(255, 255, 255, 0.15)',
                    }}
                    title={`Target: ${pt.secondaryValue || 60}`}
                  />
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
                <span style={{ fontSize: '0.72rem', color: '#64748b', whiteSpace: 'nowrap' }}>
                  {pt.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 4. PROGRESS FUNNELS, ATTENDANCE & DISTRIBUTION
  if (
    sectionKey === 'conversion-rate' ||
    sectionKey === 'conversion' ||
    sectionKey === 'target-progress' ||
    sectionKey === 'learning-progress' ||
    sectionKey === 'completion-rate' ||
    sectionKey === 'progress-overview' ||
    sectionKey === 'assignment-progress' ||
    sectionKey === 'department-distribution' ||
    sectionKey === 'expense-breakdown' ||
    sectionKey === 'traffic-sources' ||
    sectionKey === 'attendance' ||
    sectionKey === 'performance' ||
    sectionKey === 'service-performance' ||
    sectionKey === 'employee-performance' ||
    sectionKey === 'model-performance' ||
    sectionKey === 'accuracy' ||
    sectionKey === 'performance-ranking'
  ) {
    const progressList = [
      { label: 'Primary Conversion / Delivery Rate', pct: 84, delta: '+6.2%' },
      { label: 'Secondary Pipeline Fulfillment', pct: 72, delta: '+3.8%' },
      { label: 'Active Resource Allocation Efficiency', pct: 91, delta: '+12.4%' },
      { label: 'Customer Retention & Satisfaction CSAT', pct: 96, delta: '+4.1%' },
    ];

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
              {sectionKey.replace(/-/g, ' ').toUpperCase()}
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
              Multi-stage execution metrics and SLA threshold compliance
            </p>
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', padding: '0.35rem 0.85rem', borderRadius: '9999px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
            Above Benchmark (SLA 99%)
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {progressList.map((item, idx) => (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
                <span style={{ color: '#cbd5e1', fontWeight: 600 }}>{item.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#4ade80', fontSize: '0.78rem', fontWeight: 700 }}>{item.delta}</span>
                  <span style={{ color: '#ffffff', fontWeight: 800 }}>{item.pct}%</span>
                </div>
              </div>

              <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.pct}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  style={{
                    height: '100%',
                    borderRadius: '9999px',
                    background: idx === 0 ? accentColor : 'linear-gradient(90deg, #38bdf8 0%, #818cf8 100%)',
                    boxShadow: idx === 0 ? `0 0 10px ${accentGlow}` : 'none',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 5. ACTIVITY, LOGS, AUDIT FEEDS, DEADLINES
  if (
    sectionKey === 'recent-activity' ||
    sectionKey === 'activity' ||
    sectionKey === 'recent-logs' ||
    sectionKey === 'logs' ||
    sectionKey === 'deadlines' ||
    sectionKey === 'upcoming-deadlines' ||
    sectionKey === 'study-activity' ||
    sectionKey === 'customer-activity' ||
    sectionKey === 'follow-ups' ||
    sectionKey === 'tasks' ||
    sectionKey === 'staff-status' ||
    sectionKey === 'operational-performance' ||
    sectionKey === 'schedule' ||
    sectionKey === 'alerts' ||
    sectionKey === 'sales-pipeline' ||
    sectionKey === 'git-activity'
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
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
              {sectionKey.replace(/-/g, ' ').toUpperCase()}
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
              Real-time audit log stream & timestamped operational triggers
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#94a3b8' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} />
            <span>Live Stream</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {template.activities.map((act) => (
            <div
              key={act.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', minWidth: 0 }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${accentColor}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor, flexShrink: 0 }}>
                  <Activity size={16} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {act.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.15rem' }}>
                    By {act.user} • {act.time}
                  </div>
                </div>
              </div>

              {act.amount && (
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#4ade80', flexShrink: 0 }}>
                  {act.amount}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 6. TABLES: RECENT TRANSACTIONS, ORDERS, PROJECTS, LOGS, ETC.
  if (
    sectionKey === 'recent-transactions' ||
    sectionKey === 'transactions' ||
    sectionKey === 'recent-projects' ||
    sectionKey === 'active-projects' ||
    sectionKey === 'top-products' ||
    sectionKey === 'top-customers' ||
    sectionKey === 'recent-orders' ||
    sectionKey === 'detailed-table' ||
    sectionKey === 'recent-deals' ||
    sectionKey === 'courses' ||
    sectionKey === 'recommended-courses' ||
    sectionKey === 'certificates' ||
    sectionKey === 'deployments'
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
              {sectionKey.replace(/-/g, ' ').toUpperCase()}
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
              Granular breakdown of records, status states, and timestamps
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.4rem 0.85rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#cbd5e1',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Filter size={13} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: '#64748b' }}>
              <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>RECORD NAME</th>
              <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>CATEGORY</th>
              <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>VALUE / VOLUME</th>
              <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>STATUS</th>
              <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>DATE</th>
            </tr>
          </thead>
          <tbody>
            {template.tableItems.map((row) => (
              <tr
                key={row.id}
                style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                  color: '#e2e8f0',
                  transition: 'background 0.15s ease',
                }}
              >
                <td style={{ padding: '1rem', fontWeight: 600, color: '#ffffff' }}>{row.name}</td>
                <td style={{ padding: '1rem', color: '#94a3b8' }}>{row.category}</td>
                <td style={{ padding: '1rem', fontWeight: 700, color: accentColor }}>{row.value}</td>
                <td style={{ padding: '1rem' }}>
                  <span
                    style={{
                      padding: '0.2rem 0.55rem',
                      borderRadius: '9999px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      background:
                        row.status === 'completed'
                          ? 'rgba(34, 197, 94, 0.15)'
                          : row.status === 'active'
                          ? 'rgba(56, 189, 248, 0.15)'
                          : row.status === 'warning'
                          ? 'rgba(245, 158, 11, 0.15)'
                          : 'rgba(239, 68, 68, 0.15)',
                      color:
                        row.status === 'completed'
                          ? '#4ade80'
                          : row.status === 'active'
                          ? '#38bdf8'
                          : row.status === 'warning'
                          ? '#fbbf24'
                          : '#f87171',
                    }}
                  >
                    {row.status}
                  </span>
                </td>
                <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.8rem' }}>{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // 7. SYSTEM STATUS, SERVER METRICS & TELEMETRY
  if (
    sectionKey === 'system-status' ||
    sectionKey === 'server-metrics' ||
    sectionKey === 'api-usage' ||
    sectionKey === 'system-health' ||
    sectionKey === 'cpu-ram-storage' ||
    sectionKey === 'network-traffic' ||
    sectionKey === 'server-status' ||
    sectionKey === 'ai-usage' ||
    sectionKey === 'requests' ||
    sectionKey === 'token-cost'
  ) {
    return (
      <div
        style={{
          padding: '1.75rem 2rem',
          borderRadius: '20px',
          background: '#0f172a',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
              {sectionKey.replace(/-/g, ' ').toUpperCase()}
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
              Cluster diagnostics, compute loads, and network telemetry
            </p>
          </div>
          <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 600 }}>
            US-East-1 (Primary)
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { label: 'Cluster CPU Load', val: '28.4%', sub: '16 Cores Online', color: '#10b981' },
            { label: 'Memory Allocation', val: '64.2 GB', sub: '128 GB Total', color: '#38bdf8' },
            { label: 'NVMe IOPS Throughput', val: '48.2K', sub: 'Latency: 0.4ms', color: '#a855f7' },
            { label: 'Egress Bandwidth', val: '1.4 Gbps', sub: '0.00% Packet Loss', color: '#f59e0b' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: '1.25rem',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.4rem' }}>{item.label}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: item.color, marginBottom: '0.25rem' }}>{item.val}</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 8. INSIGHTS & AI RECOMMENDATIONS
  if (
    sectionKey === 'key-insights' ||
    sectionKey === 'insights'
  ) {
    return (
      <div
        style={{
          padding: '1.75rem 2rem',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.25)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Sparkles size={16} color="#c084fc" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
            Executive AI Insights & Anomalies
          </h3>
        </div>
        <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
          Expansion revenue from Enterprise Tier is pacing 28% above projections. Recommend increasing dedicated support capacity in APAC region. Churn risk index dropped to an all-time low of 1.1%.
        </p>
      </div>
    );
  }

  // 9. QUICK ACTIONS DOCK
  if (sectionKey === 'quick-actions') {
    return (
      <div
        style={{
          padding: '1.5rem 2rem',
          borderRadius: '20px',
          background: '#1e293b',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
            Quick Operations
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
            Instant operational dispatch, report generation, and quota resets
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          {['Export CSV', 'Generate Invoice', 'Deploy Patch', 'Invite Member'].map((action, i) => (
            <button
              key={i}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '10px',
                background: i === 0 ? accentColor : 'rgba(255, 255, 255, 0.06)',
                color: i === 0 ? '#0f172a' : '#ffffff',
                fontWeight: 700,
                fontSize: '0.82rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // DEFAULT FALLBACK CARD
  return (
    <div
      style={{
        padding: '1.5rem',
        borderRadius: '16px',
        background: '#1e293b',
        border: '1px dashed rgba(255, 255, 255, 0.15)',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>Section: {sectionKey}</div>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>Active Module Loaded</div>
      </div>
      <span style={{ fontSize: '0.75rem', color: accentColor, background: `${accentColor}20`, padding: '0.25rem 0.65rem', borderRadius: '9999px' }}>
        #{index + 1}
      </span>
    </div>
  );
}
