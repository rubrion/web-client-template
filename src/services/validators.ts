import { z } from 'zod';

/**
 * Base schema for entities with timestamps
 */
export const HasTimestamps = z.object({
  createdAt: z.string().or(z.date()).optional(),
  updatedAt: z.string().or(z.date()).optional(),
});

/**
 * Schema for project references
 */
export const ProjectReferenceSchema = z.object({
  title: z.string(),
  url: z.string(),
  type: z.enum(['article', 'link']),
});

/**
 * Type for project references
 */
export type ProjectReference = z.infer<typeof ProjectReferenceSchema>;

/**
 * Schema for blog post entities
 */
export const BlogPostSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    summary: z.string(),
    content: z.string(), // Required in mock data
    date: z.string().optional(),
    author: z.string().optional(),
    categories: z.array(z.string()).optional(),
    image: z.string().optional(),
    category: z.string().optional(),
  })
  .merge(HasTimestamps);

/**
 * Schema for project entities
 */
export const ProjectSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    content: z.string(), // Required in mock data
    image: z.string().optional(),
    category: z.string().optional(),
    date: z.string().optional(),
    technologies: z.array(z.string()).optional(),
    github: z.string().optional(),
    website: z.string().optional(),
    references: z.array(ProjectReferenceSchema).optional(),
  })
  .merge(HasTimestamps);

/**
 * Type for blog posts parsed from the schema
 */
export type BlogPost = z.infer<typeof BlogPostSchema>;

/**
 * Type for projects parsed from the schema
 */
export type Project = z.infer<typeof ProjectSchema>;
