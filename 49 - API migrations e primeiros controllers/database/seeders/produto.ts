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
        nome: 'Carta Mágica',
        preco: 20.0,
        descricao: 'Uma carta mágica rara com poderes místicos.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Carta%20Mágica',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)]
      },
      {
        id: 2,
        nome: 'Cadeira do Mago',
        preco: 100.0,
        descricao: 'Uma cadeira mágica com poderes místicos.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Cadeira%20Mágica',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)]
      },
      {
        id: 3,
        nome: 'Kit de Cartas',
        preco: 45.0,
        descricao: 'Um kit completo com cartas mágicas variadas.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Kit%20de%20Cartas',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)]
      },
      {
        id: 4,
        nome: 'Jogo de Tabuleiro',
        preco: 150.0,
        descricao: 'Um jogo de tabuleiro mágico para toda a família.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Jogo%20de%20Tabuleiro',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)]
      },
      {
        id: 5,
        nome: 'Pacote de Cartas',
        preco: 30.0,
        descricao: 'Um pacote com cartas mágicas aleatórias.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Pacote%20de%20Cartas',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)]
      },
      {
        id: 6,
        nome: 'Poção Mágica',
        preco: 25.0,
        descricao: 'Uma poção mágica para aumentar seus poderes.',
        url_imagem: '/placeholder.svg?height=200&width=200&text=Poção%20Mágica',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)]
      },
    ]

    for (const produto of produtos) {
      await Produto.updateOrCreate({ id: produto.id }, produto)
    }
  }
}
