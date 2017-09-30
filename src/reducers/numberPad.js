const numberPadInit = {
	number: '0'
}
export const numberPad = ( state = numberPadInit, action ) => {
	switch ( action.type ) {
		case 'CLICK_NUMBER_PAD':
			return {
				number: (state.number == '0'? '': state.number) + action.number
			}
		case 'POP_NUMBER_PAD':
			return {
				number: state.number.length == 1?
					'0': state.number.substr(0, state.number.length-1)
			}
		case 'CLEAR_NUMBER_PAD':
			return numberPadInit
		case 'CLOSE_MODAL':
			return numberPadInit
		default:
			return state
	}
}
