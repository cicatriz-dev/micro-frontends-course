# 🎨 Design System - LeiaAqui

## 📐 Princípios de Design

### Modern & Clean
- **Simplicidade**: Interfaces limpas e objetivas
- **Consistência**: Padrões visuais repetíveis
- **Acessibilidade**: WCAG AA compliance
- **Performance**: Componentes otimizados

### Filosofia
> "Design is not just what it looks like. Design is how it works." - Steve Jobs

Nosso design system prioriza:
1. 📱 **Responsividade** - Mobile-first
2. ⚡ **Performance** - Fast interactions
3. ♿ **Acessibilidade** - Inclusivo por padrão
4. 🎯 **Usabilidade** - Intuitivo e eficiente

---

## 🎨 Fundamentos Visuais

### Paleta de Cores

#### Primary (Indigo)
```css
--primary-50:  #eef2ff  /* Backgrounds leves */
--primary-100: #e0e7ff  /* Hover states */
--primary-200: #c7d2fe
--primary-300: #a5b4fc
--primary-400: #818cf8
--primary-500: #6366f1  /* ⭐ Main color */
--primary-600: #4f46e5  /* Hover principal */
--primary-700: #4338ca  /* Active state */
--primary-800: #3730a3
--primary-900: #312e81  /* Text on light bg */
```

**Uso:**
- Buttons primários
- Links
- Badges/tags
- Focus states
- Ícones de ação

#### Grays (Neutrals)
```css
--gray-50:  #f9fafb  /* Backgrounds */
--gray-100: #f3f4f6  /* Hover backgrounds */
--gray-200: #e5e7eb  /* Borders */
--gray-300: #d1d5db  /* Dividers */
--gray-400: #9ca3af  /* Disabled text */
--gray-500: #6b7280  /* Placeholders */
--gray-600: #4b5563  /* Secondary text */
--gray-700: #374151  /* Body text */
--gray-800: #1f2937  /* Headings */
--gray-900: #111827  /* Primary text */
--gray-950: #030712  /* Max contrast */
```

#### Semantic Colors
```css
/* Success */
--success-DEFAULT: #10b981  /* Green */
--success-light:   #d1fae5  /* Background */

/* Error */
--error-DEFAULT: #ef4444  /* Red */
--error-light:   #fee2e2  /* Background */

/* Warning */
--warning-DEFAULT: #f59e0b  /* Amber */
--warning-light:   #fef3c7  /* Background */

/* Info */
--info-DEFAULT: #3b82f6  /* Blue */
--info-light:   #dbeafe  /* Background */
```

---

### Tipografia

#### Font Family
```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

**Alternativa**: 'Geist Sans' (mais moderno)

**Carregamento:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

#### Scale
```css
/* Display */
.text-4xl  /* 2.25rem (36px) - Headings principais */
.text-3xl  /* 1.875rem (30px) - Subheadings */
.text-2xl  /* 1.5rem (24px) - Section titles */

/* Body */
.text-xl   /* 1.25rem (20px) - Large text */
.text-lg   /* 1.125rem (18px) - Emphasis */
.text-base /* 1rem (16px) - Body text ⭐ */
.text-sm   /* 0.875rem (14px) - Small text */
.text-xs   /* 0.75rem (12px) - Captions */
```

#### Weights
```css
.font-normal    /* 400 - Body text */
.font-medium    /* 500 - Emphasis */
.font-semibold  /* 600 - Subheadings */
.font-bold      /* 700 - Headings */
```

#### Line Heights
```css
.leading-tight   /* 1.25 - Headings */
.leading-snug    /* 1.375 - Compact text */
.leading-normal  /* 1.5 - Body text ⭐ */
.leading-relaxed /* 1.625 - Comfortable reading */
```

---

### Espaçamento

#### Scale (4px base)
```css
0   → 0px
1   → 4px
2   → 8px
3   → 12px
4   → 16px    ⭐ Base unit
5   → 20px
6   → 24px
8   → 32px
10  → 40px
12  → 48px
16  → 64px
20  → 80px
24  → 96px
```

#### Uso Recomendado
```css
/* Componentes internos */
.p-4  .px-4  .py-4  /* 16px padding */

/* Entre componentes */
.gap-4  .space-y-4  /* 16px gap */

/* Seções */
.py-8  .my-8  /* 32px spacing */

