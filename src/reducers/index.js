import { combineReducers } from 'redux'
import { ui } from './ui'
import { record } from './record'
import { newRecord } from './newRecord'
import { numberPad } from './numberPad'
import { modal } from './modal'
import { filter } from './filter'
import { datepicker } from './datepicker'

const App = combineReducers({
    ui,
    record,
    modal,
    newRecord,
    numberPad,
    filter,
    datepicker
})

export default App
