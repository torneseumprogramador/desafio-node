import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export interface ICliente {
  id?: number
  nome: string
  whatsapp: string
  cep: string
  logradouro: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  estado: string
  created_at?: Date
  updated_at?: Date
}

export class Cliente implements ICliente {
  id?: number
  nome: string
  whatsapp: string
  cep: string
  logradouro: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  estado: string
  created_at?: Date
  updated_at?: Date

  constructor(data: ICliente) {
    this.id = data.id
    this.nome = data.nome
    this.whatsapp = data.whatsapp
    this.cep = data.cep
    this.logradouro = data.logradouro
    this.numero = data.numero
    this.complemento = data.complemento
    this.bairro = data.bairro
    this.cidade = data.cidade
    this.estado = data.estado
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}

export default class ClientesController {
  public async index({ view }: HttpContextContract) {
    const clientesMock: ICliente[] = [
      {
        id: 1,
        nome: 'João Silva',
        whatsapp: '11999887766',
        cep: '01001-000',
        logradouro: 'Rua XV de Novembro',
        numero: '100',
        complemento: 'Apto 42',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        created_at: new Date('2024-01-15'),
        updated_at: new Date('2024-01-15')
      },
      {
        id: 2,
        nome: 'Maria Santos',
        whatsapp: '11988776655',
        cep: '04538-132',
        logradouro: 'Avenida Brigadeiro Faria Lima',
        numero: '3477',
        bairro: 'Itaim Bibi',
        cidade: 'São Paulo',
        estado: 'SP',
        created_at: new Date('2024-02-01'),
        updated_at: new Date('2024-02-01')
      },
      {
        id: 3,
        nome: 'Pedro Oliveira',
        whatsapp: '21977665544',
        cep: '22041-001',
        logradouro: 'Avenida Atlântica',
        numero: '1702',
        complemento: 'Bloco B',
        bairro: 'Copacabana',
        cidade: 'Rio de Janeiro',
        estado: 'RJ',
        created_at: new Date('2024-02-10'),
        updated_at: new Date('2024-02-10')
      }
    ]

    const clientes = clientesMock.map(cliente => new Cliente(cliente))
    
    return view.render('clientes/index', { 
      clientes,
      title: 'Clientes'
    })
  }
}