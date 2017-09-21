export const Add = () => ({
	type: 'ADD'
})


const launchModal = (util, entry) => (dispatch) => {
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
			type: 'MODAL_SELECTION',
			entry, value
		})
		dispatch({
			type: 'CLOSE_MODAL'
		})
	})
}
export const launchSelection = entry => launchModal('selection', entry)

export const closeModal = () => ({
	type: 'CLOSE_MODAL'
})
