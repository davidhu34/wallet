import { push } from 'react-router-redux'

import { TIME_CONSTS, recordInit, contentRoutes } from '../consts'

import { formatNewRecord } from '../reducers/record'
import { recordModified } from '../reducers/newRecord'
import { toggleLoader, launchConfirm } from './modal'
export * from './modal'

const classData = recordInit.class


export const editRecord = (record) => (dispatch, getState) => {
	console.log('editRecord', record)
	dispatch({
		type: 'EDIT_RECORD',
		record: record
	})
	changeContent('EDIT_RECORD')(dispatch)
}
export const loadDemoData = () => (dispatch, getState) => {
	dispatch(toggleLoader(true))
	dispatch({ type: 'LOAD_DEMO_DATA' })
 	dispatch(changeContent('HOME'))
	dispatch(toggleLoader(false))
}
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
const updateRecord = newRecord => ({
	type: 'UPDATE_RECORD',
	record: formatNewRecord(newRecord)
})

const promptClassSelection = () => ({
	type: 'PROMPT_CLASS_SELECTION'
})
const promptAmountInput = () => ({
	type: 'PROMPT_AMOUNT_INPUT'
})
export const saveRecord = () => (dispatch, getState) => {
	const newRecord = getState().newRecord
	console.log('saveRecord', newRecord)
	if (!newRecord.classId) {
		dispatch(promptClassSelection())
	} else if (newRecord.amount == 0 ) {
		dispatch(promptAmountInput())
	} else {
		if (newRecord.id)
			dispatch(updateRecord(newRecord))
		else
			dispatch(createRecord(newRecord))
		dispatch(changeContent('RECORD_LIST'))
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


export const recordBack = () => (dispatch, getState) => {
	const { ui, newRecord } = getState()
	let to = ''
	switch (ui.content) {
		case 'EDIT_RECORD':
			to = 'RECORD_LIST'
			break
		default:
			to = 'HOME'
			break
	}
	console.log(newRecord)
	if (recordModified(newRecord)) {
		console.log('newRecord modified')
		dispatch(
			launchConfirm({
				message: 'Discard editing?',
				proceed: (confirm) => {
					return confirm? changeContent(to): null
				}
			})
		)
	} else dispatch(changeContent(to))
}

export const changeContent = content => dispatch => {
	dispatch({
		type: 'CHANGE_CONTENT', content
	})
	const nextRoute = contentRoutes[content] || '/'
	dispatch(push(nextRoute))
}


export { gapiSignIn, syncFromFile, uploadToFile } from './gapi'
