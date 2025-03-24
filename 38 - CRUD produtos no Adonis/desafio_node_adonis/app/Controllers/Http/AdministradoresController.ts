import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AdministradorService } from 'App/Services/AdministradorService'

export default class AdministradoresController {
  public async index({ view, request }: HttpContextContract) {
    const page = Number(request.input('page', 1))
    const limit = 4
    const search = request.input('search', '')
    
    const { data: administradores, meta } = await new AdministradorService().paginate(page, limit, search)
    
    return view.render('administradores/index', { 
      administradores,
      meta,
      title: 'Administradores',
      search
    })
  }

  public async show({ view, params }: HttpContextContract) {
    const administrador = await new AdministradorService().findById(params.id)
    
    if (!administrador) {
      return view.render('errors/not-found', {
        title: 'Administrador não encontrado'
      })
    }

    return view.render('administradores/show', {
      administrador,
      title: `Administrador - ${administrador.nome}`
    })
  }

  public async edit({ params, view }: HttpContextContract) {
    const administrador = await new AdministradorService().findById(params.id)
    if (!administrador) {
      return view.render('errors/not-found')
    }
    return view.render('administradores/edit', { 
      administrador,
      title: 'Editar Administrador'
    })
  }

  public async update({ request, response, params, session }: HttpContextContract) {
    try {
      const data = request.only([
        'nome',
        'email',
        'senha'
      ])

      await new AdministradorService().update(params.id, data)
      session.flash('success', 'Administrador atualizado com sucesso!')
      return response.redirect().toRoute('administradores.index')
    } catch (error) {
      session.flash('error', 'Erro ao atualizar administrador. Por favor, tente novamente.')
      return response.redirect().back()
    }
  }

  public async destroy({ response, params, session }: HttpContextContract) {
    try {
      await new AdministradorService().delete(params.id)
      session.flash('success', 'Administrador excluído com sucesso!')
      return response.redirect().toRoute('administradores.index')
    } catch (error) {
      session.flash('error', 'Erro ao excluir administrador. Por favor, tente novamente.')
      return response.redirect().back()
    }
  }

  public async create({ view }: HttpContextContract) {
    return view.render('administradores/create', {
      title: 'Novo Administrador'
    })
  }

    public async destroyMultiple({ request, response, session }: HttpContextContract) {
      try {
        const ids = JSON.parse(request.input('ids'))
        await new AdministradorService().deleteMultiple(ids)
        session.flash('success', 'Administradores excluídos com sucesso!')
        return response.redirect().back()
      } catch (error) {
        session.flash('error', error.message)
        return response.redirect().back()
      }
    }

  public async store({ request, response, session }: HttpContextContract) {
    try {
      const data = request.only([
        'nome',
        'email',
        'senha'
      ])

      await new AdministradorService().create(data)
      session.flash('success', 'Administrador cadastrado com sucesso!')
      return response.redirect().toRoute('administradores.index')
    } catch (error) {
      session.flash('error', 'Erro ao cadastrar administrador. Por favor, tente novamente.')
      return response.redirect().back()
    }
  }
} 