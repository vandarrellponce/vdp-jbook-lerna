import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { persistMiddleware } from './middlewares/persist-middleware'
import reducers from './reducers'

const middlewares = [thunk, persistMiddleware]

export const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(...middlewares))
)
