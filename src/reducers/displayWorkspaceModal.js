import ACTIONS from '../actions/types';

export default function displayWorkspaceModal(state = false, action) {
    switch (action.type) {
        case ACTIONS.TOGGLE_WORKSPACE_MODAL:
            return !state;
        default:
            return state;
    }
};