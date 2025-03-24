import { IAdministrador } from 'App/Interfaces/IAdministrador'
import Database from '@ioc:Adonis/Lucid/Database'
import { Administrador } from 'App/Entities/Administrador'
import { IPaginatedData } from 'App/Interfaces/IPaginatedData'
export class AdministradorRepository {
  private table = 'administradores'

  public async create(data: IAdministrador): Promise<IAdministrador> {
    const [administrador] = await Database.table(this.table).insert(data).returning('*')
    return administrador
  }

  public async findById(id: number): Promise<IAdministrador | null> {
    const [administrador] = await Database.from(this.table).where('id', id).select('*')
    return administrador || null
  }

  public async findByEmail(email: string): Promise<IAdministrador | null> {
    const [administrador] = await Database.from(this.table).where('email', email).select('*')
    return administrador || null
  }

  public async update(id: number, data: Partial<IAdministrador>): Promise<IAdministrador | null> {
    const [administrador] = await Database.from(this.table)
      .where('id', id)
      .update(data)
      .returning('*')
    return administrador || null
  }

  public async delete(id: number): Promise<boolean> {
    const result = await Database.from(this.table).where('id', id).delete()
    return result.length > 0
  }

  public async list(): Promise<IAdministrador[]> {
    return await Database.from(this.table).select('*')
  }

  public async paginate(page: number = 1, limit: number = 10, search?: string): Promise<IPaginatedData<Administrador>> {
    const offset = (page - 1) * limit
    
    let query = Database.from(this.table)
    
    if (search) {
      query = query.whereILike('nome', `%${search}%`)
    }
    
    const [countResult] = await query.clone().count('* as total')
    const total = Number(countResult.total)
    
    const administradores = await query
      .select('*')
      .orderBy('nome', 'asc')
      .offset(offset)
      .limit(limit)
    
    const lastPage = Math.ceil(total / limit)
    
    return {
      data: administradores.map(cliente => new Administrador(cliente)),
      meta: {
        total,
        per_page: limit,
        current_page: page,
        last_page: lastPage
      }
    }
  }

  public async deleteMultiple(ids: number[]): Promise<boolean> {
    const affectedRows = await Database.from(this.table).whereIn('id', ids).delete()
    return Number(affectedRows[0]) > 0
  }
} 