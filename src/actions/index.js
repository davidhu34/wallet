export const Add = () => ({
	type: 'ADD'
})



}
const launchModal = (util, entry) => (dispatch) => {

	dispatch({ type: 'LAUNCH_MODAL' })

	const modalPromise = type => new Promise( (resolve, reject) => {
		dispatch({ resolve, reject, util, entry, type })
	})
	switch (util) {
		case 'selection':
			modalPromise.then( value => {
				dispatch({
					type: 'MODAL_SELECTION',
					entry, value
				})
				dispatch({ type: 'CLOSE_MODAL' })
			})
			break
		case 'filter':
		default:
			modalPromise.then( apply => {
				if (apply) dispatch({ type: 'APPLY_FILTER' })
				dispatch({ type: 'CLOSE_MODAL' })
			})

	}
}
export const launchSelection = entry => launchModal('selection', entry)
export const launchFilter = entry => launchModal('filter', entry)

export const toggleFilter = filter => ({
	type: 'TOGGLE_CATEGORY_FILTER', filter
})

export const closeModal = () => ({
	type: 'CLOSE_MODAL'
})
