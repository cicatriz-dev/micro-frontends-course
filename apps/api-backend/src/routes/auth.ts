import { Router, type Request, type Response, type Router as RouterType } from 'express';
import bcrypt from 'bcryptjs';
import type { LoginCredentials, RegisterData, User } from '@repo/types';
import { getUserByEmail, getUserById, createUser } from '../data/store.js';
import { generateToken, authMiddleware, type AuthRequest } from '../middleware/auth.js';
import { validate, loginSchema, registerSchema } from '../middleware/validation.js';

const router: RouterType = Router();

// ============================================
// POST /api/auth/register
// ============================================

router.post(
  '/register',
  validate(registerSchema),
  (req: Request, res: Response): void => {
    try {
      const { name, email, password } = req.body as RegisterData;

      // Check if user already exists
      const existingUser = getUserByEmail(email);
      if (existingUser) {
        res.status(400).json({ message: 'Email já cadastrado' });
        return;
      }

      // Create new user
      const newUser = createUser(name, email, password);

      // Generate token
      const token = generateToken(newUser.id);

      // Return user without password
      const userResponse: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
      };

      res.status(201).json({
        user: userResponse,
        token,
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  }
);

// ============================================
// POST /api/auth/login
// ============================================

router.post(
  '/login',
  validate(loginSchema),
  (req: Request, res: Response): void => {
    try {
      const { email, password } = req.body as LoginCredentials;

      // Find user
      const user = getUserByEmail(email);
      if (!user) {
        res.status(401).json({ message: 'Credenciais inválidas' });
        return;
      }

      // Check password
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Credenciais inválidas' });
        return;
      }

      // Generate token
      const token = generateToken(user.id);

      // Return user without password
      const userResponse: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      };

      res.json({
        user: userResponse,
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Erro ao fazer login' });
    }
  }
);

// ============================================
// GET /api/auth/me
// ============================================

router.get('/me', authMiddleware, (req: AuthRequest, res: Response): void => {
  try {
    const user = getUserById(req.userId!);

    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }

    // Return user without password
    const userResponse: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };

    res.json({ user: userResponse });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Erro ao buscar usuário' });
  }
});

export default router;
