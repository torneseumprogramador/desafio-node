import { IAdministrador } from 'App/Interfaces/IAdministrador'
import { AdministradorRepository } from 'App/Repositories/AdministradorRepository'
import Hash from '@ioc:Adonis/Core/Hash'
import { Administrador } from 'App/Entities/Administrador'
import { IPaginatedData } from 'App/Interfaces/IPaginatedData'

export class AdministradorService {
  private repository: AdministradorRepository

  constructor() {
    this.repository = new AdministradorRepository()
  }

  public async create(data: IAdministrador): Promise<IAdministrador> {
    if (!data.nome || !data.email || !data.senha) {
      throw new Error('Nome, email e senha são obrigatórios')
    }

    const administradorExistente = await this.repository.findByEmail(data.email)
    
    if (administradorExistente) {
      throw new Error('Já existe um administrador com este email')
    }

    const senhaHash = await Hash.make(data.senha)
    
    return await this.repository.create({ ...data, senha: senhaHash })
  }

  public async findById(id: number): Promise<IAdministrador | null> {
    return await this.repository.findById(id)
  }

  public async findByEmail(email: string): Promise<IAdministrador | null> {
    return await this.repository.findByEmail(email)
  }

  public async update(id: number, data: Partial<IAdministrador>): Promise<IAdministrador | null> {
    const administrador = await this.repository.findById(id)
    
    if (!administrador || !administrador.id) {
      throw new Error('Administrador não encontrado')
    }

    if (data.email && data.email !== administrador.email) {
      const emailExistente = await this.repository.findByEmail(data.email)
      if (emailExistente) {
        throw new Error('Já existe um administrador com este email')
      }
    }

    if (data.senha) {
      data.senha = await Hash.make(data.senha)
    }

    return await this.repository.update(id, data)
  }

  public async delete(id: number): Promise<boolean> {
    const administrador = await this.repository.findById(id)
    
    if (!administrador || !administrador.id) {
      throw new Error('Administrador não encontrado')
    }

    return await this.repository.delete(id)
  }

  public async list(): Promise<IAdministrador[]> {
    return await this.repository.list()
  }

  public async authenticate(email: string, senha: string): Promise<IAdministrador | null> {
    const administrador = await this.repository.findByEmail(email)
    
    if (!administrador) {
      return null
    }

    const senhaValida = await Hash.verify(administrador.senha, senha)
    
    if (!senhaValida) {
      return null
    }

    return administrador
  }

  public async paginate(page: number = 1, limit: number = 10, search?: string): Promise<IPaginatedData<Administrador>> {
    return this.repository.paginate(page, limit, search)
  }

  public async changePassword(email: string, novaSenha: string, confirmacaoSenha: string): Promise<void> {
    if (!email) {
      throw new Error('Email não pode ser indefinido')
    }

    if (novaSenha !== confirmacaoSenha) {
      throw new Error('As senhas não coincidem')
    }

    if (novaSenha.length < 6) {
      throw new Error('A senha deve ter no mínimo 6 caracteres')
    }

    const administrador = await this.repository.findByEmail(email)
    if (!administrador || !administrador.id) {
      throw new Error('Administrador não encontrado')
    }

    const senhaHash = await Hash.make(novaSenha)
    await this.repository.update(administrador.id, { senha: senhaHash })
  }
} 