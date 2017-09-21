export const Add = () => ({
	type: 'ADD'
})

export const launchModal = (entry) => (dispatch) => {
	dispatch({
		type: 'LAUNCH_MODAL'
	})

	const modalReturn = new Promise( (resolve, reject) => {
		dispatch({
			resolve, reject,
			entry, util: 'selection',
			type: 'LAUNCH_MODAL_SELECTION'
		})
	})
	modalReturn.then( value => {
		dispatch({
			type: 'CLOSE_MODAL'
		})
		dispatch({
			type: 'MODAL_SELECTION',
			entry, value
		})
	})
}
export const closeModal = () => ({
	type: 'CLOSE_MODAL'
})
