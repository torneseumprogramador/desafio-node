import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { ClienteService } from 'App/Services/ClienteService'

export default class extends BaseSeeder {
  public async run () {
    const clienteService = new ClienteService()
    const existingCount = await clienteService.count()
    if (existingCount > 0) {
      console.log('Clientes já existem no banco de dados. Pulando seed...')
      return
    }

    await clienteService.create({
      nome: 'João Silva',
      whatsapp: '(11) 99988-7766',
      cep: '01001-000',
      logradouro: 'Rua XV de Novembro', 
      numero: '100',
      complemento: 'Apto 42',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP'
    })

    await clienteService.create({
      nome: 'Maria Santos',
      whatsapp: '(11) 98877-6655',
      cep: '04538-132',
      logradouro: 'Avenida Brigadeiro Faria Lima',
      numero: '3477',
      bairro: 'Itaim Bibi',
      cidade: 'São Paulo',
      estado: 'SP'
    })

    await clienteService.create({
      nome: 'Pedro Oliveira', 
      whatsapp: '(21) 97766-5544',
      cep: '22041-001',
      logradouro: 'Avenida Atlântica',
      numero: '1702',
      complemento: 'Bloco B',
      bairro: 'Copacabana',
      cidade: 'Rio de Janeiro',
      estado: 'RJ'
    })
  }
}
