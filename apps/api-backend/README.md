# 🔌 API Backend - Curso Micro Frontends

Backend da aplicação de exemplo do curso de Micro Frontends.

## 📋 Stack

- **Express** 4.18
- **TypeScript** 5.3
- **JWT** para autenticação
- **Zod** para validação
- **bcryptjs** para hash de senhas

## 🚀 Rodando

```bash
pnpm dev
```

O servidor estará disponível em `http://localhost:3001`

## 📖 Endpoints

### Autenticação

#### POST /api/auth/register
Cria um novo usuário.

**Request:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Response:**
```json
{
  "user": {
    "id": "2",
    "name": "João Silva",
    "email": "joao@example.com",
    "createdAt": "2024-01-15T10:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST /api/auth/login
Faz login de um usuário existente.

**Request:**
```json
{
  "email": "demo@example.com",
  "password": "demo123"
}
```

**Response:**
```json
{
  "user": {
    "id": "1",
    "name": "Demo User",
    "email": "demo@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### GET /api/auth/me
Retorna o usuário atual autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": "1",
    "name": "Demo User",
    "email": "demo@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Livros

#### GET /api/books
Lista todos os livros com filtros opcionais.

**Query Parameters:**
- `category` (opcional): Filtrar por categoria (Programming, Fiction, Self-Help, Business, Design, Science)
- `search` (opcional): Buscar no título, autor ou descrição
- `page` (opcional): Número da página (default: 1)
- `limit` (opcional): Itens por página (default: 10)

**Examples:**
```
GET /api/books
GET /api/books?category=Programming
GET /api/books?search=clean
GET /api/books?page=2&limit=20
GET /api/books?category=Fiction&search=gatsby
```

**Response:**
```json
{
  "books": [
    {
      "id": "1",
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "category": "Programming",
      "price": 49.90,
      "coverUrl": "https://picsum.photos/seed/book1/200/300",
      "description": "A Handbook of Agile Software Craftsmanship..."
    }
  ],
  "total": 30,
  "page": 1,
  "limit": 10,
  "totalPages": 3
}
```

#### GET /api/books/:id
Retorna os detalhes de um livro específico.

**Response:**
```json
{
  "book": {
    "id": "1",
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "category": "Programming",
    "price": 49.90,
    "coverUrl": "https://picsum.photos/seed/book1/200/300",
    "description": "A Handbook of Agile Software Craftsmanship..."
  }
}
```

#### GET /api/categories
Lista todas as categorias disponíveis.

**Response:**
```json
{
  "categories": [
    "Business",
    "Design",
    "Fiction",
    "Programming",
    "Science",
    "Self-Help"
  ]
}
```

## 🔐 Usuário Demo

```json
{
  "email": "demo@example.com",
  "password": "demo123"
}
```

## 📦 Dados Mock

O backend usa armazenamento em memória (sem banco de dados) com:

- **1 usuário demo** (pré-cadastrado)
- **30 livros** distribuídos em 6 categorias:
  - Programming (6 livros)
  - Fiction (5 livros)
  - Self-Help (5 livros)
  - Business (5 livros)
  - Design (4 livros)
  - Science (5 livros)

## 🔒 Segurança

- Senhas são hasheadas com **bcryptjs**
- Autenticação via **JWT** com expiração de 7 dias
- Validação de dados com **Zod**
- CORS habilitado para desenvolvimento

## 🛠️ Estrutura

```
api-backend/
├── src/
│   ├── data/
│   │   └── store.ts           # Dados em memória
│   ├── middleware/
│   │   ├── auth.ts            # Middleware de autenticação
│   │   └── validation.ts      # Middleware de validação
│   ├── routes/
│   │   ├── auth.ts            # Rotas de autenticação
│   │   └── books.ts           # Rotas de livros
│   └── index.ts               # Servidor Express
├── package.json
└── tsconfig.json
```

## ⚠️ Avisos

- Este backend é apenas para fins educacionais
- Não usar em produção sem implementar um banco de dados real
- JWT_SECRET deve ser configurado via variável de ambiente em produção
