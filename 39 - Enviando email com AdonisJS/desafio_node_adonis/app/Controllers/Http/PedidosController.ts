import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { IViewPaginationMeta } from 'App/Interfaces/IViewPaginationMeta'
import { ClienteService } from 'App/Services/ClienteService'
import { PedidoService } from 'App/Services/PedidoService'
import { ProdutoService } from 'App/Services/ProdutoService'

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export default class PedidosController {
  public async index({ view, request }: HttpContextContract) {
    const page = Number(request.input('page', 1))
    const limit = 10
    const search = request.input('search', '')
    
    const { data: pedidos, meta } = await new PedidoService().paginate(page, limit, search)
    
    const viewMeta: IViewPaginationMeta = {
      ...meta,
      first_page: 1,
      first_page_url: `/pedidos?page=1${search ? `&search=${search}` : ''}`,
      last_page_url: `/pedidos?page=${meta.last_page}${search ? `&search=${search}` : ''}`,
      next_page_url: page < meta.last_page ? `/pedidos?page=${page + 1}${search ? `&search=${search}` : ''}` : null,
      previous_page_url: page > 1 ? `/pedidos?page=${page - 1}${search ? `&search=${search}` : ''}` : null
    }
    
    return view.render('pedidos/index', { 
      pedidos,
      meta: viewMeta,
      title: 'Pedidos',
      range,
      search
    })
  }

  public async show({ view, params }: HttpContextContract) {
    const pedido = await new PedidoService().findById(params.id)
    
    if (!pedido) {
      return view.render('errors/not-found', {
        title: 'Pedido não encontrado'
      })
    }

    return view.render('pedidos/show', {
      pedido,
      title: `Pedido #${pedido.id}`
    })
  }

  public async edit({ params, view }: HttpContextContract) {
    const pedido = await new PedidoService().findById(params.id)
    if (!pedido) {
      return view.render('errors/not-found')
    }
    return view.render('pedidos/edit', { 
      pedido,
      title: 'Editar Pedido'
    })
  }

  public async update({ request, response, params, session }: HttpContextContract) {
    try {
      const data = request.only([
        'cliente_id',
        'valor_total',
        'status',
        'forma_pagamento',
        'observacoes',
        'data_entrega'
      ])

      await new PedidoService().update(params.id, data)
      session.flash('success', 'Pedido atualizado com sucesso!')
      return response.redirect().toRoute('pedidos.index')
    } catch (error) {
      session.flash('error', 'Erro ao atualizar pedido. Por favor, tente novamente.')
      return response.redirect().back()
    }
  }

  public async destroy({ response, params, session }: HttpContextContract) {
    try {
      await new PedidoService().delete(params.id)
      session.flash('success', 'Pedido excluído com sucesso!')
      return response.redirect().toRoute('pedidos.index')
    } catch (error) {
      session.flash('error', 'Erro ao excluir pedido. Por favor, tente novamente.')
      return response.redirect().back()
    }
  }

  public async create({ view }: HttpContextContract) {
    const clientes = await new ClienteService().findAll()
    const produtos = await new ProdutoService().findAll()
    return view.render('pedidos/create', {
      title: 'Novo Pedido',
      clientes,
      produtos
    })
  }

  public async store({ request, response, session }: HttpContextContract) {
    try {
      const clienteId = request.input('cliente_id')
      const cliente = await new ClienteService().findById(clienteId)

      if (!cliente) {
        throw new Error('Cliente não encontrado')
      }

      const data = {
        cliente_id: clienteId,
        valor_total: request.input('valor_total'),
        status: request.input('status', 'pendente'),
        forma_pagamento: request.input('forma_pagamento'),
        observacoes: request.input('observacoes'),
        data_entrega: request.input('data_entrega'),
        endereco_entrega_logradouro: cliente.logradouro,
        endereco_entrega_numero: cliente.numero,
        endereco_entrega_complemento: cliente.complemento,
        endereco_entrega_bairro: cliente.bairro,
        endereco_entrega_cidade: cliente.cidade,
        endereco_entrega_estado: cliente.estado,
        endereco_entrega_cep: cliente.cep
      }

      await new PedidoService().create(data)
      session.flash('success', 'Pedido cadastrado com sucesso!')
      return response.redirect().toRoute('pedidos.index')
    } catch (error) {
      session.flash('error', error.message || 'Erro ao cadastrar pedido. Por favor, tente novamente.')
      return response.redirect().back()
    }
  }

  public async destroyMultiple({ request, response, session }: HttpContextContract) {
    try {
      const ids = JSON.parse(request.input('ids'))
      await new PedidoService().deleteMultiple(ids)
      session.flash('success', 'Pedidos excluídos com sucesso!')
      return response.redirect().back()
    } catch (error) {
      session.flash('error', error.message)
      return response.redirect().back()
    }
  }
} 