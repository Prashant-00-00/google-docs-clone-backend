import { WebSocketServer } from 'ws'
import * as Y from 'yjs'
import * as http from 'http'
import { getYDoc, setupWSConnection } from '../utils/y-websocket.js'

const docs = new Map<string, Y.Doc>()

export function configureWebSocketServer(server: http.Server): void {
  const wss = new WebSocketServer({ server })

  wss.on('connection', (ws, req) => {
    const docName = req.url?.slice(1).split('?')[0] || 'default'
    const ydoc = getYDoc(docName)

    setupWSConnection(ws, req, { doc: ydoc })
  })
}
