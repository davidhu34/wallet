const filterInit = {
    class: {
        '1': {
            id: '1',
            name: 'food',
            category: ['1' ,'2', '3', '4']
        },
        '2': {
            id: '2',
            name: 'travel',
            category: ['5' ,'6', '7']
        }
    },
    category: {
        '1': {
            id: '1',
            name: 'breakfast',
            class: '1'
        },
        '2': {
            id: '2',
            name: 'lunch',
            class: '1'
        },
        '3': {
            id: '3',
            name: 'dinner',
            class: '1'
        },
        '4': {
            id: '4',
            name: 'drink',
            class: '1'
        },
        '5': {
            id: '1',
            name: 'mrt',
            class: '2'
        },
        '6': {
            id: '6',
            name: 'bus',
            class: '2'
        },
        '7': {
            id: '7',
            name: 'hsr',
            class: '2'
        }
    },
    selected: {
        time: { from: null, to: null },
        amount: { min: null, max: null},
        category: []
    },
    selecting: {
        time: { from: null, to: null },
        amount: { min: null, max: null},
        category: []
    }
}

const category = ( state, action ) => {
    switch ( action.type ) {
        case 'TOGGLE_CATEGORY_FILTER':
             const { filter } = action
            return {
                ...state,
                selecting: state.selecting.indexOf(filter) > -1?
                    state.selecting.filter( f => f != filter)
                    : [...state.selecting, filter]
            }
        case 'APPLY_FILTER':
            return action.apply? {
                ...state,
                selected: state.selecting
            } : {
                ...state,
                selecting: state.selected
            }
        default:
            return state
    }
}
export const filter = ( state = filterInit, action ) => {
    switch ( action.type ) {
        case 'TOGGLE_CATEGORY_FILTER':
            return {
                ...state
            }
        case 'APPLY_FILTER':
            return {
                ...state,
                selected: state.selecting
            }
        default:
            return state
    }
}
