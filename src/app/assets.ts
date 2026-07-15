const bundledAssets = import.meta.glob("../../assets/**/*.{png,jpg,jpeg,webp,svg,gif}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export function assetUrl(path: string) {
  const key = `../../assets/${path}`;
  const resolved = bundledAssets[key];

  if (resolved) return resolved;

  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return `${base}assets/${path}`;
}
