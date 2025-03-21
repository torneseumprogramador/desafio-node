import { IPedido } from 'App/Interfaces/IPedido'
import { PedidoRepository } from 'App/Repositories/PedidoRepository'
import { Pedido } from 'App/Entities/Pedido'
import { ProdutoService } from './ProdutoService'

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

  private validarProdutos(produtos: any[]): void {
    if (!produtos || produtos.length === 0) {
      throw new Error('É necessário adicionar pelo menos um produto ao pedido')
    }

    produtos.forEach(produto => {
      this.validarCampoObrigatorio(produto.produto_id, 'produto_id')
      this.validarValorNumerico(produto.quantidade, 'quantidade')
    })
  }

  public async create(data: IPedido): Promise<Pedido> {
    this.validarCampoObrigatorio(data.cliente_id, 'cliente')
    data.valor_total = data.valor_total ?? 0
    this.validarCampoObrigatorio(data.status, 'status')
    this.validarEnderecoEntrega(data)
    this.validarProdutos(data.produtos)

    data.produtos = await Promise.all(data.produtos.map(async produto => {
      const produtoDatabase = await new ProdutoService().findById(produto.produto_id)
      if (!produtoDatabase) {
        throw new Error(`Produto (${produto.produto_id}) não encontrado`)
      }

      const quantidade = produto.quantidade
      const valorUnitario = produtoDatabase.valor
      const valorTotalProduto = quantidade * valorUnitario
      data.valor_total = (data.valor_total || 0) + valorTotalProduto

      return {
        produto_id: produto.produto_id,
        quantidade: quantidade,
        valor_unitario: valorUnitario,
        valor_total: valorTotalProduto
      }
    }))

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