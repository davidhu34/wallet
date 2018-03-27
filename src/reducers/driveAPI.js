const driveAPIInit = {
    userInput:'',
    localFile: {
        id: '',
        name: ''
    },
    fetchedFile: {
        id: '',
        name
    },
    GAPI: null
}

export const driveAPI = ( state = driveAPIInit, action ) => {

    switch ( action.type ) {

        case 'GAPI_TEST':
            state.GAPI.gapiList().then(data => {console.log(data)})
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
