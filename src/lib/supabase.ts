import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseUrl.startsWith('https://') && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-ref')
);

// Client-side & anonymous read/write client
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);

// Server-side admin client (with elevated privileges if service role key provided)
export const supabaseAdmin = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseServiceKey || 'placeholder-service-key',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

// Default fallback data when Supabase is not yet populated
export const fallbackPortfolioData = {
  projects: [
    {
      id: "jti-1",
      _id: "6",
      title: "JTI Information System",
      year: "2025",
      subtitle: "Internal workload management system for academic faculty.",
      tags: ["Laravel", "MySQL", "Bootstrap", "Livewire"],
      description: "Designed & developed an internal workload management system for academic staff, digitizing trimester schedule coordination and departmental reporting.",
      slug: "jti-information-system",
      category: 'it',
      role: 'Full-Stack Developer',
      stack: 'Laravel · MySQL · Bootstrap · Livewire',
      outcome: 'Centralized activity & workload management, eliminating duplicate filing and reducing administrative overhead by 45%.',
      featured: true,
      image_url: "",
      media_type: "image",
      sort_order: 1
    },
    {
      id: "brewtech-2",
      _id: "1",
      title: "Brewtech",
      year: "2026",
      subtitle: "Vocational education platform empowering disabled baristas.",
      tags: ["Next.js", "TypeScript", "SaaS", "Accessibility"],
      description: "Vocational learning platform that empowers individuals with disabilities into certified barista talents through tailored interactive modules and curriculum management.",
      slug: "brewtech",
      category: 'it',
      role: 'Full-Stack Developer & UI/UX',
      stack: 'Next.js · TypeScript · Supabase · Tailwind',
      outcome: 'Empowering 50+ disabled youth through structured digital vocational training and barista job placement pipelines.',
      featured: true,
      image_url: "",
      media_type: "image",
      sort_order: 2
    },
    {
      id: "profile-3",
      _id: "2",
      title: "ProFile+",
      year: "2025",
      subtitle: "Employee lifecycle & HR management suite.",
      tags: ["React", "UI/UX", "HR Management", "Analytics"],
      description: "Comprehensive HR platform supporting personnel data verification, daily attendance tracking, payroll workflows, and employee performance analytics.",
      slug: "profile-plus",
      category: 'it',
      role: 'UI/UX Designer & Frontend Engineer',
      stack: 'React · TailwindCSS · Node.js · REST APIs',
      outcome: 'Centralized organizational data operations, cutting manual document verification and administrative time by 40%.',
      featured: true,
      image_url: "",
      media_type: "image",
      sort_order: 3
    },
    {
      id: "disnakertrans-4",
      _id: "3",
      title: "Disnakertrans Jatim Portal",
      year: "2025",
      subtitle: "Provincial public labor service portal.",
      tags: ["Web App", "Public Sector", "Laravel", "MySQL"],
      description: "Modern government web portal engineered to deliver accessible provincial public services, labor dispute resolutions, and transparent citizen grievance reporting.",
      slug: "disnakertrans-jatim",
      category: 'it',
      role: 'Full-Stack Web Developer',
      stack: 'Laravel · MySQL · Bootstrap · Livewire',
      outcome: 'Standardized regional labor public access for 38 regencies across East Java with responsive WCAG-friendly accessibility.',
      featured: true,
      image_url: "",
      media_type: "image",
      sort_order: 4
    },
    {
      id: "mandala-5",
      _id: "5",
      title: "Mandala Pure Love",
      year: "2025",
      subtitle: "Community socio-entrepreneurship digital platform.",
      tags: ["Web Platform", "Socio-tech", "Cloud"],
      description: "Empowerment platform connecting local community entrepreneurs, crowd-financing micro-grants, and local business mentorship networks.",
      slug: "mandala",
      category: 'it',
      role: 'Lead Web Developer',
      stack: 'Next.js · Node.js · Cloud Architecture',
      outcome: 'Connected 120+ micro-businesses with mentorship programs and automated fundraising progress tracking.',
      featured: false,
      image_url: "",
      media_type: "image",
      sort_order: 5
    },
    {
      id: "nzbox-6",
      _id: "4",
      title: "NZ Box Laundry",
      year: "2026",
      subtitle: "Retail strategy & digital operations system.",
      tags: ["Digital Marketing", "Retail System", "Figma", "Brand Strategy"],
      description: "Data-driven customer retention system and digital marketing strategy for retail laundry chains.",
      slug: "nz-box",
      category: 'design',
      role: 'Digital Strategist & UI Designer',
      stack: 'Figma · Analytics · Brand Strategy',
      outcome: 'Boosted recurring customer return rates by 28% via tailored digital loyalty loops.',
      featured: false,
      image_url: "",
      media_type: "image",
      sort_order: 6
    }
  ],
  bio: {
    name: "Hilman Zahrawa",
    headline: "Fullstack Developer | UI/UX Designer",
    tagline: "Building Scalable Web Products, Workflow Automation & Human-Centered Experiences.",
    about: "Software Engineer passionate about building scalable web applications, AI-powered solutions, and meaningful digital experiences. I bridge engineering, product thinking, and visual design to create software that performs exceptionally and leaves a lasting impression.",
    experience_summary: "3+ years crafting scalable web applications, internal systems, and intuitive interfaces.",
    location: "Malang, Jawa Timur, Indonesia",
    email: "budiarto3788@gmail.com",
    whatsapp: "6285806003234",
    avatar_url: "/avatar.png",
    skills: "Web Application Development, UI/UX Architecture, Information Systems, Workflow Automation, Google Apps Script, Interactive 3D, Clean Code & Scalability, English (Full Professional)",
    medium_username: "hilmanzahrawa",
    social_links: [
      { platform: "LinkedIn", url: "https://linkedin.com/in/hilmanzahrawa" },
      { platform: "Portfolio", url: "https://hilmanzahrawa.vercel.app" }
    ]
  },
  experiences: [
    {
      id: "exp-pal",
      company: "PT PAL Indonesia (Persero)",
      role: "HRIS Developer – HCM Division",
      slug: "pt-pal-indonesia",
      start_date: "Apr 2026",
      end_date: "Present",
      description: "Developing Human Capital Management and HR Information Systems (HRIS) to streamline personnel operations, organizational data, and enterprise human resource workflows.",
      details: "Engineering enterprise HRIS dashboards, relational database optimizations, and cross-department personnel tracking pipelines."
    },
    {
      id: "exp-mandala-strat",
      company: "Mandala Pure Love",
      role: "Creative Strategist",
      slug: "mandala-creative-strategist",
      start_date: "Sept 2025",
      end_date: "Present",
      description: "Led inclusive communication strategies and creative direction to promote disability inclusion and community empowerment. Developed insights-driven campaigns and collaborated with disability communities and partners. Contributed to the development of 'The Cup We Share' barista training program with Kafe Among Rasa, which supported sociopreneurship initiatives at SLB YPAC Kota Malang and enabled students to participate in real-world coffee shop internships.",
      details: "Inclusive campaign strategy, partnership management, social impact storytelling, and community development."
    },
    {
      id: "exp-mandala-dev",
      company: "Mandala Pure Love",
      role: "Web Developer",
      slug: "mandala-web-developer",
      start_date: "Dec 2025",
      end_date: "Apr 2026",
      description: "Contributed to the development of BrewTech under the Innovillage program. Responsible for system requirements analysis, website architecture, front-end and back-end functionalities, database management, and performance optimization.",
      details: "Next.js, TypeScript, database schemas, accessible interfaces, and social impact delivery."
    },
    {
      id: "exp-nzbox",
      company: "NZ Box Smart Laundry",
      role: "Social Media Specialist",
      slug: "nz-box-smart-laundry",
      start_date: "Feb 2026",
      end_date: "Apr 2026",
      description: "Developed marketing strategies to increase brand awareness, customer acquisition, and retention. Managed social media campaigns, created promotional materials, optimized advertising performance, and analyzed metrics for a 24-hour self-service laundry solution.",
      details: "Content creation, paid ads optimization, audience analysis, and customer loyalty retention."
    },
    {
      id: "exp-seal",
      company: "Social Economic Accelerator Lab (SEAL)",
      role: "UI/UX Designer",
      slug: "seal-accelerator",
      start_date: "Aug 2025",
      end_date: "Dec 2025",
      description: "Designed modern, accessible, and user-friendly website interface for East Java Manpower and Transmigration Office (Disnakertrans Jatim). Created intuitive CMS dashboards and designed UI/UX for ProFile+ HR Management System.",
      details: "Figma design systems, public sector accessibility audits, wireframing, and interactive prototyping."
    },
    {
      id: "exp-hmti-chair",
      company: "HMTI Polinema",
      role: "Chairman",
      slug: "hmti-polinema-chairman",
      start_date: "Feb 2024",
      end_date: "Feb 2025",
      description: "Led student organization overseeing 11 programs and 30+ agendas across 5 departments. Fostered inter-campus collaboration and enhanced student engagement.",
      details: "Executive leadership, strategic planning, cross-functional organizational management, and public representation."
    },
    {
      id: "exp-hmti-comm",
      company: "HMTI Polinema",
      role: "Organizing Committee",
      slug: "hmti-polinema-committee",
      start_date: "Feb 2023",
      end_date: "Feb 2024",
      description: "Planned and executed departmental events, coordinating logistics, technical readiness, and student-faculty communication.",
      details: "Event management, timeline scheduling, and technical operations."
    },
    {
      id: "exp-debate",
      company: "IT Dept English Community",
      role: "Debate Mentor",
      slug: "it-debate-mentor",
      start_date: "Dec 2023",
      end_date: "Feb 2025",
      description: "Mentored collegiate debaters in critical reasoning, international relations motion analysis, and British Parliamentary debate formats.",
      details: "Public speaking coaching, argument construction, and debate competition adjudication."
    }
  ],
  education: [
    {
      id: "edu-polinema",
      school: "Politeknik Negeri Malang (Polinema)",
      degree: "D4 Sistem Informasi Bisnis (Business Information Systems)",
      start_date: "Aug 2022",
      end_date: "2026",
      description: "Specialized in Software Engineering, Enterprise Database Systems, Business Process Modeling, and Web Application Architecture."
    },
    {
      id: "edu-sman1",
      school: "SMA Negeri 1 Malang",
      degree: "Mathematics & Natural Science (MIPA)",
      start_date: "Jul 2019",
      end_date: "May 2022",
      description: "Strong foundation in mathematics, analytical problem solving, and science curriculum."
    }
  ],
  honors: [
    {
      id: "aw-djarum",
      title: "\"Mandala Pure Love\" Most Inspiring Community Empowerment",
      issuer: "Djarum Beasiswa Plus",
      date: "2026",
      associated_with: "Mandala Pure Love",
      description: "Awarded as the most inspiring community empowerment initiative for 2024/2025."
    },
    {
      id: "aw-innovillage",
      title: "Innovillage Top 180 for Brewtech",
      issuer: "Innovillage",
      date: "2026",
      associated_with: "BrewTech",
      description: "Selected as one of the top 180 social projects in Indonesia for the BrewTech platform under the Innovillage program."
    },
    {
      id: "aw-debate",
      title: "2nd Runner Up - IT Poly Debate Cup",
      issuer: "IT Debate Society",
      date: "2024",
      associated_with: "Politeknik Negeri Malang",
      description: "National level public debating event adhering to the British Parliamentary Debate System format."
    },
    {
      id: "aw-4c-2024",
      title: "Finalis Desain Poster Infografis - 4C National Competition",
      issuer: "Universitas Brawijaya",
      date: "2024",
      associated_with: "Politeknik Negeri Malang",
      description: "National competition hosted by the Faculty of Computer Science at the University of Brawijaya."
    },
    {
      id: "aw-intl-debate",
      title: "2nd Best Novice Team - International I&T Open Debate Competition",
      issuer: "Indonesian Student Association in Taiwan",
      date: "2023",
      associated_with: "Politeknik Negeri Malang",
      description: "Cross-cultural public debating event drawing participants from diverse Asian nations including Indonesia, Taiwan, the Philippines, and China."
    },
    {
      id: "aw-4c-2023",
      title: "Finalis Desain Poster Infografis - 4C National Competition",
      issuer: "Universitas Brawijaya",
      date: "2023",
      associated_with: "Politeknik Negeri Malang",
      description: "National competition hosted by the Faculty of Computer Science at the University of Brawijaya."
    }
  ],
  certificates: [
    {
      id: "cert-1",
      title: "2nd Best Novice Team International I&T Open Debate Competition",
      issuer: "International Award",
      date: "2024"
    },
    {
      id: "cert-2",
      title: "2nd Place Video Competition Expo Kelembagaan OKI Polinema",
      issuer: "Polinema",
      date: "2023"
    },
    {
      id: "cert-3",
      title: "Finalist Poster Infographic Design 4C National Competition",
      issuer: "Universitas Brawijaya",
      date: "2023"
    },
    {
      id: "cert-4",
      title: "2nd Runner Up IT Poly Debate Cup",
      issuer: "Polinema",
      date: "2024"
    },
    {
      id: "cert-5",
      title: "How to Validate Your Social Project Leadership Program",
      issuer: "Innovillage",
      date: "2025"
    },
    {
      id: "cert-6",
      title: "Communicating for Community Engagement and Influence",
      issuer: "Innovillage",
      date: "2025"
    },
    {
      id: "cert-7",
      title: "Memulai Pemrograman dengan Python",
      issuer: "Dicoding Indonesia",
      date: "2024"
    },
    {
      id: "cert-8",
      title: "Belajar Dasar AI",
      issuer: "Dicoding Indonesia",
      date: "2024"
    }
  ],
  organizations: [
    {
      id: "org-1",
      name: "Himpunan Mahasiswa Teknologi Informasi (HMTI) Polinema",
      role: "Chairman",
      period: "2024 — 2025",
      description: "Led 5 core departments, 11 executive work programs, and 30+ regional campus agendas."
    },
    {
      id: "org-2",
      name: "IT Dept English Community",
      role: "Debate Mentor",
      period: "2023 — 2025",
      description: "Coached competitive varsity debate teams for regional and national championships."
    }
  ],
  landingPage: {
    title: "Home",
    tagline: "Building Scalable Web Products, Workflow Automation & Human-Centered Experiences."
  }
};

