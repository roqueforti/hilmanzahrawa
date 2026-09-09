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
    headline: "Software Developer & UI/UX Designer",
    tagline: "Building Digital Products, Websites & Human-Centered Experiences.",
    about: "Software Developer & UI/UX Designer focused on building functional, thoughtful, and visually engaging digital products.",
    experience_summary: "3+ years crafting scalable web applications and intuitive interfaces.",
    location: "Malang, Jawa Timur, Indonesia",
    email: "budiarto3788@gmail.com",
    whatsapp: "6285806003234",
    avatar_url: "/avatar.png",
    skills: "Web Application Development, UI/UX Architecture, Information Systems, Workflow Automation, Interactive 3D, Clean Code & Scalability",
    medium_username: "hilmanzahrawa",
    social_links: [
      { platform: "LinkedIn", url: "https://linkedin.com/in/hilmanzahrawa" },
      { platform: "Portfolio", url: "https://hilmanzahrawa.vercel.app" }
    ]
  },
  experiences: [
    {
      id: "exp-1",
      company: "Freelance & Independent Contractor",
      role: "Full-Stack Developer & UI/UX Designer",
      slug: "independent-contractor",
      start_date: "2023",
      end_date: "Present",
      description: "Delivering end-to-end web applications, custom CMS dashboards, and accessible UI/UX designs for clients across government, education, and retail.",
      details: "Delivering production-grade applications with modern TypeScript, Next.js, Laravel, and cloud databases."
    }
  ],
  education: [
    {
      id: "edu-1",
      school: "State Polytechnic of Malang (Polinema)",
      degree: "Information Technology / Informatics Engineering",
      start_date: "2022",
      end_date: "Present",
      description: "Specialized in Web Software Engineering, Database Systems, and Human-Computer Interaction."
    }
  ],
  honors: [],
  certificates: [],
  organizations: [],
  landingPage: {
    title: "Home",
    tagline: "Building Digital Products, Websites & Human-Centered Experiences."
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
    const [
      { data: projects, error: pErr },
      { data: bioList, error: bErr },
      { data: experiences, error: expErr },
      { data: education, error: eduErr },
      { data: honors, error: hErr },
      { data: certificates, error: cErr },
      { data: organizations, error: oErr },
      { data: landingPageList, error: lErr },
    ] = await Promise.all([
      supabase.from('projects').select('*').order('sort_order', { ascending: true }),
      supabase.from('bio').select('*').limit(1),
      supabase.from('experiences').select('*').order('sort_order', { ascending: true }),
      supabase.from('education').select('*').order('sort_order', { ascending: true }),
      supabase.from('honors').select('*').order('sort_order', { ascending: true }),
      supabase.from('certificates').select('*').order('sort_order', { ascending: true }),
      supabase.from('organizations').select('*').order('sort_order', { ascending: true }),
      supabase.from('landing_page').select('*').limit(1),
    ]);

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
      honors: honors || [],
      certificates: mappedCertificates,
      organizations: organizations || [],
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
