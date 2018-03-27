const driveAPIInit = {
    userInput:'',
    localFile: {
        id: '',
        name: ''
    },
    fetchedFile: {
        id: '',
        name
    }
}

export const driveAPI = ( state = driveAPIInit, action ) => {

    switch ( action.type ) {
        case 'GAPI_READY':
        default:
            return state
    }
}
