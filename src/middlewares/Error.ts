import type { NextFunction, Response, Request } from "express";
import type { ErroApi } from "../typeErrors/error-api";

export const errorMiddleware = (
  error: Error & Partial<ErroApi>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : "Erro inesperado!";
  return res.status(statusCode).json({ message });
};