/**
 * Fetch all portfolio data from Supabase, falling back gracefully if offline or empty
 */
export async function getPortfolioData() {
  if (!isSupabaseConfigured) {
    return fallbackPortfolioData;
  }

  try {
    const fetchPromise = Promise.all([
      supabase.from('projects').select('*').order('sort_order', { ascending: true }),
      supabase.from('bio').select('*').limit(1),
      supabase.from('experiences').select('*').order('sort_order', { ascending: true }),
      supabase.from('education').select('*').order('sort_order', { ascending: true }),
      supabase.from('honors').select('*').order('sort_order', { ascending: true }),
      supabase.from('certificates').select('*').order('sort_order', { ascending: true }),
      supabase.from('organizations').select('*').order('sort_order', { ascending: true }),
      supabase.from('landing_page').select('*').limit(1),
    ]);

    // Fast 1200ms timeout guard: prevents slow Supabase cold-starts or network latency from stalling TTFB
    const timeoutPromise = new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), 1200)
    );

    const result = await Promise.race([fetchPromise, timeoutPromise]);
    if (!result) {
      console.warn("Supabase fetch exceeded 1.2s timeout, rendering instant fallback data for optimal TTFB.");
      return fallbackPortfolioData;
    }

    const [
      { data: projects, error: pErr },
      { data: bioList, error: bErr },
      { data: experiences, error: expErr },
      { data: education, error: eduErr },
      { data: honors, error: hErr },
      { data: certificates, error: cErr },
      { data: organizations, error: oErr },
      { data: landingPageList, error: lErr },
    ] = result;

    if (pErr || bErr) {
      console.warn("Supabase query warning, falling back to defaults:", pErr || bErr);
    }

    // Map projects to match the interface expected by frontend components
    const mappedProjects = (projects && projects.length > 0)
      ? projects.map((p) => ({
          ...p,
          _id: p.id,
          image: p.image_url,
          tags: Array.isArray(p.tags) ? p.tags : (p.tags ? JSON.parse(p.tags) : []),
          gallery: Array.isArray(p.gallery) ? p.gallery : (p.gallery ? JSON.parse(p.gallery) : []),
          deviceType: p.device_type,
          mediaType: p.media_type,
          videoUrl: p.video_url,
          layoutSize: p.layout_size
        }))
      : fallbackPortfolioData.projects;

    const rawBio = bioList?.[0] || fallbackPortfolioData.bio;
    const mappedBio = {
      ...rawBio,
      avatarUrl: rawBio.avatar_url || "/avatar.png",
      socialLinks: Array.isArray(rawBio.social_links) ? rawBio.social_links : (rawBio.social_links ? JSON.parse(rawBio.social_links) : fallbackPortfolioData.bio.social_links),
      mediumUsername: rawBio.medium_username || rawBio.mediumUsername || "hilmanzahrawa"
    };

    const mappedCertificates = (certificates || []).map((c) => ({
      ...c,
      _id: c.id,
      imageUrl: c.image_url
    }));

    return {
      projects: mappedProjects,
      bio: mappedBio,
      experiences: (experiences && experiences.length > 0) ? experiences : fallbackPortfolioData.experiences,
      education: (education && education.length > 0) ? education : fallbackPortfolioData.education,
      honors: (honors && honors.length > 0) ? honors : fallbackPortfolioData.honors,
      certificates: (mappedCertificates && mappedCertificates.length > 0) ? mappedCertificates : fallbackPortfolioData.certificates,
      organizations: (organizations && organizations.length > 0) ? organizations : fallbackPortfolioData.organizations,
      landingPage: landingPageList?.[0] || fallbackPortfolioData.landingPage
    };
  } catch (error) {
    console.error("Error fetching Supabase data:", error);
    return fallbackPortfolioData;
  }
}

/**
 * Fetch a single project by its slug
 */
export async function getProjectBySlug(slug: string) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

      if (!error && data) {
        return {
          ...data,
          _id: data.id,
          image: data.image_url,
          tags: Array.isArray(data.tags) ? data.tags : (data.tags ? JSON.parse(data.tags) : []),
          gallery: Array.isArray(data.gallery) ? data.gallery : (data.gallery ? JSON.parse(data.gallery) : []),
          deviceType: data.device_type,
          mediaType: data.media_type,
          videoUrl: data.video_url,
          layoutSize: data.layout_size
        };
      }
    } catch (e) {
      console.warn("Supabase project lookup error:", e);
    }
  }

  // Fallback lookup in default projects
  return fallbackPortfolioData.projects.find(p => p.slug === slug) || null;
}

/**
 * Fetch a single experience by its slug
 */
export async function getExperienceBySlug(slug: string) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .eq('slug', slug)
        .single();

      if (!error && data) return data;
    } catch (e) {
      console.warn("Supabase experience lookup error:", e);
    }
  }

  // Fallback lookup
  return fallbackPortfolioData.experiences.find(e => e.slug === slug) || null;
}
