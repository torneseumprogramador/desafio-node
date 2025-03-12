import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ClienteServico } from '../../Servicos/ClienteServico'

export default class ClientesController {
  private servico: ClienteServico

  constructor() {
    this.servico = new ClienteServico()
  }

  public async index({ view }: HttpContextContract) {
    const clientes = await this.servico.listar()
    return view.render('clientes/index', { 
      clientes,
      title: 'Clientes'
    })
  }

  public async show({ params, response }: HttpContextContract) {
    const cliente = await this.servico.buscarPorId(params.id)
    if (!cliente) {
      return response.status(404).json({ error: 'Cliente não encontrado' })
    }
    return response.json(cliente)
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const cliente = await this.servico.criar(request.all())
      return response.status(201).json(cliente)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const cliente = await this.servico.atualizar(params.id, request.all())
      if (!cliente) {
        return response.status(404).json({ error: 'Cliente não encontrado' })
      }
      return response.json(cliente)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const deleted = await this.servico.deletar(params.id)
    if (!deleted) {
      return response.status(404).json({ error: 'Cliente não encontrado' })
    }
    return response.status(204)
  }
} 