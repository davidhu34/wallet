export const modal = ( state = {}, action ) => {
    const { util, option, resolve, entry, data } = action

    switch ( action.type ) {
        case 'LAUNCH_MODAL':
        console.log(action)
            return {
                ...state,
                util, option, resolve,
                data: data//state[util][entry]
            }
        case 'LAUNCH_':
        case 'CLOSE_MODAL':
            return {
                ...state,
                util: '',
                data: null
            }
        default:
            return state
    }
}
