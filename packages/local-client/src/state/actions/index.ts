import { ActionTypes } from '../action-types'
import { Cell, CellTypes } from '../cell'

export interface MoveCellAction {
  type: ActionTypes.MOVE_CELL
  payload: {
    id: string
    direction: Direction
  }
}

export interface DeleteCellAction {
  type: ActionTypes.DELETE_CELL
  payload: string
}

export interface InsertCellAfterAction {
  type: ActionTypes.INSERT_CELL_AFTER
  payload: {
    id: string | null
    type: CellTypes
  }
}

export interface UpdateCellAction {
  type: ActionTypes.UPDATE_CELL
  payload: {
    id: string
    content: string
  }
}
export interface BundleStartAction {
  type: ActionTypes.BUNDLE_START
  payload: {
    cellId: string
  }
}

export interface BundleCompleteAction {
  type: ActionTypes.BUNDLE_COMPLETE
  payload: {
    cellId: string
    bundle: {
      code: string
      err: string
    }
  }
}

export interface FetchCellsAction {
  type: ActionTypes.FETCH_CELLS
}

export interface FetchCellsCompleteAction {
  type: ActionTypes.FETCH_CELLS_COMPLETE
  payload: Cell[]
}

export interface FetchCellErrorAction {
  type: ActionTypes.FETCH_CELLS_ERROR
  payload: string
}

export interface SaveCellsErrorAction {
  type: ActionTypes.SAVE_CELLS_ERROR
  payload: string
}

export type Direction = 'up' | 'down'

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction
  | BundleStartAction
  | BundleCompleteAction
  | FetchCellsAction
  | FetchCellsCompleteAction
  | FetchCellErrorAction
  | SaveCellsErrorAction
