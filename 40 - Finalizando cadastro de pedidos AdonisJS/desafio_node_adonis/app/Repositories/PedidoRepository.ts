import { IPedido } from 'App/Interfaces/IPedido'
import { Pedido } from 'App/Entities/Pedido'
import Database from '@ioc:Adonis/Lucid/Database'
import { PedidoProdutoRepository } from 'App/Repositories/PedidoProdutoRepository'

export class PedidoRepository {
  private table = 'pedidos'

  public async count(): Promise<number> {
    const count = await Database.from(this.table).count('* as total')
    return count[0].total
  }

  public async findById(id: number): Promise<Pedido | null> {
    const pedido = await Database.from(this.table)
      .select(
        `${this.table}.*`,
        'clientes.nome as cliente_nome',
        'clientes.whatsapp as cliente_whatsapp'
      )
      .leftJoin('clientes', 'clientes.id', `${this.table}.cliente_id`)
      .where(`${this.table}.id`, id)
      .first()

    if (!pedido) return null

    const pedidoProdutoRepo = new PedidoProdutoRepository()
    const produtos = await pedidoProdutoRepo.findByPedidoId(id)

    const pedidoFormatado = new Pedido({
      ...pedido,
      cliente: {
        id: pedido.cliente_id,
        nome: pedido.cliente_nome,
        whatsapp: pedido.cliente_whatsapp
      },
      produtos
    })
    
    return pedidoFormatado
  }

  public async create(data: Omit<IPedido, 'id' | 'created_at' | 'updated_at'>): Promise<Pedido> {
    const trx = await Database.transaction()

    try {
      const { produtos, cliente, ...pedidoData } = data
      const [id] = await trx.table(this.table).insert({
        ...pedidoData,
        created_at: new Date(),
        updated_at: new Date()
      })
      const pedido = await this.findById(id)
      if (!pedido) throw new Error('Erro ao criar pedido')

      const pedidoProdutoRepo = new PedidoProdutoRepository()
      for (const produto of data.produtos) {
        await pedidoProdutoRepo.create({
          pedido_id: id,
          ...produto
        })
      }

      await trx.commit()
      return pedido
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }

  public async update(id: number, data: Partial<Omit<IPedido, 'id' | 'created_at' | 'updated_at'>>): Promise<Pedido> {
    await Database.from(this.table)
      .where('id', id)
      .update({
        ...data,
        updated_at: new Date()
      })
    const pedido = await this.findById(id)
    if (!pedido) throw new Error('Pedido não encontrado')
    return pedido
  }

  public async delete(id: number): Promise<void> {
    await Database.from(this.table).where('id', id).delete()
  }

  public async findBySearch(search: string | undefined, limit: number, offset: number): Promise<Pedido[]> {
    let query = Database.from(this.table)
      .select(
        `${this.table}.*`,
        'clientes.nome as cliente_nome',
        'clientes.whatsapp as cliente_whatsapp'
      )
      .innerJoin('clientes', `${this.table}.cliente_id`, 'clientes.id')

    if (search) {
      query = query.where((builder) => {
        builder
          .where('clientes.nome', 'like', `%${search}%`)
          .orWhere(`${this.table}.id`, search)
          .orWhere('clientes.whatsapp', 'like', `%${search}%`)
      })
    }

    const pedidos = await query.limit(limit).offset(offset)
    return pedidos.map(pedido => {
      const pedidoTipado = new Pedido(pedido)
      pedidoTipado.cliente = {
        id: pedido.cliente_id,
        nome: pedido.cliente_nome,
        whatsapp: pedido.cliente_whatsapp
      }

      return pedidoTipado
    })
  }

  public async countBySearch(search: string | undefined): Promise<number> {
    let query = Database.from(this.table)
      .count('* as total')
      .innerJoin('clientes', `${this.table}.cliente_id`, 'clientes.id')

    if (search) {
      query = query.where((builder) => {
        builder
          .where('clientes.nome', 'like', `%${search}%`)
          .orWhere(`${this.table}.id`, search)
          .orWhere('clientes.whatsapp', 'like', `%${search}%`)
      })
    }

    const count = await query
    return count[0].total
  }

  public async deleteMultiple(ids: number[]): Promise<void> {
    await Database.from(this.table).whereIn('id', ids).delete()
  }

  public async paginate(page: number, limit: number, search: string = '') {
    const offset = (page - 1) * limit
    const pedidos = await this.findBySearch(search, limit, offset)
    const total = await this.countBySearch(search)
    
    return {
      data: pedidos,
      meta: {
        total,
        per_page: limit,
        current_page: page,
        last_page: Math.ceil(total / limit)
      }
    }
  }
}