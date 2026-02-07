# 🎯 Curso: Micro Frontends na Prática

Curso completo sobre arquiteturas de Micro Frontends, explorando três abordagens: **Single-spa**, **Module Federation** e **Native Federation**.

## 📚 Estrutura do Curso

### Aula 1: Introdução a Micro Frontends

- Conceitos fundamentais
- Setup do monorepo com Turborepo
- Design System com Tailwind + Framer Motion
- Redux compartilhado (RTK)
- Backend API

### Aula 2: Single-spa

- Configuração do Shell (Root Config)
- MFE de Login com React
- Comunicação via eventos customizados
- Compartilhamento de dependências

### Aula 3: Module Federation

- Webpack Module Federation
- Host e Remote configuration
- Compartilhamento automático de deps
- Error boundaries

### Aula 4: Native Federation

- Vite + Native Federation
- Build otimizado
- Hot Module Replacement
- Comparativo final

## 🏗️ Arquitetura do Monorepo

```
micro-frontends-course/
├── apps/
│   ├── shell-singlespa/          # Container Single-spa
│   ├── shell-mf/                 # Container Module Federation
│   ├── shell-native/             # Container Native Federation
│   ├── mfe-login-singlespa/      # Login com Single-spa
│   ├── mfe-login-mf/             # Login com Module Federation
│   ├── mfe-login-native/         # Login com Native Federation
│   └── api-backend/              # Backend Express
├── packages/
│   ├── ui/                       # Design system (componentes)
│   ├── store/                    # Redux store compartilhada
│   ├── types/                    # TypeScript types compartilhados
│   └── utils/                    # Utilities compartilhadas
└── docs/                         # Documentação (não versionada)
```

## 🚀 Quick Start

### Pré-requisitos

- Node.js >= 18
- pnpm >= 8

### Instalação

```bash
# Instalar dependências
pnpm install

# Rodar backend (sempre necessário)
pnpm dev:aula1
```

### Rodar cada aula

```bash
# Aula 1 - Backend + Setup
pnpm dev:aula1

# Aula 2 - Single-spa
pnpm dev:aula2

# Aula 3 - Module Federation
pnpm dev:aula3

# Aula 4 - Native Federation
pnpm dev:aula4
```

## 📦 Stack Tecnológica

### Geral

- **Monorepo**: Turborepo + pnpm workspaces
- **TypeScript**: 5.3+
- **React**: 18.2+
- **Tailwind CSS**: 3.4+

### Design System

- **Styling**: Tailwind + Class Variance Authority (CVA)
- **Animations**: Framer Motion
- **Components**: Button, Input, Card, Form, Modal, Loading

### State Management

- **Redux Toolkit**: 2.0+
- **Slices**: auth, cart, books

### Backend

- **Express**: 4.18+
- **JWT**: jsonwebtoken 9.0+
- **Validation**: Zod 3.22+

### Micro Frontends

- **Single-spa**: 6.0+
- **Module Federation**: Webpack 5 + @module-federation/enhanced
- **Native Federation**: Vite 5 + @softarc/native-federation

## 🎨 Design System

O design system segue uma estética **Modern & Clean**:

- **Paleta**: Indigo primary + grays foundation
- **Tipografia**: Inter (ou Geist)
- **Animações**: Framer Motion (fade, scale, slide)
- **Componentes**: Totalmente tipados e reutilizáveis

### Exemplo de uso

```tsx
import { Button, Input, Card } from '@repo/ui';

<Button variant='primary' size='md'>
	Login
</Button>;
```

## 🔐 Backend API

### Endpoints disponíveis

**Autenticação**:

- `POST /api/auth/register` - Criar usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Obter usuário atual

**Livros**:

- `GET /api/books` - Listar livros (com filtros)
- `GET /api/books/:id` - Detalhes do livro
- `GET /api/categories` - Listar categorias

### Usuário demo

```json
{
	"email": "demo@example.com",
	"password": "demo123"
}
```

## 🔧 Scripts Úteis

```bash
# Desenvolvimento
pnpm dev                    # Rodar todos os apps
pnpm dev:aula2              # Rodar apenas Aula 2

# Build
pnpm build                  # Build de todos os apps
pnpm build --filter=@repo/ui  # Build apenas do design system

# Qualidade
pnpm lint                   # ESLint
pnpm type-check             # TypeScript check

# Limpeza
pnpm clean                  # Limpar builds e node_modules
```

## 📊 Comparativo das Abordagens

| Característica       | Single-spa   | Module Federation | Native Federation |
| -------------------- | ------------ | ----------------- | ----------------- |
| **Bundler**          | Webpack      | Webpack           | Vite              |
| **Complexidade**     | Alta         | Média             | Baixa             |
| **Build Time**       | Lento        | Médio             | Rápido            |
| **HMR**              | Lento        | Médio             | Muito Rápido      |
| **Runtime Overhead** | Médio        | Baixo             | Muito Baixo       |
| **Compartilhamento** | Manual       | Automático        | Automático        |
| **Uso Recomendado**  | Apps legados | Produção robusta  | Apps modernos     |

## 🤝 Contribuindo

Este é um projeto educacional. Sugestões e melhorias são bem-vindas!

## 📝 Licença

MIT

## 🎓 Créditos

Desenvolvido para o curso de Micro Frontends da Alura.
