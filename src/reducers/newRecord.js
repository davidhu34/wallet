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
		default:
			return state
	}
}
