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
		case 'CLEAR_CATEGORY_FILTER':
			return {
				...state,
				categories: []
			}
		case 'TOGGLE_ALL_CATEGORY_FILTER':
		case '@@router/LOCATION_CHANGE':
			return {
				categories: action.categories
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
		case 'CLEAR_AMOUNT_FILTER':
			return {
				min: null,
				max: null
			}
		default:
			return state
	}
}
const time = ( state, action ) => {
	switch ( action.type ) {
		case 'APPLY_FROM_TIME_FILTER':
			return {
				...state,
				from: action.time || null
			}
		case 'APPLY_TO_TIME_FILTER':
			return {
				...state,
				to: action.time || null
			}
		case 'CLEAR_TIME_FILTER':
			return {
				from: null,
				to: null
			}
		default:
			return state
	}
}
const filter = ( state = filterInit, action ) => {
	switch ( action.type ) {
		case 'APPLY_FROM_TIME_FILTER':
		case 'APPLY_TO_TIME_FILTER':
		case 'CLEAR_TIME_FILTER':
			return {
				...state,
				time: time(state.time, action)
			}

		case 'TOGGLE_CATEGORY_FILTER':
		case 'TOGGLE_ALL_CATEGORY_FILTER':
			return {
				...state,
				selecting: selecting(state.selecting, action)
			}
		case 'APPLY_CATEGORY_FILTER':
			return {
				...state,
				categories: state.selecting.categories
			}
		case 'CLEAR_CATEGORY_FILTER':
			return {
				...state,
				categories: [],
				selecting: selecting(state.selecting, action)
			}

		case 'APPLY_MIN_FILTER':
		case 'APPLY_MAX_FILTER':
		case 'CLEAR_AMOUNT_FILTER':
			return {
				...state,
				amount: amount(state.amount, action)
			}

		case '@@router/LOCATION_CHANGE':
			return {
				...state,
				selecting: selecting(state.selecting, {
					...action,
					categories: state.categories
				})
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

export default filter