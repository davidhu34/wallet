import { push } from 'react-router-redux'
import { TIME_CONSTS, recordInit, contentRoutes } from '../consts'
export * from './modal'

const classData = recordInit.class

export const gapiReady = () => ({ type: 'GAPI_READY' })

export const testGAPI = () => ({ type: 'GAPI_TEST' })


export const createRecord = record => ({
	type: 'CREATE_RECORD', record
})

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
