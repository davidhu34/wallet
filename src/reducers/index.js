import { combineReducers } from 'redux'
import { ui } from './ui'
import { record } from './record'

const App = combineReducers({
    ui,
    record
})

export default App
