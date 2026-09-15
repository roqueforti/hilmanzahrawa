export type DashboardSectionKey =
  | 'header'
  | 'sidebar'
  | 'welcome-header'
  | 'greeting'
  | 'welcome'
  | 'kpi-cards'
  | 'kpi-overview'
  | 'sales-kpi'
  | 'employee-kpi'
  | 'strategic-kpi'
  | 'revenue-chart'
  | 'performance-chart'
  | 'main-chart'
  | 'sales-chart'
  | 'sales-trend'
  | 'cash-flow-chart'
  | 'usage-trend'
  | 'performance-trend'
  | 'main-performance'
  | 'quick-actions'
  | 'recent-activity'
  | 'activity'
  | 'recent-transactions'
  | 'transactions'
  | 'recent-projects'
  | 'active-projects'
  | 'deadlines'
  | 'upcoming-deadlines'
  | 'team-performance'
  | 'user-growth'
  | 'conversion-rate'
  | 'conversion'
  | 'traffic-sources'
  | 'detailed-table'
  | 'business-overview'
  | 'revenue'
  | 'expenses'
  | 'expense'
  | 'profit'
  | 'growth'
  | 'balance'
  | 'income'
  | 'expense-breakdown'
  | 'top-products'
  | 'top-customers'
  | 'recent-orders'
  | 'orders'
  | 'target-progress'
  | 'attendance'
  | 'employee-growth'
  | 'department-distribution'
  | 'performance'
  | 'project-summary'
  | 'progress-overview'
  | 'customers'
  | 'products'
  | 'system-status'
  | 'deployments'
  | 'git-activity'
  | 'api-usage'
  | 'server-metrics'
  | 'recent-logs'
  | 'logs'
  | 'alerts'
  | 'academic-summary'
  | 'schedule'
  | 'assignment-progress'
  | 'gpa'
  | 'learning-progress'
  | 'courses'
  | 'completion-rate'
  | 'study-activity'
  | 'certificates'
  | 'recommended-courses'
  | 'total-orders'
  | 'active-services'
  | 'customer-growth'
  | 'service-performance'
  | 'employee-performance'
  | 'business-health'
  | 'key-insights'
  | 'insights'
  | 'system-health'
  | 'cpu-ram-storage'
  | 'network-traffic'
  | 'server-status'
  | 'leads'
  | 'sales-pipeline'
  | 'customer-activity'
  | 'follow-ups'
  | 'recent-deals'
  | 'todays-overview'
  | 'tasks'
  | 'staff-status'
  | 'operational-performance'
  | 'ai-usage'
  | 'requests'
  | 'token-cost'
  | 'model-performance'
  | 'accuracy'
  | 'performance-ranking';

export interface DashboardKPICard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  period?: string;
  iconName?: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

export interface DashboardActivityItem {
  id: string;
  title: string;
  time: string;
  user: string;
  status?: string;
  amount?: string;
}

export interface DashboardTableItem {
  id: string;
  name: string;
  category: string;
  value: string;
  status: 'active' | 'completed' | 'pending' | 'warning' | 'error';
  date: string;
}

export interface DashboardStyle {
  id: number;
  name: string;
  slug: string;
  badge: string;
  sections: DashboardSectionKey[];
  description: string;
  accentColor: string;
  accentGlow: string;
}

export interface DashboardTemplate {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  styleId: number;
  styleName: string;
  badge: string;
  description: string;
  price: number;
  featuredTag?: string;
  accentColor: string;
  accentGlow: string;
  themeMode: 'dark' | 'light' | 'hybrid';
  sections: DashboardSectionKey[];
  kpis: DashboardKPICard[];
  chartData: ChartDataPoint[];
  chartTitle: string;
  chartSubtitle?: string;
  activities: DashboardActivityItem[];
  tableItems: DashboardTableItem[];
  quickActions?: { label: string; icon: string; action: string }[];
  domainStats?: { label: string; value: string; detail: string }[];
}

