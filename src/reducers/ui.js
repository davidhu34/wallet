const uiInit = {
    modal: false,
    banner: {
        expand: false,
        title: 'Wallet'
    }
};
const banner = ( state, action ) => {
    switch ( action.type ) {
        case 'TOGGLE_EXPAND_FILTERS':
            return {
                ...state,
                expand: !state.expand
            }
        default:
            return state
    }
}
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
        case 'TOGGLE_EXPAND_FILTERS':
            return {
                ...state,
                banner: banner(state.banner, action)
            }
        default:
            return state
    }
}
