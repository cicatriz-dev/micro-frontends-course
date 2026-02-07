# 🏗️ Arquitetura - LeiaAqui Micro Frontends

## 📐 Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                        Turborepo Monorepo                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────┐        ┌──────────────────────────────┐  │
│  │   apps/          │        │   packages/ (shared)          │  │
│  ├──────────────────┤        ├──────────────────────────────┤  │
│  │ • api-backend    │        │ • ui (Design System)          │  │
│  │ • web-simple     │◄───────┤ • store (Redux)               │  │
│  │ • shell-*        │        │ • types (TypeScript)          │  │
│  │ • mfe-login-*    │        │ • utils (Helpers)             │  │
│  └──────────────────┘        └──────────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Camadas da Aplicação

### Camada 1: Pacotes Compartilhados (Packages)

#### @repo/types
```
┌─────────────────────┐
│   @repo/types       │
├─────────────────────┤
│ • User              │
│ • Book              │
│ • AuthResponse      │
│ • CartItem          │
│ • FavoritesState    │
└─────────────────────┘
```
**Responsabilidade**: Definições de tipos TypeScript compartilhados entre todas as aplicações.

#### @repo/utils
```
┌─────────────────────┐
│   @repo/utils       │
├─────────────────────┤
│ • api-client.ts     │  ◄─ Fetch wrapper
│ • validators.ts     │  ◄─ Email, password
│ • formatters.ts     │  ◄─ Price, date
│ • cn.ts             │  ◄─ Class names merge
└─────────────────────┘
```
**Responsabilidade**: Funções utilitárias reutilizáveis.

#### @repo/ui (Design System)
```
┌─────────────────────────────────┐
│   @repo/ui (Design System)      │
├─────────────────────────────────┤
│ Components:                      │
│ • Button (CVA variants)          │
│ • Input, Card, Modal             │
│ • Form (react-hook-form)         │
│ • LoadingSpinner                 │
├─────────────────────────────────┤
│ Styling:                         │
│ • Tailwind CSS 3.4               │
│ • Class Variance Authority       │
│ • Framer Motion (animations)     │
├─────────────────────────────────┤
│ Theme:                           │
│ • Primary: Indigo (#6366f1)      │
│ • Grays: 50-950                  │
│ • Font: Inter                    │
└─────────────────────────────────┘
```
**Responsabilidade**: Componentes UI consistentes e reutilizáveis.

#### @repo/store (Redux)
```
┌──────────────────────────────────┐
│   @repo/store (Redux Toolkit)    │
├──────────────────────────────────┤
│ createSharedStore()              │
│   ├─ authSlice                   │
│   │   • user, token              │
│   │   • login, logout            │
│   ├─ booksSlice                  │
│   │   • books, filteredBooks     │
│   │   • search, category filter  │
│   ├─ cartSlice                   │
│   │   • items, total             │
│   │   • addToCart, removeFromCart│
│   └─ favoritesSlice              │
│       • books (prateleira)       │
│       • toggleFavorite           │
└──────────────────────────────────┘
```
**Responsabilidade**: Estado global compartilhado entre MFEs.

---

### Camada 2: Backend API

```
┌────────────────────────────────────────┐
│   api-backend (Express + TypeScript)   │
├────────────────────────────────────────┤
│ Routes:                                 │
│ • /api/auth                             │
│   - POST /register                      │
│   - POST /login                         │
│   - GET /me (protected)                 │
│ • /api/books                            │
│   - GET / (with filters)                │
│   - GET /:id                            │
│ • /api/categories                       │
│   - GET /                               │
├────────────────────────────────────────┤
│ Middleware:                             │
│ • CORS                                  │
│ • JSON parser                           │
│ • JWT auth                              │
│ • Validation (Zod)                      │
├────────────────────────────────────────┤
│ Data:                                   │
│ • In-memory store                       │
│ • 30 livros mock                        │
│ • 6 categorias                          │
└────────────────────────────────────────┘
```

**Porta**: 3001

---

### Camada 3: Aplicações Frontend

#### Aula 1: Web Simple (Monolítica)

```
┌─────────────────────────────────────┐
│   web-simple (Vite + React)         │
├─────────────────────────────────────┤
│ Pages:                               │
│ • Home                               │
│   - Header (auth, favorites)         │
│   - SearchBar + CategoryFilter       │
│   - Books Grid                       │
│   - BookDetailsModal                 │
├─────────────────────────────────────┤
│ Components:                          │
│ • Header                             │
│ • BookCard                           │
│ • BookDetailsModal                   │
│ • SearchBar                          │
│ • CategoryFilter                     │
├─────────────────────────────────────┤
│ Hooks:                               │
│ • useBooks (fetch, filter, search)   │
├─────────────────────────────────────┤
│ State:                               │
│ • Redux Provider (createSharedStore) │
│ • useState (selectedBook)            │
└─────────────────────────────────────┘
```

