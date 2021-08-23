import { useEffect } from 'react'
import { useActions } from '../state/hooks/use-actions'
import { useTypedSelector } from '../state/hooks/use-typed-selector'
import AddCell from './add-cell'
import CellListItem from './cell-list-item'
import './cell-list.css'

const CellList: React.FC = () => {
  const { fetchCells } = useActions()
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  )

  useEffect(() => {
    fetchCells()
  }, [])

  const renderedCells = cells.map((cell) => (
    <div key={cell.id}>
      <CellListItem cell={cell} key={cell.id} />
      <AddCell prevCellId={cell.id} />
    </div>
  ))
  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} prevCellId={null} />
      {renderedCells}
    </div>
  )
}

export default CellList
