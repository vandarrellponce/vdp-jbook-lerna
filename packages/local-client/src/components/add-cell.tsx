import { useActions } from '../state/hooks/use-actions'
import { FaPlus } from 'react-icons/fa'
import './add-cell.css'

const AddCell: React.FC<{
  prevCellId: string | null
  forceVisible?: boolean
}> = ({ prevCellId, forceVisible }) => {
  const { insertCellAfter } = useActions()

  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <button
        className="button is-primary is-small is-rounded"
        onClick={() => insertCellAfter(prevCellId, 'code')}
      >
        <FaPlus style={{ marginRight: '5px' }} /> Code
      </button>
      <button
        className="button is-primary is-small is-rounded"
        onClick={() => insertCellAfter(prevCellId, 'text')}
      >
        <FaPlus style={{ marginRight: '5px' }} /> Text
      </button>
      <div className="divider"></div>
    </div>
  )
}

export default AddCell
