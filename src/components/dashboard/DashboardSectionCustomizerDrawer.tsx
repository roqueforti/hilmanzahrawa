'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ArrowUp, 
  ArrowDown, 
  Trash2, 
  Plus, 
  RotateCcw, 
  Sparkles, 
  Check, 
  Copy, 
  Layers,
  LayoutGrid,
  Search
} from 'lucide-react';
import {
  DashboardStyle,
  DashboardSectionKey,
  DASHBOARD_STYLES,
} from '@/data/dashboardTemplates';

interface DashboardSectionCustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentStyle: DashboardStyle;
  sections: DashboardSectionKey[];
  onReorder: (newSections: DashboardSectionKey[]) => void;
  onReset: () => void;
  onStyleChange: (slug: string) => void;
}

const SECTION_LABELS: Record<DashboardSectionKey, { name: string; icon: string; desc: string }> = {
  header: { name: "Classic Header", icon: "📌", desc: "Top status and search header bar" },
  sidebar: { name: "Collapsible Sidebar", icon: "📑", desc: "Navigation menu drawer & links" },
  'kpi-cards': { name: "KPI Metric Cards (4x)", icon: "📊", desc: "Grid cards with trends & delta tags" },
  'revenue-chart': { name: "Revenue Bar Chart", icon: "📈", desc: "Monthly breakdown and volume trends" },
  'recent-activity': { name: "Recent Activity Log", icon: "⚡", desc: "Realtime timestamped audit trails" },
  'recent-transactions': { name: "Recent Transactions Table", icon: "💳", desc: "Ledger status, customer & payments" },
  'welcome-header': { name: "Welcome Hero Header", icon: "👋", desc: "Personalized greeting with action buttons" },
  'performance-chart': { name: "Performance Chart", icon: "🚀", desc: "Throughput metrics & capacity radar" },
  'quick-actions': { name: "Quick Actions Dock", icon: "⚡", desc: "1-click actions, shortcuts & triggers" },
  'recent-projects': { name: "Active Projects List", icon: "📁", desc: "Sprint deliverables & milestone bars" },
  activity: { name: "Live Activity Stream", icon: "🔔", desc: "Global feed of user and system events" },
  'kpi-overview': { name: "KPI Overview Matrix", icon: "🧭", desc: "High-density multi-metric summary" },
  'user-growth': { name: "User Growth Chart", icon: "👥", desc: "MoM active user cohort trajectory" },
  'conversion-rate': { name: "Conversion Rate Funnel", icon: "🎯", desc: "Sign-up to paying conversion stages" },
  'traffic-sources': { name: "Traffic Sources Breakdown", icon: "🌐", desc: "Direct, search, referral distribution" },
  'detailed-table': { name: "Detailed Data Table", icon: "📋", desc: "Rich tabular list with filters & badges" },
  greeting: { name: "Minimal Greeting", icon: "✨", desc: "Zen greeting with compact summary" },
  'main-chart': { name: "Main Focal Chart", icon: "📊", desc: "Primary performance visualization" },
  'business-overview': { name: "Business Overview Banner", icon: "🏢", desc: "Executive posture & operational stats" },
  revenue: { name: "Gross Revenue Stream", icon: "💰", desc: "Top-line cash inflows and billing" },
  expenses: { name: "Operating Expenses (OPEX)", icon: "💸", desc: "Vendor, cloud, and payroll outlays" },
  expense: { name: "Operating Expenses (OPEX)", icon: "💸", desc: "Vendor, cloud, and payroll outlays" },
  profit: { name: "Net Profit & Margins", icon: "💎", desc: "EBITDA margin and bottom-line gains" },
  'sales-chart': { name: "Sales Trend Line", icon: "🛍️", desc: "Units sold vs revenue projection" },
  'top-products': { name: "Top Performing Products", icon: "🏆", desc: "Best-selling SKUs and catalog rank" },
  transactions: { name: "Transaction Feed", icon: "🧾", desc: "Settled payments, invoices & receipts" },
  'sales-kpi': { name: "Sales Velocity KPIs", icon: "🎯", desc: "Quota attainment, pipeline & win rates" },
  'sales-trend': { name: "Sales Trend Histogram", icon: "📈", desc: "Quarterly trajectory and seasonality" },
  'target-progress': { name: "Target Progress Gauge", icon: "🏹", desc: "Annual revenue target fulfillment" },
  'top-customers': { name: "Top Enterprise Accounts", icon: "👑", desc: "Key customer LTV and volume" },
  'recent-orders': { name: "Recent Customer Orders", icon: "📦", desc: "Fulfillment status, carrier & items" },
  'employee-kpi': { name: "Workforce Headcount KPIs", icon: "👥", desc: "Total staff, attrition, new hires" },
  attendance: { name: "Attendance & Leave Stats", icon: "🕒", desc: "Check-in rate, PTO, and coverage" },
  'employee-growth': { name: "Employee Growth Trend", icon: "🌱", desc: "Headcount ramp by quarter" },
  'department-distribution': { name: "Department Breakdown", icon: "🏢", desc: "Engineering, product, sales ratios" },
  performance: { name: "Talent Performance Reviews", icon: "⭐", desc: "Review cycles and peer scores" },
  'project-summary': { name: "Project Summary Header", icon: "📋", desc: "Active epics, backlog items & sprints" },
  'progress-overview': { name: "Gantt / Progress Tracker", icon: "📊", desc: "Sprint timeline & milestone pacing" },
  'active-projects': { name: "Active Projects Grid", icon: "📂", desc: "Project cards with team avatars" },
  deadlines: { name: "Upcoming Deadlines", icon: "⏰", desc: "Critical path deliverables this week" },
  'upcoming-deadlines': { name: "Exam & Project Deadlines", icon: "⏳", desc: "Midterms, finals & paper due dates" },
  'team-performance': { name: "Team Velocity Matrix", icon: "⚡", desc: "Story points delivered & burn-down" },
  orders: { name: "E-Commerce Orders Card", icon: "🛒", desc: "Pending, shipped, returned metrics" },
  customers: { name: "Customer Acquisition", icon: "🤝", desc: "Repeat buyers, churn, and NPS" },
  products: { name: "Catalog Inventory Health", icon: "📦", desc: "In-stock, low-stock, and SKU variants" },
  balance: { name: "Total Treasury Balance", icon: "🏦", desc: "Cash in bank, receivables & reserves" },
  income: { name: "Total Inflow (Income)", icon: "📥", desc: "Direct recurring revenue and dividends" },
  'cash-flow-chart': { name: "Cash Flow Runway Chart", icon: "🌊", desc: "Net burn rate and cash runway" },
  'expense-breakdown': { name: "Expense Category Split", icon: "🍰", desc: "R&D, marketing, infrastructure pie" },
  'system-status': { name: "System Health & SLA Status", icon: "🟢", desc: "99.99% uptime, cluster heartbeat" },
  deployments: { name: "CI/CD Deployments Log", icon: "🚢", desc: "Prod commits, rollbacks & pipelines" },
  'git-activity': { name: "Git Commit Heatmap", icon: "🌿", desc: "Repository commits, PRs & reviews" },
  'api-usage': { name: "API Usage & Rate Limits", icon: "🔌", desc: "Requests per minute, latency (p99)" },
  'server-metrics': { name: "Server Metrics (CPU/RAM)", icon: "🖥️", desc: "Core loads, memory & disk I/O" },
  'recent-logs': { name: "Live Terminal Logs", icon: "📜", desc: "Stdout / Stderr system stream" },
  logs: { name: "Kernel & Audit Logs", icon: "📜", desc: "Syslog events & network anomalies" },
  'academic-summary': { name: "Academic Progress Banner", icon: "🎓", desc: "Current semester, major & advisor" },
  schedule: { name: "Weekly Class Schedule", icon: "📅", desc: "Lecture halls, lab sessions & times" },
  'assignment-progress': { name: "Assignments Progress", icon: "📝", desc: "Completed essays, lab reports" },
  gpa: { name: "Cumulative GPA Gauge", icon: "🏆", desc: "Grade point average and honors" },
  'learning-progress': { name: "Learning Path Progress", icon: "🧠", desc: "Overall curriculum completion %" },
  courses: { name: "Enrolled Courses Deck", icon: "📚", desc: "Video modules, quizzes & projects" },
  'completion-rate': { name: "Completion Rate Funnel", icon: "🎯", desc: "Lesson milestones finished" },
  'study-activity': { name: "Study Streak & Hours", icon: "🔥", desc: "Daily minutes studied heatmap" },
  certificates: { name: "Earned Certifications", icon: "🏅", desc: "Verified credentials & digital badges" },
  'recommended-courses': { name: "Recommended For You", icon: "💡", desc: "AI-suggested upskilling topics" },
  'total-orders': { name: "Total Service Bookings", icon: "🧾", desc: "Service appointments and queue" },
  'active-services': { name: "Active Service Contracts", icon: "🛠️", desc: "Ongoing SLA clients & retainers" },
  'customer-growth': { name: "Client Roster Growth", icon: "📈", desc: "New client signups and retainers" },
  'service-performance': { name: "Service Delivery Score", icon: "⭐", desc: "Client CSAT, resolution speed" },
  'employee-performance': { name: "Consultant Billable Rate", icon: "💼", desc: "Hours logged vs target utilization" },
  'business-health': { name: "Executive Health Radar", icon: "🛡️", desc: "Company solvency and burn health" },
  growth: { name: "YoY Growth Trajectory", icon: "🚀", desc: "Enterprise expansion & ARR multiples" },
  'strategic-kpi': { name: "Board Strategic Objectives", icon: "🎯", desc: "OKRs and high-level milestones" },
  'performance-trend': { name: "Performance Trend Matrix", icon: "📊", desc: "Efficiency multipliers across units" },
  'key-insights': { name: "Executive Strategic Insights", icon: "💡", desc: "Automated business intelligence flags" },
  'system-health': { name: "Data Center Node Health", icon: "🖧", desc: "Rack servers, thermal & power usage" },
  'cpu-ram-storage': { name: "Cluster Resource Allocations", icon: "⚙️", desc: "vCPU cores, RAM pool & NVMe SAN" },
  'network-traffic': { name: "Network Ingress / Egress", icon: "🌐", desc: "Gbps bandwidth and packet dropped" },
  'server-status': { name: "Blade Server Nodes", icon: "🖥️", desc: "Edge points, regions & cluster map" },
  alerts: { name: "Critical Incident Alerts", icon: "🚨", desc: "PagerDuty alerts & incident timeline" },
  leads: { name: "Inbound CRM Leads", icon: "🧲", desc: "Qualified marketing leads (MQL/SQL)" },
  conversion: { name: "Opportunity Win Ratio", icon: "🎯", desc: "Discovery to closed-won conversion" },
  'sales-pipeline': { name: "Deal Pipeline Stages", icon: "🛣️", desc: "Lead, Demo, Negotiation, Closed" },
  'customer-activity': { name: "Customer Touchpoint Feed", icon: "💬", desc: "Calls, emails, demos recorded" },
  'follow-ups': { name: "Pending Follow-Ups", icon: "📞", desc: "Action items due for account reps" },
  'recent-deals': { name: "Recently Won Deals", icon: "🤝", desc: "Signed contracts with ACV value" },
  'todays-overview': { name: "Today Operational Snapshot", icon: "🌅", desc: "Shift overview, pending dispatches" },
  tasks: { name: "Operational Checklist", icon: "✅", desc: "Daily maintenance & triage tasks" },
  'staff-status': { name: "On-Duty Staff Roster", icon: "👷", desc: "Active shifts, leads and standby" },
  'operational-performance': { name: "SLA Delivery Precision", icon: "⚙️", desc: "Turnaround time and error rate" },
  'ai-usage': { name: "LLM Inference Usage", icon: "🤖", desc: "Active models, queries per second" },
  requests: { name: "Request Volume & Latency", icon: "⚡", desc: "TTFT (time to first token) & p95" },
  'token-cost': { name: "Token Usage & Cost Burn", icon: "🪙", desc: "Prompt vs Completion tokens spent" },
  'model-performance': { name: "Model Benchmark Scores", icon: "🔬", desc: "MMLU, latency & hallucination checks" },
  accuracy: { name: "Evaluation Accuracy Rate", icon: "🎯", desc: "Human feedback & benchmark accuracy" },
  'usage-trend': { name: "Inference Volume Trend", icon: "📈", desc: "API scale over past 30 days" },
  welcome: { name: "Premium Executive Welcome", icon: "👑", desc: "Global greeting with quick stats" },
  'main-performance': { name: "Unified Performance Core", icon: "✨", desc: "Holistic company health index" },
  'performance-ranking': { name: "Top Performance Rankings", icon: "🥇", desc: "Best performing branches & teams" },
  insights: { name: "Predictive AI Insights", icon: "💡", desc: "Forecasting revenue & churn threats" },
};

