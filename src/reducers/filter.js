    import { filterInit } from '../consts'

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
const selected = ( state, action ) => {
    switch ( action.type ) {
        case 'APPLY_MIN_FILTER':
            return {
                ...state,
                min: action.number > 0? action.number: null
            }
        case 'APPLY_MAX_FILTER':
            return {
                ...state,
                max: action.number > 0? action.number: null
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
        case 'APPLY_CATEGORY_FILTER':
            return {
                ...state,
                selected: state.selecting
            }
        case 'APPLY_MIN_FILTER':
        case 'APPLY_MAX_FILTER':
            return {
                ...state,
                selected: selected(state.selected, action)
            }
        default:
            return state
    }
}