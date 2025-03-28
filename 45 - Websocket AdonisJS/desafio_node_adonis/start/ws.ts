import { Server } from 'socket.io'
import http from 'http'
import Logger from '@ioc:Adonis/Core/Logger'

let io: Server | null = null
let ioReadyResolver: (io: Server) => void
const ioReady = new Promise<Server>((resolve) => {
  ioReadyResolver = resolve
})

let clientes_conectados = {}

export function startSocketServer(server?: http.Server) {
  if (io) return // já inicializado

  if (!server) {
    server = http.createServer()
    server.listen(3030, () => {
      Logger.info('Servidor WS standalone rodando na porta 3030')
    })
  }

  io = new Server(server, {
    cors: { origin: '*' },
  })

  io.on('connection', (socket) => {
    Logger.info('Cliente conectado:', socket.id)

    socket.on('message', async (cliente_id) => {
      Logger.info('Mensagem recebida:', cliente_id)
      clientes_conectados[socket.id] = cliente_id
    //   socket.emit('randomNumber', { message: cliente?.nome, randomNumber })
    })

    socket.on('disconnect', () => {
      Logger.info('Cliente desconectado:', socket.id)
      delete clientes_conectados[socket.id]
    })
  })

  Logger.info('Servidor WS inicializado')
  ioReadyResolver(io)
}

export function getIoInstance() {
  return io
}

export function getClientsConnected() {
  return clientes_conectados
}

export async function waitForIoReady(): Promise<Server> {
  return ioReady
}
