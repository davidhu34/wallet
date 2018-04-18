import React from 'react'
import { render } from 'react-dom'
import createHistory from 'history/createBrowserHistory'

import { freshStore } from './configureStore'
import GAPI from './gapi'

import Root from './components/Root'

const history = createHistory()
const store = freshStore(history)
const gapi = new GAPI(store)

render(
    <Root store={store} history={history} />,
    document.getElementById('root')
)
