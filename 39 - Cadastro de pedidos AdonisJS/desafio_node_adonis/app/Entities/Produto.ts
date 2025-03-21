import { IProduto } from 'App/Interfaces/IProduto'

export class Produto implements IProduto {
  id?: number
  nome: string
  descricao?: string
  valor: number
  quantidade: number
  created_at?: Date
  updated_at?: Date

  constructor(data: IProduto) {
    this.id = data.id
    this.nome = data.nome
    this.descricao = data.descricao
    this.valor = data.valor
    this.quantidade = data.quantidade
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
} 