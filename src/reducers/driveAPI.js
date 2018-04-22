const driveAPIInit = {
	userInputFileName: 'csv3',
	localFile: {
		id: '',
		name: '',
		data: null
	},
	latestVersion: {
		id: '',
		name: '',
		data: null
	},
	GAPI: null
}
const fileData = ( state, action ) => {

	switch ( action.type ) {

		case 'GAPI_UPLOAD_UPDATE':
			return action.file

	}
}
export const driveAPI = ( state = driveAPIInit, action ) => {

	switch ( action.type ) {

		case 'GAPI_SIGNIN_START':
		case 'GAPI_SIGNIN_END':
			return state

		case 'GAPI_FILE_NAME':
			return {
				...state,
				userInputFileName: action.text
			}

		case 'GAPI_UPLOAD_START':
		case 'GAPI_SYNC_START':
			return state
		case 'GAPI_UPLOAD_ERROR':
		case 'GAPI_SYNC_ERROR':
			console.log(action.err)
			return state
		case 'GAPI_UPLOAD_UPDATE':
		case 'GAPI_UPLOAD_CREATE':
		case 'GAPI_SYNC_END':
			if (action.error) {
				console.log(action.error)
				return state
			} else {
				return {
					...state,
					latestVersion: action.file,
					localFile: action.file
				}
			}

		case 'GAPI_TEST':
			return state
		case 'GAPI_READY':
			return {
				...state,
				GAPI: action.gapi
			}
		default:
			return state
	}
}
