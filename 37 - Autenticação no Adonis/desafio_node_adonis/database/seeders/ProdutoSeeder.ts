import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { ProdutoService } from 'App/Services/ProdutoService'

export default class extends BaseSeeder {
  public async run () {
    const produtoService = new ProdutoService()
    // Verifica se já existem registros
    const existingCount = await produtoService.count()
    if (existingCount > 0) {
      console.log('Produtos já existem no banco de dados. Pulando seed...')
      return
    }

    await produtoService.create({
      nome: 'Smartphone XYZ',
      descricao: 'Smartphone de última geração com câmera de alta resolução',
      valor: 2999.99,
      quantidade: 10
    })

    await produtoService.create({
      nome: 'Notebook ABC',
      descricao: 'Notebook com processador de última geração e SSD de 512GB',
      valor: 4999.99,
      quantidade: 5
    })

    await produtoService.create({
      nome: 'Tablet 123',
      descricao: 'Tablet com tela de 10 polegadas e bateria de longa duração',
      valor: 1999.99,
      quantidade: 15
    })

    await produtoService.create({
      nome: 'Smartwatch Pro',
      descricao: 'Relógio inteligente com monitor cardíaco e GPS',
      valor: 1499.99,
      quantidade: 20
    })

    await produtoService.create({
      nome: 'Fone de Ouvido Wireless',
      descricao: 'Fone de ouvido bluetooth com cancelamento de ruído',
      valor: 799.99,
      quantidade: 30
    })
  }
}
