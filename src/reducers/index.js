import { combineReducers } from 'redux'
import { ui } from './ui'
import { record } from './record'
import { modal } from './modal'

const App = combineReducers({
    ui,
    record,
    modal
})

export default App
