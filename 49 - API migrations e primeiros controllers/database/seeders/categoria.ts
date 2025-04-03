import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Categoria from '#models/categoria'

export default class extends BaseSeeder {
  async run() {
    const categorias = [
      {
        id: 1,
        nome: 'Cartas Raras',
        cor: 'bg-orange-400',
        slug: 'cartas-raras',
      },
      {
        id: 2,
        nome: 'Decks',
        cor: 'bg-cyan-400',
        slug: 'decks',
      },
      {
        id: 3,
        nome: 'Boosters',
        cor: 'bg-blue-400',
        slug: 'boosters',
      },
      {
        id: 4,
        nome: 'Acessórios',
        cor: 'bg-blue-500',
        slug: 'acessorios',
      },
    ]

    for (const categoria of categorias) {
      await Categoria.updateOrCreate({ id: categoria.id }, categoria)
    }
  }
}
