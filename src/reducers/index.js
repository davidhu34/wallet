import { combineReducers } from 'redux'
import { ui } from './ui'
import { record } from './record'
import { newRecord } from './newRecord'
import { modal } from './modal'
import { filter } from './filter'
const App = combineReducers({
    ui,
    record,
    modal,
    newRecord,
    filter
})

export default App
