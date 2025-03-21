import { ICliente } from 'App/Interfaces/ICliente'

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