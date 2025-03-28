import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FileService from 'App/Services/FileService'
import path from 'path'

export default class UploadController {
  public async index({ view, request }: HttpContextContract) {
    const page = Number(request.input('page', 1))
    const search = request.input('search', '')

    const { files, pagination } = FileService.listFiles(search, page)

    const pages = Array.from({ length: pagination.totalPages }, (_, i) => i + 1)

    const meta = {
      current_page: pagination.currentPage,
      last_page: pagination.totalPages,
      first_page: 1,
      first_page_url: `/arquivos?page=1${search ? `&search=${search}` : ''}`,
      last_page_url: `/arquivos?page=${pagination.totalPages}${search ? `&search=${search}` : ''}`,
      next_page_url: pagination.currentPage < pagination.totalPages ? `/arquivos?page=${pagination.currentPage + 1}${search ? `&search=${search}` : ''}` : null,
      previous_page_url: pagination.currentPage > 1 ? `/arquivos?page=${pagination.currentPage - 1}${search ? `&search=${search}` : ''}` : null
    }

    return view.render('uploads/index', {
      title: 'Lista de Arquivos',
      files,
      meta,
      search,
      pages
    })
  }

  public async new({ view }: HttpContextContract) {
    return view.render('uploads/new', {
      title: 'Novo Arquivo'
    })
  }

  public async destroy({ params, response, session }: HttpContextContract) {
    try {
      const fileName = params.file
      FileService.deleteFile(fileName)
      session.flash({ success: 'Arquivo deletado com sucesso' })
    } catch (error) {
      session.flash({ error: error.message })
    }
    return response.redirect('/arquivos')
  }

  public async destroyMultiple({ request, response, session }: HttpContextContract) {
    try {
        const files = JSON.parse(request.input('ids'))

        if (!files || files.length === 0) {
          session.flash({ error: 'Nenhum arquivo selecionado' })
          return response.redirect('/arquivos')
        }
        FileService.deleteFiles(files)
        session.flash({ success: 'Arquivos deletados com sucesso' })
      } catch (error) {
        session.flash({ error: error.message })
      }
      return response.redirect('/arquivos')
  }

  public async create({ request, response, session }: HttpContextContract) {
    const file = request.file('file')
    if (!file) {
      session.flash({ error: 'Nenhum arquivo enviado' })
      return response.redirect('/arquivos/novo')
    }

    await FileService.saveFile(file)

    session.flash({ success: 'Arquivo enviado com sucesso' })
    return response.redirect('/arquivos')
  }
} 