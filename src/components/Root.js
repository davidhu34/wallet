import React from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
//import { BrowserRouter, Route, browserHistory } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import Wallet from './Wallet'


const Root = ({ store, history }) => (
    <Provider store={store} >
        <ConnectedRouter history={history}>
            <Wallet />
        </ConnectedRouter>
    </Provider>
)

export default Root
