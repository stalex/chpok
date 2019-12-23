import * as R from 'ramda'
import { combineReducers } from 'redux'
import router, { ROUTER } from './router-reducer'

export const reducers = {
  [ROUTER]: router,
}

let createRootReducer = R.compose(
  combineReducers,
  R.mergeLeft(reducers)
)

export default createRootReducer
