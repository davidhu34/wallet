import { recordsToCSV, recordsFromCSV } from '../reducers/record'
import { toggleLoader, launchAlert } from './modal'

const gapiSyncStart = (name) => ({
	type: 'GAPI_SYNC_START',
	name: name
})
const gapiSyncEnd = (err, data = null) => ({
	type: 'GAPI_SYNC_END',
	error: err,
	data: data
})
const gapiSyncError = (err) => ({
	type: 'GAPI_SYNC_ERROR',
	error: err
})
export const syncFromFile = () => (dispatch, getState) => {
	const { GAPI, userInputFileName } = getState().driveAPI

	const wrap = (action) => {
		dispatch(action)
		dispatch(toggleLoader(false)) //close loader
	}
	dispatch(toggleLoader(true))
	signInFirst(GAPI)
	.then( signInSuccess => {

		dispatch(gapiSyncStart(userInputFileName))
		GAPI.gapiList(userInputFileName)
			.then( result => {

				const files = result.files
				GAPI.gapiGet(files[0].id)
					.then( data => {

						if (data) {
							// has file with <name>
							wrap(gapiSyncEnd(null, data))
						} else {
							// no match
							wrap(gapiSyncEnd('NO_MATCH'))
						}

					}).catch( err => {
						wrap(gapiSyncEnd(err))
					})

			}).catch( listError => {
				wrap(gapiSyncError(listError))
			})

	}).catch( signInError => {
		wrap(gapiSyncError(signInError))
	})
}

const gapiUploadStart = (name) => ({
	type: 'GAPI_UPLOAD_START',
	name: name
})
const gapiUploadListError = (err) => ({
	type: 'GAPI_UPLOAD_LISTERROR',
	error: err
})
const gapiUploadUpdate = (err, file = null) => ({
	type: 'GAPI_UPLOAD_UPDATE',
	error: err,
	file: file
})
const gapiUploadCreate = (err, file = null) => ({
	type: 'GAPI_UPLOAD_CREATE',
	error: err,
	file: file
})
const gapiUploadError = (err) => ({
	type: 'GAPI_UPLOAD_ERROR',
	error: err
})
const signInFirst = GAPI => {
	return new Promise( (resolve, reject) => {
		if (GAPI.gapiIsSignedIn()) {
			resolve()
		} else {
			GAPI.gapiSignIn()
			.then( data => resolve(data) )
			.catch( err => reject(err) )
		}
	})
}
export const uploadToFile = () => (dispatch, getState) => {

	const state = getState()
	const { GAPI, userInputFileName } = state.driveAPI
	const { records } = state.record

	const data = recordsToCSV(records)

	const wrap = (action) => {
		dispatch(action)
		if (action.error) dispacth(launchAlert({ title: 'upload error', message: error }))
		else dispatch(toggleLoader(false)) //close loader
	}
	dispatch(toggleLoader(true))
	signInFirst(GAPI)
	.then( signInSuccess => {

		dispatch(gapiUploadStart(userInputFileName))
		GAPI.gapiList(userInputFileName)
			.then( result => {

				const files = result.files
				if (files && files.length) {
					// has file with <name>
					const file = {
						...result.files[0],
						data: data
					}
					GAPI.gapiUpdate(file)
						.then( file => {
							// update success
							wrap(gapiUploadUpdate(null,file))
						}).catch( err => {
							wrap(gapiUploadUpdate(err))
						})
				} else {
					// <name> is new
					GAPI.gapiCreate({
						name: userInputFileName+'.csv',
						data: data
					}).then( file => {
						// create success
						wrap(gapiUploadCreate(null,file))
					}).catch( err => {
						wrap(gapiUploadCreate(err))
					})
				}

			}).catch( listError => {
				wrap(gapiUploadError(listError))
			})

	}).catch( signInError => {
		wrap(gapiUploadError(signInError))
	})
}

const gapiSignInStart = () => ({
	type: 'GAPI_SIGNIN_START'
})
const gapiSignInEnd = (err, data) => ({
	type: 'GAPI_SIGNIN_END',
	error: err,
	data: data
})
export const gapiSignIn = () => (dispatch, getState) => {

	const { GAPI, localFile } = getState().driveAPI
	const wrap = (action) => {
		dispatch(action)
		dispatch(toggleLoader(false)) //close loader
	}
	dispatch(toggleLoader(true))
	dispatch(gapiSignInStart())
	if (GAPI.gapiIsSignedIn()) {
		wrap(gapiSignInEnd('ALREADY SIGNED IN'))
	} else {
		GAPI.gapiSignIn()
			.then( data => {
				wrap(gapiSignInEnd(null, data))
			})
			.catch( err => {
				wrap(gapiSignInEnd(err))
			})
	}
}
