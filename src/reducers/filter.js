const filterInit = {
    time: {
        selected: {
            from: null,
            to: null
        },
        selecting: {
            from: null,
            to: null
        }
    },
    category: {
        category: ['food', 'travel'],
        selected: [],
        selecting: []
    },
    amount: {
        selected: {
            min: 0,
            max: -1
        },
        selecting: {
            min: null,
            max: null
        }
    }
};

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
                ...state,
                category: category(state.category, action)
            }
        case 'APPLY_FILTER':
            return {
                ...state,
                category: category(state.category, action)
            }
        default:
            return state
    }
}
