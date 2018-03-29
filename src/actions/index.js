import { push } from 'react-router-redux'

import { TIME_CONSTS, recordInit } from '../consts'
const classData = recordInit.class

export * from './modal'

export const gapiReady = () => ({ type: 'GAPI_READY' })

export const testGAPI = () => ({ type: 'GAPI_TEST' })


export const createRecord = record => ({
	type: 'CREATE_RECORD', record
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



const contentRoutes = {
	'HOME': '/',
	'NEW_RECORD': '/new',
	'RECORD_LIST': '/list'
}
export const changeContent = content => dispatch => {
	dispatch({
		type: 'CHANGE_CONTENT', content
	})
	const nextRoute = contentRoutes[content] || '/'
	dispatch(push(nextRoute))
}


export { gapiSignIn, syncFromFile, uploadToFile } from './gapi'
