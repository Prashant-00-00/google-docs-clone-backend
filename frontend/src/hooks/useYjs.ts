import { useEffect, useRef, useState } from 'react'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

interface UseYjsProps {
  documentId: string
  websocketUrl?: string
}

export function useYjs({ documentId, websocketUrl = 'ws://localhost:8080' }: UseYjsProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const ydocRef = useRef<Y.Doc | null>(null)
  const providerRef = useRef<WebsocketProvider | null>(null)
  const ytextRef = useRef<Y.Text | null>(null)

  useEffect(() => {
    // Initialize Yjs document
    const ydoc = new Y.Doc()
    ydocRef.current = ydoc

    // Get shared text type
    const ytext = ydoc.getText('shared-text')
    ytextRef.current = ytext

    // Initialize WebSocket provider
    const provider = new WebsocketProvider(
      `${websocketUrl}/${documentId}`,
      documentId,
      ydoc
    )
    providerRef.current = provider

    // Connection event handlers
    provider.on('status', (event: { status: string }) => {
      setIsConnected(event.status === 'connected')
      if (event.status === 'connected') {
        setIsLoading(false)
      }
    })

    provider.on('connection-error', () => {
      setIsConnected(false)
      setIsLoading(false)
    })

    // Cleanup function
    return () => {
      provider.destroy()
      ydoc.destroy()
    }
  }, [documentId, websocketUrl])

  return {
    ydoc: ydocRef.current,
    ytext: ytextRef.current,
    provider: providerRef.current,
    isConnected,
    isLoading,
  }
}