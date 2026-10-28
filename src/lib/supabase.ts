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
      id: "23497c03-2630-4f1e-9308-6783922e2c43",
      _id: "23497c03-2630-4f1e-9308-6783922e2c43",
      title: "Brewtech: SaaS Platform Connecting Schools and Cafés for Inclusive Barista Training and Sociopreneurship",
      subtitle: "Mandala Pure Love - Innovillage",
      year: "2026",
      role: "Fullstack Developer",
      category: "SaaS & LMS",
      categoryTab: "web",
      displayCategory: "SaaS & LMS",
      slug: "brewtech",
      tags: ["Fullstack"],
      description: "BREWTECH is a Software-as-a-Service (SaaS) platform designed to connect vocational schools, particularly those serving students with disabilities, with cafés and coffee industry partners. The platform provides integrated tools for barista skills development, digital assessment, and sociopreneurship training, enabling schools to deliver adaptive, interactive learning while linking students directly to real-world work opportunities in partner cafés.\n\nBy creating a bridge between educational institutions and industry, BREWTECH empowers students with disabilities to gain practical experience, build confidence, and develop social entrepreneurship skills, while enabling cafés to access trained, ready-to-work baristas. The platform supports inclusive education, workforce development, and equitable economic participation, aligning with Sustainable Development Goals (SDGs) 4 (Quality Education), 8 (Decent Work and Economic Growth), and 10 (Reduced Inequalities).",
      image: "https://cdn.sanity.io/images/1plh3iom/production/d75bf594d37430dc296b5ed08c38dca3e5fb212b-1920x9728.png",
      image_url: "https://cdn.sanity.io/images/1plh3iom/production/d75bf594d37430dc296b5ed08c38dca3e5fb212b-1920x9728.png",
      coverImage: "https://cdn.sanity.io/images/1plh3iom/production/d75bf594d37430dc296b5ed08c38dca3e5fb212b-1920x9728.png",
      gallery: ["https://cdn.sanity.io/images/1plh3iom/production/d75bf594d37430dc296b5ed08c38dca3e5fb212b-1920x9728.png","https://cdn.sanity.io/images/1plh3iom/production/2dead6fb99635c45f7a7034516ad87c07a3cdbf6-1920x1301.png","https://cdn.sanity.io/images/1plh3iom/production/fc98f7659b37833984becc05133a60087d044fc7-1920x11214.png","https://cdn.sanity.io/images/1plh3iom/production/ea73752cfd3090298724759b9143d7c22a548c72-1920x2560.png","https://cdn.sanity.io/images/1plh3iom/production/f4fe4c87ccb57d47018f62d25a2419cbc0d60014-1920x1020.png","https://cdn.sanity.io/images/1plh3iom/production/92c37159b8c85933234f6fbc8a4d4457f8c15e74-1920x912.png","https://cdn.sanity.io/images/1plh3iom/production/2456e178d607537033eb34be1308df653ff96a3e-1920x1165.png","https://cdn.sanity.io/images/1plh3iom/production/1a5ffd10e471c564e6f857634b580de004e98b26-1920x3966.png","https://cdn.sanity.io/images/1plh3iom/production/13a05208e87bad7579b482682cf27fdccbb02454-1920x1601.png","https://cdn.sanity.io/images/1plh3iom/production/9899a4263e2c0b65bca3cc5f9661dff1abcc3e43-1920x1060.png","https://cdn.sanity.io/images/1plh3iom/production/f46a7c443e64a89d17019fd92bf9892e80747177-1920x3922.png","https://cdn.sanity.io/images/1plh3iom/production/718f78109a9ce46cafc310a634a6e31ea0fccd42-1920x2447.png","https://cdn.sanity.io/images/1plh3iom/production/f71ce8b886cc783ab5f042ea7581560628b46c41-1920x1934.png","https://cdn.sanity.io/images/1plh3iom/production/a7460864890e1454c1594709fb404a95f6ce2679-1920x2120.png","https://cdn.sanity.io/images/1plh3iom/production/65be43d0a5a221b8e3eeff90227486525764d103-1920x1187.png"],
      link: "https://brewtech.site",
      videoUrl: null,
      deviceType: "desktop",
      featured: true,
      stack: "Next.js · TypeScript · Supabase · Tailwind · Accessibility",
      outcome: "Empowering 50+ youth with disabilities through certified barista vocational education and industry placement pipeline.",
      sort_order: 1
    },
    {
      id: "e2117049-335d-420e-9797-20a35943bd7d",
      _id: "e2117049-335d-420e-9797-20a35943bd7d",
      title: "Profile+ HR Management System",
      subtitle: "Profile Image Studio",
      year: "2025",
      role: "UI/UX Designer",
      category: "HRIS Suite",
      categoryTab: "ui",
      displayCategory: "HRIS Suite",
      slug: "profile-plus",
      tags: ["UI/UX Design"],
      description: "ProFile+ HR Management System is a comprehensive HR platform designed to streamline and centralize key workforce processes, featuring an intuitive UI/UX that supports efficient management of employee data, attendance tracking, and performance evaluation, enabling HR teams to operate more effectively and make informed decisions across the organization.",
      image: "https://cdn.sanity.io/images/1plh3iom/production/ff6aebe776f7332fce8dcbd0b018bc15103ec8ba-1920x2370.png",
      image_url: "https://cdn.sanity.io/images/1plh3iom/production/ff6aebe776f7332fce8dcbd0b018bc15103ec8ba-1920x2370.png",
      coverImage: "https://cdn.sanity.io/images/1plh3iom/production/ff6aebe776f7332fce8dcbd0b018bc15103ec8ba-1920x2370.png",
      gallery: ["https://cdn.sanity.io/images/1plh3iom/production/ff6aebe776f7332fce8dcbd0b018bc15103ec8ba-1920x2370.png","https://cdn.sanity.io/images/1plh3iom/production/31afe7aaca045d15d9d1eb31cf695afe9bd5a906-1920x1528.png","https://cdn.sanity.io/images/1plh3iom/production/2116933691bce4a02d323ee3dc769fb2e2f85142-1920x2557.png","https://cdn.sanity.io/images/1plh3iom/production/5003b8bdb82c6cd7f18848096fd7d1c9b80af514-1920x1258.png","https://cdn.sanity.io/images/1plh3iom/production/c6c63e9bf7253f642f901e13278626ddfc636963-1920x912.png","https://cdn.sanity.io/images/1plh3iom/production/e134a192f2856ebb16872479a69b128a4e87025a-1920x917.png","https://cdn.sanity.io/images/1plh3iom/production/2a8a6f23bf90f1aef09697e83ff43d7521a283ae-1920x1347.png","https://cdn.sanity.io/images/1plh3iom/production/31ecc6af2705b86edd75fd08ac63305c08558cf0-1920x1336.png","https://cdn.sanity.io/images/1plh3iom/production/0f69d90ac9ac5eb4cd3dd31e4ca3db9690508564-1920x1873.png","https://cdn.sanity.io/images/1plh3iom/production/f7f03a3025665be28eee1504e9ffc81fe4794807-1920x912.png","https://cdn.sanity.io/images/1plh3iom/production/07f494dc35ff11dd96ed047f9b55415164890992-1920x1258.png","https://cdn.sanity.io/images/1plh3iom/production/774c1b3de29cdfb5aed57ff8e83af1c8167068c0-1920x1546.png","https://cdn.sanity.io/images/1plh3iom/production/da83aac4f96dcba972fc3b1709cb64734e1a7b62-1920x912.png","https://cdn.sanity.io/images/1plh3iom/production/95ac2da3f5286ce3d3f94be8f64f3c7569862bba-1920x1092.png","https://cdn.sanity.io/images/1plh3iom/production/08d2c704cd88447c616bf99a3bbc8465f339d5d7-1920x1755.png","https://cdn.sanity.io/images/1plh3iom/production/48f66e55155e7f07ad9bb36120760a5cbd59aa72-1920x1152.png"],
      link: null,
      videoUrl: null,
      deviceType: "desktop",
      featured: true,
      stack: "Figma · React · TailwindCSS · REST APIs · Dashboard",
      outcome: "Centralized personnel telemetry and employee lifecycle ops, cutting manual document verification by 40%.",
      sort_order: 2
    },
    {
      id: "854c49d0-f6ee-4740-93da-3ed8b9d4f13a",
      _id: "854c49d0-f6ee-4740-93da-3ed8b9d4f13a",
      title: "Disnakertrans Jatim",
      subtitle: "Disnakertrans Jatim",
      year: "2025",
      role: "UI/UX Designer",
      category: "GovTech Portal",
      categoryTab: "ui",
      displayCategory: "GovTech Portal",
      slug: "disnakertrans-jatim",
      tags: ["UI/UX Design"],
      description: "Designed a modern, accessible, and user-friendly website interface for the East Java Manpower and Transmigration Office (Disnakertrans Jatim), focusing on improving usability, enhancing user experience, and ensuring that information and services are easily accessible to a wide range of users.",
      image: "https://cdn.sanity.io/images/1plh3iom/production/a4dac36d02b97aabf019333450c398342b02fa29-360x5140.png",
      image_url: "https://cdn.sanity.io/images/1plh3iom/production/a4dac36d02b97aabf019333450c398342b02fa29-360x5140.png",
      coverImage: "https://cdn.sanity.io/images/1plh3iom/production/a4dac36d02b97aabf019333450c398342b02fa29-360x5140.png",
      gallery: ["https://cdn.sanity.io/images/1plh3iom/production/a4dac36d02b97aabf019333450c398342b02fa29-360x5140.png","https://cdn.sanity.io/images/1plh3iom/production/c84bb2911765239c661872903587287738e92e28-360x3119.png","https://cdn.sanity.io/images/1plh3iom/production/702a7d332dd16d86e46d1b5fe0696be220bbbc68-360x2540.png"],
      link: "https://disnakertrans.jatimprov.go.id/",
      videoUrl: null,
      deviceType: "mobile",
      featured: false,
      stack: "Laravel · MySQL · Bootstrap · Livewire · WCAG",
      outcome: "Standardized public labor service access across 38 regencies in East Java with dispute resolution and grievance channels.",
      sort_order: 3
    },
    {
      id: "701a0e4b-4d6c-4404-a723-70e13b4aecb6",
      _id: "701a0e4b-4d6c-4404-a723-70e13b4aecb6",
      title: "Among Rasa - Landing Page",
      subtitle: "Kafe Among Rasa",
      year: "2025",
      role: "Web Developer",
      category: "Landing Page",
      categoryTab: "landing",
      displayCategory: "Landing Page",
      slug: "among-rasa",
      tags: [],
      description: "Among Rasa is derived from two words: “Among”, a Javanese term meaning to nurture and guide, and “Rasa”, which represents sensory awareness and emotional connection.\n\nWe are a collaborative space born from a deep concern for the future of graduates from SLB YPAC Malang. Among Rasa stands as a testament that limitations are not barriers to creativity, growth, and meaningful contribution.",
      image: "https://cdn.sanity.io/images/1plh3iom/production/c401442607a60e14c6db577a2975c03702065f52-1920x17643.png",
      image_url: "https://cdn.sanity.io/images/1plh3iom/production/c401442607a60e14c6db577a2975c03702065f52-1920x17643.png",
      coverImage: "https://cdn.sanity.io/images/1plh3iom/production/c401442607a60e14c6db577a2975c03702065f52-1920x17643.png",
      gallery: ["https://cdn.sanity.io/images/1plh3iom/production/c401442607a60e14c6db577a2975c03702065f52-1920x17643.png"],
      link: "https://roqueforti.github.io/AmongRasa/",
      videoUrl: null,
      deviceType: "desktop",
      featured: false,
      stack: "Next.js · TailwindCSS · Creative Direction · Micro-interactions",
      outcome: "Empowering social entrepreneurship with Kafe Among Rasa & SLB YPAC Malang barista internships.",
      sort_order: 4
    },
    {
      id: "db826ed7-478f-4d6d-bf6f-65c97ee66c70",
      _id: "db826ed7-478f-4d6d-bf6f-65c97ee66c70",
      title: "JayaTrans - Landing Page",
      subtitle: "Internship Technical Test",
      year: "2025",
      role: "UI/UX Designer",
      category: "UI/UX & Travel",
      categoryTab: "landing",
      displayCategory: "UI/UX & Travel",
      slug: "jayatrans",
      tags: [],
      description: "JayaTrans is an intercity and interprovincial bus company that has been serving land transportation in Indonesia for over 20 years. Known for its modern fleet, professional drivers, and commitment to punctuality, JayaTrans has become the top choice for thousands of passengers every month.",
      image: "https://cdn.sanity.io/images/1plh3iom/production/b83e52dfa349eb8267e7a3bf878d44bc338d348e-1440x5702.png",
      image_url: "https://cdn.sanity.io/images/1plh3iom/production/b83e52dfa349eb8267e7a3bf878d44bc338d348e-1440x5702.png",
      coverImage: "https://cdn.sanity.io/images/1plh3iom/production/b83e52dfa349eb8267e7a3bf878d44bc338d348e-1440x5702.png",
      gallery: ["https://cdn.sanity.io/images/1plh3iom/production/b83e52dfa349eb8267e7a3bf878d44bc338d348e-1440x5702.png"],
      link: null,
      videoUrl: null,
      deviceType: "desktop",
      featured: false,
      stack: "Figma · Responsive Web Design · Design System",
      outcome: "Streamlined travel shuttle booking flow and dynamic schedule exploration for customer convenience.",
      sort_order: 5
    },
    {
      id: "30c330b6-88e0-4486-a29a-e1b4b75d2f25",
      _id: "30c330b6-88e0-4486-a29a-e1b4b75d2f25",
      title: "Pos Paud Teratai - Landing Page",
      subtitle: "Pos Paud Teratai Malang",
      year: "2025",
      role: "Web Developer",
      category: "Education Portal",
      categoryTab: "landing",
      displayCategory: "Education Portal",
      slug: "pos-paud-teratai",
      tags: [],
      description: "Landing page for Pos Paud Teratai Malang",
      image: "https://cdn.sanity.io/images/1plh3iom/production/403983ef18bd5a49ade223f973fa199270bc0211-1920x3835.png",
      image_url: "https://cdn.sanity.io/images/1plh3iom/production/403983ef18bd5a49ade223f973fa199270bc0211-1920x3835.png",
      coverImage: "https://cdn.sanity.io/images/1plh3iom/production/403983ef18bd5a49ade223f973fa199270bc0211-1920x3835.png",
      gallery: ["https://cdn.sanity.io/images/1plh3iom/production/403983ef18bd5a49ade223f973fa199270bc0211-1920x3835.png"],
      link: "https://roqueforti.github.io/Pos-Paud-Teratai/",
      videoUrl: null,
      deviceType: "desktop",
      featured: false,
      stack: "Next.js · TailwindCSS · Mobile-First UI",
      outcome: "Digital informational hub connecting parents and educators for early childhood programs.",
      sort_order: 6
    },
    {
      id: "8148ca78-c69e-4925-8134-5e0544cd66f9",
      _id: "8148ca78-c69e-4925-8134-5e0544cd66f9",
      title: "Polinema Creative Center - College Project",
      subtitle: "College Project",
      year: "2023",
      role: "Web Developer",
      category: "Creative Hub",
      categoryTab: "web",
      displayCategory: "Creative Hub",
      slug: "polinema-creative-center",
      tags: [],
      description: "Polinema Creative Center is a reservation website for public places and facilities in Politeknik Negeri Malang",
      image: "https://cdn.sanity.io/images/1plh3iom/production/21d72650259fbff73393b508a78b51ae681efb76-1920x2602.png",
      image_url: "https://cdn.sanity.io/images/1plh3iom/production/21d72650259fbff73393b508a78b51ae681efb76-1920x2602.png",
      coverImage: "https://cdn.sanity.io/images/1plh3iom/production/21d72650259fbff73393b508a78b51ae681efb76-1920x2602.png",
      gallery: ["https://cdn.sanity.io/images/1plh3iom/production/21d72650259fbff73393b508a78b51ae681efb76-1920x2602.png","https://cdn.sanity.io/images/1plh3iom/production/d5e3391be42c36c8a90f782e0add88a6b9a2a821-1920x912.png"],
      link: "https://roqueforti.github.io/Polinema-Creative-Center/",
      videoUrl: null,
      deviceType: "desktop",
      featured: false,
      stack: "PHP · Laravel · MySQL · Bootstrap",
      outcome: "College ecosystem connecting student creative projects, digital portfolios, and cross-department collaboration.",
      sort_order: 7
    },
    {
      id: "7cc8d06e-a901-4df8-ad46-9fb41913a917",
      _id: "7cc8d06e-a901-4df8-ad46-9fb41913a917",
      title: "[Episode 1] Intention | Web Series The Nevasca 2021",
      subtitle: "The Nevasca - SMAN 1 Malang",
      year: "2021",
      role: "Director",
      category: "Web Series",
      categoryTab: "creative",
      displayCategory: "Web Series",
      slug: "the-nevasca-ep-1",
      tags: [],
      description: "Perjalanan manis yang telah kalian lewati sampai saat ini pastinya memiliki banyak kisah dan lika-liku yang menarik untuk diceritakan.\nSama seperti perjalanan manis Nevara, gadis berbakat dan pantang menyerah dalam menggali bakatnya, dan tidak mudah menyerah dengan keadaan, yang akan menemani weekend kalian dengan kisah kisah manis dari Nevara dalam episode 1 Exclusive web series The Nevasca 2021.",
      image: "https://cdn.sanity.io/images/1plh3iom/production/2d9eb0f76d140258299449a4c1f5c118ddf30d8d-1513x851.png",
      image_url: "https://cdn.sanity.io/images/1plh3iom/production/2d9eb0f76d140258299449a4c1f5c118ddf30d8d-1513x851.png",
      coverImage: "https://cdn.sanity.io/images/1plh3iom/production/2d9eb0f76d140258299449a4c1f5c118ddf30d8d-1513x851.png",
      gallery: ["https://cdn.sanity.io/images/1plh3iom/production/2d9eb0f76d140258299449a4c1f5c118ddf30d8d-1513x851.png"],
      link: null,
      videoUrl: "https://youtu.be/gkrWOBLSqd0?si=sY6A81i-2sLXm8ls",
      deviceType: "desktop",
      featured: false,
      stack: "Film Direction · Screenplay · Production",
      outcome: "SMAN 1 Malang Web Series - Episode 1 (Intention) highlighting student creative aspirations.",
      sort_order: 8
    },
    {
      id: "27dbca6a-c675-4981-8e69-3dccb43d2782",
      _id: "27dbca6a-c675-4981-8e69-3dccb43d2782",
      title: "[Episode 2] Decision | Web Series The Nevasca 2021",
      subtitle: "The Nevasca - SMAN 1 Malang",
      year: "2021",
      role: "Director",
      category: "Web Series",
      categoryTab: "creative",
      displayCategory: "Web Series",
      slug: "the-nevasca-ep-2",
      tags: [],
      description: "Nikmati selalu proses dan kisah dalam hidup kalian, karena setiap pengalaman pasti ada hikmahnya. Seperti kisah Nevara pada episode 2 ini yang pantang menyerah dan pantang untuk terpuruk dalam kesedihannya karena dilarang oleh ayahnya untuk mengikuti Oprec. Akankah Nevara mengikuti Oprec The Nevasca?🤔",
      image: "https://cdn.sanity.io/images/1plh3iom/production/8b65b746a0e05321f214a45e03d08d7d3812093a-1920x1080.png",
      image_url: "https://cdn.sanity.io/images/1plh3iom/production/8b65b746a0e05321f214a45e03d08d7d3812093a-1920x1080.png",
      coverImage: "https://cdn.sanity.io/images/1plh3iom/production/8b65b746a0e05321f214a45e03d08d7d3812093a-1920x1080.png",
      gallery: ["https://cdn.sanity.io/images/1plh3iom/production/8b65b746a0e05321f214a45e03d08d7d3812093a-1920x1080.png"],
      link: null,
      videoUrl: "https://youtu.be/sKo4TljNbBw?si=jvfiyW9B2DBlRx1P",
      deviceType: "desktop",
      featured: false,
      stack: "Film Direction · Cinematography · Post-Production",
      outcome: "SMAN 1 Malang Web Series - Episode 2 (Decision).",
      sort_order: 9
    },
    {
      id: "d0b450a0-ecf8-40bb-8ca0-4bfec5f57350",
      _id: "d0b450a0-ecf8-40bb-8ca0-4bfec5f57350",
      title: "[Episode 3] Reality | Web Series The Nevasca 2021",
      subtitle: "The Nevasca - SMAN 1 Malang",
      year: "2021",
      role: "Director",
      category: "Web Series",
      categoryTab: "creative",
      displayCategory: "Web Series",
      slug: "the-nevasca-ep-3",
      tags: [],
      description: "Sebagai seorang anak muda yang ingin keluar dari zona nyaman pasti tidak sedikit rintangan yang akan dihadapi, rintangan dapat hadir dari diri sendiri seperti takut atau malas, maupun dari orang lain seperti tidak adanya support atau persetujuan orang tua. Sama halnya Nevara, gadis yang pantang menyerah yang ingin keluar dari zona nyamannya dan mencoba membuat pengalaman baru dan tentunya harus melalui beberapa rintangan. Akankah Nevara menyerah? 🤔",
      image: "https://cdn.sanity.io/images/1plh3iom/production/104ec3cb88f75d4013ba69a2ce1ca45c8c90b4e5-1556x875.png",
      image_url: "https://cdn.sanity.io/images/1plh3iom/production/104ec3cb88f75d4013ba69a2ce1ca45c8c90b4e5-1556x875.png",
      coverImage: "https://cdn.sanity.io/images/1plh3iom/production/104ec3cb88f75d4013ba69a2ce1ca45c8c90b4e5-1556x875.png",
      gallery: ["https://cdn.sanity.io/images/1plh3iom/production/104ec3cb88f75d4013ba69a2ce1ca45c8c90b4e5-1556x875.png"],
      link: null,
      videoUrl: "https://youtu.be/d5OV0MaayvQ?si=fUbRTszLpdRdaghE",
      deviceType: "desktop",
      featured: false,
      stack: "Film Direction · Color Grading · Audio Post",
      outcome: "SMAN 1 Malang Web Series - Episode 3 (Reality).",
      sort_order: 10
    },
    {
      id: "0e8bcc54-eaff-444f-84f3-5f7bb200fdab",
      _id: "0e8bcc54-eaff-444f-84f3-5f7bb200fdab",
      title: "[Episode 4] Final | Web Series The Nevasca 2021",
      subtitle: "The Nevasca - SMAN 1 Malang",
      year: "2021",
      role: "Director",
      category: "Web Series",
      categoryTab: "creative",
      displayCategory: "Web Series",
      slug: "the-nevasca-ep-4",
      tags: [],
      description: "Nevara, gadis berbakat dan pantang menyerah dalam menggali bakatnya dengan mengikuti oprec The Nevasca tetapi terhalang oleh orang tuanya. Sampai realita yang akhirnya dihadapi Nevara, dia bertengkar hebat dengan bapaknya dan munculah berita Covid-19 yang menyebabkan The Nevasca terpaksa dibatalkan.",
      image: "https://cdn.sanity.io/images/1plh3iom/production/b885e34db220974faec1bdd670629e2eb3140f6c-1280x720.png",
      image_url: "https://cdn.sanity.io/images/1plh3iom/production/b885e34db220974faec1bdd670629e2eb3140f6c-1280x720.png",
      coverImage: "https://cdn.sanity.io/images/1plh3iom/production/b885e34db220974faec1bdd670629e2eb3140f6c-1280x720.png",
      gallery: ["https://cdn.sanity.io/images/1plh3iom/production/b885e34db220974faec1bdd670629e2eb3140f6c-1280x720.png"],
      link: null,
      videoUrl: "https://youtu.be/ad1VNNsuzZM?si=jqPjwWf_i8_1les4",
      deviceType: "desktop",
      featured: false,
      stack: "Film Direction · Sound Design · Final Cut",
      outcome: "SMAN 1 Malang Web Series - Finale Episode 4 (Final).",
      sort_order: 11
    },
    {
      id: "e5550c64-f4ff-4eab-a876-316b9e5ca5d3",
      _id: "e5550c64-f4ff-4eab-a876-316b9e5ca5d3",
      title: "[Official Teaser] Altruism : Miracle of the Sweetest Journey",
      subtitle: "The Nevasca - SMAN 1 Malang",
      year: "2021",
      role: "Video Editor",
      category: "Video Production",
      categoryTab: "creative",
      displayCategory: "Video Production",
      slug: "the-nevasca-teaser",
      tags: [],
      description: "Official Teaser The Nevasca 2021 is out now!\nThe Nevasca 2021 x Bantoo.",
      image: "https://cdn.sanity.io/images/1plh3iom/production/cbd2cea156518661be33c5973a8ce956161615dc-1315x740.png",
      image_url: "https://cdn.sanity.io/images/1plh3iom/production/cbd2cea156518661be33c5973a8ce956161615dc-1315x740.png",
      coverImage: "https://cdn.sanity.io/images/1plh3iom/production/cbd2cea156518661be33c5973a8ce956161615dc-1315x740.png",
      gallery: ["https://cdn.sanity.io/images/1plh3iom/production/cbd2cea156518661be33c5973a8ce956161615dc-1315x740.png"],
      link: null,
      videoUrl: "https://www.youtube.com/watch?v=VCGWzbCOR4Y",
      deviceType: "desktop",
      featured: false,
      stack: "Adobe Premiere · After Effects · Sound Mixing",
      outcome: "Official teaser trailer for SMAN 1 Malang's flagship creative series.",
      sort_order: 12
    },
    {
      id: "608b9d00-a43e-4a51-8393-150694f13019",
      _id: "608b9d00-a43e-4a51-8393-150694f13019",
      title: "KOS ATOS - Kita Beda Berbahaya (OFFICIAL MUSIC VIDEO)",
      subtitle: "Kos Atos",
      year: "2018",
      role: "Video Editor",
      category: "Music Video",
      categoryTab: "creative",
      displayCategory: "Music Video",
      slug: "kos-atos-mv",
      tags: [],
      description: "$15",
      image: "https://cdn.sanity.io/images/1plh3iom/production/e304bf388a1f2e1ac0e30d6118e9cdb9d89b86c7-519x416.jpg",
      image_url: "https://cdn.sanity.io/images/1plh3iom/production/e304bf388a1f2e1ac0e30d6118e9cdb9d89b86c7-519x416.jpg",
      coverImage: "https://cdn.sanity.io/images/1plh3iom/production/e304bf388a1f2e1ac0e30d6118e9cdb9d89b86c7-519x416.jpg",
      gallery: ["https://cdn.sanity.io/images/1plh3iom/production/e304bf388a1f2e1ac0e30d6118e9cdb9d89b86c7-519x416.jpg"],
      link: null,
      videoUrl: "https://youtu.be/sKHoqxOmrjk?si=YpmvlbK8oLNT7-eG",
      deviceType: "desktop",
      featured: false,
      stack: "Video Editing · Color Grading · VFX",
      outcome: "Official Music Video for KOS ATOS - Kita Beda Berbahaya.",
      sort_order: 13
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
      ? projects.map((p) => {
          const fallback = fallbackPortfolioData.projects.find(fp => fp.slug === p.slug || fp.id === p.id);
          const rawTags = Array.isArray(p.tags) ? p.tags : (p.tags ? JSON.parse(p.tags) : (fallback?.tags || []));
          const rawGallery = Array.isArray(p.gallery) ? p.gallery : (p.gallery ? JSON.parse(p.gallery) : (fallback?.gallery || []));
          return {
            ...p,
            _id: p.id,
            image: p.image_url || fallback?.image || '',
            coverImage: p.image_url || fallback?.coverImage || '',
            tags: rawTags,
            gallery: (rawGallery && rawGallery.length > 0) ? rawGallery : (fallback?.gallery || []),
            categoryTab: p.category_tab || fallback?.categoryTab || 'web',
            displayCategory: p.display_category || fallback?.displayCategory || p.category || 'Web Platform',
            deviceType: p.device_type || fallback?.deviceType || 'desktop',
            mediaType: p.media_type || fallback?.mediaType || 'image',
            videoUrl: p.video_url || fallback?.videoUrl || null,
            layoutSize: p.layout_size || fallback?.layoutSize,
            stack: p.stack || fallback?.stack,
            outcome: p.outcome || fallback?.outcome,
            link: p.link || fallback?.link || null
          };
        })
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
