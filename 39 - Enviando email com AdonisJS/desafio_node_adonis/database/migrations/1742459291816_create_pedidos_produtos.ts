import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'pedidos_produtos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('pedido_id').unsigned().references('id').inTable('pedidos')
      table.integer('produto_id').unsigned().references('id').inTable('produtos')
      table.integer('quantidade').notNullable()
      table.decimal('valor_unitario', 10, 2).notNullable()
      table.decimal('valor_total', 10, 2).notNullable()

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
