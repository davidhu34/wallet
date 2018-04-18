import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'

import App from './reducers'

const freshStore = (history) => {
    const middlewares = [ thunk ]
    middlewares.push( logger )
    middlewares.push( routerMiddleware(history) )
    return createStore(
        App,
        applyMiddleware( ...middlewares )
    )
}

export { freshStore }
