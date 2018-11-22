import ACTIONS from './types';

// WORKSPACE
export const addWorkspace = workspace => {
    return {
        type: ACTIONS.ADD_WORKSPACE,
        payload: workspace,
    }
}

export const removeWorkspace = workspace => {
    return {
        type: ACTIONS.REMOVE_WORKSPACE,
        payload: workspace,
    }
}

export const updateWorkspace = workspace => {
    return {
        type: ACTIONS.UPDATE_WORKSPACE,
        payload: workspace,
    }
}

// EDIT WORKSPACE MODAL
export function toggleWorkspaceModal() {
    return {
        type: ACTIONS.TOGGLE_WORKSPACE_MODAL,
    }
}

// SELECTED WORKSPACE
export const selectWorkspace = (space) => {
    return {
        type: ACTIONS.SELECT_WORKSPACE,
        payload: space
    }
}

export const unselectWorkspace = () => {
    return {
        type: ACTIONS.UNSELECT_WORKSPACE
    }
}