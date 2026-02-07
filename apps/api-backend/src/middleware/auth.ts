import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// ============================================
// JWT Secret (in production, use env var)
// ============================================

export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// ============================================
// Extended Request Interface
// ============================================

export interface AuthRequest extends Request {
  userId?: string;
}

// ============================================
// Auth Middleware
// ============================================

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: 'Token não fornecido' });
      return;
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      res.status(401).json({ message: 'Token mal formatado' });
      return;
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      res.status(401).json({ message: 'Token mal formatado' });
      return;
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Token inválido' });
        return;
      }

      req.userId = (decoded as { userId: string }).userId;
      next();
    });
  } catch (error) {
    res.status(401).json({ message: 'Erro na autenticação' });
  }
}

// ============================================
// Generate JWT Token
// ============================================

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '7d',
  });
}
