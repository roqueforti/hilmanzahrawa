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
  location: string;
  companionAvatars: string[];
  companionTrustText: string;
  brandPartners: { name: string; icon: string }[];
  focusPillsLeft: { label: string; color: string; bg: string; border: string }[];
  focusPillsRight: { label: string; color: string; bg: string; border: string }[];
  focusQuote: { main: string; highlight: string };
  sinceYear: string;
  ctaText?: string;
  colors: ThemeColors;
  stats: { label: string; value: string }[];
  skills: { name: string; level: number; category: string }[];
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  testimonials: TestimonialItem[];
  themeTokensCSS: Record<string, string>;
}

export const ANIME_UNIVERSES = [
  { id: 'all', name: 'All Universes', count: 20 },
  { id: 'Sousou no Frieren', name: 'Frieren', count: 3 },
  { id: 'Attack on Titan', name: 'Attack on Titan', count: 3 },
  { id: 'Naruto Shippuden', name: 'Naruto', count: 4 },
  { id: 'One Piece', name: 'One Piece', count: 4 },
  { id: 'Darling in the Franxx', name: 'Darling in the Franxx', count: 1 },
  { id: 'Demon Slayer', name: 'Demon Slayer', count: 5 },
];

export const ANIME_TEMPLATES: Record<string, AnimeTemplate> = {
  'frieren': {
    "id": "frieren",
    "slug": "frieren",
    "name": "Frieren",
    "japaneseName": "フリーレン",
    "series": "Sousou no Frieren",
    "universeBadge": "Beyond Journey's End",
    "roleTitle": "Archmage & Ancient Systems Architect",
    "headline": "Mage of the Century",
    "tagline": "Deciphering thousand-year grimoires into elegant digital architecture.",
    "statement": "passionate about deciphering forgotten spells and discovering what Himmel saw in humanity.",
    "bio": "An elven mage who defeated the Demon King alongside Himmel's party. Now traversing the realm to collect quaint spells and construct immortal, resilient software foundations that outlast generations.",
    "price": 39,
    "featuredTag": "Bestseller",
    "avatarUrl": "/anime/frieren.jpg",
    "bustUrl": "/anime/frieren.jpg",
    "cardUrl": "/anime/frieren.jpg",
    "layoutArchetype": "flanked-centered",
    "accentAnimationType": "frieren-aura",
    "location": "Strahl Region, Continental Magic Association",
    "companionAvatars": [
        "/anime/fern.jpg",
        "/anime/stark.jpg",
        "/himmel_bust.png"
    ],
    "companionTrustText": "Trusted by 100+ adventuring guilds across the continent for peerless magic architecture.",
    "brandPartners": [
        {
            "name": "Hero Himmel Archive",
            "icon": "✦"
        },
        {
            "name": "Continental Magic Association",
            "icon": "◬"
        },
        {
            "name": "Northern Guild of Vanguards",
            "icon": "⬡"
        },
        {
            "name": "Holy City Grimoires",
            "icon": "◌"
        },
        {
            "name": "Strahl Mage Council",
            "icon": "⊚"
        },
        {
            "name": "Flamme Research Lab",
            "icon": "❖"
        }
    ],
    "focusPillsLeft": [
        {
            "label": "Ancient Magic",
            "color": "#0284c7",
            "bg": "#f0f9ff",
            "border": "#bae6fd"
        },
        {
            "label": "Mana Concealment",
            "color": "#6366f1",
            "bg": "#eef2ff",
            "border": "#c7d2fe"
        },
        {
            "label": "Zoltraak Tuning",
            "color": "#0ea5e9",
            "bg": "#f0f9ff",
            "border": "#bae6fd"
        }
    ],
    "focusPillsRight": [
        {
            "label": "Party Tactics",
            "color": "#ca8a04",
            "bg": "#fefce8",
            "border": "#fef08a"
        },
        {
            "label": "Grimoire Archival",
            "color": "#16a34a",
            "bg": "#f0fdf4",
            "border": "#bbf7d0"
        },
        {
            "label": "Field Resilience",
            "color": "#ea580c",
            "bg": "#fff7ed",
            "border": "#fed7aa"
        }
    ],
    "focusQuote": {
        "main": "focus is on deciphering ancient spells, collecting quaint magic, and",
        "highlight": "understanding the human heart through centuries of time."
    },
    "sinceYear": "since the Hero Era",
    "ctaText": "Let's Talk",
    "colors": {
        "isDark": false,
        "bgPrimary": "#ffffff",
        "bgSecondary": "#f8fafc",
        "bgSurface": "#ffffff",
        "bgGlass": "rgba(255, 255, 255, 0.85)",
        "textPrimary": "#0f172a",
        "textSecondary": "#334155",
        "textMuted": "#64748b",
        "accent": "#0284c7",
        "accentSecondary": "#38bdf8",
        "accentGlow": "rgba(2, 132, 199, 0.25)",
        "borderSubtle": "#e2e8f0",
        "borderStrong": "rgba(2, 132, 199, 0.25)",
        "cardShadow": "0 20px 40px -10px rgba(2, 132, 199, 0.08)",
        "badgeBg": "#e0f2fe",
        "badgeText": "#0369a1",
        "gradientHero": "radial-gradient(ellipse at center, rgba(2, 132, 199, 0.32) 0%, rgba(56, 189, 248, 0.18) 35%, rgba(2, 132, 199, 0.06) 55%, transparent 72%)"
    },
    "stats": [
        {
            "label": "Years of Lore",
            "value": "1,000+"
        },
        {
            "label": "Grimoires Decoded",
            "value": "480+"
        },
        {
            "label": "Code Resilience",
            "value": "99.99%"
        }
    ],
    "skills": [
        {
            "name": "Mana Core Optimization",
            "level": 98,
            "category": "Core"
        },
        {
            "name": "Ancient Protocol Translation",
            "level": 95,
            "category": "Architecture"
        },
        {
            "name": "Zoltraak Defensive Sharding",
            "level": 92,
            "category": "Security"
        },
        {
            "name": "Autonomous Field Diagnostics",
            "level": 88,
            "category": "Operations"
        }
    ],
    "projects": [
        {
            "id": "grimoire-engine",
            "title": "Grimoire Index Engine",
            "category": "Spells",
            "subtag": "Archival System",
            "desc": "Decentralized spell repository enabling real-time classification, historical provenance tracking, and zero-loss mana indexing.",
            "tags": [
                "TypeScript",
                "GraphQL",
                "ManaDB"
            ],
            "metrics": "10x Faster Query",
            "color": "#0284c7"
        },
        {
            "id": "barrier-nullifier",
            "title": "Barrier Nullification Suite",
            "category": "Security",
            "subtag": "Defense Protocol",
            "desc": "Autonomous analysis framework that inspects demon spell barriers and derives mathematical deconstruction algorithms.",
            "tags": [
                "Rust",
                "WebAssembly",
                "Cryptography"
            ],
            "metrics": "99.8% Bypass Rate",
            "color": "#38bdf8"
        },
        {
            "id": "mimic-detector",
            "title": "Mimic Probability Radar",
            "category": "Sensors",
            "subtag": "Spatial Detection",
            "desc": "Computer vision model designed to distinguish authentic dungeon treasure chests from ravenous mimic entities.",
            "tags": [
                "Python",
                "PyTorch",
                "Edge AI"
            ],
            "metrics": "99.9% Accuracy",
            "color": "#eab308"
        },
        {
            "id": "botanical-preservation",
            "title": "Blue Moon Weed Synthesizer",
            "category": "BioTech",
            "subtag": "Botanical Restoration",
            "desc": "Automated greenhouse telemetry platform reviving extinct highland flora through micro-climate atmospheric emulation.",
            "tags": [
                "Next.js",
                "TailwindCSS",
                "IoT Telemetry"
            ],
            "metrics": "10,000+ Seeds Cultivated",
            "color": "#10b981"
        }
    ],
    "experiences": [
        {
            "year": "Hero Era",
            "role": "Chief Mage",
            "organization": "Hero Party (Himmel, Eisen, Heiter)",
            "description": "Decisive tactical architect in the ten-year campaign to eliminate the Demon King."
        },
        {
            "year": "Decade 50",
            "role": "Traveling Researcher",
            "organization": "Northern Plateau Survey",
            "description": "Cataloged rare folklore, indigenous incantations, and folk magic across border towns."
        },
        {
            "year": "Decade 80",
            "role": "Mentor & Architect",
            "organization": "Fern Apprenticeship Program",
            "description": "Trained first-class mages and implemented modern defensive arithmetic."
        },
        {
            "year": "Era Present",
            "role": "First-Class Mage",
            "organization": "Continental Magic Association",
            "description": "Leading expeditionary initiatives toward Aureole at the world's northern edge."
        }
    ],
    "testimonials": [
        {
            "quote": "Frieren-sama never acts rashly. Every line of code and every incantation is executed with thousand-year precision.",
            "author": "Fern",
            "title": "First-Class Mage",
            "avatar": "/anime/fern.jpg"
        },
        {
            "quote": "When the vanguard takes heavy damage, Frieren's defensive wards hold the line without a flicker of panic.",
            "author": "Stark",
            "title": "Vanguard Warrior",
            "avatar": "/anime/stark.jpg"
        },
        {
            "quote": "She taught me that magic is about what you can imagine. Her vision reaches further than any mortal hero.",
            "author": "Himmel the Hero",
            "title": "Hero of the Realm",
            "avatar": "/himmel_bust.png"
        }
    ],
    "themeTokensCSS": {
        "--accent": "#0284c7",
        "--accent-secondary": "#38bdf8",
        "--bg-primary": "#ffffff",
        "--bg-secondary": "#f8fafc",
        "--text-primary": "#0f172a",
        "--text-secondary": "#334155"
    }
},
  'stark': {
    "id": "stark",
    "slug": "stark",
    "name": "Stark",
    "japaneseName": "シュタルク",
    "series": "Sousou no Frieren",
    "universeBadge": "Beyond Journey's End",
    "roleTitle": "Vanguard Warrior & Resilient Systems Engineer",
    "headline": "Shield of the Northern Vanguard",
    "tagline": "Absorbing catastrophic stress spikes and turning raw impact into decisive triumphs.",
    "statement": "dedicated to holding the front line and facing every fear with unflinching resolve.",
    "bio": "Disciple of the legendary warrior Eisen. A frontline vanguard who overcomes shivering dread to deliver earth-shattering strikes, safeguarding party members from critical failures.",
    "price": 35,
    "featuredTag": "High Impact",
    "avatarUrl": "/anime/stark.jpg",
    "bustUrl": "/anime/stark.jpg",
    "cardUrl": "/anime/stark.jpg",
    "layoutArchetype": "flanked-centered",
    "accentAnimationType": "stark-sparks",
    "location": "Schwer Mountains, Warrior Bastion",
    "companionAvatars": [
        "/anime/frieren.jpg",
        "/anime/fern.jpg",
        "/himmel_bust.png"
    ],
    "companionTrustText": "Vetted by Eisen Vanguard Bastions and Northern Plateau frontier garrisons.",
    "brandPartners": [
        {
            "name": "Eisen Heavy Forge",
            "icon": "✦"
        },
        {
            "name": "Northern Vanguard Bastion",
            "icon": "◬"
        },
        {
            "name": "Schwer Armorworks",
            "icon": "⬡"
        },
        {
            "name": "Dragon Slayer Guild",
            "icon": "◌"
        },
        {
            "name": "Continental Frontier Patrol",
            "icon": "⊚"
        },
        {
            "name": "War Axe Guild",
            "icon": "❖"
        }
    ],
    "focusPillsLeft": [
        {
            "label": "Heavy Axework",
            "color": "#dc2626",
            "bg": "#fef2f2",
            "border": "#fecaca"
        },
        {
            "label": "Stamina Surge",
            "color": "#ea580c",
            "bg": "#fff7ed",
            "border": "#fed7aa"
        },
        {
            "label": "Frontline Anchor",
            "color": "#d97706",
            "bg": "#fffbeb",
            "border": "#fde68a"
        }
    ],
    "focusPillsRight": [
        {
            "label": "Impact Absorption",
            "color": "#ca8a04",
            "bg": "#fefce8",
            "border": "#fef08a"
        },
        {
            "label": "Dragon Slaying",
            "color": "#16a34a",
            "bg": "#f0fdf4",
            "border": "#bbf7d0"
        },
        {
            "label": "Vanguard Duty",
            "color": "#0284c7",
            "bg": "#f0f9ff",
            "border": "#bae6fd"
        }
    ],
    "focusQuote": {
        "main": "focus is on absorbing heavy impact, anchoring the front line, and",
        "highlight": "turning sheer terror into unstoppable courage."
    },
    "sinceYear": "since the Eisen Guild era",
    "ctaText": "Let's Talk",
    "colors": {
        "isDark": false,
        "bgPrimary": "#ffffff",
        "bgSecondary": "#f8fafc",
        "bgSurface": "#ffffff",
        "bgGlass": "rgba(255, 255, 255, 0.85)",
        "textPrimary": "#0f172a",
        "textSecondary": "#334155",
        "textMuted": "#64748b",
        "accent": "#dc2626",
        "accentSecondary": "#f97316",
        "accentGlow": "rgba(220, 38, 38, 0.25)",
        "borderSubtle": "#e2e8f0",
        "borderStrong": "rgba(220, 38, 38, 0.25)",
        "cardShadow": "0 20px 40px -10px rgba(220, 38, 38, 0.08)",
        "badgeBg": "#fee2e2",
        "badgeText": "#991b1b",
        "gradientHero": "radial-gradient(ellipse at center, rgba(220, 38, 38, 0.32) 0%, rgba(249, 115, 22, 0.18) 35%, rgba(220, 38, 38, 0.06) 55%, transparent 72%)"
    },
    "stats": [
        {
            "label": "Solar Dragon Slayed",
            "value": "1 Solo"
        },
        {
            "label": "Impact Absorption",
            "value": "100k kN"
        },
        {
            "label": "System Uptime",
            "value": "99.98%"
        }
    ],
    "skills": [
        {
            "name": "Heavy Cleave Synchronization",
            "level": 96,
            "category": "Combat"
        },
        {
            "name": "High-Load Stress Absorption",
            "level": 94,
            "category": "Resilience"
        },
        {
            "name": "Rapid Threat Aggro Interception",
            "level": 90,
            "category": "Strategy"
        },
        {
            "name": "Endurance Pipelining",
            "level": 88,
            "category": "Operations"
        }
    ],
    "projects": [
        {
            "id": "solar-dragon-breach",
            "title": "Solar Dragon Defense Wall",
            "category": "Infrastructure",
            "subtag": "High Stress",
            "desc": "Distributed load-balancing shield built to absorb thermal dragon breaths and redirect kinetic energy without system failure.",
            "tags": [
                "Go",
                "Kubernetes",
                "Chaos Engineering"
            ],
            "metrics": "0 Dropped Packets",
            "color": "#dc2626"
        },
        {
            "id": "cleave-pipeline",
            "title": "Earth-Cleaver CI/CD",
            "category": "DevOps",
            "subtag": "Build Pipeline",
            "desc": "Blazing-fast deployment automation that cuts down release bottlenecks in half with raw physical efficiency.",
            "tags": [
                "GitHub Actions",
                "Docker",
                "Linux Kernel"
            ],
            "metrics": "4x Build Speedup",
            "color": "#ea580c"
        },
        {
            "id": "shiver-sensor",
            "title": "Fear-to-Focus Reflex Buffer",
            "category": "Algorithms",
            "subtag": "Stress Mitigation",
            "desc": "Real-time adrenaline routing kernel that translates system anxiety and latency alerts into immediate high-priority executions.",
            "tags": [
                "Rust",
                "Async Runtime",
                "Telemetry"
            ],
            "metrics": "Sub-millisecond Reflex",
            "color": "#f59e0b"
        },
        {
            "id": "vanguard-telemetry",
            "title": "Frontline Vitality Radar",
            "category": "Monitoring",
            "subtag": "Telemetry",
            "desc": "Edge sensor mesh broadcasting squad armor integrity, stamina reserves, and threat vectors across battlefield networks.",
            "tags": [
                "WebSockets",
                "Next.js",
                "Grafana"
            ],
            "metrics": "Live Squad Feeds",
            "color": "#10b981"
        }
    ],
    "experiences": [
        {
            "year": "Early Years",
            "role": "Apprentice Warrior",
            "organization": "Eisen Mountain Dojo",
            "description": "Underwent brutal physical conditioning, axe fundamentals, and high-impact resilience drills."
        },
        {
            "year": "Year 28",
            "role": "Town Guardian",
            "organization": "Riegel Village Defense",
            "description": "Single-handedly held off the Solar Dragon, preserving commercial caravans and civil infrastructure."
        },
        {
            "year": "Year 29",
            "role": "Vanguard Lead",
            "organization": "Frieren Expedition Party",
            "description": "Took charge of frontline engagements, securing mages and neutralizing high-tier demon warlords."
        },
        {
            "year": "Year 30",
            "role": "First-Class Companion",
            "organization": "Northern Expedition Corps",
            "description": "Traversing the Golden Land and frontier fortresses with unmatched tenacity."
        }
    ],
    "testimonials": [
        {
            "quote": "He acts terrified before every battle, but he has never once abandoned his post or let an attack reach me.",
            "author": "Fern",
            "title": "First-Class Mage",
            "avatar": "/anime/fern.jpg"
        },
        {
            "quote": "My master Eisen chose well. Stark's axe has the weight of a true protector.",
            "author": "Frieren",
            "title": "Archmage",
            "avatar": "/anime/frieren.jpg"
        },
        {
            "quote": "A warrior who knows fear and still steps forward is the only kind of warrior you can trust.",
            "author": "Eisen the Iron",
            "title": "Legendary Dwarf Warrior",
            "avatar": "/himmel_bust.png"
        }
    ],
    "themeTokensCSS": {
        "--accent": "#dc2626",
        "--accent-secondary": "#f97316",
        "--bg-primary": "#ffffff",
        "--bg-secondary": "#f8fafc",
        "--text-primary": "#0f172a",
        "--text-secondary": "#334155"
    }
},
  'fern': {
    "id": "fern",
    "slug": "fern",
    "name": "Fern",
    "japaneseName": "フェルン",
    "series": "Sousou no Frieren",
    "universeBadge": "Beyond Journey's End",
    "roleTitle": "First-Class Mage & High-Speed Execution Specialist",
    "headline": "High-Precision Prodigy",
    "tagline": "Ultra-low latency execution and surgical spellcraft with zero wasted motion.",
    "statement": "focused on lightning-fast spell execution and immaculate mana efficiency under pressure.",
    "bio": "War orphan raised by Priest Heiter and trained by Frieren. The youngest mage in history to pass the First-Class exam, famed for rapid-fire offensive spells and flawless operational discipline.",
    "price": 37,
    "featuredTag": "Prodigy",
    "avatarUrl": "/anime/fern.jpg",
    "bustUrl": "/anime/fern.jpg",
    "cardUrl": "/anime/fern.jpg",
    "layoutArchetype": "flanked-centered",
    "accentAnimationType": "fern-zoltraak",
    "location": "Holy City Strahl, First-Class Mage Quarters",
    "companionAvatars": [
        "/anime/frieren.jpg",
        "/anime/stark.jpg",
        "/himmel_bust.png"
    ],
    "companionTrustText": "Certified with perfect marks by the Continental First-Class Examination Board.",
    "brandPartners": [
        {
            "name": "Continental Mage Board",
            "icon": "✦"
        },
        {
            "name": "Heiter Sanctuary Archive",
            "icon": "◬"
        },
        {
            "name": "Holy City Quarters",
            "icon": "⬡"
        },
        {
            "name": "Zoltraak Speed Lab",
            "icon": "◌"
        },
        {
            "name": "First-Class Council",
            "icon": "⊚"
        },
        {
            "name": "Staff Artificers",
            "icon": "❖"
        }
    ],
    "focusPillsLeft": [
        {
            "label": "Fast Zoltraak",
            "color": "#a855f7",
            "bg": "#faf5ff",
            "border": "#e9d5ff"
        },
        {
            "label": "Offensive Shielding",
            "color": "#6366f1",
            "bg": "#eef2ff",
            "border": "#c7d2fe"
        },
        {
            "label": "Mana Detection",
            "color": "#0284c7",
            "bg": "#f0f9ff",
            "border": "#bae6fd"
        }
    ],
    "focusPillsRight": [
        {
            "label": "Staff Mastery",
            "color": "#ec4899",
            "bg": "#fdf2f8",
            "border": "#fbcfe8"
        },
        {
            "label": "Tactical Economy",
            "color": "#16a34a",
            "bg": "#f0fdf4",
            "border": "#bbf7d0"
        },
        {
            "label": "Rapid Casting",
            "color": "#ea580c",
            "bg": "#fff7ed",
            "border": "#fed7aa"
        }
    ],
    "focusQuote": {
        "main": "focus is on high-speed spell release, zero wasted motion, and",
        "highlight": "executing every task with surgical precision."
    },
    "sinceYear": "since the First-Class Exam",
    "ctaText": "Let's Talk",
    "colors": {
        "isDark": false,
        "bgPrimary": "#ffffff",
        "bgSecondary": "#f8fafc",
        "bgSurface": "#ffffff",
        "bgGlass": "rgba(255, 255, 255, 0.85)",
        "textPrimary": "#0f172a",
        "textSecondary": "#334155",
        "textMuted": "#64748b",
        "accent": "#9333ea",
        "accentSecondary": "#c084fc",
        "accentGlow": "rgba(147, 51, 234, 0.25)",
        "borderSubtle": "#e2e8f0",
        "borderStrong": "rgba(147, 51, 234, 0.25)",
        "cardShadow": "0 20px 40px -10px rgba(147, 51, 234, 0.08)",
        "badgeBg": "#f3e8ff",
        "badgeText": "#6b21a8",
        "gradientHero": "radial-gradient(ellipse at center, rgba(147, 51, 234, 0.32) 0%, rgba(192, 132, 252, 0.18) 35%, rgba(147, 51, 234, 0.06) 55%, transparent 72%)"
    },
    "stats": [
        {
            "label": "Exam Rank",
            "value": "#1 Youngest"
        },
        {
            "label": "Cast Latency",
            "value": "<12ms"
        },
        {
            "label": "Mana Efficiency",
            "value": "99.4%"
        }
    ],
    "skills": [
        {
            "name": "High-Frequency Zoltraak Burst",
            "level": 97,
            "category": "Offense"
        },
        {
            "name": "Mana Concealment Suppression",
            "level": 94,
            "category": "Stealth"
        },
        {
            "name": "Hexagonal Barrier Defense",
            "level": 91,
            "category": "Protection"
        },
        {
            "name": "Budget & Resource Management",
            "level": 99,
            "category": "Operations"
        }
    ],
    "projects": [
        {
            "id": "zoltraak-rapid-api",
            "title": "Zoltraak Rapid-Fire API",
            "category": "Networking",
            "subtag": "Low-Latency",
            "desc": "High-throughput microservices architecture processing 50,000 requests/sec with minimal memory allocation.",
            "tags": [
                "Golang",
                "gRPC",
                "Protobuf"
            ],
            "metrics": "Sub-millisecond SLA",
            "color": "#9333ea"
        },
        {
            "id": "mana-radar-ui",
            "title": "Passive Mana Detection Radar",
            "category": "Sensors",
            "subtag": "Real-time UI",
            "desc": "Sleek radar visualizer scanning for faint hostile mana fluctuations across a 10km mountain radius.",
            "tags": [
                "React",
                "Three.js",
                "WebSockets"
            ],
            "metrics": "360° Scanning",
            "color": "#c084fc"
        },
        {
            "id": "party-ledger",
            "title": "Party Resource Ledger",
            "category": "Fintech",
            "subtag": "Budget Optimizer",
            "desc": "Strict expense and copper-coin audit system ensuring the adventuring squad never runs out of emergency rations.",
            "tags": [
                "Next.js",
                "PostgreSQL",
                "TailwindCSS"
            ],
            "metrics": "Zero Waste Balance",
            "color": "#10b981"
        },
        {
            "id": "barrier-geometry",
            "title": "Hexagonal Shield Matrix",
            "category": "Security",
            "subtag": "Vector Math",
            "desc": "Mathematical barrier projection tool that calculates impact vectors and reinforces stress points in real time.",
            "tags": [
                "TypeScript",
                "WebGL",
                "Linear Algebra"
            ],
            "metrics": "Zero Penetration",
            "color": "#3b82f6"
        }
    ],
    "experiences": [
        {
            "year": "Childhood",
            "role": "Ward of Priest Heiter",
            "organization": "Holy Hermitage",
            "description": "Mastered basic spell theory, clerical meditation, and daily precision drills under Heiter's guidance."
        },
        {
            "year": "Year 20",
            "role": "Apprentice Mage",
            "organization": "Frieren Training Group",
            "description": "Trained to conceal mana down to ordinary human levels, mastering high-frequency offensive spells."
        },
        {
            "year": "Year 29",
            "role": "First-Class Mage",
            "organization": "Continental Magic Association",
            "description": "Passed the prestigious First-Class exam with unanimous endorsement from Serie and exam proctors."
        },
        {
            "year": "Year 30",
            "role": "Operations & Combat Lead",
            "organization": "Northern Journey Vanguard",
            "description": "Serving as the strategic backbone and primary offensive artillery of the expedition party."
        }
    ],
    "testimonials": [
        {
            "quote": "Fern's casting speed surpasses even mages of the mythical era. She strikes before opponents realize the battle has begun.",
            "author": "Frieren",
            "title": "Archmage",
            "avatar": "/anime/frieren.jpg"
        },
        {
            "quote": "She keeps our entire expedition running on schedule and scolds us when we slack off. I wouldn't have made it this far without her.",
            "author": "Stark",
            "title": "Vanguard Warrior",
            "avatar": "/anime/stark.jpg"
        },
        {
            "quote": "My beloved ward has grown into a magnificent mage. Himmel and I could not be prouder.",
            "author": "Priest Heiter",
            "title": "Holy Bishop",
            "avatar": "/himmel_bust.png"
        }
    ],
    "themeTokensCSS": {
        "--accent": "#9333ea",
        "--accent-secondary": "#c084fc",
        "--bg-primary": "#ffffff",
        "--bg-secondary": "#f8fafc",
        "--text-primary": "#0f172a",
        "--text-secondary": "#334155"
    }
},
  'eren': {
    "id": "eren",
    "slug": "eren",
    "name": "Eren Yeager",
    "japaneseName": "エレン・イェーガー",
    "series": "Attack on Titan",
    "universeBadge": "Survey Corps Special Ops",
    "roleTitle": "Vanguard Breaker & Foundational Architect",
    "headline": "Breaker of Walls",
    "tagline": "Shattering legacy barriers and engineering relentless forward momentum.",
    "statement": "relentlessly driving forward to dismantle boundaries and secure freedom for what lies ahead.",
    "bio": "Bearer of the Attack, Founding, and War Hammer Titans. A driven strategist who refuses complacency, tearing down archaic walls and constructing unyielding autonomous foundations for the future.",
    "price": 45,
    "featuredTag": "Revolutionary",
    "avatarUrl": "/anime/eren.jpg",
    "bustUrl": "/anime/eren.jpg",
    "cardUrl": "/anime/eren.jpg",
    "layoutArchetype": "flanked-centered",
    "accentAnimationType": "eren-steam-embers",
    "location": "Shiganshina District, Wall Maria",
    "companionAvatars": [
        "/anime/mikasa.jpg",
        "/anime/levi.jpg",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
    ],
    "companionTrustText": "Endorsed by the 104th Cadet Corps and Scout Special Operations Command.",
    "brandPartners": [
        {
            "name": "Survey Corps Vanguard",
            "icon": "✦"
        },
        {
            "name": "Special Operations Squad",
            "icon": "◬"
        },
        {
            "name": "Wall Maria Engineers",
            "icon": "⬡"
        },
        {
            "name": "Paradis Research Hub",
            "icon": "◌"
        },
        {
            "name": "Scout Vanguard Unit",
            "icon": "⊚"
        },
        {
            "name": "Founding Network",
            "icon": "❖"
        }
    ],
    "focusPillsLeft": [
        {
            "label": "Vanguard Assault",
            "color": "#16a34a",
            "bg": "#f0fdf4",
            "border": "#bbf7d0"
        },
        {
            "label": "Hardening Protocol",
            "color": "#0284c7",
            "bg": "#f0f9ff",
            "border": "#bae6fd"
        },
        {
            "label": "Titan Dynamics",
            "color": "#ea580c",
            "bg": "#fff7ed",
            "border": "#fed7aa"
        }
    ],
    "focusPillsRight": [
        {
            "label": "Direct Action",
            "color": "#dc2626",
            "bg": "#fef2f2",
            "border": "#fecaca"
        },
        {
            "label": "Siege Breaker",
            "color": "#ca8a04",
            "bg": "#fefce8",
            "border": "#fef08a"
        },
        {
            "label": "Strategic Will",
            "color": "#475569",
            "bg": "#f8fafc",
            "border": "#e2e8f0"
        }
    ],
    "focusQuote": {
        "main": "focus is on breaking through impossible walls, defying stagnation, and",
        "highlight": "fighting relentlessly for absolute freedom."
    },
    "sinceYear": "since the 104th Cadets",
    "ctaText": "Let's Talk",
    "colors": {
        "isDark": false,
        "bgPrimary": "#ffffff",
        "bgSecondary": "#f8fafc",
        "bgSurface": "#ffffff",
        "bgGlass": "rgba(255, 255, 255, 0.85)",
        "textPrimary": "#0f172a",
        "textSecondary": "#334155",
        "textMuted": "#64748b",
        "accent": "#15803d",
        "accentSecondary": "#f97316",
        "accentGlow": "rgba(21, 128, 61, 0.25)",
        "borderSubtle": "#e2e8f0",
        "borderStrong": "rgba(21, 128, 61, 0.25)",
        "cardShadow": "0 20px 40px -10px rgba(21, 128, 61, 0.08)",
        "badgeBg": "#dcfce7",
        "badgeText": "#166534",
        "gradientHero": "radial-gradient(ellipse at center, rgba(21, 128, 61, 0.32) 0%, rgba(249, 115, 22, 0.18) 35%, rgba(21, 128, 61, 0.06) 55%, transparent 72%)"
    },
    "stats": [
        {
            "label": "Walls Breached",
            "value": "3 Major"
        },
        {
            "label": "Titans Controlled",
            "value": "Founding"
        },
        {
            "label": "Path Velocity",
            "value": "Infinite"
        }
    ],
    "skills": [
        {
            "name": "Hardening Structural Integrity",
            "level": 96,
            "category": "Engineering"
        },
        {
            "name": "Path Coordinate Pipelining",
            "level": 99,
            "category": "Distributed"
        },
        {
            "name": "High-Impact Threat Demolition",
            "level": 95,
            "category": "Combat"
        },
        {
            "name": "War Hammer Morphing Logic",
            "level": 92,
            "category": "Systems"
        }
    ],
    "projects": [
        {
            "id": "rumbling-pipeline",
            "title": "Coordinate Mesh Protocol",
            "category": "Distributed",
            "subtag": "Path System",
            "desc": "Ultra-scale event streaming platform interconnecting millions of autonomous nodes with zero-latency synchronization.",
            "tags": [
                "Apache Kafka",
                "Rust",
                "Raft Consensus"
            ],
            "metrics": "Millions of Nodes",
            "color": "#15803d"
        },
        {
            "id": "hardening-reinforcement",
            "title": "Titan Crystal Hardening Shield",
            "category": "Materials",
            "subtag": "Infrastructure",
            "desc": "Subterranean seal synthesis architecture that plugged the breach at Wall Rose and constructed armored fortification perimeters.",
            "tags": [
                "C++",
                "OpenGL",
                "Structural FEA"
            ],
            "metrics": "Indestructible Seal",
            "color": "#0284c7"
        },
        {
            "id": "shiganshina-rebuild",
            "title": "Shiganshina Reclamation Grid",
            "category": "Urban Planning",
            "subtag": "Resource Grid",
            "desc": "Modernized telemetry and supply distribution system restoring energy and defense lines across reclaimed frontier districts.",
            "tags": [
                "Next.js",
                "PostgreSQL",
                "GIS Mapping"
            ],
            "metrics": "100% Territory Restored",
            "color": "#ea580c"
        },
        {
            "id": "freedom-ledger",
            "title": "Autonomous Freedom Protocol",
            "category": "Security",
            "subtag": "Decentralized Ops",
            "desc": "Cryptographic identity framework providing uncensorable communication across besieged territories beyond the sea.",
            "tags": [
                "Solidity",
                "Zero-Knowledge Proofs",
                "IPFS"
            ],
            "metrics": "Uncensorable Comms",
            "color": "#dc2626"
        }
    ],
    "experiences": [
        {
            "year": "850",
            "role": "Top 5 Graduate",
            "organization": "104th Training Corps",
            "description": "Mastered ODM maneuverability, hand-to-hand combat, and tactical situational awareness."
        },
        {
            "year": "850",
            "role": "Key Operative",
            "organization": "Survey Corps Special Operations",
            "description": "Sealed Trost District gate and uncovered infiltration networks within the wall garrison."
        },
        {
            "year": "851",
            "role": "Reconnaissance Commander",
            "organization": "Wall Maria Retake Taskforce",
            "description": "Defeated the Colossal and Armored Titans to recover humanity's lost ancestral ground."
        },
        {
            "year": "854",
            "role": "Vanguard Sovereign",
            "organization": "Paradis Defense Coalition",
            "description": "Directing overarching strategic campaigns across Marley and overseas territories."
        }
    ],
    "testimonials": [
        {
            "quote": "Eren will always move forward. It is my duty to ensure he stays alive to see the freedom he fights for.",
            "author": "Mikasa Ackerman",
            "title": "Top Graduate & Elite Soldier",
            "avatar": "/anime/mikasa.jpg"
        },
        {
            "quote": "He is an uncontrollable beast, but when the gate must be sealed, there is no one else who can get it done.",
            "author": "Captain Levi",
            "title": "Humanity's Strongest Soldier",
            "avatar": "/anime/levi.jpg"
        },
        {
            "quote": "Eren's resolve inspires millions. He looked beyond the ocean when the rest of us were trapped inside the cage.",
            "author": "Armin Arlert",
            "title": "Survey Corps Commander",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
        }
    ],
    "themeTokensCSS": {
        "--accent": "#15803d",
        "--accent-secondary": "#f97316",
        "--bg-primary": "#ffffff",
        "--bg-secondary": "#f8fafc",
        "--text-primary": "#0f172a",
        "--text-secondary": "#334155"
    }
},
  'levi': {
    "id": "levi",
    "slug": "levi",
    "name": "Levi Ackerman",
    "japaneseName": "リヴァイ・アッカーマン",
    "series": "Attack on Titan",
    "universeBadge": "Humanity's Strongest",
    "roleTitle": "Captain & Precision Tactical Engineer",
    "headline": "Humanity's Strongest",
    "tagline": "Zero-latency execution, surgical blade precision, and immaculate operational hygiene.",
    "statement": "committed to making the choices with the least regrets and clearing every obstacle in our path.",
    "bio": "Captain of the Special Operations Squad in the Survey Corps. Famed worldwide for peerless combat reflexes, strict cleanliness standards, and executing impossible missions with minimal collateral loss.",
    "price": 49,
    "featuredTag": "Signature Elite",
    "avatarUrl": "/anime/levi.jpg",
    "bustUrl": "/anime/levi.jpg",
    "cardUrl": "/anime/levi.jpg",
    "layoutArchetype": "flanked-centered",
    "accentAnimationType": "levi-blade-slashes",
    "location": "Wall Rose, Survey Corps Headquarters",
    "companionAvatars": [
        "/anime/eren.jpg",
        "/anime/mikasa.jpg",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop"
    ],
    "companionTrustText": "Certified by Survey Corps Command and Commander Erwin Smith.",
    "brandPartners": [
        {
            "name": "Survey Corps High Command",
            "icon": "✦"
        },
        {
            "name": "Special Operations Squad",
            "icon": "◬"
        },
        {
            "name": "ODM Precision Workshop",
            "icon": "⬡"
        },
        {
            "name": "Wall Rose Garrison",
            "icon": "◌"
        },
        {
            "name": "Erwin Strategic Archive",
            "icon": "⊚"
        },
        {
            "name": "Cleanliness Standards Bureau",
            "icon": "❖"
        }
    ],
    "focusPillsLeft": [
        {
            "label": "ODM Acrobatics",
            "color": "#475569",
            "bg": "#f8fafc",
            "border": "#e2e8f0"
        },
        {
            "label": "Titan Elimination",
            "color": "#dc2626",
            "bg": "#fef2f2",
            "border": "#fecaca"
        },
        {
            "label": "Squad Command",
            "color": "#0284c7",
            "bg": "#f0f9ff",
            "border": "#bae6fd"
        }
    ],
    "focusPillsRight": [
        {
            "label": "Tactical Cleanliness",
            "color": "#16a34a",
            "bg": "#f0fdf4",
            "border": "#bbf7d0"
        },
        {
            "label": "Zero-Latency Reflex",
            "color": "#ca8a04",
            "bg": "#fefce8",
            "border": "#fef08a"
        },
        {
            "label": "Stealth Infiltration",
            "color": "#6366f1",
            "bg": "#eef2ff",
            "border": "#c7d2fe"
        }
    ],
    "focusQuote": {
        "main": "focus is on razor-sharp blade precision, absolute discipline, and",
        "highlight": "executing critical decisions with zero regrets."
    },
    "sinceYear": "since the Underground Squad era",
    "ctaText": "Let's Talk",
    "colors": {
        "isDark": false,
        "bgPrimary": "#ffffff",
        "bgSecondary": "#f8fafc",
        "bgSurface": "#ffffff",
        "bgGlass": "rgba(255, 255, 255, 0.85)",
        "textPrimary": "#0f172a",
        "textSecondary": "#334155",
        "textMuted": "#64748b",
        "accent": "#334155",
        "accentSecondary": "#0284c7",
        "accentGlow": "rgba(51, 65, 85, 0.25)",
        "borderSubtle": "#e2e8f0",
        "borderStrong": "rgba(51, 65, 85, 0.25)",
        "cardShadow": "0 20px 40px -10px rgba(51, 65, 85, 0.08)",
        "badgeBg": "#e2e8f0",
        "badgeText": "#0f172a",
        "gradientHero": "radial-gradient(ellipse at center, rgba(51, 65, 85, 0.32) 0%, rgba(2, 132, 199, 0.18) 35%, rgba(51, 65, 85, 0.06) 55%, transparent 72%)"
    },
    "stats": [
        {
            "label": "Titan Takedowns",
            "value": "100+ Solo"
        },
        {
            "label": "Blade Precision",
            "value": "99.99%"
        },
        {
            "label": "Sanitation Score",
            "value": "100/100"
        }
    ],
    "skills": [
        {
            "name": "High-Velocity 3D Maneuver",
            "level": 99,
            "category": "Mobility"
        },
        {
            "name": "Surgical Weak-Point Extraction",
            "level": 98,
            "category": "Precision"
        },
        {
            "name": "Tactical Squad Command",
            "level": 95,
            "category": "Leadership"
        },
        {
            "name": "Codebase Sanitation & Refactoring",
            "level": 100,
            "category": "Quality"
        }
    ],
    "projects": [
        {
            "id": "odm-blade-optimizer",
            "title": "ODM Flight Vector Optimizer",
            "category": "Aviation",
            "subtag": "Physics Engine",
            "desc": "Gas pressure regulation algorithm maximizing acceleration angles while minimizing blade wear during aerial combat.",
            "tags": [
                "C++",
                "CUDA",
                "Physics Simulation"
            ],
            "metrics": "3x Gas Longevity",
            "color": "#334155"
        },
        {
            "id": "code-cleanliness-linter",
            "title": "Ackerman Pure Hygiene Linter",
            "category": "DevTools",
            "subtag": "Static Analysis",
            "desc": "Ruthless code review automation that obliterates technical debt, memory leaks, and messy formatting without mercy.",
            "tags": [
                "Rust",
                "AST Parsing",
                "CLI Tool"
            ],
            "metrics": "Zero Dust Guarantee",
            "color": "#0284c7"
        },
        {
            "id": "beast-titan-takedown",
            "title": "Smoke Screen Tactical Router",
            "category": "Tactics",
            "subtag": "Stealth Pathing",
            "desc": "Autonomous battlefield smoke routing mesh masking squad trajectories from long-range artillery bombardment.",
            "tags": [
                "Python",
                "Pathfinding",
                "GIS"
            ],
            "metrics": "100% Concealment",
            "color": "#dc2626"
        },
        {
            "id": "squad-telemetry-hud",
            "title": "Special Ops Tactical HUD",
            "category": "Interface",
            "subtag": "Field HUD",
            "desc": "Ultra-minimalist heads-up display delivering real-time blade counts, gas reserves, and acoustic Titan sonar pings.",
            "tags": [
                "Next.js",
                "Canvas API",
                "TailwindCSS"
            ],
            "metrics": "Zero Distraction UI",
            "color": "#10b981"
        }
    ],
    "experiences": [
        {
            "year": "Early Years",
            "role": "Underground Operative",
            "organization": "Capital Subterranean District",
            "description": "Mastered self-taught vertical maneuvering and surviving hostile urban environments."
        },
        {
            "year": "844",
            "role": "Survey Corps Scout",
            "organization": "Scouting Legion",
            "description": "Recruited by Erwin Smith; restructured Scout expedition tactics for rapid survival."
        },
        {
            "year": "850",
            "role": "Captain",
            "organization": "Special Operations Squad",
            "description": "Protected the Founding Titan key asset and neutralized the Female Titan threat in the Giant Forest."
        },
        {
            "year": "854",
            "role": "Field Commander",
            "organization": "Allied Liberio Incursion",
            "description": "Spearheaded the extraction operation in Liberio, securing high-value strategic targets."
        }
    ],
    "testimonials": [
        {
            "quote": "Give up on your dreams and die for us. Levi will make sure your sacrifice is never wasted.",
            "author": "Erwin Smith",
            "title": "13th Commander of Survey Corps",
            "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop"
        },
        {
            "quote": "The captain's blades are faster than sound. Before a titan even senses danger, the nape is already severed.",
            "author": "Hange Zoë",
            "title": "14th Commander & Chief Scientist",
            "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop"
        },
        {
            "quote": "He taught me what it means to hold discipline when the world falls apart. His standards never drop.",
            "author": "Mikasa Ackerman",
            "title": "Elite Scout Soldier",
            "avatar": "/anime/mikasa.jpg"
        }
    ],
    "themeTokensCSS": {
        "--accent": "#334155",
        "--accent-secondary": "#0284c7",
        "--bg-primary": "#ffffff",
        "--bg-secondary": "#f8fafc",
        "--text-primary": "#0f172a",
        "--text-secondary": "#334155"
    }
},
  'mikasa': {
    "id": "mikasa",
    "slug": "mikasa",
    "name": "Mikasa Ackerman",
    "japaneseName": "ミカサ・アッカーマン",
    "series": "Attack on Titan",
    "universeBadge": "Valued at 100 Soldiers",
    "roleTitle": "Elite Guardian & High-Speed Vanguard",
    "headline": "Unwavering Vanguard",
    "tagline": "Flawless martial execution, lethal combat agility, and unshakable defensive devotion.",
    "statement": "unwavering loyalty to the mission, defending the vanguard with peerless martial precision.",
    "bio": "Top graduate of the 104th Training Corps, endowed with awakened Ackerman ancestral reflexes. Rated as worth a hundred ordinary soldiers, providing impenetrable perimeter defense and decisive offense.",
    "price": 38,
    "featuredTag": "Elite Guard",
    "avatarUrl": "/anime/mikasa.jpg",
    "bustUrl": "/anime/mikasa.jpg",
    "cardUrl": "/anime/mikasa.jpg",
    "layoutArchetype": "flanked-centered",
    "accentAnimationType": "mikasa-scarf-wind",
    "location": "Trost District, Scout Vanguard Base",
    "companionAvatars": [
        "/anime/eren.jpg",
        "/anime/levi.jpg",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
    ],
    "companionTrustText": "Graduated Rank 1 in the 104th Cadet Corps; Scout Legion Elite.",
    "brandPartners": [
        {
            "name": "104th Cadet Elite",
            "icon": "✦"
        },
        {
            "name": "Survey Corps Vanguard",
            "icon": "◬"
        },
        {
            "name": "Thunder Spear Artificers",
            "icon": "⬡"
        },
        {
            "name": "Trost Memorial Command",
            "icon": "◌"
        },
        {
            "name": "Ackerman Clan Registry",
            "icon": "⊚"
        },
        {
            "name": "Scout Perimeter Defense",
            "icon": "❖"
        }
    ],
    "focusPillsLeft": [
        {
            "label": "Dual Thunder Spears",
            "color": "#be123c",
            "bg": "#fff1f2",
            "border": "#fecdd3"
        },
        {
            "label": "Acrobatic Traversal",
            "color": "#0284c7",
            "bg": "#f0f9ff",
            "border": "#bae6fd"
        },
        {
            "label": "Protective Perimeter",
            "color": "#16a34a",
            "bg": "#f0fdf4",
            "border": "#bbf7d0"
        }
    ],
    "focusPillsRight": [
        {
            "label": "Combat Reflexes",
            "color": "#ca8a04",
            "bg": "#fefce8",
            "border": "#fef08a"
        },
        {
            "label": "Tactical Composure",
            "color": "#475569",
            "bg": "#f8fafc",
            "border": "#e2e8f0"
        },
        {
            "label": "Target Interception",
            "color": "#dc2626",
            "bg": "#fef2f2",
            "border": "#fecaca"
        }
    ],
    "focusQuote": {
        "main": "focus is on unmatched combat speed, absolute situational awareness, and",
        "highlight": "protecting the foundation at all costs."
    },
    "sinceYear": "since the 104th Top Class",
    "ctaText": "Let's Talk",
    "colors": {
        "isDark": false,
        "bgPrimary": "#ffffff",
        "bgSecondary": "#f8fafc",
        "bgSurface": "#ffffff",
        "bgGlass": "rgba(255, 255, 255, 0.85)",
        "textPrimary": "#0f172a",
        "textSecondary": "#334155",
        "textMuted": "#64748b",
        "accent": "#be123c",
        "accentSecondary": "#e11d48",
        "accentGlow": "rgba(190, 18, 60, 0.25)",
        "borderSubtle": "#e2e8f0",
        "borderStrong": "rgba(190, 18, 60, 0.25)",
        "cardShadow": "0 20px 40px -10px rgba(190, 18, 60, 0.08)",
        "badgeBg": "#ffe4e6",
        "badgeText": "#9f1239",
        "gradientHero": "radial-gradient(ellipse at center, rgba(190, 18, 60, 0.32) 0%, rgba(225, 29, 72, 0.18) 35%, rgba(190, 18, 60, 0.06) 55%, transparent 72%)"
    },
    "stats": [
        {
            "label": "Cadet Rank",
            "value": "#1 Overall"
        },
        {
            "label": "Combat Rating",
            "value": "100 Soldiers"
        },
        {
            "label": "Reflex Latency",
            "value": "<5ms"
        }
    ],
    "skills": [
        {
            "name": "Thunder Spear Blast Vectoring",
            "level": 98,
            "category": "Artillery"
        },
        {
            "name": "Acrobatic Trajectory Planning",
            "level": 96,
            "category": "Mobility"
        },
        {
            "name": "VIP Perimeter Shielding",
            "level": 99,
            "category": "Defense"
        },
        {
            "name": "Crisis Decisiveness",
            "level": 94,
            "category": "Tactics"
        }
    ],
    "projects": [
        {
            "id": "thunder-spear-guidance",
            "title": "Thunder Spear Ballistic System",
            "category": "Artillery",
            "subtag": "Weapon Control",
            "desc": "Precision detonation timer and guidance wire interface penetrating reinforced titan armor plates.",
            "tags": [
                "Embedded C",
                "RTOS",
                "Ballistics"
            ],
            "metrics": "100% Armor Penetration",
            "color": "#be123c"
        },
        {
            "id": "perimeter-sentry-mesh",
            "title": "Perimeter Overwatch Mesh",
            "category": "Security",
            "subtag": "Sentinel Hub",
            "desc": "High-speed monitoring perimeter flagging perimeter intrusions and deploying automated countermeasures.",
            "tags": [
                "Go",
                "WebRTC",
                "Computer Vision"
            ],
            "metrics": "360° Sentry Coverage",
            "color": "#0284c7"
        },
        {
            "id": "scarf-thermal-regulator",
            "title": "Thermal Scarf Comfort Telemetry",
            "category": "Wearables",
            "subtag": "Bio-Telemetry",
            "desc": "Subtle micro-weave thermal stabilizer maintaining ideal body temperature in freezing high-altitude Scout drops.",
            "tags": [
                "IoT",
                "MicroPython",
                "Bluetooth LE"
            ],
            "metrics": "Constant 37°C Warmth",
            "color": "#e11d48"
        },
        {
            "id": "interception-radar",
            "title": "Aerial Interception Radar",
            "category": "Algorithms",
            "subtag": "Predictive Math",
            "desc": "Calculates hostile flight arcs in mid-air to place intercepting strikes directly into the opponent's blind spot.",
            "tags": [
                "Rust",
                "Vector Math",
                "WebGL"
            ],
            "metrics": "Sub-5ms Interception",
            "color": "#10b981"
        }
    ],
    "experiences": [
        {
            "year": "850",
            "role": "Rank 1 Graduate",
            "organization": "104th Training Corps",
            "description": "Graduated at the very pinnacle of the class with unprecedented scores across all disciplines."
        },
        {
            "year": "850",
            "role": "Vanguard Elite",
            "organization": "Battle of Trost District",
            "description": "Held the rear guard for retreating citizens and escorted the rogue Titan boulder to seal the breach."
        },
        {
            "year": "851",
            "role": "Special Operations Vanguard",
            "organization": "Survey Corps Retake Mission",
            "description": "Spearheaded the frontline deployment of Thunder Spears against the Armored Titan."
        },
        {
            "year": "854",
            "role": "Elite Scout Leader",
            "organization": "Liberio & Shiganshina Defense",
            "description": "Coordinated joint urban aerial suppression, neutralizing elite hostile warriors."
        }
    ],
    "testimonials": [
        {
            "quote": "Mikasa is an irreplaceable treasure of humanity. Her skill is worth an entire regiment of elite soldiers.",
            "author": "Ian Dietrich",
            "title": "Elite Garrison Commander",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
        },
        {
            "quote": "Her blade never wavers. When everything turns to blood and chaos, Mikasa brings calm and certainty.",
            "author": "Armin Arlert",
            "title": "Survey Corps Strategist",
            "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop"
        },
        {
            "quote": "As long as I am with you, I can do anything. The world is cruel, but it is also very beautiful.",
            "author": "Eren Yeager",
            "title": "Attack Titan Vanguard",
            "avatar": "/anime/eren.jpg"
        }
    ],
    "themeTokensCSS": {
        "--accent": "#be123c",
        "--accent-secondary": "#e11d48",
        "--bg-primary": "#ffffff",
        "--bg-secondary": "#f8fafc",
        "--text-primary": "#0f172a",
        "--text-secondary": "#334155"
    }
},
  'naruto': {
    "id": "naruto",
    "slug": "naruto",
    "name": "Naruto Uzumaki",
    "japaneseName": "うずまきナルト",
    "series": "Naruto Shippuden",
    "universeBadge": "Seventh Hokage",
    "roleTitle": "Seventh Hokage & High-Availability Distributed Architect",
    "headline": "Child of Prophecy",
    "tagline": "Infinite endurance, massive multi-node scaling, and uniting complex ecosystems.",
    "statement": "dedicated to never going back on my word and building systems that connect everyone together.",
    "bio": "Seventh Hokage of the Hidden Leaf and Jinchūriki of the Nine Tails. Famed for limitless chakra scaling, multi-shadow clone orchestration, and building harmonious alliances across rival factions.",
    "price": 49,
    "featuredTag": "Hokage Tier",
    "avatarUrl": "/anime/naruto.jpg",
    "bustUrl": "/anime/naruto.jpg",
    "cardUrl": "/anime/naruto.jpg",
    "layoutArchetype": "flanked-centered",
    "accentAnimationType": "naruto-rasengan-chakra",
    "location": "Konohagakure, Fire Country",
    "companionAvatars": [
        "/anime/sasuke.jpg",
        "/anime/sakura.jpg",
        "/anime/hinata.jpg"
    ],
    "companionTrustText": "Endorsed by the Five Kage and Allied Shinobi Supreme Headquarters.",
    "brandPartners": [
        {
            "name": "Konoha Hokage Bureau",
            "icon": "✦"
        },
        {
            "name": "Uzumaki Seal Archive",
            "icon": "◬"
        },
        {
            "name": "Mount Myoboku Sage Dojo",
            "icon": "⬡"
        },
        {
            "name": "Allied Shinobi Forces",
            "icon": "◌"
        },
        {
            "name": "Ichiraku Ramen Guild",
            "icon": "⊚"
        },
        {
            "name": "Leaf Ninja Academy",
            "icon": "❖"
        }
    ],
    "focusPillsLeft": [
        {
            "label": "Rasengan Engine",
            "color": "#ea580c",
            "bg": "#fff7ed",
            "border": "#fed7aa"
        },
        {
            "label": "Multi-Shadow Clones",
            "color": "#0284c7",
            "bg": "#f0f9ff",
            "border": "#bae6fd"
        },
        {
            "label": "Sage Sensing",
            "color": "#ca8a04",
            "bg": "#fefce8",
            "border": "#fef08a"
        }
    ],
    "focusPillsRight": [
        {
            "label": "Chakra Distribution",
            "color": "#f59e0b",
            "bg": "#fef3c7",
            "border": "#fde68a"
        },
        {
            "label": "Diplomatic Empathy",
            "color": "#16a34a",
            "bg": "#f0fdf4",
            "border": "#bbf7d0"
        },
        {
            "label": "Kurama Synergy",
            "color": "#dc2626",
            "bg": "#fef2f2",
            "border": "#fecaca"
        }
    ],
    "focusQuote": {
        "main": "focus is on infinite endurance, connecting diverse people, and",
        "highlight": "never giving up on any impossible dream."
    },
    "sinceYear": "since the Genin Graduation 2002",
    "ctaText": "Let's Talk",
    "colors": {
        "isDark": false,
        "bgPrimary": "#ffffff",
        "bgSecondary": "#f8fafc",
        "bgSurface": "#ffffff",
        "bgGlass": "rgba(255, 255, 255, 0.85)",
        "textPrimary": "#0f172a",
        "textSecondary": "#334155",
        "textMuted": "#64748b",
        "accent": "#ea580c",
        "accentSecondary": "#f59e0b",
        "accentGlow": "rgba(234, 88, 12, 0.25)",
        "borderSubtle": "#e2e8f0",
        "borderStrong": "rgba(234, 88, 12, 0.25)",
        "cardShadow": "0 20px 40px -10px rgba(234, 88, 12, 0.08)",
        "badgeBg": "#ffedd5",
        "badgeText": "#9a3412",
        "gradientHero": "radial-gradient(ellipse at center, rgba(234, 88, 12, 0.32) 0%, rgba(245, 158, 11, 0.18) 35%, rgba(234, 88, 12, 0.06) 55%, transparent 72%)"
    },
    "stats": [
        {
            "label": "Chakra Capacity",
            "value": "Bijuu Tier"
        },
        {
            "label": "Clone Workers",
            "value": "1,000+ Async"
        },
        {
            "label": "Promises Kept",
            "value": "100%"
        }
    ],
    "skills": [
        {
            "name": "Multi-Shadow Clone Concurrency",
            "level": 99,
            "category": "Concurrency"
        },
        {
            "name": "Rasenshuriken Flow State",
            "level": 97,
            "category": "Architecture"
        },
        {
            "name": "Sage Chakra Telemetry",
            "level": 95,
            "category": "Observability"
        },
        {
            "name": "Cross-Domain Diplomacy & Empathy",
            "level": 100,
            "category": "Leadership"
        }
    ],
    "projects": [
        {
            "id": "shadow-clone-cluster",
            "title": "Multi-Shadow Clone Cluster (Kage-K8s)",
            "category": "Cloud",
            "subtag": "Autoscaling Mesh",
            "desc": "High-concurrency cluster orchestration deploying 10,000 identical container replicas with shared memory knowledge ingestion.",
            "tags": [
                "Kubernetes",
                "Go",
                "Docker",
                "Redis"
            ],
            "metrics": "Instant 10k Clones",
            "color": "#ea580c"
        },
        {
            "id": "rasenshuriken-compiler",
            "title": "Rasenshuriken Code Optimizer",
            "category": "Compilers",
            "subtag": "Cellular Compiler",
            "desc": "High-frequency AST optimization engine that slices execution overhead at a microscopic, cellular level.",
            "tags": [
                "Rust",
                "LLVM",
                "WebAssembly"
            ],
            "metrics": "Micro-Cellular Precision",
            "color": "#0284c7"
        },
        {
            "id": "sage-telemetry",
            "title": "Senjutsu Planetary Observability",
            "category": "Monitoring",
            "subtag": "Chakra Radar",
            "desc": "Natural energy sensor network detecting distant anomalies and latency spikes across global server regions.",
            "tags": [
                "Prometheus",
                "Grafana",
                "TypeScript"
            ],
            "metrics": "Planetary Range Sensing",
            "color": "#f59e0b"
        },
        {
            "id": "leaf-village-smart-grid",
            "title": "Konoha Smart City Modernization",
            "category": "IoT",
            "subtag": "Civic Infrastructure",
            "desc": "Next-generation municipal intranet modernizing public services, ninja task dispatch, and emergency siren arrays.",
            "tags": [
                "Next.js",
                "PostgreSQL",
                "TailwindCSS"
            ],
            "metrics": "100% Civic Coverage",
            "color": "#10b981"
        }
    ],
    "experiences": [
        {
            "year": "Early Years",
            "role": "Genin",
            "organization": "Team 7 (Kakashi, Sasuke, Sakura)",
            "description": "Completed perilous Land of Waves bridge defense and advanced through the Chunin Exams."
        },
        {
            "year": "Shippuden",
            "role": "Sage of Mount Myoboku",
            "organization": "Leaf Defense Vanguard",
            "description": "Mastered Senjutsu and defended Konoha against the Six Paths of Pain."
        },
        {
            "year": "Fourth War",
            "role": "Supreme Alliance Hero",
            "organization": "Allied Shinobi Forces",
            "description": "Distributed Kurama cloak buffering millions of shinobi, uniting the ninja world."
        },
        {
            "year": "Present",
            "role": "Seventh Hokage",
            "organization": "Hidden Leaf Village Command",
            "description": "Presiding over unprecedented technological advancement, peace treaties, and scientific ninja tools."
        }
    ],
    "testimonials": [
        {
            "quote": "You are the only person in this world who understands my pain and pulled me out of the abyss.",
            "author": "Sasuke Uchiha",
            "title": "Shadow Hokage",
            "avatar": "/anime/sasuke.jpg"
        },
        {
            "quote": "Watching your back has always been my greatest strength. You showed me that destiny can be rewritten.",
            "author": "Hinata Hyūga",
            "title": "Head of Hyūga Clan",
            "avatar": "/anime/hinata.jpg"
        },
        {
            "quote": "He never gave up, not once. When the village was in ruins, Naruto brought everyone home.",
            "author": "Sakura Haruno",
            "title": "Chief Medical Ninja",
            "avatar": "/anime/sakura.jpg"
        }
    ],
    "themeTokensCSS": {
        "--accent": "#ea580c",
        "--accent-secondary": "#f59e0b",
        "--bg-primary": "#ffffff",
        "--bg-secondary": "#f8fafc",
        "--text-primary": "#0f172a",
        "--text-secondary": "#334155"
    }
},
  'sasuke': {
    "id": "sasuke",
    "slug": "sasuke",
    "name": "Sasuke Uchiha",
    "japaneseName": "うちはサスケ",
    "series": "Naruto Shippuden",
    "universeBadge": "Shadow Hokage",
    "roleTitle": "Shadow Operative & Deep Threat Specialist",
    "headline": "Avenger in the Shadows",
    "tagline": "Chidori lightning latency, dimensional threat neutralization, and lone-wolf precision.",
    "statement": "channeling lightning precision and profound insight to safeguard what matters from the shadows.",
    "bio": "The sole surviving prodigy of the Uchiha clan and Shadow Hokage of the Leaf. Wields the Eternal Mangekyō Sharingan and Rinnegan to traverse alternate dimensions and neutralize extraterrestrial threats.",
    "price": 48,
    "featuredTag": "Shadow Elite",
    "avatarUrl": "/anime/sasuke.jpg",
    "bustUrl": "/anime/sasuke.jpg",
    "cardUrl": "/anime/sasuke.jpg",
    "layoutArchetype": "flanked-centered",
    "accentAnimationType": "sasuke-chidori-lightning",
    "location": "Uchiha District, Leaf Shadow Division",
    "companionAvatars": [
        "/anime/naruto.jpg",
        "/anime/sakura.jpg",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop"
    ],
    "companionTrustText": "Trusted by the Seventh Hokage with the village's deepest extraterrestrial missions.",
    "brandPartners": [
        {
            "name": "Shadow Shinobi Division",
            "icon": "✦"
        },
        {
            "name": "Uchiha Clan Shrine",
            "icon": "◬"
        },
        {
            "name": "Rinnegan Spatial Bureau",
            "icon": "⬡"
        },
        {
            "name": "Five Kage Intelligence",
            "icon": "◌"
        },
        {
            "name": "Kusanagi Blacksmiths",
            "icon": "⊚"
        },
        {
            "name": "Hawk Recon Network",
            "icon": "❖"
        }
    ],
    "focusPillsLeft": [
        {
            "label": "Chidori Current",
            "color": "#6366f1",
            "bg": "#eef2ff",
            "border": "#c7d2fe"
        },
        {
            "label": "Sharingan Analytics",
            "color": "#dc2626",
            "bg": "#fef2f2",
            "border": "#fecaca"
        },
        {
            "label": "Flame Control",
            "color": "#4338ca",
            "bg": "#e0e7ff",
            "border": "#c7d2fe"
        }
    ],
    "focusPillsRight": [
        {
            "label": "Kusanagi Kenjutsu",
            "color": "#475569",
            "bg": "#f8fafc",
            "border": "#e2e8f0"
        },
        {
            "label": "Dimensional Traversal",
            "color": "#7c3aed",
            "bg": "#f5f3ff",
            "border": "#ddd6fe"
        },
        {
            "label": "Tactical Solitude",
            "color": "#0284c7",
            "bg": "#f0f9ff",
            "border": "#bae6fd"
        }
    ],
    "focusQuote": {
        "main": "focus is on surgical Chidori accuracy, pattern recognition, and",
        "highlight": "delivering decisive impact from the shadows."
    },
    "sinceYear": "since the Valley of the End",
    "ctaText": "Let's Talk",
    "colors": {
        "isDark": false,
        "bgPrimary": "#ffffff",
        "bgSecondary": "#f8fafc",
        "bgSurface": "#ffffff",
        "bgGlass": "rgba(255, 255, 255, 0.85)",
        "textPrimary": "#0f172a",
        "textSecondary": "#334155",
        "textMuted": "#64748b",
        "accent": "#4f46e5",
        "accentSecondary": "#6366f1",
        "accentGlow": "rgba(79, 70, 229, 0.25)",
        "borderSubtle": "#e2e8f0",
        "borderStrong": "rgba(79, 70, 229, 0.25)",
        "cardShadow": "0 20px 40px -10px rgba(79, 70, 229, 0.08)",
        "badgeBg": "#e0e7ff",
        "badgeText": "#3730a3",
        "gradientHero": "radial-gradient(ellipse at center, rgba(79, 70, 229, 0.32) 0%, rgba(99, 102, 241, 0.18) 35%, rgba(79, 70, 229, 0.06) 55%, transparent 72%)"
    },
    "stats": [
        {
            "label": "Dojutsu",
            "value": "Rinne-Sharingan"
        },
        {
            "label": "Lightning Velocity",
            "value": "Chidori Sub-ms"
        },
        {
            "label": "Dimensions Traversed",
            "value": "6 Otsutsuki"
        }
    ],
    "skills": [
        {
            "name": "Spatial Amenotejikara Swapping",
            "level": 99,
            "category": "Spatial"
        },
        {
            "name": "Amaterasu Enton Control",
            "level": 96,
            "category": "Pyrotechnics"
        },
        {
            "name": "Susanoo Armor Hardening",
            "level": 98,
            "category": "Defense"
        },
        {
            "name": "Sub-Zero Threat Profiling",
            "level": 95,
            "category": "Intel"
        }
    ],
    "projects": [
        {
            "id": "amenotejikara-routing",
            "title": "Amenotejikara Position Swap Proxy",
            "category": "Networking",
            "subtag": "Zero-Latency Swap",
            "desc": "Instantaneous socket swap routing that swaps server loads with zero connection drops across distributed nodes.",
            "tags": [
                "Rust",
                "eBPF",
                "Linux Kernel"
            ],
            "metrics": "Zero-Latency Relocation",
            "color": "#4f46e5"
        },
        {
            "id": "sharingan-vision",
            "title": "Sharingan Predictive Vision Engine",
            "category": "AI / CV",
            "subtag": "Trajectory Prediction",
            "desc": "Real-time video trajectory predictor mapping hostile attacks 3 steps in advance based on subtle muscle micro-tensions.",
            "tags": [
                "PyTorch",
                "TensorRT",
                "CUDA"
            ],
            "metrics": "Predicts 3 Steps Ahead",
            "color": "#dc2626"
        },
        {
            "id": "otsutsuki-dimensional-tracer",
            "title": "Otsutsuki Dimensional Wormhole Radar",
            "category": "Astronomy",
            "subtag": "Space-Time Tracker",
            "desc": "Quantum telemetry tracker identifying dimensional rifts and chakra tears across parallel planetary dimensions.",
            "tags": [
                "Next.js",
                "Three.js",
                "WebSockets"
            ],
            "metrics": "Cross-Dimensional Tracking",
            "color": "#7c3aed"
        },
        {
            "id": "chidori-pulse",
            "title": "Chidori Voltage Controller",
            "category": "Hardware",
            "subtag": "Pulse Modulator",
            "desc": "Microsecond electrical impulse firmware regulating high-voltage discharges with scalpel surgical focus.",
            "tags": [
                "C",
                "Embedded ARM",
                "Oscilloscopes"
            ],
            "metrics": "Microsecond Precision",
            "color": "#0284c7"
        }
    ],
    "experiences": [
        {
            "year": "Genin Era",
            "role": "Leaf Academy Rookie #1",
            "organization": "Team 7",
            "description": "Awakened Sharingan during the Zabuza bridge encounter; mastered basic Chidori."
        },
        {
            "year": "Shippuden",
            "role": "Leader of Taka",
            "organization": "Independent Recon Team",
            "description": "Uncovered the truth of the Uchiha clan; fought the Five Kage Summit."
        },
        {
            "year": "Fourth War",
            "role": "Key Savior",
            "organization": "Allied Coalition",
            "description": "Co-sealed Kaguya Otsutsuki alongside Naruto; reconciled at the Valley of the End."
        },
        {
            "year": "Adult Era",
            "role": "Shadow Hokage",
            "organization": "Hidden Leaf Global Intelligence",
            "description": "Operating solo beyond global borders to safeguard the shinobi world from celestial threats."
        }
    ],
    "testimonials": [
        {
            "quote": "Sasuke protects the world from the shadows while I protect it in the light. He is the other half of Konoha.",
            "author": "Naruto Uzumaki",
            "title": "Seventh Hokage",
            "avatar": "/anime/naruto.jpg"
        },
        {
            "quote": "No matter how far he wanders into the dark, I will always prepare a home for his return.",
            "author": "Sakura Haruno",
            "title": "Head of Konoha Hospital",
            "avatar": "/anime/sakura.jpg"
        },
        {
            "quote": "Sasuke-sensei taught me what it means to be a true shinobi: someone who endures in silence.",
            "author": "Boruto Uzumaki",
            "title": "Shinobi Prodigy",
            "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop"
        }
    ],
    "themeTokensCSS": {
        "--accent": "#4f46e5",
        "--accent-secondary": "#6366f1",
        "--bg-primary": "#ffffff",
        "--bg-secondary": "#f8fafc",
        "--text-primary": "#0f172a",
        "--text-secondary": "#334155"
    }
},
  'sakura': {
    "id": "sakura",
    "slug": "sakura",
    "name": "Sakura Haruno",
    "japaneseName": "春野サクラ",
    "series": "Naruto Shippuden",
    "universeBadge": "Supreme Medical Director",
    "roleTitle": "Head of Medical Operations & Heavy-Impact Specialist",
    "headline": "Strength of a Hundred",
    "tagline": "Precision cellular recovery, disaster triage mastery, and shattering monstrous bottlenecks.",
    "statement": "combining monstrous destructive impact with cellular regeneration and compassionate care.",
    "bio": "Disciple of Fifth Hokage Tsunade and the foremost medical ninja in existence. Wields the Byakugou Strength of a Hundred seal, providing infinite stamina recovery and ground-shattering martial power.",
    "price": 38,
    "featuredTag": "Healing & Power",
    "avatarUrl": "/anime/sakura.jpg",
    "bustUrl": "/anime/sakura.jpg",
    "cardUrl": "/anime/sakura.jpg",
    "layoutArchetype": "flanked-centered",
    "accentAnimationType": "sakura-cherry-byakugou",
    "location": "Konoha Central Medical Hospital",
    "companionAvatars": [
        "/anime/naruto.jpg",
        "/anime/sasuke.jpg",
        "/anime/hinata.jpg"
    ],
    "companionTrustText": "Certified Chief Medical Director of the Allied Shinobi Medical Corps.",
    "brandPartners": [
        {
            "name": "Konoha Central Hospital",
            "icon": "✦"
        },
        {
            "name": "Byakugou Institute",
            "icon": "◬"
        },
        {
            "name": "Tsunade Medical Academy",
            "icon": "⬡"
        },
        {
            "name": "Katsuyu Healing Sanctuary",
            "icon": "◌"
        },
        {
            "name": "Leaf Pediatric Clinic",
            "icon": "⊚"
        },
        {
            "name": "Allied Triage Council",
            "icon": "❖"
        }
    ],
    "focusPillsLeft": [
        {
            "label": "Chakra Scalpel",
            "color": "#ec4899",
            "bg": "#fdf2f8",
            "border": "#fbcfe8"
        },
        {
            "label": "Byakugou Seal",
            "color": "#be185d",
            "bg": "#fdf2f8",
            "border": "#fbcfe8"
        },
        {
            "label": "Cellular Healing",
            "color": "#16a34a",
            "bg": "#f0fdf4",
            "border": "#bbf7d0"
        }
    ],
    "focusPillsRight": [
        {
            "label": "Heavy Impact Strike",
            "color": "#ea580c",
            "bg": "#fff7ed",
            "border": "#fed7aa"
        },
        {
            "label": "Antidote Synthesis",
            "color": "#0284c7",
            "bg": "#f0f9ff",
            "border": "#bae6fd"
        },
        {
            "label": "Triage Leadership",
            "color": "#7c3aed",
            "bg": "#f5f3ff",
            "border": "#ddd6fe"
        }
    ],
    "focusQuote": {
        "main": "focus is on precise chakra scalpel work, cellular healing, and",
        "highlight": "unleashing game-changing strength when it matters."
    },
    "sinceYear": "since the Tsunade Apprenticeship",
    "ctaText": "Let's Talk",
    "colors": {
        "isDark": false,
        "bgPrimary": "#ffffff",
        "bgSecondary": "#f8fafc",
        "bgSurface": "#ffffff",
        "bgGlass": "rgba(255, 255, 255, 0.85)",
        "textPrimary": "#0f172a",
        "textSecondary": "#334155",
        "textMuted": "#64748b",
        "accent": "#ec4899",
        "accentSecondary": "#f43f5e",
        "accentGlow": "rgba(236, 72, 153, 0.25)",
        "borderSubtle": "#e2e8f0",
        "borderStrong": "rgba(236, 72, 153, 0.25)",
        "cardShadow": "0 20px 40px -10px rgba(236, 72, 153, 0.08)",
        "badgeBg": "#fce7f3",
        "badgeText": "#9d174d",
        "gradientHero": "radial-gradient(ellipse at center, rgba(236, 72, 153, 0.32) 0%, rgba(244, 63, 94, 0.18) 35%, rgba(236, 72, 153, 0.06) 55%, transparent 72%)"
    },
    "stats": [
        {
            "label": "Medical Rank",
            "value": "Director Tier"
        },
        {
            "label": "Punch Impact",
            "value": "1,000 Tons"
        },
        {
            "label": "Heal Speed",
            "value": "Cellular"
        }
    ],
    "skills": [
        {
            "name": "Byakugou Cellular Regeneration",
            "level": 98,
            "category": "Medical"
        },
        {
            "name": "Chakra Scalpel Micro-Surgery",
            "level": 97,
            "category": "Surgery"
        },
        {
            "name": "Seismic Impact Demolition",
            "level": 95,
            "category": "Combat"
        },
        {
            "name": "Crisis Triage Infrastructure",
            "level": 99,
            "category": "Operations"
        }
    ],
    "projects": [
        {
            "id": "triage-telemetry",
            "title": "Konoha Central Hospital Triage System",
            "category": "HealthTech",
            "subtag": "Emergency Ops",
            "desc": "Real-time patient monitoring tracking thousands of wounded shinobi simultaneously with predictive healing schedules.",
            "tags": [
                "Next.js",
                "PostgreSQL",
                "WebSockets"
            ],
            "metrics": "Zero Triage Delays",
            "color": "#ec4899"
        },
        {
            "id": "antidote-synthesis",
            "title": "Sasori Poison Rapid Counter-Synthesizer",
            "category": "BioTech",
            "subtag": "Molecular Chemistry",
            "desc": "Automated chemical compound analyzer decoding lethal multi-toxin poisons and generating antidotes in under 3 minutes.",
            "tags": [
                "Python",
                "Biopython",
                "Molecular FEA"
            ],
            "metrics": "Decoded in 180s",
            "color": "#0284c7"
        },
        {
            "id": "katsuyu-slug-network",
            "title": "Katsuyu Telepathic Tele-Health Mesh",
            "category": "Telehealth",
            "subtag": "Remote Care",
            "desc": "Distributed healing network deploying remote micro-clones providing instant cellular blood transfusions across frontlines.",
            "tags": [
                "Distributed Systems",
                "Go",
                "gRPC"
            ],
            "metrics": "10,000 Simultaneous Heals",
            "color": "#10b981"
        },
        {
            "id": "cherry-blossom-crash",
            "title": "Seismic Impact Simulator",
            "category": "Civil Engineering",
            "subtag": "Demolition Calc",
            "desc": "Structural stress calculator calculating shockwave fracture vectors to shatter bedrock obstacles without causing civilian collapses.",
            "tags": [
                "C++",
                "OpenGL",
                "Physics Engines"
            ],
            "metrics": "Controlled Demolition",
            "color": "#f43f5e"
        }
    ],
    "experiences": [
        {
            "year": "Part I",
            "role": "Genin Shinobi",
            "organization": "Team 7 (Kakashi Unit)",
            "description": "Demonstrated exceptional chakra control and textbook analytical intelligence."
        },
        {
            "year": "Shippuden",
            "role": "Tsunade Elite Disciple",
            "organization": "Leaf Medical Unit",
            "description": "Defeated Akatsuki member Sasori; developed antidotes saving Kankuro's life."
        },
        {
            "year": "Fourth War",
            "role": "Supreme Triage Commander",
            "organization": "Allied Medical Division",
            "description": "Unlocked the Strength of a Hundred Seal, summoned Lady Katsuyu, and healed entire armies."
        },
        {
            "year": "Present",
            "role": "Head of Medical Infrastructure",
            "organization": "Konoha Central Medical Bureau",
            "description": "Pioneering children's mental health clinics and revolutionary surgical procedures."
        }
    ],
    "testimonials": [
        {
            "quote": "Sakura's medical intuition matches Tsunade-sama. When she is in the hospital, no patient is lost.",
            "author": "Shizune",
            "title": "Senior Medical Ninja",
            "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop"
        },
        {
            "quote": "Her punch can shatter mountain plateaus, but her hands are gentle enough to stitch a beating heart.",
            "author": "Naruto Uzumaki",
            "title": "Seventh Hokage",
            "avatar": "/anime/naruto.jpg"
        },
        {
            "quote": "I am proud of the woman and mother she has become. Our home stands strong because of her.",
            "author": "Sasuke Uchiha",
            "title": "Shadow Hokage",
            "avatar": "/anime/sasuke.jpg"
        }
    ],
    "themeTokensCSS": {
        "--accent": "#ec4899",
        "--accent-secondary": "#f43f5e",
        "--bg-primary": "#ffffff",
        "--bg-secondary": "#f8fafc",
        "--text-primary": "#0f172a",
        "--text-secondary": "#334155"
    }
},
  'hinata': {
    "id": "hinata",
    "slug": "hinata",
    "name": "Hinata Hyūga",
    "japaneseName": "日向ヒナタ",
    "series": "Naruto Shippuden",
    "universeBadge": "Byakugan Princess",
    "roleTitle": "Gentle Fist Master & 360° Observability Lead",
    "headline": "Gentle Fist Harmony",
    "tagline": "360° all-seeing observability, delicate chakra alignment, and quiet, unbreakable courage.",
    "statement": "quiet determination guided by clear sight, striking with gentle fist grace and unyielding heart.",
    "bio": "Heiress of the Hyūga Clan and master of the Byakugan. Renowned for all-seeing tenketsu vision, Twin Lion Fists chakra mastery, and a quiet, steadfast heart that faced Pain without stepping back.",
    "price": 36,
    "featuredTag": "Byakugan Master",
    "avatarUrl": "/anime/hinata.jpg",
    "bustUrl": "/anime/hinata.jpg",
    "cardUrl": "/anime/hinata.jpg",
    "layoutArchetype": "flanked-centered",
    "accentAnimationType": "hinata-gentle-fist",
    "location": "Hyūga Main Estate, Fire Country",
    "companionAvatars": [
        "/anime/naruto.jpg",
        "/anime/sakura.jpg",
        "/anime/sasuke.jpg"
    ],
    "companionTrustText": "Venerated Byakugan Princess of the noble Hyūga Clan and Hamura lineage.",
    "brandPartners": [
        {
            "name": "Hyūga Main Chamber",
            "icon": "✦"
        },
        {
            "name": "Byakugan Observability Lab",
            "icon": "◬"
        },
        {
            "name": "Twin Lion Dojo",
            "icon": "⬡"
        },
        {
            "name": "Leaf Recon Division",
            "icon": "◌"
        },
        {
            "name": "Hamura Celestial Archive",
            "icon": "⊚"
        },
        {
            "name": "Gentle Fist Guild",
            "icon": "❖"
        }
    ],
    "focusPillsLeft": [
        {
            "label": "Byakugan Vision",
            "color": "#818cf8",
            "bg": "#eef2ff",
            "border": "#c7d2fe"
        },
        {
            "label": "Twin Lion Fists",
            "color": "#6366f1",
            "bg": "#eef2ff",
            "border": "#c7d2fe"
        },
        {
            "label": "Chakra Needles",
            "color": "#0284c7",
            "bg": "#f0f9ff",
            "border": "#bae6fd"
        }
    ],
    "focusPillsRight": [
        {
            "label": "Eight Trigrams Palm",
            "color": "#ca8a04",
            "bg": "#fefce8",
            "border": "#fef08a"
        },
        {
            "label": "Protective Empathy",
            "color": "#ec4899",
            "bg": "#fdf2f8",
            "border": "#fbcfe8"
        },
        {
            "label": "Support Harmony",
            "color": "#16a34a",
            "bg": "#f0fdf4",
            "border": "#bbf7d0"
        }
    ],
    "focusQuote": {
        "main": "focus is on 360-degree clarity, gentle chakra alignment, and",
        "highlight": "walking forward with quiet, unwavering courage."
    },
    "sinceYear": "since the Chunin Exam Awakening",
    "ctaText": "Let's Talk",
    "colors": {
        "isDark": false,
        "bgPrimary": "#ffffff",
        "bgSecondary": "#f8fafc",
        "bgSurface": "#ffffff",
        "bgGlass": "rgba(255, 255, 255, 0.85)",
        "textPrimary": "#0f172a",
        "textSecondary": "#334155",
        "textMuted": "#64748b",
        "accent": "#6366f1",
        "accentSecondary": "#818cf8",
        "accentGlow": "rgba(99, 102, 241, 0.25)",
        "borderSubtle": "#e2e8f0",
        "borderStrong": "rgba(99, 102, 241, 0.25)",
        "cardShadow": "0 20px 40px -10px rgba(99, 102, 241, 0.08)",
        "badgeBg": "#e0e7ff",
        "badgeText": "#3730a3",
        "gradientHero": "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.32) 0%, rgba(129, 140, 248, 0.18) 35%, rgba(99, 102, 241, 0.06) 55%, transparent 72%)"
    },
    "stats": [
        {
            "label": "Visual Range",
            "value": "10km 360°"
        },
        {
            "label": "Tenketsu Blocked",
            "value": "64 Palms"
        },
        {
            "label": "Chakra Purity",
            "value": "Hamura Tier"
        }
    ],
    "skills": [
        {
            "name": "360-Degree Tenketsu Sight",
            "level": 98,
            "category": "Observability"
        },
        {
            "name": "Twin Lion Fists Chakra Drain",
            "level": 95,
            "category": "Combat"
        },
        {
            "name": "Eight Trigrams Protective Palm",
            "level": 93,
            "category": "Defense"
        },
        {
            "name": "Team Harmony & Quiet Leadership",
            "level": 97,
            "category": "Synergy"
        }
    ],
    "projects": [
        {
            "id": "byakugan-telemetry",
            "title": "Byakugan 360° Observability APM",
            "category": "APM",
            "subtag": "Observability",
            "desc": "Complete stack tracing suite eliminating blind spots and tracking every micro-operation across distributed clusters.",
            "tags": [
                "OpenTelemetry",
                "Rust",
                "Grafana"
            ],
            "metrics": "Zero Blind Spots",
            "color": "#6366f1"
        },
        {
            "id": "twin-lion-security",
            "title": "Twin Lion Threat Depletion Firewall",
            "category": "Cybersecurity",
            "subtag": "WAF",
            "desc": "Advanced web application firewall draining malicious bot traffic and neutralizing DDoS attacks before reaching databases.",
            "tags": [
                "Go",
                "eBPF",
                "Linux"
            ],
            "metrics": "99.9% Malice Absorbed",
            "color": "#818cf8"
        },
        {
            "id": "chakra-network-debugger",
            "title": "Tenketsu System Call Debugger",
            "category": "DevTools",
            "subtag": "Memory Profiler",
            "desc": "Interactive memory and thread debugger identifying deadlocks and chakra blockages inside high-speed compiled binaries.",
            "tags": [
                "C",
                "GDB",
                "Electron UI"
            ],
            "metrics": "Pinpoint 361 Nodes",
            "color": "#0284c7"
        },
        {
            "id": "celestial-harmony-portal",
            "title": "Hamura Heritage Sanctuary Portal",
            "category": "Cultural",
            "subtag": "Archives",
            "desc": "High-definition digital repository preserving ancient Hyūga scrolls, meditative martial katas, and celestial star maps.",
            "tags": [
                "Next.js",
                "Three.js",
                "TailwindCSS"
            ],
            "metrics": "Decoded Star Lore",
            "color": "#10b981"
        }
    ],
    "experiences": [
        {
            "year": "Genin Era",
            "role": "Kunoichi of Team 8",
            "organization": "Kurenai Recon Unit",
            "description": "Advanced reconnaissance, tracking, and survival alongside Kiba and Shino."
        },
        {
            "year": "Shippuden",
            "role": "Heroic Defender",
            "organization": "Battle of the Leaf (Pain Invasion)",
            "description": "Stepped into the crater alone against Pain to defend Naruto, changing the course of the village."
        },
        {
            "year": "Fourth War",
            "role": "Frontline Diviner",
            "organization": "Allied Recon & Vanguard",
            "description": "Used Byakugan to guide the Allied Shinobi Forces and protected the fallen with Neji's spirit."
        },
        {
            "year": "The Last Era",
            "role": "Byakugan Princess",
            "organization": "Hamura Moon Campaign",
            "description": "Awakened Hamura's celestial chakra and deactivated the Tenseigan altar to preserve Earth."
        }
    ],
    "testimonials": [
        {
            "quote": "Hinata gave me the courage to stand up when I was completely beaten down. Her heart is stronger than anyone knows.",
            "author": "Naruto Uzumaki",
            "title": "Seventh Hokage",
            "avatar": "/anime/naruto.jpg"
        },
        {
            "quote": "Her Twin Lion Fists possess unmatched purity. She represents the true nobility of the Hyūga.",
            "author": "Hiashi Hyūga",
            "title": "Hyūga Clan Elder",
            "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop"
        },
        {
            "quote": "Hinata is our gentle anchor. In any storm, her vision cuts straight through the noise.",
            "author": "Sakura Haruno",
            "title": "Chief Medical Ninja",
            "avatar": "/anime/sakura.jpg"
        }
    ],
    "themeTokensCSS": {
        "--accent": "#6366f1",
        "--accent-secondary": "#818cf8",
        "--bg-primary": "#ffffff",
        "--bg-secondary": "#f8fafc",
        "--text-primary": "#0f172a",
        "--text-secondary": "#334155"
    }
},
  'luffy': {
    "id": "luffy",
    "slug": "luffy",
    "name": "Monkey D. Luffy",
    "japaneseName": "モンキー・D・ルフィ",
    "series": "One Piece",
    "universeBadge": "Fifth Emperor / Sun God",
    "roleTitle": "Emperor of the Sea & Radical Freedom Architect",
    "headline": "King of the Pirates",
    "tagline": "Infinite elasticity, Sun God Nika joy, and breaking every cage on the open ocean.",
    "statement": "living with absolute freedom on the open seas, connecting comrades and chasing the horizon.",
    "bio": "Captain of the Straw Hat Pirates and Emperor of the Sea. Awakened the Mythical Zoan Sun God Nika fruit, laughing through impossible battles and bending reality to ensure everyone around him can feast and live in freedom.",
    "price": 49,
    "featuredTag": "Emperor Tier",
    "avatarUrl": "/anime/luffy.jpg",
    "bustUrl": "/anime/luffy.jpg",
    "cardUrl": "/anime/luffy.jpg",
    "layoutArchetype": "flanked-centered",
    "accentAnimationType": "luffy-nika-clouds",
    "location": "Thousand Sunny, The Grand Line",
    "companionAvatars": [
        "/anime/ace.jpg",
        "/anime/sabo.jpg",
        "/anime/nami.jpg"
    ],
    "companionTrustText": "Commanding the Straw Hat Grand Fleet of 5,600 warriors across the New World.",
    "brandPartners": [
        {
            "name": "Straw Hat Grand Fleet",
            "icon": "✦"
        },
        {
            "name": "Sunny Shipwright Guild",
            "icon": "◬"
        },
        {
            "name": "Wano Liberation Front",
            "icon": "⬡"
        },
        {
            "name": "Red-Haired Allies",
            "icon": "◌"
        },
        {
            "name": "Baratie Culinary Fleet",
            "icon": "⊚"
        },
        {
            "name": "Sun God Festival",
            "icon": "❖"
        }
    ],
    "focusPillsLeft": [
        {
            "label": "Gear Fifth Dynamics",
            "color": "#ef4444",
            "bg": "#fef2f2",
            "border": "#fecaca"
        },
        {
            "label": "Advanced Conqueror",
            "color": "#f59e0b",
            "bg": "#fef3c7",
            "border": "#fde68a"
        },
        {
            "label": "Rubber Elasticity",
            "color": "#0284c7",
            "bg": "#f0f9ff",
            "border": "#bae6fd"
        }
    ],
    "focusPillsRight": [
        {
            "label": "Crew Camaraderie",
            "color": "#16a34a",
            "bg": "#f0fdf4",
            "border": "#bbf7d0"
        },
        {
            "label": "Horizon Sailing",
            "color": "#ca8a04",
            "bg": "#fefce8",
            "border": "#fef08a"
        },
        {
            "label": "Feast Organizing",
            "color": "#ea580c",
            "bg": "#fff7ed",
            "border": "#fed7aa"
        }
    ],
    "focusQuote": {
        "main": "focus is on unbounded imagination, relentless cheer, and",
        "highlight": "carving a path where everyone can eat and smile freely."
    },
    "sinceYear": "since Setting Sail from Foosha Village",
    "ctaText": "Let's Talk",
    "colors": {
        "isDark": false,
        "bgPrimary": "#ffffff",
        "bgSecondary": "#f8fafc",
        "bgSurface": "#ffffff",
        "bgGlass": "rgba(255, 255, 255, 0.85)",
        "textPrimary": "#0f172a",
        "textSecondary": "#334155",
        "textMuted": "#64748b",
        "accent": "#ef4444",
        "accentSecondary": "#f59e0b",
        "accentGlow": "rgba(239, 68, 68, 0.25)",
        "borderSubtle": "#e2e8f0",
        "borderStrong": "rgba(239, 68, 68, 0.25)",
        "cardShadow": "0 20px 40px -10px rgba(239, 68, 68, 0.08)",
        "badgeBg": "#fee2e2",
        "badgeText": "#991b1b",
        "gradientHero": "radial-gradient(ellipse at center, rgba(239, 68, 68, 0.32) 0%, rgba(245, 158, 11, 0.18) 35%, rgba(239, 68, 68, 0.06) 55%, transparent 72%)"
    },
    "stats": [
        {
            "label": "Bounty",
            "value": "3,000,000,000฿"
        },
        {
            "label": "Grand Fleet",
            "value": "5,600 Strong"
        },
        {
            "label": "Heartbeat Rhythm",
            "value": "Drums of Liberation"
        }
    ],
    "skills": [
        {
            "name": "Gear 5 Reality-Bending Physics",
            "level": 99,
            "category": "Mythical"
        },
        {
            "name": "Advanced Conqueror Haki Infusion",
            "level": 98,
            "category": "Haki"
        },
        {
            "name": "Future-Sight Observation Haki",
            "level": 94,
            "category": "Perception"
        },
        {
            "name": "Global Feast Community Organizing",
            "level": 100,
            "category": "Culture"
        }
    ],
    "projects": [
        {
            "id": "drums-of-liberation-mesh",
            "title": "Drums of Liberation Elastic Engine",
            "category": "Animation",
            "subtag": "Physics Shader",
            "desc": "Unshackled physics engine bending 3D models into cartoon rubber geometries with whimsical joy and zero frame drops.",
            "tags": [
                "Three.js",
                "GLSL",
                "WebGL"
            ],
            "metrics": "120 FPS Uncapped Joy",
            "color": "#ef4444"
        },
        {
            "id": "grand-fleet-fleetops",
            "title": "Straw Hat Grand Fleet Coordination Hub",
            "category": "Logistics",
            "subtag": "Fleet Network",
            "desc": "Vessel tracking platform communicating via Vivre Card pings across Grand Line magnetic interference zones.",
            "tags": [
                "Go",
                "WebSockets",
                "GIS"
            ],
            "metrics": "5,600 Ships Linked",
            "color": "#f59e0b"
        },
        {
            "id": "meat-tracker-portal",
            "title": "Sanji All-You-Can-Eat Meat Logistics",
            "category": "FoodTech",
            "subtag": "Inventory Grid",
            "desc": "Automated galley inventory monitoring ensuring meat, sea king barrels, and banquet supplies are always replenished.",
            "tags": [
                "Next.js",
                "PostgreSQL",
                "TailwindCSS"
            ],
            "metrics": "Zero Starvation",
            "color": "#ea580c"
        },
        {
            "id": "wano-reclamation",
            "title": "Wano Clean Water Environmental Grid",
            "category": "Ecology",
            "subtag": "Water Grid",
            "desc": "River purification and clean food supply restoration telemetry across all six provinces of Wano Country.",
            "tags": [
                "IoT",
                "Python",
                "Grafana"
            ],
            "metrics": "100% Pure Clean Water",
            "color": "#10b981"
        }
    ],
    "experiences": [
        {
            "year": "East Blue",
            "role": "Captain",
            "organization": "Straw Hat Pirates",
            "description": "Gathered core crew: Zoro, Nami, Usopp, Sanji; defeated Arlong to enter the Grand Line."
        },
        {
            "year": "Paradise",
            "role": "Warlord Slayer",
            "organization": "Straw Hat Crew",
            "description": "Toppled Crocodile in Alabasta, rang the golden bell in Skypiea, and declared war on the World Government at Enies Lobby."
        },
        {
            "year": "New World",
            "role": "Yonko Challenger",
            "organization": "Ninja-Pirate-Mink-Samurai Alliance",
            "description": "Formed grand alliance in Dressrosa; infiltrated Whole Cake Island; awakened Sun God Nika in Wano."
        },
        {
            "year": "Present",
            "role": "Emperor of the Sea",
            "organization": "Straw Hat Grand Fleet",
            "description": "Claiming territory, liberating island nations, and racing toward the final island of Laugh Tale."
        }
    ],
    "testimonials": [
        {
            "quote": "Luffy is the man who will become the King of the Pirates! I will never yield my blades until his dream is reality.",
            "author": "Roronoa Zoro",
            "title": "King of Hell Swordsman",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
        },
        {
            "quote": "My little brother has always been reckless, but wherever he walks, smiles and sunrise always follow.",
            "author": "Portgas D. Ace",
            "title": "Second Division Commander",
            "avatar": "/anime/ace.jpg"
        },
        {
            "quote": "He drew me out of the darkness and charted a map of freedom for us all. The Sunny will carry him to the end of the world.",
            "author": "Nami",
            "title": "Cat Burglar Navigator",
            "avatar": "/anime/nami.jpg"
        }
    ],
    "themeTokensCSS": {
        "--accent": "#ef4444",
        "--accent-secondary": "#f59e0b",
        "--bg-primary": "#ffffff",
        "--bg-secondary": "#f8fafc",
        "--text-primary": "#0f172a",
        "--text-secondary": "#334155"
    }
},
  'ace': {
    "id": "ace",
    "slug": "ace",
    "name": "Portgas D. Ace",
    "japaneseName": "ポートガス・D・エース",
    "series": "One Piece",
    "universeBadge": "Fire Fist",
    "roleTitle": "Second Division Commander & Thermal Power Architect",
    "headline": "Fire Fist of Whitebeard",
    "tagline": "Blazing logia firestorms, sworn brotherhood, and living a life without a single regret.",
    "statement": "blazing brightly without a single regret, illuminating the path for those who follow behind.",
    "bio": "Son of the Pirate King Gol D. Roger and beloved Second Division Commander of the Whitebeard Pirates. Wielded the Mera Mera no Mi, illuminating the oceans with devastating Fire Fist cannons and unbending loyalty to his family.",
    "price": 44,
    "featuredTag": "Legendary Flame",
    "avatarUrl": "/anime/ace.jpg",
    "bustUrl": "/anime/ace.jpg",
    "cardUrl": "/anime/ace.jpg",
    "layoutArchetype": "flanked-centered",
    "accentAnimationType": "ace-fire-embers",
    "location": "Moby Dick Flagship, New World",
    "companionAvatars": [
        "/anime/luffy.jpg",
        "/anime/sabo.jpg",
        "/anime/nami.jpg"
    ],
    "companionTrustText": "Beloved Commander of the Whitebeard Pirates and elder brother to Luffy.",
    "brandPartners": [
        {
            "name": "Whitebeard Grand Fleet",
            "icon": "✦"
        },
        {
            "name": "Spade Pirates Archive",
            "icon": "◬"
        },
        {
            "name": "Moby Dick Flagship",
            "icon": "⬡"
        },
        {
            "name": "Brotherhood Sake Oath",
            "icon": "◌"
        },
        {
            "name": "Fire Fist Forge",
            "icon": "⊚"
        },
        {
            "name": "Striker Skiff Navigators",
            "icon": "❖"
        }
    ],
    "focusPillsLeft": [
        {
            "label": "Fire Fist Cannon",
            "color": "#ea580c",
            "bg": "#fff7ed",
            "border": "#fed7aa"
        },
        {
            "label": "Flame Pillar Barrier",
            "color": "#dc2626",
            "bg": "#fef2f2",
            "border": "#fecaca"
        },
        {
            "label": "Logia Dispersion",
            "color": "#f59e0b",
            "bg": "#fef3c7",
            "border": "#fde68a"
        }
    ],
    "focusPillsRight": [
        {
            "label": "Brotherhood Oath",
            "color": "#ca8a04",
            "bg": "#fefce8",
            "border": "#fef08a"
        },
        {
            "label": "Ocean Navigation",
            "color": "#0284c7",
            "bg": "#f0f9ff",
            "border": "#bae6fd"
        },
        {
            "label": "Commander Strategy",
            "color": "#16a34a",
            "bg": "#f0fdf4",
            "border": "#bbf7d0"
        }
    ],
    "focusQuote": {
        "main": "focus is on fierce loyalty, roaring flame architecture, and",
        "highlight": "living a life of blazing honor with zero regrets."
    },
    "sinceYear": "since the Spade Pirates Era",
    "ctaText": "Let's Talk",
    "colors": {
        "isDark": false,
        "bgPrimary": "#ffffff",
        "bgSecondary": "#f8fafc",
        "bgSurface": "#ffffff",
        "bgGlass": "rgba(255, 255, 255, 0.85)",
        "textPrimary": "#0f172a",
        "textSecondary": "#334155",
        "textMuted": "#64748b",
        "accent": "#ea580c",
        "accentSecondary": "#dc2626",
        "accentGlow": "rgba(234, 88, 12, 0.25)",
        "borderSubtle": "#e2e8f0",
        "borderStrong": "rgba(234, 88, 12, 0.25)",
        "cardShadow": "0 20px 40px -10px rgba(234, 88, 12, 0.08)",
        "badgeBg": "#ffedd5",
        "badgeText": "#9a3412",
        "gradientHero": "radial-gradient(ellipse at center, rgba(234, 88, 12, 0.32) 0%, rgba(220, 38, 38, 0.18) 35%, rgba(234, 88, 12, 0.06) 55%, transparent 72%)"
    },
    "stats": [
        {
            "label": "Bounty",
            "value": "550,000,000฿"
        },
        {
            "label": "Thermal Power",
            "value": "Hiken 5,000°C"
        },
        {
            "label": "Regrets in Life",
            "value": "Zero"
        }
    ],
    "skills": [
        {
            "name": "Hiken Fire Fist Blast",
            "level": 98,
            "category": "Thermal"
        },
        {
            "name": "Logia Flame Dispersion & Flight",
            "level": 95,
            "category": "Mobility"
        },
        {
            "name": "Striker Skiff Thermal Propulsion",
            "level": 92,
            "category": "Maritime"
        },
        {
            "name": "Loyalty & Vanguard Sacrifice",
            "level": 100,
            "category": "Character"
        }
    ],
    "projects": [
        {
            "id": "hiken-thermal-reactor",
            "title": "Hiken High-Thermal Blast Engine",
            "category": "Energy",
            "subtag": "Combustion Simulator",
            "desc": "Combustion modeling engine simulating 5,000°C concentrated thermal shockwaves across naval fleet formations.",
            "tags": [
                "C++",
                "CUDA",
                "CFD Simulation"
            ],
            "metrics": "Single Shot Fleet Wipe",
            "color": "#ea580c"
        },
        {
            "id": "striker-propulsion",
            "title": "Striker Personal Skiff Propulsion",
            "category": "Mobility",
            "subtag": "Thermal Drive",
            "desc": "Single-pilot hydro-glider powered directly by rear foot flame propulsion, outrunning galleons across calm belts.",
            "tags": [
                "Embedded Systems",
                "IoT",
                "Telemetry"
            ],
            "metrics": "60 Knots Ocean Speed",
            "color": "#dc2626"
        },
        {
            "id": "brotherhood-sake-network",
            "title": "ASL Brotherhood Memorial Registry",
            "category": "Archives",
            "subtag": "Encrypted Legacy",
            "desc": "Encrypted peer-to-peer memorial vault preserving childhood memories, treehouse logs, and eternal oaths between Ace, Sabo, and Luffy.",
            "tags": [
                "Next.js",
                "Web3",
                "IPFS"
            ],
            "metrics": "Eternal Bond Encrypted",
            "color": "#f59e0b"
        },
        {
            "id": "flame-emperor-defense",
            "title": "Dai Enkai Flame Emperor Barrier",
            "category": "Defense",
            "subtag": "Thermal Dome",
            "desc": "Solar-scale spherical plasma shield absorbing incoming orbital artillery shells and converting blast shock into radiant heat.",
            "tags": [
                "Rust",
                "Vector Math",
                "WebGL"
            ],
            "metrics": "Solar Plasma Shield",
            "color": "#10b981"
        }
    ],
    "experiences": [
        {
            "year": "Childhood",
            "role": "Sworn Elder Brother",
            "organization": "ASL Treehouse (Mt. Colubo)",
            "description": "Hunted mountain tigers, hoarded treasure, and exchanged the cup of sake with Sabo and Luffy."
        },
        {
            "year": "Spade Era",
            "role": "Captain",
            "organization": "Spade Pirates",
            "description": "Formed crew in the East Blue, sailed to the New World, and earned a 500M+ bounty within months."
        },
        {
            "year": "Whitebeard",
            "role": "Second Division Commander",
            "organization": "Whitebeard Pirates",
            "description": "Commanded the second fleet, earning the eternal fatherly love of Edward Newgate."
        },
        {
            "year": "Marineford",
            "role": "Legendary Flame",
            "organization": "Summit War",
            "description": "Protected Luffy until his final breath, thanking his brothers and family for loving him."
        }
    ],
    "testimonials": [
        {
            "quote": "Thank you for loving someone like me, who had the blood of a demon in his veins... until this very day!",
            "author": "Portgas D. Ace",
            "title": "Fire Fist",
            "avatar": "/anime/ace.jpg"
        },
        {
            "quote": "He was my son, and I would tear down the entire Marine headquarters to keep him safe.",
            "author": "Edward Newgate",
            "title": "Whitebeard / Emperor of the Sea",
            "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop"
        },
        {
            "quote": "Ace's will did not die that day. It burns inside my flames and inside Luffy's journey toward the horizon.",
            "author": "Sabo",
            "title": "Chief of Staff, Revolutionary Army",
            "avatar": "/anime/sabo.jpg"
        }
    ],
    "themeTokensCSS": {
        "--accent": "#ea580c",
        "--accent-secondary": "#dc2626",
        "--bg-primary": "#ffffff",
        "--bg-secondary": "#f8fafc",
        "--text-primary": "#0f172a",
        "--text-secondary": "#334155"
    }
},
  'sabo': {
    "id": "sabo",
    "slug": "sabo",
    "name": "Sabo",
    "japaneseName": "サボ",
    "series": "One Piece",
    "universeBadge": "Flame Emperor / Chief of Staff",
    "roleTitle": "Chief of Staff & Revolutionary Systems Architect",
    "headline": "Flame Emperor",
    "tagline": "Dragon Claw martial leverage, revolutionary decentralization, and inheritance of the flame.",
    "statement": "channeling dragon claw martial power and revolutionary fire to overthrow corrupt structures.",
    "bio": "Chief of Staff of the Revolutionary Army and sworn brother to Ace and Luffy. Master of the Ryusoken Dragon Claw style, now inherited with Ace's Mera Mera no Mi to spearhead the global campaign against the World Nobles.",
    "price": 42,
    "featuredTag": "Revolutionary",
    "avatarUrl": "/anime/sabo.jpg",
    "bustUrl": "/anime/sabo.jpg",
    "cardUrl": "/anime/sabo.jpg",
    "layoutArchetype": "flanked-centered",
    "accentAnimationType": "sabo-dragon-flames",
    "location": "Baltigo Base, Revolutionary Army HQ",
    "companionAvatars": [
        "/anime/luffy.jpg",
        "/anime/ace.jpg",
        "/anime/nami.jpg"
    ],
    "companionTrustText": "Second-in-command of the Revolutionary Army behind Supreme Commander Monkey D. Dragon.",
    "brandPartners": [
        {
            "name": "Revolutionary Army Command",
            "icon": "✦"
        },
        {
            "name": "Dragon Claw Academy",
            "icon": "◬"
        },
        {
            "name": "Baltigo Strategic Archives",
            "icon": "⬡"
        },
        {
            "name": "Kamabakka Haven Hub",
            "icon": "◌"
        },
        {
            "name": "Underground Liberation Net",
            "icon": "⊚"
        },
        {
            "name": "Inherited Flame Forge",
            "icon": "❖"
        }
    ],
    "focusPillsLeft": [
        {
            "label": "Dragon Talon Style",
            "color": "#2563eb",
            "bg": "#eff6ff",
            "border": "#bfdbfe"
        },
        {
            "label": "Mera Mera Synthesis",
            "color": "#ea580c",
            "bg": "#fff7ed",
            "border": "#fed7aa"
        },
        {
            "label": "Pipe Combat",
            "color": "#475569",
            "bg": "#f8fafc",
            "border": "#e2e8f0"
        }
    ],
    "focusPillsRight": [
        {
            "label": "Underground Logistics",
            "color": "#16a34a",
            "bg": "#f0fdf4",
            "border": "#bbf7d0"
        },
        {
            "label": "Revolutionary Intel",
            "color": "#ca8a04",
            "bg": "#fefce8",
            "border": "#fef08a"
        },
        {
            "label": "Strategic Infiltration",
            "color": "#7c3aed",
            "bg": "#f5f3ff",
            "border": "#ddd6fe"
        }
    ],
    "focusQuote": {
        "main": "focus is on dismantling oppressive systems, dragon fist precision, and",
        "highlight": "igniting global change for a freer world."
    },
    "sinceYear": "since the Baltigo Training Era",
    "ctaText": "Let's Talk",
    "colors": {
        "isDark": false,
        "bgPrimary": "#ffffff",
        "bgSecondary": "#f8fafc",
        "bgSurface": "#ffffff",
        "bgGlass": "rgba(255, 255, 255, 0.85)",
        "textPrimary": "#0f172a",
        "textSecondary": "#334155",
        "textMuted": "#64748b",
        "accent": "#2563eb",
        "accentSecondary": "#ea580c",
        "accentGlow": "rgba(37, 99, 235, 0.25)",
        "borderSubtle": "#e2e8f0",
        "borderStrong": "rgba(37, 99, 235, 0.25)",
        "cardShadow": "0 20px 40px -10px rgba(37, 99, 235, 0.08)",
        "badgeBg": "#dbeafe",
        "badgeText": "#1e40af",
        "gradientHero": "radial-gradient(ellipse at center, rgba(37, 99, 235, 0.32) 0%, rgba(234, 88, 12, 0.18) 35%, rgba(37, 99, 235, 0.06) 55%, transparent 72%)"
    },
    "stats": [
        {
            "label": "Rank",
            "value": "Chief of Staff #2"
        },
        {
            "label": "Dragon Grip Power",
            "value": "Shatters Steel"
        },
        {
            "label": "Infiltrations",
            "value": "Mariejois Level"
        }
    ],
    "skills": [
        {
            "name": "Ryusoken Core Destruction",
            "level": 98,
            "category": "Combat"
        },
        {
            "name": "Flame Fist Integration",
            "level": 96,
            "category": "Logia"
        },
        {
            "name": "Global Underground Intelligence",
            "level": 97,
            "category": "Ops"
        },
        {
            "name": "Asymmetrical Infiltration",
            "level": 95,
            "category": "Tactics"
        }
    ],
    "projects": [
        {
            "id": "ryusoken-core-shatter",
            "title": "Dragon Claw Structural Core Analyzer",
            "category": "Physics",
            "subtag": "Stress Concentration",
            "desc": "Identifies the central structural focal point of armored battleships or fortresses, shattering them with fingers alone.",
            "tags": [
                "C++",
                "FEA Analysis",
                "Vibration Dynamics"
            ],
            "metrics": "Single-Tap Structural Fracture",
            "color": "#2563eb"
        },
        {
            "id": "liberation-comms-net",
            "title": "Den Den Mushi Ghost Encryption",
            "category": "Cybersecurity",
            "subtag": "Encrypted Comms",
            "desc": "End-to-end encrypted snail mesh network transmitting intelligence between revolutionary cells without interception.",
            "tags": [
                "Rust",
                "Zero-Knowledge",
                "P2P Mesh"
            ],
            "metrics": "Unbreakable Transmissions",
            "color": "#ea580c"
        },
        {
            "id": "mariejois-stealth-map",
            "title": "Holy Land Infiltration Topology",
            "category": "Mapping",
            "subtag": "Subterranean GIS",
            "desc": "3D architectural blueprint of the Red Line plateau, uncovering slave conveyor shafts and emergency extraction routes.",
            "tags": [
                "Next.js",
                "Three.js",
                "TailwindCSS"
            ],
            "metrics": "Full Red Line Topology",
            "color": "#10b981"
        },
        {
            "id": "flame-fist-heritage",
            "title": "Ace Flame Inheritance Simulator",
            "category": "Analytics",
            "subtag": "Technique Library",
            "desc": "Interactive archive cross-referencing Ace's battle records to synthesize Dragon Claw martial arts with fire logia attacks.",
            "tags": [
                "TypeScript",
                "WebGL",
                "React"
            ],
            "metrics": "Seamless Martial Blend",
            "color": "#f59e0b"
        }
    ],
    "experiences": [
        {
            "year": "Childhood",
            "role": "Sworn Brother",
            "organization": "Mt. Colubo ASL Brothers",
            "description": "Rebelled against noble aristocracy; survived celestial dragon cannon attack."
        },
        {
            "year": "Youth",
            "role": "Apprentice Revolutionary",
            "organization": "Revolutionary Army Command",
            "description": "Rescued and mentored by Monkey D. Dragon; trained with Hack and Koala in hand-to-hand combat."
        },
        {
            "year": "Dressrosa",
            "role": "Chief of Staff",
            "organization": "Corrida Colosseum Operation",
            "description": "Reunited with Luffy; won the Mera Mera no Mi and inherited Ace's blazing will."
        },
        {
            "year": "Reverie",
            "role": "Flame Emperor",
            "organization": "Mariejois Infiltration",
            "description": "Rescued Bartholomew Kuma, witnessed the Empty Throne, and ignited revolutions across 8 nations."
        }
    ],
    "testimonials": [
        {
            "quote": "Sabo is Dragon-san's proudest protégé. His Dragon Claw technique doesn't leave a single brick intact.",
            "author": "Koala",
            "title": "Assistant Revolutionary Officer",
            "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop"
        },
        {
            "quote": "I thought I lost both of them... but Sabo is alive, and he has Ace's fire! There is no one I trust more!",
            "author": "Monkey D. Luffy",
            "title": "Straw Hat Captain",
            "avatar": "/anime/luffy.jpg"
        },
        {
            "quote": "The flame will never be extinguished. As long as injustice exists, the Flame Emperor will strike.",
            "author": "Monkey D. Dragon",
            "title": "Supreme Commander",
            "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop"
        }
    ],
    "themeTokensCSS": {
        "--accent": "#2563eb",
        "--accent-secondary": "#ea580c",
        "--bg-primary": "#ffffff",
        "--bg-secondary": "#f8fafc",
        "--text-primary": "#0f172a",
        "--text-secondary": "#334155"
    }
},
  'nami': {
    "id": "nami",
    "slug": "nami",
    "name": "Nami",
    "japaneseName": "ナミ",
    "series": "One Piece",
    "universeBadge": "Cat Burglar / Master Navigator",
    "roleTitle": "Master Navigator & Atmospheric Systems Engineer",
    "headline": "Weather Witch",
    "tagline": "Grand Line meteorology, micro-climate weather manipulation, and precision charting.",
    "statement": "mapping every ocean wave and commanding the weather to guide our dreams to safe harbor.",
    "bio": "Navigator of the Straw Hat Pirates. A genius cartographer and meteorologist who can predict ocean storms through subtle barometric skin sensations, commanding Zeus and the Sorcery Clima-Tact to unleash lightning strikes.",
    "price": 37,
    "featuredTag": "Master Navigator",
    "avatarUrl": "/anime/nami.jpg",
    "bustUrl": "/anime/nami.jpg",
    "cardUrl": "/anime/nami.jpg",
    "layoutArchetype": "flanked-centered",
    "accentAnimationType": "nami-clima-tact",
    "location": "Navigational Quarterdeck, Weatheria",
    "companionAvatars": [
        "/anime/luffy.jpg",
        "/anime/ace.jpg",
        "/anime/sabo.jpg"
    ],
    "companionTrustText": "Guided the Thousand Sunny safely through every cyclone across the Grand Line.",
    "brandPartners": [
        {
            "name": "Weatheria Science Institute",
            "icon": "✦"
        },
        {
            "name": "Straw Hat Navigator Deck",
            "icon": "◬"
        },
        {
            "name": "Grand Line Cartography Guild",
            "icon": "⬡"
        },
        {
            "name": "Zeus Thunder Cloud Core",
            "icon": "◌"
        },
        {
            "name": "Cocoyashi Orange Groves",
            "icon": "⊚"
        },
        {
            "name": "Log Pose Calibration Lab",
            "icon": "❖"
        }
    ],
    "focusPillsLeft": [
        {
            "label": "Clima-Tact Weather",
            "color": "#06b6d4",
            "bg": "#ecfeff",
            "border": "#a5f3fc"
        },
        {
            "label": "Cartography & Mapping",
            "color": "#0284c7",
            "bg": "#f0f9ff",
            "border": "#bae6fd"
        },
        {
            "label": "Thunderbolt Tempo",
            "color": "#ca8a04",
            "bg": "#fefce8",
            "border": "#fef08a"
        }
    ],
    "focusPillsRight": [
        {
            "label": "Treasury Management",
            "color": "#ea580c",
            "bg": "#fff7ed",
            "border": "#fed7aa"
        },
        {
            "label": "Log Pose Trajectory",
            "color": "#16a34a",
            "bg": "#f0fdf4",
            "border": "#bbf7d0"
        },
        {
            "label": "Tide Optimization",
            "color": "#6366f1",
            "bg": "#eef2ff",
            "border": "#c7d2fe"
        }
    ],
    "focusQuote": {
        "main": "focus is on navigating treacherous currents, reading the atmosphere, and",
        "highlight": "steering the ship safely toward uncharted dreams."
    },
    "sinceYear": "since Arlong Park Liberation",
    "ctaText": "Let's Talk",
    "colors": {
        "isDark": false,
        "bgPrimary": "#ffffff",
        "bgSecondary": "#f8fafc",
        "bgSurface": "#ffffff",
        "bgGlass": "rgba(255, 255, 255, 0.85)",
        "textPrimary": "#0f172a",
        "textSecondary": "#334155",
        "textMuted": "#64748b",
        "accent": "#06b6d4",
        "accentSecondary": "#f59e0b",
        "accentGlow": "rgba(6, 182, 212, 0.25)",
        "borderSubtle": "#e2e8f0",
        "borderStrong": "rgba(6, 182, 212, 0.25)",
        "cardShadow": "0 20px 40px -10px rgba(6, 182, 212, 0.08)",
        "badgeBg": "#cffafe",
        "badgeText": "#155e75",
        "gradientHero": "radial-gradient(ellipse at center, rgba(6, 182, 212, 0.32) 0%, rgba(245, 158, 11, 0.18) 35%, rgba(6, 182, 212, 0.06) 55%, transparent 72%)"
    },
    "stats": [
        {
            "label": "World Map",
            "value": "80% Charted"
        },
        {
            "label": "Storm Prediction",
            "value": "100% Accuracy"
        },
        {
            "label": "Zeus Thunder",
            "value": "100k Volts"
        }
    ],
    "skills": [
        {
            "name": "Micro-Atmospheric Climate Manipulation",
            "level": 98,
            "category": "Meteorology"
        },
        {
            "name": "Grand Line Triple Log Pose Navigation",
            "level": 99,
            "category": "Cartography"
        },
        {
            "name": "Zeus Lightning Discharge Artillery",
            "level": 95,
            "category": "Combat"
        },
        {
            "name": "Financial Asset & Treasury Control",
            "level": 100,
            "category": "Finance"
        }
    ],
    "projects": [
        {
            "id": "weatheria-atmospheric-model",
            "title": "Weatheria Global Climate Telemetry",
            "category": "Meteorology",
            "subtag": "Predictive Climate",
            "desc": "Advanced atmospheric simulator anticipating Knock Up Streams, cyclone funnels, and oceanic pressure drops.",
            "tags": [
                "Python",
                "SciPy",
                "GIS Mapping"
            ],
            "metrics": "100% Storm Prediction",
            "color": "#06b6d4"
        },
        {
            "id": "zeus-thunderbolt-tempo",
            "title": "Zeus Cloud Pulse Accelerator",
            "category": "Artillery",
            "subtag": "Lightning Controller",
            "desc": "Sorcery Clima-Tact interface directing hungry thundercloud soul entities to discharge directional high-voltage lightning.",
            "tags": [
                "C",
                "Embedded Sensors",
                "PWM"
            ],
            "metrics": "100,000 Volts Precision",
            "color": "#f59e0b"
        },
        {
            "id": "world-ocean-cartography",
            "title": "Grand Line Interactive World Map",
            "category": "Mapping",
            "subtag": "Vector GIS",
            "desc": "Ultra-high-definition interactive nautical map documenting ocean depths, reef hazards, and magnetic compass alignments.",
            "tags": [
                "Next.js",
                "Mapbox GL",
                "TailwindCSS"
            ],
            "metrics": "Uncharted Horizons Mapped",
            "color": "#0284c7"
        },
        {
            "id": "straw-hat-treasury",
            "title": "Straw Hat Berry Treasury Dashboard",
            "category": "Fintech",
            "subtag": "Budget Ledger",
            "desc": "Iron-fisted financial analytics dashboard preventing Luffy from blowing the ship maintenance fund on party banquets.",
            "tags": [
                "React",
                "Chart.js",
                "PostgreSQL"
            ],
            "metrics": "Zero Berries Leaked",
            "color": "#10b981"
        }
    ],
    "experiences": [
        {
            "year": "Early Years",
            "role": "Cat Burglar Cartographer",
            "organization": "Cocoyashi Village",
            "description": "Secretly amassed 100 million berries while mapping dangerous sea routes under Arlong."
        },
        {
            "year": "East Blue",
            "role": "Official Navigator",
            "organization": "Straw Hat Pirates",
            "description": "Joined Luffy; steered the Going Merry safely through Reverse Mountain into the Grand Line."
        },
        {
            "year": "Timeskip",
            "role": "Atmospheric Researcher",
            "organization": "Weatheria Sky Island",
            "description": "Studied wind knots, weather balls, and micro-cloud dynamics under Professor Haredas."
        },
        {
            "year": "Wano / Egghead",
            "role": "Zeus Master & Lead Navigator",
            "organization": "Yonko Straw Hat Fleet",
            "description": "Tamed Big Mom's homie Zeus, outmaneuvering marine admiral armadas in the New World."
        }
    ],
    "testimonials": [
        {
            "quote": "If Nami says the sea is going to rise, you turn the helm immediately. She reads the weather like breathing.",
            "author": "Monkey D. Luffy",
            "title": "Straw Hat Captain",
            "avatar": "/anime/luffy.jpg"
        },
        {
            "quote": "Her weather knowledge surpasses even veteran marine vice-admirals. She is an indispensable treasure.",
            "author": "Nico Robin",
            "title": "Archaeologist",
            "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop"
        },
        {
            "quote": "Our orange groves in Cocoyashi will always bloom because of her courage and genius.",
            "author": "Nojiko",
            "title": "Beloved Sister",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
        }
    ],
    "themeTokensCSS": {
        "--accent": "#06b6d4",
        "--accent-secondary": "#f59e0b",
        "--bg-primary": "#ffffff",
        "--bg-secondary": "#f8fafc",
        "--text-primary": "#0f172a",
        "--text-secondary": "#334155"
    }
},
  'zero-two': {
    "id": "zero-two",
    "slug": "zero-two",
    "name": "Zero Two",
    "japaneseName": "ゼロツー",
    "series": "Darling in the Franxx",
    "universeBadge": "Partner Killer / Code:002",
    "roleTitle": "Elite Parasite & Strelizia Flight Commander",
    "headline": "Partner Killer",
    "tagline": "Untamed klaxosaur hybrid power, high-G cockpit dynamics, and soaring to the stars.",
    "statement": "defying fate alongside my darling, soaring through mechanical skies with untamed passion.",
    "bio": "Elite pilot of the humanoid mech Strelizia, Code:002. A fierce red-horned klaxosaur hybrid who defied dystopian genetic mandates, finding her wings alongside Hiro to pilot through cosmic battlefields.",
    "price": 46,
    "featuredTag": "Cyber Mecha",
    "avatarUrl": "/anime/zero-two.jpg",
    "bustUrl": "/anime/zero-two.jpg",
    "cardUrl": "/anime/zero-two.jpg",
    "layoutArchetype": "flanked-centered",
    "accentAnimationType": "zero-two-cyber-hex",
    "location": "Plantation 13, Strelizia Cockpit",
    "companionAvatars": [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop"
    ],
    "companionTrustText": "Highest combat score in APE Special Forces history; Strelizia Ace.",
    "brandPartners": [
        {
            "name": "Plantation 13 Mobile Unit",
            "icon": "✦"
        },
        {
            "name": "Strelizia Core Command",
            "icon": "◬"
        },
        {
            "name": "APE Special Defense",
            "icon": "⬡"
        },
        {
            "name": "Birdcage Specimen Lab",
            "icon": "◌"
        },
        {
            "name": "Mistilteinn Living Hub",
            "icon": "⊚"
        },
        {
            "name": "Klaxosaur Research Wing",
            "icon": "❖"
        }
    ],
    "focusPillsLeft": [
        {
            "label": "Strelizia Piloting",
            "color": "#f43f5e",
            "bg": "#fff1f2",
            "border": "#fecdd3"
        },
        {
            "label": "Klaxosaur Instinct",
            "color": "#dc2626",
            "bg": "#fef2f2",
            "border": "#fecaca"
        },
        {
            "label": "High-G Dynamics",
            "color": "#ec4899",
            "bg": "#fdf2f8",
            "border": "#fbcfe8"
        }
    ],
    "focusPillsRight": [
        {
            "label": "Sweet Flavor Tasting",
            "color": "#f59e0b",
            "bg": "#fef3c7",
            "border": "#fde68a"
        },
        {
            "label": "Combat Synergy",
            "color": "#0284c7",
            "bg": "#f0f9ff",
            "border": "#bae6fd"
        },
        {
            "label": "Symbiotic Bond",
            "color": "#16a34a",
            "bg": "#f0fdf4",
            "border": "#bbf7d0"
        }
    ],
    "focusQuote": {
        "main": "focus is on breaking through mechanical constraints, fierce passion, and",
        "highlight": "flying together as one toward the eternal sky."
    },
    "sinceYear": "since Code:002 Awakening",
    "ctaText": "Let's Talk",
    "colors": {
        "isDark": false,
        "bgPrimary": "#ffffff",
        "bgSecondary": "#f8fafc",
        "bgSurface": "#ffffff",
        "bgGlass": "rgba(255, 255, 255, 0.85)",
        "textPrimary": "#0f172a",
        "textSecondary": "#334155",
        "textMuted": "#64748b",
        "accent": "#f43f5e",
        "accentSecondary": "#ec4899",
        "accentGlow": "rgba(244, 63, 94, 0.25)",
        "borderSubtle": "#e2e8f0",
        "borderStrong": "rgba(244, 63, 94, 0.25)",
        "cardShadow": "0 20px 40px -10px rgba(244, 63, 94, 0.08)",
        "badgeBg": "#ffe4e6",
        "badgeText": "#be123c",
        "gradientHero": "radial-gradient(ellipse at center, rgba(244, 63, 94, 0.32) 0%, rgba(236, 72, 153, 0.18) 35%, rgba(244, 63, 94, 0.06) 55%, transparent 72%)"
    },
    "stats": [
        {
            "label": "Code",
            "value": "002"
        },
        {
            "label": "Mecha Synergy",
            "value": "100% True Apus"
        },
        {
            "label": "Flight Envelope",
            "value": "Cosmic Edge"
        }
    ],
    "skills": [
        {
            "name": "Strelizia Cockpit Neuro-Link",
            "level": 99,
            "category": "Mecha"
        },
        {
            "name": "Klaxosaur High-G Maneuvering",
            "level": 97,
            "category": "Flight"
        },
        {
            "name": "Stampede Mode Survival & Recovery",
            "level": 95,
            "category": "Endurance"
        },
        {
            "name": "Sweet Confectionery Taste Testing",
            "level": 100,
            "category": "Culture"
        }
    ],
    "projects": [
        {
            "id": "strelizia-cockpit-hud",
            "title": "Strelizia Neuro-Link Telemetry HUD",
            "category": "Interface",
            "subtag": "Cybernetics",
            "desc": "High-frequency pilot neural interface rendering fuel pressure, magma energy reserves, and target lock vectors.",
            "tags": [
                "Next.js",
                "Three.js",
                "Canvas 2D"
            ],
            "metrics": "Zero-Latency Neuro Sync",
            "color": "#f43f5e"
        },
        {
            "id": "klaxosaur-genome-mapper",
            "title": "Klaxosaur Biomass Genetic Decoder",
            "category": "BioTech",
            "subtag": "Genome Analysis",
            "desc": "Real-time bio-scanner classifying subterranean klaxosaur core structures and calculating thermal puncture weaknesses.",
            "tags": [
                "Python",
                "PyTorch",
                "Bioinformatics"
            ],
            "metrics": "Instant Weakpoint Scan",
            "color": "#dc2626"
        },
        {
            "id": "jian-bird-synergy",
            "title": "Jian Bird Symbiotic Cockpit Balancer",
            "category": "Aerospace",
            "subtag": "Dual Pilot Link",
            "desc": "Algorithmic flight stabilizer balancing stamina burn between pistil and stamen pilots for infinite flight endurance.",
            "tags": [
                "Rust",
                "RTOS",
                "Control Systems"
            ],
            "metrics": "50/50 Perfect Load Balance",
            "color": "#ec4899"
        },
        {
            "id": "honey-sweet-indexer",
            "title": "Honey & Confectionery Catalog",
            "category": "Lifestyle",
            "subtag": "Tasting Index",
            "desc": "Whimsical taste database documenting candy varieties, lollipop textures, and sweet syrup viscosity across plantations.",
            "tags": [
                "React",
                "TailwindCSS",
                "IndexedDB"
            ],
            "metrics": "1,000 Sweets Rated",
            "color": "#f59e0b"
        }
    ],
    "experiences": [
        {
            "year": "Early Years",
            "role": "Experimental Subject",
            "organization": "APE Special Research Division",
            "description": "Underwent grueling hybridization testing; formed childhood memory pledge with Hiro."
        },
        {
            "year": "Military",
            "role": "Elite Ace Parasite",
            "organization": "APE 1st Division",
            "description": "Piloted Strelizia across dozens of high-casualty frontline deployments with unrivaled lethality."
        },
        {
            "year": "Plantation 13",
            "role": "Partner to Code:016",
            "organization": "Squad 13",
            "description": "Reunited with Hiro; unlocked True Strelizia form, protecting Plantation 13 from destruction."
        },
        {
            "year": "Cosmic Era",
            "role": "Strelizia True Apus Commander",
            "organization": "Earth Defense Vanguard",
            "description": "Traversed deep space alongside Hiro to secure humanity's future across the stars."
        }
    ],
    "testimonials": [
        {
            "quote": "If you don't belong anywhere, we can create a world of our own. You are my darling, forever.",
            "author": "Hiro (Code:016)",
            "title": "Strelizia Co-Pilot",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
        },
        {
            "quote": "Zero Two taught Squad 13 what it means to have a soul. Without her, we would still be trapped in cages.",
            "author": "Ichigo (Code:015)",
            "title": "Squad 13 Leader",
            "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop"
        },
        {
            "quote": "Her fighting spirit burns hotter than magma energy. There is no one like her in all of creation.",
            "author": "Goro (Code:056)",
            "title": "Delphinium Co-Pilot",
            "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop"
        }
    ],
    "themeTokensCSS": {
        "--accent": "#f43f5e",
        "--accent-secondary": "#ec4899",
        "--bg-primary": "#ffffff",
        "--bg-secondary": "#f8fafc",
        "--text-primary": "#0f172a",
        "--text-secondary": "#334155"
    }
},
  'tanjiro': {
    "id": "tanjiro",
    "slug": "tanjiro",
    "name": "Tanjiro Kamado",
    "japaneseName": "竈門炭治郎",
    "series": "Demon Slayer",
    "universeBadge": "Sun & Water Dual Breathing",
    "roleTitle": "Demon Slayer & Dual-Breathing Architect",
    "headline": "Bearer of the Hinokami Kagura",
    "tagline": "Mastering flowing water, dancing with the sun, and perceiving the opening thread.",
    "statement": "breathing in harmony with water and sun, cutting through despair with pure empathetic heart.",
    "bio": "Demon Slayer who mastered both Water Breathing and the legendary Sun Breathing (Hinokami Kagura). Guided by an extraordinary sense of smell that detects the \"opening thread\" of truth, fighting tirelessly to protect his sister Nezuko and liberate humanity.",
    "price": 46,
    "featuredTag": "Sun Breathing",
    "avatarUrl": "/anime/tanjiro.png",
    "bustUrl": "/anime/tanjiro.png",
    "cardUrl": "/anime/tanjiro.png",
    "layoutArchetype": "flanked-centered",
    "accentAnimationType": "tanjiro-dual-breathing",
    "location": "Mount Sagiri, Demon Slayer Corps",
    "companionAvatars": [
        "/anime/zenitsu.png",
        "/anime/inosuke.png",
        "/anime/giyuu.png"
    ],
    "companionTrustText": "Certified by Water Pillar Urokodaki and Hashira Headquarters.",
    "brandPartners": [
        {
            "name": "Demon Slayer Corps HQ",
            "icon": "✦"
        },
        {
            "name": "Butterfly Mansion Clinic",
            "icon": "◬"
        },
        {
            "name": "Swordsmith Village Forge",
            "icon": "⬡"
        },
        {
            "name": "Mount Sagiri Dojo",
            "icon": "◌"
        },
        {
            "name": "Hinokami Sun Clan Archive",
            "icon": "⊚"
        },
        {
            "name": "Kasugai Crow Network",
            "icon": "❖"
        }
    ],
    "focusPillsLeft": [
        {
            "label": "Sun Breathing / Hinokami",
            "color": "#dc2626",
            "bg": "#fef2f2",
            "border": "#fecaca"
        },
        {
            "label": "Water Flowing Kata",
            "color": "#0284c7",
            "bg": "#f0f9ff",
            "border": "#bae6fd"
        },
        {
            "label": "Olfactory Scent Thread",
            "color": "#16a34a",
            "bg": "#f0fdf4",
            "border": "#bbf7d0"
        }
    ],
    "focusPillsRight": [
        {
            "label": "Total Concentration",
            "color": "#ca8a04",
            "bg": "#fefce8",
            "border": "#fef08a"
        },
        {
            "label": "Nichirin Precision",
            "color": "#475569",
            "bg": "#f8fafc",
            "border": "#e2e8f0"
        },
        {
            "label": "Unbroken Empathy",
            "color": "#ea580c",
            "bg": "#fff7ed",
            "border": "#fed7aa"
        }
    ],
    "focusQuote": {
        "main": "focus is on mastering water and sun breath, detecting scent openings, and",
        "highlight": "extending compassion even to fallen adversaries."
    },
    "sinceYear": "since the Mount Sagiri Boulder Slash",
    "ctaText": "Let's Talk",
    "colors": {
        "isDark": false,
        "bgPrimary": "#ffffff",
        "bgSecondary": "#f8fafc",
        "bgSurface": "#ffffff",
        "bgGlass": "rgba(255, 255, 255, 0.85)",
        "textPrimary": "#0f172a",
        "textSecondary": "#334155",
        "textMuted": "#64748b",
        "accent": "#059669",
        "accentSecondary": "#dc2626",
        "accentGlow": "rgba(5, 150, 105, 0.25)",
        "borderSubtle": "#e2e8f0",
        "borderStrong": "rgba(5, 150, 105, 0.25)",
        "cardShadow": "0 20px 40px -10px rgba(5, 150, 105, 0.08)",
        "badgeBg": "#d1fae5",
        "badgeText": "#065f46",
        "gradientHero": "radial-gradient(ellipse at center, rgba(5, 150, 105, 0.32) 0%, rgba(220, 38, 38, 0.18) 35%, rgba(5, 150, 105, 0.06) 55%, transparent 72%)"
    },
    "stats": [
        {
            "label": "Breathing Style",
            "value": "Sun & Water"
        },
        {
            "label": "Scent Sensitivity",
            "value": "Microscopic"
        },
        {
            "label": "Demon Slayer Mark",
            "value": "Awakened"
        }
    ],
    "skills": [
        {
            "name": "Hinokami Kagura Sun Dance",
            "level": 98,
            "category": "Breathing"
        },
        {
            "name": "Opening Thread Scent Detection",
            "level": 99,
            "category": "Perception"
        },
        {
            "name": "Total Concentration: Constant",
            "level": 96,
            "category": "Endurance"
        },
        {
            "name": "Empathic De-escalation & Resolve",
            "level": 100,
            "category": "Leadership"
        }
    ],
    "projects": [
        {
            "id": "opening-thread-detector",
            "title": "Opening Thread Latency Profiler",
            "category": "DevTools",
            "subtag": "Trace Engine",
            "desc": "Olfactory-inspired distributed profiler tracing execution bottlenecks and visualizing the exact path to critical resolution.",
            "tags": [
                "Rust",
                "eBPF",
                "OpenTelemetry"
            ],
            "metrics": "Instant Opening Thread Detection",
            "color": "#059669"
        },
        {
            "id": "hinokami-dance-renderer",
            "title": "Sun Breathing Flame Particle Canvas",
            "category": "Graphics",
            "subtag": "WebGL Shader",
            "desc": "60fps GPU fluid-dynamics simulation illustrating circular Hinokami Kagura solar trails with zero CPU overhead.",
            "tags": [
                "Three.js",
                "GLSL",
                "WebGL"
            ],
            "metrics": "Ultra-Fluid Solar Trails",
            "color": "#dc2626"
        },
        {
            "id": "nichirin-blade-catalog",
            "title": "Swordsmith Village Nichirin Forge Registry",
            "category": "Craftsmanship",
            "subtag": "Metallurgy Database",
            "desc": "Comprehensive materials ledger logging scarlet ore purity, sword temper curves, and custom handguard designs.",
            "tags": [
                "Next.js",
                "PostgreSQL",
                "TailwindCSS"
            ],
            "metrics": "1,000 Blades Cataloged",
            "color": "#ea580c"
        },
        {
            "id": "nezuko-safety-box",
            "title": "Daylight Shield Box Telemetry",
            "category": "Hardware",
            "subtag": "Thermal Protection",
            "desc": "Reinforced cedar wood box sensor array ensuring optimal humidity, darkness, and structural integrity for sleeping Nezuko.",
            "tags": [
                "IoT",
                "MicroPython",
                "Sensors"
            ],
            "metrics": "100% Light Tight",
            "color": "#10b981"
        }
    ],
    "experiences": [
        {
            "year": "Early Years",
            "role": "Charcoal Seller",
            "organization": "Mount Kumotori Family",
            "description": "Developed acute sense of smell and quiet filial devotion to support mother and five siblings."
        },
        {
            "year": "Training",
            "role": "Apprentice Slayer",
            "organization": "Urokodaki Mount Sagiri Dojo",
            "description": "Split the giant boulder with Nichirin blade; mastered all 10 forms of Water Breathing."
        },
        {
            "year": "Corps Career",
            "role": "Demon Slayer Operative",
            "organization": "Demon Slayer Corps",
            "description": "Awakened Hinokami Kagura at Natagumo Mountain; protected 200 passengers on the Mugen Train."
        },
        {
            "year": "Final Battle",
            "role": "Sun Breathing Vanguard",
            "organization": "Infinity Castle Campaign",
            "description": "Awakened the Transparent World and Demon Slayer Mark, ending the thousand-year reign of demons."
        }
    ],
    "testimonials": [
        {
            "quote": "Tanjiro is the most sincere human I have ever known. His kindness pierces through the darkness like morning light.",
            "author": "Giyuu Tomioka",
            "title": "Water Pillar",
            "avatar": "/anime/giyuu.png"
        },
        {
            "quote": "He never mocks me when I am scared out of my mind! He pulls me forward and protects everyone around him!",
            "author": "Zenitsu Agatsuma",
            "title": "Thunder Breaker",
            "avatar": "/anime/zenitsu.png"
        },
        {
            "quote": "Gonpachiro is my rival and my underling! I will never let anyone take him down except me, Inosuke-sama!",
            "author": "Inosuke Hashibira",
            "title": "Beast Warrior",
            "avatar": "/anime/inosuke.png"
        }
    ],
    "themeTokensCSS": {
        "--accent": "#059669",
        "--accent-secondary": "#dc2626",
        "--bg-primary": "#ffffff",
        "--bg-secondary": "#f8fafc",
        "--text-primary": "#0f172a",
        "--text-secondary": "#334155"
    }
},
  'zenitsu': {
    "id": "zenitsu",
    "slug": "zenitsu",
    "name": "Zenitsu Agatsuma",
    "japaneseName": "我妻善逸",
    "series": "Demon Slayer",
    "universeBadge": "Thunderclap and Flash / God Speed",
    "roleTitle": "Thunder Breaker & Single-Strike Execution Specialist",
    "headline": "Thunderclap and Flash",
    "tagline": "Honing one single technique to godly perfection, striking with lightning while the world sleeps.",
    "statement": "honing a single strike to divine perfection, striking like lightning when all else is asleep.",
    "bio": "Demon Slayer who mastered Thunder Breathing First Form: Thunderclap and Flash. Despite perpetual anxiety and panic, his sub-conscious awakening unleashes blinding God-Speed velocity, creating the ultimate Seventh Form: Honoikazuchi no Kami.",
    "price": 40,
    "featuredTag": "Lightning Speed",
    "avatarUrl": "/anime/zenitsu.png",
    "bustUrl": "/anime/zenitsu.png",
    "cardUrl": "/anime/zenitsu.png",
    "layoutArchetype": "flanked-centered",
    "accentAnimationType": "zenitsu-thunderclap",
    "location": "Mount Kumotori, Thunder Pillar Dojo",
    "companionAvatars": [
        "/anime/tanjiro.png",
        "/anime/inosuke.png",
        "/anime/shinobu.png"
    ],
    "companionTrustText": "Trained by Former Thunder Pillar Jigoro Kuwajima.",
    "brandPartners": [
        {
            "name": "Thunder Pillar Dojo",
            "icon": "✦"
        },
        {
            "name": "Demon Slayer Corps HQ",
            "icon": "◬"
        },
        {
            "name": "Butterfly Recovery Ward",
            "icon": "⬡"
        },
        {
            "name": "Sparrow Messenger Post",
            "icon": "◌"
        },
        {
            "name": "God Speed Lightning Forge",
            "icon": "⊚"
        },
        {
            "name": "Seventh Form Sanctuary",
            "icon": "❖"
        }
    ],
    "focusPillsLeft": [
        {
            "label": "Thunderclap & Flash",
            "color": "#eab308",
            "bg": "#fefce8",
            "border": "#fef08a"
        },
        {
            "label": "Sixfold God Speed",
            "color": "#f59e0b",
            "bg": "#fef3c7",
            "border": "#fde68a"
        },
        {
            "label": "Acoustic Hearing",
            "color": "#0284c7",
            "bg": "#f0f9ff",
            "border": "#bae6fd"
        }
    ],
    "focusPillsRight": [
        {
            "label": "Honing One Thing",
            "color": "#ca8a04",
            "bg": "#fefce8",
            "border": "#fef08a"
        },
        {
            "label": "Defensive Reaction",
            "color": "#16a34a",
            "bg": "#f0fdf4",
            "border": "#bbf7d0"
        },
        {
            "label": "Inner Awakening",
            "color": "#7c3aed",
            "bg": "#f5f3ff",
            "border": "#ddd6fe"
        }
    ],
    "focusQuote": {
        "main": "focus is on perfecting a single technique until it becomes lightning, and",
        "highlight": "protecting what matters even while trembling."
    },
    "sinceYear": "since the Peach Tree Lightning Strike",
    "ctaText": "Let's Talk",
    "colors": {
        "isDark": false,
        "bgPrimary": "#ffffff",
        "bgSecondary": "#f8fafc",
        "bgSurface": "#ffffff",
        "bgGlass": "rgba(255, 255, 255, 0.85)",
        "textPrimary": "#0f172a",
        "textSecondary": "#334155",
        "textMuted": "#64748b",
        "accent": "#eab308",
        "accentSecondary": "#f59e0b",
        "accentGlow": "rgba(234, 179, 8, 0.25)",
        "borderSubtle": "#e2e8f0",
        "borderStrong": "rgba(234, 179, 8, 0.25)",
        "cardShadow": "0 20px 40px -10px rgba(234, 179, 8, 0.08)",
        "badgeBg": "#fef9c3",
        "badgeText": "#854d0e",
        "gradientHero": "radial-gradient(ellipse at center, rgba(234, 179, 8, 0.32) 0%, rgba(245, 158, 11, 0.18) 35%, rgba(234, 179, 8, 0.06) 55%, transparent 72%)"
    },
    "stats": [
        {
            "label": "Strike Velocity",
            "value": "God Speed (Mach 5)"
        },
        {
            "label": "Hearing Range",
            "value": "Heartbeat Radar"
        },
        {
            "label": "Technique Count",
            "value": "1 Perfected"
        }
    ],
    "skills": [
        {
            "name": "Thunderclap and Flash: Sixfold",
            "level": 99,
            "category": "Combat"
        },
        {
            "name": "Acoustic Sonar Heartbeat Hearing",
            "level": 98,
            "category": "Sensors"
        },
        {
            "name": "Seventh Form: Honoikazuchi no Kami",
            "level": 100,
            "category": "Mastery"
        },
        {
            "name": "High-Anxiety Self-Preservation",
            "level": 96,
            "category": "Survival"
        }
    ],
    "projects": [
        {
            "id": "godspeed-execution",
            "title": "God Speed Sub-Nanosecond Executor",
            "category": "Runtimes",
            "subtag": "Low-Latency Engine",
            "desc": "Specialized low-latency compilation pipeline executing single, highly optimized binary branches in under 12 nanoseconds.",
            "tags": [
                "Rust",
                "x86-64 Assembly",
                "SIMD"
            ],
            "metrics": "Sub-12ns Execution",
            "color": "#eab308"
        },
        {
            "id": "acoustic-heartbeat-sonar",
            "title": "Acoustic Heartbeat Lie Detector",
            "category": "AudioTech",
            "subtag": "Frequency Analysis",
            "desc": "Hyper-sensitive audio analysis framework identifying human emotional state, deceit, and demon presence via ambient frequencies.",
            "tags": [
                "Web Audio API",
                "FFT",
                "DSP"
            ],
            "metrics": "Detects Heartbeat Flutter",
            "color": "#0284c7"
        },
        {
            "id": "sparrow-messenger-sync",
            "title": "Chuntaro Sparrow Mesh Dispatch",
            "category": "Networking",
            "subtag": "Micro-Packet Net",
            "desc": "Ultra-compact lightweight messaging daemon routing distress chirps and status updates across mountain ranges.",
            "tags": [
                "Go",
                "MQTT",
                "Low Power IoT"
            ],
            "metrics": "99.99% Chirp Delivery",
            "color": "#f59e0b"
        },
        {
            "id": "seventh-form-flame-god",
            "title": "Honoikazuchi Lightning Dragon Shader",
            "category": "Graphics",
            "subtag": "Electric Shader",
            "desc": "Visual simulation of golden lightning dragons coiling around the user's blade before striking with thunderous impact.",
            "tags": [
                "WebGL",
                "GLSL Shaders",
                "Three.js"
            ],
            "metrics": "Golden Dragon Lightning",
            "color": "#ca8a04"
        }
    ],
    "experiences": [
        {
            "year": "Early Years",
            "role": "Reluctant Student",
            "organization": "Gramps Thunder Mountain Dojo",
            "description": "Surviving lightning strike tree incident; repeatedly disciplined into mastering the First Form."
        },
        {
            "year": "Selection",
            "role": "Survivor",
            "organization": "Final Selection (Mount Fujikasane)",
            "description": "Passed final selection unconsciously while dispatching demons in sleep mode."
        },
        {
            "year": "Spider Mountain",
            "role": "Poison Survivor",
            "organization": "Natagumo Mountain Battle",
            "description": "Defeated the Spider Demon Brother; held off lethal spider venom with breathing control."
        },
        {
            "year": "Infinity Castle",
            "role": "Thunder Pioneer",
            "organization": "Upper Moon Battle",
            "description": "Created and unleashed the Seventh Form Honoikazuchi no Kami to defeat Upper Rank Kaigaku alone."
        }
    ],
    "testimonials": [
        {
            "quote": "If you can only do one thing, hone it to the ultimate extreme. Polish it until it becomes a divine blade!",
            "author": "Jigoro Kuwajima",
            "title": "Former Thunder Pillar (Gramps)",
            "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop"
        },
        {
            "quote": "Zenitsu’s sound is pure and gentle. Even when he is screaming in terror, his heart never betrays a comrade.",
            "author": "Tanjiro Kamado",
            "title": "Demon Slayer Companion",
            "avatar": "/anime/tanjiro.png"
        },
        {
            "quote": "Monitsu is lightning fast! When he falls asleep, he becomes completely terrifying!",
            "author": "Inosuke Hashibira",
            "title": "Beast Warrior",
            "avatar": "/anime/inosuke.png"
        }
    ],
    "themeTokensCSS": {
        "--accent": "#eab308",
        "--accent-secondary": "#f59e0b",
        "--bg-primary": "#ffffff",
        "--bg-secondary": "#f8fafc",
        "--text-primary": "#0f172a",
        "--text-secondary": "#334155"
    }
},
  'inosuke': {
    "id": "inosuke",
    "slug": "inosuke",
    "name": "Inosuke Hashibira",
    "japaneseName": "嘴平伊之助",
    "series": "Demon Slayer",
    "universeBadge": "Beast Breathing / Mountain Lord",
    "roleTitle": "Beast Breathing Pioneer & Spatial Sensing Specialist",
    "headline": "King of the Mountains",
    "tagline": "Raw feral intuition, serrated dual-wielding, and 360° spatial skin perception.",
    "statement": "roaring through the wilderness with dual serrated swords and primal spatial perception.",
    "bio": "Self-taught mountain warrior who created Beast Breathing. Wields dual chipped Nichirin blades and wears a wild boar mask. His hypersensitive skin can feel subtle vibrations in the air, locating enemies miles away.",
    "price": 38,
    "featuredTag": "Wild Beast",
    "avatarUrl": "/anime/inosuke.png",
    "bustUrl": "/anime/inosuke.png",
    "cardUrl": "/anime/inosuke.png",
    "layoutArchetype": "flanked-centered",
    "accentAnimationType": "inosuke-beast-slashes",
    "location": "Mount Okutama, Beast Territory",
    "companionAvatars": [
        "/anime/tanjiro.png",
        "/anime/zenitsu.png",
        "/anime/giyuu.png"
    ],
    "companionTrustText": "Proclaimed King of the Mountains and self-taught Demon Slayer prodigy.",
    "brandPartners": [
        {
            "name": "King of Mountains Domain",
            "icon": "✦"
        },
        {
            "name": "Boar Mask Artificers",
            "icon": "◬"
        },
        {
            "name": "Serrated Blade Smithy",
            "icon": "⬡"
        },
        {
            "name": "Demon Slayer Corps HQ",
            "icon": "◌"
        },
        {
            "name": "Butterfly Mansion Recovery",
            "icon": "⊚"
        },
        {
            "name": "Wild Instinct Guild",
            "icon": "❖"
        }
    ],
    "focusPillsLeft": [
        {
            "label": "Beast Breathing Fangs",
            "color": "#0284c7",
            "bg": "#f0f9ff",
            "border": "#bae6fd"
        },
        {
            "label": "Spatial Air Perception",
            "color": "#0ea5e9",
            "bg": "#f0f9ff",
            "border": "#bae6fd"
        },
        {
            "label": "Dual Serrated Blades",
            "color": "#475569",
            "bg": "#f8fafc",
            "border": "#e2e8f0"
        }
    ],
    "focusPillsRight": [
        {
            "label": "Wild Flexibility",
            "color": "#ca8a04",
            "bg": "#fefce8",
            "border": "#fef08a"
        },
        {
            "label": "Boar Head Masking",
            "color": "#ea580c",
            "bg": "#fff7ed",
            "border": "#fed7aa"
        },
        {
            "label": "Frontal Assault",
            "color": "#dc2626",
            "bg": "#fef2f2",
            "border": "#fecaca"
        }
    ],
    "focusQuote": {
        "main": "focus is on uninhibited wild instinct, spatial air perception, and",
        "highlight": "charging forward headfirst without ever slowing down."
    },
    "sinceYear": "since Descending from the Mountain",
    "ctaText": "Let's Talk",
    "colors": {
        "isDark": false,
        "bgPrimary": "#ffffff",
        "bgSecondary": "#f8fafc",
        "bgSurface": "#ffffff",
        "bgGlass": "rgba(255, 255, 255, 0.85)",
        "textPrimary": "#0f172a",
        "textSecondary": "#334155",
        "textMuted": "#64748b",
        "accent": "#0284c7",
        "accentSecondary": "#38bdf8",
        "accentGlow": "rgba(2, 132, 199, 0.25)",
        "borderSubtle": "#e2e8f0",
        "borderStrong": "rgba(2, 132, 199, 0.25)",
        "cardShadow": "0 20px 40px -10px rgba(2, 132, 199, 0.08)",
        "badgeBg": "#e0f2fe",
        "badgeText": "#0369a1",
        "gradientHero": "radial-gradient(ellipse at center, rgba(2, 132, 199, 0.32) 0%, rgba(56, 189, 248, 0.18) 35%, rgba(2, 132, 199, 0.06) 55%, transparent 72%)"
    },
    "stats": [
        {
            "label": "Breathing Style",
            "value": "Self-Taught Beast"
        },
        {
            "label": "Spatial Sensing",
            "value": "Mountain Wide"
        },
        {
            "label": "Joint Dislocation",
            "value": "100% Flexible"
        }
    ],
    "skills": [
        {
            "name": "Seventh Fang: Spatial Awareness",
            "level": 98,
            "category": "Perception"
        },
        {
            "name": "Dual Serrated Flesh Ripper",
            "level": 95,
            "category": "Combat"
        },
        {
            "name": "Complete Joint & Organ Relocation",
            "level": 97,
            "category": "Flexibility"
        },
        {
            "name": "Fearless Frontline Charge",
            "level": 100,
            "category": "Aggression"
        }
    ],
    "projects": [
        {
            "id": "spatial-skin-radar",
            "title": "Spatial Skin Air-Vibration Radar",
            "category": "Sensors",
            "subtag": "Atmospheric Sonar",
            "desc": "Barometric skin sensor framework mapping enemy coordinates across mountain forests through minute wind disturbances.",
            "tags": [
                "Rust",
                "DSP",
                "Kinetic Sensors"
            ],
            "metrics": "5km Forest Range",
            "color": "#0284c7"
        },
        {
            "id": "serrated-dual-edge",
            "title": "Serrated Cleave Physics Engine",
            "category": "Physics",
            "subtag": "Tearing Dynamics",
            "desc": "Calculates jagged cutting force distributions that maximize tearing friction across tough demon hide membranes.",
            "tags": [
                "C++",
                "OpenGL",
                "FEA"
            ],
            "metrics": "2x Tearing Friction",
            "color": "#38bdf8"
        },
        {
            "id": "joint-dislocation-rig",
            "title": "Full-Body Skeletal Deformation Rig",
            "category": "3D Graphics",
            "subtag": "Anatomical Mesh",
            "desc": "Dynamic 3D skeleton permitting full joint dislocation and organ shifting to slip through crawlspaces and evade fatal blows.",
            "tags": [
                "Three.js",
                "Blender API",
                "WebGL"
            ],
            "metrics": "Slip Through 30cm Openings",
            "color": "#ea580c"
        },
        {
            "id": "boar-head-telemetry",
            "title": "Boar Mask Thermal Insulator",
            "category": "Gear",
            "subtag": "Wearable Tech",
            "desc": "Natural fur ventilation mesh maintaining optimal airflow and intimidation factor across sub-zero blizzard peaks.",
            "tags": [
                "Next.js",
                "IoT",
                "TailwindCSS"
            ],
            "metrics": "100% Intimidation",
            "color": "#10b981"
        }
    ],
    "experiences": [
        {
            "year": "Wild Youth",
            "role": "Lord of the Mountain",
            "organization": "Okutama Boar Pack",
            "description": "Raised by wild boars; developed animalistic reflexes, mountain pathfinding, and self-taught katas."
        },
        {
            "year": "Selection",
            "role": "Unregistered Challenger",
            "organization": "Mount Fujikasane",
            "description": "Wrestled a Demon Slayer to take his swords and passed final selection ahead of everyone else."
        },
        {
            "year": "Mansion Battle",
            "role": "Drum House Vanguard",
            "organization": "Tsuzumi Demon Hunt",
            "description": "Charged through rotating rooms to slice demons; teamed up with Tanjiro and Zenitsu."
        },
        {
            "year": "Entertainment",
            "role": "Undercover Operative Inoko",
            "organization": "Yoshiwara District Raid",
            "description": "Dislocated all joints to infiltrate subterranean worm tunnels, decapitating Daki with dual fangs."
        }
    ],
    "testimonials": [
        {
            "quote": "Inosuke’s spatial awareness saved our lives multiple times. He feels attacks in the air before they even happen.",
            "author": "Tanjiro Kamado",
            "title": "Demon Slayer Brother",
            "avatar": "/anime/tanjiro.png"
        },
        {
            "quote": "He is completely insane and charges straight into danger, but I am glad he is on our side!",
            "author": "Zenitsu Agatsuma",
            "title": "Thunder Breaker",
            "avatar": "/anime/zenitsu.png"
        },
        {
            "quote": "Inosuke-san, please stop jumping on the hospital beds! But thank you for eating all your medicine.",
            "author": "Aoi Kanzaki",
            "title": "Butterfly Mansion Caretaker",
            "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop"
        }
    ],
    "themeTokensCSS": {
        "--accent": "#0284c7",
        "--accent-secondary": "#38bdf8",
        "--bg-primary": "#ffffff",
        "--bg-secondary": "#f8fafc",
        "--text-primary": "#0f172a",
        "--text-secondary": "#334155"
    }
},
  'giyuu': {
    "id": "giyuu",
    "slug": "giyuu",
    "name": "Giyu Tomioka",
    "japaneseName": "冨岡義勇",
    "series": "Demon Slayer",
    "universeBadge": "Water Pillar (Hashira)",
    "roleTitle": "Water Pillar & Eleventh Form Architect",
    "headline": "Silent Stream of Water",
    "tagline": "Absolute calmness, fluid adaptation, and the stillness of Dead Calm.",
    "statement": "stilling the raging tempest into absolute serenity, standing calm as the deep quiet sea.",
    "bio": "The Water Pillar of the Demon Slayer Corps. Creator of the legendary Eleventh Form: Dead Calm (Nagi), capable of neutralizing any attack into absolute stillness. A solitary protector whose silent dedication guides the next generation.",
    "price": 48,
    "featuredTag": "Hashira Tier",
    "avatarUrl": "/anime/giyuu.png",
    "bustUrl": "/anime/giyuu.png",
    "cardUrl": "/anime/giyuu.png",
    "layoutArchetype": "flanked-centered",
    "accentAnimationType": "giyuu-dead-calm",
    "location": "Mount Sagiri, Water Pillar Sanctuary",
    "companionAvatars": [
        "/anime/tanjiro.png",
        "/anime/shinobu.png",
        "/anime/inosuke.png"
    ],
    "companionTrustText": "Water Pillar of the Demon Slayer Corps High Council.",
    "brandPartners": [
        {
            "name": "Water Pillar Sanctuary",
            "icon": "✦"
        },
        {
            "name": "Demon Slayer Corps HQ",
            "icon": "◬"
        },
        {
            "name": "Urokodaki Heritage Clan",
            "icon": "⬡"
        },
        {
            "name": "Hashira High Council",
            "icon": "◌"
        },
        {
            "name": "Swordsmith Village Forge",
            "icon": "⊚"
        },
        {
            "name": "Kasugai Raven Post",
            "icon": "❖"
        }
    ],
    "focusPillsLeft": [
        {
            "label": "Dead Calm (Nagi)",
            "color": "#0369a1",
            "bg": "#f0f9ff",
            "border": "#bae6fd"
        },
        {
            "label": "Water Breathing Mastery",
            "color": "#0284c7",
            "bg": "#f0f9ff",
            "border": "#bae6fd"
        },
        {
            "label": "Hashira Swordsmanship",
            "color": "#0f172a",
            "bg": "#f8fafc",
            "border": "#e2e8f0"
        }
    ],
    "focusPillsRight": [
        {
            "label": "Silent Vigilance",
            "color": "#475569",
            "bg": "#f8fafc",
            "border": "#e2e8f0"
        },
        {
            "label": "Tactical Restraint",
            "color": "#ca8a04",
            "bg": "#fefce8",
            "border": "#fef08a"
        },
        {
            "label": "Unyielding Honor",
            "color": "#16a34a",
            "bg": "#f0fdf4",
            "border": "#bbf7d0"
        }
    ],
    "focusQuote": {
        "main": "focus is on Eleventh Form Dead Calm, absolute mental tranquility, and",
        "highlight": "letting the storm wash away without disturbing the core."
    },
    "sinceYear": "since the Water Pillar Succession",
    "ctaText": "Let's Talk",
    "colors": {
        "isDark": false,
        "bgPrimary": "#ffffff",
        "bgSecondary": "#f8fafc",
        "bgSurface": "#ffffff",
        "bgGlass": "rgba(255, 255, 255, 0.85)",
        "textPrimary": "#0f172a",
        "textSecondary": "#334155",
        "textMuted": "#64748b",
        "accent": "#0369a1",
        "accentSecondary": "#0284c7",
        "accentGlow": "rgba(3, 105, 161, 0.25)",
        "borderSubtle": "#e2e8f0",
        "borderStrong": "rgba(3, 105, 161, 0.25)",
        "cardShadow": "0 20px 40px -10px rgba(3, 105, 161, 0.08)",
        "badgeBg": "#e0f2fe",
        "badgeText": "#0369a1",
        "gradientHero": "radial-gradient(ellipse at center, rgba(3, 105, 161, 0.32) 0%, rgba(2, 132, 199, 0.18) 35%, rgba(3, 105, 161, 0.06) 55%, transparent 72%)"
    },
    "stats": [
        {
            "label": "Pillar Rank",
            "value": "Water Hashira"
        },
        {
            "label": "Nagi Nullification",
            "value": "100% Absorbed"
        },
        {
            "label": "Forms Mastered",
            "value": "11 Forms"
        }
    ],
    "skills": [
        {
            "name": "Eleventh Form: Dead Calm (Nagi)",
            "level": 100,
            "category": "Mastery"
        },
        {
            "name": "Water Breathing Kata 1-10",
            "level": 98,
            "category": "Combat"
        },
        {
            "name": "Demon Slayer Mark Awakening",
            "level": 96,
            "category": "Power"
        },
        {
            "name": "Silent Tactical Restraint",
            "level": 99,
            "category": "Mindset"
        }
    ],
    "projects": [
        {
            "id": "dead-calm-nullifier",
            "title": "Eleventh Form Dead Calm (Nagi) Nullifier",
            "category": "Security",
            "subtag": "Packet Drop WAF",
            "desc": "Advanced threat dissipation protocol that stills all incoming volumetric attack vectors into absolute silence without consuming CPU cycles.",
            "tags": [
                "Rust",
                "eBPF",
                "Kernel Bypass"
            ],
            "metrics": "100% Volumetric Drop",
            "color": "#0369a1"
        },
        {
            "id": "water-breathing-fluids",
            "title": "Water Breathing Fluid Dynamics Engine",
            "category": "Graphics",
            "subtag": "Fluid Simulation",
            "desc": "Ultra-clean blue water particle shader visualizing flowing kata arcs, water wheels, and whirlpool strikes in real-time WebGL.",
            "tags": [
                "Three.js",
                "GLSL",
                "WebGL"
            ],
            "metrics": "60 FPS Flow State",
            "color": "#0284c7"
        },
        {
            "id": "split-haori-archive",
            "title": "Split-Pattern Haori Memorial Ledger",
            "category": "Archives",
            "subtag": "Memory Preservation",
            "desc": "Digital tribute preserving the legacy of Sabito and Tsutako, honoring those who sacrificed everything to forge a protector.",
            "tags": [
                "Next.js",
                "TailwindCSS",
                "PostgreSQL"
            ],
            "metrics": "Memorial Preserved",
            "color": "#475569"
        },
        {
            "id": "hashira-training-matrix",
            "title": "Hashira Swordsmanship Drill Matrix",
            "category": "Education",
            "subtag": "Cadet Drills",
            "desc": "Rigorous swordsmanship training schedule calibrating reaction times, footwork balance, and endurance under extreme fatigue.",
            "tags": [
                "TypeScript",
                "React",
                "IndexedDB"
            ],
            "metrics": "Hashira Precision Calibration",
            "color": "#10b981"
        }
    ],
    "experiences": [
        {
            "year": "Youth",
            "role": "Apprentice to Urokodaki",
            "organization": "Mount Sagiri Water Dojo",
            "description": "Trained alongside Sabito; survived final selection while carrying Sabito's grief and resolve."
        },
        {
            "year": "Succession",
            "role": "Water Pillar",
            "organization": "Demon Slayer Corps Hashira",
            "description": "Invented the Eleventh Form: Dead Calm; claimed position as the Water Pillar."
        },
        {
            "year": "Mount Natagumo",
            "role": "Pillar Vanguard",
            "organization": "Lower Moon Extermination",
            "description": "Decapitated Lower Moon Five Rui with a single strike of Dead Calm; spared Tanjiro and Nezuko."
        },
        {
            "year": "Infinity Castle",
            "role": "Hashira Co-Commander",
            "organization": "Battle Against Akaza",
            "description": "Awakened Demon Slayer Mark; fought alongside Tanjiro to defeat Upper Rank Three."
        }
    ],
    "testimonials": [
        {
            "quote": "Tomioka-san... people don't actually dislike you, you know. But your Dead Calm is truly breathtaking.",
            "author": "Shinobu Kocho",
            "title": "Insect Pillar",
            "avatar": "/anime/shinobu.png"
        },
        {
            "quote": "Giyuu-san taught me to never let an adversary hold my sister's life in their hands. He gave us a future.",
            "author": "Tanjiro Kamado",
            "title": "Demon Slayer Protégé",
            "avatar": "/anime/tanjiro.png"
        },
        {
            "quote": "He carries the haori of two souls he loved. His water is deeper and stiller than any ocean.",
            "author": "Sakonji Urokodaki",
            "title": "Former Water Pillar",
            "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop"
        }
    ],
    "themeTokensCSS": {
        "--accent": "#0369a1",
        "--accent-secondary": "#0284c7",
        "--bg-primary": "#ffffff",
        "--bg-secondary": "#f8fafc",
        "--text-primary": "#0f172a",
        "--text-secondary": "#334155"
    }
},
  'shinobu': {
    "id": "shinobu",
    "slug": "shinobu",
    "name": "Shinobu Kocho",
    "japaneseName": "胡蝶しのぶ",
    "series": "Demon Slayer",
    "universeBadge": "Insect Pillar (Hashira)",
    "roleTitle": "Insect Pillar & Pharmacology Specialist",
    "headline": "Dance of the Butterfly",
    "tagline": "High-speed stings, wisteria pharmacology, and a gentle smile masking lethal precision.",
    "statement": "dancing like a gentle butterfly, delivering decisive wisteria poison with graceful speed.",
    "bio": "The Insect Pillar of the Demon Slayer Corps. Lacking the physical arm strength to behead demons, she developed lethal wisteria poisons and a customized thrusting blade to inject toxins with blinding, acrobatic speed.",
    "price": 45,
    "featuredTag": "Insect Pillar",
    "avatarUrl": "/anime/shinobu.png",
    "bustUrl": "/anime/shinobu.png",
    "cardUrl": "/anime/shinobu.png",
    "layoutArchetype": "flanked-centered",
    "accentAnimationType": "shinobu-wisteria-butterflies",
    "location": "Butterfly Mansion, Insect Pillar Clinic",
    "companionAvatars": [
        "/anime/giyuu.png",
        "/anime/tanjiro.png",
        "/anime/zenitsu.png"
    ],
    "companionTrustText": "Insect Pillar and Chief Pharmacologist of the Demon Slayer Corps.",
    "brandPartners": [
        {
            "name": "Butterfly Mansion Clinic",
            "icon": "✦"
        },
        {
            "name": "Wisteria Poison Laboratory",
            "icon": "◬"
        },
        {
            "name": "Demon Slayer Corps HQ",
            "icon": "⬡"
        },
        {
            "name": "Hashira High Council",
            "icon": "◌"
        },
        {
            "name": "Kocho Estate Herbarium",
            "icon": "⊚"
        },
        {
            "name": "Kasugai Butterfly Courier",
            "icon": "❖"
        }
    ],
    "focusPillsLeft": [
        {
            "label": "Insect Breathing Stings",
            "color": "#9333ea",
            "bg": "#faf5ff",
            "border": "#e9d5ff"
        },
        {
            "label": "Wisteria Pharmacology",
            "color": "#a855f7",
            "bg": "#faf5ff",
            "border": "#e9d5ff"
        },
        {
            "label": "High-Velocity Thrust",
            "color": "#0284c7",
            "bg": "#f0f9ff",
            "border": "#bae6fd"
        }
    ],
    "focusPillsRight": [
        {
            "label": "Butterfly Dance",
            "color": "#ec4899",
            "bg": "#fdf2f8",
            "border": "#fbcfe8"
        },
        {
            "label": "Medical Rehabilitation",
            "color": "#16a34a",
            "bg": "#f0fdf4",
            "border": "#bbf7d0"
        },
        {
            "label": "Smiling Composure",
            "color": "#ca8a04",
            "bg": "#fefce8",
            "border": "#fef08a"
        }
    ],
    "focusQuote": {
        "main": "focus is on agile butterfly maneuvers, wisteria poison chemistry, and",
        "highlight": "smiling gracefully while delivering surgical precision."
    },
    "sinceYear": "since the Butterfly Mansion Founding",
    "ctaText": "Let's Talk",
    "colors": {
        "isDark": false,
        "bgPrimary": "#ffffff",
        "bgSecondary": "#f8fafc",
        "bgSurface": "#ffffff",
        "bgGlass": "rgba(255, 255, 255, 0.85)",
        "textPrimary": "#0f172a",
        "textSecondary": "#334155",
        "textMuted": "#64748b",
        "accent": "#9333ea",
        "accentSecondary": "#06b6d4",
        "accentGlow": "rgba(147, 51, 234, 0.25)",
        "borderSubtle": "#e2e8f0",
        "borderStrong": "rgba(147, 51, 234, 0.25)",
        "cardShadow": "0 20px 40px -10px rgba(147, 51, 234, 0.08)",
        "badgeBg": "#f3e8ff",
        "badgeText": "#6b21a8",
        "gradientHero": "radial-gradient(ellipse at center, rgba(147, 51, 234, 0.32) 0%, rgba(6, 182, 212, 0.18) 35%, rgba(147, 51, 234, 0.06) 55%, transparent 72%)"
    },
    "stats": [
        {
            "label": "Pillar Rank",
            "value": "Insect Hashira"
        },
        {
            "label": "Wisteria Toxins",
            "value": "37g Lethal Core"
        },
        {
            "label": "Thrust Speed",
            "value": "Faster than Water"
        }
    ],
    "skills": [
        {
            "name": "Wisteria Molecular Pharmacology",
            "level": 100,
            "category": "Science"
        },
        {
            "name": "Caprice Dance Butterfly Stings",
            "level": 97,
            "category": "Combat"
        },
        {
            "name": "Acrobatic High-Velocity Thrusts",
            "level": 98,
            "category": "Agility"
        },
        {
            "name": "Patient Rehabilitation & Triage",
            "level": 96,
            "category": "Medicine"
        }
    ],
    "projects": [
        {
            "id": "wisteria-synthesis-lab",
            "title": "Wisteria Molecular Toxin Synthesizer",
            "category": "BioTech",
            "subtag": "Toxin Chemistry",
            "desc": "Bio-chemical synthesizer modifying molecular chains of wisteria poison inside the scabbard to bypass demon immunities.",
            "tags": [
                "Python",
                "Biopython",
                "Chemical Informatics"
            ],
            "metrics": "Dynamic Toxin Mutation",
            "color": "#9333ea"
        },
        {
            "id": "butterfly-mansion-ehr",
            "title": "Butterfly Mansion Rehabilitation EHR",
            "category": "HealthTech",
            "subtag": "Clinical Records",
            "desc": "Comprehensive hospital management suite tracking demon venom recovery, reflex cup-splashing drills, and physical rehab.",
            "tags": [
                "Next.js",
                "PostgreSQL",
                "TailwindCSS"
            ],
            "metrics": "100% Recovery Rate",
            "color": "#06b6d4"
        },
        {
            "id": "centipede-thrust-physics",
            "title": "Hundred-Legged Zigzag Thrust Engine",
            "category": "Physics",
            "subtag": "Acrobatic Physics",
            "desc": "Calculates high-velocity ground ricochet angles to build explosive thrust momentum that pierces wooden bridge structures.",
            "tags": [
                "C++",
                "OpenGL",
                "Kinematics"
            ],
            "metrics": "Explosive Multi-Angle Thrust",
            "color": "#ec4899"
        },
        {
            "id": "tamayo-joint-cure",
            "title": "Tamayo-Kocho Anti-Kibutsuji Drug Protocol",
            "category": "Research",
            "subtag": "Anti-Demon Serum",
            "desc": "Four-stage cocktail combining humanization, aging acceleration, regeneration suppression, and cellular destruction.",
            "tags": [
                "Bioinformatics",
                "Data Analysis",
                "Rust"
            ],
            "metrics": "Muzan Neutralized",
            "color": "#10b981"
        }
    ],
    "experiences": [
        {
            "year": "Youth",
            "role": "Co-Founder",
            "organization": "Kocho Estate",
            "description": "Rescued by Gyomei Himejima; co-founded Butterfly Mansion with elder sister Kanae."
        },
        {
            "year": "Succession",
            "role": "Insect Pillar",
            "organization": "Demon Slayer Corps Hashira",
            "description": "Inherited Kanae's butterfly haori and engineered customized thrusting needle blades."
        },
        {
            "year": "Mount Natagumo",
            "role": "Support Hashira",
            "organization": "Demon Extermination",
            "description": "Cured Zenitsu and dozens of infected slayers from lethal spider poison."
        },
        {
            "year": "Infinity Castle",
            "role": "Key Martyr & Architect",
            "organization": "Battle Against Doma",
            "description": "Sacrificed her body loaded with 37 kilograms of wisteria poison, enabling Kanao and Inosuke to decapitate Upper Rank Two."
        }
    ],
    "testimonials": [
        {
            "quote": "Shinobu's wisteria research made the impossible possible. Without her, Muzan would never have been defeated.",
            "author": "Lady Tamayo",
            "title": "Demon Doctor & Ally",
            "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop"
        },
        {
            "quote": "Master Shinobu smiled every day even though her heart was burning with anger. She gave everything to protect us.",
            "author": "Kanao Tsuyuri",
            "title": "Tsuguko Prodigy",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
        },
        {
            "quote": "She saved my life at Mount Natagumo. When her purple butterfly wings descended, I knew I was going to survive.",
            "author": "Zenitsu Agatsuma",
            "title": "Thunder Breaker",
            "avatar": "/anime/zenitsu.png"
        }
    ],
    "themeTokensCSS": {
        "--accent": "#9333ea",
        "--accent-secondary": "#06b6d4",
        "--bg-primary": "#ffffff",
        "--bg-secondary": "#f8fafc",
        "--text-primary": "#0f172a",
        "--text-secondary": "#334155"
    }
},
};
