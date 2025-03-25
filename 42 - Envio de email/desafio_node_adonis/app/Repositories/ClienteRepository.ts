import { Cliente } from 'App/Entities/Cliente'
import { ICliente } from 'App/Interfaces/ICliente'
import { IPaginatedData } from 'App/Interfaces/IPaginatedData'
import Database from '@ioc:Adonis/Lucid/Database'

export class ClienteRepository {
  private table = 'clientes'

  public async findAll(): Promise<Cliente[]> {
    const clientes = await Database.from(this.table).select('*').orderBy('nome', 'asc')
    return clientes.map(cliente => new Cliente(cliente))
  }

  public async paginate(page: number = 1, limit: number = 10, search?: string): Promise<IPaginatedData<Cliente>> {
    const offset = (page - 1) * limit
    
    let query = Database.from(this.table)
    
    if (search) {
      query = query.whereILike('nome', `%${search}%`)
    }
    
    const [countResult] = await query.clone().count('* as total')
    const total = Number(countResult.total)
    
    const clientes = await query
      .select('*')
      .orderBy('nome', 'asc')
      .offset(offset)
      .limit(limit)
    
    const lastPage = Math.ceil(total / limit)
    
    return {
      data: clientes.map(cliente => new Cliente(cliente)),
      meta: {
        total,
        per_page: limit,
        current_page: page,
        last_page: lastPage
      }
    }
  }

  public async count(): Promise<number> {
    const count = await Database.from(this.table).count('* as total')
    return count[0].total
  }
  
  public async findById(id: number): Promise<Cliente | null> {
    const cliente = await Database.from(this.table).where('id', id).first()
    return cliente ? new Cliente(cliente) : null
  }

  public async create(data: Omit<ICliente, 'id' | 'created_at' | 'updated_at'>): Promise<Cliente> {
    const [id] = await Database.table(this.table).insert({
      ...data,
      created_at: new Date(),
      updated_at: new Date()
    })
    const cliente = await this.findById(id)
    if (!cliente) throw new Error('Erro ao criar cliente')
    return cliente
  }

  public async update(id: number, data: Partial<Omit<ICliente, 'id' | 'created_at' | 'updated_at'>>): Promise<Cliente | null> {
    await Database.from(this.table)
      .where('id', id)
      .update({
        ...data,
        updated_at: new Date()
      })
    return this.findById(id)
  }

  public async delete(id: number): Promise<boolean> {
    const affectedRows = await Database.from(this.table).where('id', id).delete()
    return Number(affectedRows[0]) > 0
  }

  public async deleteMultiple(ids: number[]): Promise<boolean> {
    const affectedRows = await Database.from(this.table).whereIn('id', ids).delete()
    return Number(affectedRows[0]) > 0
  }
} 