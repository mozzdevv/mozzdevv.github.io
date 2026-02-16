import { defineCollection, z } from "astro:content";

const components = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tagline: z.string().optional(),
    category: z.enum([
      "form",
      "layout",
      "navigation",
      "feedback",
      "disclosure",
      "display",
    ]),
    status: z.enum(["stable", "beta", "experimental"]).default("stable"),
    order: z.number().optional(),
  }),
});

const docs = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tagline: z.string().optional(),
    order: z.number().optional(),
  }),
});

const legal = defineCollection({
  schema: z.object({
    page: z.string(),
    pubDate: z.date(),
  }),
});

export const collections = {
  components,
  docs,
  legal,
};
