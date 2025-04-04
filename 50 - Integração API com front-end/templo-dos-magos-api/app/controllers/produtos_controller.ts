import { HttpContext } from '@adonisjs/core/http'
import Produto from '#models/produto'

export default class ProdutosController {
  async index({ response }: HttpContext) {
    const produtos = await Produto.query().preload('categoria')
    return response.json(produtos)
  }

  async show({ params, response }: HttpContext) {
    try {
      const produto = await Produto.query()
        .where('id', params.id)
        .preload('categoria')
        .firstOrFail()
      return response.json(produto)
    } catch (error) {
      return response.status(404).json({
        message: 'Produto não encontrado',
      })
    }
  }
}
