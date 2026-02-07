import express, { type Request, type Response, type Express } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import booksRoutes from './routes/books.js';
import { getCategories } from './data/store.js';

// ============================================
// Create Express App
// ============================================

const app: Express = express();
const PORT = process.env.PORT || 3001;

// ============================================
// Middleware
// ============================================

app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req: Request, res: Response, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ============================================
// Routes
// ============================================

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);

// Categories endpoint
app.get('/api/categories', (req: Request, res: Response) => {
  const categories = getCategories();
  res.json({ categories });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Endpoint não encontrado' });
});

// ============================================
// Start Server
// ============================================

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║                                                        ║
║   🚀 API Backend - Curso Micro Frontends             ║
║                                                        ║
║   Server running at: http://localhost:${PORT}        ║
║                                                        ║
║   Endpoints:                                          ║
║   • GET  /api/health                                  ║
║   • POST /api/auth/register                           ║
║   • POST /api/auth/login                              ║
║   • GET  /api/auth/me                                 ║
║   • GET  /api/books                                   ║
║   • GET  /api/books/:id                               ║
║   • GET  /api/categories                              ║
║                                                        ║
║   Demo User:                                          ║
║   • Email: demo@example.com                           ║
║   • Password: demo123                                 ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
  `);
});

export default app;
