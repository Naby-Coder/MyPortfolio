/**
 * Maps legacy Supabase Storage image URLs to local copies bundled in /public,
 * so images keep displaying even if the Supabase account/bucket is unavailable.
 */
const LOCAL_IMAGE_MAP: Record<string, string> = {
  '1786726578232-ebyame9.png': '/projects/drop/drop-1.png',
  '1786725723022-vdnss6j.png': '/projects/drop/drop-2.png',
  '1786725721918-fbl9goi.png': '/projects/drop/drop-3.png',
  '1786725720749-2t1xlic.png': '/projects/drop/drop-4.png',
  '1786727429306-o7wwwij.jpeg': '/projects/asm/asm-1.jpeg',
  '1786727430019-5xnopby.jpeg': '/projects/asm/asm-2.jpeg',
  '1786727430490-o10f8wh.jpeg': '/projects/asm/asm-3.jpeg',
  '1786727928090-lsspxzp.webp': '/projects/boucher/boucher-1.webp',
  '1786727927600-ux8sbxs.webp': '/projects/boucher/boucher-2.webp',
  '1786740456795-x3diqhf.png': '/certificates/cert-frontend-dev.png',
  '1786740612322-j4lvlz0.png': '/certificates/cert-marketing-digital.png',
  '1786740272736-4mha2kp.png': '/certificates/cert-ccna1.png',
};

export function isSupabaseStorageUrl(url: unknown): url is string {
  return typeof url === 'string' && url.includes('supabase.co/storage');
}

/**
 * Returns a local path for a known Supabase Storage URL, the URL itself if it
 * is not a Supabase Storage URL, or `fallback` for unknown storage files.
 */
export function toLocalImage(url: unknown, fallback = ''): string {
  if (typeof url !== 'string' || !url) return fallback;
  if (!isSupabaseStorageUrl(url)) return url;
  const fileName = url.split('/').pop()?.split('?')[0] || '';
  return LOCAL_IMAGE_MAP[fileName] || fallback;
}
