const datepickerInit = {
    viewTime: null,
    focusTimes: []
}
export const datepicker = ( state = datepickerInit, action ) => {

    const vt = new Date(state.viewTime)
    const limit = action.limit || 1

    switch ( action.type ) {
        case 'SELECT_DATE':
            if (limit == 1) {
                return {
                    ...state,
                    viewTime: action.time,
                    focusTimes: [action.time]
                }
            } else {
                let focusIdx = state.focusTimes.indexOf(action.time)
                return focusIdx > -1? {
                    ...state,
                    viewTime: action.time,
                    focusTimes: [
                        ...state.focusTimes.slice(0,focusIdx),
                        ...state.focusTimes.slice(focusIdx+1)
                    ]
                } : state.focusTimes < limit? {
                    ...state,
                    viewTime: action.time,
                    focusTimes: [...state.focusTimes, action.time]
                } : state
            }
        case 'NEXT_MONTH':
            return {
                ...state,
                viewTime: new Date(vt.getFullYear(), vt.getMonth()+1, vt.getDate()).getTime()
            }
        case 'PREV_MONTH':
            return {
                ...state,
                viewTime: new Date(vt.getFullYear(), vt.getMonth()-1, vt.getDate()).getTime()
            }
        case 'NEXT_YEAR':
            return {
                ...state,
                viewTime: new Date(vt.getFullYear()+1, vt.getMonth(), vt.getDate()).getTime()
            }
        case 'PREV_YEAR':
            return {
                ...state,
                viewTime: new Date(vt.getFullYear()-1, vt.getMonth(), vt.getDate()).getTime()
            }
        case 'LAUNCH_MODAL':
            return action.modalType == 'datepicker'? {
                viewTime: action.data.viewTime || new Date().getTime(),
                focusTimes: action.data.focusTimes || []
            } : state
        case 'LAUNCH_MODAL':
        case 'CLOSE_MODAL':
            return datepickerInit
        default:
            return state
    }
}
