const initModal = {
    util: '',
    data: null,
    selection: {
        year: {
            list: [2017, 2018, 2019],
            size: 1
        },
        month: {
            list: ['November', 'December'],
            size: 3
        },
        date: {
            list: [1, 2, 3, 4, 5, 6, 7 ,8, 9, 10, 11, 12, 13],
            size: 7
        }
    },
    filter: {}
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
        case 'CLOSE_MODAL':
            return {
                ...state,
                util: '', data: null
            }
        default:
            return state
    }
}
