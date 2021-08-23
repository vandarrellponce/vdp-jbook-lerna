import { ActionTypes } from '../action-types'
import { Action } from '../actions'
import { Cell } from '../cell'
import { produce } from 'immer'

interface CellsState {
  loading: boolean
  error: string | null
  order: string[]
  data: {
    [key: string]: Cell
  }
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
}

const cellsReducer = produce(
  (state: CellsState = initialState, action: Action) => {
    switch (action.type) {
      case ActionTypes.SAVE_CELLS_ERROR: {
        state.error = action.payload
        return state
      }

      case ActionTypes.FETCH_CELLS: {
        state.loading = true
        state.error = null
        return state
      }
      case ActionTypes.FETCH_CELLS_COMPLETE: {
        state.loading = false
        state.error = null

        state.order = action.payload.map((cell) => cell.id)
        state.data = action.payload.reduce((acc, cell) => {
          acc[cell.id] = cell
          return acc
        }, {} as CellsState['data'])

        return state
      }
      case ActionTypes.FETCH_CELLS_ERROR: {
        state.loading = false
        state.error = action.payload
        return state
      }
      case ActionTypes.UPDATE_CELL: {
        const { id, content } = action.payload
        state.data[id].content = content
        return state
      }

      case ActionTypes.DELETE_CELL: {
        delete state.data[action.payload]
        state.order = state.order.filter((id) => id !== action.payload)
        return state
      }

      case ActionTypes.MOVE_CELL: {
        const { direction } = action.payload
        const index = state.order.findIndex((id) => id === action.payload.id)
        const targetIndex = direction === 'up' ? index - 1 : index + 1
        if (targetIndex < 0 || targetIndex > state.order.length - 1) return

        // swap cells
        state.order[index] = state.order[targetIndex]
        state.order[targetIndex] = action.payload.id
        return state
      }

      case ActionTypes.INSERT_CELL_AFTER: {
        const cell: Cell = {
          content: '',
          id: randomId(),
          type: action.payload.type,
        }

        state.data[cell.id] = cell
        const index = state.order.findIndex((id) => id === action.payload.id)
        if (index < 0) state.order.unshift(cell.id)
        else state.order.splice(index + 1, 0, cell.id)
        return state
      }

      default:
        return state
    }
  },
  initialState
)

const randomId = () => Math.random().toString(36).substr(2, 5)

export default cellsReducer