export const DASHBOARD_STYLES: DashboardStyle[] = [
  {
    id: 1,
    name: 'Classic Admin',
    slug: 'classic-admin',
    badge: '⭐ Classic Admin',
    sections: ['header', 'sidebar', 'kpi-cards', 'revenue-chart', 'recent-activity', 'recent-transactions'],
    description: 'Tata letak dasbor admin korporat standar industri: 4 kartu metrik utama, grafik pendapatan kuartalan, riwayat aktivitas audit, dan tabel transaksi terkini.',
    accentColor: '#3b82f6',
    accentGlow: 'rgba(59, 130, 246, 0.25)',
  },
  {
    id: 2,
    name: 'Modern SaaS',
    slug: 'modern-saas',
    badge: 'Modern SaaS',
    sections: ['welcome-header', 'kpi-cards', 'performance-chart', 'quick-actions', 'recent-projects', 'activity'],
    description: 'Arsitektur B2B SaaS generasi baru dengan header sambutan personal, metrik performa aplikasi, menu tindakan kilat, serta status proyek aktif.',
    accentColor: '#6366f1',
    accentGlow: 'rgba(99, 102, 241, 0.25)',
  },
  {
    id: 3,
    name: 'Analytics',
    slug: 'analytics',
    badge: 'Analytics',
    sections: ['kpi-overview', 'revenue-chart', 'user-growth', 'conversion-rate', 'traffic-sources', 'detailed-table'],
    description: 'Pusat komando data intelligence: ringkasan pertumbuhan pengguna, funnel konversi real-time, atribusi sumber traffic, dan tabel data mendalam.',
    accentColor: '#06b6d4',
    accentGlow: 'rgba(6, 182, 212, 0.25)',
  },
  {
    id: 4,
    name: 'Minimalist',
    slug: 'minimalist',
    badge: 'Minimalist',
    sections: ['greeting', 'kpi-cards', 'main-chart', 'recent-activity', 'quick-actions'],
    description: 'Desain bersih dengan ruang negatif optimal, fokus eksklusif pada esensi indikator kinerja utama, visual tren utama, dan aksi prioritas tanpa distraksi.',
    accentColor: '#64748b',
    accentGlow: 'rgba(100, 116, 139, 0.25)',
  },
  {
    id: 5,
    name: 'Business Dashboard',
    slug: 'business-dashboard',
    badge: 'Business Dashboard',
    sections: ['business-overview', 'revenue', 'expenses', 'profit', 'sales-chart', 'top-products', 'transactions'],
    description: 'Dasbor pemantauan finansial dan operasional bisnis terpadu: perbandingan pendapatan terhadap pengeluaran, margin laba bersih, dan produk terlaris.',
    accentColor: '#0284c7',
    accentGlow: 'rgba(2, 132, 199, 0.25)',
  },
  {
    id: 6,
    name: 'Sales Dashboard',
    slug: 'sales-dashboard',
    badge: 'Sales Dashboard',
    sections: ['sales-kpi', 'sales-trend', 'target-progress', 'top-products', 'top-customers', 'recent-orders'],
    description: 'Fokus konversi penjualan cepat: pencapaian target bulanan, tren penjualan dinamis, perankingan pelanggan teratas, dan antrean pesanan baru.',
    accentColor: '#10b981',
    accentGlow: 'rgba(16, 185, 129, 0.25)',
  },
  {
    id: 7,
    name: 'HR Dashboard',
    slug: 'hr-dashboard',
    badge: 'HR Dashboard',
    sections: ['employee-kpi', 'attendance', 'employee-growth', 'department-distribution', 'performance', 'recent-activity'],
    description: 'Sistem manajemen sumber daya manusia: telemetri absensi harian, grafik pertumbuhan talenta, distribusi departemen, dan tinjauan kinerja karyawan.',
    accentColor: '#8b5cf6',
    accentGlow: 'rgba(139, 92, 246, 0.25)',
  },
  {
    id: 8,
    name: 'Project Management',
    slug: 'project-management',
    badge: 'Project Management',
    sections: ['project-summary', 'progress-overview', 'active-projects', 'deadlines', 'team-performance', 'activity'],
    description: 'Manajemen proyek dan alur kerja Agile/Scrum: pelacakan sprint aktif, tenggat waktu mendesak, performa kontribusi tim, dan aktivitas tiket.',
    accentColor: '#f59e0b',
    accentGlow: 'rgba(245, 158, 11, 0.25)',
  },
  {
    id: 9,
    name: 'E-Commerce',
    slug: 'e-commerce',
    badge: 'E-Commerce',
    sections: ['orders', 'revenue', 'customers', 'products', 'sales-chart', 'top-products', 'recent-orders'],
    description: 'Toko online & marketplace engine: volume pesanan masuk, gross merchandise value (GMV), retensi pembeli, dan manajemen inventaris produk unggulan.',
    accentColor: '#f43f5e',
    accentGlow: 'rgba(244, 63, 94, 0.25)',
  },
  {
    id: 10,
    name: 'Finance',
    slug: 'finance',
    badge: 'Finance',
    sections: ['balance', 'income', 'expense', 'profit', 'cash-flow-chart', 'expense-breakdown', 'transactions'],
    description: 'Pusat kendali keuangan presisi: total saldo kas, arus kas masuk/keluar, rincian biaya operasional, dan riwayat mutasi transaksi terperinci.',
    accentColor: '#059669',
    accentGlow: 'rgba(5, 150, 105, 0.25)',
  },
  {
    id: 11,
    name: 'Developer',
    slug: 'developer',
    badge: 'Developer',
    sections: ['system-status', 'deployments', 'git-activity', 'api-usage', 'server-metrics', 'recent-logs'],
    description: 'Konsol DevOps & rekayasa perangkat lunak: status node server, deployment pipelines, grafik commit Git, kuota API, dan log error real-time.',
    accentColor: '#84cc16',
    accentGlow: 'rgba(132, 204, 22, 0.25)',
  },
  {
    id: 12,
    name: 'Student Dashboard',
    slug: 'student-dashboard',
    badge: 'Student Dashboard',
    sections: ['academic-summary', 'schedule', 'assignment-progress', 'gpa', 'attendance', 'upcoming-deadlines'],
    description: 'Portal akademik mahasiswa modern: jadwal kuliah harian, kemajuan tugas kuliah, akumulasi IPK/GPA, persentase kehadiran, dan pengingat ujian.',
    accentColor: '#0284c7',
    accentGlow: 'rgba(2, 132, 199, 0.25)',
  },
  {
    id: 13,
    name: 'Learning/LMS',
    slug: 'learning-lms',
    badge: 'Learning/LMS',
    sections: ['learning-progress', 'courses', 'completion-rate', 'study-activity', 'certificates', 'recommended-courses'],
    description: 'Platform edukasi daring: kurikulum kursus yang sedang dipelajari, tingkat penyelesaian materi, sertifikat kompetensi terbit, dan rekomendasi belajar.',
    accentColor: '#9333ea',
    accentGlow: 'rgba(147, 51, 234, 0.25)',
  },
  {
    id: 14,
    name: 'Service Business',
    slug: 'service-business',
    badge: 'Service Business',
    sections: ['total-orders', 'revenue', 'active-services', 'customer-growth', 'service-performance', 'employee-performance', 'recent-transactions'],
    description: 'Dasbor operasional bisnis jasa & agensi: pesanan layanan aktif, produktivitas per divisi, pertumbuhan klien retainers, dan efisiensi penagihan.',
    accentColor: '#2563eb',
    accentGlow: 'rgba(37, 99, 235, 0.25)',
  },
  {
    id: 15,
    name: 'Executive Dashboard',
    slug: 'executive-dashboard',
    badge: '🔥 Executive Dashboard',
    sections: ['business-health', 'revenue', 'profit', 'growth', 'strategic-kpi', 'performance-trend', 'key-insights'],
    description: 'Tampilan level C-Suite beresolusi tinggi: indikator kesehatan bisnis makro, tren laba EBITDA, metrik strategis tahunan, dan AI executive insights.',
    accentColor: '#d97706',
    accentGlow: 'rgba(217, 119, 6, 0.25)',
  },
  {
    id: 16,
    name: 'Data Center',
    slug: 'data-center',
    badge: 'Data Center',
    sections: ['system-health', 'cpu-ram-storage', 'network-traffic', 'server-status', 'alerts', 'logs'],
    description: 'Infrastruktur cloud & pemantauan server: utilitas CPU/RAM/NVMe, throughput bandwidth jaringan, klaster server multi-region, dan peringatan kritis.',
    accentColor: '#0d9488',
    accentGlow: 'rgba(13, 148, 136, 0.25)',
  },
  {
    id: 17,
    name: 'CRM Dashboard',
    slug: 'crm-dashboard',
    badge: 'CRM Dashboard',
    sections: ['leads', 'customers', 'conversion', 'sales-pipeline', 'customer-activity', 'follow-ups', 'recent-deals'],
    description: 'Manajemen prospek dan siklus pelanggan: pipeline peluang deal bertingkat, tindak lanjut tim sales (follow-up), dan histori interaksi klien utama.',
    accentColor: '#d946ef',
    accentGlow: 'rgba(217, 70, 239, 0.25)',
  },
  {
    id: 18,
    name: 'Operations Dashboard',
    slug: 'operations-dashboard',
    badge: 'Operations Dashboard',
    sections: ['todays-overview', 'tasks', 'orders', 'staff-status', 'operational-performance', 'alerts', 'activity'],
    description: 'Pusat koordinasi operasional harian: daftar tugas prioritas hari ini, status kesiapan shift staf, efisiensi waktu siklus, dan log investigasi insiden.',
    accentColor: '#ea580c',
    accentGlow: 'rgba(234, 88, 12, 0.25)',
  },
  {
    id: 19,
    name: 'AI Dashboard',
    slug: 'ai-dashboard',
    badge: 'AI Dashboard',
    sections: ['ai-usage', 'requests', 'token-cost', 'model-performance', 'accuracy', 'usage-trend', 'logs'],
    description: 'Telemetri kecerdasan buatan: volume panggilan inferensi model LLM, konsumsi token API, estimasi biaya komputasi GPU, dan skor akurasi presisi.',
    accentColor: '#a855f7',
    accentGlow: 'rgba(168, 85, 247, 0.25)',
  },
  {
    id: 20,
    name: 'All-in-One Premium',
    slug: 'all-in-one-premium',
    badge: '🚀 All-in-One Premium',
    sections: ['welcome', 'kpi-overview', 'main-performance', 'revenue', 'activity', 'performance-ranking', 'insights', 'quick-actions'],
    description: 'Solusi lengkap komprehensif tanpa kompromi: memadukan indikator kinerja modular, visualisasi tren canggih, perankingan real-time, dan otomasi cerdas.',
    accentColor: '#f43f5e',
    accentGlow: 'rgba(244, 63, 94, 0.25)',
  },
];

