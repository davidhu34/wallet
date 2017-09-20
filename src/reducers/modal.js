export const modal = ( state = {}, action ) => {
    switch ( action.type ) {
        case 'LAUNCH_MODAL_SELECTION':
            return {
                util: 'selection',
                data: {
                    selections: ['January', 'February', 'March']
                },
                resolve: action.resolve
            }
        case 'CLOSE_MODAL':
            return {}
        default:
            return state
    }
}
