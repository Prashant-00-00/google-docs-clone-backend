import { useState, useEffect } from 'react'
import { Header } from './components/header'
import { TextEditor } from './components/editor/text-editor'
import { useYjs } from './hooks/useYjs'

function App() {
  const [documentTitle, setDocumentTitle] = useState('Untitled document')
  const [documentId] = useState(() => {
    // Get document ID from URL or generate a default one
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('doc') || 'default-document'
  })

  const { ytext, isConnected, isLoading } = useYjs({
    documentId,
    websocketUrl: 'ws://localhost:8080'
  })

  // Update page title when document title changes
  useEffect(() => {
    document.title = documentTitle ? `${documentTitle} - Docs` : 'Docs'
  }, [documentTitle])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        documentTitle={documentTitle}
        onTitleChange={setDocumentTitle}
        isConnected={isConnected}
        isLoading={isLoading}
      />
      
      <main className="h-[calc(100vh-73px)]">
        <TextEditor
          ytext={ytext}
          isConnected={isConnected}
        />
      </main>
    </div>
  )
}

export default App