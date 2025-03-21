import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Auth {
  public async handle(
    { session, response, view }: HttpContextContract,
    next: () => Promise<void>
  ) {
    const administrador = session.get('admin')

    if (!administrador) {
      session.flash('error', 'Você precisa estar logado para acessar esta página')
      return response.redirect().toRoute('auth.login')
    }

    // Compartilha o administrador com todas as views
    view.share({ administrador })

    await next()
  }
} 