export const DASHBOARD_TEMPLATES: Record<string, DashboardTemplate> = {
  'classic-admin': {
    id: 'classic-admin',
    slug: 'classic-admin',
    name: 'Classic Admin',
    subtitle: 'Enterprise Command & System Control',
    styleId: 1,
    styleName: 'Classic Admin',
    badge: '⭐ Classic Admin',
    description: 'Format baku manajemen korporat dengan hierarki terstruktur: 4 kartu metrik utama, revenue chart, activity timeline, dan tabel mutasi.',
    price: 49,
    featuredTag: 'Enterprise Standard',
    accentColor: '#3b82f6',
    accentGlow: 'rgba(59, 130, 246, 0.25)',
    themeMode: 'dark',
    sections: ['header', 'sidebar', 'kpi-cards', 'revenue-chart', 'recent-activity', 'recent-transactions'],
    chartTitle: 'Quarterly Revenue Performance',
    chartSubtitle: 'Aggregated revenue comparison against fiscal targets',
    kpis: [
      { title: 'Total Revenue', value: '$842,500', change: '+14.2%', isPositive: true, period: 'vs last quarter' },
      { title: 'Active Accounts', value: '18,420', change: '+8.4%', isPositive: true, period: 'vs last month' },
      { title: 'System Uptime', value: '99.98%', change: '+0.02%', isPositive: true, period: 'last 30 days' },
      { title: 'Pending Invoices', value: '$42,300', change: '-3.1%', isPositive: false, period: '12 invoices overdue' }
    ],
    chartData: [
      { label: 'Jan', value: 65, secondaryValue: 50 },
      { label: 'Feb', value: 78, secondaryValue: 60 },
      { label: 'Mar', value: 92, secondaryValue: 70 },
      { label: 'Apr', value: 85, secondaryValue: 75 },
      { label: 'May', value: 110, secondaryValue: 90 },
      { label: 'Jun', value: 128, secondaryValue: 105 }
    ],
    activities: [
      { id: 'act-1', title: 'Global role permissions updated for Operations Guild', time: '8m ago', user: 'Admin Sarah' },
      { id: 'act-2', title: 'Batch payout approved for Enterprise Vendors', time: '42m ago', user: 'Finance Lead Alex' },
      { id: 'act-3', title: 'Database index optimization executed cleanly', time: '2h ago', user: 'DevOps System' }
    ],
    tableItems: [
      { id: 'TXN-9021', name: 'Acme Global Retainer', category: 'Enterprise Tier', value: '$24,500', status: 'completed', date: 'Today, 14:20' },
      { id: 'TXN-9020', name: 'Stark Industries Cloud', category: 'Platform Add-on', value: '$12,800', status: 'completed', date: 'Today, 11:45' },
      { id: 'TXN-9019', name: 'Wayne Tech API Gateway', category: 'Usage Spike', value: '$4,250', status: 'pending', date: 'Today, 09:12' },
      { id: 'TXN-9018', name: 'Cyberdyne Data Stream', category: 'Annual License', value: '$68,000', status: 'completed', date: 'Yesterday' }
    ],
    quickActions: [
      { label: 'Export Audit Log', icon: 'FileText', action: 'export' },
      { label: 'Create Invoice', icon: 'Plus', action: 'invoice' },
      { label: 'Flush Cache', icon: 'RefreshCw', action: 'cache' }
    ]
  },
  'modern-saas': {
    id: 'modern-saas',
    slug: 'modern-saas',
    name: 'Modern SaaS',
    subtitle: 'B2B Product Metrics & User Engagement',
    styleId: 2,
    styleName: 'Modern SaaS',
    badge: 'Modern SaaS',
    description: 'Fokus produk cloud berlangganan: header sambutan personal, metrik ARR/MRR, performa retensi, dan aksi kilat.',
    price: 49,
    featuredTag: 'B2B Popular',
    accentColor: '#6366f1',
    accentGlow: 'rgba(99, 102, 241, 0.25)',
    themeMode: 'dark',
    sections: ['welcome-header', 'kpi-cards', 'performance-chart', 'quick-actions', 'recent-projects', 'activity'],
    chartTitle: 'Monthly Recurring Revenue (MRR)',
    chartSubtitle: 'Net new MRR expansion vs churn rate',
    kpis: [
      { title: 'Annual Recurring Revenue', value: '$1.42M', change: '+22.5%', isPositive: true, period: 'YoY Growth' },
      { title: 'Net MRR Expansion', value: '$118,400', change: '+12.4%', isPositive: true, period: 'Current Month' },
      { title: 'Customer Churn', value: '1.2%', change: '-0.4%', isPositive: true, period: 'Record low' },
      { title: 'LTV / CAC Ratio', value: '4.8x', change: '+0.6x', isPositive: true, period: 'Target: >3.5x' }
    ],
    chartData: [
      { label: 'Oct', value: 85 },
      { label: 'Nov', value: 94 },
      { label: 'Dec', value: 104 },
      { label: 'Jan', value: 112 },
      { label: 'Feb', value: 125 },
      { label: 'Mar', value: 142 }
    ],
    activities: [
      { id: 'act-1', title: 'New team workspace provisioned by FinTech Corp', time: '12m ago', user: 'Marcus Vance' },
      { id: 'act-2', title: 'Seat upgrade to Enterprise Plus (+25 seats)', time: '1h ago', user: 'Elena Rostova' },
      { id: 'act-3', title: 'Webhook endpoint verified for Stripe Billing v3', time: '3h ago', user: 'API Worker' }
    ],
    tableItems: [
      { id: 'PRJ-401', name: 'Unified Billing Gateway', category: 'Core Platform', value: '92% complete', status: 'active', date: 'Sprint 28' },
      { id: 'PRJ-402', name: 'SOC-2 Compliance Automation', category: 'Security', value: '100% complete', status: 'completed', date: 'Sprint 27' },
      { id: 'PRJ-403', name: 'Real-time WebSocket Engine', category: 'Infrastructure', value: '64% complete', status: 'pending', date: 'Sprint 28' }
    ],
    quickActions: [
      { label: 'Invite Teammate', icon: 'UserPlus', action: 'invite' },
      { label: 'Upgrade Plan', icon: 'Sparkles', action: 'upgrade' },
      { label: 'API Keys', icon: 'Key', action: 'keys' }
    ]
  },
  'analytics': {
    id: 'analytics',
    slug: 'analytics',
    name: 'Analytics',
    subtitle: 'Data Intelligence & Funnel Conversion',
    styleId: 3,
    styleName: 'Analytics',
    badge: 'Analytics',
    description: 'Dasbor data mendalam: overview audiens, grafik user growth, tingkat konversi multi-channel, dan matriks traffic.',
    price: 49,
    accentColor: '#06b6d4',
    accentGlow: 'rgba(6, 182, 212, 0.25)',
    themeMode: 'dark',
    sections: ['kpi-overview', 'revenue-chart', 'user-growth', 'conversion-rate', 'traffic-sources', 'detailed-table'],
    chartTitle: 'Traffic Attribution & Funnel Conversions',
    chartSubtitle: 'Direct, organic search, and referral conversion paths',
    kpis: [
      { title: 'Total Sessions', value: '1,248,900', change: '+18.6%', isPositive: true, period: '30d range' },
      { title: 'Avg. Conversion Rate', value: '4.68%', change: '+0.84%', isPositive: true, period: 'All funnels' },
      { title: 'Bounce Rate', value: '28.4%', change: '-3.2%', isPositive: true, period: 'Benchmark: 35%' },
      { title: 'Session Duration', value: '4m 32s', change: '+24s', isPositive: true, period: 'Engaged users' }
    ],
    chartData: [
      { label: 'W1', value: 180, secondaryValue: 120 },
      { label: 'W2', value: 210, secondaryValue: 145 },
      { label: 'W3', value: 260, secondaryValue: 180 },
      { label: 'W4', value: 310, secondaryValue: 220 }
    ],
    activities: [
      { id: 'act-1', title: 'UTM Campaign "Summer Release" exceeded target by 34%', time: '15m ago', user: 'Marketing AI' },
      { id: 'act-2', title: 'Organic search traffic spiked on technical documentation', time: '1h ago', user: 'Search Engine' }
    ],
    tableItems: [
      { id: 'SRC-01', name: 'Google Organic Search', category: 'Search', value: '42.8% traffic', status: 'completed', date: '534K users' },
      { id: 'SRC-02', name: 'Direct Referral Links', category: 'Direct', value: '28.1% traffic', status: 'completed', date: '351K users' },
      { id: 'SRC-03', name: 'GitHub Ecosystem', category: 'Developer', value: '18.4% traffic', status: 'active', date: '229K users' },
      { id: 'SRC-04', name: 'Social / Tech Community', category: 'Social', value: '10.7% traffic', status: 'pending', date: '133K users' }
    ]
  },
  'minimalist': {
    id: 'minimalist',
    slug: 'minimalist',
    name: 'Minimalist',
    subtitle: 'Zen Space & Distraction-Free Telemetry',
    styleId: 4,
    styleName: 'Minimalist',
    badge: 'Minimalist',
    description: 'Estetika serba rapi dan hening: greeting elegan, 3-4 KPI esensial, grafik garis minimalis, dan aksi cepat.',
    price: 49,
    accentColor: '#94a3b8',
    accentGlow: 'rgba(148, 163, 184, 0.2)',
    themeMode: 'dark',
    sections: ['greeting', 'kpi-cards', 'main-chart', 'recent-activity', 'quick-actions'],
    chartTitle: 'Focus Metric Overview',
    chartSubtitle: 'Uncluttered weekly performance trajectory',
    kpis: [
      { title: 'Current Net Flow', value: '$34,800', change: '+6.2%', isPositive: true },
      { title: 'Active Focus Sprints', value: '8', change: 'On track', isPositive: true },
      { title: 'Efficiency Score', value: '98.4%', change: '+1.2%', isPositive: true }
    ],
    chartData: [
      { label: 'Mon', value: 40 },
      { label: 'Tue', value: 55 },
      { label: 'Wed', value: 68 },
      { label: 'Thu', value: 60 },
      { label: 'Fri', value: 85 },
      { label: 'Sat', value: 72 },
      { label: 'Sun', value: 90 }
    ],
    activities: [
      { id: 'act-1', title: 'Daily sync completed with core design guild', time: '10m ago', user: 'Lead' },
      { id: 'act-2', title: 'All unit test suites green across 4 micro-repos', time: '1h ago', user: 'CI/CD' }
    ],
    tableItems: [
      { id: 'TSK-1', name: 'Clean up legacy CSS tokens', category: 'Refactor', value: 'Done', status: 'completed', date: 'Today' },
      { id: 'TSK-2', name: 'Optimize image WebP pipelines', category: 'Performance', value: 'Done', status: 'completed', date: 'Today' }
    ]
  },
  'business-dashboard': {
    id: 'business-dashboard',
    slug: 'business-dashboard',
    name: 'Business Dashboard',
    subtitle: 'Corporate Financial Health & P&L Analysis',
    styleId: 5,
    styleName: 'Business Dashboard',
    badge: 'Business Dashboard',
    description: 'Tinjauan bisnis lengkap: pendapatan kotor, pengeluaran operasional, laba bersih, dan produk teratas.',
    price: 49,
    accentColor: '#0284c7',
    accentGlow: 'rgba(2, 132, 199, 0.25)',
    themeMode: 'dark',
    sections: ['business-overview', 'revenue', 'expenses', 'profit', 'sales-chart', 'top-products', 'transactions'],
    chartTitle: 'Profit & Loss (P&L) Trajectory',
    chartSubtitle: 'Net profit margins vs operational overhead',
    kpis: [
      { title: 'Gross Revenue', value: '$520,400', change: '+16.5%', isPositive: true },
      { title: 'Operating Expenses', value: '$210,200', change: '-4.2%', isPositive: true },
      { title: 'Net Operating Profit', value: '$310,200', change: '+32.8%', isPositive: true },
      { title: 'EBITDA Margin', value: '59.6%', change: '+5.4%', isPositive: true }
    ],
    chartData: [
      { label: 'Q1', value: 110, secondaryValue: 60 },
      { label: 'Q2', value: 135, secondaryValue: 65 },
      { label: 'Q3', value: 155, secondaryValue: 70 },
      { label: 'Q4', value: 190, secondaryValue: 80 }
    ],
    activities: [
      { id: 'act-1', title: 'Q3 Financial Audit approved by KPMG Auditors', time: '2h ago', user: 'CFO Office' },
      { id: 'act-2', title: 'Commercial contract renewed with Apex Logistics', time: '5h ago', user: 'Sales VP' }
    ],
    tableItems: [
      { id: 'PRD-01', name: 'Enterprise Cloud License', category: 'Software', value: '$184,000', status: 'completed', date: 'Tier 1' },
      { id: 'PRD-02', name: 'Dedicated Infrastructure Pod', category: 'DevOps', value: '$96,500', status: 'completed', date: 'Tier 2' },
      { id: 'PRD-03', name: '24/7 SLA Engineering Support', category: 'Services', value: '$45,000', status: 'completed', date: 'Tier 3' }
    ]
  },
  'sales-dashboard': {
    id: 'sales-dashboard',
    slug: 'sales-dashboard',
    name: 'Sales Dashboard',
    subtitle: 'Pipeline Momentum & High-Volume Quota',
    styleId: 6,
    styleName: 'Sales Dashboard',
    badge: 'Sales Dashboard',
    description: 'Dasbor kecepatan penjualan: sales KPI, grafik tren transaksi, target progress bar, dan daftar pesanan terbaru.',
    price: 49,
    accentColor: '#10b981',
    accentGlow: 'rgba(16, 185, 129, 0.25)',
    themeMode: 'dark',
    sections: ['sales-kpi', 'sales-trend', 'target-progress', 'top-products', 'top-customers', 'recent-orders'],
    chartTitle: 'Daily Sales Volume & Quota Pacing',
    chartSubtitle: 'Current month pacing at 114% of quota',
    kpis: [
      { title: 'Closed Won Deals', value: '$384,900', change: '+28.4%', isPositive: true },
      { title: 'Win Rate', value: '41.2%', change: '+4.5%', isPositive: true },
      { title: 'Average Deal Size', value: '$14,250', change: '+11.8%', isPositive: true },
      { title: 'Sales Cycle Time', value: '18 Days', change: '-4 Days', isPositive: true }
    ],
    chartData: [
      { label: 'Week 1', value: 60 },
      { label: 'Week 2', value: 85 },
      { label: 'Week 3', value: 110 },
      { label: 'Week 4', value: 135 }
    ],
    activities: [
      { id: 'act-1', title: 'Contract signed: Horizon Healthcare ($48K ARR)', time: '14m ago', user: 'John Doe' },
      { id: 'act-2', title: 'Proposal accepted: Stellar Media ($32K ARR)', time: '1h ago', user: 'Maria Santos' }
    ],
    tableItems: [
      { id: 'ORD-892', name: 'Horizon Healthcare System', category: 'HealthTech', value: '$48,000', status: 'completed', date: 'Just now' },
      { id: 'ORD-891', name: 'Stellar Media Network', category: 'Media', value: '$32,000', status: 'completed', date: '1h ago' },
      { id: 'ORD-890', name: 'Nordic Financial Group', category: 'Banking', value: '$64,000', status: 'active', date: '3h ago' }
    ]
  },
  'hr-dashboard': {
    id: 'hr-dashboard',
    slug: 'hr-dashboard',
    name: 'HR Dashboard',
    subtitle: 'People Operations & Talent Retention',
    styleId: 7,
    styleName: 'HR Dashboard',
    badge: 'HR Dashboard',
    description: 'Manajemen sumber daya manusia: statistik karyawan, kehadiran, pertumbuhan staf, dan distribusi departemen.',
    price: 49,
    accentColor: '#8b5cf6',
    accentGlow: 'rgba(139, 92, 246, 0.25)',
    themeMode: 'dark',
    sections: ['employee-kpi', 'attendance', 'employee-growth', 'department-distribution', 'performance', 'recent-activity'],
    chartTitle: 'Headcount Growth & Department Allocation',
    chartSubtitle: 'Hiring trajectory across Engineering, Design, and Sales',
    kpis: [
      { title: 'Total Team Headcount', value: '284', change: '+18 hired', isPositive: true },
      { title: 'Daily Attendance Rate', value: '97.2%', change: '+0.8%', isPositive: true },
      { title: 'Employee Satisfaction', value: '4.8 / 5', change: '+0.2', isPositive: true },
      { title: 'Turnover Rate', value: '2.1%', change: '-1.4%', isPositive: true }
    ],
    chartData: [
      { label: 'Q1', value: 210 },
      { label: 'Q2', value: 235 },
      { label: 'Q3', value: 260 },
      { label: 'Q4', value: 284 }
    ],
    activities: [
      { id: 'act-1', title: 'Onboarding completed for 4 Senior React Engineers', time: '30m ago', user: 'HR Team' },
      { id: 'act-2', title: 'Annual Compensation Reviews finalized', time: '3h ago', user: 'People Ops' }
    ],
    tableItems: [
      { id: 'DEP-ENG', name: 'Engineering & Cloud Architecture', category: 'Core Tech', value: '112 Staff', status: 'completed', date: '39% of total' },
      { id: 'DEP-DES', name: 'Product Design & User Research', category: 'Creative', value: '38 Staff', status: 'completed', date: '13% of total' },
      { id: 'DEP-SAL', name: 'Enterprise Sales & Operations', category: 'Revenue', value: '82 Staff', status: 'completed', date: '29% of total' }
    ]
  },
  'project-management': {
    id: 'project-management',
    slug: 'project-management',
    name: 'Project Management',
    subtitle: 'Sprint Velocity & Milestone Delivery',
    styleId: 8,
    styleName: 'Project Management',
    badge: 'Project Management',
    description: 'Manajemen proyek & sprint: rangkuman proyek, progress bar deliverable, tenggat waktu, dan performa tim.',
    price: 49,
    accentColor: '#f59e0b',
    accentGlow: 'rgba(245, 158, 11, 0.25)',
    themeMode: 'dark',
    sections: ['project-summary', 'progress-overview', 'active-projects', 'deadlines', 'team-performance', 'activity'],
    chartTitle: 'Sprint Velocity & Burndown Chart',
    chartSubtitle: 'Story points completed vs estimated capacity',
    kpis: [
      { title: 'Active Milestones', value: '14', change: '2 due this week', isPositive: true },
      { title: 'Sprint Velocity', value: '84 pts', change: '+12 pts', isPositive: true },
      { title: 'On-Time Completion', value: '94.8%', change: '+3.4%', isPositive: true },
      { title: 'Blocked Issues', value: '1', change: '-3 resolved', isPositive: true }
    ],
    chartData: [
      { label: 'Day 1', value: 84 },
      { label: 'Day 3', value: 68 },
      { label: 'Day 5', value: 45 },
      { label: 'Day 7', value: 28 },
      { label: 'Day 10', value: 4 }
    ],
    activities: [
      { id: 'act-1', title: 'Pull Request #291 merged into main: Auth v2', time: '18m ago', user: 'Tech Lead' },
      { id: 'act-2', title: 'Figma prototype signed off for Checkout revamp', time: '1h ago', user: 'Product Manager' }
    ],
    tableItems: [
      { id: 'PRJ-101', name: 'Mobile App React Native Build', category: 'Mobile', value: '85% complete', status: 'active', date: 'Due Oct 12' },
      { id: 'PRJ-102', name: 'Multi-Tenant Database Partitioning', category: 'Backend', value: '98% complete', status: 'completed', date: 'Due Sep 30' },
      { id: 'PRJ-103', name: 'Design System Documentation v2', category: 'Design', value: '60% complete', status: 'pending', date: 'Due Oct 24' }
    ]
  },
  'e-commerce': {
    id: 'e-commerce',
    slug: 'e-commerce',
    name: 'E-Commerce',
    subtitle: 'Store Telemetry & Real-Time Checkout Flow',
    styleId: 9,
    styleName: 'E-Commerce',
    badge: 'E-Commerce',
    description: 'Pusat kendali toko online: pesanan masuk, pendapatan GMV, pertumbuhan pembeli, dan katalog produk terlaris.',
    price: 49,
    accentColor: '#f43f5e',
    accentGlow: 'rgba(244, 63, 94, 0.25)',
    themeMode: 'dark',
    sections: ['orders', 'revenue', 'customers', 'products', 'sales-chart', 'top-products', 'recent-orders'],
    chartTitle: 'Hourly Sales & Checkout Conversion',
    chartSubtitle: 'Cart-to-paid conversion pacing at 3.8%',
    kpis: [
      { title: 'Today Orders', value: '1,420', change: '+24.1%', isPositive: true },
      { title: 'Gross Merchandise Value', value: '$184,200', change: '+18.7%', isPositive: true },
      { title: 'Average Order Value', value: '$129.70', change: '+$8.20', isPositive: true },
      { title: 'Cart Abandonment', value: '42.1%', change: '-4.6%', isPositive: true }
    ],
    chartData: [
      { label: '08:00', value: 45 },
      { label: '11:00', value: 92 },
      { label: '14:00', value: 145 },
      { label: '17:00', value: 184 },
      { label: '20:00', value: 210 }
    ],
    activities: [
      { id: 'act-1', title: 'Flash sale campaign generated 320 orders in 10 mins', time: '5m ago', user: 'Store Bot' },
      { id: 'act-2', title: 'Inventory restock alert: Cyberpunk Hoodie (50 units)', time: '45m ago', user: 'Warehouse' }
    ],
    tableItems: [
      { id: 'SKU-801', name: 'Cyberpunk Tactical Hoodie', category: 'Apparel', value: '$89.00', status: 'completed', date: '420 sold today' },
      { id: 'SKU-802', name: 'Mechanical Keycaps Custom Set', category: 'Accessories', value: '$45.00', status: 'completed', date: '290 sold today' },
      { id: 'SKU-803', name: 'Desk Mat Anti-Fray Edition', category: 'Workspace', value: '$34.00', status: 'completed', date: '180 sold today' }
    ]
  },
  'finance': {
    id: 'finance',
    slug: 'finance',
    name: 'Finance',
    subtitle: 'Treasury, Cash Flow & Balance Reserves',
    styleId: 10,
    styleName: 'Finance',
    badge: 'Finance',
    description: 'Pengelolaan kas presisi: total saldo, pemasukan, pengeluaran, laba bersih, dan grafik cash flow.',
    price: 49,
    accentColor: '#059669',
    accentGlow: 'rgba(5, 150, 105, 0.25)',
    themeMode: 'dark',
    sections: ['balance', 'income', 'expense', 'profit', 'cash-flow-chart', 'expense-breakdown', 'transactions'],
    chartTitle: 'Net Cash Flow & Working Capital',
    chartSubtitle: 'Liquidity reserve buffer at 14.8 months runway',
    kpis: [
      { title: 'Total Cash Reserves', value: '$2,480,000', change: '+$142K', isPositive: true },
      { title: 'Monthly Inflow', value: '$420,000', change: '+14.2%', isPositive: true },
      { title: 'Monthly Burn Rate', value: '$165,000', change: '-2.4%', isPositive: true },
      { title: 'Runway Projection', value: '15.0 Mos', change: '+1.5 Mos', isPositive: true }
    ],
    chartData: [
      { label: 'Jan', value: 380, secondaryValue: 150 },
      { label: 'Feb', value: 410, secondaryValue: 160 },
      { label: 'Mar', value: 440, secondaryValue: 158 },
      { label: 'Apr', value: 475, secondaryValue: 165 }
    ],
    activities: [
      { id: 'act-1', title: 'Monthly payroll processed for 284 employees', time: '1h ago', user: 'Treasury' },
      { id: 'act-2', title: 'AWS Cloud Reserved Instances renewed (-28% savings)', time: '4h ago', user: 'Finance Bot' }
    ],
    tableItems: [
      { id: 'EXP-1', name: 'Cloud Infrastructure & Edge CDN', category: 'OpEx', value: '$42,500', status: 'completed', date: 'Auto-debit' },
      { id: 'EXP-2', name: 'Enterprise Office Lease (HQ)', category: 'Real Estate', value: '$28,000', status: 'completed', date: 'Monthly' },
      { id: 'EXP-3', name: 'Employee Health & Wellness Benefits', category: 'Benefits', value: '$31,200', status: 'completed', date: 'Monthly' }
    ]
  },
  'developer': {
    id: 'developer',
    slug: 'developer',
    name: 'Developer',
    subtitle: 'DevOps Metrics, Git Activity & API Telemetry',
    styleId: 11,
    styleName: 'Developer',
    badge: 'Developer',
    description: 'Konsol DevOps & rekayasa perangkat lunak: sistem status, deployment pipeline, Git activity, dan server telemetry.',
    price: 49,
    accentColor: '#84cc16',
    accentGlow: 'rgba(132, 204, 22, 0.25)',
    themeMode: 'dark',
    sections: ['system-status', 'deployments', 'git-activity', 'api-usage', 'server-metrics', 'recent-logs'],
    chartTitle: 'API Gateway Requests & Latency Profile',
    chartSubtitle: 'P99 Latency at 18ms across global edge locations',
    kpis: [
      { title: 'API Requests / Min', value: '42,500', change: '+18.2%', isPositive: true },
      { title: 'P99 Edge Latency', value: '18.4 ms', change: '-4.2ms', isPositive: true },
      { title: 'Deployment Status', value: 'Passing', change: 'Commit 7d2fb84', isPositive: true },
      { title: 'Failed Requests (5xx)', value: '0.002%', change: 'Zero incident', isPositive: true }
    ],
    chartData: [
      { label: '00:00', value: 18 },
      { label: '06:00', value: 24 },
      { label: '12:00', value: 48 },
      { label: '18:00', value: 42 },
      { label: '23:00', value: 28 }
    ],
    activities: [
      { id: 'act-1', title: 'Next.js 16 build deployed to 42 edge regions in 14s', time: '4m ago', user: 'GitHub Actions' },
      { id: 'act-2', title: 'Database auto-scaler scaled read replica group to 4 nodes', time: '1h ago', user: 'K8s Cluster' }
    ],
    tableItems: [
      { id: 'DEP-84', name: 'production/main: 624fe41', category: 'Vercel Edge', value: 'Success (14s)', status: 'completed', date: '4m ago' },
      { id: 'DEP-83', name: 'staging/pr-24: dd06133', category: 'Preview Env', value: 'Success (16s)', status: 'completed', date: '30m ago' },
      { id: 'DEP-82', name: 'production/main: 7d2fb84', category: 'Vercel Edge', value: 'Success (15s)', status: 'completed', date: '2h ago' }
    ]
  },
  'student-dashboard': {
    id: 'student-dashboard',
    slug: 'student-dashboard',
    name: 'Student Dashboard',
    subtitle: 'Academic Progress, GPA Tracker & Schedule',
    styleId: 12,
    styleName: 'Student Dashboard',
    badge: 'Student Dashboard',
    description: 'Portal edukasi mahasiswa: ringkasan akademik, jadwal perkuliahan, kemajuan tugas, IPK, dan tenggat waktu.',
    price: 49,
    accentColor: '#0284c7',
    accentGlow: 'rgba(2, 132, 199, 0.25)',
    themeMode: 'dark',
    sections: ['academic-summary', 'schedule', 'assignment-progress', 'gpa', 'attendance', 'upcoming-deadlines'],
    chartTitle: 'GPA & Credit Hours Semester Trajectory',
    chartSubtitle: 'Cumulative GPA pacing at 3.92 / 4.00',
    kpis: [
      { title: 'Cumulative GPA', value: '3.92', change: '+0.06', isPositive: true },
      { title: 'Completed Credits', value: '114 / 144', change: '84% of degree', isPositive: true },
      { title: 'Semester Attendance', value: '98.5%', change: 'Top 5%', isPositive: true },
      { title: 'Pending Assignments', value: '2 Due', change: 'Next 48h', isPositive: false }
    ],
    chartData: [
      { label: 'Sem 1', value: 375 },
      { label: 'Sem 2', value: 382 },
      { label: 'Sem 3', value: 388 },
      { label: 'Sem 4', value: 390 },
      { label: 'Sem 5', value: 392 }
    ],
    activities: [
      { id: 'act-1', title: 'Submitted Final Project: Distributed Database Architecture', time: '2h ago', user: 'CS Dept' },
      { id: 'act-2', title: 'Grade released: Advanced Algorithms (Score: 98/100 - A)', time: '5h ago', user: 'Prof. Miller' }
    ],
    tableItems: [
      { id: 'CS-401', name: 'Distributed Systems & Cloud', category: 'Informatics', value: 'Grade A', status: 'completed', date: '3 Credits' },
      { id: 'CS-402', name: 'Software Architecture Patterns', category: 'Informatics', value: 'Grade A', status: 'completed', date: '4 Credits' },
      { id: 'CS-403', name: 'Human-Computer Interaction (HCI)', category: 'Design', value: 'Grade A-', status: 'active', date: '3 Credits' }
    ]
  },
  'learning-lms': {
    id: 'learning-lms',
    slug: 'learning-lms',
    name: 'Learning/LMS',
    subtitle: 'Course Progress, Certifications & Skills',
    styleId: 13,
    styleName: 'Learning/LMS',
    badge: 'Learning/LMS',
    description: 'Platform edukasi daring: kemajuan belajar, kurikulum materi, rasio kelulusan, dan sertifikat terverifikasi.',
    price: 49,
    accentColor: '#9333ea',
    accentGlow: 'rgba(147, 51, 234, 0.25)',
    themeMode: 'dark',
    sections: ['learning-progress', 'courses', 'completion-rate', 'study-activity', 'certificates', 'recommended-courses'],
    chartTitle: 'Weekly Study Time & Module Completions',
    chartSubtitle: 'Average 14.5 hours of deep technical study per week',
    kpis: [
      { title: 'Courses Completed', value: '18', change: '+3 this month', isPositive: true },
      { title: 'Hours Studied', value: '248 hrs', change: '+32 hrs', isPositive: true },
      { title: 'Avg Quiz Score', value: '96.4%', change: '+2.1%', isPositive: true },
      { title: 'Earned Certs', value: '8 Verified', change: 'Industry standard', isPositive: true }
    ],
    chartData: [
      { label: 'Mon', value: 2 },
      { label: 'Tue', value: 3 },
      { label: 'Wed', value: 2.5 },
      { label: 'Thu', value: 4 },
      { label: 'Fri', value: 3 },
      { label: 'Sat', value: 5 }
    ],
    activities: [
      { id: 'act-1', title: 'Completed Certificate: Next.js 16 Production Architect', time: '1d ago', user: 'Vercel Academy' },
      { id: 'act-2', title: 'Scored 100% on Advanced TypeScript Generics Quiz', time: '2d ago', user: 'TS Master' }
    ],
    tableItems: [
      { id: 'CRS-01', name: 'Full Stack Systems with Next.js 16', category: 'Frontend', value: '100% Done', status: 'completed', date: 'Certified' },
      { id: 'CRS-02', name: 'Distributed Systems & Microservices', category: 'Backend', value: '88% Done', status: 'active', date: 'In progress' },
      { id: 'CRS-03', name: 'High-Performance 3D WebGL (Three.js)', category: 'Graphics', value: '65% Done', status: 'active', date: 'In progress' }
    ]
  },
  'service-business': {
    id: 'service-business',
    slug: 'service-business',
    name: 'Service Business',
    subtitle: 'Agency Retainers, Billing & Service Delivery',
    styleId: 14,
    styleName: 'Service Business',
    badge: 'Service Business',
    description: 'Dasbor bisnis jasa & agensi: pesanan masuk, pendapatan jasa, performa karyawan, dan transaksi klien retainers.',
    price: 49,
    accentColor: '#2563eb',
    accentGlow: 'rgba(37, 99, 235, 0.25)',
    themeMode: 'dark',
    sections: ['total-orders', 'revenue', 'active-services', 'customer-growth', 'service-performance', 'employee-performance', 'recent-transactions'],
    chartTitle: 'Service Fulfillment Rate & Billings',
    chartSubtitle: 'Billable hours utilization at 92.4%',
    kpis: [
      { title: 'Total Service Orders', value: '428', change: '+18.4%', isPositive: true },
      { title: 'Active Retainers', value: '34 Clients', change: '+4 new', isPositive: true },
      { title: 'Billable Utilization', value: '92.4%', change: '+5.1%', isPositive: true },
      { title: 'Client NPS Score', value: '84', change: '+6 pts', isPositive: true }
    ],
    chartData: [
      { label: 'W1', value: 85 },
      { label: 'W2', value: 110 },
      { label: 'W3', value: 135 },
      { label: 'W4', value: 160 }
    ],
    activities: [
      { id: 'act-1', title: 'Brand identity system delivered to FinTech client', time: '40m ago', user: 'Creative Guild' },
      { id: 'act-2', title: 'E-commerce redesign retainer renewed for 12 months', time: '3h ago', user: 'Account Exec' }
    ],
    tableItems: [
      { id: 'SRV-10', name: 'Custom Design System & Figma Tokens', category: 'Design', value: '$18,500', status: 'completed', date: 'Delivered' },
      { id: 'SRV-11', name: 'Full-Stack Web App Engineering', category: 'Development', value: '$34,000', status: 'active', date: 'Milestone 3' },
      { id: 'SRV-12', name: 'Performance Optimization & Core Vitals', category: 'DevOps', value: '$8,200', status: 'completed', date: 'Delivered' }
    ]
  },
  'executive-dashboard': {
    id: 'executive-dashboard',
    slug: 'executive-dashboard',
    name: 'Executive Dashboard',
    subtitle: 'C-Suite Macro Health, Revenue & Valuation',
    styleId: 15,
    styleName: 'Executive Dashboard',
    badge: '🔥 Executive Dashboard',
    description: 'Tampilan level C-Suite beresolusi tinggi: indikator kesehatan bisnis makro, tren laba EBITDA, metrik strategis, dan AI insights.',
    price: 49,
    featuredTag: 'C-Suite Tier',
    accentColor: '#d97706',
    accentGlow: 'rgba(217, 119, 6, 0.25)',
    themeMode: 'dark',
    sections: ['business-health', 'revenue', 'profit', 'growth', 'strategic-kpi', 'performance-trend', 'key-insights'],
    chartTitle: 'Enterprise Valuation & Strategic Growth Model',
    chartSubtitle: 'Operating margin expansion from 32% to 46%',
    kpis: [
      { title: 'Enterprise Valuation', value: '$48.5M', change: '+38% YoY', isPositive: true },
      { title: 'EBITDA Margin', value: '46.2%', change: '+14.2%', isPositive: true },
      { title: 'Annual Free Cash Flow', value: '$4.8M', change: '+22.4%', isPositive: true },
      { title: 'Rule of 40 Score', value: '62.4%', change: 'Elite tier (>40)', isPositive: true }
    ],
    chartData: [
      { label: '2023', value: 24 },
      { label: '2024', value: 32 },
      { label: '2025', value: 41 },
      { label: '2026 (Est)', value: 54 }
    ],
    activities: [
      { id: 'act-1', title: 'Board approved Series B expansion and international hiring', time: '1d ago', user: 'Board of Directors' },
      { id: 'act-2', title: 'Strategic partnership signed with Cloud Provider', time: '3d ago', user: 'CEO Office' }
    ],
    tableItems: [
      { id: 'KPI-1', name: 'Net Revenue Retention (NRR)', category: 'SaaS Metric', value: '128%', status: 'completed', date: 'Top quartile' },
      { id: 'KPI-2', name: 'Magic Number (Sales Efficiency)', category: 'GTM', value: '1.42', status: 'completed', date: 'Highly efficient' },
      { id: 'KPI-3', name: 'Customer Payback Period', category: 'Finance', value: '8.2 Months', status: 'completed', date: 'Industry leading' }
    ]
  },
  'data-center': {
    id: 'data-center',
    slug: 'data-center',
    name: 'Data Center',
    subtitle: 'Cluster Health, Hardware Telemetry & Nodes',
    styleId: 16,
    styleName: 'Data Center',
    badge: 'Data Center',
    description: 'Infrastruktur cloud & pemantauan server: utilitas CPU/RAM/NVMe, throughput bandwidth jaringan, dan peringatan kritis.',
    price: 49,
    accentColor: '#0d9488',
    accentGlow: 'rgba(13, 148, 136, 0.25)',
    themeMode: 'dark',
    sections: ['system-health', 'cpu-ram-storage', 'network-traffic', 'server-status', 'alerts', 'logs'],
    chartTitle: 'Network Throughput (Gbps) & Packet Flow',
    chartSubtitle: 'Zero packet loss across 64 edge clusters',
    kpis: [
      { title: 'Active Clusters', value: '64 Nodes', change: '100% Healthy', isPositive: true },
      { title: 'CPU Core Utilization', value: '38.4%', change: '-2.1%', isPositive: true },
      { title: 'Memory Usage', value: '54.2%', change: '+1.4%', isPositive: true },
      { title: 'Network Bandwidth', value: '18.4 Gbps', change: 'Peak capacity: 40G', isPositive: true }
    ],
    chartData: [
      { label: '00:00', value: 8 },
      { label: '06:00', value: 12 },
      { label: '12:00', value: 28 },
      { label: '18:00', value: 22 },
      { label: '23:00', value: 14 }
    ],
    activities: [
      { id: 'act-1', title: 'Automated failover test passed on Tokyo Region Node', time: '12m ago', user: 'Cluster Bot' },
      { id: 'act-2', title: 'NVMe storage expansion completed on Frankurt Cluster', time: '2h ago', user: 'SysAdmin' }
    ],
    tableItems: [
      { id: 'NODE-01', name: 'US-East-Primary (Virginia)', category: 'Core Cluster', value: '32 Cores / 128GB', status: 'completed', date: '99.999% Uptime' },
      { id: 'NODE-02', name: 'EU-Central (Frankfurt)', category: 'Core Cluster', value: '32 Cores / 128GB', status: 'completed', date: '99.999% Uptime' },
      { id: 'NODE-03', name: 'AP-Northeast (Tokyo)', category: 'Edge Node', value: '16 Cores / 64GB', status: 'completed', date: '99.995% Uptime' }
    ]
  },
  'crm-dashboard': {
    id: 'crm-dashboard',
    slug: 'crm-dashboard',
    name: 'CRM Dashboard',
    subtitle: 'Lead Generation, Deal Stages & Relationship Flow',
    styleId: 17,
    styleName: 'CRM Dashboard',
    badge: 'CRM Dashboard',
    description: 'Manajemen prospek dan siklus pelanggan: pipeline peluang deal bertingkat, follow-up tim sales, dan histori interaksi klien.',
    price: 49,
    accentColor: '#d946ef',
    accentGlow: 'rgba(217, 70, 239, 0.25)',
    themeMode: 'dark',
    sections: ['leads', 'customers', 'conversion', 'sales-pipeline', 'customer-activity', 'follow-ups', 'recent-deals'],
    chartTitle: 'Sales Pipeline Stages & Deal Conversion',
    chartSubtitle: 'Total active deal pipeline value: $1.84M',
    kpis: [
      { title: 'New Leads (This Week)', value: '184', change: '+32.4%', isPositive: true },
      { title: 'Qualified Opportunities', value: '46 Deals', change: '+12%', isPositive: true },
      { title: 'Pipeline Value', value: '$1,840,000', change: '+18.5%', isPositive: true },
      { title: 'Lead-to-Deal Rate', value: '25.0%', change: '+3.1%', isPositive: true }
    ],
    chartData: [
      { label: 'Lead', value: 184 },
      { label: 'Contacted', value: 132 },
      { label: 'Demo', value: 84 },
      { label: 'Proposal', value: 46 },
      { label: 'Closed', value: 24 }
    ],
    activities: [
      { id: 'act-1', title: 'Demo completed with VP Technology at Vertex Corp', time: '25m ago', user: 'Account Exec' },
      { id: 'act-2', title: 'Legal contract review stage entered for FinServe Ltd', time: '1h ago', user: 'Sales Ops' }
    ],
    tableItems: [
      { id: 'DEAL-91', name: 'Vertex Global Migration', category: 'Enterprise Deal', value: '$120,000', status: 'active', date: 'Proposal stage' },
      { id: 'DEAL-92', name: 'FinServe Multi-Cloud Security', category: 'Financial', value: '$85,000', status: 'active', date: 'Legal review' },
      { id: 'DEAL-93', name: 'Omega Robotics Edge Suite', category: 'Robotics', value: '$64,000', status: 'completed', date: 'Closed Won' }
    ]
  },
  'operations-dashboard': {
    id: 'operations-dashboard',
    slug: 'operations-dashboard',
    name: 'Operations Dashboard',
    subtitle: 'Daily Task Dispatch, Staff Status & Incident Response',
    styleId: 18,
    styleName: 'Operations Dashboard',
    badge: 'Operations Dashboard',
    description: 'Pusat koordinasi operasional harian: daftar tugas prioritas, status kesiapan staf, efisiensi siklus, dan log insiden.',
    price: 49,
    accentColor: '#ea580c',
    accentGlow: 'rgba(234, 88, 12, 0.25)',
    themeMode: 'dark',
    sections: ['todays-overview', 'tasks', 'orders', 'staff-status', 'operational-performance', 'alerts', 'activity'],
    chartTitle: 'Operational Throughput & Task Completion',
    chartSubtitle: 'Daily completion rate pacing at 98.2%',
    kpis: [
      { title: 'Tasks Completed Today', value: '142 / 148', change: '96% on-time', isPositive: true },
      { title: 'Staff on Active Duty', value: '48 Staff', change: 'Full shift ready', isPositive: true },
      { title: 'Average Cycle Time', value: '14 mins', change: '-3 mins', isPositive: true },
      { title: 'Critical Open Incidents', value: '0', change: 'Zero downtime', isPositive: true }
    ],
    chartData: [
      { label: 'Shift A', value: 48 },
      { label: 'Shift B', value: 56 },
      { label: 'Shift C', value: 38 }
    ],
    activities: [
      { id: 'act-1', title: 'Shift changeover completed seamlessly with zero backlog', time: '15m ago', user: 'Duty Manager' },
      { id: 'act-2', title: 'Automated warehouse dispatch routed 320 batches', time: '1h ago', user: 'Logistics AI' }
    ],
    tableItems: [
      { id: 'TSK-801', name: 'Edge Gateway Maintenance Check', category: 'Infrastructure', value: 'Verified', status: 'completed', date: 'Today, 08:30' },
      { id: 'TSK-802', name: 'Customer Service Queue Balancing', category: 'Support', value: 'Active', status: 'completed', date: 'Today, 10:00' },
      { id: 'TSK-803', name: 'Nightly Automated Backup Verification', category: 'Database', value: 'Success', status: 'completed', date: 'Today, 04:00' }
    ]
  },
  'ai-dashboard': {
    id: 'ai-dashboard',
    slug: 'ai-dashboard',
    name: 'AI Dashboard',
    subtitle: 'Neural Token Usage, Latency & Model Accuracy',
    styleId: 19,
    styleName: 'AI Dashboard',
    badge: 'AI Dashboard',
    description: 'Telemetri kecerdasan buatan: volume inferensi model LLM, konsumsi token API, estimasi biaya GPU, dan skor akurasi.',
    price: 49,
    featuredTag: 'Next-Gen AI',
    accentColor: '#a855f7',
    accentGlow: 'rgba(168, 85, 247, 0.25)',
    themeMode: 'dark',
    sections: ['ai-usage', 'requests', 'token-cost', 'model-performance', 'accuracy', 'usage-trend', 'logs'],
    chartTitle: 'Neural Token Ingestion & Cost Pacing',
    chartSubtitle: 'Over 48.2M tokens processed with 99.8% precision',
    kpis: [
      { title: 'Total Tokens Processed', value: '48.2M', change: '+42.5%', isPositive: true },
      { title: 'Average TTFT (Time to First Token)', value: '142 ms', change: '-28ms', isPositive: true },
      { title: 'Model Accuracy Benchmark', value: '99.4%', change: '+0.3%', isPositive: true },
      { title: 'Inference Cost / 1k Tokens', value: '$0.0012', change: '-18%', isPositive: true }
    ],
    chartData: [
      { label: 'Claude 3.7', value: 18 },
      { label: 'GPT-4o', value: 14 },
      { label: 'Gemini 2.5 Flash', value: 24 },
      { label: 'DeepSeek R1', value: 16 }
    ],
    activities: [
      { id: 'act-1', title: 'Vector embeddings updated for 140,000 knowledge chunks', time: '10m ago', user: 'Embedding Pipeline' },
      { id: 'act-2', title: 'Semantic cache hit rate reached 44% (-44% API cost)', time: '40m ago', user: 'Cache Router' }
    ],
    tableItems: [
      { id: 'MOD-01', name: 'Gemini 2.5 Pro Multimodal', category: 'LLM Reasoning', value: '18.4M tokens', status: 'completed', date: '99.6% Accuracy' },
      { id: 'MOD-02', name: 'DeepSeek R1 Reasoning Engine', category: 'Code Synthesis', value: '14.2M tokens', status: 'completed', date: '99.2% Accuracy' },
      { id: 'MOD-03', name: 'Whisper Large v3 Voice Transcribe', category: 'Audio NLP', value: '8.1M tokens', status: 'completed', date: '98.9% Accuracy' }
    ]
  },
  'all-in-one-premium': {
    id: 'all-in-one-premium',
    slug: 'all-in-one-premium',
    name: 'All-in-One Premium',
    subtitle: 'The Definitive Flagship Dashboard Suite',
    styleId: 20,
    styleName: 'All-in-One Premium',
    badge: '🚀 All-in-One Premium',
    description: 'Solusi lengkap komprehensif: memadukan indikator kinerja modular, visualisasi tren canggih, perankingan real-time, dan otomasi cerdas.',
    price: 49,
    featuredTag: 'Ultimate Bundle',
    accentColor: '#f43f5e',
    accentGlow: 'rgba(244, 63, 94, 0.25)',
    themeMode: 'dark',
    sections: ['welcome', 'kpi-overview', 'main-performance', 'revenue', 'activity', 'performance-ranking', 'insights', 'quick-actions'],
    chartTitle: 'Holistic Enterprise Performance Radar',
    chartSubtitle: 'Synchronized cross-department telemetry & strategic velocity',
    kpis: [
      { title: 'Aggregate ARR', value: '$3.84M', change: '+34.8%', isPositive: true },
      { title: 'Global Active Users', value: '842,000', change: '+28.4%', isPositive: true },
      { title: 'Gross Margin', value: '84.2%', change: '+4.1%', isPositive: true },
      { title: 'System Health Index', value: '100/100', change: 'Optimal', isPositive: true }
    ],
    chartData: [
      { label: 'Q1', value: 75, secondaryValue: 50 },
      { label: 'Q2', value: 95, secondaryValue: 65 },
      { label: 'Q3', value: 120, secondaryValue: 80 },
      { label: 'Q4', value: 155, secondaryValue: 105 }
    ],
    activities: [
      { id: 'act-1', title: 'All 20 Dashboard styles validated with production telemetry', time: 'Just now', user: 'System Architect' },
      { id: 'act-2', title: 'Global multi-region synchronization healthy', time: '15m ago', user: 'Edge Cluster' }
    ],
    tableItems: [
      { id: 'ENT-01', name: 'Global Enterprise Master Tier', category: 'Flagship', value: '$384,000', status: 'completed', date: 'Worldwide' },
      { id: 'ENT-02', name: 'Automated AI Orchestration Grid', category: 'Neural', value: '$198,000', status: 'completed', date: 'Global Edge' },
      { id: 'ENT-03', name: 'Real-Time Mission Telemetry Suite', category: 'Telemetry', value: '$142,000', status: 'completed', date: '24/7 SLA' }
    ],
    quickActions: [
      { label: 'Deploy Workspace', icon: 'Rocket', action: 'deploy' },
      { label: 'Generate AI Report', icon: 'Sparkles', action: 'report' },
      { label: 'System Diagnostics', icon: 'Activity', action: 'diag' }
    ]
  }
};

export function getDashboardTemplate(slug: string): DashboardTemplate | undefined {
  return DASHBOARD_TEMPLATES[slug];
}

export function getDashboardSections(slug: string): DashboardSectionKey[] {
  const t = DASHBOARD_TEMPLATES[slug];
  if (t) return t.sections;
  const matched = DASHBOARD_STYLES.find(s => s.slug === slug);
  return matched ? matched.sections : DASHBOARD_STYLES[0].sections;
}
