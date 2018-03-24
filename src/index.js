import React from 'react'
import { render } from 'react-dom'

import { freshStore } from './configureStore'
import Root from './components/Root'

const store = freshStore()

render(
    <Root store={store} />,
    document.getElementById('root')
)
