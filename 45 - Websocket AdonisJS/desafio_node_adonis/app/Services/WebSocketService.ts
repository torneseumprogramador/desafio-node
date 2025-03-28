// app/Services/WebSocketService.ts
import { waitForIoReady, getClientsConnected } from '../../start/ws'
import { ClienteService } from './ClienteService'

export class WebSocketService {
  public async sendMessage(numero_sorteado: number) {
    const io = await waitForIoReady()

    const clientes_conectados = getClientsConnected()
    for (const socketId in clientes_conectados) {
        const cliente_id = clientes_conectados[socketId]
        console.log("--------------------------------")
        console.log("cliente_id", cliente_id)
        console.log("socketId", socketId)
        console.log("numero_sorteado", numero_sorteado)
        console.log("--------------------------------")

        if(!cliente_id) continue

        const clienteService = new ClienteService()
        const cliente = await clienteService.findById(Number(cliente_id))

        if(!cliente) {
            delete clientes_conectados[socketId]
            continue
        }

        const clienteView = {
            nome: cliente?.nome,
            id: cliente?.id,
        }

        io.to(socketId).emit('randomNumber', {
            cliente: clienteView,
            randomNumber: numero_sorteado,
        })
    }
  }
}

