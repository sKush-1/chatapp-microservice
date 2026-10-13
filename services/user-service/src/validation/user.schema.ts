import { z } from '@chatapp/common';

export const userIdParamsSchema = z.object({
  id: z.string().uuid(),
});

export type UserIdParams = z.infer<typeof userIdParamsSchema>;

export const createUserBodySchema = z.object({
  email: z.string().email(),
  displayName: z.string().min(1).max(50),
});

export type CreateUserBody = z.infer<typeof createUserBodySchema>;

export const searchUsersQuerySchema = z.object({
  query: z.string().default(''),
  limit: z.coerce.number().int().positive().optional(),
  exclude: z.array(z.string().uuid()).optional(),
});

export type SearchUsersQuery = z.infer<typeof searchUsersQuerySchema>;
