import ACTIONS from './types';

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