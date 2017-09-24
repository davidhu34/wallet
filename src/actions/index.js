export const Add = () => ({
	type: 'ADD'
})

const launchModal = (util, entry, option) => (dispatch) => {
	console.log('launch modal')
	//dispatch({ type: 'LAUNCH_MODAL'})

	const modalPromise = new Promise(
		(resolve, reject) => dispatch({
			 type: 'LAUNCH_MODAL',
			 resolve, reject, util, entry, option
 		})
	)
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
				dispatch({ type: 'APPLY_FILTER', apply })
				dispatch({ type: 'CLOSE_MODAL' })
			})

	}
}
export const launchSelection = entry => launchModal('selection', entry)
export const launchFilter = (entry, opt) => launchModal('filter', entry, opt)

export const toggleFilter = filter => ({
	type: 'TOGGLE_CATEGORY_FILTER', filter
})

export const closeModal = () => ({
	type: 'CLOSE_MODAL'
})
