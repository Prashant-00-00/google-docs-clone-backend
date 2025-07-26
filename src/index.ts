import express from 'express'
import cors from 'cors'
import http from 'http'
import { configureWebSocketServer } from './config/ws.config'

const app = express()
app.use(cors())

const server = http.createServer(app)
configureWebSocketServer(server)

const PORT = 8080
server.listen(PORT, () => {
  console.log(`🚀 Server listening at ${PORT}`)
})
