import { Router, type Request, type Response, type Router as RouterType } from 'express';
import type { BooksQuery } from '@repo/types';
import {
  getAllBooks,
  getBookById,
  getBooksByCategory,
  searchBooks,
  getCategories,
} from '../data/store.js';

const router: RouterType = Router();

// ============================================
// GET /api/books
// ============================================

router.get('/', (req: Request, res: Response): void => {
  try {
    const { category, search, page = '1', limit = '10' } = req.query as {
      category?: string;
      search?: string;
      page?: string;
      limit?: string;
    };

    let books = getAllBooks();

    // Filter by category
    if (category) {
      books = getBooksByCategory(category);
    }

    // Search
    if (search) {
      books = searchBooks(search);
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;

    const paginatedBooks = books.slice(startIndex, endIndex);

    res.json({
      books: paginatedBooks,
      total: books.length,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(books.length / limitNum),
    });
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ message: 'Erro ao buscar livros' });
  }
});

// ============================================
// GET /api/books/:id
// ============================================

router.get('/:id', (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const book = getBookById(id);

    if (!book) {
      res.status(404).json({ message: 'Livro não encontrado' });
      return;
    }

    res.json({ book });
  } catch (error) {
    console.error('Get book error:', error);
    res.status(500).json({ message: 'Erro ao buscar livro' });
  }
});

// ============================================
// GET /api/categories
// ============================================

router.get('/categories', (req: Request, res: Response): void => {
  try {
    const categories = getCategories();
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Erro ao buscar categorias' });
  }
});

export default router;
