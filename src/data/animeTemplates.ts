export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  subtag: string;
  desc: string;
  tags: string[];
  metrics?: string;
  color?: string;
  previewUrl?: string;
}

export interface ExperienceItem {
  year: string;
  role: string;
  organization: string;
  description: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  title: string;
  avatar: string;
}

export interface ThemeColors {
  isDark: boolean;
  bgPrimary: string;
  bgSecondary: string;
  bgSurface: string;
  bgGlass: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentSecondary: string;
  accentGlow: string;
  borderSubtle: string;
  borderStrong: string;
  cardShadow: string;
  badgeBg: string;
  badgeText: string;
  gradientHero: string;
}

export type LayoutArchetype = 
  | 'flanked-centered'
  | 'asymmetric-split'
  | 'warrior-vanguard'
  | 'cyberpunk-hud'
  | 'dynamic-hero'
  | 'zen-minimal';

export type AccentAnimationType =
  | 'frieren-aura'
  | 'stark-sparks'
  | 'fern-zoltraak'
  | 'eren-steam-embers'
  | 'levi-blade-slashes'
  | 'mikasa-scarf-wind'
  | 'naruto-rasengan-chakra'
  | 'sasuke-chidori-lightning'
  | 'sakura-cherry-byakugou'
  | 'hinata-gentle-fist'
  | 'luffy-nika-clouds'
  | 'ace-fire-embers'
  | 'sabo-dragon-flames'
  | 'nami-clima-tact'
  | 'zero-two-cyber-hex'
  | 'tanjiro-dual-breathing'
  | 'zenitsu-thunderclap'
  | 'inosuke-beast-slashes'
  | 'giyuu-dead-calm'
  | 'shinobu-wisteria-butterflies';

export interface AnimeTemplate {
  id: string;
  slug: string;
  name: string;
  japaneseName: string;
  series: string;
  universeBadge: string;
  roleTitle: string;
  headline: string;
  tagline: string;
  statement: string;
  bio: string;
  price: number;
  featuredTag?: string;
  avatarUrl: string;
  bustUrl: string;
  cardUrl: string;
  layoutArchetype: LayoutArchetype;
  accentAnimationType: AccentAnimationType;
  colors: ThemeColors;
  stats: { label: string; value: string }[];
  skills: { name: string; level: number; category: string }[];
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  testimonials: TestimonialItem[];
  themeTokensCSS: Record<string, string>;
}

