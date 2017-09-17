import { combineReducers } from 'redux'
import { data } from './data'
import { record } from './record'

const App = combineReducers({
    data,
    record
})

export default App
