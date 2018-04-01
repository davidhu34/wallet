
const gapiSyncStart = (file) => ({
	type: 'GAPI_SYNC_START',
	file: file
})
const gapiSyncEnd = (err, data = null) => ({
	type: 'GAPI_SYNC_END',
	error: err,
	data: data
})
export const syncFromFile = (name) => (dispatch, getState) => {
	const { GAPI, localFile } = getState().driveAPI

	dispatch(gapiSyncStart(localFile))
	GAPI.gapiList(name)
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

		}).catch( err => {
			dispatch(gapiUploadListError(err))
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
export const uploadToFile = (name) => (dispatch, getState) => {

	const { GAPI, localFile } = getState().driveAPI

	dispatch(gapiUploadStart(name))
	GAPI.gapiList(name)
		.then( result => {

			const files = result.files
			if (files && files.length) {
				// has file with <name>
				const file = {
					...result.files[0],
					data: '9,9,1\n2,5,2\n3,3,3'
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
					name: name+'.csv',
					data: '1,1,1\n2,2,2\n3,3,3'
				}).then( file => {
					// create success
					dispatch(gapiUploadCreate(null,file))
				}).catch( err => {
					dispatch(gapiUploadCreate(err))
				})
			}

		}).catch( err => {
			dispatch(gapiUploadListError(err))
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
	} else {
		GAPI.gapiSignIn()
			.then( data => { dispatch(gapiSignInEnd(null, data)) })
			.catch( err => { dispatch(gapiSignInEnd(err)) })
	}
}
