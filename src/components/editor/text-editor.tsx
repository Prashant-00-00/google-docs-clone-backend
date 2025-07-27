import { useEffect, useRef, useCallback } from 'react'
import * as Y from 'yjs'
import { Toolbar } from './toolbar'
import { cn } from "@/lib/utils"

interface TextEditorProps {
  text: Y.Text | null
  className?: string
}

export function TextEditor({ text, className }: TextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const isUpdatingRef = useRef(false)

  const handleFormat = useCallback((command: string) => {
    document.execCommand(command, false)
    editorRef.current?.focus()
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
    const ctrlKey = isMac ? e.metaKey : e.ctrlKey

    if (ctrlKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault()
          handleFormat('bold')
          break
        case 'i':
          e.preventDefault()
          handleFormat('italic')
          break
        case 'u':
          e.preventDefault()
          handleFormat('underline')
          break
      }
    }
  }, [handleFormat])

  useEffect(() => {
    const editor = editorRef.current
    if (!editor || !text) return

    const updateYText = () => {
      if (isUpdatingRef.current) return
      
      const content = editor.innerText || ''
      if (text.toString() !== content) {
        text.delete(0, text.length)
        text.insert(0, content)
      }
    }

    const updateEditor = () => {
      if (isUpdatingRef.current) return
      
      isUpdatingRef.current = true
      const content = text.toString()
      if (editor.innerText !== content) {
        editor.innerText = content
      }
      isUpdatingRef.current = false
    }

    // Listen for Yjs changes
    text.observe(updateEditor)
    
    // Listen for editor changes
    editor.addEventListener('input', updateYText)
    editor.addEventListener('keydown', handleKeyDown)

    // Initial sync
    updateEditor()

    return () => {
      text.unobserve(updateEditor)
      editor.removeEventListener('input', updateYText)
      editor.removeEventListener('keydown', handleKeyDown)
    }
  }, [text, handleKeyDown])

  return (
    <div className={cn("border rounded-lg overflow-hidden bg-white", className)}>
      <Toolbar onFormat={handleFormat} />
      <div
        ref={editorRef}
        contentEditable
        className="editor-content"
        style={{ minHeight: '500px' }}
        suppressContentEditableWarning={true}
      />
    </div>
  )
}