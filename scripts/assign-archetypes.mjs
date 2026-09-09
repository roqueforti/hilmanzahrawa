import fs from 'fs';
import path from 'path';

const fileContent = fs.readFileSync(path.resolve('scripts/build-anime-templates.mjs'), 'utf-8');

const archetypeMap = {
  frieren: { layout: 'flanked-balanced', particle: 'falling-petals' },
  stark: { layout: 'asymmetric-split', particle: 'rising-embers' },
  fern: { layout: 'zen-minimal-centerfold', particle: 'falling-petals' },
  eren: { layout: 'vanguard-dynamic', particle: 'rising-embers' },
  levi: { layout: 'asymmetric-split', particle: 'cyber-hex-prisms' },
  mikasa: { layout: 'editorial-dual-scroll', particle: 'cyber-hex-prisms' },
  naruto: { layout: 'cyber-hud-minimal', particle: 'rising-embers' },
  sasuke: { layout: 'cyber-hud-minimal', particle: 'lightning-sparks' },
  sakura: { layout: 'editorial-dual-scroll', particle: 'falling-petals' },
  hinata: { layout: 'zen-minimal-centerfold', particle: 'falling-petals' },
  luffy: { layout: 'flanked-balanced', particle: 'water-droplets' },
  ace: { layout: 'asymmetric-split', particle: 'rising-embers' },
  sabo: { layout: 'vanguard-dynamic', particle: 'rising-embers' },
  nami: { layout: 'editorial-dual-scroll', particle: 'water-droplets' },
  'zero-two': { layout: 'cyber-hud-minimal', particle: 'cyber-hex-prisms' },
  tanjiro: { layout: 'flanked-balanced', particle: 'rising-embers' },
  zenitsu: { layout: 'vanguard-dynamic', particle: 'lightning-sparks' },
  inosuke: { layout: 'asymmetric-split', particle: 'water-droplets' },
  giyuu: { layout: 'zen-minimal-centerfold', particle: 'water-droplets' },
  shinobu: { layout: 'cyber-hud-minimal', particle: 'wisteria-butterflies' },
};

// We will update build-anime-templates.mjs to assign these mappings
let updated = fileContent;

for (const [slug, conf] of Object.entries(archetypeMap)) {
  // Update in characters array
  const regex = new RegExp(`(id:\\s*'${slug}',[\\s\\S]*?layoutArchetype:\\s*)'[^']*'`);
  updated = updated.replace(regex, `$1'${conf.layout}',\n    particle3DMode: '${conf.particle}'`);
}

// Update LayoutArchetype definition
const layoutTypeRegex = /export type LayoutArchetype =[\s\S]*?;/;
const newLayoutTypes = `export type LayoutArchetype = 
  | 'flanked-balanced'
  | 'asymmetric-split'
  | 'zen-minimal-centerfold'
  | 'vanguard-dynamic'
  | 'editorial-dual-scroll'
  | 'cyber-hud-minimal';

export type AnimeParticleMode = 
  | 'falling-petals'
  | 'rising-embers'
  | 'lightning-sparks'
  | 'wisteria-butterflies'
  | 'water-droplets'
  | 'cyber-hex-prisms';`;

updated = updated.replace(layoutTypeRegex, newLayoutTypes);

// Update AnimeTemplate interface to include particle3DMode
updated = updated.replace(
  `layoutArchetype: LayoutArchetype;`,
  `layoutArchetype: LayoutArchetype;\n  particle3DMode: AnimeParticleMode;`
);

// Update templateObj construction
updated = updated.replace(
  `layoutArchetype: c.layoutArchetype,`,
  `layoutArchetype: c.layoutArchetype,\n    particle3DMode: c.particle3DMode,`
);

// Update ANIME_UNIVERSES export to use name
const uniExport = `export const ANIME_UNIVERSES = [
  { id: 'all', name: 'All Universes', count: 20 },
  { id: 'Sousou no Frieren', name: 'Frieren', count: 3 },
  { id: 'Attack on Titan', name: 'Attack on Titan', count: 3 },
  { id: 'Naruto Shippuden', name: 'Naruto', count: 4 },
  { id: 'One Piece', name: 'One Piece', count: 4 },
  { id: 'Darling in the Franxx', name: 'Darling in the Franxx', count: 1 },
  { id: 'Demon Slayer', name: 'Demon Slayer', count: 5 },
];\n\n`;

updated = updated.replace(`export const ANIME_TEMPLATES`, uniExport + `export const ANIME_TEMPLATES`);

fs.writeFileSync(path.resolve('scripts/build-anime-templates.mjs'), updated, 'utf-8');
console.log('Updated scripts/build-anime-templates.mjs successfully!');
