import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ClienteService } from 'App/Services/ClienteService'

export default class ClientesController {
  public async index({ view }: HttpContextContract) {
    const clientes = await new ClienteService().findAll();
    return view.render('clientes/index', { 
      clientes,
      title: 'Clientes'
    })
  }
}