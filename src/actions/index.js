export const Add = () => ({
	type: 'ADD'
})

const launchModal = (util, data) => (dispatch) => {
	console.log('launch modal')
	//dispatch({ type: 'LAUNCH_MODAL'})

	const modalPromise = new Promise(
		(resolve, reject) => dispatch({
			 type: 'LAUNCH_MODAL',
			 resolve, reject, util, data
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
		case 'category_filter':
		default:
			modalPromise.then( apply => {
				dispatch({ type: 'APPLY_FILTER', apply })
				dispatch({ type: 'CLOSE_MODAL' })
			})

	}
}
export const launchSelection = data => launchModal('selection', data)
export const launchFilter = data => launchModal('filter', data)
export const launchCategoryFilter = data => launchModal('category_filter', data)

export const toggleCategoryFilter = category => ({
	type: 'TOGGLE_CATEGORY_FILTER', category
})

export const closeModal = () => ({
	type: 'CLOSE_MODAL'
})
