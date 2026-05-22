/**
 * resolveAsset — prefix a public-folder path with Vite's BASE_URL.
 *
 * Usage:  resolveAsset("/assets/audio/se_click.mp3")
 *   → dev:              "/assets/audio/se_click.mp3"
 *   → GitHub Pages:     "/tankyu-rpg/assets/audio/se_click.mp3"
 *
 * Works for any path stored as a plain string in scenario data, component
 * constants, or runtime string construction.
 */
export function resolveAsset(path: string): string {
  if (!path) return path;
  // Strip leading slash so we never get double-slash
  const stripped = path.replace(/^\//, "");
  // import.meta.env.BASE_URL always ends with "/"
  return import.meta.env.BASE_URL + stripped;
}
