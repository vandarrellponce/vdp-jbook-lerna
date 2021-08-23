import MDEditor from '@uiw/react-md-editor'
import { useEffect, useRef, useState } from 'react'
import { Cell } from '../state'
import { useActions } from '../state/hooks/use-actions'
import './text-editor.css'

const TextEditor: React.FC<{
  cell: Cell
}> = ({ cell }) => {
  const [editing, setEditing] = useState(false)
  const editingDivRef = useRef<HTMLDivElement | null>(null)

  const { updateCell } = useActions()

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        editingDivRef.current &&
        event.target &&
        !editingDivRef.current.contains(event.target as Node)
      ) {
        setEditing(false)
      }
    }

    document.addEventListener('click', listener, { capture: true })

    return () =>
      document.removeEventListener('click', listener, { capture: true })
  }, [])

  if (editing) {
    return (
      <div className="text-editor" ref={editingDivRef}>
        <MDEditor
          value={cell.content}
          onChange={(text) => updateCell(cell.id, text || '')}
        />
      </div>
    )
  } else {
    return (
      <div className="text-editor card" onClick={() => setEditing(true)}>
        <div className="card-content">
          <MDEditor.Markdown source={cell.content || 'Click to Edit'} />
        </div>
      </div>
    )
  }
}

export default TextEditor
