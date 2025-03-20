import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ClienteService } from 'App/Services/ClienteService'
import { IViewPaginationMeta } from 'App/Interfaces/IViewPaginationMeta'

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export default class ClientesController {
  public async index({ view, request }: HttpContextContract) {
    const page = Number(request.input('page', 1))
    const limit = 4
    const search = request.input('search', '')
    
    const { data: clientes, meta } = await new ClienteService().paginate(page, limit, search)
    
    const viewMeta: IViewPaginationMeta = {
      ...meta,
      first_page: 1,
      first_page_url: `/clientes?page=1${search ? `&search=${search}` : ''}`,
      last_page_url: `/clientes?page=${meta.last_page}${search ? `&search=${search}` : ''}`,
      next_page_url: page < meta.last_page ? `/clientes?page=${page + 1}${search ? `&search=${search}` : ''}` : null,
      previous_page_url: page > 1 ? `/clientes?page=${page - 1}${search ? `&search=${search}` : ''}` : null
    }
    
    return view.render('clientes/index', { 
      clientes,
      meta: viewMeta,
      title: 'Clientes',
      range,
      search
    })
  }

  public async indexJson({ request }: HttpContextContract) {
    const page = Number(request.input('page', 1))
    const limit = 4
    const search = request.input('search', '')
    
    const { data: clientes, meta } = await new ClienteService().paginate(page, limit, search)
    
    const viewMeta: IViewPaginationMeta = {
      ...meta,
      first_page: 1,
      first_page_url: `/clientes?page=1${search ? `&search=${search}` : ''}`,
      last_page_url: `/clientes?page=${meta.last_page}${search ? `&search=${search}` : ''}`,
      next_page_url: page < meta.last_page ? `/clientes?page=${page + 1}${search ? `&search=${search}` : ''}` : null,
      previous_page_url: page > 1 ? `/clientes?page=${page - 1}${search ? `&search=${search}` : ''}` : null
    }

    return {
      clientes,
      meta: viewMeta
    }
  }

  public async show({ view, params }: HttpContextContract) {
    const cliente = await new ClienteService().findById(params.id)
    
    if (!cliente) {
      return view.render('errors/not-found', {
        title: 'Cliente não encontrado'
      })
    }

    return view.render('clientes/show', {
      cliente,
      title: `Cliente - ${cliente.nome}`
    })
  }

  public async edit({ params, view }: HttpContextContract) {
    const cliente = await new ClienteService().findById(params.id)
    if (!cliente) {
      return view.render('errors/not-found')
    }
    return view.render('clientes/edit', { 
      cliente,
      title: 'Editar Cliente'
    })
  }

  public async update({ request, response, params, session }: HttpContextContract) {
    try {
      const data = request.only([
        'nome',
        'whatsapp',
        'cep',
        'logradouro',
        'numero',
        'complemento',
        'bairro',
        'cidade',
        'estado'
      ])

      await new ClienteService().update(params.id, data)
      session.flash('success', 'Cliente atualizado com sucesso!')
      return response.redirect().toRoute('clientes.index')
    } catch (error) {
      session.flash('error', 'Erro ao atualizar cliente. Por favor, tente novamente.')
      return response.redirect().back()
    }
  }

  public async destroy({ response, params, session }: HttpContextContract) {
    try {
      await new ClienteService().delete(params.id)
      session.flash('success', 'Cliente excluído com sucesso!')
      return response.redirect().toRoute('clientes.index')
    } catch (error) {
      session.flash('error', 'Erro ao excluir cliente. Por favor, tente novamente.')
      return response.redirect().back()
    }
  }

  public async destroyMultiple({ request, response, session }: HttpContextContract) {
    try {
      const ids = JSON.parse(request.input('ids'))
      await new ClienteService().deleteMultiple(ids)
      session.flash('success', 'Clientes excluídos com sucesso!')
      return response.redirect().back()
    } catch (error) {
      session.flash('error', error.message)
      return response.redirect().back()
    }
  }

  public async create({ view }: HttpContextContract) {
    return view.render('clientes/create', {
      title: 'Novo Cliente'
    })
  }

  public async store({ request, response, session }: HttpContextContract) {
    try {
      const data = request.only([
        'nome',
        'whatsapp',
        'cep',
        'logradouro',
        'numero',
        'complemento',
        'bairro',
        'cidade',
        'estado'
      ])

      await new ClienteService().create(data)
      session.flash('success', 'Cliente cadastrado com sucesso!')
      return response.redirect().toRoute('clientes.index')
    } catch (error) {
      session.flash('error', 'Erro ao cadastrar cliente. Por favor, tente novamente.')
      return response.redirect().back()
    }
  }
}