export const ANIME_TEMPLATES: Record<string, AnimeTemplate> = {
  frieren: {
    id: 'frieren',
    slug: 'frieren',
    name: 'Frieren',
    japaneseName: 'フリーレン',
    series: 'Sousou no Frieren',
    universeBadge: 'Beyond Journey\'s End',
    roleTitle: 'Archmage & Ancient Systems Architect',
    headline: 'Mage of the Century',
    tagline: 'Deciphering thousand-year grimoires into elegant digital architecture.',
    statement: 'Magic is about imagination. If you cannot visualize perfection, no code or spell can reach it.',
    bio: 'An elven mage who defeated the Demon King alongside Himmel\'s party. Now traversing the realm to collect quaint spells and construct immortal, resilient software foundations that outlast generations.',
    price: 39,
    featuredTag: 'Bestseller',
    avatarUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=400&fit=crop&crop=faces',
    bustUrl: '/himmel_bust.png',
    cardUrl: '/himmel_card.jpg',
    layoutArchetype: 'flanked-centered',
    accentAnimationType: 'frieren-aura',
    colors: {
      isDark: false,
      bgPrimary: '#f8fafc',
      bgSecondary: '#f1f5f9',
      bgSurface: 'rgba(255, 255, 255, 0.94)',
      bgGlass: 'rgba(248, 250, 252, 0.82)',
      textPrimary: '#0f172a',
      textSecondary: '#334155',
      textMuted: '#64748b',
      accent: '#0284c7',
      accentSecondary: '#eab308',
      accentGlow: 'rgba(2, 132, 199, 0.28)',
      borderSubtle: '#e2e8f0',
      borderStrong: 'rgba(2, 132, 199, 0.35)',
      cardShadow: '0 20px 45px -10px rgba(2, 132, 199, 0.12)',
      badgeBg: '#e0f2fe',
      badgeText: '#0369a1',
      gradientHero: 'radial-gradient(ellipse at 50% 40%, rgba(56, 189, 248, 0.22) 0%, rgba(224, 242, 254, 0.15) 45%, transparent 70%)',
    },
    stats: [
      { label: 'Years of Lore', value: '1,000+' },
      { label: 'Grimoires Decoded', value: '480+' },
      { label: 'Code Resilience', value: '99.99%' },
    ],
    skills: [
      { name: 'Mana Core Optimization', level: 98, category: 'Core' },
      { name: 'Ancient Cryptography', level: 96, category: 'Security' },
      { name: 'Distributed Grimoires', level: 94, category: 'Architecture' },
      { name: 'Field Field Theory', level: 92, category: 'Systems' },
    ],
    projects: [
      {
        id: 'grimoire-compiler',
        title: 'Grimoire Abstract Machine',
        category: 'Language Engine',
        subtag: 'Core Compiler',
        desc: 'A deterministic compiler mapping ancient high-density runic spells into bytecode with zero runtime overhead.',
        tags: ['Rust', 'LLVM', 'Runic Spec', 'WebAssembly'],
        metrics: '12x Faster Spells',
        color: '#0284c7'
      },
      {
        id: 'mimic-detector',
        title: 'Chest Mimic Classifier',
        category: 'Vision & ML',
        subtag: 'Detection System',
        desc: 'Computer vision framework analyzing dungeon chests with 99.1% mimic detection accuracy (yet she still opens them anyway).',
        tags: ['PyTorch', 'Edge Vision', 'OpenCV'],
        metrics: '99.1% Confidence',
        color: '#eab308'
      },
      {
        id: 'blue-moon-sanctuary',
        title: 'Blue Moon Petal Arboretum',
        category: 'Generative Art',
        subtag: 'Interactive WebGL',
        desc: 'A hyper-realistic 3D botanical simulation reproducing Himmel’s beloved blue moon flowers in perpetual gentle wind.',
        tags: ['Three.js', 'GLSL', 'InstancedMesh'],
        metrics: '60 FPS Ultra',
        color: '#38bdf8'
      },
      {
        id: 'centurial-archive',
        title: 'Centurial Knowledge Mesh',
        category: 'Database System',
        subtag: 'Long-term Storage',
        desc: 'Self-healing decentralized storage network designed to persist civilization data across millennium scale.',
        tags: ['IPFS', 'Distributed DAG', 'P2P'],
        metrics: '1000yr Redundancy',
        color: '#64748b'
      }
    ],
    experiences: [
      {
        year: 'Year 80 After Himmel',
        role: 'Grand Archmage in Residence',
        organization: 'Ende Continental Expedition',
        description: 'Mentoring prodigy Fern and warrior Stark while collecting quaint everyday magical algorithms across northern lands.'
      },
      {
        year: 'Hero Era',
        role: 'Vanguard Sorceress',
        organization: 'The Hero Party of Himmel',
        description: 'Defeated the Demon King following a 10-year campaign, liberating the continental software realm.'
      }
    ],
    testimonials: [
      {
        quote: 'Frieren-sama spends hours inspecting useless spellbooks, but when it matters, her architectural decisions are flawlessly eternal.',
        author: 'Fern',
        title: 'First-Class Mage',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces'
      },
      {
        quote: 'She taught me that fear is natural in battle. It is the trembling hand that holds the axe firm when confronting terror.',
        author: 'Stark',
        title: 'Vanguard Warrior',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces'
      }
    ],
    themeTokensCSS: {
      '--accent': '#0284c7',
      '--accent-glow': 'rgba(2, 132, 199, 0.28)',
      '--bg-primary': '#f8fafc',
      '--text-primary': '#0f172a'
    }
  },

  stark: {
    id: 'stark',
    slug: 'stark',
    name: 'Stark',
    japaneseName: 'シュタルク',
    series: 'Sousou no Frieren',
    universeBadge: 'Beyond Journey\'s End',
    roleTitle: 'Heavy Vanguard & High-Stress Systems Engineer',
    headline: 'The Dragon Slayer',
    tagline: 'When servers buckle under peak load, one clean cleave settles the storm.',
    statement: 'I run forward even while trembling with fear. That is what makes the strike break mountain stone.',
    bio: 'Trained by warrior Eisen. The vanguard of Frieren’s expedition who cleaved a solar dragon in half with a single battleaxe strike. Specializes in fault-tolerant infrastructure and high-throughput systems.',
    price: 35,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
    bustUrl: '/himmel_bust.png',
    cardUrl: '/himmel_card.jpg',
    layoutArchetype: 'warrior-vanguard',
    accentAnimationType: 'stark-sparks',
    colors: {
      isDark: true,
      bgPrimary: '#0f172a',
      bgSecondary: '#1e293b',
      bgSurface: 'rgba(30, 41, 59, 0.88)',
      bgGlass: 'rgba(15, 23, 42, 0.75)',
      textPrimary: '#f8fafc',
      textSecondary: '#cbd5e1',
      textMuted: '#94a3b8',
      accent: '#ef4444',
      accentSecondary: '#f97316',
      accentGlow: 'rgba(239, 68, 68, 0.35)',
      borderSubtle: '#334155',
      borderStrong: 'rgba(239, 68, 68, 0.5)',
      cardShadow: '0 20px 45px -10px rgba(239, 68, 68, 0.2)',
      badgeBg: 'rgba(239, 68, 68, 0.18)',
      badgeText: '#fca5a5',
      gradientHero: 'radial-gradient(ellipse at 50% 30%, rgba(239, 68, 68, 0.25) 0%, rgba(249, 115, 22, 0.1) 50%, transparent 75%)',
    },
    stats: [
      { label: 'Dragon Strikes', value: '1 Cut' },
      { label: 'Uptime Cleave', value: '99.999%' },
      { label: 'Peak TPS Absorbed', value: '250k+' },
    ],
    skills: [
      { name: 'High-Stress Load Balancing', level: 97, category: 'Infra' },
      { name: 'Lightning Cleave Failover', level: 95, category: 'Resilience' },
      { name: 'Kubernetes Vanguard', level: 91, category: 'DevOps' },
      { name: 'Dwarven Heavy Steel Tuning', level: 93, category: 'Hardware' },
    ],
    projects: [
      {
        id: 'solar-cleave',
        title: 'Solar Cleave Load Breaker',
        category: 'Traffic Shaper',
        subtag: 'DDoS Mitigation',
        desc: 'Instant high-velocity firewall packet slicer preventing bot inundations within 3ms of origin arrival.',
        tags: ['eBPF', 'Rust', 'Linux Kernel', 'XDP'],
        metrics: '1.2 Tbps Sustained',
        color: '#ef4444'
      },
      {
        id: 'dwarven-forge',
        title: 'Eisen Dwarven Hardware Monitor',
        category: 'IoT Telemetry',
        subtag: 'Hardware Diagnostics',
        desc: 'Low-level thermal and magnetic flux telemetry daemon monitoring industrial bare-metal server chassis.',
        tags: ['C++', 'Prometheus', 'Grafana'],
        metrics: '< 1ms Latency',
        color: '#f97316'
      },
      {
        id: 'village-shield',
        title: 'Frontier Bastion VPN',
        category: 'Network Security',
        subtag: 'Encrypted Gateway',
        desc: 'Zero-trust wireguard mesh networking protocol defending border settlements against demonic intrusion.',
        tags: ['WireGuard', 'Go', 'Zero Trust'],
        metrics: '0 Breaches',
        color: '#dc2626'
      },
      {
        id: 'jumbo-parfait',
        title: 'Jumbo Parfait Reward Tracker',
        category: 'Gamified Habit App',
        subtag: 'Fullstack Mobile',
        desc: 'Wholesome accountability system designed by Fern to reward successful battle completions with colossal berry desserts.',
        tags: ['React Native', 'Tailwind', 'Node.js'],
        metrics: '5-Star Rated',
        color: '#fb7185'
      }
    ],
    experiences: [
      {
        year: 'Year 80 After Himmel',
        role: 'Chief Vanguard',
        organization: 'Frieren Travel Party',
        description: 'Guiding through monster-infested canyons and maintaining high morale despite terrifying dragon threats.'
      },
      {
        year: 'Prior Apprentice',
        role: 'Shield & Axe Disciple',
        organization: 'Eisen Household Fortress',
        description: 'Endured dwarven conditioning, developing lightning-fast reflex reactions and unbreakable defensive posture.'
      }
    ],
    testimonials: [
      {
        quote: 'Stark is a coward who whimpers before every fight, yet he never once let an ally get touched. A true warrior.',
        author: 'Frieren',
        title: 'Archmage',
        avatar: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=100&h=100&fit=crop&crop=faces'
      },
      {
        quote: 'Please stop making that terrified face while cleaving monsters in half. It confuses the villagers.',
        author: 'Fern',
        title: 'First-Class Mage',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces'
      }
    ],
    themeTokensCSS: {
      '--accent': '#ef4444',
      '--accent-glow': 'rgba(239, 68, 68, 0.35)',
      '--bg-primary': '#0f172a',
      '--text-primary': '#f8fafc'
    }
  },

  fern: {
    id: 'fern',
    slug: 'fern',
    name: 'Fern',
    japaneseName: 'フェルン',
    series: 'Sousou no Frieren',
    universeBadge: 'Beyond Journey\'s End',
    roleTitle: 'First-Class Mage & Rapid Execution Specialist',
    headline: 'The Zoltraak Prodigy',
    tagline: 'Flawless casting velocity, zero wasted motion, absolute code precision.',
    statement: 'The simplest spell, mastered with blinding cast speed and flawless timing, will always defeat bloated complexities.',
    bio: 'Orphan raised by priest Heiter and trained from childhood by Frieren. The youngest first-class mage in continental history. Champions microscopic latencies, ultra-clean codebases, and relentless discipline.',
    price: 39,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces',
    bustUrl: '/himmel_bust.png',
    cardUrl: '/himmel_card.jpg',
    layoutArchetype: 'asymmetric-split',
    accentAnimationType: 'fern-zoltraak',
    colors: {
      isDark: true,
      bgPrimary: '#170f23',
      bgSecondary: '#24143a',
      bgSurface: 'rgba(36, 20, 58, 0.88)',
      bgGlass: 'rgba(23, 15, 35, 0.78)',
      textPrimary: '#faf5ff',
      textSecondary: '#e9d5ff',
      textMuted: '#c084fc',
      accent: '#a855f7',
      accentSecondary: '#c084fc',
      accentGlow: 'rgba(168, 85, 247, 0.38)',
      borderSubtle: '#3b2063',
      borderStrong: 'rgba(168, 85, 247, 0.55)',
      cardShadow: '0 20px 45px -10px rgba(168, 85, 247, 0.22)',
      badgeBg: 'rgba(168, 85, 247, 0.18)',
      badgeText: '#f3e8ff',
      gradientHero: 'radial-gradient(ellipse at 50% 35%, rgba(168, 85, 247, 0.3) 0%, rgba(88, 28, 135, 0.15) 50%, transparent 75%)',
    },
    stats: [
      { label: 'Casting Latency', value: '0.12 ms' },
      { label: 'Zoltraak Accuracy', value: '100%' },
      { label: 'Mage License', value: 'Class 1' },
    ],
    skills: [
      { name: 'Rapid Spell Pipelining', level: 99, category: 'Core' },
      { name: 'Mana Concealment Steganography', level: 97, category: 'Security' },
      { name: 'Precision Type Systems', level: 95, category: 'Languages' },
      { name: 'Laundry Spell Automation', level: 100, category: 'Utilities' },
    ],
    projects: [
      {
        id: 'zoltraak-fastcast',
        title: 'Zoltraak Zero-Copy RPC',
        category: 'Networking',
        subtag: 'Low-Latency Protocol',
        desc: 'Standardized offensive soul-strike communication protocol executing bidirectional bursts under sub-millisecond conditions.',
        tags: ['Rust', 'gRPC', 'eBPF', 'Tokio'],
        metrics: '0.08ms Roundtrip',
        color: '#a855f7'
      },
      {
        id: 'mana-mask',
        title: 'Mana Mask Veil',
        category: 'Zero Knowledge',
        subtag: 'Privacy Protocol',
        desc: 'Advanced ZK cryptographic masking system hiding memory footprints from hostile inspection daemons.',
        tags: ['Circom', 'ZK-SNARKs', 'Solidity'],
        metrics: 'Zero Traces',
        color: '#c084fc'
      },
      {
        id: 'staff-telemetry',
        title: 'Mage Staff Resonant Frequency Meter',
        category: 'DSP Audio & Wave',
        subtag: 'Signal Processing',
        desc: 'Harmonic wave analyzer tracking atmospheric mana density variations during severe mountain blizzards.',
        tags: ['TypeScript', 'Web Audio API', 'FFT'],
        metrics: '48kHz Realtime',
        color: '#d8b4fe'
      },
      {
        id: 'frieren-wake-schedule',
        title: 'Archmage Morning Wake Protocol',
        category: 'Scheduler',
        subtag: 'Critical Service',
        desc: 'High-priority persistent alarming service designed to extract master Frieren from hotel bed before midday.',
        tags: ['Web Push', 'Service Workers', 'CRON'],
        metrics: '99% Wakeup Rate',
        color: '#f43f5e'
      }
    ],
    experiences: [
      {
        year: 'Current',
        role: 'First-Class Mage Lead',
        organization: 'Continental Mage Association',
        description: 'Certified directly by Serie after out-maneuvering seasoned master mages with pure baseline fundamentals.'
      },
      {
        year: 'Youth',
        role: 'Apprentice Mage',
        organization: 'Heiter Hermitage',
        description: 'Practiced stone-splitting basic spells thousands of times daily until execution became involuntary reflex.'
      }
    ],
    testimonials: [
      {
        quote: 'Fern has already surpassed me in spell execution speed. Her Zoltraak is faster than any living mage in this era.',
        author: 'Frieren',
        title: 'Archmage',
        avatar: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=100&h=100&fit=crop&crop=faces'
      },
      {
        quote: 'She scary when she gets quiet and pouts, but her magical covering fire has saved my neck dozens of times.',
        author: 'Stark',
        title: 'Vanguard',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces'
      }
    ],
    themeTokensCSS: {
      '--accent': '#a855f7',
      '--accent-glow': 'rgba(168, 85, 247, 0.38)',
      '--bg-primary': '#170f23',
      '--text-primary': '#faf5ff'
    }
  },

  eren: {
    id: 'eren',
    slug: 'eren',
    name: 'Eren Yeager',
    japaneseName: 'エレン・イェーガー',
    series: 'Attack on Titan',
    universeBadge: 'Shingeki no Kyojin',
    roleTitle: 'Attack Titan & Freedom Systems Architect',
    headline: 'Architect of The Rumbling',
    tagline: 'I will keep moving forward until all legacy technical debt is destroyed.',
    statement: 'If we win, we live. If we lose, we die. If we do not fight, we cannot win. Fight. Fight.',
    bio: 'Bearer of the Founding Titan, Attack Titan, and War Hammer Titan. Driven by an unyielding pursuit of complete freedom, tearing down monolithic walled gardens to establish decentralized self-sovereignty.',
    price: 39,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces',
    bustUrl: '/himmel_bust.png',
    cardUrl: '/himmel_card.jpg',
    layoutArchetype: 'warrior-vanguard',
    accentAnimationType: 'eren-steam-embers',
    colors: {
      isDark: true,
      bgPrimary: '#0a0f0d',
      bgSecondary: '#111d17',
      bgSurface: 'rgba(17, 29, 23, 0.88)',
      bgGlass: 'rgba(10, 15, 13, 0.82)',
      textPrimary: '#f0fdf4',
      textSecondary: '#bbf7d0',
      textMuted: '#86efac',
      accent: '#10b981',
      accentSecondary: '#f59e0b',
      accentGlow: 'rgba(16, 185, 129, 0.4)',
      borderSubtle: '#1b3b2b',
      borderStrong: 'rgba(16, 185, 129, 0.6)',
      cardShadow: '0 20px 45px -10px rgba(16, 185, 129, 0.25)',
      badgeBg: 'rgba(16, 185, 129, 0.2)',
      badgeText: '#86efac',
      gradientHero: 'radial-gradient(ellipse at 50% 30%, rgba(16, 185, 129, 0.28) 0%, rgba(245, 158, 11, 0.12) 50%, transparent 75%)',
    },
    stats: [
      { label: 'Walls Broken', value: '3 / 3' },
      { label: 'Colossal Nodes', value: '100k+' },
      { label: 'Freedom Ratio', value: '100%' },
    ],
    skills: [
      { name: 'Distributed Rumbling Orchestration', level: 99, category: 'Scale' },
      { name: 'War Hammer Hardening Shaders', level: 96, category: 'Graphics' },
      { name: 'Coordinate Protocol Synapses', level: 98, category: 'Network' },
      { name: 'Monolith Demolition', level: 100, category: 'Architecture' },
    ],
    projects: [
      {
        id: 'rumbling-protocol',
        title: 'Rumbling Distributed Mesh Orchestrator',
        category: 'Autonomous Systems',
        subtag: 'Cluster Manager',
        desc: 'Planetary-scale distributed system controlling thousands of autonomous nodes simultaneously moving in forward march.',
        tags: ['Rust', 'Raft Consensus', 'Zero Trust', 'P2P'],
        metrics: '100,000+ Synchronized Nodes',
        color: '#10b981'
      },
      {
        id: 'coordinate-memory',
        title: 'Paths Temporal Database',
        category: 'Temporal DB',
        subtag: 'Time-Travel Indexing',
        desc: 'Non-linear quantum memory engine allowing past, present, and future states to be cross-queried instantaneously.',
        tags: ['C++', 'Temporal B-Tree', 'Zero Latency'],
        metrics: '2,000yr History Search',
        color: '#f59e0b'
      },
      {
        id: 'hardening-shield',
        title: 'War Hammer Structural Hardening',
        category: 'Defensive Crypto',
        subtag: 'Crystal Encryption',
        desc: 'Unbreakable quantum-resistant crystal structure hardening memory buffers against runtime memory injection exploits.',
        tags: ['Assembly', 'Memory Hardening', 'Crypto'],
        metrics: 'Zero Penetrations',
        color: '#34d399'
      },
      {
        id: 'liberty-manifesto',
        title: 'The Sea Beyond The Walls',
        category: 'Decentralized Web',
        subtag: 'Open Protocols',
        desc: 'Uncensored peer-to-peer publishing node freeing islands from continental information blockades.',
        tags: ['IPFS', 'Next.js', 'Libp2p'],
        metrics: 'Uncensorable',
        color: '#6ee7b7'
      }
    ],
    experiences: [
      {
        year: 'Year 854',
        role: 'Commander of The Rumbling',
        organization: 'The Yeagerists & Paths Realm',
        description: 'Initiated the complete teardown of walled architectures to protect sovereignty across all digital dominions.'
      },
      {
        year: 'Year 850',
        role: 'Special Operations Squad Member',
        organization: 'Survey Corps (Scout Regiment)',
        description: 'Reclaimed Wall Rose and Shiganshina district, mastering titan hardening capabilities under extreme combat fire.'
      }
    ],
    testimonials: [
      {
        quote: 'No matter what happens, I will protect you. Eren never backs down when freedom is on the line.',
        author: 'Mikasa Ackerman',
        title: 'Survey Corps Vanguard',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'
      },
      {
        quote: 'Eren is a monster that cannot be caged by rules or traditions. That is precisely why he changes history.',
        author: 'Levi Ackerman',
        title: 'Captain, Survey Corps',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces'
      }
    ],
    themeTokensCSS: {
      '--accent': '#10b981',
      '--accent-glow': 'rgba(16, 185, 129, 0.4)',
      '--bg-primary': '#0a0f0d',
      '--text-primary': '#f0fdf4'
    }
  },

  levi: {
    id: 'levi',
    slug: 'levi',
    name: 'Levi Ackerman',
    japaneseName: 'リヴァイ・アッカーマン',
    series: 'Attack on Titan',
    universeBadge: 'Shingeki no Kyojin',
    roleTitle: 'Humanity\'s Strongest & Zero-Defect Architect',
    headline: 'Captain of Special Operations',
    tagline: 'Make the choice that leaves the fewest regrets. Then execute with surgical precision.',
    statement: 'The only thing we are allowed to do is believe that we won\'t regret the choice we made. Clean your codebase. Leave no dirt behind.',
    bio: 'Survey Corps Captain and humanity’s greatest soldier. Renowned for hyper-clean work habits, ruthless precision, and ability to eliminate colossal bottlenecks within seconds using high-frequency ODM mechanics.',
    price: 45,
    featuredTag: 'Top Pick',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
    bustUrl: '/himmel_bust.png',
    cardUrl: '/himmel_card.jpg',
    layoutArchetype: 'cyberpunk-hud',
    accentAnimationType: 'levi-blade-slashes',
    colors: {
      isDark: true,
      bgPrimary: '#060d09',
      bgSecondary: '#0e1c14',
      bgSurface: 'rgba(14, 28, 20, 0.9)',
      bgGlass: 'rgba(6, 13, 9, 0.82)',
      textPrimary: '#f1f5f9',
      textSecondary: '#cbd5e1',
      textMuted: '#94a3b8',
      accent: '#22c55e',
      accentSecondary: '#64748b',
      accentGlow: 'rgba(34, 197, 94, 0.35)',
      borderSubtle: '#1e3828',
      borderStrong: 'rgba(34, 197, 94, 0.55)',
      cardShadow: '0 20px 45px -10px rgba(34, 197, 94, 0.2)',
      badgeBg: 'rgba(34, 197, 94, 0.16)',
      badgeText: '#86efac',
      gradientHero: 'radial-gradient(ellipse at 50% 30%, rgba(34, 197, 94, 0.22) 0%, rgba(100, 116, 139, 0.12) 50%, transparent 75%)',
    },
    stats: [
      { label: 'Titan Cleanses', value: '1,000+' },
      { label: 'Code Defect Rate', value: '0.000%' },
      { label: 'Blade Spin RPM', value: '1,800' },
    ],
    skills: [
      { name: 'Ultra-Clean Code Refactoring', level: 100, category: 'Quality' },
      { name: 'Omni-Directional Mobility Tracers', level: 99, category: 'Physics' },
      { name: 'Zero-Tolerance Bug Sanitization', level: 100, category: 'Testing' },
      { name: 'High-Velocity Blade Slicing', level: 98, category: 'Performance' },
    ],
    projects: [
      {
        id: 'clean-sanitizer',
        title: 'Ackerman Deep Linter & Sanitizer',
        category: 'Compiler Tooling',
        subtag: 'Zero Tolerence Linter',
        desc: 'Strict AST static analyzer purging lint dust, circular imports, and dead code with ruthless surgical aggression.',
        tags: ['Rust', 'AST Rewriter', 'Babel', 'ESLint Core'],
        metrics: 'Zero Grime Permitted',
        color: '#22c55e'
      },
      {
        id: 'odm-navigation',
        title: 'Omni-Directional Trajectory Solver',
        category: 'Spatial Physics',
        subtag: 'Vector Engine',
        desc: 'Real-time 3D vector physics calculations computing anchor points and cable tensions in dense urban forests.',
        tags: ['Three.js', 'WebAssembly', 'SIMD'],
        metrics: '120 FPS Sub-pixel',
        color: '#64748b'
      },
      {
        id: 'beast-titan-takedown',
        title: 'Colossal Beast Titan De-scaler',
        category: 'Concurrency Engine',
        subtag: 'Thread Decimator',
        desc: 'High-frequency task scheduler that slices heavy background threads into 250 micro-slices before they block the event loop.',
        tags: ['Go', 'Goroutines', 'Thread Slicing'],
        metrics: 'Sub-millisecond Preempt',
        color: '#15803d'
      },
      {
        id: 'black-tea-timer',
        title: 'Artisan Black Tea Steep Calculator',
        category: 'Micro-App',
        subtag: 'Thermodynamics',
        desc: 'Precision water temperature and leaf infusion stopwatch delivering the quintessential English tea cup.',
        tags: ['React', 'CSS Art', 'PWA'],
        metrics: 'Perfect 94°C',
        color: '#a16207'
      }
    ],
    experiences: [
      {
        year: 'Year 850 - 854',
        role: 'Captain, Special Operations Squad',
        organization: 'Survey Corps',
        description: 'Handpicked elite team, neutralized dozens of titan threats, and spearheaded humanity’s underground-to-freedom breakthrough.'
      },
      {
        year: 'Underground Era',
        role: 'Autonomous Syndicate Leader',
        organization: 'Capital Underground District',
        description: 'Mastered 3D maneuver gear self-taught in zero-visibility conditions, forging legendary combat agility.'
      }
    ],
    testimonials: [
      {
        quote: 'Give up on your dream and die for us. Lead the recruits straight into hell. I trust no one else with this command.',
        author: 'Erwin Smith',
        title: '13th Commander, Survey Corps',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces'
      },
      {
        quote: 'He will kick your teeth in if you show up with messy code, but there is no safer leader on the battlefield.',
        author: 'Hange Zoë',
        title: '14th Commander, Survey Corps',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces'
      }
    ],
    themeTokensCSS: {
      '--accent': '#22c55e',
      '--accent-glow': 'rgba(34, 197, 94, 0.35)',
      '--bg-primary': '#060d09',
      '--text-primary': '#f1f5f9'
    }
  },

  mikasa: {
    id: 'mikasa',
    slug: 'mikasa',
    name: 'Mikasa Ackerman',
    japaneseName: 'ミカサ・アッカーマン',
    series: 'Attack on Titan',
    universeBadge: 'Shingeki no Kyojin',
    roleTitle: 'Elite Guardian & High-Reliability Systems Engineer',
    headline: 'Unbreakable Vanguard',
    tagline: 'The world is cruel, yet so beautiful. I will guard what matters with my life.',
    statement: 'Once I\'m dead, I won\'t even be able to remember you. So I will win, no matter what. I will live, no matter what.',
    bio: 'Ranked top of the 104th Training Corps. An unparalleled protector combining lethal combat instinct with profound devotion. Specializes in fault tolerance, fail-safe redundancy, and perimeter defenses.',
    price: 37,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces',
    bustUrl: '/himmel_bust.png',
    cardUrl: '/himmel_card.jpg',
    layoutArchetype: 'asymmetric-split',
    accentAnimationType: 'mikasa-scarf-wind',
    colors: {
      isDark: true,
      bgPrimary: '#12070a',
      bgSecondary: '#1f0d13',
      bgSurface: 'rgba(31, 13, 19, 0.9)',
      bgGlass: 'rgba(18, 7, 10, 0.8)',
      textPrimary: '#fff1f2',
      textSecondary: '#fecdd3',
      textMuted: '#fda4af',
      accent: '#e11d48',
      accentSecondary: '#fb7185',
      accentGlow: 'rgba(225, 29, 72, 0.38)',
      borderSubtle: '#4c1221',
      borderStrong: 'rgba(225, 29, 72, 0.55)',
      cardShadow: '0 20px 45px -10px rgba(225, 29, 72, 0.22)',
      badgeBg: 'rgba(225, 29, 72, 0.18)',
      badgeText: '#fecdd3',
      gradientHero: 'radial-gradient(ellipse at 50% 30%, rgba(225, 29, 72, 0.28) 0%, rgba(251, 113, 133, 0.12) 50%, transparent 75%)',
    },
    stats: [
      { label: 'Class Rank', value: '#1 Top' },
      { label: 'Combat Rating', value: '100 Soldiers' },
      { label: 'Zero Failover', value: '100%' },
    ],
    skills: [
      { name: 'Perimeter Defense Systems', level: 99, category: 'Security' },
      { name: 'Fail-Safe Circuit Breakers', level: 97, category: 'Reliability' },
      { name: 'High-G Maneuver Control', level: 96, category: 'Physics' },
      { name: 'Red Scarf State Persistence', level: 100, category: 'State' },
    ],
    projects: [
      {
        id: 'red-scarf-vault',
        title: 'Crimson Scarf Immutable Ledger',
        category: 'Cryptography',
        subtag: 'Key Custody Vault',
        desc: 'Uncompromising hardware security module securing core credentials against all known physical and quantum attacks.',
        tags: ['Rust', 'HSM', 'Elliptic Curve', 'FIPS-140-3'],
        metrics: 'Zero Leaks',
        color: '#e11d48'
      },
      {
        id: 'thunder-spear',
        title: 'Thunder Spear Reactive Armor Buster',
        category: 'Penetration Testing',
        subtag: 'Exploit Tool',
        desc: 'Targeted zero-day penetration framework testing fortified defenses with extreme kinetic velocity.',
        tags: ['Python', 'Scapy', 'Raw Sockets'],
        metrics: '100% Penetration Test',
        color: '#fb7185'
      },
      {
        id: 'perimeter-guard',
        title: 'Trost Gate Automated Perimeter',
        category: 'Surveillance AI',
        subtag: 'Threat Detection',
        desc: 'Autonomous multi-camera perimeter watchdog issuing instant lockdown alerts upon breach identification.',
        tags: ['WebRTC', 'TensorFlow', 'Docker'],
        metrics: '< 15ms Trigger',
        color: '#be123c'
      },
      {
        id: 'memory-cabin',
        title: 'Quiet Cabin Retreat Simulator',
        category: 'Ambient Web Experience',
        subtag: 'Audio-Visual Serenity',
        desc: 'A serene mountain cabin interactive scene with falling leaves, crackling timber fire, and warm memories.',
        tags: ['Three.js', 'WebAudio', 'GLSL'],
        metrics: 'Pure Tranquility',
        color: '#f43f5e'
      }
    ],
    experiences: [
      {
        year: 'Year 850 - 854',
        role: 'Lead Vanguard & Shield',
        organization: 'Survey Corps Special Ops',
        description: 'Defended human remnants across multiple battlefronts, proving worth equivalent to 100 average soldiers.'
      },
      {
        year: 'Training Corps',
        role: 'Top Graduate (Rank 1)',
        organization: '104th Cadet Corps',
        description: 'Graduated top of class with exemplary marks in blade lethality, leadership, and crisis management.'
      }
    ],
    testimonials: [
      {
        quote: 'Mikasa is a genius of unmatched caliber. Having her guarding your flank is the closest thing to absolute invincibility.',
        author: 'Armin Arlert',
        title: '15th Commander, Survey Corps',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces'
      },
      {
        quote: 'Her strength is real, but her devotion to the team is what makes her the most fearsome defender in humanity\'s ranks.',
        author: 'Levi Ackerman',
        title: 'Captain',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces'
      }
    ],
    themeTokensCSS: {
      '--accent': '#e11d48',
      '--accent-glow': 'rgba(225, 29, 72, 0.38)',
      '--bg-primary': '#12070a',
      '--text-primary': '#fff1f2'
    }
  },

  naruto: {
    id: 'naruto',
    slug: 'naruto',
    name: 'Naruto Uzumaki',
    japaneseName: 'うずまきナルト',
    series: 'Naruto Shippuden',
    universeBadge: 'Hidden Leaf Village',
    roleTitle: 'Seventh Hokage & Infinite Concurrency Architect',
    headline: 'Child of the Prophecy',
    tagline: 'I never go back on my word. That is my ninja way—and my SLA guarantee.',
    statement: 'Hard work is worthless for those that don\'t believe in themselves. Scale to thousands of shadow clones and never drop a packet.',
    bio: 'Seventh Hokage of the Hidden Leaf and Jinchūriki of the Nine Tails. Famed for transforming adversity into boundless energy, scaling distributed shadow-clone worker clusters to conquer impossible workloads.',
    price: 42,
    featuredTag: 'Iconic',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces',
    bustUrl: '/himmel_bust.png',
    cardUrl: '/himmel_card.jpg',
    layoutArchetype: 'dynamic-hero',
    accentAnimationType: 'naruto-rasengan-chakra',
    colors: {
      isDark: false,
      bgPrimary: '#fffbf5',
      bgSecondary: '#fef3c7',
      bgSurface: 'rgba(255, 255, 255, 0.94)',
      bgGlass: 'rgba(255, 251, 245, 0.85)',
      textPrimary: '#451a03',
      textSecondary: '#78350f',
      textMuted: '#92400e',
      accent: '#ea580c',
      accentSecondary: '#f59e0b',
      accentGlow: 'rgba(234, 88, 12, 0.35)',
      borderSubtle: '#fed7aa',
      borderStrong: 'rgba(234, 88, 12, 0.45)',
      cardShadow: '0 20px 45px -10px rgba(234, 88, 12, 0.18)',
      badgeBg: '#ffedd5',
      badgeText: '#9a3412',
      gradientHero: 'radial-gradient(ellipse at 50% 35%, rgba(245, 158, 11, 0.28) 0%, rgba(234, 88, 12, 0.15) 45%, transparent 70%)',
    },
    stats: [
      { label: 'Shadow Clones', value: '10,000+' },
      { label: 'Kurama Chakra', value: 'Infinite' },
      { label: 'Talk no Jutsu', value: '100% Rate' },
    ],
    skills: [
      { name: 'Mass Shadow Clone Parallelism', level: 100, category: 'Scale' },
      { name: 'Rasenshuriken Vortex Compression', level: 98, category: 'Algorithms' },
      { name: 'Sage Mode Natural Gathering', level: 96, category: 'Green Tech' },
      { name: 'Talk-no-Jutsu Stakeholder Alignment', level: 100, category: 'Leadership' },
    ],
    projects: [
      {
        id: 'shadow-clone-orchestrator',
        title: 'Kage Bunshin Worker Swarm',
        category: 'Serverless Orchestration',
        subtag: 'Auto-Scaling Mesh',
        desc: 'Ultra-elastic serverless swarm that instantly provisions thousands of worker clones to digest spike traffic with zero cold start.',
        tags: ['Kubernetes', 'Go', 'Knative', 'gRPC'],
        metrics: '10,000 Workers in 40ms',
        color: '#ea580c'
      },
      {
        id: 'rasenshuriken-engine',
        title: 'Rasenshuriken Cellular Compression Engine',
        category: 'Data Compression',
        subtag: 'Micro-Slicing Algorithm',
        desc: 'Hyper-dense lossless file compression algorithm slicing byte payloads at microscopic cellular resolution.',
        tags: ['Rust', 'SIMD', 'LZ4', 'Zstandard'],
        metrics: '85% Data Squeezed',
        color: '#f59e0b'
      },
      {
        id: 'leaf-village-portal',
        title: 'Konoha Citizen Service SuperApp',
        category: 'GovTech Web Platform',
        subtag: 'Citizen Portal',
        desc: 'Unified municipal platform serving all Hidden Leaf villagers for mission dispatches, academy enrollments, and ramen delivery.',
        tags: ['Next.js', 'PostgreSQL', 'Tailwind'],
        metrics: '250k Daily Active Citizens',
        color: '#d97706'
      },
      {
        id: 'ichiraku-ramen-tracker',
        title: 'Ichiraku Miso Chashu Hot-Route',
        category: 'Delivery Route AI',
        subtag: 'Real-time GPS',
        desc: 'Instant noodle temperature preservation route planner ensuring boiling broth arrives before noodles soften.',
        tags: ['TypeScript', 'Mapbox', 'WebSockets'],
        metrics: 'Broth 95°C Guaranteed',
        color: '#c2410c'
      }
    ],
    experiences: [
      {
        year: 'Fourth Great Ninja War',
        role: 'Supreme Hero & Alliance Champion',
        organization: 'Allied Shinobi Forces',
        description: 'United five great nations, shared Nine-Tails chakra with thousands of comrades, and defeated the celestial Otsutsuki threat.'
      },
      {
        year: 'Youth Era',
        role: 'Team 7 Shinobi',
        organization: 'Konohagakure Academy',
        description: 'Trained under Jiraiya and Kakashi, mastering Sage Mode and the ultimate wind-style shape transformation.'
      }
    ],
    testimonials: [
      {
        quote: 'Naruto has this strange power to turn former enemies into brothers. His stubborn conviction moves the entire ninja world.',
        author: 'Kakashi Hatake',
        title: 'Sixth Hokage',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces'
      },
      {
        quote: 'He never gave up on me when I was consumed by darkness. Working alongside him is an honor like no other.',
        author: 'Sasuke Uchiha',
        title: 'Shadow Hokage',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces'
      }
    ],
    themeTokensCSS: {
      '--accent': '#ea580c',
      '--accent-glow': 'rgba(234, 88, 12, 0.35)',
      '--bg-primary': '#fffbf5',
      '--text-primary': '#451a03'
    }
  },

  sasuke: {
    id: 'sasuke',
    slug: 'sasuke',
    name: 'Sasuke Uchiha',
    japaneseName: 'うちはサスケ',
    series: 'Naruto Shippuden',
    universeBadge: 'Hidden Leaf Village',
    roleTitle: 'Shadow Hokage & Deep Threat Hunter',
    headline: 'Wielder of Rinnegan & Sharingan',
    tagline: 'Operating in the absolute dark to ensure the digital light continues to shine.',
    statement: 'I have long since closed my eyes... my only goal is in the darkness. Precision code requires zero unnecessary illumination.',
    bio: 'Last scion of the Uchiha clan and the Shadow Hokage who protects the leaf village from extra-dimensional threats. Specializes in dark-mode aesthetics, zero-trust penetration testing, and lightning-fast cryptographic execution.',
    price: 45,
    featuredTag: 'Dark Mode',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
    bustUrl: '/himmel_bust.png',
    cardUrl: '/himmel_card.jpg',
    layoutArchetype: 'cyberpunk-hud',
    accentAnimationType: 'sasuke-chidori-lightning',
    colors: {
      isDark: true,
      bgPrimary: '#050713',
      bgSecondary: '#0c102b',
      bgSurface: 'rgba(12, 16, 43, 0.88)',
      bgGlass: 'rgba(5, 7, 19, 0.8)',
      textPrimary: '#f8fafc',
      textSecondary: '#c7d2fe',
      textMuted: '#818cf8',
      accent: '#6366f1',
      accentSecondary: '#8b5cf6',
      accentGlow: 'rgba(99, 102, 241, 0.42)',
      borderSubtle: '#1e2554',
      borderStrong: 'rgba(99, 102, 241, 0.6)',
      cardShadow: '0 20px 45px -10px rgba(99, 102, 241, 0.25)',
      badgeBg: 'rgba(99, 102, 241, 0.2)',
      badgeText: '#c7d2fe',
      gradientHero: 'radial-gradient(ellipse at 50% 30%, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.15) 50%, transparent 75%)',
    },
    stats: [
      { label: 'Chidori Voltage', value: '1.21 GW' },
      { label: 'Space-Time Portals', value: '6 Dimensions' },
      { label: 'Threat Intercept', value: '100%' },
    ],
    skills: [
      { name: 'Chidori Lightning Concurrency', level: 99, category: 'Hardware' },
      { name: 'Rinnegan Dimension Teleportation', level: 98, category: 'Network' },
      { name: 'Sharingan Predictive Vision', level: 100, category: 'AI/ML' },
      { name: 'Susano\'o Fortified Security', level: 97, category: 'Defenses' },
    ],
    projects: [
      {
        id: 'chidori-network',
        title: 'Chidori High-Voltage Wire Protocol',
        category: 'High Frequency Trading',
        subtag: 'Laser Network',
        desc: 'Sub-nanosecond financial order execution layer using lightning electromagnetic pulses across transatlantic cables.',
        tags: ['C', 'Kernel Bypass', 'Solarflare OpenOnload', 'FPGA'],
        metrics: '180 Nanosecond Latency',
        color: '#6366f1'
      },
      {
        id: 'rinnegan-portal',
        title: 'Amenotejikara Position Swap Router',
        category: 'Distributed Routing',
        subtag: 'Instant Swap Routing',
        desc: 'Quantum position swap algorithm switching failing server nodes with healthy standby replicas instantaneously without dropped state.',
        tags: ['Rust', 'BGP Anycast', 'QUIC'],
        metrics: 'Zero Lost Packets',
        color: '#8b5cf6'
      },
      {
        id: 'susanoo-vault',
        title: 'Susano\'o Total Memory Enclave',
        category: 'Confidential Computing',
        subtag: 'Secure Enclaves',
        desc: 'Impenetrable purple ethereal memory barrier shielding cryptographic root keys from hypervisor compromises.',
        tags: ['Intel SGX', 'AMD SEV', 'Rust'],
        metrics: 'Military Grade',
        color: '#4f46e5'
      },
      {
        id: 'amaterasu-burn',
        title: 'Amaterasu Irrevocable Secure Shredder',
        category: 'Security Utility',
        subtag: 'Data Erasure',
        desc: 'Black-flame storage obliteration utility overwriting sectors 35 times until zero magnetic residue remains.',
        tags: ['C', 'DoD 5220.22-M', 'NVMe Purge'],
        metrics: 'Burn for 7 Days',
        color: '#1e1b4b'
      }
    ],
    experiences: [
      {
        year: 'Post-War Era',
        role: 'Lone Dimensional Investigator',
        organization: 'Inter-Dimensional Exploration',
        description: 'Traversed Otsutsuki dimensions alone to uncover extraterrestrial threats before they reach the human realm.'
      },
      {
        year: 'Team Hebi / Taka',
        role: 'Founder & Swordmaster',
        organization: 'Independent Vanguard Group',
        description: 'Defeated Danzo and confronted the Five Kage Summit, pushing lightning-style nature transformation to divine heights.'
      }
    ],
    testimonials: [
      {
        quote: 'Sasuke perceives system weaknesses before they even compile. His Sharingan-inspired code review leaves nowhere for vulnerabilities to hide.',
        author: 'Naruto Uzumaki',
        title: 'Seventh Hokage',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'
      },
      {
        quote: 'He may walk in the dark, but his heart has never wavered in protecting the village.',
        author: 'Sakura Haruno',
        title: 'Chief Medical Director',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces'
      }
    ],
    themeTokensCSS: {
      '--accent': '#6366f1',
      '--accent-glow': 'rgba(99, 102, 241, 0.42)',
      '--bg-primary': '#050713',
      '--text-primary': '#f8fafc'
    }
  },

  sakura: {
    id: 'sakura',
    slug: 'sakura',
    name: 'Sakura Haruno',
    japaneseName: '春野サクラ',
    series: 'Naruto Shippuden',
    universeBadge: 'Hidden Leaf Village',
    roleTitle: 'Chief Medical Ninja & High-Impact Reliability Lead',
    headline: 'Mistress of Byakugou',
    tagline: 'Healing broken architectures and punching through performance roadblocks.',
    statement: 'I will not stay behind anyone\'s back anymore. My healing restores systems, and my fist clears the path.',
    bio: 'Disciple of Fifth Hokage Tsunade and head of Konoha\'s medical services. Combines microscopic cellular healing precision with monstrous kinetic force that cracks mountains. Master of zero-downtime hot patching.',
    price: 35,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces',
    bustUrl: '/himmel_bust.png',
    cardUrl: '/himmel_card.jpg',
    layoutArchetype: 'flanked-centered',
    accentAnimationType: 'sakura-cherry-byakugou',
    colors: {
      isDark: false,
      bgPrimary: '#fff1f2',
      bgSecondary: '#ffe4e6',
      bgSurface: 'rgba(255, 255, 255, 0.95)',
      bgGlass: 'rgba(255, 241, 242, 0.85)',
      textPrimary: '#4c0519',
      textSecondary: '#881337',
      textMuted: '#9f1239',
      accent: '#ec4899',
      accentSecondary: '#10b981',
      accentGlow: 'rgba(236, 72, 153, 0.35)',
      borderSubtle: '#fecdd3',
      borderStrong: 'rgba(236, 72, 153, 0.45)',
      cardShadow: '0 20px 45px -10px rgba(236, 72, 153, 0.16)',
      badgeBg: '#ffe4e6',
      badgeText: '#be123c',
      gradientHero: 'radial-gradient(ellipse at 50% 35%, rgba(236, 72, 153, 0.22) 0%, rgba(16, 185, 129, 0.12) 45%, transparent 70%)',
    },
    stats: [
      { label: 'Byakugou Pool', value: '3 Years Stored' },
      { label: 'Cellular Recovery', value: 'Instant' },
      { label: 'Fist Impact Force', value: '10,000 Tons' },
    ],
    skills: [
      { name: 'Self-Healing Fault Recovery', level: 99, category: 'Resilience' },
      { name: 'Byakugou Chakra Reserves', level: 98, category: 'Capacity' },
      { name: 'Monster Strike Performance Tuning', level: 96, category: 'Optimization' },
      { name: 'Medical Telemetry Diagnostics', level: 97, category: 'Health' },
    ],
    projects: [
      {
        id: 'byakugou-healer',
        title: 'Byakugou Self-Healing Kubernetes Operator',
        category: 'DevOps & SRE',
        subtag: 'Auto-Healing Controller',
        desc: 'Autonomous SRE operator that monitors crash loops and regenerates broken pods instantly using stored memory chakra pools.',
        tags: ['Go', 'Kubernetes API', 'Prometheus', 'Chaos Mesh'],
        metrics: 'Zero Downtime MTTR',
        color: '#ec4899'
      },
      {
        id: 'cellular-patch',
        title: 'Katsuyu Distributed Health Mesh',
        category: 'Healthcare Tech',
        subtag: 'Tele-Health Routing',
        desc: 'Slug-summoning distributed healthcare protocol relaying vital diagnostics from 5,000 field shinobi back to central hospital.',
        tags: ['WebRTC', 'MQTT', 'Node.js'],
        metrics: 'Sub-second Pulse Sync',
        color: '#10b981'
      },
      {
        id: 'cherry-blossom-clash',
        title: 'Cherry Blossom Impact Benchmarker',
        category: 'Load Testing',
        subtag: 'Stress Testing Tool',
        desc: 'Brutal stress-testing engine simulating catastrophic 100,000 RPS punches on web endpoints to expose weak joints.',
        tags: ['Rust', 'K6', 'Distributed Load'],
        metrics: 'Cracks Fragile APIs',
        color: '#fb7185'
      },
      {
        id: 'pediatric-mental-health',
        title: 'Children\'s Post-War Mental Health Clinic',
        category: 'Social Impact Web App',
        subtag: 'Community Platform',
        desc: 'Digital booking and counseling resource network established for war orphans and recovering young shinobi.',
        tags: ['React', 'Supabase', 'Tailwind'],
        metrics: 'Over 12,000 Helped',
        color: '#f43f5e'
      }
    ],
    experiences: [
      {
        year: 'Fourth Great Shinobi War',
        role: 'Chief Medical Vanguard & Byakugou Master',
        organization: 'Allied Medical Division',
        description: 'Unlocked the Strength of a Hundred Seal on the front lines, summoning Katsuyu to heal entire battlefield divisions simultaneously.'
      },
      {
        year: 'Apprenticeship',
        role: 'Tsunade\'s Prime Disciple',
        organization: 'Konoha General Hospital',
        description: 'Underwent grueling chakra control drills and heavy weight physical conditioning, mastering anatomical surgery.'
      }
    ],
    testimonials: [
      {
        quote: 'Sakura\'s punch is more terrifying than an S-rank lightning jutsu, but her healing touch has brought half the village back from the brink.',
        author: 'Naruto Uzumaki',
        title: 'Seventh Hokage',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'
      },
      {
        quote: 'Her chakra control and diagnostic intuition have surpassed mine. Konoha’s medical future is in safe hands.',
        author: 'Tsunade Senju',
        title: 'Fifth Hokage',
        avatar: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=100&h=100&fit=crop&crop=faces'
      }
    ],
    themeTokensCSS: {
      '--accent': '#ec4899',
      '--accent-glow': 'rgba(236, 72, 153, 0.35)',
      '--bg-primary': '#fff1f2',
      '--text-primary': '#4c0519'
    }
  },

  hinata: {
    id: 'hinata',
    slug: 'hinata',
    name: 'Hinata Hyuga',
    japaneseName: '日向ヒナタ',
    series: 'Naruto Shippuden',
    universeBadge: 'Hidden Leaf Village',
    roleTitle: 'Byakugan Princess & Gentle System Architect',
    headline: 'Mistress of Gentle Fist',
    tagline: 'Quiet grace, piercing clarity, and an unshakable gentle resolve.',
    statement: 'Because when I watch you, I feel strong, like I can do anything... that even someone like me has worth.',
    bio: 'Heiress of the prestigious Hyuga clan. Master of the Byakugan and the Twin Lion Fists. Specializes in 360-degree observability, non-invasive deep-packet inspections, and serene, compassionate user experience design.',
    price: 37,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces',
    bustUrl: '/himmel_bust.png',
    cardUrl: '/himmel_card.jpg',
    layoutArchetype: 'zen-minimal',
    accentAnimationType: 'hinata-gentle-fist',
    colors: {
      isDark: false,
      bgPrimary: '#faf5ff',
      bgSecondary: '#f3e8ff',
      bgSurface: 'rgba(255, 255, 255, 0.94)',
      bgGlass: 'rgba(250, 245, 255, 0.85)',
      textPrimary: '#3b0764',
      textSecondary: '#6b21a8',
      textMuted: '#9333ea',
      accent: '#8b5cf6',
      accentSecondary: '#a855f7',
      accentGlow: 'rgba(139, 92, 246, 0.32)',
      borderSubtle: '#e9d5ff',
      borderStrong: 'rgba(139, 92, 246, 0.42)',
      cardShadow: '0 20px 45px -10px rgba(139, 92, 246, 0.15)',
      badgeBg: '#f3e8ff',
      badgeText: '#7e22ce',
      gradientHero: 'radial-gradient(ellipse at 50% 35%, rgba(139, 92, 246, 0.2) 0%, rgba(168, 85, 247, 0.1) 45%, transparent 70%)',
    },
    stats: [
      { label: 'Byakugan Field', value: '360° Vision' },
      { label: 'Tenketsu Block', value: '64 Palms' },
      { label: 'Gentle Grace', value: '100%' },
    ],
    skills: [
      { name: '360° Deep Observability', level: 99, category: 'Monitoring' },
      { name: 'Twin Lion Fist Chakra Weaving', level: 97, category: 'Fluid Mechanics' },
      { name: 'Non-Invasive Tenketsu Inspection', level: 96, category: 'Diagnostics' },
      { name: 'Compassionate UX Systems', level: 100, category: 'Design' },
    ],
    projects: [
      {
        id: 'byakugan-observability',
        title: 'Byakugan 360 Full-Stack Observability',
        category: 'Monitoring & APM',
        subtag: 'Telemetry Suite',
        desc: 'Omnipresent visual dashboard rendering every microservice tenketsu pathway with 360-degree blind-spot-free clarity.',
        tags: ['OpenTelemetry', 'ClickHouse', 'React', 'D3.js'],
        metrics: 'Zero Blind Spots',
        color: '#8b5cf6'
      },
      {
        id: 'twin-lion-fist',
        title: 'Twin Lion Fist Energy Harvester',
        category: 'Chakra Routing',
        subtag: 'Drain Mitigation',
        desc: 'Graceful flow-control mechanism draining adversarial bot bandwidth without blocking genuine human visitors.',
        tags: ['TypeScript', 'Cloudflare Workers', 'Rate Limiting'],
        metrics: '99.4% Bot Intercept',
        color: '#a855f7'
      },
      {
        id: 'lavender-threads',
        title: 'Hand-Knitted Red Scarf Store',
        category: 'E-Commerce Platform',
        subtag: 'Craft Marketplace',
        desc: 'Boutique artisan knitting marketplace designed with tranquil lavender aesthetics and cozy warm micro-interactions.',
        tags: ['Next.js', 'Stripe', 'Framer Motion'],
        metrics: 'Warm & Cozy',
        color: '#c084fc'
      },
      {
        id: 'gentle-mindfulness',
        title: 'Shinobi Calm Meditation Companion',
        category: 'Health & Mindfulness',
        subtag: 'Audio Therapy',
        desc: 'Interactive ambient breathing app syncing tranquil soundscapes with user breath pacing via camera biometric pulses.',
        tags: ['WebRTC', 'Canvas', 'Web Audio'],
        metrics: 'Calms Stress in 2 Min',
        color: '#7c3aed'
      }
    ],
    experiences: [
      {
        year: 'Fourth Shinobi War',
        role: 'Vanguard Shinobi',
        organization: 'Second Division',
        description: 'Stood fearlessly before the Ten-Tails, re-aligning Naruto\'s dislocated shoulder and inspiring the allied front with indomitable will.'
      },
      {
        year: 'Hyuga Clan',
        role: 'Eldest Heiress & Style Master',
        organization: 'Hyuga Main Household',
        description: 'Mastered the secret Gentle Step Twin Lion Fists, blending ancient Hyuga discipline with boundless compassion.'
      }
    ],
    testimonials: [
      {
        quote: 'Hinata has always been watching over me, giving me strength whenever I was about to stumble. Her heart is the gentlest in the world.',
        author: 'Naruto Uzumaki',
        title: 'Seventh Hokage',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'
      },
      {
        quote: 'Her mastery of the Byakugan and Gentle Fist embodies the absolute purity of the Hyuga art.',
        author: 'Neji Hyuga',
        title: 'Jonin Genius',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces'
      }
    ],
    themeTokensCSS: {
      '--accent': '#8b5cf6',
      '--accent-glow': 'rgba(139, 92, 246, 0.32)',
      '--bg-primary': '#faf5ff',
      '--text-primary': '#3b0764'
    }
  },

  luffy: {
    id: 'luffy',
    slug: 'luffy',
    name: 'Monkey D. Luffy',
    japaneseName: 'モンキー・D・ルフィ',
    series: 'One Piece',
    universeBadge: 'Straw Hat Pirates',
    roleTitle: 'Emperor of the Sea & Sun God Nika',
    headline: 'King of the Pirates',
    tagline: 'I don\'t want to conquer anything. I just think the guy with the most freedom on the whole sea is the Pirate King!',
    statement: 'If you don\'t take risks, you can\'t create a future! Laugh out loud, stretch the rules, and sail straight into the horizon.',
    bio: 'Captain of the Straw Hat Pirates and awakened incarnation of Sun God Nika (Gear 5). Known for boundless freedom, elastic creativity, and uniting fierce rivals into unstoppable dream-chasing fleets.',
    price: 45,
    featuredTag: 'Legendary',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
    bustUrl: '/himmel_bust.png',
    cardUrl: '/himmel_card.jpg',
    layoutArchetype: 'dynamic-hero',
    accentAnimationType: 'luffy-nika-clouds',
    colors: {
      isDark: false,
      bgPrimary: '#ffffff',
      bgSecondary: '#fef2f2',
      bgSurface: 'rgba(255, 255, 255, 0.95)',
      bgGlass: 'rgba(255, 255, 255, 0.88)',
      textPrimary: '#1c1917',
      textSecondary: '#44403c',
      textMuted: '#78716c',
      accent: '#dc2626',
      accentSecondary: '#f59e0b',
      accentGlow: 'rgba(220, 38, 38, 0.32)',
      borderSubtle: '#fecaca',
      borderStrong: 'rgba(220, 38, 38, 0.45)',
      cardShadow: '0 20px 45px -10px rgba(220, 38, 38, 0.18)',
      badgeBg: '#fee2e2',
      badgeText: '#991b1b',
      gradientHero: 'radial-gradient(ellipse at 50% 35%, rgba(245, 158, 11, 0.25) 0%, rgba(220, 38, 38, 0.12) 45%, transparent 70%)',
    },
    stats: [
      { label: 'Bounty', value: '฿ 3,000,000,000' },
      { label: 'Freedom Form', value: 'Gear 5 Nika' },
      { label: 'Fleet Ships', value: '5,600 Men' },
    ],
    skills: [
      { name: 'Gear 5 Reality-Bending UI', level: 100, category: 'Creative' },
      { name: 'Conqueror\'s Haki Presence', level: 99, category: 'Leadership' },
      { name: 'Gomu-Gomu Elastic Scalability', level: 98, category: 'Scale' },
      { name: 'Meat Devouring Concurrency', level: 100, category: 'Consumption' },
    ],
    projects: [
      {
        id: 'gear-5-physics',
        title: 'Nika Elastic Physics Engine',
        category: 'Creative Physics',
        subtag: 'Toon Shaders & Ragdoll',
        desc: 'Delightful cartoon-physics web engine turning regular HTML DOM elements into bouncy, rubbery, squishable playground objects.',
        tags: ['Matter.js', 'React Three Fiber', 'GLSL', 'Framer Motion'],
        metrics: '100% Joy Factor',
        color: '#dc2626'
      },
      {
        id: 'grand-fleet-p2p',
        title: 'Straw Hat Grand Fleet Mesh Network',
        category: 'Decentralized P2P',
        subtag: 'Buster Call Resistant',
        desc: 'Unstoppable peer-to-peer maritime comms array transmitting Vivre Card location beacons across the Grand Line.',
        tags: ['Libp2p', 'Go', 'WebRTC', 'IPFS'],
        metrics: '7 Autonomous Divisions',
        color: '#f59e0b'
      },
      {
        id: 'sunny-go-os',
        title: 'Thousand Sunny Soldier Dock OS',
        category: 'Shipboard Robotics',
        subtag: 'Embedded Controls',
        desc: 'Automated paddle-wheel and Coup de Burst air-cannon control firmware engineered by Franky and powered by Cola.',
        tags: ['Rust', 'Embedded C', 'CAN Bus'],
        metrics: '1-Mile Air Leap',
        color: '#ea580c'
      },
      {
        id: 'meat-banquet-app',
        title: 'Sanji All-Blue Banquet Scheduler',
        category: 'Food Delivery Platform',
        subtag: 'Grand Line Culinary',
        desc: 'Instant high-calorie meal order logistics system that serves roast dinosaur steaks within 60 seconds of docking.',
        tags: ['Next.js', 'Prisma', 'Tailwind'],
        metrics: 'Endless Portions',
        color: '#e11d48'
      }
    ],
    experiences: [
      {
        year: 'Wano Country Campaign',
        role: 'Emperor of the Sea (Yonko)',
        organization: 'Straw Hat Pirates & Ninja-Pirate-Mink-Samurai Alliance',
        description: 'Awakened the Legendary Sun God Nika fruit, toppled Kaido from Onigashima, and freed the land of Wano.'
      },
      {
        year: 'East Blue Departure',
        role: 'Captain & Dreamer',
        organization: 'Going Merry',
        description: 'Set out in a humble wooden barrel, recruit Zoro, Nami, Usopp, and Sanji, and broke through the Grand Line entrance.'
      }
    ],
    testimonials: [
      {
        quote: 'Luffy is the man who will become the King of the Pirates! I swear my swords to his dream.',
        author: 'Roronoa Zoro',
        title: 'King of Hell Swordsman',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces'
      },
      {
        quote: 'No matter what storms lie ahead, Luffy always makes us believe that the dawn will break.',
        author: 'Nami',
        title: 'Cat Burglar Navigator',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces'
      }
    ],
    themeTokensCSS: {
      '--accent': '#dc2626',
      '--accent-glow': 'rgba(220, 38, 38, 0.32)',
      '--bg-primary': '#ffffff',
      '--text-primary': '#1c1917'
    }
  },

  ace: {
    id: 'ace',
    slug: 'ace',
    name: 'Portgas D. Ace',
    japaneseName: 'ポートガス・D・エース',
    series: 'One Piece',
    universeBadge: 'Whitebeard Pirates',
    roleTitle: 'Fire Fist & 2nd Division Commander',
    headline: 'Commander of the Flame',
    tagline: 'Thank you for loving someone like me! Burn brightly with no regrets.',
    statement: 'I don\'t want to live a thousand years. If I just live through today, that will be enough. Flame on!',
    bio: 'Second Division Commander of the Whitebeard Pirates and son of the Pirate King Gol D. Roger. Wielder of the Mera Mera no Mi flame fruit. Known for blazing charisma, intense loyalty, and unstoppable firestorm bursts.',
    price: 39,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces',
    bustUrl: '/himmel_bust.png',
    cardUrl: '/himmel_card.jpg',
    layoutArchetype: 'warrior-vanguard',
    accentAnimationType: 'ace-fire-embers',
    colors: {
      isDark: true,
      bgPrimary: '#100803',
      bgSecondary: '#1f1006',
      bgSurface: 'rgba(31, 16, 6, 0.9)',
      bgGlass: 'rgba(16, 8, 3, 0.8)',
      textPrimary: '#fff7ed',
      textSecondary: '#ffedd5',
      textMuted: '#fdba74',
      accent: '#f97316',
      accentSecondary: '#ea580c',
      accentGlow: 'rgba(249, 115, 22, 0.42)',
      borderSubtle: '#431407',
      borderStrong: 'rgba(249, 115, 22, 0.58)',
      cardShadow: '0 20px 45px -10px rgba(249, 115, 22, 0.28)',
      badgeBg: 'rgba(249, 115, 22, 0.2)',
      badgeText: '#fed7aa',
      gradientHero: 'radial-gradient(ellipse at 50% 30%, rgba(249, 115, 22, 0.35) 0%, rgba(234, 88, 12, 0.15) 50%, transparent 75%)',
    },
    stats: [
      { label: 'Bounty', value: '฿ 550,000,000' },
      { label: 'Hiken Temperature', value: '3,000 °C' },
      { label: 'Division Ships', value: '1,600 Men' },
    ],
    skills: [
      { name: 'Fire Fist Pyrotechnic Pipelines', level: 99, category: 'Compute' },
      { name: 'High-Temperature Flame Shaders', level: 98, category: 'Graphics' },
      { name: 'Striker Boat Propulsion Fueling', level: 94, category: 'Engines' },
      { name: 'Unshakable Brotherly Devotion', level: 100, category: 'Loyalty' },
    ],
    projects: [
      {
        id: 'hiken-cluster',
        title: 'Hiken Molten Cloud Accelerator',
        category: 'High-Throughput GPU',
        subtag: 'Molten Compute Cluster',
        desc: 'Blazing GPU kernel cluster melting large language model inference bottlenecks with intense parallel firestorms.',
        tags: ['CUDA', 'PyTorch', 'Triton', 'C++'],
        metrics: '10x Matrix Multiplies',
        color: '#f97316'
      },
      {
        id: 'striker-boat',
        title: 'Striker Flame Engine Telemetry',
        category: 'Thermal Dynamics',
        subtag: 'Engine Controller',
        desc: 'Custom propulsion telemetry software powering Ace’s personal flame-driven one-man jet ski across choppy sea waves.',
        tags: ['Rust', 'CAN Bus', 'IoT'],
        metrics: '65 Knots Water Speed',
        color: '#ea580c'
      },
      {
        id: 'whitebeard-armada',
        title: 'Moby Dick Fleet Coordinate Link',
        category: 'Fleet Comms',
        subtag: 'Encrypted Radio',
        desc: 'Secure fleet tactical radar keeping 16 division commanders synchronized across vast oceans.',
        tags: ['Go', 'WebSockets', 'Tailwind'],
        metrics: '16 Divisions Linked',
        color: '#fb923c'
      },
      {
        id: 'brotherhood-cup',
        title: 'Sake Cup Oath Smart Contract',
        category: 'Smart Contracts',
        subtag: 'Decentralized Oath',
        desc: 'Immutable multi-sig brotherhood pact binding Luffy, Ace, and Sabo across lifetime horizons.',
        tags: ['Solidity', 'Foundry', 'Ethereum'],
        metrics: 'Eternal Bond',
        color: '#dc2626'
      }
    ],
    experiences: [
      {
        year: 'Commander Era',
        role: '2nd Division Commander',
        organization: 'Whitebeard Pirates (Yonko)',
        description: 'Commanded the vanguard fleet under Edward Newgate, protecting territories across the turbulent New World.'
      },
      {
        year: 'Spade Pirates',
        role: 'Captain & Flame Wielder',
        organization: 'Spade Pirates',
        description: 'Formed crew after departing Mt. Colubo, acquired the Flame-Flame fruit, and dueled Jinbe for five consecutive days.'
      }
    ],
    testimonials: [
      {
        quote: 'Ace is my son, and whoever touches a hair on his head will answer to the full might of the Whitebeard fleet.',
        author: 'Edward Newgate',
        title: 'Whitebeard, Emperor of the Sea',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces'
      },
      {
        quote: 'He always ran ahead of me, strong and fearless. I will carry his will forever.',
        author: 'Monkey D. Luffy',
        title: 'Brother & Pirate King',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces'
      }
    ],
    themeTokensCSS: {
      '--accent': '#f97316',
      '--accent-glow': 'rgba(249, 115, 22, 0.42)',
      '--bg-primary': '#100803',
      '--text-primary': '#fff7ed'
    }
  },

  sabo: {
    id: 'sabo',
    slug: 'sabo',
    name: 'Sabo',
    japaneseName: 'サボ',
    series: 'One Piece',
    universeBadge: 'Revolutionary Army',
    roleTitle: 'Chief of Staff & Flame Emperor',
    headline: 'No. 2 of the Revolution',
    tagline: 'Inheriting the flame to overthrow corrupt world hierarchies.',
    statement: 'Ace\'s flame will never die. His will lives on in my claws. We will shatter the Celestial Dragons\' stranglehold.',
    bio: 'Chief of Staff and second-in-command of the Revolutionary Army. Trained by Monkey D. Dragon and successor to the Flame-Flame fruit. Master of Dragon Claw martial arts and strategic undercover operations.',
    price: 39,
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces',
    bustUrl: '/himmel_bust.png',
    cardUrl: '/himmel_card.jpg',
    layoutArchetype: 'asymmetric-split',
    accentAnimationType: 'sabo-dragon-flames',
    colors: {
      isDark: true,
      bgPrimary: '#08111e',
      bgSecondary: '#0f2038',
      bgSurface: 'rgba(15, 32, 56, 0.88)',
      bgGlass: 'rgba(8, 17, 30, 0.8)',
      textPrimary: '#f8fafc',
      textSecondary: '#cbd5e1',
      textMuted: '#94a3b8',
      accent: '#0284c7',
      accentSecondary: '#f97316',
      accentGlow: 'rgba(2, 132, 199, 0.38)',
      borderSubtle: '#1e3a5f',
      borderStrong: 'rgba(2, 132, 199, 0.55)',
      cardShadow: '0 20px 45px -10px rgba(2, 132, 199, 0.22)',
      badgeBg: 'rgba(2, 132, 199, 0.18)',
      badgeText: '#7dd3fc',
      gradientHero: 'radial-gradient(ellipse at 50% 30%, rgba(2, 132, 199, 0.28) 0%, rgba(249, 115, 22, 0.15) 50%, transparent 75%)',
    },
    stats: [
      { label: 'Bounty', value: '฿ 602,000,000' },
      { label: 'Rank', value: 'No. 2 Chief of Staff' },
      { label: 'Dragon Claws', value: 'Steel Shatterer' },
    ],
    skills: [
      { name: 'Ryusoken Dragon Claw Martial Code', level: 98, category: 'Penetration' },
      { name: 'Flame Emperor Dual Element', level: 97, category: 'Combat' },
      { name: 'Underground Revolutionary Comms', level: 99, category: 'Network' },
      { name: 'Stealth Infiltration Tactics', level: 96, category: 'Ops' },
    ],
    projects: [
      {
        id: 'dragon-breath',
        title: 'Ryusoken Structural Penetration Tester',
        category: 'Vulnerability Analysis',
        subtag: 'Core Fracture Tool',
        desc: 'Advanced penetration testing suite that identifies the critical focal point in server fortresses and shatters it with clean pressure.',
        tags: ['Go', 'Raw Sockets', 'Kernel Exploits', 'Zero-Day'],
        metrics: 'Cracks Hardened Defenses',
        color: '#0284c7'
      },
      {
        id: 'rev-dispatch',
        title: 'Revolutionary Army Dispatch Hub',
        category: 'Encrypted Comms',
        subtag: 'Decentralized Comms',
        desc: 'End-to-end encrypted dispatch channel synchronizing Revolutionary Army commanders across all four oceans.',
        tags: ['Signal Protocol', 'Rust', 'Tauri', 'SQLite'],
        metrics: 'Zero Celestial Intercepts',
        color: '#f97316'
      },
      {
        id: 'marijoa-infiltrator',
        title: 'Holy Land Telemetry Spoof',
        category: 'Cyber Warfare',
        subtag: 'Telemetry Cloak',
        desc: 'Ghost signal generator disguising elite spy drones inside the World Government red-line surveillance grid.',
        tags: ['C', 'SDR (Software Radio)', 'GNU Radio'],
        metrics: '100% Stealth Rating',
        color: '#38bdf8'
      },
      {
        id: 'flame-emperor-hiken',
        title: 'Mera-Mera Inherited Will Dashboard',
        category: 'Memorial & Ledger',
        subtag: 'Interactive Story',
        desc: 'Living commemorative interactive narrative tracing the shared fire of Ace, Luffy, and Sabo with 3D flame particles.',
        tags: ['Three.js', 'WebAudio', 'Framer Motion'],
        metrics: 'Eternal Flame',
        color: '#ea580c'
      }
    ],
    experiences: [
      {
        year: 'Reverie Infiltration',
        role: 'Flame Emperor & Field Leader',
        organization: 'Revolutionary Army',
        description: 'Infiltrated Mary Geoise, declared open war on Celestial Dragons, and liberated former Warlord Bartholomew Kuma.'
      },
      {
        year: 'Dressrosa Arc',
        role: 'Colosseum Champion & Mera Mera Successor',
        organization: 'Corrida Colosseum',
        description: 'Won the Mera Mera no Mi in combat, honoring Ace\'s legacy and shattering Doflamingo\'s underground arms factory.'
      }
    ],
    testimonials: [
      {
        quote: 'Sabo has grown into an indispensable leader. His tactical clarity and Dragon Claw technique are unmatched.',
        author: 'Monkey D. Dragon',
        title: 'Supreme Commander, Revolutionary Army',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces'
      },
      {
        quote: 'Seeing him use Ace\'s fire made me cry with happiness. Sabo is truly the best big brother!',
        author: 'Monkey D. Luffy',
        title: 'Emperor of the Sea',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces'
      }
    ],
    themeTokensCSS: {
      '--accent': '#0284c7',
      '--accent-glow': 'rgba(2, 132, 199, 0.38)',
      '--bg-primary': '#08111e',
      '--text-primary': '#f8fafc'
    }
  },

  nami: {
    id: 'nami',
    slug: 'nami',
    name: 'Nami',
    japaneseName: 'ナミ',
    series: 'One Piece',
    universeBadge: 'Straw Hat Pirates',
    roleTitle: 'Cat Burglar & Master Climate Cartographer',
    headline: 'Navigator of the Pirate King',
    tagline: 'Predicting every typhoon before it forms, collecting every berry along the way.',
    statement: 'Life is like a pencil that will surely run out, but will leave the beautiful writing of life. Chart your course and never miss the gold.',
    bio: 'Navigator of the Straw Hat Pirates with an uncanny physiological sensitivity to barometric shifts. Uses the Clima-Tact to manipulate micro-climates, summon thunderclouds, and map the world’s final frontiers.',
    price: 37,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces',
    bustUrl: '/himmel_bust.png',
    cardUrl: '/himmel_card.jpg',
    layoutArchetype: 'flanked-centered',
    accentAnimationType: 'nami-clima-tact',
    colors: {
      isDark: false,
      bgPrimary: '#fffbf5',
      bgSecondary: '#ffedd5',
      bgSurface: 'rgba(255, 255, 255, 0.95)',
      bgGlass: 'rgba(255, 251, 245, 0.85)',
      textPrimary: '#431407',
      textSecondary: '#7c2d12',
      textMuted: '#9a3412',
      accent: '#f97316',
      accentSecondary: '#06b6d4',
      accentGlow: 'rgba(249, 115, 22, 0.35)',
      borderSubtle: '#fed7aa',
      borderStrong: 'rgba(249, 115, 22, 0.45)',
      cardShadow: '0 20px 45px -10px rgba(249, 115, 22, 0.16)',
      badgeBg: '#ffedd5',
      badgeText: '#9a3412',
      gradientHero: 'radial-gradient(ellipse at 50% 35%, rgba(249, 115, 22, 0.22) 0%, rgba(6, 182, 212, 0.12) 45%, transparent 70%)',
    },
    stats: [
      { label: 'Bounty', value: '฿ 366,000,000' },
      { label: 'World Map', value: '85% Charted' },
      { label: 'Typhoon Prediction', value: '100% Accurate' },
    ],
    skills: [
      { name: 'Clima-Tact Atmospheric Shaping', level: 99, category: 'Weather' },
      { name: 'Grand Line Barometric Cartography', level: 100, category: 'Navigation' },
      { name: 'Berry Budget Optimization', level: 100, category: 'Finance' },
      { name: 'Thunderbolt Tempo Shaders', level: 95, category: 'Graphics' },
    ],
    projects: [
      {
        id: 'clima-tact-weather',
        title: 'Clima-Tact Dynamic Weather Simulator',
        category: 'Atmospheric Physics',
        subtag: 'Micro-Climate Engine',
        desc: 'Real-time thermodynamic fluid model simulating heat balls, cool balls, and thunder clouds in realistic wind tunnels.',
        tags: ['WebGL', 'GLSL', 'Fluid Simulation', 'Three.js'],
        metrics: 'Realistic Lightning Strike',
        color: '#06b6d4'
      },
      {
        id: 'grand-line-nav',
        title: 'Log Pose Multi-Vector Compass',
        category: 'Geospatial Web',
        subtag: 'Magnetic Field GIS',
        desc: 'Triple-needle Log Pose GIS navigation system charting volatile magnetic anomalies across the New World.',
        tags: ['Mapbox GL', 'GeoJSON', 'TypeScript'],
        metrics: 'Zero Lost Ships',
        color: '#f97316'
      },
      {
        id: 'berry-ledger',
        title: 'Straw Hat Berry Treasury & Escrow',
        category: 'Fintech & Bookkeeping',
        subtag: 'Accounting Ledger',
        desc: 'Ruthless pirate bookkeeping app tracking Franky’s cola expenses, Luffy’s meat budget, and Zoro’s sword repair costs.',
        tags: ['Next.js', 'PostgreSQL', 'Tailwind', 'Stripe'],
        metrics: '100% Tax Deductible',
        color: '#eab308'
      },
      {
        id: 'zeus-cloud-companion',
        title: 'Zeus Thundercloud Voice AI',
        category: 'Voice AI & IoT',
        subtag: 'Smart Weather Cloud',
        desc: 'Playful voice-enabled thunderstorm assistant that serves tea snacks and zaps intruders upon verbal command.',
        tags: ['Web Speech API', 'Audio Worklet', 'WebSockets'],
        metrics: 'Millions of Volts',
        color: '#3b82f6'
      }
    ],
    experiences: [
      {
        year: 'Onigashima Raid',
        role: 'Navigator & Zeus Commander',
        organization: 'Straw Hat Pirates',
        description: 'Tamed Big Mom\'s homie Zeus, unleashed devastating thunderbolts against Ulti, and safely navigated through boiling seas.'
      },
      {
        year: 'Weatheria Island',
        role: 'Meteorological Scholar',
        organization: 'Sky Island Weatheria',
        description: 'Spent two years studying high-altitude atmospheric sciences under weather wizards, developing the Sorcery Clima-Tact.'
      }
    ],
    testimonials: [
      {
        quote: 'Without Nami, the Straw Hat ship wouldn\'t have made it three days into the Grand Line. She is the ultimate navigator.',
        author: 'Monkey D. Luffy',
        title: 'Captain',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces'
      },
      {
        quote: 'Nami-san is as brilliant as she is stunning! Every tangerine on our deck flourishes under her gentle care.',
        author: 'Sanji',
        title: 'Cook of the Straw Hats',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces'
      }
    ],
    themeTokensCSS: {
      '--accent': '#f97316',
      '--accent-glow': 'rgba(249, 115, 22, 0.35)',
      '--bg-primary': '#fffbf5',
      '--text-primary': '#431407'
    }
  },

  'zero-two': {
    id: 'zero-two',
    slug: 'zero-two',
    name: 'Zero Two',
    japaneseName: 'ゼロツー',
    series: 'Darling in the Franxx',
    universeBadge: 'APE Plantation 13',
    roleTitle: 'Partner Killer & Neural Cybernetic Pilot',
    headline: 'Code 002: Strelitzia Lead',
    tagline: 'Will you ride with me, Darling? Or do you fear being consumed by the flames?',
    statement: 'If you don\'t belong here, then a place like this doesn\'t matter. Let\'s fly together beyond the scorched earth.',
    bio: 'The red-horned Klaxosaur-human hybrid pilot of Strelitzia. Known for fierce passion, sweet honey-flavored lollipops, and high-octane cybernetic telemetry interfaces that synchronize dual minds into divine mecha combat.',
    price: 45,
    featuredTag: 'Cyberpunk',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces',
    bustUrl: '/himmel_bust.png',
    cardUrl: '/himmel_card.jpg',
    layoutArchetype: 'cyberpunk-hud',
    accentAnimationType: 'zero-two-cyber-hex',
    colors: {
      isDark: true,
      bgPrimary: '#0e0508',
      bgSecondary: '#1c0a12',
      bgSurface: 'rgba(28, 10, 18, 0.9)',
      bgGlass: 'rgba(14, 5, 8, 0.82)',
      textPrimary: '#fff1f2',
      textSecondary: '#fecdd3',
      textMuted: '#fda4af',
      accent: '#f43f5e',
      accentSecondary: '#fb7185',
      accentGlow: 'rgba(244, 63, 94, 0.42)',
      borderSubtle: '#4c0d1e',
      borderStrong: 'rgba(244, 63, 94, 0.6)',
      cardShadow: '0 20px 45px -10px rgba(244, 63, 94, 0.28)',
      badgeBg: 'rgba(244, 63, 94, 0.2)',
      badgeText: '#fecdd3',
      gradientHero: 'radial-gradient(ellipse at 50% 30%, rgba(244, 63, 94, 0.35) 0%, rgba(251, 113, 133, 0.15) 50%, transparent 75%)',
    },
    stats: [
      { label: 'Pilot Code', value: '002' },
      { label: 'Synchronization', value: '99.8%' },
      { label: 'Klaxosaur Kills', value: '500+' },
    ],
    skills: [
      { name: 'Dual Neural Telemetry Sync', level: 99, category: 'BioTech' },
      { name: 'Strelitzia Cockpit HUD Shaders', level: 98, category: 'Graphics' },
      { name: 'Klaxosaur Hybrid Resilience', level: 96, category: 'Systems' },
      { name: 'Sweet Honey Dipping Analytics', level: 100, category: 'Confection' },
    ],
    projects: [
      {
        id: 'strelitzia-hud',
        title: 'Strelitzia Iron Maiden Cockpit HUD',
        category: 'Cybernetic Interface',
        subtag: 'Real-time Cockpit HUD',
        desc: 'Futuristic high-DPI holographic HUD rendering bio-pulse telemetry, magma fuel reserves, and Klaxosaur thermal signatures.',
        tags: ['Three.js', 'React Three Fiber', 'GLSL', 'Tailwind'],
        metrics: 'Zero Sync Lag',
        color: '#f43f5e'
      },
      {
        id: 'neural-sync-meter',
        title: 'Pistil & Stamen Biometric Synapse',
        category: 'Bio-Signal Processing',
        subtag: 'EEG Neural Network',
        desc: 'Deep neural EEG filter that stabilizes heartbeat and blood pressure fluctuations between dual pilots in high-stress combat.',
        tags: ['Python', 'SciPy', 'FastAPI', 'WebSockets'],
        metrics: '99.8% Sync Rate',
        color: '#fb7185'
      },
      {
        id: 'honey-lollipop',
        title: 'Sugar & Honey Sweetness Regulator',
        category: 'Micro-Application',
        subtag: 'Sensory Palette App',
        desc: 'A vibrant retro candy companion keeping track of sweet honey stocks and darling date reminders.',
        tags: ['React', 'CSS Gradients', 'PWA'],
        metrics: '100% Sweetness',
        color: '#e11d48'
      },
      {
        id: 'golden-bough',
        title: 'The Beast and the Prince Interactive Book',
        category: 'Digital Narrative',
        subtag: 'Fairy Tale Reader',
        desc: 'Interactive digital storybook with handmade illustrated watercolours and delicate paper-turn micro-interactions.',
        tags: ['HTML5 Canvas', 'GSAP', 'TypeScript'],
        metrics: 'Tear-Jerking Story',
        color: '#be123c'
      }
    ],
    experiences: [
      {
        year: 'Space Combat Era',
        role: 'Strelitzia True Apus Pilot',
        organization: 'Squad 13 & Earth Resistance',
        description: 'Piloted Strelitzia across cosmic frontiers to safeguard human emotional heritage from VIRM assimilation.'
      },
      {
        year: 'Special Force',
        role: 'APE Elite 9\'s Vanguard',
        organization: 'APE High Command',
        description: 'Achieved legendary combat score as the solo pilot capable of operating Strelitzia in rampaging beast form.'
      }
    ],
    testimonials: [
      {
        quote: 'Zero Two showed me what it truly means to live and fly. With her, I am not afraid of anything in this universe.',
        author: 'Hiro (Code 016)',
        title: 'Stamen, Strelitzia',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces'
      },
      {
        quote: 'She is wild and unpredictable, but her dedication to Hiro is the brightest flame in our plantation.',
        author: 'Ichigo (Code 015)',
        title: 'Squad 13 Leader',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces'
      }
    ],
    themeTokensCSS: {
      '--accent': '#f43f5e',
      '--accent-glow': 'rgba(244, 63, 94, 0.42)',
      '--bg-primary': '#0e0508',
      '--text-primary': '#fff1f2'
    }
  },

  tanjiro: {
    id: 'tanjiro',
    slug: 'tanjiro',
    name: 'Tanjiro Kamado',
    japaneseName: '竈門炭治郎',
    series: 'Demon Slayer',
    universeBadge: 'Demon Slayer Corps',
    roleTitle: 'Sun Breathing Pioneer & Water Breathing Master',
    headline: 'Wielder of Hinokami Kagura',
    tagline: 'No matter how many times you fall, stand up again! Set your heart ablaze.',
    statement: 'Those who regret their own actions, I will never trample over them. Because demons were once human too.',
    bio: 'Demon Slayer who mastered both traditional Water Breathing and the ancestral Sun Breathing (Hinokami Kagura). Blessed with an extraordinary sense of smell that perceives the "opening thread" to slice through intractable bugs.',
    price: 42,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
    bustUrl: '/himmel_bust.png',
    cardUrl: '/himmel_card.jpg',
    layoutArchetype: 'flanked-centered',
    accentAnimationType: 'tanjiro-dual-breathing',
    colors: {
      isDark: true,
      bgPrimary: '#08140c',
      bgSecondary: '#122619',
      bgSurface: 'rgba(18, 38, 25, 0.88)',
      bgGlass: 'rgba(8, 20, 12, 0.8)',
      textPrimary: '#f0fdf4',
      textSecondary: '#bbf7d0',
      textMuted: '#86efac',
      accent: '#16a34a',
      accentSecondary: '#dc2626',
      accentGlow: 'rgba(22, 163, 74, 0.38)',
      borderSubtle: '#1f482d',
      borderStrong: 'rgba(22, 163, 74, 0.55)',
      cardShadow: '0 20px 45px -10px rgba(22, 163, 74, 0.22)',
      badgeBg: 'rgba(22, 163, 74, 0.18)',
      badgeText: '#86efac',
      gradientHero: 'radial-gradient(ellipse at 50% 30%, rgba(22, 163, 74, 0.25) 0%, rgba(220, 38, 38, 0.15) 50%, transparent 75%)',
    },
    stats: [
      { label: 'Sun Forms', value: '13 Dance Steps' },
      { label: 'Opening Thread', value: '100% Sight' },
      { label: 'Blade Color', value: 'Jet Black' },
    ],
    skills: [
      { name: 'Hinokami Kagura Flame Shaders', level: 99, category: 'Graphics' },
      { name: 'Opening Thread Scent Profiler', level: 100, category: 'Diagnostics' },
      { name: 'Total Concentration Constant', level: 98, category: 'Performance' },
      { name: 'Unbreakable Compassion Core', level: 100, category: 'Ethics' },
    ],
    projects: [
      {
        id: 'opening-thread-detector',
        title: 'Opening Thread Root Cause Profiler',
        category: 'APM Diagnostics',
        subtag: 'Anomaly Root-Cause Finder',
        desc: 'Innovative telemetry engine that sniffs code smells and paints a glowing visual thread pointing straight to the guilty bottleneck.',
        tags: ['Rust', 'eBPF', 'OpenTelemetry', 'React'],
        metrics: 'Zero-Guess Diagnostics',
        color: '#16a34a'
      },
      {
        id: 'dual-breathing-waves',
        title: 'Dual Breathing Fluid Simulation',
        category: 'Interactive WebGL',
        subtag: 'Fluid Ribbon Shaders',
        desc: 'Breathtaking 3D canvas simulation blending fluid Ukiyo-e water wave ribbons with crackling solar flame ribbons.',
        tags: ['Three.js', 'GLSL', 'Framer Motion'],
        metrics: '60 FPS Ultra Fluid',
        color: '#dc2626'
      },
      {
        id: 'nezuko-box-safe',
        title: 'Nezuko Mist-Wood Protected Storage',
        category: 'Cold Storage Vault',
        subtag: 'Hardware Enclave',
        desc: 'Ultra-durable, sun-shielded hardware storage vault protecting delicate data structures during daylight hours.',
        tags: ['Rust', 'EncFS', 'ECC RAM'],
        metrics: '100% Sunlight Proof',
        color: '#b91c1c'
      },
      {
        id: 'corps-crow-mesh',
        title: 'Kasugai Crow P2P Dispatch',
        category: 'Emergency Comms',
        subtag: 'Decentralized Radio',
        desc: 'Autonomous avian mesh networking protocol relaying demonic alert telemetry through mountain passes.',
        tags: ['LoRaWAN', 'C++', 'Node.js'],
        metrics: 'Zero Delayed Crows',
        color: '#15803d'
      }
    ],
    experiences: [
      {
        year: 'Infinity Castle Campaign',
        role: 'Sun Breathing Demon Slayer',
        organization: 'Demon Slayer Corps',
        description: 'Connected all 12 forms of Hinokami Kagura into the thirteenth form, facing Muzan Kibutsuji until dawn broke.'
      },
      {
        year: 'Final Selection',
        role: 'Disciple of Sakonji Urokodaki',
        organization: 'Mt. Sagiri Training Grounds',
        description: 'Severed the giant boulder in half with a clean water strike, earning Nichirin blade and passing Mt. Fujikasane.'
      }
    ],
    testimonials: [
      {
        quote: 'Kamado, my boy! Set your heart ablaze and keep moving forward! You have the spirit of a true Hashira!',
        author: 'Kyojuro Rengoku',
        title: 'Flame Hashira',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces'
      },
      {
        quote: 'Tanjiro taught me that compassion and lethal discipline are not opposites. He returned warmth to my frozen world.',
        author: 'Kanao Tsuyuri',
        title: 'Flower Breathing Slayer',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces'
      }
    ],
    themeTokensCSS: {
      '--accent': '#16a34a',
      '--accent-glow': 'rgba(22, 163, 74, 0.38)',
      '--bg-primary': '#08140c',
      '--text-primary': '#f0fdf4'
    }
  },

  zenitsu: {
    id: 'zenitsu',
    slug: 'zenitsu',
    name: 'Zenitsu Agatsuma',
    japaneseName: '我妻善逸',
    series: 'Demon Slayer',
    universeBadge: 'Demon Slayer Corps',
    roleTitle: 'Thunder Breathing Godspeed & Reflex Architect',
    headline: 'Master of First Form',
    tagline: 'If you can only master one thing, hone it to the utmost peak!',
    statement: 'Don\'t weep, don\'t despair. Hone that single form until it becomes sharper and faster than the lightning itself.',
    bio: 'Demon Slayer trained under former Thunder Hashira Jigoro Kuwajima. Although prone to paralyzing anxiety while awake, his subconscious Godspeed state strikes with blinding thunderclaps faster than the human eye can perceive.',
    price: 37,
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces',
    bustUrl: '/himmel_bust.png',
    cardUrl: '/himmel_card.jpg',
    layoutArchetype: 'dynamic-hero',
    accentAnimationType: 'zenitsu-thunderclap',
    colors: {
      isDark: true,
      bgPrimary: '#0f0e04',
      bgSecondary: '#1f1a08',
      bgSurface: 'rgba(31, 26, 8, 0.9)',
      bgGlass: 'rgba(15, 14, 4, 0.8)',
      textPrimary: '#fefce8',
      textSecondary: '#fef08a',
      textMuted: '#fde047',
      accent: '#eab308',
      accentSecondary: '#f59e0b',
      accentGlow: 'rgba(234, 179, 8, 0.42)',
      borderSubtle: '#42330b',
      borderStrong: 'rgba(234, 179, 8, 0.6)',
      cardShadow: '0 20px 45px -10px rgba(234, 179, 8, 0.26)',
      badgeBg: 'rgba(234, 179, 8, 0.2)',
      badgeText: '#fef08a',
      gradientHero: 'radial-gradient(ellipse at 50% 30%, rgba(234, 179, 8, 0.32) 0%, rgba(245, 158, 11, 0.15) 50%, transparent 75%)',
    },
    stats: [
      { label: 'Godspeed Velocity', value: 'Mach 3.5' },
      { label: 'Thunderclap Form', value: 'Sixfold / Eightfold' },
      { label: 'Seventh Form', value: 'Honoikazuchi no Kami' },
    ],
    skills: [
      { name: 'Thunderclap Godspeed Acceleration', level: 100, category: 'Speed' },
      { name: 'Acute Audio Frequencies Scenting', level: 99, category: 'Audio' },
      { name: 'Seventh Form Flaming Thunder God', level: 97, category: 'Creation' },
      { name: 'Subconscious Sleep-Execution', level: 95, category: 'Threading' },
    ],
    projects: [
      {
        id: 'godspeed-scheduler',
        title: 'Thunderclap Sixfold Micro-Scheduler',
        category: 'Kernel Schedulers',
        subtag: 'Instant Preemption Engine',
        desc: 'Hyper-responsive task dispatcher preempting long-running computational jobs within single processor clock cycles.',
        tags: ['Rust', 'Linux CFS', 'Assembly x86_64'],
        metrics: 'Mach-Speed Preemption',
        color: '#eab308'
      },
      {
        id: 'acute-hearing',
        title: 'Auditory Heartbeat Demultiplexer',
        category: 'Audio DSP',
        subtag: 'Acoustic Intelligence',
        desc: 'Advanced microphone array detecting deceit and demonic motives through microscopic heartbeat timbre anomalies.',
        tags: ['Web Audio API', 'TensorFlow.js', 'FFT'],
        metrics: 'Sub-Hz Discrimination',
        color: '#f59e0b'
      },
      {
        id: 'sparrow-telecom',
        title: 'Chuntaro Sparrow Micro-Telemetry',
        category: 'Tiny IoT',
        subtag: 'Featherweight Messaging',
        desc: 'Ultra-low battery mesh tracker transmitting distress chirps across mountain ridges with zero power draw.',
        tags: ['Zigbee', 'Embedded Rust', 'Solar Panel'],
        metrics: 'Infinite Standby',
        color: '#ca8a04'
      },
      {
        id: 'nezuko-serenade',
        title: 'Nezuko-chan Flower Delivery Gazette',
        category: 'Interactive Love Letter',
        subtag: 'Artisan Web Showcase',
        desc: 'A charming interactive web greeting packed with blooming dandelions and bashful golden sparks.',
        tags: ['Next.js', 'Framer Motion', 'Tailwind'],
        metrics: 'Pure Devotion',
        color: '#fbbf24'
      }
    ],
    experiences: [
      {
        year: 'Infinity Castle Duel',
        role: 'Creator of Seventh Form',
        organization: 'Demon Slayer Corps',
        description: 'Single-handedly defeated Upper Moon Six Kaigaku using his self-invented form, Honoikazuchi no Kami.'
      },
      {
        year: 'Natagumo Mountain',
        role: 'Godspeed Slayer',
        organization: 'Demon Slayer Corps',
        description: 'Overcame paralyzing poison to defeat the brother spider demon with Sixfold Thunderclap and Flash.'
      }
    ],
    testimonials: [
      {
        quote: 'Zenitsu is a master who took a single strike and forged it into pure divine lightning. I am honored to fight alongside him.',
        author: 'Tanjiro Kamado',
        title: 'Sun Breathing Slayer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces'
      },
      {
        quote: 'If you master one form, hone it to the absolute limit. Never forget the sound of your lightning.',
        author: 'Jigoro Kuwajima',
        title: 'Former Thunder Hashira',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces'
      }
    ],
    themeTokensCSS: {
      '--accent': '#eab308',
      '--accent-glow': 'rgba(234, 179, 8, 0.42)',
      '--bg-primary': '#0f0e04',
      '--text-primary': '#fefce8'
    }
  },

  inosuke: {
    id: 'inosuke',
    slug: 'inosuke',
    name: 'Inosuke Hashibira',
    japaneseName: '嘴平伊之助',
    series: 'Demon Slayer',
    universeBadge: 'Demon Slayer Corps',
    roleTitle: 'Beast Breathing Pioneer & Raw Instinct Engineer',
    headline: 'King of the Mountains',
    tagline: 'Comin\' through! Charge headfirst into the fire and tear through roadblocks!',
    statement: 'There are no shortcuts! We clash, we bleed, we grow stronger! Lord Inosuke never cowers before an enemy!',
    bio: 'Raised by mountain boars and self-taught creator of Beast Breathing. Armed with twin serrated Nichirin katanas, extraordinary spatial perception, and dislocatable joints that allow him to squeeze through impossible network constraints.',
    price: 35,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
    bustUrl: '/himmel_bust.png',
    cardUrl: '/himmel_card.jpg',
    layoutArchetype: 'warrior-vanguard',
    accentAnimationType: 'inosuke-beast-slashes',
    colors: {
      isDark: true,
      bgPrimary: '#081018',
      bgSecondary: '#0f1c2b',
      bgSurface: 'rgba(15, 28, 43, 0.88)',
      bgGlass: 'rgba(8, 16, 24, 0.8)',
      textPrimary: '#f0f9ff',
      textSecondary: '#bae6fd',
      textMuted: '#7dd3fc',
      accent: '#0284c7',
      accentSecondary: '#854d0e',
      accentGlow: 'rgba(2, 132, 199, 0.38)',
      borderSubtle: '#1e3852',
      borderStrong: 'rgba(2, 132, 199, 0.55)',
      cardShadow: '0 20px 45px -10px rgba(2, 132, 199, 0.22)',
      badgeBg: 'rgba(2, 132, 199, 0.18)',
      badgeText: '#7dd3fc',
      gradientHero: 'radial-gradient(ellipse at 50% 30%, rgba(2, 132, 199, 0.28) 0%, rgba(133, 77, 14, 0.15) 50%, transparent 75%)',
    },
    stats: [
      { label: 'Spatial Sense', value: 'Entire Mountain' },
      { label: 'Joint Dislocation', value: 'Any Angle' },
      { label: 'Boar Charge Force', value: '100% Impact' },
    ],
    skills: [
      { name: 'Spatial Awareness Sonar', level: 99, category: 'Sensing' },
      { name: 'Twin Serrated Slash Concurrency', level: 97, category: 'Execution' },
      { name: 'Joint Dislocation Bypassing', level: 96, category: 'Hardware' },
      { name: 'Boar Mask Intimidation UI', level: 100, category: 'Design' },
    ],
    projects: [
      {
        id: 'beast-spatial-radar',
        title: 'Seventh Form Spatial Awareness Radar',
        category: 'Geospatial Radar',
        subtag: 'Atmospheric Vibration Radar',
        desc: 'Skin-vibration atmospheric sonar sensing moving targets up to 5 miles away through solid bedrock.',
        tags: ['Rust', 'Spatial DSP', 'WebGL', 'Three.js'],
        metrics: 'Sub-Meter Accuracy',
        color: '#0284c7'
      },
      {
        id: 'serrated-katana',
        title: 'Twin Serrated Knife Stream Slicer',
        category: 'Stream Processing',
        subtag: 'Serrated Data Carver',
        desc: 'Aggressive multi-threaded event-stream shredder carving big-data logs into ingestible pieces with ragged tooth efficiency.',
        tags: ['Go', 'Apache Kafka', 'SIMD'],
        metrics: '2 Million Events/sec',
        color: '#38bdf8'
      },
      {
        id: 'boar-charge-benchmark',
        title: 'Boar Rush Maximum Stress Tester',
        category: 'Chaos Engineering',
        subtag: 'Brute Force Attack Simulator',
        desc: 'Unrelenting brute-force chaos engineer charging headfirst into firewalls to discover where concrete fractures.',
        tags: ['Python', 'Chaos Monkey', 'Docker'],
        metrics: 'Uncompromising Impact',
        color: '#854d0e'
      },
      {
        id: 'tempura-devour',
        title: 'Fried Tempura Devour Scoreboard',
        category: 'Culinary Gamification',
        subtag: 'Competitive Eating',
        desc: 'Hilarious calorie scoreboard tracking who can eat crispy fried shrimp tempura the fastest without choking.',
        tags: ['React', 'Framer Motion', 'Tailwind'],
        metrics: 'Top Score: 48 Tempura',
        color: '#eab308'
      }
    ],
    experiences: [
      {
        year: 'Upper Moon Two Battle',
        role: 'Vanguard Beast Slayer',
        organization: 'Demon Slayer Corps',
        description: 'Fought alongside Kanao to avenge Shinobu Kocho, shredding Doma\'s icy crystalline clones with unpredictable angled strikes.'
      },
      {
        year: 'Mountain Origins',
        role: 'King of the Wild Mountain',
        organization: 'Mt. Omoto Wildlife',
        description: 'Survived the wilderness alone from infancy, wrestling bears and crafting serrated blades from chipped Nichirin ore.'
      }
    ],
    testimonials: [
      {
        quote: 'Inosuke\'s spatial awareness saved my life on Mt. Natagumo. His raw instincts are faster than any formal school of swordsmanship.',
        author: 'Tanjiro Kamado',
        title: 'Comrade in Arms',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces'
      },
      {
        quote: 'He may scream like a maniac and mispronounce everyone\'s names, but there is nobody braver when the clash begins.',
        author: 'Zenitsu Agatsuma',
        title: 'Thunder Slayer',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces'
      }
    ],
    themeTokensCSS: {
      '--accent': '#0284c7',
      '--accent-glow': 'rgba(2, 132, 199, 0.38)',
      '--bg-primary': '#081018',
      '--text-primary': '#f0f9ff'
    }
  },

  giyuu: {
    id: 'giyuu',
    slug: 'giyuu',
    name: 'Giyuu Tomioka',
    japaneseName: '冨岡義勇',
    series: 'Demon Slayer',
    universeBadge: 'Demon Slayer Corps',
    roleTitle: 'Water Hashira & Creator of Dead Calm',
    headline: 'The Stillness of the Deep',
    tagline: 'When the world is in chaos, become the unmoving water that neutralizes all storms.',
    statement: 'Don\'t cry. Don\'t surrender to sorrow. Become like calm water—reflecting reality without distortion.',
    bio: 'The Water Hashira of the Demon Slayer Corps. Creator of the legendary Eleventh Form: Dead Calm (Nagi), an ultimate defensive state where incoming attacks are absorbed into absolute stillness and negated.',
    price: 45,
    featuredTag: 'Top Hashira',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
    bustUrl: '/himmel_bust.png',
    cardUrl: '/himmel_card.jpg',
    layoutArchetype: 'zen-minimal',
    accentAnimationType: 'giyuu-dead-calm',
    colors: {
      isDark: true,
      bgPrimary: '#040d1a',
      bgSecondary: '#0a192f',
      bgSurface: 'rgba(10, 25, 47, 0.88)',
      bgGlass: 'rgba(4, 13, 26, 0.8)',
      textPrimary: '#f8fafc',
      textSecondary: '#cbd5e1',
      textMuted: '#94a3b8',
      accent: '#0284c7',
      accentSecondary: '#b91c1c',
      accentGlow: 'rgba(2, 132, 199, 0.38)',
      borderSubtle: '#1e385b',
      borderStrong: 'rgba(2, 132, 199, 0.55)',
      cardShadow: '0 20px 45px -10px rgba(2, 132, 199, 0.22)',
      badgeBg: 'rgba(2, 132, 199, 0.18)',
      badgeText: '#7dd3fc',
      gradientHero: 'radial-gradient(ellipse at 50% 30%, rgba(2, 132, 199, 0.28) 0%, rgba(185, 28, 28, 0.15) 50%, transparent 75%)',
    },
    stats: [
      { label: 'Water Form', value: '11th Form - Dead Calm' },
      { label: 'Attacks Negated', value: '100%' },
      { label: 'Demon Kills', value: 'Hashira Rank' },
    ],
    skills: [
      { name: 'Dead Calm Zero-Downtime Defense', level: 100, category: 'Resilience' },
      { name: 'Water Breathing Fluid Dynamics', level: 99, category: 'Physics' },
      { name: 'Dual Split Haori Geometrics', level: 97, category: 'Design' },
      { name: 'Stoic Silence In High Pressure', level: 100, category: 'Mindset' },
    ],
    projects: [
      {
        id: 'dead-calm-shield',
        title: 'Nagi (Dead Calm) Zero-Downtime Firewall',
        category: 'Network Security',
        subtag: 'Attack Absorber',
        desc: 'A revolutionary zero-trust packet sink that neutralizes incoming malicious payloads into absolute tranquility without spending CPU spikes.',
        tags: ['Rust', 'eBPF', 'XDP', 'Zero Latency'],
        metrics: '100% Attacks Dissolved',
        color: '#0284c7'
      },
      {
        id: 'split-haori-design',
        title: 'Split Haori Geometric Design System',
        category: 'Design Systems',
        subtag: 'Dual Pattern Tokens',
        desc: 'Asymmetrical design framework paying homage to Sabito and Tsutako, combining geometric diamonds with solid crimson calm.',
        tags: ['CSS Architecture', 'Figma Tokens', 'Tailwind'],
        metrics: 'Surgical Aesthetic Balance',
        color: '#b91c1c'
      },
      {
        id: 'salmon-daikon',
        title: 'Simmered Salmon Daikon Gastronomy',
        category: 'Micro-Experience',
        subtag: 'Comfort Food App',
        desc: 'The only culinary experience capable of evoking a faint, rare smile on Giyuu’s stoic countenance.',
        tags: ['React', 'WebGL Steam', 'Tailwind'],
        metrics: 'Evokes Rare Smiles',
        color: '#f97316'
      },
      {
        id: 'water-ripple-canvas',
        title: 'Tranquil Water Ripple Soundscape',
        category: 'Ambient Web Experience',
        subtag: 'Audio-Visual Zen',
        desc: 'Interactive generative water canvas producing soothing concentric ripples and deep water ambient tones.',
        tags: ['Three.js', 'WebAudio', 'GLSL'],
        metrics: '60 FPS Zen Stillness',
        color: '#38bdf8'
      }
    ],
    experiences: [
      {
        year: 'Final Battle vs Akaza',
        role: 'Water Hashira',
        organization: 'Demon Slayer Corps',
        description: 'Unlocked the Demon Slayer Mark and fought Upper Moon Three Akaza alongside Tanjiro, deploying Dead Calm in peak combat.'
      },
      {
        year: 'Mt. Sagiri Mentorship',
        role: 'Sakonji\'s Successor',
        organization: 'Water Breathing Lineage',
        description: 'Inherited the mantle of Water Hashira and spared the Kamado siblings, sending them to master Urokodaki.'
      }
    ],
    testimonials: [
      {
        quote: 'Tomioka-san may say he is disliked by everyone, but his quiet sacrifice and absolute defense have saved all of our lives.',
        author: 'Shinobu Kocho',
        title: 'Insect Hashira',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces'
      },
      {
        quote: 'Giyuu-san taught me what it means to hold a sword. When his Eleventh Form activates, the battlefield turns completely silent.',
        author: 'Tanjiro Kamado',
        title: 'Demon Slayer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces'
      }
    ],
    themeTokensCSS: {
      '--accent': '#0284c7',
      '--accent-glow': 'rgba(2, 132, 199, 0.38)',
      '--bg-primary': '#040d1a',
      '--text-primary': '#f8fafc'
    }
  },

  shinobu: {
    id: 'shinobu',
    slug: 'shinobu',
    name: 'Shinobu Kocho',
    japaneseName: '胡蝶しのぶ',
    series: 'Demon Slayer',
    universeBadge: 'Demon Slayer Corps',
    roleTitle: 'Insect Hashira & Wisteria Pharmaceutical Architect',
    headline: 'The Butterfly Dancer',
    tagline: 'Delicate like a butterfly, lethal like a stinger. Elegance is the ultimate poison.',
    statement: 'I may be the only Hashira who cannot decapitate demons, but a poison that melts a demon’s body in seconds works just as cleanly.',
    bio: 'The Insect Hashira of the Demon Slayer Corps and mistress of the Butterfly Estate. Renowned for her pharmacology genius, wisteria toxin engineering, and fluttering glassmorphic elegance that masks deadly precision.',
    price: 42,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces',
    bustUrl: '/himmel_bust.png',
    cardUrl: '/himmel_card.jpg',
    layoutArchetype: 'zen-minimal',
    accentAnimationType: 'shinobu-wisteria-butterflies',
    colors: {
      isDark: true,
      bgPrimary: '#0d0718',
      bgSecondary: '#1a0e2e',
      bgSurface: 'rgba(26, 14, 46, 0.88)',
      bgGlass: 'rgba(13, 7, 24, 0.8)',
      textPrimary: '#faf5ff',
      textSecondary: '#e9d5ff',
      textMuted: '#c084fc',
      accent: '#8b5cf6',
      accentSecondary: '#2dd4bf',
      accentGlow: 'rgba(139, 92, 246, 0.38)',
      borderSubtle: '#3b1c61',
      borderStrong: 'rgba(139, 92, 246, 0.55)',
      cardShadow: '0 20px 45px -10px rgba(139, 92, 246, 0.22)',
      badgeBg: 'rgba(139, 92, 246, 0.18)',
      badgeText: '#e9d5ff',
      gradientHero: 'radial-gradient(ellipse at 50% 30%, rgba(139, 92, 246, 0.28) 0%, rgba(45, 212, 191, 0.15) 50%, transparent 75%)',
    },
    stats: [
      { label: 'Thrust Velocity', value: 'Fastest in Corps' },
      { label: 'Wisteria Toxins', value: '37 Custom Blends' },
      { label: 'Butterfly Clinic', value: '1,200 Healed' },
    ],
    skills: [
      { name: 'Wisteria Pharmaceutical Chemistry', level: 100, category: 'Biotech' },
      { name: 'High-Velocity Needle Thrusts', level: 99, category: 'Combat' },
      { name: 'Butterfly Estate Rehabilitation', level: 98, category: 'Medical' },
      { name: 'Delicate Glassmorphic Styling', level: 97, category: 'Design' },
    ],
    projects: [
      {
        id: 'wisteria-toxin-synthesizer',
        title: 'Wisteria Toxin Molecular Synthesizer',
        category: 'Bioinformatics',
        subtag: 'Molecular Simulator',
        desc: 'Computational chemistry engine calculating lethal wisteria molecular concentrations tailored to counteract Upper Moon cellular regeneration.',
        tags: ['Python', 'RDKit', 'Molecular Dynamics', 'C++'],
        metrics: '37x Molecular Potency',
        color: '#8b5cf6'
      },
      {
        id: 'butterfly-estate-rehab',
        title: 'Butterfly Estate Clinical Patient Flow',
        category: 'Healthcare ERP',
        subtag: 'Hospital Management',
        desc: 'Automated bed allocation, medicinal dosing schedule, and physical rehab tracking system for recovering Demon Slayers.',
        tags: ['Next.js', 'PostgreSQL', 'Tailwind', 'Prisma'],
        metrics: '3x Faster Rehabilitation',
        color: '#2dd4bf'
      },
      {
        id: 'butterfly-wings-shader',
        title: 'Ethereal Butterfly Wing Refraction Shader',
        category: 'WebGL Graphics',
        subtag: 'Prismatic Iridescence',
        desc: 'Hypnotic iridescent butterfly wings shader simulating light dispersion and wisteria petal drift in real-time.',
        tags: ['Three.js', 'GLSL', 'Custom Shaders'],
        metrics: 'Sublime Visuals',
        color: '#a855f7'
      },
      {
        id: 'tamayo-serum-collab',
        title: 'Tamayo Anti-Kibutsuji Serum Protocol',
        category: 'Collaborative Biotech',
        subtag: 'Four-Stage Aging Drug',
        desc: 'Joint cryptographic research vault developing the quadruple-stage aging and humanizing drug that unseated Muzan.',
        tags: ['ZK-Proofs', 'Rust', 'Encrypted DAG'],
        metrics: 'Aging Rate: 50 Yrs/Min',
        color: '#c084fc'
      }
    ],
    experiences: [
      {
        year: 'Infinity Castle Confrontation',
        role: 'Insect Hashira & Master Strategist',
        organization: 'Demon Slayer Corps',
        description: 'Sacrificed her physical body saturated with 37 kilograms of wisteria toxin to poison Upper Moon Two Doma from within.'
      },
      {
        year: 'Butterfly Estate Reign',
        role: 'Director of Medical Operations',
        organization: 'Kocho Estate',
        description: 'Trained Kanao, Aoi, and the medical trio, turning the estate into the premier healing sanctuary for injured slayers.'
      }
    ],
    testimonials: [
      {
        quote: 'Shinobu\'s smile never wavered, even when her heart was bleeding. Her brilliance brought about the end of Muzan Kibutsuji.',
        author: 'Kanao Tsuyuri',
        title: 'Tsuguko Disciple',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'
      },
      {
        quote: 'She always teased me about people not liking me, but she was the kindest soul in the Hashira ranks.',
        author: 'Giyuu Tomioka',
        title: 'Water Hashira',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces'
      }
    ],
    themeTokensCSS: {
      '--accent': '#8b5cf6',
      '--accent-glow': 'rgba(139, 92, 246, 0.38)',
      '--bg-primary': '#0d0718',
      '--text-primary': '#faf5ff'
    }
  }
};

export const ANIME_UNIVERSES = [
  { id: 'all', name: 'All Universes', count: 20 },
  { id: 'Sousou no Frieren', name: 'Sousou no Frieren', count: 3 },
  { id: 'Attack on Titan', name: 'Attack on Titan', count: 3 },
  { id: 'Naruto Shippuden', name: 'Naruto Shippuden', count: 4 },
  { id: 'One Piece', name: 'One Piece', count: 4 },
  { id: 'Darling in the Franxx', name: 'Darling in the Franxx', count: 1 },
  { id: 'Demon Slayer', name: 'Demon Slayer', count: 5 }
];

export const TEMPLATE_SLUGS = Object.keys(ANIME_TEMPLATES);
