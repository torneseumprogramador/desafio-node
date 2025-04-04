import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Produto from '#models/produto'
import Categoria from '#models/categoria'

export default class extends BaseSeeder {
  async run() {
    // Busca todas as categorias disponíveis
    const categorias = await Categoria.all()
    const categoriaIds = categorias.map((categoria) => categoria.id)

    const produtos = [
      {
        id: 1,
        nome: 'Varinha Mágica Premium',
        preco: 299.99,
        descricao: 'Varinha mágica feita de madeira de carvalho com núcleo de pena de fênix.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Varinha%20Premium',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 2,
        nome: 'Livro de Feitiços Antigos',
        preco: 89.90,
        descricao: 'Compêndio de feitiços raros e poderosos de eras passadas.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Livro%20Antigo',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 3,
        nome: 'Cristal de Poder',
        preco: 150.00,
        descricao: 'Cristal natural que amplifica poderes mágicos.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Cristal',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 4,
        nome: 'Túnica do Arcanista',
        preco: 199.99,
        descricao: 'Túnica elegante com proteções mágicas incorporadas.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Tunica',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 5,
        nome: 'Poção de Invisibilidade',
        preco: 75.50,
        descricao: 'Poção rara que concede invisibilidade temporária.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Pocao%20Invisibilidade',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 6,
        nome: 'Amuleto de Proteção',
        preco: 120.00,
        descricao: 'Amuleto que oferece proteção contra magias malignas.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Amuleto',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 7,
        nome: 'Grimório do Mestre',
        preco: 250.00,
        descricao: 'Livro de magia avançada com encadernação especial.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Grimorio',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 8,
        nome: 'Bola de Cristal',
        preco: 180.00,
        descricao: 'Esfera de cristal para previsões e visões do futuro.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Bola%20Cristal',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 9,
        nome: 'Anel do Elementalista',
        preco: 160.00,
        descricao: 'Anel que permite controlar os elementos naturais.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Anel',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 10,
        nome: 'Cajado do Sábio',
        preco: 220.00,
        descricao: 'Cajado antigo com poderes de cura e proteção.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Cajado',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 11,
        nome: 'Kit de Alquimia',
        preco: 95.00,
        descricao: 'Conjunto completo para preparação de poções mágicas.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Kit%20Alquimia',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 12,
        nome: 'Pergaminho de Teleporte',
        preco: 45.00,
        descricao: 'Pergaminho com feitiço de teleporte de emergência.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Pergaminho',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 13,
        nome: 'Elixir da Juventude',
        preco: 500.00,
        descricao: 'Poção rara que retarda o envelhecimento.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Elixir',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 14,
        nome: 'Talismã de Sorte',
        preco: 85.00,
        descricao: 'Talismã que aumenta a sorte em situações mágicas.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Talisma',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 15,
        nome: 'Vassoura Voadora',
        preco: 350.00,
        descricao: 'Vassoura mágica para transporte aéreo.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Vassoura',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 16,
        nome: 'Orbe de Energia',
        preco: 130.00,
        descricao: 'Orbe que armazena e libera energia mágica.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Orbe',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 17,
        nome: 'Manto do Invisível',
        preco: 280.00,
        descricao: 'Manto que concede invisibilidade ao usuário.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Manto',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 18,
        nome: 'Poção de Cura',
        preco: 60.00,
        descricao: 'Poção que restaura a saúde e vitalidade.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Pocao%20Cura',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 19,
        nome: 'Dagas Mágicas',
        preco: 190.00,
        descricao: 'Par de adagas encantadas com poderes elementais.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Dagas',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 20,
        nome: 'Relógio do Tempo',
        preco: 450.00,
        descricao: 'Relógio mágico que permite manipular o tempo localmente.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Relogio',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
    ]

    for (const produto of produtos) {
      await Produto.updateOrCreate({ id: produto.id }, produto)
    }
  }
}
