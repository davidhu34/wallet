import { uiInit, routeContents } from '../consts'

const banner = ( state, action ) => {
    switch ( action.type ) {
        case 'TOGGLE_EXPAND_FILTERS':
            return {
                ...state,
                expand: !state.expand
            }
        case 'CHANGE_CONTENT':
        case 'LAUNCH_MODAL':
            return {
                ...state,
                expand: false
            }
        default:
            return state
    }
}
export const ui = ( state = uiInit, action ) => {
    switch ( action.type ) {
        case 'TOGGLE_EXPAND_FILTERS':
            return {
                ...state,
                banner: banner(state.banner, action)
            }
        case 'LAUNCH_MODAL':
            return {
                ...state,
                modal: true,
                banner: banner(state.banner, action)
            }
        case 'CLOSE_MODAL':
            return {
                ...state,
                modal: false
            }
        case 'CHANGE_CONTENT':
            return {
                ...state,
                content: action.content,
                banner: banner(state.banner, action)
            }
        case '@@router/LOCATION_CHANGE':
            const location = action.payload || {}
            return {
                ...state,
                content: routeContents[location.pathname] || 'HOME'
            }
        default:
            return state
    }
}
