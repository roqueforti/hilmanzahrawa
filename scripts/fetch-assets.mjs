import fs from 'fs';
import path from 'path';

async function getImageUrl(wikiDomain, fileName) {
  const url = `https://${wikiDomain}/api.php?action=query&titles=File:${encodeURIComponent(fileName)}&prop=imageinfo&iiprop=url&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const data = await res.json();
  const pages = data.query?.pages || {};
  for (const k of Object.keys(pages)) {
    if (pages[k].imageinfo && pages[k].imageinfo[0]) {
      return pages[k].imageinfo[0].url;
    }
  }
  return null;
}

async function download(url, dest) {
  console.log(`Downloading ${url} -> ${dest}`);
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  const buf = await res.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buf));
  console.log(`Saved ${dest} (${buf.byteLength} bytes)`);
}

async function main() {
  const kny = 'kimetsu-no-yaiba.fandom.com';
  const ditf = 'darling-in-the-franxx.fandom.com';

  const targets = [
    { wiki: kny, file: 'Zenitsu_Anime_Profile.png', dest: 'public/anime/zenitsu.png' },
    { wiki: kny, file: 'Inosuke_anime.png', dest: 'public/anime/inosuke.png' },
    { wiki: kny, file: 'Giyu_anime_design.png', dest: 'public/anime/giyuu.png' },
    { wiki: kny, file: 'Shinobu_anime.png', dest: 'public/anime/shinobu.png' },
    { wiki: ditf, file: 'Zerotwomain.jpg', dest: 'public/anime/zero-two.jpg' },
  ];

  for (const t of targets) {
    const imgUrl = await getImageUrl(t.wiki, t.file);
    if (!imgUrl) {
      console.error(`Could not find URL for ${t.file}`);
      continue;
    }
    // Clean up revision param if needed or use directly
    await download(imgUrl, path.resolve(t.dest));
  }
}

main().catch(console.error);
