import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ConnectionStatus } from "@/components/ui/connection-status"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  FileText, 
  Share2, 
  Download, 
  Settings,
  User
} from "lucide-react"

interface HeaderProps {
  documentTitle: string
  onTitleChange: (title: string) => void
  isConnected: boolean
  isLoading: boolean
}

export function Header({ 
  documentTitle, 
  onTitleChange, 
  isConnected, 
  isLoading 
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-white">
      {/* Left section - Logo and document title */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-600" />
          <span className="font-semibold text-lg">Docs</span>
        </div>
        
        <div className="flex flex-col">
          <Input
            value={documentTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            className="text-lg font-medium border-none shadow-none p-0 h-auto focus-visible:ring-0"
            placeholder="Untitled document"
            disabled={!isConnected}
          />
          <div className="flex items-center gap-2 mt-1">
            <ConnectionStatus isConnected={isConnected} isLoading={isLoading} />
          </div>
        </div>
      </div>

      {/* Right section - Actions and user */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" disabled={!isConnected}>
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        
        <Button variant="ghost" size="sm" disabled={!isConnected}>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
        
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
        
        <Avatar className="w-8 h-8">
          <AvatarFallback>
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}