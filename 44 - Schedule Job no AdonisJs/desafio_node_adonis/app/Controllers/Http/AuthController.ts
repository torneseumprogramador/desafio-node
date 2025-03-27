import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AdministradorService } from 'App/Services/AdministradorService'
import SendgridService from 'App/Services/SendgridService'
import { TokenService } from 'App/Services/TokenService'

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

  public async forgotPassword({ request, response, session }: HttpContextContract) {
    const { email } = request.only(['email'])

    try {
      const token = await new TokenService().generateToken(email)
      const baseUrl = process.env.APP_URL
      const resetUrl = `${baseUrl}/reset-password?token=${token}`
      await SendgridService.sendEmail(email, 'Recuperação de Senha', `Clique no link para redefinir sua senha: <a href="${resetUrl}">${resetUrl}</a>`)

      session.flash('success', 'Email de recuperação enviado com sucesso')
      return response.redirect().toRoute('auth.login')
    } catch (error) {
      console.error('Erro ao enviar email de recuperação:', error)
      session.flash('error', 'Ocorreu um erro ao tentar enviar o email de recuperação')
      return response.redirect().back()
    }
  }

  public async showResetPassword({ request, response, view, session }: HttpContextContract) {
    let token = request.input('token')

    try {
      const tokenService = new TokenService()
      const email = await tokenService.verifyToken(token)
      await tokenService.invalidateToken(token)

      token = await tokenService.generateToken(email)
      return view.render('auth/reset-password', {
        token,
        title: 'Redefinir Senha'
      })
    } catch (error) {
      session.flash('error', error.message)
      return response.redirect().toRoute('auth.login')
    }
  }

  public async resetPassword({ request, response, session }: HttpContextContract) {
    const { token, novaSenha, confirmacaoSenha } = request.only(['token', 'novaSenha', 'confirmacaoSenha'])

    try {
      const tokenService = new TokenService()
      const email = await tokenService.verifyToken(token)
      await this.administradorService.changePassword(email, novaSenha, confirmacaoSenha)

      session.flash('success', 'Senha alterada com sucesso')
      await tokenService.invalidateToken(token)

      return response.redirect().toRoute('auth.login')
    } catch (error) {
      session.flash('error', error.message)
      return response.redirect().toRoute('auth.resetPassword', { qs: { token } })
    }
  }

  public async showForgotPassword({ view }: HttpContextContract) {
    return view.render('auth/forgot-password', {
      title: 'Esqueceu sua senha?'
    })
  }
} 