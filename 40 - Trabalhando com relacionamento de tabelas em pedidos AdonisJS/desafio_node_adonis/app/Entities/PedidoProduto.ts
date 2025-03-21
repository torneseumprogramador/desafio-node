import { IPedidoProduto } from 'App/Interfaces/IPedidoProduto'

export class PedidoProduto implements IPedidoProduto {
  id?: number
  pedido_id: number
  produto_id: number
  produto?: {
    id: number
    nome: string
    descricao?: string
    valor: number
  }
  quantidade: number
  valor_unitario: number
  valor_total: number
  created_at?: Date
  updated_at?: Date

  constructor(data: IPedidoProduto) {
    this.id = data.id
    this.pedido_id = data.pedido_id
    this.produto_id = data.produto_id
    this.produto = data.produto
    this.quantidade = data.quantidade
    this.valor_unitario = data.valor_unitario
    this.valor_total = data.valor_total
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
} 