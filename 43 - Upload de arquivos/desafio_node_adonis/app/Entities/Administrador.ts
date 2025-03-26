import { IAdministrador } from 'App/Interfaces/IAdministrador'

export class Administrador implements IAdministrador {
  id?: number
  nome: string
  email: string
  senha: string
  created_at?: Date
  updated_at?: Date

  constructor(data: IAdministrador) {
    this.id = data.id
    this.nome = data.nome
    this.email = data.email
    this.senha = data.senha
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
} 