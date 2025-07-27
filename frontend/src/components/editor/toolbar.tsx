import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo
} from "lucide-react"

interface ToolbarProps {
  onFormat: (format: string) => void
  disabled?: boolean
}

export function Toolbar({ onFormat, disabled = false }: ToolbarProps) {
  const formatButtons = [
    { icon: Bold, action: 'bold', label: 'Bold' },
    { icon: Italic, action: 'italic', label: 'Italic' },
    { icon: Underline, action: 'underline', label: 'Underline' },
  ]

  const alignButtons = [
    { icon: AlignLeft, action: 'align-left', label: 'Align Left' },
    { icon: AlignCenter, action: 'align-center', label: 'Align Center' },
    { icon: AlignRight, action: 'align-right', label: 'Align Right' },
  ]

  const listButtons = [
    { icon: List, action: 'bullet-list', label: 'Bullet List' },
    { icon: ListOrdered, action: 'ordered-list', label: 'Numbered List' },
    { icon: Quote, action: 'blockquote', label: 'Quote' },
  ]

  const historyButtons = [
    { icon: Undo, action: 'undo', label: 'Undo' },
    { icon: Redo, action: 'redo', label: 'Redo' },
  ]

  return (
    <div className="flex items-center gap-1 p-2 border-b bg-white sticky top-0 z-10">
      {/* History buttons */}
      <div className="flex items-center gap-1">
        {historyButtons.map(({ icon: Icon, action, label }) => (
          <Button
            key={action}
            variant="ghost"
            size="sm"
            onClick={() => onFormat(action)}
            disabled={disabled}
            title={label}
            className="h-8 w-8 p-0"
          >
            <Icon className="w-4 h-4" />
          </Button>
        ))}
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Format buttons */}
      <div className="flex items-center gap-1">
        {formatButtons.map(({ icon: Icon, action, label }) => (
          <Button
            key={action}
            variant="ghost"
            size="sm"
            onClick={() => onFormat(action)}
            disabled={disabled}
            title={label}
            className="h-8 w-8 p-0"
          >
            <Icon className="w-4 h-4" />
          </Button>
        ))}
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Alignment buttons */}
      <div className="flex items-center gap-1">
        {alignButtons.map(({ icon: Icon, action, label }) => (
          <Button
            key={action}
            variant="ghost"
            size="sm"
            onClick={() => onFormat(action)}
            disabled={disabled}
            title={label}
            className="h-8 w-8 p-0"
          >
            <Icon className="w-4 h-4" />
          </Button>
        ))}
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* List buttons */}
      <div className="flex items-center gap-1">
        {listButtons.map(({ icon: Icon, action, label }) => (
          <Button
            key={action}
            variant="ghost"
            size="sm"
            onClick={() => onFormat(action)}
            disabled={disabled}
            title={label}
            className="h-8 w-8 p-0"
          >
            <Icon className="w-4 h-4" />
          </Button>
        ))}
      </div>
    </div>
  )
}