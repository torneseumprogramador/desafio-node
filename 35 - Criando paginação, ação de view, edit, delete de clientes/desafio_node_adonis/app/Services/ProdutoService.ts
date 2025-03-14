import { ProdutoRepository } from 'App/Repositories/ProdutoRepository'
import { IProduto } from 'App/Interfaces/IProduto'

export class ProdutoService {
  private repository: ProdutoRepository

  constructor() {
    this.repository = new ProdutoRepository()
  }

  private validateRequiredFields(data: Partial<IProduto>): void {
    const requiredFields = ['nome', 'valor', 'quantidade']
    
    for (const field of requiredFields) {
      if (data[field as keyof IProduto] === undefined) {
        throw new Error(`O campo ${field} é obrigatório`)
      }
    }

    // Validação específica para valor
    if (data.valor !== undefined && data.valor <= 0) {
      throw new Error('O valor do produto deve ser maior que zero')
    }

    // Validação específica para quantidade
    if (data.quantidade !== undefined && data.quantidade < 0) {
      throw new Error('A quantidade do produto não pode ser negativa')
    }
  }

  public async findAll(): Promise<IProduto[]> {
    return this.repository.findAll()
  }

  public async count(): Promise<number> {
    return this.repository.count()
  }

  public async findById(id: number): Promise<IProduto | null> {
    return this.repository.findById(id)
  }

  public async create(data: Omit<IProduto, 'id' | 'created_at' | 'updated_at'>): Promise<IProduto> {
    this.validateRequiredFields(data)
    return this.repository.create(data)
  }

  public async update(id: number, data: Partial<Omit<IProduto, 'id' | 'created_at' | 'updated_at'>>): Promise<IProduto | null> {
    if (Object.keys(data).length === 0) {
      throw new Error('Nenhum campo para atualizar')
    }

    this.validateRequiredFields(data)
    return this.repository.update(id, data)
  }

  public async delete(id: number): Promise<boolean> {
    return this.repository.delete(id)
  }
} 