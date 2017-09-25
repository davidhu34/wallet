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

const selecting = ( state, action ) => {
    switch ( action.type ) {
        case 'TOGGLE_CATEGORY_FILTER':
            const { category } = action
            const prevCats = state.category
            return {
                ...state,
                category: prevCats.indexOf(category) > -1?
                    prevCats.filter( c => c != category)
                    : [...prevCats, category]
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
                selecting: selecting(state.selecting, action)
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
