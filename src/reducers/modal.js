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
        case '@@router/LOCATION_CHANGE':
        case 'CLOSE_MODAL':
            return {
                ...state,
                resolve: () => {},
                modalType: '',
                data: null
            }
        default:
            return state
    }
}
