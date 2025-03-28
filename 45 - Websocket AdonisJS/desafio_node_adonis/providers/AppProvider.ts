import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { startSocketServer } from '../start/ws'

export default class AppProvider {
  constructor (protected app: ApplicationContract) {
  }

  public register () {
    // Register your own bindings
  }

  public async boot () {
    // IoC container is ready
  }

  public async ready () {
    if (this.app.environment === 'console') {
      console.log('Iniciando WS no modo scheduler')
      startSocketServer()
    } else {
      console.log('Iniciando WS no modo web')
      await import('../start/ws')
    }
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}
