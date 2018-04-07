import { uiInit, routeContents } from '../consts'


const overview = ( state, action ) => {
    switch (action.type) {
        case 'OVERVIEW_TOTAL_TYPE':
            return {
                ...state,
                totalType: action.totalType
        }
        case 'OVERVIEW_TOP_TYPE':
            return {
                ...state,
                topType: action.topType
            }
        case 'OVERVIEW_TOP_CATEGORY_TYPE':
            return {
                ...state,
                topCategoryType: action.topCategoryType
            }
        default:
            return state
    }
}
const banner = ( state, action ) => {
    switch ( action.type ) {
        case 'TOGGLE_EXPAND_FILTERS':
            return {
                ...state,
                expand: !state.expand
            }
        //case 'CHANGE_CONTENT':
        case '@@router/LOCATION_CHANGE':
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
                content: action.content
            }

        case 'OVERVIEW_TOTAL_TYPE':
        case 'OVERVIEW_TOP_TYPE':
        case 'OVERVIEW_TOP_CATEGORY_TYPE':
            return {
                ...state,
                overview: overview(state.overview, action)
            }

        case '@@router/LOCATION_CHANGE':
            const location = action.payload || {}
            return {
                ...state,
                banner: banner(state.banner, action),
                modal: false,
                content: routeContents[location.pathname] || 'HOME'
            }
        default:
            return state
    }
}