**Porta**: 3000

---

#### Aula 2: Single-spa

```
┌───────────────────────────────────────────────────┐
│   shell-singlespa (Root Config)                   │
│   ├─ Import Maps                                  │
│   ├─ Layout (header, nav)                         │
│   └─ Route Config                                 │
└───────────────────────────────────────────────────┘
         │
         ├─────────────────────┬─────────────────────┐
         │                     │                     │
         ▼                     ▼                     ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ mfe-login       │  │ mfe-catalog     │  │ mfe-checkout    │
│ (Single-spa)    │  │ (Single-spa)    │  │ (Single-spa)    │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│ • LoginForm     │  │ • BookList      │  │ • Cart          │
│ • RegisterForm  │  │ • BookDetails   │  │ • Payment       │
│ • Uses @repo/ui │  │ • Favorites     │  │ • Confirmation  │
│ • Uses @repo/   │  │ • Uses @repo/   │  │ • Uses @repo/   │
│   store         │  │   store         │  │   store         │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

**Comunicação**: Custom Events (auth:login, cart:update)

---

#### Aula 3: Module Federation

```
┌───────────────────────────────────────────────────┐
│   shell-mf (Webpack 5 Host)                       │
│   ├─ ModuleFederationPlugin                       │
│   ├─ Remotes: [login, catalog, checkout]          │
│   └─ Shared: [react, redux, @repo/*]              │
└───────────────────────────────────────────────────┘
         │
         ├─────────────────────┬─────────────────────┐
         │                     │                     │
         ▼                     ▼                     ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ mfe-login-mf    │  │ mfe-catalog-mf  │  │ mfe-checkout-mf │
│ (Remote)        │  │ (Remote)        │  │ (Remote)        │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│ Exposes:        │  │ Exposes:        │  │ Exposes:        │
│ • ./Login       │  │ • ./Catalog     │  │ • ./Checkout    │
│ • ./Register    │  │ • ./BookDetails │  │ • ./Cart        │
│                 │  │ • ./Favorites   │  │ • ./Payment     │
│ Shared:         │  │ Shared:         │  │ Shared:         │
│ • react (sing.) │  │ • react (sing.) │  │ • react (sing.) │
│ • @repo/store   │  │ • @repo/store   │  │ • @repo/store   │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

**Comunicação**: Redux Shared + Props

---

#### Aula 4: Native Federation

```
┌───────────────────────────────────────────────────┐
│   shell-native (Vite Host)                        │
│   ├─ @softarc/native-federation                   │
│   ├─ Remotes: [login, catalog, checkout]          │
│   └─ Shared: [react, @repo/*]                     │
└───────────────────────────────────────────────────┘
         │
         ├─────────────────────┬─────────────────────┐
         │                     │                     │
         ▼                     ▼                     ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ mfe-login-native│  │ mfe-catalog-nat │  │ mfe-checkout-nat│
│ (Vite Remote)   │  │ (Vite Remote)   │  │ (Vite Remote)   │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│ Exposes:        │  │ Exposes:        │  │ Exposes:        │
│ • ./Login       │  │ • ./Catalog     │  │ • ./Checkout    │
│                 │  │                 │  │                 │
│ Fast Refresh ⚡  │  │ Fast Refresh ⚡  │  │ Fast Refresh ⚡  │
│ HMR < 50ms      │  │ HMR < 50ms      │  │ HMR < 50ms      │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

**Comunicação**: Redux Shared + Fast Refresh

---

## 🔄 Fluxo de Dados

### 1. Autenticação

```
┌─────────┐    POST /login    ┌─────────┐
│  MFE    │──────────────────►│   API   │
│ Login   │                    │ Backend │
└─────────┘                    └─────────┘
     │                              │
     │    ◄─ { user, token }        │
     │                              │
     ▼                              ▼
┌──────────────────────────────────────┐
│  Redux Store (authSlice)             │
│  • user: { id, name, email }         │
│  • token: "jwt..."                   │
│  • isAuthenticated: true             │
└──────────────────────────────────────┘
     │
     │ (dispatch event ou props)
     │
     ▼
┌─────────────────────────────────────┐
│  Shell / Other MFEs                 │
│  • Update header UI                 │
│  • Enable protected routes          │
│  • Store token in localStorage      │
└─────────────────────────────────────┘
```

### 2. Listagem de Livros

```
┌─────────┐    GET /books    ┌─────────┐
│  Home   │─────────────────►│   API   │
│  Page   │  ?category=prog   │ Backend │
└─────────┘  &search=code    └─────────┘
     │                              │
     │    ◄─ { books: [...] }       │
     │                              │
     ▼                              ▼
┌──────────────────────────────────────┐
│  Redux Store (booksSlice)            │
│  • books: [...]                      │
│  • filteredBooks: filter(books)      │
│  • selectedCategory: "Programação"   │
│  • searchQuery: "code"               │
└──────────────────────────────────────┘
     │
     │ (useSelector)
     │
     ▼
┌─────────────────────────────────────┐
│  React Component                    │
│  • Map filteredBooks                │
│  • Render BookCard for each         │
└─────────────────────────────────────┘
```

### 3. Favoritos (Prateleira)

```
┌──────────┐   Click ❤️   ┌─────────────────────┐
│ BookCard │─────────────►│ toggleFavorite()    │
└──────────┘              └─────────────────────┘
                                   │
                                   ▼
                          ┌─────────────────────┐
                          │ Redux favoritesSlice│
                          │ • add/remove book   │
                          └─────────────────────┘
                                   │
                                   ├──────────┬───────────┐
                                   ▼          ▼           ▼
                          ┌─────────┐  ┌─────────┐  ┌─────────┐
                          │ Header  │  │BookCard │  │ Modal   │
                          │ Counter │  │ Icon ❤️  │  │ Button  │
                          └─────────┘  └─────────┘  └─────────┘
```

---

## 🔐 Segurança

### JWT Flow

```
1. Login
   ┌─────┐         ┌─────┐
   │User │───────►│ API  │
   └─────┘  creds  └─────┘
                      │
                      ├─ Validate password (bcrypt)
                      ├─ Generate JWT token
                      └─ Return { user, token }

2. Protected Routes
   ┌─────┐         ┌─────┐
   │ MFE │───────►│ API  │
   └─────┘  token  └─────┘
    Bearer         │
                   ├─ Verify JWT
                   ├─ Decode userId
                   └─ Return protected data
```

---

## 📊 Comparativo de Abordagens

### Build Time
```
Single-spa:     ████████░░ 80s  (Webpack)
Module Fed:     ██████████ 90s  (Webpack 5)
Native Fed:     ███░░░░░░░ 25s  (Vite) ⚡
```

### Bundle Size (gzipped)
```
Single-spa:     ████████░░ 250KB
Module Fed:     ██████░░░░ 200KB (shared deps)
Native Fed:     █████░░░░░ 180KB (tree-shaking) 🎯
```

### HMR Speed
```
Single-spa:     ████████░░ 2000ms
Module Fed:     ██████░░░░ 1500ms
Native Fed:     ██░░░░░░░░  50ms ⚡⚡⚡
```

### Developer Experience
```
Single-spa:     ████████░░ Médio (setup complexo)
Module Fed:     ██████████ Bom (Webpack familiar)
Native Fed:     ██████████ Excelente (Vite DX) 🎯
```

---

## 🚀 Decisões Arquiteturais

### Por que Turborepo?
- ✅ Cache inteligente de builds
- ✅ Execução paralela de tarefas
- ✅ Dependency graph automático
- ✅ Melhor que Lerna/Nx para nosso caso

### Por que pnpm?
- ✅ Workspaces nativos
- ✅ Eficiência de espaço (hard links)
- ✅ Mais rápido que npm/yarn
- ✅ Strict por padrão

### Por que Redux Toolkit?
- ✅ State compartilhado entre MFEs
- ✅ DevTools excelente
- ✅ Imutabilidade com Immer
- ✅ Padrão de mercado

### Por que Tailwind CSS?
- ✅ Utility-first approach
- ✅ JIT compiler (fast)
- ✅ Tree-shaking automático
- ✅ Design tokens consistentes

---

## 📦 Deployment Strategy

### Independente por MFE

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   CDN/S3     │     │   CDN/S3     │     │   CDN/S3     │
│  Shell v1.2  │     │  Login v2.1  │     │ Catalog v1.5 │
└──────────────┘     └──────────────┘     └──────────────┘
      │                    │                     │
      └────────────────────┴─────────────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   Runtime    │
                    │ Integration  │
                    └──────────────┘
```

**Vantagens**:
- Deploy independente
- Rollback por MFE
- Versioning granular
- CI/CD paralelo

---

## 🎯 Próximos Passos na Arquitetura

### Fase 2 (Aulas 2-4)
- [ ] Implementar Shell Single-spa
- [ ] Implementar MFE Login Single-spa
- [ ] Implementar Shell Module Federation
- [ ] Implementar MFE Login Module Federation
- [ ] Implementar Shell Native Federation
- [ ] Implementar MFE Login Native Federation

### Fase 3 (Opcional/Avançado)
- [ ] Error Boundaries globais
- [ ] Monitoring (Sentry)
- [ ] Analytics cross-MFE
- [ ] A/B testing framework
- [ ] Feature flags

---

**Última atualização**: 07/02/2026
