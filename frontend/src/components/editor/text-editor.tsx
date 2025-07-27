import { useEffect, useRef, useState, useCallback } from 'react'
import * as Y from 'yjs'
import { Toolbar } from './toolbar'

interface TextEditorProps {
  ytext: Y.Text | null
  isConnected: boolean
}

export function TextEditor({ ytext, isConnected }: TextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [content, setContent] = useState('')
  const isUpdatingRef = useRef(false)

  // Handle Yjs text changes
  useEffect(() => {
    if (!ytext) return

    const updateContent = () => {
      if (!isUpdatingRef.current) {
        setContent(ytext.toString())
      }
    }

    // Initial content
    updateContent()

    // Listen for changes
    ytext.observe(updateContent)

    return () => {
      ytext.unobserve(updateContent)
    }
  }, [ytext])

  // Handle local text changes
  const handleInput = useCallback((e: React.FormEvent<HTMLDivElement>) => {
    if (!ytext || !editorRef.current) return

    const newContent = e.currentTarget.textContent || ''
    
    if (newContent !== content) {
      isUpdatingRef.current = true
      
      // Replace entire content (simple approach)
      ytext.delete(0, ytext.length)
      ytext.insert(0, newContent)
      
      setContent(newContent)
      
      // Reset flag after a short delay
      setTimeout(() => {
        isUpdatingRef.current = false
      }, 10)
    }
  }, [ytext, content])

  // Handle formatting (placeholder for now)
  const handleFormat = useCallback((format: string) => {
    console.log('Format:', format)
    // TODO: Implement formatting logic
  }, [])

  // Handle key events
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Handle common shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
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

  return (
    <div className="flex flex-col h-full">
      <Toolbar onFormat={handleFormat} disabled={!isConnected} />
      
      <div className="flex-1 p-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div
            ref={editorRef}
            contentEditable={isConnected}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            className="editor-content min-h-[600px] outline-none focus:outline-none"
            style={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}
            suppressContentEditableWarning={true}
          >
            {content || (
              <div className="editor-placeholder text-gray-400">
                {isConnected 
                  ? "Start typing your document..." 
                  : "Connecting to server..."
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}