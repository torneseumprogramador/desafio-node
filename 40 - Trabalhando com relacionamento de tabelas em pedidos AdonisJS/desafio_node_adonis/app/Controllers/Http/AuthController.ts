import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AdministradorService } from 'App/Services/AdministradorService'

export default class AuthController {
  private administradorService: AdministradorService

  constructor() {
    this.administradorService = new AdministradorService()
  }

  public async showLogin({ view }: HttpContextContract) {
    return view.render('auth/login', {
      title: 'Login'
    })
  }

  public async login({ request, response, session }: HttpContextContract) {
    const { email, senha } = request.only(['email', 'senha'])

    try {
      const administrador = await this.administradorService.authenticate(email, senha)

      if (!administrador) {
        session.flash('error', 'Email ou senha inválidos')
        return response.redirect().back()
      }

      // Armazena o administrador na sessão
      session.put('admin', administrador)

      return response.redirect().toRoute('/')
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      session.flash('error', 'Ocorreu um erro ao tentar fazer login')
      return response.redirect().back()
    }
  }

  public async logout({ session, response }: HttpContextContract) {
    session.forget('admin')
    return response.redirect().toRoute('auth.login')
  }
} 