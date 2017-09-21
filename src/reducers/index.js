import { combineReducers } from 'redux'
import { ui } from './ui'
import { record } from './record'
import { newRecord } from './newRecord'
import { modal } from './modal'

const App = combineReducers({
    ui,
    record,
    modal,
    newRecord,

})

export default App
