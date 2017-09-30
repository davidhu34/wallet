const numberPadInit = {
	number: ''
}
export const numberPad = ( state = numberPadInit, action ) => {
	switch ( action.type ) {
		case 'CLICK_NUMBER_PAD':
			return {
				number: state.number + action.number
			}
		case 'POP_NUMBER_PAD':
			return {
				number: state.number.substr(0, state.number.length-1)
			}
		case 'CLOSE_MODAL':
			return numberPadInit
		default:
			return state
	}
}
