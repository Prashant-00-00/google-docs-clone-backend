import { Wifi, WifiOff } from 'lucide-react'
import { cn } from "@/lib/utils"

interface ConnectionStatusProps {
  isConnected: boolean
  isLoading: boolean
  className?: string
}

export function ConnectionStatus({ isConnected, isLoading, className }: ConnectionStatusProps) {
  if (isLoading) {
    return (
      <div className={cn("flex items-center gap-2 text-sm text-gray-500", className)}>
        <div className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse" />
        Connecting...
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-2 text-sm", className)}>
      {isConnected ? (
        <>
          <Wifi className="h-4 w-4 text-green-600" />
          <span className="text-green-600">Connected</span>
        </>
      ) : (
        <>
          <WifiOff className="h-4 w-4 text-red-600" />
          <span className="text-red-600">Disconnected</span>
        </>
      )}
    </div>
  )
}