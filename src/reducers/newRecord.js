import { newRecordInit } from '../consts'

export const newRecord = ( state = newRecordInit(), action ) => {
	switch ( action.type ) {
		case 'MODAL_SELECTION':
			return {
				...state,
				[action.entry]: action.selection
			}
		case 'NEW_RECORD_TIME':
			return action.selection? {
				...state,
				[action.slot]: action.selection
			} : state
		case 'NEW_RECORD_CLASS':
			return action.selection != state.classId? {
				...state,
				classId: action.selection,
				categoryId: ''
			} : state
		case 'NEW_RECORD_CATEGORY':
			return action.selection? {
				...state,
				categoryId: action.selection
			} : state
		case 'NEW_RECORD_AMOUNT':
			return action.number > -1? {
				...state,
				amount: action.number
			} : state
		case 'NEW_RECORD_NOTE':
			return action.text? {
				...state,
				note: action.text
			} : state
		case 'NEW_RECORD_DATEPICKER':
			return action.time? {
				...state,
				time: action.time
			} : state
		default:
			return state
	}
}
