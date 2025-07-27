import { useYjs } from './hooks/useYjs'
import { Header } from './components/header'
import { TextEditor } from './components/editor/text-editor'
import { LoadingSpinner } from './components/ui/loading-spinner'

function App() {
  const { text, isConnected, isLoading } = useYjs('collaborative-doc')

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="lg" />
          <p className="text-gray-600">Connecting to document...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isConnected={isConnected} 
        isLoading={isLoading}
        documentTitle="Collaborative Document"
      />
      
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <TextEditor text={text} />
        </div>
      </main>
    </div>
  )
}

export default App