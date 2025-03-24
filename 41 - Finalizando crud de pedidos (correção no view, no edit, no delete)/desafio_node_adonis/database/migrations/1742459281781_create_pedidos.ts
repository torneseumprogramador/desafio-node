import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'pedidos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('cliente_id').unsigned().references('id').inTable('clientes')
      table.decimal('valor_total', 10, 2).notNullable()
      table.string('status', 20).notNullable().defaultTo('pendente')
      table.string('forma_pagamento', 50)
      table.text('observacoes')
      table.date('data_entrega')
      
      table.string('endereco_entrega_logradouro', 255).notNullable()
      table.string('endereco_entrega_numero', 20).notNullable()
      table.string('endereco_entrega_complemento', 100)
      table.string('endereco_entrega_bairro', 100).notNullable()
      table.string('endereco_entrega_cidade', 100).notNullable()
      table.string('endereco_entrega_estado', 2).notNullable()
      table.string('endereco_entrega_cep', 8).notNullable()
      
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
