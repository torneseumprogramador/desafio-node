export interface IPedido {
  id?: number
  cliente_id: number
  cliente?: {
    id: number
    nome: string
    whatsapp: string
  }
  valor_total?: number
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
}