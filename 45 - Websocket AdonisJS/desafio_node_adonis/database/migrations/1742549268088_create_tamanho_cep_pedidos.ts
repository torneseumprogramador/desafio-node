import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'pedidos'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('endereco_entrega_cep', 10).notNullable().alter()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('endereco_entrega_cep', 8).notNullable().alter()
    })
  }
}
