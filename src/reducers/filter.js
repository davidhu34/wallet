import { filterInit } from '../consts'

const selecting = ( state, action ) => {
    switch ( action.type ) {
        case 'TOGGLE_CATEGORY_FILTER':
            const { category } = action
            const prevCats = state.categories
            return {
                ...state,
                categories: prevCats.indexOf(category) > -1?
                    prevCats.filter( c => c != category)
                    : [...prevCats, category]
            }
        default:
            return state
    }
}
const amount = ( state, action ) => {
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
                categories: state.selecting.categories
            }
        case 'APPLY_MIN_FILTER':
        case 'APPLY_MAX_FILTER':
            return {
                ...state,
                amount: amount(state.amount, action)
            }
        default:
            return state
    }
}

export const recordFilters = ({ time, amount, categories }) => ({
    from: time.from, to: time.to,
    max: amount.max, min: amount.min,
    categories: categories
})