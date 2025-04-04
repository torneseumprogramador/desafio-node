import { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  public async index({ response }: HttpContext) {
    return response.json({
      message: 'Bem vindo a API do Projeto Mundo dos Magos',
    })
  }
}
