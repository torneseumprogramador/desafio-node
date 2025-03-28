import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TesteWsController {
  public async index({ view, request }: HttpContextContract) {
    const cliente_id = request.input('cliente_id')
    return view.render('ws/index', { cliente_id })
  }
} 