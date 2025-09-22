// /src/content/config.ts
import { z, defineCollection } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string().min(10),
    tags: z.array(z.string()).default([]),
    href: z.string().url().optional()
  })
});

const publications = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    venue: z.string().optional(),
    year: z.number().int().optional(),
    url: z.string().url().optional(),
    doi: z.string().optional()
  })
});

export const collections = { projects, publications };
