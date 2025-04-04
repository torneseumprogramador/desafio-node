import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Categoria from './categoria.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Produto extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare preco: number

  @column()
  declare descricao: string

  @column()
  declare url_imagem: string

  @column()
  declare categoria_id: number

  @belongsTo(() => Categoria, {
    foreignKey: 'categoria_id',
  })
  declare categoria: BelongsTo<typeof Categoria>

  @column.dateTime({ autoCreate: true })
  declare criado_em: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare atualizado_em: DateTime
}
