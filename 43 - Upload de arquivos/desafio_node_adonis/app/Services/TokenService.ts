import { TokenRepository } from 'App/Repositories/TokenRepository'
import { randomBytes } from 'crypto'
import { promisify } from 'util'

const randomBytesAsync = promisify(randomBytes)

export class TokenService {
  private repository: TokenRepository

  constructor() {
    this.repository = new TokenRepository()
  }

  public async generateToken(email: string): Promise<string> {
    const token = (await randomBytesAsync(20)).toString('hex')
    await this.repository.storeToken(email, token)
    return token
  }

  public async invalidateToken(token: string): Promise<void> {
    await this.repository.deleteToken(token)
  }

  public async verifyToken(token: string): Promise<string> {
    if (!token) {
      throw new Error('Token não fornecido')
    }

    const email = await this.repository.findEmailByToken(token)
    if (!email) {
      throw new Error('Token inválido ou expirado')
    }
    return email
  }
} 