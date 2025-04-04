import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'categorias'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome', 50).notNullable()
      table.string('cor', 50).notNullable()
      table.string('slug', 60).notNullable().unique()

      table.timestamp('criado_em').defaultTo(this.now())
      table.timestamp('atualizado_em').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}