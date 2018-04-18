import React from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { hot } from 'react-hot-loader'

import Wallet from './Wallet'


const Root = ({ store, history }) => (
    <Provider store={store} >
        <ConnectedRouter history={history}>
            <Wallet />
        </ConnectedRouter>
    </Provider>
)

export default hot(module)(Root)
