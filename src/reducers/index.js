import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'


import { ui } from './ui'
import { record } from './record'
import { newRecord } from './newRecord'
import { numberPad } from './numberPad'
import { modal } from './modal'
import { filter } from './filter'
import { datepicker } from './datepicker'
import { driveAPI } from './driveAPI'

const App = combineReducers({
    ui,
    record,
    modal,
    newRecord,
    numberPad,
    filter,
    datepicker,
    driveAPI,
    router: routerReducer
})

export default App
