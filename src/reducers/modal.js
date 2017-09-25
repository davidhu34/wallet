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
    filter: {
        time: {
            type: 'time'
        },
        amount: {
            type: 'amount'
        },
        category: {
            type: 'category',
            list: ['food', 'travel']
        }
    }
}
export const modal = ( state = initModal, action ) => {
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
