import z from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_MODE: z.enum(['production', 'development', 'test']).optional(),
});

export const env = envSchema.parse(process.env);
