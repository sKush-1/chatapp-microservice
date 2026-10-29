import { requireAuth } from '@/middleware/require-auth.js';

import { Router } from 'express';
import { validateRequest } from '@chatapp/common';
import { conversationIdParamsSchema, createConversationBodySchema, listConversationsQuerySchema } from '@/vailidation/conversation.schema.js';
import { createConversationHandler, createMessageHandler, getConversationHandler, listConversationsHandler, listMessagesHandler } from '@/controllers/conversation.controller.js';
import { createMessageBodySchema, listMessagesQuerySchema } from '@/vailidation/message.schema.js';


export const conversationRouter: Router = Router();

conversationRouter.use(requireAuth);

conversationRouter.post(
  '/',
  validateRequest({ body: createConversationBodySchema }),
  createConversationHandler,
);

conversationRouter.get(
  '/',
  validateRequest({ query: listConversationsQuerySchema }),
  listConversationsHandler,
);

conversationRouter.get(
  '/:id',
  validateRequest({ params: conversationIdParamsSchema }),
  getConversationHandler,
);

conversationRouter.post(
  '/:id/messages',
  validateRequest({ params: conversationIdParamsSchema, body: createMessageBodySchema }),
  createMessageHandler,
);

conversationRouter.get(
  '/:id/messages',
  validateRequest({ params: conversationIdParamsSchema, query: listMessagesQuerySchema }),
  listMessagesHandler,
);
