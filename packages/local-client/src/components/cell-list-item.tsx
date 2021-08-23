import { Cell } from '../state'
import ActionBar from './actionbar'
import CodeCell from './code-cell'
import TextEditor from './text-editor'
import './cell-list-item.css'

const CellListItem: React.FC<{ cell: Cell }> = ({ cell }) => {
  let child: JSX.Element

  if (cell.type === 'code')
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    )
  else
    child = (
      <>
        <ActionBar id={cell.id} />
        <TextEditor cell={cell} />
      </>
    )

  return <div className="cell-list-item">{child}</div>
}

export default CellListItem
