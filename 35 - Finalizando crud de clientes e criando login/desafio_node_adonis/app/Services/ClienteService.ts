import { ClienteRepository } from 'App/Repositories/ClienteRepository'
import { ICliente } from 'App/Interfaces/ICliente'
import { IPaginatedData } from 'App/Interfaces/IPaginatedData'

export class ClienteService {
  private repository: ClienteRepository

  constructor() {
    this.repository = new ClienteRepository()
  }

  private validateRequiredFields(data: Partial<ICliente>): void {
    const requiredFields = ['nome', 'whatsapp']
    
    for (const field of requiredFields) {
      if (!data[field as keyof ICliente]) {
        throw new Error(`O campo ${field} é obrigatório`)
      }
    }

    // Validação específica para WhatsApp
    if (data.whatsapp && !/^\d{10,11}$/.test(data.whatsapp.replace(/\D/g, ''))) {
      throw new Error('WhatsApp inválido. Deve conter 10 ou 11 dígitos numéricos')
    }

    // Validação do formato do WhatsApp
    if (data.whatsapp && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(data.whatsapp)) {
      throw new Error('WhatsApp inválido. Formato esperado: (00) 00000-0000 ou (00) 0000-0000')
    }

    // Validação específica para CEP
    if (data.cep && !/^\d{5}-?\d{3}$/.test(data.cep)) {
      throw new Error('CEP inválido. Formato esperado: 00000-000')
    }

    // Validação específica para Estado
    if (data.estado && !/^[A-Z]{2}$/.test(data.estado)) {
      throw new Error('Estado inválido. Deve ser a sigla com 2 letras maiúsculas')
    }
  }

  public async findAll(): Promise<ICliente[]> {
    return this.repository.findAll()
  }

  public async count(): Promise<number> {
    return this.repository.count()
  }
  
  public async findById(id: number): Promise<ICliente | null> {
    return this.repository.findById(id)
  }

  public async create(data: Omit<ICliente, 'id' | 'created_at' | 'updated_at'>): Promise<ICliente> {
    this.validateRequiredFields(data)
    return this.repository.create(data)
  }

  public async update(id: number, data: Partial<Omit<ICliente, 'id' | 'created_at' | 'updated_at'>>): Promise<ICliente | null> {
    if (Object.keys(data).length === 0) {
      throw new Error('Nenhum campo para atualizar')
    }

    this.validateRequiredFields(data)
    return this.repository.update(id, data)
  }

  public async delete(id: number): Promise<boolean> {
    const cliente = await this.findById(id)
    if (!cliente) {
      throw new Error('Cliente não encontrado')
    }
    return this.repository.delete(id)
  }

  public async paginate(page: number = 1, limit: number = 10): Promise<IPaginatedData<ICliente>> {
    return this.repository.paginate(page, limit)
  }
} 