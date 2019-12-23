import createSagaMiddleware from 'redux-saga'
import { all, call, spawn } from 'redux-saga/effects'

export const sagaMiddleware = createSagaMiddleware()

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
