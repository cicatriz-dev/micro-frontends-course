# 📡 Documentação da API - LeiaAqui

## 🌐 Base URL

```
http://localhost:3001
```

---

## 🔐 Autenticação

### POST `/api/auth/register`

Registra um novo usuário.

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "2",
    "name": "João Silva",
    "email": "joao@example.com",
    "createdAt": "2026-02-07T12:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Erros:**
- `400`: Email já cadastrado
- `400`: Dados inválidos

---

### POST `/api/auth/login`

Realiza login de um usuário existente.

**Body:**
```json
{
  "email": "demo@example.com",
  "password": "demo123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "1",
    "name": "Usuário Demo",
    "email": "demo@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Erros:**
- `401`: Credenciais inválidas
- `400`: Dados inválidos

---

### GET `/api/auth/me`

Retorna informações do usuário autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "id": "1",
    "name": "Usuário Demo",
    "email": "demo@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Erros:**
- `401`: Token inválido ou ausente

---

## 📚 Livros

### GET `/api/books`

Retorna lista de livros com filtros opcionais.

**Query Parameters:**
- `category` (string, opcional): Filtra por categoria
- `search` (string, opcional): Busca por título, autor ou descrição
- `limit` (number, opcional): Limite de resultados (padrão: 100)

**Exemplos:**
```
GET /api/books
GET /api/books?category=Programação
GET /api/books?search=clean
GET /api/books?category=Ficção&limit=10
```

**Response (200):**
```json
{
  "books": [
    {
      "id": "1",
      "title": "Código Limpo",
      "author": "Robert C. Martin",
      "category": "Programação",
      "price": 49.9,
      "coverUrl": "https://picsum.photos/seed/book1/200/300",
      "description": "Habilidades Práticas do Agile Software. Aprenda a escrever código limpo e sustentável."
    }
  ],
  "total": 30,
  "filtered": 1
}
```

---

### GET `/api/books/:id`

Retorna detalhes de um livro específico.

**Parameters:**
- `id` (string): ID do livro

**Exemplo:**
```
GET /api/books/1
```

**Response (200):**
```json
{
  "book": {
    "id": "1",
    "title": "Código Limpo",
    "author": "Robert C. Martin",
    "category": "Programação",
    "price": 49.9,
    "coverUrl": "https://picsum.photos/seed/book1/200/300",
    "description": "Habilidades Práticas do Agile Software. Aprenda a escrever código limpo e sustentável."
  }
}
```

**Erros:**
- `404`: Livro não encontrado

---

### GET `/api/categories`

Retorna lista de categorias disponíveis.

**Response (200):**
```json
{
  "categories": [
    "Autoajuda",
    "Ciência",
    "Design",
    "Ficção",
    "Negócios",
    "Programação"
  ]
}
```

---

## ❤️ Health Check

### GET `/api/health`

Verifica status da API.

**Response (200):**
```json
{
  "status": "ok",
  "message": "API is running"
}
```

---

## 📊 Modelos de Dados

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

interface UserWithPassword extends User {
  password: string; // bcrypt hash
}
```

### Book
```typescript
interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  coverUrl: string;
  description: string;
}
```

### AuthResponse
```typescript
interface AuthResponse {
  user: User;
  token: string;
}
```

---

## 🔒 Segurança

### JWT Token

Tokens JWT são gerados no login/registro e devem ser incluídos no header `Authorization` para rotas protegidas.

**Formato:**
```
Authorization: Bearer <token>
```

**Expiração:** 7 dias

### Password Hashing

Senhas são hasheadas com bcryptjs (salt rounds: 10) antes de serem armazenadas.

### CORS

CORS está habilitado para todas as origens em desenvolvimento. Em produção, configure apenas origens permitidas.

---

## 📦 Dados Mock

### Usuário Demo
```
Email: demo@example.com
Senha: demo123
```

### Livros (30 no total)

**Categorias:**
- Programação (6 livros)
- Ficção (5 livros)
- Autoajuda (5 livros)
- Negócios (5 livros)
- Design (4 livros)
- Ciência (5 livros)

**Exemplos:**
- Código Limpo - R$ 49,90
- 1984 - R$ 34,90
- Hábitos Atômicos - R$ 44,90
- De Zero a Um - R$ 47,90
- O Design do Dia a Dia - R$ 44,90
- Sapiens - R$ 49,90

---

## 🧪 Testando a API

### Thunder Client (VS Code)

1. Instale a extensão Thunder Client
2. Importe a coleção em `/docs/thunder-client/`
3. Configure a variável `{{baseUrl}}` para `http://localhost:3001`

### cURL Examples

**Health Check:**
```bash
curl http://localhost:3001/api/health
```

**Login:**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"demo123"}'
```

**Listar Livros:**
```bash
curl http://localhost:3001/api/books
```

**Listar Categorias:**
```bash
curl http://localhost:3001/api/categories
```

**Buscar Livros:**
```bash
curl "http://localhost:3001/api/books?search=código&category=Programação"
```

---

## 🐛 Tratamento de Erros

Todas as respostas de erro seguem o formato:

```json
{
  "message": "Descrição do erro"
}
```

**Status Codes:**
- `200`: Sucesso
- `201`: Criado com sucesso
- `400`: Requisição inválida
- `401`: Não autenticado
- `404`: Recurso não encontrado
- `500`: Erro interno do servidor

---

## 🚀 Executando o Backend

```bash
# Instalar dependências
pnpm install

# Desenvolvimento (com hot reload)
pnpm run dev --filter=api-backend

# Produção
pnpm run build --filter=api-backend
pnpm run start --filter=api-backend
```

**Porta padrão:** 3001

---

## 📝 Notas Importantes

1. **Dados em Memória**: Todos os dados são armazenados em memória. Reiniciar o servidor reseta os dados.
2. **Sem Banco de Dados**: Este é um projeto educacional. Em produção, use um banco de dados real.
3. **Validação**: Zod é usado para validar inputs. Erros de validação retornam mensagens descritivas.
4. **CORS**: Configurado para aceitar qualquer origem em desenvolvimento.
5. **Logs**: Todas as requisições são logadas no console para facilitar debugging.

---

**Última atualização**: 07/02/2026
