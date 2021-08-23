import produce from 'immer'
import { ActionTypes } from '../action-types'
import { Action } from '../actions'

export {}

interface BundleState {
  [key: string]:
    | {
        loading: boolean
        code: string
        error: string | null
      }
    | undefined
}

const initialState: BundleState = {}

const bundlesReducer = produce(
  (state: BundleState = initialState, action: Action): BundleState => {
    switch (action.type) {
      case ActionTypes.BUNDLE_START: {
        const cellId = action.payload.cellId
        state[cellId] = {
          loading: true,
          code: '',
          error: '',
        }
        return state
      }
      case ActionTypes.BUNDLE_COMPLETE: {
        const cellId = action.payload.cellId
        const { code, err } = action.payload.bundle
        state[cellId] = {
          loading: false,
          code,
          error: err,
        }
        return state
      }
      default:
        return state
    }
  },
  initialState
)

export default bundlesReducer
