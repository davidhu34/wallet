const newRecordInit = {
	year: 2017,
	month: 'November',
	date: 7
}
export const newRecord = ( state = newRecordInit, action ) => {
	switch ( action.type ) {
		case 'MODAL_SELECTION':
			return {
				...state,
				[action.entry]: action.value
			}
		case 'NEW_RECORD_TIME':
			return action.value? {
				...state,
				[action.slot]: action.value
			} : state
		default:
			return state
	}
}
