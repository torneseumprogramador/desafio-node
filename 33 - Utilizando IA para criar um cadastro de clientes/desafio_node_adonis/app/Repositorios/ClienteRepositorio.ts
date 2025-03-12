import { Database } from '@adonisjs/lucid/database'
import { Cliente, ICliente } from '../Entidades/Cliente'

export class ClienteRepositorio {
  private table = 'clientes'

  async listar(): Promise<Cliente[]> {
    const clientes = await Database.from(this.table).select('*')
    return clientes.map(cliente => new Cliente(cliente))
  }

  async buscarPorId(id: number): Promise<Cliente | null> {
    const cliente = await Database.from(this.table).where('id', id).first()
    return cliente ? new Cliente(cliente) : null
  }

  async criar(cliente: ICliente): Promise<Cliente> {
    const [id] = await Database.table(this.table).insert(cliente)
    return this.buscarPorId(id) as Promise<Cliente>
  }

  async atualizar(id: number, cliente: Partial<ICliente>): Promise<Cliente | null> {
    await Database.from(this.table).where('id', id).update(cliente)
    return this.buscarPorId(id)
  }

  async deletar(id: number): Promise<boolean> {
    const deleted = await Database.from(this.table).where('id', id).delete()
    return deleted > 0
  }
} 