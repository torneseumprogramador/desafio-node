import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { AdministradorService } from 'App/Services/AdministradorService'

export default class extends BaseSeeder {
  public async run () {
    const administradorService = new AdministradorService()

    try {
      // Verifica se já existe um administrador com o email fornecido
      const administradorExistente = await administradorService.findByEmail('danilo@teste.com')
      if (administradorExistente) {
        console.log('Administrador já existe no banco de dados. Pulando seed...')
        return
      }

      // Cria um novo administrador
      await administradorService.create({
        nome: 'Danilo',
        email: 'danilo@teste.com',
        senha: '123456'
      })
      console.log('Administrador inicial criado com sucesso!')
    } catch (error) {
      console.error('Erro ao criar administrador inicial:', error.message)
    }
  }
} 