import { logger } from "@/utils/logger.js";
import { HttpError } from "@chatapp/common";
import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const error = err instanceof HttpError ? err : undefined;
  const statusCode = error?.statusCode ?? 500;
  const message = statusCode >= 500 ? "Internal Server Error" : error?.message ?? "Unknown Error";
  const payload = error?.details ? { message, details: error.details } : { message };

  if (statusCode >= 500) {
    logger.error({ err }, "Unhandled server error");
  } else {
    logger.warn({ err }, "Client error");
  }

  res.status(statusCode).json(payload);
};
