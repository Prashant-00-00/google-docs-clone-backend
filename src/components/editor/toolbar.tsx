import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react'
import { cn } from "@/lib/utils"

interface ToolbarProps {
  onFormat: (command: string) => void
  className?: string
}

export function Toolbar({ onFormat, className }: ToolbarProps) {
  const formatButtons = [
    { icon: Bold, command: 'bold', label: 'Bold (Ctrl+B)' },
    { icon: Italic, command: 'italic', label: 'Italic (Ctrl+I)' },
    { icon: Underline, command: 'underline', label: 'Underline (Ctrl+U)' },
  ]

  const alignButtons = [
    { icon: AlignLeft, command: 'justifyLeft', label: 'Align Left' },
    { icon: AlignCenter, command: 'justifyCenter', label: 'Align Center' },
    { icon: AlignRight, command: 'justifyRight', label: 'Align Right' },
  ]

  return (
    <div className={cn("flex items-center gap-1 p-2 border-b bg-gray-50", className)}>
      <div className="flex items-center gap-1">
        {formatButtons.map(({ icon: Icon, command, label }) => (
          <button
            key={command}
            onClick={() => onFormat(command)}
            className="toolbar-button"
            title={label}
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>
      
      <div className="w-px h-6 bg-gray-300 mx-2" />
      
      <div className="flex items-center gap-1">
        {alignButtons.map(({ icon: Icon, command, label }) => (
          <button
            key={command}
            onClick={() => onFormat(command)}
            className="toolbar-button"
            title={label}
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>
    </div>
  )
}