import { Cliente } from 'App/Entities/Cliente'
import { ICliente } from 'App/Interfaces/ICliente'
import Database from '@ioc:Adonis/Lucid/Database'

export class ClienteRepository {
  private table = 'clientes'

  public async findAll(): Promise<Cliente[]> {
    const clientes = await Database.from(this.table).select('*')
    return clientes.map(cliente => new Cliente(cliente))
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
    const result = await Database.from(this.table).where('id', id).delete()
    return result.length > 0
  }
} 