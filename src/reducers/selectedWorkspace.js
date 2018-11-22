import {
    ACTIONS
} from '../actions/selectedWorkspace';

export default function (state = null, action) {
    switch (action.type) {
        case ACTIONS.SELECT_WORKSPACE:
            return action.payload;
        case ACTIONS.DESELECT_WORKSPACE:
            return null;
        default:
            return state;
    }
}