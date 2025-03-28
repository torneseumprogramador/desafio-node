// app/Tasks/EnviaDadosWebSocket.ts
import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import { WebSocketService } from 'App/Services/WebSocketService'

export default class EnviaDadosWebSocket extends BaseTask {
  public static get schedule() {
    return CronTimeV2.everyTenSeconds()
  }

  public static get useLock() {
    return false
  }

  public async handle() {
    console.log('Iniciando WebSocket...');
    const ws = new WebSocketService()
    const numero_sorteado = Math.floor(Math.random() * 100) + 1
    await ws.sendMessage(numero_sorteado)
    this.logger.info('Mensagem enviada')
  }
}
