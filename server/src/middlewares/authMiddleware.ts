import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import { decode, JwtPayload, verify } from 'jsonwebtoken';

const { JWT_SECRET } = process.env as { JWT_SECRET: string };

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const token = authorization.split(' ')[1] || authorization;
    verify(token, JWT_SECRET);
    const { username } = decode(token) as JwtPayload;
    req.body.username = username;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
