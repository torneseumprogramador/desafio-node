export interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
  description: string
  category: string
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Carta Mágica Rara',
    price: 20.00,
    imageUrl: '/images/products/carta-magica.jpg',
    description: 'Uma carta mágica poderosa com efeitos únicos.',
    category: 'cartas'
  },
  {
    id: '2',
    name: 'Kit de Cartas',
    price: 45.00,
    imageUrl: '/images/products/kit-cartas.jpg',
    description: 'Kit completo com cartas especiais para iniciantes.',
    category: 'cartas'
  },
  {
    id: '3',
    name: 'Jogo de Tabuleiro',
    price: 150.00,
    imageUrl: '/images/products/tabuleiro.jpg',
    description: 'Jogo de tabuleiro mágico com peças especiais.',
    category: 'tabuleiros'
  },
  {
    id: '4',
    name: 'Pacote de Cartas',
    price: 30.00,
    imageUrl: '/images/products/pacote-cartas.jpg',
    description: 'Pacote com cartas aleatórias e chance de itens raros.',
    category: 'cartas'
  },
  {
    id: '5',
    name: 'Grimório Antigo',
    price: 299.99,
    imageUrl: '/images/products/grimorio.jpg',
    description: 'Um livro mágico contendo feitiços ancestrais.',
    category: 'livros'
  },
  {
    id: '6',
    name: 'Varinha Mística',
    price: 89.99,
    imageUrl: '/images/products/varinha.jpg',
    description: 'Varinha artesanal feita de madeira mágica.',
    category: 'acessorios'
  },
  {
    id: '7',
    name: 'Bola de Cristal',
    price: 199.99,
    imageUrl: '/images/products/bola-cristal.jpg',
    description: 'Bola de cristal para previsões e adivinhações.',
    category: 'acessorios'
  },
  {
    id: '8',
    name: 'Caldeirão Encantado',
    price: 159.99,
    imageUrl: '/images/products/caldeirao.jpg',
    description: 'Caldeirão mágico para poções e elixires.',
    category: 'acessorios'
  }
] 