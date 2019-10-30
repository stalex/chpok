import createSagaMiddleware from 'redux-saga'
import { all, call, spawn } from 'redux-saga/effects'

const sagaMonitor = reactotron.createSagaMonitor()

export const sagaMiddleware = createSagaMiddleware({ sagaMonitor })

export const createRootSaga = (sagas) => function*() {
  yield all(
    sagas.map(saga =>
      spawn(function*() {
        while (true) {
          try {
            yield call(saga)
            break
          } catch (e) {
            console.log(e)
          }
        }
      })
    )
  )
}
