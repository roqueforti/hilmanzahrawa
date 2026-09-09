-- ==============================================================================
-- SUPABASE SCHEMA FOR HILMAN ZAHRAWA PORTFOLIO & CUSTOM CMS
-- Copy and paste this script into your Supabase project's SQL Editor and click RUN.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('it', 'design')),
  role TEXT,
  year TEXT,
  subtitle TEXT,
  description TEXT,
  content TEXT,
  image_url TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  link TEXT,
  device_type TEXT DEFAULT 'desktop',
  media_type TEXT DEFAULT 'image' CHECK (media_type IN ('image', 'video', 'gallery')),
  video_url TEXT,
  layout_size TEXT DEFAULT 'regular' CHECK (layout_size IN ('regular', 'wide', 'tall', 'large')),
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. BIO & PROFILE TABLE
CREATE TABLE IF NOT EXISTS public.bio (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  headline TEXT,
  tagline TEXT,
  about TEXT,
  experience_summary TEXT,
  location TEXT,
  email TEXT,
  whatsapp TEXT,
  avatar_url TEXT,
  social_links JSONB DEFAULT '[]'::jsonb,
  skills TEXT,
  medium_username TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT,
  description TEXT,
  details TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. EDUCATION TABLE
CREATE TABLE IF NOT EXISTS public.education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school TEXT NOT NULL,
  degree TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. HONORS & AWARDS TABLE
CREATE TABLE IF NOT EXISTS public.honors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date TEXT,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date TEXT,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ORGANIZATIONS TABLE
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role TEXT NOT NULL,
  organization TEXT NOT NULL,
  period TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. LANDING PAGE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.landing_page (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT DEFAULT 'Home',
  tagline TEXT DEFAULT 'Building Digital Products, Websites & Human-Centered Experiences.',
  sections JSONB DEFAULT '[
    {"title": "it", "type": "it"},
    {"title": "design", "type": "design"},
    {"title": "about", "type": "umum"}
  ]'::jsonb,
  about_sections JSONB DEFAULT '[
    {"title": "Experience", "type": "experience"},
    {"title": "Education", "type": "education"},
    {"title": "Achievements", "type": "achievements"},
    {"title": "Organizations", "type": "organizations"},
    {"title": "Certificates", "type": "certificates"}
  ]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.honors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landing_page ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for portfolio visitors)
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public can view bio" ON public.bio FOR SELECT USING (true);
CREATE POLICY "Public can view experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Public can view education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public can view honors" ON public.honors FOR SELECT USING (true);
CREATE POLICY "Public can view certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Public can view organizations" ON public.organizations FOR SELECT USING (true);
CREATE POLICY "Public can view landing_page" ON public.landing_page FOR SELECT USING (true);

-- Allow full access to anon/authenticated for CMS management via API / admin dashboard
CREATE POLICY "Full access projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full access bio" ON public.bio FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full access experiences" ON public.experiences FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full access education" ON public.education FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full access honors" ON public.honors FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full access certificates" ON public.certificates FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full access organizations" ON public.organizations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full access landing_page" ON public.landing_page FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- STORAGE BUCKET CONFIGURATION (for portfolio images)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view portfolio assets" ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio');

CREATE POLICY "Anyone can upload portfolio assets" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'portfolio');

CREATE POLICY "Anyone can update portfolio assets" ON storage.objects
  FOR UPDATE USING (bucket_id = 'portfolio');

CREATE POLICY "Anyone can delete portfolio assets" ON storage.objects
  FOR DELETE USING (bucket_id = 'portfolio');

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================

-- 1. BIO SEED
INSERT INTO public.bio (
  name, headline, tagline, about, experience_summary, location, email, whatsapp, avatar_url, skills, medium_username, social_links
) VALUES (
  'HILMAN ZAHRAWA',
  'Software Developer & UI/UX Designer',
  'Building Digital Products, Websites & Human-Centered Experiences.',
  'Software Developer & UI/UX Designer focused on building functional, thoughtful, and visually engaging digital products.',
  '3+ years crafting scalable web applications and intuitive interfaces.',
  'Malang, Jawa Timur, Indonesia',
  'budiarto3788@gmail.com',
  '6285806003234',
  '/avatar.png',
  'Web Application Development, UI/UX Architecture, Information Systems, Workflow Automation, Interactive 3D, Clean Code & Scalability',
  'hilmanzahrawa',
  '[
    {"platform": "LinkedIn", "url": "https://linkedin.com/in/hilmanzahrawa"},
    {"platform": "Portfolio", "url": "https://hilmanzahrawa.vercel.app"}
  ]'::jsonb
) ON CONFLICT DO NOTHING;

