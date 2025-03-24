import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { IPedido } from 'App/Interfaces/IPedido'

import { IViewPaginationMeta } from 'App/Interfaces/IViewPaginationMeta'
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

    const produtos = await new ProdutoService().findAll()
    
    return view.render('pedidos/edit', { 
      pedido,
      produtos,
      title: 'Editar Pedido'
    })
  }

  public async update({ request, response, params, session }: HttpContextContract) {
    try {
      const pedido = await new PedidoService().findById(params.id)
      if (!pedido) {
        session.flash('error', 'Pedido não encontrado.')
        return response.redirect().back()
      }
      
      const clienteId = request.input('cliente_id')
      const produtosRequest = request.input('produtos', [])
      
      const data = {
        cliente_id: clienteId,
        status: request.input('status', 'pendente'),
        forma_pagamento: request.input('forma_pagamento'),
        observacoes: request.input('observacoes'),
        data_entrega: request.input('data_entrega'),
        produtos: produtosRequest
      }

      await new PedidoService().update(params.id, data as IPedido)
      session.flash('success', 'Pedido atualizado com sucesso!')
      return response.redirect().toRoute('pedidos.index')
    } catch (error) {
      session.flash('error', 'Erro ao atualizar pedido. Por favor, tente novamente.')
      return response.redirect().back()
    }
  }

  public async new({ view }: HttpContextContract) {
    const produtos = await new ProdutoService().findAll()
    return view.render('pedidos/create', {
      title: 'Novo Pedido',
      produtos
    })
  }

  public async create({ request, response, session }: HttpContextContract) {
    try {

      const clienteId = request.input('cliente_id')
      const produtosRequest = request.input('produtos', [])

      const data = {
        cliente_id: clienteId,
        status: request.input('status', 'pendente'),
        forma_pagamento: request.input('forma_pagamento'),
        observacoes: request.input('observacoes'),
        data_entrega: request.input('data_entrega'),
        produtos: produtosRequest
      }

      await new PedidoService().create(data as IPedido)
      session.flash('success', 'Pedido cadastrado com sucesso!')
      return response.redirect().toRoute('pedidos.index')
    } catch (error) {
      console.log(error)
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