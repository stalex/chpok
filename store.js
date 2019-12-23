import * as R from 'ramda'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createRootSaga, sagaMiddleware } from './sagas'
import { middleware as routerMiddleware } from './router-reducer'
import createRootReducer from './reducer'


const defaultPersistConfig = {
  key      : 'root',
  storage,
  blacklist: ['router', 'form'],
}

const mergeWithDefault = R.mergeDeepWith(R.concat, defaultPersistConfig)

const persistedReducerWithConf =
  (persistConfig, reducer) =>
    persistReducer(mergeWithDefault(persistConfig), reducer)

const createRStore = ({ reducer, sagas, persistConfig = {} }) => {
  const store = createStore(
    persistedReducerWithConf(
      persistConfig,
      createRootReducer(reducer)
    ),
    {},
    composeWithDevTools({ trace: true })(
      applyMiddleware(sagaMiddleware, routerMiddleware),
    ),
  )
  const persistor = persistStore(store)
  sagaMiddleware.run(createRootSaga(sagas))
  return {
    store,
    persistor,
  }
}

export default createRStore




