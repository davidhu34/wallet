const uiInit = {
    modal: false,
    banner: {
        expand: true,
        title: 'Wallet'
    }
};
export const ui = ( state = uiInit, action ) => {
    switch ( action.type ) {
        case 'LAUNCH_MODAL':
            return {
                ...state,
                modal: true
            }
        case 'CLOSE_MODAL':
            return {
                ...state,
                modal: false
            }
        default:
            return state
    }
}
