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

        default:
            return state;
    }
}