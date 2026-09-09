/**
 * Helper to safely extract image URLs from Supabase, external URLs, or local assets.
 */
export function getImageUrl(image: any, fallback: string = ''): string {
  if (!image) return fallback;

  if (typeof image === 'string') {
    return image.trim();
  }

  if (typeof image === 'object') {
    if (image.url) return image.url;
    if (image.asset?.url) return image.asset.url;
    if (image.src) return image.src;
  }

  return fallback;
}

/**
 * Generate clean URL-friendly slugs from strings
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/&/g, '-and-')      // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-');     // Replace multiple - with single -
}
