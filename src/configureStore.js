import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'

import App from './reducers'

const freshStore = (history) => {
    const middlewares = [ thunk ]
    middlewares.push( createLogger() )
    middlewares.push( routerMiddleware(history) )
    return createStore(
        App,
        applyMiddleware( ...middlewares )
    )
}

export { freshStore }
