import { newRecordInit } from '../consts'

export const newRecord = ( state = newRecordInit, action ) => {
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
		case 'NEW_RECORD_AMOUNT':
			return action.number > -1? {
				...state,
				amount: action.number
			} : state
		default:
			return state
	}
}
