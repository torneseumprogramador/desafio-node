import Database from '@ioc:Adonis/Lucid/Database'
import { IPedidoProduto } from 'App/Interfaces/IPedidoProduto'

export class PedidoProdutoRepository {
  private table = 'pedidos_produtos'

  public async create(data: Omit<IPedidoProduto, 'id'>): Promise<void> {
    await Database.table(this.table).insert(data)
  }

  public async findByPedidoId(pedidoId: number): Promise<IPedidoProduto[]> {
    return await Database.from(this.table).where('pedido_id', pedidoId)
  }

  public async deleteByPedidoId(pedidoId: number): Promise<void> {
    await Database.from(this.table).where('pedido_id', pedidoId).delete()
  }
} 