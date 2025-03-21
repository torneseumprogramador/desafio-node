import Database from '@ioc:Adonis/Lucid/Database'
import { IPedidoProduto } from 'App/Interfaces/IPedidoProduto'

export class PedidoProdutoRepository {
  private table = 'pedidos_produtos'
  public async create(data: Omit<IPedidoProduto, 'id'>): Promise<void> {
    const { produto, ...dataToInsert } = data
    await Database.table(this.table).insert(dataToInsert)
  }

  public async findByPedidoId(pedidoId: number): Promise<IPedidoProduto[]> {
    return await Database
      .from(this.table)
      .innerJoin('produtos', 'produtos.id', `${this.table}.produto_id`)
      .select([
        `${this.table}.*`,
        'produtos.id as produto_id',
        'produtos.nome as produto_nome',
        'produtos.descricao as produto_descricao',
        'produtos.valor as produto_valor'
      ])
      .where(`${this.table}.pedido_id`, pedidoId)
      .then(rows => rows.map(row => ({
        ...row,
        produto: {
          id: row.produto_id,
          nome: row.produto_nome,
          descricao: row.produto_descricao,
          valor: row.produto_valor
        }
      })))
  }

  public async deleteByPedidoId(pedidoId: number): Promise<void> {
    await Database.from(this.table).where('pedido_id', pedidoId).delete()
  }
} 