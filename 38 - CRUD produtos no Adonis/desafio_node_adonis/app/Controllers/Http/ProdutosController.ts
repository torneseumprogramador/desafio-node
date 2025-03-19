import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ProdutoService } from 'App/Services/ProdutoService'
import { IViewPaginationMeta } from 'App/Interfaces/IViewPaginationMeta'

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export default class ProdutosController {
  public async index({ view, request }: HttpContextContract) {
    const page = Number(request.input('page', 1))
    const limit = 10
    const search = request.input('search', '')
    
    const { data: produtos, meta } = await new ProdutoService().paginate(page, limit, search)
    
    const viewMeta: IViewPaginationMeta = {
      ...meta,
      first_page: 1,
      first_page_url: `/produtos?page=1${search ? `&search=${search}` : ''}`,
      last_page_url: `/produtos?page=${meta.last_page}${search ? `&search=${search}` : ''}`,
      next_page_url: page < meta.last_page ? `/produtos?page=${page + 1}${search ? `&search=${search}` : ''}` : null,
      previous_page_url: page > 1 ? `/produtos?page=${page - 1}${search ? `&search=${search}` : ''}` : null
    }
    
    return view.render('produtos/index', { 
      produtos,
      meta: viewMeta,
      title: 'Produtos',
      range,
      search
    })
  }

  public async show({ view, params }: HttpContextContract) {
    const produto = await new ProdutoService().findById(params.id)
    
    if (!produto) {
      return view.render('errors/not-found', {
        title: 'Produto não encontrado'
      })
    }

    return view.render('produtos/show', {
      produto,
      title: `Produto - ${produto.nome}`
    })
  }

  public async edit({ params, view }: HttpContextContract) {
    const produto = await new ProdutoService().findById(params.id)
    if (!produto) {
      return view.render('errors/not-found')
    }
    return view.render('produtos/edit', { 
      produto,
      title: 'Editar Produto'
    })
  }

  public async update({ request, response, params, session }: HttpContextContract) {
    try {
      const data = request.only([
        'nome',
        'valor',
        'quantidade'
      ])

      await new ProdutoService().update(params.id, data)
      session.flash('success', 'Produto atualizado com sucesso!')
      return response.redirect().toRoute('produtos.index')
    } catch (error) {
      session.flash('error', 'Erro ao atualizar produto. Por favor, tente novamente.')
      return response.redirect().back()
    }
  }

  public async destroy({ response, params, session }: HttpContextContract) {
    try {
      await new ProdutoService().delete(params.id)
      session.flash('success', 'Produto excluído com sucesso!')
      return response.redirect().toRoute('produtos.index')
    } catch (error) {
      session.flash('error', 'Erro ao excluir produto. Por favor, tente novamente.')
      return response.redirect().back()
    }
  }

  public async create({ view }: HttpContextContract) {
    return view.render('produtos/create', {
      title: 'Novo Produto'
    })
  }

  public async store({ request, response, session }: HttpContextContract) {
    try {
      const data = request.only([
        'nome',
        'valor',
        'quantidade'
      ])

      await new ProdutoService().create(data)
      session.flash('success', 'Produto cadastrado com sucesso!')
      return response.redirect().toRoute('produtos.index')
    } catch (error) {
      session.flash('error', 'Erro ao cadastrar produto. Por favor, tente novamente.')
      return response.redirect().back()
    }
  }
} 