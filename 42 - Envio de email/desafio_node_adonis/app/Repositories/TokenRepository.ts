import Database from '@ioc:Adonis/Lucid/Database'

export class TokenRepository {
  public async storeToken(email: string, token: string): Promise<void> {
    await Database.table('password_resets').insert({
      email,
      token,
      created_at: new Date()
    })
  }

  public async deleteToken(token: string): Promise<void> {
    await Database.from('password_resets').where('token', token).delete()
  }

  public async findEmailByToken(token: string): Promise<string | null> {
    const record = await Database
      .from('password_resets')
      .where('token', token)
      .first()

    return record ? record.email : null
  }
} 