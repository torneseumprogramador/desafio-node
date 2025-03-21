import { IPedido } from 'App/Interfaces/IPedido'

export class Pedido implements IPedido {
  id?: number
  cliente_id: number
  cliente?: {
    id: number
    nome: string
    whatsapp: string
  }
  valor_total: number
  status: string
  forma_pagamento?: string
  observacoes?: string
  data_entrega?: Date
  endereco_entrega_logradouro: string
  endereco_entrega_numero: string
  endereco_entrega_complemento?: string
  endereco_entrega_bairro: string
  endereco_entrega_cidade: string
  endereco_entrega_estado: string
  endereco_entrega_cep: string
  created_at?: Date
  updated_at?: Date
  produtos: {
    produto_id: number
    quantidade: number
    valor_unitario: number
    valor_total: number
  }[]

  constructor(data: IPedido) {
    this.id = data.id
    this.cliente_id = data.cliente_id
    this.valor_total = data.valor_total ?? 0
    this.status = data.status
    this.forma_pagamento = data.forma_pagamento
    this.observacoes = data.observacoes
    this.data_entrega = data.data_entrega
    this.endereco_entrega_logradouro = data.endereco_entrega_logradouro
    this.endereco_entrega_numero = data.endereco_entrega_numero
    this.endereco_entrega_complemento = data.endereco_entrega_complemento
    this.endereco_entrega_bairro = data.endereco_entrega_bairro
    this.endereco_entrega_cidade = data.endereco_entrega_cidade
    this.endereco_entrega_estado = data.endereco_entrega_estado
    this.endereco_entrega_cep = data.endereco_entrega_cep
    this.created_at = data.created_at
    this.updated_at = data.updated_at
    this.produtos = data.produtos
    this.cliente = data.cliente
  }
} 