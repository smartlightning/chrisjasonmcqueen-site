import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    category: z.enum(['Faith', 'Discipline', 'Identity', 'Discipleship', 'Behind the Scenes']).default('Faith'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
