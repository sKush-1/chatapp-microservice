import {
  loginUser,
  refreshTokens,
  registerUser,
  revokeTokens,
} from '@/controllers/auth.controller.js';
import { loginSchema, refreshSchema, registerSchema, revokeSchema} from '@/vailidation/auth.schema.js';
import { asyncHandler, validateRequest } from '@chatapp/common';

import { Router } from 'express';

export const authRouter: Router = Router();

authRouter.post('/register', validateRequest({ body: registerSchema }), asyncHandler(registerUser));
authRouter.post('/login', validateRequest({ body: loginSchema }), asyncHandler(loginUser));
authRouter.post('/refresh', validateRequest({ body: refreshSchema }), asyncHandler(refreshTokens));
authRouter.post('/revoke', validateRequest({ body: revokeSchema }), asyncHandler(revokeTokens));
