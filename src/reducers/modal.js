export const modal = ( state = {}, action ) => {
    const { modalType, option, resolve, entry, data } = action

    switch ( action.type ) {
        case 'LAUNCH_MODAL':
        console.log(action)
            return {
                ...state,
                modalType, option, resolve,
                data: data//state[modalType][entry]
            }
        case 'LAUNCH_':
        case 'CLOSE_MODAL':
            return {
                ...state,
                modalType: '',
                data: null
            }
        default:
            return state
    }
}
