import { FileText } from 'lucide-react'
import { ConnectionStatus } from './ui/connection-status'

interface HeaderProps {
  isConnected: boolean
  isLoading: boolean
  documentTitle?: string
}

export function Header({ isConnected, isLoading, documentTitle = "Untitled Document" }: HeaderProps) {
  return (
    <header className="border-b bg-white px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-medium text-gray-900">{documentTitle}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <ConnectionStatus isConnected={isConnected} isLoading={isLoading} />
        </div>
      </div>
    </header>
  )
}