---
name: portfolio-management
description: >-
  Operational runbook and architectural standards for Hilman Zahrawa's engineering & creative portfolio (https://hilmanzahrawa.vercel.app).
  Use this skill whenever adding new projects, editing showcase entries, managing IT vs ART dual-track switches, adjusting 3-row pagination, enforcing company data anonymization, or deploying to Vercel production.
---

# Hilman Zahrawa Portfolio Management Skill

A standardized guide for maintaining, updating, and extending the personal portfolio website of Hilman Zahrawa ([hilmanzahrawa.vercel.app](https://hilmanzahrawa.vercel.app)).

---

## 1. Architecture & Technology Stack

- **Framework**: Next.js 16 (App Router with Turbopack) & React 19.
- **Styling & Animation**: Tailwind CSS, CSS Variables, Framer Motion (`AnimatePresence`, layout transitions).
- **Icons**: `lucide-react` (SVG icons only — **Strictly avoid raw emojis** in UI badges, navigation buttons, and segmented switches).
- **Data Source**: Dual-layer architecture:
  - `src/lib/supabase.ts`: Central project registry with Supabase client integration and high-performance offline `fallbackPortfolioData`.
  - `src/app/ClientPage.tsx`: Interactive frontend UI with responsive FLIP grid, expandable project drawers, and dual-track filtering.

---

## 2. Project Classification: Dual-Track System (IT vs ART)

The portfolio cleanly segregates projects into two distinct tracks via a top switch:

### 💻 Track 1: IT & Software Engineering (`portfolioTrack = 'it'`)
- **Criteria**: Web applications, AI/NLP systems, SaaS platforms, enterprise systems, GovTech portals, and cloud POS tools.
- **Current Projects (14)**:
  1. `certimatch`: AI & NLP Certification Matching System (Next.js 16, Python, Sentence Transformers)
  2. `persuratan-pal` (LAYARPAL): Official E-Office & Digital Correspondence Platform (Laravel 12, Livewire 4)
  3. `learning-development-system` (PALKA): Corporate Learning & Development Ecosystem (Laravel, PostgreSQL)
  4. `hca-pal`: HCA Insights & HRIS Analytics Portal (Laravel 13, Three.js 3D WebGL)
  5. `internship-pal`: End-to-End Enterprise Internship Management (Laravel 13, Livewire)
  6. `duasisi-pos`: Cloud POS & Production Pipeline System (Next.js 16, Google Apps Script, Web Bluetooth)
  7. `hayday-daku-cello`: Interactive Catalog & WhatsApp Store (Next.js 14, SheetJS)
  8. `brewtech`: SaaS Platform for Inclusive Barista Training & Sociopreneurship
  9. `profile-plus`: HR Management System (UI/UX Architecture)
  10. `disnakertrans-jatim`: East Java Manpower GovTech Portal
  11. `among-rasa`: Among Rasa Sociopreneurship Web Showcase
  12. `jayatrans`: Dynamic Travel & Shuttle Booking Platform
  13. `pos-paud-teratai`: Early Childhood Education Portal
  14. `polinema-creative-center`: College Project Creative Hub

### 🎬 Track 2: Art, Film & Creative Media (`portfolioTrack = 'art'`)
- **Criteria**: Films, web drama series, video editing, music videos, and cinematic creative direction.
- **Current Projects (6)**:
  1. `the-nevasca-ep-1`: Web Series The Nevasca 2021 — Episode 1 (Intention)
  2. `the-nevasca-ep-2`: Web Series The Nevasca 2021 — Episode 2 (Decision)
  3. `the-nevasca-ep-3`: Web Series The Nevasca 2021 — Episode 3 (Reality)
  4. `the-nevasca-ep-4`: Web Series The Nevasca 2021 — Episode 4 (Final)
  5. `the-nevasca-teaser`: Official Teaser: Altruism
  6. `kos-atos-mv`: Official Music Video — Kos Atos

### Helper Identification Rule:
```typescript
const isArtProject = (work: any) => {
  return (
    work.categoryTab === 'creative' ||
    work.role?.toLowerCase().includes('director') ||
    work.role?.toLowerCase().includes('editor') ||
    work.role?.toLowerCase().includes('cinematographer') ||
    work.title?.toLowerCase().includes('nevasca') ||
    work.title?.toLowerCase().includes('altruism') ||
    work.title?.toLowerCase().includes('kos atos') ||
    work.slug?.includes('nevasca') ||
    work.slug?.includes('kos-atos') ||
    Boolean(work.videoUrl)
  );
};
```

---

## 3. Grid Layout & 3-Row Pagination Standards

- **Column Layout**: Desktop is 4 columns (`repeat(4, 1fr)`). Mobile is 1 column (`1fr`).
- **Items Per Page**: Standardized at **12 items** ($3 \text{ rows} \times 4 \text{ columns}$).
- **Pagination Controls**:
  - Always render dynamic range info: `"Showing X - Y of Z projects"` and `"Page P of N"`.
  - Accessible button labels: `aria-label="Previous Page"` and `aria-label="Next Page"`.
  - On track switch or category filter click, `currentPage` must immediately reset to `1`, and `expandedProject` must collapse.
  - On page transition, automatically scroll smoothly to `#works`.

---

## 4. Privacy & Anonymization Guardrails (Strict Rule)

When capturing screenshots or authoring sample data for enterprise/client systems (e.g. PT PAL Indonesia, Disnakertrans, etc.):
- **Employee Identifiers**: Never display real employee names, personal NIP numbers, real phone numbers, or private emails. Always replace with synthetic data (e.g., `Dewi Lestari, S.Psi.`, `Budi Santoso`, masked NIPs `1994••••••••`).
- **Confidential Internal Documents**: Mask specific SK/Perjanjian memo numbers or replace with standardized synthetic identifiers (e.g., `SK/042/HC/2026`).
- **Clean Production Assets**: Store optimized WebP/PNG assets in `public/projects/<slug>/`.

---

## 5. UI & Icon Conventions

- **Icon Components**: Use `lucide-react` SVG icons:
  - `<Code2 size={14} strokeWidth={2.2} />` for IT & Software.
  - `<Palette size={14} strokeWidth={2.2} />` for Art & Creative Media.
  - `<Layers size={14} strokeWidth={2.2} />` for All Works.
- **Never Use Raw Emojis**: Do not use `💻`, `🎬`, `✨`, or other emojis in buttons, tabs, or badges.
- **Language Default**: English default across all descriptions, outcomes, and labels to cater to international recruiters and overseas remote opportunities.

---

## 6. Build & Deployment Verification Runbook

1. **Build Verification**:
   ```powershell
   Set-Location "D:\PAL\hilmanzahrawa"
   npm run build
   ```
   *Expected outcome: `✓ Generating static pages using 15 workers (9/9) in ~2.5s`.*

2. **Commit & Push**:
   ```powershell
   git add src/
   git commit -m "feat/fix: <descriptive message>"
   git push origin main
   ```

3. **Live Production Inspection**:
   - Check commit status via `gh api /repos/roqueforti/hilmanzahrawa/commits/<sha>/statuses`.
   - Inspect production using Puppeteer script against `https://hilmanzahrawa.vercel.app`.
   - Ensure both IT and Art tracks switch cleanly with zero visual artifacts.
