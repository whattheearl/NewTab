export default function displayWorkspaceModal(state = false, action) {
    switch (action.type) {
        case 'TOGGLE_WORKSPACE_MODAL':
            return !state;
        default:
            return state;
    }
};