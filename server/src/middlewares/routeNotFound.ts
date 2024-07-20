import { NextFunction, Request, Response } from 'express';

export default function routeNotFound(
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const error = new Error(`Route not found`);

  console.error(error);

  return res.status(404).json({ error: error.message });
}
