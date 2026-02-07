# 📚 Web Simple - Livraria Online

App React simples (sem Micro Frontends) para demonstrar a página inicial com listagem de livros e busca funcional.

## 🎯 Objetivo

Este é um app monolítico criado para:
- Testar o Design System (`@repo/ui`)
- Demonstrar a integração com o backend
- Mostrar a funcionalidade completa antes de implementar as versões com Micro Frontends

## 🚀 Como Rodar

### Opção 1: Rodar backend + frontend juntos
```bash
# Na raiz do projeto
pnpm dev:simple
```

### Opção 2: Rodar separadamente
```bash
# Terminal 1: Backend
pnpm dev:aula1

# Terminal 2: Frontend
cd apps/web-simple
pnpm dev
```

## 📍 URLs

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001

## ✨ Funcionalidades

- ✅ Grid de cards de livros com imagens
- ✅ Busca em tempo real (título, autor, descrição)
- ✅ Filtros por categoria
- ✅ Contador de resultados
- ✅ Design responsivo

## 🎨 Design

Segue o tema **Modern & Clean** do Design System:
- Paleta: Indigo primary (#6366f1)
- Tipografia: Inter font
- Responsive grid

## 📦 Stack

- React 18.2 + TypeScript
- Vite 5.0
- Tailwind CSS 3.4
- Redux Toolkit 2.0
