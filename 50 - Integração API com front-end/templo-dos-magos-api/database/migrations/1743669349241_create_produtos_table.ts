import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'produtos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome', 50).notNullable()
      table.decimal('preco', 10, 2).notNullable()
      table.text('descricao').notNullable()
      table.string('url_imagem', 255).notNullable()
      table.integer('categoria_id')
        .unsigned()
        .references('id')
        .inTable('categorias')
        .onDelete('CASCADE')
        .nullable()
        .defaultTo(null)

      table.timestamp('criado_em').defaultTo(this.now())
      table.timestamp('atualizado_em').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}