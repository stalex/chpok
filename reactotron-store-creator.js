import Reactotron from 'reactotron-react-js'
import { reactotronRedux } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'

export const reactotron = Reactotron.configure() // we can use plugins here -- more on this later
  .use(reactotronRedux())
  .use(sagaPlugin())
  .connect()

export default reactotron.createStore
