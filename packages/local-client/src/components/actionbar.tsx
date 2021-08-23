import { useActions } from '../state/hooks/use-actions'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import './actionbar.css'

const ActionBar: React.FC<{
  id: string
}> = ({ id }) => {
  const { moveCell, deleteCell } = useActions()
  return (
    <div className="buttons-wrapper">
      <button
        className="button is-primary is-small"
        onClick={() => moveCell(id, 'up')}
      >
        <FaAngleUp />
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => moveCell(id, 'down')}
      >
        <FaAngleDown />
      </button>
      <button
        className="button is-danger is-small"
        onClick={() => deleteCell(id)}
      >
        <IoClose />
      </button>
    </div>
  )
}

export default ActionBar
