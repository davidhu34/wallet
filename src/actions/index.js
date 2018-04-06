import { push } from 'react-router-redux'

import { TIME_CONSTS, recordInit, contentRoutes } from '../consts'

import { formatNewRecord } from '../reducers/record'
export * from './modal'

const classData = recordInit.class

export const gapiReady = () => ({ type: 'GAPI_READY' })

export const testGAPI = () => ({ type: 'GAPI_TEST' })


const createRecord = newRecord => ({
	type: 'CREATE_RECORD',
	record: formatNewRecord(newRecord)
})
const promptClassSelection = () => ({
	type: 'PROMPT_CLASS_SELECTION'
})
const promptAmountInput = () => ({
	type: 'PROMPT_AMOUNT_INPUT'
})
export const createNewRecord = () => (dispatch, getState) => {
	const newRecord = getState().newRecord
	if (!newRecord.classId) {
		dispatch(promptClassSelection())
	} else if (newRecord.amount == 0 ) {
		dispatch(promptAmountInput())
	} else {
		dispatch(createRecord(newRecord))
	}
}

export const resetNewRecord = () => ({
	type: 'NEW_RECORD_RESET'
})

export const toggleCategoryFilter = category => ({
	type: 'TOGGLE_CATEGORY_FILTER', category
})

export const closeModal = () => ({
	type: 'CLOSE_MODAL'
})

export const toggleExpandFilters = () => ({
	type: 'TOGGLE_EXPAND_FILTERS'
})


export const changeContent = content => dispatch => {
	dispatch({
		type: 'CHANGE_CONTENT', content
	})
	const nextRoute = contentRoutes[content] || '/'
	dispatch(push(nextRoute))
}


export { gapiSignIn, syncFromFile, uploadToFile } from './gapi'