/* Páginas */
.py-12  .my-12  /* 48px spacing */
```

---

### Borders & Shadows

#### Border Radius
```css
.rounded-none  /* 0px */
.rounded-sm    /* 0.125rem (2px) */
.rounded       /* 0.25rem (4px) - Padrão */
.rounded-md    /* 0.375rem (6px) */
.rounded-lg    /* 0.75rem (12px) - Cards ⭐ */
.rounded-xl    /* 1rem (16px) - Modals */
.rounded-full  /* 9999px - Circles */
```

#### Borders
```css
.border       /* 1px solid - Padrão */
.border-2     /* 2px solid - Focus states */

/* Colors */
.border-gray-200   /* Light borders */
.border-primary-600  /* Focus borders */
```

#### Shadows
```css
.shadow-sm   /* Subtle - Cards hover */
.shadow      /* Default - Cards ⭐ */
.shadow-md   /* Medium - Dropdowns */
.shadow-lg   /* Large - Modals */
.shadow-xl   /* Extra large - Overlays */
```

**Definição:**
```css
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
```

---

## 🧩 Componentes

### Button

#### Variants

```tsx
import { Button } from '@repo/ui';

// Primary (padrão)
<Button variant="primary">Clique aqui</Button>

// Secondary
<Button variant="secondary">Cancelar</Button>

// Danger
<Button variant="danger">Excluir</Button>

// Outline
<Button variant="outline">Ver mais</Button>

// Ghost
<Button variant="ghost">Sair</Button>
```

#### Sizes
```tsx
<Button size="sm">Pequeno</Button>
<Button size="md">Médio (padrão)</Button>
<Button size="lg">Grande</Button>
```

#### States
```tsx
<Button isLoading>Carregando...</Button>
<Button disabled>Desabilitado</Button>
```

#### Com ícones
```tsx
<Button>
  <svg className="w-5 h-5 mr-2">...</svg>
  Entrar
</Button>
```

#### Classes CSS
```css
/* Base */
.btn-base {
  @apply inline-flex items-center justify-center rounded-md font-medium;
  @apply transition-colors duration-150;
  @apply disabled:opacity-50 disabled:pointer-events-none;
}

/* Primary */
.btn-primary {
  @apply bg-primary-600 text-white;
  @apply hover:bg-primary-700;
  @apply focus:ring-2 focus:ring-primary-500 focus:ring-offset-2;
}

/* Sizes */
.btn-sm { @apply h-9 px-3 text-sm; }
.btn-md { @apply h-10 px-4 text-base; }
.btn-lg { @apply h-11 px-6 text-lg; }
```

---

### Input

#### Basic
```tsx
import { Input } from '@repo/ui';

<Input
  type="text"
  placeholder="Digite seu nome"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

#### Com label
```tsx
import { Input, Label } from '@repo/ui';

<div>
  <Label htmlFor="email">E-mail</Label>
  <Input
    id="email"
    type="email"
    placeholder="seu@email.com"
  />
</div>
```

#### Estados
```tsx
<Input error="Email inválido" />
<Input disabled />
```

#### Classes CSS
```css
.input-base {
  @apply w-full rounded-md border border-gray-300;
  @apply px-3 py-2 text-sm;
  @apply placeholder:text-gray-400;
  @apply focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent;
  @apply disabled:bg-gray-50 disabled:cursor-not-allowed;
}

.input-error {
  @apply border-error-DEFAULT focus:ring-error-DEFAULT;
}
```

---

### Card

#### Basic
```tsx
import { Card, CardContent, CardFooter } from '@repo/ui';

<Card>
  <CardContent>
    <h3>Título</h3>
    <p>Conteúdo do card</p>
  </CardContent>
  <CardFooter>
    <Button>Ação</Button>
  </CardFooter>
</Card>
```

#### Com hover
```tsx
<Card className="hover:shadow-xl transition-shadow">
  ...
</Card>
```

#### Classes CSS
```css
.card {
  @apply bg-white rounded-lg border border-gray-200;
  @apply shadow-sm;
}

.card-content {
  @apply p-4;
}

.card-footer {
  @apply px-4 pb-4 pt-2;
  @apply border-t border-gray-100;
}
```

---

### Modal

#### Uso
```tsx
import { Modal } from '@repo/ui';

<Modal isOpen={isOpen} onClose={handleClose}>
  <h2>Título do Modal</h2>
  <p>Conteúdo</p>
  <Button onClick={handleClose}>Fechar</Button>
</Modal>
```

#### Animações
```tsx
// Framer Motion
initial={{ opacity: 0, scale: 0.95, y: 20 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
exit={{ opacity: 0, scale: 0.95, y: 20 }}
transition={{ duration: 0.2, ease: 'easeOut' }}
```

---

### Form

