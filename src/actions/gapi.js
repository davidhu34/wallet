import { recordsToCSV, recordsFromCSV } from '../reducers/record'

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
							dispatch(gapiSyncEnd(null, data))
						} else {
							// no match
							dispatch(gapiSyncEnd('NO_MATCH'))
						}

					}).catch( err => {
						dispatch(gapiSyncEnd(err))
					})

			}).catch( listError => {
				dispatch(gapiSyncError(listError))
			})

	}).catch( signInError => {
		dispatch(gapiSyncError(signInError))
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
							dispatch(gapiUploadUpdate(null,file))
						}).catch( err => {
							dispatch(gapiUploadUpdate(err))
						})
				} else {
					// <name> is new
					GAPI.gapiCreate({
						name: userInputFileName+'.csv',
						data: '1,1,1\n2,2,2\n3,3,3'
					}).then( file => {
						// create success
						dispatch(gapiUploadCreate(null,file))
					}).catch( err => {
						dispatch(gapiUploadCreate(err))
					})
				}

			}).catch( listError => {
				dispatch(gapiUploadError(listError))
			})

	}).catch( signInError => {
		dispatch(gapiUploadError(signInError))
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

	dispatch(gapiSignInStart())
	if (GAPI.gapiIsSignedIn()) {
		dispatch(gapiSignInEnd('ALREADY SIGNED IN'))
		resolve()
	} else {
		GAPI.gapiSignIn()
			.then( data => {
				dispatch(gapiSignInEnd(null, data))
				resolve()
			})
			.catch( err => {
				dispatch(gapiSignInEnd(err))
			 	reject()
			})
	}
}
