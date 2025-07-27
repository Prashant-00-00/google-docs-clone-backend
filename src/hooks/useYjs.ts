import { useEffect, useState, useRef } from 'react'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

export interface UseYjsReturn {
  doc: Y.Doc | null
  provider: WebsocketProvider | null
  text: Y.Text | null
  isConnected: boolean
  isLoading: boolean
}

export function useYjs(documentId: string = 'default-doc'): UseYjsReturn {
  const [doc, setDoc] = useState<Y.Doc | null>(null)
  const [provider, setProvider] = useState<WebsocketProvider | null>(null)
  const [text, setText] = useState<Y.Text | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const initRef = useRef(false)

  useEffect(() => {
    if (initRef.current) return
    initRef.current = true

    const ydoc = new Y.Doc()
    const ytext = ydoc.getText('content')
    
    const wsProvider = new WebsocketProvider('ws://localhost:8080', documentId, ydoc)
    
    wsProvider.on('status', (event: { status: string }) => {
      setIsConnected(event.status === 'connected')
      if (event.status === 'connected') {
        setIsLoading(false)
      }
    })

    wsProvider.on('connection-error', () => {
      setIsConnected(false)
      setIsLoading(false)
    })

    setDoc(ydoc)
    setProvider(wsProvider)
    setText(ytext)

    return () => {
      wsProvider.destroy()
      ydoc.destroy()
    }
  }, [documentId])

  return {
    doc,
    provider,
    text,
    isConnected,
    isLoading
  }
}