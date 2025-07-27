import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Wifi, WifiOff } from "lucide-react"

interface ConnectionStatusProps {
  isConnected: boolean
  isLoading: boolean
}

export function ConnectionStatus({ isConnected, isLoading }: ConnectionStatusProps) {
  if (isLoading) {
    return (
      <Badge variant="secondary" className="flex items-center gap-2">
        <LoadingSpinner size="sm" />
        Connecting...
      </Badge>
    )
  }

  return (
    <Badge variant={isConnected ? "default" : "destructive"} className="flex items-center gap-2">
      {isConnected ? (
        <>
          <Wifi className="w-3 h-3" />
          Connected
        </>
      ) : (
        <>
          <WifiOff className="w-3 h-3" />
          Disconnected
        </>
      )}
    </Badge>
  )
}