import React from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
//import { BrowserRouter, Route, browserHistory } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import App from './App'


const Root = ({ store, history }) => (
    <Provider store={store} >
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
)

export default Root
