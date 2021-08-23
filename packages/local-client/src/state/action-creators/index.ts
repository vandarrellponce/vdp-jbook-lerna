import axios from 'axios'
import { Dispatch } from 'redux'
import bundle from '../../bundler'
import { ActionTypes } from '../action-types'
import {
  Action,
  DeleteCellAction,
  Direction,
  InsertCellAfterAction,
  MoveCellAction,
  UpdateCellAction,
} from '../actions'
import { Cell, CellTypes } from '../cell'
import { RootState } from '../reducers'

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionTypes.UPDATE_CELL,
    payload: { id, content },
  }
}

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionTypes.DELETE_CELL,
    payload: id,
  }
}

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionTypes.MOVE_CELL,
    payload: { id, direction },
  }
}

export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionTypes.INSERT_CELL_AFTER,
    payload: { id, type: cellType },
  }
}

export const createBundle =
  (cellId: string, input: string) => async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.BUNDLE_START,
      payload: { cellId },
    })

    const result = await bundle(input)

    dispatch({
      type: ActionTypes.BUNDLE_COMPLETE,
      payload: {
        cellId: cellId,
        bundle: result,
      },
    })
  }

export const fetchCells = () => async (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionTypes.FETCH_CELLS,
  })

  try {
    const res: Cell[] = (await axios.get('/cells')).data

    dispatch({
      type: ActionTypes.FETCH_CELLS_COMPLETE,
      payload: res,
    })
  } catch (error) {
    dispatch({
      type: ActionTypes.FETCH_CELLS_ERROR,
      payload: error.message,
    })
  }
}

export const saveCells =
  () => async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { data, order },
    } = getState()

    const cells = order.map((id) => data[id])
    try {
      await axios.post('/cells', { cells })
    } catch (error) {
      dispatch({
        type: ActionTypes.SAVE_CELLS_ERROR,
        payload: error.message,
      })
    }
  }
