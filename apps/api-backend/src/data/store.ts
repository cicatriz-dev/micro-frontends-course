import type { Book, UserWithPassword } from '@repo/types';
import bcrypt from 'bcryptjs';

// ============================================
// Data Store Interface
// ============================================

interface DataStore {
  users: UserWithPassword[];
  books: Book[];
}

// ============================================
// Initial Data
// ============================================

// Hash password: "demo123"
const DEMO_PASSWORD_HASH = bcrypt.hashSync('demo123', 10);

export const store: DataStore = {
  users: [
    {
      id: '1',
      name: 'Usuário Demo',
      email: 'demo@example.com',
      password: DEMO_PASSWORD_HASH,
      createdAt: new Date('2024-01-01'),
    },
  ],
  books: [
    // Programação
    {
      id: '1',
      title: 'Código Limpo',
      author: 'Robert C. Martin',
      category: 'Programação',
      price: 49.9,
      coverUrl: 'https://picsum.photos/seed/book1/200/300',
      description:
        'Habilidades Práticas do Agile Software. Aprenda a escrever código limpo e sustentável.',
    },
    {
      id: '2',
      title: 'O Programador Pragmático',
      author: 'Andrew Hunt & David Thomas',
      category: 'Programação',
      price: 54.9,
      coverUrl: 'https://picsum.photos/seed/book2/200/300',
      description:
        'Sua jornada à maestria. De programador iniciante a mestre.',
    },
    {
      id: '3',
      title: 'Padrões de Projeto',
      author: 'Gang of Four',
      category: 'Programação',
      price: 59.9,
      coverUrl: 'https://picsum.photos/seed/book3/200/300',
      description:
        'Elementos de Software Orientado a Objetos Reutilizável. A referência clássica.',
    },
    {
      id: '4',
      title: 'Refatoração',
      author: 'Martin Fowler',
      category: 'Programação',
      price: 52.9,
      coverUrl: 'https://picsum.photos/seed/book4/200/300',
      description:
        'Aperfeiçoando o Design de Códigos Existentes. Aprenda a melhorar código sem alterar comportamento.',
    },
    {
      id: '5',
      title: 'Você Não Sabe JS',
      author: 'Kyle Simpson',
      category: 'Programação',
      price: 45.9,
      coverUrl: 'https://picsum.photos/seed/book5/200/300',
      description:
        'Mergulho profundo nos mecanismos centrais do JavaScript.',
    },
    {
      id: '6',
      title: 'JavaScript Eloquente',
      author: 'Marijn Haverbeke',
      category: 'Programação',
      price: 42.9,
      coverUrl: 'https://picsum.photos/seed/book6/200/300',
      description:
        'Uma Introdução Moderna à Programação com JavaScript.',
    },

    // Ficção
    {
      id: '7',
      title: '1984',
      author: 'George Orwell',
      category: 'Ficção',
      price: 34.9,
      coverUrl: 'https://picsum.photos/seed/book7/200/300',
      description:
        'Um romance distópico de ficção científica social e um conto de advertência.',
    },
    {
      id: '8',
      title: 'O Grande Gatsby',
      author: 'F. Scott Fitzgerald',
      category: 'Ficção',
      price: 29.9,
      coverUrl: 'https://picsum.photos/seed/book8/200/300',
      description:
        'Um clássico romance americano ambientado na Era do Jazz.',
    },
    {
      id: '9',
      title: 'O Sol é Para Todos',
      author: 'Harper Lee',
      category: 'Ficção',
      price: 32.9,
      coverUrl: 'https://picsum.photos/seed/book9/200/300',
      description:
        'Uma história envolvente sobre injustiça racial e inocência infantil.',
    },
    {
      id: '10',
      title: 'Orgulho e Preconceito',
      author: 'Jane Austen',
      category: 'Ficção',
      price: 27.9,
      coverUrl: 'https://picsum.photos/seed/book10/200/300',
      description:
        'Um romance de costumes ambientado na Inglaterra georgiana.',
    },
    {
      id: '11',
      title: 'O Apanhador no Campo de Centeio',
      author: 'J.D. Salinger',
      category: 'Ficção',
      price: 31.9,
      coverUrl: 'https://picsum.photos/seed/book11/200/300',
      description:
        'A história da rebeldia adolescente e alienação.',
    },

    // Autoajuda
    {
      id: '12',
      title: 'Hábitos Atômicos',
      author: 'James Clear',
      category: 'Autoajuda',
      price: 44.9,
      coverUrl: 'https://picsum.photos/seed/book12/200/300',
      description:
        'Um Método Fácil e Comprovado de Criar Bons Hábitos e Abandonar os Maus.',
    },
    {
      id: '13',
      title: 'Os 7 Hábitos das Pessoas Altamente Eficazes',
      author: 'Stephen Covey',
      category: 'Autoajuda',
      price: 39.9,
      coverUrl: 'https://picsum.photos/seed/book13/200/300',
      description:
        'Lições poderosas sobre mudança pessoal.',
    },
    {
      id: '14',
      title: 'Como Fazer Amigos e Influenciar Pessoas',
      author: 'Dale Carnegie',
      category: 'Autoajuda',
      price: 35.9,
      coverUrl: 'https://picsum.photos/seed/book14/200/300',
      description:
        'O best-seller atemporal sobre relações humanas.',
    },
    {
      id: '15',
      title: 'Mindset: A Nova Psicologia do Sucesso',
      author: 'Carol S. Dweck',
      category: 'Autoajuda',
      price: 41.9,
      coverUrl: 'https://picsum.photos/seed/book15/200/300',
      description:
        'Mudando a forma como você pensa para atingir seu potencial.',
    },
    {
      id: '16',
      title: 'O Poder do Agora',
      author: 'Eckhart Tolle',
      category: 'Autoajuda',
      price: 38.9,
      coverUrl: 'https://picsum.photos/seed/book16/200/300',
      description:
        'Um Guia para a Iluminação Espiritual.',
    },

    // Negócios
    {
      id: '17',
      title: 'De Zero a Um',
      author: 'Peter Thiel',
      category: 'Negócios',
      price: 47.9,
      coverUrl: 'https://picsum.photos/seed/book17/200/300',
      description:
        'O que Aprender sobre Empreendedorismo com o Vale do Silício.',
    },
    {
      id: '18',
      title: 'A Startup Enxuta',
      author: 'Eric Ries',
      category: 'Negócios',
      price: 43.9,
      coverUrl: 'https://picsum.photos/seed/book18/200/300',
      description:
        'Como os Empreendedores de Hoje Usam Inovação Contínua para Criar Negócios Bem-Sucedidos.',
    },
    {
      id: '19',
      title: 'Empresas Feitas para Vencer',
      author: 'Jim Collins',
      category: 'Negócios',
      price: 46.9,
      coverUrl: 'https://picsum.photos/seed/book19/200/300',
      description:
        'Por Que Algumas Empresas Alcançam a Excelência e Outras Não.',
    },
    {
      id: '20',
      title: 'O Dilema da Inovação',
      author: 'Clayton M. Christensen',
      category: 'Negócios',
      price: 48.9,
      coverUrl: 'https://picsum.photos/seed/book20/200/300',
      description:
        'Quando Novas Tecnologias Levam Grandes Empresas ao Fracasso.',
    },
    {
      id: '21',
      title: 'Rápido e Devagar: Duas Formas de Pensar',
      author: 'Daniel Kahneman',
      category: 'Negócios',
      price: 51.9,
      coverUrl: 'https://picsum.photos/seed/book21/200/300',
      description:
        'Os dois sistemas que impulsionam a forma como pensamos.',
    },

    // Design
    {
      id: '22',
      title: 'O Design do Dia a Dia',
      author: 'Don Norman',
      category: 'Design',
      price: 44.9,
      coverUrl: 'https://picsum.photos/seed/book22/200/300',
      description:
        'Edição Revisada e Ampliada. O guia essencial para design centrado no ser humano.',
    },
    {
      id: '23',
      title: 'Não Me Faça Pensar',
      author: 'Steve Krug',
      category: 'Design',
      price: 39.9,
      coverUrl: 'https://picsum.photos/seed/book23/200/300',
      description:
        'Uma Abordagem de Senso Comum à Usabilidade na Web.',
    },
    {
      id: '24',
      title: 'Refatorando UI',
      author: 'Adam Wathan & Steve Schoger',
      category: 'Design',
      price: 79.9,
      coverUrl: 'https://picsum.photos/seed/book24/200/300',
      description:
        'Aprenda a projetar belas interfaces de usuário por conta própria.',
    },
    {
      id: '25',
      title: 'Design para Quem Não é Designer',
      author: 'Robin Williams',
      category: 'Design',
      price: 37.9,
      coverUrl: 'https://picsum.photos/seed/book25/200/300',
      description:
        'Princípios de Design e Tipografia para o Iniciante Visual.',
    },

    // Ciência
    {
      id: '26',
      title: 'Sapiens: Uma Breve História da Humanidade',
      author: 'Yuval Noah Harari',
      category: 'Ciência',
      price: 49.9,
      coverUrl: 'https://picsum.photos/seed/book26/200/300',
      description:
        'Da Idade da Pedra à era moderna. Uma jornada pela história da humanidade.',
    },
    {
      id: '27',
      title: 'Uma Breve História do Tempo',
      author: 'Stephen Hawking',
      category: 'Ciência',
      price: 42.9,
      coverUrl: 'https://picsum.photos/seed/book27/200/300',
      description:
        'Do Big Bang aos Buracos Negros.',
    },
    {
      id: '28',
      title: 'O Gene Egoísta',
      author: 'Richard Dawkins',
      category: 'Ciência',
      price: 45.9,
      coverUrl: 'https://picsum.photos/seed/book28/200/300',
      description:
        'Edição 40º Aniversário. A visão centrada nos genes da evolução.',
    },
    {
      id: '29',
      title: 'Cosmos',
      author: 'Carl Sagan',
      category: 'Ciência',
      price: 47.9,
      coverUrl: 'https://picsum.photos/seed/book29/200/300',
      description:
        'Uma viagem através do espaço e do tempo.',
    },
    {
      id: '30',
      title: 'A Origem das Espécies',
      author: 'Charles Darwin',
      category: 'Ciência',
      price: 38.9,
      coverUrl: 'https://picsum.photos/seed/book30/200/300',
      description:
        'A fundação da biologia evolutiva.',
    },
  ],
};

// ============================================
// Helper Functions
// ============================================

export function getAllBooks(): Book[] {
  return store.books;
}

export function getBookById(id: string): Book | undefined {
  return store.books.find((book) => book.id === id);
}

export function getBooksByCategory(category: string): Book[] {
  return store.books.filter(
    (book) => book.category.toLowerCase() === category.toLowerCase()
  );
}

export function searchBooks(query: string): Book[] {
  const lowerQuery = query.toLowerCase();
  return store.books.filter(
    (book) =>
      book.title.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery) ||
      book.description.toLowerCase().includes(lowerQuery)
  );
}

export function getCategories(): string[] {
  const categories = new Set(store.books.map((book) => book.category));
  return Array.from(categories).sort();
}

export function getUserByEmail(email: string): UserWithPassword | undefined {
  return store.users.find((user) => user.email === email);
}

export function getUserById(id: string): UserWithPassword | undefined {
  return store.users.find((user) => user.id === id);
}

export function createUser(
  name: string,
  email: string,
  password: string
): UserWithPassword {
  const newUser: UserWithPassword = {
    id: String(store.users.length + 1),
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    createdAt: new Date(),
  };
  store.users.push(newUser);
  return newUser;
}
