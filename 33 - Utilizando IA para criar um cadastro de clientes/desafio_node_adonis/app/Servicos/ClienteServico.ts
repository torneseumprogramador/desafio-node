import { Cliente, ICliente } from '../Entidades/Cliente'
import { ClienteRepositorio } from '../Repositorios/ClienteRepositorio'

export class ClienteServico {
  private repositorio: ClienteRepositorio

  constructor() {
    this.repositorio = new ClienteRepositorio()
  }

  async listar(): Promise<Cliente[]> {
    return this.repositorio.listar()
  }

  async buscarPorId(id: number): Promise<Cliente | null> {
    return this.repositorio.buscarPorId(id)
  }

  async criar(cliente: ICliente): Promise<Cliente> {
    this.validarCliente(cliente)
    return this.repositorio.criar(cliente)
  }

  async atualizar(id: number, cliente: Partial<ICliente>): Promise<Cliente | null> {
    if (cliente.nome) this.validarNome(cliente.nome)
    if (cliente.whatsapp) this.validarWhatsapp(cliente.whatsapp)
    if (cliente.cep) this.validarCep(cliente.cep)
    
    return this.repositorio.atualizar(id, cliente)
  }

  async deletar(id: number): Promise<boolean> {
    return this.repositorio.deletar(id)
  }

  private validarCliente(cliente: ICliente): void {
    this.validarNome(cliente.nome)
    this.validarWhatsapp(cliente.whatsapp)
    this.validarCep(cliente.cep)
    
    if (!cliente.logradouro) throw new Error('Logradouro é obrigatório')
    if (!cliente.numero) throw new Error('Número é obrigatório')
    if (!cliente.bairro) throw new Error('Bairro é obrigatório')
    if (!cliente.cidade) throw new Error('Cidade é obrigatória')
    if (!cliente.estado) throw new Error('Estado é obrigatório')
  }

  private validarNome(nome: string): void {
    if (!nome) throw new Error('Nome é obrigatório')
    if (nome.length < 3) throw new Error('Nome deve ter no mínimo 3 caracteres')
    if (nome.length > 100) throw new Error('Nome deve ter no máximo 100 caracteres')
  }

  private validarWhatsapp(whatsapp: string): void {
    if (!whatsapp) throw new Error('WhatsApp é obrigatório')
    const whatsappRegex = /^\(\d{2}\) \d{5}-\d{4}$/
    if (!whatsappRegex.test(whatsapp)) {
      throw new Error('WhatsApp deve estar no formato (99) 99999-9999')
    }
  }

  private validarCep(cep: string): void {
    if (!cep) throw new Error('CEP é obrigatório')
    const cepRegex = /^\d{5}-\d{3}$/
    if (!cepRegex.test(cep)) {
      throw new Error('CEP deve estar no formato 99999-999')
    }
  }
} 