import { createUser, getAllUsers, getUser, searchUsers } from '@/controllers/user.controller.js';
import { requireAuth } from '@/middleware/require-auth.js';
import { createUserSchema, searchUsersQuerySchema, userIdParamsSchema } from '@/vailidation/user.schema.js';
import { asyncHandler, validateRequest } from '@chatapp/common';
import { Router } from 'express';

export const userRouter: Router = Router();

userRouter.get('/', requireAuth, asyncHandler(getAllUsers));
userRouter.get('/search', requireAuth, validateRequest({ query: searchUsersQuerySchema }), asyncHandler(searchUsers));
userRouter.get('/:id', requireAuth, validateRequest({ params: userIdParamsSchema }), asyncHandler(getUser));
userRouter.post('/', validateRequest({ body: createUserSchema }), asyncHandler(createUser));
