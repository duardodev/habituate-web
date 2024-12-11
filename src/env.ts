import z from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url().optional(),
  MODE: z.enum(['production', 'development', 'test']),
});

export const env = envSchema.parse(process.env);
