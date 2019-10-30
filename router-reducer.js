import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

export const ROUTER = 'router'

export const middleware = routerMiddleware(history)

export default connectRouter(history)