-- 2. PROJECTS SEED
INSERT INTO public.projects (
  title, slug, category, role, year, subtitle, description, content, tags, featured, sort_order
) VALUES 
(
  'JTI Information System',
  'jti-information-system',
  'it',
  'Full-Stack Developer',
  '2025',
  'Internal workload management system for academic faculty.',
  'Designed & developed an internal workload management system for academic staff, digitizing trimester schedule coordination and departmental reporting.',
  '### Overview
Centralized activity & workload management, eliminating duplicate filing and reducing administrative overhead by 45%.

### Key Highlights
- Custom role-based permission system for lecturers and administrative heads
- Real-time workload quota tracking and report generator
- Seamless integration with institutional database architectures',
  '["Laravel", "MySQL", "Bootstrap", "Livewire"]'::jsonb,
  true,
  1
),
(
  'Brewtech',
  'brewtech',
  'it',
  'Full-Stack Developer & UI/UX',
  '2026',
  'Vocational education platform empowering disabled baristas.',
  'Vocational learning platform that empowers individuals with disabilities into certified barista talents through tailored interactive modules and curriculum management.',
  '### Overview
Empowering 50+ disabled youth through structured digital vocational training and barista job placement pipelines.

### Key Highlights
- High-contrast accessible interface meeting WCAG standards
- Gamified learning modules with progress tracking
- Partner coffee-shop placement verification portal',
  '["Next.js", "TypeScript", "SaaS", "Accessibility"]'::jsonb,
  true,
  2
),
(
  'ProFile+',
  'profile-plus',
  'it',
  'UI/UX Designer & Frontend Engineer',
  '2025',
  'Employee lifecycle & HR management suite.',
  'Comprehensive HR platform supporting personnel data verification, daily attendance tracking, payroll workflows, and employee performance analytics.',
  '### Overview
Centralized organizational data operations, cutting manual document verification and administrative time by 40%.

### Key Highlights
- Dynamic shift scheduling calendar
- Automated leave and overtime approvals
- Exportable monthly payroll compliance reports',
  '["React", "UI/UX", "HR Management", "Analytics"]'::jsonb,
  true,
  3
),
(
  'Disnakertrans Jatim Portal',
  'disnakertrans-jatim',
  'it',
  'Full-Stack Web Developer',
  '2025',
  'Provincial public labor service portal.',
  'Modern government web portal engineered to deliver accessible provincial public services, labor dispute resolutions, and transparent citizen grievance reporting.',
  '### Overview
Standardized regional labor public access for 38 regencies across East Java with responsive WCAG-friendly accessibility.',
  '["Web App", "Public Sector", "Laravel", "MySQL"]'::jsonb,
  true,
  4
),
(
  'Mandala Pure Love',
  'mandala',
  'it',
  'Lead Web Developer',
  '2025',
  'Community socio-entrepreneurship digital platform.',
  'Empowerment platform connecting local community entrepreneurs, crowd-financing micro-grants, and local business mentorship networks.',
  '### Overview
Connected 120+ micro-businesses with mentorship programs and automated fundraising progress tracking.',
  '["Web Platform", "Socio-tech", "Cloud"]'::jsonb,
  false,
  5
),
(
  'NZ Box Laundry',
  'nz-box',
  'design',
  'Digital Strategist & UI Designer',
  '2026',
  'Retail strategy & digital operations system.',
  'Data-driven customer retention system and digital marketing strategy for retail laundry chains.',
  '### Overview
Boosted recurring customer return rates by 28% via tailored digital loyalty loops.',
  '["Digital Marketing", "Retail System", "Figma", "Brand Strategy"]'::jsonb,
  false,
  6
) ON CONFLICT (slug) DO NOTHING;

-- 3. LANDING PAGE SEED
INSERT INTO public.landing_page (title, tagline)
VALUES (
  'Home',
  'Software Engineer & Product Designer'
) ON CONFLICT DO NOTHING;
