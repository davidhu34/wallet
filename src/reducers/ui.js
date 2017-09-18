const uiInit = {
    modal: false
};
export const ui = ( state = uiInit, action ) => {
    switch ( action.type ) {
        case 'LAUNCH_MODAL':
            return {
                ...state,
                modal: true
            }
        default:
            return state
    }
}
