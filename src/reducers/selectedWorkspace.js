import {
    ACTIONS
} from '../actions/selectedWorkspace';

export default function (state = null, action) {
    switch (action.type) {
        case ACTIONS.SELECT_WORKSPACE:
            console.log('action', action, 'state', state)
            return action.payload;
        case ACTIONS.UNSELECT_WORKSPACE:
            return null;
        default:
            return state;
    }
}