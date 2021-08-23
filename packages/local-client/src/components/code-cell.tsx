import { useEffect } from 'react'
import { Cell } from '../state'
import { useActions } from '../state/hooks/use-actions'
import { useTypedSelector } from '../state/hooks/use-typed-selector'
import CodeEditor from './code-editor'
import Preview from './preview'
import Resizable from './resizable'
import './code-cell.css'
import useCumulativeCode from '../state/hooks/use-cumulative-code'

const CodeCell: React.FC<{
  cell: Cell
}> = ({ cell }) => {
  const bundle = useTypedSelector((state) => state.bundles[cell.id])
  const cumulativeCode = useCumulativeCode(cell.id)
  const { updateCell, createBundle } = useActions()

  const submitCode = (value: string) => {
    updateCell(cell.id, value)
  }

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode)
      return
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }

    // eslint-disable-next-line
  }, [cumulativeCode, cell.id, createBundle])

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            handleChange={(value) => updateCell(cell.id, value)}
            submitCode={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.error || ''} />
          )}
        </div>
      </div>
    </Resizable>
  )
}

export default CodeCell
