import { push } from 'react-router-redux'

import { TIME_CONSTS, recordInit, contentRoutes } from '../consts'

import { formatNewRecord } from '../reducers/record'
export * from './modal'

const classData = recordInit.class

export const gapiReady = () => ({ type: 'GAPI_READY' })

export const testGAPI = () => ({ type: 'GAPI_TEST' })

export const selectTotalType = (totalType) => ({
	type: 'OVERVIEW_TOTAL_TYPE',
	totalType: totalType
})
export const selectTopType = (topType) => ({
	type: 'OVERVIEW_TOP_TYPE',
	topType: topType
})
export const selectTopCategoryType = (topCategoryType) => ({
	type: 'OVERVIEW_TOP_CATEGORY_TYPE',
	topCategoryType: topCategoryType
})

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
export const toggleAllCategoryFilter = categories => ({
	type: 'TOGGLE_ALL_CATEGORY_FILTER', categories
})

export const clearCategoryFilter = category => ({
	type: 'CLEAR_CATEGORY_FILTER'
})
export const clearAmountFilter = category => ({
	type: 'CLEAR_AMOUNT_FILTER'
})
export const clearTimeFilter = category => ({
	type: 'CLEAR_TIME_FILTER'
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
