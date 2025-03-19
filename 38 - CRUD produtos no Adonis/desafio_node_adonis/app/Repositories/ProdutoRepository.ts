import { Produto } from 'App/Entities/Produto'
import { IProduto } from 'App/Interfaces/IProduto'
import Database from '@ioc:Adonis/Lucid/Database'

export class ProdutoRepository {
  private table = 'produtos'

  public async findAll(): Promise<Produto[]> {
    const produtos = await Database.from(this.table).select('*')
    return produtos.map(produto => new Produto(produto))
  }

  public async count(): Promise<number> {
    const count = await Database.from(this.table).count('* as total')
    return count[0].total
  }

  public async findById(id: number): Promise<Produto | null> {
    const produto = await Database.from(this.table).where('id', id).first()
    return produto ? new Produto(produto) : null
  }

  public async create(data: Omit<IProduto, 'id' | 'created_at' | 'updated_at'>): Promise<Produto> {
    const [id] = await Database.table(this.table).insert({
      ...data,
      created_at: new Date(),
      updated_at: new Date()
    })
    const produto = await this.findById(id)
    if (!produto) throw new Error('Erro ao criar produto')
    return produto
  }

  public async update(id: number, data: Partial<Omit<IProduto, 'id' | 'created_at' | 'updated_at'>>): Promise<Produto | null> {
    await Database.from(this.table)
      .where('id', id)
      .update({
        ...data,
        updated_at: new Date()
      })
    return this.findById(id)
  }

  public async delete(id: number): Promise<boolean> {
    const result = await Database.from(this.table).where('id', id).delete()
    return result.length > 0
  }

  public async findBySearch(search: string | undefined, limit: number, offset: number): Promise<Produto[]> {
    let query = Database.from(this.table).select('*')

    if (search) {
      query = query.where('nome', 'like', `%${search}%`)
    }

    const produtos = await query.limit(limit).offset(offset)
    return produtos.map(produto => new Produto(produto))
  }

  public async countBySearch(search: string | undefined): Promise<number> {
    let query = Database.from(this.table).count('* as total')

    if (search) {
      query = query.where('nome', 'like', `%${search}%`)
    }

    const count = await query
    return count[0].total
  }
} 