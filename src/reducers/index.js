import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'


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
    datepicker,
    router: routerReducer
})

export default App
