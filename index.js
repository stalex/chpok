import React from 'react'
import { Provider } from 'react-redux'
import createRStore from './store'
import {history} from './router-reducer'

const defaultLoading = () => (<div>Востановление сессии</div>)

const StateProvider = ({children, reducer, sagas, loading=defaultLoading}) => {
  const {store, persistor} = createRStore({ reducer, sagas })

  return (
    <Provider store={store}>
      <PersistGate loading={loading()} persistor={persistor}>
        <ConnectedRouter history={history}>
          {children}
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  )
}

export default StateProvider
