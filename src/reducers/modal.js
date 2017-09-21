const initModal = {
    util: '',
    data: null,
    selection: {
        year: 2017,
        month: ['November', 'December'],
        date: 7
    }
}
export const modal = ( state = initModal, action ) => {
    switch ( action.type ) {
        case 'LAUNCH_MODAL_SELECTION':
        console.log(action)
            return {
                ...state,
                util: action.util,
                data: state[action.util][action.entry],
                resolve: action.resolve
            }

        default:
            return state
    }
}
