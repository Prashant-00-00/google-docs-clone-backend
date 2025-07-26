import * as Y from 'yjs'
import { encodeAwarenessUpdate, applyAwarenessUpdate } from 'y-protocols/awareness.js'
import * as encoding from 'lib0/encoding.js'
import * as decoding from 'lib0/decoding.js'
import * as map from 'lib0/map.js'
import * as syncProtocol from 'y-protocols/sync.js'

const messageSync = 0
const messageAwareness = 1

const docs = new Map()

export function getYDoc(docName) {
  if (!docs.has(docName)) {
    const ydoc = new Y.Doc()
    docs.set(docName, ydoc)
  }
  return docs.get(docName)
}

export function setupWSConnection(ws, req, { doc }) {
  const awareness = new Map()
  let isAlive = true

  ws.binaryType = 'arraybuffer'

  // Send initial sync step 1
  const encoder = encoding.createEncoder()
  encoding.writeVarUint(encoder, messageSync)
  syncProtocol.writeSyncStep1(encoder, doc)
  ws.send(encoding.toUint8Array(encoder))

  ws.on('message', (data) => {
    const message = new Uint8Array(data)
    const decoder = decoding.createDecoder(message)
    const encoder = encoding.createEncoder()
    const messageType = decoding.readVarUint(decoder)

    if (messageType === messageSync) {
      const syncMessageType = syncProtocol.readSyncMessage(decoder, encoder, doc, ws)
      if (encoding.length(encoder) > 1) {
        ws.send(encoding.toUint8Array(encoder))
      }
    } else if (messageType === messageAwareness) {
      const update = decoding.readVarUint8Array(decoder)
      applyAwarenessUpdate(awareness, update, ws)
    }
  })

  ws.on('pong', () => {
    isAlive = true
  })

  ws.on('close', () => {
    for (const [key, value] of docs.entries()) {
      if (value === doc) {
        docs.delete(key)
        break
      }
    }
  })
}
