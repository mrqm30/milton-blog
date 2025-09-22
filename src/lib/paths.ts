// /src/lib/paths.ts
export const withBase = (p: string = '') => {
  const base = (import.meta.env.BASE_URL || '/');
  const baseNoSlash = base.endsWith('/') ? base.slice(0, -1) : base; // "/milton-blog"
  if (!p) return baseNoSlash; // home -> "/milton-blog"
  return `${baseNoSlash}/${p.replace(/^\//, '')}`; // "/milton-blog/xxx"
};

// Igualador que ignora "/" final
export const samePath = (a: string, b: string) =>
  a.replace(/\/+$/, '') === b.replace(/\/+$/, '');