#### Exemplo Completo
```tsx
import { Form, FormField, FormLabel, FormError } from '@repo/ui';
import { useForm } from 'react-hook-form';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <FormLabel>E-mail</FormLabel>
        <Input {...register('email', { required: true })} />
        {errors.email && <FormError>Campo obrigatório</FormError>}
      </FormField>

      <FormField>
        <FormLabel>Senha</FormLabel>
        <Input type="password" {...register('password')} />
      </FormField>

      <Button type="submit">Entrar</Button>
    </Form>
  );
}
```

---

## 🎭 Animações (Framer Motion)

### Filosofia
- **Sutis**: Não distraem
- **Rápidas**: < 300ms
- **Intencionais**: Guiam atenção

### Exemplos

#### Fade In
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.2 }}
>
  Conteúdo
</motion.div>
```

#### Scale + Fade
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.15 }}
>
  Conteúdo
</motion.div>
```

#### Slide In
```tsx
<motion.div
  initial={{ x: -20, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.2 }}
>
  Conteúdo
</motion.div>
```

#### Stagger Children
```tsx
<motion.ul
  variants={{
    show: { transition: { staggerChildren: 0.1 } }
  }}
>
  {items.map((item) => (
    <motion.li
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
      }}
    >
      {item.name}
    </motion.li>
  ))}
</motion.ul>
```

#### Hover States
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.15 }}
>
  Clique aqui
</motion.button>
```

---

## 🎨 Ícones

### Heroicons
Usamos [Heroicons](https://heroicons.com/) (Tailwind oficial).

```tsx
// Outline (stroke)
<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
</svg>

// Solid (fill)
<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
  <path d="M9 4.804A7.968..." />
</svg>
```

### Tamanhos
```css
.w-4 .h-4   /* 16px - Small */
.w-5 .h-5   /* 20px - Default */
.w-6 .h-6   /* 24px - Large */
.w-8 .h-8   /* 32px - Extra Large */
```

---

## 📱 Responsividade

### Breakpoints
```css
sm: 640px   /* Tablet portrait */
md: 768px   /* Tablet landscape */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

### Mobile-First
```tsx
<div className="
  w-full        /* Mobile: 100% width */
  sm:w-1/2      /* Tablet: 50% width */
  lg:w-1/3      /* Desktop: 33% width */
">
  ...
</div>
```

### Grid Responsivo
```tsx
<div className="
  grid
  grid-cols-1       /* Mobile: 1 coluna */
  sm:grid-cols-2    /* Tablet: 2 colunas */
  md:grid-cols-3    /* Desktop: 3 colunas */
  lg:grid-cols-4    /* Large: 4 colunas */
  gap-6
">
  {items.map(...)}
</div>
```

---

## ♿ Acessibilidade

### Princípios

1. **Contraste**: Mínimo 4.5:1 para texto normal
2. **Focus states**: Sempre visíveis
3. **Keyboard navigation**: Tab, Enter, Esc
4. **Screen readers**: ARIA labels
5. **Semantic HTML**: Usar tags corretas

### Exemplos

#### Focus Visible
```tsx
<button className="
  focus:outline-none
  focus:ring-2
  focus:ring-primary-500
  focus:ring-offset-2
">
  Clique
</button>
```

#### ARIA Labels
```tsx
<button aria-label="Fechar modal">
  <svg>...</svg>
</button>

<input
  type="search"
  aria-label="Buscar livros"
  placeholder="Buscar..."
/>
```

#### Skip Links
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only"
>
  Pular para conteúdo principal
</a>
```

---

## 📦 Usando o Design System

### Instalação
```bash
pnpm add @repo/ui
```

### Importação
```tsx
import { Button, Input, Card, Modal } from '@repo/ui';
import '@repo/ui/styles/globals.css';  // Tailwind base
```

### Configuração Tailwind
```js
// tailwind.config.js
module.exports = {
  presets: [
    require('@repo/ui/tailwind.config')  // Herda config
  ],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'  // Importante!
  ],
};
```

---

## 🎯 Boas Práticas

### DOs ✅
- Use componentes do design system
- Siga a paleta de cores
- Mantenha espaçamento consistente
- Use Tailwind classes quando possível
- Teste em diferentes tamanhos de tela

### DON'Ts ❌
- Não crie estilos inline complexos
- Não use cores hard-coded
- Não ignore estados de hover/focus
- Não esqueça de testar acessibilidade
- Não misture unidades (use apenas rem/px)

---

## 📚 Referências

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Heroicons](https://heroicons.com/)
- [Class Variance Authority](https://cva.style/docs)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Última atualização**: 07/02/2026
