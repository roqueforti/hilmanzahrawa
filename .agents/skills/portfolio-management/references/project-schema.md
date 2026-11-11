# Project Data Schema Reference

Every project registered in `src/lib/supabase.ts` (`fallbackPortfolioData.projects`) must adhere to this contract:

```typescript
export interface ProjectItem {
  id: string;                     // Unique UUID string
  _id: string;                    // Matching UUID for backward compatibility
  title: string;                  // Project Title (English)
  subtitle: string;               // Organization, Client, or Program
  year: string;                   // Completion or active year (e.g., "2026")
  role: string;                   // Engineering role (e.g., "Lead Fullstack & NLP Engineer")
  category: string;               // Technical category tag
  categoryTab: 'web' | 'ui' | 'landing' | 'creative';
  displayCategory: string;        // Visual category badge
  slug: string;                   // Unique URL slug (kebab-case)
  tags: string[];                 // Tech stack keywords
  description: string;            // Multi-paragraph detailed technical summary (English)
  image: string;                  // Primary cover thumbnail path
  image_url: string;              // Primary image URL
  coverImage: string;             // Cover image path
  gallery: string[];              // High-resolution UI screenshots (anonymized)
  link: string | null;            // Live demo or repository URL
  videoUrl: string | null;        // YouTube or video embed URL (if Art project)
  deviceType: 'desktop' | 'mobile';
  featured: boolean;
  stack: string;                  // Dot-separated tech stack list
  outcome: string;                // Measurable business impact or operational metric
  sort_order: number;             // Ascending order in gallery
}
```