export default function DashboardSectionCustomizerDrawer({
  isOpen,
  onClose,
  currentStyle,
  sections,
  onReorder,
  onReset,
  onStyleChange,
}: DashboardSectionCustomizerDrawerProps) {
  const [activeTab, setActiveTab] = useState<"sections" | "styles">("sections");
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const moveSection = (index: number, direction: "up" | "down") => {
    const newSections = [...sections];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;
    onReorder(newSections);
  };

  const removeSection = (index: number) => {
    const newSections = sections.filter((_, i) => i !== index);
    onReorder(newSections);
  };

  const addSection = (key: DashboardSectionKey) => {
    onReorder([...sections, key]);
  };

  const handleCopyConfig = () => {
    const jsonStr = JSON.stringify(sections, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const availableKeysToAdd = (Object.keys(SECTION_LABELS) as DashboardSectionKey[]).filter(
    (k) => !sections.includes(k)
  );

  const filteredStyles = DASHBOARD_STYLES.filter((s) => {
    const query = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(query) ||
      s.description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative w-full max-w-md bg-slate-950/95 border-l border-slate-800/80 backdrop-blur-xl shadow-2xl flex flex-col h-full text-slate-100 z-10"
      >
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🎛️</span>
              <h3 className="font-bold text-base text-white">Dashboard Layout Engine</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Active: <span className="text-emerald-400 font-medium">#{currentStyle.id} {currentStyle.name}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800/85 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-sm transition"
            title="Close Drawer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="px-5 pt-3 pb-2 border-b border-slate-800/60 flex items-center gap-2 bg-slate-950/60">
          <button
            onClick={() => setActiveTab("sections")}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              activeTab === "sections"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-950"
                : "bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/60"
            }`}
          >
            <Layers size={13} />
            <span>Sections Order ({sections.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("styles")}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              activeTab === "styles"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-950"
                : "bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/60"
            }`}
          >
            <LayoutGrid size={13} />
            <span>20 Styles Presets</span>
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeTab === "sections" ? (
            <>
              {/* Quick Actions Strip: Reset + Copy JSON */}
              <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                <div>
                  <div className="text-xs font-semibold text-white">Live Reorder & Flow</div>
                  <div className="text-[11px] text-slate-400">
                    Arrange sections in real-time
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleCopyConfig}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition hover:text-white"
                    title="Copy layout array to clipboard"
                  >
                    {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={onReset}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition hover:text-white"
                    title="Reset to default preset sequence"
                  >
                    <RotateCcw size={12} />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Sections List */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Active Sections ({sections.length})
                </div>

                {sections.map((secKey, idx) => {
                  const meta = SECTION_LABELS[secKey] || {
                    name: secKey,
                    icon: "📦",
                    desc: "Dashboard component",
                  };

                  return (
                    <motion.div
                      layout
                      key={`${secKey}-${idx}`}
                      className="group flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-6 h-6 rounded-md bg-slate-800 text-slate-300 flex items-center justify-center text-[11px] font-mono shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-base shrink-0">{meta.icon}</span>
                        <div className="min-w-0">
                          <div className="text-xs font-medium text-white truncate">
                            {meta.name}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            {meta.desc}
                          </div>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        <button
                          disabled={idx === 0}
                          onClick={() => moveSection(idx, "up")}
                          className="w-7 h-7 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed text-xs flex items-center justify-center transition"
                          title="Move Up"
                        >
                          <ArrowUp size={13} />
                        </button>
                        <button
                          disabled={idx === sections.length - 1}
                          onClick={() => moveSection(idx, "down")}
                          className="w-7 h-7 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed text-xs flex items-center justify-center transition"
                          title="Move Down"
                        >
                          <ArrowDown size={13} />
                        </button>
                        <button
                          onClick={() => removeSection(idx)}
                          className="w-7 h-7 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs flex items-center justify-center transition ml-1"
                          title="Remove Section"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Add More Section */}
              {availableKeysToAdd.length > 0 && (
                <div className="pt-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Add Extra Dashboard Components
                  </div>
                  <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto pr-1">
                    {availableKeysToAdd.slice(0, 10).map((key) => {
                      const meta = SECTION_LABELS[key] || {
                        name: key,
                        icon: "➕",
                        desc: "Component",
                      };
                      return (
                        <button
                          key={key}
                          onClick={() => addSection(key)}
                          className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-900/50 hover:bg-slate-800 border border-slate-800/70 text-left transition group"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{meta.icon}</span>
                            <span className="text-xs text-slate-300 group-hover:text-white">
                              {meta.name}
                            </span>
                          </div>
                          <span className="text-xs text-emerald-400 font-bold flex items-center gap-0.5">
                            <Plus size={12} />
                            <span>Add</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Search Bar for Styles */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter 20 styles (e.g. Sales, AI, HR)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3.5 py-2 pl-9 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60"
                />
                <Search size={14} className="absolute left-3 top-2.5 text-slate-500" />
              </div>

              {/* Styles List */}
              <div className="space-y-2">
                {filteredStyles.map((style) => {
                  const isActive = style.id === currentStyle.id;
                  return (
                    <button
                      key={style.slug}
                      onClick={() => {
                        onStyleChange(style.slug);
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border transition flex flex-col gap-1.5 ${
                        isActive
                          ? "bg-emerald-500/10 border-emerald-500/50 shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-500/40"
                          : "bg-slate-900/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/60"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-slate-400">
                            #{style.id}
                          </span>
                          <span className="text-xs font-semibold text-white">
                            {style.badge ? `${style.badge} ` : ""}
                            {style.name}
                          </span>
                        </div>
                        {isActive && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40">
                            Active
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-400 line-clamp-2">
                        {style.description}
                      </p>

                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 overflow-hidden font-mono mt-0.5">
                        <span className="shrink-0 text-emerald-400/80">Flow:</span>
                        <span className="truncate">
                          {style.sections.join(" → ")}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>{sections.length} Sections Configured</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md shadow-emerald-900/30 transition"
          >
            Apply & View
          </button>
        </div>
      </motion.div>
    </div>
  );
}
