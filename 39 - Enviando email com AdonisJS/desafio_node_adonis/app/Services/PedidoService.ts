import { IPedido } from 'App/Interfaces/IPedido'
import { PedidoRepository } from 'App/Repositories/PedidoRepository'
import { Pedido } from 'App/Entities/Pedido'

export class PedidoService {
  private repository: PedidoRepository

  constructor() {
    this.repository = new PedidoRepository()
  }

  private validarCampoObrigatorio(valor: any, campo: string): void {
    if (!valor) {
      throw new Error(`O campo ${campo} é obrigatório`)
    }
  }

  private validarValorNumerico(valor: number, campo: string): void {
    if (!valor || valor <= 0) {
      throw new Error(`O ${campo} deve ser maior que zero`)
    }
  }

  private validarEnderecoEntrega(data: IPedido): void {
    const camposEndereco = {
      logradouro: data.endereco_entrega_logradouro,
      numero: data.endereco_entrega_numero,
      bairro: data.endereco_entrega_bairro,
      cidade: data.endereco_entrega_cidade,
      estado: data.endereco_entrega_estado,
      cep: data.endereco_entrega_cep
    }

    for (const [campo, valor] of Object.entries(camposEndereco)) {
      this.validarCampoObrigatorio(valor, `${campo} do endereço de entrega`)
    }
  }

  public async create(data: IPedido): Promise<Pedido> {
    this.validarCampoObrigatorio(data.cliente_id, 'cliente')
    this.validarValorNumerico(data.valor_total, 'valor total')
    this.validarCampoObrigatorio(data.status, 'status')
    this.validarEnderecoEntrega(data)

    return await this.repository.create(data)
  }

  public async findById(id: number): Promise<Pedido | null> {
    this.validarCampoObrigatorio(id, 'ID')
    return await this.repository.findById(id)
  }

  public async update(id: number, data: Partial<IPedido>): Promise<Pedido> {
    this.validarCampoObrigatorio(id, 'ID')

    const pedido = await this.repository.findById(id)
    if (!pedido) {
      throw new Error('Pedido não encontrado')
    }

    if (data.valor_total) {
      this.validarValorNumerico(data.valor_total, 'valor total')
    }

    return await this.repository.update(id, data)
  }

  public async delete(id: number): Promise<void> {
    this.validarCampoObrigatorio(id, 'ID')

    const pedido = await this.repository.findById(id)
    if (!pedido) {
      throw new Error('Pedido não encontrado')
    }

    await this.repository.delete(id)
  }

  public async deleteMultiple(ids: number[]): Promise<void> {
    if (!ids?.length) {
      throw new Error('É necessário informar pelo menos um ID')
    }

    await this.repository.deleteMultiple(ids)
  }

  public async paginate(page: number, limit: number, search: string = '') {
    this.validarValorNumerico(page, 'página')
    this.validarValorNumerico(limit, 'limite')

    return await this.repository.paginate(page, limit, search)
  }
}