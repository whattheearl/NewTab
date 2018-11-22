import ACTIONS from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case ACTIONS.SELECT_WORKSPACE:
            if (!action.payload) {
                console.error('no workspace', action);
            }
            return action.payload;

        case ACTIONS.UNSELECT_WORKSPACE:
            return null;

        case ACTIONS.ADD_SITE_TO_SELECTED_WORKSPACE:
            if (!action.payload) {
                console.error('no site', action);
            }
            if (state.sites.filter(site => site.url === action.payload.url).length > 0) {
                return state;
            }
            return {
                ...state,
                sites: [
                    ...state.sites,
                    action.payload
                ],
                lastModified: Date.now()
            };

        case ACTIONS.REMOVE_SITE_FROM_SELECTED_WORKSPACE:
            if (!action.payload) {
                console.error('no site', action);
            }
            let index = state.sites.indexOf(action.payload);
            if (index === -1) {
                console.error('site not found', action);
            }
            return {
                ...state,
                sites: [
                    ...state.sites.slice(0, index),
                    ...state.sites.slice(index + 1)
                ],
                lastModified: Date.now()
            };

        default:
            return state;
    }
}