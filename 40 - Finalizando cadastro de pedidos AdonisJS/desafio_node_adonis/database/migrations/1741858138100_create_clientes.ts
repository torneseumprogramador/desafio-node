import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'clientes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome', 100).notNullable()
      table.string('whatsapp', 20).notNullable()
      table.string('cep', 10).notNullable()
      table.string('logradouro', 200)
      table.string('numero', 10)
      table.string('complemento', 100)
      table.string('bairro', 100)
      table.string('cidade', 100)
      table.string('estado', 2)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
