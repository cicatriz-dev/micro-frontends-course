# 🚀 Setup e Instalação

## Pré-requisitos

- **Node.js**: >= 18.0.0 (LTS recomendado)
- **pnpm**: >= 8.0.0

### Instalar pnpm (se não tiver)

```bash
npm install -g pnpm@latest
```

## Instalação

1. Clone o repositório (ou navegue até a pasta):
```bash
cd micro-frontends-course
```

2. Instale as dependências:
```bash
pnpm install
```

3. Build dos pacotes compartilhados:
```bash
pnpm build
```

## Testando o Backend (PRÉ-REQUISITO)

O backend deve SEMPRE estar rodando antes de iniciar qualquer MFE.

### Iniciar o backend

```bash
# Opção 1: Usando o script da Aula 1
pnpm dev:aula1

# Opção 2: Rodando diretamente
cd apps/api-backend
pnpm dev
```

O backend estará disponível em `http://localhost:3001`

### Testar os endpoints

#### 1. Health check
```bash
curl http://localhost:3001/api/health
```

Resposta esperada:
```json
{"status":"ok","message":"API is running"}
```

#### 2. Login com usuário demo
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"demo123"}'
```

Resposta esperada (você receberá um token):
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

#### 3. Buscar livros
```bash
curl http://localhost:3001/api/books
```

#### 4. Filtrar livros por categoria
```bash
curl "http://localhost:3001/api/books?category=Programming"
```

#### 5. Buscar livros
```bash
curl "http://localhost:3001/api/books?search=clean"
```

#### 6. Listar categorias
```bash
curl http://localhost:3001/api/categories
```

### Usuário de teste

```
Email: demo@example.com
Senha: demo123
```

## Próximos Passos

Após confirmar que o backend está funcionando:

### Aula 1 - Fundação
- ✅ Backend rodando
- ✅ Packages compartilhados (`types`, `utils`, `ui`, `store`)
- Próximo: Implementar demonstrações do Design System

### Aula 2 - Single-spa
- Criar `apps/shell-singlespa`
- Criar `apps/mfe-login-singlespa`

### Aula 3 - Module Federation
- Criar `apps/shell-mf`
- Criar `apps/mfe-login-mf`

### Aula 4 - Native Federation
- Criar `apps/shell-native`
- Criar `apps/mfe-login-native`

## Scripts Úteis

```bash
# Rodar todos os projetos
pnpm dev

# Rodar apenas Aula 1 (backend)
pnpm dev:aula1

# Rodar apenas Aula 2 (Single-spa)
pnpm dev:aula2

# Rodar apenas Aula 3 (Module Federation)
pnpm dev:aula3

# Rodar apenas Aula 4 (Native Federation)
pnpm dev:aula4

# Build de todos os projetos
pnpm build

# Type check
pnpm type-check

# Lint
pnpm lint

# Limpar tudo
pnpm clean
```

## Estrutura do Projeto

```
micro-frontends-course/
├── apps/
│   └── api-backend/          ✅ Implementado
├── packages/
│   ├── types/                ✅ Implementado
│   ├── utils/                ✅ Implementado
│   ├── ui/                   ✅ Implementado
│   └── store/                ✅ Implementado
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## Troubleshooting

### Erro: "Cannot find module"
```bash
# Rebuild dos packages
pnpm build
```

### Erro: "Port 3001 already in use"
```bash
# Matar o processo na porta 3001
lsof -ti:3001 | xargs kill -9
```

### Erro: "pnpm: command not found"
```bash
# Instalar pnpm globalmente
npm install -g pnpm@latest
```

### Limpar cache e reinstalar
```bash
pnpm clean
rm -rf node_modules
pnpm install
pnpm build
```

## Verificação Final

Checklist para confirmar que tudo está funcionando:

- [ ] `pnpm install` executou sem erros
- [ ] `pnpm build` executou sem erros
- [ ] Backend iniciou em `http://localhost:3001`
- [ ] Endpoint `/api/health` retorna `{"status":"ok"}`
- [ ] Login com `demo@example.com` / `demo123` retorna token
- [ ] Endpoint `/api/books` retorna lista de livros
- [ ] Endpoint `/api/categories` retorna categorias

Se todos os itens acima estiverem ✅, você está pronto para continuar!
