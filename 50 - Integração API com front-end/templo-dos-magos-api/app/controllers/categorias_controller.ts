import { HttpContext } from '@adonisjs/core/http'
import Categoria from '#models/categoria'

export default class CategoriasController {
  async index({ response }: HttpContext) {
    const categorias = await Categoria.all()
    return response.json(categorias)
  }

  async show({ params, response }: HttpContext) {
    try {
      const categoria = await Categoria.findOrFail(params.id)
      return response.json(categoria)
    } catch (error) {
      return response.status(404).json({
        message: 'Categoria não encontrada',
      })
    }
  }
}
