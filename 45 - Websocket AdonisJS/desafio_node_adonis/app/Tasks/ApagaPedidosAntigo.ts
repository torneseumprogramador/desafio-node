import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import { PedidoRepository } from '../Repositories/PedidoRepository'

export default class ApagaPedidosAntigo extends BaseTask {
  public static get schedule() {
    // return CronTimeV2.everySecond() // a cada segundo
    // return CronTimeV2.everyMinute() // a cada minuto
    // return CronTimeV2.everyHour() // a cada hora
    // return CronTimeV2.everyDay() // a cada dia
    // return CronTimeV2.everyWeek() // a cada semana
    // return CronTimeV2.everyMonth() // a cada mês
    // return CronTimeV2.everyYear() // a cada ano

    // return CronTimeV2.everyDayAt('00:00') // a cada dia às 00:00
    // return CronTimeV2.everyWeekAt('00:00') // a cada semana às 00:00
    // return CronTimeV2.everyMonthAt('00:00') // a cada mês às 00:00
    // return CronTimeV2.everyYearAt('00:00') // a cada ano às 00:00

    return CronTimeV2.everySecond() // a cada segundo
  }

  public static get useLock() {
    return true
  }

  public async handle() {
    // const now = new Date()
    // const startDate = now.toISOString().replace('T', ' ').substring(0, 19)
    // this.logger.info(`Apagando pedidos antigos at ${startDate}`)

    // // ===== simula um processamento demorado
    // // await new Promise((res) => setTimeout(res, 2000))

    // const pedidoRepository = new PedidoRepository()
    // const currentYear = new Date().getFullYear()
    // await pedidoRepository.deleteOldOrders(currentYear)

    // const endDate = now.toISOString().replace('T', ' ').substring(0, 19)
    // this.logger.info(`pedidos antigos apagados com sucesso at ${endDate}`)

  }
}
